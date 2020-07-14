<template>
    <article>
        <h1><code>&lt;veui-tag&gt;</code></h1>
        <section>
            <h2>不同尺寸</h2>
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
            <h2>不同样式</h2>
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
            <div>
                <veui-tag
                    v-for="type in types"
                    :key="type"
                    :type="type"
                    ui="borderless ellipse"
                >
                    {{ type }}
                </veui-tag>
            </div>
            <div class="tag-circle">
                <div
                    v-for="type in types"
                    :key="type"
                    :class="type">
                    <veui-tag
                        :type="type"
                        ui="borderless circle"
                    >
                        签
                    </veui-tag>
                </div>
            </div>
            
        </section>

        <section>
            <h2>可移除标签</h2>
            <div>
                <veui-tag
                    v-for="(item, index) in tags"
                    :key="index"
                    :ui ="sizes[index]"
                    closable
                    @close="handleClose(`${sizes[index]}${item}`)"
                >
                    {{ item }}
                </veui-tag>
            </div>
            <div>
                <veui-tag
                    v-for="(item, index) in tags"
                    :key="index"
                    :ui="`${sizes[index]} borderless`"
                    closable
                    @close="handleClose(`${sizes[index]}${item}`)"
                >
                    {{ item }}
                </veui-tag>
            </div>
            <div>
                <veui-tag
                    v-for="(item, index) in tags"
                    :key="index"
                    :ui="`${sizes[index]} borderless ellipse`"
                    closable
                    @close="handleClose(`${sizes[index]}${item}`)"
                >
                    {{ item }}
                </veui-tag>
            </div>
        </section>

        <section>
            <h2>选择性标签</h2>
            <div>
                <veui-tag
                    v-for="type in types"
                    :key="type"
                    :type="type"
                    :selected.sync="selected"
                    selectable
                >
                    {{ type }}
                </veui-tag>
                <veui-tag
                    ui="borderless"
                    :selected.sync="selected"
                    selectable
                >borderless</veui-tag>
            </div>
        </section>

        <section>
            <h2>禁用标签</h2>
            <div>
                <veui-tag
                    v-for="type in types"
                    :key="type"
                    :type="type"
                    :selected.sync="selected"
                    disabled
                    selectable
                >
                    {{ type }}
                </veui-tag>
                <veui-tag
                    ui="borderless"
                    :selected.sync="selected"
                    disabled
                    selectable
                >borderless</veui-tag>
            </div>
            <div>
                <veui-tag
                    v-for="type in types"
                    :key="type"
                    :type="type"
                    disabled
                    closable
                >
                    {{ type }}
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
            tags: ['标签', '标签', '标签', '标签'],
            types: ['default', 'info', 'success', 'warning', 'error'],
            sizes: ['xs', 's', 'm', 'l'],
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
section > div {
    margin-bottom: 15px;
}
.tag-circle {
    display: flex;
    > div {
        text-align: center;
        width: 76px;
    }
    .default {
        width: 76px;
    }
    .info {
        width: 60px;
    }
    .success {
        width: 90px;
    }
    .error {
        width: 68px;
    }
}
</style>
