<!--
 - Title
 -
 - author: Storm
 - date: 2017/07/05
 -->

<template>
  <router-view></router-view>
</template>

<script>
  export default {
    name: 'user',
    props: {},
    data () {
      return {}
    }
  }
</script>

<style lang="scss">
  .userTit {
    padding: .52rem 0 .64rem 0;
    font-size: .34rem;
    color: #333;
    text-align: center;
  }
  .userTips {
    font-size: .22rem;
    color: #f85959;
    padding: .2rem 0 0 .16rem;
  }
  .userBotBg {
    background: url(../../assets/userBot.png) no-repeat bottom center #fff;
    background-size: contain;
  }
  .userBtn {
    margin-top: .48rem;
  }
  .userCtrl {
    padding-top: .42rem;
  }
  .userForgetHref {
    font-size: .24rem;
    color: #999;
    display: block;
  }
  .userRegisterHref {
    font-size: .24rem;
    color: #fd802c;
    text-decoration: underline;
    display: block;
  }
  .userAgreement {
    padding-top: .48rem;
    text-align: center;
    font-size: .22rem;
    color: #666;
  }
  .userCountWrapper {
    position: relative;
  }
  .userCount {
    font-size: .26rem;
    color: #fd802c;
  }
</style>
