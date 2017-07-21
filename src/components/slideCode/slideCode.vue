<!--
 - slide code
 -
 - author: 董露刚
 - date: 2017/05/04
 -->

<template>

  <div class="slideBox">

    <!-- 此段必须要引入 -->
    <div id="_umfp"></div>
    <!-- 引入结束 -->

    <div class="ln2" v-show="showSlide">

      <div id="dom_id"></div>

    </div>

  </div>

</template>

<script>
  export default {
    name: 'slidecode',
    props: {
      value: {
        type: Object,
        default: () => {
        }
      },
      showSlide: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      showSlide (val) {
        val && this.verify();
      }
    },
    methods: {

      verify() {
        const script = document.createElement('script');
        const head = document.querySelector('head');
        script.src = '//g.alicdn.com/sd/nch5/index.js?t=' + Date.now();
        head.appendChild(script);
        script.onload = () => {
          const nc_appkey = 'FFFF000000000167EFDD'; // 应用标识,不可更改
          const nc_scene = 'login_h5'; //场景,不可更改
          const nc_token = [nc_appkey, Date.now(), Math.random()].join(':');
          const nc_option = {
            renderTo: '#dom_id', //渲染到该DOM ID指定的Div位置
            appkey: nc_appkey,
            scene: nc_scene,
            token: nc_token,

            // trans: '{"name1":"code100"}',//测试用，特殊nc_appkey时才生效，正式上线时请务必要删除；code0:通过;code100:点击验证码;code200:图形验证码;code300:恶意请求拦截处理
            callback: data => { // 校验成功回调
              setTimeout(() => this.$emit('sendCode'), 1000);
              this.$emit('input', {
                session: data.csessionid,
                sig: data.sig,
                jaqToken: nc_token,
                scene: nc_scene
              });
              head.removeChild(script);
            },
            error: s => {
            },
            verifycallback: function (data) {
              if (data.code === "200") {
              }
            }
          };
          NoCaptcha.init(nc_option);
          NoCaptcha.setEnabled(true);
        }
      }

    },
    beforeDestroy () {
      const $overlay = document.querySelector('.nc-h5-overlay');
      $overlay && ($overlay.style.display = 'none');
      const $stage = document.querySelector('.stage.stage2');
      $stage && $stage.remove();
    }
  }
</script>

<style lang="scss">
  .ln2 {
    position: fixed;
    width: 100%;
    height: 100%;
    max-width: 640px;
    top: 0;
    background: rgba(0, 0, 0, .5);
    z-index: 1024;
  }
  .ln2 .nc-container {
    width: 100%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  .ln2 ._nc .stage {
    padding: 0 .3rem;
    height: 1rem;
  }
  .ln2 ._nc .stage1 .slider {
    height: 1rem;
    left: .3rem;
    right: .3rem;
    border-radius: 1rem;
    background-color: #656565;
  }
  .ln2 ._nc .stage1 .track {
    border-radius: 1rem;
    min-width: 1rem;
  }
  .ln2 ._nc .stage1 .bg-green {
    height: 1rem;
    line-height: 1rem;
    font-size: .32rem;
    background-color: #656565;
    color: #fd802c;
  }
  .ln2 ._nc .stage1 .bg-red {
    height: 1rem;
    line-height: 1rem;
    font-size: .32rem;
    background-color: #656565;
    color: #fd802c;
  }
  .ln2 ._nc .stage1 .label {
    height: 1rem;
    line-height: 1rem;
    font-size: .32rem;
    background: -webkit-gradient(linear, left top, right top, color-stop(0, #a2a2a2), color-stop(.4, #a2a2a2), color-stop(.5, white), color-stop(.6, #a2a2a2), color-stop(1, #a2a2a2));
    -webkit-background-clip: text;
  }
  .ln2 ._nc .stage1 .button {
    width: .88rem;
    height: .88rem;
    background-color: #fff;
    border-radius: 50%;
    margin: .06rem;
  }
  .ln2 ._nc .stage1 .icon {
    width: .44rem;
    height: .44rem;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
  .ln2 ._nc .stage1 .icon-ok {
    width: .33rem;
    height: .24rem;
  }
  .ln2 ._nc .stage1 .icon-close {
    width: .3rem;
    height: .3rem;
  }
  .ln2 ._nc .stage3 {
    padding: 0;
  }
  .ln2 ._nc .icon-slide-arrow:before {
    content: " ";
    display: block;
    background: url(../../assets/fingerprint.png) no-repeat;
    background-size: 100% 100%;
    width: .44rem;
    height: .44rem;
  }
  .ln2 ._nc .icon-ok:before {
    content: " ";
    display: block;
    background: url(../../assets/checked.png) no-repeat;
    background-size: 100% 100%;
    width: .33rem;
    height: .24rem;
  }
  .ln2 ._nc .icon-close:before {
    content: " ";
    display: block;
    background: url(../../assets/slideFalse.png) no-repeat;
    background-size: 100% 100%;
    width: .3rem;
    height: .3rem;
  }
  .ln2 ._nc .icon-slide-arrow {
    font-size: .4rem;
    color: #dbdbdb
  }
  .ln2 ._nc .icon-ok {
    font-size: .4rem;
    color: #7ac23c
  }
  .ln2 ._nc .icon-close {
    font-size: .4rem;
    color: #fc5620
  }
  .ln2 ._nc .icon-load-c {
    font-size: .4rem;
    color: #7ac23c;
    padding-top: 2px
  }
  .ln2 ._nc .icon-onclick {
    font-size: .4rem;
    color: #ddd
  }
  .ln2 ._nc .icon-notclick {
    font-size: .4rem;
    color: #ddd
  }
  .ln2 ._nc .stage3 .title {
    color: #fff;
  }
  .ln2 ._nc .stage3 .menu .icon {
    color: #fff;
    margin-right: .1rem;
  }
  .ln2 ._nc .stage3 .menu .label {
    color: #fff;
  }
  body .nc-h5-overlay {
    font-size: .32rem;
    max-width: 640px;
    margin: 0 auto;
  }
  body ._nc .stage2 .textbox .input {
    left: 0;
    top: .12rem;
    width: 4.5rem;
    height: .6rem;
    font-size: .26rem;
    padding-left: .2rem;
  }
  body ._nc .stage2 .textbox .placeholder {
    top: .26rem;
    left: .2rem;
    font-size: .26rem;
  }
  body ._nc .stage2 .icon {
    font-size: .4rem;
  }
  body ._nc .icon {
    width: .5rem;
    height: .5rem;
  }
  body ._nc .stage2 .icon.refresh {
    top: .2rem;
  }
  body .nc-h5-overlay div.info i.nc-iconfont {
    color: #fe7653;
  }
  body .nc-h5-overlay div.info span {
    color: #999;
    font-size: .22rem;
    vertical-align: middle;
  }
  body .nc-h5-overlay div.info i.nc-iconfont {
    font-size: 100%;
  }
  body ._nc .stage2 .icon.tip {
    display: none;
  }
  body ._nc .stage2 .icon.clear {
    left: 2rem;
    top: .2rem;
    display: none !important;
  }
  body ._nc .stage2 .textbox .code {
    border-left: none;
    top: 20%;
    right: .8rem;
  }
  body ._nc .stage2 .textbox {
    height: .88rem;
  }
  body ._nc.nc-h5-overlay .stage2.stage div.ope {
    padding: 0 .24rem;
  }
  body ._nc .stage2 .btn-ok, ._nc .stage2 .tips {
    height: .8rem;
    font-size: .26rem;
    border-radius: .1rem;
    background: -webkit-linear-gradient(-90deg, #ff775e 0%, #f9a567 100%);
    background: linear-gradient(-90deg, #ff775e 0%, #f9a567 100%);
  }
  body ._nc .stage2 .btn-ok:disabled {
    opacity: 0.2;
  }
  #_umfp {
    display: inline;
    width: 1px;
    height: 1px;
    overflow: hidden
  }
</style>
