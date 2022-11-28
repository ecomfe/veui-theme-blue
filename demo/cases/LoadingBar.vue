<template>
    <article>
        <h1>
            <code>&lt;veui-loading-bar&gt;</code>
        </h1>
        <h2>模式</h2>
        <section>
            <veui-form>
                <veui-field label="手动模式">
                    <veui-button
                        ui="s"
                        style="width: 70px"
                        :disabled="autoLock"
                        @click="toggle"
                    >{{ toggleLabel }}</veui-button>
                    <veui-loading-bar ui="fluid" :loading="loading"/>
                </veui-field>
                <veui-field label="定时模式">
                    <veui-button
                        ui="s"
                        :disabled="autoLock || manualLock"
                        @click="startDuration"
                    >Start</veui-button>
                    <veui-slider
                        v-model="duration"
                        ui="s"
                        style="width: 200px"
                        :min="500"
                        :max="10000"
                        :disabled="autoLock || manualLock"
                    />
                    <veui-loading-bar ui="fluid" :loading="loading"/>
                </veui-field>
            </veui-form>
        </section>
    </article>
</template>
<script>
import {LoadingBar, Slider, Button, Form, Field} from 'veui';
export default {
    name: 'loading-bar',
    components: {
        'veui-loading-bar': LoadingBar,
        'veui-slider': Slider,
        'veui-button': Button,
        'veui-form': Form,
        'veui-field': Field
    },
    data() {
        return {
            loading: false,
            duration: 2000,
            autoLock: false,
            manualLock: false
        };
    },
    computed: {
        toggleLabel() {
            return this.loading ? 'Stop' : 'Start';
        }
    },
    beforeDestroy() {
        if (this.timer != null) {
            clearTimeout(this.timer);
        }
    },
    methods: {
        toggle() {
            this.manualLock = this.loading = !this.loading;
        },
        startDuration() {
            this.loading = true;
            this.autoLock = true;

            this.timer = setTimeout(() => {
                this.loading = false;
                this.autoLock = false;
            }, this.duration);
        }
    }
};
</script>
<style lang="less" scoped>
.controls {
    display: flex;
    gap: 32px;
    align-items: center;

    span {
    font-weight: 700;
    color: #999;
    }
}

.mode {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
}

.demo {
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.veui-loading-bar {
    margin-top: 6px;
}
</style>
