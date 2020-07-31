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
            <span class="title-desc">大样式</span>
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
        </section>
        <section>
            <span class="title-desc">中样式</span>
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
        </section>
        <section>
            <span class="title-desc">小样式</span>
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
        </section>
        <section>
            <p>
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
            </p>
            <p>value: {{ picked3 }}</p>
        </section>
    </article>
</template>

<script>
import {CheckButtonGroup, Checkbox, Icon} from 'veui';
import 'veui-theme-blue-icons/check';
import 'veui-theme-blue-icons/times';
import 'veui-theme-blue-icons/sync';
import 'veui-theme-blue-icons/edit';

export default {
    name: 'check-button-group-demo',
    components: {
        'veui-check-button-group': CheckButtonGroup,
        'veui-checkbox': Checkbox,
        'veui-icon': Icon
    },
    data() {
        return {
            picked1: ['Hirasawa Yui', 'Akiyama Mio'],
            picked2: [],
            picked3: [],
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
            data3: [
                {
                    value: 'check',
                    icon: 'check'
                },
                {
                    value: 'times',
                    icon: 'search'
                },
                {
                    value: 'sync',
                    icon: 'sync'
                },
                {
                    value: 'edit',
                    icon: 'edit'
                }
            ]
        };
    }
};
</script>
<style lang="less" scoped>
    p {
        margin-left: 100px;
        margin-bottom: 1em;
    }
</style>
