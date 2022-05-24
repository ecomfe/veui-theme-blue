<template>
    <article>
        <h1><code>&lt;veui-tooltip&gt;</code></h1>
        <h2>风格</h2>
        <div class="options-desc">可选的风格
            <span class="bg-gray-show">ui</span>
            属性值：
            <span class="bg-gray-show">black(默认，可不传) / white</span>
        </div>
        <section>
            <veui-form>
                <veui-field ui="multi" label="黑色[ui=black]">
                    <div class="demo-wrap">
                        <div class="box">
                            <div class="top">
                                <veui-button
                                    ref="topLeftHover"
                                    ui="aux"
                                    @mouseenter.native="
                                        show({
                                            position: 'top-start',
                                            target: 'topLeftHover'
                                        })
                                    "
                                >
                                    上左
                                </veui-button>
                                <veui-button
                                    ref="topCenterHover"
                                    ui="aux"
                                    @mouseenter.native="
                                        show({
                                            position: 'top',
                                            target: 'topCenterHover'
                                        })
                                    "
                                >
                                    上边
                                </veui-button>
                                <veui-button
                                    ref="topRightHover"
                                    ui="aux"
                                    @mouseenter.native="
                                        show({
                                            position: 'top-end',
                                            target: 'topRightHover'
                                        })
                                    "
                                >
                                    上右
                                </veui-button>
                            </div>
                            <div class="left">
                                <veui-button
                                    ref="leftTopHover"
                                    ui="aux"
                                    @mouseenter.native="
                                        show({
                                            position: 'left-start',
                                            target: 'leftTopHover'
                                        })
                                    "
                                >
                                    左上
                                </veui-button>
                                <veui-button
                                    ref="leftCenterHover"
                                    ui="aux"
                                    @mouseenter.native="
                                        show({
                                            position: 'left',
                                            target: 'leftCenterHover'
                                        })
                                    "
                                >
                                    左边
                                </veui-button>
                                <veui-button
                                    ref="leftBottomHover"
                                    ui="aux"
                                    @mouseenter.native="
                                        show({
                                            position: 'left-end',
                                            target: 'leftBottomHover'
                                        })
                                    "
                                >
                                    左下
                                </veui-button>
                            </div>
                            <div class="right">
                                <veui-button
                                    ref="rightTopHover"
                                    ui="aux"
                                    @mouseenter.native="
                                        show({
                                            position: 'right-start',
                                            target: 'rightTopHover'
                                        })
                                    "
                                >
                                    右上
                                </veui-button>
                                <veui-button
                                    ref="rightCenterHover"
                                    ui="aux"
                                    @mouseenter.native="
                                        show({
                                            position: 'right',
                                            target: 'rightCenterHover'
                                        })
                                    "
                                >
                                    右边
                                </veui-button>
                                <veui-button
                                    ref="rightBottomHover"
                                    ui="aux"
                                    @mouseenter.native="
                                        show({
                                            position: 'right-end',
                                            target: 'rightBottomHover'
                                        })
                                    "
                                >
                                    右下
                                </veui-button>
                            </div>
                            <div class="bottom">
                                <veui-button
                                    ref="BottomLeftHover"
                                    ui="aux"
                                    @mouseenter.native="
                                        show({
                                            position: 'bottom-start',
                                            target: 'BottomLeftHover'
                                        })
                                    "
                                >
                                    下左
                                </veui-button>
                                <veui-button
                                    ref="BottomCenterHover"
                                    ui="aux"
                                    @mouseenter.native="
                                        show({
                                            position: 'bottom',
                                            target: 'BottomCenterHover'
                                        })
                                    "
                                >
                                    下边
                                </veui-button>
                                <veui-button
                                    ref="BottomRightHover"
                                    ui="aux"
                                    @mouseenter.native="
                                        show({
                                            position: 'bottom-end',
                                            target: 'BottomRightHover'
                                        })
                                    "
                                >
                                    下右
                                </veui-button>
                            </div>
                        </div>
                    </div>
                    <veui-tooltip
                        :position="position"
                        :ui="ui"
                        :target="target"
                        :open.sync="open"
                        :overlay-options="overlayOptions"
                        trigger="hover"
                    >
                        当前是hover事件
                    </veui-tooltip>
                </veui-field>
                <veui-field ui="multi" label="白色[ui=white]">
                    <div class="demo-wrap">
                        <div class="box">
                            <div class="top">
                                <veui-button
                                    ref="topLeftHover2"
                                    ui="aux"
                                    @mouseenter.native="
                                        show2({
                                            position: 'top-start',
                                            target: 'topLeftHover2'
                                        })
                                    "
                                >
                                    上左
                                </veui-button>
                                <veui-button
                                    ref="topCenterHover2"
                                    ui="aux"
                                    @mouseenter.native="
                                        show2({
                                            position: 'top',
                                            target: 'topCenterHover2'
                                        })
                                    "
                                >
                                    上边
                                </veui-button>
                                <veui-button
                                    ref="topRightHover2"
                                    ui="aux"
                                    @mouseenter.native="
                                        show2({
                                            position: 'top-end',
                                            target: 'topRightHover2'
                                        })
                                    "
                                >
                                    上右
                                </veui-button>
                            </div>
                            <div class="left">
                                <veui-button
                                    ref="leftTopHover2"
                                    ui="aux"
                                    @mouseenter.native="
                                        show2({
                                            position: 'left-start',
                                            target: 'leftTopHover2'
                                        })
                                    "
                                >
                                    左上
                                </veui-button>
                                <veui-button
                                    ref="leftCenterHover2"
                                    ui="aux"
                                    @mouseenter.native="
                                        show2({
                                            position: 'left',
                                            target: 'leftCenterHover2'
                                        })
                                    "
                                >
                                    左边
                                </veui-button>
                                <veui-button
                                    ref="leftBottomHover2"
                                    ui="aux"
                                    @mouseenter.native="
                                        show2({
                                            position: 'left-end',
                                            target: 'leftBottomHover2'
                                        })
                                    "
                                >
                                    左下
                                </veui-button>
                            </div>
                            <div class="right">
                                <veui-button
                                    ref="rightTopHover2"
                                    ui="aux"
                                    @mouseenter.native="
                                        show2({
                                            position: 'right-start',
                                            target: 'rightTopHover2'
                                        })
                                    "
                                >
                                    右上
                                </veui-button>
                                <veui-button
                                    ref="rightCenterHover2"
                                    ui="aux"
                                    @mouseenter.native="
                                        show2({
                                            position: 'right',
                                            target: 'rightCenterHover2'
                                        })
                                    "
                                >
                                    右边
                                </veui-button>
                                <veui-button
                                    ref="rightBottomHover2"
                                    ui="aux"
                                    @mouseenter.native="
                                        show2({
                                            position: 'right-end',
                                            target: 'rightBottomHover2'
                                        })
                                    "
                                >
                                    右下
                                </veui-button>
                            </div>
                            <div class="bottom">
                                <veui-button
                                    ref="BottomLeftHover2"
                                    ui="aux"
                                    @mouseenter.native="
                                        show2({
                                            position: 'bottom-start',
                                            target: 'BottomLeftHover2'
                                        })
                                    "
                                >
                                    下左
                                </veui-button>
                                <veui-button
                                    ref="BottomCenterHover2"
                                    ui="aux"
                                    @mouseenter.native="
                                        show2({
                                            position: 'bottom',
                                            target: 'BottomCenterHover2'
                                        })
                                    "
                                >
                                    下边
                                </veui-button>
                                <veui-button
                                    ref="BottomRightHover2"
                                    ui="aux"
                                    @mouseenter.native="
                                        show2({
                                            position: 'bottom-end',
                                            target: 'BottomRightHover2'
                                        })
                                    "
                                >
                                    下右
                                </veui-button>
                            </div>
                        </div>
                    </div>
                    <veui-tooltip
                        :position="position2"
                        ui="white"
                        :target="target2"
                        :open.sync="open2"
                        :overlay-options="overlayOptions2"
                        trigger="hover"
                    >
                        当前是hover事件
                    </veui-tooltip>
                </veui-field>
            </veui-form>
        </section>
        <h2 style="margin-top: 50px;">更多功能demo示例（UI不需还原）</h2>
        <section>
            <veui-form>
                <veui-field ui="multi" label="Aim center">
                    <veui-checkbox v-model="aimCenter"/>
                </veui-field>
                <veui-field ui="multi" label="click事件">
                    <div class="demo-wrap">
                        <div class="box">
                            <div class="top">
                                <veui-button
                                    ref="topLeftClick"
                                    ui="aux"
                                    @click.native="
                                        clickShow({
                                            clickPosition: 'top-start',
                                            clickTarget: 'topLeftClick'
                                        })
                                    "
                                >
                                    上左
                                </veui-button>
                                <veui-button
                                    ref="topCenterClick"
                                    ui="aux"
                                    @click.native="
                                        clickShow({
                                            clickPosition: 'top',
                                            clickTarget: 'topCenterClick'
                                        })
                                    "
                                >
                                    上边
                                </veui-button>
                                <veui-button
                                    ref="topRightClick"
                                    ui="aux"
                                    @click.native="
                                        clickShow({
                                            clickPosition: 'top-end',
                                            clickTarget: 'topRightClick'
                                        })
                                    "
                                >
                                    上右
                                </veui-button>
                            </div>
                            <div class="left">
                                <veui-button
                                    ref="leftTopClick"
                                    ui="aux"
                                    @click.native="
                                        clickShow({
                                            clickPosition: 'left-start',
                                            clickTarget: 'leftTopClick'
                                        })
                                    "
                                >
                                    左上
                                </veui-button>
                                <veui-button
                                    ref="leftCenterClick"
                                    ui="aux"
                                    @click.native="
                                        clickShow({
                                            clickPosition: 'left',
                                            clickTarget: 'leftCenterClick'
                                        })
                                    "
                                >
                                    左边
                                </veui-button>
                                <veui-button
                                    ref="leftBottomClick"
                                    ui="aux"
                                    @click.native="
                                        clickShow({
                                            clickPosition: 'left-end',
                                            clickTarget: 'leftBottomClick'
                                        })
                                    "
                                >
                                    左下
                                </veui-button>
                            </div>
                            <div class="right">
                                <veui-button
                                    ref="rightTopClick"
                                    ui="aux"
                                    @click.native="
                                        clickShow({
                                            clickPosition: 'right-start',
                                            clickTarget: 'rightTopClick'
                                        })
                                    "
                                >
                                    右上
                                </veui-button>
                                <veui-button
                                    ref="rightCenterClick"
                                    ui="aux"
                                    @click.native="
                                        clickShow({
                                            clickPosition: 'right',
                                            clickTarget: 'rightCenterClick'
                                        })
                                    "
                                >
                                    右边
                                </veui-button>
                                <veui-button
                                    ref="rightBottomClick"
                                    ui="aux"
                                    @click.native="
                                        clickShow({
                                            clickPosition: 'right-end',
                                            clickTarget: 'rightBottomClick'
                                        })
                                    "
                                >
                                    右下
                                </veui-button>
                            </div>
                            <div class="bottom">
                                <veui-button
                                    ref="BottomLeftClick"
                                    ui="aux"
                                    @click.native="
                                        clickShow({
                                            clickPosition: 'bottom-start',
                                            clickTarget: 'BottomLeftClick'
                                        })
                                    "
                                >
                                    下左
                                </veui-button>
                                <veui-button
                                    ref="BottomCenterClick"
                                    ui="aux"
                                    @click.native="
                                        clickShow({
                                            clickPosition: 'bottom',
                                            clickTarget: 'BottomCenterClick'
                                        })
                                    "
                                >
                                    下边
                                </veui-button>
                                <veui-button
                                    ref="BottomRightClick"
                                    ui="aux"
                                    @click.native="
                                        clickShow({
                                            clickPosition: 'bottom-end',
                                            clickTarget: 'BottomRightClick'
                                        })
                                    "
                                >
                                    下右
                                </veui-button>
                            </div>
                        </div>
                    </div>
                    <veui-tooltip
                        :position="clickPosition"
                        :ui="ui"
                        :target="clickTarget"
                        :open.sync="clickOpen"
                        trigger="click"
                        :aim-center="aimCenter"
                    >
                        当前是click事件多行文本多行文本多行文本多行文本
                    </veui-tooltip>
                </veui-field>
                <veui-field label="自定义事件">
                    <veui-input
                        ref="number"
                        v-model="number"
                        ui="big"
                        composition
                        @change="log('change')"
                        @focus="numberOpen = true"
                        @blur="numberOpen = false"
                    />
                    <veui-tooltip
                        position="top"
                        :ui="ui"
                        target="number"
                        trigger="custom"
                        :open.sync="numberOpen"
                        :aim-center="aimCenter"
                    >
                        你focus到了
                    </veui-tooltip>
                </veui-field>
                <veui-field label="排除自己">
                    <veui-button ref="exclude">
                        target
                    </veui-button>
                    <veui-tooltip
                        position="top"
                        target="exclude"
                        trigger="hover"
                        :interactive="false"
                        :hide-delay="0"
                        :aim-center="aimCenter"
                    >
                        你focus到了
                    </veui-tooltip>
                </veui-field>
            </veui-form>
        </section>
    </article>
</template>

<script>
import bus from '../bus';
import {VeuiTooltip, VeuiButton, VeuiInput, VeuiForm, VeuiField, VeuiCheckbox} from 'veui';

export default {
    name: 'tooltip-demo',
    components: {
        VeuiButton,
        VeuiTooltip,
        VeuiInput,
        VeuiForm,
        VeuiField,
        VeuiCheckbox
    },
    data() {
        return {
            position: '',
            position2: '',
            clickPosition: '',
            ui: '',
            target: 'topLeftHover',
            target2: 'topLeftHover',
            clickTarget: 'topLeftClick',
            open: false,
            open2: false,
            clickOpen: false,
            number: '12345678910987654321',
            numberOpen: false,
            overlayOptions: {},
            overlayOptions2: {},
            aimCenter: false,
        };
    },
    mounted() {
        this.$children.forEach(child => {
            child.$on('click', () => {
                bus.$emit('log', child.$el.getAttribute('ui'));
            });
        });
    },
    methods: {
        show(obj) {
            this.position = obj.position;
            this.target = obj.target;
            this.open = true;
        },
        show2(obj) {
            this.position2 = obj.position;
            this.target2 = obj.target;
            this.open2 = true;
        },
        clickShow(obj) {
            this.clickPosition = obj.clickPosition;
            this.clickTarget = obj.clickTarget;
            this.clickOpen = true;
        }
    }
};
</script>

<style lang="less" scoped>
section {
    user-select: none;
    margin: 30px 0;
}
.demo-wrap {
    width: 500px;
    padding: 20px;
    border: 1px solid #eee;
    .box {
        position: relative;
        .top,
        .bottom {
            width: 100%;
            clear: both;
            text-align: center;
        }
        .left {
            width: 100px;
            float: left;
        }
        .right {
            width: 100px;
            float: right;
        }
        .top .veui-button,
        .bottom .veui-button {
            margin-right: 10px;
        }
        .left .veui-button,
        .right .veui-button {
            margin-bottom: 10px;
        }
    }
}
</style>
