<template>
    <article>
        <h1><code>&lt;veui-tag&gt;</code></h1>
        <h2>尺寸</h2>
        <div class="options-desc">可选的尺寸 <span class="bg-gray-show">ui</span> 属性值： <span class="bg-gray-show">xs / s（默认，可不传） / m / l</span></div>
        <section>
            <veui-form>
                <veui-field v-for="size in sizes" :key="`${size.value}_01`" :label="size.label" ui="long">
                    <veui-tag
                        :ui="size.value"
                    >
                        标签
                    </veui-tag>
                </veui-field>
            </veui-form>
        </section>
        <h2>类型</h2>
        <div class="options-desc">可选的类型 <span class="bg-gray-show">type</span> 属性值： <span class="bg-gray-show">default（默认） / info / success / warning / error</span></div>
        <section>
            <veui-form>
                <veui-field v-for="type in types" :key="`${type.value}_02`" ui="long" :label="type.label">
                    <veui-tag :type="type.value">
                        标签
                    </veui-tag>
                </veui-field>
            </veui-form>
        </section>
        <h2>风格</h2>
        <div class="options-desc">可选的风格 <span class="bg-gray-show">ui</span> 属性值： <span class="bg-gray-show">borderless / simple</span></div>
        <section>
            <veui-form>
                <veui-field label="有边框[不传ui]" ui="long">
                    <veui-tag>
                        标签
                    </veui-tag>
                    <veui-tag ui="simple">
                        标签
                    </veui-tag>
                </veui-field>
                <veui-field label="无边框[ui=borderless]" ui="long">
                    <veui-tag ui="borderless">
                        标签
                    </veui-tag>
                    <veui-tag ui="borderless simple">
                        标签
                    </veui-tag>
                </veui-field>
            </veui-form>
        </section>
        <h2>形状</h2>
        <div class="options-desc">可选的形状 <span class="bg-gray-show">ui</span> 属性值： <span class="bg-gray-show">rect（默认，可不传） / ellipse / circle</span></div>
        <section>
            <veui-form>
                <veui-field v-for="item in shape" :key="`${item.value}_03`" :label="item.label" ui="long">
                    <veui-tag
                        v-for="type in types"
                        :key="type.value"
                        :type="type.value"
                        :ui="item.value"
                    >
                        {{ item.value === 'circle' ? '签' : '标签' }}
                    </veui-tag>
                </veui-field>
            </veui-form>
        </section>
        <h2>更多状态</h2>
        <section>
            <veui-form>
                <veui-field label="可移除标签" ui="long">
                    <veui-tag
                        removable
                        @remove="handleRemove('1')"
                    >
                        标签
                    </veui-tag>
                    <veui-tag
                        ui="borderless"
                        removable
                        @remove="handleRemove('2')"
                    >
                        标签
                    </veui-tag>
                    <veui-tag
                        ui="borderless ellipse"
                        removable
                        @remove="handleRemove('3')"
                    >
                        标签
                    </veui-tag>
                </veui-field>
                <veui-field label="选择型标签" ui="long">
                    <veui-tag
                        v-for="(item, index) in sizes"
                        :key="`${item.value}_04`"
                        :ui="`${item.value} ${index % 2 ? 'simple' : ''}`"
                        selectable
                    >
                        标签
                    </veui-tag>
                </veui-field>
                <veui-field label="禁用标签" ui="long">
                    <veui-tag disabled>
                        标签
                    </veui-tag>
                </veui-field>
                <veui-field label="可移除标签（受控，demo展示，无须UI还原）" ui="long">
                    <veui-tag
                        removable
                        :removed="controlledRemoved"
                        @remove="handleControlledRemove"
                    >
                        受控可移除标签
                    </veui-tag>
                </veui-field>
            </veui-form>
        </section>
    </article>
</template>

<script>
import Vue from 'vue';
import {VeuiTag, VeuiForm, VeuiField} from 'veui';
import toastManagers from 'veui/managers/toast';
import confirm from 'veui/plugins/confirm';
Vue.use(confirm);

export default {
    name: 'tag-demo',
    components: {
        VeuiTag,
        VeuiForm,
        VeuiField
    },
    data() {
        return {
            types: [
                {
                    label: '基础样式[type=default]',
                    value: 'default'
                },
                {
                    label: '通知样式[type=info]',
                    value: 'info'
                },
                {
                    label: '成功样式[type=success]',
                    value: 'success'
                },
                {
                    label: '警告样式[type=warning]',
                    value: 'warning'
                },
                {
                    label: '错误样式[type=error]',
                    value: 'error'
                }
            ],
            sizes: [
                {
                    label: '超小号[ui=xs]',
                    value: 'xs',
                },
                {
                    label: '小号[ui=s]',
                    value: 's'
                },
                {
                    label: '中号[ui=m]',
                    value: 'm'
                },
                {
                    label: '大号[ui=l]',
                    value: 'l'
                }
            ],
            shape: [
                {
                    label: '方形[ui=rect]',
                    value: 'rect'
                },
                {
                    label: '椭圆形[ui=ellipse]',
                    value: 'ellipse'
                },
                {
                    label: '圆形[ui=circle]',
                    value: 'circle'
                }
            ],
            selected: false,
            controlledRemoved: false
        };
    },
    methods: {
        handleRemove(name) {
        },
        handleControlledRemove() {
            this.$confirm('要删除吗？').then(confirmed => {
                if (confirmed) {
                    this.controlledRemoved = true;
                }
            });
        }
    }
};
</script>

<style scoped lang="less">
.veui-tag {
  margin-right: 15px;
}
section {
    > div {
        margin-bottom: 15px;
    }
}
</style>
