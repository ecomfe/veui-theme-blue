<template>
    <article class="auto-complete-demo">
        <h1>
            <code>&lt;veui-autocomplete&gt;</code>
        </h1>
        <veui-form>
            <h2>尺寸</h2>
            <div class="options-desc">
                可选的尺寸 <span class="bg-gray-show">ui</span> 
                属性值： <span class="bg-gray-show">xs / s / m / l</span>
            </div>
            <section>
                <veui-field
                    label="超小号（xs）"
                >
                    <veui-autocomplete
                        ui="xs"
                        v-model="inputValue"
                        :datasource="suggestions"
                    />
                </veui-field>
                <veui-field
                    label="小号（s）"
                >
                    <veui-autocomplete
                        ui="s"
                        v-model="inputValue"
                        :datasource="suggestions"
                    />
                </veui-field>
                <veui-field
                    label="中号（m）"
                >
                    <veui-autocomplete
                        ui="m"
                        v-model="inputValue"
                        :datasource="suggestions"
                    />
                </veui-field>
                <veui-field
                    label="大号（l）"
                >
                    <veui-autocomplete
                        ui="l"
                        v-model="inputValue"
                        :datasource="suggestions"
                    />
                </veui-field>
            </section>
            <section>
                <h2>可清除</h2>
                <veui-autocomplete
                    v-model="inputValue"
                    clearable
                    :datasource="suggestions"
                />
            </section>
            <section>
                <h2>禁用</h2>
                <veui-autocomplete
                    v-model="inputValue"
                    :datasource="suggestions"
                    :suggest-trigger="['focus', 'input']"
                    disabled
                />
            </section>
            <section>
                <h2>只读</h2>
                <veui-autocomplete
                    v-model="inputValue"
                    :datasource="suggestions"
                    :suggest-trigger="['focus', 'input']"
                    readonly
                />
            </section>
            <section>
                <h2>错误</h2>
                <veui-autocomplete
                    v-model="inputValue"
                    invalid
                    :datasource="suggestions"
                    :suggest-trigger="['focus', 'input']"
                />
            </section>
            <section>
                <h2>列表型数据，input 时下拉</h2>
                <veui-autocomplete
                    v-model="value"
                    :datasource="suggestions"
                    placeholder="请输入"
                />
            </section>
            <section>
                <h2>树型数据，focus 时下拉</h2>
                <veui-autocomplete
                    v-model="treeValue"
                    :datasource="treeSuggestions"
                    placeholder="请输入"
                    suggest-trigger="focus"
                />
            </section>
            <section>
                <h2>strict: 下拉关闭时，强制清除不匹配值</h2>
                <veui-autocomplete
                    v-model="treeValue"
                    :datasource="treeSuggestions"
                    placeholder="请输入"
                    suggest-trigger="focus"
                    strict
                />
            </section>
        </veui-form>
    </article>
</template>

<script>
import {Autocomplete, Form, Field} from 'veui';

export default {
    name: 'autocomplete-demo',
    components: {
        'veui-autocomplete': Autocomplete,
        'veui-form': Form,
        'veui-field': Field
    },
    data() {
        return {
            value: null,
            treeValue: '',
            inputValue: 'male',
            suggestions: [
                {
                    value: 'male'
                },
                {
                    value: 'female'
                }
            ],
            treeSuggestions: [
                {
                    label: '组1',
                    options: ['1', '11']
                },
                {
                    label: '组2',
                    options: [
                        {
                            label: '男组',
                            options: [
                                {
                                    label: 'male',
                                    value: 'male'
                                }
                            ]
                        },
                        {
                            label: 'female',
                            value: 'female'
                        }
                    ]
                }
            ]
        };
    },
    methods: {
        switchDatasource() {
            let tmp = this.suggestions;
            this.suggestions = this.treeSuggestions;
            this.treeSuggestions = tmp;
        }
    }
};
</script>
<style lang="less">
.auto-complete-demo {
    .veui-field {
        display: flex;
        align-items: center;
    }
}
</style>
