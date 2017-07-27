<!--
 - 等待返回支付结果
 -
 - author: Storm
 - date: 2017/04/27
 -->

<template>

  <s-app>

    <s-header>等待返回支付结果</s-header>

    <s-main bgc="white">

      <div class="payment-info">

        <table class="tableData">
          <tr>
            <th>订单编号：</th>
            <td>{{orderId}}</td>
          </tr>
          <tr>
            <th>商品名称：</th>
            <td>{{order.goodsName}}</td>
          </tr>
          <tr>
            <th>购买数量：</th>
            <td>{{order.num}}</td>
          </tr>
          <tr>
            <th>支付金额：</th>
            <td class="c-primary">¥ {{order.price}}</td>
          </tr>
          <tr>
            <th>当前状态：</th>
            <td :class="order.orderStatus === 1 ? 'c-primary' : 'c-info'">{{order.orderStatus === 1 ? '未支付' : '已支付'}}
            </td>
          </tr>
        </table>

      </div>

      <div class="payment-header">

        <p>由于支付验证环节存在延迟，若您已支付成功但显示仍未支付，请点击下方的刷新按钮刷新订单状态。</p>

        <div class="text-center">
          <s-button type="default" @click="goHome">返回首页</s-button>
          <s-button type="primary"
                    @click="refresh"
                    :disabled="showCountdown">
            <s-countdown v-if="showCountdown" v-model="countdown" template="ss" @on-done="countdownDone"></s-countdown>
            <span v-if="!showCountdown">刷新</span>
          </s-button>
        </div>

      </div>


    </s-main>

  </s-app>

</template>

<script>
  export default {
    name: 'payment',
    props: {},
    data () {
      return {
        // 是否显示倒计时
        showCountdown: false,

        // 倒计时时间，秒级
        countdown: 0,

        // 加载
        loading: null,

        // 订单ID
        orderId: null,

        // 订单详情
        order: {}
      }
    },
    methods: {

      // 返回首页
      goHome () {
        this.$router.push({path: '/'});
      },

      // 刷新状态
      refresh () {
        this.showCountdown = true;
        this.countdown = 6;
        this.getOrders()
      },

      /**
       * 倒计时完成
       */
      countdownDone () {
        this.showCountdown = false;
      },

      // 初始化
      init () {
        const query = this.$route.query;
        this.orderId = parseInt(query.orderId);
        this.getOrders();
      },

      /**
       * 获取订单详情
       * @returns {boolean}
       */
      getOrders () {
        if (this.loading) return false;
        this.loading = true;
        this
          .$http
          .post('/h5/buyer/queryOrderInfo', {orderId: this.orderId})
          .then(response => {
            if (response.data.code !== '000') return false;
            this.order = response.data.data;
            if (this.order.orderStatus === 3) {
              this.$Message.success('订单支付成功！');
              this.$router.push({
                path: '/order/service',
                query: {
                  orderId: this.orderId,
                  from: 'paymentSuccess',
                  object: 'buyer'
                }
              })
            }
          })
          .finally(() => this.loading = false);
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
  .payment-info {
    padding: .34rem 0 .54rem;
    margin: 0 .24rem;

    border-bottom: 1px solid #E5E5E5;
  }

  .payment-header {

    padding: .6rem .9rem;

    p {
      font-size: .24rem;
      line-height: .3rem;
      color: #999;
      margin-bottom: .6rem;
    }

  }
</style>
