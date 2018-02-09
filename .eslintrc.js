// http://eslint.org/docs/user-guide/configuring
module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    env: {
        browser: true,
    },
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    extends: [
        'standard'
    ],
    // required to lint *.vue files
    plugins: [
        'html',
        'import'
    ],
    // add your custom rules here
    'rules': {
        // allow paren-less arrow functions
        "arrow-parens": 0,

        // allow async-await
        'generator-star-spacing': 0,

        // allow debugger during development
        "indent": ["error", 4, { "SwitchCase": 1 }],

        "semi": ["error", "always"],

        "operator-linebreak": ["error", "before"],

        "space-before-function-paren": ["error", { "anonymous": "always", "named": "never" }],

        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
    }
}