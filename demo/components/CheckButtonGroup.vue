<template>
  <article>
    <h1><code>&lt;veui-check-button-group&gt;</code></h1>
    <section>
      <veui-checkbox v-model="disabled">禁用</veui-checkbox>
      <p>
        <span class="veui-font-level-1b">与buttonGroup样式一致</span>
      </p>
    </section>
    <section>
      <p>
        <span class="veui-font-level-1b">普通按钮：</span>
        <span class="veui-font-level-2d">不传ui</span>
      </p>
      <p>
        <span class="veui-font-level-2d">大尺寸：ui="large"</span>
      </p>
      <p>
        <veui-check-button-group :items="data1" ui="large" v-model="picked1" :disabled="disabled">
          <template slot-scope="props">{{ props.label }}</template>
        </veui-check-button-group>
      </p>
      <p>
        <span class="veui-font-level-2d">默认尺寸：不传ui</span>
      </p>
      <p>
        <veui-check-button-group :items="data1" v-model="picked1" :disabled="disabled">
          <template slot-scope="props">{{ props.label }}</template>
        </veui-check-button-group>
      </p>
      <p>
        <span class="veui-font-level-2d">小尺寸：ui="small"</span>
      </p>
      <p>
        <veui-check-button-group :items="data1" ui="small" v-model="picked1" :disabled="disabled">
          <template slot-scope="props">{{ props.label }}</template>
        </veui-check-button-group>
      </p>
      <p>value: {{ picked1 }}</p>
      <p>
        <veui-check-button-group :items="data3" ui="micro" v-model="picked3" :disabled="disabled">
          <template slot-scope="props">
            <veui-icon :name="props.icon" />
          </template>
        </veui-check-button-group>
      </p>
      <p>value: {{ picked3 }}</p>
    </section>
    <section>
      <p>
        <span class="veui-font-level-1b">强调（蓝色）：</span>
        <span class="veui-font-level-2d">ui="primary"</span>
      </p>
      <p>
        <span class="veui-font-level-2d">大尺寸：ui="large"</span>
      </p>
      <p>
         <veui-check-button-group :items="data1" ui="primary large" v-model="picked1" :disabled="disabled">
          <template slot-scope="props">{{ props.label }}</template>
        </veui-check-button-group>
      </p>
      <p>
        <span class="veui-font-level-2d">默认尺寸：不传ui</span>
      </p>
      <p>
        <veui-check-button-group :items="data1" ui="primary" v-model="picked1" :disabled="disabled">
          <template slot-scope="props">{{ props.label }}</template>
        </veui-check-button-group>
      </p>
      <p>
        <span class="veui-font-level-2d">小尺寸：ui="small"</span>
      </p>
      <p>
        <veui-check-button-group :items="data1" ui="primary small" v-model="picked1" :disabled="disabled">
          <template slot-scope="props">{{ props.label }}</template>
        </veui-check-button-group>
      </p>
    </section>
    <section>
      <p>
        <span class="veui-font-level-1b">辅助按钮：</span>
        <span class="veui-font-level-2d">ui="alt"</span>
      </p>
      <p>
        <span class="veui-font-level-2d">大尺寸：ui="large"</span>
      </p>
      <p>
        <veui-check-button-group :items="data2" ui="large alt" v-model="picked2" :disabled="disabled">
          <template slot-scope="props">{{ props.label }}</template>
        </veui-check-button-group>
      </p>
      <p>
        <span class="veui-font-level-2d">默认尺寸：不传ui</span>
      </p>
      <p>
        <veui-check-button-group :items="data2" ui="alt" v-model="picked2" :disabled="disabled">
          <template slot-scope="props">{{ props.label }}</template>
        </veui-check-button-group>
      </p>
      <p>
        <span class="veui-font-level-2d">小尺寸：ui="small"</span>
      </p>
      <p>
        <veui-check-button-group :items="data2" ui="small alt" v-model="picked2" :disabled="disabled">
          <template slot-scope="props">{{ props.label }}</template>
        </veui-check-button-group>
      </p>
      <p>value: {{ picked2 }}</p>
    </section>
    <section>
      <p>
        <span class="veui-font-level-1b">间隙排列按钮：</span>
        <span class="veui-font-level-2d">ui="interval"(可与大小和类型ui样式共同使用)</span>
      </p>
      <p>
        <veui-check-button-group :items="data2" ui="interval small" v-model="picked2" :disabled="disabled">
          <template slot-scope="props">{{ props.label }}</template>
        </veui-check-button-group>
      </p>
    </section>
  </article>
</template>

<script>
import { CheckButtonGroup, Checkbox, Icon } from 'veui'
import 'veui-theme-blue/icons/check'
import 'veui-theme-blue/icons/cross'
import 'veui-theme-blue/icons/refresh'

export default {
  name: 'check-button-group-demo',
  components: {
    'veui-check-button-group': CheckButtonGroup,
    'veui-checkbox': Checkbox,
    'veui-icon': Icon
  },
  data () {
    return {
      picked1: ['Hirasawa Yui', 'Akiyama Mio'],
      picked2: [],
      picked3: [],
      disabled: false,
      data1: [
        {
          value: 'Hirasawa Yui', label: 'Hirasawa Yui'
        },
        {
          value: 'Akiyama Mio', label: 'Akiyama Mio'
        },
        {
          value: 'Nakano Azusa', label: 'Nakano Azusa'
        }
      ],
      data2: [
        {
          value: 'Hirasawa Yui', label: 'Hirasawa Yui'
        },
        {
          value: 'Akiyama Mio', label: 'Akiyama Mio'
        },
        {
          value: 'Nakano Azusa', label: 'Nakano Azusa'
        }
      ],
      data3: [
        {
          value: 'check', icon: 'check'
        },
        {
          value: 'cross', icon: 'cross'
        },
        {
          value: 'refresh', icon: 'refresh'
        }
      ]
    }
  }
}
</script>
