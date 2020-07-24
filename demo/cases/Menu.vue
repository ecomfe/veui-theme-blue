<template>
    <article class="veui-menu-demo">
        <h1><code>&lt;veui-menu&gt;</code></h1>
        <div class="options-desc">竖向菜单不区分型号</div>
        <div>expanded: {{ expanded }} <br>active: {{ active1 }}</div>
        <div>
            外部控制
            <button @click="$router.push('/menu/input')">input</button>
            <button @click="$router.push('/menu/button')">button</button>
        </div>
        <section>
            <veui-menu
                :items="items"
                :active.sync="active1"
                :expanded.sync="expanded"
                collapsible
                :collapsed.sync="collapsed"
            />
        </section>
        <br>
        <section>
            <h3>自定义 icon slot</h3>
            <veui-menu
                ui="s"
                collapsible
                :items="items"
            >
                <veui-icon
                    slot="icon"
                    name="baidu"
                />
            </veui-menu>
        </section>
    </article>
</template>

<script>
import {Menu, Icon} from 'veui';
import {omit} from 'lodash';
import 'veui-theme-blue-icons/android';
import 'veui-theme-blue-icons/apple-f';
import 'veui-theme-blue-icons/baidu';
import 'veui-theme-blue-icons/bug';

export default {
    name: 'veui-menu-demo',
    components: {
        'veui-menu': Menu,
        'veui-icon': Icon
    },
    data() {
        let items = [
            {
                label: 'Group One',
                name: 'group-one',
                icon: 'android',
                children: [
                    {
                        label: 'Sub One',
                        name: 'sub-one',
                        children: [
                            {
                                label: 'Input',
                                to: '/menu/input'
                            }
                        ]
                    },
                    {
                        label: 'Loading',
                        name: 'Loading',
                        to: '/menu/loading',
                        children: [
                            {
                                label: 'Switch',
                                to: '/menu/switch'
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Button',
                name: 'Button',
                to: '/menu/button',
                icon: 'apple-f',
                children: [
                    {
                        label: 'Disabled',
                        name: 'Disabled',
                        disabled: true,
                        children: [
                            {
                                label: 'Link',
                                name: 'Link',
                                to: '/menu/link'
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Navigation Three',
                name: 'nav-three',
                icon: 'baidu',
                disabled: true
            },
            {
                label: 'Navigation Four',
                name: 'nav-four',
                icon: 'bug',
                children: [
                    {
                        label: 'Progress',
                        to: '/menu/progress'
                    }
                ]
            }
        ];
        let items2 = items.map(i => omit(i, 'icon'));
        return {
            expanded: [],
            active1: '一级导航',
            active2: undefined,
            collapsed: undefined,
            items,
            items2
        };
    }
};
</script>

<style lang="less">
.veui-menu-demo {
  .small-menu {
    height: 300px;
  }
}
</style>
