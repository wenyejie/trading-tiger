<!--
 - 公告详情
 -
 - author: Storm
 - date: 2017/07/07
 -->

<template>
  <s-app>

    <s-header :title="announce.title">{{announce.title}}</s-header>

    <s-main :loading="loading !== false">
      <article class="guide-article announce" v-html="announce.content"></article>

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

        // 公告实例
        announce: {},

        loading: null,

      }
    },
    methods: {

      /**
       * 获取公告
       * @param id 公告ID
       */
      getAnnounce (id) {
        if (this.loading) return false;
        this.loading = true;
        this.$http
          .post('/h5/announceManage/getAnnounceDetail', {
            announceId: id
          })
          .then(response => {
            if (response.body.code !== '000') return false;
            this.announce = response.body.data;
          })
          .finally(() => this.loading = false);
      },

      /**
       * 从本地数据中获取id
       * @param id
       */
      getAnnounceByLocal (id) {
        this.announce = announces.find(item => item.id === id);
        if (!this.announce) {
          this.announce = {};
          this.$Message.info('获取公告错误! 或公告ID不存在');
          return false;
        }
        this.$nextTick(() => this.loading = false);
      },

      /**
       * 页面初始化
       */
      init () {
        this.announceId = parseInt(this.$route.query.announceId);
        if (!this.announceId) {
          this.$Message.info('公告ID错误!');
          return false;
        }

        !this.$route.query.banner ? this.getAnnounce(this.announceId) : this.getAnnounceByLocal(this.announceId);

      }
    },
    created () {
      this.init();
    }
  }
</script>
<style lang="scss">
  .guide-article.announce {
    word-break: break-all;
    overflow: hidden;
    min-height: 50vh;

    * {
      text-indent: 0 !important;
      max-width: 100% !important;
      margin-top: 0 !important;
      margin-bottom: 0 !important;
      line-height: inherit !important;
      word-break: break-all !important;
      white-space: inherit !important;
    }

    ul {
      list-style-type: disc;
    }

    ol {
      list-style-type: decimal;
    }

    li {
      list-style: inherit;
      list-style-position: inside;
    }
  }
</style>
