<!--
 - 交易成功
 -
 - author: Storm
 - date: 2017/05/05
 -->

<template>

  <s-app>

    <s-header>交易成功</s-header>

    <s-main :loading="loading !== false && orderList.length <= 0">

      <s-order-list v-for="(item, index) in orderList"
                    :key="item.orderId"
                    :order="item"
                    type="buyer"
                    :goods="item.goodsDetail">
        <template slot="tool"
                  v-if="item.orderStatus === 12 || item.orderStatus === 13 || item.orderStatus === 20 || item.goodsDetail.goodsClassId === 1">

          <s-button type="default"
                    size="sm"
                    v-if="item.orderStatus === 12 || item.orderStatus === 13 || item.orderStatus === 20"
                    @click="handleProgress(item)"
                    outline>仲裁历史
          </s-button>

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
            orderId: item.orderId
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
            orderStatus: 5,
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
    created () {
      this.getOrderList();
    }
  }
</script>
