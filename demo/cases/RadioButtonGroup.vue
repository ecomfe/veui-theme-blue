<template>
    <article>
        <h1><code>&lt;veui-radio-button-group&gt;</code></h1>
        <section>
            <veui-checkbox v-model="disabled">
                禁用
            </veui-checkbox>
        </section>
        <section>
            <p>
                s:<br/>
                <veui-radio-button-group
                    v-model="picked1"
                    :items="data1"
                    name="111"
                    ui="s"
                    :disabled="disabled"
                >
                    <template slot-scope="props">
                        {{ props.label }}
                    </template>
                </veui-radio-button-group>
            </p>
            <p>已选：{{ picked1 }}</p>
        </section>
        <section>
            <p>
                m:<br/>
                <veui-radio-button-group
                    v-model="picked2"
                    :items="data2"
                    ui="m"
                    :disabled="disabled2"
                >
                    <template slot-scope="props">
                        {{ props.label }}
                    </template>
                </veui-radio-button-group>
            </p>
            <p>已选：{{ picked2 }}</p>
        </section>
        <section>
            <p>
                l:<br/>
                <veui-radio-button-group
                    v-model="picked2"
                    :items="data2"
                    ui="l"
                    :disabled="disabled2"
                >
                    <template slot-scope="props">
                        {{ props.label }}
                    </template>
                </veui-radio-button-group>
            </p>
            <p>已选：{{ picked2 }}</p>
        </section>
        <section>
            <p>
                默认:<br/>
                <veui-radio-button-group
                    v-model="picked2"
                    :items="data2"
                    :disabled="disabled2"
                >
                    <template slot-scope="props">
                        {{ props.label }}
                    </template>
                </veui-radio-button-group>
            </p>
            <p>已选：{{ picked2 }}</p>
        </section>
    </article>
</template>

<script>
import {RadioButtonGroup, Checkbox} from 'veui';

export default {
    name: 'radio-button-group-demo',
    components: {
        'veui-radio-button-group': RadioButtonGroup,
        'veui-checkbox': Checkbox
    },
    data() {
        return {
            picked1: 'euro',
            picked2: 'qq',
            disabled: false,
            disabled2: true,
            data1: [
                {
                    value: 'pound',
                    label: '£'
                },
                {
                    value: 'euro',
                    label: '€'
                },
                {
                    value: 'yen',
                    label: '¥'
                }
            ],
            data2: [
                {
                    value: 'bidu',
                    label: '百度'
                },
                {
                    value: 'baba',
                    label: '阿里'
                },
                {
                    value: 'qq',
                    label: '腾讯'
                }
            ]
        };
    }
};
</script>
