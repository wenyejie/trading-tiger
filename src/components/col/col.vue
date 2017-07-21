<!--
 - author: Storm
 - date: 2017/03/31
 -->

<template>
  <div class="s-col" :class="classes" :style="styles"><slot></slot></div>
</template>

<script>
  export default {
    name: 'Col',
    props: {
      span: [Number, String],
      offset: [Number, String],
      lg: [Number, String],
      md: [Number, String],
      sm: [Number, String],
      xs: [Number, String],
      align: {
        type: String,
        validator (val) {
          return ['top', 'bottom', 'center', 'stretch'].includes(val);
        }
      }
    },
    data () {
      return {}
    },
    computed: {
      gutter() {
        return this.$parent.gutter;
      },
      classes () {
        return {
          [`s-col-${this.span}`]: !!this.span,
          [`s-col-offset-${this.offset}`]: !!this.offset,
          [`s-col-lg-${this.lg}`]: !!this.lg,
          [`s-col-md-${this.md}`]: !!this.md,
          [`s-col-sm-${this.sm}`]: !!this.sm,
          [`s-col-xs-${this.xs}`]: !!this.xs,
          [`s-col-align-${this.align}`]: !!this.align,
        }
      },
      styles () {
        let ret = {};
        if(this.gutter) {
          ret.paddingLeft = this.gutter + (/^\d+$/.test(this.gutter) ? 'px' : '');
          ret.paddingRight = ret.paddingLeft;
        }
        return ret;
      },
    }
  }

  /*@media (max-width: 768px) {
  @for $i from 1 through 24 {
    &-xs-#{$i} { width: $i / 24 * 100%; }
    &-xs-offset-#{$i} { margin-left: $i / 24 * 100% }
    }
  }

  @media (min-width: 768px) {
  @for $i from 1 through 24 {
    &-sm-#{$i} { width: $i / 24 * 100%; }
    &-sm-offset-#{$i} { margin-left: $i / 24 * 100% }
    }
  }

  @media (min-width: 992px) {
  @for $i from 1 through 24 {
    &-md-#{$i} { width: $i / 24 * 100%; }
    &-md-offset-#{$i} { margin-left: $i / 24 * 100% }
    }
  }

  @media (min-width: 1200px) {
  @for $i from 1 through 24 {
    &-lg-#{$i} { width: $i / 24 * 100%; }
    &-lg-offset-#{$i} { margin-left: $i / 24 * 100% }
    }
  }*/
</script>

<style lang="scss">
  .s-col {

    @for $i from 1 through 24 {
      &-#{$i} { width: $i / 24 * 100%; }
      &-offset-#{$i} { margin-left: $i / 24 * 100% }
    }

    &-align {

      &-top {
        align-self: flex-start;
      }

      &-bottom {
        align-self: flex-end;
      }

      &-center {
        align-self: center;
      }

      &-stretch {
        align-self: stretch;
      }
    }

  }
</style>
