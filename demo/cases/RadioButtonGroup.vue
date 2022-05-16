<template>
    <article>
        <h1><code>&lt;veui-radio-button-group&gt;</code></h1>
        <section>
            <veui-checkbox v-model="disabled">
                禁用
            </veui-checkbox>
        </section>
        <h2>尺寸</h2>
        <div class="options-desc">可选的尺寸 <span class="bg-gray-show">ui</span> 属性值： <span class="bg-gray-show">s / m（默认，可不传） / l</span></div>
        <section>
            <veui-form>
                <veui-field label="小号[ui=s]">
                    <veui-radio-button-group
                        v-model="picked"
                        :items="data"
                        ui="s"
                        :disabled="disabled"
                    >
                        <template slot-scope="props">
                            {{ props.label }}
                        </template>
                    </veui-radio-button-group>
                </veui-field>
                <veui-field label="中号[ui=m]">
                    <veui-radio-button-group
                        v-model="picked"
                        :items="data"
                        ui="m"
                        :disabled="disabled"
                    >
                        <template slot-scope="props">
                            {{ props.label }}
                        </template>
                    </veui-radio-button-group>
                </veui-field>
                <veui-field label="大号[ui=l]">
                    <veui-radio-button-group
                        v-model="picked"
                        :items="data"
                        ui="l"
                        :disabled="disabled"
                    >
                        <template slot-scope="props">
                            {{ props.label }}
                        </template>
                    </veui-radio-button-group>
                </veui-field>
            </veui-form>
        </section>
        <h2>风格</h2>
        <div class="options-desc">可选的风格 <span class="bg-gray-show">ui</span> 属性值： <span class="bg-gray-show">primary（默认，可不传） / strong</span></div>
        <section>
            <veui-form>
                <veui-field label="重要样式[ui=primary]">
                    <veui-radio-button-group
                        v-model="picked"
                        :items="data"
                        ui="primary"
                        :disabled="disabled"
                    >
                        <template slot-scope="props">
                            {{ props.label }}
                        </template>
                    </veui-radio-button-group>
                </veui-field>
                <veui-field label="加强样式[ui=strong]">
                    <veui-radio-button-group
                        v-model="picked"
                        :items="data"
                        ui="strong"
                        :disabled="disabled"
                    >
                        <template slot-scope="props">
                            {{ props.label }}
                        </template>
                    </veui-radio-button-group>
                </veui-field>
            </veui-form>
        </section>
        <h2>不同状态展示</h2>
        <section>
            <veui-form>
                <veui-field label="禁用状态">
                    <veui-radio-button-group
                        v-model="picked"
                        :items="data"
                        ui="m"
                        :disabled="disabled"
                    >
                        <template slot-scope="props">
                            {{ props.label }}
                        </template>
                    </veui-radio-button-group>
                </veui-field>
            </veui-form>
        </section>
    </article>
</template>

<script>
import {RadioButtonGroup, Checkbox, Form, Field} from 'veui';

export default {
    name: 'radio-button-group-demo',
    components: {
        'veui-radio-button-group': RadioButtonGroup,
        'veui-checkbox': Checkbox,
        'veui-form': Form,
        'veui-field': Field
    },
    data() {
        return {
            picked: '1',
            disabled: false,
            data: [
                {
                    value: '1',
                    label: '选项一'
                },
                {
                    value: '2',
                    label: '选项二'
                },
                {
                    value: '3',
                    label: '选项三'
                }
            ]
        };
    }
};
</script>
