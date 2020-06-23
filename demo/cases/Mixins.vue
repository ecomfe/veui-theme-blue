<template>
    <section>
        <h1>Mixins混合函数</h1>
        <div class="var-module" v-for="(item, index) in settings" :key="`module_${index}`">
            <div class="var-module-con" v-for="(childItem, childIndex) in item" :key="`son_module_${childIndex}`">
                <p class="var-module-con-text" :class="childItem.class">{{childItem.label}}</p>
                <p class="var-module-con-desc">{{childItem.desc}}</p>
            </div>
        </div>
    </section>
</template>
<script>
const Settings = [
    [
        {
            label: '过渡效果：',
            desc: '函数名：',
            class: 'var-module-con-title'
        },
        {
            label: '过渡效果',
            desc: '.veui-transition(...)',
            class: 'font-size-normal'
        },
        {
            label: '按钮过渡效果',
            desc: '.veui-button-transition(...)',
            class: 'font-size-normal'
        }
    ],
    [
        {
            label: '定位：',
            desc: '函数名：',
            class: 'var-module-con-title'
        },
        {
            label: '居中定位',
            desc: '.veui-position-center(@x, @y)',
            class: 'font-size-normal'
        }
    ],
    [
        {
            label: '表单项：',
            desc: '函数名：',
            class: 'var-module-con-title'
        },
        {
            label: '必填项',
            desc: '.veui-field-require()',
            class: 'font-size-normal'
        },
        {
            label: '错误信息',
            desc: '.veui-field-gap-error()',
            class: 'font-size-normal'
        }
    ],
    [
        {
            label: '阴影：',
            desc: '函数名：',
            class: 'var-module-con-title'
        },
        {
            label: 'overlay浮层阴影',
            desc: '.veui-overlay-shadow(@color)',
            class: 'overlay-shadow'
        },
        {
            label: 'focus聚焦阴影(box-shadow)',
            desc: '.veui-focus-shadow(@color)',
            class: 'focus-shadow'
        },
        {
            label: 'focus聚焦阴影(outline)',
            desc: '.veui-focus-shadow(@color, @offset)',
            class: 'focus-shadow-outline'
        },
        {
            label: '聚焦时边框+阴影',
            desc: '.veui-focus-ring(@border-color, @shadow)',
            class: 'focus-ring'
        }
    ],
    [
        {
            label: 'Icon大小：',
            desc: '函数名：',
            class: 'var-module-con-title'
        },
        {
            label: 'Icon大小',
            desc: '.veui-icon-size(@size)',
            class: 'font-size-normal'
        }
    ]
];
export default {
    name: 'Variables',
    data() {
        return {
            settings: Object.freeze(Settings)
        };
    }
};
</script>
<style lang="less">
@import (reference) url('~@/variables/index.less');
@import (reference) url('~@/mixins.less');
.overlay-shadow {
    .veui-overlay-shadow();
}
.focus-shadow {
    border: 1px solid @veui-border-color-focus;
    .veui-focus-shadow();
}
.focus-shadow-outline {
    border: 1px solid @veui-border-color-focus;
    .veui-focus-shadow(@veui-brand-color-6, 2);
}
.focus-ring {
    border-width: 1px;
    border-style: solid;
    .veui-focus-ring();
}
</style>
