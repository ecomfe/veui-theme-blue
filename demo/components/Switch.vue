<template>
  <article>
    <h1><code>&lt;veui-switch&gt;</code></h1>
    <section>
      <p>
        <span class="veui-font-level-1b">小开关：</span>
        <span class="veui-font-level-2d">ui="small"</span>
      </p>
      <p>
        <veui-switch ui="small" v-model="value1">默认状态</veui-switch>
      </p>
      <p>
        <veui-switch ui="small" v-model="value1" readonly>只读状态</veui-switch>
      </p>
      <p>
        <veui-switch ui="small" v-model="value1" disabled>禁用状态</veui-switch>
      </p>
    </section>
    <section>
      <p>
        <span class="veui-font-level-1b">默认开关：</span>
        <span class="veui-font-level-2d">不传ui</span>
      </p>
      <p>
        <veui-switch v-model="value2">默认状态</veui-switch>
      </p>
      <p>
        <veui-switch v-model="value2" readonly>只读状态</veui-switch>
      </p>
      <p>
        <veui-switch v-model="value2" disabled>禁用状态</veui-switch>
      </p>
    </section>
    <section>
      <p>
        <span class="veui-font-level-1b">大开关：</span>
        <span class="veui-font-level-2d">ui="large"</span>
      </p>
      <P>
        <veui-switch ui="large" v-model="value3">默认状态</veui-switch>
      </P>
      <p>
        <veui-switch ui="large" v-model="value3" readonly>只读状态</veui-switch>
      </p>
      <p>
        <veui-switch ui="large" v-model="value3" disabled>禁用状态</veui-switch>
      </p>
    </section>
  </article>
</template>

<script>
import { Switch } from 'veui'

export default {
  name: 'switch-demo',
  components: {
    'veui-switch': Switch
  },
  data () {
    return {
      value1: true,
      value2: false,
      value3: true
    }
  },
  destroyed () {
  }
}
</script>

<style scoped>
section {
  margin-bottom: 10px;
}

.veui-switch {
  margin-right: 10px;
}
</style>
