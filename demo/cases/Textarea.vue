<template>
    <article>
        <h1><code>&lt;veui-textarea&gt;</code></h1>
        <veui-form>
            <h2>尺寸</h2>
            <div class="options-desc">
                可选的尺寸 <span class="bg-gray-show">ui</span> 
                属性值： <span class="bg-gray-show">s / m</span>
            </div>
            <section>
                <veui-field
                    ui="s"
                    label="小号（s）"
                >
                    <veui-textarea
                        v-model="value"
                        autofocus
                        ui="s"
                        rows="3"
                    />
                </veui-field>
                <veui-field
                    ui="s"
                    label="中号（m）"
                >
                    <veui-textarea
                        v-model="value"
                        autofocus
                        ui="m"
                        rows="3"
                        resizable
                    />
                </veui-field>
            </section>
            <section>
                <h3>只读样式</h3>
                <veui-textarea
                    placeholder="只读样式"
                    v-model="value"
                    readonly
                />
            </section>
            <section>
                <h3>禁用样式</h3>
                <veui-textarea
                    placeholder="禁用样式"
                    v-model="value"
                    disabled
                />
            </section>
            <section>
                <h3>错误样式</h3>
                <veui-textarea
                    placeholder="错误样式"
                    v-model="value"
                    invalid
                />
            </section>

            <section>
                <h3>字数限制显示(不允许溢出)</h3>
                <section>
                    <veui-textarea
                        placeholder="不允许溢出"
                        maxlength="5"
                        strict
                    />
                </section>
            </section>

            <section>
                <h3>可拖拽</h3>
                <section>
                    <veui-textarea
                        resizable
                        placeholder="可拖拽"
                    />
                </section>
            </section>
        </veui-form>
    </article>
</template>

<script>
import bus from '../bus';
import {Textarea, Form, Field} from 'veui';

export default {
    name: 'button-demo',
    components: {
        'veui-textarea': Textarea,
        'veui-field': Field,
        'veui-form': Form
    },
    data() {
        return {
            value: ''
        };
    },
    mounted() {
        this.$children.forEach(child => {
            child.$on('click', () => {
                bus.$emit('log', child.$el.getAttribute('ui'));
            });
        });
    }
};
</script>

<style scoped></style>
