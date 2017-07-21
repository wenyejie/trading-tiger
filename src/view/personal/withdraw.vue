<!--
 - 提现
 -
 - author: Storm
 - date: 2017/05/02
 -->

<template>
  <s-app>
    <s-header>提现</s-header>

    <s-main :loading="loading !== false">

      <div class="withdraw">

        <div class="withdraw-content">

          <div class="withdraw-header">

            <p class="fz-26">提现到</p>

            <s-row justify="between" align="center" class="mt-20">
              <s-col><img class="text-middle" src="../../assets/alipay-on.png"> 支付宝</s-col>
              <s-col class="c-6 fz-26">{{withdrawInfo.alipayAccount}}</s-col>
            </s-row>

            <p style="margin-top: .6rem" class="fz-26 c-3">提现金额
              <span class="c-9">(提现费率{{withdrawInfo.tradeServiceSwitch ? withdrawInfo.rate : 0}}%)</span>
            </p>

          </div>

          <div class="withdraw-body">
            <label class="withdraw-label">
              <input v-model.trim.number="withdraw.money"
                     :max="maxMoney"
                     maxlength="5"
                     :min="withdrawInfo.minSingleDraw"
                     class="withdraw-input"
                     type="number">
            </label>
            <p class="mt-15" v-show="!withdraw.money">账户余额 ¥{{withdrawInfo.money}}</p>
            <p class="mt-15" v-show="withdraw.money">提现费用 ¥{{expenses}}
              <!--<router-link to="">提现收费标准</router-link>-->
            </p>
            <p class="mt-15" v-show="withdraw.money">实际到账 ¥{{arrival}}</p>
          </div>

          <div class="withdraw-footer">
            <s-button type="primary" @click="handleWithdraw" block>提现</s-button>
            <p class="c-error mt-25 lh-1_5">目前仅支持支付宝账户提现，请正确输入您已经实名认证的支付宝账户，非实名账户无法收款</p>
            <!--<p class="mt-25">提现费用由支付宝收取，与交易虎无关</p>-->
          </div>

        </div>

      </div>

    </s-main>

  </s-app>
</template>

<script>
  export default {
    name: 'withdraw',
    props: {},
    data () {
      return {

        loading: null,

        withdrawing: null,

        // 提现
        withdrawInfo: {
          payChannels: {}
        },

        withdraw: {
          money: null
        },

        // 选择的支付方式
        payChannels: {}
      }
    },
    watch: {

      // 避免提现金额小于0
      'withdraw.money' (val) {
        if (val < 0) this.withdraw.money = 0;
      }
    },
    computed: {

      // 提现费用
      expenses () {
        if (!this.withdrawInfo.tradeServiceSwitch || !this.withdrawInfo.drawCashSwitch) return '0.00';
        if (!this.withdraw.money) return '0.00';
        const charges = (this.withdraw.money * (this.withdrawInfo.rate || 0) / 100).toFixed(2);
        return charges < this.withdrawInfo.minCharging ? this.withdrawInfo.minCharging : charges;
      },

      // 实际到账
      arrival () {
        if (!this.withdraw.money) return '0.00';
        if (!this.withdrawInfo.tradeServiceSwitch || !this.withdrawInfo.drawCashSwitch) return this.withdraw.money;
        return (this.withdraw.money - this.expenses).toFixed(2);
      },

      // 单笔最大提现金额
      maxMoney () {
        return this.withdrawInfo.money < this.withdrawInfo.maxSingleDraw ? this.withdrawInfo.money : this.withdrawInfo.maxSingleDraw;
      }
    },
    methods: {

      // 表单验证
      validator () {

        if (!this.withdraw.money) {
          this.$Message.warning('提现金额不能为空');
          return false;
        }
        /*if (!/^\d+$/.test(this.withdraw.money + '')) {
          this.$Message.warning('提现金额只能为正整数');
          return false;
        }*/

        if (this.withdraw.money > this.withdrawInfo.money) {
          this.$Message.warning('提现金额不能超过账户余额');
          return false;
        }

        // 提现费率开关是否开启：开启，关闭
        if (this.withdrawInfo.drawCashSwitch) {
          if (this.withdraw.money > this.withdrawInfo.maxSingleDraw) {
            this.$Message.warning('提现金额不能超过单笔提现上限' + this.withdrawInfo.maxSingleDraw + '元');
            return false;
          }
          if (this.withdraw.money < this.withdrawInfo.minSingleDraw) {
            this.$Message.warning('提现金额不能低于单笔提现下限' + this.withdrawInfo.minSingleDraw + '元');
            return false;
          }
          if (this.withdrawInfo.maxDrawCashEveryDay <= this.withdrawInfo.currentMaxDrawCashEveryDay + this.withdraw.money) {
            this.$Message.warning(`每日提现总额不能超过${this.withdrawInfo.maxDrawCashEveryDay}元`);
            return false;
          }

          if (this.withdrawInfo.maxDrawCountsEveryDay <= this.withdrawInfo.hasWithdrawalCount) {
            this.$Message.warning('每日提现次数不能超过' + this.withdrawInfo.maxDrawCountsEveryDay + '次');
            return false;
          }
        }
        return true;
      },

      // 提现
      handleWithdraw () {
        if (!this.validator()) return false;
        if (this.withdrawing) return false;
        this.withdrawing = true;

        this.withdraw.channelId = this.payChannels.channelId;

        this
          .$http
          .post('/h5/user/fastWithdrawal', this.withdraw)
          .then(response => {
            if (response.body.code !== '000') return false;
            this.$router.replace({
              path: '/personal/withdrawStep',
              query: {
                payFlowId: response.body.data.payFlowId
              }
            });
          })
          .finally(() => this.withdrawing = false);
      },

      // 获取用户提现账号余额,费率,提现方式等信息
      getWithdrawInfo () {
        if (this.loading) return false;
        this.loading = true;
        this
          .$http
          .post('/h5/user/withdrawalTips')
          .then(response => {
            if (response.body.code !== '000') return false;
            this.withdrawInfo = response.body.data;
            this.payChannels = response.body.data.payChannels[0];
          })
          .finally(() => this.loading = false);
      }

    },
    mounted () {
      this.getWithdrawInfo();
    }
  }
</script>

<style lang="scss">
  .withdraw {
    line-height:1;
    padding: .3rem;
    color: #999;

    &-content {
      background-color: #fff;
      border-radius: .06rem;
      padding: .3rem .2rem .24rem;
    }

    &-header {
      padding-left: .1rem;
      padding-right: .1rem;
    }

    &-label {
      display: block;
      padding: .2rem .1rem;
      position: relative;
      border-bottom: 1px solid #E5E5E5;
      font-size: .48rem;
      color: #333;

      &:before {
        content: '¥';
        font-weight: bold;
        height: .48rem;
        width: .48rem;
        left: .1rem;
        position: absolute;
        text-align: center;
      }

    }

    &-input {
      width: 100%;
      height: .48rem;
      line-height: .48rem;
      border: none;
      padding-left: .58rem;
    }

    &-footer {
      margin-top: 1.2rem;
    }

  }
</style>
