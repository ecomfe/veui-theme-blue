<template>
    <article>
        <h1><code>&lt;veui-textarea&gt;</code></h1>
        <h2>尺寸</h2>
        <div class="options-desc">
            可选的尺寸 <span class="bg-gray-show">ui</span> 
            属性值： <span class="bg-gray-show">s / m</span>
        </div>
        <section>
            <veui-form>
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
            </veui-form>
        </section>
        <section>
            <h2>不同状态</h2>
            <veui-form>
                <veui-field label="只读样式" ui="multi">
                    <veui-textarea
                        placeholder="只读样式"
                        v-model="value"
                        readonly
                    />
                </veui-field>
                <veui-field label="禁用样式" ui="multi">
                    <veui-textarea
                        placeholder="禁用样式"
                        v-model="value"
                        disabled
                    />
                </veui-field>
                <veui-field label="错误样式" ui="multi">
                    <veui-textarea
                        placeholder="错误样式"
                        v-model="value"
                        invalid
                    />
                </veui-field>
                <veui-field label="可拖拽" ui="multi">
                    <veui-textarea
                        resizable
                        placeholder="可拖拽"
                    />
                </veui-field>
            </veui-form>
        </section>
        <section>
            <h2>字数限制显示</h2>
            <veui-form>
                <veui-field label="不允许溢出" ui="multi">
                    <veui-textarea
                        placeholder="不允许溢出"
                        maxlength="5"
                        strict
                    />
                </veui-field>
                <veui-field label="一个汉字长度算2" ui="multi">
                    <veui-textarea
                        maxlength="5"
                        :get-length="getLength"
                    />
                </veui-field>
                <veui-field label="允许溢出" ui="multi">
                    <veui-textarea
                        placeholder="允许溢出"
                        maxlength="5"
                        rows="2"
                        value="Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis inventore non cumque vero eligendi? Iure ex sint aut. Facilis doloribus facere ducimus consequatur ipsa reiciendis voluptates minima molestiae deserunt nemo."
                    />
                </veui-field>
            </veui-form>
        </section>
        <section>
            <h2>更多功能demo示例（UI不需还原）</h2>
            <veui-form>
                <veui-field label="受控（感知输入法，固定值）" ui="multi">
                    <veui-textarea
                        :value="fixed"
                        composition
                        line-number
                        autofocus
                        ui="s"
                        rows="3"
                        resizable
                    />
                </veui-field>
                <veui-field label="受控（不感知输入法，固定值）" ui="multi">
                    <veui-textarea
                        :value="fixed"
                        line-number
                        autofocus
                        ui="s"
                        rows="3"
                        resizable
                    />
                </veui-field>
                <veui-field label="受控（感知输入法, 且用 v-model 同步）" ui="multi">
                    <veui-textarea
                        v-model="controlled1"
                        composition
                        line-number
                        autofocus
                        ui="s"
                        rows="3"
                        resizable
                    />
                    <p>value: {{ controlled1 }}</p>
                </veui-field>
                <veui-field label="受控（不感知输入法, 且用 v-model 同步）" ui="multi">
                    <veui-textarea
                        v-model="controlled2"
                        line-number
                        autofocus
                        ui="s"
                        rows="3"
                        resizable
                    />
                    <p>value: {{ controlled2 }}</p>
                </veui-field>
                <veui-field label="非受控（感知输入法）" ui="multi">
                    <veui-textarea
                        ref="text2"
                        composition
                        line-number
                        autofocus
                        ui="s"
                        rows="3"
                        resizable
                        @input="uncontrolled1 = $event"
                    />
                    <p>value: {{ uncontrolled1 }}</p>
                </veui-field>
                <veui-field label="非受控（不感知输入法）" ui="multi">
                    <veui-textarea
                        ref="text2"
                        line-number
                        autofocus
                        ui="s"
                        rows="3"
                        resizable
                        @input="uncontrolled2 = $event"
                    />
                    <p>localValue：{{ uncontrolled2 }}</p>
                </veui-field>
            </veui-form>
        </section>
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
            value: '',
            fixed: '固定内容',
            controlled1: '',
            controlled2: '',
            uncontrolled1: '',
            uncontrolled2: ''
        };
    },
    mounted() {
        this.$children.forEach(child => {
            child.$on('click', () => {
                bus.$emit('log', child.$el.getAttribute('ui'));
            });
        });
    },
    methods: {
        getLength(val) {
            // eslint-disable-next-line no-control-regex
            return val.replace(/[^\x00-\xff]/g, 'aa').length;
        }
    }
};
</script>

<style scoped></style>
