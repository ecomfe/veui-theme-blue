<template>
    <article class="veui-sidenav-demo">
        <h1>
            <code>&lt;veui-sidenav&gt;</code>
        </h1>
        <div>expanded: {{ expanded }}</div>
        <div>active: {{ active1 }}</div>
        <veui-button
            @click="$router.push('/sidenav/input')"
        >跳转到 input</veui-button>
        <veui-button @click="collapsed = !collapsed">切换展开</veui-button>
        <section>
            <h2>尺寸</h2>
            <div class="options-desc">可选的尺寸
                <span class="bg-gray-show">ui</span>
                属性值：
                <span class="bg-gray-show">s / m / l</span>
            </div>
            <veui-form>
                <veui-field label="小号[ui=s]" ui="multi">
                    <veui-sidenav
                        class="small-sidenav"
                        ui="s"
                        :items="items"
                        :expanded.sync="expanded"
                        :collapsed.sync="collapsed"
                    />
                </veui-field>
                <veui-field label="中号[ui=m]" ui="multi">
                    <veui-sidenav
                        ui="m"
                        :items="items"
                        :active.sync="active1"
                        :expanded.sync="expanded"
                        :collapsed.sync="collapsed"
                    />
                </veui-field>
                <veui-field label="大号[ui=l]" ui="multi">
                    <veui-sidenav
                        ui="l"
                        :items="items2"
                        :active.sync="active2"
                        :collapsed.sync="collapsed"
                    />
                </veui-field>
            </veui-form>
        </section>
        <section>
            <h3>更多demo展示</h3>
            <veui-form>
                <veui-field label="自定义 icon slot" ui="multi">
                    <veui-sidenav ui="s" :collapsed.sync="collapsed" :items="items">
                        <veui-icon slot="icon" name="baidu"/>
                    </veui-sidenav>
                </veui-field>
            </veui-form>
        </section>
        <section>
            <router-view/>
        </section>
    </article>
</template>

<script>
import {Sidenav, Button, Icon, Form, Field} from 'veui';
import {omit} from 'lodash';
import 'veui-theme-blue-icons/gear';
import 'veui-theme-blue-icons/screen-board';
import 'veui-theme-blue-icons/flag';
import 'veui-theme-blue-icons/bill';
import 'veui-theme-blue-icons/mail';

export default {
    name: 'veui-sidenav-demo',
    components: {
        'veui-sidenav': Sidenav,
        'veui-icon': Icon,
        'veui-button': Button,
        'veui-form': Form,
        'veui-field': Field,
    },
    data() {
        let items = [
            {
                label: 'Group One',
                name: 'group-one',
                icon: 'gear',
                position: 'card',
                children: [
                    {
                        label: 'Sub One',
                        name: 'sub-one',
                        icon: 'flag',
                        children: [
                            {
                                label: 'Input',
                                to: '/sidenav/input'
                            }
                        ]
                    },
                    {
                        label: 'Loading',
                        name: 'Loading',
                        to: '/sidenav/loading'
                    }
                ]
            },
            {
                label: 'Button',
                name: 'Button',
                to: '/sidenav/button',
                icon: 'screen-board',
                children: [
                    {
                        label: 'Disabled',
                        name: 'Disabled',
                        disabled: true,
                        children: [
                            {
                                label: 'Link',
                                name: 'Link',
                                to: '/sidenav/link'
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Navigation Three',
                name: 'nav-three',
                icon: 'flag',
                disabled: true
            },
            {
                label: 'Navigation Four',
                name: 'nav-four',
                icon: 'bill',
                children: [
                    {
                        label: 'Four Sub One',
                        name: 'four-sub-one',
                        children: [
                            {
                                label: 'Switch',
                                to: '/sidenav/switch'
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
                                to: '/sidenav/number-input',
                                children: [
                                    {
                                        label: 'Schedule',
                                        to: '/sidenav/schedule'
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
                icon: 'mail',
                children: [
                    {
                        label: 'Progress',
                        to: '/sidenav/progress'
                    },
                    {
                        label: 'Radio',
                        to: '/sidenav/radio'
                    }
                ]
            }
        ];
        let items2 = items.map((i) => omit(i, 'icon'));
        return {
            expanded: [],
            active1: null,
            active2: undefined,
            collapsed: undefined,
            items,
            items2
        };
    }
};
</script>

<style lang="less" scoped>
.veui-sidenav-demo {
  .small-sidenav {
    height: 300px;
  }

  .veui-button + .veui-button {
    margin-left: 8px;
  }
}
</style>
