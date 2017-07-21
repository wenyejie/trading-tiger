<!--
 - 提现明细
 -
 - author: Storm
 - date: 2017/05/02
 -->

<template>
  <s-app>

    <s-header>提现明细</s-header>

    <s-main :loading="loading !== false && withdraws.length <= 0">

      <ul class="mt-20">

        <s-cell tag="li"
                v-for="item in withdraws"
                :key="item.payFlowId"
                @click="handleClick(item)"
                size="lg">
          <h4 class="text-ellipsis list-name">{{item.withdrawalStatus | withdrawStatus}}</h4>
          <p class="list-desc c-6">{{item.auditStatus | auditStatus}}</p>
          <template slot="right">
            <p class="list-time">{{item.applyTime | date}}</p>
            <p class="list-price" :class="item.withdrawalStatus | withdrawStatus('cls')">{{item.withdrawalStatus | withdrawStatus('symbol')}} ¥ {{item.withdrawalAmount}}</p>
          </template>
        </s-cell>

      </ul>

      <s-nothing status="data" v-if="loading === false && withdraws.length <= 0"></s-nothing>

      <s-infinite :loading="loading" :completed="completed" @infinite="onInfinite"></s-infinite>

    </s-main>

  </s-app>
</template>

<script>
  import withdrawStatus from '../../filters/withdrawStatus';
  import auditStatus from '../../filters/auditStatus';
  import './lists.scss';

  export default {
    name: 'balances',
    props: {},
    filters: {
      withdrawStatus,
      auditStatus
    },
    data () {
      return {

        // loading
        loading: null,

        // 加载是否完成
        completed: null,

        // 用户提现明细列表
        withdraws: [],

        // 当前页
        currentPage: 0,

        // 页码
        pageSize: 20,
      }
    },
    methods: {

      /**
       * 点击事件
       * @param item 提现实体
       */
      handleClick (item) {
        this.$router.push({
          path: '/personal/withdrawStep',
          query: {
            payFlowId: item.payFlowId
          }
        });
      },

      /**
       * 上拉加载
       */
      onInfinite () {
        this.getWithdraws(this.currentPage + 1);
      },

      // 获取用户提现明细列表
      getWithdraws (currentPage = 0, pageSize = 20) {
        if (this.loading) return false;
        this.loading = true;
        this
          .$http
          .get('/h5/user/withdrawalLists', {
            params: {
              currentPage,
              pageSize
            }
          })
          .then(response => {
            if (response.body.code !== '000') return false;
            this.withdraws = this.withdraws.concat(response.body.data.list);
            this.currentPage = response.body.data.currentPage;
            this.pageSize = response.body.data.pageSize;
            this.completed = response.body.data.list.length < pageSize;
          })
          .finally(() => this.loading = false);
      }
    },
    mounted () {
      this.getWithdraws();
    }
  }
</script>
