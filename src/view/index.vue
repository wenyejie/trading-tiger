<template>
  <s-app>
    <s-header>
      <template slot="left"><img class="logo" src="../assets/logo.png"></template>
      <template slot="right">
        <a href="javascript:;" @click="goPersonal">个人中心</a>
        <span class="header-line">|</span>
        <a href="javascript:;" @click="goSell">我要卖</a>
      </template>
    </s-header>
    <s-main>

      <!-- swiper -->
      <div v-swiper="swiperOpts" class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(banner, index) in banners" :key="index">
            <router-link :to="banner.link">
              <img :src="banner.img">
            </router-link>
          </div>
          <div class="swiper-pagination swiper-pagination-bullets"></div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
      <!-- /swiper -->

      <!-- recentlyDeal -->
      <div class="index-recentlyDeal">
        <ul>
          <transition name="recentlyDeal" v-for="(item, index) in recentlyDeals" :key="index">
            <li v-show="index === recentlyDealShow">
              <router-link :to="`/goods/detail?goodsId=${item.goodsId}`">
                <span class="index-recentlyDeal-title">【{{item.gameName}}】{{item.goodsName}}</span>
                <span class="index-recentlyDeal-price">¥{{item.orderPrice}}</span>
              </router-link>
            </li>
          </transition>
          <li v-if="!recentlyDeals.length && recentlyDealing">数据加载中...</li>
          <li v-if="!recentlyDeals.length && recentlyDealing === false">暂无数据...</li>
        </ul>
      </div>
      <!-- /recentlyDeal -->

      <!-- search -->
      <s-search text="搜索" placeholder="请输入游戏名称" @on-click="searchGame"></s-search>
      <!-- /search -->

      <!-- menu -->
      <s-row class="index-menu">
        <s-col span="6">
          <router-link class="index-menu-link" to="/search?goodsClassId=1">
            <img class="index-menu-icon" src="../assets/menu-account.png">
            <p class="index-menu-name">账号</p>
          </router-link>
        </s-col>
        <s-col span="6">
          <router-link class="index-menu-link" to="/search?goodsClassId=3">
            <img class="index-menu-icon" src="../assets/menu-gameCurrency.png">
            <p class="index-menu-name">游戏币</p>
          </router-link>
        </s-col>
        <s-col span="6">
          <router-link class="index-menu-link" to="/search?goodsClassId=2">
            <img class="index-menu-icon" src="../assets/menu-equipment.png">
            <p class="index-menu-name">装备道具</p>
          </router-link>
        </s-col>
        <s-col span="6">
          <router-link class="index-menu-link" to="/guide">
            <img class="index-menu-icon" src="../assets/menu-illustrate.png">
            <p class="index-menu-name">交易指南</p>
          </router-link>
        </s-col>
      </s-row>
      <!-- /menu -->

      <!-- hotGame -->
      <section class="index-hotGame">
        <h3 class="index-title"><span>热门游戏</span></h3>
        <s-game-grid>
          <s-game-grid-item
              :key="item.gameId"
              v-for="item in hotGames"
              :link="`/goods?gameId=${item.gameId}`"
              :game="item"></s-game-grid-item>
        </s-game-grid>
      </section>
      <!-- /hotGame -->

      <!-- notice -->
      <section class="index-notice">
        <h3 class="index-title"><span>公告区</span></h3>

        <ul>
          <li v-for="item in announces" v-if="item.url && item.title"><a :href="item.url">{{item.title}}</a></li>
          <li v-if="!announces.length && announcesIng === false">暂无公告......</li>
          <!--<li>
            <router-link to="/guide/announce?announceId=1">交易虎手游交易平台正式上线运营</router-link>
          </li>
          <li>
            <router-link to="/guide/announce?announceId=2">交易虎防骗小课堂</router-link>
          </li>-->
        </ul>
      </section>
      <!-- /notice -->

      <!-- qrcode -->
      <!--<div class="index-qrcode index-menu mt-20">
        <s-row>
          <s-col span="6">
            <a class="index-menu-link" href="javascript:;">
              <img class="index-menu-icon" src="../assets/qrcode-web.png">
              <p class="index-menu-name">手机访问</p>
            </a>
          </s-col>
          <s-col span="6">
            <a class="index-menu-link" href="javascript:;">
              <img class="index-menu-icon" src="../assets/qrcode-wechat.png">
              <p class="index-menu-name">微信</p>
            </a>
          </s-col>
          <s-col span="6">
            <a class="index-menu-link" href="javascript:;">
              <img class="index-menu-icon" src="../assets/qrcode-weibo.png">
              <p class="index-menu-name">微博</p>
            </a>
          </s-col>
          <s-col span="6">
            <a class="index-menu-link" hrdef="javascript:;">
              <img class="index-menu-icon" src="../assets/qrcode-app.png">
              <p class="index-menu-name">交易虎App</p>
            </a>
          </s-col>
        </s-row>

        <p class="index-qrcode-scan">
          <s-icon type="scan"></s-icon>
          扫描交易虎官方二维码，了解更多资讯
        </p>

      </div>-->
      <!-- /qrcode -->

      <!-- slogan -->
      <section class="index-slogan mt-20">
        <h3>交易虎，您的手游交易小伙伴</h3>
        <s-row wrap>
          <s-col :span="12"><img src="../assets/slogan-money.png">交易手续费全免！</s-col>
          <s-col :span="12"><img src="../assets/slogan-time.png">7*24小时，全天服务</s-col>
          <s-col :span="12"><img src="../assets/slogan-safe.png">保护隐私，安全可靠</s-col>
          <s-col :span="12"><img src="../assets/slogan-heart.png">全心全意，真诚服务</s-col>
        </s-row>
      </section>
      <!-- /slogan -->

    </s-main>
    <s-footer></s-footer>
  </s-app>
</template>

<script>
  import Vue from 'vue';
  import app from '../components/app';
  import header from '../components/header';
  import main from '../components/main';
  import footer from '../components/footer';
  import row from '../components/row';
  import col from '../components/col';
  import search from '../components/search';
  import {gameGrid, gameGridItem} from '../components/gameGrid';
  import randomNum from '../untils/randomNum';
  import hotGames from '../data/hotGames';

  if (process.env.VUE_ENV === 'client') {
    const VueAwesomeSwiper = require('vue-awesome-swiper/ssr');
    Vue.use(VueAwesomeSwiper);
  }

  // 最近成交
  let recentlyDeal = [];

  // 最近成交动画时间戳
  let recentlyDealTimer;

  export default {
    name: 'index',
    components: {
      sApp: app,
      sHeader: header,
      sMain: main,
      sFooter: footer,
      sRow: row,
      sCol: col,
      sSearch: search,
      sGameGrid: gameGrid,
      sGameGridItem: gameGridItem
    },
    data () {
      return {

        // banners
        banners: [
          {
            link: '/guide/announce?announceId=1&ADTAG=B101&banner=1',
            img: require('../upload/banner6.jpg')
          },
          {
            link: '/guide/announce?announceId=2&ADTAG=B102&banner=1',
            img: require('../upload/banner5.png')
          }
        ],

        hotGames: hotGames,

        // swiper组件
        swiperOpts: {
          pagination: '.swiper-pagination',
          autoplay: 5000
        },

        // 公告列表
        announces: [],

        // 公告列表加载中
        announcesIng: null,

        // 最近成交数据
        recentlyDeals: [],

        // 显示数据
        recentlyDealShow: 0,

        // 最近成交数据进行时
        recentlyDealing: null
      }
    },
    methods: {

      goRecentlyDeal () {
        clearInterval(recentlyDealTimer);
        recentlyDealTimer = setInterval(() => {
          const temp = randomNum(this.recentlyDeals.length - 1);
          if (temp === this.recentlyDealShow) {
            this.goRecentlyDeal();
            return false;
          }
          this.recentlyDealShow = temp;
        }, 3000);
      },

      /**
       * 获取最近成交的数据
       */
      getRecentlyDeal () {
        this.recentlyDealing = true;
        this.$http
          .post('/h5/user/order/userTradeDynamic')
          .then(response => {
            if (response.data.code !== '000') return false;
            this.recentlyDeals = response.data.data.list;
            this.goRecentlyDeal();
          })
          .finally(() => this.recentlyDealing = false)
      },

      /**
       * 获取用户发布次数
       */
      getPublicationTimes () {
        return new Promise((resolve, reject) => {
          this
            .$http
            .post('/h5/seller/publish/sellerPublishGoodsSuccessTimes', {}, {
              loading: true
            })
            .then(response => {
              if (response.data.code !== '000') {
                reject();
                return false;
              }
              resolve(response.data.data.count);
            }, reject)
        })
      },

      /**
       * 我要卖
       */
      goSell () {

        if (!this.$cookie.has('token')) {
          this.$router.push({
            path: '/user/login',
            query: {
              redirectUrl: '/'
            }
          });
          return false;
        }

        this.getPublicationTimes()
          .then(times => {

            // 如果发布次数小于一定次数, 则进入防骗提醒`
            if (times === null || times < CONFIG.SELLER_PUBLISH_GOODS_SUCCESS_TIMES) {
              this.$router.push({
                path: '/release/reminder',
                query: {
                  redirectUrl: '/release/selectGame'
                }
              });
              return false;
            }
            this.$router.push({
              path: '/release/selectGame'
            });
          });
      },

      /**
       * 个人中心
       */
      goPersonal () {
        if (this.$cookie.has('token')) {
          this.$router.push({path: '/personal'});
          return false;
        }
        this.$router.push({
          path: '/user/login',
          query: {
            redirectUrl: '/personal'
          }
        });
      },

      /**
       * 游戏搜索
       */
      searchGame () {
        this.$router.push({
          path: '/search'
        })
      },

      /**
       * 获取公告列表
       */
      getAnnounces () {
        if (this.announcesIng) return false;
        this.announcesIng = true;
        this.$http
          .post('/h5/announceManage/listAnnounce')
          .then(response => {
            if (response.data.code !== '000') return false;
            response.data.data.forEach(item => item.url && item.title && this.announces.push(item));
          }, () => this.announcesIng = false)
          .finally(() => this.announcesIng = false)
      },
    },
    mounted () {
      this.getAnnounces();
      this.getRecentlyDeal();
    }
  }
</script>

<style lang="scss">

  .index-swiper img {
    min-height: 3rem;
  }
  .index-message {
    font-size: .22rem;
    line-height: 1;
    padding: .2rem .16rem;

    a {
      background-color: #fff;
      border-radius: .06rem;
      display: block;
      padding: .38rem .18rem .4rem;
      color: #333;
    }

    span {
      color: #ff7653;
    }

    img {
      vertical-align: -.155em;
      width: .35rem;
      height: .2rem;
    }
  }
  .index-title {
    text-align: center;
    line-height: 1;
    font-weight: bold;

    span {
      padding: 0 .2rem;
      display: inline-block;
      position: relative;

      &:after,
      &:before {
        content: '';
        background-color: #979797;
        width: .2rem;
        height: 1px;
        position: absolute;
        top: 50%;
        margin-top: -.005rem;
      }

      &:before {
        left: -.2rem;
      }

      &:after {
        right: -.2rem;
      }

    }
  }
  .index-menu {
    text-align: center;
    font-size: .24rem;
    line-height: 1;
    background-color: #fff;
    padding-bottom: .4rem;
    border-bottom: 1px solid #e5e5e5;

    &-link {
      display: block;
      color: #666;
      padding: .2rem .1rem .1rem;
      transition: all .3s ease;
      border-radius: .05rem;

      &:hover,
      &:focus {
        background-color: #eee;
      }

    }

    &-icon {
      width: .8rem;
      height: .8rem;
      display: block;
      margin-left: auto;
      margin-right: auto;
    }

    &-name {
      margin-top: .18rem;
    }

  }
  .index-hotGame {
    padding: .36rem 0 .28rem;
    background-color: #fff;
    margin-top: .2rem;
    border-bottom: 1px solid #e5e5e5;
  }
  .index-notice {
    margin-top: .2rem;
    padding: .36rem .36rem .56rem;
    background-color: #fff;
    border-bottom: 1px solid #e5e5e5;
    font-size: .24rem;
    line-height: .3rem;

    ul {
      margin-top: .33rem;
      list-style: inside decimal;
      color: #666;
    }

    li + li {
      margin-top: .14rem;
    }

    li:hover,
    li:focus {
      color: #5e97f6;

      a {
        color: #5e97f6;
      }
    }

    a {
      color: #333;
    }

  }
  .logo {
    width: 1.92rem;
    height: .68rem;
    margin: .1rem 0 0 .14rem;
  }
  .index-qrcode {
    padding-top: .2rem;
    padding-bottom: .5rem;
    &-scan {
      margin-top: .4rem;

    }

    .s-icon {
      margin-right: .12rem;
      font-size: .24rem;
    }
  }
  .index-slogan {
    line-height: 1;
    padding: .35rem;
    background-color: #fff;
    font-size: .24rem;
    color: #666;

    h3 {
      margin-bottom: .1rem;
      text-align: center;
      font-size: .24rem;
    }

    img {
      width: .24rem;
      margin-right: .1rem;
      margin-bottom: -.1em;
    }

    .s-col {
      margin-top: .3rem;
      font-weight: 300;
    }
  }
  .index-recentlyDeal {
    background: #fff url(../assets/recently-deal.png) no-repeat .24rem center;
    background-size: .98rem .24rem;
    line-height: 1;
    padding: .3rem .24rem .3rem 1.36rem;

    ul {
      position: relative;
      height: .24rem;
      overflow: hidden;
    }

    a {
      display: flex;
      transition: transform .3s linear, opacity .3s linear;
      position: absolute;
      width: 100%;
      color: #333;

      &:hover,
      &:focus {
        color: #5e97f6;
      }
    }

    &-title {
      overflow: hidden;
      display: block;
      flex: 1;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-right: .18rem;
    }

    &-price {
      color: #fd802c;
    }
  }
  .recentlyDeal-enter-active {
    transform: translateY(100%);
    opacity: 0;
  }
  .recentlyDeal-leave-active {
    transform: translateY(-100%);
    opacity: 0;
  }

</style>