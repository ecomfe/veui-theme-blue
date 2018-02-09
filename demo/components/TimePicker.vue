<template>
    <div class="time-picker">
        <div class="input">
            <div class="hour">
                <div class="display"
                    :class="{focus: focusHour}"
                >{{hour}}</div>
                <input type="text" :value="hour" @input="inputHour" @focus="hourFocus" @blur="hourBlur">
            </div>

            <div class="delimiter">:</div>

            <div class="minute">
                <div class="display"
                    :class="{focus: focusMinute}"
                >{{minute}}</div>
                <input type="text" :value="minute" @input="inputMinute" @focus="minuteFocus" @blur="minuteBlur">
            </div>
        </div>
        <div class="btns">
            <div class="up" @click="up">
                <veui-icon name="angle-up" class="icon"></veui-icon>
            </div>
            <div class="down" @click="down">
                <veui-icon name="angle-down" class="icon"></veui-icon>
            </div>
        </div>
    </div>
</template>

<script>
    import {Icon} from 'veui';

    export default {
        name: 'time-picker',
        data() {
            return {
                hour: '00',
                minute: '00',
                focusHour: false,
                focusMinute: false,
                lastFocus: 'hour'
            };
        },
        props: {
            initHour: {
                default: () => '00'
            },
            initMinute: {
                default: () => '00'
            }
        },
        methods: {
            minuteFocus() {
                this.focusHour = false;
                this.focusMinute = true;
                this.lastFocus = 'minute';
            },
            hourFocus() {
                this.focusMinute = false;
                this.focusHour = true;
                this.lastFocus = 'hour';
            },
            focusLast() {
                if (this.lastFocus === 'hour') {
                    this.focusHour = true;
                } else {
                    this.focusMinute = true;
                }
            },
            blurAll() {
                this.focusMinute = false;
                this.focusHour = false;
                this.emitTime();
            },
            stringify(num) {
                if (num < 10) {
                    return '0' + num;
                } else {
                    return String(num);
                }
            },
            up() {
                this.focusLast();

                if (this.focusHour) {
                    let hour = +this.hour + 1;
                    if (hour === 24) {
                        hour = 0;
                    }
                    this.hour = this.stringify(hour);
                } else if (this.focusMinute) {
                    let minute = +this.minute + 1;
                    if (minute === 60) {
                        minute = 0;
                    }
                    this.minute = this.stringify(minute);
                }
                this.blurAll();
            },
            down() {
                this.focusLast();

                if (this.focusHour) {
                    let hour = +this.hour - 1;
                    if (hour === -1) {
                        hour = 23;
                    }
                    this.hour = this.stringify(hour);
                } else if (this.focusMinute) {
                    let minute = +this.minute - 1;
                    if (minute === -1) {
                        minute = 59;
                    }
                    this.minute = this.stringify(minute);
                }
                this.blurAll();
            },
            inputHour({data}) {
                let val = parseInt(data);
                if (!isNaN(val)) {
                    this.hour = this.hour[1] + val;
                }
            },

            inputMinute({data}) {
                let val = parseInt(data);
                if (!isNaN(val)) {
                    this.minute = this.minute[1] + val;
                }
            },
            hourBlur() {
                this.focusHour = false;
                if (+this.hour >= 24) {
                    this.hour = '23';
                }
                this.emitTime();
            },
            minuteBlur() {
                this.focusMinute = false;
                if (+this.minute >= 60) {
                    this.minute = '59';
                }
                this.emitTime();
            },
            emitTime() {
                this.$emit('timeChange', {
                    hour: this.hour,
                    minute: this.minute
                });
            }
        },
        watch: {
            initMinute(v) {
                this.minute = v;
            },
            initHour(v) {
                this.hour = v;
            }
        },
        created() {
            this.minute = this.initMinute;
            this.hour = this.initHour;
        },
        components: {
            'veui-icon': Icon
        }
    };
</script>

<style scoped lang="less">
    .time-picker {
        user-select: none;
        margin: auto;
        padding-left: 10px;
        width: 203px;
        height: 28px;
        background: #FFFFFF;
        border: 1px solid #D9D9D9;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .input {
            height: 100%;
            font-size: 12px;
            display: flex;
            align-items: center;
            .hour, .minute {
                width: 16px;
                height: 16px;
                position: relative;
                vertical-align: middle;

                .display {
                    overflow: hidden;
                    width: 16px;
                    height: 16px;
                    font-size: 12px;
                    color: #666666;
                    &.focus {
                        background: rgba(75, 152, 248, 0.11);
                    }
                    text-align: center;
                }
                input{
                    position: absolute;
                    top: 0;
                    left: 0;
                    z-index: 2;
                    opacity: 0;
                    width: 16px;
                    height: 16px;
                    display: inline-block;
                    border: none;
                    outline: none;
                }
            }
            .delimiter {
                width: 6px;
                line-height: 16px;
                text-align: center;
            }
        }
        .btns {
            width: 26px;
            height: 26px;
            border-bottom-right-radius: 4px;
            border-top-right-radius: 4px;

            .up, .down {
                width: 100%;
                height: 50%;
                border-left: 1px solid #D9D9D9;;
                border-bottom-right-radius: 4px;
                border-top-right-radius: 4px;
                cursor: pointer;
            }
            .up {
                border-bottom: 1px solid #D9D9D9;;
            }
            .icon {
                display: block;
                margin: auto;
                color: #808080;
                width: 9px;
            }
        }
    }
</style>
