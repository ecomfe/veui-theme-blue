<template>
    <article class="veui-form-demo">
        <h1>
            <code>&lt;veui-form&gt;</code>
        </h1>
        <h2>Form尺寸</h2>
        <div class="options-desc">
            可选的尺寸 <span class="bg-gray-show">ui</span> 
            属性值： <span class="bg-gray-show">s(默认，可不传) / m </span>
        </div>
        <h2>Form风格</h2>
        <div class="options-desc">
            可选的风格 <span class="bg-gray-show">ui</span> 
            属性值： <span class="bg-gray-show">normal(默认，可不传) / loose / top </span>
        </div>
        <h2>Field尺寸</h2>
        <div class="options-desc">
            可选的尺寸 <span class="bg-gray-show">ui</span> 
            属性值： <span class="bg-gray-show">s(默认，可不传) / m</span>
        </div>
        <h2>Field风格</h2>
        <div class="options-desc">
            可选的尺寸 <span class="bg-gray-show">ui</span> 
            属性值： <span class="bg-gray-show">long / few(默认，可不传) / special</span>
        </div>
        <h2>Field对齐方向</h2>
        <div class="options-desc">
            可选的尺寸 <span class="bg-gray-show">ui</span> 
            属性值： <span class="bg-gray-show">left / right(默认，可不传) </span>
        </div>
        <section>
            <h3>Form尺寸：s ➕ Form风格：normal</h3>
            <div class="title-desc">Field对齐方式：right</div>
            <br/>
            <div class="title-desc">Field不同风格</div>
            <veui-form
                ref="form1"
                :data="storeData1"
            >
                <veui-field
                    v-for="(item, index) in demoData"
                    :key="`demo1_${index}`"
                    :label="item.label"
                    :ui="item.ui">
                    <veui-input v-model="storeData1.nickName"/>
                </veui-field>
            </veui-form>
            <div class="title-desc">Field对齐方式：left</div>
            <br/>
            <div class="title-desc">Field不同风格</div>
            <veui-form
                ref="form1"
                :data="storeData1"
            >
                <veui-field
                    v-for="(item, index) in demoData"
                    :key="`demo1_${index}`"
                    :label="item.label"
                    :ui="`${item.ui} left`">
                    <veui-input v-model="storeData1.nickName"/>
                </veui-field>
            </veui-form>
        </section>
        <section>
            <h3>Form尺寸：m ➕ Form风格：loose</h3>
            <div class="title-desc">Field对齐方式：right</div>
            <br/>
            <div class="title-desc">Field不同风格</div>
            <veui-form
                ui="m loose"
                ref="form1"
                :data="storeData1"
            >
                <veui-field
                    v-for="(item, index) in demoData"
                    :key="`demo2_${index}`"
                    :label="item.label"
                    :ui="item.ui">
                    <veui-input v-model="storeData1.nickName"/>
                </veui-field>
            </veui-form>
        </section>
        <section>
            <h3>Form尺寸: s ➕ Form风格: top</h3>
            <veui-form
                ui="s top"
                ref="form1"
                :data="storeData1"
            >
                <veui-field label="短标签">
                    <veui-input v-model="storeData1.nickName"/>
                </veui-field>
                <veui-field label="文本很长的标签">
                    <veui-input v-model="storeData1.nickName"/>
                </veui-field>
            </veui-form>
        </section>
        <section>
            <h2>表单的禁用或只读</h2>
            <veui-form
                disabled
                :data="storeData1"
            >
                <veui-field
                    label="昵称"
                    field="nickName"
                >
                    <veui-input v-model="storeData1.nickName"/>
                </veui-field>

                <veui-field
                    label="性别"
                    field="sex"
                >
                    <veui-select
                        v-model="storeData1.sex"
                        :options="storeData1.sexItems"
                    />
                </veui-field>

                <veui-field
                    label="婚姻"
                    field="married"
                >
                    <veui-radiogroup
                        v-model="storeData1.married"
                        :items="storeData1.marryItems"
                    />
                </veui-field>

                <veui-field
                    ui="small"
                    label="爱好"
                    field="hobby"
                >
                    <veui-checkboxgroup
                        v-model="storeData1.hobby"
                        ui="small"
                        type="checkbox"
                        :items="storeData1.hobbyItems"
                    />
                </veui-field>

                <veui-field
                    label="生日"
                    field="birthday"
                >
                    <veui-datepicker v-model="storeData1.birthday"/>
                </veui-field>

                <veui-field
                    label="头像"
                    field="avatar"
                >
                    <veui-uploader
                        v-model="storeData1.avatar"
                        type="image"
                        action="/upload"
                        request-mode="xhr"
                        ui="vertical"
                        :disabled="false"
                        :max-count="1"
                        max-size="10mb"
                        accept=".jpg, .jpeg, .png"
                    />
                </veui-field>
            </veui-form>
        </section>
        <section>
            <h2>使用 field 来支持表单验证，使用 name 来定位验证提示</h2>
            <veui-form
                ui="s"
                ref="form2"
                :readonly="isValidating"
                :data="storeData4"
                :validators="validators"
                :before-validate="beforeValidate"
                :after-validate="afterValidate"
                @submit="submit"
                @invalid="handleInvalid"
            >
                <veui-field
                    disabled
                    field="name"
                    name="name1"
                    label="姓名"
                    tip="disabled 值提交时会过滤"
                >
                    <veui-input v-model="storeData4.name"/>
                </veui-field>

                <veui-field
                    field="name1"
                    name="name2"
                    label="姓名1"
                    tip="在 field 上边 disabled，提交时才会过滤掉，该项在 input 上 disalbed"
                >
                    <veui-input
                        v-model="storeData4.name1"
                        disabled
                        placeholder="长度不能短于2"
                    />
                </veui-field>

                <veui-field
                    field="age"
                    name="age1"
                    :rules="ageRule"
                    label="年龄"
                >
                    <veui-input
                        v-model="storeData4.age"
                        placeholder="错误提示优先出在右侧, 长度不能超过3"
                    />
                </veui-field>

                <veui-field
                    field="desc"
                    name="desc"
                    rules="required"
                    label="介绍"
                >
                    <veui-textarea
                        v-model="storeData4.desc"
                        rows="3"
                    />
                </veui-field>

                <veui-fieldset
                    name="phoneSet"
                    label="电话"
                    :required="true"
                >
                    <veui-field
                        field="phoneType"
                        name="phoneType"
                    >
                        <veui-select
                            v-model="storeData4.phoneType"
                            :options="storeData4Options.phoneTypeOptions"
                        />
                    </veui-field>

                    <veui-field
                        style="margin-left: 4px;"
                        field="phone"
                        name="phone"
                        :rules="numRequiredRule"
                    >
                        <veui-input v-model="storeData4.phone"/>
                    </veui-field>
                </veui-fieldset>

                <veui-field
                    field="hobby"
                    name="hobby"
                    :rules="hobbyRule"
                    label="爱好"
                    tip="选择则至少选三个"
                >
                    <veui-checkboxgroup
                        v-model="storeData4.hobby"
                        type="checkbox"
                        :items="storeData4Options.hobbyItems"
                    />
                </veui-field>

                <veui-fieldset
                    label="预期收入"
                    class="salary"
                    tip="联合校验，下限必须小于上限"
                    :required="true"
                >
                    <veui-field
                        field="start"
                        name="start"
                        :rules="numRequiredRule"
                        class="start-field"
                    >
                        <veui-input v-model="storeData4.start"/>
                    </veui-field>
                    <veui-span style="margin: 0 4px;">-</veui-span>
                    <veui-field
                        field="end"
                        name="end"
                        :rules="numRequiredRule"
                    >
                        <veui-input v-model="storeData4.end"/>
                    </veui-field>
                    <veui-span>万</veui-span>
                </veui-fieldset>

                <veui-field
                    label="收入下限"
                    field="floor"
                    name="floor"
                    :rules="[
                        { name: 'required', value: true },
                        { name: 'min', value: 3500, message: '最低收入不小于 3500' }
                    ]"
                >
                    <veui-number-input v-model="storeData4.floor"/>
                </veui-field>

                <veui-field
                    field="protocol"
                    name="protocol"
                    :rules="protocolRequiredRule"
                    label="协议"
                >
                    <veui-checkbox
                        v-model="storeData4.protocol"
                        false-value
                    >我已阅读并同意工作协议</veui-checkbox>
                </veui-field>

                <template slot="actions">
                    <veui-button
                        ui="primary"
                        :loading="isValidating"
                        type="submit"
                    >提交</veui-button>
                    <veui-button
                        :disabled="isValidating"
                        @click="() => this.$refs.form2.reset()"
                    >重置</veui-button>
                </template>
            </veui-form>
        </section>
        <section>
            <h2>动态表单</h2>
            <veui-form
                ui="m"
                :data="storeData5"
                :validators="qindianValidator"
                :before-validate="beforeValidate"
                :after-validate="afterValidate"
                @submit="submit"
                @invalid="handleInvalid"
            >
                <veui-field
                    ui="few"
                    field="qindian"
                    label="负责人"
                    name="qindian"
                >
                    <veui-input v-model="storeData5.qindian"/>
                </veui-field>

                <veui-fieldset
                    ui="few"
                    v-for="(item, index) in storeData5.scheduleInfo"
                    :key="index"
                    :required="true"
                    :label="`项目排期-${index + 1}`"
                >
                    <veui-field
                        :field="`scheduleInfo[${index}].project`"
                        :name="'projectName' + (index + 1)"
                        :rules="requiredRule"
                    >
                        <veui-input
                            v-model="item.project"
                            placeholder="项目名称"
                        />
                    </veui-field>
                    <veui-field
                        style="margin-left: 4px;"
                        :field="`scheduleInfo[${index}].range`"
                        :name="`schedule${index + 1}`"
                        :rules="requiredRule"
                    >
                        <veui-datepicker
                            v-model="item.range"
                            range
                        />
                    </veui-field>
                    <veui-button
                        style="margin-left: 4px;"
                        @click="dynamicDelete(index)"
                    >删除</veui-button>
                </veui-fieldset>

                <template #actions>
                    <veui-button
                        ui="primary"
                        :loading="isValidating"
                        type="submit"
                    >提交</veui-button>
                    <veui-button @click="dynamicAdd">新增项目及排期</veui-button>
                </template>
            </veui-form>
        </section>
    </article>
</template>

<script>
import {
    Form,
    Fieldset,
    Field,
    Span,
    Input,
    Button,
    DatePicker,
    Uploader,
    Select,
    Textarea,
    Checkbox,
    CheckboxGroup,
    RadioGroup,
    NumberInput
} from 'veui';
import moment from 'moment';
import bus from '../bus';
import 'vue-awesome/icons/indent';

export default {
    name: 'demo-form',

    components: {
        'veui-span': Span,
        'veui-input': Input,
        'veui-number-input': NumberInput,
        'veui-button': Button,
        'veui-form': Form,
        'veui-fieldset': Fieldset,
        'veui-field': Field,
        'veui-datepicker': DatePicker,
        'veui-uploader': Uploader,
        'veui-select': Select,
        'veui-checkbox': Checkbox,
        'veui-checkboxgroup': CheckboxGroup,
        'veui-radiogroup': RadioGroup,
        'veui-textarea': Textarea
    },

    data() {
        let hobby = ['🏸'];
        let hobbyItems = [
            {
                value: '⚽️',
                label: '足球'
            },
            {
                value: '🏀',
                label: '篮球'
            },
            {
                value: '🏸',
                label: '羽毛球'
            },
            {
                value: '🎾',
                label: '网球'
            }
        ];
        let phoneType = 'mobile';
        let phoneTypeOptions = [
            {
                label: '座机',
                value: 'phone'
            },
            {
                label: '手机',
                value: 'mobile'
            }
        ];
        return {
            demoData: [
                {
                    label: '特殊情况[ui=special]',
                    ui: 'special'
                },
                {
                    label: '文字不长[ui=few]',
                    ui: 'few'
                },
                {
                    label: '字段较多时[ui=long]',
                    ui: 'long'
                }
            ],
            storeData1: {
                nickName: '李云腾',
                sex: '女',
                married: false,
                marryItems: [
                    {
                        value: true,
                        label: '已婚'
                    },
                    {
                        value: false,
                        label: '未婚'
                    }
                ],
                sexItems: [
                    {
                        value: '-',
                        label: '不告诉你'
                    },
                    {
                        value: '男',
                        label: '男'
                    },
                    {
                        value: '女',
                        label: '女'
                    }
                ],
                hobby,
                hobbyItems,
                birthday: new Date(),
                avatar: 'https://www.baidu.com/img/bd_logo1.png'
            },
            storeData2: {
                lastName: '',
                firstName: '',
                hobby,
                hobbyItems,
                phone: '18888888888',
                phoneType,
                phoneTypeOptions,
                start: null,
                end: null,
                salary: [2, 5]
            },
            storeData3: {
                statusSelected: 1,
                statusOptions: [
                    {
                        label: '状态1',
                        value: 1
                    },
                    {
                        label: '状态2',
                        value: 2
                    },
                    {
                        label: '状态3',
                        value: 3
                    },
                    {
                        label: '状态4',
                        value: 4
                    }
                ],
                range: [
                    moment().toDate(),
                    moment()
                        .add(3, 'month')
                        .toDate()
                ]
            },
            storeData4: {
                name: 'liyunteng1',
                name1: 'liyunteng2',
                age: null,
                desc: '',
                hobby,
                phone: '18888888888',
                phoneType,
                start: null,
                end: null,
                protocol: '',
                floor: 3500
            },
            storeData4Options: {
                hobbyItems,
                phoneTypeOptions
            },
            requiredRule: [
                {
                    name: 'required',
                    value: true,
                    triggers: 'blur,input'
                }
            ],
            numRequiredRule: [
                {
                    name: 'numeric',
                    value: true,
                    triggers: 'blur,input'
                },
                {
                    name: 'required',
                    value: true,
                    triggers: 'blur,input'
                }
            ],
            protocolRequiredRule: [
                {
                    name: 'required',
                    value: true,
                    message: '请勾选阅读协议',
                    triggers: 'change'
                }
            ],
            dynamicNameRule: [
                {
                    name: 'required',
                    value: true,
                    triggers: 'blur,input'
                },
                {
                    name: 'minLength',
                    value: 2
                }
            ],
            ageRule: [
                {
                    name: 'required',
                    value: true,
                    triggers: 'input'
                },
                {
                    name: 'numeric',
                    value: true,
                    triggers: 'input'
                },
                {
                    name: 'maxLength',
                    value: 3,
                    triggers: 'change'
                }
            ],
            hobbyRule: [
                {
                    name: 'minLength',
                    value: 3,
                    message: '至少选择三个爱好',
                    triggers: 'change'
                }
            ],
            isValidating: false,
            validators: [
                {
                    fields: ['start', 'end'],
                    handler(start, end) {
                        if (start == null || end == null) {
                            return true;
                        }

                        if (parseInt(start, 10) >= parseInt(end, 10)) {
                            return {
                                start: '下限必须小于上限'
                            };
                        }
                        return true;
                    },
                    triggers: ['change', 'submit,input']
                },
                {
                    fields: ['phone'],
                    validate(phone) {
                        return new Promise(function (resolve) {
                            setTimeout(function () {
                                let res;
                                if (phone === '18888888888') {
                                    res = {
                                        phone: '该手机已被注册'
                                    };
                                }
                                return resolve(res);
                            }, 3000);
                        });
                    },
                    triggers: ['input']
                }
            ],
            beforeValidate() {
                bus.$emit('log', 'beforeValidate');
                this.isValidating = true;
            },
            afterValidate() {
                bus.$emit('log', 'afterValidate');
                this.isValidating = false;
            },
            storeData5: {
                qindian: 'Evan You',
                scheduleInfo: [
                    {
                        project: 'vuejs',
                        range: [
                            moment().toDate(),
                            moment()
                                .add(3, 'month')
                                .toDate()
                        ]
                    }
                ]
            },
            qindianValidator: [
                {
                    // 冗余写法示范，仅仅不会出错，请不要这么使用
                    // 可以将 submit 换成更有意义的事件
                    fields: ['qindian', 'qindian'],
                    handler(qindian) {
                        if (qindian !== 'Evan You') {
                            return {
                                qindian: '该项为钦点项，就别改了'
                            };
                        }
                        return true;
                    },
                    triggers: ['input', 'submit']
                }
            ]
        };
    },

    methods: {
        handleInvalid(e) {
            bus.$emit('log', 'handleInvalid', e);
            this.isValidating = false;
        },
        submit(data, e) {
            bus.$emit('log', 'submit', data, e);
        },
        dynamicAdd() {
            this.storeData5.scheduleInfo.push({
                project: null,
                range: null
            });
        },
        dynamicDelete(index) {
            this.storeData5.scheduleInfo.splice(index, 1);
        }
    }
};
</script>

<style lang="less">
.veui-form-demo {

  section + section {
    margin-top: 50px;
  }

  margin-bottom: 50px;

  .veui-form[ui~="inline"] + .veui-form[ui~="inline"] {
    margin-top: 30px;
  }

  .left {
    float: left;
  }

  .right {
    float: right;
  }

  .output {
    position: absolute;
    display: inline-block;
    left: 560px;
    line-height: 36px;
    margin: 0 0 0 50px;

    &::before {
      position: absolute;
      left: -80px;
      content: "⇒";
      line-height: 32px;
      font-size: 30px;
      color: #999;
    }
  }

  .two-name {
    .veui-input {
      width: 75px;
    }
  }

  .salary {
    .veui-input {
      width: 67px;
    }
  }

  .start-field {
    .veui-field-error:first-of-type {
      overflow: hidden;
      text-overflow: ellipsis;
      width: 80px;
      white-space: nowrap;
    }
  }

  .operation {
    margin-top: 60px;
    margin-left: 120px;

    [class*="veui"] {
      margin-left: 10px;
    }

    [class*="veui"]:first-child {
      margin-left: 0;
    }
  }
}
</style>
