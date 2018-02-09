<template>
    <div id="app">
        <nav id="main-nav">
            <h1><a href="https://github.com/ecomfe/veui">VEUI components</a>
            </h1>
            <ul>
                <li v-for="(route, index) in routes" :key="index">
                    <router-link :to='route'>{{route.name}}</router-link>
                </li>
            </ul>
        </nav>
        <main id="content">
            <router-view></router-view>
        </main>
        <console id="console"></console>
    </div>
</template>

<script>
    import routes from './components';
    import Console from './Console';
    import 'vue-awesome/icons/ban';
    import 'vue-awesome/icons/github';

    export default {
        name: 'app',
        components: {
            Console
        },
        data() {
            return {
                routes,
                year: (new Date()).getFullYear()
            };
        }
    };
</script>

<style lang="less">
    @import "~less-plugin-est/src/all.less";
    @import "~veui-theme-bi/common.less";

    @nav-width: 240px;
    @light-bg-color: #f6f9ff;
    @title-height: 30px;
    @console-height: 40vh;
    #app {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }

    #main-nav,
    #console {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
    }

    #main-nav {
        float: left;
        width: @nav-width;
        border-right: 1px solid #eee;
        font-weight: 300;
        h1 {
            position: relative;
            overflow: hidden;
            border-bottom: 1px solid #eee;
            margin: 0;
            font-size: 18px;

            a {
                display: block;
                width: 100%;
                padding: 0 24px;
                color: #333;
                text-decoration: none;
            }

            .veui-icon {
                position: absolute;
                opacity: .05;
                z-index: -1;
                top: -25px;
                right: -5px;
                transition: transform .6s;
            }

            &:hover {
                .veui-icon {
                    transform: scale(0.8);
                    opacity: .1;
                }
            }
        }

        ul {
            height: ~"calc(100vh - 105px)";
            margin: 0;
            padding: 0;
            overflow: auto;
        }

        li {
            a {
                display: block;
                padding: .5em 24px;
                text-decoration: none;
                color: #999;
                outline: none;
                line-height: 2;

                &:hover {
                    font-weight: 500;
                }
            }
        }

        .router-link-active {
            color: #3998fc;
            background-color: @light-bg-color;
            font-weight: 500;
        }

        footer {
            position: relative;
            overflow: hidden;
            border-top: 1px solid #eee;
            font-size: 12px;

            a {
                display: block;
                width: 100%;
                padding-left: 24px;
                line-height: 45px;
                color: #999;
                text-decoration: none;
            }

            .veui-icon {
                position: absolute;
                opacity: .05;
                z-index: -1;
                top: -36px;
                right: -5px;
                transition: transform .3s ease-in-out;
            }

            &:hover {
                .veui-icon {
                    transform: translateY(10px) scale(0.3);
                    opacity: .1;
                }
            }
        }
    }

    main {
        overflow: scroll;
        padding: 1em 4em 0;
        height: ~"calc(100vh - @{title-height})";
        transition: height .2s;

        h1 {
            border-bottom: 1px solid #eee;
            margin-bottom: 2em;
            padding-bottom: 1em;
            font-size: 18px;
        }

        .console-expanded & {
            height: ~"calc(100vh - @{console-height} - @{title-height})";
        }
    }

    #console {
        position: fixed;
        right: 0;
        bottom: 0;
        left: @nav-width;
    }
</style>
