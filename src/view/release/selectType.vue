<!--
 - 选择商品类型
 -
 - author: Storm
 - date: 2017/04/18
 -->

<template>
  <s-app>
    <s-header>选择商品类型</s-header>

    <s-main :loading="loading !== false && goodsTypeList.length <= 0">

      <s-cell-intro>目前【{{gameName}}】支持出售的商品类型如下：</s-cell-intro>

      <s-cell v-for="item in goodsTypeList"
              @click="selectType(item)"
              :key="item.goodsSubClassId">{{item.goodsSubClassName}}
        <template slot="right">
          <s-icon type="right"></s-icon>
        </template>
      </s-cell>

      <s-cell v-if="goodsTypeList.length <= 0">暂无选项，如有疑问请联系在线客服</s-cell>

    </s-main>
  </s-app>
</template>

<script>
  export default {
    name: 'SelectType',
    props: {},
    data () {
      return {

        // 游戏ID
        gameId: null,

        // 游戏名称
        gameName: null,

        // 游戏分类ID
        goodsClassId: null,

        // 加载完成?
        loading: null,

        // 商品类型列表
        goodsTypeList: []
      }
    },
    methods: {

      // 选择类型
      selectType (item) {
        local.set('releaseTitleAttr', item);

        this.$router.push({
          path: 'selectClient',
          query: {
            goodsSubClassEnableServer: item.goodsSubClassEnableServer,
            gameId: this.gameId,
            goodsClassId: this.goodsClassId,
            goodsSubClassId: item.goodsSubClassId,
            goodsSubClassName: item.goodsSubClassName,
            gameName: this.gameName
          }
        })
      },

      // 获取链接中所带参数
      getQuery () {
        const query = this.$route.query;
        this.gameId = parseInt(query.gameId);
        this.goodsClassId = parseInt(query.goodsClassId);
        this.gameName = query.gameName;
      },

      /**
       * 获取商品类型
       * @returns {boolean}
       */
      getGoodsType () {

        if (this.loading) return false;
        this.loading = true;

        this
          .$http
          .post('/h5/goods/common/queryEnableGoodsSubClass', {
              gameId: this.gameId,
              goodsClassId: this.goodsClassId
            }
          )
          .then(response => {
            if (response.body.code !== '000') return false;
            this.goodsTypeList = response.body.data.list;
          })
          .finally(() => {
            this.loading = false;
          })
        ;

      }
    },
    watch: {
      '$route' () {
        this.getQuery();
      }
    },
    created () {
      this.getQuery();
      this.getGoodsType();
    }
  }
</script>
