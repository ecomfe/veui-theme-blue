<template>
    <article class="tree-demo">
        <h1><code>&lt;veui-tree&gt;</code></h1>
        <h2>尺寸</h2>
        <div class="options-desc">可选的尺寸
            <span class="bg-gray-show">ui</span>
            属性值：
            <span class="bg-gray-show">s(默认，可不传) / m</span>
        </div>
        <section>
            <h3>常规树</h3>
            <veui-form>
                <veui-field
                    ui="multi few"
                    label="小号[ui=s]"
                >
                    <veui-tree
                        :datasource="coffees"
                        :expanded.sync="expanded"
                    />
                </veui-field>
                <veui-field
                    ui="multi few"
                    label="中号[ui=m]"
                >
                    <veui-tree
                        ui="m"
                        :datasource="coffees"
                        :expanded.sync="expanded1"
                    />
                </veui-field>
            </veui-form>
        </section>
        <section>
            <h3>含图标的树</h3>
            <veui-form>
                <veui-field ui="few multi" label="小号[ui=s]">
                    <veui-tree
                        class="icon-tree"
                        :datasource="coffees"
                        :expanded.sync="expanded2"
                    >
                        <template #item-before="{ children, expanded }">
                            <veui-button
                                ui="aux icon"
                                class="custom-toggle"
                            >
                                <template v-if="children && children.length">
                                    <veui-icon :name="expanded ? 'folder-opened' : 'folder'"/>
                                </template>
                                <template v-else>
                                    <veui-icon name="file"/>
                                </template>
                            </veui-button>
                        </template>
                    </veui-tree>
                </veui-field>
                <veui-field ui="few multi" label="中号[ui=m]">
                    <veui-tree
                        ui="m"
                        class="icon-tree"
                        :datasource="coffees"
                        :expanded.sync="expanded5"
                    >
                        <template #item-before="{ children, expanded }">
                            <veui-button
                                ui="aux icon"
                                class="custom-toggle"
                            >
                                <template v-if="children && children.length">
                                    <veui-icon :name="expanded ? 'folder-opened' : 'folder'"/>
                                </template>
                                <template v-else>
                                    <veui-icon name="file"/>
                                </template>
                            </veui-button>
                        </template>
                    </veui-tree>
                </veui-field>
            </veui-form>
        </section>
        <section>
            <h3>含复选框的树：</h3>
            <veui-form>
                <veui-field ui="few multi" label="小号[ui=s]">
                    <veui-tree
                        v-model="checked"
                        :datasource="coffees"
                        :expanded.sync="expanded3"
                        checkable
                    />
                </veui-field>
                <veui-field ui="few multi" label="中号[ui=m]">
                    <veui-tree
                        ui="m"
                        v-model="checked"
                        :datasource="coffees"
                        :expanded.sync="expanded3"
                        checkable
                    />
                </veui-field>
            </veui-form>
        </section>
        <section>
            <h3>含复选框和可单选的树：</h3>
            checkStrategy：
            <veui-radio-group
                v-model="strategy"
                class="check-strategy"
                :items="strategies"
            />
            <veui-form>
                <veui-field ui="few">
                    <veui-tree
                        v-model="checked2"
                        :datasource="coffees"
                        :expanded.sync="expanded4"
                        :selected.sync="selected"
                        checkable
                        selectable
                        :merge-checked="
                            strategy === 'include-indeterminate' ? 'keep-all' : strategy
                        "
                        :include-indeterminate="strategy === 'include-indeterminate'"
                    />
                </veui-field>
                <veui-field ui="few">
                    <div class="title-desc">复选集合：{{ checked2 }}</div>
                    <div class="title-desc">单选集合：{{ selected }}</div>
                </veui-field>
            </veui-form>
        </section>
        <section>
            <h3>Checkable & Selectable item(存在父节点无value)</h3>
            mergeChecked：
            <veui-radio-group
                v-model="strategy3"
                class="check-strategy"
                :items="strategies"
            />
            <veui-tree
                v-model="checked3"
                :datasource="coffeesWithoutGroupValue"
                :expanded.sync="expanded3"
                :selected.sync="selected3"
                :merge-checked="strategy3"
                checkable
                selectable
            />
            <h4>Checked items</h4>
            {{ checked3 }}
            <h4>Selected items</h4>
            {{ selected3 }}
        </section>
    </article>
</template>

<script>
import {VeuiTree, VeuiForm, VeuiField, VeuiIcon, VeuiButton, VeuiRadioGroup} from 'veui';
import {omit} from 'lodash';

export default {
    name: 'tree',
    components: {
        VeuiTree,
        VeuiForm,
        VeuiField,
        VeuiIcon,
        VeuiButton,
        VeuiRadioGroup
    },
    data() {
        let treeData = [
            {
                label: 'Infused',
                value: 'infused',
                children: [
                    {
                        label: 'Brewed',
                        value: 'brewed',
                        children: [
                            {
                                label: 'Drip brewed',
                                value: 'drip-brewed'
                            },
                            {
                                label: 'Filtered',
                                value: 'filtered',
                                disabled: true
                            },
                            {
                                label: 'Pour-over',
                                value: 'pour-over',
                                disabled: true
                            },
                            {
                                label: 'Immersion brewed',
                                value: 'immersion-brewed'
                            }
                        ]
                    },
                    {
                        label: 'French press',
                        value: 'french-press'
                    },
                    {
                        label: 'Cold brew',
                        value: 'cold-brew'
                    }
                ]
            },
            {
                label: 'Boiled',
                value: 'boiled',
                disabled: true,
                children: [
                    {
                        label: 'Percolated',
                        value: 'percolated'
                    },
                    {
                        label: 'Turkish',
                        value: 'turkish'
                    },
                    {
                        label: 'Moka',
                        value: 'moka'
                    }
                ]
            },
            {
                label: 'Espresso',
                value: 'espresso',
                children: [
                    {
                        label: 'Caffè Americano',
                        value: 'caffe-americano'
                    },
                    {
                        label: 'Cafe Lungo',
                        value: 'cafe-lungo',
                        disabled: true
                    },
                    {
                        label: 'Café Cubano',
                        value: 'cafe-cubano'
                    },
                    {
                        label: 'Caffè crema',
                        value: 'caffe-crema'
                    },
                    {
                        label: 'Cafe Zorro',
                        value: 'cafe-zorro',
                        disabled: true
                    },
                    {
                        label: 'Doppio',
                        value: 'doppio',
                        disabled: true
                    },
                    {
                        label: 'Espresso Romano',
                        value: 'espresso-romano'
                    },
                    {
                        label: 'Guillermo',
                        value: 'guillermo'
                    },
                    {
                        label: 'Ristretto',
                        value: 'ristretto'
                    }
                ]
            },
            {
                label: 'Milk coffee',
                value: 'milk-coffee',
                children: [
                    {
                        label: 'Latte',
                        value: 'latte'
                    },
                    {
                        label: 'Macchiato',
                        value: 'macchiato'
                    },
                    {
                        label: 'Cappuccino',
                        value: 'cappuccino'
                    },
                    {
                        label: 'White coffee',
                        value: 'white-coffee'
                    }
                ]
            }
        ];
        return {
            expanded: ['infused', 'brewed'],
            expanded1: [],
            expanded2: [],
            expanded3: [],
            expanded4: [],
            expanded5: [],
            checked: [],
            selected: null,
            checked2: null,
            strategy: 'keep-all',
            selected3: null,
            checked3: null,
            strategy3: 'keep-all',
            strategies: [
                {label: 'keep-all', value: 'keep-all'},
                {label: 'downwards', value: 'downwards'},
                {label: 'upwards', value: 'upwards'},
                {label: 'include-indeterminate', value: 'include-indeterminate'}
            ],
            coffees: treeData
        };
    },
    computed: {
        coffeesWithoutGroupValue() {
            return this.omitGroupValue(this.coffees);
        }
    },
    methods: {
        omitGroupValue(original) {
            return original.map(i => {
                if (i.children && i.children.length) {
                    if (i.value === 'milk-coffee') {
                        i = {
                            ...i,
                            label: `${i.label}(有value)`
                        };
                    } else if (i.value === 'cappuccino') {
                        i = {
                            ...omit(i, 'value'),
                            label: `${i.label}(无value无name)`
                        };
                    } else {
                        i = {
                            ...omit(i, 'value'),
                            label: `${i.label}(无value)`,
                            name: i.value
                        };
                    }
                    i.children = this.omitGroupValue(i.children);
                }
                return i;
            });
        }
    }
};
</script>

<style lang="less">
.tree-demo {
    margin-bottom: 30px;
    .icon-tree {
        .custom-toggle {
            margin-right: 8px;
            color: #666;
        }
        .veui-abstract-tree-item-wrapper {
            .veui-tree-item:not(.veui-tree-item-clickable) {
                padding-left: calc(1em + 4px);
            }
            .veui-tree-item.veui-disabled {
                .custom-toggle {
                    color: #ccc;
                }
            }
        }
    }
}
.check-strategy {
  display: inline-flex;
}
</style>
