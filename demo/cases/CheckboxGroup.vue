<template>
    <article>
        <h1><code>&lt;veui-checkbox-group&gt;</code></h1>
        <h2>尺寸</h2>
        <div class="options-desc">可选的尺寸 <span class="bg-gray-show">ui</span> 属性值： <span class="bg-gray-show">s（默认，可不传）/ m / l</span></div>
        <section>
            <veui-form>
                <veui-field label="小号[ui=s]" ui="multi" class="tow-line-field">
                    <veui-checkbox-group
                        v-model="picked2"
                        :items="data2"
                    >
                        <template slot-scope="props" class="tow-line-field">
                            {{ props.label }}
                        </template>
                    </veui-checkbox-group>
                    <p>value: {{ picked2 }}</p>
                </veui-field>
                <veui-field label="中号[ui=m]" ui="multi" class="tow-line-field">
                    <veui-checkbox-group
                        v-model="picked1"
                        :items="data1"
                        ui="m"
                    >
                        <template slot-scope="props">
                            {{ props.label }}
                        </template>
                    </veui-checkbox-group>
                    <p>value: {{ picked1 }}</p>
                </veui-field>
                <veui-field label="大号[ui=l]" ui="multi" class="tow-line-field">
                    <veui-checkbox-group
                        v-model="picked1"
                        :items="data1"
                        ui="l"
                    >
                        <template slot-scope="props">
                            {{ props.label }}
                        </template>
                    </veui-checkbox-group>
                    <p>value: {{ picked1 }}</p>
                </veui-field>
            </veui-form>
        </section>
        <h2 style="margin-top: 50px;">更多功能demo示例（UI不需还原）</h2>
        <section>
            <veui-form>
                <veui-field label="有排他性选项" ui="multi" class="tow-line-field">
                    <veui-checkbox-group
                        v-model="pickedWithExclusive"
                        :items="dataWithExclusive"
                        ui="s"
                    />
                    <p>value: {{ pickedWithExclusive }}</p>
                </veui-field>
                <veui-field label="有 empty-value 的情况（空值选中：Exclusive1）" ui="multi" class="tow-line-field">
                    <veui-checkbox-group
                        v-model="pickedWithEmpty"
                        :items="dataWithExclusive"
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
import {VeuiCheckboxGroup, VeuiForm, VeuiField} from 'veui';

export default {
    name: 'checkbox-group-demo',
    components: {
        VeuiCheckboxGroup,
        VeuiForm,
        VeuiField
    },
    data() {
        return {
            picked1: ['Hirasawa Yui', 'Akiyama Mio'],
            picked2: [],
            pickedWithExclusive: [],
            pickedWithEmpty: [],
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
            ]
        };
    }
};
</script>
<style lang="less">
.tow-line-field {
    .veui-field-content {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            margin-top: 8px;
        }
    }
}
</style>
