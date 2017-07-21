<!--
 - 设置提现账户
 -
 - author: Storm
 - date: 2017/05/02
 -->

<template>
  <s-app>
    <s-header>设置提现账户</s-header>

    <s-main>
      <form novalidate ref="form" class="mt-20">
        <s-input placeholder="请输入提现支付宝账户"
                 v-model.trim="withdraw.alipayAccount"
                 name="alipayAccount"
                 title="支付宝账号"
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
               v-if="!showCountdown"
               @click="setSmsCode"
               href="javascript:;">获取验证码</a>
            <span class="c-primary countdown" v-if="showCountdown" href="javascript:;">重发
              <s-countdown v-model="countdown"
                           @on-done="countdownDone"
                           template="ss"></s-countdown></span>
          </template>
        </s-input>

        <div class="content">
          <!--<p class="c-error lh-1 mt-20">支付宝账户不存在</p>-->

          <s-button style="margin-top: .36rem" @click="handleSubmit" type="primary" block>提交</s-button>

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

        // 是否显示滑动验证码
        showSlide: null,

        // 是否倒计时
        showCountdown: null,

        // 滑动验证码数据
        slideData: {},

        // 验证码发送中
        sending: null,

        // 提交表单
        submitting: null,

        // 倒计时秒数
        countdown: 59,

        // 提现
        withdraw: {

          // 支付宝账号
          alipayAccount: '',

          // 再次确认支付宝账号
          repeatAccount: '',

          // 真是名称
          realName: '',

          // 验证码
          smsCode: null
        }
      }
    },
    methods: {

      countdownDone() {
        this.showCountdown = false;
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

        this.showCountdown = true;
        this
          .$http
          .post('/h5/user/sendSmdByUid', param)
          .then(response => {
            if (response.body.code !== '000') return false;
            this.$Message.success(`验证码已发送至您的手机号${response.body.data.mobile}，请留意`);
          })
          .finally(() => this.sending = false);
      },

      // 提交表单，设置提现账户
      handleSubmit () {
        const validate = formValidate(this.$refs.form);
        if (validate.$invalid) {
          this.$Message.warning(validate.message);
          return false;
        }

        if (this.withdraw.alipayAccount !== this.withdraw.repeatAccount) {
          this.$Message.warning('两次输入的提现账号不一致!');
          return false;
        }

        if (this.submitting) return false;
        this.submitting = true;
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
          .finally(() => this.submitting = false);
      }
    }
  }
</script>
