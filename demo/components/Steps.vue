<template>
  <article>
    <h1><code>&lt;veui-steps&gt;</code></h1>
    <section>
      <p>Step <input type="number" step="1" min="1" :max="steps.length" v-model="current"></p>
      <p><label><veui-checkbox v-model="vertical">纵向样式</veui-checkbox></label></p>
    </section>
    <section>
      <p>
        <span class="veui-font-level-1b">默认样式：</span>
        <span class="veui-font-level-2d">ui="vertical"（纵向样式，不传ui则默认为横向样式）</span>
      </p>
      <veui-steps :steps="steps" :current="current - 1" :ui="`${vertical ? 'vertical' : ''}`"></veui-steps>
    </section>
    <section>
      <p>
        <span class="veui-font-level-1b">多行样式：</span>
        <span class="veui-font-level-2d">ui="full"</span>
      </p>
      <veui-steps :steps="steps" :ui="`full${vertical ? ' vertical' : ''}`" :current="current - 1"></veui-steps>
    </section>
    <section>
      <p>
        <span class="veui-font-level-1b">小型样式：</span>
        <span class="veui-font-level-2d">ui="small"</span>
      </p>
      <veui-steps :steps="steps" :current="current - 1" :ui="`small ${vertical ? 'vertical' : ''}`"></veui-steps>
    </section>
    <section>
      <p>
        <span class="veui-font-level-1b">自定义模板：</span>
      </p>
      <veui-steps :steps="steps" :ui="`full${vertical ? ' vertical' : ''}`" :current="current - 1">
        <template slot="label" slot-scope="step">{{ step.label }} <veui-icon class="star" name="star"></veui-icon></template>
      </veui-steps>
    </section>
  </article>
</template>

<script>
import { Checkbox, Steps, Icon } from 'veui'
import 'vue-awesome/icons/star'

export default {
  name: 'steps-demo',
  components: {
    'veui-steps': Steps,
    'veui-checkbox': Checkbox,
    'veui-icon': Icon
  },
  data () {
    return {
      current: 2,
      steps: [
        { label: 'Step 1', desc: '填写信息', to: '/Tabs' },
        { label: 'Step 2', desc: '验证身份' },
        { label: 'Step 3', desc: '注册成功' }
      ],
      vertical: false
    }
  }
}
</script>

<style lang="less" scoped>
input[type="number"] {
  width: 60px;
  height: 30px;
  text-align: center;
  font-size: 14px;
}
.star {
  vertical-align: text-top;
}
</style>
