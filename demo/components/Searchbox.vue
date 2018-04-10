<template>
  <article>
    <h1><code>&lt;veui-searchbox&gt;</code></h1>
    <section>
      <h2>普通</h2>
      <p>
        <span class="veui-font-level-1b">小尺寸：</span>
        <span class="veui-font-level-2d">ui="small"</span>
      </p>
      <p>
        <veui-searchbox
          ui="small"
          :name="name"
          :placeholder="placeholder"
          @search="log($event)"></veui-searchbox>
      </p>
      <p>
        <span class="veui-font-level-1b">默认尺寸：</span>
        <span class="veui-font-level-2d">不传ui</span>
      </p>
      <p>
        <veui-searchbox
          :name="name"
          :placeholder="placeholder"
          @search="log($event)"></veui-searchbox>
      </p>
      <p>
        <span class="veui-font-level-1b">大尺寸：</span>
        <span class="veui-font-level-2d">ui="large"</span>
      </p>
      <p>
        <veui-searchbox
          ui="large"
          :name="name"
          :placeholder="placeholder"
          @search="log($event)"></veui-searchbox>
      </p>
    </section>
    <section>
      <h2>禁用</h2>
      <p>
        <veui-searchbox
          :value="value"
          :name="name"
          clearable
          :placeholder="placeholder"
          disabled
          @search="log($event)"></veui-searchbox>
      </p>
    </section>
    <section>
      <h2>Suggestion(submit async)</h2>
      <p>
        <veui-searchbox
          v-model="value2"
          clearable
          :name="name"
          :placeholder="placeholder"
          :suggestions="suggestions1"
          suggest-trigger="submit"
          @suggest="asyncHandleSuggest('1', $event)"
          @search="log($event)"
          @select="value2 = $event.label"></veui-searchbox>
      </p>
    </section>
    <section>
      <h2>ui模式：<span class="veui-font-level-2d">类型ui="primary"</span></h2>
      <p>
        <span class="veui-font-level-1b">小尺寸(focus)：</span>
        <span class="veui-font-level-2d">ui="small"</span>
      </p>
      <p>
        <veui-searchbox
          ui="primary small"
          clearable
          v-model="value3"
          :name="name"
          :placeholder="placeholder"
          :suggestions="suggestions2"
          replaceOnSelect
          suggest-trigger="focus"
          @suggest="handleSuggest('2', $event)"
          @search="log($event)"
          @select="value3 = $event.label"></veui-searchbox>
      </p>
      <p>
        <span class="veui-font-level-1b">默认尺寸(input)：</span>
        <span class="veui-font-level-2d">不传ui</span>
      </p>
      <p>
        <veui-searchbox
          ui="primary"
          clearable
          :name="name"
          v-model="value5"
          :placeholder="placeholder"
          :suggestions="suggestions2"
          replaceOnSelect
          suggest-trigger="input"
          @suggest="handleSuggest('3', $event)"
          @search="log($event)"
          @select="value5 = $event.label"></veui-searchbox>
      </p>
      <p>
        <span class="veui-font-level-1b">大尺寸(input)：</span>
        <span class="veui-font-level-2d">ui="large"</span>
      </p>
      <p>
        <veui-searchbox
          ui="primary large"
          :name="name"
          v-model="value4"
          :placeholder="placeholder"
          :suggestions="suggestions3"
          suggest-trigger="input"
          @suggest="handleSuggest('3', $event)"
          @search="log($event)"
          @select="value4 = $event.label"></veui-searchbox>
      </p>
    </section>
    <section>
      <h2>全局搜索框</h2>
      <p>
        <veui-searchbox
          ui="primary large"
          replaceOnSelect
          :name="name"
          :placeholder="placeholder"
          :suggestions="suggestions4"
          @input="handleSuggest('4', $event)"
          @search="log($event)"
          @select="log('select', $event)"></veui-searchbox>
      </p>
    </section>
    <section>
      <h2>禁用全局搜索框</h2>
      <p>
        <veui-searchbox
          ui="alt primary large"
          disabled
          :name="name"
          :placeholder="placeholder"
          :suggestions="suggestions5"
          @input="handleSuggest('5', $event)"
          @search="log($event)"></veui-searchbox>
      </p>
    </section>
    <section>
      <h2>自定义Suggestion样式1</h2>
      <p>
        <veui-searchbox
          ui="alt"
          :name="name"
          :placeholder="placeholder"
          :suggestions="suggestions6"
          @input="handleSuggest('6', $event)"
          @search="log($event)">
          <template slot="suggestion" slot-scope="suggestion">
            <span>{{ suggestion.value }}</span>
            <icon name="eye"></icon>
          </template>
        </veui-searchbox>
      </p>
    </section>
    <section>
      <h2>自定义Suggestion样式2</h2>
      <p>
        <veui-searchbox
          :name="name"
          :placeholder="placeholder"
          :suggestions="suggestions7"
          @input="handleSuggest('7', $event)"
          @search="log($event)">
          <template slot="suggestions" slot-scope="props">
            <div>
              <h3>header</h3>
              <template v-for="(suggestion, index) in props.suggestions">
                <div class="veui-searchbox-suggestion-item"
                  :key="index"
                  @click="props.select(suggestion)">
                  <span>{{ suggestion.value }}</span>
                  <icon name="eye"></icon>
                </div>
              </template>
              <h3>ender</h3>
            </div>
          </template>
        </veui-searchbox>
      </p>
    </section>
  </article>
</template>

<script>
import bus from '../bus'
import { Searchbox, Icon } from 'veui'

export default {
  name: 'demo-searchbox',
  components: {
    'veui-searchbox': Searchbox,
    Icon
  },
  data () {
    return {
      name: 'name',
      value: '测试值',
      value2: '测试值',
      value3: '测试值',
      value4: '测试值',
      value5: '测试值',
      placeholder: '百度(placeholder)',
      suggestions1: [],
      suggestions2: [],
      suggestions3: [],
      suggestions4: [],
      suggestions5: [],
      suggestions6: [],
      suggestions7: []
    }
  },
  methods: {
    handleSuggest (num, value) {
      if (value && num) {
        this[`suggestions${num}`] = [
          {
            value,
            label: value
          },
          {
            value: '百度',
            label: '百度'
          },
          {
            value: '百度贴吧',
            label: '百度贴吧'
          },
          {
            value: '百度MVP',
            label: '百度MVP'
          }
        ]
      } else {
        this[`suggestions${num}`] = [
          '',
          '百度',
          '百度贴吧',
          '百度MVP',
          '百度指数'
        ]
      }
    },
    asyncHandleSuggest (num, value) {
      setTimeout(() => {
        if (value && num < 3) {
          this[`suggestions${num}`] = [
            {
              value,
              label: value
            },
            {
              value: '百度',
              label: '百度'
            },
            {
              value: '百度贴吧',
              label: '百度贴吧'
            },
            {
              value: '百度MVP',
              label: '百度MVP'
            }
          ]
        } else {
          this[`suggestions${num}`] = [
            '',
            '百度',
            '百度贴吧',
            '百度MVP',
            '百度指数'
          ]
        }
      }, 1000);
    },
    log (item) {
      bus.$emit('log', item)
    }
  }
}
</script>
