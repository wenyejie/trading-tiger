<!--
 - 未支付
 -
 - author: Storm
 - date: 2017/04/27
 -->

<template>

  <s-app>

    <s-header>未支付</s-header>

    <s-main :loading="loading !== false && orderList.length <= 0">

      <s-order-list v-for="(item, index) in orderList"
                    :key="item.orderId"
                    :order="item"
                    type="buyer"
                    :goods="item.goodsDetail">
        <template slot="tool">
          <s-button type="default" size="sm" @click="handleDelete(item, index)">删除订单</s-button>

          <s-button type="default"
                    v-if="!item.hasCountdown"
                    size="sm"
                    @click="handleBuy(item)"
                    outline>重新购买</s-button>

          <s-button type="default"
                    outline
                    v-if="item.hasCountdown"
                    @click="handlePay(item)"
                    size="sm">去支付(还剩
            <s-countdown v-model="item.countdown"
                         template="mm分ss秒"
                         @on-done="countdownDone(item)"></s-countdown>)
          </s-button>
        </template>
      </s-order-list>

      <s-nothing v-if="orderList.length === 0 && loading === false"
                 title="没有找到对应的订单"
                 status="order"></s-nothing>

      <s-infinite :loading="loading" :completed="completed" @infinite="onInfinite"></s-infinite>

    </s-main>

  </s-app>

</template>

<script>
  export default {
    name: 'unpaid',
    props: {},
    data () {
      return {

        // 加载中
        loading: null,

        // 是否加载完成
        completed: null,

        // 当前页
        currentPage: null,

        // 删除中
        deleting: null,

        // 支付中
        paying: null,

        // 订单列表
        orderList: []
      }
    },
    methods: {

      /**
       * 重新下单购买
       * @param item 订单实体
       */
      handleBuy (item) {
        this.$router.push({
          path: '/goods/buy',
          query: {goodsId: item.goodsId}
        });
      },

      /**
       * 去支付
       * @param item 订单实体
       */
      handlePay (item) {
        if (this.paying) return false;
        this.paying = true;
        this
          .$http
          .post('/h5/buyer/continuePayOrder', {orderId: item.orderId})
          .then(response => {
            if (response.body.code !== '000') return false;
            location.href = response.body.data.redirectUrl;
          })
          .finally(() => this.paying = false);
      },

      /**
       * 删除订单
       * @param item 订单实体
       * @param index 下标
       * @returns {boolean}
       */
      handleDelete (item, index) {
        this
          .$Dialog
          .confirm('确定要删除该订单!', {title: '提示'})
          .then(() => {

            if (this.deleting) return false;
            this.deleting = true;
            this
              .$http
              .post('/h5/buyer/delOrderInfo', {
                orderId: item.orderId
              })
              .then(response => {
                if (response.body.code !== '000') return false;
                this.$Message.success('订单删除成功！');
                this.orderList.splice(index, 1);
              })
              .finally(() => this.deleting = false);

          })
      },

      // 倒计时完成
      countdownDone (item) {
        item.hasCountdown = false;
      },

      // 下拉加载更多
      onInfinite () {
        this.getOrderList(this.currentPage + 1);
      },

      // 获取订单列表
      getOrderList (currentPage = 0, pageSize = 20) {
        if (this.loading) return false;
        this.loading = true;
        this
          .$http
          .post('/h5/user/order/queryUserOrderList', {
            isBuyer: 1,
            orderStatus: 1,
            currentPage,
            pageSize
          })
          .then(response => {
            if (response.body.code !== '000') return false;

            // 计算是否拥有倒计时
            response.body.data.list.forEach(item => {
              let time = Math.ceil((new Date() - new Date(item.ctime * 1000)) / 1000);
              item.hasCountdown = time <= 30 * 60;
              item.countdown = 30 * 60 - time;
              if (item.countdown >= 1800) item.countdown = 1800;
            });

            this.currentPage = response.body.data.currentPage;

            // 所有资源加载完成
            if (response.body.data.list.length < pageSize) this.completed = true;

            this.orderList = this.orderList.concat(response.body.data.list);
          })
          .finally(() => this.loading = false);
      }
    },
    created () {
      this.getOrderList();
    }
  }
</script>
