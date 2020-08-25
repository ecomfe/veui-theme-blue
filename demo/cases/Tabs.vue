<template>
    <article class="tabs-demo">
        <h1>
            <code>&lt;veui-tabs&gt;</code>
        </h1>
        <section>
            <h2>尺寸</h2>
            <div class="options-desc">可选的尺寸 <span class="bg-gray-show">ui</span> 属性值： <span class="bg-gray-show">s（默认，可不传） / m</span></div>
            <h2>风格</h2>
            <div class="options-desc">可选的风格 <span class="bg-gray-show">ui</span> 属性值： <span class="bg-gray-show">normal（默认，可不传） / primary / bordered</span></div>
            <h3>普通样式[ui=normal]</h3>
            <veui-form>
                <veui-field label="小号[ui=s]">
                    <veui-tabs
                        ui="s"
                        :active.sync="active0"
                    >
                        <veui-tab :label="label1" name="answers"/>
                        <veui-tab name="articles" disabled :label="label2">
                            <template #label>{{ label2 }}</template>
                        </veui-tab>
                        <veui-tab :label="label3" name="shares"/>
                    </veui-tabs>
                </veui-field>
                <veui-field label="中号[ui=m]">
                    <veui-tabs
                        ui="m"
                        :active.sync="active0"
                    >
                        <veui-tab :label="label1" name="answers"/>
                        <veui-tab name="articles" disabled :label="label2">
                            <template #label>{{ label2 }}</template>
                        </veui-tab>
                        <veui-tab :label="label3" name="shares"/>
                    </veui-tabs>
                </veui-field>
                <veui-field label="溢出样式小号">
                    <veui-tabs>
                        <veui-tab
                            v-for="n in 30"
                            :key="n"
                            :label="
                                n === 2 ? 'This is Tab2 with long long long long text' : `Tab${n}`
                            "
                        />
                    </veui-tabs>
                </veui-field>
                <veui-field label="溢出样式中号">
                    <veui-tabs ui="m">
                        <veui-tab
                            v-for="n in 30"
                            :key="n"
                            :label="
                                n === 2 ? 'This is Tab2 with long long long long text' : `Tab${n}`
                            "
                        />
                    </veui-tabs>
                </veui-field>
                <!-- <veui-field label="溢出样式2小号">
                    <veui-tabs>
                        <veui-tab
                            v-for="n in 30"
                            :key="n"
                            :label="
                                n === 2 ? 'This is Tab2 with long long long long text' : `Tab${n}`
                            "
                        />
                    </veui-tabs>
                </veui-field> -->
            </veui-form>
            <h3>重要样式[ui=primary]</h3>
            <veui-form>
                <veui-field label="基础样式">
                    <veui-tabs
                        ui="primary"
                        :active.sync="active0"
                    >
                        <veui-tab :label="label1" name="answers"/>
                        <veui-tab name="articles" :label="label2" status="error">
                            <template #label><span style="color: #E64552;">{{ label2 }}</span></template>
                        </veui-tab>
                        <veui-tab :label="label3" name="shares"/>
                    </veui-tabs>
                </veui-field>
                <veui-field label="可增删样式">
                    <veui-tabs
                        ui="primary"
                        :active.sync="active1"
                        addable
                        :max="totalTabs0"
                        @add="addTab0"
                        @remove="removeTab0"
                    >
                        <veui-tab
                            v-for="tab in tabs0"
                            :key="tab.name"
                            removable
                            :label="tab.label"
                            :name="tab.name"
                            :status="tab.status"
                        >
                            <p>Tab {{ tab.name }}</p>
                        </veui-tab>
                    </veui-tabs>
                </veui-field>
            </veui-form>
            <h3>全边框样式[ui=bordered]</h3>
            <veui-form>
                <veui-field label="基础样式">
                    <veui-tabs
                        ui="bordered"
                        :active.sync="active0"
                    >
                        <veui-tab :label="label1" name="answers"/>
                        <veui-tab name="articles" disabled :label="label2">
                            <template #label>{{ label2 }}</template>
                        </veui-tab>
                        <veui-tab :label="label3" name="shares"/>
                    </veui-tabs>
                </veui-field>
            </veui-form>
        </section>
        <section>
            <h2>更多功能demo示例（UI不需还原）</h2>
            <veui-form>
                <veui-field label="标签右侧扩展">
                    <veui-tabs :active.sync="active0">
                        <veui-tab
                            :label="label1"
                            name="answers"
                        />
                        <veui-tab name="articles" :label="label2">
                            <template #label>{{ label2 }}</template>
                        </veui-tab>
                        <veui-tab
                            :label="label3"
                            name="shares"
                        />
                        <template #extra>
                            <div class="extra">
                                <veui-button
                                    slot="extra"
                                    ui="primary s"
                                    @click="label1 += '1'"
                                >修改1</veui-button>
                                <veui-button
                                    slot="extra"
                                    ui="s"
                                    @click="label2 += '2'"
                                >修改2</veui-button>
                                <veui-button
                                    slot="extra"
                                    ui="s"
                                    @click="label3 += '3'"
                                >修改3</veui-button>
                            </div>
                        </template>
                        <template #tab-label="{ label }">{{ label }}</template>
                    </veui-tabs>
                </veui-field>
                <veui-field label="不受控">
                    <veui-tabs>
                        <veui-tab
                            label="回答问题"
                            status="warning"
                        >Answers</veui-tab>
                        <veui-tab label="文章评论">Articles</veui-tab>
                        <veui-tab label="分享朋友圈">
                            <template v-slot:label>
                                <em>分享朋友圈</em>
                            </template>
                            <template v-slot:default>
                                Shares [from
                                <code>v-slot:default</code>]
                            </template>
                        </veui-tab>
                        <template #tab-label="{ label }">
                            <b>{{ label }}</b>
                        </template>
                    </veui-tabs>
                </veui-field>
                <veui-field label="路由模式">
                    <veui-tabs :matches="(current, to) => current.path === to.path">
                        <!--可跳转到对应路由页面-->
                        <veui-tab
                            label="Button"
                            to=""
                        />
                        <veui-tab
                            label="Input"
                            to=""
                        />
                        <veui-tab
                            label="Progress"
                            to=""
                        >
                            <div style="border: 1px solid red; padding: 5px;">
                                <h3>包一点内容</h3>
                                <!-- <router-view/> -->
                            </div>
                        </veui-tab>
                        <veui-tab label="内联内容">
                            <b>Hello world.</b>
                        </veui-tab>
                        <veui-tab
                            label="跳转到 Progress"
                            to=""
                        />
                        <!-- <router-view slot="panel"/> -->
                    </veui-tabs>
                </veui-field>
                <veui-field label="增删模式1（内部 UI）">
                    <veui-tabs
                        ui="primary"
                        :active.sync="active1"
                        addable
                        :max="totalTabs0"
                        @add="addTab0"
                        @remove="removeTab0"
                    >
                        <veui-tab
                            v-for="tab in tabs0"
                            :key="tab.name"
                            removable
                            :label="tab.label"
                            :name="tab.name"
                            :status="tab.status"
                        >
                            <p>Tab {{ tab.name }}</p>
                        </veui-tab>
                    </veui-tabs>
                </veui-field>
                <veui-field label="增删模式2（完全外部控制）" ui="multi">
                    <veui-button
                        class="add-btn"
                        @click="addTab2"
                    >添加 TAB</veui-button>
                    <veui-tabs :active.sync="active3">
                        <veui-tab
                            v-for="tab in tabs2"
                            :key="tab.name"
                            removable
                            :label="tab.label"
                            :name="tab.name"
                            :status="tab.status"
                        >
                            <p>Tab {{ tab.name }}</p>
                        </veui-tab>
                    </veui-tabs>
                    <veui-button
                        class="add-btn"
                        @click="addTab3"
                    >添加 TAB</veui-button>
                    <veui-tabs :active.sync="active4">
                        <veui-tab
                            v-for="tab in tabs3"
                            :key="tab.name"
                            removable
                            :label="tab.label"
                            :name="tab.name"
                            :status="tab.status"
                        >
                            <p v-if="tab.label === '弄一个很长的在中间试试'">
                                弄一个很高的在中间试试
                                <br
                                    v-for="n in 10"
                                    :key="n"
                                >
                            </p>
                            <p v-else>Tab {{ tab.name }}</p>
                        </veui-tab>
                    </veui-tabs>
                </veui-field>
                <veui-field label="增删模式3（v-if 等 dom 上控制）：" ui="multi">
                    <p>
                        当前标签
                        <code>{{ active5 }}</code>
                    </p>
                    <veui-button
                        :disabled="tabIfRemoving"
                        @click="insertVisiable = !insertVisiable"
                    >{{ insertVisiable ? '隐藏' : '显示' }}中间一个可切换 TAB</veui-button>
                    <veui-tabs
                        :active.sync="active5"
                    >
                        <veui-tab
                            label="DuerOS"
                            name="os"
                        >
                            <p>os</p>
                        </veui-tab>
                        <veui-tab
                            label="无人车"
                            name="car"
                        >
                            <p>car</p>
                        </veui-tab>
                        <veui-tab
                            v-if="insertVisiable"
                            label="人脸识别"
                            name="face"
                        >
                            <p>face</p>
                        </veui-tab>
                        <veui-tab
                            label="语音识别"
                            name="sound"
                        >
                            <p>sound</p>
                        </veui-tab>
                    </veui-tabs>
                </veui-field>
            </veui-form>
        </section>
    </article>
</template>

<script>
import {VeuiTabs, VeuiTab, VeuiButton, VeuiForm, VeuiField} from 'veui';
import {findIndex, uniqueId} from 'lodash';

export default {
    name: 'tabs-demo',
    components: {
        VeuiTabs,
        VeuiTab,
        VeuiButton,
        VeuiForm,
        VeuiField
    },
    data() {
        return {
            label1: '回答问题',
            label2: '文章评论',
            label3: '分享朋友圈',
            totalTabs0: 15,
            totalTabs1: 20,
            tabs0: [
                {label: '弄一个很长的在第一个试试', name: '默认1'},
                {label: '默认2', name: '默认2'},
                {label: '默认3', name: '默认3'}
            ],
            tabs1: [
                {label: '默认1', name: '默认1'},
                {label: '弄一个很长的在中间试试', name: '默认2', status: 'info'},
                {label: '默认3', name: '默认3'}
            ],
            tabs2: [
                {label: '默认1', name: '默认1'},
                {label: '弄一个很长的在中间试试', name: '默认2', status: 'warning'},
                {label: '默认3', name: '默认3'}
            ],
            tabs3: [
                {label: '默认1', name: '默认1', status: 'error'},
                {label: '弄一个很长的在中间试试', name: '默认2', status: 'warning'},
                {label: '默认3', name: '默认3'}
            ],
            active0: '',
            active1: '',
            active2: '',
            active3: '',
            active4: '',
            active5: '',
            insertVisiable: false,
            tabIfRemoving: false
        };
    },
    methods: {
        addTab0() {
            if (this.tabs0.length >= this.totalTabs0) {
                return;
            }

            let label = uniqueId('默认');
            this.tabs0.push({
                label,
                name: label
            });
            this.active1 = label;
        },
        addTab1() {
            if (this.tabs1.length >= this.totalTabs1) {
                return;
            }

            let label = uniqueId('每次都增加一些很长的来试试看');
            this.tabs1.push({
                label,
                name: label
            });
        },
        addTab2() {
            let label = uniqueId('默认');
            this.tabs2.push({
                label,
                name: label
            });
        },
        addTab3() {
            let label = uniqueId('默认');
            this.tabs3.push({
                label,
                name: label
            });
        },
        removeTab0({name}) {
            let index = findIndex(this.tabs0, tab => tab.name === name);
            if (index !== -1) {
                this.tabs0.splice(index, 1);
            }
        },
        removeTab1({name}) {
            let index = findIndex(this.tabs1, tab => tab.name === name);
            if (index !== -1) {
                this.tabs1.splice(index, 1);
            }
        },
        removeTab2({name}) {
            let index = findIndex(this.tabs2, tab => tab.name === name);
            if (index !== -1) {
                this.tabs2.splice(index, 1);
            }
        },
        removeTab3({name}) {
            let index = findIndex(this.tabs3, tab => tab.name === name);
            if (index !== -1) {
                this.tabs3.splice(index, 1);
            }
        }
    }
};
</script>

<style lang="less">
.tabs-demo {
    .veui-field .veui-field-content {
        flex-direction: column;
        align-items: flex-start;
    }
    section + section {
        margin-top: 60px;
    }

    .veui-tabs {
        width: 600px;
    }

    .large-block-demo .veui-tab {
        border: 1px solid #e7e7e7;
        margin-top: -1px;

        p {
            padding: 0 30px;
        }
    }

    .extra {
        display: flex;
        flex-grow: 1;
        justify-content: flex-end;

        .veui-button {
            margin-left: 12px;
        }
    }

    .add-btn {
        margin-bottom: 10px;
    }
}
</style>
