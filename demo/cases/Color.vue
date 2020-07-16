<template>
    <section>
        <h1>默认色板</h1>
        <div v-for="(item, index) in colors" :key="`item_${index}`" class="color-module">
            <div class="color-module-title">
                <p>{{item.label}}</p>
                <p class="title-type">{{item.type}}</p>    
            </div>
            <div class="color-module-con">
                <div class="color-container" v-for="(childItem, childIndex) in item.data" :key="`color_${childIndex}`">
                    <div
                        :class="{'no-color-item': !item.label, 'color-item': item.label}"
                        :style="{background: childItem.color}"
                        v-clipboard:copy="`veui-color-${childItem.desc}`"
                        v-clipboard:success="onCopy"
                        v-clipboard:error="onError"
                    >
                        <p>{{childItem.color}}</p>
                    </div>
                    <div class="desc-container">
                        {{childItem.desc}}
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
const COLORS_DATA = [
    {
        label: '',
        type: '',
        data: ['1', '2', '3', '4', '5', '6(主色)', '7', '8', '9', '10']
    },
    {
        label: '品牌色',
        type: 'brand',
        data: [
            {
                color: '#F2F5FF',
                desc: 'brand-1'
            },
            {
                color: '#DBE4FF',
                desc: 'brand-2'
            },
            {
                color: '#B8CBFF',
                desc: 'brand-3'
            },
            {
                color: '#94B2FF',
                desc: 'brand-4'
            },
            {
                color: '#709BFF',
                desc: 'brand-5'
            },
            {
                color: '#4C84FF',
                desc: 'brand-6'
            },
            {
                color: '#366CD9',
                desc: 'brand-7'
            },
            {
                color: '#2456B3',
                desc: 'brand-8'
            },
            {
                color: '#15418C',
                desc: 'brand-9'
            },
            {
                color: '#0A2D66',
                desc: 'brand-10'
            }
        ]
    },
    {
        label: '通知色',
        type: 'info',
        data: [
            {
                color: '#F2F5FF',
                desc: 'info-1'
            },
            {
                color: '#DBE4FF',
                desc: 'info-2'
            },
            {
                color: '#B8CBFF',
                desc: 'info-3'
            },
            {
                color: '#94B2FF',
                desc: 'info-4'
            },
            {
                color: '#709BFF',
                desc: 'info-5'
            },
            {
                color: '#4C84FF',
                desc: 'info-6'
            },
            {
                color: '#366CD9',
                desc: 'info-7'
            },
            {
                color: '#2456B3',
                desc: 'info-8'
            },
            {
                color: '#15418C',
                desc: 'info-9'
            },
            {
                color: '#0A2D66',
                desc: 'info-10'
            }
        ]
    },
    {
        label: '通过色',
        type: 'success',
        data: [
            {
                color: '#F2FFF4',
                desc: 'success-1'
            },
            {
                color: '#D0F2D5',
                desc: 'success-2'
            },
            {
                color: '#A5E6AE',
                desc: 'success-3'
            },
            {
                color: '#7ED988',
                desc: 'success-4'
            },
            {
                color: '#5ACC65',
                desc: 'success-5'
            },
            {
                color: '#39BF45',
                desc: 'success-6'
            },
            {
                color: '#26992E',
                desc: 'success-7'
            },
            {
                color: '#17731C',
                desc: 'success-8'
            },
            {
                color: '#0B4D0E',
                desc: 'success-9'
            },
            {
                color: '#042604',
                desc: 'success-10'
            }
        ]
    },
    {
        label: '警示色',
        type: 'warning',
        data: [
            {
                color: '#FFF7F2',
                desc: 'warning-1'
            },
            {
                color: '#FFE8DB',
                desc: 'warning-2'
            },
            {
                color: '#FFD1B8',
                desc: 'warning-3'
            },
            {
                color: '#FFB894',
                desc: 'warning-4'
            },
            {
                color: '#FF9D70',
                desc: 'warning-5'
            },
            {
                color: '#F27C49',
                desc: 'warning-6'
            },
            {
                color: '#CC5E33',
                desc: 'warning-7'
            },
            {
                color: '#A64721',
                desc: 'warning-8'
            },
            {
                color: '#802E13',
                desc: 'warning-9'
            },
            {
                color: '#591C09',
                desc: 'warning-10'
            }
        ]
    },
    {
        label: '错误色',
        type: 'error',
        data: [
            {
                color: '#FFF2F2',
                desc: 'error-1'
            },
            {
                color: '#FFDBDC',
                desc: 'error-2'
            },
            {
                color: '#FFB8BA',
                desc: 'error-3'
            },
            {
                color: '#FF9499',
                desc: 'error-4'
            },
            {
                color: '#F26B74',
                desc: 'error-5'
            },
            {
                color: '#E64552',
                desc: 'error-6'
            },
            {
                color: '#BF303E',
                desc: 'error-7'
            },
            {
                color: '#991F2D',
                desc: 'error-8'
            },
            {
                color: '#73111E',
                desc: 'error-9'
            },
            {
                color: '#4D0812',
                desc: 'error-10'
            }
        ]
    },
    {
        label: '中性色',
        type: 'gray',
        data: [
            {
                color: '#FFFFFF',
                desc: 'gray-1'
            },
            {
                color: '#FAFAFA',
                desc: 'gray-2'
            },
            {
                color: '#F5F5F5',
                desc: 'gray-3'
            },
            {
                color: '#EEEEEE',
                desc: 'gray-4'
            },
            {
                color: '#E0E0E0',
                desc: 'gray-5'
            },
            {
                color: '#CCCCCC',
                desc: 'gray-6'
            },
            {
                color: '#999999',
                desc: 'gray-7'
            },
            {
                color: '#666666',
                desc: 'gray-8'
            },
            {
                color: '#333333',
                desc: 'gray-9'
            },
            {
                color: '#000000',
                desc: 'gray-10'
            }
        ]
    }
];
export default {
    name: 'Color',
    data() {
        return {
            colors: Object.freeze(COLORS_DATA)
        };
    },
    methods: {
        onCopy: function (e) {
            console.log(e, 'dddd');
            let title = e.trigger.parentNode.parentNode.children[0].innerText;
            this.$toast.success(`已拷贝“${e.trigger.textContent}”到剪切板：${e.text}`);
        },
        onError: function (e) {
            this.$toast.error('拷贝失败！');
        }
    }
};
</script>
<style lang="less" scoped>
@import (reference) url('~@/variables/index.less');
.color-module {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 16px;
    &-title {
        flex-shrink: 0;
        font-size: @veui-font-size-l;
        font-weight: @veui-font-weight-2;
        width: 104px;
        margin-right: 20px;
        text-align: right;
        .title-type {
            color: @veui-color-gray-8;
            font-size: @veui-font-size-m;
        }
    }
    &-con {
        display: flex;
        .no-color-item {
            width: 80px;
            text-align: center;
            color: @veui-color-gray-9;
        }
        .desc-container {
            display: flex;
            font-size: @veui-font-size-s;
        }
        .color-container {
            &:nth-child(-n + 5) {
                .color-item {
                    color: @veui-color-gray-9;
                }
            }
            &:nth-child(n + 6) {
                .color-item {
                    color: @veui-color-gray-1;
                }
            }
        }
        .color-item {
            display: flex;
            justify-content: center;
            text-align: center;
            flex-direction: column;
            box-sizing: border-box;
            width: 80px;
            height: 80px;
            font-size: @veui-font-size-s;
            cursor: pointer;
            &:hover {
                transition: all .3s ease;
                transform: scale(1.1);
                box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.15);
                border-radius: 3px;
            }
        }
    }
}
</style>
