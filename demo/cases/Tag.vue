<template>
    <article>
        <h1><code>&lt;veui-tag&gt;</code></h1>
        <section>
            <h2>不同尺寸</h2>
            <p>可选的 ui 尺寸属性值：xs / s / m / l（默认 m）</p>
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
        <section>
            <h2>不同类型</h2>
            <p>可选的 type 类型属性值：default / info / success / warning / error（默认 default）</p>
            <p>无边框 ui 属性值： borderless</p>
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
        <section>
            <h2>不同形状</h2>
            <p>可选的 ui 形状属性值：rect / ellipse / circle（默认 rect）</p>
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
        <section>
            <h2>可移除标签</h2>
            <p>设置 closable 来使标签处于可移除状态</p>
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
        <section>
            <h2>选择性标签</h2>
            <p>设置 selectable 来使标签处于可选择状态</p>
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
        <section>
            <h2>禁用标签</h2>
            <p>设置 disabled 来使标签处于禁用状态</p>
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
    > p {
        margin-bottom: 10px;
        color: #999999;
    }
}
</style>
