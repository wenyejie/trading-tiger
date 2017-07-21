<!--
 - Title
 -
 - author: 张潇
 - date: 2017/6/13
 -->

<template>
  <s-app>

    <s-header>防骗说明</s-header>

    <s-main>

      <div class="instruction-panel mt-20">

        <ul class="content-neg c-9">
          <s-cell tag="li" class="font-success">
            <template slot="before">
              <s-icon type="success"></s-icon>
            </template>
            客服只会通过本站内的聊天系统联系您
          </s-cell>
          <s-cell tag="li" class="font-success">
            <template slot="before">
              <s-icon type="success"></s-icon>
            </template>
            <!--本站仅收取【交易服务费】交易成功时自动扣款 ，您提现的手续费由收款方自动扣除-->
            本站目前不收任何费用（例如交易服务费, 手续费, 提现费等）, 谨防受骗
          </s-cell>
          <s-cell tag="li">
            <template slot="before">
              <s-icon type="error"></s-icon>
            </template>
            交易时请勿在本站以外的聊天软件（如QQ、微信、贴吧等）进行沟通
          </s-cell>
          <s-cell tag="li">
            <template slot="before">
              <s-icon type="error"></s-icon>
            </template>
            本站不会要求您转账、汇款，或向您索要其他任何费用
          </s-cell>
          <s-cell tag="li">
            <template slot="before">
              <s-icon type="error"></s-icon>
            </template>
            本站不会向您主动索要游戏账号和密码
          </s-cell>
        </ul>

        <s-row gutter=".1rem" class="mt-32">
          <s-col span="12">
            <s-button block @click="onAdvisory" class="btn-long">未解决,联系在线客服</s-button>
          </s-col>
          <s-col span="12">
            <s-button block icon="appreciatefill" @click="back">已解决</s-button>
          </s-col>
        </s-row>

      </div>

      <section class="instruction-question" v-if="related.length > 0">

        <h3>相关问题</h3>

        <ul class="list-group">
          <li v-for="item in related">
            <router-link :to="`/guide/question?questionId=${item.id}`">{{item.title}}</router-link>
          </li>
        </ul>

      </section>

    </s-main>

  </s-app>

</template>

<script>
  import questions from '../../data/questions';

  let script;

  export default {
    name: 'instruction',
    data () {
      return {
        related: [] //相关问题
      }
    },
    methods: {

      /**
       * 立即咨询
       */
      onAdvisory () {
        script = document.createElement('script');
        script.src = CONFIG.QIYE_QQ_SRC;
        script.charset = 'utf-8';
        document.body.appendChild(script);
      },

      /**
       * 如果问题已解决就返回
       */
      back () {
        this.$router.back();
      }
    },
    created () {
      // 获取相关问题
      questions.instruction.forEach(item => this.related.push(questions.all.find(subItem => subItem.id === item)));
    },

    beforeDestroy () {
      try {
        script && script.remove();
        const $iframe = document.querySelectorAll('iframe');
        $iframe.length && $iframe.forEach(item => item.remove && item.remove());
        script.remove && script.remove();
      } catch (e) {
      }
    }
  }
</script>

<style lang="scss">
  .instruction-panel {
    padding: 0 0.24rem 0.32rem 0.24rem;
    background-color: white;
    .s-cell {
      border: 0;
      height: 1rem;
    }
  }
  .instruction-question {
    margin-top: 0.2rem;
    padding: 0.4rem 0.24rem;
    background-color: white;
  }
  .btn-long {
    padding: 0 0.2rem;
  }
  .mt-32 {
    margin-top: 0.32rem;
  }
  .font-success {
    color: #62c05d;
  }

</style>
