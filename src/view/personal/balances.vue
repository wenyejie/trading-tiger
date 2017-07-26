<!--
 - 余额明细
 -
 - author: Storm
 - date: 2017/05/02
 -->

<template>
  <s-app>

    <s-header>余额明细</s-header>

    <s-main :loading="loading !== false && !balances.length">

      <ul class="mt-20">

        <s-cell tag="li"
                size="lg"
                v-for="item in balances"
                :key="item.payFlowId"
                @click="handleDetail(item)">
          <h4 class="text-ellipsis list-name">{{item.flowName}}</h4>
          <p class="list-desc c-c">余额:¥ {{item.walletMoney}}</p>
          <template slot="right">
            <p class="list-time">{{item.applyTime | date}}</p>
            <p class="list-price" :class="item.flowType === 1 ? 'c-primary' : 'c-info'">{{item.flowType === 1 ? '+' : '-'}} ¥ {{item.flowFee}}</p>
          </template>
        </s-cell>

      </ul>

      <s-nothing status="data" v-if="loading === false && balances.length <= 0"></s-nothing>

      <s-infinite :loading="loading" :completed="completed" @infinite="onInfinite"></s-infinite>

    </s-main>

  </s-app>
</template>

<script>
  import balanceType from '../../filters/balanceType';
  import flowType from '../../filters/flowType';

  export default {
    name: 'balances',
    filters: {
      balanceType,
      flowType
    },
    data () {
      return {

        // 加载中
        loading: null,

        // 加载是否完成
        completed: null,

        // 余额明细列表
        balances: [],

        // 当前页
        currentPage: 0,

        // 每页条数
        pageSize: 20
      }
    },
    methods: {

      // 跳转至余额详情
      handleDetail (item) {
        let path = '';
        switch (item.flowType) {
          case 1:
          case null:
            path = 'balanceSell';
            break;
          case 2:
            path = 'balanceWithdraw';
            break;
          case 3:
            path = 'balancePayment';
            break;
          default:
            path = '';
            break;
        }
        this.$router.push({
          path: '/personal/' + path,
          query: {
            payFlowId: item.payFlowId
          }
        });
      },

      /**
       * 上拉加载
       */
      onInfinite () {
        this.getBalances(this.currentPage + 1);
      },

      // 获取余额明细列表
      getBalances (currentPage = 0, pageSize = 20) {
        if (this.loading) return false;
        this.loading = true;
        this
          .$http
          .get('/h5/user/balanceLists', {
            params: {
              currentPage,
              pageSize
            }
          })
          .then(response => {
            if (response.body.code !== '000') return false;
            this.balances = this.balances.concat(response.body.data.list);
            this.currentPage = currentPage;
            this.pageSize = pageSize;
            this.completed = response.body.data.list.length < pageSize;
          })
          .finally(() => this.loading = false);
      }
    },
    mounted () {
      this.getBalances();
    }
  }
</script>

<style lang="scss">
  @import "lists.scss";
</style>