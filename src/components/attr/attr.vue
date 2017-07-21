<!--
 - attr
 -
 - author: Storm
 - date: 2017/04/23
 -->

<template>
  <s-cell class="s-attr" @click="handleClick">
    <span class="s-attr-label">{{label}}</span>
    <span class="s-attr-control"><slot></slot></span>
    <template slot="right" v-if="link">
      <span class="s-attr-icon"></span>
    </template>
  </s-cell>
</template>

<script>
  export default {
    name: 'name',
    props: {
      label: String,
      link: Boolean
    },
    data () {
      return {}
    },
    methods: {
      handleClick ($event) {
        this.$emit('click', $event);
      }
    }
  }
</script>

<style lang="scss">
  .s-attr {

    min-height: .88rem;
    height: auto;
    padding: .24rem .28rem;
    font-size: .24rem;

    .s-cell-left {
      display: flex;
    }

    &-icon {
      color: #d2d2d2;
      background: url(../../assets/icon-link.png) no-repeat center;
      width: .14rem;
      height: .2rem;
      background-size: 100%;
      display: inline-block;
      vertical-align: -.015rem;
      margin-left: .07rem;
    }

    &-label {
      color: #ccc;
      width: 1.56rem;
      word-wrap: break-word;
    }

    &-control {
      color: #666;
      line-height: .32rem;
      max-width: 4.26rem;
      word-wrap: break-word;
    }

  }
</style>
