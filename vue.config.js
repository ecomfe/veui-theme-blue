const path = require('path')
const veuiLoaderOptions = require('./build/veui-loader.conf')

const resolve = dir => {
    return path.join(__dirname, dir)
}

const VEUI_PREFIX = process.env.VEUI_PREFIX || process.env.VUE_APP_VEUI_PREFIX
const vars = {}

module.exports = {
    publicPath: '',
    outputDir: 'dist',
    css: {
        loaderOptions: {
            less: {
                lessOptions: {
                    javascriptEnabled: true,
                    modifyVars: {
                        ...vars,
                        ...(VEUI_PREFIX
                            ? {
                            'veui-prefix': VEUI_PREFIX
                            }
                            : {})
                    }
                }
            }
        }
    },
    transpileDependencies: [
        /[/\\]node_modules[/\\]veui[/\\]/,
        /[/\\]node_modules[/\\]vue-awesome[/\\]/,
        /[/\\]node_modules[/\\]resize-detector[/\\]/,
    ],
    chainWebpack: config => {
        config
            .entry('app')
            .clear()
            .add('./demo/main.js')

        config.plugin('html').tap(args => {
            args[0].template = './demo/index.html'
            return args
        })

        // config.devtool('source-map')

        config.resolve.alias
            .set(
                'vue$',
                process.env.NODE_ENV === 'test'
                ? 'vue/dist/vue.esm.js'
                : 'vue/dist/vue.runtime.esm.js'
            )
            .set('veui-theme-blue', resolve('src'))
            .set('veui-theme-blue-icons', resolve('icons/icons'))
            .set('veui-theme-blue-imgs', resolve('icons/assets/images'))

        // 压缩空格：https://github.com/vuejs/vue/tree/dev/packages/vue-template-compiler#options
        config.module
            .rule('vue')
            .use('vue-loader')
            .tap(options =>
                Object.assign({}, options, {
                    compilerOptions: {
                        whitespace: 'condense'
                    }
                })
            )

        config.module
            .rule('veui')
            .test(/\.vue$/)
            .pre()
            .use('veui-loader')
            .loader('veui-loader')
            .tap(() => veuiLoaderOptions)
    }
}
