<template>
  <article>
    <h1><code>&lt;veui-checkbox&gt;</code></h1>
    <p>
      <veui-checkbox v-model="current" true-value="已选" false-value="未选">当前数据：</veui-checkbox> {{ current }}
    </p>
    <section>
      <p>
        <span class="veui-font-level-1b">小图标：</span>
        <span class="veui-font-level-2d">ui="small"(大小为12px)</span>
      </p>
      <p>
        <veui-checkbox v-model="picked13" ui="small">正常状态</veui-checkbox>
      </p>
      <p>
        <veui-checkbox ui="small" v-model="picked14">选中状态</veui-checkbox>
      </p>
      <p>
        <veui-checkbox ui="small" indeterminate v-model="picked15">部分选中状态</veui-checkbox>
      </p>
      <p>
        <veui-checkbox ui="small" disabled v-model="picked16">选中无效状态</veui-checkbox>
      </p>
      <p>
        <veui-checkbox ui="small" disabled v-model="picked17">未选无效状态</veui-checkbox>
      </p>
      <p>
        <veui-checkbox ui="small" disabled indeterminate v-model="picked18">部分选中无效状态</veui-checkbox>
      </p>
    </section>
    <section>
      <p>
        <span class="veui-font-level-1b">默认图标：</span>
        <span class="veui-font-level-2d">不传ui(大小为14px)</span>
      </p>
      <p>
        <veui-checkbox v-model="picked1">正常状态</veui-checkbox>
      </p>
      <p>
        <veui-checkbox v-model="picked3">选中状态</veui-checkbox>
      </p>
      <p>
        <veui-checkbox indeterminate v-model="picked5">部分选中状态</veui-checkbox>
      </p>
      <p>
        <veui-checkbox disabled v-model="picked7">选中无效状态</veui-checkbox>
      </p>
      <p>
        <veui-checkbox disabled v-model="picked9">未选无效状态</veui-checkbox>
      </p>
      <p>
        <veui-checkbox disabled indeterminate v-model="picked11">部分选中无效状态</veui-checkbox>
      </p>
    </section>
    <section>
      <p>
        <span class="veui-font-level-1b">大图标：</span>
        <span class="veui-font-level-2d">ui="large"(大小为16px)</span>
      </p>
      <p>
        <veui-checkbox ui="large" v-model="picked2">正常状态</veui-checkbox>
      </p>
      <p>
        <veui-checkbox ui="large" v-model="picked4">选中状态</veui-checkbox>
      </p>
      <p>
        <veui-checkbox ui="large" indeterminate v-model="picked6">部分选中状态</veui-checkbox>
      </p>
      <p>
        <veui-checkbox ui="large" disabled v-model="picked8">选中无效状态</veui-checkbox>
      </p>
      
      <p>
        <veui-checkbox ui="large" disabled v-model="picked10">未选无效状态</veui-checkbox>
      </p>
      <p>
        <veui-checkbox ui="large" disabled indeterminate v-model="picked12">部分选中无效状态</veui-checkbox>
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
import { Checkbox, Table, Column } from 'veui'

export default {
  name: 'checkbox-demo',
  components: {
    'veui-checkbox': Checkbox,
    'veui-table': Table,
    'veui-table-column': Column
  },
  data () {
    return {
      current: '已选',
      picked1: false,
      picked2: false,
      picked3: true,
      picked4: true,
      picked5: false,
      picked6: false,
      picked7: true,
      picked8: true,
      picked9: false,
      picked10: false,
      picked11: false,
      picked12: false,
      picked13: false,
      picked14: true,
      picked15: false,
      picked16: true,
      picked17: false,
      picked18: false,
      sample: '<veui-checkbox ui="small" v-model="current" true-value="已选" false-value="未选">当前数据：</veui-checkbox>',
      attrData: [
        {
          parameter: 'ui', desc: '样式类型', type: 'string', canSelectVal: 'small,large', defaultVal: '--'
        },
        {
          parameter: 'true-value', desc: '选中时的值', type: 'string,number', canSelectVal: '--', defaultVal: 'true'
        },
        {
          parameter: 'false-value', desc: '没有选中时的值', type: 'string,number', canSelectVal: '--', defaultVal: 'false'
        },
        {
          parameter: 'checked', desc: '当前是否勾选', type: 'boolean', canSelectVal: 'true,false', defaultVal: 'false'
        },
        {
          parameter: 'indeterminate', desc: '设置 indeterminate 状态(部分选中)，只负责样式控制', type: 'boolean', canSelectVal: 'true,false', defaultVal: 'false'
        }
      ]
    }
  }
}
</script>
<style lang="less" scoped>
section {
  margin-bottom: 20px;
}
</style>

