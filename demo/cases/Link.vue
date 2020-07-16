<template>
    <article>
        <h1><code>&lt;veui-link&gt;</code></h1>
        <h2>风格</h2>
        <div class="options-desc">可选的风格
            <span class="bg-gray-show">ui</span> 属性值： 
            <span class="bg-gray-show">normal / strong</span>
        </div>
        <section>
            <veui-link
                ui="normal"
                to="button"
            >normal to Button</veui-link>
            <veui-link
                ui="strong"
                to="button"
            >strong to Button</veui-link>
        </section>
        <h2>尺寸</h2>
        <div class="options-desc">可选的尺寸 
            <span class="bg-gray-show">ui</span> 属性值： 
            <span class="bg-gray-show">s / m</span>
        </div>
        <section>
            <veui-link
                ui="s"
                to="button"
            >尺寸 s</veui-link>
            <veui-link
                ui="m"
                to="button"
            >尺寸 m</veui-link>
        </section>
        <h2>组合(s / m /m + disabled)</h2>
        <section>
            <span class="title-desc">普通样式</span>
            <veui-link
                ui="s normal"
                to="https://www.baidu.com/"
                native
                target="_blank"
            >www.baidu.com</veui-link>
            <veui-link
                ui="m normal"
                to="https://www.baidu.com/"
                native
                target="_blank"
            >www.baidu.com</veui-link>
            <veui-link
                ui="m normal"
                to="https://www.baidu.com/"
                native
                target="_blank"
                disabled
            >www.baidu.com</veui-link>
        </section>
        <section>
            <span class="title-desc">加强样式</span>
            <veui-link
                ui="s strong"
                to="https://www.baidu.com/"
                native
                target="_blank"
            >www.baidu.com</veui-link>
            <veui-link
                ui="m strong"
                to="https://www.baidu.com/"
                native
                target="_blank"
            >www.baidu.com</veui-link>
            <veui-link
                ui="m strong"
                to="https://www.baidu.com/"
                native
                target="_blank"
                disabled
            >www.baidu.com</veui-link>
        </section>
    </article>
</template>

<script>
import {Link} from 'veui';

export default {
    name: 'link-demo',
    components: {
        'veui-link': Link
    }
};
</script>

<style lang="less" scoped>
section {
  margin-bottom: 10px;
  .veui-link {
    margin-right: 70px;
  }
}
</style>
