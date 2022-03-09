<template>
    <article>
        <h1><code>&lt;veui-pagination&gt;</code></h1>
        <h2>尺寸</h2>
        <div class="options-desc">可选的尺寸
            <span class="bg-gray-show">ui</span>
            属性值：
            <span class="bg-gray-show">xs / s / m</span>
            ，其中 s 为默认值
        </div>

        <section>
            <h3>基础分页</h3>
            <veui-form>
                <veui-field label="超小号 [ui=xs]">
                    <veui-pagination
                        ui="xs"
                        :page="page"
                        :total="total"
                        :page-sizes="pageSizes"
                        :to="to"
                        :page-size.sync="pageSize"
                    />
                </veui-field>
                <veui-field label="小号 [ui=s]">
                    <veui-pagination
                        :page="page"
                        :total="total"
                        :to="to"
                    />
                </veui-field>
                <veui-field label="中号 [ui=m]">
                    <veui-pagination
                        ui="m"
                        :page="page"
                        :total="total"
                        :to="to"
                    />
                </veui-field>
                <veui-field label="总页数 <= 7 [ui=s]">
                    <veui-pagination
                        ui="s"
                        :page="smallPage"
                        :total="70"
                        :pageSize="10"
                        :to="to"
                    />
                </veui-field>
            </veui-form>
        </section>

        <section>
            <h3>自定义分页</h3>
            <veui-form>
                <veui-field label="小号 [ui=s]">
                    <veui-pagination
                        :page="page"
                        :total="total"
                        :page-sizes="customPageSizes"
                        :to="to"
                        ui="s"
                        :page-size.sync="customPageSize"
                        :show-page-size="true"
                    />
                </veui-field>
            </veui-form>
        </section>

        <section>
            <h3>含跳转分页</h3>
            <veui-form>
                <veui-field label="超小号 [ui=xs]">
                    <veui-pagination
                        :page="page"
                        :total="total"
                        :page-sizes="pageSizes"
                        :to="to"
                        :show-goto="true"
                        ui="xs"
                        :page-size.sync="pageSize"
                        :show-page-size="true"
                        :show-total="true"
                    />
                </veui-field>
                <veui-field label="小号 [ui=s]">
                    <veui-pagination
                        :page="page"
                        :total="total"
                        :to="to"
                        :show-goto="true"
                        :show-page-size="true"
                        :show-total="true"
                    />
                </veui-field>
                <veui-field label="中号 [ui=m]">
                    <veui-pagination
                        ui="m"
                        :page="page"
                        :total="total"
                        :to="to"
                        :show-goto="true"
                        :show-page-size="true"
                        :show-total="true"
                    />
                </veui-field>
            </veui-form>
        </section>

        <section>
            <h3>简单分页</h3>
            <small>翻页数小于6个时，使用简单分页</small>
            <veui-form>
                <veui-field label="小号 [ui=s]" class="veui-pagination-simple" ui="s">
                    <veui-button>上一页</veui-button>
                    <veui-button class="next-page">下一页</veui-button>
                </veui-field>
                <veui-field label="中号 [ui=m]" class="veui-pagination-simple" ui="m">
                    <veui-button ui="m">上一页</veui-button>
                    <veui-button ui="m" class="next-page">下一页</veui-button>
                </veui-field>
            </veui-form>
        </section>

        <section>
            <h3>仅显示数字的简单分页</h3>
            <veui-form>
                <veui-field label="小号 [ui=s]">
                    <veui-pagination
                        :page="page"
                        :total="total"
                        :to="to"
                    />
                </veui-field>
                <veui-field label="中号 [ui=m]">
                    <veui-pagination
                        ui="m"
                        :page="page"
                        :total="total"
                        :to="to"
                    />
                </veui-field>
            </veui-form>
        </section>

        <section>
            <h3>目标位置模板</h3>
            <small>格式和 &lt;router-link&gt; 的 to prop 一样</small>
            <section>
                <veui-pagination
                    :page="page"
                    :show-goto="true"
                    :total="total"
                    :to="{ name: 'Pagination', params: { page: ':page' } }"
                />
            </section>
        </section>

        <section>
            <h3>原生跳转</h3>
            <section>
                <veui-pagination
                    :page="page"
                    :total="total"
                    :to="to"
                    :show-goto="true"
                    native
                />
            </section>
        </section>

        <section>
            <h3>阻止跳转</h3>
            <small>仅原生跳转可阻止已配置 <code>to</code> 的跳转</small>
            <section>
                <veui-pagination
                    :page="page"
                    :total="total"
                    :to="to"
                    native
                    :show-goto="true"
                    @redirect="handlePageRedirect"
                />
            </section>
            <div class="message">
                {{ fifthPaginationMessage }}
            </div>
        </section>

        <section>
            <h3>自定义事件处理</h3>
            <section>
                <veui-pagination
                    :page="p"
                    :total="total"
                    @redirect="handleCustomRedirect"
                />
            </section>
        </section>

        <section>
            <h3>没有数据时</h3>
            <section>
                <veui-pagination
                    :page="1"
                    :total="0"
                    :to="to"
                    native
                />
            </section>
        </section>
    </article>
</template>

<script>
import bus from '../bus';
import {Pagination, Form, Field, Button} from 'veui';

export default {
    name: 'pagination-demo',
    components: {
        'veui-pagination': Pagination,
        'veui-form': Form,
        'veui-field': Field,
        'veui-button': Button
    },
    data() {
        return {
            page: parseInt(this.$route.params.page, 10) || 1,
            total: 500,
            to: '/pagination/:page',
            pageSize: 30,
            pageSizes: [30, 60, 100, 200],
            fifthPaginationMessage: '',
            p: 1,
            smallPage: 1,
            customPageSizes: [20, 50, 100],
            customPageSize: 20
        };
    },
    mounted() {
        this.$children.forEach(child => {
            child.$on('click', () => {
                bus.$emit('log', child.$el.getAttribute('ui'));
            });
        });
    },
    methods: {
        handlePageRedirect(page, event) {
            event.preventDefault();
            this.fifthPaginationMessage = `已阻止你跳转到第${page}页`;
        },
        handleCustomRedirect(page) {
            this.p = page;
        }
    },
    beforeRouteUpdate({params}, from, next) {
        let page = parseInt(params.page, 10);
        this.page = isNaN(page) ? 1 : page;
        next();
    }
};
</script>

<style lang="less" scoped>
@import (reference) url('~@/variables/index.less');
section {
    margin-bottom: 32px;
    small {
        display: block;
        margin-bottom: 16px;
    }
    section {
        display: flex;
        margin-bottom: 0;
    }
    .veui-pagination {
        flex: 1;
        justify-content: flex-end;
    }
    .message {
        margin-top: 16px;
        font-size: 12px;
        color: #666;
        text-align: right;
    }
}
</style>
