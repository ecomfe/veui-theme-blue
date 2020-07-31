<template>
    <article>
        <h1><code>&lt;veui-input&gt;</code></h1>
        <veui-form>
            <h2>尺寸</h2>
            <div class="options-desc">
                可选的尺寸 <span class="bg-gray-show">ui</span> 
                属性值： <span class="bg-gray-show">xs / s / m / l</span>
            </div>
            <section class="five-sizes">
                <veui-field
                    
                    label="超小号（xs）"
                >
                    <veui-input
                        v-model="value"
                        ui="xs"
                        placeholder="xs"
                        autofocus
                    />
                </veui-field>
                <veui-field
                    ui="tiny"
                    label="小号（s）"
                >
                    <veui-input
                        v-model="value"
                        ui="s"
                        placeholder="s"
                    />
                </veui-field>
                <veui-field
                    ui="small"
                    label="中号（m）"
                >
                    <veui-input
                        v-model="value"
                        ui="m"
                        placeholder="m"
                    />
                </veui-field>
                <veui-field
                    ui="large"
                    label="大号（l）"
                >
                    <veui-input
                        v-model="value"
                        ui="l"
                        placeholder="l"
                    />
                </veui-field>
            </section>
            <section>
                <h2>各种状态展示</h2>
                <veui-field label="默认状态">
                    <veui-input
                        v-model="value"
                        placeholder="默认状态"
                        autofocus
                    />
                </veui-field>
                <veui-field label="只读状态">
                    <veui-input
                        v-model="value"
                        :readonly="true"
                        placeholder="只读状态"
                    />
                </veui-field>

                <veui-field label="禁用状态">
                    <veui-input
                        v-model="value"
                        :disabled="true"
                        placeholder="禁用状态"
                    />
                </veui-field>

                <veui-field label="错误状态">
                    <veui-input
                        class="veui-invalid"
                        v-model="value"
                        placeholder="错误状态"
                    />
                </veui-field>

            </section>

            <section>
                <h2>带有清空按钮的输入框</h2>
                <section>
                    <veui-input
                        v-model="value"
                        clearable
                        placeholder="带有清空按钮的输入框"
                    />
                </section>
            </section>

            <section>
                <h2>密码输入框</h2>
                <section>
                    <veui-input
                        v-model="value"
                        type="password"
                        placeholder="密码输入框"
                    />
                </section>
            </section>

            <section>
                <h2>带有前缀/后缀的输入框</h2>
                <section>
                    <veui-input placeholder="请输入内容">
                        <template slot="before"><veui-icon name="user-circle"/></template>
                    </veui-input>
                    <veui-input clearable placeholder="请输入内容">
                        <template slot="after">后缀内容</template>
                    </veui-input>
                    <veui-input placeholder="请输入内容">
                        <template slot="before"><veui-icon name="user-circle"/></template>
                        <template slot="after">后缀内容</template>
                    </veui-input>
                </section>
            </section>

            <section>
                <h2>字数限制显示（不展示输入字符，需要手动隐藏）</h2>
                <section>
                    <veui-input
                        class="input-no-append"
                        placeholder="1~5个字符"
                        maxlength="5"
                        strict
                    />
                </section>
            </section>
        </veui-form>
    </article>
</template>

<script>
import bus from '../bus';
import {Input, Field, Form, Span, Icon, VeuiSelect} from 'veui';
import nudge from 'veui/directives/nudge';
import 'veui-theme-blue-icons/user-circle';

export default {
    name: 'text-input',
    components: {
        'veui-input': Input,
        'veui-field': Field,
        'veui-form': Form,
        'veui-icon': Icon
    },
    directives: {
        nudge
    },
    data() {
        return {
            value: '',
            key: null,
            name: null,
            phone: '13800138000',
            password: null,
            hiddenValue: '隐藏值',
            poem: '',
            placeholder: '1~30个字符',
            price: '1024',
            options: [
                {
                    label: 'https://',
                    value: 'https://'
                },
                {
                    label: 'http://',
                    value: 'http://'
                }
            ]
        };
    },
    methods: {
        log(item) {
            bus.$emit('log', item);
        },
        handleThumbNudgeUpdate(delta) {
            let val = this.price;

            let digits;
            let unit;
            if (typeof val === 'string') {
                let matched = val.match(/^(\d+(?:\.\d+)?)(.*)$/);
                if (!matched) {
                    return;
                }
                [digits, unit] = matched.slice(1).digits;
                digits = parseFloat(digits);
                if (isNaN(digits)) {
                    return;
                }
            } else if (typeof val === 'number') {
                digits = val;
            } else {
                return;
            }

            // 因为加 0.1 所以处理一下，否则会出现 0.30000000000000004
            let newVal = Math.round((digits + delta) * 10) / 10;
            if (unit !== undefined) {
                newVal += unit;
            }

            this.price = newVal;
        },
        handlePriceChange(val) {
            this.price = val;
        }
    }
};
</script>

<style lang="less" scoped>
@import '~less-plugin-est/src/all.less';

section {
  margin-bottom: 40px;

  .veui-input {
    margin-right: 10px;
  }

  & > & {
    display: flex;
    align-items: center;
  }
}

.veui-form {
  & /deep/ .veui-field {
    margin-bottom: 20px;
    display: flex;
    align-items: center;

    & > .veui-form-label {
      width: 100px;
    }
  }
}

.five-sizes {
  & /deep/ .veui-form-label {
    width: 60px;
  }
}

.input-no-append {
    /deep/ .veui-input-after {
        display: none;
    }
}
</style>
