<!--
 - author: Storm
 - date: 2017/03/31
 -->

<template>
  <div class="s-row" :style="styles" :class="classes">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'Row',
    props: {
      gutter: {
        type: [Number, String],
        default: 0
      },
      align: {
        type: String,
        validator (val) {
          return ['top', 'bottom', 'center', 'stretch'].includes(val)
        }
      },
      justify: {
        type: String,
        validator (val) {
          return ['left', 'right', 'center', 'between', 'around'].includes(val)
        }
      },
      wrap: Boolean
    },
    data () {
      return {}
    },
    computed: {
      styles () {
        let ret = {};
        if(this.gutter) {
          ret.marginLeft = '-' + this.gutter + (/^\d+$/.test(this.gutter) ? 'px' : '');
          ret.marginRight = ret.marginLeft;
        }
        return ret;
      },
      classes () {
        return {
          [`s-row-justify-${this.justify}`]: !!this.justify,
          [`s-row-align-${this.align}`]: !!this.align,
          [`s-row-wrap`]: !!this.wrap
        }
      }
    }
  }
</script>

<style lang="scss">
  .s-row {
    display: flex;

    &-wrap {
      flex-wrap: wrap;
    }

    &-justify-left {
      justify-content: flex-start;
    }
    &-justify-right {
      justify-content: flex-end;
    }
    &-justify-center {
      justify-content: center;
    }
    &-justify-between {
      justify-content: space-between;
    }
    &-justify-around {
      justify-content: space-around;
    }
    &-align-top {
      align-items: flex-start;
    }
    &-align-bottom {
      align-items: flex-end;
    }
    &-align-center {
      align-items: center;
    }
    &-align-stretch {
      align-items: stretch;
    }
  }
</style>
