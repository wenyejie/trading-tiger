<!--
 - 公告详情
 -
 - author: Storm
 - date: 2017/07/07
 -->

<template>
  <s-app>

    <s-header :title="announce.title">{{announce.title}}</s-header>

    <s-main>
      <article class="guide-article" v-html="announce.content"></article>

      <s-footer></s-footer>
    </s-main>

  </s-app>
</template>

<script>
  import '../../styles/guide-article.scss';
  import announces from '../../data/announces';

  export default {
    name: 'announce',
    props: {},
    data () {
      return {
        // 公告ID
        announceId: null,

        // 公告实例
        announce: {}
      }
    },
    methods: {

      /**
       * 页面初始化
       */
      init () {
        this.announceId = parseInt(this.$route.query.announceId);
        if (!this.announceId) {
          this.$Message.info('公告ID错误!');
          return false;
        }
        this.announce = announces.find(item => item.id === this.announceId);
        if (!this.announce) {
          this.announce = {};
          this.$Message.info('获取公告错误!');
          return false;
        }
      }
    },
    created () {
      this.init();
    }
  }
</script>
