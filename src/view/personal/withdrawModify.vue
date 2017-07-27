<!--
 - 修改提现账户
 -
 - author: Storm
 - date: 2017/05/02
 -->

<template>
  <s-app>
    <s-header>修改提现账户</s-header>

    <s-main>

      <form novalidate ref="form">
        <p class="withdraw-account">您当前的收款账户：{{already.alipayAccount}}</p>

        <s-input placeholder="请输入当前提现账户"
                 v-model.trim="withdraw.alipayAccount"
                 name="alipayAccount"
                 title="当前提现账户"
                 required
                 block></s-input>

        <!--<s-input placeholder="请输入账户真实姓名"
                 v-model.trim="withdraw.realName"
                 name="realName"
                 title="账户真实姓名"
                 required
                 block></s-input>-->

        <div class="content">

          <!--<p class="c-error lh-1 mt-20">支付宝账户不存在</p>-->

          <s-button style="margin-top: .36rem" type="primary" @click="handleNextStep" block>下一步</s-button>

        </div>

      </form>

    </s-main>

  </s-app>
</template>

<script>
  import formValidate from '../../core/formValidate';
  export default {
    name: 'withdrawSet',
    props: {},
    data () {
      return {

        // 加载中
        loading: null,

        // 下一步
        nextting: null,

        // 提现
        withdraw: {

          // 支付宝账号
          alipayAccount: ''
        },

        //
        already: {}

      }
    },
    methods: {

      // 下一步
      handleNextStep () {
        if (!this.withdraw.alipayAccount) {
          this.$Message.warning('请输入当前提现账户进行验证');
          return false;
        }

        if (this.nextting) return false;
        this.nextting = true;
        this
          .$http
          .post('/h5/user/checkAlipayAccount', this.withdraw)
          .then(response => {
            if (response.data.code !== '000') return false;

            window.withdrawOldAlipayAccount = this.withdraw.alipayAccount;
            this.$router.push({
              path: '/personal/withdrawNew'
            })

          })
          .finally(() => this.nextting = false);
      },

      // 获取已设置的提现账户
      getAlipayAccount () {

        if (this.loading) return false;
        this.loading = true;
        this
          .$http
          .post('/h5/user/updateAlipayAccountTips')
          .then(response => {
            if (response.data.code !== '000') return false;
            this.already = response.data.data;
          })
          .finally(() => this.loading = false);

      }

    },
    mounted () {
      this.getAlipayAccount();
    }
  }
</script>

<style lang="scss">
  @import "withdrawAccount.scss";
</style>