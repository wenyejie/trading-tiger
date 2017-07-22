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

<style lang="scss">
  .s-gameGrid {

    &-item {
      margin-top: .12rem;
      padding: 0 .24rem;
    }

    &-link {
      display: block;
      color: #333;
      padding: .24rem 0;
    }

    &-item:nth-child(n+4) {
      margin-top: .26rem;
    }

    &-icon {
      width: 1rem;
      height: 1rem;
      display: block;
      margin-left: auto;
      margin-right: auto;
      border-radius: .24rem;
      box-shadow: 0 .08rem .16rem 0 #e0e0e0;
    }

    &-name {
      margin-top: .12rem;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

  }
</style>
