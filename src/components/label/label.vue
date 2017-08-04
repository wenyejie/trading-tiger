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
