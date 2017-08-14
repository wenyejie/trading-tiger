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
      <section class="index-notice" v-if="announces.length">
        <h3 class="index-title"><span>公告区</span></h3>

        <ul>
          <li v-for="item in announces" v-if="item.gotoUrl && item.title"><a :href="item.gotoUrl">{{item.title}}</a></li>
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

        // 最近成交数据
        recentlyDeals: [],

        // 显示数据
        recentlyDealShow: 0,

        // 最近成交数据进行时
        recentlyDealing: null
      }
    },
    computed: {
      announces () {
        return this.$store.state.announces;
      }
    },
    asyncData ({store}) {
      return store.dispatch('getAnnounces');
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
      }
    }
  }
</script>