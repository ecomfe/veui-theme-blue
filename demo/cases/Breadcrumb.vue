<template>
    <article>
        <h1><code>&lt;veui-breadcrumb&gt;</code></h1>
        <section>
            <veui-button @click="next">
                Switch separator
            </veui-button>
        </section>
        <section>
            <veui-breadcrumb
                :routes="items"
                @redirect="handleRedirect"
            >
                <template slot="separator">
                    {{ sep }}
                </template>
            </veui-breadcrumb>
        </section>
        <h2>不同尺寸</h2>
        <div class="options-desc">可选的尺寸 
            <span class="bg-gray-show">ui</span> 属性值： 
            <span class="bg-gray-show">s / m（默认 m）</span>
        </div>
        <section>
            <veui-breadcrumb
                ui="s"
                :routes="items"
                @redirect="handleRedirect"
            />
            <veui-breadcrumb
                ui="m"
                :routes="items"
                @redirect="handleRedirect"
            />
        </section>
        <h2>不同样式</h2>
        <div class="options-desc">可选的样式
            <span class="bg-gray-show">ui</span> 属性值： 
            <span class="bg-gray-show">normal / strong（默认 normal）</span>
        </div>
        <section>
            <veui-breadcrumb
                :routes="items"
                @redirect="handleRedirect"
            />
            <veui-breadcrumb
                ui="strong"
                :routes="items"
                @redirect="handleRedirect"
            />
        </section>
        <h2>内联模式</h2>
        <section>
            <veui-breadcrumb>
                <veui-breadcrumb-item to="/">
                    首页
                </veui-breadcrumb-item>
                <veui-breadcrumb-item :to="{ name: 'Breadcrumb' }">
                    一级页面
                </veui-breadcrumb-item>
                <veui-breadcrumb-item type="text">
                    末级页面
                </veui-breadcrumb-item>
            </veui-breadcrumb>
        </section>
    </article>
</template>

<script>
import {Button, Breadcrumb, BreadcrumbItem} from 'veui';

export default {
    name: 'breadcrumb-demo',
    components: {
        'veui-button': Button,
        'veui-breadcrumb': Breadcrumb,
        'veui-breadcrumb-item': BreadcrumbItem
    },
    data() {
        return {
            index: 0,
            seps: ['/', '👉', '➡️', '➜', '➞', '☞'],
            items: [
                {to: '/', label: '首页', native: true},
                {to: {name: 'Breadcrumb'}, label: '一级页面'},
                {to: '', label: '末级页面'}
            ],
        };
    },
    computed: {
        sep() {
            return this.seps[this.index];
        }
    },
    methods: {
        next() {
            this.index = (this.index + 1) % this.seps.length;
        },
        handleRedirect() {}
    }
};
</script>

<style lang="less" scoped>
section {
  margin-bottom: 20px;
  .veui-breadcrumb:first-child {
      margin-bottom: 15px;
  }
}
</style>
