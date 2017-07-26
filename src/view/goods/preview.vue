<!--
 - 商品预览
 -
 - author: Storm
 - date: 2017/04/23
 -->

<template>

  <s-app>

    <s-header :title="goods.showTitle">{{goods.showTitle}}</s-header>

    <s-main bgc="white">

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
          <!--<template v-if="goods.goodsClassId === 3"> (1元={{goods.singlePrice}}{{goods.subClassName}})</template>-->
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

      <s-suspension shadow>
        <s-row gutter=".12rem">
          <s-col span="12">
            <s-button type="link" block icon="share" @click="goodsShare">分享</s-button>
          </s-col>
          <s-col span="12">
            <s-button type="primary" shadow icon="link" block @click="handleCopy">复制商品链接</s-button>
          </s-col>
        </s-row>
      </s-suspension>

      <!--<s-share v-model="sharePopup" :link="shareLink"></s-share>-->

    </s-main>
  </s-app>
</template>

<script>
  import goodsClass from '../../filters/goodsClass';
  import copy from '../../core/copy';
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

        loading: null,

        goodsId: null,

        // 商品分享
        sharePopup: null,

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

      shareLink () {
        return `${location.origin}/goods/detail?goodsId=${this.goodsId}`;
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
            if (item.picUrl === imgSrc) index = counter;
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

        this.$Message.info('即将来临!');
        // this.sharePopup = !this.sharePopup;
      },

      // 复制商品链接
      handleCopy () {
        if (this.$browser.isMobile) {
          this.$Dialog.alert('长按复制', {
            mini: true,
            title: location.href.replace('preview', 'detail')
          });
          return false;
        }

        copy(location.href.replace('preview', 'detail'));
        this.$Message.success('复制成功!');
      },

      // 立即购买
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
          .post('/h5/goods/showGoodsInfo', {goodsId: this.goodsId})
          .then(response => {
            if (response.body.code !== '000') return false;
            this.goods = Object.assign({}, this.goods, response.body.data);
            if (!this.goods.isSelfGoods) {
              this.$router.replace({
                path: '/goods/detail',
                query: {
                  goodsId: this.goodsId
                }
              })
            }
          })
          .finally(() => this.loading = false);
      },

      init () {
        this.goodsId = parseInt(this.$route.query.goodsId);
        this.getDetail();
      }
    },

    activated () {
      this.init();
    },

    created () {
      this.init();
    }
  }
</script>

<style lang="scss">
  @import "../../styles/goodsDetail.scss";
</style>