<template>
  <article class="veui-form-demo">
    <h1><code>&lt;veui-form&gt;</code></h1>
    <section>
      <h2>通过指定data、field及v-model来创建一个form</h2>
      <veui-form ref="form1" :data="storeData1">
        <p>
          <span class="veui-font-level-1b">默认字段尺寸(仅标题宽度)：</span>
          <span class="veui-font-level-2d">不传尺寸ui</span>
        </p>
        <veui-field label="昵称：" field="nickName" ui="require">
          <veui-input v-model="storeData1.nickName"/>
        </veui-field>

        <veui-field label="性别：" field="sex" ui="require">
          <veui-select :options="storeData1.sexItems" v-model="storeData1.sex"/>
        </veui-field>

        <p>
          <span class="veui-font-level-1b">小尺寸标题(仅标题宽度)：</span>
          <span class="veui-font-level-2d">ui="small-title"</span>
        </p>

        <veui-field label="婚姻：" field="married" ui="require small-title">
          <veui-radiogroup ui="small" :items="storeData1.marryItems" v-model="storeData1.married"/>
        </veui-field>

        <veui-field label="爱好：" field="hobby" ui="require small-title">
          <veui-checkboxgroup type="checkbox" ui="small" :items="storeData1.hobbyItems" v-model="storeData1.hobby"/>
        </veui-field>

        <veui-field label="生日：" field="birthday" ui="require  small-title">
          <veui-datepicker v-model="storeData1.birthday"/>
        </veui-field>

        <p>
          <span class="veui-font-level-1b">大尺寸标题(仅标题宽度)：</span>
          <span class="veui-font-level-2d">ui="large-title"</span>
        </p>

        <veui-field label="昵称：" field="nickName" ui="large-title">
          <veui-input v-model="storeData1.nickName"/>
        </veui-field>

        <veui-field label="性别：" field="sex" ui="large-title">
          <veui-select :options="storeData1.sexItems" v-model="storeData1.sex"/>
        </veui-field>

        <veui-field label="婚姻：" field="married" ui="large-title">
          <veui-radiogroup ui="small" :items="storeData1.marryItems" v-model="storeData1.married"/>
        </veui-field>

        <veui-field label="爱好：" field="hobby">
          <veui-checkboxgroup type="checkbox" ui="small" :items="storeData1.hobbyItems" v-model="storeData1.hobby"/>
        </veui-field>

        <veui-field label="生日：" field="birthday">
          <veui-datepicker v-model="storeData1.birthday"/>
        </veui-field>

        <veui-field label="地区：" field="regions">
          <veui-region-picker :datasource="regions" v-model="storeData1.regions"/>
        </veui-field>

        <veui-field label="头像：" field="avatar">
          <veui-uploader type="image"
            action="/upload"
            request-mode="xhr"
            ui="vertical"
            :disabled="false"
            :max-count="1"
            v-model="storeData1.avatar"
            max-size="10mb"
            accept=".jpg,.jpeg,.png"/>
        </veui-field>

        <div class="operation">
          <veui-button type="reset">重置</veui-button>
        </div>
      </veui-form>
    </section>
    <section>
      <h2>行内多组件表单</h2>
      <veui-form>

        <veui-fieldset ui="large" class="two-name" label="姓名：">
          <veui-field>
            <veui-input ui="large" placeholder="姓" v-model="storeData2.lastName"/>
          </veui-field>

          <veui-field>
            <veui-input ui="large" placeholder="名" v-model="storeData2.firstName"/>
          </veui-field>
        </veui-fieldset>

        <veui-fieldset label="电话：">
          <veui-field>
            <veui-select v-model="storeData2.phoneType" :options="storeData2.phoneTypeOptions"/>
          </veui-field>

          <veui-field>
            <veui-input placeholder="名" v-model="storeData2.phone"/>
          </veui-field>
        </veui-fieldset>

        <veui-fieldset class="salary">
          <template slot="label">
            <veui-label>预期收入：</veui-label> <veui-icon name="money-bill-alt"/>
          </template>
          <veui-field>
            <veui-input v-model="storeData2.start"/>
          </veui-field>
          <veui-span>-</veui-span>
          <veui-field>
            <veui-input v-model="storeData2.end"/>
          </veui-field>
          <veui-span>万</veui-span>
          <template slot="tip">
            <veui-icon name="indent"/> 使用 &lt;veui-span&gt; 来插入中间非组件内容
          </template>
        </veui-fieldset>
        <veui-fieldset label="预期收入：">
          <veui-field field="salary" name="salary">
            <veui-slider v-model="storeData2.salary" :min="1" :max="10" :step="0.5"/>
          </veui-field>
          <veui-span>{{storeData2.salary[0].toFixed(1)}}~{{storeData2.salary[1].toFixed(1)}}万</veui-span>
        </veui-fieldset>
      </veui-form>
    </section>
    <section>
      <h2>行内表单</h2>
      <veui-form ui="inline">

        <veui-fieldset class="left">
          <veui-field label="状态：">
            <veui-select v-model="storeData3.statusSelected" :options="storeData3.statusOptions"/>
          </veui-field>

          <veui-field label="时间：">
            <veui-datepicker range v-model="storeData3.range"/>
          </veui-field>
        </veui-fieldset>

        <veui-fieldset class="right">
          <veui-field>
            <veui-searchbox placeholder="请输入搜索内容"/>
          </veui-field>
        </veui-fieldset>

      </veui-form>

      <veui-form ui="inline">

        <veui-fieldset class="left" ui="alt">
          <veui-field label="状态：">
            <veui-select ui="alt" v-model="storeData3.statusSelected" :options="storeData3.statusOptions"/>
          </veui-field>

          <veui-field label="时间：">
            <veui-datepicker range ui="alt" v-model="storeData3.range"/>
          </veui-field>
        </veui-fieldset>

        <veui-fieldset class="right">
          <veui-field>
            <veui-searchbox ui="alt" placeholder="请输入搜索内容"/>
          </veui-field>
        </veui-fieldset>

      </veui-form>
    </section>
    <section>
      <h2>表单的禁用或只读</h2>
      <veui-form disabled :data="storeData1">

        <veui-field label="昵称：" field="nickName">
          <veui-input v-model="storeData1.nickName"/>
        </veui-field>

        <veui-field label="性别：" field="sex">
          <veui-select :options="storeData1.sexItems" v-model="storeData1.sex"/>
        </veui-field>

        <veui-field label="婚姻：" field="married">
          <veui-radiogroup :items="storeData1.marryItems" v-model="storeData1.married"/>
        </veui-field>

        <veui-field label="爱好：" field="hobby">
          <veui-checkboxgroup ui="small" type="checkbox" :items="storeData1.hobbyItems" v-model="storeData1.hobby"/>
        </veui-field>

        <veui-field label="生日：" field="birthday">
          <veui-datepicker v-model="storeData1.birthday"/>
        </veui-field>

        <veui-field label="头像：" field="avatar">
          <veui-uploader type="image"
            action="/upload"
            request-mode="xhr"
            ui="vertical"
            :disabled="false"
            :max-count="1"
            v-model="storeData1.avatar"
            max-size="10mb"
            accept=".jpg,.jpeg,.png"/>
        </veui-field>
      </veui-form>
      <h2>行内禁用或只读</h2>
      <veui-form>
        <veui-fieldset disabled class="two-name" label="姓名：">
          <veui-field>
            <veui-input placeholder="姓" v-model="storeData2.lastName"/>
          </veui-field>

          <veui-field>
            <veui-input placeholder="名" v-model="storeData2.firstName"/>
          </veui-field>
        </veui-fieldset>

        <veui-fieldset label="电话：">
          <veui-field>
            <veui-select v-model="storeData2.phoneType" :options="storeData2.phoneTypeOptions"/>
          </veui-field>

          <veui-field readonly>
            <veui-input placeholder="名" v-model="storeData2.phone"/>
          </veui-field>
        </veui-fieldset>

        <veui-fieldset class="salary" tip="使用 <veui-span> 来插入中间非组件内容">
          <template slot="label">
            <veui-label>预期收入：</veui-label>💰
          </template>
          <veui-field>
            <veui-input v-model="storeData2.start"/>
          </veui-field>
          <veui-span>-</veui-span>
          <veui-field>
            <veui-input disabled v-model="storeData2.end"/>
          </veui-field>
          <veui-span>万</veui-span>
        </veui-fieldset>

        <veui-field field="protocol" name="protocol" label="协议：">
          <veui-radio ui="small" :checked="false">我已阅读并同意工作协议</veui-radio>
        </veui-field>
      </veui-form>
    </section>
    <section>
      <h2>使用 field 来支持表单验证，使用 name 来定位验证提示</h2>
      <veui-form
        ref="form2"
        @submit="submit"
        @invalid="handleInvalid"
        :readonly="isValidating"
        :data="storeData4"
        :validators="validators"
        :beforeValidate="beforeValidate"
        :afterValidate="afterValidate">

        <veui-field disabled field="name" name="name1" label="姓名：" tip="disabled 值提交时会过滤">
          <veui-input v-model="storeData4.name"/>
        </veui-field>

        <veui-field field="name1" name="name2" label="姓名1：" tip="在 field 上边 disabled，提交时才会过滤掉，该项在 input 上 disalbed">
          <veui-input disabled placeholder="长度不能短于2" v-model="storeData4.name1"/>
        </veui-field>

        <veui-field field="age" name="age1" :rules="ageRule" label="年龄：">
          <veui-input placeholder="错误提示优先出在右侧, 长度不能超过3" v-model="storeData4.age"/>
        </veui-field>

        <veui-field field="desc" name="desc" rules="required" label="介绍：">
          <veui-textarea rows="3" v-model="storeData4.desc"/>
        </veui-field>

        <veui-fieldset name="phoneSet" label="电话：" :required="true">
          <veui-field field="phoneType" name="phoneType">
            <veui-select v-model="storeData4.phoneType" :options="storeData4Options.phoneTypeOptions"/>
          </veui-field>

          <veui-field field="phone" name="phone" :rules="numRequiredRule">
            <veui-input v-model="storeData4.phone"/>
          </veui-field>
        </veui-fieldset>

        <veui-field field="hobby" name="hobby" :rules="hobbyRule" label="爱好：" tip="选择则至少选三个">
          <veui-checkboxgroup type="checkbox" :items="storeData4Options.hobbyItems" v-model="storeData4.hobby"/>
        </veui-field>

        <veui-fieldset label="预期收入：" class="salary" tip="联合校验，下限必须小于上限" :required="true">
          <veui-field field="start" name="start" :rules="numRequiredRule" class="start-field">
            <veui-input v-model="storeData4.start"/>
          </veui-field>
          <veui-span>-</veui-span>
          <veui-field field="end" name="end" :rules="numRequiredRule">
            <veui-input v-model="storeData4.end"/>
          </veui-field>
          <veui-span>万</veui-span>
        </veui-fieldset>
        <veui-field label="收入下限：" field="floor" name="floor" :rules="[
          {name: 'required', value: true},
          {name: 'min', value: 3500, message: '最低收入不小于 3500'}
        ]">
          <veui-number-input v-model="storeData4.floor"/>
        </veui-field>

        <veui-field field="protocol" name="protocol" :rules="protocolRequiredRule" label="协议：">
          <veui-checkbox falseValue="" v-model="storeData4.protocol">我已阅读并同意工作协议</veui-checkbox>
        </veui-field>

        <div class="operation">
          <veui-button ui="primary" :loading="isValidating" type="submit">提交</veui-button>
          <veui-button @click="() => this.$refs.form2.reset()" :loading="isValidating">重置</veui-button>
        </div>
      </veui-form>
    </section>
    <section>
      <h2>动态表单</h2>
      <veui-form
        @submit="submit"
        @invalid="handleInvalid"
        :data="storeData5"
        :validators="qindianValidator"
        :beforeValidate="beforeValidate"
        :afterValidate="afterValidate">

        <veui-field field="qindian" label="负责人：" name="qindian">
          <veui-input v-model="storeData5.qindian"/>
        </veui-field>

        <veui-fieldset v-for="(item, index) in storeData5.scheduleInfo" :key="index" :required="true" :label="`项目排期-${index + 1}：`">
          <veui-field
            :field="`scheduleInfo[${index}].project`"
            :name="'projectName' + (index + 1)"
            :rules="requiredRule">
            <veui-input placeholder="项目名称" v-model="item.project"/>
          </veui-field>
          <veui-field
            :field="`scheduleInfo[${index}].range`"
            :name="`schedule${index + 1}`"
            :rules="requiredRule">
            <veui-datepicker v-model="item.range" range/>
          </veui-field>
          <veui-button @click="dynamicDelete(index)">删除</veui-button>
        </veui-fieldset>

        <div class="operation">
          <veui-button ui="primary" :loading="isValidating" type="submit">提交</veui-button>
          <veui-button @click="dynamicAdd">新增项目及排期</veui-button>
        </div>
      </veui-form>
    </section>
  </article>
</template>

<script>
import {
  Form, Fieldset, Field, Label, Span, Input,
  Button, DatePicker, Uploader, Select, Textarea,
  Checkbox, CheckboxGroup, RadioGroup, Searchbox,
  RegionPicker, Radio, Icon, Slider, NumberInput
} from 'veui';
import moment from 'moment';
import bus from '../bus';
import 'vue-awesome/icons/money-bill-alt';
import 'vue-awesome/icons/indent';

const REGIONS_BRAND = [
    {
        id: '10000',
        label: '中国',
        children: [
            {
                id: '1000',
                label: '华北地区',
                children: [
                    {
                        id: '1',
                        label: '北京',
                        children: [
                        {
                            id: '378',
                            label: '东城'
                        },
                        {
                            id: '379',
                            label: '西城'
                        },
                        {
                            id: '380',
                            label: '崇文'
                        },
                        {
                            id: '381',
                            label: '宣武'
                        },
                        {
                            id: '382',
                            label: '朝阳'
                        },
                        {
                            id: '383',
                            label: '丰台'
                        },
                        {
                            id: '384',
                            label: '石景山'
                        },
                        {
                            id: '385',
                            label: '海淀'
                        },
                        {
                            id: '386',
                            label: '门头沟'
                        },
                        {
                            id: '387',
                            label: '房山'
                        },
                        {
                            id: '388',
                            label: '通州'
                        },
                        {
                            id: '389',
                            label: '顺义'
                        },
                        {
                            id: '390',
                            label: '昌平'
                        },
                        {
                            id: '391',
                            label: '大兴'
                        },
                        {
                            id: '392',
                            label: '怀柔'
                        },
                        {
                            id: '393',
                            label: '平谷'
                        },
                        {
                            id: '394',
                            label: '密云'
                        },
                        {
                            id: '395',
                            label: '延庆'
                        }
                    ]
                    },
                    {
                        id: '3',
                        label: '天津',
                        children: [
                        {
                            id: '415',
                            label: '和平'
                        },
                        {
                            id: '416',
                            label: '河东'
                        },
                        {
                            id: '417',
                            label: '河西'
                        },
                        {
                            id: '418',
                            label: '南开'
                        },
                        {
                            id: '419',
                            label: '河北'
                        },
                        {
                            id: '420',
                            label: '红桥'
                        },
                        {
                            id: '421',
                            label: '塘沽'
                        },
                        {
                            id: '422',
                            label: '汉沽'
                        },
                        {
                            id: '423',
                            label: '大港'
                        },
                        {
                            id: '424',
                            label: '东丽'
                        },
                        {
                            id: '425',
                            label: '西青'
                        },
                        {
                            id: '426',
                            label: '津南'
                        },
                        {
                            id: '427',
                            label: '北辰'
                        },
                        {
                            id: '428',
                            label: '武清'
                        },
                        {
                            id: '429',
                            label: '宝坻'
                        },
                        {
                            id: '430',
                            label: '宁河'
                        },
                        {
                            id: '431',
                            label: '静海'
                        },
                        {
                            id: '432',
                            label: '蓟县'
                        },
                        {
                            id: '475',
                            label: '滨海'
                        }
                    ]
                    },
                    {
                        id: '13',
                        label: '河北',
                        children: [
                        {
                            id: '304',
                            label: '保定'
                        },
                        {
                            id: '305',
                            label: '沧州'
                        },
                        {
                            id: '306',
                            label: '承德'
                        },
                        {
                            id: '307',
                            label: '廊坊'
                        },
                        {
                            id: '325',
                            label: '秦皇岛'
                        },
                        {
                            id: '326',
                            label: '邢台'
                        },
                        {
                            id: '327',
                            label: '石家庄'
                        },
                        {
                            id: '329',
                            label: '唐山'
                        },
                        {
                            id: '330',
                            label: '邯郸'
                        },
                        {
                            id: '331',
                            label: '张家口'
                        },
                        {
                            id: '332',
                            label: '衡水'
                        }
                    ]
                    },
                    {
                        id: '22',
                        label: '内蒙古',
                        children: [
                        {
                            id: '158',
                            label: '赤峰'
                        },
                        {
                            id: '159',
                            label: '阿拉善盟'
                        },
                        {
                            id: '160',
                            label: '兴安盟'
                        },
                        {
                            id: '161',
                            label: '通辽'
                        },
                        {
                            id: '162',
                            label: '巴彦淖尔'
                        },
                        {
                            id: '163',
                            label: '乌兰察布'
                        },
                        {
                            id: '164',
                            label: '乌海'
                        },
                        {
                            id: '165',
                            label: '锡林郭勒盟'
                        },
                        {
                            id: '166',
                            label: '呼伦贝尔'
                        },
                        {
                            id: '167',
                            label: '呼和浩特'
                        },
                        {
                            id: '168',
                            label: '鄂尔多斯'
                        },
                        {
                            id: '169',
                            label: '包头'
                        }
                    ]
                    },
                    {
                        id: '26',
                        label: '山西',
                        children: [
                        {
                            id: '205',
                            label: '晋城'
                        },
                        {
                            id: '206',
                            label: '晋中'
                        },
                        {
                            id: '209',
                            label: '长治'
                        },
                        {
                            id: '210',
                            label: '吕梁'
                        },
                        {
                            id: '211',
                            label: '临汾'
                        },
                        {
                            id: '212',
                            label: '忻州'
                        },
                        {
                            id: '213',
                            label: '朔州'
                        },
                        {
                            id: '214',
                            label: '太原'
                        },
                        {
                            id: '215',
                            label: '阳泉'
                        },
                        {
                            id: '216',
                            label: '运城'
                        },
                        {
                            id: '217',
                            label: '大同'
                        }
                    ]
                    }
                ]
            },
            {
                id: '1001',
                label: '东北地区',
                children: [
                    {
                        id: '15',
                        label: '黑龙江',
                        children: [
                        {
                            id: '333',
                            label: '鸡西'
                        },
                        {
                            id: '334',
                            label: '佳木斯'
                        },
                        {
                            id: '335',
                            label: '哈尔滨'
                        },
                        {
                            id: '336',
                            label: '牡丹江'
                        },
                        {
                            id: '337',
                            label: '齐齐哈尔'
                        },
                        {
                            id: '338',
                            label: '七台河'
                        },
                        {
                            id: '339',
                            label: '绥化'
                        },
                        {
                            id: '340',
                            label: '双鸭山'
                        },
                        {
                            id: '341',
                            label: '伊春'
                        },
                        {
                            id: '342',
                            label: '大庆'
                        },
                        {
                            id: '343',
                            label: '大兴安岭'
                        },
                        {
                            id: '344',
                            label: '鹤岗'
                        },
                        {
                            id: '345',
                            label: '黑河'
                        }
                    ]
                    },
                    {
                        id: '18',
                        label: '吉林',
                        children: [
                        {
                            id: '38',
                            label: '吉林'
                        },
                        {
                            id: '39',
                            label: '白城'
                        },
                        {
                            id: '40',
                            label: '长春'
                        },
                        {
                            id: '41',
                            label: '辽源'
                        },
                        {
                            id: '42',
                            label: '白山'
                        },
                        {
                            id: '43',
                            label: '四平'
                        },
                        {
                            id: '44',
                            label: '松原'
                        },
                        {
                            id: '45',
                            label: '通化'
                        },
                        {
                            id: '46',
                            label: '延吉'
                        },
                        {
                            id: '47',
                            label: '延边'
                        }
                    ]
                    },
                    {
                        id: '21',
                        label: '辽宁',
                        children: [
                        {
                            id: '144',
                            label: '丹东'
                        },
                        {
                            id: '145',
                            label: '本溪'
                        },
                        {
                            id: '146',
                            label: '锦州'
                        },
                        {
                            id: '147',
                            label: '朝阳'
                        },
                        {
                            id: '148',
                            label: '辽阳'
                        },
                        {
                            id: '149',
                            label: '盘锦'
                        },
                        {
                            id: '150',
                            label: '阜新'
                        },
                        {
                            id: '151',
                            label: '鞍山'
                        },
                        {
                            id: '152',
                            label: '抚顺'
                        },
                        {
                            id: '153',
                            label: '沈阳'
                        },
                        {
                            id: '154',
                            label: '铁岭'
                        },
                        {
                            id: '155',
                            label: '大连'
                        },
                        {
                            id: '156',
                            label: '营口'
                        },
                        {
                            id: '157',
                            label: '葫芦岛'
                        }
                    ]
                    }
                ]
            },
            {
                id: '1002',
                label: '华东地区',
                children: [
                    {
                        id: '2',
                        label: '上海',
                        children: [
                        {
                            id: '396',
                            label: '黄浦'
                        },
                        {
                            id: '397',
                            label: '卢湾'
                        },
                        {
                            id: '398',
                            label: '徐汇'
                        },
                        {
                            id: '399',
                            label: '长宁'
                        },
                        {
                            id: '400',
                            label: '静安'
                        },
                        {
                            id: '401',
                            label: '普陀'
                        },
                        {
                            id: '402',
                            label: '闸北'
                        },
                        {
                            id: '403',
                            label: '虹口'
                        },
                        {
                            id: '404',
                            label: '杨浦'
                        },
                        {
                            id: '405',
                            label: '闵行'
                        },
                        {
                            id: '406',
                            label: '宝山'
                        },
                        {
                            id: '407',
                            label: '嘉定'
                        },
                        {
                            id: '408',
                            label: '浦东'
                        },
                        {
                            id: '409',
                            label: '金山'
                        },
                        {
                            id: '410',
                            label: '松江'
                        },
                        {
                            id: '411',
                            label: '青浦'
                        },
                        {
                            id: '412',
                            label: '南汇'
                        },
                        {
                            id: '413',
                            label: '奉贤'
                        },
                        {
                            id: '414',
                            label: '崇明'
                        }
                    ]
                    },
                    {
                        id: '9',
                        label: '安徽',
                        children: [
                        {
                            id: '127',
                            label: '淮北'
                        },
                        {
                            id: '128',
                            label: '安庆'
                        },
                        {
                            id: '129',
                            label: '巢湖'
                        },
                        {
                            id: '130',
                            label: '池州'
                        },
                        {
                            id: '131',
                            label: '滁州'
                        },
                        {
                            id: '132',
                            label: '黄山'
                        },
                        {
                            id: '133',
                            label: '淮南'
                        },
                        {
                            id: '134',
                            label: '马鞍山'
                        },
                        {
                            id: '135',
                            label: '六安'
                        },
                        {
                            id: '136',
                            label: '宣城'
                        },
                        {
                            id: '137',
                            label: '宿州'
                        },
                        {
                            id: '138',
                            label: '铜陵'
                        },
                        {
                            id: '139',
                            label: '芜湖'
                        },
                        {
                            id: '140',
                            label: '阜阳'
                        },
                        {
                            id: '141',
                            label: '蚌埠'
                        },
                        {
                            id: '142',
                            label: '合肥'
                        },
                        {
                            id: '143',
                            label: '亳州'
                        }
                    ]
                    },
                    {
                        id: '5',
                        label: '福建',
                        children: [
                        {
                            id: '48',
                            label: '莆田'
                        },
                        {
                            id: '49',
                            label: '南平'
                        },
                        {
                            id: '50',
                            label: '龙岩'
                        },
                        {
                            id: '51',
                            label: '宁德'
                        },
                        {
                            id: '52',
                            label: '泉州'
                        },
                        {
                            id: '66',
                            label: '三明'
                        },
                        {
                            id: '70',
                            label: '厦门'
                        },
                        {
                            id: '80',
                            label: '漳州'
                        },
                        {
                            id: '81',
                            label: '福州'
                        }
                    ]
                    },
                    {
                        id: '19',
                        label: '江苏',
                        children: [
                        {
                            id: '53',
                            label: '淮安'
                        },
                        {
                            id: '54',
                            label: '常州'
                        },
                        {
                            id: '55',
                            label: '南京'
                        },
                        {
                            id: '56',
                            label: '南通'
                        },
                        {
                            id: '57',
                            label: '连云港'
                        },
                        {
                            id: '58',
                            label: '徐州'
                        },
                        {
                            id: '59',
                            label: '苏州'
                        },
                        {
                            id: '60',
                            label: '宿迁'
                        },
                        {
                            id: '61',
                            label: '泰州'
                        },
                        {
                            id: '62',
                            label: '无锡'
                        },
                        {
                            id: '63',
                            label: '盐城'
                        },
                        {
                            id: '64',
                            label: '扬州'
                        }
                    ]
                    },
                    {
                        id: '20',
                        label: '江西',
                        children: [
                        {
                            id: '67',
                            label: '九江'
                        },
                        {
                            id: '68',
                            label: '吉安'
                        },
                        {
                            id: '69',
                            label: '景德镇'
                        },
                        {
                            id: '71',
                            label: '萍乡'
                        },
                        {
                            id: '72',
                            label: '南昌'
                        },
                        {
                            id: '73',
                            label: '新余'
                        },
                        {
                            id: '74',
                            label: '上饶'
                        },
                        {
                            id: '75',
                            label: '宜春'
                        },
                        {
                            id: '76',
                            label: '鹰潭'
                        },
                        {
                            id: '77',
                            label: '赣州'
                        },
                        {
                            id: '78',
                            label: '抚州'
                        }
                    ]
                    },
                    {
                        id: '25',
                        label: '山东',
                        children: [
                        {
                            id: '196',
                            label: '济南'
                        },
                        {
                            id: '197',
                            label: '济宁'
                        },
                        {
                            id: '198',
                            label: '莱芜'
                        },
                        {
                            id: '199',
                            label: '聊城'
                        },
                        {
                            id: '200',
                            label: '德州'
                        },
                        {
                            id: '201',
                            label: '临沂'
                        },
                        {
                            id: '202',
                            label: '青岛'
                        },
                        {
                            id: '203',
                            label: '日照'
                        },
                        {
                            id: '204',
                            label: '潍坊'
                        },
                        {
                            id: '207',
                            label: '淄博'
                        },
                        {
                            id: '208',
                            label: '泰安'
                        },
                        {
                            id: '218',
                            label: '威海'
                        },
                        {
                            id: '219',
                            label: '烟台'
                        },
                        {
                            id: '220',
                            label: '东营'
                        },
                        {
                            id: '221',
                            label: '枣庄'
                        },
                        {
                            id: '222',
                            label: '菏泽'
                        },
                        {
                            id: '223',
                            label: '滨州'
                        }
                    ]
                    },
                    {
                        id: '32',
                        label: '浙江',
                        children: [
                        {
                            id: '272',
                            label: '金华'
                        },
                        {
                            id: '273',
                            label: '嘉兴'
                        },
                        {
                            id: '274',
                            label: '衢州'
                        },
                        {
                            id: '275',
                            label: '丽水'
                        },
                        {
                            id: '276',
                            label: '宁波'
                        },
                        {
                            id: '277',
                            label: '绍兴'
                        },
                        {
                            id: '278',
                            label: '温州'
                        },
                        {
                            id: '279',
                            label: '台州'
                        },
                        {
                            id: '280',
                            label: '杭州'
                        },
                        {
                            id: '281',
                            label: '舟山'
                        },
                        {
                            id: '282',
                            label: '湖州'
                        }
                    ]
                    }
                ]
            },
            {
                id: '1003',
                label: '华中地区',
                children: [
                    {
                        id: '14',
                        label: '河南',
                        children: [
                        {
                            id: '308',
                            label: '焦作'
                        },
                        {
                            id: '309',
                            label: '安阳'
                        },
                        {
                            id: '310',
                            label: '开封'
                        },
                        {
                            id: '311',
                            label: '洛阳'
                        },
                        {
                            id: '312',
                            label: '漯河'
                        },
                        {
                            id: '313',
                            label: '平顶山'
                        },
                        {
                            id: '314',
                            label: '驻马店'
                        },
                        {
                            id: '315',
                            label: '南阳'
                        },
                        {
                            id: '316',
                            label: '濮阳'
                        },
                        {
                            id: '317',
                            label: '新乡'
                        },
                        {
                            id: '318',
                            label: '信阳'
                        },
                        {
                            id: '319',
                            label: '许昌'
                        },
                        {
                            id: '320',
                            label: '商丘'
                        },
                        {
                            id: '321',
                            label: '三门峡'
                        },
                        {
                            id: '322',
                            label: '郑州'
                        },
                        {
                            id: '323',
                            label: '鹤壁'
                        },
                        {
                            id: '324',
                            label: '周口'
                        },
                        {
                            id: '476',
                            label: '济源'
                        }
                    ]
                    },
                    {
                        id: '16',
                        label: '湖北',
                        children: [
                        {
                            id: '346',
                            label: '荆门'
                        },
                        {
                            id: '347',
                            label: '荆州'
                        },
                        {
                            id: '348',
                            label: '黄石'
                        },
                        {
                            id: '349',
                            label: '黄冈'
                        },
                        {
                            id: '364',
                            label: '潜江'
                        },
                        {
                            id: '365',
                            label: '孝感'
                        },
                        {
                            id: '366',
                            label: '恩施'
                        },
                        {
                            id: '367',
                            label: '随州'
                        },
                        {
                            id: '368',
                            label: '神农架'
                        },
                        {
                            id: '369',
                            label: '十堰'
                        },
                        {
                            id: '370',
                            label: '襄樊'
                        },
                        {
                            id: '371',
                            label: '武汉'
                        },
                        {
                            id: '372',
                            label: '仙桃'
                        },
                        {
                            id: '373',
                            label: '天门'
                        },
                        {
                            id: '375',
                            label: '咸宁'
                        },
                        {
                            id: '376',
                            label: '宜昌'
                        },
                        {
                            id: '377',
                            label: '鄂州'
                        }
                    ]
                    },
                    {
                        id: '17',
                        label: '湖南',
                        children: [
                        {
                            id: '350',
                            label: '怀化'
                        },
                        {
                            id: '351',
                            label: '常德'
                        },
                        {
                            id: '352',
                            label: '长沙'
                        },
                        {
                            id: '353',
                            label: '郴州'
                        },
                        {
                            id: '354',
                            label: '娄底'
                        },
                        {
                            id: '355',
                            label: '邵阳'
                        },
                        {
                            id: '356',
                            label: '湘潭'
                        },
                        {
                            id: '357',
                            label: '湘西'
                        },
                        {
                            id: '358',
                            label: '张家界'
                        },
                        {
                            id: '359',
                            label: '益阳'
                        },
                        {
                            id: '360',
                            label: '衡阳'
                        },
                        {
                            id: '361',
                            label: '岳阳'
                        },
                        {
                            id: '362',
                            label: '永州'
                        },
                        {
                            id: '363',
                            label: '株洲'
                        }
                    ]
                    }
                ]
            },
            {
                id: '1004',
                label: '华南地区',
                children: [
                    {
                        id: '4',
                        label: '广东',
                        children: [
                        {
                            id: '82',
                            label: '江门'
                        },
                        {
                            id: '83',
                            label: '揭阳'
                        },
                        {
                            id: '84',
                            label: '广州'
                        },
                        {
                            id: '85',
                            label: '潮州'
                        },
                        {
                            id: '86',
                            label: '茂名'
                        },
                        {
                            id: '88',
                            label: '梅州'
                        },
                        {
                            id: '89',
                            label: '清远'
                        },
                        {
                            id: '90',
                            label: '佛山'
                        },
                        {
                            id: '91',
                            label: '汕头'
                        },
                        {
                            id: '92',
                            label: '汕尾'
                        },
                        {
                            id: '93',
                            label: '深圳'
                        },
                        {
                            id: '94',
                            label: '韶关'
                        },
                        {
                            id: '109',
                            label: '阳江'
                        },
                        {
                            id: '110',
                            label: '湛江'
                        },
                        {
                            id: '111',
                            label: '云浮'
                        },
                        {
                            id: '112',
                            label: '中山'
                        },
                        {
                            id: '113',
                            label: '珠海'
                        },
                        {
                            id: '114',
                            label: '肇庆'
                        },
                        {
                            id: '115',
                            label: '河源'
                        },
                        {
                            id: '116',
                            label: '东莞'
                        },
                        {
                            id: '117',
                            label: '惠州'
                        }
                    ]
                    },
                    {
                        id: '12',
                        label: '广西',
                        children: [
                        {
                            id: '95',
                            label: '桂林'
                        },
                        {
                            id: '96',
                            label: '贵港'
                        },
                        {
                            id: '98',
                            label: '防城港'
                        },
                        {
                            id: '99',
                            label: '南宁'
                        },
                        {
                            id: '100',
                            label: '来宾'
                        },
                        {
                            id: '101',
                            label: '柳州'
                        },
                        {
                            id: '102',
                            label: '钦州'
                        },
                        {
                            id: '103',
                            label: '梧州'
                        },
                        {
                            id: '104',
                            label: '北海'
                        },
                        {
                            id: '105',
                            label: '玉林'
                        },
                        {
                            id: '106',
                            label: '河池'
                        },
                        {
                            id: '107',
                            label: '贺州'
                        },
                        {
                            id: '108',
                            label: '百色'
                        },
                        {
                            id: '478',
                            label: '崇左'
                        }
                    ]
                    },
                    {
                        id: '8',
                        label: '海南',
                        children: [
                        {
                            id: '296',
                            label: '东方'
                        },
                        {
                            id: '297',
                            label: '琼海'
                        },
                        {
                            id: '298',
                            label: '三亚'
                        },
                        {
                            id: '299',
                            label: '文昌'
                        },
                        {
                            id: '300',
                            label: '五指山'
                        },
                        {
                            id: '301',
                            label: '万宁'
                        },
                        {
                            id: '302',
                            label: '海口'
                        },
                        {
                            id: '303',
                            label: '儋州'
                        },
                        {
                            id: '484',
                            label: '定安县'
                        },
                        {
                            id: '485',
                            label: '屯昌县'
                        },
                        {
                            id: '486',
                            label: '陵水黎族自治县'
                        },
                        {
                            id: '487',
                            label: '澄迈县'
                        },
                        {
                            id: '488',
                            label: '保亭黎族苗族自治县'
                        },
                        {
                            id: '489',
                            label: '琼中黎族苗族自治县'
                        },
                        {
                            id: '490',
                            label: '乐东黎族自治县'
                        },
                        {
                            id: '491',
                            label: '临高县'
                        },
                        {
                            id: '492',
                            label: '昌江黎族自治县'
                        },
                        {
                            id: '493',
                            label: '白沙黎族自治县'
                        }
                    ]
                    }
                ]
            },
            {
                id: '1005',
                label: '西南地区',
                children: [
                    {
                        id: '33',
                        label: '重庆',
                        children: [
                        {
                            id: '433',
                            label: '渝中'
                        },
                        {
                            id: '434',
                            label: '大渡口'
                        },
                        {
                            id: '435',
                            label: '江北'
                        },
                        {
                            id: '436',
                            label: '沙坪坝'
                        },
                        {
                            id: '437',
                            label: '九龙坡'
                        },
                        {
                            id: '438',
                            label: '南岸'
                        },
                        {
                            id: '439',
                            label: '北碚'
                        },
                        {
                            id: '440',
                            label: '万盛'
                        },
                        {
                            id: '441',
                            label: '双桥'
                        },
                        {
                            id: '442',
                            label: '渝北'
                        },
                        {
                            id: '443',
                            label: '巴南'
                        },
                        {
                            id: '444',
                            label: '万州'
                        },
                        {
                            id: '445',
                            label: '涪陵'
                        },
                        {
                            id: '446',
                            label: '黔江'
                        },
                        {
                            id: '447',
                            label: '长寿'
                        },
                        {
                            id: '448',
                            label: '江津'
                        },
                        {
                            id: '449',
                            label: '合川'
                        },
                        {
                            id: '450',
                            label: '永川'
                        },
                        {
                            id: '451',
                            label: '南川'
                        },
                        {
                            id: '452',
                            label: '綦江'
                        },
                        {
                            id: '453',
                            label: '潼南'
                        },
                        {
                            id: '454',
                            label: '铜梁'
                        },
                        {
                            id: '455',
                            label: '大足'
                        },
                        {
                            id: '456',
                            label: '荣昌'
                        },
                        {
                            id: '457',
                            label: '璧山'
                        },
                        {
                            id: '458',
                            label: '梁平'
                        },
                        {
                            id: '459',
                            label: '城口'
                        },
                        {
                            id: '460',
                            label: '丰都'
                        },
                        {
                            id: '461',
                            label: '垫江'
                        },
                        {
                            id: '462',
                            label: '武隆'
                        },
                        {
                            id: '463',
                            label: '忠县'
                        },
                        {
                            id: '464',
                            label: '开县'
                        },
                        {
                            id: '465',
                            label: '云阳'
                        },
                        {
                            id: '466',
                            label: '奉节'
                        },
                        {
                            id: '467',
                            label: '巫山'
                        },
                        {
                            id: '468',
                            label: '巫溪'
                        },
                        {
                            id: '469',
                            label: '石柱'
                        },
                        {
                            id: '470',
                            label: '秀山'
                        },
                        {
                            id: '471',
                            label: '酉阳'
                        },
                        {
                            id: '472',
                            label: '彭水'
                        }
                    ]
                    },
                    {
                        id: '10',
                        label: '贵州',
                        children: [
                        {
                            id: '118',
                            label: '贵阳'
                        },
                        {
                            id: '119',
                            label: '安顺'
                        },
                        {
                            id: '120',
                            label: '六盘水'
                        },
                        {
                            id: '121',
                            label: '黔南'
                        },
                        {
                            id: '122',
                            label: '黔东南'
                        },
                        {
                            id: '123',
                            label: '黔西南'
                        },
                        {
                            id: '124',
                            label: '毕节'
                        },
                        {
                            id: '125',
                            label: '铜仁'
                        },
                        {
                            id: '126',
                            label: '遵义'
                        }
                    ]
                    },
                    {
                        id: '28',
                        label: '四川',
                        children: [
                        {
                            id: '224',
                            label: '广安'
                        },
                        {
                            id: '225',
                            label: '广元'
                        },
                        {
                            id: '226',
                            label: '成都'
                        },
                        {
                            id: '227',
                            label: '眉山'
                        },
                        {
                            id: '228',
                            label: '凉山'
                        },
                        {
                            id: '229',
                            label: '绵阳'
                        },
                        {
                            id: '230',
                            label: '攀枝花'
                        },
                        {
                            id: '231',
                            label: '南充'
                        },
                        {
                            id: '232',
                            label: '德阳'
                        },
                        {
                            id: '233',
                            label: '乐山'
                        },
                        {
                            id: '234',
                            label: '泸州'
                        },
                        {
                            id: '235',
                            label: '内江'
                        },
                        {
                            id: '236',
                            label: '甘孜'
                        },
                        {
                            id: '237',
                            label: '遂宁'
                        },
                        {
                            id: '238',
                            label: '资阳'
                        },
                        {
                            id: '247',
                            label: '巴中'
                        },
                        {
                            id: '250',
                            label: '达州'
                        },
                        {
                            id: '251',
                            label: '雅安'
                        },
                        {
                            id: '252',
                            label: '阿坝'
                        },
                        {
                            id: '253',
                            label: '自贡'
                        },
                        {
                            id: '254',
                            label: '宜宾'
                        }
                    ]
                    },
                    {
                        id: '29',
                        label: '西藏',
                        children: [
                        {
                            id: '268',
                            label: '那曲'
                        },
                        {
                            id: '269',
                            label: '拉萨'
                        },
                        {
                            id: '270',
                            label: '林芝'
                        },
                        {
                            id: '271',
                            label: '日喀则'
                        },
                        {
                            id: '480',
                            label: '昌都'
                        },
                        {
                            id: '497',
                            label: '山南'
                        },
                        {
                            id: '498',
                            label: '阿里'
                        }
                    ]
                    },
                    {
                        id: '31',
                        label: '云南',
                        children: [
                        {
                            id: '283',
                            label: '楚雄'
                        },
                        {
                            id: '284',
                            label: '昆明'
                        },
                        {
                            id: '285',
                            label: '丽江'
                        },
                        {
                            id: '286',
                            label: '德宏'
                        },
                        {
                            id: '287',
                            label: '临沧'
                        },
                        {
                            id: '288',
                            label: '曲靖'
                        },
                        {
                            id: '289',
                            label: '保山'
                        },
                        {
                            id: '290',
                            label: '普洱'
                        },
                        {
                            id: '291',
                            label: '文山'
                        },
                        {
                            id: '292',
                            label: '大理'
                        },
                        {
                            id: '293',
                            label: '红河'
                        },
                        {
                            id: '294',
                            label: '昭通'
                        },
                        {
                            id: '295',
                            label: '玉溪'
                        },
                        {
                            id: '481',
                            label: '怒江'
                        },
                        {
                            id: '482',
                            label: '迪庆'
                        },
                        {
                            id: '483',
                            label: '西双版纳'
                        }
                    ]
                    }
                ]
            },
            {
                id: '1006',
                label: '西北地区',
                children: [
                    {
                        id: '11',
                        label: '甘肃',
                        children: [
                        {
                            id: '255',
                            label: '酒泉'
                        },
                        {
                            id: '256',
                            label: '金昌'
                        },
                        {
                            id: '257',
                            label: '嘉峪关'
                        },
                        {
                            id: '258',
                            label: '兰州'
                        },
                        {
                            id: '259',
                            label: '陇南'
                        },
                        {
                            id: '260',
                            label: '平凉'
                        },
                        {
                            id: '261',
                            label: '临夏'
                        },
                        {
                            id: '262',
                            label: '庆阳'
                        },
                        {
                            id: '263',
                            label: '定西'
                        },
                        {
                            id: '264',
                            label: '武威'
                        },
                        {
                            id: '265',
                            label: '天水'
                        },
                        {
                            id: '266',
                            label: '张掖'
                        },
                        {
                            id: '267',
                            label: '白银'
                        },
                        {
                            id: '477',
                            label: '甘南'
                        }
                    ]
                    },
                    {
                        id: '23',
                        label: '宁夏',
                        children: [
                        {
                            id: '170',
                            label: '固原'
                        },
                        {
                            id: '171',
                            label: '石嘴山'
                        },
                        {
                            id: '172',
                            label: '吴忠'
                        },
                        {
                            id: '173',
                            label: '中卫'
                        },
                        {
                            id: '174',
                            label: '银川'
                        }
                    ]
                    },
                    {
                        id: '24',
                        label: '青海',
                        children: [
                        {
                            id: '175',
                            label: '西宁'
                        },
                        {
                            id: '176',
                            label: '海东'
                        },
                        {
                            id: '177',
                            label: '海西'
                        },
                        {
                            id: '178',
                            label: '玉树'
                        },
                        {
                            id: '479',
                            label: '海南'
                        },
                        {
                            id: '494',
                            label: '海北'
                        },
                        {
                            id: '495',
                            label: '黄南'
                        },
                        {
                            id: '496',
                            label: '果洛'
                        }
                    ]
                    },
                    {
                        id: '27',
                        label: '陕西',
                        children: [
                        {
                            id: '239',
                            label: '宝鸡'
                        },
                        {
                            id: '240',
                            label: '安康'
                        },
                        {
                            id: '241',
                            label: '商洛'
                        },
                        {
                            id: '242',
                            label: '铜川'
                        },
                        {
                            id: '243',
                            label: '渭南'
                        },
                        {
                            id: '244',
                            label: '西安'
                        },
                        {
                            id: '245',
                            label: '咸阳'
                        },
                        {
                            id: '246',
                            label: '延安'
                        },
                        {
                            id: '248',
                            label: '汉中'
                        },
                        {
                            id: '249',
                            label: '榆林'
                        }
                    ]
                    },
                    {
                        id: '30',
                        label: '新疆',
                        children: [
                        {
                            id: '179',
                            label: '哈密'
                        },
                        {
                            id: '180',
                            label: '博尔塔拉'
                        },
                        {
                            id: '181',
                            label: '昌吉'
                        },
                        {
                            id: '182',
                            label: '阿勒泰'
                        },
                        {
                            id: '183',
                            label: '喀什'
                        },
                        {
                            id: '184',
                            label: '克拉玛依'
                        },
                        {
                            id: '185',
                            label: '阿克苏'
                        },
                        {
                            id: '186',
                            label: '克孜勒苏柯尔克孜'
                        },
                        {
                            id: '187',
                            label: '石河子'
                        },
                        {
                            id: '188',
                            label: '塔城'
                        },
                        {
                            id: '189',
                            label: '五家渠'
                        },
                        {
                            id: '190',
                            label: '吐鲁番'
                        },
                        {
                            id: '191',
                            label: '巴音郭楞'
                        },
                        {
                            id: '192',
                            label: '乌鲁木齐'
                        },
                        {
                            id: '193',
                            label: '伊犁'
                        },
                        {
                            id: '195',
                            label: '和田'
                        },
                        {
                            id: '499',
                            label: '阿拉尔'
                        },
                        {
                            id: '500',
                            label: '图木舒克'
                        }
                    ]
                    }
                ]
            },
            {
                id: '1007',
                label: '港澳台',
                children: [
                    {
                        id: '34',
                        label: '香港'
                    },
                    {
                        id: '35',
                        label: '台湾'
                    },
                    {
                        id: '36',
                        label: '澳门'
                    }
                ]
            }
        ]
    },
    {
        id: '7',
        label: '日本'
    },
    {
        id: '37',
        label: '其他国家'
    }
];

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
        'veui-label': Label,
        'veui-datepicker': DatePicker,
        'veui-uploader': Uploader,
        'veui-select': Select,
        'veui-checkbox': Checkbox,
        'veui-checkboxgroup': CheckboxGroup,
        'veui-radio': Radio,
        'veui-radiogroup': RadioGroup,
        'veui-searchbox': Searchbox,
        'veui-region-picker': RegionPicker,
        'veui-icon': Icon,
        'veui-slider': Slider,
        'veui-textarea': Textarea
    },

    data() {
        let hobby = ['🏸'];
        let hobbyItems = [
            {
                value: '⚽️', label: '足球'
            },
            {
                value: '🏀', label: '篮球'
            },
            {
                value: '🏸', label: '羽毛球'
            },
            {
                value: '🎾', label: '网球'
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
            regions: REGIONS_BRAND,
            storeData1: {
              regions: [],
              nickName: '李云腾',
              sex: '女',
              married: false,
              marryItems: [
                {
                    value: true, label: '已婚'
                },
                {
                    value: false, label: '未婚'
                }
            ],
              sexItems: [
                {
                    value: '-', label: '不告诉你'
                },
                {
                    value: '男', label: '男'
                },
                {
                    value: '女', label: '女'
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
              range: [moment().toDate(), moment().add(3, 'month').toDate()]
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
              floor: 3499
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
                    range: [moment().toDate(), moment().add(3, 'month').toDate()]
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
@import "~veui-theme-blue/lib.less";

.veui-form-demo {
  h2 {
    margin-bottom: 40px;
  }

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

  .veui-uploader-list-image li {
    margin: 0;
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
