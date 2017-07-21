<!--
 - 发布商品
 -
 - author: Storm
 - date: 2017/04/17
 -->

<template>

  <s-app>

    <s-header>全部商品</s-header>

    <s-main>

      <section class="mt-20">

        <!--AUDITING(1, "审核中"),HAS_PUTAWAY(2, "已上架"),UNDER(3, "已下架"),-->
        <s-link to="release/goodsClass?status=1">审核中<span class="c-primary" slot="right">{{goods.auditing}}</span></s-link>
        <s-link to="release/goodsClass?status=2">已上架<span class="c-primary" slot="right">{{goods.putaway}}</span></s-link>
        <s-link to="release/goodsClass?status=3">已下架<span class="c-primary" slot="right">{{goods.under}}</span></s-link>
      </section>

    </s-main>

  </s-app>

</template>

<script>
  export default {
    name: 'Index',
    props: {},
    data () {
      return {
        getGoodsLoading: null,
        goods: {}
      }
    },
    methods: {
      getGoods () {

        if (this.getGoodsLoading) return false;
        this
          .$http
          .post('/h5/goods/findSellerGoodsStatistics')
          .then(response => {
            if (response.body.code !== '000') return false;
            this.goods = response.body.data.map;

          })

      }
    },
    created () {
      this.getGoods();
    }
  }
</script>
