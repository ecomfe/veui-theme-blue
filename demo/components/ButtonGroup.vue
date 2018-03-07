<template>
  <article>
    <h1><code>&lt;veui-button-group&gt;</code></h1>
    <section>
      <veui-checkbox v-model="disabled">禁用</veui-checkbox>
    </section>
    <section>
      <p>
        <span class="veui-font-level-1b">普通按钮：</span>
        <span class="veui-font-level-2d">不传ui</span>
      </p>
      <p>
        <span class="veui-font-level-2d">大样式：ui="large"</span>
      </p>
      <veui-button-group ui="large" :items="items2" :disabled="disabled"></veui-button-group>
      <p>
        <span class="veui-font-level-2d">中样式：ui=""（不传）</span>
      </p>
      <veui-button-group :items="items2" :disabled="disabled"></veui-button-group>
      <p>
        <span class="veui-font-level-2d">小样式：ui="small"</span>
      </p>
      <veui-button-group ui="small" :items="items2" :disabled="disabled"></veui-button-group>
    </section>
    <section>
      <p>
        <span class="veui-font-level-1b">强调（蓝色）：</span>
        <span class="veui-font-level-2d">ui="primary"</span>
      </p>
      <p>
        <span class="veui-font-level-2d">大样式：ui="large"</span>
      </p>
      <veui-button-group ui="primary large" :items="items1" :disabled="disabled"></veui-button-group>
      <p>
        <span class="veui-font-level-2d">中样式：ui=""（不传）</span>
      </p>
      <veui-button-group ui="primary" :items="items1" :disabled="disabled"></veui-button-group>
      <p>
        <span class="veui-font-level-2d">小样式：ui="small"</span>
      </p>
      <veui-button-group ui="primary small" :items="items1" :disabled="disabled"></veui-button-group>
    </section>
    <section>
      <p>
        <span class="veui-font-level-1b">辅助按钮：</span>
        <span class="veui-font-level-2d">ui="alt"</span>
      </p>
      <p>
        <span class="veui-font-level-2d">大样式：ui="large"</span>
      </p>
      <veui-button-group ui="alt large" :items="items4" :disabled="disabled"></veui-button-group>
      <p>
        <span class="veui-font-level-2d">中样式：ui=""（不传）</span>
      </p>
      <veui-button-group ui="alt" :items="items4" :disabled="disabled"></veui-button-group>
      <p>
        <span class="veui-font-level-2d">小样式：ui="small"</span>
      </p>
      <veui-button-group ui="alt small" :items="items4" :disabled="disabled"></veui-button-group>
    </section>
    <section>
      <p>
        <span class="veui-font-level-1b">间隙排列按钮：</span>
        <span class="veui-font-level-2d">ui="interval"(可与大小和类型ui样式共同使用)</span>
      </p>
      <veui-button-group ui="interval small" :items="items2" :disabled="disabled"></veui-button-group>
    </section>
  </article>
</template>

<script>
import { Button, ButtonGroup, Checkbox } from 'veui'

export default {
  name: 'button-group-demo',
  components: {
    'veui-button': Button,
    'veui-button-group': ButtonGroup,
    'veui-checkbox': Checkbox
  },
  data () {
    return {
      disabled: false,
      items1: [
        { label: '新建', event: 'add' },
        { label: '编辑', event: 'edit' },
        { label: '删除', event: 'remove' }
      ],
      items2: [
        { label: '新建', event: 'add'},
        { label: '编辑', event: 'edit' },
        { label: '删除', event: 'remove' }
      ],
      items3: [
        { label: '新建', event: 'add', disabled: true },
        { label: '编辑', event: 'edit' },
        { label: '删除', event: 'remove' }
      ],
      items4: [
        { label: '新建', event: 'add', disabled: true },
        { label: '编辑', event: 'edit' },
        { label: '删除', event: 'remove' }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
section {
  margin-bottom: 10px;
}
</style>
