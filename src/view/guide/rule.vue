<!--
 - 收费规则
 -
 - author: 张潇
 - date: 2017/6/13
 -->

<template>
  <s-app>

    <s-header>收费规则</s-header>

    <s-main>

      <section class="rule-body content-lg">

        <div class="rule-cash">

          <h3>提现费</h3>

          <p class="rule-intro c-c">目前从交易虎的个人余额提现到支付宝，<!--支付宝将收取一定的提现费用，-->具体收费规则如下：</p>

          <ul class="list-group">
            <li>提现免费</li>
            <!--<li><a>单笔提现最低2元提现费</a></li>
            <li><a>提现费率为2%</a></li>-->
            <li><a>每日最多可申请提现次数为10次</a></li>
            <li><a>单笔提现最大额为5000元</a></li>
            <li><a>当天最大提现额度为50000元</a></li>
          </ul>

        </div>

        <div>

          <h3 class="fz-30">交易服务费</h3>

          <p class="rule-intro c-c">客服为买卖双方提供安全的发货服务，将收取一定的服
            务费。目前交易虎以自费补贴的形式支付给客服，无需
            用户支付，服务费为0。以后何时由用户支付尚未确定，
            一切解释权归交易虎所有。
          </p>
        </div>

      </section>

      <section class="rule-body content-lg" v-if="related.length>0">

        <h3>相关问题</h3>

        <ul class="list-group">
          <li v-for="item in related"><router-link :to="`/guide/question?questionId=${item.id}`">{{item.title}}</router-link></li>
        </ul>

      </section>

    </s-main>

  </s-app>
</template>

<script>
  import questions from '../../data/questions'
  export default {
    name: 'rule',
    data () {
      return {
        related: [], // 相关问题
      }
    },
    created(){
      questions.rule.forEach(item => this.related.push(questions.all.find(subItem => subItem.id === item)));// 初始化相关问题
    }
  }
</script>

<style lang="scss">
  .rule {
    &-body {
      margin-top: .2rem;
      padding-bottom: .58rem;
      padding-top: .4rem;
      background-color: white;
    }
    &-cash {
      margin-bottom: .6rem;
    }
    &-intro {
      padding-top: .26rem;
      font-size: .24rem;
      line-height: .28rem;
    }
  }
  .fz-30 {
    font-size: .3rem;
  }
</style>

