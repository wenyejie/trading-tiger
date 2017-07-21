<!--
 - Link
 -
 - author: Storm
 - date: 2017/04/17
 -->

<template>
  <s-cell
    class="s-link"
    tag="router-link"
    :to="to"
    :replace="replace"
    :size="size"
  >
    <slot></slot>
    <template slot="right">
      <slot name="right"></slot>
      <span class="s-link-icon"></span>
    </template>
  </s-cell>
</template>

<script>
//  import Cell from '../cell';
  export default {
    name: 'Link',
    /*components: {
      sCell: Cell
    },*/
    props: {
      to: {
        type: String,
        default: ''
      },
      replace: Boolean,
      size: {
        type: String,
        validator (val) {
          return ['lg', 'md', 'sm'].includes(val);
        }
      }
    },
    data () {
      return {}
    },
    methods: {}
  }
</script>

<style lang="scss">

  .s-link {

    transition: all .15s ease-in-out;
    color: inherit;

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

    &:hover,
    &:focus {
      background-color: #f4f4f4;
    }

  }
</style>
