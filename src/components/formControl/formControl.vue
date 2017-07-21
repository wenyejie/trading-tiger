<!--
 - 表单控件
 -
 - author: Storm
 - date: 2017/04/18
 -->

<template>
  <s-cell
    class="s-form-control"
    :class="classes"
    tag="label">
    <span class="s-form-label" v-html="label"></span>
    <template slot="right">
      <slot></slot>
    </template>
  </s-cell>
</template>

<script>
  export default {
    name: 'formControl',
    props: {
      label: [Number, String],
      required: Boolean,
      disabled: Boolean,
      readonly: Boolean
    },
    data () {
      return {}
    },
    computed: {
      classes () {
        return {
          [`s-form-required`]: !!this.required,
          [`s-form-disabled`]: !!this.disabled,
          [`s-form-readonly`]: !!this.readonly
        }
      }
    },
    methods: {}
  }
</script>

<style lang="scss">
  .s-form-control {

    padding-left: .46rem;
    position: relative;

    .s-cell {
      padding-left: .46rem;
    }

    .s-form-input,
    & input {
      min-width: 3.2rem;
      display: block;
      border: none;
      background-color: transparent;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      text-align: right;
    }
  }
</style>
