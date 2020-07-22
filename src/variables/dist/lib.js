'use strict';

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
}

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var openParentheses = "(".charCodeAt(0);
var closeParentheses = ")".charCodeAt(0);
var singleQuote = "'".charCodeAt(0);
var doubleQuote = '"'.charCodeAt(0);
var backslash = "\\".charCodeAt(0);
var slash = "/".charCodeAt(0);
var comma = ",".charCodeAt(0);
var colon = ":".charCodeAt(0);
var star = "*".charCodeAt(0);

var parse = function(input) {
  var tokens = [];
  var value = input;

  var next, quote, prev, token, escape, escapePos, whitespacePos;
  var pos = 0;
  var code = value.charCodeAt(pos);
  var max = value.length;
  var stack = [{ nodes: tokens }];
  var balanced = 0;
  var parent;

  var name = "";
  var before = "";
  var after = "";

  while (pos < max) {
    // Whitespaces
    if (code <= 32) {
      next = pos;
      do {
        next += 1;
        code = value.charCodeAt(next);
      } while (code <= 32);
      token = value.slice(pos, next);

      prev = tokens[tokens.length - 1];
      if (code === closeParentheses && balanced) {
        after = token;
      } else if (prev && prev.type === "div") {
        prev.after = token;
      } else if (
        code === comma ||
        code === colon ||
        (code === slash && value.charCodeAt(next + 1) !== star)
      ) {
        before = token;
      } else {
        tokens.push({
          type: "space",
          sourceIndex: pos,
          value: token
        });
      }

      pos = next;

      // Quotes
    } else if (code === singleQuote || code === doubleQuote) {
      next = pos;
      quote = code === singleQuote ? "'" : '"';
      token = {
        type: "string",
        sourceIndex: pos,
        quote: quote
      };
      do {
        escape = false;
        next = value.indexOf(quote, next + 1);
        if (~next) {
          escapePos = next;
          while (value.charCodeAt(escapePos - 1) === backslash) {
            escapePos -= 1;
            escape = !escape;
          }
        } else {
          value += quote;
          next = value.length - 1;
          token.unclosed = true;
        }
      } while (escape);
      token.value = value.slice(pos + 1, next);

      tokens.push(token);
      pos = next + 1;
      code = value.charCodeAt(pos);

      // Comments
    } else if (code === slash && value.charCodeAt(pos + 1) === star) {
      token = {
        type: "comment",
        sourceIndex: pos
      };

      next = value.indexOf("*/", pos);
      if (next === -1) {
        token.unclosed = true;
        next = value.length;
      }

      token.value = value.slice(pos + 2, next);
      tokens.push(token);

      pos = next + 2;
      code = value.charCodeAt(pos);

      // Dividers
    } else if (code === slash || code === comma || code === colon) {
      token = value[pos];

      tokens.push({
        type: "div",
        sourceIndex: pos - before.length,
        value: token,
        before: before,
        after: ""
      });
      before = "";

      pos += 1;
      code = value.charCodeAt(pos);

      // Open parentheses
    } else if (openParentheses === code) {
      // Whitespaces after open parentheses
      next = pos;
      do {
        next += 1;
        code = value.charCodeAt(next);
      } while (code <= 32);
      token = {
        type: "function",
        sourceIndex: pos - name.length,
        value: name,
        before: value.slice(pos + 1, next)
      };
      pos = next;

      if (name === "url" && code !== singleQuote && code !== doubleQuote) {
        next -= 1;
        do {
          escape = false;
          next = value.indexOf(")", next + 1);
          if (~next) {
            escapePos = next;
            while (value.charCodeAt(escapePos - 1) === backslash) {
              escapePos -= 1;
              escape = !escape;
            }
          } else {
            value += ")";
            next = value.length - 1;
            token.unclosed = true;
          }
        } while (escape);
        // Whitespaces before closed
        whitespacePos = next;
        do {
          whitespacePos -= 1;
          code = value.charCodeAt(whitespacePos);
        } while (code <= 32);
        if (pos !== whitespacePos + 1) {
          token.nodes = [
            {
              type: "word",
              sourceIndex: pos,
              value: value.slice(pos, whitespacePos + 1)
            }
          ];
        } else {
          token.nodes = [];
        }
        if (token.unclosed && whitespacePos + 1 !== next) {
          token.after = "";
          token.nodes.push({
            type: "space",
            sourceIndex: whitespacePos + 1,
            value: value.slice(whitespacePos + 1, next)
          });
        } else {
          token.after = value.slice(whitespacePos + 1, next);
        }
        pos = next + 1;
        code = value.charCodeAt(pos);
        tokens.push(token);
      } else {
        balanced += 1;
        token.after = "";
        tokens.push(token);
        stack.push(token);
        tokens = token.nodes = [];
        parent = token;
      }
      name = "";

      // Close parentheses
    } else if (closeParentheses === code && balanced) {
      pos += 1;
      code = value.charCodeAt(pos);

      parent.after = after;
      after = "";
      balanced -= 1;
      stack.pop();
      parent = stack[balanced];
      tokens = parent.nodes;

      // Words
    } else {
      next = pos;
      do {
        if (code === backslash) {
          next += 1;
        }
        next += 1;
        code = value.charCodeAt(next);
      } while (
        next < max &&
        !(
          code <= 32 ||
          code === singleQuote ||
          code === doubleQuote ||
          code === comma ||
          code === colon ||
          code === slash ||
          code === openParentheses ||
          (code === closeParentheses && balanced)
        )
      );
      token = value.slice(pos, next);

      if (openParentheses === code) {
        name = token;
      } else {
        tokens.push({
          type: "word",
          sourceIndex: pos,
          value: token
        });
      }

      pos = next;
    }
  }

  for (pos = stack.length - 1; pos; pos -= 1) {
    stack[pos].unclosed = true;
  }

  return stack[0].nodes;
};

var walk = function walk(nodes, cb, bubble) {
  var i, max, node, result;

  for (i = 0, max = nodes.length; i < max; i += 1) {
    node = nodes[i];
    if (!bubble) {
      result = cb(node, i, nodes);
    }

    if (
      result !== false &&
      node.type === "function" &&
      Array.isArray(node.nodes)
    ) {
      walk(node.nodes, cb, bubble);
    }

    if (bubble) {
      cb(node, i, nodes);
    }
  }
};

function stringifyNode(node, custom) {
  var type = node.type;
  var value = node.value;
  var buf;
  var customResult;

  if (custom && (customResult = custom(node)) !== undefined) {
    return customResult;
  } else if (type === "word" || type === "space") {
    return value;
  } else if (type === "string") {
    buf = node.quote || "";
    return buf + value + (node.unclosed ? "" : buf);
  } else if (type === "comment") {
    return "/*" + value + (node.unclosed ? "" : "*/");
  } else if (type === "div") {
    return (node.before || "") + value + (node.after || "");
  } else if (Array.isArray(node.nodes)) {
    buf = stringify(node.nodes);
    if (type !== "function") {
      return buf;
    }
    return (
      value +
      "(" +
      (node.before || "") +
      buf +
      (node.after || "") +
      (node.unclosed ? "" : ")")
    );
  }
  return value;
}

function stringify(nodes, custom) {
  var result, i;

  if (Array.isArray(nodes)) {
    result = "";
    for (i = nodes.length - 1; ~i; i -= 1) {
      result = stringifyNode(nodes[i], custom) + result;
    }
    return result;
  }
  return stringifyNode(nodes, custom);
}

var stringify_1 = stringify;

var minus = "-".charCodeAt(0);
var plus = "+".charCodeAt(0);
var dot = ".".charCodeAt(0);
var exp = "e".charCodeAt(0);
var EXP = "E".charCodeAt(0);

var unit = function(value) {
  var pos = 0;
  var length = value.length;
  var dotted = false;
  var sciPos = -1;
  var containsNumber = false;
  var code;

  while (pos < length) {
    code = value.charCodeAt(pos);

    if (code >= 48 && code <= 57) {
      containsNumber = true;
    } else if (code === exp || code === EXP) {
      if (sciPos > -1) {
        break;
      }
      sciPos = pos;
    } else if (code === dot) {
      if (dotted) {
        break;
      }
      dotted = true;
    } else if (code === plus || code === minus) {
      if (pos !== 0) {
        break;
      }
    } else {
      break;
    }

    pos += 1;
  }

  if (sciPos + 1 === pos) pos--;

  return containsNumber
    ? {
        number: value.slice(0, pos),
        unit: value.slice(pos)
      }
    : false;
};

function ValueParser(value) {
  if (this instanceof ValueParser) {
    this.nodes = parse(value);
    return this;
  }
  return new ValueParser(value);
}

ValueParser.prototype.toString = function() {
  return Array.isArray(this.nodes) ? stringify_1(this.nodes) : "";
};

ValueParser.prototype.walk = function(cb, bubble) {
  walk(this.nodes, cb, bubble);
  return this;
};

ValueParser.unit = unit;

ValueParser.walk = walk;

ValueParser.stringify = stringify_1;

var lib = ValueParser;

var parser_1 = createCommonjsModule(function (module, exports) {
/* parser generated by jison 0.6.1-215 */

/*
 * Returns a Parser object of the following structure:
 *
 *  Parser: {
 *    yy: {}     The so-called "shared state" or rather the *source* of it;
 *               the real "shared state" `yy` passed around to
 *               the rule actions, etc. is a derivative/copy of this one,
 *               not a direct reference!
 *  }
 *
 *  Parser.prototype: {
 *    yy: {},
 *    EOF: 1,
 *    TERROR: 2,
 *
 *    trace: function(errorMessage, ...),
 *
 *    JisonParserError: function(msg, hash),
 *
 *    quoteName: function(name),
 *               Helper function which can be overridden by user code later on: put suitable
 *               quotes around literal IDs in a description string.
 *
 *    originalQuoteName: function(name),
 *               The basic quoteName handler provided by JISON.
 *               `cleanupAfterParse()` will clean up and reset `quoteName()` to reference this function
 *               at the end of the `parse()`.
 *
 *    describeSymbol: function(symbol),
 *               Return a more-or-less human-readable description of the given symbol, when
 *               available, or the symbol itself, serving as its own 'description' for lack
 *               of something better to serve up.
 *
 *               Return NULL when the symbol is unknown to the parser.
 *
 *    symbols_: {associative list: name ==> number},
 *    terminals_: {associative list: number ==> name},
 *    nonterminals: {associative list: rule-name ==> {associative list: number ==> rule-alt}},
 *    terminal_descriptions_: (if there are any) {associative list: number ==> description},
 *    productions_: [...],
 *
 *    performAction: function parser__performAction(yytext, yyleng, yylineno, yyloc, yystate, yysp, yyvstack, yylstack, yystack, yysstack),
 *
 *               The function parameters and `this` have the following value/meaning:
 *               - `this`    : reference to the `yyval` internal object, which has members (`$` and `_$`)
 *                             to store/reference the rule value `$$` and location info `@$`.
 *
 *                 One important thing to note about `this` a.k.a. `yyval`: every *reduce* action gets
 *                 to see the same object via the `this` reference, i.e. if you wish to carry custom
 *                 data from one reduce action through to the next within a single parse run, then you
 *                 may get nasty and use `yyval` a.k.a. `this` for storing you own semi-permanent data.
 *
 *                 `this.yy` is a direct reference to the `yy` shared state object.
 *
 *                 `%parse-param`-specified additional `parse()` arguments have been added to this `yy`
 *                 object at `parse()` start and are therefore available to the action code via the
 *                 same named `yy.xxxx` attributes (where `xxxx` represents a identifier name from
 *                 the %parse-param` list.
 *
 *               - `yytext`  : reference to the lexer value which belongs to the last lexer token used
 *                             to match this rule. This is *not* the look-ahead token, but the last token
 *                             that's actually part of this rule.
 *
 *                 Formulated another way, `yytext` is the value of the token immediately preceeding
 *                 the current look-ahead token.
 *                 Caveats apply for rules which don't require look-ahead, such as epsilon rules.
 *
 *               - `yyleng`  : ditto as `yytext`, only now for the lexer.yyleng value.
 *
 *               - `yylineno`: ditto as `yytext`, only now for the lexer.yylineno value.
 *
 *               - `yyloc`   : ditto as `yytext`, only now for the lexer.yylloc lexer token location info.
 *
 *                               WARNING: since jison 0.4.18-186 this entry may be NULL/UNDEFINED instead
 *                               of an empty object when no suitable location info can be provided.
 *
 *               - `yystate` : the current parser state number, used internally for dispatching and
 *                               executing the action code chunk matching the rule currently being reduced.
 *
 *               - `yysp`    : the current state stack position (a.k.a. 'stack pointer')
 *
 *                 This one comes in handy when you are going to do advanced things to the parser
 *                 stacks, all of which are accessible from your action code (see the next entries below).
 *
 *                 Also note that you can access this and other stack index values using the new double-hash
 *                 syntax, i.e. `##$ === ##0 === yysp`, while `##1` is the stack index for all things
 *                 related to the first rule term, just like you have `$1`, `@1` and `#1`.
 *                 This is made available to write very advanced grammar action rules, e.g. when you want
 *                 to investigate the parse state stack in your action code, which would, for example,
 *                 be relevant when you wish to implement error diagnostics and reporting schemes similar
 *                 to the work described here:
 *
 *                 + Pottier, F., 2016. Reachability and error diagnosis in LR(1) automata.
 *                   In Journées Francophones des Languages Applicatifs.
 *
 *                 + Jeffery, C.L., 2003. Generating LR syntax error messages from examples.
 *                   ACM Transactions on Programming Languages and Systems (TOPLAS), 25(5), pp.631–640.
 *
 *               - `yyrulelength`: the current rule's term count, i.e. the number of entries occupied on the stack.
 *
 *                 This one comes in handy when you are going to do advanced things to the parser
 *                 stacks, all of which are accessible from your action code (see the next entries below).
 *
 *               - `yyvstack`: reference to the parser value stack. Also accessed via the `$1` etc.
 *                             constructs.
 *
 *               - `yylstack`: reference to the parser token location stack. Also accessed via
 *                             the `@1` etc. constructs.
 *
 *                             WARNING: since jison 0.4.18-186 this array MAY contain slots which are
 *                             UNDEFINED rather than an empty (location) object, when the lexer/parser
 *                             action code did not provide a suitable location info object when such a
 *                             slot was filled!
 *
 *               - `yystack` : reference to the parser token id stack. Also accessed via the
 *                             `#1` etc. constructs.
 *
 *                 Note: this is a bit of a **white lie** as we can statically decode any `#n` reference to
 *                 its numeric token id value, hence that code wouldn't need the `yystack` but *you* might
 *                 want access this array for your own purposes, such as error analysis as mentioned above!
 *
 *                 Note that this stack stores the current stack of *tokens*, that is the sequence of
 *                 already parsed=reduced *nonterminals* (tokens representing rules) and *terminals*
 *                 (lexer tokens *shifted* onto the stack until the rule they belong to is found and
 *                 *reduced*.
 *
 *               - `yysstack`: reference to the parser state stack. This one carries the internal parser
 *                             *states* such as the one in `yystate`, which are used to represent
 *                             the parser state machine in the *parse table*. *Very* *internal* stuff,
 *                             what can I say? If you access this one, you're clearly doing wicked things
 *
 *               - `...`     : the extra arguments you specified in the `%parse-param` statement in your
 *                             grammar definition file.
 *
 *    table: [...],
 *               State transition table
 *               ----------------------
 *
 *               index levels are:
 *               - `state`  --> hash table
 *               - `symbol` --> action (number or array)
 *
 *                 If the `action` is an array, these are the elements' meaning:
 *                 - index [0]: 1 = shift, 2 = reduce, 3 = accept
 *                 - index [1]: GOTO `state`
 *
 *                 If the `action` is a number, it is the GOTO `state`
 *
 *    defaultActions: {...},
 *
 *    parseError: function(str, hash, ExceptionClass),
 *    yyError: function(str, ...),
 *    yyRecovering: function(),
 *    yyErrOk: function(),
 *    yyClearIn: function(),
 *
 *    constructParseErrorInfo: function(error_message, exception_object, expected_token_set, is_recoverable),
 *               Helper function **which will be set up during the first invocation of the `parse()` method**.
 *               Produces a new errorInfo 'hash object' which can be passed into `parseError()`.
 *               See it's use in this parser kernel in many places; example usage:
 *
 *                   var infoObj = parser.constructParseErrorInfo('fail!', null,
 *                                     parser.collect_expected_token_set(state), true);
 *                   var retVal = parser.parseError(infoObj.errStr, infoObj, parser.JisonParserError);
 *
 *    originalParseError: function(str, hash, ExceptionClass),
 *               The basic `parseError` handler provided by JISON.
 *               `cleanupAfterParse()` will clean up and reset `parseError()` to reference this function
 *               at the end of the `parse()`.
 *
 *    options: { ... parser %options ... },
 *
 *    parse: function(input[, args...]),
 *               Parse the given `input` and return the parsed value (or `true` when none was provided by
 *               the root action, in which case the parser is acting as a *matcher*).
 *               You MAY use the additional `args...` parameters as per `%parse-param` spec of this grammar:
 *               these extra `args...` are added verbatim to the `yy` object reference as member variables.
 *
 *               WARNING:
 *               Parser's additional `args...` parameters (via `%parse-param`) MAY conflict with
 *               any attributes already added to `yy` by the jison run-time;
 *               when such a collision is detected an exception is thrown to prevent the generated run-time
 *               from silently accepting this confusing and potentially hazardous situation!
 *
 *               The lexer MAY add its own set of additional parameters (via the `%parse-param` line in
 *               the lexer section of the grammar spec): these will be inserted in the `yy` shared state
 *               object and any collision with those will be reported by the lexer via a thrown exception.
 *
 *    cleanupAfterParse: function(resultValue, invoke_post_methods, do_not_nuke_errorinfos),
 *               Helper function **which will be set up during the first invocation of the `parse()` method**.
 *               This helper API is invoked at the end of the `parse()` call, unless an exception was thrown
 *               and `%options no-try-catch` has been defined for this grammar: in that case this helper MAY
 *               be invoked by calling user code to ensure the `post_parse` callbacks are invoked and
 *               the internal parser gets properly garbage collected under these particular circumstances.
 *
 *    yyMergeLocationInfo: function(first_index, last_index, first_yylloc, last_yylloc, dont_look_back),
 *               Helper function **which will be set up during the first invocation of the `parse()` method**.
 *               This helper API can be invoked to calculate a spanning `yylloc` location info object.
 *
 *               Note: %epsilon rules MAY specify no `first_index` and `first_yylloc`, in which case
 *               this function will attempt to obtain a suitable location marker by inspecting the location stack
 *               backwards.
 *
 *               For more info see the documentation comment further below, immediately above this function's
 *               implementation.
 *
 *    lexer: {
 *        yy: {...},           A reference to the so-called "shared state" `yy` once
 *                             received via a call to the `.setInput(input, yy)` lexer API.
 *        EOF: 1,
 *        ERROR: 2,
 *        JisonLexerError: function(msg, hash),
 *        parseError: function(str, hash, ExceptionClass),
 *        setInput: function(input, [yy]),
 *        input: function(),
 *        unput: function(str),
 *        more: function(),
 *        reject: function(),
 *        less: function(n),
 *        pastInput: function(n),
 *        upcomingInput: function(n),
 *        showPosition: function(),
 *        test_match: function(regex_match_array, rule_index, ...),
 *        next: function(...),
 *        lex: function(...),
 *        begin: function(condition),
 *        pushState: function(condition),
 *        popState: function(),
 *        topState: function(),
 *        _currentRules: function(),
 *        stateStackSize: function(),
 *        cleanupAfterLex: function()
 *
 *        options: { ... lexer %options ... },
 *
 *        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START, ...),
 *        rules: [...],
 *        conditions: {associative list: name ==> set},
 *    }
 *  }
 *
 *
 *  token location info (@$, _$, etc.): {
 *    first_line: n,
 *    last_line: n,
 *    first_column: n,
 *    last_column: n,
 *    range: [start_number, end_number]
 *               (where the numbers are indexes into the input string, zero-based)
 *  }
 *
 * ---
 *
 * The `parseError` function receives a 'hash' object with these members for lexer and
 * parser errors:
 *
 *  {
 *    text:        (matched text)
 *    token:       (the produced terminal token, if any)
 *    token_id:    (the produced terminal token numeric ID, if any)
 *    line:        (yylineno)
 *    loc:         (yylloc)
 *  }
 *
 * parser (grammar) errors will also provide these additional members:
 *
 *  {
 *    expected:    (array describing the set of expected tokens;
 *                  may be UNDEFINED when we cannot easily produce such a set)
 *    state:       (integer (or array when the table includes grammar collisions);
 *                  represents the current internal state of the parser kernel.
 *                  can, for example, be used to pass to the `collect_expected_token_set()`
 *                  API to obtain the expected token set)
 *    action:      (integer; represents the current internal action which will be executed)
 *    new_state:   (integer; represents the next/planned internal state, once the current
 *                  action has executed)
 *    recoverable: (boolean: TRUE when the parser MAY have an error recovery rule
 *                  available for this particular error)
 *    state_stack: (array: the current parser LALR/LR internal state stack; this can be used,
 *                  for instance, for advanced error analysis and reporting)
 *    value_stack: (array: the current parser LALR/LR internal `$$` value stack; this can be used,
 *                  for instance, for advanced error analysis and reporting)
 *    location_stack: (array: the current parser LALR/LR internal location stack; this can be used,
 *                  for instance, for advanced error analysis and reporting)
 *    yy:          (object: the current parser internal "shared state" `yy`
 *                  as is also available in the rule actions; this can be used,
 *                  for instance, for advanced error analysis and reporting)
 *    lexer:       (reference to the current lexer instance used by the parser)
 *    parser:      (reference to the current parser instance)
 *  }
 *
 * while `this` will reference the current parser instance.
 *
 * When `parseError` is invoked by the lexer, `this` will still reference the related *parser*
 * instance, while these additional `hash` fields will also be provided:
 *
 *  {
 *    lexer:       (reference to the current lexer instance which reported the error)
 *  }
 *
 * When `parseError` is invoked by the parser due to a **JavaScript exception** being fired
 * from either the parser or lexer, `this` will still reference the related *parser*
 * instance, while these additional `hash` fields will also be provided:
 *
 *  {
 *    exception:   (reference to the exception thrown)
 *  }
 *
 * Please do note that in the latter situation, the `expected` field will be omitted as
 * this type of failure is assumed not to be due to *parse errors* but rather due to user
 * action code in either parser or lexer failing unexpectedly.
 *
 * ---
 *
 * You can specify parser options by setting / modifying the `.yy` object of your Parser instance.
 * These options are available:
 *
 * ### options which are global for all parser instances
 *
 *  Parser.pre_parse: function(yy)
 *                 optional: you can specify a pre_parse() function in the chunk following
 *                 the grammar, i.e. after the last `%%`.
 *  Parser.post_parse: function(yy, retval, parseInfo) { return retval; }
 *                 optional: you can specify a post_parse() function in the chunk following
 *                 the grammar, i.e. after the last `%%`. When it does not return any value,
 *                 the parser will return the original `retval`.
 *
 * ### options which can be set up per parser instance
 *
 *  yy: {
 *      pre_parse:  function(yy)
 *                 optional: is invoked before the parse cycle starts (and before the first
 *                 invocation of `lex()`) but immediately after the invocation of
 *                 `parser.pre_parse()`).
 *      post_parse: function(yy, retval, parseInfo) { return retval; }
 *                 optional: is invoked when the parse terminates due to success ('accept')
 *                 or failure (even when exceptions are thrown).
 *                 `retval` contains the return value to be produced by `Parser.parse()`;
 *                 this function can override the return value by returning another.
 *                 When it does not return any value, the parser will return the original
 *                 `retval`.
 *                 This function is invoked immediately before `parser.post_parse()`.
 *
 *      parseError: function(str, hash, ExceptionClass)
 *                 optional: overrides the default `parseError` function.
 *      quoteName: function(name),
 *                 optional: overrides the default `quoteName` function.
 *  }
 *
 *  parser.lexer.options: {
 *      pre_lex:  function()
 *                 optional: is invoked before the lexer is invoked to produce another token.
 *                 `this` refers to the Lexer object.
 *      post_lex: function(token) { return token; }
 *                 optional: is invoked when the lexer has produced a token `token`;
 *                 this function can override the returned token value by returning another.
 *                 When it does not return any (truthy) value, the lexer will return
 *                 the original `token`.
 *                 `this` refers to the Lexer object.
 *
 *      ranges: boolean
 *                 optional: `true` ==> token location info will include a .range[] member.
 *      flex: boolean
 *                 optional: `true` ==> flex-like lexing behaviour where the rules are tested
 *                 exhaustively to find the longest match.
 *      backtrack_lexer: boolean
 *                 optional: `true` ==> lexer regexes are tested in order and for invoked;
 *                 the lexer terminates the scan when a token is returned by the action code.
 *      xregexp: boolean
 *                 optional: `true` ==> lexer rule regexes are "extended regex format" requiring the
 *                 `XRegExp` library. When this `%option` has not been specified at compile time, all lexer
 *                 rule regexes have been written as standard JavaScript RegExp expressions.
 *  }
 */

        
    
            var parser = (function () {


// See also:
// http://stackoverflow.com/questions/1382107/whats-a-good-way-to-extend-error-in-javascript/#35881508
// but we keep the prototype.constructor and prototype.name assignment lines too for compatibility
// with userland code which might access the derived class in a 'classic' way.
function JisonParserError(msg, hash) {
    Object.defineProperty(this, 'name', {
        enumerable: false,
        writable: false,
        value: 'JisonParserError'
    });

    if (msg == null) msg = '???';

    Object.defineProperty(this, 'message', {
        enumerable: false,
        writable: true,
        value: msg
    });

    this.hash = hash;

    var stacktrace;
    if (hash && hash.exception instanceof Error) {
        var ex2 = hash.exception;
        this.message = ex2.message || msg;
        stacktrace = ex2.stack;
    }
    if (!stacktrace) {
        if (Error.hasOwnProperty('captureStackTrace')) {        // V8/Chrome engine
            Error.captureStackTrace(this, this.constructor);
        } else {
            stacktrace = (new Error(msg)).stack;
        }
    }
    if (stacktrace) {
        Object.defineProperty(this, 'stack', {
            enumerable: false,
            writable: false,
            value: stacktrace
        });
    }
}

if (typeof Object.setPrototypeOf === 'function') {
    Object.setPrototypeOf(JisonParserError.prototype, Error.prototype);
} else {
    JisonParserError.prototype = Object.create(Error.prototype);
}
JisonParserError.prototype.constructor = JisonParserError;
JisonParserError.prototype.name = 'JisonParserError';




        // helper: reconstruct the productions[] table
        function bp(s) {
            var rv = [];
            var p = s.pop;
            var r = s.rule;
            for (var i = 0, l = p.length; i < l; i++) {
                rv.push([
                    p[i],
                    r[i]
                ]);
            }
            return rv;
        }
    


        // helper: reconstruct the defaultActions[] table
        function bda(s) {
            var rv = {};
            var d = s.idx;
            var g = s.goto;
            for (var i = 0, l = d.length; i < l; i++) {
                var j = d[i];
                rv[j] = g[i];
            }
            return rv;
        }
    


        // helper: reconstruct the 'goto' table
        function bt(s) {
            var rv = [];
            var d = s.len;
            var y = s.symbol;
            var t = s.type;
            var a = s.state;
            var m = s.mode;
            var g = s.goto;
            for (var i = 0, l = d.length; i < l; i++) {
                var n = d[i];
                var q = {};
                for (var j = 0; j < n; j++) {
                    var z = y.shift();
                    switch (t.shift()) {
                    case 2:
                        q[z] = [
                            m.shift(),
                            g.shift()
                        ];
                        break;

                    case 0:
                        q[z] = a.shift();
                        break;

                    default:
                        // type === 1: accept
                        q[z] = [
                            3
                        ];
                    }
                }
                rv.push(q);
            }
            return rv;
        }
    


        // helper: runlength encoding with increment step: code, length: step (default step = 0)
        // `this` references an array
        function s(c, l, a) {
            a = a || 0;
            for (var i = 0; i < l; i++) {
                this.push(c);
                c += a;
            }
        }

        // helper: duplicate sequence from *relative* offset and length.
        // `this` references an array
        function c(i, l) {
            i = this.length - i;
            for (l += i; i < l; i++) {
                this.push(this[i]);
            }
        }

        // helper: unpack an array using helpers and data, all passed in an array argument 'a'.
        function u(a) {
            var rv = [];
            for (var i = 0, l = a.length; i < l; i++) {
                var e = a[i];
                // Is this entry a helper function?
                if (typeof e === 'function') {
                    i++;
                    e.apply(rv, a[i]);
                } else {
                    rv.push(e);
                }
            }
            return rv;
        }
    

var parser = {
    // Code Generator Information Report
    // ---------------------------------
    //
    // Options:
    //
    //   default action mode: ............. ["classic","merge"]
    //   test-compile action mode: ........ "parser:*,lexer:*"
    //   try..catch: ...................... true
    //   default resolve on conflict: ..... true
    //   on-demand look-ahead: ............ false
    //   error recovery token skip maximum: 3
    //   yyerror in parse actions is: ..... NOT recoverable,
    //   yyerror in lexer actions and other non-fatal lexer are:
    //   .................................. NOT recoverable,
    //   debug grammar/output: ............ false
    //   has partial LR conflict upgrade:   true
    //   rudimentary token-stack support:   false
    //   parser table compression mode: ... 2
    //   export debug tables: ............. false
    //   export *all* tables: ............. false
    //   module type: ..................... commonjs
    //   parser engine type: .............. lalr
    //   output main() in the module: ..... true
    //   has user-specified main(): ....... false
    //   has user-specified require()/import modules for main():
    //   .................................. false
    //   number of expected conflicts: .... 0
    //
    //
    // Parser Analysis flags:
    //
    //   no significant actions (parser is a language matcher only):
    //   .................................. false
    //   uses yyleng: ..................... false
    //   uses yylineno: ................... false
    //   uses yytext: ..................... false
    //   uses yylloc: ..................... false
    //   uses ParseError API: ............. false
    //   uses YYERROR: .................... false
    //   uses YYRECOVERING: ............... false
    //   uses YYERROK: .................... false
    //   uses YYCLEARIN: .................. false
    //   tracks rule values: .............. true
    //   assigns rule values: ............. true
    //   uses location tracking: .......... false
    //   assigns location: ................ false
    //   uses yystack: .................... false
    //   uses yysstack: ................... false
    //   uses yysp: ....................... true
    //   uses yyrulelength: ............... false
    //   uses yyMergeLocationInfo API: .... false
    //   has error recovery: .............. false
    //   has error reporting: ............. false
    //
    // --------- END OF REPORT -----------

trace: function no_op_trace() { },
JisonParserError: JisonParserError,
yy: {},
options: {
  type: "lalr",
  hasPartialLrUpgradeOnConflict: true,
  errorRecoveryTokenDiscardCount: 3
},
symbols_: {
  "$accept": 0,
  "$end": 1,
  "ADD": 3,
  "ANGLE": 14,
  "CHS": 20,
  "CSS_VAR": 12,
  "DIV": 6,
  "EMS": 18,
  "EOF": 1,
  "EXS": 19,
  "FREQ": 16,
  "LENGTH": 13,
  "LPAREN": 7,
  "MUL": 5,
  "NESTED_CALC": 9,
  "NUMBER": 11,
  "PERCENTAGE": 26,
  "PREFIX": 10,
  "REMS": 21,
  "RES": 17,
  "RPAREN": 8,
  "SUB": 4,
  "TIME": 15,
  "VHS": 22,
  "VMAXS": 25,
  "VMINS": 24,
  "VWS": 23,
  "css_value": 31,
  "css_variable": 30,
  "error": 2,
  "expression": 27,
  "math_expression": 28,
  "value": 29
},
terminals_: {
  1: "EOF",
  2: "error",
  3: "ADD",
  4: "SUB",
  5: "MUL",
  6: "DIV",
  7: "LPAREN",
  8: "RPAREN",
  9: "NESTED_CALC",
  10: "PREFIX",
  11: "NUMBER",
  12: "CSS_VAR",
  13: "LENGTH",
  14: "ANGLE",
  15: "TIME",
  16: "FREQ",
  17: "RES",
  18: "EMS",
  19: "EXS",
  20: "CHS",
  21: "REMS",
  22: "VHS",
  23: "VWS",
  24: "VMINS",
  25: "VMAXS",
  26: "PERCENTAGE"
},
TERROR: 2,
    EOF: 1,

    // internals: defined here so the object *structure* doesn't get modified by parse() et al,
    // thus helping JIT compilers like Chrome V8.
    originalQuoteName: null,
    originalParseError: null,
    cleanupAfterParse: null,
    constructParseErrorInfo: null,
    yyMergeLocationInfo: null,

    __reentrant_call_depth: 0,      // INTERNAL USE ONLY
    __error_infos: [],              // INTERNAL USE ONLY: the set of parseErrorInfo objects created since the last cleanup
    __error_recovery_infos: [],     // INTERNAL USE ONLY: the set of parseErrorInfo objects created since the last cleanup

    // APIs which will be set up depending on user action code analysis:
    //yyRecovering: 0,
    //yyErrOk: 0,
    //yyClearIn: 0,

    // Helper APIs
    // -----------

    // Helper function which can be overridden by user code later on: put suitable quotes around
    // literal IDs in a description string.
    quoteName: function parser_quoteName(id_str) {
        return '"' + id_str + '"';
    },

    // Return the name of the given symbol (terminal or non-terminal) as a string, when available.
    //
    // Return NULL when the symbol is unknown to the parser.
    getSymbolName: function parser_getSymbolName(symbol) {
        if (this.terminals_[symbol]) {
            return this.terminals_[symbol];
        }

        // Otherwise... this might refer to a RULE token i.e. a non-terminal: see if we can dig that one up.
        //
        // An example of this may be where a rule's action code contains a call like this:
        //
        //      parser.getSymbolName(#$)
        //
        // to obtain a human-readable name of the current grammar rule.
        var s = this.symbols_;
        for (var key in s) {
            if (s[key] === symbol) {
                return key;
            }
        }
        return null;
    },

    // Return a more-or-less human-readable description of the given symbol, when available,
    // or the symbol itself, serving as its own 'description' for lack of something better to serve up.
    //
    // Return NULL when the symbol is unknown to the parser.
    describeSymbol: function parser_describeSymbol(symbol) {
        if (symbol !== this.EOF && this.terminal_descriptions_ && this.terminal_descriptions_[symbol]) {
            return this.terminal_descriptions_[symbol];
        }
        else if (symbol === this.EOF) {
            return 'end of input';
        }
        var id = this.getSymbolName(symbol);
        if (id) {
            return this.quoteName(id);
        }
        return null;
    },

    // Produce a (more or less) human-readable list of expected tokens at the point of failure.
    //
    // The produced list may contain token or token set descriptions instead of the tokens
    // themselves to help turning this output into something that easier to read by humans
    // unless `do_not_describe` parameter is set, in which case a list of the raw, *numeric*,
    // expected terminals and nonterminals is produced.
    //
    // The returned list (array) will not contain any duplicate entries.
    collect_expected_token_set: function parser_collect_expected_token_set(state, do_not_describe) {
        var TERROR = this.TERROR;
        var tokenset = [];
        var check = {};
        // Has this (error?) state been outfitted with a custom expectations description text for human consumption?
        // If so, use that one instead of the less palatable token set.
        if (!do_not_describe && this.state_descriptions_ && this.state_descriptions_[state]) {
            return [
                this.state_descriptions_[state]
            ];
        }
        for (var p in this.table[state]) {
            p = +p;
            if (p !== TERROR) {
                var d = do_not_describe ? p : this.describeSymbol(p);
                if (d && !check[d]) {
                    tokenset.push(d);
                    check[d] = true;        // Mark this token description as already mentioned to prevent outputting duplicate entries.
                }
            }
        }
        return tokenset;
    },
productions_: bp({
  pop: u([
  27,
  s,
  [28, 10],
  29,
  29,
  30,
  s,
  [31, 15]
]),
  rule: u([
  2,
  s,
  [3, 5],
  4,
  7,
  s,
  [1, 4],
  2,
  s,
  [1, 15],
  2
])
}),
performAction: function parser__PerformAction(yystate /* action[1] */, yysp, yyvstack) {

          /* this == yyval */

          // the JS engine itself can go and remove these statements when `yy` turns out to be unused in any action code!
          var yy = this.yy;
          var yyparser = yy.parser;
          var yylexer = yy.lexer;

          

          switch (yystate) {
case 0:
    /*! Production::    $accept : expression $end */

    // default action (generated by JISON mode classic/merge :: 1,VT,VA,-,-,-,-,-,-):
    this.$ = yyvstack[yysp - 1];
    // END of default action (generated by JISON mode classic/merge :: 1,VT,VA,-,-,-,-,-,-)
    break;

case 1:
    /*! Production::    expression : math_expression EOF */

    // default action (generated by JISON mode classic/merge :: 2,VT,VA,-,-,-,-,-,-):
    this.$ = yyvstack[yysp - 1];
    // END of default action (generated by JISON mode classic/merge :: 2,VT,VA,-,-,-,-,-,-)
    
    
    return yyvstack[yysp - 1];

case 2:
    /*! Production::    math_expression : math_expression ADD math_expression */
case 3:
    /*! Production::    math_expression : math_expression SUB math_expression */
case 4:
    /*! Production::    math_expression : math_expression MUL math_expression */
case 5:
    /*! Production::    math_expression : math_expression DIV math_expression */

    this.$ = { type: 'MathExpression', operator: yyvstack[yysp - 1], left: yyvstack[yysp - 2], right: yyvstack[yysp] };
    break;

case 6:
    /*! Production::    math_expression : LPAREN math_expression RPAREN */
case 7:
    /*! Production::    math_expression : NESTED_CALC LPAREN math_expression RPAREN */
case 8:
    /*! Production::    math_expression : SUB PREFIX SUB NESTED_CALC LPAREN math_expression RPAREN */

    this.$ = yyvstack[yysp - 1];
    break;

case 9:
    /*! Production::    math_expression : css_variable */
case 10:
    /*! Production::    math_expression : css_value */
case 11:
    /*! Production::    math_expression : value */

    this.$ = yyvstack[yysp];
    break;

case 12:
    /*! Production::    value : NUMBER */

    this.$ = { type: 'Value', value: parseFloat(yyvstack[yysp]) };
    break;

case 13:
    /*! Production::    value : SUB NUMBER */

    this.$ = { type: 'Value', value: parseFloat(yyvstack[yysp]) * -1 };
    break;

case 14:
    /*! Production::    css_variable : CSS_VAR */

    this.$ = { type: 'CssVariable', value: yyvstack[yysp] };
    break;

case 15:
    /*! Production::    css_value : LENGTH */

    this.$ = { type: 'LengthValue', value: parseFloat(yyvstack[yysp]), unit: /[a-z]+/.exec(yyvstack[yysp])[0] };
    break;

case 16:
    /*! Production::    css_value : ANGLE */

    this.$ = { type: 'AngleValue', value: parseFloat(yyvstack[yysp]), unit: /[a-z]+/.exec(yyvstack[yysp])[0] };
    break;

case 17:
    /*! Production::    css_value : TIME */

    this.$ = { type: 'TimeValue', value: parseFloat(yyvstack[yysp]), unit: /[a-z]+/.exec(yyvstack[yysp])[0] };
    break;

case 18:
    /*! Production::    css_value : FREQ */

    this.$ = { type: 'FrequencyValue', value: parseFloat(yyvstack[yysp]), unit: /[a-z]+/.exec(yyvstack[yysp])[0] };
    break;

case 19:
    /*! Production::    css_value : RES */

    this.$ = { type: 'ResolutionValue', value: parseFloat(yyvstack[yysp]), unit: /[a-z]+/.exec(yyvstack[yysp])[0] };
    break;

case 20:
    /*! Production::    css_value : EMS */

    this.$ = { type: 'EmValue', value: parseFloat(yyvstack[yysp]), unit: 'em' };
    break;

case 21:
    /*! Production::    css_value : EXS */

    this.$ = { type: 'ExValue', value: parseFloat(yyvstack[yysp]), unit: 'ex' };
    break;

case 22:
    /*! Production::    css_value : CHS */

    this.$ = { type: 'ChValue', value: parseFloat(yyvstack[yysp]), unit: 'ch' };
    break;

case 23:
    /*! Production::    css_value : REMS */

    this.$ = { type: 'RemValue', value: parseFloat(yyvstack[yysp]), unit: 'rem' };
    break;

case 24:
    /*! Production::    css_value : VHS */

    this.$ = { type: 'VhValue', value: parseFloat(yyvstack[yysp]), unit: 'vh' };
    break;

case 25:
    /*! Production::    css_value : VWS */

    this.$ = { type: 'VwValue', value: parseFloat(yyvstack[yysp]), unit: 'vw' };
    break;

case 26:
    /*! Production::    css_value : VMINS */

    this.$ = { type: 'VminValue', value: parseFloat(yyvstack[yysp]), unit: 'vmin' };
    break;

case 27:
    /*! Production::    css_value : VMAXS */

    this.$ = { type: 'VmaxValue', value: parseFloat(yyvstack[yysp]), unit: 'vmax' };
    break;

case 28:
    /*! Production::    css_value : PERCENTAGE */

    this.$ = { type: 'PercentageValue', value: parseFloat(yyvstack[yysp]), unit: '%' };
    break;

case 29:
    /*! Production::    css_value : SUB css_value */

    var prev = yyvstack[yysp]; prev.value *= -1; this.$ = prev;
    break;

}
},
table: bt({
  len: u([
  24,
  1,
  5,
  23,
  1,
  18,
  s,
  [0, 20],
  s,
  [23, 4],
  c,
  [28, 3],
  0,
  0,
  16,
  6,
  6,
  s,
  [0, 3],
  5,
  1,
  0,
  1,
  23,
  5,
  0
]),
  symbol: u([
  4,
  7,
  9,
  s,
  [11, 21, 1],
  1,
  1,
  s,
  [3, 4, 1],
  c,
  [30, 19],
  c,
  [29, 4],
  7,
  4,
  10,
  11,
  c,
  [22, 14],
  31,
  c,
  [42, 23],
  c,
  [23, 69],
  c,
  [138, 4],
  8,
  c,
  [51, 24],
  4,
  c,
  [137, 15],
  c,
  [184, 5],
  8,
  c,
  [6, 6],
  c,
  [5, 5],
  9,
  7,
  c,
  [87, 28]
]),
  type: u([
  s,
  [2, 19],
  s,
  [0, 5],
  1,
  s,
  [2, 24],
  s,
  [0, 4],
  c,
  [22, 19],
  c,
  [42, 41],
  c,
  [23, 70],
  c,
  [28, 25],
  c,
  [45, 25],
  c,
  [59, 23]
]),
  state: u([
  1,
  2,
  8,
  6,
  7,
  30,
  c,
  [4, 3],
  33,
  36,
  c,
  [5, 3],
  37,
  c,
  [4, 3],
  38,
  c,
  [4, 3],
  39,
  c,
  [4, 3],
  41,
  c,
  [21, 4],
  46,
  c,
  [5, 3]
]),
  mode: u([
  s,
  [1, 177],
  s,
  [2, 3],
  c,
  [5, 5],
  c,
  [6, 4],
  s,
  [1, 31]
]),
  goto: u([
  5,
  3,
  4,
  24,
  s,
  [9, 15, 1],
  s,
  [25, 5, 1],
  c,
  [24, 19],
  31,
  35,
  32,
  34,
  c,
  [18, 14],
  c,
  [37, 19],
  c,
  [19, 57],
  c,
  [117, 4],
  40,
  c,
  [24, 19],
  42,
  35,
  c,
  [16, 14],
  s,
  [2, 3],
  28,
  29,
  2,
  s,
  [3, 3],
  28,
  29,
  3,
  c,
  [52, 4],
  43,
  44,
  45,
  c,
  [78, 23],
  47
])
}),
defaultActions: bda({
  idx: u([
  s,
  [6, 20, 1],
  33,
  34,
  38,
  39,
  40,
  43,
  47
]),
  goto: u([
  9,
  10,
  11,
  s,
  [14, 15, 1],
  12,
  1,
  29,
  13,
  s,
  [4, 5, 1]
])
}),
parseError: function parseError(str, hash, ExceptionClass) {
    if (hash.recoverable) {
        if (typeof this.trace === 'function') {
            this.trace(str);
        }
        hash.destroy();             // destroy... well, *almost*!
    } else {
        if (typeof this.trace === 'function') {
            this.trace(str);
        }
        if (!ExceptionClass) {
            ExceptionClass = this.JisonParserError;
        }
        throw new ExceptionClass(str, hash);
    }
},
parse: function parse(input) {
    var self = this;
    var stack = new Array(128);         // token stack: stores token which leads to state at the same index (column storage)
    var sstack = new Array(128);        // state stack: stores states (column storage)

    var vstack = new Array(128);        // semantic value stack

    var table = this.table;
    var sp = 0;                         // 'stack pointer': index into the stacks


    


    var symbol = 0;



    var TERROR = this.TERROR;
    var EOF = this.EOF;
    var ERROR_RECOVERY_TOKEN_DISCARD_COUNT = (this.options.errorRecoveryTokenDiscardCount | 0) || 3;
    var NO_ACTION = [0, 48 /* === table.length :: ensures that anyone using this new state will fail dramatically! */];

    var lexer;
    if (this.__lexer__) {
        lexer = this.__lexer__;
    } else {
        lexer = this.__lexer__ = Object.create(this.lexer);
    }

    var sharedState_yy = {
        parseError: undefined,
        quoteName: undefined,
        lexer: undefined,
        parser: undefined,
        pre_parse: undefined,
        post_parse: undefined,
        pre_lex: undefined,
        post_lex: undefined      // WARNING: must be written this way for the code expanders to work correctly in both ES5 and ES6 modes!
    };

    var ASSERT;
    if (typeof assert !== 'function') {
        ASSERT = function JisonAssert(cond, msg) {
            if (!cond) {
                throw new Error('assertion failed: ' + (msg || '***'));
            }
        };
    } else {
        ASSERT = assert;
    }

    this.yyGetSharedState = function yyGetSharedState() {
        return sharedState_yy;
    };








    function shallow_copy_noclobber(dst, src) {
        for (var k in src) {
            if (typeof dst[k] === 'undefined' && Object.prototype.hasOwnProperty.call(src, k)) {
                dst[k] = src[k];
            }
        }
    }

    // copy state
    shallow_copy_noclobber(sharedState_yy, this.yy);

    sharedState_yy.lexer = lexer;
    sharedState_yy.parser = this;






    // Does the shared state override the default `parseError` that already comes with this instance?
    if (typeof sharedState_yy.parseError === 'function') {
        this.parseError = function parseErrorAlt(str, hash, ExceptionClass) {
            if (!ExceptionClass) {
                ExceptionClass = this.JisonParserError;
            }
            return sharedState_yy.parseError.call(this, str, hash, ExceptionClass);
        };
    } else {
        this.parseError = this.originalParseError;
    }

    // Does the shared state override the default `quoteName` that already comes with this instance?
    if (typeof sharedState_yy.quoteName === 'function') {
        this.quoteName = function quoteNameAlt(id_str) {
            return sharedState_yy.quoteName.call(this, id_str);
        };
    } else {
        this.quoteName = this.originalQuoteName;
    }

    // set up the cleanup function; make it an API so that external code can re-use this one in case of
    // calamities or when the `%options no-try-catch` option has been specified for the grammar, in which
    // case this parse() API method doesn't come with a `finally { ... }` block any more!
    //
    // NOTE: as this API uses parse() as a closure, it MUST be set again on every parse() invocation,
    //       or else your `sharedState`, etc. references will be *wrong*!
    this.cleanupAfterParse = function parser_cleanupAfterParse(resultValue, invoke_post_methods, do_not_nuke_errorinfos) {
        var rv;

        if (invoke_post_methods) {
            var hash;

            if (sharedState_yy.post_parse || this.post_parse) {
                // create an error hash info instance: we re-use this API in a **non-error situation**
                // as this one delivers all parser internals ready for access by userland code.
                hash = this.constructParseErrorInfo(null /* no error! */, null /* no exception! */, null, false);
            }

            if (sharedState_yy.post_parse) {
                rv = sharedState_yy.post_parse.call(this, sharedState_yy, resultValue, hash);
                if (typeof rv !== 'undefined') resultValue = rv;
            }
            if (this.post_parse) {
                rv = this.post_parse.call(this, sharedState_yy, resultValue, hash);
                if (typeof rv !== 'undefined') resultValue = rv;
            }

            // cleanup:
            if (hash && hash.destroy) {
                hash.destroy();
            }
        }

        if (this.__reentrant_call_depth > 1) return resultValue;        // do not (yet) kill the sharedState when this is a reentrant run.

        // clean up the lingering lexer structures as well:
        if (lexer.cleanupAfterLex) {
            lexer.cleanupAfterLex(do_not_nuke_errorinfos);
        }

        // prevent lingering circular references from causing memory leaks:
        if (sharedState_yy) {
            sharedState_yy.lexer = undefined;
            sharedState_yy.parser = undefined;
            if (lexer.yy === sharedState_yy) {
                lexer.yy = undefined;
            }
        }
        sharedState_yy = undefined;
        this.parseError = this.originalParseError;
        this.quoteName = this.originalQuoteName;

        // nuke the vstack[] array at least as that one will still reference obsoleted user values.
        // To be safe, we nuke the other internal stack columns as well...
        stack.length = 0;               // fastest way to nuke an array without overly bothering the GC
        sstack.length = 0;

        vstack.length = 0;
        sp = 0;

        // nuke the error hash info instances created during this run.
        // Userland code must COPY any data/references
        // in the error hash instance(s) it is more permanently interested in.
        if (!do_not_nuke_errorinfos) {
            for (var i = this.__error_infos.length - 1; i >= 0; i--) {
                var el = this.__error_infos[i];
                if (el && typeof el.destroy === 'function') {
                    el.destroy();
                }
            }
            this.__error_infos.length = 0;


        }

        return resultValue;
    };






































































































































    // NOTE: as this API uses parse() as a closure, it MUST be set again on every parse() invocation,
    //       or else your `lexer`, `sharedState`, etc. references will be *wrong*!
    this.constructParseErrorInfo = function parser_constructParseErrorInfo(msg, ex, expected, recoverable) {
        var pei = {
            errStr: msg,
            exception: ex,
            text: lexer.match,
            value: lexer.yytext,
            token: this.describeSymbol(symbol) || symbol,
            token_id: symbol,
            line: lexer.yylineno,

            expected: expected,
            recoverable: recoverable,
            state: state,
            action: action,
            new_state: newState,
            symbol_stack: stack,
            state_stack: sstack,
            value_stack: vstack,

            stack_pointer: sp,
            yy: sharedState_yy,
            lexer: lexer,
            parser: this,

            // and make sure the error info doesn't stay due to potential
            // ref cycle via userland code manipulations.
            // These would otherwise all be memory leak opportunities!
            //
            // Note that only array and object references are nuked as those
            // constitute the set of elements which can produce a cyclic ref.
            // The rest of the members is kept intact as they are harmless.
            destroy: function destructParseErrorInfo() {
                // remove cyclic references added to error info:
                // info.yy = null;
                // info.lexer = null;
                // info.value = null;
                // info.value_stack = null;
                // ...
                var rec = !!this.recoverable;
                for (var key in this) {
                    if (this.hasOwnProperty(key) && typeof key === 'object') {
                        this[key] = undefined;
                    }
                }
                this.recoverable = rec;
            }
        };
        // track this instance so we can `destroy()` it once we deem it superfluous and ready for garbage collection!
        this.__error_infos.push(pei);
        return pei;
    };


    function stdLex() {
        var token = lexer.lex();
        // if token isn't its numeric value, convert
        if (typeof token !== 'number') {
            token = self.symbols_[token] || token;
        }

        return token || EOF;
    }

    function fastLex() {
        var token = lexer.fastLex();
        // if token isn't its numeric value, convert
        if (typeof token !== 'number') {
            token = self.symbols_[token] || token;
        }

        return token || EOF;
    }

    var lex = stdLex;


    var state, action, r, t;
    var yyval = {
        $: true,
        _$: undefined,
        yy: sharedState_yy
    };
    var p;
    var yyrulelen;
    var this_production;
    var newState;
    var retval = false;


    try {
        this.__reentrant_call_depth++;

        lexer.setInput(input, sharedState_yy);

        // NOTE: we *assume* no lexer pre/post handlers are set up *after* 
        // this initial `setInput()` call: hence we can now check and decide
        // whether we'll go with the standard, slower, lex() API or the
        // `fast_lex()` one:
        if (typeof lexer.canIUse === 'function') {
            var lexerInfo = lexer.canIUse();
            if (lexerInfo.fastLex && typeof fastLex === 'function') {
                lex = fastLex;
            }
        } 



        vstack[sp] = null;
        sstack[sp] = 0;
        stack[sp] = 0;
        ++sp;





        if (this.pre_parse) {
            this.pre_parse.call(this, sharedState_yy);
        }
        if (sharedState_yy.pre_parse) {
            sharedState_yy.pre_parse.call(this, sharedState_yy);
        }

        newState = sstack[sp - 1];
        for (;;) {
            // retrieve state number from top of stack
            state = newState;               // sstack[sp - 1];

            // use default actions if available
            if (this.defaultActions[state]) {
                action = 2;
                newState = this.defaultActions[state];
            } else {
                // The single `==` condition below covers both these `===` comparisons in a single
                // operation:
                //
                //     if (symbol === null || typeof symbol === 'undefined') ...
                if (!symbol) {
                    symbol = lex();
                }
                // read action for current state and first input
                t = (table[state] && table[state][symbol]) || NO_ACTION;
                newState = t[1];
                action = t[0];











                // handle parse error
                if (!action) {
                    var errStr;
                    var errSymbolDescr = (this.describeSymbol(symbol) || symbol);
                    var expected = this.collect_expected_token_set(state);

                    // Report error
                    if (typeof lexer.yylineno === 'number') {
                        errStr = 'Parse error on line ' + (lexer.yylineno + 1) + ': ';
                    } else {
                        errStr = 'Parse error: ';
                    }
                    if (typeof lexer.showPosition === 'function') {
                        errStr += '\n' + lexer.showPosition(79 - 10, 10) + '\n';
                    }
                    if (expected.length) {
                        errStr += 'Expecting ' + expected.join(', ') + ', got unexpected ' + errSymbolDescr;
                    } else {
                        errStr += 'Unexpected ' + errSymbolDescr;
                    }
                    // we cannot recover from the error!
                    p = this.constructParseErrorInfo(errStr, null, expected, false);
                    r = this.parseError(p.errStr, p, this.JisonParserError);
                    if (typeof r !== 'undefined') {
                        retval = r;
                    }
                    break;
                }


            }










            switch (action) {
            // catch misc. parse failures:
            default:
                // this shouldn't happen, unless resolve defaults are off
                if (action instanceof Array) {
                    p = this.constructParseErrorInfo('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol, null, null, false);
                    r = this.parseError(p.errStr, p, this.JisonParserError);
                    if (typeof r !== 'undefined') {
                        retval = r;
                    }
                    break;
                }
                // Another case of better safe than sorry: in case state transitions come out of another error recovery process
                // or a buggy LUT (LookUp Table):
                p = this.constructParseErrorInfo('Parsing halted. No viable error recovery approach available due to internal system failure.', null, null, false);
                r = this.parseError(p.errStr, p, this.JisonParserError);
                if (typeof r !== 'undefined') {
                    retval = r;
                }
                break;

            // shift:
            case 1:
                stack[sp] = symbol;
                vstack[sp] = lexer.yytext;

                sstack[sp] = newState; // push state

                ++sp;
                symbol = 0;




                // Pick up the lexer details for the current symbol as that one is not 'look-ahead' any more:




                continue;

            // reduce:
            case 2:



                this_production = this.productions_[newState - 1];  // `this.productions_[]` is zero-based indexed while states start from 1 upwards...
                yyrulelen = this_production[1];










                r = this.performAction.call(yyval, newState, sp - 1, vstack);

                if (typeof r !== 'undefined') {
                    retval = r;
                    break;
                }

                // pop off stack
                sp -= yyrulelen;

                // don't overwrite the `symbol` variable: use a local var to speed things up:
                var ntsymbol = this_production[0];    // push nonterminal (reduce)
                stack[sp] = ntsymbol;
                vstack[sp] = yyval.$;

                // goto new state = table[STATE][NONTERMINAL]
                newState = table[sstack[sp - 1]][ntsymbol];
                sstack[sp] = newState;
                ++sp;









                continue;

            // accept:
            case 3:
                if (sp !== -2) {
                    retval = true;
                    // Return the `$accept` rule's `$$` result, if available.
                    //
                    // Also note that JISON always adds this top-most `$accept` rule (with implicit,
                    // default, action):
                    //
                    //     $accept: <startSymbol> $end
                    //                  %{ $$ = $1; @$ = @1; %}
                    //
                    // which, combined with the parse kernel's `$accept` state behaviour coded below,
                    // will produce the `$$` value output of the <startSymbol> rule as the parse result,
                    // IFF that result is *not* `undefined`. (See also the parser kernel code.)
                    //
                    // In code:
                    //
                    //                  %{
                    //                      @$ = @1;            // if location tracking support is included
                    //                      if (typeof $1 !== 'undefined')
                    //                          return $1;
                    //                      else
                    //                          return true;           // the default parse result if the rule actions don't produce anything
                    //                  %}
                    sp--;
                    if (typeof vstack[sp] !== 'undefined') {
                        retval = vstack[sp];
                    }
                }
                break;
            }

            // break out of loop: we accept or fail with error
            break;
        }
    } catch (ex) {
        // report exceptions through the parseError callback too, but keep the exception intact
        // if it is a known parser or lexer error which has been thrown by parseError() already:
        if (ex instanceof this.JisonParserError) {
            throw ex;
        }
        else if (lexer && typeof lexer.JisonLexerError === 'function' && ex instanceof lexer.JisonLexerError) {
            throw ex;
        }

        p = this.constructParseErrorInfo('Parsing aborted due to exception.', ex, null, false);
        retval = false;
        r = this.parseError(p.errStr, p, this.JisonParserError);
        if (typeof r !== 'undefined') {
            retval = r;
        }
    } finally {
        retval = this.cleanupAfterParse(retval, true, true);
        this.__reentrant_call_depth--;
    }   // /finally

    return retval;
}
};
parser.originalParseError = parser.parseError;
parser.originalQuoteName = parser.quoteName;
/* lexer generated by jison-lex 0.6.1-215 */

/*
 * Returns a Lexer object of the following structure:
 *
 *  Lexer: {
 *    yy: {}     The so-called "shared state" or rather the *source* of it;
 *               the real "shared state" `yy` passed around to
 *               the rule actions, etc. is a direct reference!
 *
 *               This "shared context" object was passed to the lexer by way of 
 *               the `lexer.setInput(str, yy)` API before you may use it.
 *
 *               This "shared context" object is passed to the lexer action code in `performAction()`
 *               so userland code in the lexer actions may communicate with the outside world 
 *               and/or other lexer rules' actions in more or less complex ways.
 *
 *  }
 *
 *  Lexer.prototype: {
 *    EOF: 1,
 *    ERROR: 2,
 *
 *    yy:        The overall "shared context" object reference.
 *
 *    JisonLexerError: function(msg, hash),
 *
 *    performAction: function lexer__performAction(yy, yyrulenumber, YY_START),
 *
 *               The function parameters and `this` have the following value/meaning:
 *               - `this`    : reference to the `lexer` instance. 
 *                               `yy_` is an alias for `this` lexer instance reference used internally.
 *
 *               - `yy`      : a reference to the `yy` "shared state" object which was passed to the lexer
 *                             by way of the `lexer.setInput(str, yy)` API before.
 *
 *                             Note:
 *                             The extra arguments you specified in the `%parse-param` statement in your
 *                             **parser** grammar definition file are passed to the lexer via this object
 *                             reference as member variables.
 *
 *               - `yyrulenumber`   : index of the matched lexer rule (regex), used internally.
 *
 *               - `YY_START`: the current lexer "start condition" state.
 *
 *    parseError: function(str, hash, ExceptionClass),
 *
 *    constructLexErrorInfo: function(error_message, is_recoverable),
 *               Helper function.
 *               Produces a new errorInfo 'hash object' which can be passed into `parseError()`.
 *               See it's use in this lexer kernel in many places; example usage:
 *
 *                   var infoObj = lexer.constructParseErrorInfo('fail!', true);
 *                   var retVal = lexer.parseError(infoObj.errStr, infoObj, lexer.JisonLexerError);
 *
 *    options: { ... lexer %options ... },
 *
 *    lex: function(),
 *               Produce one token of lexed input, which was passed in earlier via the `lexer.setInput()` API.
 *               You MAY use the additional `args...` parameters as per `%parse-param` spec of the **lexer** grammar:
 *               these extra `args...` are added verbatim to the `yy` object reference as member variables.
 *
 *               WARNING:
 *               Lexer's additional `args...` parameters (via lexer's `%parse-param`) MAY conflict with
 *               any attributes already added to `yy` by the **parser** or the jison run-time; 
 *               when such a collision is detected an exception is thrown to prevent the generated run-time 
 *               from silently accepting this confusing and potentially hazardous situation! 
 *
 *    cleanupAfterLex: function(do_not_nuke_errorinfos),
 *               Helper function.
 *
 *               This helper API is invoked when the **parse process** has completed: it is the responsibility
 *               of the **parser** (or the calling userland code) to invoke this method once cleanup is desired. 
 *
 *               This helper may be invoked by user code to ensure the internal lexer gets properly garbage collected.
 *
 *    setInput: function(input, [yy]),
 *
 *
 *    input: function(),
 *
 *
 *    unput: function(str),
 *
 *
 *    more: function(),
 *
 *
 *    reject: function(),
 *
 *
 *    less: function(n),
 *
 *
 *    pastInput: function(n),
 *
 *
 *    upcomingInput: function(n),
 *
 *
 *    showPosition: function(),
 *
 *
 *    test_match: function(regex_match_array, rule_index),
 *
 *
 *    next: function(),
 *
 *
 *    begin: function(condition),
 *
 *
 *    pushState: function(condition),
 *
 *
 *    popState: function(),
 *
 *
 *    topState: function(),
 *
 *
 *    _currentRules: function(),
 *
 *
 *    stateStackSize: function(),
 *
 *
 *    performAction: function(yy, yy_, yyrulenumber, YY_START),
 *
 *
 *    rules: [...],
 *
 *
 *    conditions: {associative list: name ==> set},
 *  }
 *
 *
 *  token location info (`yylloc`): {
 *    first_line: n,
 *    last_line: n,
 *    first_column: n,
 *    last_column: n,
 *    range: [start_number, end_number]
 *               (where the numbers are indexes into the input string, zero-based)
 *  }
 *
 * ---
 *
 * The `parseError` function receives a 'hash' object with these members for lexer errors:
 *
 *  {
 *    text:        (matched text)
 *    token:       (the produced terminal token, if any)
 *    token_id:    (the produced terminal token numeric ID, if any)
 *    line:        (yylineno)
 *    loc:         (yylloc)
 *    recoverable: (boolean: TRUE when the parser MAY have an error recovery rule
 *                  available for this particular error)
 *    yy:          (object: the current parser internal "shared state" `yy`
 *                  as is also available in the rule actions; this can be used,
 *                  for instance, for advanced error analysis and reporting)
 *    lexer:       (reference to the current lexer instance used by the parser)
 *  }
 *
 * while `this` will reference the current lexer instance.
 *
 * When `parseError` is invoked by the lexer, the default implementation will
 * attempt to invoke `yy.parser.parseError()`; when this callback is not provided
 * it will try to invoke `yy.parseError()` instead. When that callback is also not
 * provided, a `JisonLexerError` exception will be thrown containing the error
 * message and `hash`, as constructed by the `constructLexErrorInfo()` API.
 *
 * Note that the lexer's `JisonLexerError` error class is passed via the
 * `ExceptionClass` argument, which is invoked to construct the exception
 * instance to be thrown, so technically `parseError` will throw the object
 * produced by the `new ExceptionClass(str, hash)` JavaScript expression.
 *
 * ---
 *
 * You can specify lexer options by setting / modifying the `.options` object of your Lexer instance.
 * These options are available:
 *
 * (Options are permanent.)
 *  
 *  yy: {
 *      parseError: function(str, hash, ExceptionClass)
 *                 optional: overrides the default `parseError` function.
 *  }
 *
 *  lexer.options: {
 *      pre_lex:  function()
 *                 optional: is invoked before the lexer is invoked to produce another token.
 *                 `this` refers to the Lexer object.
 *      post_lex: function(token) { return token; }
 *                 optional: is invoked when the lexer has produced a token `token`;
 *                 this function can override the returned token value by returning another.
 *                 When it does not return any (truthy) value, the lexer will return
 *                 the original `token`.
 *                 `this` refers to the Lexer object.
 *
 * WARNING: the next set of options are not meant to be changed. They echo the abilities of
 * the lexer as per when it was compiled!
 *
 *      ranges: boolean
 *                 optional: `true` ==> token location info will include a .range[] member.
 *      flex: boolean
 *                 optional: `true` ==> flex-like lexing behaviour where the rules are tested
 *                 exhaustively to find the longest match.
 *      backtrack_lexer: boolean
 *                 optional: `true` ==> lexer regexes are tested in order and for invoked;
 *                 the lexer terminates the scan when a token is returned by the action code.
 *      xregexp: boolean
 *                 optional: `true` ==> lexer rule regexes are "extended regex format" requiring the
 *                 `XRegExp` library. When this %option has not been specified at compile time, all lexer
 *                 rule regexes have been written as standard JavaScript RegExp expressions.
 *  }
 */


var lexer = function() {
  /**
   * See also:
   * http://stackoverflow.com/questions/1382107/whats-a-good-way-to-extend-error-in-javascript/#35881508
   * but we keep the prototype.constructor and prototype.name assignment lines too for compatibility
   * with userland code which might access the derived class in a 'classic' way.
   *
   * @public
   * @constructor
   * @nocollapse
   */
  function JisonLexerError(msg, hash) {
    Object.defineProperty(this, 'name', {
      enumerable: false,
      writable: false,
      value: 'JisonLexerError'
    });

    if (msg == null)
      msg = '???';

    Object.defineProperty(this, 'message', {
      enumerable: false,
      writable: true,
      value: msg
    });

    this.hash = hash;
    var stacktrace;

    if (hash && hash.exception instanceof Error) {
      var ex2 = hash.exception;
      this.message = ex2.message || msg;
      stacktrace = ex2.stack;
    }

    if (!stacktrace) {
      if (Error.hasOwnProperty('captureStackTrace')) {
        // V8
        Error.captureStackTrace(this, this.constructor);
      } else {
        stacktrace = new Error(msg).stack;
      }
    }

    if (stacktrace) {
      Object.defineProperty(this, 'stack', {
        enumerable: false,
        writable: false,
        value: stacktrace
      });
    }
  }

  if (typeof Object.setPrototypeOf === 'function') {
    Object.setPrototypeOf(JisonLexerError.prototype, Error.prototype);
  } else {
    JisonLexerError.prototype = Object.create(Error.prototype);
  }

  JisonLexerError.prototype.constructor = JisonLexerError;
  JisonLexerError.prototype.name = 'JisonLexerError';

  var lexer = {
    
// Code Generator Information Report
// ---------------------------------
//
// Options:
//
//   backtracking: .................... false
//   location.ranges: ................. false
//   location line+column tracking: ... true
//
//
// Forwarded Parser Analysis flags:
//
//   uses yyleng: ..................... false
//   uses yylineno: ................... false
//   uses yytext: ..................... false
//   uses yylloc: ..................... false
//   uses lexer values: ............... true / true
//   location tracking: ............... false
//   location assignment: ............. false
//
//
// Lexer Analysis flags:
//
//   uses yyleng: ..................... ???
//   uses yylineno: ................... ???
//   uses yytext: ..................... ???
//   uses yylloc: ..................... ???
//   uses ParseError API: ............. ???
//   uses yyerror: .................... ???
//   uses location tracking & editing:  ???
//   uses more() API: ................. ???
//   uses unput() API: ................ ???
//   uses reject() API: ............... ???
//   uses less() API: ................. ???
//   uses display APIs pastInput(), upcomingInput(), showPosition():
//        ............................. ???
//   uses describeYYLLOC() API: ....... ???
//
// --------- END OF REPORT -----------

EOF: 1,
    ERROR: 2,

    // JisonLexerError: JisonLexerError,        /// <-- injected by the code generator

    // options: {},                             /// <-- injected by the code generator

    // yy: ...,                                 /// <-- injected by setInput()

    __currentRuleSet__: null,                   /// INTERNAL USE ONLY: internal rule set cache for the current lexer state  

    __error_infos: [],                          /// INTERNAL USE ONLY: the set of lexErrorInfo objects created since the last cleanup  
    __decompressed: false,                      /// INTERNAL USE ONLY: mark whether the lexer instance has been 'unfolded' completely and is now ready for use  
    done: false,                                /// INTERNAL USE ONLY  
    _backtrack: false,                          /// INTERNAL USE ONLY  
    _input: '',                                 /// INTERNAL USE ONLY  
    _more: false,                               /// INTERNAL USE ONLY  
    _signaled_error_token: false,               /// INTERNAL USE ONLY  
    conditionStack: [],                         /// INTERNAL USE ONLY; managed via `pushState()`, `popState()`, `topState()` and `stateStackSize()`  
    match: '',                                  /// READ-ONLY EXTERNAL ACCESS - ADVANCED USE ONLY: tracks input which has been matched so far for the lexer token under construction. `match` is identical to `yytext` except that this one still contains the matched input string after `lexer.performAction()` has been invoked, where userland code MAY have changed/replaced the `yytext` value entirely!  
    matched: '',                                /// READ-ONLY EXTERNAL ACCESS - ADVANCED USE ONLY: tracks entire input which has been matched so far  
    matches: false,                             /// READ-ONLY EXTERNAL ACCESS - ADVANCED USE ONLY: tracks RE match result for last (successful) match attempt  
    yytext: '',                                 /// ADVANCED USE ONLY: tracks input which has been matched so far for the lexer token under construction; this value is transferred to the parser as the 'token value' when the parser consumes the lexer token produced through a call to the `lex()` API.  
    offset: 0,                                  /// READ-ONLY EXTERNAL ACCESS - ADVANCED USE ONLY: tracks the 'cursor position' in the input string, i.e. the number of characters matched so far  
    yyleng: 0,                                  /// READ-ONLY EXTERNAL ACCESS - ADVANCED USE ONLY: length of matched input for the token under construction (`yytext`)  
    yylineno: 0,                                /// READ-ONLY EXTERNAL ACCESS - ADVANCED USE ONLY: 'line number' at which the token under construction is located  
    yylloc: null,                               /// READ-ONLY EXTERNAL ACCESS - ADVANCED USE ONLY: tracks location info (lines + columns) for the token under construction  

    /**
     * INTERNAL USE: construct a suitable error info hash object instance for `parseError`.
     * 
     * @public
     * @this {RegExpLexer}
     */
    constructLexErrorInfo: function lexer_constructLexErrorInfo(msg, recoverable, show_input_position) {
      msg = '' + msg;

      // heuristic to determine if the error message already contains a (partial) source code dump
      // as produced by either `showPosition()` or `prettyPrintRange()`:
      if (show_input_position == undefined) {
        show_input_position = !(msg.indexOf('\n') > 0 && msg.indexOf('^') > 0);
      }

      if (this.yylloc && show_input_position) {
        if (typeof this.prettyPrintRange === 'function') {
          var pretty_src = this.prettyPrintRange(this.yylloc);

          if (!/\n\s*$/.test(msg)) {
            msg += '\n';
          }

          msg += '\n  Erroneous area:\n' + this.prettyPrintRange(this.yylloc);
        } else if (typeof this.showPosition === 'function') {
          var pos_str = this.showPosition();

          if (pos_str) {
            if (msg.length && msg[msg.length - 1] !== '\n' && pos_str[0] !== '\n') {
              msg += '\n' + pos_str;
            } else {
              msg += pos_str;
            }
          }
        }
      }

      /** @constructor */
      var pei = {
        errStr: msg,
        recoverable: !!recoverable,
        text: this.match,           // This one MAY be empty; userland code should use the `upcomingInput` API to obtain more text which follows the 'lexer cursor position'...  
        token: null,
        line: this.yylineno,
        loc: this.yylloc,
        yy: this.yy,
        lexer: this,

        /**
         * and make sure the error info doesn't stay due to potential
         * ref cycle via userland code manipulations.
         * These would otherwise all be memory leak opportunities!
         * 
         * Note that only array and object references are nuked as those
         * constitute the set of elements which can produce a cyclic ref.
         * The rest of the members is kept intact as they are harmless.
         * 
         * @public
         * @this {LexErrorInfo}
         */
        destroy: function destructLexErrorInfo() {
          // remove cyclic references added to error info:
          // info.yy = null;
          // info.lexer = null;
          // ...
          var rec = !!this.recoverable;

          for (var key in this) {
            if (this.hasOwnProperty(key) && typeof key === 'object') {
              this[key] = undefined;
            }
          }

          this.recoverable = rec;
        }
      };

      // track this instance so we can `destroy()` it once we deem it superfluous and ready for garbage collection!
      this.__error_infos.push(pei);

      return pei;
    },

    /**
     * handler which is invoked when a lexer error occurs.
     * 
     * @public
     * @this {RegExpLexer}
     */
    parseError: function lexer_parseError(str, hash, ExceptionClass) {
      if (!ExceptionClass) {
        ExceptionClass = this.JisonLexerError;
      }

      if (this.yy) {
        if (this.yy.parser && typeof this.yy.parser.parseError === 'function') {
          return this.yy.parser.parseError.call(this, str, hash, ExceptionClass) || this.ERROR;
        } else if (typeof this.yy.parseError === 'function') {
          return this.yy.parseError.call(this, str, hash, ExceptionClass) || this.ERROR;
        }
      }

      throw new ExceptionClass(str, hash);
    },

    /**
     * method which implements `yyerror(str, ...args)` functionality for use inside lexer actions.
     * 
     * @public
     * @this {RegExpLexer}
     */
    yyerror: function yyError(str /*, ...args */) {
      var lineno_msg = '';

      if (this.yylloc) {
        lineno_msg = ' on line ' + (this.yylineno + 1);
      }

      var p = this.constructLexErrorInfo(
        'Lexical error' + lineno_msg + ': ' + str,
        this.options.lexerErrorsAreRecoverable
      );

      // Add any extra args to the hash under the name `extra_error_attributes`:
      var args = Array.prototype.slice.call(arguments, 1);

      if (args.length) {
        p.extra_error_attributes = args;
      }

      return this.parseError(p.errStr, p, this.JisonLexerError) || this.ERROR;
    },

    /**
     * final cleanup function for when we have completed lexing the input;
     * make it an API so that external code can use this one once userland
     * code has decided it's time to destroy any lingering lexer error
     * hash object instances and the like: this function helps to clean
     * up these constructs, which *may* carry cyclic references which would
     * otherwise prevent the instances from being properly and timely
     * garbage-collected, i.e. this function helps prevent memory leaks!
     * 
     * @public
     * @this {RegExpLexer}
     */
    cleanupAfterLex: function lexer_cleanupAfterLex(do_not_nuke_errorinfos) {
      // prevent lingering circular references from causing memory leaks:
      this.setInput('', {});

      // nuke the error hash info instances created during this run.
      // Userland code must COPY any data/references
      // in the error hash instance(s) it is more permanently interested in.
      if (!do_not_nuke_errorinfos) {
        for (var i = this.__error_infos.length - 1; i >= 0; i--) {
          var el = this.__error_infos[i];

          if (el && typeof el.destroy === 'function') {
            el.destroy();
          }
        }

        this.__error_infos.length = 0;
      }

      return this;
    },

    /**
     * clear the lexer token context; intended for internal use only
     * 
     * @public
     * @this {RegExpLexer}
     */
    clear: function lexer_clear() {
      this.yytext = '';
      this.yyleng = 0;
      this.match = '';

      // - DO NOT reset `this.matched`
      this.matches = false;

      this._more = false;
      this._backtrack = false;
      var col = (this.yylloc ? this.yylloc.last_column : 0);

      this.yylloc = {
        first_line: this.yylineno + 1,
        first_column: col,
        last_line: this.yylineno + 1,
        last_column: col,
        range: [this.offset, this.offset]
      };
    },

    /**
     * resets the lexer, sets new input
     * 
     * @public
     * @this {RegExpLexer}
     */
    setInput: function lexer_setInput(input, yy) {
      this.yy = yy || this.yy || {};

      // also check if we've fully initialized the lexer instance,
      // including expansion work to be done to go from a loaded
      // lexer to a usable lexer:
      if (!this.__decompressed) {
        // step 1: decompress the regex list:
        var rules = this.rules;

        for (var i = 0, len = rules.length; i < len; i++) {
          var rule_re = rules[i];

          // compression: is the RE an xref to another RE slot in the rules[] table?
          if (typeof rule_re === 'number') {
            rules[i] = rules[rule_re];
          }
        }

        // step 2: unfold the conditions[] set to make these ready for use:
        var conditions = this.conditions;

        for (var k in conditions) {
          var spec = conditions[k];
          var rule_ids = spec.rules;
          var len = rule_ids.length;
          var rule_regexes = new Array(len + 1);             // slot 0 is unused; we use a 1-based index approach here to keep the hottest code in `lexer_next()` fast and simple! 
          var rule_new_ids = new Array(len + 1);

          for (var i = 0; i < len; i++) {
            var idx = rule_ids[i];
            var rule_re = rules[idx];
            rule_regexes[i + 1] = rule_re;
            rule_new_ids[i + 1] = idx;
          }

          spec.rules = rule_new_ids;
          spec.__rule_regexes = rule_regexes;
          spec.__rule_count = len;
        }

        this.__decompressed = true;
      }

      this._input = input || '';
      this.clear();
      this._signaled_error_token = false;
      this.done = false;
      this.yylineno = 0;
      this.matched = '';
      this.conditionStack = ['INITIAL'];
      this.__currentRuleSet__ = null;

      this.yylloc = {
        first_line: 1,
        first_column: 0,
        last_line: 1,
        last_column: 0,
        range: [0, 0]
      };

      this.offset = 0;
      return this;
    },

    /**
     * edit the remaining input via user-specified callback.
     * This can be used to forward-adjust the input-to-parse, 
     * e.g. inserting macro expansions and alike in the
     * input which has yet to be lexed.
     * The behaviour of this API contrasts the `unput()` et al
     * APIs as those act on the *consumed* input, while this
     * one allows one to manipulate the future, without impacting
     * the current `yyloc` cursor location or any history. 
     * 
     * Use this API to help implement C-preprocessor-like
     * `#include` statements, etc.
     * 
     * The provided callback must be synchronous and is
     * expected to return the edited input (string).
     *
     * The `cpsArg` argument value is passed to the callback
     * as-is.
     *
     * `callback` interface: 
     * `function callback(input, cpsArg)`
     * 
     * - `input` will carry the remaining-input-to-lex string
     *   from the lexer.
     * - `cpsArg` is `cpsArg` passed into this API.
     * 
     * The `this` reference for the callback will be set to
     * reference this lexer instance so that userland code
     * in the callback can easily and quickly access any lexer
     * API. 
     *
     * When the callback returns a non-string-type falsey value,
     * we assume the callback did not edit the input and we
     * will using the input as-is.
     *
     * When the callback returns a non-string-type value, it
     * is converted to a string for lexing via the `"" + retval`
     * operation. (See also why: http://2ality.com/2012/03/converting-to-string.html 
     * -- that way any returned object's `toValue()` and `toString()`
     * methods will be invoked in a proper/desirable order.)
     * 
     * @public
     * @this {RegExpLexer}
     */
    editRemainingInput: function lexer_editRemainingInput(callback, cpsArg) {
      var rv = callback.call(this, this._input, cpsArg);

      if (typeof rv !== 'string') {
        if (rv) {
          this._input = '' + rv;
        } 
        // else: keep `this._input` as is.  
      } else {
        this._input = rv;
      }

      return this;
    },

    /**
     * consumes and returns one char from the input
     * 
     * @public
     * @this {RegExpLexer}
     */
    input: function lexer_input() {
      if (!this._input) {
        //this.done = true;    -- don't set `done` as we want the lex()/next() API to be able to produce one custom EOF token match after this anyhow. (lexer can match special <<EOF>> tokens and perform user action code for a <<EOF>> match, but only does so *once*)
        return null;
      }

      var ch = this._input[0];
      this.yytext += ch;
      this.yyleng++;
      this.offset++;
      this.match += ch;
      this.matched += ch;

      // Count the linenumber up when we hit the LF (or a stand-alone CR).
      // On CRLF, the linenumber is incremented when you fetch the CR or the CRLF combo
      // and we advance immediately past the LF as well, returning both together as if
      // it was all a single 'character' only.
      var slice_len = 1;

      var lines = false;

      if (ch === '\n') {
        lines = true;
      } else if (ch === '\r') {
        lines = true;
        var ch2 = this._input[1];

        if (ch2 === '\n') {
          slice_len++;
          ch += ch2;
          this.yytext += ch2;
          this.yyleng++;
          this.offset++;
          this.match += ch2;
          this.matched += ch2;
          this.yylloc.range[1]++;
        }
      }

      if (lines) {
        this.yylineno++;
        this.yylloc.last_line++;
        this.yylloc.last_column = 0;
      } else {
        this.yylloc.last_column++;
      }

      this.yylloc.range[1]++;
      this._input = this._input.slice(slice_len);
      return ch;
    },

    /**
     * unshifts one char (or an entire string) into the input
     * 
     * @public
     * @this {RegExpLexer}
     */
    unput: function lexer_unput(ch) {
      var len = ch.length;
      var lines = ch.split(/(?:\r\n?|\n)/g);
      this._input = ch + this._input;
      this.yytext = this.yytext.substr(0, this.yytext.length - len);
      this.yyleng = this.yytext.length;
      this.offset -= len;
      this.match = this.match.substr(0, this.match.length - len);
      this.matched = this.matched.substr(0, this.matched.length - len);

      if (lines.length > 1) {
        this.yylineno -= lines.length - 1;
        this.yylloc.last_line = this.yylineno + 1;

        // Get last entirely matched line into the `pre_lines[]` array's
        // last index slot; we don't mind when other previously 
        // matched lines end up in the array too. 
        var pre = this.match;

        var pre_lines = pre.split(/(?:\r\n?|\n)/g);

        if (pre_lines.length === 1) {
          pre = this.matched;
          pre_lines = pre.split(/(?:\r\n?|\n)/g);
        }

        this.yylloc.last_column = pre_lines[pre_lines.length - 1].length;
      } else {
        this.yylloc.last_column -= len;
      }

      this.yylloc.range[1] = this.yylloc.range[0] + this.yyleng;
      this.done = false;
      return this;
    },

    /**
     * cache matched text and append it on next action
     * 
     * @public
     * @this {RegExpLexer}
     */
    more: function lexer_more() {
      this._more = true;
      return this;
    },

    /**
     * signal the lexer that this rule fails to match the input, so the
     * next matching rule (regex) should be tested instead.
     * 
     * @public
     * @this {RegExpLexer}
     */
    reject: function lexer_reject() {
      if (this.options.backtrack_lexer) {
        this._backtrack = true;
      } else {
        // when the `parseError()` call returns, we MUST ensure that the error is registered.
        // We accomplish this by signaling an 'error' token to be produced for the current
        // `.lex()` run.
        var lineno_msg = '';

        if (this.yylloc) {
          lineno_msg = ' on line ' + (this.yylineno + 1);
        }

        var p = this.constructLexErrorInfo(
          'Lexical error' + lineno_msg + ': You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).',
          false
        );

        this._signaled_error_token = this.parseError(p.errStr, p, this.JisonLexerError) || this.ERROR;
      }

      return this;
    },

    /**
     * retain first n characters of the match
     * 
     * @public
     * @this {RegExpLexer}
     */
    less: function lexer_less(n) {
      return this.unput(this.match.slice(n));
    },

    /**
     * return (part of the) already matched input, i.e. for error
     * messages.
     * 
     * Limit the returned string length to `maxSize` (default: 20).
     * 
     * Limit the returned string to the `maxLines` number of lines of
     * input (default: 1).
     * 
     * Negative limit values equal *unlimited*.
     * 
     * @public
     * @this {RegExpLexer}
     */
    pastInput: function lexer_pastInput(maxSize, maxLines) {
      var past = this.matched.substring(0, this.matched.length - this.match.length);

      if (maxSize < 0)
        maxSize = past.length;
      else if (!maxSize)
        maxSize = 20;

      if (maxLines < 0)
        maxLines = past.length;          // can't ever have more input lines than this! 
      else if (!maxLines)
        maxLines = 1;

      // `substr` anticipation: treat \r\n as a single character and take a little
      // more than necessary so that we can still properly check against maxSize
      // after we've transformed and limited the newLines in here:
      past = past.substr(-maxSize * 2 - 2);

      // now that we have a significantly reduced string to process, transform the newlines
      // and chop them, then limit them:
      var a = past.replace(/\r\n|\r/g, '\n').split('\n');

      a = a.slice(-maxLines);
      past = a.join('\n');

      // When, after limiting to maxLines, we still have too much to return,
      // do add an ellipsis prefix...
      if (past.length > maxSize) {
        past = '...' + past.substr(-maxSize);
      }

      return past;
    },

    /**
     * return (part of the) upcoming input, i.e. for error messages.
     * 
     * Limit the returned string length to `maxSize` (default: 20).
     * 
     * Limit the returned string to the `maxLines` number of lines of input (default: 1).
     * 
     * Negative limit values equal *unlimited*.
     *
     * > ### NOTE ###
     * >
     * > *"upcoming input"* is defined as the whole of the both
     * > the *currently lexed* input, together with any remaining input
     * > following that. *"currently lexed"* input is the input 
     * > already recognized by the lexer but not yet returned with
     * > the lexer token. This happens when you are invoking this API
     * > from inside any lexer rule action code block. 
     * >
     * 
     * @public
     * @this {RegExpLexer}
     */
    upcomingInput: function lexer_upcomingInput(maxSize, maxLines) {
      var next = this.match;

      if (maxSize < 0)
        maxSize = next.length + this._input.length;
      else if (!maxSize)
        maxSize = 20;

      if (maxLines < 0)
        maxLines = maxSize;          // can't ever have more input lines than this! 
      else if (!maxLines)
        maxLines = 1;

      // `substring` anticipation: treat \r\n as a single character and take a little
      // more than necessary so that we can still properly check against maxSize
      // after we've transformed and limited the newLines in here:
      if (next.length < maxSize * 2 + 2) {
        next += this._input.substring(0, maxSize * 2 + 2);   // substring is faster on Chrome/V8 
      }

      // now that we have a significantly reduced string to process, transform the newlines
      // and chop them, then limit them:
      var a = next.replace(/\r\n|\r/g, '\n').split('\n');

      a = a.slice(0, maxLines);
      next = a.join('\n');

      // When, after limiting to maxLines, we still have too much to return,
      // do add an ellipsis postfix...
      if (next.length > maxSize) {
        next = next.substring(0, maxSize) + '...';
      }

      return next;
    },

    /**
     * return a string which displays the character position where the
     * lexing error occurred, i.e. for error messages
     * 
     * @public
     * @this {RegExpLexer}
     */
    showPosition: function lexer_showPosition(maxPrefix, maxPostfix) {
      var pre = this.pastInput(maxPrefix).replace(/\s/g, ' ');
      var c = new Array(pre.length + 1).join('-');
      return pre + this.upcomingInput(maxPostfix).replace(/\s/g, ' ') + '\n' + c + '^';
    },

    /**
     * return an YYLLOC info object derived off the given context (actual, preceding, following, current).
     * Use this method when the given `actual` location is not guaranteed to exist (i.e. when
     * it MAY be NULL) and you MUST have a valid location info object anyway:
     * then we take the given context of the `preceding` and `following` locations, IFF those are available,
     * and reconstruct the `actual` location info from those.
     * If this fails, the heuristic is to take the `current` location, IFF available.
     * If this fails as well, we assume the sought location is at/around the current lexer position
     * and then produce that one as a response. DO NOTE that these heuristic/derived location info
     * values MAY be inaccurate!
     *
     * NOTE: `deriveLocationInfo()` ALWAYS produces a location info object *copy* of `actual`, not just
     * a *reference* hence all input location objects can be assumed to be 'constant' (function has no side-effects).
     * 
     * @public
     * @this {RegExpLexer}
     */
    deriveLocationInfo: function lexer_deriveYYLLOC(actual, preceding, following, current) {
      var loc = {
        first_line: 1,
        first_column: 0,
        last_line: 1,
        last_column: 0,
        range: [0, 0]
      };

      if (actual) {
        loc.first_line = actual.first_line | 0;
        loc.last_line = actual.last_line | 0;
        loc.first_column = actual.first_column | 0;
        loc.last_column = actual.last_column | 0;

        if (actual.range) {
          loc.range[0] = actual.range[0] | 0;
          loc.range[1] = actual.range[1] | 0;
        }
      }

      if (loc.first_line <= 0 || loc.last_line < loc.first_line) {
        // plan B: heuristic using preceding and following:
        if (loc.first_line <= 0 && preceding) {
          loc.first_line = preceding.last_line | 0;
          loc.first_column = preceding.last_column | 0;

          if (preceding.range) {
            loc.range[0] = actual.range[1] | 0;
          }
        }

        if ((loc.last_line <= 0 || loc.last_line < loc.first_line) && following) {
          loc.last_line = following.first_line | 0;
          loc.last_column = following.first_column | 0;

          if (following.range) {
            loc.range[1] = actual.range[0] | 0;
          }
        }

        // plan C?: see if the 'current' location is useful/sane too:
        if (loc.first_line <= 0 && current && (loc.last_line <= 0 || current.last_line <= loc.last_line)) {
          loc.first_line = current.first_line | 0;
          loc.first_column = current.first_column | 0;

          if (current.range) {
            loc.range[0] = current.range[0] | 0;
          }
        }

        if (loc.last_line <= 0 && current && (loc.first_line <= 0 || current.first_line >= loc.first_line)) {
          loc.last_line = current.last_line | 0;
          loc.last_column = current.last_column | 0;

          if (current.range) {
            loc.range[1] = current.range[1] | 0;
          }
        }
      }

      // sanitize: fix last_line BEFORE we fix first_line as we use the 'raw' value of the latter
      // or plan D heuristics to produce a 'sensible' last_line value:
      if (loc.last_line <= 0) {
        if (loc.first_line <= 0) {
          loc.first_line = this.yylloc.first_line;
          loc.last_line = this.yylloc.last_line;
          loc.first_column = this.yylloc.first_column;
          loc.last_column = this.yylloc.last_column;
          loc.range[0] = this.yylloc.range[0];
          loc.range[1] = this.yylloc.range[1];
        } else {
          loc.last_line = this.yylloc.last_line;
          loc.last_column = this.yylloc.last_column;
          loc.range[1] = this.yylloc.range[1];
        }
      }

      if (loc.first_line <= 0) {
        loc.first_line = loc.last_line;
        loc.first_column = 0;  // loc.last_column; 
        loc.range[1] = loc.range[0];
      }

      if (loc.first_column < 0) {
        loc.first_column = 0;
      }

      if (loc.last_column < 0) {
        loc.last_column = (loc.first_column > 0 ? loc.first_column : 80);
      }

      return loc;
    },

    /**
     * return a string which displays the lines & columns of input which are referenced 
     * by the given location info range, plus a few lines of context.
     * 
     * This function pretty-prints the indicated section of the input, with line numbers 
     * and everything!
     * 
     * This function is very useful to provide highly readable error reports, while
     * the location range may be specified in various flexible ways:
     * 
     * - `loc` is the location info object which references the area which should be
     *   displayed and 'marked up': these lines & columns of text are marked up by `^`
     *   characters below each character in the entire input range.
     * 
     * - `context_loc` is the *optional* location info object which instructs this
     *   pretty-printer how much *leading* context should be displayed alongside
     *   the area referenced by `loc`. This can help provide context for the displayed
     *   error, etc.
     * 
     *   When this location info is not provided, a default context of 3 lines is
     *   used.
     * 
     * - `context_loc2` is another *optional* location info object, which serves
     *   a similar purpose to `context_loc`: it specifies the amount of *trailing*
     *   context lines to display in the pretty-print output.
     * 
     *   When this location info is not provided, a default context of 1 line only is
     *   used.
     * 
     * Special Notes:
     * 
     * - when the `loc`-indicated range is very large (about 5 lines or more), then
     *   only the first and last few lines of this block are printed while a
     *   `...continued...` message will be printed between them.
     * 
     *   This serves the purpose of not printing a huge amount of text when the `loc`
     *   range happens to be huge: this way a manageable & readable output results
     *   for arbitrary large ranges.
     * 
     * - this function can display lines of input which whave not yet been lexed.
     *   `prettyPrintRange()` can access the entire input!
     * 
     * @public
     * @this {RegExpLexer}
     */
    prettyPrintRange: function lexer_prettyPrintRange(loc, context_loc, context_loc2) {
      loc = this.deriveLocationInfo(loc, context_loc, context_loc2);
      const CONTEXT = 3;
      const CONTEXT_TAIL = 1;
      const MINIMUM_VISIBLE_NONEMPTY_LINE_COUNT = 2;
      var input = this.matched + this._input;
      var lines = input.split('\n');
      var l0 = Math.max(1, (context_loc ? context_loc.first_line : loc.first_line - CONTEXT));
      var l1 = Math.max(1, (context_loc2 ? context_loc2.last_line : loc.last_line + CONTEXT_TAIL));
      var lineno_display_width = 1 + Math.log10(l1 | 1) | 0;
      var ws_prefix = new Array(lineno_display_width).join(' ');
      var nonempty_line_indexes = [];

      var rv = lines.slice(l0 - 1, l1 + 1).map(function injectLineNumber(line, index) {
        var lno = index + l0;
        var lno_pfx = (ws_prefix + lno).substr(-lineno_display_width);
        var rv = lno_pfx + ': ' + line;
        var errpfx = new Array(lineno_display_width + 1).join('^');
        var offset = 2 + 1;
        var len = 0;

        if (lno === loc.first_line) {
          offset += loc.first_column;

          len = Math.max(
            2,
            ((lno === loc.last_line ? loc.last_column : line.length)) - loc.first_column + 1
          );
        } else if (lno === loc.last_line) {
          len = Math.max(2, loc.last_column + 1);
        } else if (lno > loc.first_line && lno < loc.last_line) {
          len = Math.max(2, line.length + 1);
        }

        if (len) {
          var lead = new Array(offset).join('.');
          var mark = new Array(len).join('^');
          rv += '\n' + errpfx + lead + mark;

          if (line.trim().length > 0) {
            nonempty_line_indexes.push(index);
          }
        }

        rv = rv.replace(/\t/g, ' ');
        return rv;
      });

      // now make sure we don't print an overly large amount of error area: limit it 
      // to the top and bottom line count:
      if (nonempty_line_indexes.length > 2 * MINIMUM_VISIBLE_NONEMPTY_LINE_COUNT) {
        var clip_start = nonempty_line_indexes[MINIMUM_VISIBLE_NONEMPTY_LINE_COUNT - 1] + 1;
        var clip_end = nonempty_line_indexes[nonempty_line_indexes.length - MINIMUM_VISIBLE_NONEMPTY_LINE_COUNT] - 1;
        var intermediate_line = new Array(lineno_display_width + 1).join(' ') + '  (...continued...)';
        intermediate_line += '\n' + new Array(lineno_display_width + 1).join('-') + '  (---------------)';
        rv.splice(clip_start, clip_end - clip_start + 1, intermediate_line);
      }

      return rv.join('\n');
    },

    /**
     * helper function, used to produce a human readable description as a string, given
     * the input `yylloc` location object.
     * 
     * Set `display_range_too` to TRUE to include the string character index position(s)
     * in the description if the `yylloc.range` is available.
     * 
     * @public
     * @this {RegExpLexer}
     */
    describeYYLLOC: function lexer_describe_yylloc(yylloc, display_range_too) {
      var l1 = yylloc.first_line;
      var l2 = yylloc.last_line;
      var c1 = yylloc.first_column;
      var c2 = yylloc.last_column;
      var dl = l2 - l1;
      var dc = c2 - c1;
      var rv;

      if (dl === 0) {
        rv = 'line ' + l1 + ', ';

        if (dc <= 1) {
          rv += 'column ' + c1;
        } else {
          rv += 'columns ' + c1 + ' .. ' + c2;
        }
      } else {
        rv = 'lines ' + l1 + '(column ' + c1 + ') .. ' + l2 + '(column ' + c2 + ')';
      }

      if (yylloc.range && display_range_too) {
        var r1 = yylloc.range[0];
        var r2 = yylloc.range[1] - 1;

        if (r2 <= r1) {
          rv += ' {String Offset: ' + r1 + '}';
        } else {
          rv += ' {String Offset range: ' + r1 + ' .. ' + r2 + '}';
        }
      }

      return rv;
    },

    /**
     * test the lexed token: return FALSE when not a match, otherwise return token.
     * 
     * `match` is supposed to be an array coming out of a regex match, i.e. `match[0]`
     * contains the actually matched text string.
     * 
     * Also move the input cursor forward and update the match collectors:
     * 
     * - `yytext`
     * - `yyleng`
     * - `match`
     * - `matches`
     * - `yylloc`
     * - `offset`
     * 
     * @public
     * @this {RegExpLexer}
     */
    test_match: function lexer_test_match(match, indexed_rule) {
      var token, lines, backup, match_str, match_str_len;

      if (this.options.backtrack_lexer) {
        // save context
        backup = {
          yylineno: this.yylineno,

          yylloc: {
            first_line: this.yylloc.first_line,
            last_line: this.yylloc.last_line,
            first_column: this.yylloc.first_column,
            last_column: this.yylloc.last_column,
            range: this.yylloc.range.slice(0)
          },

          yytext: this.yytext,
          match: this.match,
          matches: this.matches,
          matched: this.matched,
          yyleng: this.yyleng,
          offset: this.offset,
          _more: this._more,
          _input: this._input,

          //_signaled_error_token: this._signaled_error_token,
          yy: this.yy,

          conditionStack: this.conditionStack.slice(0),
          done: this.done
        };
      }

      match_str = match[0];
      match_str_len = match_str.length;

      // if (match_str.indexOf('\n') !== -1 || match_str.indexOf('\r') !== -1) {
      lines = match_str.split(/(?:\r\n?|\n)/g);

      if (lines.length > 1) {
        this.yylineno += lines.length - 1;
        this.yylloc.last_line = this.yylineno + 1;
        this.yylloc.last_column = lines[lines.length - 1].length;
      } else {
        this.yylloc.last_column += match_str_len;
      }

      // }
      this.yytext += match_str;

      this.match += match_str;
      this.matched += match_str;
      this.matches = match;
      this.yyleng = this.yytext.length;
      this.yylloc.range[1] += match_str_len;

      // previous lex rules MAY have invoked the `more()` API rather than producing a token:
      // those rules will already have moved this `offset` forward matching their match lengths,
      // hence we must only add our own match length now:
      this.offset += match_str_len;

      this._more = false;
      this._backtrack = false;
      this._input = this._input.slice(match_str_len);

      // calling this method:
      //
      //   function lexer__performAction(yy, yyrulenumber, YY_START) {...}
      token = this.performAction.call(
        this,
        this.yy,
        indexed_rule,
        this.conditionStack[this.conditionStack.length - 1] /* = YY_START */
      );

      // otherwise, when the action codes are all simple return token statements:
      //token = this.simpleCaseActionClusters[indexed_rule];

      if (this.done && this._input) {
        this.done = false;
      }

      if (token) {
        return token;
      } else if (this._backtrack) {
        // recover context
        for (var k in backup) {
          this[k] = backup[k];
        }

        this.__currentRuleSet__ = null;
        return false;  // rule action called reject() implying the next rule should be tested instead. 
      } else if (this._signaled_error_token) {
        // produce one 'error' token as `.parseError()` in `reject()`
        // did not guarantee a failure signal by throwing an exception!
        token = this._signaled_error_token;

        this._signaled_error_token = false;
        return token;
      }

      return false;
    },

    /**
     * return next match in input
     * 
     * @public
     * @this {RegExpLexer}
     */
    next: function lexer_next() {
      if (this.done) {
        this.clear();
        return this.EOF;
      }

      if (!this._input) {
        this.done = true;
      }

      var token, match, tempMatch, index;

      if (!this._more) {
        this.clear();
      }

      var spec = this.__currentRuleSet__;

      if (!spec) {
        // Update the ruleset cache as we apparently encountered a state change or just started lexing.
        // The cache is set up for fast lookup -- we assume a lexer will switch states much less often than it will
        // invoke the `lex()` token-producing API and related APIs, hence caching the set for direct access helps
        // speed up those activities a tiny bit.
        spec = this.__currentRuleSet__ = this._currentRules();

        // Check whether a *sane* condition has been pushed before: this makes the lexer robust against
        // user-programmer bugs such as https://github.com/zaach/jison-lex/issues/19
        if (!spec || !spec.rules) {
          var lineno_msg = '';

          if (this.options.trackPosition) {
            lineno_msg = ' on line ' + (this.yylineno + 1);
          }

          var p = this.constructLexErrorInfo(
            'Internal lexer engine error' + lineno_msg + ': The lex grammar programmer pushed a non-existing condition name "' + this.topState() + '"; this is a fatal error and should be reported to the application programmer team!',
            false
          );

          // produce one 'error' token until this situation has been resolved, most probably by parse termination!
          return this.parseError(p.errStr, p, this.JisonLexerError) || this.ERROR;
        }
      }

      var rule_ids = spec.rules;
      var regexes = spec.__rule_regexes;
      var len = spec.__rule_count;

      // Note: the arrays are 1-based, while `len` itself is a valid index,
      // hence the non-standard less-or-equal check in the next loop condition!
      for (var i = 1; i <= len; i++) {
        tempMatch = this._input.match(regexes[i]);

        if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
          match = tempMatch;
          index = i;

          if (this.options.backtrack_lexer) {
            token = this.test_match(tempMatch, rule_ids[i]);

            if (token !== false) {
              return token;
            } else if (this._backtrack) {
              match = undefined;
              continue;  // rule action called reject() implying a rule MISmatch. 
            } else {
              // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
              return false;
            }
          } else if (!this.options.flex) {
            break;
          }
        }
      }

      if (match) {
        token = this.test_match(match, rule_ids[index]);

        if (token !== false) {
          return token;
        }

        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
        return false;
      }

      if (!this._input) {
        this.done = true;
        this.clear();
        return this.EOF;
      } else {
        var lineno_msg = '';

        if (this.options.trackPosition) {
          lineno_msg = ' on line ' + (this.yylineno + 1);
        }

        var p = this.constructLexErrorInfo(
          'Lexical error' + lineno_msg + ': Unrecognized text.',
          this.options.lexerErrorsAreRecoverable
        );

        var pendingInput = this._input;
        var activeCondition = this.topState();
        var conditionStackDepth = this.conditionStack.length;
        token = this.parseError(p.errStr, p, this.JisonLexerError) || this.ERROR;

        if (token === this.ERROR) {
          // we can try to recover from a lexer error that `parseError()` did not 'recover' for us
          // by moving forward at least one character at a time IFF the (user-specified?) `parseError()`
          // has not consumed/modified any pending input or changed state in the error handler:
          if (!this.matches && // and make sure the input has been modified/consumed ...
          pendingInput === this._input && // ...or the lexer state has been modified significantly enough
          // to merit a non-consuming error handling action right now.
          activeCondition === this.topState() && conditionStackDepth === this.conditionStack.length) {
            this.input();
          }
        }

        return token;
      }
    },

    /**
     * return next match that has a token
     * 
     * @public
     * @this {RegExpLexer}
     */
    lex: function lexer_lex() {
      var r;

      // allow the PRE/POST handlers set/modify the return token for maximum flexibility of the generated lexer:
      if (typeof this.pre_lex === 'function') {
        r = this.pre_lex.call(this, 0);
      }

      if (typeof this.options.pre_lex === 'function') {
        // (also account for a userdef function which does not return any value: keep the token as is)
        r = this.options.pre_lex.call(this, r) || r;
      }

      if (this.yy && typeof this.yy.pre_lex === 'function') {
        // (also account for a userdef function which does not return any value: keep the token as is)
        r = this.yy.pre_lex.call(this, r) || r;
      }

      while (!r) {
        r = this.next();
      }

      if (this.yy && typeof this.yy.post_lex === 'function') {
        // (also account for a userdef function which does not return any value: keep the token as is)
        r = this.yy.post_lex.call(this, r) || r;
      }

      if (typeof this.options.post_lex === 'function') {
        // (also account for a userdef function which does not return any value: keep the token as is)
        r = this.options.post_lex.call(this, r) || r;
      }

      if (typeof this.post_lex === 'function') {
        // (also account for a userdef function which does not return any value: keep the token as is)
        r = this.post_lex.call(this, r) || r;
      }

      return r;
    },

    /**
     * return next match that has a token. Identical to the `lex()` API but does not invoke any of the 
     * `pre_lex()` nor any of the `post_lex()` callbacks.
     * 
     * @public
     * @this {RegExpLexer}
     */
    fastLex: function lexer_fastLex() {
      var r;

      while (!r) {
        r = this.next();
      }

      return r;
    },

    /**
     * return info about the lexer state that can help a parser or other lexer API user to use the
     * most efficient means available. This API is provided to aid run-time performance for larger
     * systems which employ this lexer.
     * 
     * @public
     * @this {RegExpLexer}
     */
    canIUse: function lexer_canIUse() {
      var rv = {
        fastLex: !(typeof this.pre_lex === 'function' || typeof this.options.pre_lex === 'function' || this.yy && typeof this.yy.pre_lex === 'function' || this.yy && typeof this.yy.post_lex === 'function' || typeof this.options.post_lex === 'function' || typeof this.post_lex === 'function') && typeof this.fastLex === 'function'
      };

      return rv;
    },

    /**
     * backwards compatible alias for `pushState()`;
     * the latter is symmetrical with `popState()` and we advise to use
     * those APIs in any modern lexer code, rather than `begin()`.
     * 
     * @public
     * @this {RegExpLexer}
     */
    begin: function lexer_begin(condition) {
      return this.pushState(condition);
    },

    /**
     * activates a new lexer condition state (pushes the new lexer
     * condition state onto the condition stack)
     * 
     * @public
     * @this {RegExpLexer}
     */
    pushState: function lexer_pushState(condition) {
      this.conditionStack.push(condition);
      this.__currentRuleSet__ = null;
      return this;
    },

    /**
     * pop the previously active lexer condition state off the condition
     * stack
     * 
     * @public
     * @this {RegExpLexer}
     */
    popState: function lexer_popState() {
      var n = this.conditionStack.length - 1;

      if (n > 0) {
        this.__currentRuleSet__ = null;
        return this.conditionStack.pop();
      } else {
        return this.conditionStack[0];
      }
    },

    /**
     * return the currently active lexer condition state; when an index
     * argument is provided it produces the N-th previous condition state,
     * if available
     * 
     * @public
     * @this {RegExpLexer}
     */
    topState: function lexer_topState(n) {
      n = this.conditionStack.length - 1 - Math.abs(n || 0);

      if (n >= 0) {
        return this.conditionStack[n];
      } else {
        return 'INITIAL';
      }
    },

    /**
     * (internal) determine the lexer rule set which is active for the
     * currently active lexer condition state
     * 
     * @public
     * @this {RegExpLexer}
     */
    _currentRules: function lexer__currentRules() {
      if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
        return this.conditions[this.conditionStack[this.conditionStack.length - 1]];
      } else {
        return this.conditions['INITIAL'];
      }
    },

    /**
     * return the number of states currently on the stack
     * 
     * @public
     * @this {RegExpLexer}
     */
    stateStackSize: function lexer_stateStackSize() {
      return this.conditionStack.length;
    },

    options: {
      trackPosition: true
    },

    JisonLexerError: JisonLexerError,

    performAction: function lexer__performAction(yy, yyrulenumber, YY_START) {

      switch (yyrulenumber) {
      case 0:
        /*! Conditions:: INITIAL */
        /*! Rule::       \s+ */
        /* skip whitespace */
        break;

      default:
        return this.simpleCaseActionClusters[yyrulenumber];
      }
    },

    simpleCaseActionClusters: {
      /*! Conditions:: INITIAL */
      /*! Rule::       \* */
      1: 5,

      /*! Conditions:: INITIAL */
      /*! Rule::       \/ */
      2: 6,

      /*! Conditions:: INITIAL */
      /*! Rule::       \+ */
      3: 3,

      /*! Conditions:: INITIAL */
      /*! Rule::       - */
      4: 4,

      /*! Conditions:: INITIAL */
      /*! Rule::       ([0-9]+(\.[0-9]*)?|\.[0-9]+)px\b */
      5: 13,

      /*! Conditions:: INITIAL */
      /*! Rule::       ([0-9]+(\.[0-9]*)?|\.[0-9]+)cm\b */
      6: 13,

      /*! Conditions:: INITIAL */
      /*! Rule::       ([0-9]+(\.[0-9]*)?|\.[0-9]+)mm\b */
      7: 13,

      /*! Conditions:: INITIAL */
      /*! Rule::       ([0-9]+(\.[0-9]*)?|\.[0-9]+)in\b */
      8: 13,

      /*! Conditions:: INITIAL */
      /*! Rule::       ([0-9]+(\.[0-9]*)?|\.[0-9]+)pt\b */
      9: 13,

      /*! Conditions:: INITIAL */
      /*! Rule::       ([0-9]+(\.[0-9]*)?|\.[0-9]+)pc\b */
      10: 13,

      /*! Conditions:: INITIAL */
      /*! Rule::       ([0-9]+(\.[0-9]*)?|\.[0-9]+)deg\b */
      11: 14,

      /*! Conditions:: INITIAL */
      /*! Rule::       ([0-9]+(\.[0-9]*)?|\.[0-9]+)grad\b */
      12: 14,

      /*! Conditions:: INITIAL */
      /*! Rule::       ([0-9]+(\.[0-9]*)?|\.[0-9]+)rad\b */
      13: 14,

      /*! Conditions:: INITIAL */
      /*! Rule::       ([0-9]+(\.[0-9]*)?|\.[0-9]+)turn\b */
      14: 14,

      /*! Conditions:: INITIAL */
      /*! Rule::       ([0-9]+(\.[0-9]*)?|\.[0-9]+)s\b */
      15: 15,

      /*! Conditions:: INITIAL */
      /*! Rule::       ([0-9]+(\.[0-9]*)?|\.[0-9]+)ms\b */
      16: 15,

      /*! Conditions:: INITIAL */
      /*! Rule::       ([0-9]+(\.[0-9]*)?|\.[0-9]+)Hz\b */
      17: 16,

      /*! Conditions:: INITIAL */
      /*! Rule::       ([0-9]+(\.[0-9]*)?|\.[0-9]+)kHz\b */
      18: 16,

      /*! Conditions:: INITIAL */
      /*! Rule::       ([0-9]+(\.[0-9]*)?|\.[0-9]+)dpi\b */
      19: 17,

      /*! Conditions:: INITIAL */
      /*! Rule::       ([0-9]+(\.[0-9]*)?|\.[0-9]+)dpcm\b */
      20: 17,

      /*! Conditions:: INITIAL */
      /*! Rule::       ([0-9]+(\.[0-9]*)?|\.[0-9]+)dppx\b */
      21: 17,

      /*! Conditions:: INITIAL */
      /*! Rule::       ([0-9]+(\.[0-9]*)?|\.[0-9]+)em\b */
      22: 18,

      /*! Conditions:: INITIAL */
      /*! Rule::       ([0-9]+(\.[0-9]*)?|\.[0-9]+)ex\b */
      23: 19,

      /*! Conditions:: INITIAL */
      /*! Rule::       ([0-9]+(\.[0-9]*)?|\.[0-9]+)ch\b */
      24: 20,

      /*! Conditions:: INITIAL */
      /*! Rule::       ([0-9]+(\.[0-9]*)?|\.[0-9]+)rem\b */
      25: 21,

      /*! Conditions:: INITIAL */
      /*! Rule::       ([0-9]+(\.[0-9]*)?|\.[0-9]+)vw\b */
      26: 23,

      /*! Conditions:: INITIAL */
      /*! Rule::       ([0-9]+(\.[0-9]*)?|\.[0-9]+)vh\b */
      27: 22,

      /*! Conditions:: INITIAL */
      /*! Rule::       ([0-9]+(\.[0-9]*)?|\.[0-9]+)vmin\b */
      28: 24,

      /*! Conditions:: INITIAL */
      /*! Rule::       ([0-9]+(\.[0-9]*)?|\.[0-9]+)vmax\b */
      29: 25,

      /*! Conditions:: INITIAL */
      /*! Rule::       ([0-9]+(\.[0-9]*)?|\.[0-9]+)% */
      30: 26,

      /*! Conditions:: INITIAL */
      /*! Rule::       ([0-9]+(\.[0-9]*)?|\.[0-9]+)\b */
      31: 11,

      /*! Conditions:: INITIAL */
      /*! Rule::       (calc) */
      32: 9,

      /*! Conditions:: INITIAL */
      /*! Rule::       (var\([^\)]*\)) */
      33: 12,

      /*! Conditions:: INITIAL */
      /*! Rule::       ([a-z]+) */
      34: 10,

      /*! Conditions:: INITIAL */
      /*! Rule::       \( */
      35: 7,

      /*! Conditions:: INITIAL */
      /*! Rule::       \) */
      36: 8,

      /*! Conditions:: INITIAL */
      /*! Rule::       $ */
      37: 1
    },

    rules: [
      /*  0: */  /^(?:\s+)/,
      /*  1: */  /^(?:\*)/,
      /*  2: */  /^(?:\/)/,
      /*  3: */  /^(?:\+)/,
      /*  4: */  /^(?:-)/,
      /*  5: */  /^(?:(\d+(\.\d*)?|\.\d+)px\b)/,
      /*  6: */  /^(?:(\d+(\.\d*)?|\.\d+)cm\b)/,
      /*  7: */  /^(?:(\d+(\.\d*)?|\.\d+)mm\b)/,
      /*  8: */  /^(?:(\d+(\.\d*)?|\.\d+)in\b)/,
      /*  9: */  /^(?:(\d+(\.\d*)?|\.\d+)pt\b)/,
      /* 10: */  /^(?:(\d+(\.\d*)?|\.\d+)pc\b)/,
      /* 11: */  /^(?:(\d+(\.\d*)?|\.\d+)deg\b)/,
      /* 12: */  /^(?:(\d+(\.\d*)?|\.\d+)grad\b)/,
      /* 13: */  /^(?:(\d+(\.\d*)?|\.\d+)rad\b)/,
      /* 14: */  /^(?:(\d+(\.\d*)?|\.\d+)turn\b)/,
      /* 15: */  /^(?:(\d+(\.\d*)?|\.\d+)s\b)/,
      /* 16: */  /^(?:(\d+(\.\d*)?|\.\d+)ms\b)/,
      /* 17: */  /^(?:(\d+(\.\d*)?|\.\d+)Hz\b)/,
      /* 18: */  /^(?:(\d+(\.\d*)?|\.\d+)kHz\b)/,
      /* 19: */  /^(?:(\d+(\.\d*)?|\.\d+)dpi\b)/,
      /* 20: */  /^(?:(\d+(\.\d*)?|\.\d+)dpcm\b)/,
      /* 21: */  /^(?:(\d+(\.\d*)?|\.\d+)dppx\b)/,
      /* 22: */  /^(?:(\d+(\.\d*)?|\.\d+)em\b)/,
      /* 23: */  /^(?:(\d+(\.\d*)?|\.\d+)ex\b)/,
      /* 24: */  /^(?:(\d+(\.\d*)?|\.\d+)ch\b)/,
      /* 25: */  /^(?:(\d+(\.\d*)?|\.\d+)rem\b)/,
      /* 26: */  /^(?:(\d+(\.\d*)?|\.\d+)vw\b)/,
      /* 27: */  /^(?:(\d+(\.\d*)?|\.\d+)vh\b)/,
      /* 28: */  /^(?:(\d+(\.\d*)?|\.\d+)vmin\b)/,
      /* 29: */  /^(?:(\d+(\.\d*)?|\.\d+)vmax\b)/,
      /* 30: */  /^(?:(\d+(\.\d*)?|\.\d+)%)/,
      /* 31: */  /^(?:(\d+(\.\d*)?|\.\d+)\b)/,
      /* 32: */  /^(?:(calc))/,
      /* 33: */  /^(?:(var\([^)]*\)))/,
      /* 34: */  /^(?:([a-z]+))/,
      /* 35: */  /^(?:\()/,
      /* 36: */  /^(?:\))/,
      /* 37: */  /^(?:$)/
    ],

    conditions: {
      'INITIAL': {
        rules: [
          0,
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          17,
          18,
          19,
          20,
          21,
          22,
          23,
          24,
          25,
          26,
          27,
          28,
          29,
          30,
          31,
          32,
          33,
          34,
          35,
          36,
          37
        ],

        inclusive: true
      }
    }
  };

  return lexer;
}();
parser.lexer = lexer;



function Parser() {
  this.yy = {};
}
Parser.prototype = parser;
parser.Parser = Parser;

return new Parser();
})();

        


if (typeof commonjsRequire !== 'undefined' && 'object' !== 'undefined') {
  exports.parser = parser;
  exports.Parser = parser.Parser;
  exports.parse = function () {
    return parser.parse.apply(parser, arguments);
  };
  
}
});
var parser_2 = parser_1.parser;
var parser_3 = parser_1.Parser;
var parser_4 = parser_1.parse;

var conversions = {
    // length
    'px': {
        'px': 1,
        'cm': 96.0/2.54,
        'mm': 96.0/25.4,
        'in': 96,
        'pt': 96.0/72.0,
        'pc': 16
    },
    'cm': {
        'px': 2.54/96.0,
        'cm': 1,
        'mm': 0.1,
        'in': 2.54,
        'pt': 2.54/72.0,
        'pc': 2.54/6.0
    },
    'mm': {
        'px': 25.4/96.0,
        'cm': 10,
        'mm': 1,
        'in': 25.4,
        'pt': 25.4/72.0,
        'pc': 25.4/6.0
    },
    'in': {
        'px': 1.0/96.0,
        'cm': 1.0/2.54,
        'mm': 1.0/25.4,
        'in': 1,
        'pt': 1.0/72.0,
        'pc': 1.0/6.0
    },
    'pt': {
        'px': 0.75,
        'cm': 72.0/2.54,
        'mm': 72.0/25.4,
        'in': 72,
        'pt': 1,
        'pc': 12
    },
    'pc': {
        'px': 6.0/96.0,
        'cm': 6.0/2.54,
        'mm': 6.0/25.4,
        'in': 6,
        'pt': 6.0/72.0,
        'pc': 1
    },
    // angle
    'deg': {
        'deg': 1,
        'grad': 0.9,
        'rad': 180/Math.PI,
        'turn': 360
    },
    'grad': {
        'deg': 400/360,
        'grad': 1,
        'rad': 200/Math.PI,
        'turn': 400
    },
    'rad': {
        'deg': Math.PI/180,
        'grad': Math.PI/200,
        'rad': 1,
        'turn': Math.PI*2
    },
    'turn': {
        'deg': 1/360,
        'grad': 1/400,
        'rad': 0.5/Math.PI,
        'turn': 1
    },
    // time
    's': {
        's': 1,
        'ms': 1/1000
    },
    'ms': {
        's': 1000,
        'ms': 1
    },
    // frequency
    'Hz': {
        'Hz': 1,
        'kHz': 1000
    },
    'kHz': {
        'Hz': 1/1000,
        'kHz': 1
    },
    // resolution
    'dpi': {
        'dpi': 1,
        'dpcm': 1.0/2.54,
        'dppx': 1/96
    },
    'dpcm': {
        'dpi': 2.54,
        'dpcm': 1,
        'dppx': 2.54/96.0
    },
    'dppx': {
        'dpi': 96,
        'dpcm': 96.0/2.54,
        'dppx': 1
    }
};

var cssUnitConverter = function (value, sourceUnit, targetUnit, precision) {
    if (!conversions.hasOwnProperty(targetUnit))
        throw new Error("Cannot convert to " + targetUnit);

    if (!conversions[targetUnit].hasOwnProperty(sourceUnit))
        throw new Error("Cannot convert from " + sourceUnit + " to " + targetUnit);
    
    var converted = conversions[targetUnit][sourceUnit] * value;
    
    if (precision !== false) {
        precision = Math.pow(10, parseInt(precision) || 5);
        return Math.round(converted * precision) / precision;
    }
    
    return converted;
};

var convert = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});



var _cssUnitConverter2 = _interopRequireDefault(cssUnitConverter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function convertNodes(left, right, precision) {
  switch (left.type) {
    case 'LengthValue':
    case 'AngleValue':
    case 'TimeValue':
    case 'FrequencyValue':
    case 'ResolutionValue':
      return convertAbsoluteLength(left, right, precision);
    default:
      return { left: left, right: right };
  }
}

function convertAbsoluteLength(left, right, precision) {
  if (right.type === left.type) {
    right = {
      type: left.type,
      value: (0, _cssUnitConverter2.default)(right.value, right.unit, left.unit, precision),
      unit: left.unit
    };
  }
  return { left: left, right: right };
}

exports.default = convertNodes;
module.exports = exports['default'];
});

unwrapExports(convert);

var reducer = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flip = flip;



var _convert2 = _interopRequireDefault(convert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function reduce(node, precision) {
  if (node.type === "MathExpression") return reduceMathExpression(node, precision);

  return node;
}

function isEqual(left, right) {
  return left.type === right.type && left.value === right.value;
}

function isValueType(type) {
  switch (type) {
    case 'LengthValue':
    case 'AngleValue':
    case 'TimeValue':
    case 'FrequencyValue':
    case 'ResolutionValue':
    case 'EmValue':
    case 'ExValue':
    case 'ChValue':
    case 'RemValue':
    case 'VhValue':
    case 'VwValue':
    case 'VminValue':
    case 'VmaxValue':
    case 'PercentageValue':
    case 'Value':
      return true;
  }
  return false;
}

function convertMathExpression(node, precision) {
  var nodes = (0, _convert2.default)(node.left, node.right, precision);
  var left = reduce(nodes.left, precision);
  var right = reduce(nodes.right, precision);

  if (left.type === "MathExpression" && right.type === "MathExpression") {

    if (left.operator === '/' && right.operator === '*' || left.operator === '-' && right.operator === '+' || left.operator === '*' && right.operator === '/' || left.operator === '+' && right.operator === '-') {

      if (isEqual(left.right, right.right)) nodes = (0, _convert2.default)(left.left, right.left, precision);else if (isEqual(left.right, right.left)) nodes = (0, _convert2.default)(left.left, right.right, precision);

      left = reduce(nodes.left, precision);
      right = reduce(nodes.right, precision);
    }
  }

  node.left = left;
  node.right = right;
  return node;
}

function flip(operator) {
  return operator === '+' ? '-' : '+';
}

function flipValue(node) {
  if (isValueType(node.type)) node.value = -node.value;else if (node.type == 'MathExpression') {
    node.left = flipValue(node.left);
    node.right = flipValue(node.right);
  }
  return node;
}

function reduceAddSubExpression(node, precision) {
  var _node = node,
      left = _node.left,
      right = _node.right,
      op = _node.operator;


  if (left.type === 'CssVariable' || right.type === 'CssVariable') return node;

  // something + 0 => something
  // something - 0 => something
  if (right.value === 0) return left;

  // 0 + something => something
  if (left.value === 0 && op === "+") return right;

  // 0 - something => -something
  if (left.value === 0 && op === "-") return flipValue(right);

  // value + value
  // value - value
  if (left.type === right.type && isValueType(left.type)) {
    node = Object.assign({}, left);
    if (op === "+") node.value = left.value + right.value;else node.value = left.value - right.value;
  }

  // value <op> (expr)
  if (isValueType(left.type) && (right.operator === '+' || right.operator === '-') && right.type === 'MathExpression') {
    // value + (value + something) => (value + value) + something
    // value + (value - something) => (value + value) - something
    // value - (value + something) => (value - value) - something
    // value - (value - something) => (value - value) + something
    if (left.type === right.left.type) {
      node = Object.assign({}, node);
      node.left = reduce({
        type: 'MathExpression',
        operator: op,
        left: left,
        right: right.left
      }, precision);
      node.right = right.right;
      node.operator = op === '-' ? flip(right.operator) : right.operator;
      return reduce(node, precision);
    }
    // value + (something + value) => (value + value) + something
    // value + (something - value) => (value - value) + something
    // value - (something + value) => (value - value) - something
    // value - (something - value) => (value + value) - something
    else if (left.type === right.right.type) {
        node = Object.assign({}, node);
        node.left = reduce({
          type: 'MathExpression',
          operator: op === '-' ? flip(right.operator) : right.operator,
          left: left,
          right: right.right
        }, precision);
        node.right = right.left;
        return reduce(node, precision);
      }
  }

  // (expr) <op> value
  if (left.type === 'MathExpression' && (left.operator === '+' || left.operator === '-') && isValueType(right.type)) {
    // (value + something) + value => (value + value) + something
    // (value - something) + value => (value + value) - something
    // (value + something) - value => (value - value) + something
    // (value - something) - value => (value - value) - something
    if (right.type === left.left.type) {
      node = Object.assign({}, left);
      node.left = reduce({
        type: 'MathExpression',
        operator: op,
        left: left.left,
        right: right
      }, precision);
      return reduce(node, precision);
    }
    // (something + value) + value => something + (value + value)
    // (something - value1) + value2 => something - (value2 - value1)
    // (something + value) - value => something + (value - value)
    // (something - value) - value => something - (value + value)
    else if (right.type === left.right.type) {
        node = Object.assign({}, left);
        if (left.operator === '-') {
          node.right = reduce({
            type: 'MathExpression',
            operator: op === '-' ? '+' : '-',
            left: right,
            right: left.right
          }, precision);
          node.operator = op === '-' ? '-' : '+';
        } else {
          node.right = reduce({
            type: 'MathExpression',
            operator: op,
            left: left.right,
            right: right
          }, precision);
        }
        if (node.right.value < 0) {
          node.right.value *= -1;
          node.operator = node.operator === '-' ? '+' : '-';
        }
        return reduce(node, precision);
      }
  }
  return node;
}

function reduceDivisionExpression(node, precision) {
  if (!isValueType(node.right.type)) return node;

  if (node.right.type !== 'Value') throw new Error('Cannot divide by "' + node.right.unit + '", number expected');

  if (node.right.value === 0) throw new Error('Cannot divide by zero');

  // (expr) / value
  if (node.left.type === 'MathExpression') {
    if (isValueType(node.left.left.type) && isValueType(node.left.right.type)) {
      node.left.left.value /= node.right.value;
      node.left.right.value /= node.right.value;
      return reduce(node.left, precision);
    }
    return node;
  }
  // something / value
  else if (isValueType(node.left.type)) {
      node.left.value /= node.right.value;
      return node.left;
    }
  return node;
}

function reduceMultiplicationExpression(node) {
  // (expr) * value
  if (node.left.type === 'MathExpression' && node.right.type === 'Value') {
    if (isValueType(node.left.left.type) && isValueType(node.left.right.type)) {
      node.left.left.value *= node.right.value;
      node.left.right.value *= node.right.value;
      return node.left;
    }
  }
  // something * value
  else if (isValueType(node.left.type) && node.right.type === 'Value') {
      node.left.value *= node.right.value;
      return node.left;
    }
    // value * (expr)
    else if (node.left.type === 'Value' && node.right.type === 'MathExpression') {
        if (isValueType(node.right.left.type) && isValueType(node.right.right.type)) {
          node.right.left.value *= node.left.value;
          node.right.right.value *= node.left.value;
          return node.right;
        }
      }
      // value * something
      else if (node.left.type === 'Value' && isValueType(node.right.type)) {
          node.right.value *= node.left.value;
          return node.right;
        }
  return node;
}

function reduceMathExpression(node, precision) {
  node = convertMathExpression(node, precision);

  switch (node.operator) {
    case "+":
    case "-":
      return reduceAddSubExpression(node, precision);
    case "/":
      return reduceDivisionExpression(node, precision);
    case "*":
      return reduceMultiplicationExpression(node);
  }
  return node;
}

exports.default = reduce;
});

unwrapExports(reducer);
var reducer_1 = reducer.flip;

var stringifier = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (calc, node, precision) {
  var str = stringify(node, precision);

  if (node.type === "MathExpression") {
    // if calc expression couldn't be resolved to a single value, re-wrap it as
    // a calc()
    str = calc + "(" + str + ")";
  }
  return str;
};



var order = {
  "*": 0,
  "/": 0,
  "+": 1,
  "-": 1
};

function round(value, prec) {
  if (prec !== false) {
    var precision = Math.pow(10, prec);
    return Math.round(value * precision) / precision;
  }
  return value;
}

function stringify(node, prec) {
  switch (node.type) {
    case "MathExpression":
      {
        var left = node.left,
            right = node.right,
            op = node.operator;

        var str = "";

        if (left.type === 'MathExpression' && order[op] < order[left.operator]) str += "(" + stringify(left, prec) + ")";else str += stringify(left, prec);

        str += " " + node.operator + " ";

        if (right.type === 'MathExpression' && order[op] < order[right.operator]) str += "(" + stringify(right, prec) + ")";else if (right.type === 'MathExpression' && op === "-" && ["+", "-"].includes(right.operator)) {
          // fix #52 : a-(b+c) = a-b-c
          right.operator = (0, reducer.flip)(right.operator);
          str += stringify(right, prec);
        } else str += stringify(right, prec);

        return str;
      }
    case "Value":
      return round(node.value, prec);
    case 'CssVariable':
      return node.value;
    default:
      return round(node.value, prec) + node.unit;
  }
}

module.exports = exports["default"];
});

unwrapExports(stringifier);

var dist = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});



var _postcssValueParser2 = _interopRequireDefault(lib);





var _reducer2 = _interopRequireDefault(reducer);



var _stringifier2 = _interopRequireDefault(stringifier);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-line
var MATCH_CALC = /((?:\-[a-z]+\-)?calc)/;

exports.default = function (value) {
  var precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;

  return (0, _postcssValueParser2.default)(value).walk(function (node) {
    // skip anything which isn't a calc() function
    if (node.type !== 'function' || !MATCH_CALC.test(node.value)) return;

    // stringify calc expression and produce an AST
    var contents = _postcssValueParser2.default.stringify(node.nodes);

    // skip constant() and env()
    if (contents.indexOf('constant') >= 0 || contents.indexOf('env') >= 0) return;

    var ast = parser_1.parser.parse(contents);

    // reduce AST to its simplest form, that is, either to a single value
    // or a simplified calc expression
    var reducedAst = (0, _reducer2.default)(ast, precision);

    // stringify AST and write it back
    node.type = 'word';
    node.value = (0, _stringifier2.default)(node.value, reducedAst, precision);
  }, true).toString();
};

module.exports = exports['default'];
});

var reduce = unwrapExports(dist);

function install (less) {
  const { reduceCalc = true } = this.options || {};

  if (reduceCalc) {
    // Overriding `Call.prototype.genCSS`
    const { genCSS } = less.tree.Call.prototype;
    less.tree.Call.prototype.genCSS = function (context, output) {
      if (this.calc) {
        let buffer = [];
        const proxy = {
          add: chunk => buffer.push(chunk),
          isEmpty: () => buffer.length === 0
        };
        genCSS.call(this, context, proxy);
        output.add(reduce(buffer.join('')));
        return
      }

      genCSS.call(this, context, output);
    };
  }
}

function install$1 (...args) {
[install].forEach(install => install.apply(this, args));
}

var kolor = createCommonjsModule(function (module, exports) {
/**
 * @file Kolor.js
 * @author Justineo(justice360@gmail.com)
 */
(function (define) {

    // Global namespace
    var kolor;

    // ## Config
    //
    // Global configuraiton. See `kolor.config` for more details.

    var config = {
        cssPrecision: 'auto'
    };

    // ## Utilities

    var util = {
        // ### Object utils

        // Checks if the given value is a number.
        isNumber: function (value) {
            return '[object Number]' === Object.prototype.toString.call(value) && isFinite(value);
        },

        // Checks if the given value is a string.
        isString: function (value) {
            return '[object String]' === Object.prototype.toString.call(value);
        },

        // Retrieves the type of the given value.
        //
        // Return value can be 'String', 'Number', 'Object', 'Array', ...
        //
        // *Result might be different among browsers.*
        typeOf: function (value) {
            return Object.prototype.toString.call(value).slice(8, -1);
        },

        // Shorthand method for Object.prototype.hasOwnProperty.
        has: function (obj, key) {
            return Object.prototype.hasOwnProperty.call(obj, key);
        },


        // ### Array utils

        // Slices any array-ish object.
        slice: function (arrayish, begin, end) {
            return Array.prototype.slice.call(arrayish, begin, end);
        },

        // Swaps two array elements.
        swap: function (items, i, j) {
            var k = items[i];
            items[i] = items[j];
            items[j] = k;
        },

        // Shuffles the given array using
        // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle).
        shuffle: function (items) {
            for (var i = items.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                util.swap(items, i, j);
            }
        },

        // Iterates through the given array and produces a new array by mapping each value through
        // a given function.
        map: function (source, callback, context) {
            var results = [];
            var i = source.length;
            while (i--) {
                results[i] = callback.call(context || source, source[i], i);
            }
            return results;
        },


        // ### Number utils

        // Clamps a number to a given range.
        clamp: function (value, min, max) {
            if (min > max) {
                max = min + max;
                min = max - min;
                max = max - min;
            }
            return Math.min(max, Math.max(min, value));
        },

        // Wraps a number inside a given range with modulo operation.
        wrap: function (value, min, max) {
            var interval;
            if (min > max) {
                max = min + max;
                min = max - min;
                max = max - min;
            }
            interval = max - min;
            return min + ((value % interval) + interval) % interval;
        },

        // Fills leading zeros for a number to make sure it has a fixed width.
        zeroFill: function (number, width) {
            number += '';
            width -= number.length;
            if (width > 0) {
                return new Array(width + 1).join('0') + number;
            }
            return number + '';
        },

        // Generates a random number in a given range.
        random: function (min, max) {
            if (min === max) {
                return min;
            }
            return Math.random() * (max - min) + min;
        },

        // Extend the destination object from a source object.
        extend: function (dest, source) {
            for (var key in source) {
                dest[key] = source[key];
            }
            return dest;
        }
    };


    // ## Preparation

    // ### Color name-hex map
    //
    // see [Named Colors, CSS Color Module Level 4](http://dev.w3.org/csswg/css-color/#named-colors)
    var NAMED_COLORS = {
        aliceblue: '#f0f8ff',
        antiquewhite: '#faebd7',
        aqua: '#00ffff',
        aquamarine: '#7fffd4',
        azure: '#f0ffff',
        beige: '#f5f5dc',
        bisque: '#ffe4c4',
        black: '#000000',
        blanchedalmond: '#ffebcd',
        blue: '#0000ff',
        blueviolet: '#8a2be2',
        brown: '#a52a2a',
        burlywood: '#deb887',
        cadetblue: '#5f9ea0',
        chartreuse: '#7fff00',
        chocolate: '#d2691e',
        coral: '#ff7f50',
        cornflowerblue: '#6495ed',
        cornsilk: '#fff8dc',
        crimson: '#dc143c',
        cyan: '#00ffff',
        darkblue: '#00008b',
        darkcyan: '#008b8b',
        darkgoldenrod: '#b8860b',
        darkgray: '#a9a9a9',
        darkgreen: '#006400',
        darkgrey: '#a9a9a9',
        darkkhaki: '#bdb76b',
        darkmagenta: '#8b008b',
        darkolivegreen: '#556b2f',
        darkorange: '#ff8c00',
        darkorchid: '#9932cc',
        darkred: '#8b0000',
        darksalmon: '#e9967a',
        darkseagreen: '#8fbc8f',
        darkslateblue: '#483d8b',
        darkslategray: '#2f4f4f',
        darkslategrey: '#2f4f4f',
        darkturquoise: '#00ced1',
        darkviolet: '#9400d3',
        deeppink: '#ff1493',
        deepskyblue: '#00bfff',
        dimgray: '#696969',
        dimgrey: '#696969',
        dodgerblue: '#1e90ff',
        firebrick: '#b22222',
        floralwhite: '#fffaf0',
        forestgreen: '#228b22',
        fuchsia: '#ff00ff',
        gainsboro: '#dcdcdc',
        ghostwhite: '#f8f8ff',
        gold: '#ffd700',
        goldenrod: '#daa520',
        gray: '#808080',
        green: '#008000',
        greenyellow: '#adff2f',
        grey: '#808080',
        honeydew: '#f0fff0',
        hotpink: '#ff69b4',
        indianred: '#cd5c5c',
        indigo: '#4b0082',
        ivory: '#fffff0',
        khaki: '#f0e68c',
        lavender: '#e6e6fa',
        lavenderblush: '#fff0f5',
        lawngreen: '#7cfc00',
        lemonchiffon: '#fffacd',
        lightblue: '#add8e6',
        lightcoral: '#f08080',
        lightcyan: '#e0ffff',
        lightgoldenrodyellow: '#fafad2',
        lightgray: '#d3d3d3',
        lightgreen: '#90ee90',
        lightgrey: '#d3d3d3',
        lightpink: '#ffb6c1',
        lightsalmon: '#ffa07a',
        lightseagreen: '#20b2aa',
        lightskyblue: '#87cefa',
        lightslategray: '#778899',
        lightslategrey: '#778899',
        lightsteelblue: '#b0c4de',
        lightyellow: '#ffffe0',
        lime: '#00ff00',
        limegreen: '#32cd32',
        linen: '#faf0e6',
        magenta: '#ff00ff',
        maroon: '#800000',
        mediumaquamarine: '#66cdaa',
        mediumblue: '#0000cd',
        mediumorchid: '#ba55d3',
        mediumpurple: '#9370db',
        mediumseagreen: '#3cb371',
        mediumslateblue: '#7b68ee',
        mediumspringgreen: '#00fa9a',
        mediumturquoise: '#48d1cc',
        mediumvioletred: '#c71585',
        midnightblue: '#191970',
        mintcream: '#f5fffa',
        mistyrose: '#ffe4e1',
        moccasin: '#ffe4b5',
        navajowhite: '#ffdead',
        navy: '#000080',
        oldlace: '#fdf5e6',
        olive: '#808000',
        olivedrab: '#6b8e23',
        orange: '#ffa500',
        orangered: '#ff4500',
        orchid: '#da70d6',
        palegoldenrod: '#eee8aa',
        palegreen: '#98fb98',
        paleturquoise: '#afeeee',
        palevioletred: '#db7093',
        papayawhip: '#ffefd5',
        peachpuff: '#ffdab9',
        peru: '#cd853f',
        pink: '#ffc0cb',
        plum: '#dda0dd',
        powderblue: '#b0e0e6',
        purple: '#800080',
        red: '#ff0000',
        rebeccapurple: '#663399',
        rosybrown: '#bc8f8f',
        royalblue: '#4169e1',
        saddlebrown: '#8b4513',
        salmon: '#fa8072',
        sandybrown: '#f4a460',
        seagreen: '#2e8b57',
        seashell: '#fff5ee',
        sienna: '#a0522d',
        silver: '#c0c0c0',
        skyblue: '#87ceeb',
        slateblue: '#6a5acd',
        slategray: '#708090',
        slategrey: '#708090',
        snow: '#fffafa',
        springgreen: '#00ff7f',
        steelblue: '#4682b4',
        tan: '#d2b48c',
        teal: '#008080',
        thistle: '#d8bfd8',
        tomato: '#ff6347',
        turquoise: '#40e0d0',
        violet: '#ee82ee',
        wheat: '#f5deb3',
        white: '#ffffff',
        whitesmoke: '#f5f5f5',
        yellow: '#ffff00',
        yellowgreen: '#9acd32',

        transparent: 'rgba(0, 0, 0, 0)' // CSS keyword
    };

    // ### Named hues
    //
    // see [Simple Named Hues: the <named-hue> term, CSS Color Module Level 4](http://dev.w3.org/csswg/css-color/#simple-hues)
    //
    // #### Base hues
    var BASE_HUE = {
        red: 0,
        orange: 30,
        yellow: 60,
        green: 120,
        blue: 240,
        purple: 300
    };

    // #### Splash hues
    var SPLASH_HUE = {
        reddish: 0,
        orangish: 30,
        yellowish: 60,
        greenish: 120,
        bluish: 240,
        purplish: 300
    };

    // Sorted base hues in array
    var NAMED_HUE_INDEX = {
        0: 0,
        30: 1,
        60: 2,
        120: 3,
        240: 4,
        300: 5
    };

    // 0 -> 360 in some circumstances for correct calculation
    function fixHues(h1, h2) {
        var diff = Math.abs(NAMED_HUE_INDEX[h1] - NAMED_HUE_INDEX[h2]);
        if (diff !== 1 && diff !== 5) {
            return false;
        }

        var result = {
            h1: h1,
            h2: h2
        };
        if (h1 === 0 && h2 === 300) {
            result.h1 = 360;
        } else if (h2 === 0 && h1 === 300) {
            result.h2 = 360;
        }
        return result;
    }

    // Parses simple named hues
    function parseNamedHues(value) {
        var tokens = value.split(/\s+/);
        var l = tokens.length;

        if (l < 1 || l > 2) {
            return false;
        }

        var t1 = tokens[l - 1].toLowerCase();

        if (!(t1 in BASE_HUE)) {
            return false;
        }

        var h1 = BASE_HUE[t1];

        // single-value syntax
        if (l === 1) {
            return h1;
        }

        // double-value syntax
        var h2;
        var t2 = tokens[0].toLowerCase();
        var hues;
        if (t2 in BASE_HUE) {
            h2 = BASE_HUE[t2];
            hues = fixHues(h1, h2);
            return hues ? (hues.h1 + hues.h2) / 2 : false;
        } else if (t2 in SPLASH_HUE) {
            h2 = SPLASH_HUE[t2];
            hues = fixHues(h1, h2);
            return hues ? (hues.h1 + (hues.h2 - hues.h1) / 4) : false;
        } else {
            var found = t2.match(/(\w+)\(\s*([^\)]+)\s*\)/i);
            if (!found) {
                return false;
            }
            t2 = found[1];
            if (t2 in SPLASH_HUE) {
                h2 = SPLASH_HUE[t2];
                hues = fixHues(h1, h2);
                var percent = DATATYPES[PERCENT].parse(found[2]);
                if (percent === false) {
                    return percent;
                }
                return hues ? (hues.h1 + (hues.h2 - hues.h1) * percent) : false;
            }
        }

        return false;
    }

    // ### Color value data type flags
    //
    // Uses powers of 2 in order to easily define several data types for one data field.
    //
    // * INTEGER: 0, 128, 255, ...
    // * NUMBER: 0, 0.5, 0.75, ...
    // * PERCENT: 10%, 87.53%, ...
    var INTEGER = 1;
    var NUMBER = 2;
    var PERCENT = 4;
    var HUE = 8;

    // ### Utils for each data type
    //
    // * *parse* - gets valid value from various types of input.
    // * *stringify* - produces string value according to actual data value.
    var DATATYPES = {
        1: {
            flag: INTEGER,
            parse: function (value) {
                switch (util.typeOf(value)) {
                    case 'Number':
                        value = Math.round(value);
                        break;
                    case 'String':
                        if (value.match(/^[\-+]?\d+$/i)) {
                            value = parseInt(value, 10);
                        } else {
                            value = false;
                        }
                        break;
                    default:
                        value = false;
                }
                return value;
            },
            stringify: function (value) {
                return Math.round(value) + '';
            }
        },
        2: {
            flag: NUMBER,
            parse: function (value) {
                switch (util.typeOf(value)) {
                    case 'Number':
                        break;
                    case 'String':
                        if (value.match(/^[\-+]?\d+(?:\.\d+)?$|^[\-+]?\.\d+$/i)) {
                            value = parseFloat(value);
                        } else {
                            value = false;
                        }
                        break;
                    default:
                        value = false;
                }
                return value;
            },
            stringify: function (value) {
                var precision = config.cssPrecision;
                return precision === 'auto'
                    ? value + ''
                    : parseFloat(value.toFixed(precision)) + '';
            }
        },
        4: {
            flag: PERCENT,
            parse: function (value) {
                switch (util.typeOf(value)) {
                    case 'String':
                        if (value.match(/^[\-+]?\d+(?:\.\d+)?%$|^[\-+]?\.\d+%$/i)) {
                            value = parseFloat(value) / 100;
                        } else {
                            value = false;
                        }
                        break;
                    default:
                        value = false;
                }
                return value;
            },
            stringify: function (value) {
                var precision = config.cssPrecision;
                return precision === 'auto'
                    ? value * 100 + '%'
                    : parseFloat((value * 100).toFixed(precision)) + '%';
            }
        },
        8: {
            flag: HUE,
            parse: function (value) {
                switch (util.typeOf(value)) {
                    case 'String':
                        if (value.match(/^[\-+]?\d+(?:\.\d+)?deg$|^[\-+]?\.\d+deg$/i)) {
                            value = parseFloat(value);
                        } else if (value = parseNamedHues(value)) ; else {
                            value = false;
                        }
                        break;
                    default:
                        value = false;
                }
                return value;
            },
            stringify: function (value) {
                var precision = config.cssPrecision;
                return precision === 'auto'
                    ? value + 'deg'
                    : parseFloat(value.toFixed(precision)) + 'deg';
            }
        }
    };

    // ### Value filters
    function CLAMP(value) {
        return util.clamp(value, this.range[0], this.range[1]);
    }


    function MOD(value) {
        return util.wrap(value, this.range[0], this.range[1]);
    }

    // ### Color channels
    //
    function Channel(options) {
        this.optional = false;
        util.extend(this, options);
    }

    // #### Channel.create(*type*, *name*, *alias*[, *options*])
    //
    // Create a color channel.
    //
    // ##### Parameters
    // * *type* - the channel type.
    // * *name* - the name of the channel.
    // * *alias* - the alias of the channel.
    // * *options* - additional options of the channel.
    //
    // ##### Return values
    // Returns the created channel object.
    Channel.create = function (type, name, alias, options) {
        return new type(util.extend(options || {}, {
            name: name,
            alias: alias
        }));
    };

    // Constructor for 0~255 integer or percentage.
    function Octet() {
        Channel.apply(this, arguments);
        this.dataType = INTEGER | PERCENT;
        this.cssType = INTEGER;
        this.range = [0, 255];
        this.filter = CLAMP;
        this.initial = 255;
    }
    Octet.prototype = new Channel();
    Octet.prototype.constructor = Octet;

    // Constructor for channel can be number from 0~1 or percentage.
    function Ratio() {
        Channel.apply(this, arguments);
        this.dataType = NUMBER | PERCENT;
        this.cssType = NUMBER;
        this.range = [0, 1];
        this.filter = CLAMP;
        this.initial = 1;
    }
    Ratio.prototype = new Channel();
    Ratio.prototype.constructor = Ratio;

    // Constructor for ratios which output percent values.
    function Percent() {
        Ratio.apply(this, arguments);
        this.cssType = PERCENT;
    }
    Percent.prototype = new Ratio();
    Percent.prototype.constructor = Percent;

    // Constructor for those channel can be .
    function Hue() {
        Channel.apply(this, arguments);
        this.dataType = NUMBER | HUE;
        this.cssType = NUMBER;
        this.range = [0, 360];
        this.filter = MOD;
        this.initial = 0;
    }
    Hue.prototype = new Channel();
    Hue.prototype.constructor = Hue;

    // ### Color space configurations
    var SPACES = {
        RGB: {
            channels: [
                Channel.create(Octet, 'red', 'r'),
                Channel.create(Octet, 'green', 'g'),
                Channel.create(Octet, 'blue', 'b')
            ],
            pattern: /rgb\(\s*([^,]+?)\s*,\s*([^,]+?)\s*,\s*([^\)]+?)\s*\)/i
        },
        RGBA: {
            channels: [
                Channel.create(Octet, 'red', 'r'),
                Channel.create(Octet, 'green', 'g'),
                Channel.create(Octet, 'blue', 'b'),
                Channel.create(Ratio, 'alpha', 'a')
            ],
            pattern: /rgba\(\s*([^,]+?)\s*,\s*([^,]+?)\s*,\s*([^,]+?)\s*,\s*([^\)]+?)\s*\)/i
        },
        HSL: {
            channels: [
                Channel.create(Hue, 'hue', 'h'),
                Channel.create(Percent, 'saturation', 's'),
                Channel.create(Percent, 'lightness', 'l')
            ],
            pattern: /hsl\(\s*([^,]+?)\s*,\s*([^,]+?)\s*,\s*([^\)]+?)\s*\)/i
        },
        HSLA: {
            channels: [
                Channel.create(Hue, 'hue', 'h'),
                Channel.create(Percent, 'saturation', 's'),
                Channel.create(Percent, 'lightness', 'l'),
                Channel.create(Ratio, 'alpha', 'a')
            ],
            pattern: /hsla\(\s*([^,]+?)\s*,\s*([^,]+?)\s*,\s*([^,]+?)\s*,\s*([^\)]+?)\s*\)/i
        },
        HSV: {
            channels: [
                Channel.create(Hue, 'hue', 'h'),
                Channel.create(Percent, 'saturation', 's'),
                Channel.create(Percent, 'value', 'v')
            ],
            pattern: /hsv\(\s*([^,]+?)\s*,\s*([^,]+?)\s*,\s*([^\)]+?)\s*\)/i
        },
        HSVA: {
            channels: [
                Channel.create(Hue, 'hue', 'h'),
                Channel.create(Percent, 'saturation', 's'),
                Channel.create(Percent, 'value', 'v'),
                Channel.create(Ratio, 'alpha', 'a')
            ],
            pattern: /hsva\(\s*([^,]+?)\s*,\s*([^,]+?)\s*,\s*([^,]+?)\s*,\s*([^\)]+?)\s*\)/i
        },
        HWB: {
            channels: [
                Channel.create(Hue, 'hue', 'h'),
                Channel.create(Percent, 'whiteness', 'w'),
                Channel.create(Percent, 'blackness', 'b'),
                Channel.create(Ratio, 'alpha', 'a', {optional: true})
            ],
            pattern: /hwb\(\s*([^,]+?)\s*,\s*([^,]+?)\s*,\s*([^,\)]+?)(?:\s*,\s*([^\)]+?))?\s*\)/i
        },
        GRAY: {
            channels: [
                Channel.create(Octet, 'shade', 's'),
                Channel.create(Ratio, 'alpha', 'a')
            ],
            pattern: /gray\(\s*([^,\)]+?)(?:\s*,\s*([^\)]+?))?\s*\)/i
        },
        CMYK: {
            channels: [
                Channel.create(Ratio, 'cyan', 'c'),
                Channel.create(Ratio, 'magenta', 'm'),
                Channel.create(Ratio, 'yellow', 'y'),
                Channel.create(Ratio, 'black', ['b', 'k']),
                Channel.create(Ratio, 'alpha', 'a', {optional: true})
            ],
            pattern: /(?:device-)?cmyk\(\s*([^,]+?)\s*,\s*([^,]+?)\s*,\s*([^,]+?)\s*,\s*([^,]+?)(?:\s*,\s*([^\)]+?))?\s*\)/i
        }
    };

    // ### Space converting algorithms

    // Clones a color object in the same space.
    function CLONE() {
        return kolor(this);
    }

    // Produces a new color object by adding alpha channel to the old one.
    function ADD_ALPHA() {
        var space = this.space();
        var channels = SPACES[space].channels;
        var result = [];

        var l = channels.length;
        for (var i = 0; i < l; i++) {
            result.push(this[channels[i].name]());
        }
        result.push(1);
        return new kolor[space + 'A'](result);
    }

    // Produces a new color object by removing alpha channel from the old one.
    function REMOVE_ALPHA() {
        var space = this.space();
        var channels = SPACES[space].channels;
        var result = [];

        var l = channels.length;
        for (var i = 0; i < l - 1; i++) {
            result.push(this[channels[i].name]());
        }
        return new kolor[space.slice(0, -1)](result);
    }

    // Naively converts RGBA color to CMYK
    function RGBA_TO_CMYK() {
        var r = this.r() / 255;
        var g = this.g() / 255;
        var b = this.b() / 255;
        var black = 1 - Math.max(r, g, b);

        if (black === 0) {
            return kolor.cmyk(0, 0, 0, 0);
        }

        var c = (1 - r - black) / (1 - black);
        var m = (1 - g - black) / (1 - black);
        var y = (1 - b - black) / (1 - black);
        return kolor.cmyk(c, m, y, black, this.a());
    }

    // Converts RGBA color to HSLA.
    function RGBA_TO_HSLA() {
        var r = this.r() / 255;
        var g = this.g() / 255;
        var b = this.b() / 255;
        var a = this.a();
        var max = Math.max(r, g, b);
        var min = Math.min(r, g, b);
        var diff = max - min;
        var sum = max + min;
        var h;
        var s;
        var l;

        if (max === min) {
            h = 0;
        } else if (max === r && g >= b) {
            h = 60 * (g - b) / diff + 0;
        } else if (max === r && g < b) {
            h = 60 * (g - b) / diff + 360;
        } else if (max === g) {
            h = 60 * (b - r) / diff + 120;
        } else { // max === b
            h = 60 * (r - g) / diff + 240;
        }

        l = sum / 2;

        if (l === 0 || max === min) {
            s = 0;
        } else if (0 < l && l <= 0.5) {
            s = diff / sum;
        } else { // l > 0.5
            s = diff / (2 - sum);
        }

        return kolor.hsla(h, s, l, a);
    }

    // Converts RGBA color to HSVA.
    function RGBA_TO_HSVA() {
        var r = this.r() / 255;
        var g = this.g() / 255;
        var b = this.b() / 255;
        var a = this.a();
        var max = Math.max(r, g, b);
        var min = Math.min(r, g, b);
        var diff = max - min;
        var h;
        var s;

        if (max === min) {
            h = 0;
        } else if (max === r && g >= b) {
            h = 60 * (g - b) / diff + 0;
        } else if (max === r && g < b) {
            h = 60 * (g - b) / diff + 360;
        } else if (max === g) {
            h = 60 * (b - r) / diff + 120;
        } else { // max === b
            h = 60 * (r - g) / diff + 240;
        }

        if (max === 0) {
            s = 0;
        } else {
            s = diff / max;
        }

        var v = max;
        return kolor.hsva(h, s, v, a);
    }

    // Converts RGBA color to GRAY
    function RGBA_TO_GRAY() {
        return this.grayscale();
    }

    // Converts HSLA color to RGBA.
    function HSLA_TO_RGBA() {
        var h = this.h();
        var s = this.s();
        var l = this.l();
        var a = this.a();
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        var hk = h / 360;
        var t = {};
        var rgb = {};

        t.r = hk + 1 / 3;
        t.g = hk;
        t.b = hk - 1 / 3;

        var c;

        for (c in t) {
            t[c] < 0 && t[c] ++;
            t[c] > 1 && t[c] --;
        }

        for (c in t) {
            if (t[c] < 1 / 6) {
                rgb[c] = p + ((q - p) * 6 * t[c]);
            } else if (1 / 6 <= t[c] && t[c] < 0.5) {
                rgb[c] = q;
            } else if (0.5 <= t[c] && t[c] < 2 / 3) {
                rgb[c] = p + ((q - p) * 6 * (2 / 3 - t[c]));
            } else { // t[c] >= 2 / 3
                rgb[c] = p;
            }
            rgb[c] *= 255;
        }

        return kolor.rgba(rgb.r, rgb.g, rgb.b, a);
    }

    // Converts HSLA color to HSVA.
    function HSLA_TO_HSVA() {
        var h = this.h();
        var s = this.s();
        var l = this.l();
        var a = this.a();

        l *= 2;
        s *= (l <= 1) ? l : 2 - l;
        var v = (l + s) / 2;
        var sv = (2 * s) / (l + s);
        return kolor.hsva(h, sv, v, a);
    }

    // Converts HSVA color to RGBA.
    function HSVA_TO_RGBA() {
        var h = this.h();
        var s = this.s();
        var v = this.v();
        var a = this.a();
        var hi = Math.floor(h / 60);
        var f = h / 60 - hi;
        var p = v * (1 - s);
        var q = v * (1 - f * s);
        var t = v * (1 - (1 - f) * s);
        var rgba;

        switch (hi) {
            case 0:
                rgba = [v, t, p, a]; break;
            case 1:
                rgba = [q, v, p, a]; break;
            case 2:
                rgba = [p, v, t, a]; break;
            case 3:
                rgba = [p, q, v, a]; break;
            case 4:
                rgba = [t, p, v, a]; break;
            case 5:
                rgba = [v, p, q, a]; break;
            default:
                rgba = [0, 0, 0, a];
        }

        for (var i = rgba.length - 1; i--;) {
            rgba[i] *= 255;
        }

        return kolor.rgba(rgba);
    }

    // Converts HSVA color to HSLA.
    function HSVA_TO_HSLA() {
        var h = this.h();
        var s = this.s();
        var v = this.v();
        var a = this.a();

        var l = (2 - s) * v;
        var sl = s * v;
        sl /= (l <= 1) ? l : 2 - l;
        sl = sl || 0;
        l /= 2;
        return kolor.hsla(h, sl, l, a);
    }

    // Converts HSVA color to HWB.
    function HSVA_TO_HWB() {
        var h = this.h();
        var s = this.s();
        var v = this.v();
        var a = this.a();
        return kolor.hwb(h, (1 - s) * v, 1 - v, a);
    }

    // Converts HWB color to HSVA.
    function HWB_TO_HSVA() {
        var h = this.h();
        var w = this.w();
        var b = this.b();
        var a = this.a();
        return kolor.hsva(h, 1 - w / (1 - b), 1 - b, a);
    }

    // Converts GRAY color to RGBA.
    function GRAY_TO_RGBA() {
        var s = this.s();
        var a = this.a();

        return kolor.rgba(s, s, s, a);
    }

    // Naively converts CMYK color to RGBA.
    function CMYK_TO_RGBA() {
        var c = this.c();
        var m = this.m();
        var y = this.y();
        var black = this.b();

        var r = 1 - Math.min(1, c * (1 - black) + black);
        var g = 1 - Math.min(1, m * (1 - black) + black);
        var b = 1 - Math.min(1, y * (1 - black) + black);
        return kolor.rgba(r * 255, g * 255, b * 255, this.a());
    }

    var CONVERTERS = {
        RGB: {
            RGBA: ADD_ALPHA
        },
        RGBA: {
            RGB: REMOVE_ALPHA,
            HSLA: RGBA_TO_HSLA,
            HSVA: RGBA_TO_HSVA,
            GRAY: RGBA_TO_GRAY,
            CMYK: RGBA_TO_CMYK
        },
        HSL: {
            HSLA: ADD_ALPHA
        },
        HSLA: {
            HSL: REMOVE_ALPHA,
            HSVA: HSLA_TO_HSVA,
            RGBA: HSLA_TO_RGBA
        },
        HSV: {
            HSVA: ADD_ALPHA
        },
        HSVA: {
            HSV: REMOVE_ALPHA,
            RGBA: HSVA_TO_RGBA,
            HSLA: HSVA_TO_HSLA,
            HWB: HSVA_TO_HWB
        },
        HWB: {
            HSVA: HWB_TO_HSVA
        },
        GRAY: {
            RGBA: GRAY_TO_RGBA
        },
        CMYK: {
            RGBA: CMYK_TO_RGBA
        }
    };

    // Breadth-first search to find the conversion path
    function getConverters(from, to) {
        if (from === to) {
            return [];
        }

        if (CONVERTERS[from][to]) {
            return [to];
        }

        var queue = [from];
        var path = {};
        path[from] = [];

        while (queue.length) {
            var v = queue.shift();
            for (var w in CONVERTERS[v]) {
                if (!path[w]) {
                    queue.push(w);
                    path[w] = path[v].concat([w]);
                    if (w === to) {
                        return path[w];
                    }
                }
            }
        }

        return null;
    }


    // Filters input value according to data type definitions and color space configurations.
    function filterValue(value, channel) {
        var type;
        for (var key in DATATYPES) {
            type = DATATYPES[key];
            if (type.flag & channel.dataType) {
                var val = type.parse(value);
                if (val !== false) {
                    if (type.flag === PERCENT) {
                        val *= Math.abs(channel.range[1] - channel.range[0]);
                    }
                    return channel.filter(val);
                }
            }
        }
        return channel.initial;
    }


    // ## kolor API

    // #### kolor(*exp*)
    //
    // `kolor` as a function is used as a factory method to parse given expressions into color objects.
    //
    // ##### Parameters
    //
    // * *exp* - the expression to be parsed. If *exp* is another color object, the factory method clones and
    // returns it as the result. If *exp* is a string, it can be any of the following types:
    //        * A color name defined in `NAMED_COLORS`.
    //        * A hex value like `#FF0000`, `#F00`, or even `ff0000`, `F00`, etc.
    //        * A CSS-style color expression like `rgba(255, 0, 0, 1)`, `hsl(120, 50%, 25%)`, etc.
    //
    // ##### Return values
    //
    // Returns a color object in a certain space decided by the given expression. Color names and hex values
    // result in RGB colors, while CSS-style expressions specify the output space themselves.
    kolor = function (exp) {

        // Check if the input is another color object by checking the private attribute `_space`.
        if (exp._space && util.has(kolor, exp._space)) {
            return new kolor[exp._space](exp.toArray());
        }

        // Check if the input is a predefined color name and create again using hex value on success.
        if (util.has(NAMED_COLORS, exp)) {
            return kolor(NAMED_COLORS[exp.toLowerCase()]);
        }

        // Try to match hex values, return RGB/RGBA color on success.
        var pattern = /^\s*#?([0-9a-f]{3}[0-9a-f]?|[0-9a-f]{6}(?:[0-9a-f]{2})?)\s*$/i;
        var match;
        if (match = exp.match(pattern)) {
            var hex = match[1];

            if (hex.length <= 4) {
                hex = util.map(hex.split(''), function (ch) {
                    return ch + ch;
                }).join('');
            }

            var channels = util.map(hex.match(/\w{2}/g), function (val, i) {
                var decimal = parseInt(val, 16);
                return i === 3 ? decimal * 100 / 255 + '%' : decimal;
            });

            var space = channels.length === 4 ? 'RGBA' : 'RGB';
            return new kolor[space](channels);
        }

        // Recognize specific space with pattern mathing and return color object in corresponding space.
        for (var key in SPACES) {
            match = exp.match(SPACES[key].pattern);
            if (match) {
                var args = match.slice(1);
                return new kolor[key](args);
            }
        }

        // Return false if fail to parse the input expression.
        return false;
    };

    for (var key in SPACES) {

        // ### Factory methods for each color space

        // #### kolor.*space*(*values*)
        //
        // Creates a color object using a space name defined in `SPACES`.
        //
        // ##### Parameters
        //
        // * *values* - the expression carries channel values of the color. It can be separate values,
        // an array or an object containing specific key-value pairs.
        //
        //    For example,
        //
        //    * kolor.rgb(255, 0, 0)
        //    * kolor.rgb([255, 0, 0])
        //    * kolor.rgb({ r: 255, g: 0, b: 0 })
        kolor[key.toLowerCase()] = (function (key) {
            return function () {
                var args = util.slice(arguments, 0);
                var type = util.typeOf(args[0]);
                if (type === 'Array' || type === 'Object') {
                    args = args[0];
                }
                return new kolor[key](args);
            };
        }(key));

        var space = SPACES[key];
        var channels = space.channels;

        // ### Constructor
        //
        // When `kolor` is used as a factory method, it will call these constructors.
        kolor[key] = (function (key) {
            return function (args) {
                var channels = SPACES[key].channels;
                var l = channels.length;
                args = args == null ? [] : args;
                this._space = key;
                for (var i = l; i--;) {
                    var channel = channels[i];
                    var name = channel.name;
                    var alias = channel.alias;
                    var param;

                    if (args[i] != null) {
                        param = args[i];
                    } else if (util.has(args, name)) {
                        param = args[name];
                    } else {
                        alias = util.isString(alias) ? [alias] : alias;
                        for (var j = 0, k = alias.length; j < k; j++) {
                            if (util.has(args, alias[j])) {
                                param = args[alias[j]];
                                break;
                            }
                        }
                        if (param == null) {
                            param = channel.initial;
                        }
                    }
                    this[name](param);
                }
                this.length = l;
            };
        })(key);

        // ### Accessors
        //
        // #### .*accessor*([*value*])
        //
        // kolor uses jQuery-like accessors.
        //
        // Different color spaces have different accessors, for example
        //
        // * for RGB colors `color.red()` retrieves channel value and `color.red(100)` sets it;
        // * for HSL we've got `color.hue()` and `color.hue(120)`
        //
        // Shorthand accessors like `color.r()`, `color.h()` are also available.
        //
        // ##### Parameters
        //
        // * *value* - if not null, sets the specified channel to the given value, or returns the value
        // of the specified channel.
        //
        // ##### Return values
        //
        // Returns the channel value when used as a getter, or the color object itself when used as a
        // getter.
        for (var i = channels.length; i--;) {
            var channel = channels[i];
            var alias = channel.alias;

            kolor[key].prototype[channel.name] = function (i) {
                var channel = channels[i];
                var prop = '_' + channel.alias;
                return function (value) {
                    if (value != null) {
                        this[prop] = this[i] = filterValue(value, channel);
                        return this;
                    } else {
                        return this[prop];
                    }
                };
            }(i);

            if (util.typeOf(alias) === 'String') {
                alias = [alias];
            }
            for (var j = alias.length; j--;) {
                kolor[key].prototype[alias[j]] = kolor[key].prototype[channel.name];
            }
        }

        // #### .space()
        //
        // A getter for the space of the color object.
        //
        // ##### Return values
        //
        // Returns the space string in all caps such as `RGBA`, `HSV`, etc.
        kolor[key].prototype.space = function () {
            return this._space;
        };

        // #### .format()
        //
        // Deprecated. Same as `.space()` and preserved just for backward compatibility.
        //
        // ##### Return values
        //
        // Returns the space string in all caps such as `RGBA`, `HSV`, etc.
        kolor[key].prototype.format = function () {
            return this.space();
        };

        // ### Converters
        //
        // #### .*converter*()
        //
        // Converts the color to the specified space. Converter names are lower-cased space names.
        //
        // ##### Return values
        //
        // Returns a new color object in target space, if target space is the same as the original
        // one, a new color object will be cloned and returned.
        for (var target in SPACES) {
            if (key === target) {
                continue;
            }

            // array or null
            var converters = getConverters(key, target);

            kolor[key].prototype[target.toLowerCase()] = (function (key, converters) {
                return function () {
                    if (converters === null) {
                        throw new Error('Can\'t convert ' + key + ' colors into ' + target + '.');
                    }
                    var from = key;
                    var result = this;
                    for (var i = 0, j = converters.length; i < j; i++) {
                        var current = converters[i];
                        var converter = CONVERTERS[from][current];
                        result = converter.call(result);
                        from = current;
                    }
                    return result;
                };
            })(key, converters);
        }
        kolor[key].prototype[key.toLowerCase()] = CLONE;

        // ### Common methods

        // #### .toArray()
        // Produces an array carrying channel values. Because the channel values are stored both in
        // private attribute such as `_red` or `_alpha`, and integer keys start from `0`, the color
        // objects can use some array methods like `slice`.
        //
        // ##### Return values
        // Returns an array consists of the color's channel values.
        //
        // For `rgba(255, 0, 0, 1)`, the return value is `[255, 0, 0, 1]`.
        kolor[key].prototype.toArray = function () {
            return util.slice(this, 0);
        };

        // #### .css(), .toString()
        // Outputs color channel values as a CSS-style string.
        //
        // ##### Return values
        // Returns the CSS-style string for the color object.
        //
        // By CSS-style string we mean something like `rgba(255, 0, 0, 0.5)`, `hsl(30, 80%, 100%)`, etc.
        kolor[key].prototype.css = kolor[key].prototype.toString = function () {
            var channels = SPACES[this.space()].channels;
            var l = channels.length;
            var channel;
            var value;
            var values = [];
            for (var i = 0; i < l; i++) {
                channel = channels[i];
                value = this[channel.name]();
                if (value === channel.initial && channel.optional) {
                    continue;
                }
                values.push(DATATYPES[channel.cssType].stringify(value));
            }
            return this.space().toLowerCase() + '(' + values.join(', ') + ')';
        };

        // #### .hex()
        // Outputs color channels as a hex string.
        //
        // #### Parameters
        // * *keepAlpha* a boolean value that determines if the result should keep the possible
        // alpha channel. `false` by default.
        //
        // ##### Return values
        // Returns a hex string corresponds to the RGB space of the color,
        // which means the color is converted to RGB first and the hex value is produced
        // by its RGB channels.
        kolor[key].prototype.hex = function (keepAlpha) {
            function toHex(n) {
                return util.zeroFill(Math.round(n).toString(16), 2);
            }

            var rgb = this;
            if (this.space() !== 'RGB') {
                rgb = this.rgb();
            }

            var parts = ['#', toHex(rgb.r()), toHex(rgb.g()), toHex(rgb.b())];

            // has alpha channel
            if (keepAlpha && this.a) {
                parts.push(toHex(this.a() * 255));
            }
            return parts.join('');
        };

        // #### .copyFrom(*color*)
        // Converts channel values of another color to the same space as the current one and
        // copies them to the current color.
        //
        // ##### Parameters
        // * *color* - the color to be copied from.
        kolor[key].prototype.copyFrom = function (color) {
            var space = this.space();
            var channels = SPACES[space].channels;
            if (color.space() !== space) {
                color = color[space.toLowerCase()]();
            }
            for (var i = channels.length; i--;) {
                var accessor;
                accessor = channels[i].name;
                this[accessor](color[accessor]());
            }
        };

        // ### LESS/SASS-like APIs

        // #### .mix(*color* [, *proportion* = 0.5])
        // Mixes with another color using additive mixing.
        //
        // Algorithm taken from
        // [SASS source code](http://sass-lang.com/docs/yardoc/Sass/Script/Functions.html#mix-instance_method)
        //
        // ##### Parameters
        // * *color* - a color object to mix with the current one
        // * *proportion* - the proportion of the other color, ranging from 0 to 1.
        //
        // ##### Return values
        // Returns a new color object in the same space as the original one.
        kolor[key].prototype.mix = function (color, proportion) {
            var dest = this.rgba();
            var src = color.rgba();
            var p = proportion == null ? 0.5 : proportion;
            var w = p * 2 - 1;
            var a = dest.a() - src.a();
            var w1 = (((w * a === -1) ? w : (w + a) / (1 + w * a)) + 1) / 2;
            var w2 = 1 - w1;
            dest.r(dest.r() * w1 + src.r() * w2);
            dest.g(dest.g() * w1 + src.g() * w2);
            dest.b(dest.b() * w1 + src.b() * w2);
            dest.a(dest.a() * p + src.a() * (1 - p));
            return dest[this.space().toLowerCase()]();
        };

        // #### .spin(*value*)
        //
        // Increases hue value (decreases if value is less than zero) or say spins the color wheel
        // clockwise by a given degree.
        //
        // ##### Parameters
        // * *value* - the value that the color wheel will spin, in degree.
        //
        // ##### Return values
        // Returns a new color object after spinning in the original space.
        kolor[key].prototype.spin = function (value) {
            var color = this.hsla();
            color.h((color.h() + value) % 360);
            return color[this.space().toLowerCase()]();
        };

        // #### .saturate(*value*)
        //
        // Increases saturation value. Saturation channel here defined by HSL model, not HSV.
        //
        // ##### Parameters
        // * *value* - the amount that the saturation value will increase.
        //
        // ##### Return values
        // Returns a new color object after increasing saturation in the original space.
        kolor[key].prototype.saturate = function (value) {
            var color = this.hsla();
            color.s((color.s() + value));
            return color[this.space().toLowerCase()]();
        };

        // #### .desaturate(*value*)
        //
        // Decreases saturation value. Saturation channel here defined by HSL model, not HSV.
        //
        // ##### Parameters
        // * *value* - the amount that the saturation value will decrease.
        //
        // ##### Return values
        // Returns a new color object after decreasing saturation in the original space.
        kolor[key].prototype.desaturate = function (value) {
            return this.saturate(0 - value);
        };

        // #### .lighten(*value*)
        //
        // Increases lightness value.
        //
        // ##### Parameters
        // * *value* - the amount that the lightness value will the increase.
        //
        // ##### Return values
        // Returns a new color object after increasing lightness in the original space.
        kolor[key].prototype.lighten = function (value) {
            var color = this.hsla();
            color.l((color.l() + value));
            return color[this.space().toLowerCase()]();
        };

        // #### .darken(*value*)
        //
        // Decreases lightness value.
        //
        // ##### Parameters
        // * *value* - the amount that the lightness value will the decrease.
        //
        // ##### Return values
        // Returns a new color object after decreasing lightness in the original space.
        kolor[key].prototype.darken = function (value) {
            return this.lighten(0 - value);
        };

        // #### .fadeIn(*value*)
        //
        // Increases alpha value, will add alpha channel to those don't have it.
        //
        // ##### Parameters
        // * *value* - the amount that the alpha value will the increase.
        //
        // ##### Return values
        // Returns a new color object after increasing alpha in the original space adding
        // an alpha channel.
        // If the original space dosen't have an alpha version, the color will be converted
        // into RGBA.
        kolor[key].prototype.fadeIn = function (value) {
            var space = this.a ? this.space() : this.space() + 'A';
            var color;

            if (util.has(SPACES, space)) {
                color = this[space.toLowerCase()]();
            } else {
                color = this.rgba();
            }
            return color.a(color.a() + value);
        };

        // #### .fadeOut(*value*)
        //
        // Decreases alpha value, will add alpha channel to those don't have it.
        //
        // ##### Parameters
        // * *value* - the amount that the alpha value will the decrease.
        //
        // ##### Return values
        // Returns a new color object after decreasing alpha in the original space.
        kolor[key].prototype.fadeOut = function (value) {
            return this.fadeIn(0 - value);
        };

        // #### .grayscale()
        //
        // Returns the grayscale color by decreasing saturation(HSL) of the current color to 0.
        //
        // ##### Return values
        // Returns a new grayscaled color object in the original space.
        kolor[key].prototype.grayscale = function () {
            return this.desaturate(1);
        };

        // #### .complement()
        //
        // Returns the complement of the current color by spinning the color wheel for 180 degrees.
        //
        // ##### Return values
        // Returns a new complement color object the original space.
        kolor[key].prototype.complement = function () {
            return this.spin(180);
        };

        // #### .luminance()
        //
        // Returns the luminance of a color which indicates how bright the reflecting surface will
        // appear. See [relative luminance, Web Content Accessibility Guidelines (WCAG) 2.0](http://www.w3.org/TR/WCAG20/#relativeluminancedef).
        //
        // ##### Return values
        // The calculated luminance value.
        kolor[key].prototype.luminance = function () {
            function convert(value) {
                value /= 255;
                return value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
            }

            var color = this.rgb();
            var r = convert(color.r());
            var g = convert(color.g());
            var b = convert(color.b());

            return 0.2126 * r + 0.7152 * g + 0.0722 * b;
        };

        // #### .contrastRatio()
        //
        // Returns the contrast ratio of two colors.
        // See [Contrast ratio, CSS Color Module Level 4](http://dev.w3.org/csswg/css-color/#contrast-ratio).
        //
        // ##### Parameters
        // * *color* - the color object to be compared to.
        //
        // ##### Return values
        // The calculated contrast ratio.
        kolor[key].prototype.contrastRatio = function (color) {
            var l1 = this.luminance();
            var l2 = color.luminance();
            return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
        };
    }

    // ### kolor utilities
    // #### kolor.config(*key*, *value*)
    //
    // Global config for kolor.
    //
    // ##### Parameters
    // *key* - the name of the config item.
    // *value* - the config value is to be used.
    //
    // Only one available *key* now:
    //
    // * `cssPrecision` - if set to an integer, kolor keeps at most this number
    //   of digits after the period when outputing CSS expressions using `.css()`
    //   or `.toString()`. `auto` by default, means kolor won't handle precision
    //   when making the output.
    kolor.config = function (key, value) {
        config[key] = value;
    };

    // #### kolor.random(*options*) [unstable API]
    //
    // Generates a random color or color set. Colors are generated in HSL space
    // and different colors will have different hue values and these colors are
    // distributed uniformly across the specified hue range.
    //
    // ##### Parameters
    // *options* - a map consists of the options for the random procedure.
    //
    // * *size* - Number, `1` by default.
    //
    //     The number of colors to generate.
    //
    // * *h* - Array, `[0, 360]` by default.
    //
    //     The range of hue value.
    //
    // * *s* - Number | Array, `[0, 1]` by default.
    //
    //     The range of saturation. If set to a number, use this fixed value.
    //
    // * *l* - Number | Array, `[0, 1]` by default.
    //
    //     The range of lightness. If set to a number, use this fixed value.
    //
    // * *space* - String, `"hex"` by default.
    //
    //     The output space for the generated color(s). Available values include
    //
    //     `hex`, `css` and space names defined in `SPACES`, which are
    //     case-insensitive.
    //
    // * *shuffle* - Boolean, `true` by default.
    //
    //     If the output array should be shuffled.
    //
    // ##### Return values
    // If size is undefined or 1, returns a random color in the specified space.
    // Otherwise, returns an array such colors.
    kolor.random = function (options) {
        options = options || {};

        function getValue(value, defaultValue) {
            return value != null ? value : defaultValue;
        }

        var size = options.size || 1;
        var h = getValue(options.h, [0, 360]);
        var interval = Math.floor(((360 + (h[1] - h[0])) % 360 || 360) / size);
        var offset = Math.random() * interval;
        var s = getValue(options.s, [0, 1]);
        var l = getValue(options.l, [0, 1]);
        var a = getValue(options.a, 1);
        var shuffle = getValue(options.shuffle, true);
        var space = (options.space || 'hex').toLowerCase();
        var colors = [];

        if (interval === 0) {
            throw new Error('To many colors for this hue range!');
        }

        for (var i = 0; i < size; i++) {
            var color = kolor.hsla(
                (360 + h[0] + interval * i + offset) % 360,
                s.length ? util.random(s[0], s[1]) : s,
                l.length ? util.random(l[0], l[1]) : l,
                a.length ? util.random(a[0], a[1]) : a
            );
            if (space === 'hex') {
                color = color.hex();
            } else if (space === 'css') {
                color = color.css();
            } else if (util.has(SPACES, space.toUpperCase())) {
                color = color[space]();
            }
            colors.push(color);
        }

        if (size === 1) {
            return colors[0];
        }

        shuffle && util.shuffle(colors);
        return colors;
    };

    // Everything is ready, export the whole module
    define('kolor', function (require, exports, module) {
        module.exports = kolor;
    });

}( function (id, factory) {

    //
    // Define it the UMD way

    {
        factory(commonjsRequire, exports, module);
    }
}));
});

function isNumber (val) {
  return typeof val === 'number' || !Number.isNaN(val)
}

function isInRanges (h, ranges) {
  return ranges.some(range => {
    if (range.length !== 2 || range.some(edge => !isNumber(edge))) {
      return
    }

    const [min, max] = range.sort((a, b) => a - b);
    return min <= h && h <= max
  })
}

const BASE_LEVEL = 7;
const DARK_B_MAXES = [85, 65, 40];
const LIGHT_B_STEP = 20;
const B_MAX = 100;
const B_MIN = 0;
const S_MAX = 100;
const S_MIN = 5;
const B_CLAMP_S_DEVIATION_RATIO = 0.2;
const LOW_S_DEVIATION_RATIO = 0.4;
const S_COEF = 3.2;

function clamp (value, min, max) {
  if (min > max) {
    [min, max] = [max, min];
  }
  return Math.min(max, Math.max(min, value))
}

function getBrightness (base, level) {
  if (level === BASE_LEVEL) {
    return base
  }

  // dark shades
  if (level > BASE_LEVEL) {
    if (base <= B_MIN) {
      return base
    }

    return (
      B_MIN +
      ((DARK_B_MAXES[level - BASE_LEVEL - 1] - B_MIN) * (base - B_MIN)) /
        (B_MAX - B_MIN)
    )
  }

  // light shades
  return base + (BASE_LEVEL - level) * LIGHT_B_STEP
}

function getSatuation (base, level) {
  if (level === BASE_LEVEL) {
    return base
  }

  // light shades
  if (level > BASE_LEVEL) {
    level--;
  }

  let pl = BASE_LEVEL - 1;
  const portion =
    (S_COEF * level * level +
      ((100 - (pl * pl - 1) * S_COEF) * level) / (pl - 1) +
      ((pl * pl - 1) * S_COEF - 100) / (pl - 1) -
      S_COEF) /
    100;

  if (base > S_MIN) {
    return (base - S_MIN) * portion + S_MIN
  }

  return portion * base
}

function getShade ([h, rawS, rawB], level) {
  const s = rawS * 100;
  const b = rawB * 100;

  if (level === BASE_LEVEL) {
    return [h, s, b]
  }

  let brightness = getBrightness(b, level);
  let deviation =
    s > 0 ? ((Math.log2(100 / s) * s) / 100) * s * LOW_S_DEVIATION_RATIO : 0;

  if (level < BASE_LEVEL) {
    let bPrev = getBrightness(b, BASE_LEVEL - 1);
    // brightness may be clamped
    deviation +=
      bPrev > B_MAX
        ? ((bPrev - B_MAX) / LIGHT_B_STEP) * B_CLAMP_S_DEVIATION_RATIO * s
        : 0;
  }

  let saturation = getSatuation(s - deviation, level);

  return [h, clamp(saturation, 0, S_MAX), clamp(brightness, B_MIN, B_MAX)]
}

function normalize ([h, s, b]) {
  return [Math.round(h), Math.round(s) / 100, Math.round(b) / 100]
}

function install$2 (less, _, functions) {
  functions.add('veui-shade', (base = {}, level = {}) => {
    if (!isNumber(level.value) || level.value < 1 || level.value > 10) {
      throw new Error('`level` should be a number that ≥ 1 and ≤ 10.')
    }

    const color = normalize(
      getShade(
        kolor
          .rgb(base.rgb)
          .hsv()
          .toArray(),
        level.value
      )
    );

    return less.color(
      kolor
        .hsv(color)
        .hex()
        .slice(1)
    )
  });
}

const CONTEXTUAL_RANGES = {
  info: [[210, 225]],
  success: [[95, 155]],
  warning: [[30, 45]],
  error: [[0, 10], [350, 360]]
};

const CONTEXTUAL_COLORS = {
  info: [216, 100, 80],
  success: [149, 100, 75],
  warning: [34, 100, 100],
  error: [7, 100, 80]
};

function isInContextualRanges (h, type) {
  return isInRanges(h, CONTEXTUAL_RANGES[type])
}

function getContextual (color, type) {
  const [h] = color;
  if (isInContextualRanges(h, type)) {
    return [...color]
  }

  return CONTEXTUAL_COLORS[type].map((v, i) => (i === 0 ? v : v / 100))
}

function install$3 (less, _, functions) {
  functions.add('veui-contextual', (base = {}, type = {}) => {
    if (
      !type.value ||
      ['info', 'success', 'warning', 'error'].indexOf(
        type.value.trim().toLowerCase()
      ) === -1
    ) {
      throw new Error(
        '`type` must be one of `info`, `success`, `warning` and `error`.'
      )
    }

    const color = getContextual(
      kolor
        .rgb(base.rgb)
        .hsv()
        .toArray(),
      type.value
    );

    return less.color(
      kolor
        .hsv(color)
        .hex()
        .slice(1)
    )
  });
}

function install$4 (less, _, functions) {
  functions.add('veui-sum', (...values) => {
    const valueDic = values.reduce((acc, value) => {
      if (value.calc) {
        if (!acc.calc) {
          acc.calc = [];
        }
        acc.calc.push(...value.args);
        return acc
      }
      if (value.unit) {
        const unit = value.unit.numerator[0] || '';
        if (!acc[unit]) {
          acc[unit] = 0;
        }
        acc[unit] += value.value;
        return acc
      }
      return acc
    }, {});

    const units = Object.keys(valueDic);
    let merged;
    const nonZero = units.filter(
      unit => valueDic[unit] !== 0 && unit !== 'calc'
    );
    if (nonZero.length === 1) {
      // unified units
      const unit = nonZero[0];
      merged = less.dimension(valueDic[unit], unit);
    } else if (nonZero.length === 0) {
      // all zero
      merged = less.dimension(0);
    } else {
      // different units
      merged = less['call'](
        'calc',
        [sumExp(nonZero.map(unit => less.dimension(valueDic[unit], unit)))],
        0,
        // eslint-disable-next-line no-undef
        typeof fileInfo === 'undefined' ? null : fileInfo
      );
    }

    if (!units.includes('calc')) {
      return merged
    }

    return less['call'](
      'calc',
      [
        sumExp([
          ...valueDic.calc,
          ...(merged.calc ? merged.args : merged.value === 0 ? [] : [merged])
        ])
      ],
      0,
      // eslint-disable-next-line no-undef
      typeof fileInfo === 'undefined' ? null : fileInfo
    )
  });

  function sumExp (operands) {
    if (operands.length < 2) {
      return operands
    }
    if (operands.length === 2) {
      return less.operation('+', operands, true)
    }
    return less.operation(
      '+',
      [sumExp(operands.slice(0, -1)), operands[operands.length - 1]],
      true
    )
  }
}

function install$5 (less, _, functions) {
  functions.add('veui-even', dim => {
    return less.dimension(
      even(dim.value),
      dim.unit.numerator[0]
    )
  });
}

function even (val) {
  return Math.round(val / 2) * 2
}

function install$6 (less, _, functions) {
  functions.add('veui-line-height', (lineHeight, fontSize) => {
    if (lineHeight.unit) {
      const unit = lineHeight.unit.numerator[0] || '';
      if (unit === '') {
        // pure number
        return less.dimension(
          lineHeight.value * fontSize.value,
          fontSize.unit.numerator[0]
        )
      }
      if (unit === '%') {
        return less.dimension(
          (lineHeight.value / 100) * fontSize.value,
          fontSize.unit.numerator[0]
        )
      }
      return lineHeight
    }
    return lineHeight
  });
}

function install$7 (...args) {
[install$2, install$3, install$4, install$5, install$6].forEach(install =>
    install.apply(this, args)
  );
}

var lib$1 = {
  install (...args) {
    install$1.apply(this, args);
    install$7.apply(this, args);
  }
};

module.exports = lib$1;
