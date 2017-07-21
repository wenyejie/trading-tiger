<!--
 - Title
 -
 - author: Storm
 - date: 2017/04/23
 -->

<template>
  <div class="s-suspension" :class="classes"><slot></slot></div>
</template>

<script>
  export default {
    name: 'suspension',
    props: {
      shadow: Boolean,
      transparent: Boolean
    },
    data () {
      return {}
    },
    computed: {
      classes () {
        return {
          [`s-suspension-shadow`]: !!this.shadow,
          [`s-suspension-transparent`]: !!this.transparent
        }
      }
    },
    mounted () {
      this.$parent.bottom = this.$el.clientHeight / window.rootFontSize + .24 + 'rem';
    }
  }
</script>

<style lang="scss">
  .s-suspension {
    position: fixed;
    bottom: 0;
    padding: .15rem .24rem;
    background-color: #fff;
    max-width: 640px;
    margin-left: auto;
    margin-right: auto;
    width: 100%;

    &-transparent {
      background-color: transparent;
    }

    &-shadow {
      box-shadow:  0 -.02rem .27rem  rgba(235, 235, 235, .6);
    }
  }
</style>
