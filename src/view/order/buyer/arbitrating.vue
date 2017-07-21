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
                    type="buyer"
                    :goods="item.goodsDetail">
        <template slot="tool">

          <s-button type="default"
                    size="sm"
                    @click="handleProgress(item)">仲裁进度
          </s-button>

          <s-button type="default"
                    size="sm"
                    @click="handleCancel(item, index)">取消仲裁
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
       * 取消仲裁
       * @param item 订单实体
       * @param index 订单下标
       */
      handleCancel (item, index) {
        this.$Dialog
          .confirm('确定要取消仲裁')
          .then(() => {

            if (this.canceling) return false;
            this.canceling = true;

            this.$http
              .post('/h5/buyer/dispute/buyerCancelDispute', {
                orderId: item.orderId
              })
              .then(response => {
                if (response.body.code !== '000') return false;
                this.$Message.success('取消仲裁成功!');
                this.orderList.splice(index, 1);
              })
              .finally(() => {
                this.canceling = false;
              })
          })
      },

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
            orderStatus: 4,
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
      this.getOrderList();
    }
  }
</script>
