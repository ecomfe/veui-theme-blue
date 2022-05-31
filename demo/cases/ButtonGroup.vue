<template>
    <article>
        <h1>
            <code>&lt;veui-button-group&gt;</code>
        </h1>
        <section>
            <veui-checkbox
                v-model="disabled"
                ui="s"
            >禁用全部</veui-checkbox>
            <br>
            <veui-checkbox
                v-model="items[2].disabled"
                ui="s"
            >禁用「删除」</veui-checkbox>
        </section>
        <h2>尺寸</h2>
        <div class="options-desc">可选的尺寸 <span class="bg-gray-show">ui</span> 属性值： <span class="bg-gray-show">xs / s（默认，可不传） / m / l / xl</span></div>
        <section>
            <veui-form>
                <veui-field
                    v-for="item in sizes"
                    :label="`${item.label}[ui=${item.value}]`"
                    :key="item.value"
                    ui="multi"
                    class="tow-line-field"
                >
                    <veui-button-group
                        :ui="item.value"
                        :items="items"
                        :disabled="disabled"
                    />
                </veui-field>
            </veui-form>
        </section>
        <h2>风格</h2>
        <div class="options-desc">可选的风格 <span class="bg-gray-show">ui</span> 属性值： <span class="bg-gray-show">normal（默认，可不传） / primary / strong</span></div>
        <section>
            <veui-form>
                <veui-field
                    label="普通样式"
                    ui="multi"
                    class="tow-line-field"
                >
                    <veui-button-group
                        ui="normal"
                        :items="items"
                        :disabled="disabled"
                    />
                </veui-field>
                <veui-field
                    label="重要样式"
                    ui="multi"
                    class="tow-line-field"
                >
                    <veui-button-group
                        ui="primary"
                        :items="items"
                        :disabled="disabled"
                    />
                </veui-field>
                <veui-field
                    label="加强样式"
                    ui="multi"
                    class="tow-line-field"
                >
                    <veui-button-group
                        ui="strong"
                        :items="items"
                        :disabled="disabled"
                    />
                </veui-field>
            </veui-form>
        </section>
    </article>
</template>

<script>
import {ButtonGroup, Checkbox, Form, Field} from 'veui';

export default {
    name: 'button-group-demo',
    components: {
        'veui-button-group': ButtonGroup,
        'veui-checkbox': Checkbox,
        'veui-form': Form,
        'veui-field': Field
    },
    data() {
        return {
            disabled: false,
            size: 'm',
            sizes: [
                {label: '超小', value: 'xs'},
                {label: '小', value: 's'},
                {label: '中', value: 'm'},
                {label: '大', value: 'l'},
                {label: '超大', value: 'xl'},
            ],
            items: [
                {label: '新建', event: 'add'},
                {label: '编辑', event: 'edit'},
                {label: '删除', event: 'remove', disabled: true}
            ]
        };
    }
};
</script>

<style lang="less" scoped>
section {
  margin-bottom: 20px;
}
</style>
