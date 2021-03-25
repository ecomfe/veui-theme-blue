<template>
    <article>
        <h1><code>&lt;veui-progress&gt;</code></h1>
        <section>
            <p style="margin-bottom: 16px;">
                Progress:
                <veui-number-input
                    v-model="progress"
                    ui="xs"
                    :max="1"
                    :min="0"
                    :step="0.1"
                    :decimalPlace="2"
                >
                </veui-number-input>
            </p>
            <p>
                <veui-button @click="status = 'error'">
                    Trigger Error
                </veui-button>
                <veui-button @click="status = null">
                    Clear Status
                </veui-button>
                <veui-button
                    @click="indeterminate = !indeterminate"
                >Toggle Indeterminate</veui-button>
            </p>
        </section>
        <section>
            <h2>线性进度条</h2>
            <h2>尺寸</h2>
            <div class="options-desc">
                可选的尺寸 <span class="bg-gray-show">ui</span> 
                属性值： <span class="bg-gray-show">s(默认，可不传) / m</span>
            </div>
            <veui-form>
                <veui-field label="小号[ui=s]">
                    <veui-progress
                        :value="Number(progress)"
                        desc
                        :autosucceed="200"
                        :status.sync="status"
                        :decimal-place="1"
                        :indeterminate="indeterminate"
                    />
                </veui-field>
                <veui-field label="中号[ui=m]">
                    <veui-progress
                        ui="m"
                        :value="Number(progress)"
                        desc
                        :autosucceed="200"
                        :status.sync="status"
                        :decimal-place="1"
                        :indeterminate="indeterminate"
                    />
                </veui-field>
            </veui-form>
            <h2>风格</h2>
            <div class="options-desc">
                可选的风格 <span class="bg-gray-show">ui</span> 
                属性值： <span class="bg-gray-show">fluid</span>
            </div>
            <veui-form>
                <veui-field label="自适应[ui=fluid]">
                    <veui-progress
                        :value="Number(progress)"
                        desc
                        :autosucceed="200"
                        :status.sync="status"
                        :decimal-place="1"
                        :indeterminate="indeterminate"
                        ui="fluid"
                    />
                </veui-field>
            </veui-form>
        </section>
        <section>
            <h2>环形进度条</h2>
            <h2>尺寸</h2>
            <div class="options-desc">
                可选的尺寸 <span class="bg-gray-show">ui</span> 
                属性值： <span class="bg-gray-show">s(默认，可不传) / m</span>
            </div>
            <veui-form>
                <veui-field label="小号[ui=s]">
                    <veui-progress
                        type="circular"
                        :value="Number(progress)"
                        desc
                        :autosucceed="200"
                        :status.sync="status"
                    />
                </veui-field>
                <veui-field label="中号[ui=m]">
                    <veui-progress
                        ui="m"
                        type="circular"
                        :value="Number(progress)"
                        desc
                        :autosucceed="200"
                        :status.sync="status"
                    />
                </veui-field>
            </veui-form>
        </section>
        <section>
            <h2 style="margin-top: 50px;">更多功能demo示例（UI不需还原）</h2>
            <veui-form>
                <veui-field label="线性进度条（不确定进度）:">
                    <veui-progress
                        :status.sync="status"
                        indeterminate
                    />
                </veui-field>
            </veui-form>
        </section>
    </article>
</template>

<script>
import {Button, Progress, NumberInput, Form, Field} from 'veui';

export default {
    name: 'progress-demo',
    components: {
        'veui-button': Button,
        'veui-progress': Progress,
        'veui-number-input': NumberInput,
        'veui-form': Form,
        'veui-field': Field
    },
    data() {
        return {
            progress: 0.3,
            status: null,
            indeterminate: false
        };
    }
};
</script>

<style lang="less" scoped>
section {
  margin-bottom: 30px;
}

.veui-button {
  margin-right: 10px;
}
</style>
