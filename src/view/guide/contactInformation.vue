<!--
 - 联系方式
 -
 - author: Storm
 - date: 2017/07/06
 -->

<template>
  <s-app>

    <s-header>联系方式</s-header>

    <s-main>
      <article class="guide-article">
        <ul>
          <li>公司名称：绍兴迅虎网络科技有限公司</li>
          <li>联系电话：0575-82818908</li>
          <li>公司地址：浙江省绍兴市上虞区曹娥街道世邦万祥城商务楼0705办公室</li>
          <li>咨询客服：<a href="javascript:;" @click="onAdvisory">点击咨询</a></li>
          <li>商务合作：business@jiaoyihu.com</li>
          <li>友情链接：business@jiaoyihu.com</li>
        </ul>
      </article>

      <s-footer></s-footer>
    </s-main>

  </s-app>
</template>

<script>
  import '../../styles/guide-article.scss';
  let script;

  export default {
    name: 'contactInformation',
    props: {},
    data () {
      return {}
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
      }
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
