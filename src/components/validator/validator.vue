<!--
 - 表单验证
 -
 - author: Storm
 - date: 2017/04/25
 -->

<template>
  <form novalidate>
    <slot></slot>
  </form>
</template>

<script>
  export default {
    name: 'validator',
    props: {
      value: Object
    },
    data () {
      return {
        formElement: [],
        modelVal: this.value
      }
    },
    methods: {
      getInput () {

      }
    },
    mounted () {

      setTimeout(() => {
        console.log([this.$el]);
        console.log('length', this.$el.length);
        for (let index = 0; index < this.$el.length; index++) {
          console.log(this.$el[index]);
        }
      }, 0);
    }
  }
</script>
