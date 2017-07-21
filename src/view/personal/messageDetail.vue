<!--
 - 消息详情
 -
 - author: Storm
 - date: 2017/05/02
 -->

<template>
  <s-app>

    <s-header>详情</s-header>

    <s-main bgc="white">

      <article class="article">

        <img class="article-img" src="http://img.la/640x300?s=demo">

        <div class="article-content">

          <h3 class="article-title">优惠期间，游中宝免交易手续费！</h3>

          <p>“五一”小长假即将到来，您是否为了无法及时查看您在魔游游出售的商品状态而担心呢？魔游游商品自动下架功能及全新的商品排序功能为您解忧愁。</p>
          <p>
            1. 魔游游商品自动下架功能，在您出售商品的同时会有一个下拉框的选项，分别是3.7.15.30天后下架，在出售过程中如果在您设定时间没有卖出去将自动下架，不需要您手动操作；其实这个功能的最大好处是该商品在交易未成功时将返回商品状态继续出售且继续执行您设定的自动下架时间，不会重新计算时间。</p>
          <p>
            2. 魔游游商品排序将不再以新发布商品优先显示，而是按照相同商品的自动下架时间排序。例：相同商品自动下架时间为2013.5.01止，则2013.4.15发布商品会比2013.4.24发布商品靠前。（拥有推荐位置顶服务的用户除外）,如需查看最新发布的商品可以点详情页的[最新发布]查看。</p>
          <p>【魔游游商品自动下架及全新排序系统注意事项】详情点击</p>

        </div>

      </article>

    </s-main>

  </s-app>
</template>

<script>
  export default {
    name: 'messageDetail',
    props: {},
    data () {
      return {}
    },
    methods: {}
  }
</script>

<style lang="scss">
  .article {
    overflow: hidden;
    word-break: break-all;
    font-size: .26rem;
    line-height: .48rem;
    color: #666;

    &-img {
      display: block;
      width: 100%;
      height: 3rem;
      background-color: #f4f4f4;
    }

    &-title {
      font-weight: bold;
      font-size: .3rem;
      margin-top: .3rem;
      margin-bottom: .21rem;
      line-height: 1;
      color: #333;
    }

    &-content {
      padding: 0 .44rem .5rem .48rem;
    }

  }
</style>
