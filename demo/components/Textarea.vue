<template>
  <article>
    <h1><code>&lt;veui-textarea&gt;</code></h1>
    <section>
      <p>
        <span class="veui-font-level-1b">默认尺寸 + 显示 3 行</span>
      </p>
      <veui-textarea placeholder="请输入" rows="3" v-model="value"/>
    </section>
    <section>
      <p>
        <span class="veui-font-level-1b">默认尺寸 + 行号 + 自动扩展</span>
      </p>
      <veui-textarea line-number autoresize placeholder="请输入" v-model="value"/>
    </section>
    <section>
      <p>
        <span class="veui-font-level-1b">宽度100% + 自动扩展：</span>
        <span class="veui-font-level-2d">ui="auto"</span>
      </p>
      <veui-textarea ui="auto" autoresize v-model="value"/>
    </section>
  </article>
</template>

<script>
import bus from '../bus'
import { Textarea } from 'veui'

export default {
  name: 'button-demo',
  components: {
    'veui-textarea': Textarea
  },
  data () {
    return {
      value: ''
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
</style>
