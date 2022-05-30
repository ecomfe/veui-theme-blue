<template>
    <article>
        <h1><code>&lt;veui-check-button-group&gt;</code></h1>
        <h2>尺寸</h2>
        <div class="options-desc">可选的尺寸 <span class="bg-gray-show">ui</span> 属性值： <span class="bg-gray-show">s（默认，可不传）/ m / l</span></div>
        <section>
            <veui-checkbox v-model="disabled">
                禁用
            </veui-checkbox>
        </section>
        <section>
            <veui-form>
                <veui-field label="小号[ui=s]" ui="multi" class="tow-line-field">
                    <veui-check-button-group
                        v-model="picked2"
                        :items="data2"
                        :disabled="disabled"
                    >
                        <template slot-scope="props">
                            {{ props.label }}
                        </template>
                    </veui-check-button-group>
                    <p>value: {{ picked2 }}</p>
                </veui-field>
                <veui-field label="中号[ui=m]" ui="multi" class="tow-line-field">
                    <veui-check-button-group
                        v-model="picked1"
                        :items="data1"
                        ui="m"
                        :disabled="disabled"
                    >
                        <template slot-scope="props">
                            {{ props.label }}
                        </template>
                    </veui-check-button-group>
                    <p>value: {{ picked1 }}</p>
                </veui-field>
                <veui-field label="大号[ui=l]" ui="multi" class="tow-line-field">
                    <veui-check-button-group
                        v-model="picked2"
                        :items="data2"
                        ui="l"
                        :disabled="disabled"
                    >
                        <template slot-scope="props">
                            {{ props.label }}
                        </template>
                    </veui-check-button-group>
                    <p>value: {{ picked2 }}</p>
                </veui-field>
            </veui-form>
        </section>
        <h2>风格</h2>
        <div class="options-desc">可选的风格 <span class="bg-gray-show">ui</span> 属性值： <span class="bg-gray-show">primary（默认，可不传）/ strong</span></div>
        <section>
            <veui-form>
                <veui-field label="重要样式[ui=primary]" ui="multi" class="tow-line-field">
                    <veui-check-button-group
                        ui="s primary"
                        v-model="picked2"
                        :items="data2"
                        :disabled="disabled"
                    >
                        <template slot-scope="props">
                            {{ props.label }}
                        </template>
                    </veui-check-button-group>
                    <p>value: {{ picked2 }}</p>
                </veui-field>
                <veui-field label="加强样式[ui=strong]" ui="multi" class="tow-line-field">
                    <veui-check-button-group
                        ui="s strong"
                        v-model="picked2"
                        :items="data2"
                        :disabled="disabled"
                    >
                        <template slot-scope="props">
                            {{ props.label }}
                        </template>
                    </veui-check-button-group>
                    <p>value: {{ picked2 }}</p>
                </veui-field>
            </veui-form>
        </section>
        <h2 style="margin-top: 50px;">更多功能demo示例（UI不需还原）</h2>
        <section>
            <veui-form>
                <veui-field label="slot插槽" ui="multi" class="tow-line-field">
                    <veui-check-button-group
                        v-model="picked3"
                        :items="data3"
                        ui="s"
                        :disabled="disabled"
                    >
                        <template slot-scope="props" slot="item">
                            <veui-icon :name="props.icon"/>
                        </template>
                    </veui-check-button-group>
                    <p>value: {{ picked3 }}</p>
                </veui-field>
                <veui-field label="有排他性选项" ui="multi" class="tow-line-field">
                    <veui-check-button-group
                        v-model="pickedWithExclusive"
                        :items="dataWithExclusive"
                        :disabled="disabled"
                        ui="s"
                    />
                    <p>value: {{ pickedWithExclusive }}</p>
                </veui-field>
                <veui-field label="有empty-value的情况（空值选中：Exclusive1）" ui="multi" class="tow-line-field">
                    <veui-check-button-group
                        v-model="pickedWithEmpty"
                        :items="dataWithExclusive"
                        :disabled="disabled"
                        empty-value="Exclusive1"
                        ui="s"
                    />
                    <p>value: {{ pickedWithEmpty }}</p>
                </veui-field>
            </veui-form>
        </section>
    </article>
</template>

<script>
import {CheckButtonGroup, Checkbox, Icon, VeuiForm, VeuiField} from 'veui';
import 'veui-theme-blue-icons/star-filled';
import 'veui-theme-blue-icons/thumb-up-filled';
import 'veui-theme-blue-icons/heart-filled';
import 'veui-theme-blue-icons/medal';

export default {
    name: 'check-button-group-demo',
    components: {
        'veui-check-button-group': CheckButtonGroup,
        'veui-checkbox': Checkbox,
        'veui-icon': Icon,
        VeuiForm,
        VeuiField
    },
    data() {
        return {
            picked1: ['Hirasawa Yui', 'Akiyama Mio'],
            picked2: ['Hirasawa Yui'],
            picked3: [],
            pickedWithExclusive: [],
            pickedWithEmpty: [],
            disabled: false,
            data1: [
                {
                    value: 'Hirasawa Yui',
                    label: 'Hirasawa Yui'
                },
                {
                    value: 'Akiyama Mio',
                    label: 'Akiyama Mio'
                },
                {
                    value: 'Nakano Azusa',
                    label: 'Nakano Azusa'
                }
            ],
            data2: [
                {
                    value: 'Hirasawa Yui',
                    label: 'Hirasawa Yui'
                },
                {
                    value: 'Akiyama Mio',
                    label: 'Akiyama Mio'
                },
                {
                    value: 'Nakano Azusa',
                    label: 'Nakano Azusa'
                }
            ],
            dataWithExclusive: [
                {
                    value: 'Exclusive1',
                    label: 'Exclusive1',
                    exclusive: true
                },
                {
                    value: 'Exclusive2',
                    label: 'Exclusive2',
                    exclusive: true
                },
                {
                    value: 'Hirasawa Yui',
                    label: 'Hirasawa Yui'
                },
                {
                    value: 'Akiyama Mio',
                    label: 'Akiyama Mio'
                },
                {
                    value: 'Nakano Azusa',
                    label: 'Nakano Azusa'
                }
            ],
            data3: [
                {
                    value: 'star-filled',
                    icon: 'star-filled'
                },
                {
                    value: 'thumb-up-filled',
                    icon: 'thumb-up-filled'
                },
                {
                    value: 'heart-filled',
                    icon: 'heart-filled'
                },
                {
                    value: 'medal',
                    icon: 'medal'
                }
            ]
        };
    }
};
</script>
