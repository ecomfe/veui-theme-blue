module.exports = {
    root: true,
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: 'babel-eslint'
    },
    env: {
        browser: true
    },
    extends: ['plugin:vue/essential'],
    plugins: ['vue'],
    rules: {
        'vue/html-indent': ['error', 4],
        'vue/require-prop-types': ['warn'],
        'vue/require-default-prop': ['warn'],
        'arrow-parens': 0,
        'generator-star-spacing': 0,
        'indent': ['error', 4, {
            'SwitchCase': 1
        }],
        'semi': ['error', 'always'],
        'operator-linebreak': ['error', 'before'],
        'space-before-function-paren': ['error', {
            'anonymous': 'always',
            'named': 'never'
        }],
        'array-bracket-spacing': ['error', 'never'], // 数组紧贴括号部分不允许包含空格
        'object-curly-spacing': ['error', 'never'], // 对象紧贴花括号部分不允许包含空格
        'block-spacing': ['error', 'never'], // 单行代码块中紧贴括号部分不允许包含空格
        'no-multiple-empty-lines': 'error', // 不允许多个空行
        'new-cap': ['error', {
            'newIsCap': true
        }],
        'no-template-curly-in-string': 0,
        // [建议] 文件末尾保留一空行
        'eol-last': 1,
        // [强制] 二元运算符两侧必须有一个空格，一元运算符与操作对象之间不允许有空格
        'space-infix-ops': 2,
        'space-unary-ops': 2,
        // [强制] 用作代码块起始的左花括号 { 前必须有一个空格
        'space-before-blocks': [2, 'always'],
        // [强制] if / else / for / while / function / switch / do / try / catch / finally 关键字后，必须有一个空格。
        'keyword-spacing': 2,
        // [强制] 在对象创建时，属性中的 : 之后必须有空格，: 之前不允许有空格
        'key-spacing': 2,
        // [强制] 函数声明、具名函数表达式、函数调用中，函数名和 ( 之间不允许有空格。
        'no-spaced-func': 2,
        // [强制] , 和 ; 前不允许有空格。如果不位于行尾，, 和 ; 后必须跟一个空格。
        'comma-spacing': [2, {
            'before': false,
            'after': true
        }],
        // [强制] 在函数调用、函数声明、括号表达式、属性访问、if / for / while / switch / catch 等语句中，() 和 [] 内紧贴括号部分不允许有空格。
        'space-in-parens': [2, 'never'],
        // [强制] 单行声明的数组与对象，如果包含元素，{} 和 [] 内紧贴括号部分不允许包含空格。
        'object-curly-spacing': 2,
        // vue标签中有多个属性需要换行
        'vue/max-attributes-per-line': [2, {
            'singleline': 10,
            'multiline': {
                'max': 1,
                'allowFirstLine': false
            }
        }],
        // [强制] 每行不得超过 120 个字符。
        // 'max-len': ['error', {
        //     'code': 120
        // }],
        // [强制] 变量 使用 Camel命名法
        'camelcase': 2,
        'no-console': 'off',
        'no-debugger': 'off',
    }
};
