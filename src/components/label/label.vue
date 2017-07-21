<!--
 - Label
 -
 - author: Storm
 - date: 2017/04/10
 -->

<template>
  <span
    class="s-label"
    :class="classes"
  >
    <slot></slot>
  </span>
</template>

<script>
  export default {
    name: 'Label',
    props: {
      type: {
        type: String,
        default: 'primary',
        validator (val) {
          return ['primary', 'warning', 'info', 'android', 'ios', 'jailbreak', 'outline', 'general', ''].includes(val);
        }
      },

      size: {
        type: String,
        default: 'sm',
        validator (val) {
          return ['lg', 'md', 'sm'].includes(val);
        }
      },

      /*// 圆角大小
       radius: {
       type: String,
       validator (val) {
       return ['lg', 'md', 'sm', 'xs', 'none'].includes(val);
       }
       }*/
    },
    data () {
      return {}
    },
    computed: {
      classes () {
        return {
          [`s-label-${this.type}`]: !!this.type,
          [`s-label-${this.size}`]: !!this.size,
          //[`s-label-radius-${this.radius}`]: !!this.radius
        };
      }
    },
    methods: {}
  }
</script>

<style lang="scss">
  .s-label {
    display: inline-block;
    vertical-align: middle;
    color: #f4f4f4;
    line-height: 1;
    font-family: \5B8B\4F53, SimSun, sans-serif; /* 宋体 */
    font-size: .18rem;

    &-lg {
      font-size: .22rem;
      padding: .07rem .27rem;
      border-radius: .18rem;
    }

    &-md {
      border-radius: .14rem;
      padding: .05rem .14rem;
    }

    &-sm {
      border-radius: .02rem;
      padding: .03rem .1rem;
    }

    & + & {
      margin-left: .06rem;
    }

    &-primary {
      background-image: linear-gradient(to left, #f9a567 0%, #fd684c 100%);
    }

    &-warning {
      background-image: linear-gradient(to right, #ffa931 0%, #ffd550 100%);
    }

    &-info {
      background-image: linear-gradient(to right, #928afc 0%, #bd96f9 100%);
    }

    &-android {
      background-image: linear-gradient(to left, #0bc1b5 0%, #1ae5b5 100%);
    }

    &-ios {
      background-image: linear-gradient(to left, #62beff 0%, #67ddf3 100%);
    }

    &-jailbreak {
      background-image: linear-gradient(to left, #928afc 0%, #bd96f9 100%);
    }

    &-general {
      background-image: linear-gradient(to right, #617fe6 0%, #8fa9fd 100%);
    }

    &-outline {
      border: 1px solid #a1b9e1;
      color: #a1b9e1;
    }

  }
</style>
