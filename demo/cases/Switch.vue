<template>
    <article>
        <h1><code>&lt;veui-switch&gt;</code></h1>
        <h2>尺寸</h2>
        <div class="options-desc">可选的尺寸
            <span class="bg-gray-show">ui</span>
            属性值：
            <span class="bg-gray-show">xs / s / m</span>
            ，其中 s 为默认值
        </div>
        <section>
            <veui-form>
                <veui-field label="超小号 [ui=xs]">
                    <veui-switch
                        v-model="value2"
                        ui="xs"
                    />
                    <veui-switch
                        :checked="true"
                        ui="xs"
                        disabled
                    />
                    <veui-switch
                        :checked="false"
                        ui="xs"
                    />
                    <veui-switch
                        :checked="false"
                        ui="xs"
                        disabled
                    />
                </veui-field>
                <veui-field label="小号 [ui=s]">
                    <veui-switch v-model="value2"/>
                    <veui-switch
                        :checked="true"
                        disabled
                    />
                    <veui-switch
                        :checked="false"
                    />
                    <veui-switch
                        :checked="false"
                        disabled
                    />
                </veui-field>
                <veui-field label="中号 [ui=m]">
                    <veui-switch
                        ui="m"
                        v-model="value2"
                    />
                    <veui-switch
                        :checked="true"
                        ui="m"
                        disabled
                    />
                    <veui-switch
                        :checked="false"
                        ui="m"
                    />
                    <veui-switch
                        :checked="false"
                        ui="m"
                        disabled
                    />
                </veui-field>
            </veui-form>
        </section>

        <h2>含图表和文字的开关，仅[ui=m]支持</h2>
        <section>
            <veui-form>
                <veui-field label="带一个字">
                    <veui-switch
                        ui="m"
                        v-model="value2"
                    >
                        <template
                            slot="content"
                            slot-scope="{ on }"
                        >
                            {{on ? "开" : "关"}}
                        </template>
                    </veui-switch>
                </veui-field>
                <veui-field label="带两个字">
                    <veui-switch
                        ui="m"
                        v-model="value2"
                    >
                        <template
                            slot="content"
                            slot-scope="{ on }"
                        >
                            {{on ? "开开" : "关关"}}
                        </template>
                    </veui-switch>
                </veui-field>
                <veui-field label="只带图标">
                    <veui-switch
                        ui="m"
                        v-model="value2"
                    >
                        <template
                            slot="content"
                            slot-scope="{ on }"
                        >
                            <veui-icon :name="on ? 'mark-tick' : 'mark-x'"/>
                        </template>
                    </veui-switch>
                </veui-field>
            </veui-form>
        </section>

        <h2>加载状态</h2>
        <section>
            <veui-form>
                <veui-field label="开启加载状态模拟">
                    <veui-switch
                        ui="m"
                        :checked="false"
                        :loading="true"
                    >
                    </veui-switch>
                </veui-field>
                <veui-field label="关闭加载状态模拟">
                    <veui-switch
                        ui="m"
                        :checked="true"
                        :loading="true"
                    >
                    </veui-switch>
                </veui-field>
                <veui-field label="切换加载状态">
                    <veui-switch v-model="loading">
                        加载中
                    </veui-switch>
                </veui-field>
                <veui-field label="超小号 [ui=xs]">
                    <veui-switch
                        v-model="value1"
                        ui="xs"
                        :loading="loading"
                    >
                        夜间模式
                    </veui-switch>
                    <veui-switch
                        v-model="value1"
                        ui="xs"
                        readonly
                    />
                    <veui-switch
                        v-model="value1"
                        ui="xs"
                        disabled
                    />
                </veui-field>
                <veui-field label="小号 [ui=s]">
                    <veui-switch
                        v-model="value2"
                        :loading="loading"
                    >
                        飞行模式
                    </veui-switch>
                    <veui-switch
                        v-model="value2"
                        readonly
                    />
                    <veui-switch
                        v-model="value2"
                        disabled
                    />
                </veui-field>
                <veui-field label="中号 [ui=m]">
                    <veui-switch
                        ui="m"
                        v-model="value3"
                        :loading="loading"
                    >
                        勿扰模式
                    </veui-switch>
                    <veui-switch
                        ui="m"
                        v-model="value3"
                        readonly
                    />
                    <veui-switch
                        ui="m"
                        v-model="value3"
                        disabled
                    />
                </veui-field>
                <veui-field label="异步处理">
                    <veui-switch
                        ui="m"
                        :checked="asyncValue"
                        :loading="asyncLoading"
                        @click.prevent="toggle"
                    >
                        异步
                        <template
                            slot="content"
                            slot-scope="{ on }"
                        >
                            <veui-icon :name="on ? 'mark-tick' : 'mark-x'"/>
                        </template>
                    </veui-switch>
                </veui-field>
            </veui-form>
        </section>
    </article>
</template>

<script>
import {Switch, Icon, Form, Field} from 'veui';
import 'veui-theme-blue-icons/mark-tick';
import 'veui-theme-blue-icons/mark-x';

export default {
    name: 'switch-demo',
    components: {
        'veui-switch': Switch,
        'veui-icon': Icon,
        'veui-form': Form,
        'veui-field': Field
    },
    data() {
        return {
            value1: true,
            value2: true,
            value3: true,
            loading: false,
            asyncValue: false,
            asyncLoading: false
        };
    },
    methods: {
        toggle() {
            this.asyncLoading = true;
            setTimeout(() => {
                this.asyncValue = !this.asyncValue;
                this.asyncLoading = false;
            }, 2000);
        }
    }
};
</script>

<style scoped>
section {
  margin-bottom: 10px;
}

.veui-switch {
  margin-right: 10px;
}
</style>
