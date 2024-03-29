<template>
    <article>
        <h1><code>&lt;veui-uploader&gt;</code></h1>

        <fieldset>
            <legend>Options</legend>
            <div>
                Type:
                <veui-radio-button-group
                    v-model="type"
                    ui="s"
                    :items="avaliableTypes"
                />
                <div class="space"/>
                <veui-checkbox v-model="autoupload">autoupload</veui-checkbox>
                <div class="space"/>
                <veui-checkbox
                    v-model="draggable"
                    :readonly="draggable"
                >
                    <span title="暂不支持动态切换">draggable</span>
                </veui-checkbox>
                <div class="space"/>
                <veui-checkbox v-model="readonly">readonly</veui-checkbox>
            </div>
            <div>
                MaxCount:
                <veui-radio-button-group
                    v-model="maxCount"
                    ui="s"
                    :items="avaliableMaxCounts"
                />
                <div class="space"/>
                <veui-checkbox
                    v-if="maxCount < 2"
                    v-model="multiple"
                >multiple</veui-checkbox>
            </div>
            <div>
                Order:
                <veui-radio-button-group
                    v-model="order"
                    ui="s"
                    :items="availableOrders"
                />
            </div>
            <div>
                validityDisplay:
                <veui-radio-button-group
                    v-model="validityDisplay"
                    ui="s"
                    :items="availableDisplays"
                />
            </div>
            <div>
                helpPosition:
                <veui-radio-button-group
                    v-model="helpPosition"
                    ui="s"
                    :items="availableHelpPositions"
                />
            </div>
            <div>
                Custom:
                <veui-check-button-group
                    v-model="enabledCustoms"
                    ui="s"
                    :items="availableCustoms"
                />
            </div>
            <div>Accept: <veui-input
                v-model="accept"
                ui="xs"
                clearable
            /></div>
            <div>
                Action:
                <veui-searchbox
                    v-model="action"
                    ui="xs"
                    clearable
                    :suggestions="availableActions"
                    replace-on-select
                />
            </div>
            <div>
                RequestMode:
                <veui-select
                    v-model="requestMode"
                    ui="xs"
                    :options="availableRequestModes"
                />
                <template v-if="requestMode === 'iframe'">
                    <br>+ iframeMode:
                    <veui-select
                        v-model="iframeMode"
                        ui="xs"
                        :options="availableRequestIframeModes"
                    />
                </template>
            </div>
            <div>
                PickerPosition:
                <veui-select
                    v-model="pickerPosition"
                    ui="xs"
                    :options="availablePickerPositions"
                />
            </div>
        </fieldset>

        <fieldset v-if="removed">
            <legend>已移除</legend>
        </fieldset>
        <fieldset v-else>
            <legend>
                Uploader
                <sup v-if="status">{{ statusTexts[status] }}</sup>
            </legend>

            <component
                :is="inDialog ? 'veui-dialog' : 'div'"
                ui="wide"
                :open.sync="inDialog"
                draggable
            >
                <template #title>文件上传</template>

                <veui-uploader
                    ref="uploader"
                    v-model="files"
                    v-bind="uploaderOptions"
                    :validity-display="validityDisplay"
                    :help-position="helpPosition"
                    :order="order"
                    @success="handleUploaderEvent('success', ...arguments)"
                    @failure="handleUploaderEvent('failure', ...arguments)"
                    @invalid="handleUploaderEvent('invalid', ...arguments)"
                    @remove="handleUploaderEvent('remove', ...arguments)"
                    @statuschange="handleUploaderEvent('statuschange', ...arguments)"
                >
                    <template
                        v-if="includes(enabledCustoms, '#desc')"
                        #desc
                    >
                        请选择{{ accept }}图片， 大小在{{ maxSize }}以内，
                        宽、高大于100像素， 最多上传{{ maxCount }}张图
                    </template>
                    <template
                        v-if="includes(enabledCustoms, '#button-label')"
                        #button-label
                    >
                        <veui-icon name="transmit-upload"/>
                    </template>
                    <template
                        v-if="includes(enabledCustoms, '#file-after')"
                        #file-after="{ name }"
                    >
                        <div class="ellipsis">{{ name }}</div>
                    </template>
                    <template
                        v-if="includes(enabledCustoms, '#upload')"
                        #upload
                    >
                        <div class="veui-uploader-list-image-container">
                            <veui-button
                                @click="$refs.uploader.clickInput()"
                            >上传文件</veui-button>
                            <veui-button ref="custom-add-image">图库上传</veui-button>
                        </div>
                        <veui-popover
                            target="custom-add-image"
                            :open.sync="tooltipOpen"
                            trigger="click"
                            autofocus
                        >
                            <form @submit.prevent="handleTooltipImageSubmit">
                                <veui-span>图片地址：</veui-span>
                                <veui-input
                                    name="src"
                                    placeholder="https://"
                                />
                                <veui-button type="submit">确定</veui-button>
                            </form>
                        </veui-popover>
                    </template>
                    <template
                        v-if="includes(enabledCustoms, '#uploading')"
                        #uploading="{ name, loaded, total }"
                    >
                        <div class="veui-uploader-list-image-container">
                            <p>“{{ name }}”上传中</p>
                            <p>
                                已完成 <strong>{{ loaded }}</strong>字节，剩余<strong>{{ total - loaded }}</strong>字节
                            </p>
                        </div>
                    </template>
                    <template
                        v-if="includes(enabledCustoms, '#file')"
                        #file="{ name, status }"
                    >
                        <div class="veui-uploader-list-media-container">
                            <p>{{ statusIcons[status] }} {{ status }} {{ name }}</p>
                        </div>
                    </template>
                </veui-uploader>
            </component>
        </fieldset>

        <fieldset>
            <legend>Operations</legend>
            <veui-button
                ui="basic s"
                @click="handleShuffleButtonClick"
            >打乱</veui-button>
            <div class="space"/>
            <veui-button
                ui="basic s"
                @click="handleEmptyButtonClick"
            >清空</veui-button>
            <div class="space"/>
            <veui-button
                ui="basic s"
                @click="$refs.uploader.clear()"
            >清除失败文件</veui-button>
            <div class="space"/>
            <veui-button
                ui="basic s"
                @click="handleComponentRemoveButtonClick"
            >{{ removed ? '恢复' : '移除' }}上传组件</veui-button>
            <div class="space"/>
            <veui-button
                v-if="!removed"
                ui="basic s"
                @click="inDialog = !inDialog"
            >{{
                inDialog ? '-' : '放在对话框里'
            }}</veui-button>
        </fieldset>

        <fieldset>
            <details>
                <summary>Value</summary>
                <veui-textarea
                    ui="s"
                    readonly
                    :value="JSON.stringify(files, null, 4)"
                />
            </details>
        </fieldset>
        <section>
            <h2>文件上传样式</h2>
            <h3>尺寸</h3>
            <div class="options-desc">可选的尺寸
                <span class="bg-gray-show">ui</span>
                属性值：
                <span class="bg-gray-show">xs / s（默认，可不传） / m / l</span>
            </div>
            <section>
                <veui-form>
                    <veui-field
                        v-for="(ui, index) in sizes"
                        :key="index"
                        :label="ui.label"
                        ui="multi"
                    >
                        <veui-uploader
                            :ui="ui.value"
                            v-model="files"
                            name="file"
                            :action="action"
                            :max-count="3"
                            max-size="100kb"
                            :payload="payload"
                            help-position="bottom"
                            @success="handleUploaderEvent('success', ...arguments)"
                            @failure="handleUploaderEvent('failure', ...arguments)"
                            @invalid="handleUploaderEvent('invalid', ...arguments)"
                            @remove="handleUploaderEvent('remove', ...arguments)"
                            @statuschange="handleUploaderEvent('statuschange', ...arguments)"
                        >
                            <template slot="desc">
                                提示：1、单个附件大小不大于10M；2、附件个数不多于3个
                            </template>
                        </veui-uploader>
                    </veui-field>
                </veui-form>
            </section>
            <h3>风格</h3>
            <div class="options-desc">可选的风格
                <span class="bg-gray-show">ui</span>
                属性值：
                <span class="bg-gray-show">vertical（默认，可不传） / horizon</span>
            </div>
            <section>
                <veui-form>
                    <veui-field label="水平排列[ui=horizon]" ui="multi">
                        <veui-uploader
                            ui="s horizon"
                            v-model="files"
                            name="file"
                            :action="action"
                            :max-count="20"
                            max-size="100kb"
                            :payload="payload"
                            help-position="bottom"
                            @success="handleUploaderEvent('success', ...arguments)"
                            @failure="handleUploaderEvent('failure', ...arguments)"
                            @invalid="handleUploaderEvent('invalid', ...arguments)"
                            @remove="handleUploaderEvent('remove', ...arguments)"
                            @statuschange="handleUploaderEvent('statuschange', ...arguments)"
                        >
                            <template slot="desc">
                                提示：1、单个附件大小不大于10M；2、附件个数不多于20个
                            </template>
                        </veui-uploader>
                    </veui-field>
                </veui-form>
            </section>
        </section>
    </article>
</template>
<script>
import {includes, pick, shuffle, isUndefined} from 'lodash';
import {
    Uploader,
    Button,
    Popover,
    Select,
    SearchBox,
    Input,
    Span,
    Icon,
    Checkbox,
    RadioButtonGroup,
    CheckButtonGroup,
    Textarea,
    Dialog,
    Form,
    Field
} from 'veui';
import 'veui-theme-blue-icons/plain-right';
import 'veui-theme-blue-icons/transmit-upload';
import bus from '../bus';

const files = [
    {
        key: 1,
        name: 'EXPjUWaWoAQ07Rj.jpg',
        src:
      'https://feed-image.baidu.com/0/pic/f1cc5f2566cba57dedd3357c4aeaf0ef.jpg'
    },
    {
        key: 2,
        name:
      'D_REqQiU4AAY9TaD_REqQiU4AAY9TaD_REqQiU4AAY9TaD_REqQiU4AAY9TaD_REqQiU4AAY9Ta.png',
        src:
      'https://feed-image.baidu.com/0/pic/8e1f0412ce0b7104ae33f1e2c2fcd337.png',
        alt: 'A tea store with a cat inside in the shape of a drink box'
    },
    {
        key: 3,
        name: '7a1ba2b.mp4',
        src:
      'https://nadvideo2.baidu.com/5dafd8544f4f53b27a5f59b0ab780403_1920_1080.mp4',
        poster:
      'https://feed-image.baidu.com/0/pic/4dced79d185a16e228652b136f653dcc.jpg'
    },
    {
        key: 4,
        name: 'c9c23af.mp4',
        src:
      'https://nadvideo2.baidu.com/b45f066cccd13549219cb475ca520cee_1920_1080.mp4',
        extraInfo: '123'
    }
];

const mapper = value => ({label: value, value});
const remoteFakeUploadTarget
  = 'https://app.fakejson.com/q/ELymQ7xh?token=AWFkjMICPSAB_bO_z-Lnog';
const remoteUploadTarget = 'https://kylehe.me/veui/upload/xhr';
const localUploadTarget = '/upload/xhr';
const localIframeUploadTarget = '/upload/iframe';
const availableActions = [
    {label: localUploadTarget, value: localUploadTarget},
    {label: localIframeUploadTarget, value: localIframeUploadTarget},
    {
        label: `❗️ ${remoteUploadTarget} (第三方提供服务)`,
        value: remoteUploadTarget
    },
    {
        label: `❗️ ${remoteFakeUploadTarget} (第三方提供服务)`,
        value: remoteFakeUploadTarget
    }
];
const avaliableTypes = ['file', 'video', 'image', 'media'].map(mapper);
const availableCustoms = [
    '#desc',
    '#button-label',
    '#file-after',
    '#file',
    '#uploading',
    '#upload',
    ':controls',
    ':entries'
].map(mapper);
const availableRequestModes = ['xhr', 'iframe', 'custom'].map(mapper);
const availableRequestIframeModes = ['postmessage', 'callback'].map(mapper);
const availablePickerPositions = ['before', 'after'].map(mapper);
const avaliableMaxCounts = [1, 5, 10].map(mapper);
const availableDisplays = ['popup', 'inline'].map(mapper);
const availableHelpPositions = ['side', 'bottom'].map(mapper);
const availableOrders = ['append', 'prepend'].map(mapper);

const statusIcons = {
    [Uploader.status.PENDING]: '❔',
    [Uploader.status.SUCCESS]: '✅',
    [Uploader.status.FAILURE]: '❌',
    [Uploader.status.UPLOADING]: '〽️'
};
const statusTexts = {
    [Uploader.status.EMPTY]: '无文件',
    [Uploader.status.PENDING]: '待上传',
    [Uploader.status.SUCCESS]: '成功',
    [Uploader.status.FAILURE]: '失败',
    [Uploader.status.UPLOADING]: '上传中'
};

export default {
    name: 'uploader-demo',
    components: {
        'veui-uploader': Uploader,
        'veui-button': Button,
        'veui-popover': Popover,
        'veui-input': Input,
        'veui-span': Span,
        'veui-icon': Icon,
        'veui-select': Select,
        'veui-checkbox': Checkbox,
        'veui-searchbox': SearchBox,
        'veui-textarea': Textarea,
        'veui-dialog': Dialog,
        'veui-radio-button-group': RadioButtonGroup,
        'veui-check-button-group': CheckButtonGroup,
        'veui-form': Form,
        'veui-field': Field
    },
    data() {
        return {
            uploaderStatus: Uploader.status,
            statusIcons,
            statusTexts,
            avaliableTypes,
            avaliableMaxCounts,
            availableCustoms,
            availableActions,
            availableRequestModes,
            availableRequestIframeModes,
            availablePickerPositions,
            availableHelpPositions,
            availableOrders,
            helpPosition: 'side',
            removed: false,
            inDialog: false,
            order: 'append',

            enabledCustoms: ['#desc'],
            tooltipOpen: false,
            localFiles: undefined,
            status: undefined,

            autoupload: true,
            type: 'file',

            validityDisplay: 'popup',
            availableDisplays,

            accept: '.jpg,.jpeg,.png',
            maxCount: 5,
            maxSize: '1mb',
            multiple: undefined,
            draggable: undefined,
            readonly: undefined,

            action:
        process.env.NODE_ENV === 'development'
            ? localUploadTarget
            : remoteFakeUploadTarget,
            // action: localIframeUploadTarget,
            requestMode: 'xhr',
            iframeMode: 'postmessage',
            payload: {
                year: new Date().getFullYear(),
                month: new Date().getMonth() + 1
            },
            pickerPosition: undefined,
            sizes: [
                {
                    label: '超小号[ui=xs]',
                    value: 'xs'
                },
                {
                    label: '小号[ui=s]',
                    value: 's'
                },
                {
                    label: '中号[ui=m]',
                    value: 'm'
                },
                {
                    label: '大号[ui=l]',
                    value: 'l'
                }
            ],
        };
    },
    computed: {
        files: {
            get() {
                if (!isUndefined(this.localFiles)) {
                    return this.localFiles;
                }
                if (['video', 'image'].indexOf(this.type) < 0) {
                    return files;
                }
                let check = {
                    image: item => /\.(jpe?g|png)$/i.test(item.name),
                    video: item => /\.mp4$/i.test(item.name)
                }[this.type];
                return files.filter(check);
            },
            set(val) {
                this.localFiles = val;
            }
        },
        uploaderOptions() {
            return {
                ...pick(this, [
                    'autoupload',
                    'type',
                    'accept',
                    'maxCount',
                    'multiple',
                    'draggable',
                    'readonly',
                    'maxSize',
                    'action',
                    'requestMode',
                    'iframeMode',
                    'payload',
                    'pickerPosition',
                    'convertResponse'
                ]),
                upload: this.customUploadRequest,
                controls: includes(this.enabledCustoms, ':controls')
                    ? this.customItemControls
                    : undefined,
                entries: includes(this.enabledCustoms, ':entries')
                    ? this.customUploadEntries
                    : undefined,
                validator: this.customValidate
            };
        }
    },
    watch: {
        type(val) {
            this.localFiles = undefined;
        },
        files(val) {
            console.log(
                'Files updated',
                this.files,
                this.files.map(file => [file.key, file.name].join('\t'))
            );
        },
        maxCount(val) {
            this.multiple = undefined;
        }
    },
    methods: {
        includes,
        handleTooltipImageSubmit(evt) {
            let url = evt.target.src.value;
            if (!/^https?:\/\/.+/i.test(url)) {
                return;
            }
            this.files = this.files.concat({name: url, src: url});
            this.tooltipOpen = false;
        },
        handleEmptyButtonClick() {
            this.files = [];
        },
        handleShuffleButtonClick() {
            this.files = shuffle(this.files);
        },
        handleUploaderEvent(evt, ...args) {
            if (evt === 'statuschange') {
                this.status = args[0];
            }
            if (evt === 'invalid' && args[0].file) {
                args = [{...args[0], file: '&lt;<b><i>File</i></b>&gt;'}].concat(
                    args.slice(1)
                );
            }
            bus.$emit(
                'log',
                [evt, ...args.map(arg => JSON.stringify(arg))].join('\t')
            );
        },
        handleComponentRemoveButtonClick() {
            this.removed = !this.removed;
        },

        async customValidate(file) {
            if (!['video', 'image'].includes(this.type)) {
                return {valid: true};
            }
            let src = window.URL.createObjectURL(file);
            let revoke = () => window.URL.revokeObjectURL(src);
            let tag = {image: 'img', video: 'video'}[this.type];
            let el = document.createElement(tag);
            let promise = new Promise(function (resolve, reject) {
                if (tag === 'video') {
                    el.ondurationchange = function () {
                        setTimeout(resolve, 1800); // mock 耗时较长的校验
                    };
                } else {
                    el.onload = resolve;
                }
                el.onerror = reject;
            });
            el.src = src;
            try {
                await promise;
            } catch (e) {
                return {valid: true};
            } finally {
                revoke();
            }
            let ret;
            if (this.type === 'image') {
                let valid = [el.naturalWidth, el.naturalHeight].every(val => val > 100);
                ret = valid
                    ? {valid}
                    : {valid, message: 'Dimension of image must be great than 100×100'};
            } else if (this.type === 'video') {
                let valid = el.duration >= 3 && el.duration < 300;
                ret = valid
                    ? {valid}
                    : {valid, message: 'Duration of video must be in range of [3, 300)'};
            }
            revoke();
            return ret;
        },

        convertResponse(data, err) {
            if (!data) {
                return {
                    success: false,
                    message: `上传失败：${err.message}`
                };
            }

            return this.requestMode === 'iframe'
                ? {
                    success: !data.code,
                    ...data.result
                }
                : data;
        },
        customUploadRequest(file, {onload, onerror, onprogress, oncancel}) {
            let formData = new FormData();
            formData.append('file', file);
            Object.entries(this.payload).forEach(function ([key, val]) {
                formData.append(key, val);
            });

            let xhr = new XMLHttpRequest();
            xhr.upload.onprogress = onprogress;
            xhr.onload = async () => {
                let data;
                try {
                    data = JSON.parse(xhr.responseText);
                } catch (e) {
                    data = {success: false, message: e.message};
                }
                if (!data.success) {
                    onload(data);
                    return;
                }

                let toProceed = await this.$confirm('Upload complete. Proceed?');
                if (!toProceed) {
                    oncancel();
                    return;
                }
                onprogress({
                    loaded: -1,
                    total: file.size
                });
                setTimeout(function () {
                    onload(data);
                }, 2000);
            };
            xhr.onerror = onerror;

            xhr.open('POST', this.action, true);
            xhr.send(formData);

            return function () {
                xhr.abort();
            };
        },

        customItemControls(file, defaultControls) {
            if (file.status !== 'success') {
                return defaultControls;
            }
            return [
                {name: 'moveright', icon: 'plain-right', disabled: false},
                {
                    name: 'moveright1',
                    icon: 'plain-right',
                    disabled: false,
                    children: [
                        {
                            name: 'moveright1-1',
                            label: '操作第一'
                        },
                        {
                            name: 'moveright1-2',
                            label: '操作第二'
                        }
                    ]
                },
                ...defaultControls
            ];
        },
        customUploadEntries(defaultEntries) {
            return [
                {
                    name: 'add',
                    icon: 'upload',
                    label: '本地上传'
                },
                {
                    name: 'imageLibrary',
                    icon: 'star-solid',
                    label: '图片库'
                },
                {
                    name: 'add',
                    icon: 'thumb-up-solid',
                    label: '更多',
                    children: [
                        {
                            label: '操作第一',
                            name: 'entry1'
                        },
                        {
                            label: '操作第二',
                            name: 'entry2'
                        },
                        {
                            label: '操作第三',
                            name: 'entry3'
                        }
                    ]
                }
            ];
        }
    }
};
</script>

<style scoped>
h2 {
  font-size: 16px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  margin-top: 40px;
}

legend {
  padding: 3px 6px;
}
legend sup {
  font-weight: bold;
}
fieldset {
  margin: 20px 0;
}
fieldset > div {
  margin: 5px 0;
}

.space {
  display: inline-block;
  width: 1.2em;
}

.ellipsis {
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.veui-textarea {
  width: 100%;
  height: 300px;
}
</style>
