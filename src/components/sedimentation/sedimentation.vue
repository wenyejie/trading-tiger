<!--
 - footer
 - 居于底部，沉底的组件
 -
 - author: Storm
 - date: 2017/04/18
 -->

<template>
  <footer class="s-sedimentation">
    <slot></slot>
  </footer>
</template>

<script>
  export default {
    name: 'footer',
    data () {
      return {}
    },
    methods: {},
    mounted () {
      this.$parent.bottom = this.$el.clientHeight / window.rootFontSize + .24 + 'rem';
    }
  }
</script>

<style lang="scss">
  .s-sedimentation {
    padding: .48rem .24rem .24rem;
    position: absolute;
    bottom: 0;
    width: 100%;
    left: 0;
  }
</style>
