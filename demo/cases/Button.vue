<template>
    <article>
        <h1><code>&lt;veui-button&gt;</code></h1>
        <h2>风格</h2>
        <div class="options-desc">可选的风格 <span class="bg-gray-show">ui</span> 属性值： <span class="bg-gray-show">normal / translucent / primary / text / icon</span></div>
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
        <div class="options-desc">可选的尺寸 <span class="bg-gray-show">ui</span> 属性值： <span class="bg-gray-show">xs / s / m / l / xl</span></div>
        <section>
            <veui-button ui="xs">
                尺寸
            </veui-button>
            <veui-button ui="s">
                尺寸
            </veui-button>
            <veui-button>
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
        <section>
            <veui-button ui="strong">
                加强
            </veui-button>
        </section>
        <h2>普通按钮</h2>
        <section>
            <span class="title-desc">普通按钮</span>
            <veui-button ui="xs">
                保存
            </veui-button>
            <veui-button ui="s">
                保存
            </veui-button>
            <veui-button>
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
            <veui-button ui="strong s">
                保存
            </veui-button>
            <veui-button ui="strong">
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
            <veui-button ui="primary s">
                提交
            </veui-button>
            <veui-button ui="primary">
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
            <span class="title-desc">半透明按钮</span>
            <veui-button ui="translucent xs">
                取消
            </veui-button>
            <veui-button ui="translucent s">
                取消
            </veui-button>
            <veui-button ui="translucent">
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
        <h2>纯文字按钮</h2>
        <section>
            <span class="title-desc">普通样式</span>
            <veui-button ui="text xs">
                编辑
            </veui-button>
            <veui-button ui="text s">
                编辑
            </veui-button>
            <veui-button ui="text">
                编辑
            </veui-button>
            <veui-button ui="text l">
                编辑
            </veui-button>
            <veui-button ui="text xl">
                编辑
            </veui-button>
            <veui-button
                ui="text"
                disabled
            >
                编辑
            </veui-button>
            <veui-button
                ui="text"
                loading
            >
                编辑
            </veui-button>
        </section>
        <section>
            <span class="title-desc">加强样式</span>
            <veui-button ui="text strong xs">
                编辑
            </veui-button>
            <veui-button ui="text strong s">
                编辑
            </veui-button>
            <veui-button ui="text strong">
                编辑
            </veui-button>
            <veui-button ui="text strong l">
                编辑
            </veui-button>
            <veui-button ui="text strong xl">
                编辑
            </veui-button>
            <veui-button
                ui="text strong"
                disabled
            >
                编辑
            </veui-button>
            <veui-button
                ui="text strong"
                loading
            >
                编辑
            </veui-button>
        </section>
      
        <h2>图标按钮</h2>
        <section>
            <span class="title-desc">纯图标样式</span>
            <veui-button ui="icon xs">
                <veui-icon name="search"/>
            </veui-button>
            <veui-button ui="icon s">
                <veui-icon name="search"/>
            </veui-button>
            <veui-button ui="icon">
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
            <span class="title-desc">半透明样式</span>
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
            <veui-button ui="xs"><veui-icon name="times"/>取消</veui-button>
            <veui-button ui="s"><veui-icon name="times"/>取消</veui-button>
            <veui-button><veui-icon name="times"/>取消</veui-button>
            <veui-button ui="l"><veui-icon name="times"/>取消</veui-button>
            <veui-button ui="xl"><veui-icon name="times"/>取消</veui-button>
            <veui-button disabled><veui-icon name="times"/>取消</veui-button>
            <veui-button loading><veui-icon name="times"/>取消</veui-button>
        </section>
        <section>
            <span class="title-desc">加强样式</span>
            <veui-button ui="strong xs"><veui-icon name="times"/>取消</veui-button>
            <veui-button ui="strong s"><veui-icon name="times"/>取消</veui-button>
            <veui-button ui="strong"><veui-icon name="times"/>取消</veui-button>
            <veui-button ui="strong l"><veui-icon name="times"/>取消</veui-button>
            <veui-button ui="strong xl"><veui-icon name="times"/>取消</veui-button>
            <veui-button disabled><veui-icon name="times"/>取消</veui-button>
            <veui-button loading><veui-icon name="times"/>取消</veui-button>
        </section>
        <section>
            <span class="title-desc">重要样式</span>
            <veui-button ui="primary xs"><veui-icon name="times"/>取消</veui-button>
            <veui-button ui="primary s"><veui-icon name="times"/>取消</veui-button>
            <veui-button ui="primary"><veui-icon name="times"/>取消</veui-button>
            <veui-button ui="primary l"><veui-icon name="times"/>取消</veui-button>
            <veui-button ui="primary xl"><veui-icon name="times"/>取消</veui-button>
            <veui-button disabled><veui-icon name="times"/>取消</veui-button>
            <veui-button loading><veui-icon name="times"/>取消</veui-button>
        </section>
        <section>
            <span class="title-desc">半透明样式</span>
            <veui-button ui="translucent xs"><veui-icon name="times"/>取消</veui-button>
            <veui-button ui="translucent s"><veui-icon name="times"/>取消</veui-button>
            <veui-button ui="translucent"><veui-icon name="times"/>取消</veui-button>
            <veui-button ui="translucent l"><veui-icon name="times"/>取消</veui-button>
            <veui-button ui="translucent xl"><veui-icon name="times"/>取消</veui-button>
            <veui-button disabled><veui-icon name="times"/>取消</veui-button>
            <veui-button loading><veui-icon name="times"/>取消</veui-button>
        </section>
        <section class="dynamic">
            <h4>动态内容</h4>
            <p>
                <veui-button @click="text = !text">
                    <veui-icon name="times"/><template
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
import 'veui-theme-blue-icons/check';
import 'veui-theme-blue-icons/edit';
import 'veui-theme-blue-icons/search';
import 'veui-theme-blue-icons/times';

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
