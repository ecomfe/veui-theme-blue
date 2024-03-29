<template>
    <article>
        <h1><code>&lt;veui-slider&gt;</code></h1>
        <h2>尺寸</h2>
        <div class="options-desc">可选的尺寸 <span class="bg-gray-show">ui</span> 属性值： <span class="bg-gray-show">s / m（默认）</span></div>
        <div class="desc">Range: 0~1, Value: {{ value1 }}</div>
        <section>
            <veui-form>
                <veui-field ui="few" label="小号[ui=s]">
                    <veui-slider
                        v-model="value1"
                        ui="s"
                    />
                </veui-field>
                <veui-field ui="few" label="中号[ui=m]">
                    <veui-slider v-model="value1" ui="m"/>
                </veui-field>
            </veui-form>
        </section>
        <h2>连续滑动条</h2>
        <div class="desc">Range: 0~1, Value: {{ value2 }}</div>
        <section>
            <veui-form>
                <veui-field ui="few" label="默认状态">
                    <veui-slider ui="m" v-model="value2"/>
                </veui-field>
                <veui-field ui="few" label="只读状态">
                    <veui-slider
                        ui="m"
                        v-model="value2"
                        readonly
                    />
                </veui-field>
                <veui-field ui="few" label="禁用状态">
                    <veui-slider
                        ui="m"
                        v-model="value2"
                        disabled
                    />
                </veui-field>
            </veui-form>
        </section>
        <h2>固定比例</h2>
        <veui-slider
            :value="50"
            :min="1"
            :max="100"
            mark
        />
        <h2>分段式滑动条</h2>
        <div class="options-desc">未支持搭配 <span class="bg-gray-show">readonly</span> 和 <span class="bg-gray-show">disabled</span></div>
        <section>
            <veui-slider
                v-model="value4"
                ui="s"
                :min="10"
                :max="100"
                :step="7"
                mark
            />
            <veui-slider
                v-model="value4"
                :min="10"
                :max="100"
                :step="7"
                mark
            />
            <div class="desc">Range: 10~100, Step: 7, Value: {{ value4 }}</div>
        </section>
        <h2>区间选择</h2>
        <section>
            <veui-slider
                v-model="value5"
                ui="s"
                :min="0"
                :max="100"
            />
            <veui-slider
                v-model="value5"
                :min="0"
                :max="100"
            />
            <veui-slider
                v-model="value5"
                :min="0"
                :max="100"
                readonly
            />
            <veui-slider
                v-model="value5"
                :min="0"
                :max="100"
                disabled
            />
            <div class="desc">Range: 0~100, Value: {{ value5 }}</div>
        </section>
        <h2>输入滑动条</h2>
        <section class="input-slider-group">
            <veui-slider
                v-model="value6"
                :min="0"
                :max="100"
            />
            <veui-input
                :value="value6"
                @blur="inputBlur"
            />
            <br>
            <veui-slider
                v-model="value6"
                :min="0"
                :max="100"
                readonly
            />
            <veui-input
                :value="value6"
                @blur="inputBlur"
            />
            <br>
            <veui-slider
                v-model="value6"
                :min="0"
                :max="100"
                disabled
            />
            <veui-input
                :value="value6"
                @blur="inputBlur"
            />
            <br>
            <div class="desc">Range: 0~100, Value: {{ value6 }}</div>
        </section>
        <h2>次级条</h2>
        <section class="video">
            <veui-slider
                v-model="videoPlayProgress"
                :secondary-progress="videoBufferProgress"
                ui="micro"
            >
                <template #tip-label>
                    <span>{{ Math.round(videoPlayProgress * 100) }}%</span>
                </template>
            </veui-slider>
            <div class="duration">
                <span>{{ formatDuration(videoDuration * videoPlayProgress) }}</span> /
                <span>{{ formatDuration(videoDuration * videoBufferProgress) }}</span> /
                <span>{{ formatDuration(videoDuration) }}</span>
            </div>
        </section>
        <h2>定制滑动条</h2>
        <section>
            <veui-slider
                v-model="value3"
                :min="0"
                :max="360"
                :step="1"
                :parse="parseColorHue"
                :format="formatColorHue"
            >
                <div
                    slot="track"
                    style="width: 100%; height: 20px;"
                    :style="{ background: colorGradient }"
                />
                <div
                    slot="thumb"
                    :key="`thumb_${index}`"
                    slot-scope="{ index }"
                    style="margin-top: 6px"
                >
                    <div style="width: 16px; height: 12px">
                        <svg
                            width="16"
                            height="12"
                            viewBox="0 0 16 12"
                        >
                            <polygon points="8,0 16,12 0,12"/>
                        </svg>
                    </div>
                </div>
                <template
                    slot="tip"
                    slot-scope="{ open, activeIndex }"
                >
                    <div
                        v-show="open"
                        class="custom-tip"
                        :style="{
                            left: `${((activeIndex >= 0
                                ? parseColorHue(value3[activeIndex])
                                : 0) /
                                360) *
                                100}%`,
                            backgroundColor: value3[activeIndex]
                        }"
                    />
                </template>
            </veui-slider>
            <div class="desc">
                Range: 0~255, Step: 1, Value: <br>
                [
                <span
                    v-for="(val, index) in value3"
                    :key="`colorValue${index}`"
                >
                    "<span :style="{ color: val }"> {{ val }} </span>"
                    <span v-if="index < value3.length - 1">
                        ,
                    </span>
                </span>
                ]
            </div>
        </section>
    </article>
</template>

<script>
import {Slider, Input, Form, Field} from 'veui';
import {fill, padStart} from 'lodash';

function makeArray(length) {
    return fill(new Array(length), true);
}

export default {
    name: 'slider-demo',
    components: {
        'veui-slider': Slider,
        'veui-input': Input,
        'veui-form': Form,
        'veui-field': Field
    },
    data() {
        return {
            value1: 0.2,
            value2: 0.4,
            value3: makeArray(5).map((_, i) => `hsl(${(i + 1) * 60}, 100%, 50%)`),
            value4: 333,
            value5: [22, 66],
            value6: 22,
            videoPlayProgress: 0.11,
            videoBufferProgress: 0.57,
            videoDuration: 200
        };
    },
    computed: {
        colorGradient() {
            let colors = makeArray(7).map(function (_, index) {
                return `hsl(${60 * index}, 100%, 50%) ${(100 / 6) * index}%`;
            });
            return `linear-gradient(to right, ${colors.join(',')})`;
        }
    },
    methods: {
        parseColorHue(val) {
            return parseInt(val.substring(val.indexOf('(') + 1, val.indexOf(',')), 10);
        },
        formatColorHue(val) {
            return `hsl(${val}, 100%, 50%)`;
        },
        inputBlur({target}) {
            let newVal = Number(target.value);
            this.value6 = isNaN(newVal) ? 0 : newVal;
        },
        formatDuration(sec) {
            sec = Math.round(sec);
            return `${padStart(Math.floor(sec / 60).toString(), 2, '0')}:${padStart(
                (sec % 60).toString(),
                2,
                '0'
            )}`;
        }
    }
};
</script>

<style lang="less" scoped>
section {
  margin: 2em 0;
  padding: 1em;
}

.veui-slider {
  width: 500px;
  margin: 10px 0;
}

.desc {
  margin-top: 1em;
}

.custom-tip {
  position: absolute;
  top: -24px;
  width: 24px;
  height: 24px;
  margin-left: -12px;
  text-align: center;
  border: 1px solid #fff;
  font-size: 12px;
}

.input-slider-group {
    .veui-slider {
        width: 200px;
        display: inline-block;
    }
    .veui-input {
        margin: 8px 0 8px 10px;
        width: 64px;
        align-items: center;
        &[ui~="s"] {
            height: 22px;
        }
        &,
        &[ui~="m"] {
            height: 25px;
        }
    }
}
</style>
