<!--
 - 常见问题
 -
 - author: 张潇
 - date: 2017/6/14
 -->

<template>
  <s-app>

    <s-header>常见问题</s-header>

    <s-main>

      <section class="question">

        <h3>{{question.title}}</h3>

        <article v-html="question.answer"></article>

      </section>

      <section v-if="related.length" class="question-related">

        <h3>相关问题</h3>

        <ul class="list-group">

          <li v-for="item in related">

            <router-link :to="`/guide/question?questionId=${item.id}`">{{item.title}}</router-link>

          </li>

        </ul>

      </section>

      <s-footer></s-footer>

    </s-main>

  </s-app>
</template>

<script>
  import questions from '../../data/questions';
  export default {
    name: 'question',
    data () {
      return {
        question: {}, //问题数据
        related: [],//相关问题数据
      }
    },
    watch: {
      '$route.query.questionId' () {//检测问题id 并作出反应
        this.init();
      }
    },
    methods: {
      /**
       * 获取问题id 并初始化
       */
      init(){
        const query = this.$route.query;
        let questionId = parseInt(query.questionId);
        if (!questionId) {
          this.$Message.warning('需要传入问题id且不能为0');
          this.$router.go(-1);
          return false;
        }
        let question = this.getQuestion(questionId);
        if (!question) {
          this.$Message.warning('问题id不存在');
          window.history.go(-1);
          return false;
        }
        this.question = question;
        this.related = [];
        if (question.related.length > 0) {
          question.related.forEach(item => this.related.push(this.getQuestion(item)));
        }

      },
      /**
       * 根据id得到问题数据
       */
      getQuestion(questionId){
        return questions.all.find(obj => obj.id === questionId);
      },
    },
    created(){
      this.init();
    }
  }
</script>

<style lang="scss">
  .question {
    background-color: white;
    margin-top: 0.2rem;
    padding: 0.2rem;

    article{
      margin-top:0.2rem;
      padding-left:0.05rem;

    }

    p,
    li{
      margin-bottom:0.2rem;
      color: #666;
    }

    &-related {
      background-color: white;
      margin-top: 0.2rem;
      padding: 0.4rem 0.3rem 0.58rem 0.3rem;
      a {
        cursor: pointer;
      }
    }
  }
</style>
