<template>
    <article>
        <h1>
            <code>&lt;veui-empty&gt;</code>
        </h1>
        <h2>尺寸</h2>
        <div class="options-desc">可选的尺寸 <span class="bg-gray-show">ui</span> 属性值： <span class="bg-gray-show">s（默认） / m</span></div>
        <section>
            <veui-form>
                <veui-field label="小号[ui=s]" ui="multi" class="tow-line-field">
                    <veui-empty>
                        <template #default>
                            <veui-icon name="data-file-box-lg"/>
                        </template>
                    </veui-empty>
                </veui-field>
                <veui-field label="中号[ui=m]" ui="multi" class="tow-line-field">
                    <veui-empty ui="m">
                        <template #default>
                            <veui-icon name="data-file-box-lg"/>
                        </template>
                    </veui-empty>
                </veui-field>
            </veui-form>
        </section>
        <h2 style="margin-top: 50px;">更多功能demo示例（UI不需还原）</h2>
        <section>
            <veui-check-button-group v-model="partValue" :items="parts"/>
            <veui-radio-button-group v-model="ui" :items="uis" class="ml-4"/>
            <veui-empty class="mt-4" :ui="ui" :desc="false" :image="false">
                <template
                    v-if="partValue.includes('title')"
                    #title
                >找不到该页面</template>
                <template
                    v-if="partValue.includes('desc')"
                    #desc
                >当前页面无法访问，请检查地址栏中的网址，确保您访问的是正确的网址。</template>
                <template v-if="partValue.includes('image')" #default>
                    <veui-icon name="data-folder-search-lg"></veui-icon>
                </template>
                <template v-if="partValue.includes('actions')" #actions>
                    <veui-button ui="primary">确定</veui-button>
                    <veui-button>取消</veui-button>
                </template>
            </veui-empty>
        </section>
    </article>
</template>

<script>
import {Button, Empty, CheckButtonGroup, RadioButtonGroup, Icon, Form, Field} from 'veui';
import 'veui-theme-blue-icons/data-file-box-lg';
import 'veui-theme-blue-icons/data-folder-search-lg';

function genLabel(value) {
    return {label: value, value};
}

export default {
    name: 'empty-demo',
    components: {
        'veui-button': Button,
        'veui-empty': Empty,
        'veui-check-button-group': CheckButtonGroup,
        'veui-radio-button-group': RadioButtonGroup,
        'veui-icon': Icon,
        'veui-form': Form,
        'veui-field': Field
    },
    data() {
        return {
            parts: ['image', 'title', 'desc', 'actions'].map(genLabel),
            uis: ['s', 'm'].map(genLabel),
            ui: 'm',
            partValue: ['image', 'title', 'desc', 'actions']
        };
    }
};
</script>

<style scoped>
section {
    margin-bottom: 40px;
}

.ml-4 {
    margin-left: 16px;
}

.mt-4 {
    margin-top: 16px;
}
</style>

