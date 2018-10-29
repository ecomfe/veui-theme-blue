<template>
  <article>
    <h1><code>&lt;veui-dropdown&gt;</code></h1>
    <section>
      <p>
        <span class="veui-font-level-1b">默认按钮样式：</span>
        <span class="veui-font-level-2d">类型ui=""（不传）</span>
      </p>
      <p>
        <span class="veui-font-level-2d">大样式：ui="large"</span>
      </p>
      <p>
        <veui-dropdown
        ui="large"
        label="操作操作操作操作操作操作"
        :options="options"></veui-dropdown>
      </p>
      <p>
        <span class="veui-font-level-2d">中样式：ui=""（不传）</span>
      </p>
      <p>
        <veui-dropdown
        label="操作操作操作操作操作操作"
        :options="options"></veui-dropdown>
      </p>
      <p>
        <span class="veui-font-level-2d">小样式：ui="small"</span>
      </p>
      <p>
        <veui-dropdown
        ui="small"
        label="操作"
        :options="options">
          <template slot="option-label" slot-scope="{ label }">
            👉 {{ label }}
          </template>
        </veui-dropdown>
      </p>
      <p>
        <veui-dropdown
          label="操作操作操作操作操作操作"
          disabled
          :options="options"></veui-dropdown>
      </p>
    </section>
    <section>
      <p>
        <span class="veui-font-level-1b">蓝色按钮样式：</span>
        <span class="veui-font-level-2d">类型ui="primary"</span>
      </p>
      <p>
        <veui-dropdown
        ui="primary"
        label="操作"
        split
        :options="options"></veui-dropdown>
      </p>
      <p>
        <veui-dropdown
          ui="primary micro"
          label="操作操作操作操作操作操作"
          trigger="hover"
          :options="options">
          <template slot="option-label" slot-scope="{ label }">
            👉 {{ label }}
          </template>
        </veui-dropdown>
      </p>
    </section>
    <section>
      <p>
        <span class="veui-font-level-1b">文字样式：</span>
        <span class="veui-font-level-2d">类型ui="link"</span>
      </p>
      <p>
        <veui-dropdown
          ui="link"
          label="操作">
          <veui-option-group label="提交">
            <veui-option @click="log('save')" label="保存"/>
            <veui-option value="publish" label="发布"/>
          </veui-option-group>
          <veui-option-group label="操作">
            <veui-option value="undo" label="撤销"/>
            <veui-option value="redo" label="重复"/>
          </veui-option-group>
        </veui-dropdown>
      </p>
      <p>
        <veui-dropdown
          ui="link"
          label="操作"
          disabled
          :options="options"></veui-dropdown>
      </p>
    </section>
  </article>
</template>

<script>
import bus from '../bus';
import { Dropdown, OptionGroup, Option } from 'veui';

export default {
    name: 'dropdown-demo',
    components: {
        'veui-dropdown': Dropdown,
        'veui-option-group': OptionGroup,
        'veui-option': Option
    },
    data() {
        return {
          options: [
            {
                label: '新建新建新建新建新建新建新建',
                value: 'create'
            },
            {
                label: '编辑',
                value: 'edit',
                disabled: true
            },
            {
                label: '删除',
                value: 'remove'
            }
        ]
      };
    },
    mounted() {
        this.$children.forEach(child => {
          child.$on('click', val => {
            bus.$emit('log', val);
        });
      });
    },
    methods: {
        log(val) {
          bus.$emit('log', val);
      }
    }
};
</script>

<style lang="less" scoped>
p {
  margin: 10px 0;
}

</style>
