<!--
 - Login 登录
 -
 - author: Storm
 - date: 2017/04/27
 -->

<template>

  <s-app>

    <s-header title="登录" type="white" previous="/"></s-header>

    <s-main bgc="white" class="userBotBg">

      <div class="content">

        <h2 class="userTit">账号登录</h2>

        <s-input block
                 placeholder="请输入手机号"
                 maxlength="11"
                 type="tel"
                 name="mobile"
                 v-model.trim="login.mobile"></s-input>

        <s-input block
                 placeholder="请输入登录密码"
                 type="text"
                 name="password"
                 v-model.trim="login.password"></s-input>

        <p class="userTips" v-if="userTips !== ''">{{userTips}}</p>

        <s-button type="primary" block class="userBtn" :disabled="logging" @click="handleLogin">登录</s-button>

        <s-row justify="between" class="userCtrl">
          <router-link to="/user/findPwd" class="userForgetHref">忘记密码？</router-link>
          <router-link to="/user/register" class="userRegisterHref">账号注册</router-link>
        </s-row>

      </div>

    </s-main>

  </s-app>

</template>

<script>
  export default {
    name: 'login',
    data() {
      return {
        login: {
          mobile: '',
          password: ''
        },
        userTips: '',
        logging: null,

        // 重定向的地址，登录成功之后跳转的地址
        redirectUrl: null,
      }
    },
    computed: {
      validator() {
        return {
          mobile: !!this.login.mobile && this.login.mobile.length >= 11,
          password: !!this.login.password && this.login.password.length >= 6
        }
      }
    },
    methods: {

      handleLogin() {

        if (!this.validator.mobile) {
          this.userTips = '账号不是11位的手机号码';
          return false;
        }

        if (!this.validator.password) {
          this.userTips = '密码格式错误';
          return false;
        }

        if (this.logging) return false;
        this.logging = true;
        this.userTips = '';

        this.$http
          .post('/h5/user/login', this.login, {loading: true})
          .then(response => {
            if (response.body.code !== '000') return false;

            const query = this.$route.query;
            delete query.redirectUrl;

            this.$router.replace({
              path: this.redirectUrl,
              query: query
            });
          })
          .finally(() => this.logging = false);
      }

    },
    mounted () {

      // 查找重定向地址，如果没有则默认指向首页
      this.redirectUrl = this.$route.query.redirectUrl || '/';
    }
  }
</script>
