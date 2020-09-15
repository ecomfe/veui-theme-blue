<template>
    <article>
        <h1><code>&lt;poster&gt;</code></h1>
        <div class="options-desc">
            <p>以下图片均可通过<span class="bg-gray-show">import XXX from 'veui-theme-blue-icons/xxx.png';</span>来使用</p>
            <p>如若需要2倍图或3倍图，可通过<span class="bg-gray-show">xxx@2x.png 或 xxx@3x.png</span>来获得</p>
        </div>
        <div class="poster-wrap">
            <div
                class="poster-box"
                v-for="(item, index) in posterData"
                :key="`poster_${index}`"
                v-clipboard:copy="item.imgName"
                v-clipboard:success="onCopy">
                <div class="poster-container">
                    <div class="poster-img">
                        <img :src="item.imgUrl" alt="">
                    </div>
                    <div class="poster-text">{{item.desc}}</div>
                </div>
                <p class="poster-img-name">{{item.imgName}}</p>
            </div>
        </div>
    </article>
</template>
<script>
import Poster403 from 'veui-theme-blue-imgs/403.png';
import Poster404 from 'veui-theme-blue-imgs/404.png';
import offline from 'veui-theme-blue-imgs/offline.png';
import empty from 'veui-theme-blue-imgs/empty.png';
import error from 'veui-theme-blue-imgs/error.png';
import failure from 'veui-theme-blue-imgs/failure.png';
import maintaining from 'veui-theme-blue-imgs/maintaining.png';
import forward from 'veui-theme-blue-imgs/forward.png';
import noAccess from 'veui-theme-blue-imgs/no-access.png';
import success from 'veui-theme-blue-imgs/success.png';
import unsupported from 'veui-theme-blue-imgs/unsupported.png';
import welcome from 'veui-theme-blue-imgs/welcome.png';
// import Poster4032x from 'veui-theme-blue-imgs/403_2x.png';
export default {
    name: 'Poster',
    data() {
        return {
            posterData: [
                {
                    imgUrl: Poster403,
                    desc: '抱歉，前方正在施工，暂停通行',
                    imgName: '403.png'
                },
                {
                    imgUrl: Poster404,
                    desc: '抱歉，您访问的页面已返回火星',
                    imgName: '404.png'
                },
                {
                    imgUrl: offline,
                    desc: '您访问的服务已下线',
                    imgName: 'offline.png'
                },
                {
                    imgUrl: empty,
                    desc: '页面暂无内容',
                    imgName: 'empty.png'
                },
                {
                    imgUrl: error,
                    desc: '抱歉，页面出错，停止访问',
                    imgName: 'error.png'
                },
                {
                    imgUrl: failure,
                    desc: '出错了',
                    imgName: 'failure.png'
                },
                {
                    imgUrl: maintaining,
                    desc: '系统维护开发中，敬请期待',
                    imgName: 'maintaining.png'
                },
                {
                    imgUrl: forward,
                    desc: '请前往新页面',
                    imgName: 'forward.png'
                },
                {
                    imgUrl: noAccess,
                    desc: '抱歉，您暂无权限访问',
                    imgName: 'noAccess.png'
                },
                {
                    imgUrl: success,
                    desc: '成功了',
                    imgName: 'success.png'
                },
                {
                    imgUrl: unsupported,
                    desc: '抱歉，您正在使用的浏览器版本过低，请升级后再试',
                    imgName: 'unsupported.png'
                },
                {
                    imgUrl: welcome,
                    desc: '欢迎',
                    imgName: 'welcome.png'
                },
            ],
        };
    },
    methods: {
        onCopy: function (e) {
            this.$toast.success(`已拷贝到剪切板：${e.text}`);
        }
    }
};
</script>
<style lang="less">
.poster-wrap {
    width: 100%;
    height: 100%;
    .poster-box {
        display: inline-block;
        margin: 20px;
        .poster-container {
            padding: 24px 24px 64px;
            background: #f5f5f5;
            .poster-text {
                color: #6964a2;
                margin-top: 24px;
                text-align: center;
            }
        }
        .poster-img-name {
            margin-top: 8px;
            text-align: center;
        }
    }
}
</style>
