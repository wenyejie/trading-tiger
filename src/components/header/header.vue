<!--
 - Header
 -
 - author: Storm
 - date: 2017/04/10
 -->

<template>

  <header class="header" :class="classes">
    <div class="header-l" v-if="left">
      <slot name="left">
        <div @click="back()" class="header-back"></div>
      </slot>
    </div>
    <div class="header-c" v-if="center">
      <h1 class="header-title">
        <slot></slot>
      </h1>
    </div>
    <div class="header-r" v-if="right">
      <slot name="right"></slot>
    </div>
    <div v-if="!right && !disableNav"
         :class="toggleNav ? 'on' : 'off'"
         class="header-nav">
      <a href="javascript:;"
         @click="toggleNav = !toggleNav"
         class="header-nav-btn"></a>
      <transition name="header-nav-toggle">
        <nav v-if="toggleNav" class="header-nav-toggle">
          <ul>
            <li class="header-nav-item header-nav-home">
              <router-link to="/">首页</router-link>
            </li>
            <li class="header-nav-item header-nav-personal">
              <router-link to="/personal">个人中心</router-link>
            </li>
            <li class="header-nav-item header-nav-sell">
              <a href="javascript:;" @click="goSell">我要卖</a>
            </li>
            <li class="header-nav-item header-nav-receipt">
              <router-link to="/order/buyer/unreceive">去收货</router-link>
            </li>
          </ul>
        </nav>
      </transition>
    </div>
  </header>

</template>

<script>
  export default {
    name: 'Header',
    props: {
      type: {
        type: String,
        default: 'default',
        validator (val) {
          return ['default', 'white', 'transparent'].includes(val)
        }
      },
      left: {
        type: Boolean,
        default: true
      },

      // 是否需要导航
      disableNav: Boolean,
      title: String,
      absolute: Boolean,
      previous: String,
      sellParams: Object,
      naturalTitle: String
    },
    data () {
      return {
        right: false,
        center: false,

        // 是否显示菜单栏
        toggleNav: false
      }
    },
    computed: {
      classes () {
        return {
          [`header-${this.type}`]: this.type,
          [`header-absolute`]: !!this.absolute,
        };
      }
    },
    watch: {
      title () {
        this.setTitle();
      },

      naturalTitle () {
        this.setTitle();
      }
    },
    methods: {

      /**
       * 跳转至登录页
       */
      goLogin () {
        if (this.$cookie.has('token')) return true;

        if (this.$route.path === '/user/login') {
          this.$Message.info('请先登录!');
          return false;
        }

        this.$router.push({
          path: '/user/login',
          query: {
            redirectUrl: this.$route.path
          }
        });
        return false;
      },

      /**
       * 跳转至个人中心
       */
      goPersonal () {
        if (!this.goLogin()) return false;

        this.$router.push({
          path: '/personal'
        });
      },

      /**
       * 获取用户发布次数
       */
      getPublicationTimes () {
        return new Promise(resolve => {
          this
            .$http
            .post('/h5/seller/publish/sellerPublishGoodsSuccessTimes', {}, {
              loading: true
            })
            .then(response => {
              if (response.data.code !== '000') return false;
              resolve(response.data.data.count);
            })
        })
      },

      /**
       * 我要卖
       */
      goSell () {
        if (!this.goLogin()) return false;

        this.getPublicationTimes()
          .then(times => {

            // 如果存在我要卖的参数, 则跳转到选择商品分类, 否则跳转到选择游戏
            const path = this.sellParams ? '/release/selectClass' : '/release/selectGame';

            // 如果发布次数小于一定次数, 则进入防骗提醒
            if (times === null || times < CONFIG.SELLER_PUBLISH_GOODS_SUCCESS_TIMES) {
              this.$router.push({
                path: '/release/reminder',
                query: Object.assign({}, {
                  redirectUrl: path
                }, this.sellParams)
              });
              return false;
            }

            // 否则进入选择游戏页面
            this.$router.push({
              path: path,
              query: this.sellParams
            });
          });
      },

      back () {
        if (this.previous) {
          this.$router.push({path: this.previous});
          return false;
        }

        // this.$router.go(-1);
        window.history.go(-1);
      },

      /**
       * 设置页面标题
       */
      setTitle () {

        // 设置标题
        /*if (this.naturalTitle) {
          document.title = this.naturalTitle;
          return false;
        }
        if (this.$slots.default) {
          document.title = this.$slots.default[0].text + ' - ' + CONFIG.APP_NAME;
        } else if (this.title) {
          document.title = this.title + ' - ' + CONFIG.APP_NAME;
        } else {
          document.title = CONFIG.APP_NAME;
        }*/
      }
    },
    mounted () {
      this.right = !!this.$slots.right;
      this.center = !!this.$slots.default;
      this.setTitle();
    }
  }
</script>

<style lang="scss">
  .header {
    height: .88rem;
    position: fixed;
    z-index: 1024;
    min-width: 300px;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    top: 0;

    @media all and (min-width: 769px) {
      max-width: 640px;
    }

    &-default {
      background-image: linear-gradient(to left, #f25200 0%, #ff9616 100%);
      color: #fff;

      a {
        color: #fff;
      }

    }

    &-transparent {
      background-color: transparent;
      color: #333;

      a {
        color: #333;
      }
    }

    &-white {
      background-color: #fff;
      color: #333;

      .header {
        &-back {
          background-image: url(../../assets/icon-back-white.png);
        }

        &-nav-btn:after {
          background-color: rgba(46, 43, 43, 0.9);
          box-shadow: 0 -0.12rem 0 0 rgba(46, 43, 43, 0.9), 0 0.12rem 0 0 rgba(46, 43, 43, 0.9);
        }
      }

      a {
        color: #fff;
      }
    }

    &-absolute {
      position: absolute;
    }

    &-l,
    &-r,
    &-nav {
      position: absolute;
      top: 0;
      line-height: .88rem;
      height: .88rem;
    }

    &-l {
      left: 0;
    }

    &-r {
      right: 0;
      font-size: .28rem;

      a {
        display: inline-block;
        font-size: .28rem;
        padding-left: .2rem;
        padding-right: .2rem;
      }
    }

    &-c {
      flex: 1;
      margin-left: 1.5rem;
      margin-right: 1.5rem;
      overflow: hidden;
    }

    &-back {
      box-sizing: content-box;
      display: inline-block;
      height: .88rem;
      padding: 0 .3rem;
      width: .2rem;
      cursor: pointer;
      background: url(../../assets/icon-back.png) no-repeat center;
      background-size: .2rem .36rem;
    }

    &-title {
      font-size: .32rem;
      line-height: .88rem;
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &-line {
      color: rgba(255, 255, 255, .2);
      margin-left: .022rem;
      margin-right: .022rem;
    }

    &-nav {

      right: 0;

      & > a {
        transition: transform .3s ease-in-out;
      }

      &.on {
        & > a {
          transform: rotate(90deg);
        }
      }

      &-btn {
        display: block;
        padding: .24rem;
        width: .88rem;
        height: .88rem;
        position: relative;

        &:after {
          content: '';
          width: .4rem;
          height: .04rem;
          position: absolute;
          top: 50%;
          margin-top: -.02rem;
          left: .24rem;
          background-color: #fff;
          box-shadow: 0 -.12rem 0 0 #fff, 0 .12rem 0 0 #fff;
        }

      }

      nav {
        position: absolute;
        right: .22rem;
        top: .98rem;
        background-color: rgba(46, 43, 43, 0.90);
        box-shadow: 0 .04rem .2rem 0 rgba(144, 144, 146, 0.50);
        border-radius: .04rem;
        width: 2rem;
        font-size: .24rem;
        color: #fff;
        transition: all .3s ease-in-out;
      }

      &-item a {
        display: block;
        padding: .24rem 0 .24rem .72rem;
        line-height: .32rem;
        position: relative;

        &:hover {
          background-color: rgba(255, 255, 255, .1);
        }

        &::before {
          content: '';
          position: absolute;
          left: .24rem;
          top: .24rem;
          width: .32rem;
          height: .32rem;
          background-repeat: no-repeat;
          background-size: 100%;
        }

      }

      &-home a::before {
        background-image: url(../../assets/nav-home.png);
      }

      &-personal a::before {
        background-image: url(../../assets/nav-personal.png);
      }

      &-sell a::before {
        background-image: url(../../assets/nav-sell.png);
      }

      &-receipt a::before {
        background-image: url(../../assets/nav-receipt.png);
      }

      &-toggle-enter,
      &-toggle-leave-active {
        opacity: 0;
        transform: translateX(25%);
      }
    }

  }
</style>
