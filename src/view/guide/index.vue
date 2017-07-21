<!--
 - 交易指南
 -
 - author: Storm
 - date: 2017/06/07
 -->

<template>
  <s-app class="guide">

    <s-header>交易指南</s-header>

    <s-main bgc="white">

      <nav class="guide-nav">
        <ul class="clearfix">
          <li>
            <s-button @click="buyProcess" shadow type="primary" block>购买流程</s-button>
          </li>
          <li>
            <s-button @click="sellProcess" shadow type="primary" block>出售流程</s-button>
          </li>
          <li>
            <s-button @click="instructionProcess" shadow type="primary" block>防骗说明</s-button>
          </li>
          <li>
            <s-button @click="ruleProcess" shadow type="primary" block>收费规则</s-button>
          </li>
        </ul>
      </nav>

      <s-tabs>
        <s-tabs-panel label="我是买家" v-if="buyer.length" name="buyer">

          <ul class="list-group">
            <li v-for="item in buyer">
              <router-link :to="`/guide/question?questionId=${item.id}`">{{item.title}}</router-link>
            </li>
          </ul>

        </s-tabs-panel>
        <s-tabs-panel label="我是卖家" v-if="seller.length" name="seller">

          <ul class="list-group">
            <li v-for="item in seller">
              <router-link :to="`/guide/question?questionId=${item.id}`">{{item.title}}</router-link>
            </li>
          </ul>

        </s-tabs-panel>
        <!--<s-tabs-panel label="我想合作">-->

        <!--<ul class="list-group">-->
        <!--<li><a href="javascript:;">怎么选择客户端?</a></li>-->
        <!--<li><a href="javascript:;">怎么选择客户端?</a></li>-->
        <!--<li><a href="javascript:;">怎么选择客户端?</a></li>-->
        <!--<li><a href="javascript:;">怎么选择客户端?</a></li>-->
        <!--<li><a href="javascript:;">怎么选择客户端?</a></li>-->
        <!--</ul>-->

        <!--</s-tabs-panel>-->
      </s-tabs>

    </s-main>

  </s-app>
</template>

<script>
  import questions from '../../data/questions';
  export default {
    name: 'guide',
    props: {},
    data () {
      return {
        seller: [],
        buyer: []
      }
    },
    methods: {
      buyProcess () {
        this
          .$router
          .push({
            path: '/guide/buy'
          })
      },
      sellProcess () {
        this
          .$router
          .push({
            path: '/guide/sell'
          })
      },
      instructionProcess () {
        this
          .$router
          .push({
            path: '/guide/instruction'
          })
      },
      ruleProcess () {
        this.$router
          .push({
            path: '/guide/rule'
          })
      },
      /**
       * 在进入页面时 加载 常见问题
       */
      init(){
        questions.all.forEach(item => {
          if (item.role === 1) {
            this.buyer.push(item);
          } else if (item.role === 2) {
            this.seller.push(item);
          }
        });
      }
    },
    created(){
      this.init();
    }
  }
</script>

<style lang="scss">
  .guide {

    &-nav {
      background-color: #f5f5f5;
      padding: .52rem .2rem;

      ul {
        overflow: hidden;
      }

      li {
        float: left;
        width: 50%;
        text-align: center;
        padding: .1rem .3rem;
      }
    }

  }
</style>
