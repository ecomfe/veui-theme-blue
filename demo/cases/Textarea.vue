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
        <section>
            <h3>受控（感知输入法，固定值）</h3>
            <veui-textarea
                :value="fixed"
                composition
                line-number
                autofocus
                ui="s"
                rows="3"
                resizable
            />
            <h3>受控（不感知输入法，固定值）</h3>
            <veui-textarea
                :value="fixed"
                line-number
                autofocus
                ui="s"
                rows="3"
                resizable
            />
            <h3>受控（感知输入法, 且用 v-model 同步），value: {{ controlled1 }}</h3>
            <veui-textarea
                v-model="controlled1"
                composition
                line-number
                autofocus
                ui="s"
                rows="3"
                resizable
            />
            <h3>受控（不感知输入法, 且用 v-model 同步），value: {{ controlled2 }}</h3>
            <veui-textarea
                v-model="controlled2"
                line-number
                autofocus
                ui="s"
                rows="3"
                resizable
            />
            <h3>非受控（感知输入法），localValue：{{ uncontrolled1 }}</h3>
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
            <h3>非受控（不感知输入法），localValue：{{ uncontrolled2 }}</h3>
            <veui-textarea
                ref="text2"
                line-number
                autofocus
                ui="s"
                rows="3"
                resizable
                @input="uncontrolled2 = $event"
            />
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
    }
};
</script>

<style scoped></style>
