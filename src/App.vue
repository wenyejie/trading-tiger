<template>
  <!--<transition name="fade" mode="out-in">

  </transition>-->
  <div id="app">
    <router-view class="view"></router-view>
  </div>
</template>

<script>
  export default {
    name: 'Wrapper',
    watch: {

      // 当页面跳转时, 自动滚动到顶部
      $route: function () {

        // 设置canonical
        document.querySelector('[rel="canonical"]').setAttribute('href', location.origin + this.$route.path);

        // 自动滚回顶部
        //window.scrollTo(0, 0);

        // 当路由变更时, 移除弹出框
        this.$Message.remove && this.$Message.remove();
      }
    }
  }
</script>