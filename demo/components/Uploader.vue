<template>
  <article class="veui-uploader-demo">
    <h1><code>&lt;veui-uploader&gt;</code></h1>
    <h2>图片上传模式，上传进度以文字百分比显示</h2>
    <veui-uploader type="image"
      name="file"
      action="/upload"
      v-model="files"
      :max-count="3"
      max-size="10mb"
      accept=".jpg,.jpeg,.gif"
      ui="horizontal"
      :payload="payload"
      progress="number"
      @success="onSuccess"
      @failure="onFailure"
      @change="handleChange('files')"
      @statuschange="handleStatusChange">
      <template slot="desc">请选择jpg,jpeg,gif图片，大小在10M以内，最多上传3张图</template>
    </veui-uploader>
    <h2>图片上传模式，上传进度以进度条显示</h2>
    <veui-uploader type="image"
      name="file"
      action="/upload"
      v-model="files1"
      :max-count="3"
      max-size="10mb"
      accept=".jpg,.jpeg,.gif"
      :payload="payload"
      ui="horizontal"
      progress="bar"
      @success="onSuccess"
      @failure="onFailure"
      @change="handleChange('files1')"
      @statuschange="handleStatusChange">
      <template slot="desc">请选择jpg,jpeg,gif图片，大小在10M以内，最多上传3张图</template>
    </veui-uploader>
    <h2>文件上传模式</h2>
    <veui-uploader
      name="file"
      action="/upload"
      v-model="files2"
      :max-count="3"
      max-size="10mb"
      accept=".jpg,.jpeg,.gif"
      :payload="payload"
      ui="horizontal"
      progress="number"
      @success="onSuccess"
      @failure="onFailure"
      @change="handleChange('files2')"
      @statuschange="handleStatusChange">
      <template slot="desc">请选择jpg,jpeg,gif图片，大小在10M以内，只能上传3张图</template>
    </veui-uploader>
    <h2>文件上传模式，通过iframe上传</h2>
    <veui-uploader ref="iframeUploader"
      name="file"
      action="/uploadiframe"
      request-mode="iframe"
      v-model="filesIframe"
      :max-count="1"
      max-size="10mb"
      accept=".jpg,.jpeg,.gif"
      :payload="payload"
      :convert-response="convertResponse"
      @success="onSuccess"
      @failure="onFailure"
      @change="handleChange('filesIframe')"
      @statuschange="handleStatusChange">
      <template slot="desc">请选择jpg,jpeg,gif图片，大小在10M以内，只能上传1张图</template>
    </veui-uploader>
    <section>
      <h2>用法如下：</h2>
      <p v-text="sample" class="sample"></p>
    </section>

    <section>
      <h2>Attributes</h2>
      <table class="attribute-table">
        <tr>
          <th width="10%">参数</th>
          <th width="40%">说明</th>
          <th width="10%">类型</th>
          <th width="30%">可选值</th>
          <th width="10%">默认值</th>
        </tr>
        <tr>
          <td>name</td>
          <td>上传的文件字段名</td>
          <td>string</td>
          <td>--</td>
          <td>file</td>
        </tr>
        <tr>
          <td>type</td>
          <td>类型，图片上传还是文字上传</td>
          <td>string</td>
          <td>--</td>
          <td>file</td>
        </tr>
        <tr>
          <td>action</td>
          <td>必选参数，上传地址</td>
          <td>string</td>
          <td>--</td>
          <td>--</td>
        </tr>
        <tr>
          <td>headers</td>
          <td>设置上传的请求头部</td>
          <td>object</td>
          <td>--</td>
          <td>--</td>
        </tr>
        <tr>
          <td>with-credentials</td>
          <td>支持发送 cookie 凭证信息</td>
          <td>boolean</td>
          <td>--</td>
          <td>true</td>
        </tr>
        <tr>
          <td>request-mode</td>
          <td>文件上传模式</td>
          <td>string</td>
          <td>iframe（通过iframe上传）,xhr</td>
          <td>xhr</td>
        </tr>
        <tr>
          <td>iframe-mode</td>
          <td>iframe上传模式下，传递数据模式</td>
          <td>postmessage，callback</td>
          <td>--</td>
          <td>postmessage</td>
        </tr>
        <tr>
          <td>data-type</td>
          <td>传递的数据类型</td>
          <td>json，text</td>
          <td>--</td>
          <td>json</td>
        </tr>
        <tr>
          <td>extensions</td>
          <td>支持上传文件的扩展名数组</td>
          <td>array</td>
          <td>--</td>
          <td>['jpg', 'jpeg', 'gif', 'png', 'bmp', 'tif', 'tiff', 'webp', 'apng', 'svg']</td>
        </tr>
        <tr>
          <td>accept</td>
          <td>支持上传的文件类型</td>
          <td>string</td>
          <td>--</td>
          <td>--</td>
        </tr>
        <tr>
          <td>ui</td>
          <td>上传提示文字显示位置</td>
          <td>string</td>
          <td>--</td>
          <td>horizontal（提示文字显示在上传按钮的右方，默认显示在上传按钮的下方）</td>
        </tr>
        <tr>
          <td>max-count</td>
          <td>最大允许上传个数</td>
          <td>number</td>
          <td>--</td>
          <td>--</td>
        </tr>
        <tr>
          <td>max-size</td>
          <td>最大允许的单个上传文件的大小</td>
          <td>number,string</td>
          <td>--</td>
          <td>--</td>
        </tr>
        <tr>
          <td>payload</td>
          <td>上传文件时附带的其他请求参数</td>
          <td>object</td>
          <td>示例：{year: 2018}</td>
          <td>--</td>
        </tr>
        <tr>
          <td>progress</td>
          <td>上传进度显示方式</td>
          <td>string</td>
          <td>text（文字）, number（百分比）, bar（进度条）</td>
          <td>text</td>
        </tr>
      </table>
    </section>
    <section>
      <h2>Events</h2>
      <table class="attribute-table">
        <tr>
          <th width="40%">事件名</th>
          <th width="60%">说明</th>
        </tr>
        <tr>
          <td>success</td>
          <td>文件上传成功时触发的事件</td>
        </tr>
        <tr>
          <td>failure</td>
          <td>文件上传失败时触发的事件</td>
        </tr>
        <tr>
          <td>change</td>
          <td>文件改变时触发的事件</td>
        </tr>
        <tr>
          <td>statuschange</td>
          <td>文件状态（空文件list、成功、失败、上传中）改变时触发的事件</td>
        </tr>
      </table>
    </section>
  </article>
</template>
<script>
import { Uploader } from 'veui'
import ui from 'veui/mixins/ui'
import { assign } from 'lodash'

export default {
  name: 'uploader-demo',
  components: {
    'veui-uploader': Uploader
  },
  data: function () {
    let files = [
      {
        name: 'demo-file1.jpg',
        src: 'https://www.baidu.com/img/bd_logo1.png'
      },
      {
        name: 'demo-file2.gif',
        src: 'http://nodejs.cn/static/images/logo.svg'
      }
    ]

    return {
      files,
      files1: files.slice(0),
      files2: files.slice(0),
      filesIframe: 'http://nodejs.cn/static/images/logo.svg',
      payload: {
        year: '2017',
        month: '4'
      },
      sample: `<veui-uploader
        name="file"
        action="/upload"
        v-model="files2"
        :max-count="3"
        max-size="10mb"
        accept=".jpg,.jpeg,.gif"
        :payload="payload"
        ui="horizontal"
        progress="number"
        @success="onSuccess"
        @failure="onFailure"
        @change="handleChange('files2')"
        @statuschange="handleStatusChange">
        <template slot="desc">请选择jpg,jpeg,gif图片，大小在10M以内，只能上传3张图</template>
      </veui-uploader>`
    }
  },
  mixins: [ui],
  methods: {
    onSuccess (data) {
      console.log('Success event: ', data)
    },
    onFailure (data) {
      console.log('Failure event: ', data)
    },
    handleChange (name) {
      console.log('Change event: ', this[name])
    },
    handleStatusChange (status) {
      console.log('Total status is: ', status)
    },
    convertResponse (data) {
      return assign({
        status: data.code ? 'failure' : 'success'
      }, data.result)
    }
  }
}
</script>

<style lang="less">
.veui-uploader-demo {
  padding-bottom: 20px;
  h2 {
    font-size: 16px;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
    margin-top: 40px;
  }
}
.attribute-table {
  width: 100%;
  th,td {
    text-align: left;
    color: #666;
    border-bottom: 1px solid #d9d9d9;
    height: 36px;
    padding: 0 5px;
  }
}
.sample {
  color: #666;
  border: 1px solid #d9d9d9;
  padding: 10px;
}
</style>
