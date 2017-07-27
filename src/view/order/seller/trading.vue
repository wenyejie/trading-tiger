<!--
 - 交易中
 -
 - author: Storm
 - date: 2017/05/05
 -->

<template>

  <s-app>

    <s-header>交易中</s-header>

    <s-main :loading="loading !== false && orderList.length <= 0">

      <s-order-list v-for="(item, index) in orderList"
                    :key="item.orderId"
                    :order="item"
                    type="seller"
                    :goods="item.goodsDetail">
        <template slot="tool">
          <s-button type="default"
                    outline
                    size="sm"
                    @click="handleContact(item, index)">联系发货客服</s-button>
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
        orderList: [],
      }
    },
    methods: {

      /**
       * 联系发货客服
       * @param item 订单实体
       */
      handleContact (item) {
        this.$router.push({
          path: '/order/service',
          query: {
            orderId: item.orderId,
            object: 'seller'
          }
        })
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
            orderStatus: 2,
            currentPage,
            pageSize
          })
          .then(response => {
            if (response.data.code !== '000') return false;

            this.currentPage = response.data.data.currentPage;

            // 所有资源加载完成
            if (response.data.data.list.length < pageSize) this.completed = true;

            this.orderList = this.orderList.concat(response.data.data.list);
          })
          .finally(() => this.loading = false);
      }
    },
    mounted () {
      this.getOrderList();
    }
  }
</script>
