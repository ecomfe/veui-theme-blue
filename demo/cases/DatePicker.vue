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
        <section>
            <h2>不同状态展示</h2>
            <veui-form>
                <veui-field
                    label="默认状态"
                >
                    <veui-date-picker
                        v-model="selectedDate"
                        clearable
                        ui="s"
                    />
                    <veui-date-picker
                        v-model="selectedDateRange"
                        range
                        clearable
                        ui="s"
                    />
                </veui-field>
                <veui-field
                    label="禁用状态"
                >
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
                        ui="s"
                    />
                </veui-field>
                <veui-field
                    label="只读状态"
                >
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
                        ui="s"
                    />
                </veui-field>
                <veui-field
                    label="报错状态"
                >
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
                </veui-field>
            </veui-form>
        </section>
        <section>
            <h2>更多功能demo示例（UI不需还原）</h2>
            <veui-form>
                <veui-field
                    label="日期快捷选择"
                >
                    <veui-date-picker
                        v-model="selectedDateRange"
                        range
                        :shortcuts="shortcuts"
                    />
                </veui-field>
                <veui-field
                    label="单月选择"
                >
                    <veui-date-picker
                        v-model="selectedMonth"
                        type="month"
                    />
                </veui-field>
                <veui-field
                    label="月份范围选择"
                >
                    <veui-date-picker
                        v-model="selectedMonthRange"
                        :overlay-options="{ position: 'right-start' }"
                        type="month"
                        range
                    />
                </veui-field>
                <veui-field
                    label="作用域插槽"
                >
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
                </veui-field>
                <veui-field
                    label="日期范围选择（3天限制）"
                >
                    <veui-date-picker
                        clearable
                        :disabled-date="disabledRange"
                        range
                        format="yyyy-MM-dd"
                    />
                </veui-field>
            </veui-form>
        </section>
    </article>
</template>

<script>
import {DatePicker, Field, Form} from 'veui';
import add from 'date-fns/add';
import startOfDay from 'date-fns/startOfDay';

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
        },
        disabledRange(date, selected) {
            let today = startOfDay(new Date());
            let maxEnd = add(today, {days: 4});
            let middle = add(today, {days: 2});
            if (selected == null) {
                return date < today || date > maxEnd;
            } else if (selected <= middle) {
                maxEnd = add(selected, {days: 2});
                return !(date >= today && date <= maxEnd);
            }
            let minStart = add(selected, {days: -2});
            return !(date >= minStart && date <= maxEnd);
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
