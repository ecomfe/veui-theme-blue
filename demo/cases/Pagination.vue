<template>
    <article>
        <h1><code>&lt;veui-pagination&gt;</code></h1>
        <h2>尺寸</h2>
        <div class="options-desc">可选的尺寸
            <span class="bg-gray-show">ui</span>
            属性值：
            <span class="bg-gray-show">xs / s（默认，可不传） / m</span>
        </div>
        <h2>风格</h2>
        <div class="options-desc">可选的风格
            <span class="bg-gray-show">ui</span>
            属性值：
            <span class="bg-gray-show">normal / 不传则默认含跳转分页</span>
        </div>
        <section>
            <h3>基础分页[ui=normal]</h3>
            <section>
                <span class="pagination-type">超小号[ui=xs]</span>
                <veui-pagination
                    :page="page"
                    :total="total"
                    :page-sizes="pageSizes"
                    :to="to"
                    ui="xs normal"
                    :page-size.sync="pageSize"
                />
            </section>

            <section>
                <span class="pagination-type">小号[ui=s]</span>
                <veui-pagination
                    :page="page"
                    :total="total"
                    :to="to"
                    ui="normal"
                />
            </section>

            <section>
                <span class="pagination-type">中号[ui=m]</span>
                <veui-pagination
                    :page="page"
                    :total="total"
                    ui="m normal"
                    :to="to"
                />
            </section>
        </section>

        <section>
            <h3>含跳转分页</h3>
            <section>
                <span class="pagination-type">超小号[ui=xs]</span>
                <veui-pagination
                    :page="page"
                    :total="total"
                    :page-sizes="pageSizes"
                    :to="to"
                    goto
                    ui="xs"
                    :page-size.sync="pageSize"
                />
            </section>

            <section>
                <span class="pagination-type">小号[ui=s]</span>
                <veui-pagination
                    :page="page"
                    :total="total"
                    :to="to"
                    goto
                />
            </section>

            <section>
                <span class="pagination-type">中号[ui=m]</span>
                <veui-pagination
                    ui="m"
                    :page="page"
                    :total="total"
                    :to="to"
                    goto
                />
            </section>
        </section>

        <section>
            <h3>目标位置模板</h3>
            <section>
                <small>格式和 &lt;router-link&gt; 的 to prop 一样</small>
            </section>
            <section>
                <veui-pagination
                    :page="page"
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
                    native
                />
            </section>
        </section>

        <section>
            <h3>阻止跳转</h3>
            <section>
                <small>仅原生跳转可阻止已配置 <code>to</code> 的跳转</small>
            </section>
            <section>
                <veui-pagination
                    :page="page"
                    :total="total"
                    :to="to"
                    native
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
import {Pagination} from 'veui';

export default {
    name: 'pagination-demo',
    components: {
        'veui-pagination': Pagination
    },
    data() {
        return {
            page: parseInt(this.$route.params.page, 10) || 1,
            total: 10101,
            to: '/pagination/:page',
            pageSize: 30,
            pageSizes: [30, 60, 100, 200],
            fifthPaginationMessage: '',
            p: 1
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
    margin-bottom: 3em;

    section {
        margin-bottom: 2em;
        display: flex;
        .veui-pagination {
            flex: 1;
        }
        .pagination-type {
            color: @veui-font-color-weak;
            font-size: @veui-font-size-s;
            margin-right: 23px;
        }
    }
}
</style>
