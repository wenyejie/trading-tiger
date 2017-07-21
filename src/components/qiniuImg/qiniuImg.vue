<!--
 - 七牛图片
 -
 - author: Storm
 - date: 2017/07/11
 -->

<template>
  <img
    :src="imgSrc"
    v-show="src"
    @load="handleLoad($event)"
    @click="handleClick($event)"
    @class="classes"
    :alt="alt">


</template>

<script>
  export default {
    name: 'qiniuImg',
    props: {

      // 图片地址
      src: String,

      // alt注释
      alt: String,

      // mode, 模式, 0-5, 根据七牛API来
      mode: {
        type: [String, Number],
        default: 1,
        validator (val) {
          return [0, 1, 2, 3, 4, 5].includes(parseInt(val));
        }
      },

      // 是否异步加载图片
      async: Boolean,

      // 宽度
      width: [String, Number],

      // 高度
      height: [String, Number],

      // 是否支持渐进显示, 1支持, 0, 不支持, 使用格式jpg
      interlace: {
        type: [String, Number],
        default: 1
      },

      // 图片质量
      quality: {
        type: [String, Number],
        default: 70
      },

      // 图片格式
      format: {
        type: String,
//        default: CONFIG.IS_SUPPORT_WEBP ? 'webp' : 'jpg',
        default: 'jpg',
        validator (val) {
          return ['jpg', 'png', 'webp'].includes(val);
        }
      }
    },
    data () {
      return {}
    },
    computed: {
      imgSrc () {
        let src = this.src.replace(/http:|https:/g, '');
        src += `?imageView2/${this.mode}`;
        src += this.width ? `/w/${this.width}` : '';
        src += this.height ? `/h/${this.height}` : '';
        src += this.interlace ? `/interlace/${this.interlace}` : '';
        src += this.quality ? `/q/${this.quality}` : '';
        src += this.format ? `/format/${this.format}` : '';
        return src;
      },
      classes () {
        return {
          [`qiniuImg-view`]: !!this.view
        }
      }
    },
    methods: {

      /**
       * 加载完成事件
       * @param $event
       */
      handleLoad ($event) {
        this.$emit('load', $event);
      },

      /**
       * 点击事件
       * @param $event
       */
      handleClick ($event) {
        this.$emit('click', $event);
      }
    }
  }
</script>

<style lang="scss">
  .qiniuImg-view {
    cursor: pointer;
  }
</style>
