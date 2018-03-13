<template>
  <article>
    <h1><code>&lt;veui-button&gt;</code></h1>
    <section>
      <p>
        <span class="veui-font-level-1b">强调按钮（蓝色）：</span>
        <span class="veui-font-level-2d">ui="primary"</span>
      </p>
      <p>
        <veui-button ui="primary small">提交</veui-button>
        <span class="veui-font-level-2d">小尺寸按钮，ui=small</span>
      </p>
      <p>
        <veui-button ui="primary">提交</veui-button>
        <span class="veui-font-level-2d">默认尺寸按钮，控制大小ui可不传</span>
      </p>
      <p>
        <veui-button ui="primary large">提交</veui-button>
        <span class="veui-font-level-2d">大尺寸按钮，ui=large</span>
      </p>
      <p>
        <veui-button ui="primary" disabled>提交</veui-button>
        <span class="veui-font-level-2d">禁用状态时，设置disabled属性</span>
      </p>
      <p>
        <veui-button ui="primary" loading>提交</veui-button>
        <span class="veui-font-level-2d">加载中状态时，设置loading属性</span>
      </p>
    </section>
    <section>
      <p>
        <span class="veui-font-level-1b">普通按钮：</span>
        <span class="veui-font-level-2d">不传ui</span>
      </p>
      <p>
        <veui-button ui="small">保存</veui-button>
        <veui-button>保存</veui-button>
        <veui-button ui="large">保存</veui-button>
        <veui-button disabled>保存</veui-button>
        <veui-button loading>保存</veui-button>
      </p>
    </section>
    <p>
      <veui-button ui="small"><icon name="cross-small"></icon> 取消</veui-button>
      <veui-button><icon name="cross-small"></icon> 取消</veui-button>
      <veui-button ui="large"><icon name="cross-small"></icon> 取消</veui-button>
      <veui-button disabled><icon name="cross-small"></icon> 取消</veui-button>
      <veui-button loading><icon name="cross-small"></icon> 取消</veui-button>
    </p>
    <section>
      <p>
        <span class="veui-font-level-1b">辅助按钮：</span>
        <span class="veui-font-level-2d">ui="alt"</span>
      </p>
      <p>
        <veui-button ui="alt small">取消</veui-button>
        <veui-button ui="alt">取消</veui-button>
        <veui-button ui="alt large">取消</veui-button>
        <veui-button ui="alt" disabled>取消</veui-button>
        <veui-button ui="alt" loading>取消</veui-button>
      </p>
    </section>
    <section>
      <p>
        <span class="veui-font-level-1b">文字按钮：</span>
        <span class="veui-font-level-2d">ui="link"</span>
      </p>
      <p>
        <veui-button ui="link primary small">创建</veui-button>
        <veui-button ui="link primary">创建</veui-button>
        <veui-button ui="link primary large">创建</veui-button>
        <veui-button ui="link primary" disabled>创建</veui-button>
        <veui-button ui="link primary" loading>创建</veui-button>
      </p>
    </section>
    <section>
      <p>
        <span class="veui-font-level-1b">圆形按钮：</span>
        <span class="veui-font-level-2d">ui="round"</span>
      </p>
      <p>
        <veui-button ui="round primary small"><icon name="check"></icon></veui-button>
        <veui-button ui="round primary"><icon name="check"></icon></veui-button>
        <veui-button ui="round primary large"><icon name="check"></icon></veui-button>
        <veui-button ui="round primary" disabled><icon name="check"></icon></veui-button>
        <veui-button ui="round primary" loading><icon name="check"></icon></veui-button>
      </p>
    </section>
    <p>
      <veui-button ui="round small"><icon name="edit"></icon></veui-button>
      <veui-button ui="round"><icon name="edit"></icon></veui-button>
      <veui-button ui="round large"><icon name="edit"></icon></veui-button>
      <veui-button ui="round" disabled><icon name="edit"></icon></veui-button>
      <veui-button ui="round" loading><icon name="edit"></icon></veui-button>
    </p>
    <section>
      <p>
        <span class="veui-font-level-1b">方形按钮：</span>
        <span class="veui-font-level-2d">ui="square"</span>
      </p>
      <p>
        <veui-button ui="square small"><icon name="search"></icon></veui-button>
        <veui-button ui="square"><icon name="search"></icon></veui-button>
        <veui-button ui="square large"><icon name="search"></icon></veui-button>
        <veui-button ui="square" disabled><icon name="search"></icon></veui-button>
        <veui-button ui="square" loading><icon name="search"></icon></veui-button>
      </p>
    </section>
    <section>
      <p>
        <span class="veui-font-level-1b">灰色背景方形按钮：</span>
        <span class="veui-font-level-2d">ui="alt square"</span>
      </p>
      <p>
        <veui-button ui="alt square small"><icon name="cross"></icon></veui-button>
        <veui-button ui="alt square"><icon name="cross"></icon></veui-button>
        <veui-button ui="alt square large"><icon name="cross"></icon></veui-button>
        <veui-button ui="alt square" disabled><icon name="cross"></icon></veui-button>
        <veui-button ui="alt square" loading><icon name="cross"></icon></veui-button>
      </p>
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
import { Button, Icon, Table, Column } from 'veui'
import 'veui-theme-blue/icons/cross-small'
import 'veui-theme-blue/icons/check'
import 'veui-theme-blue/icons/edit'
import 'veui-theme-blue/icons/search'
import 'veui-theme-blue/icons/cross'

export default {
  name: 'button-demo',
  components: {
    Icon,
    'veui-button': Button,
    'veui-table': Table,
    'veui-table-column': Column
  },
  data() {
    return {
      sample: '<veui-button ui="large" disabled>保存</veui-button>',
      attrData: [
        {
          parameter: 'ui', desc: '样式类型', type: 'string', canSelectVal: '类型ui：primary（蓝色），link（文字），round（圆形），square（方形），alt（灰色背景）；大小ui：small（小样式），large（大样式）', defaultVal: '--'
        },
        {
          parameter: 'disabled', desc: '是否禁用状态', type: 'boolean', canSelectVal: '--', defaultVal: 'false'
        },
        {
          parameter: 'loading', desc: '是否加载中状态', type: 'boolean', canSelectVal: '--', defaultVal: 'false'
        }
      ]
    }
  },
  mounted () {
    this.$children.forEach(child => {
      child.$on('click', () => {
        bus.$emit('log', child.$el.getAttribute('ui'))
      })
    })
  }
}
</script>

<style scoped>
p {
  user-select: none;
}

.veui-button {
  margin-right: 10px;
}
section {
  margin-bottom: 20px;
}
</style>
