<template>
    <article>
        <h1><code>&lt;veui-steps&gt;</code></h1>
        <section>
            <p>
                Step
                <input
                    v-model="current"
                    type="number"
                    step="1"
                    min="1"
                    :max="steps.length"
                >
            </p>
        </section>
        <h2>风格</h2>
        <div class="options-desc">可选的风格 <span class="bg-gray-show">ui</span> 属性值： <span class="bg-gray-show">normal / simple / line / icon</span></div>
        <section>
            <veui-form>
                <veui-field
                    label="默认步骤条[ui=normal]"
                >
                    <veui-steps
                        :steps="steps"
                        ui="normal horizon s"
                        :current="current - 1"
                    />
                </veui-field>
                <veui-field
                    label="简洁步骤条[ui=simple]"
                >
                    <veui-steps
                        :steps="steps"
                        ui="simple horizon s"
                        :current="current - 1"
                    />
                </veui-field>
                <veui-field
                    label="带状步骤条[ui=line](不支持与纵向搭配)"
                >
                    <veui-steps
                        :steps="steps"
                        ui="line horizon s"
                        :current="current - 1"
                    />
                </veui-field>
                <veui-field
                    label="无文字步骤条[ui=icon]"
                >
                    <veui-steps
                        :steps="steps"
                        ui="icon horizon s"
                        :current="current - 1"
                    />
                </veui-field>
            </veui-form>
        </section>
        <h2>尺寸</h2>
        <div class="options-desc">可选的尺寸 <span class="bg-gray-show">ui</span> 属性值： <span class="bg-gray-show">s / m</span></div>
        <section>
            <veui-form>
                <veui-field ui="multi" label="小号[ui=s normal horizon]">
                    <veui-steps
                        :steps="steps"
                        ui="normal horizon s"
                        :current="current - 1"
                    />
                </veui-field>
                <veui-field ui="multi" label="小号[ui=s simple horizon]">
                    <veui-steps
                        :steps="steps"
                        ui="simple horizon s"
                        :current="current - 1"
                    />
                </veui-field>
                <veui-field ui="multi" label="小号[ui=s line horizon]">
                    <veui-steps
                        :steps="steps"
                        ui="line horizon s"
                        :current="current - 1"
                    />
                </veui-field>
                <veui-field ui="multi" label="小号[ui=s icon horizon]">
                    <veui-steps
                        :steps="steps"
                        ui="icon horizon s"
                        :current="current - 1"
                    />
                </veui-field>
            </veui-form>
        </section>
        <section style="margin-top: 20px;">
            <veui-form>
                <veui-field ui="multi" label="中号[ui=m normal horizon]">
                    <veui-steps
                        :steps="steps"
                        ui="normal horizon m"
                        :current="current - 1"
                    />
                </veui-field>
                <veui-field ui="multi" label="中号[ui=m simple horizon]">
                    <veui-steps
                        :steps="steps"
                        ui="simple horizon m"
                        :current="current - 1"
                    />
                </veui-field>
                <veui-field ui="multi" label="中号[ui=m line horizon]">
                    <veui-steps
                        :steps="steps"
                        ui="line horizon m"
                        :current="current - 1"
                    />
                </veui-field>
                <veui-field ui="multi" label="中号[ui=m icon horizon]">
                    <veui-steps
                        :steps="steps"
                        ui="icon horizon m"
                        :current="current - 1"
                    />
                </veui-field>
            </veui-form>
        </section>
        <h2>方向</h2>
        <div class="options-desc">可选的方向 <span class="bg-gray-show">ui</span> 属性值： <span class="bg-gray-show">vertical / horizon</span></div>
        <section>
            <veui-form>
                <veui-field
                    label="纵向步骤条"
                    ui="multi"
                    class="horizon-flex"
                >
                    <veui-steps
                        :steps="steps"
                        ui="vertical normal s"
                        :current="current - 1"
                    />
                    <veui-steps
                        :steps="steps"
                        ui="vertical simple s"
                        :current="current - 1"
                    />
                </veui-field>
                <veui-field
                    label="横向步骤条[ui=normal]"
                >
                    <veui-steps
                        :steps="steps"
                        ui="horizon normal m"
                        :current="current - 1"
                    />
                </veui-field>
                <veui-field
                    label="横向步骤条[ui=simple]"
                >
                    <veui-steps
                        :steps="steps"
                        ui="horizon simple s"
                        :current="current - 1"
                    />
                </veui-field>
            </veui-form>
        </section>
        <h2>自定义模板：</h2>
        <section>
            <veui-steps
                :steps="steps"
                ui="horizon normal"
                :current="current - 1"
            >
                <template
                    slot="label"
                    slot-scope="step"
                >
                    {{ step.label }} <veui-icon
                        class="star"
                        name="star"
                    />
                </template>
            </veui-steps>
        </section>
    </article>
</template>

<script>
import {Form, Field, Steps, Icon} from 'veui';
import 'vue-awesome/icons/star';

export default {
    name: 'steps-demo',
    components: {
        'veui-steps': Steps,
        'veui-icon': Icon,
        'veui-field': Field,
        'veui-form': Form
    },
    data() {
        return {
            current: 3,
            steps: [
                {label: '已完成步骤', desc: '这是一段描述文字', to: '/button'},
                {label: '出错步骤', desc: '这是一段描述文字', status: 'error', to: '/button'},
                {label: '当前步骤', desc: '这是一段描述文字', to: '/button'},
                {label: '未完成步骤', desc: '这是一段描述文字', to: '/button'},
                {label: '未完成步骤', desc: '这是一段描述文字', to: '/button'}
            ]
        };
    }
};
</script>

<style lang="less" scoped>
// 需要设置展示的步骤条宽度
.veui-steps[ui~='horizon'] {
    width: 600px;
}
input[type="number"] {
  width: 60px;
  height: 30px;
  text-align: center;
  font-size: 14px;
}
.star {
  vertical-align: text-top;
}
.horizon-flex :last-child {
    justify-content: space-around;
}
</style>
