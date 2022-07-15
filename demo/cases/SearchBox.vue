<template>
    <article class="veui-search-box-demo">
        <h1><code>&lt;veui-search-box&gt;</code></h1>
        <veui-form>
            <section class="has-margin-right">
                <h2>风格</h2>
                <div class="options-desc">
                    可选的风格 <span class="bg-gray-show">ui</span>
                    属性值： <span class="bg-gray-show">normal / strong / inline</span>
                </div>
                <section>
                    <veui-field
                        label="normal"
                    >
                        <veui-search-box
                            placeholder="搜索提示文案"
                            clearable
                            :suggestions="suggestions4"
                            @input="handleSuggest('4', $event)"
                            @search="log($event)"
                            @select="log('select', $event)"
                        />
                    </veui-field>
                    <veui-field
                        label="strong"
                    >
                        <veui-search-box
                            ui="strong"
                            clearable
                            placeholder="搜索提示文案"
                            :suggestions="suggestions4"
                            @input="handleSuggest('4', $event)"
                            @search="log($event)"
                            @select="log('select', $event)"
                        />
                    </veui-field>
                    <veui-field
                        label="inline"
                    >
                        <veui-search-box
                            clearable
                            ui="inline"
                            :placeholder="placeholder"
                            :suggest-trigger="[]"
                            @search="log($event)"
                            @select="log('select', $event)"
                        />
                    </veui-field>
                </section>
                <h2>尺寸</h2>
                <div class="options-desc">
                    可选的尺寸 <span class="bg-gray-show">ui</span> 
                    属性值： <span class="bg-gray-show">xs / s / m / l</span>
                </div>
                <section>
                    <veui-field
                        label="超小号（xs）"
                    >
                        <veui-search-box
                            ui="xs"
                            placeholder="搜索提示文案"
                            :suggestions="suggestions4"
                            @input="handleSuggest('4', $event)"
                            @search="log($event)"
                            @select="log('select', $event)"
                        />
                        <veui-search-box
                            ui="xs strong"
                            placeholder="搜索提示文案"
                            :suggestions="suggestions4"
                            @input="handleSuggest('4', $event)"
                            @search="log($event)"
                            @select="log('select', $event)"
                        />
                        <veui-search-box
                            ui="xs inline"
                            placeholder="搜索提示文案"
                            :suggestions="suggestions4"
                            @input="handleSuggest('4', $event)"
                            @search="log($event)"
                            @select="log('select', $event)"
                        />
                    </veui-field>
                    <veui-field
                        label="小号（s）"
                    >
                        <veui-search-box
                            ui="s"
                            placeholder="搜索提示文案"
                            :suggestions="suggestions4"
                            @input="handleSuggest('4', $event)"
                            @search="log($event)"
                            @select="log('select', $event)"
                        />
                        <veui-search-box
                            ui="s strong"
                            placeholder="搜索提示文案"
                            :suggestions="suggestions4"
                            @input="handleSuggest('4', $event)"
                            @search="log($event)"
                            @select="log('select', $event)"
                        />
                        <veui-search-box
                            ui="s inline"
                            placeholder="搜索提示文案"
                            :suggestions="suggestions4"
                            @input="handleSuggest('4', $event)"
                            @search="log($event)"
                            @select="log('select', $event)"
                        />
                    </veui-field>
                    <veui-field
                        label="中号（m）"
                    >
                        <veui-search-box
                            ui="m"
                            placeholder="搜索提示文案"
                            :suggestions="suggestions4"
                            @input="handleSuggest('4', $event)"
                            @search="log($event)"
                            @select="log('select', $event)"
                        />
                        <veui-search-box
                            ui="m strong"
                            placeholder="搜索提示文案"
                            :suggestions="suggestions4"
                            @input="handleSuggest('4', $event)"
                            @search="log($event)"
                            @select="log('select', $event)"
                        />
                        <veui-search-box
                            ui="m inline"
                            placeholder="搜索提示文案"
                            :suggestions="suggestions4"
                            @input="handleSuggest('4', $event)"
                            @search="log($event)"
                            @select="log('select', $event)"
                        />
                    </veui-field>
                    <veui-field
                        label="大号（l）"
                    >
                        <veui-search-box
                            ui="l"
                            placeholder="搜索提示文案"
                            :suggestions="suggestions4"
                            @input="handleSuggest('4', $event)"
                            @search="log($event)"
                            @select="log('select', $event)"
                        />
                        <veui-search-box
                            ui="l strong"
                            placeholder="搜索提示文案"
                            :suggestions="suggestions4"
                            @input="handleSuggest('4', $event)"
                            @search="log($event)"
                            @select="log('select', $event)"
                        />
                        <veui-search-box
                            ui="l inline"
                            placeholder="搜索提示文案"
                            :suggestions="suggestions4"
                            @input="handleSuggest('4', $event)"
                            @search="log($event)"
                            @select="log('select', $event)"
                        />
                    </veui-field>
                    <veui-field
                        label="超大号（xl）"
                    >
                        <veui-search-box
                            ui="xl"
                            placeholder="搜索提示文案"
                            :suggestions="suggestions4"
                            @input="handleSuggest('4', $event)"
                            @search="log($event)"
                            @select="log('select', $event)"
                        />
                        <veui-search-box
                            ui="xl strong"
                            placeholder="搜索提示文案"
                            :suggestions="suggestions4"
                            @input="handleSuggest('4', $event)"
                            @search="log($event)"
                            @select="log('select', $event)"
                        />
                        <br/>
                        <veui-search-box
                            ui="xl inline"
                            placeholder="搜索提示文案"
                            :suggestions="suggestions4"
                            @input="handleSuggest('4', $event)"
                            @search="log($event)"
                            @select="log('select', $event)"
                        />
                    </veui-field>
                </section>
            </section>
            <section class="has-margin-right">
                <h2>disabled</h2>
                <section>
                    <veui-search-box
                        :value="value"
                        clearable
                        placeholder="搜索提示文案"
                        disabled
                        @search="log($event)"
                    />
                    <veui-search-box
                        ui="strong"
                        disabled
                        placeholder="搜索提示文案"
                        :suggestions="suggestions5"
                        @input="handleSuggest('5', $event)"
                        @search="log($event)"
                    />
                </section>
            </section>
            <section class="has-margin-right">
                <h2>readonly</h2>
                <section>
                    <veui-search-box
                        :value="value"
                        clearable
                        placeholder="搜索提示文案"
                        readonly
                        @search="log($event)"
                    />
                    <veui-search-box
                        :value="value"
                        clearable
                        ui="strong"
                        placeholder="搜索提示文案"
                        readonly
                        @search="log($event)"
                    />
                </section>
            </section>
            <section class="has-margin-right">
                <h2>suggestions</h2>
                <section>
                    <veui-search-box
                        v-model="value2"
                        clearable
                        :placeholder="placeholder"
                        :suggestions="suggestions1"
                        suggest-trigger="focus"
                        @suggest="asyncHandleSuggest('1', $event)"
                        @search="log($event)"
                        @select="value2 = $event.label"
                    />
                    <veui-search-box
                        :placeholder="placeholder"
                        :suggestions="suggestions8"
                        suggest-trigger="focus"
                        @search="log($event)"
                        @suggest="suggestHandler"
                    >
                        <template
                            slot="suggestion"
                            slot-scope="suggestion"
                        >
                            <span>{{ suggestion.value }}</span>
                            <veui-icon name="eye"/>
                        </template>
                    </veui-search-box>
                    <veui-search-box
                        :placeholder="placeholder"
                        :suggestions="suggestions9"
                        replace-on-select
                        @input="handleSuggest('7', $event)"
                        @search="log($event)"
                    >
                        <template slot="suggestions-before">
                            <h3>header</h3>
                        </template>
                        <template
                            slot="group-label"
                            slot-scope="{ label }"
                        >
                            1👉 {{ label }}
                        </template>
                        <template
                            slot="option-label"
                            slot-scope="{ label }"
                        >
                            2👉 {{ label }}
                        </template>
                        <template slot="suggestions-after">
                            <h3>ender</h3>
                        </template>
                    </veui-search-box>
                </section>
            </section>
            <section>
                <h2>maxlength</h2>
                <div>
                    <veui-search-box clearable maxlength="10" placeholder="maxlength"/>
                    <veui-search-box
                        ui="strong"
                        clearable
                        maxlength="10"
                        strict
                        placeholder="maxlength &amp; strict"
                    />
                </div>
            </section>
        </veui-form>
    </article>
</template>

<script>
import bus from '../bus';
import {includes} from 'lodash';
import {SearchBox, Icon, Form, Field} from 'veui';
import 'vue-awesome/icons/flag';

export default {
    name: 'demo-search-box',
    components: {
        'veui-search-box': SearchBox,
        'veui-icon': Icon,
        'veui-field': Field,
        'veui-form': Form
    },
    data() {
        return {
            name: 'name',
            value: '',
            value2: null,
            value3: '测试值',
            value4: '测试值',
            valueis: '测试值',
            placeholder: '百度(placeholder)',
            suggestions1: [],
            suggestions2: [],
            suggestions3: [],
            suggestions4: [],
            suggestions5: [],
            suggestions8: [
                {
                    value: '百度',
                    label: '百度'
                },
                {
                    value: '百度贴吧',
                    label: '百度贴吧'
                },
                {
                    value: '百度MVP',
                    label: '百度MVP'
                }
            ],
            suggestions9: [
                {
                    label: '汽车',
                    options: [
                        {label: 'camry', value: 'camry'},
                        {label: 'carola', value: 'carola'}
                    ]
                }
            ],
        };
    },
    methods: {
        handleSuggest(num, value) {
            if (value && num) {
                this[`suggestions${num}`] = [
                    {
                        value,
                        label: value
                    },
                    {
                        value: '百度',
                        label: '百度'
                    },
                    {
                        value: '百度贴吧',
                        label: '百度贴吧'
                    },
                    {
                        value: '百度MVP',
                        label: '百度MVP'
                    }
                ];
            } else {
                this[`suggestions${num}`] = [
                    '',
                    '百度',
                    '百度贴吧',
                    '百度MVP',
                    '百度指数'
                ];
            }
        },
        asyncHandleSuggest(num, value) {
            setTimeout(() => {
                if (value && num < 3) {
                    this[`suggestions${num}`] = [
                        {
                            value,
                            label: value
                        },
                        {
                            value: '百度',
                            label: '百度'
                        },
                        {
                            value: '百度贴吧',
                            label: '百度贴吧'
                        },
                        {
                            value: '百度MVP',
                            label: '百度MVP'
                        }
                    ];
                } else {
                    this[`suggestions${num}`] = [
                        '',
                        '百度',
                        '百度贴吧',
                        '百度MVP',
                        '百度指数'
                    ];
                }
            }, 1000);
        },
        log(item) {
            bus.$emit('log', item);
        },
        suggestHandler(value) {
            this.suggestions8 = this.suggestions8.map(item => {
                item.hidden = !(
                    includes(item.label, value) || includes(item.value, value)
                );
                return item;
            });
        }
    }
};
</script>
<style lang="less">
.veui-search-box-demo {
    padding-bottom: 20px;

    .has-margin-right {
        .veui-search-box {
            margin-right: 90px;
        }
    }
    .veui-field {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
    }

}

section {
  & & {
    margin-bottom: 20px;
  }
}
</style>
