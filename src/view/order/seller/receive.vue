<!--
 - 已发货 待买家确认
 -
 - author: Storm
 - date: 2017/05/05
 -->

<template>

  <s-app>

    <s-header>已发货 待买家确认</s-header>

    <s-main :loading="loading !== false && orderList.length <= 0">

      <s-order-list v-for="(item, index) in orderList"
                    :key="item.orderId"
                    :order="item"
                    type="seller"
                    :goods="item.goodsDetail">
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

        // 当前页
        currentPage: null,

        // 页码
        pageSize: null,

        // 加载完成
        completed: null,

        // 订单列表
        orderList: [],

        // 收获中
        receiving: null,
      }
    },
    methods: {

      /**
       * 申请仲裁
       * @param item 订单实体
       */
      handleArbitrate (item) {

      },

      /**
       * 确认收货
       * @param item 订单实体
       * @param index 下标
       */
      handleReceipt (item, index) {
        this
          .$Dialog
          .confirm('一旦确认将立即转账给卖家', {
            title: '是否确认收货？',
            mini: true
          })
          .then(() => {
            if (this.receiving) return false;
            this.receiving = true;

            this
              .$http
              .post('/h5/buyer/buyerConfirmOrder', {
                orderId: item.orderId
              })
              .then(response => {
                if (response.data.code !== '000') return false;
                this.$Message.success('订单确认收货成功!');
                this.orderList.splice(index, 1);
              })
              .finally(() => this.uping = false);
          });
      },

      /**
       * 提取账号密码
       * @param item 订单实体
       */
      handleExtract (item) {
        this.$router.push({
          path: '/order/buyer/extract',
          query: {
            orderId: item.orderId
          }
        });
      },

      /**
       * 获取订单列表
       * @param currentPage 当前页
       * @param pageSize 每页条数
       * @return {boolean}
       */
      getOrderList (currentPage = 0, pageSize = 20) {
        if (this.loading) return false;
        this.loading = true;
        this
          .$http
          .post('/h5/user/order/queryUserOrderList', {
            isBuyer: 2,
            orderStatus: 3,
            currentPage,
            pageSize
          })
          .then(response => {
            if (response.data.code !== '000') return false;

            this.orderList = this.orderList.concat(response.data.data.list);
            this.currentPage = response.data.data.currentPage;
            this.pageSize = response.data.data.pageSize;
            this.completed = response.data.data.list.length < pageSize;
          })
          .finally(() => this.loading = false);
      }
    },
    created () {
      this.getOrderList();
    }
  }
</script>
