<!--
 - page 404
 -
 - author: Storm
 - date: 2017/04/17
 -->

<template>
  <s-app>
    <s-header>404</s-header>
    <s-main>
      <s-nothing @click="handleClick" title="页面不存在或者已删除" status="404"></s-nothing>
    </s-main>
  </s-app>
</template>

<script>
  export default {
    name: 'page404',
    data () {
      return {}
    },
    methods: {
      handleClick () {
        this.$router.go(-1);
      }
    }
  }
</script>
