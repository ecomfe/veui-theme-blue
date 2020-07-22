<template>
    <section>
        <h1>UI属性命名</h1>
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
            label: '尺寸：',
            desc: 'size',
            class: 'var-module-con-title'
        },
        {
            label: '超小号',
            desc: 'xs',
            class: 'font-size-normal'
        },
        {
            label: '小号',
            desc: 's',
            class: 'font-size-normal'
        },
        {
            label: '中号',
            desc: 'm',
            class: 'font-size-normal'
        },
        {
            label: '大号',
            desc: 'l',
            class: 'font-size-normal'
        },
        {
            label: '超大号',
            desc: 'xl',
            class: 'font-size-normal'
        },
        {
            label: '超级大号',
            desc: 'xxl',
            class: 'font-size-normal'
        }
    ],
    [
        {
            label: '风格：',
            desc: 'style',
            class: 'var-module-con-title'
        },
        {
            label: '普通样式',
            desc: 'normal',
            class: 'font-size-normal'
        },
        {
            label: '重要样式',
            desc: 'primary',
            class: 'font-size-normal'
        },
        {
            label: '图标',
            desc: 'icon',
            class: 'font-size-normal'
        },
        {
            label: '文本',
            desc: 'text',
            class: 'font-size-normal'
        },
        {
            label: '带边框样式',
            desc: 'bordered',
            class: 'font-size-normal'
        },
        {
            label: '不带边框样式',
            desc: 'borderless',
            class: 'font-size-normal'
        }
    ],
    [
        {
            label: '形状：',
            desc: 'shape',
            class: 'var-module-con-title'
        },
        {
            label: '正方形',
            desc: 'square',
            class: 'font-size-normal'
        },
        {
            label: '长方形',
            desc: 'rect',
            class: 'font-size-normal'
        },
        {
            label: '圆形',
            desc: 'circle',
            class: 'font-size-normal'
        },
        {
            label: '椭圆',
            desc: 'ellipse',
            class: 'font-size-normal'
        }
    ],
    [
        {
            label: '方向：',
            desc: 'direction',
            class: 'var-module-con-title'
        },
        {
            label: '竖向排列',
            desc: 'vertical',
            class: 'font-size-normal'
        },
        {
            label: '横向排列',
            desc: 'horizon',
            class: 'font-size-normal'
        }
    ],
    [
        {
            label: '加强：',
            desc: 'strong',
            class: 'var-module-con-title'
        },
        {
            label: '加强样式',
            desc: 'strong',
            class: 'font-size-normal'
        },
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
<style lang="less" scoped>
.var-module-con {
    &:first-child,
    &:not(:first-child) {
        min-width: 90px;
    }
}
</style>
