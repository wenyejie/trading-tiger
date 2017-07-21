<!--
 - Login 找回密码
 -
 - author: Storm
 - date: 2017/04/27
 -->

<template>

  <s-app>

    <s-header title="找回密码" type="white"></s-header>

    <s-main bgc="white" class="userBotBg">

      <div class="content">

        <h2 class="userTit">找回密码</h2>

        <s-input block
                 placeholder="请输入手机号"
                 required
                 maxlength="11"
                 type="tel"
                 name="mobile"
                 v-model.trim="findPwd.mobile"></s-input>

        <s-input block
                 placeholder="输入验证码"
                 required
                 maxlength="6"
                 type="tel"
                 name="smsCode"
                 v-model.trim="findPwd.smsCode">
          <template slot="right">
            <span class="userCount"
                  v-if="!showCountdown"
                  @click="getCode">获取验证码</span>
            <span class="userCount"
                  v-if="showCountdown">重发
              <s-countdown v-model="countdown"
                           template="ss"
                           @on-done="countdownDone"></s-countdown></span>
          </template>
        </s-input>

        <s-input block
                 placeholder="请设置新密码"
                 required
                 maxlength="22"
                 type="text"
                 name="password"
                 v-model.trim="findPwd.password"></s-input>

        <p class="userTips" v-if="userTips != ''">{{userTips}}</p>

        <s-button type="primary" block class="userBtn" :disabled="logging" @click="submit()">提交</s-button>

      </div>

    </s-main>

    <s-slidecode :showSlide="showSlide" v-model="slideData" ref="slideFun" @sendCode="sendCode"></s-slidecode>

  </s-app>

</template>

<script>
  export default {
    name: 'findPwd',
    data() {
      return {
        findPwd: {
          mobile: '',
          password: '',
          smsCode: '',
          code: 3
        },

        // 滑动验证码返回的值
        slideData: null,
        userTips: '',
        showSlide: false,
        showCountdown: false,
        countdown: 59,
        logging: null
      }
    },
    computed: {
      validator() {
        return {
          mobile: !!this.findPwd.mobile && this.findPwd.mobile.length >= 11,
          smsCode: !!this.findPwd.smsCode,
          password: !!this.findPwd.password,
          testpassword: /^(?![^a-zA-Z]+$)(?!\D+$)/.test(this.findPwd.password)
        }
      }
    },
    methods: {

      getCode() {

        if (!this.validator.mobile) {
          this.userTips = '账号不是11位的手机号码';
          return false;
        }

        this.userTips = '';
        this.showSlide = true;
        this.$refs.slideFun.verify();

      },

      sendCode() {
        this.showSlide = false;
        const param = Object.assign({}, this.findPwd, this.slideData);
        this.userTips = '';
        this.showCountdown = true;
        this.$http
          .post('/h5/user/sendSmscode', param)
          .then(response => {
            if (response.body.code !== '000') return false;
          });
      },

      countdownDone() {
        this.showCountdown = false;
      },

      submit() {

        if (!this.validator.mobile) {
          this.userTips = '账号不是11位的手机号码';
          return false;
        }

        if (!this.validator.smsCode) {
          this.userTips = '验证码不能为空';
          return false;
        }

        if (!this.validator.password) {
          this.userTips = '密码不能为空';
          return false;
        }

        if (this.findPwd.password.length < 8 && !this.validator.testpassword) {
          this.userTips = '请输入不少于8位数，包含字母和数字组合的密码';
          return false;
        }

        if (this.logging) return false;
        this.logging = true;
        this.userTips = '';

        this.$http
          .post('/h5/user/findPwd', this.findPwd)
          .then(response => {
            if (response.body.code !== '000') return false;
            this.$router.push({
              path: '/personal'
            });
          })
          .finally(() => {
            this.logging = false;
          });
      }
    },
    created() {
    }
  }
</script>
