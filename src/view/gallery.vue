<!--
 - gallery - 画廊
 -
 - author: Storm
 - date: 2017/05/04
 -->

<template>
  <s-app>

    <s-header type="transparent" :disableNav="true"></s-header>

    <div class="gallery">

      <!-- swiper -->
      <div v-swiper="swiperOpts" class="swiper-container gallery-swiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item, index) in picUrls" :key="index">
            <qiniu-img :src="item"></qiniu-img>
          </div>
          <div class="swiper-pagination swiper-pagination-bullets"></div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
      <!-- /swiper -->

      <footer class="gallery-footer">

        <p class="gallery-index">{{activeIndex + 1}}/{{picUrls.length}}</p>

        <a class="gallery-download" :href="download" download></a>

        <a class="gallery-natural" :href="natural" target="_blank">查看原图</a>

      </footer>

    </div>

  </s-app>
</template>

<script>
  import Vue from 'vue';

  // viewport meta;
  let viewport = null;

  export default {
    name: 'gallery',
    data () {
      return {
        swiperOpts: {
          onSlideChangeEnd: this.slideChange,
          initialSlide: parseInt(this.$route.query.index) || 0,

          keyboardControl: true,
          preloadImages: false
        },

        // 图片数据
        picUrls: [],

        // 下载地址
        download: '',

        // 原始图片
        natural: '',

        activeIndex: 0

      }
    },
    methods: {
      slideChange (swiper) {
        this.activeIndex = swiper.activeIndex;
        this.download = this.picUrls[swiper.activeIndex] + '?imageView2/1/format/jpg';
        this.natural = this.picUrls[swiper.activeIndex] + '?imageView2/1/format/jpg';

      },

      /**
       * 页面初始化
       */
      init () {
        const picUrls = this.$route.query.picUrls;
        if (!picUrls) this.$router.go(-1);
        this.picUrls = picUrls && picUrls.split(',');
        this.slideChange({
          activeIndex: parseInt(this.$route.query.index) || 0
        });
      }
    },

    beforeDestroy () {
      viewport.content = 'width=device-width, initial-scale=1, user-scalable=no'
    },
    created () {
      viewport = document.querySelector('[name="viewport"]');
      viewport.content = 'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=2, user-scalable=yes';
      this.init();
    }
  }
</script>

<style lang="scss">
  .gallery {
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    background-color: #000;

    &-swiper {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      height: auto;
      width: 100%;
      text-align: center;

      img {
        display: inline-block;
        height: auto;
        width: auto;
        max-height: 100%;

        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }

      .swiper-slide {
        height: 6.4rem;
      }

    }

    &-footer {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      padding-bottom: .3rem;
      text-align: center;
    }

    &-download {
      display: block;
      background: url(../assets/bg-download.png) no-repeat center;
      background-size: 100%;
      width: .44rem;
      height: .44rem;
      position: absolute;
      right: .24rem;
      bottom: auto;
    }

    &-natural {
      border: 1px solid rgba(255, 255, 255, .3);
      border-radius: .04rem;
      font-size: .22rem;
      line-height: 1;
      color: #fff;
      padding: .1rem .12rem;
      display: inline-block;
    }

    &-index {
      font-size: .18rem;
      line-height: 1;
      color: #fff;
      margin-bottom: .43rem;
    }
  }
</style>
