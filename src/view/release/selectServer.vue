<!--
 - 选择服务器
 -
 - author: Storm
 - date: 2017/04/18
 -->

<template>
  <s-app>
    <s-header>选择服务器</s-header>

    <s-main :loading="loading !== false && servers.length <= 0">

      <s-search placeholder="请输入服务器名称" v-model="searchKey" text="搜索"></s-search>

      <section>
        <s-cell-intro>请选择商品所在服务器：</s-cell-intro>
        <s-link v-for="item in filterServers"
                :key="item.domainId"
                :to="`/release/goodsInfo?gameId=${gameId}&goodsClassId=${goodsClassId}&goodsSubClassId=${goodsSubClassId}&clientId=${clientId}&domainId=${domainId}&serverId=${item.serverId}&goodsSubClassName=${goodsSubClassName}&gameName=${gameName}`">{{item.serverName}}</s-link>
      </section>

    </s-main>
  </s-app>
</template>

<script>
  import Search from '@/components/search'
  export default {
    name: 'selectServer',
    components: {
      sSearch: Search
    },
    props: {},
    data () {
      return {
        loading: null,
        servers: [],

        gameId: null,

        // 游戏名称
        gameName: null,
        goodsClassId: null,
        goodsSubClassId: null,
        clientId: null,
        domainId: null,
        goodsSubClassName: null,
        searchKey: '',
      }
    },
    computed: {

      // 过滤服务器
      filterServers () {
        return this.servers.filter(item => {
           return item.serverName.indexOf(this.searchKey.trim()) >= 0;
        });
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
        this.domainId = query.domainId ? parseInt(query.domainId) : null;
        this.goodsSubClassName = query.goodsSubClassName;
        this.gameName = query.gameName;
      },

      /**
       * 获取服务器列表
       * @returns {boolean}
       */
      getServers () {

        if (this.loading) return false;
        this.loading = true;

        let params = {};

        // 如果存在domainId则调用byDomain否则调用byClient
        const action = this.domainId ? '/h5/goods/common/queryServerByDomain' : '/h5/goods/common/queryServerByClient';

        if (this.domainId) params.domainId = this.domainId;
        else params.clientId = this.clientId;

        this
          .$http
          .post(action, params)
          .then(response => {
            if (response.body.code !== '000') return false;
            this.servers = response.body.data.list;
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
        this.getServers();
      }
    },

    created () {
      this.getQuery();
      this.getServers();
    }

  }
</script>
