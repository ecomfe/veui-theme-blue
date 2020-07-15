<template>
    <article>
        <h1><code>&lt;veui-checkbox-group&gt;</code></h1>
        <h2>尺寸</h2>
        <div class="options-desc">可选的尺寸 <span class="bg-gray-show">ui</span> 属性值： <span class="bg-gray-show">l / m /s</span></div>
        <h2>示例</h2>
        <section>
            <span class="title-memo">大样式</span>
            <veui-checkbox-group
                v-model="picked1"
                :items="data1"
                ui="l"
            >
                <template slot-scope="props">
                    {{ props.label }}
                </template>
            </veui-checkbox-group>
        </section>
        <p>value: {{ picked1 }}</p>
        <section>
            <span class="title-memo">中样式</span>
            <veui-checkbox-group
                v-model="picked1"
                :items="data1"
            >
                <template slot-scope="props">
                    {{ props.label }}
                </template>
            </veui-checkbox-group>
        </section>
        <p>value: {{ picked1 }}</p>
        <section>
            <span class="title-memo">小样式</span>
            <veui-checkbox-group
                v-model="picked2"
                :items="data2"
                ui="s"
            >
                <template slot-scope="props">
                    {{ props.label }}
                </template>
            </veui-checkbox-group>
        </section>
        <p>value: {{ picked2 }}</p>
    </article>
</template>

<script>
import {CheckboxGroup} from 'veui';

export default {
    name: 'checkbox-group-demo',
    components: {
        'veui-checkbox-group': CheckboxGroup
    },
    data() {
        return {
            picked1: ['Hirasawa Yui', 'Akiyama Mio'],
            picked2: [],
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
<style lang="less" scoped>
    section {
        display: flex;
        margin-top: 1em;
    }
    .title-memo {
        margin-right: 20px;
        display: inline-flex;
        width: 80px;
    }
     p {
        margin-left: 100px;
     }
</style>
