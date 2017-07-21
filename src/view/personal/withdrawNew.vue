<!--
 - 设置新的提现账户
 -
 - author: Storm
 - date: 2017/06/01
 -->

<template>
  <s-app>
    <s-header>设置新的提现账户</s-header>

    <s-main>

      <form novalidate ref="form">
        <p class="withdraw-account">您当前的收款账户：{{already.alipayAccount}}</p>

        <s-input placeholder="请输入提现支付宝账户"
                 v-model.trim="withdraw.alipayAccount"
                 name="alipayAccount"
                 title="当前提现账户"
                 required
                 block></s-input>

        <s-input placeholder="请再次输入提现账户"
                 v-model.trim="withdraw.repeatAccount"
                 name="repeatAccount"
                 title="提现账户"
                 required
                 block></s-input>

        <s-input placeholder="请输入验证码"
                 v-model.trim="withdraw.smsCode"
                 name="smsCode"
                 title="验证码"
                 required
                 block>
          <template slot="right">
            <a class="c-primary countdown"
               v-if="!isCountdown"
               @click="setSmsCode"
               href="javascript:;">获取验证码</a>
            <span class="c-primary countdown" v-if="isCountdown" href="javascript:;">重发
              <s-countdown v-model="countdown"
                           template="ss"
                           @on-done="countdownDone"></s-countdown></span>
          </template>
        </s-input>

        <div class="content">

          <!--<p class="c-error lh-1 mt-20">支付宝账户不存在</p>-->

          <s-button style="margin-top: .36rem" type="primary" @click="handleNextStep" block>提交</s-button>

          <p class="c-error mt-25 lh-1_5">目前仅支持支付宝账户提现，请正确输入您已经实名认证的支付宝账户，非实名账户无法收款</p>

        </div>

      </form>

      <s-slidecode :showSlide="showSlide" v-model="slideData" @sendCode="sendCode"></s-slidecode>

    </s-main>

  </s-app>
</template>

<script>
  import formValidate from '../../core/formValidate';
  import './withdrawAccount.scss';
  export default {
    name: 'withdrawSet',
    props: {},
    data () {
      return {

        // 加载中
        loading: null,

        // 是否显示滑动验证码
        showSlide: null,

        // 是否倒计时
        isCountdown: null,

        // 倒计时秒数
        countdown: 59,

        // 滑动验证码数据
        slideData: {},

        // 验证码发送中
        sending: null,

        // 下一步
        nextting: null,

        // 提现
        withdraw: {

          // 旧的支付宝账号
          oldAlipayAccount: '',

          // 支付宝账号
          alipayAccount: '',

          // 再次确认支付宝账号
          repeatAccount: '',

          // 验证码
          smsCode: null,

          // 是否校验账号的合法性
          checkAliAccount: false
        },

        //
        already: {}

      }
    },
    methods: {

      countdownDone() {
        this.isCountdown = false;
      },

      // 下一步
      handleNextStep () {
        const validate = formValidate(this.$refs.form);
        if (validate.$invalid) {
          this.$Message.error(validate.message);
          return false;
        }

        if (this.withdraw.alipayAccount !== this.withdraw.repeatAccount) {
          this.$Message.warning('两次输入的提现账号不一致!');
          return false;
        }

        if (this.nextting) return false;
        this.nextting = true;
        this
          .$http
          .post('/h5/user/setAlipayAccount', this.withdraw)
          .then(response => {
            if (response.body.code !== '000') return false;
            this.$router.push({
              path: '/personal/withdrawSetSuccess',
              query: {
                alipayAccount: this.withdraw.alipayAccount
              }
            })
          })
          .finally(() => this.nextting = false);
      },

      // 展示滑动验证码
      setSmsCode () {
        this.showSlide = true;
      },

      // 发送验证码
      sendCode () {
        this.showSlide = false;

        if (this.sending) return false;
        this.sending = true;

        const param = Object.assign({
          code: 17
        }, this.slideData);

        this.isCountdown = true;
        this
          .$http
          .post('/h5/user/sendSmdByUid', param)
          .then(response => {
            if (response.body.code !== '000') return false;
            this.$Message.success(`验证码已发送至您的手机号${response.body.data.mobile}，请留意`);
          })
          .finally(() => this.sending = false);
      },

      // 获取已设置的提现账户
      getAlipayAccount () {

        if (this.loading) return false;
        this.loading = true;
        this
          .$http
          .post('/h5/user/updateAlipayAccountTips')
          .then(response => {
            if (response.body.code !== '000') return false;
            this.already = response.body.data;
          })
          .finally(() => this.loading = false);

      }

    },
    created () {
      this.withdraw.oldAlipayAccount = window.withdrawOldAlipayAccount;

      // 数据篡改, 返回上一页
      if (!this.withdraw.oldAlipayAccount) {
        this.$Message.error('请重新验证当前账户!')
        this.$router.go(-1);
      }
      this.getAlipayAccount();
    }
  }
</script>
