<!--
 - 提现账户设置成功
 -
 - author: Storm
 - date: 2017/05/02
 -->

<template>
  <s-app>
    <s-header>提现账户设置成功</s-header>

    <s-main bgc="white">

      <article class="withdrawSetSuccess">
        <header>
          <img class="withdrawSetSuccess-icon" src="../../assets/withdrawSet-success.png">
          <h3 class="withdrawSetSuccess-title">提现账户设置成功</h3>
        </header>

        <section class="withdrawSetSuccess-data">
          <s-row justify="between">
            <s-col class="c-b1">提现账户类型：</s-col>
            <s-col class="c-6">支付宝</s-col>
          </s-row>

          <s-row justify="between" class="mt-20">
            <s-col class="c-b1">当前提现账户：</s-col>
            <s-col class="c-6">{{$route.query.alipayAccount}}</s-col>
          </s-row>
        </section>

        <section class="withdrawSetSuccess-tips">
          <h4>重要提示：</h4>
          <p>请确保您的提现账户已通过支付宝实名认证，否则将无法提现成功！（支付宝规定，若支付宝账户未通过实名认证，将无法收到他人的转账。）</p>
        </section>

        <footer class="text-center">
          <s-button type="default" @click="goPerson">返回个人中心</s-button>
        </footer>

      </article>

    </s-main>

  </s-app>
</template>

<script>

  export default {
    name: 'withdrawSetSuccess',
    data () {
      return {}
    },
    methods: {

      /**
       * 返回个人中心首页
       */
      goPerson () {
        this.$router.replace({
          path: '/personal'
        })
      }
    }
  }
</script>

<style lang="scss">
  .withdrawSetSuccess {
    padding: 1.2rem .7rem;

    & > header {
      text-align: center;
    }

    & > footer {
      text-align: center;
      margin-top: 1.2rem;
    }

    &-title {
      font-size: .26rem;
      line-height: .37rem;
      margin-top: .37rem;
    }

    &-icon {
      display: block;
      margin-left: auto;
      margin-right: auto;
    }

    &-data {
      line-height: 1;
      margin-top: .8rem;
    }

    &-tips {
      margin-top: .8rem;
      color: #ff5650;

      h4 {
        line-height: 1;
      }

      p {
        margin-top: .2rem;
        line-height: .3rem;
        text-overflow: ellipsis;
      }
    }
  }
</style>
