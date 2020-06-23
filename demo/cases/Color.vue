<template>
    <section>
        <h1>默认色板</h1>
        <div v-for="(item, index) in colors" :key="`item_${index}`" class="color-module">
            <div class="color-module-title">
                <p>{{item.label}}</p>
                <p class="title-type">{{item.type}}</p>    
            </div>
            <div class="color-module-con">
                <div
                    v-for="(childItem, childIndex) in item.data"
                    :key="`color_${childIndex}`"
                    :class="{'no-color-item': !item.label, 'color-item': item.label}"
                    :style="{background: childItem}"
                >
                    {{childItem}}
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
        data: ['#F2F5FF', '#DBE4FF', '#B8CBFF', '#94B2FF', '#709BFF', '#4C84FF', '#366CD9', '#2456B3', '#15418C', '#0A2D66']
    },
    {
        label: '通知色',
        type: 'info',
        data: ['#F2F5FF', '#DBE4FF', '#B8CBFF', '#94B2FF', '#709BFF', '#4C84FF', '#366CD9', '#2456B3', '#15418C', '#0A2D66']
    },
    {
        label: '通过色',
        type: 'success',
        data: ['#F2FFF4', '#D0F2D5', '#A5E6AE', '#7ED988', '#5ACC65', '#39BF45', '#26992E', '#17731C', '#0B4D0E', '#042604']
    },
    {
        label: '警示色',
        type: 'warning',
        data: ['#FFF7F2', '#FFE8DB', '#FFD1B8', '#FFB894', '#FF9D70', '#F27C49', '#CC5E33', '#A64721', '#802E13', '#591C09']
    },
    {
        label: '错误色',
        type: 'error',
        data: ['#FFF2F2', '#FFDBDC', '#FFB8BA', '#FF9499', '#F26B74', '#E64552', '#BF303E', '#991F2D', '#73111E', '#4D0812']
    },
    {
        label: '中性色',
        type: 'gray',
        data: ['#FFFFFF', '#FAFAFA', '#F5F5F5', '#EEEEEE', '#E0E0E0', '#CCCCCC', '#999999', '#666666', '#333333', '#000000']
    }
];
export default {
    name: 'Color',
    data() {
        return {
            colors: Object.freeze(COLORS_DATA)
        };
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
        font-size: @veui-font-size-large;
        font-weight: @veui-font-weight-bold;
        width: 104px;
        margin-right: 20px;
        text-align: right;
        .title-type {
            color: @veui-gray-color-8;
            font-size: @veui-font-size-normal;
        }
    }
    &-con {
        display: flex;
        .no-color-item {
            width: 80px;
            text-align: center;
            color: @veui-gray-color-9;
        }
        .color-item {
            display: flex;
            justify-content: center;
            text-align: center;
            flex-direction: column;
            box-sizing: border-box;
            width: 80px;
            height: 80px;
            font-size: @veui-font-size-small;
            cursor: pointer;
            &:nth-child(-n + 5) {
                color: @veui-gray-color-9;
            }
            &:nth-child(n + 6) {
                color: @veui-gray-color-1;
            }
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
