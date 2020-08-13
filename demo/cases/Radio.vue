<template>
    <article>
        <h1><code>&lt;veui-radio&gt;</code></h1>
        <h2>尺寸</h2>
        <div class="options-desc">可选的尺寸 <span class="bg-gray-show">ui</span> 属性值： <span class="bg-gray-show">s / m（默认，可不传） / l</span></div>
        <section>
            <veui-form>
                <veui-field label="小号[ui=s]">
                    <veui-radio
                        v-model="group"
                        ui="s"
                        name="group"
                        value="A"
                    >A</veui-radio>
                </veui-field>
                <veui-field label="中号[ui=m]">
                    <veui-radio
                        v-model="group"
                        ui="m"
                        name="group"
                        value="B"
                    >B</veui-radio>
                </veui-field>
                <veui-field label="大号[ui=l]">
                    <veui-radio
                        v-model="group"
                        ui="l"
                        name="group"
                        value="C"
                    >C</veui-radio>
                </veui-field>
            </veui-form>
        </section>
        <section>
            <h2>不同状态展示</h2>
            <veui-form>
                <veui-field label="选中状态">
                    <veui-radio
                        checked
                    >
                        选中状态
                    </veui-radio>
                </veui-field>
                <veui-field label="选中禁用状态">
                    <veui-radio
                        checked
                        disabled
                    >
                        选中禁用状态
                    </veui-radio>
                </veui-field>
                <veui-field label="未选禁用状态">
                    <veui-radio
                        disabled
                    >
                        未选禁用状态
                    </veui-radio>
                </veui-field>
            </veui-form>
        </section>
        <h2 style="margin-top: 50px;">更多功能demo示例（UI不需还原）</h2>
        <section>
            <veui-form>
                <veui-field label="v-model:">
                    <veui-button
                        ui="s"
                        @click="size = size === 'm' ? 's' : 'm'"
                    >
                        Toggle
                    </veui-button>
                    <veui-radio
                        v-model="size"
                        value="m"
                        name="size"
                    >
                        正常状态
                    </veui-radio>
                    <veui-radio
                        v-model="size"
                        ui="s"
                        value="s"
                        name="size"
                    >
                        正常状态（小）
                    </veui-radio>
                    <p>Size: {{ size }}</p>
                </veui-field>
                <veui-field label=":checked.sync:">
                    <veui-button
                        ui="s"
                        @click="checked = !checked"
                    >
                        Toggle
                    </veui-button>
                    <veui-radio :checked.sync="checked">
                        绑定状态：{{ checked }}
                    </veui-radio>
                </veui-field>
                <veui-field label="受控单选组（固定选中C）:">
                    <veui-radio
                        model="C"
                        name="group2"
                        value="A"
                    >
                        A
                    </veui-radio>
                    <veui-radio
                        model="C"
                        name="group2"
                        value="B"
                    >
                        B
                    </veui-radio>
                    <veui-radio
                        model="C"
                        name="group2"
                        value="C"
                    >
                        C
                    </veui-radio>
                </veui-field>
                <veui-field label="always check:">
                    <veui-radio
                        ui="s"
                        checked
                    >
                        always checked
                    </veui-radio>
                    <veui-radio
                        ui="s"
                        :checked="false"
                    >
                        always unchecked
                    </veui-radio>
                </veui-field>
            </veui-form>
        </section>
    </article>
</template>

<script>
import {VeuiRadio, VeuiButton, VeuiForm, VeuiField} from 'veui';

export default {
    name: 'radio-demo',
    components: {
        VeuiRadio,
        VeuiButton,
        VeuiForm,
        VeuiField
    },
    data() {
        return {
            size: null,
            checked: false,
            group: null
        };
    }
};
</script>

<style lang="less" scoped>
.veui-radio {
  margin-right: 10px;
}

section {
  margin-bottom: 16px;
}
</style>
