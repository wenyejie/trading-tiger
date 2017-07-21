<!--
 - 防骗提醒
 -
 - author: Storm
 - date: 2017/06/02
 -->

<template>
  <s-app>
    <s-header>交易虎防骗提醒</s-header>
    <s-main>

      <div class="content">

        <section class="reminder-item">
          <h3 class="reminder-title">1.真的客服会通过什么方式与你聊天？</h3>
          <s-radio-group class="reminder-radio" vertical v-model="answer.contact">
            <s-radio :label="1">QQ</s-radio>
            <s-radio :label="2">邮件</s-radio>
            <s-radio :label="3">短信</s-radio>
            <s-radio :label="4" class="text-bold">站内聊天</s-radio>
          </s-radio-group>
          <div class="text-center mt-30" style="font-size: 0">
            <img src="../../assets/reminder-1.png" style="width: 4.48rem; height: 2.8rem">
          </div>
          <div style="left: 2.6rem; top: 4.45rem;" class="reminder-tips">客服只会通过交易虎站内的“联系发货客服”与你对话</div>
        </section>

        <section class="reminder-item">
          <h3 class="reminder-title">2.以下哪个链接是真的交易虎网址？</h3>
          <s-radio-group class="reminder-radio" vertical v-model="answer.url">
            <s-radio :label="1">https://www.jiaoyihus.com</s-radio>
            <s-radio :label="2">https://www.jiaoyihu1.com</s-radio>
            <s-radio :label="3">https://www.jiaoyihu2.com</s-radio>
            <s-radio :label="4" class="text-bold">https://www.jiaoyihu.com</s-radio>
          </s-radio-group>
          <div style="left: 2.62rem; top: 1.7rem;" class="reminder-tips">请仔细查看链接地址是否为“jiaoyihu.com”</div>
        </section>

        <section class="reminder-item">
          <h3 class="reminder-title">3.交易虎收费吗？</h3>
          <s-radio-group class="reminder-radio" vertical v-model="answer.charge">
            <s-radio :label="1">手续费</s-radio>
            <s-radio :label="2" class="text-bold">交易服务费(0元)</s-radio>
            <s-radio :label="3">保证金</s-radio>
            <s-radio :label="4">找回包赔险</s-radio>
            <s-radio :label="5">安全险</s-radio>
          </s-radio-group>
          <div style="left: 1.68rem; top: .42rem;" class="reminder-tips">交易虎完全免费，要你转账汇款的都是骗子</div>
        </section>

        <section class="reminder-item">
          <h3 class="reminder-title">4.是否还有其他费用？</h3>
          <s-radio-group class="reminder-radio" vertical v-model="answer.withdrawals">
            <s-radio :label="1">还有其他收费，还能讨价还价</s-radio>
            <s-radio :label="2">交易过程中，老板说收取其他抵押费用</s-radio>
            <s-radio :label="3">交易成功后，主管说收取其他抵押费用</s-radio>
            <!--<s-radio :label="4" class="text-bold">申请提现时，支付宝要收取2%的提现费（单笔最低2元）</s-radio>-->
            <s-radio :label="4" class="text-bold">没有其它费用, 提现免费</s-radio>
          </s-radio-group>
          <div style="left: 2.76rem; top: 1.55rem;" class="reminder-tips">交易虎完全免费，要你转账汇款的都是骗子</div>
        </section>

      </div>

      <s-suspension shadow>
        <s-button type="primary"
                  shadow
                  block
                  @click="handleReminder">我已阅读，绝不受骗!
        </s-button>
      </s-suspension>

    </s-main>
  </s-app>
</template>

<script>

  // 答案
  const answer = {
    contact: 4,
    url: 4,
    charge: 2,
    withdrawals: 4
  };

  export default {
    name: 'reminder',
    props: {},
    data () {
      return {

        // 答案
        answer: {

          // 联系方式
          contact: null,

          // 网址
          url: null,

          // 收费
          charge: null,

          // 提现费用
          withdrawals: null
        }
      }
    },
    methods: {

      validator () {
        const keys = Object.keys(answer);
        let index = 1;
        for (let key of keys) {
          if (this.answer[key] === null) {
            this.$Message.warning(`请回答第${index}题!`);
            return false;
          }
          if (answer[key] !== this.answer[key]) {
            this.$Message.warning(`第${index}回答错误!`);
            return false;
          }
          index++;
        }
        return true;
      },

      /**
       * 防骗提醒
       */
      handleReminder () {
        if (!this.validator()) return false;
        let path = this.$route.query.redirectUrl;
        path = path || '/release/selectGame';
        this.$router.push({
          path,
          query: this.$route.query
        });
      }
    }
  }
</script>

<style lang="scss">
  .reminder {

    &-item {
      margin-top: .3rem;
      background-color: #fff;
      border-radius: .1rem;
      padding: .3rem .3rem .4rem;
      line-height: 1;
      position: relative;
    }

    &-title {
      font-size: .26rem;
      font-weight: bold;
    }

    &-radio > .s-radio {
      margin-top: .28rem;
      font-size: .24rem;
      line-height: .3rem;
    }

    &-item .s-radio-input {
      width: .26rem;
      height: .26rem;
    }

    &-tips {
      position: absolute;

      background-color: rgba(255, 5, 49, .70);
      box-shadow: 0 .05rem .28rem 0 rgba(248, 108, 149, .5);
      border-radius: .04rem;
      width: 3rem;

      font-size: .22rem;
      color: #fff;
      letter-spacing: 0;
      line-height: .28rem;
      padding: .15rem .1rem;
      text-align: left;
      word-break: break-all;

      &:after {
        content: '';
        position: absolute;
        bottom: -.14rem;
        left: 50%;
        margin-left: -.08rem;
        width: 0;
        height: 0;
        border-left: .08rem solid transparent;
        border-right: .08rem solid transparent;
        border-top: .14rem solid rgba(255, 5, 49, 0.70);
      }

    }
  }
</style>
