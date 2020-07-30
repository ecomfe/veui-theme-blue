<template>
    <article>
        <h1><code>&lt;veui-tree&gt;</code></h1>
        <h2>尺寸</h2>
        <div class="options-desc">可选的尺寸
            <span class="bg-gray-show">ui</span>
            属性值：
            <span class="bg-gray-show">s(默认，可不传) / m</span>
        </div>
        <section>
            <h3>常规树</h3>
            <div class="title-desc">已展开集合: {{ expanded }}</div>
            <veui-form>
                <veui-field
                    ui="multi"
                    label="小号[ui=s]"
                >
                    <veui-tree
                        :datasource="coffees"
                        :expanded.sync="expanded"
                    />
                </veui-field>
                <veui-field
                    
                    label="中号[ui=m]"
                >
                    <veui-tree
                        ui="m"
                        :datasource="coffees"
                        :expanded.sync="expanded"
                    />
                </veui-field>
            </veui-form>
        </section>
        <section>
            <div class="title-desc">自定义slot：</div>
            <br/>
            <veui-tree
                :datasource="coffees"
                :expanded.sync="expanded"
            >
                <template
                    slot="item-before"
                >
                    <veui-icon name="file" style="margin-right: 8px;"/>
                </template>
                <template
                    slot="item-after"
                >
                    <veui-icon name="file" style="margin-right: 8px;"/>
                </template>
            </veui-tree>
        </section>
        <section>
            <h3>含复选框的树：</h3>
            <veui-tree
                v-model="checked"
                :datasource="coffees"
                :expanded.sync="expanded"
                checkable
            />
        </section>
        <section>
            <h3>含复选框和可单选的树：</h3>
            <veui-tree
                v-model="checked"
                :datasource="coffees"
                :expanded.sync="expanded2"
                :selected.sync="selected"
                checkable
                selectable
                include-indeterminate
            />
            <div class="title-desc">复选集合：{{ checked }}</div>
            <div class="title-desc">单选集合：{{ selected }}</div>
        </section>
    </article>
</template>

<script>
import {Tree, Form, Field, Icon} from 'veui';

export default {
    name: 'tree',
    components: {
        'veui-tree': Tree,
        'veui-form': Form,
        'veui-field': Field,
        'veui-icon': Icon
    },
    data() {
        return {
            expanded: ['infused', 'brewed'],
            expanded2: [],
            checked: [],
            selected: null,
            coffees: [
                {
                    label: 'Infused',
                    value: 'infused',
                    children: [
                        {
                            label: 'Brewed',
                            value: 'brewed',
                            disabled: true,
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
            ]
        };
    }
};
</script>

<style scoped>
p {
  margin: 30px;
}
</style>
