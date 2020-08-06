
<template>
    <article>
        <h1>
            <code>&lt;veui-select&gt;</code>
        </h1>
        <h2>尺寸</h2>
        <div class="options-desc">可选的尺寸
            <span class="bg-gray-show">ui</span>
            属性值：
            <span class="bg-gray-show">xs / s（默认，可不传） / m / l</span>
        </div>
        <section>
            <div class="title-desc">默认样式</div>
            <veui-form>
                <veui-field
                    v-for="(ui, index) in sizes"
                    :key="index"
                    :label="ui.label"
                >
                    <veui-select
                        v-model="defaultValue1"
                        :ui="ui.value"
                        v-bind="attrs"
                        placeholder="全部"
                        clearable
                        :filter="filter"
                        :readonly="ui.label === '只读'"
                        :disabled="ui.label === '禁用'"
                    />
                </veui-field>
                <veui-field
                    label="只读"
                >
                    <veui-select
                        v-model="defaultValue1"
                        ui="s"
                        v-bind="attrs"
                        placeholder="全部"
                        clearable
                        :filter="filter"
                        readonly
                    />
                </veui-field>
                <veui-field
                    label="禁用"
                >
                    <veui-select
                        v-model="defaultValue1"
                        ui="s"
                        v-bind="attrs"
                        placeholder="全部"
                        clearable
                        :filter="filter"
                        disabled
                    />
                </veui-field>
            </veui-form>
        </section>
        <section>
            <div class="title-desc">多选样式</div>
            <veui-form>
                <veui-field
                    v-for="(ui, index) in sizes"
                    :key="index"
                    :label="ui.label"
                >
                    <veui-select
                        v-model="defaultMultiValue"
                        :ui="ui.value"
                        v-bind="attrs"
                        placeholder="全部"
                        clearable
                        multiple
                    >
                    </veui-select>
                </veui-field>
            </veui-form>
        </section>
        <section>
            <div class="title-desc">单选且搜索样式：</div>
            <veui-form>
                <veui-field
                    v-for="(ui, index) in sizes"
                    :key="index"
                    :label="ui.label"
                >
                    <veui-select
                        v-model="defaultValue2"
                        :ui="ui.value"
                        v-bind="attrs"
                        searchable
                    />
                </veui-field>
            </veui-form>
        </section>
        <section>
            <div class="title-desc">多选且搜索样式：</div>
            <veui-form>
                <veui-field
                    v-for="(ui, index) in sizes"
                    :key="index"
                    :label="ui.label"
                >
                    <veui-select
                        v-model="defaultSearchMultiValue"
                        v-bind="attrs"
                        :ui="ui.value"
                        searchable
                        multiple
                    />
                </veui-field>
            </veui-form>
        </section>
        <section>
            <div class="title-desc">分隔线样式：</div>
            <veui-form>
                <veui-field
                    label="分隔线样式：">
                    <veui-select
                        v-model="defaultValue9"
                        v-bind="optGroupAttrs"
                        :options="groupedOpts"
                    />
                </veui-field>
            </veui-form>
        </section>
        <h2 style="margin-top: 50px;">以下为更多组件功能demo示例</h2>
        <section>
            <div class="title-desc">Slot样式：</div>
            <veui-form>
                <veui-field label="name=option-label：">
                    <veui-select
                        v-model="defaultValue3"
                        v-bind="attrs"
                    >
                        <template
                            slot="option-label"
                            slot-scope="props"
                        >
                            <span class="veui-option-custom-label">{{ props.label }}</span>
                        </template>
                    </veui-select>
                </veui-field>
                <veui-field label="name=option：">
                    <veui-select
                        v-model="defaultValue1"
                        v-bind="attrs"
                    >
                        <template
                            slot="option"
                            slot-scope="props"
                        >
                            <veui-radio :checked="props.selected">{{ props.label }}</veui-radio>
                        </template>
                    </veui-select>
                </veui-field>
            </veui-form>
        </section>
        <section>
            <div class="title-desc">内联样式：</div>
            <veui-form>
                <veui-field label="内联样式1：">
                    <veui-select
                        v-model="hero"
                        multiple
                    >
                        <veui-option-group
                            position="popup"
                            trigger="hover"
                        >
                            <template slot="label">中国 🇨🇳</template>
                            <veui-option-group
                                label="互联网"
                                position="popup"
                            >
                                <veui-option
                                    value="baidu"
                                    label="百度"
                                />
                                <veui-option
                                    value="alibaba"
                                    label="阿里巴巴"
                                />
                                <veui-option
                                    value="tencent"
                                    label="腾讯"
                                />
                            </veui-option-group>
                            <veui-option-group
                                label="通信"
                                position="popup"
                            >
                                <veui-option
                                    value="telecom"
                                    label="中国电信"
                                />
                                <veui-option
                                    value="mobile"
                                    label="中国移动"
                                />
                            </veui-option-group>
                        </veui-option-group>
                        <veui-option-group
                            label="美国"
                            position="popup"
                        >
                            <veui-option-group
                                label="互联网"
                                position="popup"
                            >
                                <veui-option
                                    value="google"
                                    label="Google"
                                />
                                <veui-option
                                    value="facebook"
                                    label="Facebook"
                                />
                                <veui-option
                                    value="twitter"
                                    label="Twitter"
                                />
                            </veui-option-group>
                            <veui-option-group
                                label="通信"
                                position="popup"
                            >
                                <veui-option
                                    value="atnt"
                                    label="AT&T"
                                />
                                <veui-option
                                    value="verizon"
                                    label="Verizon"
                                />
                            </veui-option-group>
                        </veui-option-group>
                    </veui-select>
                </veui-field>
                <veui-field
                    label="内联样式2：">
                    <veui-select v-model="phone">
                        <veui-option-group label="国产">
                            <veui-option
                                value="xiaomi"
                                label="小米"
                            />
                            <veui-option
                                value="oppo"
                                label="OPPO"
                            />
                            <veui-option
                                value="vivo"
                                label="vivo"
                            />
                            <veui-option
                                value="smartisan"
                                label="坚果"
                            />
                        </veui-option-group>
                        <veui-option-group
                            label="非国产"
                            position="popup"
                        >
                            <veui-option-group
                                label="美国"
                                position="popup"
                            >
                                <veui-option
                                    value="apple"
                                    label="Apple"
                                />
                                <veui-option
                                    value="google"
                                    label="Google"
                                />
                            </veui-option-group>
                            <veui-option-group
                                label="日本"
                                position="popup"
                            >
                                <veui-option
                                    value="sharp"
                                    label="夏普"
                                />
                                <veui-option
                                    value="sony"
                                    label="索尼"
                                />
                            </veui-option-group>
                            <veui-option-group
                                label="韩国"
                                position="popup"
                            >
                                <veui-option
                                    value="samsung"
                                    label="三星"
                                />
                                <veui-option
                                    value="lg"
                                    label="LG"
                                />
                            </veui-option-group>
                        </veui-option-group>
                    </veui-select>
                </veui-field>
                <veui-field
                    
                    label="动态内联样式：">
                    <veui-select
                        searchable
                        @input="keyword = $event"
                    >
                        <template v-if="keyword">
                            <veui-option
                                v-for="option in result"
                                :key="option.value"
                                :value="option.value"
                                :label="option.label"
                            />
                        </template>
                    </veui-select>
                </veui-field>
            </veui-form>
        </section>
        <section>
            <div class="title-desc">复杂自定义样式：</div>
            <veui-form>
                <veui-field label="自定义1：">
                    <veui-select
                        v-model="complex"
                        multiple
                        clearable
                        searchable
                        :options="complexResult"
                        @input="handleSearch"
                    >
                        <template v-if="complexResult">
                            <veui-option
                                v-for="o in complexResult"
                                :key="o.value"
                                :label="o.label"
                                :value="o.value"
                            />
                        </template>
                        <template v-else>
                            <veui-option-group
                                v-for="(group, i) in complexData"
                                :key="i"
                                :label="group.label"
                                position="popup"
                            >
                                <template v-for="(g, j) in group.options">
                                    <veui-option-group
                                        v-if="g.options"
                                        :key="j"
                                        position="popup"
                                        :label="g.label"
                                        :options="g.options"
                                    />
                                    <veui-option
                                        v-else
                                        :key="j"
                                        :label="g.label"
                                        :value="g.value"
                                    />
                                </template>
                                <template
                                    v-if="group.label === '业务点'"
                                    #before
                                >
                                    <div class="note">
                                        <veui-icon name="info-circle"/>
                                        <div class="text">
                                            此处仅显示业务点 Top n，您可通过搜索添加其它业务点标签。
                                        </div>
                                    </div>
                                </template>
                            </veui-option-group>
                        </template>
                    </veui-select>
                </veui-field>
                <veui-field
                    
                    label="自定义2：">
                    <veui-select
                        v-model="complex"
                        multiple
                    >
                        <template v-if="loaded">
                            <veui-option-group
                                label="Foo"
                                position="popup"
                            >
                                <template #before>NOTE Foo</template>
                                <veui-option
                                    label="Foo1"
                                    value="foo1"
                                />
                            </veui-option-group>
                        </template>
                    </veui-select>
                </veui-field>
            </veui-form>
        </section>
        <section>
            <div class="title-desc">分组样式</div>
            <veui-form>
                <veui-field
                    
                    label="可搜索：">
                    <veui-select
                        v-model="defaultValue5"
                        v-bind="optGroupAttrs"
                        ui="s"
                        searchable
                    />
                </veui-field>
                <veui-field
                    
                    label="Slot分组样式1：">
                    <veui-select
                        v-model="defaultValue7"
                        v-bind="optGroupAttrs"
                    >
                        <template
                            slot="option"
                            slot-scope="props"
                        >
                            <div class="veui-option-custom">{{ props.label }}</div>
                        </template>
                    </veui-select>
                </veui-field>
                <veui-field
                    
                    label="Slot分组样式2：">
                    <veui-select
                        v-model="defaultValue8"
                        v-bind="optGroupAttrs"
                    >
                        <template
                            slot="option"
                            slot-scope="props"
                        >
                            <span class="veui-option-label-text veui-option-custom-label">
                                {{ props.label }}
                            </span>
                            <veui-icon name="gift"/>
                        </template>
                    </veui-select>
                </veui-field>
                <veui-field
                    label="内联样式：">
                    <veui-select
                        v-model="defaultValue10"
                        clearable
                    >
                        <template
                            slot="group-label"
                            slot-scope="{ label }"
                        >
                            <b>{{ label }}</b>
                        </template>
                        <veui-option-group label="字母">
                            <veui-option
                                value="A"
                                label="选项 A"
                            />
                            <veui-option
                                value="B"
                                label="选项 B"
                            />
                            <veui-option
                                value="C"
                                label="选项 C"
                            />
                        </veui-option-group>
                        <veui-option-group label="数字">
                            <veui-option
                                value="1"
                                label="选项 1"
                            />
                            <veui-option
                                value="2"
                                label="选项 2"
                            />
                            <veui-option
                                value="3"
                                label="选项 3"
                            />
                        </veui-option-group>
                    </veui-select>
                </veui-field>
            </veui-form>
        </section>
    </article>
</template>

<script>
import bus from '../bus';
import {Icon, Select, Option, OptionGroup, Radio, Field, Form} from 'veui';
import type from 'veui/managers/type';
import 'vue-awesome/icons/flag';
import 'vue-awesome/icons/gift';
import 'veui-theme-blue-icons/info-circle';
export default {
    name: 'select-demo',
    components: {
        'veui-select': Select,
        'veui-option': Option,
        'veui-option-group': OptionGroup,
        'veui-radio': Radio,
        'veui-icon': Icon,
        'veui-field': Field,
        'veui-form': Form
    },
    data() {
        return {
            filter: ({label}) => {
                return label.indexOf(this.keyword) !== -1;
            },
            keyword: '',
            phone: null,
            hero: ['baidu'],
            disabled: true,
            selected: true,
            complex: ['1', '2'],
            loaded: false,
            icon: true,
            defaultValue: null,
            defaultMultiValue: null,
            defaultSearchMultiValue: [1],
            defaultValue1: null,
            defaultValue2: 2,
            defaultValue3: null,
            defaultValue4: null,
            defaultValue5: null,
            defaultValue6: null,
            defaultValue7: null,
            defaultValue8: '1-1',
            defaultValue9: null,
            defaultValue10: null,
            sizes: [
                {
                    label: '超小号[ui=xs]',
                    value: 'xs'
                },
                {
                    label: '小号[ui=s]',
                    value: 's'
                },
                {
                    label: '中号[ui=m]',
                    value: 'm'
                },
                {
                    label: '大号[ui=l]',
                    value: 'l'
                }
            ],
            attrs: {
                name: 'age',
                readonly: false,
                disabled: false,
                clearable: true,
                options: [
                    {
                        label: '下拉选项111',
                        value: 1
                    },
                    {
                        label: '下拉选项下拉选项下拉选项112',
                        value: 2
                    },
                    {
                        label: '下拉选项122',
                        value: 3
                    },
                    {
                        label: '下拉选项222',
                        value: 4
                    }
                ]
            },
            optGroupAttrs: {
                name: 'name',
                readonly: false,
                disabled: false,
                clearable: true,
                options: [
                    {
                        label: '下拉选项1',
                        position: 'popup',
                        options: [
                            {
                                label: '子选项1',
                                value: '1-1'
                            },
                            {
                                label: '子选项子选项子选项子选项子选项子选项2',
                                value: '1-2'
                            },
                            {
                                label: '子选项3',
                                value: '1-3'
                            }
                        ]
                    },
                    {
                        label: '下拉选项下拉选项下拉选项2',
                        options: [
                            {
                                label: '子选项1',
                                value: '2-1'
                            },
                            {
                                label: '子选项2',
                                value: '2-2'
                            },
                            {
                                label: '子选项子选项子选项子选项子选项子选项3',
                                value: '2-3'
                            }
                        ]
                    },
                    {
                        label: '下拉选项3',
                        options: [
                            {
                                label: '子选项1',
                                value: '3-1'
                            },
                            {
                                label: '子选项2',
                                value: '3-2'
                            },
                            {
                                label: '子选项子选项子选项子选项子选项子选项3',
                                value: '3-3'
                            }
                        ]
                    },
                    {
                        label: '下拉选项4',
                        options: [
                            {
                                label: '子选项子选项子选项子选项子选项子选项1',
                                value: '4-1'
                            },
                            {
                                label: '子选项2',
                                value: '4-2'
                            },
                            {
                                label: '子选项3',
                                value: '4-3'
                            }
                        ]
                    }
                ]
            },
            searchResult: null,
            complexData: [
                {
                    label: '内容类型',
                    options: [
                        {label: '通用', value: '1'},
                        {label: '问答', value: '2'},
                        {label: '常见问题', value: '3'}
                    ]
                },
                {
                    label: '行业',
                    options: [
                        {
                            label: '医疗服务',
                            options: [{label: 'A', value: 'a'}]
                        },
                        {
                            label: '整形美容',
                            options: [
                                {label: '整形美容综合', value: '4'},
                                {label: '整形修复外科', value: '5'},
                                {label: '五官整形', value: '6'},
                                {label: '微整形', value: '7'},
                                {label: '减肥塑身', value: '8'},
                                {label: '植发', value: '9'},
                                {label: '纹身', value: '10'},
                                {label: '口腔美容', value: '11'}
                            ]
                        },
                        {
                            label: '医疗器械',
                            options: [{label: 'B', value: 'b'}]
                        },
                        {
                            label: '教育培训',
                            options: [{label: 'C', value: 'c'}]
                        },
                        {
                            label: '招商加盟',
                            options: [{label: 'D', value: 'd'}]
                        },
                        {
                            label: '商务服务',
                            options: [{label: 'E', value: 'e'}]
                        },
                        {
                            label: '办公文教',
                            options: [{label: 'F', value: 'f'}]
                        },
                        {
                            label: '网络服务',
                            options: [{label: 'G', value: 'g'}]
                        }
                    ]
                },
                {
                    label: '业务点',
                    options: [
                        {label: '工程师培训', value: '12'},
                        {label: '大数据培训班', value: '13'},
                        {label: '双眼皮产品类', value: '14'},
                        {label: '分散机', value: '15'},
                        {label: '编码器', value: '16'},
                        {label: '相亲中介', value: '17'}
                    ]
                }
            ]
        };
    },
    computed: {
        result() {
            return [
                {label: 'Foo', value: 'foo'},
                {label: 'Bar', value: 'bar'},
                {label: this.keyword, value: this.keyword}
            ];
        },
        groupedOpts() {
            return type
                .clone(this.optGroupAttrs.options)
                .map(group => {
                    delete group.label;
                    delete group.position;
                    return group;
                })
                .reduce((acc, cur) => {
                    acc.push(cur);
                    return acc;
                }, []);
        },
        complexResult() {
            return this.searchResult
                ? (this.complex || [])
                    .map(v => ({
                        label: v + '**',
                        value: v
                    }))
                    .concat(this.searchResult || [])
                : null;
        }
    },
    mounted() {
        this.$children.forEach(child => {
            child.$on('click', () => {
                bus.$emit('log', child.$el.getAttribute('ui'));
            });
        });
        this.loaded = true;
    },
    methods: {
        change(value) {
            // alert('您选中的下拉选项值是' + value)
        },
        handleSearch(val) {
            if (val) {
                this.searchResult = Array.from({
                    length: 5
                }).map((_, i) => ({
                    label: `${val}#${i}`,
                    value: `${val}#${i}`
                }));
            } else {
                this.searchResult = null;
            }
        }
    }
};
</script>

<style lang="less" scoped>
section {
    margin-bottom: 20px;
}
.veui-option-label {
  &-text,
  .veui-icon {
    vertical-align: middle;
  }
  .veui-icon {
    margin-left: 5px;
  }
}
.veui-option-custom {
  position: relative;
  padding-left: 24px;
  &::after {
    content: '❤️';
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  }
  &-label {
    color: rgb(80, 170, 39);
  }
}
.filter {
  width: calc(100% - 10px);
  margin: 5px;
}
.note {
  margin: 8px;
  font-size: 12px;
  width: 240px;
  .veui-icon {
    float: left;
    margin-top: 3px;
    margin-right: 8px;
    margin-left: 8px;
  }
  .text {
    overflow: hidden;
  }
}
</style>
