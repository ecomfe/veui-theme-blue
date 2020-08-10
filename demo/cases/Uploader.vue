<template>
    <article>
        <h1><code>&lt;veui-uploader&gt;</code></h1>
        <section>
            <h2>文件上传模式</h2>
            <h2>尺寸</h2>
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
                            v-model="files2"
                            name="file"
                            :action="action"
                            :max-count="3"
                            max-size="100kb"
                            :payload="payload"
                            @success="onSuccess"
                            @failure="onFailure"
                            @change="handleChange('files2')"
                            @statuschange="handleStatusChange"
                        >
                            <template slot="desc">
                                提示：1、单个附件大小不大于10M；2、附件个数不多于3个
                            </template>
                        </veui-uploader>
                    </veui-field>
                </veui-form>
            </section>
            <h2>风格</h2>
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
                            v-model="files2"
                            name="file"
                            :action="action"
                            :max-count="20"
                            max-size="100kb"
                            :payload="payload"
                            @success="onSuccess"
                            @failure="onFailure"
                            @change="handleChange('files2')"
                            @statuschange="handleStatusChange"
                        >
                            <template slot="desc">
                                提示：1、单个附件大小不大于10M；2、附件个数不多于20个
                            </template>
                        </veui-uploader>
                    </veui-field>
                </veui-form>
            </section>
        </section>
        <section>
            <h2>图片上传模式</h2>
            <veui-form>
                <veui-field label="图片上传" ui="multi">
                    <veui-uploader
                        v-model="files"
                        type="image"
                        name="file"
                        :action="action"
                        :max-count="1"
                        max-size="10000kb"
                        accept=".jpg,.jpeg,.gif"
                        :payload="payload"
                        :validator="validator"
                        @success="onSuccess"
                        @failure="onFailure"
                        @change="handleChange('files')"
                        @statuschange="handleStatusChange"
                    >
                        <!-- <template slot="file-after" slot-scope="props">
                            {{props}}
                        </template> -->
                    </veui-uploader>
                </veui-field>
            </veui-form>
        </section>
        <h2 style="margin-top: 50px;">更多功能demo示例（UI不需还原）</h2>
        <section>
            <veui-form>
                <veui-field label="图片上传，扩展操作栏" ui="multi">
                    <veui-uploader
                        ref="multipleUploader"
                        v-model="files1"
                        type="image"
                        request-mode="custom"
                        name="file"
                        max-size="100kb"
                        accept=".jpg,.jpeg,.gif"
                        :payload="payload"
                        :upload="upload"
                        picker-position="before"
                        :controls="imageControls"
                        @moveright="handleMoveRight"
                        @success="onSuccess"
                        @failure="onFailure"
                        @change="handleChange('files1')"
                        @statuschange="handleStatusChange"
                    >
                    </veui-uploader>
                </veui-field>
                <veui-field label="文件上传，通过iframe上传" ui="multi">
                    <veui-uploader
                        v-model="filesIframe"
                        name="file"
                        action="/uploadiframe"
                        request-mode="iframe"
                        :max-count="1"
                        max-size="10mb"
                        accept=".jpg,.jpeg,.gif"
                        :payload="payload"
                        :convert-response="convertResponse"
                        ui="s"
                        @success="onSuccess"
                        @failure="onFailure"
                        @change="handleChange('filesIframe')"
                        @statuschange="handleStatusChange"
                    >
                        <template slot="desc">
                            请选择jpg,jpeg,gif图片，大小在10M以内，只能上传1张图
                        </template>
                    </veui-uploader>
                </veui-field>
            </veui-form>
        </section>
    </article>
</template>
<script>
import {VeuiUploader, VeuiForm, VeuiField} from 'veui';
import 'veui-theme-blue-icons/chevron-right';

export default {
    name: 'uploader-demo',
    components: {
        VeuiUploader,
        VeuiForm,
        VeuiField
    },
    data() {
        let files = [
            {
                name: 'demo-file111111111111111111111111111111111.jpg',
                src: 'https://www.baidu.com/img/bd_logo1.png',
                extraInfo: 123
            }
        ];

        return {
            action:
        'https://app.fakejson.com/q/ELymQ7xh?token=AWFkjMICPSAB_bO_z-Lnog',
            files,
            files1: files.slice(0),
            files2: files.slice(0),
            customFiles: files.slice(0),
            filesIframe: {
                name: 'demo-file.txt',
                src: 'http://www.baidu.com'
            },
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
            payload: {
                year: '2017',
                month: '4'
            },
            currentImage: null,
            imageSrc: null,
            tooltipTarget: null,
            tooltipOpen: false,
            upload: (file, {onload, onprogress, onerror}) => {
                // onload(file: Object, data: Object)
                // onprogress(file: Object, progress: Object({loaded, total}))
                // onerror(file: Object, error: Object({message}))
                let xhr = new XMLHttpRequest();
                file.xhr = xhr;

                xhr.upload.onprogress = e => onprogress(e);
                xhr.onload = () => {
                    try {
                        onload(JSON.parse(xhr.responseText));
                    } catch (e) {
                        onload({success: false, message: e});
                    }
                };
                xhr.onerror = e => onerror(e);
                let formData = new FormData();
                formData.append('file', file);

                // xhr.open('POST', this.action, true)
                xhr.open('POST', '/upload', true);
                xhr.send(formData);

                return () => {
                    xhr.abort();
                };
            },
            validator(file) {
                return new Promise(resolve => {
                    let image = new Image();
                    image.src = window.URL.createObjectURL(file);
                    image.onload = () => {
                        resolve({
                            valid: image.height > 200 && image.width > 200,
                            message: '图片宽高太小'
                        });
                    };
                });
            },
            imageControls(file, defaultControls) {
                if (file.status === 'success') {
                    return [
                        {name: 'moveright', icon: 'chevron-right', disabled: false},
                        ...defaultControls
                    ];
                }
                return defaultControls;
            }
        };
    },
    methods: {
        onSuccess(data) {
            console.log('Success event: ', data);
        },
        onFailure(data) {
            console.log('Failure event: ', data);
        },
        handleChange(name) {
            console.log('Change event: ', this[name]);
        },
        handleStatusChange(status) {
            console.log('Total status is: ', status);
        },
        convertResponse(data) {
            return {
                success: !data.code,
                ...data.result
            };
        },
        openTooltip(file) {
            this.currentImage = file;
            this.tooltipOpen = true;
            this.tooltipTarget = `add-image${
                file.index !== undefined ? '-' + file.index : ''
            }`;
        },
        addImage() {
            if (this.currentImage.index !== undefined) {
                this.$set(this.customFiles, this.currentImage.index, {
                    src: this.imageSrc
                });
            } else {
                this.customFiles.push({src: this.imageSrc});
            }
            this.currentImage = null;
            this.imageSrc = null;
            this.tooltipOpen = false;
        },
        handleMoveRight(file, index) {
            console.log('image action move right: ', file, index);
            if (index < this.files1.length - 1) {
                let temp = {...this.files1[index]};
                this.$set(this.files1, index, this.files1[index + 1]);
                this.$set(this.files1, index + 1, temp);
            }
        }
    }
};
</script>

<style lang="less" scoped>
@import '~veui-theme-blue/lib.less';
.title-desc {
    margin-top: 10px;
    margin-bottom: 10px;
}
.extra-url {
  & > * {
    vertical-align: middle;
  }

  .veui-button {
    margin-left: 5px;
  }
}
.clear {
  margin-top: 20px;
}
.custom {
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
</style>
