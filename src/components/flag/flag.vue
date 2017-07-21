<!--
 - Flag
 -
 - author: Storm
 - date: 2017/04/10
 -->

<template>
  <div
    class="s-flag"
    :class="classes"
  >
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'Flag',
    props: {
      type: {
        type: String,
        default: 'primary',
        validator (val) {
          return ['primary', 'warning', 'info'].includes(val);
        }
      }
    },
    data () {
      return {}
    },
    computed: {
      classes () {
        return {
          [`s-flag-${this.type}`]: !!this.type
        };
      }
    },
    methods: {}
  }
</script>

<style lang="scss">
  .s-flag {
    position: relative;
    width: .4rem;
    height: .5rem;
    font-size: .14rem;
    line-height: .16rem;
    text-align: center;
    color: #fff;
    padding: .05rem 0;
    margin-right: .1rem;

    span {
      margin-top: -1px;
      display: block;
      font-size: .18rem;
      line-height: 1;
      font-weight: bold;
    }

    &:after {
      position: absolute;
      content: '';
      bottom: 0;
      left: 0;
      border-width: 0 .2rem .06rem .2rem;
      border-style: solid;
      border-color: transparent transparent #fff transparent;
    }

    &-primary {
      background-color: #ff9947;
    }

    &-warning {
      background-color: #ffb816;
    }

    &-info {
      background-color: #81c8e4;
    }
  }
</style>
