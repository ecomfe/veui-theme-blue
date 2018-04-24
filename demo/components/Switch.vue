<template>
  <article>
    <h1><code>&lt;veui-switch&gt;</code></h1>
    <section>
      <p>
        <span class="veui-font-level-1b">小开关：</span>
        <span class="veui-font-level-2d">ui="small"</span>
      </p>
      <veui-switch ui="small" v-model="value1">小开关</veui-switch>
      <veui-switch ui="small" v-model="value1" readonly></veui-switch>
      <veui-switch ui="small" v-model="value1" disabled></veui-switch>
    </section>
    <section>
      <p>
        <span class="veui-font-level-1b">默认开关：</span>
        <span class="veui-font-level-2d">不传ui</span>
      </p>
      <veui-switch v-model="value2">默认开关</veui-switch>
      <veui-switch v-model="value2" readonly></veui-switch>
      <veui-switch v-model="value2" disabled></veui-switch>
    </section>
    <section>
      <p>
        <span class="veui-font-level-1b">大开关：</span>
        <span class="veui-font-level-2d">ui="large"</span>
      </p>
      <veui-switch ui="large" v-model="value3">大开关</veui-switch>
      <veui-switch ui="large" v-model="value3" readonly></veui-switch>
      <veui-switch ui="large" v-model="value3" disabled></veui-switch>
    </section>
  </article>
</template>

<script>
import { Switch } from 'veui'

export default {
  name: 'SwitchCom',
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
