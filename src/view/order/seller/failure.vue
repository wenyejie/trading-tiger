<!--
 - 交易失败
 -
 - author: Storm
 - date: 2017/05/05
 -->

<template>

  <s-app>

    <s-header>交易失败</s-header>

    <s-main :loading="loading !== false && orderList.length <= 0">

      <s-order-list v-for="(item, index) in orderList"
                    :key="item.orderId"
                    :order="item"
                    type="seller"
                    :goods="item.goodsDetail">
        <template slot="tool" v-if="item.orderStatus === 18 || item.orderStatus === 19">

          <s-button type="default"
                    size="sm"
                    @click="handleProgress(item)"
                    outline>仲裁历史</s-button>

        </template>
      </s-order-list>

      <s-nothing v-if="orderList.length === 0 && loading === false" status="order"></s-nothing>

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
        orderList: []
      }
    },
    methods: {

      /**
       * 仲裁历史
       * @param item 订单实体
       */
      handleProgress (item) {
        this.$router.push({
          path: '/order/arbitration/progress',
          query: {
            orderId: item.orderId,
            role: 'seller'
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
            isBuyer: 2,
            orderStatus: 6,
            currentPage,
            pageSize
          })
          .then(response => {
            if (response.body.code !== '000') return false;

            this.currentPage = response.body.data.currentPage;

            this.completed = response.body.data.list.length < pageSize;

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
