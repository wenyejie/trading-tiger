<!--
 - FlagGroup
 -
 - author: Storm
 - date: 2017/04/10
 -->

<template>
  <div class="s-flagGroup">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'FlagGroup',
    props: {},
    data () {
      return {}
    },
    methods: {}
  }
</script>

<style lang="scss">
  .s-flagGroup {
    position: absolute;
    right: 0;
    top: 0;
    display: flex;
  }
</style>
