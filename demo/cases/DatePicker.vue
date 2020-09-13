<template>
    <article>
        <h1>
            <code>&lt;veui-date-picker&gt;</code>
        </h1>
        <h2>尺寸</h2>
        <div class="options-desc">可选的尺寸 <span class="bg-gray-show">ui</span> 属性值： <span class="bg-gray-show">s / m</span></div>
        <section>
            <veui-form>
                <veui-field
                    v-for="(ui, index) in sizes"
                    :key="index"
                    
                >
                    <template v-slot:label>{{ui.label}}[ui={{ui.value}}]</template>
                    <veui-date-picker
                        :range="ui.label === '日期范围选择'"
                        clearable
                        :ui="ui.value"
                    />
                </veui-field>
            </veui-form>
        </section>
        <h2>各种状态展示</h2>
        <section>
            <span class="title-desc">默认状态</span>
            <veui-date-picker
                v-model="selectedDate"
                clearable
                ui="s"
            />
            <veui-date-picker
                v-model="selectedDateRange"
                range
                clearable
                ui="m"
            />
        </section>
        <section>
            <span class="title-desc">禁用状态</span>
            <veui-date-picker
                v-model="selectedDate"
                clearable
                disabled
                ui="s"
            />
            <veui-date-picker
                v-model="selectedDateRange"
                range
                clearable
                disabled
                ui="m"
            />
        </section>
        <section>
            <span class="title-desc">只读状态</span>
            <veui-date-picker
                v-model="selectedDate"
                clearable
                readonly
                ui="s"
            />
            <veui-date-picker
                v-model="selectedDateRange"
                range
                clearable
                readonly
                ui="m"
            />
        </section>
        <section>
            <span class="title-desc">报错状态</span>
            <veui-date-picker
                class="veui-invalid"
                v-model="selectedDate"
                clearable
                ui="s"
            />
            <veui-date-picker
                class="veui-invalid"
                v-model="selectedDateRange"
                range
                clearable
                ui="m"
            />
        </section>
        <section>
            <h2>日期快捷选择</h2>
            <veui-date-picker
                v-model="selectedDateRange"
                range
                :shortcuts="shortcuts"
            />
        </section>
        <h2>单月选择</h2>
        <section>
            <veui-date-picker
                v-model="selectedMonth"
                type="month"
            />
        </section>
        <h2>月份范围选择</h2>
        <section>
            <veui-date-picker
                v-model="selectedMonthRange"
                :overlay-options="{ position: 'right-start' }"
                type="month"
                range
            />
        </section>
        <h2>作用域插槽</h2>
        <section>
            <section>
                <veui-date-picker
                    v-model="selectedDateRange"
                    range
                >
                    <template
                        slot="date"
                        slot-scope="{ date }"
                    >
                        <em>{{ date }}</em>
                    </template>
                </veui-date-picker>
            </section>
        </section>
        <section style="height: 500px;"/>
    </article>
</template>

<script>
import {DatePicker, Field, Form} from 'veui';

export default {
    name: 'date-picker-demo',
    components: {
        'veui-date-picker': DatePicker,
        'veui-field': Field,
        'veui-form': Form
    },
    data() {
        return {
            sizes: [
                {
                    label: '日期选择',
                    value: 's'
                },
                {
                    label: '日期范围选择',
                    value: 's'
                },
                {
                    label: '日期选择',
                    value: 'm'
                },
                {
                    label: '日期范围选择',
                    value: 'm'
                }
            ],
            selectedDate: null,
            selectedMonth: null,
            selectedDateRange: null,
            selectedMonthRange: null,
            shortcuts: [
                {
                    label: '上个月',
                    from: {
                        startOf: 'month',
                        months: -1
                    },
                    to: {
                        startOf: 'month',
                        days: -1
                    }
                },
                {
                    label: '本月',
                    from: {
                        startOf: 'month'
                    },
                    to: {
                        startOf: 'month',
                        months: 1,
                        days: -1
                    }
                },
                {
                    label: '本周',
                    from: {
                        startOf: 'week',
                        days: 0
                    },
                    to: {
                        startOf: 'week',
                        weeks: 1,
                        days: -1
                    }
                },
                {
                    label: '最近7天',
                    from: -6,
                    to: 0
                },
                {
                    label: '今天',
                    to: 0
                }
            ]
        };
    },
    methods: {
        disabledDate(date) {
            return date > new Date();
        }
    }
};
</script>

<style lang="less" scoped>
section {
  margin-bottom: 20px;
}
.veui-field-label {
    width: 120px;
}
.veui-date-picker+.veui-date-picker {
    margin-left: 10px;
}
</style>
