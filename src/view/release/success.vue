<!--
 - 发布成功
 -
 - author: Storm
 - date: 2017/04/19
 -->

<template>

  <s-app>
    <s-header>发布成功</s-header>

    <s-main class="releaseSuccess">

      <s-steps :active="0" status="success">
        <s-step label="发布成功,等待商品审核">{{nowStamp | date}}</s-step>
        <s-step label="通过审核, 商品自动上架">约30分钟</s-step>
        <s-step label="等待玩家购买"></s-step>
      </s-steps>

      <s-panel>
        <p>每日发布商品数： <span style="color: #ff9616">{{query.surplusTimes}}</span> / {{query.maxTimes}}</p>

        <template slot="footer">
          <s-row gutter=".1rem">
            <s-col span="12">
              <s-button block @click="continueRelease">继续发布同类商品</s-button>
            </s-col>
            <s-col span="12">
              <s-button block outline @click="handleGoodsClass">查看同类商品</s-button>
            </s-col>
          </s-row>
        </template>
      </s-panel>

      <s-panel title="交易安全防骗提醒" class="mt-20">

        <ul class="content-neg c-9">
          <s-cell tag="li">
            <template slot="before">
              <s-icon type="success"></s-icon>
            </template>
            客服只会通过本站内的聊天系统联系您
          </s-cell>
          <s-cell tag="li">
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

        <template slot="footer">
          <s-row gutter=".1rem">
            <s-col span="12">
              <s-button block @click="goHome">返回首页</s-button>
            </s-col>
            <s-col span="12">
              <s-button block type="primary" shadow icon="link" @click="copyLink">复制商品链接</s-button>
            </s-col>
          </s-row>
        </template>

      </s-panel>

    </s-main>
  </s-app>

</template>

<script>
  import steps from '@/components/steps';
  import step from '@/components/step';
  import copy from '@/core/copy';
  export default {
    name: 'Success',
    components: {
      sSteps: steps,
      sStep: step
    },
    props: {},
    data () {
      return {
        surplusTimes: 0,
        nowStamp: Date.now(),
        query: null
      }
    },
    methods: {

      /**
       * 查看同类商品
       */
      handleGoodsClass () {

        let query = this.$route.query;
        delete query.surplusTimes;
        delete query.accountTypeId;

        this.$router.push({
          path: '/goods',
          query: query
        })
      },

      goHome () {
        this.$router.push('/');
      },

      // 继续发布同类商品
      continueRelease () {

        // 如果有选择账号类型则返回上两页, 否则返回上一页
        if (!this.query.hasAccount) this.$router.go(-1);
        else this.$router.go(-2);
      },

      copyLink() {

        if (this.$browser.isMobile) {
          this.$Dialog.alert('长按复制', {
            mini: true,
            title: location.origin + '/goods/detail?goodsId=' + this.query.goodsId
          });
          return false;
        }
        copy(location.origin + '/goods/detail?goodsId=' + this.query.goodsId);
        this.$Message.success('复制成功！');


      }
    },
    watch: {
      $route () {
        this.surplusTimes = this.$route.query.surplusTimes;
      }
    },
    created () {
      this.query = this.$route.query;
      this.surplusTimes = this.$route.query.surplusTimes;
    }
  }
</script>

<style lang="scss">
  /* release success */
  .releaseSuccess .s-panel-header {
    padding-bottom: 0;
  }
  .releaseSuccess .s-panel-footer {
    padding: 0 .24rem .24rem;
  }
  /* /release success */
</style>
