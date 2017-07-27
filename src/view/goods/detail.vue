<!--
 - 商品详情
 -
 - author: Storm
 - date: 2017/04/23
 -->

<template>

  <s-app>

    <s-header :naturalTitle="naturalTitle">{{goods.gameName}}商品介绍
      <!--v-if="$browser.isMobile"-->
      <!--<template slot="right" >
        <a href="javascript:;" @click="goodsShare" class="goodsDetail-share"></a>
      </template>-->
    </s-header>

    <s-main bgc="white" :loading="loading !== false">

      <!-- swiper -->
      <div v-swiper="swiperOpts"
           class="swiper-container goodsDetail-swiper"
           v-if="goods.picUrls.length >= 1">
        <div class="swiper-wrapper">
          <div class="swiper-slide goodsDetail-slide"
               v-for="(item, index) in goods.picUrls"
               :key="item.goodsPicId"
               :class="{'unReviewed': item.picStatus === 1, 'unPass': item.picStatus === 3}">
            <qiniu-img :src="item.picUrl"
                       @click="onGallery(item.picUrl)"
                       width="640"
                       mode="2"
                       height="300"></qiniu-img>
          </div>
          <div class="swiper-pagination swiper-pagination-bullets"></div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
      <!-- /swiper -->

      <header class="goodsDetail-header" style="padding-left:0; padding-right: 0;">

        <h3>
          <!--<span v-if="goods.picUrls.length > 0" class="bg-img"></span>-->
          <s-label :type="goodsType">{{goods.subClassName}}</s-label>
          <span style="vertical-align: -0.1em;">{{goods.showTitle}}</span>
        </h3>

        <s-row justify="between" align="center">
          <s-col class="goodsDetail-price">￥{{goods.price}}</s-col>
          <s-col class="goodsDetail-first"
                 v-if="goods.goodsClassId === 1">
            {{!goods.tradeOkCount ? '首次出售' : `已交易${goods.tradeOkCount}次`}}
          </s-col>
        </s-row>

      </header>

      <s-popup v-model="guarantee" class="goodsDetail-guarantee" position="fixed">
        <s-cell size="md">服务保障</s-cell>
        <s-cell size="md">
          <div class="goodsDetail-consignment"></div>
          <div>
            <h5>寄售交易</h5>
            <p>货在交易虎，付款后由客服发货。</p>
          </div>
        </s-cell>
        <s-cell size="md">
          <div class="goodsDetail-service"></div>
          <div>
            <h5>7x24小时服务</h5>
            <p>客服7x24小时在线发货</p>
          </div>
        </s-cell>
        <div class="goodsDetail-guarantee-bottom">
          <s-button type="primary" block @click="guarantee = false" shape="angle">完成</s-button>
        </div>
      </s-popup>

      <s-attr label="服务保障" link @click="guarantee = true">寄售交易</s-attr>

      <s-attr label="基本信息">
        {{goods.platformName}}系统-{{goods.clientName}}{{goods.domainName ? ('-' + goods.domainName) : ''}}-{{goods.serverName}}
      </s-attr>

      <s-attr v-for="(item, index) in goods.extInfos"
              :key="index"
              :label="item.attrName">{{item.value}}
      </s-attr>

      <s-attr label="密保绑定" v-if="goods.secrets.length > 0">{{goods.secrets.join('、')}}</s-attr>

      <s-panel class="s-panel-article goodsDetail-notify" title="免责声明" icon="notification">
        <p>1.所展示的商品供求信息由买卖双方自行提供，其真实性、准确性和合法性由信息发布人负责</p>
        <p>2.国家法律规定，未成年人不能参与虚拟物品交易</p>
      </s-panel>

      <s-suspension shadow class="goodsDetail-suspension">
        <s-button type="gray" v-if="goods.goodsStatus === 1 || goods.goodsStatus === 2" disabled block>待审核</s-button>
        <s-button type="primary" v-if="goods.goodsStatus === 3" block shadow @click="buy">立即购买</s-button>
        <s-button type="gray" v-if="goods.goodsStatus === 6" disabled block>宝贝已售罄</s-button>
        <s-button type="gray"
                  v-if="goods.goodsStatus === 4 || goods.goodsStatus === 5 || goods.goodsStatus === 7 || goods.goodsStatus === 8"
                  disabled block>宝贝已下架
        </s-button>
      </s-suspension>

      <s-nothing status="goods" v-if="loading === false && !goods.gameName"></s-nothing>

      <!-- 分享 -->
      <!--<s-share v-model="sharePopup"></s-share>-->
      <!-- /分享 -->

    </s-main>
  </s-app>
</template>

<script>
  import goodsClass from '../../filters/goodsClass';

  export default {
    name: 'detail',
    props: {},
    data () {
      return {
        swiperOpts: {
          pagination: '.swiper-pagination',
          autoplay: 5000
        },

        // 服务保障
        guarantee: null,

        // 分享弹出框
        sharePopup: null,

        loading: null,

        goodsId: null,

        goods: {
          picUrls: [],
          secrets: []
        }
      }
    },
    computed: {
      goodsType () {
        return goodsClass(this.goods.goodsClassId, 'className');
      },

      naturalTitle () {
        if (!this.goods.gameName) return '商品详情 - 交易虎';

        document.querySelector('[name="keywords"]').setAttribute('content', `${this.gameName}${this.goods.subClassName},${this.goods.showTitle},手机游戏交易平台,交易虎（jiaoyihu.com）`);
        document.querySelector('[name="description"]').setAttribute('content', `${this.goods.gameName}${this.goods.subClassName}-${this.goods.gameName}专区提供：${this.goods.showTitle} 。欢迎选择交易虎${this.goods.gameName}交易专区，了解更多关于${this.goods.showTitle}的信息`);

        return `${this.goods.gameName}${this.goods.goodsClassName}-${this.goods.showTitle}_${this.goods.serverName}_交易虎（jiaoyihu.com）`;
      }
    },
    methods: {

      /**
       * 点击进入画廊
       * @param imgSrc 图片地址
       */
      onGallery (imgSrc) {
        let picUrls = [];
        let index = 0;
        let counter = 0;


        this.goods.picUrls.forEach(item => {
          if (item.picUrl && item.picStatus === 2) {
            picUrls = picUrls.concat(item.picUrl);
            if (imgSrc === item.picUrl) index = counter;
            counter++;
          }
        });

        this.$router.push({
          path: '/gallery',
          query: {
            picUrls: picUrls.join(),
            index
          }
        })
      },

      /**
       * 商品分享
       */
      goodsShare () {
        this.sharePopup = !this.sharePopup;
      },

      /**
       * 立即购买, 跳转到购买页
       */
      buy () {
        this.$router.push({
          path: 'buy',
          query: {
            goodsId: this.goodsId
          }
        })
      },

      /**
       * 获取商品详情
       */
      getDetail () {
        if (this.loading) return false;
        this.loading = true;
        this
          .$http
          .post('/h5/goods/showGoodsInfo', {
            goodsId: this.goodsId
          }, {
            offMsg: true
          })
          .then(response => {
            if (response.data.code !== '000') return false;
            this.goods = Object.assign({}, this.goods, response.data.data);
          })
          .finally(() => this.loading = false);
      },

      /**
       * 页面初始化
       */
      init () {
        this.goodsId = parseInt(this.$route.query.goodsId);
        this.getDetail();
      }
    },

    created () {
      this.init();
    }
  }
</script>

<style lang="scss">

  @import "../../styles/goodsDetail.scss";

  .goodsDetail-share {
    background: url('../../assets/share-white.png') no-repeat center;
    background-size: .36rem .36rem;
    width: .76rem;
    height: 100%;
  }
  .goodsDetail-suspension {
    height: 1rem;
  }
</style>
