<!--
 - 数量分割
 -
 - author: Storm
 - date: 2017/05/31
 -->

<template>
  <span class="s-quantity" v-html="render"></span>
</template>

<script>
  export default {
    name: 'quantity',
    props: {
      number: Number
    },
    data () {
      return {
        counter: this.number,
        render: ''
      }
    },
    watch: {
      counter () {
        this.generate();
      }
    },
    methods: {

      /**
       * 验证数据是否正确
       */
      validator () {

        // 不是数字类型
        if (typeof val !== 'number') return false;

        // 小于
        if (val < 0) return false;
        if (val % 1 !== 0) return false;
        return true;
      },

      /**
       * 生成HTML
       */
      generate () {
        if (!this.validator()) return false;
      }
    },
    mounted () {

    }
  }
</script>
