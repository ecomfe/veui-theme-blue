<template>
    <section>
        <h1>基础变量</h1>
        <div class="var-module" v-for="(item, index) in settings" :key="`module_${index}`">
            <div
                class="var-module-con"
                v-for="(childItem, childIndex) in item"
                :key="`son_module_${childIndex}`">
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
            label: '字体大小：',
            desc: '变量名：',
            class: 'var-module-con-title'
        },
        {
            label: '小号字体',
            desc: 'veui-font-size-small',
            class: 'font-size-small'
        },
        {
            label: '中号字体',
            desc: 'veui-font-size-normal',
            class: 'font-size-normal'
        },
        {
            label: '大号字体',
            desc: 'veui-font-size-large',
            class: 'font-size-large'
        }
    ],
    [
        {
            label: '字体粗细：',
            desc: '变量名：',
            class: 'var-module-con-title'
        },
        {
            label: 'regular字体',
            desc: 'veui-font-weight-normal',
            class: 'font-weight-normal'
        },
        {
            label: 'medium字体',
            desc: 'veui-font-weight-bold',
            class: 'font-weight-bold'
        },
        {
            label: 'semibold字体',
            desc: 'veui-font-weight-extra-bold',
            class: 'font-weight-extra-bold'
        }
    ],
    [
        {
            label: '字体颜色：',
            desc: '变量名：',
            class: 'var-module-con-title'
        },
        {
            label: '标题',
            desc: 'veui-font-color-title',
            class: 'font-color-title'
        },
        {
            label: '正文',
            desc: 'veui-font-color-main',
            class: 'font-color-main'
        },
        {
            label: '辅助文字',
            desc: 'veui-font-color-aux',
            class: 'font-color-aux'
        },
        {
            label: '引导文字',
            desc: 'veui-font-color-guide',
            class: 'font-color-guide'
        },
        {
            label: '禁用文字',
            desc: 'veui-font-color-disabled',
            class: 'font-color-disabled'
        }
    ],
    [
        {
            label: '字体行高：',
            desc: '变量名：',
            class: 'var-module-con-title'
        },
        {
            label: '1.5倍',
            desc: 'veui-line-height-normal',
            class: 'line-height-normal'
        },
        {
            label: '2倍',
            desc: 'veui-line-height-large',
            class: 'line-height-large'
        }
    ],
    [
        {
            label: '边框边线：',
            desc: '变量名：',
            class: 'var-module-con-title'
        },
        {
            label: '常规边框',
            desc: 'veui-border-color',
            class: 'border-color'
        },
        {
            label: '聚焦时边框',
            desc: 'veui-border-color-focus',
            class: 'border-color-focus'
        },
        {
            label: '错误时边框',
            desc: 'veui-border-color-error',
            class: 'border-color-error'
        },
        {
            label: '禁用时边框',
            desc: 'veui-border-color-disabled',
            class: 'border-color-disabled'
        }
    ],
    [
        {
            label: '边框圆角：',
            desc: '变量名：',
            class: 'var-module-con-title'
        },
        {
            label: 'S小号圆角',
            desc: 'veui-border-radius-s',
            class: 'border-color border-radius-s'
        },
        {
            label: 'M中号圆角',
            desc: 'veui-border-radius-m',
            class: 'border-color border-radius-m'
        },
        {
            label: 'L大号圆角',
            desc: 'veui-border-radius-l',
            class: 'border-color border-radius-l'
        }
    ],
    [
        {
            label: '阴影：',
            desc: '变量名：',
            class: 'var-module-con-title'
        },
        {
            label: '聚焦时阴影',
            desc: 'veui-shadow-focus',
            class: 'border-color shadow-focus'
        },
        {
            label: '错误时阴影',
            desc: 'veui-shadow-error-focus',
            class: 'border-color shadow-error-focus'
        }
    ],
    [
        {
            label: '填充色：',
            desc: '变量名：',
            class: 'var-module-con-title'
        },
        {
            label: '禁用填充',
            desc: 'veui-disabled-fill-color',
            class: 'disabled-fill-color'
        },
        {
            label: '标签填充',
            desc: 'veui-tag-fill-color',
            class: 'tag-fill-color'
        }
    ],
    [
        {
            label: '高度：',
            desc: '变量名：',
            class: 'var-module-con-title'
        },
        {
            label: 'Xs超小号',
            desc: 'veui-height-xs',
            class: 'height-xs tag-fill-color'
        },
        {
            label: 'S小号',
            desc: 'veui-height-s',
            class: 'height-s tag-fill-color'
        },
        {
            label: 'M中号',
            desc: 'veui-height-m',
            class: 'height-m tag-fill-color'
        },
        {
            label: 'L大号',
            desc: 'veui-height-l',
            class: 'height-l tag-fill-color'
        },
        {
            label: 'Xl超大号',
            desc: 'veui-height-xl',
            class: 'height-xl tag-fill-color'
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
<style lang="less" scope>
@import (reference) url('~@/variables/index.less');
@import (reference) url('~@/mixins.less');
.var-module {
    display: flex;
    margin-bottom: 16px;
    &-con {
        margin-right: 20px;
        color: @veui-font-color-main;
        &:first-child {
            width: 80px;
            flex-shrink: 0;
        }
        &:not(:first-child) {
            min-width: 160px;
        }
        &-text {
            height: 24px;
            line-height: 24px;
            font-size: @veui-font-size-normal;
            &.var-module-con-title {
                font-size: @veui-font-size-large;
                font-weight: @veui-font-weight-bold;
            }
        }
        &-desc {
            color: @veui-font-color-aux;
            font-size: @veui-font-size-small;
        }
    }
    .font-size-small {
        font-size: @veui-font-size-small;
    }
    .font-size-normal {
        font-size: @veui-font-size-normal;
    }
    .font-size-large {
        font-size: @veui-font-size-large;
    }
    .font-weight-normal {
        font-weight: @veui-font-weight-normal;
    }
    .font-weight-bold {
        font-weight: @veui-font-weight-bold;
    }
    .font-weight-extra-bold {
        font-weight: @veui-font-weight-extra-bold;
    }
    .font-color-title {
        color: @veui-font-color-title;
    }
    .font-color-main {
        color: @veui-font-color-main;
    }
    .font-color-aux {
        color: @veui-font-color-aux;
    }
    .font-color-guide {
        color: @veui-font-color-guide;
    }
    .font-color-disabled {
        color: @veui-font-color-disabled;
    }
    .border-color {
        border: 1px solid @veui-border-color;
    }
    .border-color-focus {
        border: 1px solid @veui-border-color-focus;
    }
    .border-color-error {
        border: 1px solid @veui-border-color-error;
    }
    .border-color-disabled {
        border: 1px solid @veui-border-color-disabled;
    }
    .disabled-fill-color {
        background: @veui-disabled-fill-color;
    }
    .tag-fill-color {
        background: @veui-tag-fill-color;
    }
    .line-height-normal {
        height: auto;
        line-height: @veui-line-height-normal;
        background: @veui-tag-fill-color;
    }
    .line-height-large {
        height: auto;
        line-height: @veui-line-height-large;
        background: @veui-tag-fill-color;
    }
    .height-xs {
        height: @veui-height-xs;
    }
    .height-s {
        height: @veui-height-s;
    }
    .height-m {
        height: @veui-height-m;
    }
    .height-l {
        height: @veui-height-l;
    }
    .height-xl {
        height: @veui-height-xl;
    }
    .shadow-focus {
        .veui-focus-ring();
    }
    .shadow-error-focus {
        .veui-focus-ring(@veui-border-color-error, @veui-shadow-error-focus);
    }
    .border-radius-s {
        border-radius: @veui-border-radius-s;
    }
    .border-radius-m {
        border-radius: @veui-border-radius-m;
    }
    .border-radius-l {
        border-radius: @veui-border-radius-l;
    }
}
</style>
