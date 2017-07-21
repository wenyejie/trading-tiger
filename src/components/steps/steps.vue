<!--
 - Title
 -
 - author: Storm
 - date: 2017/04/18
 -->

<template>
  <div class="s-steps">
    <ol class="s-steps-list"><slot></slot></ol>
  </div>
</template>

<script>
  export default {
    name: 'Steps',
    props: {
      active: {
        type: Number,
        validator (val) {
          return val >= 0 && val % 1 === 0
        }
      },
      status: {
        type: String,
        default: 'process',
        validator (val) {
          return ['error', 'success', 'process'].includes(val);
        }
      }
    },
    data () {
      return {
        activeIndex: this.active
      }
    },
    watch: {
      active () {
        this.activeIndex = this.active;
      }
    },
    methods: {
      getStep () {
        return this.$children.filter(item => item.$options.name === 'Step');
      }
    }
  }
</script>

<style lang="scss">
  .s-steps {
    padding: .2rem .24rem;
    background-color: #F4F4F4;

    &-list {
      border-radius: .06rem;
      background-color: #fff;
      padding: .3rem .35rem;
    }
  }
</style>
