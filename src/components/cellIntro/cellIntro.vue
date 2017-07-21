<!--
 - Cell Intro
 -
 - author: Storm
 - date: 2017/04/17
 -->

<template>
  <h4 class="s-cell-intro" :class="classes">
    <s-icon :type="iconName"
            v-if="this.iconName"
            class="s-cell-intro-icon"></s-icon>
    <span class="s-cell-intro-inner"><slot></slot></span>
  </h4>
</template>

<script>
  export default {
    name: 'CellIntro',
    props: {
      icon: {
        type: String,
        validator (val) {
          return ['warning'].includes(val);
        }
      },
      type: {
        type: String,
        validator (val) {
          return ['primary'].includes(val);
        }
      }
    },
    computed: {
      classes () {
        return {
          [`s-cell-intro-${this.type}`]: !!this.type
        }
      },
      iconName () {
        const icon = {
          warning: 'warnfill'
        };
        return icon[this.icon]
      }
    },
    methods: {}
  }
</script>

<style lang="scss">
  .s-cell-intro {
    font-size: .22rem;
    line-height: 1.2727272727272727;
    padding: .11rem .24rem;
    background-color: #f4f4f4;
    color: #666;
    display: flex;

    &-primary {
      color: #f37652;
    }

    &-icon {
      font-size: .2rem;
      margin-left: -.1rem;
      margin-right: .12rem;
      color: #ff7653;
      padding-top: .03rem;
    }

  }
</style>
