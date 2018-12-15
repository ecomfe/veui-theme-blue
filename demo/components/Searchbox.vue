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
          @search="log($event)"/>
      </p>
      <p>
        <span class="veui-font-level-1b">默认尺寸：</span>
        <span class="veui-font-level-2d">不传ui</span>
      </p>
      <p>
        <veui-searchbox
          :name="name"
          :placeholder="placeholder"
          @search="log($event)"/>
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
          @search="log($event)"/>
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
          @search="log($event)"/>
      </p>
    </section>
    <section>
      <h2>Suggestion</h2>
      <p>
        <veui-searchbox
          v-model="value2"
          clearable
          :name="name"
          :placeholder="placeholder"
          :suggestions="suggestions1"
          @input="handleInput('1', $event)"
          @search="log($event)"
          @select="log($event)"/>
      </p>
    </section>
    <section>
      <h2>ui模式：<span class="veui-font-level-2d">类型ui="primary"</span></h2>
      <p>
        <span class="veui-font-level-1b">小尺寸：</span>
        <span class="veui-font-level-2d">ui="small"(focus)</span>
      </p>
      <p>
        <veui-searchbox
          ui="primary small"
          clearable
          :name="name"
          :placeholder="placeholder"
          :suggestions="suggestions2"
          replace-on-select
          suggest-trigger="focus"
          @input="handleInput('2', $event)"
          @search="log($event)"/>
      </p>
      <p>
        <span class="veui-font-level-1b">默认尺寸：</span>
        <span class="veui-font-level-2d">不传ui(input)</span>
      </p>
      <p>
        <veui-searchbox
          ui="primary"
          clearable
          :name="name"
          :placeholder="placeholder"
          :suggestions="suggestions2"
          suggest-trigger="input"
          replace-on-select
          @input="handleInput('2', $event)"
          @search="log($event)"/>
      </p>
      <p>
        <span class="veui-font-level-1b">大尺寸：</span>
        <span class="veui-font-level-2d">ui="large"(input, submit)</span>
      </p>
      <p>
        <veui-searchbox
          ui="primary large"
          :name="name"
          :placeholder="placeholder"
          :suggestions="suggestions3"
          :suggest-trigger="['input', 'submit']"
          @input="handleInput('3', $event)"
          @search="log($event)"/>
      </p>
    </section>
    <section>
      <h2>全局搜索框</h2>
      <p>
        <veui-searchbox
          ui="primary large"
          replace-on-select
          :name="name"
          :placeholder="placeholder"
          :suggestions="suggestions4"
          @input="handleInput('4', $event)"
          @search="log($event)"
          @select="log('select', $event)"></veui-searchbox>
      </p>
    </section>
    <section>
      <h2>禁用全局搜索框</h2>
      <p>
        <veui-searchbox
          ui="primary large"
          disabled
          :name="name"
          :placeholder="placeholder"
          :suggestions="suggestions5"
          @input="handleInput('5', $event)"
          @search="log($event)"/>
      </p>
    </section>
    <section>
      <h2>自定义Suggestion样式1</h2>
      <p>
        <veui-searchbox
          :name="name"
          :placeholder="placeholder"
          :suggestions="suggestions6"
          @input="handleInput('6', $event)"
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
          @input="handleInput('7', $event)"
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
import bus from '../bus';
import { Searchbox, Icon } from 'veui';
export default {
    name: 'demo-searchbox',
    components: {
        'veui-searchbox': Searchbox,
        Icon
    },
    data() {
        return {
            name: 'name',
            value: '测试值',
            value2: null,
            valueis: '测试值',
            placeholder: '百度(placeholder)',
            suggestions1: [],
            suggestions2: [],
            suggestions3: [],
            suggestions4: [],
            suggestions5: [],
            suggestions6: [],
            suggestions7: [],
            suggestionsis: []
        };
    },
    methods: {
        handleInput(num, value) {
            console.log(num, value);
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
            ];
          } else if (value) {
            this[`suggestions${num}`] = [
              value,
              '百度',
              '百度贴吧',
              '百度MVP',
              '百度指数'
          ];
        } else {
            this[`suggestions${num}`] = null;
        }
        },
        log(item) {
            bus.$emit('log', item);
        }
    }
};
</script>