<template>
    <article>
        <h1><code>&lt;veui-icon&gt;</code></h1>
        <div class="options-desc">
            以下icon均可通过<span class="bg-gray-show">veui-icon name="xxx"</span>来使用
        </div>
        <div class="icons" v-for="(item, index) in catalog" :key="index">
            <div class="icons-label">{{index}}</div>
            <div class="icons-main">
                <div
                    v-for="icon in item"
                    :key="icon"
                    class="icon"
                    :class="{
                        'icon-big': index === 'common' || index === 'common-lg'
                    }"
                    v-clipboard:copy="icon"
                    v-clipboard:success="onCopy"
                >
                    <div
                        :class="{
                            'svg': index !== 'common' && index !== 'common-lg',
                            'svg-common-lg': index === 'common-lg',
                            'svg-common': index === 'common', 
                        }">
                        <veui-icon :name="icon"/>
                    </div>
                    <div class="name">
                        {{ icon }}
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="icons" v-for="(item, index) in illustration" :key="index">
            <div class="icons-label">{{index}}</div>
            <div class="icons-main">
                <div
                    v-for="icon in item"
                    :key="icon"
                    class="icon"
                    v-clipboard:copy="icon"
                    v-clipboard:success="onCopy"
                >
                    <div class="svg-big">
                        <veui-icon :name="icon"/>
                    </div>
                    <div class="name">
                        {{ icon }}
                    </div>
                </div>
            </div>
        </div> -->
    </article>
</template>

<script>
import bus from '../bus';
import {Icon} from 'veui';
import 'veui-theme-blue-icons';
import icons from 'veui-theme-blue-icons/icon-names.json';
const Catalog = {};

icons.forEach(item => {
    if (item.split('.').length > 1) {
        if (Catalog[item.split('.')[0]]) {
            Catalog[item.split('.')[0]].push(item.split('.')[1]);
        } else {
            Catalog[item.split('.')[0]] = [item.split('.')[1]];
        }
    } else {
        console.warn('icon failed:' + item);
    }
});
export default {
    name: 'icon-demo',
    components: {
        'veui-icon': Icon
    },
    data() {
        return {
            catalog: Catalog
        };
    },
    computed: {
        main() {
            let obj = {};
            for (let [key, item] of Object.entries(Catalog)) {
                if (key !== 'common' && key !== 'common-lg') {
                    obj[key] = item;
                }
            }
            return obj;
        },
        illustration() {
            let obj = {};
            for (let [key, item] of Object.entries(Catalog)) {
                if (key === 'common' || key == 'common-lg') {
                    obj[key] = item;
                }
            }
            return obj;
        }
    },
    methods: {
        onCopy: function (e) {
            this.$toast.success(`已拷贝到剪切板：${e.text}`);
        }
    }
};
</script>

<style lang="less" scoped>
@import '~veui-theme-blue/common.less';
.icons {
    &-label {
        font-size: @veui-font-size-m;
        font-weight: @veui-font-weight-2;
        display: flex;
        align-items: center;
        &::before {
            content: '';
            display: inline-block;
            width: 3px;
            height: 16px;
            background: @veui-color-brand-6;
            margin-right: 8px;
        }
    }
    &-main {
        display: flex;
        flex-wrap: wrap;
    }
    margin-bottom: 20px;
    .icon {
        @grid-size: 100px;
        @grid-size-height: 50px;

        width: @grid-size;
        text-align: center;
        margin-right: 12px;
        margin-bottom: 16px;
        border: 1px solid #fff;
        border-radius: @veui-border-radius-s;

        &.icon-big {
            width: 140px;
        }

        .svg {
            width: @grid-size;
            height: @grid-size-height;
            border: 1px solid transparent;
            font-size: @veui-font-size-l;
            line-height: @grid-size-height;
            color: @veui-font-color-weak;
            &-common {
                height: 70px;
                line-height: 70px;
                font-size: 48px;
            }
            &-common-lg {
                width: 140px;
                height: 140px;
                line-height: 140px;
                font-size: 108px;
            }
        }

        .name {
            color: #333;
            font-size: 12px;
        }

        &:hover {
            .veui-focus-ring();
            .veui-transition(border-color);
        }
    }
}
</style>
