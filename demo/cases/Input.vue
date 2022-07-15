<template>
    <article>
        <h1><code>&lt;veui-input&gt;</code></h1>
        <h2>风格</h2>
        <div class="options-desc">
            可选的风格 <span class="bg-gray-show">ui</span>
            属性值： <span class="bg-gray-show">normal（默认，可不传） / inline</span>
        </div>
        <section>
            <veui-form>
                <veui-field
                    label="normal"
                >
                    <veui-input
                        v-model="value"
                        placeholder="普通样式"
                        autofocus
                    />
                </veui-field>
                <veui-field
                    label="inline"
                >
                    <veui-input
                        ui="inline"
                        v-model="value"
                        placeholder="内联样式"
                        autofocus
                    />
                </veui-field>
            </veui-form>
        </section>
        <h2>尺寸</h2>
        <div class="options-desc">
            可选的尺寸 <span class="bg-gray-show">ui</span>
            属性值： <span class="bg-gray-show">xs / s（默认，可不传） / m / l / xl</span>
        </div>
        <section class="five-sizes">
            <veui-form>
                <veui-field label="超小号[ui=xs]">
                    <veui-input
                        v-model="value"
                        ui="xs"
                        placeholder="xs"
                        autofocus
                    />
                    <veui-input
                        v-model="value"
                        ui="xs inline"
                        placeholder="xs"
                        autofocus
                    />
                </veui-field>
                <veui-field label="小号[ui=s]">
                    <veui-input
                        v-model="value"
                        ui="s"
                        placeholder="s"
                    />
                    <veui-input
                        v-model="value"
                        ui="s inline"
                        placeholder="s"
                        autofocus
                    />
                </veui-field>
                <veui-field label="中号[ui=m]">
                    <veui-input
                        v-model="value"
                        ui="m"
                        placeholder="m"
                    />
                    <veui-input
                        v-model="value"
                        ui="m inline"
                        placeholder="m"
                        autofocus
                    />
                </veui-field>
                <veui-field label="大号[ui=l]">
                    <veui-input
                        v-model="value"
                        ui="l"
                        placeholder="l"
                    />
                    <veui-input
                        v-model="value"
                        ui="l inline"
                        placeholder="l"
                        autofocus
                    />
                </veui-field>
                <veui-field label="特大号[ui=xl]">
                    <veui-input
                        v-model="value"
                        ui="xl"
                        placeholder="xl"
                    />
                    <veui-input
                        v-model="value"
                        ui="xl inline"
                        placeholder="xl"
                        autofocus
                    />
                </veui-field>
            </veui-form>
        </section>
        <section>
            <h2>内联样式</h2>
            <veui-form>
                <veui-field label="内联样式[ui=inline]">
                    <veui-input
                        ui="inline"
                        v-model="value"
                        placeholder="内联样式"
                        autofocus
                    />
                </veui-field>
                <veui-field label="内联样式错误状态[ui=inline]">
                    <veui-input
                        ui="inline"
                        class="veui-invalid"
                        v-model="value"
                        placeholder="内联样式"
                        autofocus
                    />
                </veui-field>
            </veui-form>
        </section>
        <section>
            <h2>不同状态展示</h2>
            <veui-form>
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
                <veui-field label="带清空按钮">
                    <veui-input
                        v-model="value"
                        clearable
                        placeholder="带有清空按钮的输入框"
                    />
                </veui-field>
            </veui-form>
        </section>
        <h2 style="margin-top: 50px;">更多功能demo示例（UI不需还原）</h2>
        <section>
            <veui-form>
                <veui-field label="密码输入框" ui="long">
                    <veui-input
                        v-model="value"
                        type="password"
                        placeholder="密码输入框"
                    />
                </veui-field>
                <veui-field label="placeholder自定义插槽" ui="long">
                    <veui-input clearable>
                        <template slot="placeholder">自定义placeholder</template>
                    </veui-input>
                </veui-field>
                <veui-field label="带有前缀输入框" ui="long">
                    <veui-input placeholder="请输入内容">
                        <template slot="before"><veui-icon name="user-manager"/></template>
                    </veui-input>
                </veui-field>
                <veui-field label="带有后缀输入框" ui="long">
                    <veui-input clearable placeholder="请输入内容">
                        <template slot="after">后缀内容</template>
                    </veui-input>
                </veui-field>
                <veui-field label="带前后缀输入框" ui="long">
                    <veui-input placeholder="请输入内容">
                        <template slot="before"><veui-icon name="user-manager"/></template>
                        <template slot="after">后缀内容</template>
                    </veui-input>
                </veui-field>
                <veui-field label="字数限制显示（不展示输入字符，需要手动隐藏）" ui="long">
                    <veui-input
                        class="input-no-append"
                        placeholder="1~5个字符"
                        maxlength="5"
                        strict
                    />
                </veui-field>
                <veui-field label="受控（感知输入法，固定值）现象：中英文直接不能输入" ui="long">
                    <veui-input
                        value="固定内容"
                        composition
                    />
                </veui-field>
                <veui-field label="受控（不感知输入法，固定值）现象：英文直接不能输入，中文输入法结束时直接被重置" ui="long">
                    <veui-input
                        value="固定内容"
                    />
                </veui-field>
                <veui-field label="受控（感知输入法, 且用v-model同步）现象：value的值实时在同步" ui="long">
                    value: {{ controlled1 }}
                    <veui-input
                        v-model="controlled1"
                        composition
                    />
                    <veui-button @click="delaySet">delaySet</veui-button>
                </veui-field>
                <veui-field label="受控（不感知输入法, 且用v-model同步）现象：输入中文时，value的值只有在输入法结束后同步" ui="long">
                    value: {{ controlled2 }}
                    <veui-input
                        v-model="controlled2"
                    />
                </veui-field>
                <veui-field label="非受控（感知输入法）" ui="long">
                    localValue：{{ uncontrolled1 }}
                    <veui-input
                        composition
                        @input="uncontrolled1 = $event"
                    />
                </veui-field>
                <veui-field label="非受控（不感知输入法）" ui="long">
                    localValue：{{ uncontrolled2 }}
                    <veui-input
                        @input="uncontrolled2 = $event"
                    />
                </veui-field>
            </veui-form>
        </section>
    </article>
</template>

<script>
import bus from '../bus';
import {VeuiInput, VeuiField, VeuiForm, VeuiIcon, VeuiButton} from 'veui';
import nudge from 'veui/directives/nudge';
import 'veui-theme-blue-icons/user-manager';

export default {
    name: 'text-input',
    components: {
        VeuiInput,
        VeuiField,
        VeuiForm,
        VeuiIcon,
        VeuiButton
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
            ],
            controlled1: '',
            controlled2: '',
            uncontrolled1: '',
            uncontrolled2: ''
        };
    },
    methods: {
        log(item) {
            bus.$emit('log', item);
        },
        delaySet() {
            setTimeout(() => {
                this.controlled1 = this.controlled2 = '123';
            }, 3000);
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
