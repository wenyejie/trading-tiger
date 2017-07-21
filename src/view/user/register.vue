<!--
 - Login 注册
 -
 - author: Storm
 - date: 2017/04/27
 -->

<template>

  <s-app>

    <s-header title="注册" type="white"></s-header>

    <s-main bgc="white" class="userBotBg">

      <div class="content">

        <h2 class="userTit">注册</h2>

        <s-input block
                 placeholder="请输入手机号"
                 required
                 maxlength="11"
                 type="tel"
                 name="mobile"
                 @on-input="checkMobile()"
                 v-model.trim="register.mobile"></s-input>

        <s-input block
                 placeholder="输入验证码"
                 required
                 maxlength="6"
                 type="tel"
                 name="smsCode"
                 v-model.trim="register.smsCode">
          <template slot="right">
            <span class="userCount" v-if="!showCountdown" @click="getCode">获取验证码</span>
            <span class="userCount" v-if="showCountdown">重发<s-countdown v-model="countdown" template="ss"
                                                                        @on-done="countdownDone"></s-countdown></span>
          </template>
        </s-input>

        <s-input block
                 placeholder="请设置密码：8-20个字符，必须包含字母和数字"
                 required
                 maxlength="22"
                 type="text"
                 name="password"
                 v-model.trim="register.password"></s-input>

        <p class="userTips" v-if="userTips != ''">{{userTips}}</p>

        <s-button type="primary"
                  block class="userBtn"
                  :disabled="logging || !userAgr || !validMobile" @click="submit">提交
        </s-button>

        <div class="userAgreement">
          <s-checkbox v-model="userAgr">&nbsp;同意和遵守"
            <router-link to="/guide/userAgreement">交易虎用户协议</router-link>
            "
          </s-checkbox>
        </div>

      </div>

      <s-slidecode :showSlide="showSlide" v-model="slideData" ref="slideFun" @sendCode="sendCode"></s-slidecode>

    </s-main>

  </s-app>

</template>

<script>

  // 旧的手机号码, 判断是否已经检查过该手机号码, 避免重复检查
  let oldMobile = '';

  // 已注册手机提示
  const REGD_MOBILE_TIPS = '此手机号已被注册，若忘记密码请通过“忘记密码”找回';

  export default {
    name: 'register',
    data() {
      return {
        register: {
          mobile: '',
          password: '',
          smsCode: '',
          code: 2
        },

        // 表单提示
        userTips: '',

        // 是否显示滑动验证码
        showSlide: false,

        // 是否显示倒计时
        showCountdown: false,

        // 倒计时时间
        countdown: 59,

        // 是否同意用户协议
        userAgr: true,

        // 加载中
        logging: null,

        // 滑动验证码参数
        slideData: {},

        // 重定向的地址，登录成功之后跳转的地址
        redirectUrl: null,

        // 手机号码是否验证通过
        // 主要用于判断是否已被注册
        // 默认正确
        validMobile: null
      }
    },
    computed: {
      validator() {
        return {
          mobile: !!this.register.mobile && /^1[\d]{10}$/.test(this.register.mobile),
          smsCode: !!this.register.smsCode,
          password: !!this.register.password,
          testpassword: /^(?![^a-zA-Z]+$)(?!\D+$)/.test(this.register.password)
        }
      }
    },
    methods: {

      /**
       * 判断手机号码是否已被注册
       */
      hasRegMobile () {
        if (!this.validator.mobile) {
          this.$Message.warning('手机号码格式错误!');
          return false;
        }
        if (this.validMobile === null) {
          this.$Message.warning('正在检查手机, 请稍候!');
          return false;
        }
        if (this.validMobile === false) {
          this.$Message.warning(REGD_MOBILE_TIPS);
          return false;
        }
        return true;
      },

      /**
       * 检查手机号码是否已被注册
       */
      checkMobile () {

        // 已经验证过, 不在验证
        if (this.register.mobile === oldMobile) return false;

        // 手机号码格式错误, 不验证
        if (!/^1[\d]{10}$/.test(this.register.mobile)) return false;

        // 记录到历史中
        oldMobile = this.register.mobile;

        this
          .$http
          .post('/h5/user/checkMobile', {
            mobile: this.register.mobile
          }, {
            offMsg: true
          })
          .then(response => {
            if (response.body.code !== '000') {
              if (response.body.code === '027') {
                this.validMobile = false;
                this.$Message.warning(REGD_MOBILE_TIPS);
              }
              return false;
            }

            this.validMobile = true;

          })
      },

      getCode() {

        // 判断手机号码是否已被注册
        if (!this.hasRegMobile()) return false;

        if (!this.validator.mobile) {
          this.userTips = '账号不是11位的手机号码';
          return false;
        }

        this.userTips = '';
        this.showSlide = true;
        // this.$refs.slideFun.verify();

      },

      sendCode() {
        this.showSlide = false;
        const param = Object.assign({
          code: 2,
          mobile: this.register.mobile
        }, this.slideData);

        this.showCountdown = true;
        this.userTips = '';
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

        // 判断手机号码是否已被注册
        if (!this.hasRegMobile()) return false;

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

        if (this.register.password.length < 8 && !this.validator.testpassword) {
          this.userTips = '请输入不少于8位数，包含字母和数字组合的密码';
          return false;
        }

        if (this.logging) return false;
        this.logging = true;
        this.userTips = '';

        this.$http
          .post('/h5/user/register', this.register)
          .then(response => {
            if (response.body.code !== '000') return false;

            this.$router.push({path: this.redirectUrl});

          })
          .finally(() => {
            this.logging = false;
          });
      }
    },
    created() {

      // 查找重定向地址，如果没有则默认指向首页
      this.redirectUrl = this.$route.query.redirectUrl || '/';
    }
  }
</script>
