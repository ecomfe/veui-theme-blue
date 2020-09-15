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
            <veui-form>
                <veui-field label="folded nav" ui="multi">
                    <veui-nav
                        class="rest-nav"
                        :items="items"
                    >
                        <span slot="more-icon">
                            <span class="more-text">更多</span>
                            <veui-icon name="plain-down" class="veui-nav-expand-icon"/>
                        </span>
                    </veui-nav>
                </veui-field>
                <veui-field label="item-label scoped slot" ui="multi">
                    <veui-nav :items="items">
                        <template
                            slot="item-label"
                            slot-scope="item"
                        >{{ item.label }}🐂</template>
                    </veui-nav>
                </veui-field>
                <veui-field label="named nav（without to）" ui="multi">
                    <veui-nav :items="nameItems"/>
                </veui-field>
            </veui-form>
        </section>
        <!-- <section><router-view/></section> -->
    </article>
</template>

<script>
import {VeuiNav, VeuiForm, VeuiField, VeuiIcon} from 'veui';
import 'veui-theme-blue-icons/trophy';
import 'veui-theme-blue-icons/cloud';
import 'veui-theme-blue-icons/home';
import 'veui-theme-blue-icons/gear';
import 'veui-theme-blue-icons/plain-down';

export default {
    name: 'veui-nav-demo',
    components: {
        VeuiNav,
        VeuiForm,
        VeuiField,
        VeuiIcon
    },
    data() {
        let items = [
            {
                label: '导航内容',
                name: 'navigation-one',
                icon: 'trophy',
                // disabled: true,
                // position: 'card',
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
                label: '导航内容',
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
                label: '导航内容',
                name: 'nav-three',
                icon: 'gear',
                disabled: true
            },
            {
                label: '导航内容',
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
                label: '导航内容',
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
