<template>
    <article>
        <h1><code>&lt;veui-tag&gt;</code></h1>
        <h2>不同尺寸</h2>
        <div class="options-desc">可选的尺寸 <span class="bg-gray-show">ui</span> 属性值： <span class="bg-gray-show">xs / s / m / l（默认 m）</span></div>
        <section>
            <div>
                <veui-tag
                    v-for="size in sizes"
                    :key="size"
                    :ui="size"
                >
                    {{ size }}
                </veui-tag>
            </div>
        </section>
        <h2>不同类型</h2>
        <div class="options-desc">可选的类型 <span class="bg-gray-show">type</span> 属性值： <span class="bg-gray-show">default / info / success / warning / error（默认 default）</span></div>
        <div class="options-desc">无边框 <span class="bg-gray-show">ui</span> 属性值：<span class="bg-gray-show">borderless</span></div>
        <section>
            <div>
                <veui-tag
                    v-for="type in types"
                    :key="type"
                    :type="type"
                >
                    {{ type }}
                </veui-tag>
            </div>
            <div>
                <veui-tag
                    v-for="type in types"
                    :key="type"
                    :type="type"
                    ui="borderless"
                >
                    {{ type }}
                </veui-tag>
            </div>
        </section>
        <h2>不同形状</h2>
        <div class="options-desc">可选的形状 <span class="bg-gray-show">ui</span> 属性值： <span class="bg-gray-show">rect / ellipse / circle（默认 rect）</span></div>
        <section>
            <div 
                v-for="type in types"
                :key="type">
                <veui-tag
                    v-for="item in shape"
                    :key="item"
                    :type="type"
                    :ui="item"
                >
                    {{ item === 'circle' ? '签' : item }}
                </veui-tag>
            </div>
        </section>
        <h2>可移除标签</h2>
        <div class="options-desc">设置 <span class="bg-gray-show">closable</span> 来使标签处于可移除状态</div>
        <section>
            <div>
                <veui-tag
                    v-for="(item, index) in sizes"
                    :key="index"
                    :ui="item"
                    closable
                    @close="handleClose(`${item}`)"
                >
                    标签
                </veui-tag>
            </div>
            <div>
                <veui-tag
                    v-for="(item, index) in sizes"
                    :key="index"
                    :ui="`${item} borderless`"
                    closable
                    @close="handleClose(`${item}`)"
                >
                    标签
                </veui-tag>
            </div>
            <div>
                <veui-tag
                    v-for="(item, index) in sizes"
                    :key="index"
                    :ui="`${item} borderless ellipse`"
                    closable
                    @close="handleClose(`${item}`)"
                >
                    标签
                </veui-tag>
            </div>
        </section>
        <h2>选择性标签</h2>
        <div class="options-desc">设置 <span class="bg-gray-show">selectable</span> 来使标签处于可选择状态</div>
        <section>
            <div>
                <veui-tag
                    v-for="(item, index) in sizes"
                    :key="index"
                    :ui="item"
                    selectable
                >
                    标签
                </veui-tag>
            </div>
        </section>
        <h2>禁用标签</h2>
        <div class="options-desc">设置 <span class="bg-gray-show">disabled</span> 来使标签处于禁用状态</div>
        <section>
            <div>
                <veui-tag
                    v-for="(item, index) in sizes"
                    :key="index"
                    :ui="item"
                    disabled
                >
                    标签
                </veui-tag>
            </div>
        </section>
    </article>
</template>

<script>
import {Tag} from 'veui';
import toastManagers from 'veui/managers/toast';

export default {
    name: 'tag-demo',
    components: {
        'veui-tag': Tag
    },
    data() {
        return {
            types: ['default', 'info', 'success', 'warning', 'error'],
            sizes: ['xs', 's', 'm', 'l'],
            shape: ['rect', 'ellipse', 'circle'],
            selected: false
        };
    },
    methods: {
        handleClose(name) {
            toastManagers.success(name + '赢了');
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
