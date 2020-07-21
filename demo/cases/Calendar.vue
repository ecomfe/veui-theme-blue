<template>
    <article class="veui-demo-calendar">
        <h1><code>&lt;veui-calendar&gt;</code></h1>
        <h2>尺寸</h2>
        <div class="options-desc">可选的尺寸 <span class="bg-gray-show">ui</span> 属性值： <span class="bg-gray-show">s / m</span></div>
        <section>
            <veui-calendar
                type="date"
                ui="s"
            />
            <veui-calendar
                type="date"
                ui="m"
            />
        </section>
        <h2>日期选择</h2>
        <section>
            <span class="title-desc">日期单选</span>
            <veui-calendar
                v-model="singleDate"
                type="date"
                :disabled-date="isDisabled"
                ui="s"
            />
            <veui-calendar
                v-model="singleDate"
                type="date"
                :disabled-date="isDisabled"
                ui="m"
            />
        </section>
        <section>
            <span class="title-desc">日期多选</span>
            <veui-calendar
                v-model="multipleDate"
                type="date"
                multiple
                ui="s"
            />
            <veui-calendar
                v-model="multipleDate"
                type="date"
                multiple
                ui="m"
            />
        </section>
        <section>
            <span class="title-desc">日期范围单选</span>
            <veui-calendar
                v-model="singleDateRange"
                type="date"
                range
                ui="s"
            />
            <veui-calendar
                v-model="singleDateRange"
                type="date"
                range
                ui="m"
            />
        </section>
        <section>
            <span class="title-desc">日期范围多选</span>
            <veui-calendar
                v-model="multipleDateRange"
                type="date"
                range
                multiple
                ui="s"
            />
            <veui-calendar
                v-model="multipleDateRange"
                type="date"
                range
                multiple
                ui="m"
            />
        </section>
        <h2>月份选择</h2>
        <section>
            <span class="title-desc">月份单选</span>
            <veui-calendar
                v-model="singleMonth"
                type="month"
                :disabled-date="isYearDisabled"
                ui="s"
            />
            <veui-calendar
                v-model="singleMonth"
                type="month"
                :disabled-date="isYearDisabled"
                ui="m"
            />
        </section>
        <section>
            <span class="title-desc">月份多选</span>
            <veui-calendar
                v-model="multipleMonth"
                type="month"
                multiple
                ui="s"
            />
            <veui-calendar
                v-model="multipleMonth"
                type="month"
                multiple
                ui="m"
            />
        </section>
        <section>
            <span class="title-desc">月份范围单选</span>
            <veui-calendar
                v-model="singleMonthRange"
                type="month"
                range
                ui="s"
            />
            <veui-calendar
                v-model="singleMonthRange"
                type="month"
                range
                ui="m"
            />
        </section>
        <section>
            <span class="title-desc">月份范围多选</span>
            <veui-calendar
                v-model="multipleMonthRange"
                type="month"
                range
                multiple
                ui="s"
            />
            <veui-calendar
                v-model="multipleMonthRange"
                type="month"
                range
                multiple
                ui="m"
            />
        </section>
        <h2>年份选择</h2>
        <section>
            <span class="title-desc">年份单选</span>
            <veui-calendar
                v-model="singleYear"
                :disabled-date="isYearDisabled"
                type="year"
                ui="s"
            />
            <veui-calendar
                v-model="singleYear"
                :disabled-date="isYearDisabled"
                type="year"
                ui="m"
            />
        </section>
        <section>
            <span class="title-desc">年份多选</span>
            <veui-calendar
                v-model="multipleYear"
                type="year"
                multiple
                ui="s"
            />
            <veui-calendar
                v-model="multipleYear"
                type="year"
                multiple
                ui="m"
            />
        </section>
        <section>
            <span class="title-desc">年份范围单选</span>
            <veui-calendar
                v-model="singleYearRange"
                type="year"
                range
                ui="s"
            />
            <veui-calendar
                v-model="singleYearRange"
                type="year"
                range
                ui="m"
            />
        </section>
        <section>
            <span class="title-desc">年份范围多选</span>
            <veui-calendar
                v-model="multipleYearRange"
                type="year"
                range
                multiple
                ui="s"
            />
            <veui-calendar
                v-model="multipleYearRange"
                type="year"
                range
                multiple
                ui="m"
            />
        </section>
    </article>
</template>

<script>
import {Calendar} from 'veui';

export default {
    name: 'calendar-demo',
    components: {
        'veui-calendar': Calendar
    },
    data() {
        let today = new Date();
        return {
            singleDate: null,
            singleDateRange: [new Date(2019, 9, 10), new Date(2019, 11, 10)],
            multipleDate: null,
            multipleDateRange: null,
            singleMonth: null,
            singleMonthRange: null,
            multipleMonth: null,
            multipleMonthRange: null,
            singleYear: null,
            singleYearRange: null,
            multipleYear: null,
            multipleYearRange: null,
            isDisabled(day) {
                return !(day.getDate() % 5) || day.getDate() === 1;
            },
            isYearDisabled(day) {
                return day.getFullYear() === 2018;
            }
        };
    }
};
</script>

<style lang="less">
@import '~veui-theme-blue/lib.less';

.veui-demo-calendar {
  section {
    .clearfix();
    margin-bottom: 10px;
  }

  .veui-calendar {
    margin-right: 10px;
  }
}
</style>
