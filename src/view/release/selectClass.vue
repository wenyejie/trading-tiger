<!--
 - 选择商品分类
 -
 - author: Storm
 - date: 2017/04/18
 -->

<template>
  <s-app>
    <s-header>选择商品分类</s-header>

    <s-main :loading="loading !== false && goodsClassList.length <= 0">

      <s-cell-intro>目前【{{gameName}}】支持出售的商品类别如下：</s-cell-intro>
      <s-link v-for="cls in goodsClassList"
              :key="cls.classId"
              :to="`/release/selectType?gameId=${gameId}&goodsClassId=${cls.classId}&gameName=${gameName}`">
        {{cls.className}}
      </s-link>

      <s-nothing status="data" v-if="loading === false && goodsClassList.length <= 0"></s-nothing>

    </s-main>
  </s-app>
</template>

<script>
  export default {
    name: 'SelectClass',
    props: {},
    data () {
      return {

        // 商品分类列表
        goodsClassList: [],

        // 获取商品分类列表loading
        loading: null,

        // 游戏ID
        gameId: null,

        // 游戏名称
        gameName: null
      }
    },
    methods: {

      /**
       * 获取链接中的游戏ID
       */
      getQuery () {
        const query = this.$route.query;
        this.gameId = parseInt(query.gameId);
        this.gameName = query.gameName;
      },

      /**
       * 获取商品分类列表
       * @returns {boolean}
       */
      getGoodsClass () {

        if (this.loading) return false;
        this.loading = true;

        this
          .$http
          .post('/h5/goods/common/queryEnableGoodsClass', {
              gameId: this.gameId
            }
          )
          .then(response => {
            if (response.data.code !== '000') return false;
            this.goodsClassList = response.data.data.list;
          })
          .finally(() => this.loading = false);
      }
    },
    watch: {
      '$route' () {
        this.getQuery();
        this.getGoodsClass();
      }
    },
    created () {
      this.getQuery();
      this.getGoodsClass();
    }
  }
</script>
