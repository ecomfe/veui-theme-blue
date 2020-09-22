<template>
    <section>
        <h1>基础变量</h1>
        <div class="var-module" v-for="(item, index) in settings" :key="`module_${index}`">
            <div
                class="var-module-con"
                v-for="(childItem, childIndex) in item"
                :key="`son_module_${childIndex}`"
                v-clipboard:copy="childItem.desc"
                v-clipboard:success="onCopy"
                v-clipboard:error="onError">
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
            label: '小号字体(12px)',
            desc: 'veui-font-size-s',
            class: 'font-size-small'
        },
        {
            label: '中号字体(14px)',
            desc: 'veui-font-size-m',
            class: 'font-size-normal'
        },
        {
            label: '大号字体(16px)',
            desc: 'veui-font-size-l',
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
            label: 'regular字体(400)',
            desc: 'veui-font-weight-1',
            class: 'font-weight-normal'
        },
        {
            label: 'medium字体(500)',
            desc: 'veui-font-weight-2',
            class: 'font-weight-bold'
        },
        {
            label: 'semibold字体(600)',
            desc: 'veui-font-weight-3',
            class: 'font-weight-extra-bold'
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
            desc: 'veui-line-height-m',
            class: 'line-height-normal'
        },
        {
            label: '2倍',
            desc: 'veui-line-height-l',
            class: 'line-height-large'
        }
    ],
    [
        {
            label: '字体颜色：',
            desc: '变量名：',
            class: 'var-module-con-title'
        },
        {
            label: '标题(#000)',
            desc: 'veui-font-color-strong',
            class: 'font-color-title'
        },
        {
            label: '正文(#333)',
            desc: 'veui-font-color-normal',
            class: 'font-color-main'
        },
        {
            label: '辅助文字(#666)',
            desc: 'veui-font-color-aux',
            class: 'font-color-aux'
        },
        {
            label: '引导文字(#999)',
            desc: 'veui-font-color-weak',
            class: 'font-color-guide'
        },
        {
            label: '禁用文字(#ccc)',
            desc: 'veui-font-color-disabled',
            class: 'font-color-disabled'
        },
        {
            label: '错误文字(#E64552)',
            desc: 'veui-font-color-error',
            class: 'font-color-error'
        },
        {
            label: '高亮文字(#4C84FF)',
            desc: 'veui-font-color-highlighted',
            class: 'font-color-highlighted'
        },
    ],
    [
        {
            label: '背景色：',
            desc: '变量名：',
            class: 'var-module-con-title'
        },
        {
            label: '默认背景(#fff)',
            desc: 'veui-background-color-normal',
            class: 'background-color'
        },
        {
            label: '悬浮状态(#f5f5f5)',
            desc: 'veui-background-color-normal-hover',
            class: 'background-color-hover'
        },
        {
            label: '聚焦状态(#f2f5ff)',
            desc: 'veui-background-color-normal-focus',
            class: 'background-color-focus'
        },
        {
            label: '点击状态(#eee)',
            desc: 'veui-background-color-normal-active',
            class: 'background-color-active'
        },
        {
            label: '禁用状态(#fafafa)',
            desc: 'veui-background-color-disabled',
            class: 'background-color-disabled'
        }
    ],
    [
        {
            label: '边框边线：',
            desc: '变量名：',
            class: 'var-module-con-title'
        },
        {
            label: '常规边框(#eee)',
            desc: 'veui-border-color-normal',
            class: 'border-color-normal'
        },
        {
            label: '常规边框悬浮(#e0e0e0)',
            desc: 'veui-border-color-normal-hover',
            class: 'border-color-normal-hover'
        },
        {
            label: '加强边框(#e0e0e0)',
            desc: 'veui-border-color-strong',
            class: 'border-color-strong'
        },
        {
            label: '加强边框悬浮(#999)',
            desc: 'veui-border-color-strong-hover',
            class: 'border-color-strong-hover'
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
            label: '分隔线：',
            desc: '变量名：',
            class: 'var-module-con-title'
        },
        {
            label: '常规分隔线(#eee)',
            desc: 'veui-separator-color-normal',
            class: 'border-color-normal'
        },
        {
            label: '加强分隔线(#e0e0e0)',
            desc: 'veui-separator-color-strong',
            class: 'border-color-strong'
        }
    ],
    [
        {
            label: '边框圆角：',
            desc: '变量名：',
            class: 'var-module-con-title'
        },
        {
            label: 'S小号圆角(2px)',
            desc: 'veui-border-radius-s',
            class: 'border-color-normal border-radius-s'
        },
        {
            label: 'M中号圆角(3px)',
            desc: 'veui-border-radius-m',
            class: 'border-color-normal border-radius-m'
        },
        {
            label: 'L大号圆角(4px)',
            desc: 'veui-border-radius-l',
            class: 'border-color-normal border-radius-l'
        }
    ],
    [
        {
            label: '高度：',
            desc: '变量名：',
            class: 'var-module-con-title'
        },
        {
            label: 'Xs超小号(24px)',
            desc: 'veui-height-xs',
            class: 'height-xs tag-fill-color'
        },
        {
            label: 'S小号(28px)',
            desc: 'veui-height-s',
            class: 'height-s tag-fill-color'
        },
        {
            label: 'M中号(32px)',
            desc: 'veui-height-m',
            class: 'height-m tag-fill-color'
        },
        {
            label: 'L大号(36px)',
            desc: 'veui-height-l',
            class: 'height-l tag-fill-color'
        },
        {
            label: 'Xl超大号(40px)',
            desc: 'veui-height-xl',
            class: 'height-xl tag-fill-color'
        }
    ],
    [
        {
            label: '间距：',
            desc: '变量名：',
            class: 'var-module-con-title'
        },
        {
            label: '间距最小单位(4px)',
            desc: 'veui-spacing-unit',
            class: 'spacing-unit'
        },
        {
            label: 'padding最小单位(4px)',
            desc: 'veui-padding-unit',
            class: 'spacing-unit'
        },
        {
            label: '高度最小单位(4px)',
            desc: 'veui-height-unit',
            class: 'spacing-unit'
        }
    ],
    [
        {
            label: '阴影：',
            desc: '变量名：',
            class: 'var-module-con-title'
        },
        {
            label: '普通状态阴影',
            desc: 'veui-shadow',
            class: 'border-color shadow'
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
            label: '单侧阴影：',
            desc: '变量名：',
            class: 'var-module-con-title'
        },
        {
            label: '下方阴影',
            desc: 'veui-shadow-anchored-top',
            class: 'border-color shadow-anchored-top'
        },
        {
            label: '上方阴影',
            desc: 'veui-shadow-anchored-bottom',
            class: 'border-color shadow-anchored-bottom'
        },
        {
            label: '右侧阴影',
            desc: 'veui-shadow-anchored-left',
            class: 'border-color shadow-anchored-left'
        },
        {
            label: '左侧阴影',
            desc: 'veui-shadow-anchored-right',
            class: 'border-color shadow-anchored-right'
        }
    ],
    [
        {
            label: '浮层阴影：',
            desc: '变量名：',
            class: 'var-module-con-title'
        },
        {
            label: '下方阴影',
            desc: 'veui-shadow-overflow-top',
            class: 'border-color shadow-overflow-top'
        },
        {
            label: '上方阴影',
            desc: 'veui-shadow-overflow-bottom',
            class: 'border-color shadow-overflow-bottom'
        },
        {
            label: '右侧阴影',
            desc: 'veui-shadow-overflow-left',
            class: 'border-color shadow-overflow-left'
        },
        {
            label: '左侧阴影',
            desc: 'veui-shadow-overflow-right',
            class: 'border-color shadow-overflow-right'
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
            label: 'Icon图标：',
            desc: '变量名：',
            class: 'var-module-con-title'
        },
        {
            label: '正常大小(1em)',
            desc: 'veui-icon-size-normal',
            class: 'icon-size-normal'
        },
        {
            label: '小2px(1em-2)',
            desc: 'veui-icon-size-minor',
            class: 'icon-size-minor'
        },
        {
            label: '小4px(1em-4)',
            desc: 'veui-icon-size-aux',
            class: 'icon-size-aux'
        },
        {
            label: '图标颜色(#999)',
            desc: 'veui-icon-color-aux',
            class: 'icon-color-aux'
        },
        {
            label: '图标禁用颜色(#ccc)',
            desc: 'veui-icon-color-aux-disabled',
            class: 'icon-color-aux-disabled'
        }
    ]
];
export default {
    name: 'Variables',
    data() {
        return {
            settings: Object.freeze(Settings)
        };
    },
    methods: {
        onCopy: function (e) {
            this.$toast.success(`已拷贝“${e.trigger.children[0].innerText}”到剪切板：${e.text}`);
        },
        onError: function (e) {
            this.$toast.error('拷贝失败！');
        }
    }
};
</script>
