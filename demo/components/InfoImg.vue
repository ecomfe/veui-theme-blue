<template>
  <article>
    <h1><code>&lt;InfoImg&gt;不同状态下显示的图片</code></h1>
    <div class="info-img-wrap">
      <div class="info-img" v-for="item in imgArr" :key="item.className">
        <div class="img">
            <span :class="item.className"></span>
        </div>
        <div class="desc">
          <div>{{ item.desc }}</div>
          <div>class={{ item.className }}</div>
        </div>
      </div>
    </div>
  </article>  
</template>
<script>
export default {
    name: 'InfoImg',
    data() {
        return {
            imgArr: [
                {
                    className: 'no-search',
                    desc: '无搜索'
                },
                {
                    className: 'no-search-small',
                    desc: '无搜索小图'
                },
                {
                    className: 'no-data',
                    desc: '无数据'
                },
                {
                    className: 'no-data-small',
                    desc: '无数据小图'
                },
                {
                    className: 'no-net',
                    desc: '无网络'
                },
                {
                    className: 'no-net-small',
                    desc: '无网络小图'
                },
                {
                    className: 'success',
                    desc: '成功'
                },
                {
                    className: 'success-small',
                    desc: '成功小图'
                },
                {
                    className: 'error',
                    desc: '错误'
                },
                {
                    className: 'error-small',
                    desc: '错误小图'
                }
            ]
        };
    }
};
</script>
<style lang="less" scoped>
.info-img {
  width: 200px;
  height: 200px;
  position: relative;
  color: #666;
  float: left;
  .img {
    height: 150px;
    width: 100%;
    position: relative;
    span {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .desc {
    height: 50px;
    width: 100%;
    text-align: center;
    position: absolute;
    bottom: 0;
  }
}
</style>

