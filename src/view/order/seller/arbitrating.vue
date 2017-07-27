<!--
 - 仲裁中
 -
 - author: Storm
 - date: 2017/05/05
 -->

<template>

  <s-app>

    <s-header>仲裁中</s-header>

    <s-main :loading="loading !== false && orderList.length <= 0">

      <s-order-list v-for="(item, index) in orderList"
                    :key="item.orderId"
                    :order="item"
                    type="seller"
                    :goods="item.goodsDetail">
        <template slot="tool">

          <s-button type="default"
                    size="sm"
                    @click="handleProgress(item)">仲裁进度</s-button>
        </template>
      </s-order-list>

      <s-nothing v-if="orderList.length === 0 && loading === false"
                 title="没有找到对应的订单"
                 status="goods"></s-nothing>

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
      }
    },
    methods: {

      /**
       * 仲裁进度
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
       * 下拉加载
       */
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
            orderStatus: 4,
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
