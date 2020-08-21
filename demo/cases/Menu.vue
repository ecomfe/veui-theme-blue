<template>
    <article class="veui-menu-demo">
        <h1><code>&lt;veui-menu&gt;</code></h1>
        <div class="options-desc">竖向菜单不区分型号</div>
        <div>expanded: {{ expanded }}  active: {{ active1 }}
            外部控制
            <veui-button @click="$router.push('/menu/input')">input</veui-button>
            <veui-button @click="$router.push('/menu/button')">button</veui-button>
        </div>
        <section>
            <h2>正常样式</h2>
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
            <h2>自定义 icon slot</h2>
            <veui-menu
                collapsible
                :items="items"
            >
                <veui-icon
                    slot="icon"
                    name="home"
                />
            </veui-menu>
        </section>
        <section>
            <h2>自定义 s型号 icon slot</h2>
            <veui-menu
                ui="s"
                collapsible
                :items="items"
            >
                <veui-icon
                    slot="icon"
                    name="home"
                />
            </veui-menu>
        </section>
    </article>
</template>

<script>
import {Menu, Icon} from 'veui';
import {omit} from 'lodash';
import 'veui-theme-blue-icons/trophy';
import 'veui-theme-blue-icons/cloud';
import 'veui-theme-blue-icons/home';
import 'veui-theme-blue-icons/gear';

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
                icon: 'trophy',
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
                icon: 'cloud',
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
                icon: 'home',
                disabled: true
            },
            {
                label: 'Navigation Four',
                name: 'nav-four',
                icon: 'gear',
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
