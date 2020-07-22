<template>
    <article>
        <h1><code>&lt;veui-loading&gt;</code></h1>
        <div class="veui-loading-demo">
            <h2>不同尺寸</h2>
            <div class="options-desc">可选的尺寸 <span class="bg-gray-show">ui</span> 属性值： <span class="bg-gray-show">s / m / l（默认 m）</span></div>
            <section>
                <div class="size-box">
                    <veui-loading
                        loading
                        ui="s"
                    />
                    <veui-loading
                        loading
                        ui="m"
                    />
                    <veui-loading
                        loading
                        ui="l"
                    />
                </div>
            </section>
            <h2>基础加载</h2>
            <div class="options-desc">可选的加载 <span class="bg-gray-show">ui</span> 属性值： <span class="bg-gray-show">normal / strong / reverse（默认 normal）</span></div>
            <section class="wrap">
                <div>
                    普通加载
                    <p>
                        <veui-loading
                            loading
                            ui="normal"
                        />
                    </p>
                </div>
                <div>
                    加强加载
                    <p>
                        <veui-loading
                            loading
                            ui="strong"
                        />
                    </p>
                </div>
                <div>
                    反白加载
                    <p>
                        <veui-loading
                            loading
                            ui="reverse"
                            class="reverse"
                        />
                    </p>
                </div>
            </section>
            <h2>含辅助文案加载</h2>
            <div class="options-desc">可选的方向 <span class="bg-gray-show">ui</span> 属性值： <span class="bg-gray-show">vertical</span></div>
            <section class="wrap">
                <div>
                    <veui-loading
                        loading
                    >
                        正在加载中...
                    </veui-loading>
                </div>
                <div>
                    文字垂直显示
                    <p style="padding: 10px;">
                        <veui-loading
                            loading
                            ui="vertical"
                        >
                            正在加载中...
                        </veui-loading>
                    </p>
                </div>
            </section>
            <h2>自定义加载图标</h2>
            <section class="wrap">
                <div>
                    自定义图标-星星
                    <p>
                        <veui-loading
                            loading
                            ui="strong"
                        >
                            <template slot="spinner">
                                <veui-icon
                                    spin
                                    name="star"
                                />
                            </template>
                            拼命加载中...
                        </veui-loading>
                    </p>
                </div>
                <div>
                    自定义图标-太阳
                    <p>
                        <veui-loading loading>
                            <template slot="spinner">
                                <veui-icon
                                    spin
                                    name="sun"
                                />
                            </template>
                            拼命加载中...
                        </veui-loading>
                    </p>
                </div>
                <div>
                    自定义图标-雨伞
                    <p>
                        <veui-loading
                            loading
                            ui="reverse"
                            class="reverse"
                        >
                            <template slot="spinner">
                                <veui-icon
                                    spin
                                    name="umbrella"
                                />
                            </template>
                            拼命加载中...
                        </veui-loading>
                    </p>
                </div>
            </section>
            <h2>简单示例</h2>
            <section>
                <p>
                    MVP选票数：
                    <veui-loading :loading="loading">实时MVP选票数加载中...</veui-loading>
                    <template v-if="!loading">
                        <veui-span>{{ voteAccount }}</veui-span>
                        <veui-button
                            ui="primary"
                            @click="handleClick"
                        >获取实时投票数</veui-button>
                    </template>
                </p>
            </section>
            <section>
                <h3>遮罩层展现</h3>
                <section class="cards">
                    <div class="card">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
                        similique nam, iure maiores consequatur quia suscipit temporibus
                        corporis ipsa molestias magnam repudiandae. Nam nihil eveniet eius
                        dolores ducimus cumque facere.
                        <veui-loading
                            loading
                            ui="strong l overlay"
                        />
                    </div>
                    <div class="card">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
                        similique nam, iure maiores consequatur quia suscipit temporibus
                        corporis ipsa molestias magnam repudiandae. Nam nihil eveniet eius
                        dolores ducimus cumque facere.
                        <veui-loading
                            loading
                            ui="reverse l overlay"
                        />
                    </div>
                </section>
            </section>
        </div>
    </article>
</template>
<script>
import 'vue-awesome/icons/star';
import 'vue-awesome/icons/sun';
import 'vue-awesome/icons/umbrella';

import {Loading, Button, Icon, Span} from 'veui';
export default {
    name: 'loading',
    components: {
        'veui-loading': Loading,
        'veui-button': Button,
        'veui-icon': Icon,
        'veui-span': Span
    },
    data() {
        return {
            loading: false,
            voteAccount: 120
        };
    },
    methods: {
        handleClick() {
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
                this.voteAccount += 100;
            }, 1000);
        }
    }
};
</script>
<style lang="less">
.veui-loading-demo {
    .reverse {
        background: rgba(0, 0, 0, .6);
        padding: 8px;
    }
    p {
        display: flex;
        line-height: 32px;
    }
    .veui-span {
        margin-right: 15px;
    }
    .cards {
    display: flex;
  }
  .card {
    position: relative;
    width: 320px;
    height: 180px;
    margin-right: 20px;
    padding: 1em 1.5em;
    line-height: 1.6;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
    .size-box .veui-loading {
        margin-right: 100px;
    }
    .wrap {
        display: flex;
        > div {
            margin-right: 40px;
            text-align: center;
            p {
                justify-content: center;
            }
            .veui-loading {
                padding: 8px;
            }
        }
    }
}
</style>
