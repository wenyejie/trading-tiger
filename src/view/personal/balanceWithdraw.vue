<!--
 - 余额提现
 -
 - author: Storm
 - date: 2017/05/02
 -->

<template>
  <s-app>

    <s-header>余额提现</s-header>

    <s-main bgc="white" :loading="loading !== false">

      <div class="content mt-20">
        <table class="tableData tableData-between">
          <tr>
            <th>操作时间：</th>
            <td>{{balances.applyTime | date}}</td>
          </tr>
          <tr>
            <th>操作类型：</th>
            <td>余额提现</td>
          </tr>
          <tr>
            <th>支出：</th>
            <td class="text-bold">¥ {{balances.flowFee}}</td>
          </tr>
          <tr>
            <th>余额：</th>
            <td class="text-bold">¥ {{balances.walletMoney}}</td>
          </tr>
          <tr>
            <th>提现到:</th>
            <td>{{balances.payChannelName}}</td>
          </tr>
          <tr>
            <th>流水号:</th>
            <td>{{balances.withdrawalNo}}</td>
          </tr>
          <tr>
            <th>提现账号:</th>
            <td>{{balances.withdrawalAccount}}</td>
          </tr>
          <tr>
            <th>提现费用:</th>
            <td class="text-bold">¥ {{balances.withdrawalFee}}</td>
          </tr>
          <tr>
            <th>实际到账:</th>
            <td class="text-bold">¥ {{balances.actualWithdrawalFee}}</td>
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
    name: 'balanceWithdraw',
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
            if (response.body.code !== '000') return false;
            this.balances = response.body.data;
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
