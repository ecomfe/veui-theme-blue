<template>
    <article>
        <h1>
            <code>&lt;veui-toast&gt;</code>
        </h1>
        <section>
            <veui-button
                ui="aux"
                @click="showToast('all')"
            >全部</veui-button>
            <veui-button
                ui="aux"
                @click="showToast('success')"
            >成功</veui-button>
            <veui-button
                ui="aux"
                @click="showToast('warn')"
            >警告</veui-button>
            <veui-button
                ui="aux"
                @click="showToast('info')"
            >提醒</veui-button>
            <veui-button
                ui="aux"
                @click="showToast('error')"
            >错误</veui-button>
            <veui-button
                ui="aux"
                @click="showSlottedToast"
            >错误（包括组件）</veui-button>
        </section>
        <section>
            <h4>关闭</h4>

            <veui-button
                ui="aux"
                @click="showCloseToast"
            >打开</veui-button>
            <veui-button
                :disabled="!closeToast"
                ui="aux"
                @click="closeCloseToast"
            >关闭</veui-button>
        </section>

        <h4>样式</h4>
        <section class="col">
            <section>
                <veui-toast open closable>成功提示的文案</veui-toast>
            </section>
            <section>
                <veui-toast
                    open
                    title="成功文案标题"
                    closable
                >
                    提示文案描述提示文案描述
                </veui-toast>
            </section>
            <section>
                <veui-toast
                    open
                    closable
                    type="warning"
                >警告提示的文案警告提示的文案警告提示的文案</veui-toast>
            </section>
            <section>
                <veui-toast
                    open
                    title="警示文案标题"
                    closable
                    type="warning"
                >提示文案描述提示文案描述提示文案描述提示文案描述提示文案描述提示文案描述提示文案描述提示文案描述</veui-toast>
            </section>
            <section>
                <veui-toast
                    open
                    closable
                    type="error"
                >
                    报错提示的文案
                </veui-toast>
            </section>
            <section>
                <veui-toast
                    open
                    closable
                    title="报错文案标题"
                    type="error"
                >
                    提示文案描述提示文案描述
                </veui-toast>
            </section>
            <section>
                <veui-toast
                    open
                    closable
                    type="info"
                >
                    通知提示的文案
                </veui-toast>
            </section>
            <section>
                <veui-toast
                    open
                    closable
                    title="通知文案标题"
                    type="info"
                >
                    提示文案描述提示文案描述
                </veui-toast>
            </section>
        </section>
    </article>
</template>

<script>
import bus from '../bus';
import {Button, Toast, Link} from 'veui';
import toast from 'veui/managers/toast';

let messages = [
    {
        type: 'success',
        message: '恭喜您，您的请求已成功处理',
        duration: 250000
    },
    {
        type: 'warn',
        message: '警告，有法律风险存在',
        duration: 200000
    },
    {
        type: 'info',
        message: '提醒，请注意这个消息',
        duration: 150000
    },
    {
        type: 'error',
        message: '错误，请检查并修改后再提交',
        duration: 100000
    }
];

export default {
    name: 'toast',
    components: {
        'veui-button': Button,
        'veui-toast': Toast
    },
    data() {
        return {
            messages: messages,
            closeToast: null
        };
    },
    computed: {
        messageMap() {
            return this.messages.reduce((result, current) => {
                result[current.type] = current;
                return result;
            }, {});
        }
    },
    mounted() {
        this.$children.forEach(child => {
            child.$on('click', () => {
                bus.$emit('log', child.$el.getAttribute('ui'));
            });
        });
    },
    methods: {
        showToast(type) {
            if (type === 'all') {
                messages.forEach(({type, message, duration}) => {
                    toast[type]({
                        message,
                        title: '测试title',
                        closable: true,
                        duration
                    });
                });
            } else {
                toast[type]({
                    message: this.messageMap[type].message,
                    duration: 100000
                });
            }
        },
        showSlottedToast() {
            const h = this.$createElement;
            toast.error({
                message: ({close}) => [
                    '错误，请检查并修改后再提交',
                    h(Link, {props: {ui: 'strong'}, on: {click: close}}, '去修改')
                ],
                duration: 100000
            });
        },
        showCloseToast() {
            if (this.closeToast) {
                return;
            }
            this.closeToast = toast.info({
                message: '点击“关闭”按钮关闭本条提示',
                duration: -1,
                closable: false
            });
        },
        closeCloseToast() {
            this.closeToast();
            this.closeToast = null;
        }
    }
};
</script>

<style lang="less" scoped>
section {
  & + & {
    margin-top: 20px;
  }
}

.col {
  float: left;

  & + & {
    margin-left: 20px;
  }
}

h3 {
  margin-bottom: 30px;
}

h4 {
  margin-top: 2em;
}

.veui-button {
  & + & {
    margin-left: 10px;
  }
}

.veui-toast {
  position: relative;
}
</style>
