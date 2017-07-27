<!--
 - 出售成功
 -
 - author: Storm
 - date: 2017/05/02
 -->

<template>
  <s-app>

    <s-header>出售成功</s-header>

    <s-main bgc="white">

      <div class="content mt-20">
        <table class="tableData tableData-between">
          <tr>
            <th>操作时间：</th>
            <td>{{balances.applyTime | date('YYYY-MM-DD hh:mm:ss')}}</td>
          </tr>
          <tr>
            <th>操作类型：</th>
            <td>出售成功</td>
          </tr>
          <tr>
            <th>存入：</th>
            <td class="text-bold">¥ {{balances.flowFee}}</td>
          </tr>
          <tr>
            <th>余额：</th>
            <td class="text-bold">¥ {{balances.walletMoney}}</td>
          </tr>
          <tr>
            <th>备注：</th>
            <td>{{balances.remark}}</td>
          </tr>
        </table>
      </div>

    </s-main>

  </s-app>
</template>

<script>
  import balanceType from '../../filters/balanceType';
  import flowType from '../../filters/flowType';
  export default {
    name: 'balanceSell',
    filters: {
      balanceType,
      flowType
    },
    data () {
      return {
        loading: null,
        payFlowId: null,
        balances: {}
      }
    },
    methods: {
      getBalanceDetails () {
        if (this.loading) return false;
        this.loading = true;
        this
          .$http
          .post('/h5/user/balanceDetails', {payFlowId: this.payFlowId})
          .then(response => {
            if (response.data.code !== '000') return false;
            this.balances = response.data.data;
          })
          .finally(() => this.loading = false);
      }
    },
    mounted () {
      this.payFlowId = parseInt(this.$route.query.payFlowId);
      this.getBalanceDetails();
    }
  }
</script>
