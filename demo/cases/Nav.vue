<template>
    <article class="veui-nav-demo">
        <h1><code>&lt;veui-nav&gt;</code></h1>
        <section>
            <h2>尺寸</h2>
            <div class="options-desc">可选的尺寸
                <span class="bg-gray-show">ui</span>
                属性值：
                <span class="bg-gray-show">s（默认，可不传） / m</span>
            </div>
            <veui-form>
                <veui-field label="小号[ui=s]" ui="multi">
                    <veui-nav
                        :items="items"
                        :active.sync="active"
                        ui="s"
                    />
                </veui-field>
                <veui-field label="中号[ui=m]" ui="multi">
                    <veui-nav
                        :items="items"
                        :active.sync="active"
                        ui="m"
                    />
                </veui-field>
            </veui-form>
        </section>
        <h2>更多功能demo示例（UI不需还原）</h2>
        <section>
            <h3>folded nav</h3>
            <veui-nav
                class="rest-nav"
                :items="items"
            />
        </section>
        <section>
            <h3>uncontrolled nav</h3>
            <veui-nav :items="items"/>
        </section>
        <section>
            <h3>item-label scoped slot</h3>
            <veui-nav :items="items">
                <template
                    slot="item-label"
                    slot-scope="item"
                >{{ item.label }}🐂</template>
            </veui-nav>
        </section>
        <section>
            <h3>named nav（without to）</h3>
            <veui-nav :items="nameItems"/>
        </section>
        <section>
            <h3>nav based on params</h3>
            <veui-nav :items="nameItems"/>
        </section>
        <section><router-view/></section>
    </article>
</template>

<script>
import {VeuiNav, VeuiForm, VeuiField} from 'veui';
import 'veui-theme-blue-icons/trophy';
import 'veui-theme-blue-icons/cloud';
import 'veui-theme-blue-icons/home';
import 'veui-theme-blue-icons/gear';

export default {
    name: 'veui-nav-demo',
    components: {
        VeuiNav,
        VeuiForm,
        VeuiField
    },
    data() {
        let items = [
            {
                label: 'Navigation One',
                name: 'navigation-one',
                icon: 'trophy',
                disabled: true,
                position: 'card',
                children: [
                    {
                        label: 'Sub One',
                        name: 'sub-one',
                        icon: 'cloud',
                        children: [
                            {
                                label: 'Input',
                                to: '/nav/input'
                            }
                        ]
                    },
                    {
                        label: 'Loading',
                        name: 'Loading',
                        to: '/nav/loading',
                        children: [
                            {
                                label: 'Link',
                                name: 'Link',
                                to: '/nav/link'
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Button',
                name: 'Button',
                to: '/nav/button',
                icon: 'home',
                // disabled: true,
                children: [
                    {
                        label: 'Disabled',
                        name: 'Disabled',
                        disabled: true,
                        children: [
                            {
                                label: 'Link',
                                name: 'Link',
                                to: '/nav/link'
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Navigation Three',
                name: 'nav-three',
                icon: 'gear',
                disabled: true
            },
            {
                label: 'Navigation Four',
                name: 'nav-four',
                icon: 'gear',
                children: [
                    {
                        label: 'Four Sub One',
                        name: 'four-sub-one',
                        children: [
                            {
                                label: 'Switch',
                                to: '/nav/switch'
                            }
                        ]
                    },
                    {
                        label: 'Number Input Sub',
                        name: 'number-input-sub',
                        children: [
                            {
                                label: 'NumberInput',
                                name: 'menu-number-input',
                                to: '/nav/number-input',
                                children: [
                                    {
                                        label: 'Schedule',
                                        to: '/nav/schedule'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Navigation Five',
                name: 'nav-five',
                icon: 'gear',
                children: [
                    {
                        label: 'Progress',
                        to: '/nav/progress'
                    },
                    {
                        label: 'Radio',
                        to: '/nav/radio'
                    }
                ]
            }
        ];
        let nameItems = [
            {
                label: 'Group One',
                name: 'group-one',
                position: 'card',
                children: [
                    {
                        label: 'Sub One',
                        name: 'sub-one',
                        children: [
                            {
                                label: 'Input',
                                name: 'Input'
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Button',
                name: 'Button',
                children: [
                    {
                        label: 'OptionGroup',
                        name: 'OptionGroup',
                        children: [
                            {
                                label: 'Link',
                                name: 'Link'
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Loading',
                name: 'Loading'
            }
        ];
        return {
            active: 'Loading',
            items,
            nameItems
        };
    }
};
</script>

<style lang="less">
.veui-nav-demo {
  .veui-nav {
    height: 100px;
  }
  .rest-nav {
    width: 500px;
  }
}
</style>
