<template>
    <article>
        <h1><code>&lt;veui-button&gt;</code></h1>
        <h2>风格</h2>
        <div class="options-desc">可选的风格 <span class="bg-gray-show">ui</span> 属性值： <span class="bg-gray-show">normal（普通） / translucent（幽灵） / primary（重要） / text（文字） / icon（图标）</span></div>
        <section>
            <veui-button ui="normal">
                风格
            </veui-button>
            <veui-button ui="translucent">
                风格
            </veui-button>
            <veui-button ui="primary">
                风格
            </veui-button>
            <veui-button ui="text">
                风格
            </veui-button>
            <veui-button ui="icon">
                <veui-icon name="search"/>
            </veui-button>
        </section>
        <h2>尺寸</h2>
        <div class="options-desc">可选的尺寸 <span class="bg-gray-show">ui</span> 属性值： <span class="bg-gray-show">xs / s（默认，可不传） / m / l / xl</span></div>
        <section>
            <veui-button ui="xs">
                尺寸
            </veui-button>
            <veui-button >
                尺寸
            </veui-button>
            <veui-button ui="m">
                尺寸
            </veui-button>
            <veui-button ui="l">
                尺寸
            </veui-button>
            <veui-button ui="xl">
                尺寸
            </veui-button>
        </section>
        <h2>形状</h2>
        <div class="options-desc">可选的形状 <span class="bg-gray-show">ui</span> 属性值： <span class="bg-gray-show">square</span></div>
        <section>
            <veui-button ui="square">
                <veui-icon name="search"/>
            </veui-button>
        </section>
        <h2>加强</h2>
        <div class="options-desc">可选值 <span class="bg-gray-show">ui</span> 属性值： <span class="bg-gray-show">strong</span></div>
        <section>
            <veui-button ui="strong">
                加强
            </veui-button>
        </section>
        <hr/>
        <h2>基础按钮</h2>
        <section>
            <span class="title-desc">普通按钮</span>
            <veui-button ui="xs">
                保存
            </veui-button>
            <veui-button>
                保存
            </veui-button>
            <veui-button ui="m">
                保存
            </veui-button>
            <veui-button ui="l">
                保存
            </veui-button>
            <veui-button ui="xl">
                保存
            </veui-button>
            <veui-button disabled>
                保存
            </veui-button>
            <veui-button loading>
                保存
            </veui-button>
        </section>
        <section>
            <span class="title-desc">加强按钮</span>
            <veui-button ui="strong xs">
                保存
            </veui-button>
            <veui-button ui="strong">
                保存
            </veui-button>
            <veui-button ui="strong m">
                保存
            </veui-button>
            <veui-button ui="strong l">
                保存
            </veui-button>
            <veui-button ui="strong xl">
                保存
            </veui-button>
            <veui-button
                ui="strong"
                disabled
            >
                保存
            </veui-button>
            <veui-button
                ui="strong"
                loading
            >
                保存
            </veui-button>
        </section>
        <section>
            <span class="title-desc">重要按钮</span>
            <veui-button ui="primary xs">
                提交
            </veui-button>
            <veui-button ui="primary">
                提交
            </veui-button>
            <veui-button ui="primary m">
                提交
            </veui-button>
            <veui-button ui="primary l">
                提交
            </veui-button>
            <veui-button ui="primary xl">
                提交
            </veui-button>
            <veui-button
                ui="primary"
                disabled
            >
                提交
            </veui-button>
            <veui-button
                ui="primary"
                loading
            >
                提交
            </veui-button>
        </section>
        <section>
            <span class="title-desc">幽灵按钮</span>
            <veui-button ui="translucent xs">
                取消
            </veui-button>
            <veui-button ui="translucent">
                取消
            </veui-button>
            <veui-button ui="translucent m">
                取消
            </veui-button>
            <veui-button ui="translucent l">
                取消
            </veui-button>
            <veui-button ui="translucent xl">
                取消
            </veui-button>
            <veui-button
                ui="translucent"
                disabled
            >
                取消
            </veui-button>
            <veui-button
                ui="translucent"
                loading
            >
                取消
            </veui-button>
        </section>
        <section>
            <span class="title-desc">文字按钮（普通）</span>
            <veui-button ui="text xs">
                文字按钮
            </veui-button>
            <veui-button ui="text">
                文字按钮
            </veui-button>
            <veui-button ui="text m">
                文字按钮
            </veui-button>
            <veui-button ui="text l">
                文字按钮
            </veui-button>
            <veui-button ui="text xl">
                文字按钮
            </veui-button>
            <veui-button
                ui="text"
                disabled
            >
                文字按钮
            </veui-button>
            <veui-button
                ui="text"
                loading
            >
                文字按钮
            </veui-button>
        </section>
        <section>
            <span class="title-desc">文字按钮（加强）</span>
            <veui-button ui="text strong xs">
                文字按钮
            </veui-button>
            <veui-button ui="text strong">
                文字按钮
            </veui-button>
            <veui-button ui="text strong m">
                文字按钮
            </veui-button>
            <veui-button ui="text strong l">
                文字按钮
            </veui-button>
            <veui-button ui="text strong xl">
                文字按钮
            </veui-button>
            <veui-button
                ui="text strong"
                disabled
            >
                文字按钮
            </veui-button>
            <veui-button
                ui="text strong"
                loading
            >
                文字按钮
            </veui-button>
        </section>

        <h2>图标按钮</h2>
        <section>
            <span class="title-desc">纯图标样式</span>
            <veui-button ui="icon xs">
                <veui-icon name="search"/>
            </veui-button>
            <veui-button ui="icon">
                <veui-icon name="search"/>
            </veui-button>
            <veui-button ui="icon m">
                <veui-icon name="search"/>
            </veui-button>
            <veui-button ui="icon l">
                <veui-icon name="search"/>
            </veui-button>
            <veui-button ui="icon xl">
                <veui-icon name="search"/>
            </veui-button>
            <veui-button
                ui="icon"
                disabled>
                <veui-icon name="search"/>
            </veui-button>
            <veui-button
                ui="icon"
                loading>
                <veui-icon name="search"/>
            </veui-button>
        </section>
        <section>
            <span class="title-desc">普通样式</span>
            <veui-button ui="normal square xs">
                <veui-icon name="search"/>
            </veui-button>
            <veui-button ui="normal square s">
                <veui-icon name="search"/>
            </veui-button>
            <veui-button ui="normal square m">
                <veui-icon name="search"/>
            </veui-button>
            <veui-button ui="normal square l">
                <veui-icon name="search"/>
            </veui-button>
            <veui-button ui="normal square xl">
                <veui-icon name="search"/>
            </veui-button>
            <veui-button
                ui="normal square"
                disabled>
                <veui-icon name="search"/>
            </veui-button>
            <veui-button
                ui="normal square"
                loading>
                <veui-icon name="search"/>
            </veui-button>
        </section>
        <section>
            <span class="title-desc">加强样式</span>
            <veui-button ui="strong square xs">
                <veui-icon name="search"/>
            </veui-button>
            <veui-button ui="strong square s">
                <veui-icon name="search"/>
            </veui-button>
            <veui-button ui="strong square m">
                <veui-icon name="search"/>
            </veui-button>
            <veui-button ui="strong square l">
                <veui-icon name="search"/>
            </veui-button>
            <veui-button ui="strong square xl">
                <veui-icon name="search"/>
            </veui-button>
            <veui-button
                ui="strong square"
                disabled>
                <veui-icon name="search"/>
            </veui-button>
            <veui-button
                ui="strong square"
                loading>
                <veui-icon name="search"/>
            </veui-button>
        </section>
        <section>
            <span class="title-desc">重要样式</span>
            <veui-button ui="primary square xs">
                <veui-icon name="search"/>
            </veui-button>
            <veui-button ui="primary square s">
                <veui-icon name="search"/>
            </veui-button>
            <veui-button ui="primary square m">
                <veui-icon name="search"/>
            </veui-button>
            <veui-button ui="primary square l">
                <veui-icon name="search"/>
            </veui-button>
            <veui-button ui="primary square xl">
                <veui-icon name="search"/>
            </veui-button>
            <veui-button
                ui="primary square"
                disabled>
                <veui-icon name="search"/>
            </veui-button>
            <veui-button
                ui="primary square"
                loading>
                <veui-icon name="search"/>
            </veui-button>
        </section>
        <section>
            <span class="title-desc">幽灵样式</span>
            <veui-button ui="translucent square xs">
                <veui-icon name="search"/>
            </veui-button>
            <veui-button ui="translucent square s">
                <veui-icon name="search"/>
            </veui-button>
            <veui-button ui="translucent square m">
                <veui-icon name="search"/>
            </veui-button>
            <veui-button ui="translucent square l">
                <veui-icon name="search"/>
            </veui-button>
            <veui-button ui="translucent square xl">
                <veui-icon name="search"/>
            </veui-button>
            <veui-button
                ui="translucent square"
                disabled>
                <veui-icon name="search"/>
            </veui-button>
            <veui-button
                ui="translucent square"
                loading>
                <veui-icon name="search"/>
            </veui-button>
        </section>
        <h2>图文按钮</h2>
        <section>
            <span class="title-desc">普通样式</span>
            <veui-button ui="xs"><veui-icon name="mark-x"/>取消</veui-button>
            <veui-button><veui-icon name="mark-x"/>取消</veui-button>
            <veui-button ui="m"><veui-icon name="mark-x"/>取消</veui-button>
            <veui-button ui="l"><veui-icon name="mark-x"/>取消</veui-button>
            <veui-button ui="xl"><veui-icon name="mark-x"/>取消</veui-button>
            <veui-button disabled><veui-icon name="mark-x"/>取消</veui-button>
            <veui-button loading><veui-icon name="mark-x"/>取消</veui-button>
        </section>
        <section>
            <span class="title-desc">加强样式</span>
            <veui-button ui="strong xs"><veui-icon name="mark-x"/>取消</veui-button>
            <veui-button ui="strong"><veui-icon name="mark-x"/>取消</veui-button>
            <veui-button ui="strong m"><veui-icon name="mark-x"/>取消</veui-button>
            <veui-button ui="strong l"><veui-icon name="mark-x"/>取消</veui-button>
            <veui-button ui="strong xl"><veui-icon name="mark-x"/>取消</veui-button>
            <veui-button disabled><veui-icon name="mark-x"/>取消</veui-button>
            <veui-button loading><veui-icon name="mark-x"/>取消</veui-button>
        </section>
        <section>
            <span class="title-desc">重要样式</span>
            <veui-button ui="primary xs"><veui-icon name="mark-x"/>取消</veui-button>
            <veui-button ui="primary"><veui-icon name="mark-x"/>取消</veui-button>
            <veui-button ui="primary m"><veui-icon name="mark-x"/>取消</veui-button>
            <veui-button ui="primary l"><veui-icon name="mark-x"/>取消</veui-button>
            <veui-button ui="primary xl"><veui-icon name="mark-x"/>取消</veui-button>
            <veui-button disabled><veui-icon name="mark-x"/>取消</veui-button>
            <veui-button loading><veui-icon name="mark-x"/>取消</veui-button>
        </section>
        <section>
            <span class="title-desc">幽灵样式</span>
            <veui-button ui="translucent xs"><veui-icon name="mark-x"/>取消</veui-button>
            <veui-button ui="translucent"><veui-icon name="mark-x"/>取消</veui-button>
            <veui-button ui="translucent m"><veui-icon name="mark-x"/>取消</veui-button>
            <veui-button ui="translucent l"><veui-icon name="mark-x"/>取消</veui-button>
            <veui-button ui="translucent xl"><veui-icon name="mark-x"/>取消</veui-button>
            <veui-button disabled><veui-icon name="mark-x"/>取消</veui-button>
            <veui-button loading><veui-icon name="mark-x"/>取消</veui-button>
        </section>
        <section class="dynamic">
            <h4>动态内容</h4>
            <p>
                <veui-button @click="text = !text">
                    <veui-icon name="mark-x"/><template
                        v-if="text"
                    >取消</template>
                </veui-button>
            </p>
        </section>
    </article>
</template>

<script>
import bus from '../bus';
import {Button, Icon} from 'veui';
import 'veui-theme-blue-icons/search';
import 'veui-theme-blue-icons/mark-x';

export default {
    name: 'button-demo',
    components: {
        'veui-icon': Icon,
        'veui-button': Button
    },
    data() {
        return {
            text: false
        };
    },
    mounted() {
        this.$children.forEach(child => {
            child.$on('click', () => {
                bus.$emit('log', child.$el.getAttribute('ui'));
            });
        });
    }
};
</script>

<style lang="less" scoped>
section {
  user-select: none;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.dynamic {
  display: block;
}

.veui-button {
  margin-right: 10px;
}
</style>
