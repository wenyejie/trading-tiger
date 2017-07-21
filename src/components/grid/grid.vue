<!--
 - grid
 -
 - author: Storm
 - date: 2017/04/25
 -->

<template>
  <ul class="s-grid" :class="classes"><slot></slot></ul>
</template>

<script>
  export default {
    name: 'grid',
    props: {
      col: {
        type: [Number, String],
        default: 3
      }
    },
    computed: {
      classes () {
        return {
          [`s-grid-${this.col}`]: !!this.col
        }
      }
    },
    data () {
      return {}
    }
  }
</script>

<style lang="scss">
  .s-grid {
    overflow: hidden;
    font-size: .24rem;


    & > li {
      text-align: center;
      float: left;
    }

    &-3 > li {
      width: 33.333333333333336%;
    }

    &-4 > li {
      width: 25%;
    }

  }
</style>
