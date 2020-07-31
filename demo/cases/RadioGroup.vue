<template>
    <article>
        <h1><code>&lt;veui-radio-group&gt;</code></h1>
        <h2>不同尺寸</h2>
        <div class="options-desc">可选的尺寸 <span class="bg-gray-show">ui</span> 属性值： <span class="bg-gray-show">s / m / l（默认 m）</span></div>
        <p>
            s:
            <veui-radio-group
                v-model="picked1"
                :items="data1"
                name="111"
                ui="s"
            >
                <template slot-scope="props">
                    {{ props.label }}
                </template>
            </veui-radio-group>
        </p>
        <p>value: {{ picked1 }}</p>
        <p>
            m:
            <veui-radio-group
                v-model="picked2"
                :items="data2"
                ui="m"
            >
                <template slot-scope="props">
                    {{ props.label }}
                </template>
            </veui-radio-group>
        </p>
        <p>value: {{ picked2 }}</p>
        <p>
            l:
            <veui-radio-group
                v-model="picked2"
                :items="data2"
                ui="l"
            >
                <template slot-scope="props">
                    {{ props.label }}
                </template>
            </veui-radio-group>
        </p>
        <p>value: {{ picked2 }}</p>
    </article>
</template>

<script>
import {RadioGroup} from 'veui';

export default {
    name: 'radio-group-demo',
    components: {
        'veui-radio-group': RadioGroup
    },
    data() {
        return {
            picked1: null,
            picked2: 'Nakano Azusa',
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
            ]
        };
    }
};
</script>
