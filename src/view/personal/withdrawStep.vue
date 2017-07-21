<!--
 - 提现详情
 -
 - author: Storm
 - date: 2017/05/02
 -->

<template>

  <s-app>

    <s-header>提现详情</s-header>

    <s-main bgc="white">

      <s-steps>
        <s-step :status="item.time && (item.status === 4 || item.status === 5 ? 'error' : 'success')"
                :label="item.statusText"
                v-for="(item, index) in status"
                :key="index">{{item.time | date}}</s-step>
      </s-steps>

      <div class="content mt-20">
        <table class="tableData tableData-between">
          <tr>
            <th>提现到:</th>
            <td>{{info.channelName}}</td>
          </tr>
          <tr>
            <th>支付宝流水号:</th>
            <td>{{info.orderNo}}</td>
          </tr>
          <tr>
            <th>提现账号:</th>
            <td>{{info.withdrawalAccount}}</td>
          </tr>
          <tr>
            <th>提现金额:</th>
            <td class="text-bold">¥ {{info.withdrawalAmount}}</td>
          </tr>
          <tr>
            <th>提现费用:</th>
            <td class="text-bold">¥ {{info.withdrawalFee}}</td>
          </tr>
          <tr>
            <th>实际到账:</th>
            <td class="text-bold">¥ {{info.actualWithdrawalFee}}</td>
          </tr>
          <tr>
            <th>冻结金额:</th>
            <td class="text-bold">¥ {{info.freezeBalance}}</td>
          </tr>
          <tr>
            <th>备注：</th>
            <td>{{info.remark}}</td>
          </tr>
        </table>
      </div>

    </s-main>

  </s-app>

</template>

<script>

  export default {
    name: 'withdrawStep',
    props: {},
    data () {
      return {
        loading: null,

        // 提现ID
        withdrawalId: null,

        // 提现信息
        info: {},

        // 提现状态
        status: {},
      }
    },
    methods: {

      // 获取提现详情
      getWithdrawDetail () {
        if (this.loading) return false;
        this.loading = true;
        this
          .$http
          .get('/h5/user/withdrawalDetail', {
            params: {payFlowId: this.payFlowId}
          })
          .then(response => {
            if (response.body.code !== '000') return false;
            this.info = response.body.data.infoMap;
            this.status = response.body.data.statusMap;
          })
          .finally(() => this.loading = false);
      }
    },
    created () {
      this.payFlowId = Number(this.$route.query.payFlowId);
      this.getWithdrawDetail();

    }
  }
</script>
