<!--
 - App
 -
 - author: Storm
 - date: 2017/04/21
 -->

<template><div id="app"><slot></slot></div></template>

<script>
  export default {
    name: 'App',
    data () {
      return {}
    }
  }
</script>

<style lang="scss">
  #app {
    min-width: 300px;
    width: 100%;
    min-height: 100vh;
    margin: 0 auto;
    position: relative;
    box-shadow: 0 -3px .03rem 0 rgba(0, 0, 0, .5);

    @media all and (min-width: 769px) {
      max-width: 640px;
    }

    @media all and (orientation: landscape) and (max-width: 768px) {

      min-height: 100vw;

    }

  }
</style>
