<!--
 - 订单详情
 -
 - author: Storm
 - date: 2017/04/27
 -->

<template>

  <s-app>

    <s-header>订单详情</s-header>

    <s-main :loading="!completed">

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

      <header class="goodsDetail-header" style="border-bottom: none; margin: 0;">

        <h3>
          <s-label :type="orderType" style="margin-top: -.175em;">{{order.subClassName}}</s-label>
          {{order.showTitle}}
          <!--<template v-if="order.orderClassId === 3"> (1元={{order.singlePrice}}{{order.subClassName}})</template>-->
        </h3>

        <s-row justify="between" align="center">
          <s-col class="goodsDetail-price">￥{{order.price}}</s-col>
          <s-col class="goodsDetail-first" v-if="order.orderClassId === 1">首次出售</s-col>
        </s-row>

      </header>

      <s-panel class="mt-20">
        <table class="tableData tableData-light">
          <tr>
            <th>订单号：</th>
            <td>{{order.orderNo}}</td>
          </tr>
          <tr>
            <th>支付方式：</th>
            <td>{{order.paySel | paymentMethod}}</td>
          </tr>
          <tr>
            <th>支付编号：</th>
            <td>{{order.payCode}}</td>
          </tr>
          <tr>
            <th>生成时间：</th>
            <td>{{order.ctime | date}}</td>
          </tr>
          <tr>
            <th>支付时间：</th>
            <td>{{order.payTime | date}}</td>
          </tr>
          <tr>
            <th>开始发货：</th>
            <td>{{order.startDeliverTime | date}}</td>
          </tr>
          <tr>
            <th>发货完成：</th>
            <td>{{order.endDeliverTime | date}}</td>
          </tr>
          <tr>
            <th>收货时间：</th>
            <td>{{order.receiveGoodsTime | date}}</td>
          </tr>
          <tr>
            <th>完成时间：</th>
            <td>{{order.finishTime | date}}</td>
          </tr>
          <tr>
            <th>发货客服：</th>
            <td>{{order.deliverCustomer}}</td>
          </tr>
          <tr>
            <th>目前状态：</th>
            <td>{{order.orderStatus | orderProcessStatus}}</td>
          </tr>
          <tr>
            <th>商品单价：</th>
            <td>{{order.unitPrice}}元</td>
          </tr>
          <tr>
            <th>购买数量：</th>
            <td>{{order.buyNum}}</td>
          </tr>
          <tr>
            <th>实际支付：</th>
            <td>{{order.actualPay}}元</td>
          </tr>
          <tr>
            <th>客服备注：</th>
            <td>{{order.note}}</td>
          </tr>
        </table>
      </s-panel>

      <s-panel class="mt-20" padding="0">
        <s-attr label="所属游戏">{{order.gameName}}</s-attr>
        <s-attr label="商品类型">{{order.subClassName}}</s-attr>
        <s-attr label="客户端">{{order.clientName}}</s-attr>
        <s-attr label="服务器">{{order.serverName}}</s-attr>
      </s-panel>


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

      <s-attr class="mt-20" label="服务保障" link @click="guarantee = true">寄售交易</s-attr>

      <s-attr v-for="(item, index) in order.goodsExtInfo"
              :key="index"
              :label="item.attrName">{{item.value}}
      </s-attr>

      <s-attr label="密保绑定" v-if="order.secrets.length > 0">{{order.secrets.join('、')}}</s-attr>

      <s-suspension shadow class="text-right" v-if="order.status !== 1">
        <s-button type="default" @click="viewHistory" outline size="sm">查看历史对话</s-button>

      </s-suspension>

    </s-main>
  </s-app>

</template>

<script>
  import goodsClass from '../../filters/goodsClass';
  import paymentMethod from '../../filters/paymentMethod';
  import orderProcessStatus from '../../filters/orderProcessStatus';
  import '../../styles/goodsDetail.scss';

  // 角色对象
  let object = '';
  export default {
    name: 'details',
    filters: {paymentMethod, orderProcessStatus},
    computed: {
      orderType () {
        return goodsClass(this.order.classId, 'className');
      },
    },
    data () {
      return {
        swiperOpts: {
          pagination: '.swiper-pagination',
          autoplay: 5000
        },

        // 服务保障
        guarantee: null,

        order: {
          goodsExtInfo: [],
          picUrls: [],
          secrets: []
        },

        completed: null,

        orderId: 0

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

        this.order.picUrls.forEach(item => {
          if (item.picUrl  && item.picStatus === 2) {
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
       * 查看历史记录
       */
      viewHistory () {
        this.$router.push({
          path: '/order/history',
          query: {
            orderId: this.orderId,
            object
          }
        })
      },

      /**
       * 获取订单详情
       */
      getOrderInfo () {
        this
          .$http
          .post('/h5/user/order/queryUserOrderDetail', {orderId: this.orderId})
          .then(response => {
            if (response.body.code !== '000') return false;
            this.order = response.body.data.orderDetail;
          })
          .finally(() => this.completed = true);
      }
    },
    created () {
      this.orderId = parseInt(this.$route.query.orderId);
      object = this.$route.query.type;
      this.getOrderInfo();
    }
  }
</script>
