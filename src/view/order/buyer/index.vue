<!--
 - 订单首页
 -
 - author: Storm
 - date: 2017/04/27
 -->

<template>
  <s-app>

    <s-header>买家订单</s-header>

    <s-main>

      <section class="mt-20">

        <s-link to="/order/buyer/unpaid">未支付
          <span class="c-primary" slot="right">{{count.waitPayCount}}</span>
        </s-link>
        <s-link to="/order/buyer/trading">交易中
          <span class="c-primary" slot="right">{{count.waitDeliverCount}}</span>
        </s-link>
        <s-link to="/order/buyer/unreceive">待确认收货
          <span class="c-primary" slot="right">{{count.waitReceivedConFirmCount}}</span>
        </s-link>
        <s-link to="/order/buyer/arbitrating">仲裁中
          <span class="c-primary" slot="right">{{count.customerDealingCount}}</span>
        </s-link>
        <s-link to="/order/buyer/successful">交易成功
          <span class="c-primary" slot="right">{{count.tradeOkCount}}</span>
        </s-link>
        <s-link to="/order/buyer/failure">交易失败
          <span class="c-primary" slot="right">{{count.tradeFailCount}}</span>
        </s-link>

      </section>

    </s-main>

  </s-app>
</template>

<script>
  export default {
    name: 'buyer',
    props: {},
    data () {
      return {
        loading: null,
        count: {}
      }
    },
    methods: {
      getOrderCount () {
        if (this.loading) return false;
        this.loading = true;
        this
          .$http
          .post('/h5/user/order/queryUserOrderCount', {
            isBuyer: 1
          })
          .then(response => {
            if (response.data.code !== '000') return false;
            this.count = response.data.data;
          })
          .finally(() => this.loading = false);
      }
    },
    created () {
      this.getOrderCount();
    }
  }
</script>
