<!--
 - Main
 -
 - author: Storm
 - date: 2017/04/17
 -->

<template>
  <div class="s-main" :class="classes" :style="styles">
    <slot></slot>
    <transition name="s-main-loading">
      <div v-if="loading" class="s-main-loading"><span class="s-main-loading-inner"></span></div>
    </transition>
  </div>
</template>

<script>

  // 是否需要计算最小高度
  let isComputedMinHeight = true;

  export default {
    name: 'Main',
    props: {
      bgc: {
        type: String
      },
      loading: Boolean
    },
    data () {
      return {
        bottom: '.24rem'
      }
    },
    computed: {
      classes () {
        return {
          [`s-main-${this.bgc}`]: !!this.bgc
        }
      },
      styles () {
        let sty = {};
        sty.paddingBottom = this.bottom + (/^[\.|\d]+$/.test(this.bottom) ? 'rem' : '');
        return sty;
      }
    },
    methods: {

      /**
       * 计算最小高度
       * 用来兼容android 4.3- 不支持vh, vw
       */
      minHeight () {
        this.$el.style.minHeight = window.innerHeight + 'px';
      },

      /**
       * 组件初始化
       */
      init () {
        let minHeight = window.getComputedStyle(this.$el)['minHeight'];
        minHeight = parseInt(minHeight);
        if (minHeight) isComputedMinHeight = false;

        isComputedMinHeight && this.minHeight();
        isComputedMinHeight && window.addEventListener('resize', this.minHeight);
      }
    },
    mounted () {
      this.init();
    },
    beforeDestroy () {

      // 当窗口大小改变时, 重新变更最小高度
      isComputedMinHeight && window.removeEventListener('resize', this.minHeight);
    }
  }
</script>

<style lang="scss">
  .s-main {
    position: relative;
    padding-bottom: .24rem;
    min-height: 100vh;

    @media all and (orientation: landscape) and (max-width: 768px) {

      min-height: 100vw;

    }

    &-white {
      background-color: #fff;
    }

    &-loading {
      position: fixed;
      z-index: 1000;
      left: 50%;
      width: 100%;
      max-width: 640px;
      transform: translateX(-50%);
      top: 0;
      height: 100%;
      background-color: #fff;
      transition: all .3s ease;

      &-enter,
      &-leave-active {
        opacity: 0;
      }

      &-inner {
        position: absolute;
        top: 25%;
        left: 50%;
      }

      &-inner,
      &-inner::before,
      &-inner::after {
        position: absolute;
        width: .25rem;
        height: .25rem;
        border-radius: 50%;
        animation-fill-mode: both;
        animation: bounce 2.5s infinite ease-in-out;
      }

      &-inner::before,
      &-inner::after {
        content: '';
      }

      &-inner::before {
        left: -.35rem;
        animation-delay: -.15s;
      }

      &-inner::after {
        left: .35rem;
        animation-delay: .15s;
      }

    }

  }
  .header + .s-main {
    padding-top: .88rem;

    & .s-main-loading {
      top: .88rem
    }

  }
  @keyframes bounce {
    0%,
    50%,
    100% {
      box-shadow: 0 25px 0 -25px #d6d6d6;
    }
    25%,
    75% {
      box-shadow: 0 25px 0 0 #d6d6d6;
    }
  }
</style>
