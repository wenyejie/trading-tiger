<!--
 - 待收货
 -
 - author: Storm
 - date: 2017/05/05
 -->

<template>

  <s-app>

    <s-header>待收货</s-header>

    <s-main :loading="loading !== false && orderList.length <= 0">

      <s-order-list v-for="(item, index) in orderList"
                    :key="item.orderId"
                    :order="item"
                    type="buyer"
                    :goods="item.goodsDetail">
        <template slot="tool">

          <template v-if="lastApply !== item.orderId">

            <s-button type="default"
                      size="sm"
                      @click="handleArbitrate(item)">申请仲裁
            </s-button>

            <s-button type="default"
                      outline
                      @click="handleReceipt(item, index)"
                      size="sm">确认收货
            </s-button>

          </template>

          <s-button type="default"
                    outline
                    v-if="item.goodsDetail.goodsClassId === 1"
                    @click="handleExtract(item)"
                    size="sm">提取账号密码
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

        // 订单列表
        orderList: [],

        // 收获中
        receiving: null,

        // 最后一个申请仲裁的订单ID
        lastApply: null
      }
    },
    methods: {

      /**
       * 申请仲裁
       * @param item 订单实体
       */
      handleArbitrate (item) {
        this.$router.push({
          path: '/order/arbitration/apply',
          query: {
            orderId: item.orderId
          }
        })
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
                if (response.body.code !== '000') return false;
                this.$Message.success('订单确认收货成功!');
                this.orderList.splice(index, 1);
              })
              .finally(() => this.receiving = false);
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
            orderStatus: 3,
            currentPage,
            pageSize
          })
          .then(response => {
            if (response.body.code !== '000') return false;

            this.currentPage = response.body.data.currentPage;

            // 所有资源加载完成
            if (response.body.data.list.length < pageSize) this.completed = true;

            this.orderList = this.orderList.concat(response.body.data.list);
          })
          .finally(() => this.loading = false);
      }
    },
    created () {
      this.lastApply = parseInt(sessionStorage.getItem('lastArbitrationApplyOrderId'));
      this.getOrderList();
    }
  }
</script>
