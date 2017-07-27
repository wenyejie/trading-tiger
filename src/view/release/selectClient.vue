<!--
 - 选择客户端
 -
 - author: Storm
 - date: 2017/04/18
 -->

<template>
  <s-app>
    <s-header>选择客户端</s-header>

    <s-main :loading="loading !== false && clientList.length <= 0">

      <s-cell-intro>请选择商品所在游戏客户端：</s-cell-intro>
      <s-cell v-for="item in clientList"
              @click="clientClick(item)"
              :key="item.gameClientId">{{item.gameClientName}}
        <template slot="right">
          <s-icon type="right"></s-icon>
        </template>
      </s-cell>

    </s-main>
  </s-app>
</template>

<script>
  export default {
    name: 'SelectClient',
    props: {},
    data () {
      return {
        gameId: null,
        goodsClassId: null,
        goodsSubClassId: null,
        goodsSubClassEnableServer: null,
        loading: null,
        getAreaListLoading: null,
        goodsSubClassName: null,
        clientList: [],

        // 游戏名称
        gameName: null,
      }
    },
    methods: {

      // 获取链接中所带参数
      getQuery () {
        const query = this.$route.query;
        this.gameId = parseInt(query.gameId);
        this.goodsClassId = parseInt(query.goodsClassId);
        this.goodsSubClassId = parseInt(query.goodsSubClassId);
        this.goodsSubClassEnableServer = parseInt(query.goodsSubClassEnableServer);
        this.goodsSubClassName = query.goodsSubClassName;
        this.gameName = query.gameName;
      },

      // 获取客户端列表
      getClient () {

        if (this.loading) return false;
        this.loading = true;

        this
          .$http
          .post('/h5/goods/common/queryGameClientBySubClass', {
              goodsSubClassId: this.goodsSubClassId
            }
          )
          .then(response => {
            if (response.data.code !== '000') return false;
            this.clientList = response.data.data.list;
          })
          .finally(() => {
            this.loading = false;
          })
        ;

      },

      // 获取客户端对应的服务区列表
      getAreaList (gameClientId) {

        return new Promise((resolve, reject) => {

          if (this.getAreaListLoading) return false;
          this.getAreaListLoading = true;

          this
            .$http
            .post('/h5/goods/common/queryDomainByClient', {
                clientId: gameClientId
              },
              {
                loading: true
              }
            )
            .then(response => {
              if (response.data.code !== '000') {
                reject();
                return false;
              }

              // 保存至store，未来页需要调用
              local.set('serviceAreaList', response.data.data.list);

              response.data.data.list.length >= 1 ? resolve() : reject();

            })
            .finally(() => {
              this.getAreaListLoading = false;
            })
          ;

        });

      },

      /**
       * 点击客户端名称进行跳转
       * @param item 客户端数据
       */
      clientClick (item) {
        switch (this.goodsSubClassEnableServer) {
          // 全部区服
          case 1:

          // 全服通用+全部区服
          case 3:
            this
              .getAreaList(item.gameClientId)
              .then(
                // 如果该客户端下存在服务区则跳转至选择服务区
                () => this.$router.push({
                  path: 'selectArea',
                  query: {
                    gameId: this.gameId,
                    goodsClassId: this.goodsClassId,
                    goodsSubClassId: this.goodsSubClassId,
                    clientId: item.gameClientId,
                    goodsSubClassName: this.goodsSubClassName,
                    gameName: this.gameName
                  }
                }),

                // 不存在服务区在跳转至选择服务器
                () => this.$router.push({
                  path: 'selectServer',
                  query: {
                    gameId: this.gameId,
                    goodsClassId: this.goodsClassId,
                    goodsSubClassId: this.goodsSubClassId,
                    clientId: item.gameClientId,
                    goodsSubClassName: this.goodsSubClassName,
                    gameName: this.gameName
                  }
                })
              );
            break;

          // 全服通用
          case 2:
            this.$router.push({
              path: '/release/goodsInfo',
              query: {
                gameId: this.gameId,
                goodsClassId: this.goodsClassId,
                goodsSubClassId: this.goodsSubClassId,
                clientId: item.gameClientId,
                serverId: -1,
                goodsSubClassName: this.goodsSubClassName,
                gameName: this.gameName
              }
            });
            break;

          // 其它
          default:
            break;
        }
      }

    },

    watch: {
      '$route' () {
        this.getQuery();
        this.getClient();
      }
    },

    created () {
      this.getQuery();
      this.getClient();
    }
  }
</script>
