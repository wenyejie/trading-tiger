<!--
 - Title
 -
 - author: Storm
 - date: 2017/04/28
 -->

<template>
  <span class="s-badge" :style="styles"><slot></slot></span>
</template>

<script>
  export default {
    name: 'badge',
    props: {
      right: [Number, String],
      top: [Number, String],
      left: [Number, String],
    },
    data () {
      return {}
    },
    computed: {
      styles () {
        let styles = {};
        if (this.right) styles.right = this.right + (/^\d+$/.test(this.right) ? 'px' : '');
        if (this.top) styles.top = this.top + (/^\d+$/.test(this.top) ? 'px' : '');
        if (this.left) styles.left = this.left + (/^\d+$/.test(this.left) ? 'px' : '');
        return styles;
      }
    },
    methods: {}
  }
</script>

<style lang="scss">
  .s-badge {
    box-sizing: content-box;
    position: absolute;
    background-color: #FF4040;
    border: 1px solid #FFFFFF;
    text-align: center;
    padding: 0 .06rem;
    height: .22rem;
    line-height: .22rem;
    font-size: .18rem;
    color: #fff;
    border-radius: .12rem;
  }
</style>
