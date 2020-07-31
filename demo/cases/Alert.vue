<template>
    <article class="alert-demo">
        <h1><code>&lt;veui-alert&gt;</code></h1>
        <h2>风格</h2>
        <div class="options-desc">可选的风格
            <span class="bg-gray-show">ui</span>
            属性值：
            <span class="bg-gray-show">normal / 不传则默认是含图标类警示</span>
        </div>
        <h2>尺寸</h2>
        <div class="options-desc">可选的尺寸
            <span class="bg-gray-show">ui</span>
            属性值：
            <span class="bg-gray-show">s(默认，可不传) / m</span>
        </div>
        <section>
            <veui-form>
                <veui-field label="小号[ui=s]">
                    <veui-alert
                        type="success"
                        closable
                        message="恭喜你，你的请求已成功处理"
                    >
                        <template slot="extra">
                            <veui-button ui="text s">
                                查看详情
                            </veui-button>
                        </template>
                    </veui-alert>
                </veui-field>
                <veui-field>
                    <veui-alert
                        type="success"
                        message="恭喜你，你的请求已成功处理"
                        closable
                    >
                        <template slot="title">
                            恭喜你
                        </template>
                        <template slot="extra">
                            <veui-button ui="text s">
                                查看详情
                            </veui-button>
                        </template>
                        恭喜你，你的请求已成功处理
                    </veui-alert>
                </veui-field>
                <veui-field label="中号[ui=m]">
                    <veui-alert
                        ui="m"
                        type="success"
                        closable
                        message="恭喜你，你的请求已成功处理"
                    >
                        <template slot="extra">
                            <veui-button ui="text m">
                                查看详情
                            </veui-button>
                        </template>
                    </veui-alert>
                </veui-field>
                <veui-field>
                    <veui-alert
                        ui="m"
                        type="success"
                        message="恭喜你，你的请求已成功处理"
                        closable
                    >
                        <template slot="title">
                            恭喜你
                        </template>
                        <template slot="extra">
                            <veui-button ui="text m">
                                查看详情
                            </veui-button>
                        </template>
                        恭喜你，你的请求已成功处理
                    </veui-alert>
                </veui-field>
            </veui-form>
        </section>
        <section>
            <h3>含图标、关闭、操作的警示[不传ui]</h3>
            <veui-alert
                type="success"
                message="恭喜你，你的请求已成功处理"
                closable
            >
            </veui-alert>
            <veui-alert
                type="success"
                message="恭喜你，你的请求已成功处理"
                closable
            >
                <template slot="title">
                    恭喜你
                </template>
                <template slot="extra">
                    <veui-button ui="text m">
                        查看详情
                    </veui-button>
                </template>
                恭喜你，你的请求已成功处理
            </veui-alert>
            <veui-alert
                type="warning"
                message="警告，进行检查，有风险信息存在"
                closable
            />
            <veui-alert
                type="warning"
                closable
            >
                <template slot="title">
                    警告
                </template>
                <template slot="extra">
                    <veui-button ui="text m">
                        查看详情
                    </veui-button>
                </template>
                有风险信息存在
            </veui-alert>
            <veui-alert
                type="info"
                message="提醒，这个消息需要注意"
                closable
            />
            <veui-alert
                type="info"
                closable
            >
                <template slot="title">
                    提醒
                </template>
                <template slot="extra">
                    <veui-button ui="text m">
                        查看详情
                    </veui-button>
                </template>
                这个消息需要注意
            </veui-alert>
            <veui-alert
                type="error"
                message="错误，请检查并修改后再进行操作"
                closable
            />
            <veui-alert
                type="error"
                closable
            >
                <template slot="title">
                    错误
                </template>
                <template slot="extra">
                    <veui-button ui="text m">
                        查看详情
                    </veui-button>
                </template>
                请检查并修改后再进行操作
            </veui-alert>
        </section>
        <section>
            <h3>不带图标，不带关闭[ui=normal]</h3>
            <veui-alert
                type="success"
                ui="normal"
                message="恭喜你，你的请求已成功处理"
                closable
            >
            </veui-alert>
            <veui-alert
                type="success"
                ui="normal"
                message="恭喜你，你的请求已成功处理"
            >
                <template slot="title">
                    恭喜你
                </template>
                恭喜你，你的请求已成功处理
            </veui-alert>
            <veui-alert
                type="warning"
                ui="normal"
                message="警告，进行检查，有风险信息存在"
            />
            <veui-alert
                class="limit-width"
                type="warning"
                ui="normal"
            >
                <template slot="title">
                    警告
                </template>
                进行检查，有风险信息存在
            </veui-alert>
            <veui-alert
                type="info"
                ui="normal"
                message="提醒，这个消息需要注意"
            />
            <veui-alert
                class="limit-width"
                type="info"
                ui="normal"
            >
                <template slot="title">
                    提醒
                </template>
                这个消息需要注意
            </veui-alert>
            <veui-alert
                type="error"
                ui="normal"
                message="错误，请检查并修改后再进行操作"
            />
            <veui-alert
                class="limit-width"
                ui="normal"
                type="error"
            >
                <template slot="title">
                    错误
                </template>
                请检查并修改后再进行操作
            </veui-alert>
        </section>
    </article>
</template>

<script>
import bus from '../bus';
import {Alert, Button, Form, Field} from 'veui';

export default {
    name: 'alert',
    components: {
        'veui-alert': Alert,
        'veui-button': Button,
        'veui-form': Form,
        'veui-field': Field
    },
    data() {
        return {
            open: false,
            messages: [
                '我是消息1我是消息1我是消息1我是消息1',
                '我是消息2',
                '我是消息3',
                '我是消息4',
                '我是消息5'
            ],
            messageIndex: 0
        };
    },
    mounted() {
        this.$children.forEach(child => {
            child.$on('click', () => {
                bus.$emit('log', child.$el.getAttribute('ui'));
            });
        });
    },
    methods: {
        close() {
            this.open = true;
        }
    }
};
</script>

<style lang="less">
.alert-demo {
    section {
        margin: 30px 0;
    }
    .veui-form {
        .veui-alert {
            margin: 0;
        }
    }
    .veui-alert {
        width: 500px;
        margin: 30px 0;
    }
}
</style>
