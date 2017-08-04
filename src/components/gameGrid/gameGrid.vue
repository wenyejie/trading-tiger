<!--
 - game grid
 -
 - author: Storm
 - date: 2017/04/25
 -->

<template>
  <s-grid class="s-gameGrid">
    <slot></slot>
  </s-grid>
</template>

<script>
  import grid from '../grid';
  export default {
    name: 'gameGrid',
    components: {
      sGrid: grid
    },
    data () {
      return {}
    },
    methods: {}
  }
</script>
