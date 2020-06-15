<template>
  <article>
    <h1><code>&lt;veui-button-group&gt;</code></h1>
    <section>
      <veui-checkbox v-model="disabled">禁用</veui-checkbox>
    </section>
    <section>
      <p>
        <span class="veui-font-level-1b">普通按钮：</span>
      </p>
      <veui-button-group :items="items2" :disabled="disabled"></veui-button-group>
    </section>
    <section>
      <p>
        <span class="veui-font-level-1b">间隙排列按钮：</span>
        <span class="veui-font-level-2d">ui="interval"</span>
      </p>
      <veui-button-group ui="interval" :items="items2" :disabled="disabled"></veui-button-group>
    </section>
  </article>
</template>

<script>
import { ButtonGroup, Checkbox } from 'veui';

export default {
    name: 'button-group-demo',
    components: {
        'veui-button-group': ButtonGroup,
        'veui-checkbox': Checkbox
    },
    data() {
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
        };
    }
};
</script>

<style lang="less" scoped>
section {
  margin-bottom: 10px;
}
</style>
