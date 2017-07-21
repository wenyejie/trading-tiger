<!--
 - Popup
 -
 - author: Storm
 - date: 2017/04/10
 -->

<template>
  <transition :name="`s-popup-${direction}`">
    <div
      v-show="visible"
      class="s-popup"
      :style="styles"
      :class="classes">
      <div
        class="s-popup-mask"
        :style="maskStyles"
        @click="cancel()"></div>
      <div class="s-popup-content">
        <template v-if="removeDom"><slot v-if="visible"></slot></template>
        <template v-else><slot></slot></template>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'Popup',
    props: {
      value: {
        type: Boolean
      },
      bgc: {
        type: String
      },
      maskClose: {
        type: Boolean,
        default: true
      },
      direction: {
        type: String,
        default: 'bottom',
        validator (val) {
          return ['top', 'right', 'bottom', 'left'].includes(val);
        }
      },

      position: {
        type: String,
        validator (val) {
          return ['fixed', 'absolute'].includes(val);
        }
      },

      // popup 隐藏时是否要移除dom
      removeDom: Boolean

    },
    data () {
      return {
        visible: this.value
      }
    },
    computed: {
      classes () {
        return {
          [`s-popup-${this.direction}`]: !!this.direction
        }
      },
      styles () {
        let result = {};
        if (this.position) result.position = this.position;
        return result;
      },
      maskStyles () {
        let result = {};
        if (this.bgc) result['background-color'] = this.bgc;
        return result;
      }
    },
    watch: {
      value (val) {
        this.visible = val;
      }
    },
    methods: {

      /**
       * 隐藏popup
       * @return {boolean}
       */
      cancel () {
        if (!this.maskClose) return false;
        this.visible = false;
        this.$emit('input', false);
      }
    }
  }
</script>

<style lang="scss">
  .s-popup,
  .s-popup-mask {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .s-popup {
    position: absolute;
    transition: all .3s ease;
    z-index: 2;

    &-mask {
      position: absolute;
      background-color: rgba(0, 0, 0, .5);
    }

    &-content {
      position: absolute;
      background-color: #fff;
      transition: all .3s ease;
      width: 100%;

      @media all and (min-width: 769px) {
        max-width: 640px;
      }

    }

    &-bottom {


      .s-popup-content {
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
      }

      &-enter,
      &-leave-active {
        opacity: 0;

        & .s-popup-content {
          transform: translateY(100%) translateX(-50%);
        }
      }

    }

    &-top {

      .s-popup-content {
        top: 0;
        left: 50%;
        transform: translateX(-50%);
      }

      &-enter,
      &-leave-active {
        opacity: 0;

        & .s-popup-content {
          transform: translateY(-100%) translateX(-50%);
        }
      }

    }
  }
</style>
