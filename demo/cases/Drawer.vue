<template>
    <article class="demo-drawer">
        <h1><code>&lt;veui-drawer&gt;</code></h1>
        <h2>尺寸</h2>
        <div class="options-desc">可选的尺寸 <span class="bg-gray-show">ui</span> 属性值： <span class="bg-gray-show">xs / s / m / l / xl</span></div>
        <div class="options-desc">注意 <span class="bg-gray-show">placement为top / bottom时，ui不能选l / xl，上下抽屉只有xs / s / m三种选项</span></div>
        <section>
            <veui-checkbox v-model="modal">Modal</veui-checkbox>
            <veui-checkbox v-model="outsideClosable">outside Closable</veui-checkbox>
        </section>
        <section>
            <veui-button @click="handleTopOpen('xs')">
                上抽屉超小号
            </veui-button>
            <veui-button @click="handleTopOpen('s')">
                上抽屉小号
            </veui-button>
            <veui-button @click="handleTopOpen('m')">
                上抽屉中号
            </veui-button>
        </section>
        <section>
            <veui-button @click="handleBottomOpen('xs')">
                下抽屉超小号
            </veui-button>
            <veui-button @click="handleBottomOpen('s')">
                下抽屉小号
            </veui-button>
            <veui-button @click="handleBottomOpen('m')">
                下抽屉中号
            </veui-button>
        </section>
        <section>
            <veui-button @click="handleRightOpen('xs')">
                右抽屉超小号
            </veui-button>
            <veui-button @click="handleRightOpen('s')">
                右抽屉小号
            </veui-button>
            <veui-button @click="handleRightOpen('m')">
                右抽屉中号
            </veui-button>
            <veui-button @click="handleRightOpen('l')">
                右抽屉大号
            </veui-button>
            <veui-button @click="handleRightOpen('xl')">
                右抽屉超大号
            </veui-button>
        </section>
        <section>
            <veui-button @click="handleLeftOpen('xs')">
                左抽屉超小号
            </veui-button>
            <veui-button @click="handleLeftOpen('s')">
                左抽屉小号
            </veui-button>
            <veui-button @click="handleLeftOpen('m')">
                左抽屉中号
            </veui-button>
            <veui-button @click="handleLeftOpen('l')">
                左抽屉大号
            </veui-button>
            <veui-button @click="handleLeftOpen('xl')">
                左抽屉超大号
            </veui-button>
        </section>

        <veui-drawer
            :open.sync="topOpen"
            class="drawer-demo-instance"
            :outside-closable="outsideClosable"
            :modal="modal"
            :ui="topUi"
            placement="top"
        >
            <p>我是上侧{{topUi}}型抽屉</p>
            <template
                slot="title"
                slot-scope="{ close }"
            >
                <a @click="close">
                    点我也可关闭
                </a>
            </template>
            <template slot="foot">
                <div>我是foot</div>
            </template>
        </veui-drawer>
        <veui-drawer
            :open.sync="rightOpen"
            :modal="modal"
            :outside-closable="outsideClosable"
            placement="right"
            :ui="rightUi"
            title="Hey man"
        >
            <p>我是右侧{{rightUi}}型抽屉</p>
        </veui-drawer>
        <veui-drawer
            title="Hey man"
            :modal="modal"
            :open.sync="bottomOpen"
            :ui="bottomUi"
            :outside-closable="outsideClosable"
            placement="bottom"
        >
            <p>我是下侧{{bottomUi}}型抽屉</p>
        </veui-drawer>
        <veui-drawer
            title="Hey man"
            :modal="modal"
            :open.sync="leftOpen"
            overlay-class="customed-class"
            :outside-closable="outsideClosable"
            placement="left"
            :ui="leftUi"
        >
            <p>我是左侧{{leftUi}}型抽屉</p>
        </veui-drawer>
    </article>
</template>

<script>
import {Checkbox, Drawer, Button} from 'veui';

export default {
    name: 'drawer-demo',
    components: {
        'veui-drawer': Drawer,
        'veui-checkbox': Checkbox,
        'veui-button': Button
    },
    data() {
        return {
            modal: true,
            outsideClosable: true,
            topOpen: false,
            rightOpen: false,
            bottomOpen: false,
            leftOpen: false,
            topUi: 's',
            rightUi: 's',
            bottomUi: 's',
            leftUi: 's'
        };
    },
    methods: {
        handleTopOpen(ui) {
            this.topOpen = true;
            this.topUi = ui;
        },
        handleRightOpen(ui) {
            this.rightOpen = true;
            this.rightUi = ui;
        },
        handleBottomOpen(ui) {
            this.bottomOpen = true;
            this.bottomUi = ui;
        },
        handleLeftOpen(ui) {
            this.leftOpen = true;
            this.leftUi = ui;
        }
    }
};
</script>

<style lang="less" scoped>
section {
  & + & {
    margin-top: 20px;
  }
}

.veui-button,
.veui-checkbox {
  & + & {
    margin-left: 20px;
  }
}
</style>
