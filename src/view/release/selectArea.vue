<!--
 - 选择服务区
 -
 - author: Storm
 - date: 2017/04/18
 -->

<template>
  <s-app>
    <s-header>选择服务区</s-header>

    <s-main>

      <s-cell-intro>请选择商品所在服务区：</s-cell-intro>
      <s-link v-for="item in serviceAreaList"
              :key="item.domainId"
              :to="`/release/selectServer?gameId=${gameId}&goodsClassId=${goodsClassId}&goodsSubClassId=${goodsSubClassId}&clientId=${clientId}&domainId=${item.domainId}&goodsSubClassName=${goodsSubClassName}&gameName=${gameName}`">{{item.domainName}}</s-link>

    </s-main>
  </s-app>
</template>

<script>
  export default {
    name: 'selectArea',
    props: {},
    data () {
      return {
        gameId: null,

        // 游戏名称
        gameName: null,
        goodsClassId: null,
        goodsSubClassId: null,
        clientId: null,
        goodsSubClassName: null
      }
    },
    computed: {

      // 从store中获取的服务区列表
      serviceAreaList () {
        return local.get('serviceAreaList');
      }
    },
    methods: {

      // 获取链接中所带参数
      getQuery () {
        const query = this.$route.query;
        this.gameId = parseInt(query.gameId);
        this.goodsClassId = parseInt(query.goodsClassId);
        this.goodsSubClassId = parseInt(query.goodsSubClassId);
        this.clientId = parseInt(query.clientId);
        this.goodsSubClassName = query.goodsSubClassName;
        this.gameName = query.gameName;
      },
    },

    created () {
      this.getQuery();
    }

  }
</script>
