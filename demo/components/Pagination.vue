<template>
  <article>
    <h1><code>&lt;veui-pagination&gt;</code></h1>
    <section>
      <p>
        <span class="veui-font-level-1b">基础样式：</span>
        <span class="veui-font-level-2d">不传ui</span>
      </p>
      <p><veui-pagination :page="page" :total="total" :to="to"></veui-pagination></p>
      <p>
        <span class="veui-font-level-1b">翻页按钮放在最后的分页：</span>
        <span class="veui-font-level-2d">ui="hetero"</span>
      </p>
      <p><veui-pagination :page="page" :total="total" :to="to" ui="hetero"></veui-pagination></p>
      <p>
        <span class="veui-font-level-1b">展示总条数、每页条数的分页：</span>
        <span class="veui-font-level-2d">ui="full"</span>
      </p>
      <p><veui-pagination :page="page" :total="total" :page-sizes="pageSizes" :to="to" :page-size.sync="pageSize" ui="full"></veui-pagination></p>
      <p style="margin-top: -4em"><veui-pagination :page="page" :total="total" :page-sizes="pageSizes" :to="to" :page-size.sync="pageSize" ui="full"></veui-pagination></p>
      <p style="margin-top: -4em"><veui-pagination :page="page" :total="total" :page-sizes="pageSizes" :to="to" :page-size="30" ui="full"></veui-pagination></p>
      <p>
        <span class="veui-font-level-1b">正方形样式的分页：</span>
        <span class="veui-font-level-2d">ui="square"</span>
      </p>
      <p><veui-pagination :page="page" :total="total" :to="to" ui="square"></veui-pagination></p>
      <p>
        <span class="veui-font-level-1b">小型简洁版样式的分页：</span>
        <span class="veui-font-level-2d">ui="simple"</span>
      </p>
      <p><veui-pagination :page="page" :total="total" :to="to" ui="simple"></veui-pagination></p>
      <p>
        <span class="veui-font-level-1b">大正方形并且分页按钮之间有竖线分隔样式的分页：</span>
        <span class="veui-font-level-2d">ui="big_square"</span>
      </p>
      <p><veui-pagination :page="page" :total="total" :to="to" ui="big_square"></veui-pagination></p>
    </section>

    <section>
      <h2>目标位置模板</h2>
      <p><small>格式和 &lt;router-link&gt; 的 to prop 一样</small></p>
      <p><veui-pagination :page="page" :total="total" ui="advanced"
        :to="{name: 'Pager', params: { page: ':page'}}"></veui-pagination></p>
    </section>

    <section>
      <h2>原生跳转</h2>
      <p><veui-pagination :page="page" :total="total" :to="'#' + to" ui="advanced" :native="true"></veui-pagination></p>
    </section>

    <section>
      <h2>事件与阻止跳转</h2>
      <p><small>仅原生跳转可用</small></p>
      <p><veui-pagination :page="page" :total="total" :to="to" ui="advanced" :native="true"
        @redirect="handlePageRedirect"></veui-pagination></p>
      <div class="message">{{ fifthPagerMessage }}</div>
    </section>

    <section>
      <h2>没有数据时</h2>
      <p><veui-pagination :page="1" :total="0" :to="'#' + to" ui="full" :native="true"></veui-pagination></p>
    </section>

    <section>
      <h2>用法如下：</h2>
      <p v-text="sample" class="sample"></p>
    </section>

    <section class="attrTab">
      <h2>Attributes</h2>
      <veui-table :data="attrData">
        <veui-table-column field="parameter" title="参数" width="10%"></veui-table-column>
        <veui-table-column field="desc" title="说明" width="40%"></veui-table-column>
        <veui-table-column field="type" title="类型" width="10%"></veui-table-column>
        <veui-table-column field="canSelectVal" title="可选值" width="30%"></veui-table-column>
        <veui-table-column field="defaultVal" title="默认值" width="10%"></veui-table-column>
      </veui-table>
    </section>
  </article>
</template>

<script>
import bus from '../bus'
import { Pagination, Table, Column } from 'veui'

export default {
  name: 'pagination-demo',
  components: {
    'veui-pagination': Pagination,
    'veui-table': Table,
    'veui-table-column': Column
  },
  data () {
    return {
      page: parseInt(this.$route.params.page, 10) || 1,
      total: 10101,
      to: '/pagination/:page',
      pageSize: 30,
      pageSizes: [30, 60, 100, 200],
      fifthPagerMessage: '',
      sample: '<veui-pagination :page="1" :page-size="20" :total="100" :page-sizes="[10, 20, 30]" :to="" ui="full" :native="true"></veui-pagination>',
      attrData: [
        {
          parameter: 'page', desc: '当前页数', type: 'number', canSelectVal: '--', defaultVal: '1'
        },
        {
          parameter: 'page-size', desc: '每页显示条目个数', type: 'number', canSelectVal: '--', defaultVal: '30'
        },
        {
          parameter: 'page-sizes', desc: '每页显示条目个数选择器的选项设置', type: 'array', canSelectVal: '--', defaultVal: '[30, 50, 100]'
        },
        {
          parameter: 'total', desc: '总条数', type: 'number', canSelectVal: '--', defaultVal: '--'
        },
        {
          parameter: 'ui', desc: '样式类型', type: 'string', canSelectVal: 'hetero，full，square，simple，big_square', defaultVal: '--'
        },
        {
          parameter: 'native', desc: '是否是原生跳转', type: 'boolean', canSelectVal: '', defaultVal: 'false（true表示仅翻页，false表示跳转到to的链接）'
        }
      ]
    }
  },
  methods: {
    handlePageRedirect ({page, event}) {
      event.preventDefault()
      this.fifthPagerMessage = `已阻止你跳转到第${page}页`
    }
  },
  mounted () {
    this.$children.forEach(child => {
      child.$on('click', () => {
        bus.$emit('log', child.$el.getAttribute('ui'))
      })
    })
  },
  beforeRouteUpdate ({params}, from, next) {
    let page = parseInt(params.page, 10)
    this.page = isNaN(page) ? 1 : page
    next()
  }
}
</script>

<style lang="less" scoped>
section {
  margin-bottom: 3em;
}
.veui-pagination {
  margin: 1em 0 3em;
}

.message {
  margin-top: -3em;
}
</style>
