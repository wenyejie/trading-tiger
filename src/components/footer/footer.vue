<!--
 - Title
 -
 - author: Storm
 - date: 2017/05/02
 -->

<template>
  <footer class="s-footer">

    <s-grid class="s-footer-certified" :col="4">
      <li>
        <a href="https://open.alipay.com/platform/home.htm" rel="nofollow" target="_blank">
          <img src="../../assets/certified-alipay.png" alt="支付宝合作商家">
        </a>
      </li>
      <!--<li>
        <a href="" rel="nofollow" target="_blank">
          <img src="../../assets/certified-wechat.png" alt="微信合作上架">
        </a>
      </li>-->
      <li>
        <a href="http://si.trustutn.org/info?sn=137170713029549799292&certType=1%22%3E%3Cimg" rel="nofollow" target="_blank">
          <img src="../../assets/certified-zgrzlm.png" alt="中国认证联盟">
        </a>
      </li>
      <li>
        <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33060402000685" rel="nofollow" target="_blank">
          <img src="../../assets/certified-sxgawjba.png" alt="绍兴公安网警备案">
        </a>
      </li>
      <!--<li>
        <a href="" rel="nofollow" target="_blank">
          <img src="../../assets/certified-www.png" alt="文网文通过认证">
        </a>
      </li>-->
      <!--<li>
        <a href="http://www.miitbeian.gov.cn/state/outPortal/loginPortal.action" rel="nofollow" target="_blank">
          <img src="../../assets/certified-jyxwzba.png" alt="经营性网站备案">
        </a>
      </li>-->
      <!--<li>
        <a href="" rel="nofollow" target="_blank">
          <img src="../../assets/certified-aqrzlm.png" alt="安全认证联盟">
        </a>
      </li>
      <li>
        <a href="" rel="nofollow" target="_blank">
          <img src="../../assets/certified-kxwz.png" alt="可信网站">
        </a>
      </li>-->
      <li>
        <a href="http://webscan.360.cn/index/checkwebsite/url/www.jiaoyihu.com" rel="nofollow" target="_blank">
          <img src="../../assets/certified-360wzaqjc.png" alt="360网站安全监测">
        </a>
      </li>
    </s-grid>

    <ul class="s-footer-nav">
      <li>
        <router-link to="/guide/aboutUs">关于我们</router-link>
      </li>
      <li>
        <router-link to="/guide/contactInformation">联系方式</router-link>
      </li>
      <li>
        <router-link to="/guide/privacyProtection">隐私保护</router-link>
      </li>
      <li>
        <router-link to="/guide/disclaimer">免责声明</router-link>
      </li>
      <li><a href="javascript:;" @click="onAdvisory">在线咨询</a></li>
    </ul>
    <p>交易虎7*24小时为您提供快速、安全的服务</p>
    <p>绍兴迅虎网络科技有限公司©2017-2027</p>
    <p>
      <router-link to="/">jiaoyihu.com</router-link>
      版权所有
    </p>
    <p>
      <a href="http://www.miitbeian.gov.cn/state/outPortal/loginPortal.action"
          target="_blank">浙ICP备17026571号</a>&nbsp;
      <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33060402000685"
         target="_blank"><img src="../../assets/police-badge.png"> 浙公网安备 33060402000685号</a>
    </p>

  </footer>
</template>

<script>

  import grid from '../grid';

  let script;

  export default {
    name: 'footer',
    components: {
      sGrid: grid
    },
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
        $iframe.length && $iframe.forEach && $iframe.forEach(item => item.remove && item.remove());
        script.remove && script.remove();
      } catch (e) {
      }
    }
  }
</script>

<style lang="scss">
  .s-footer {
    text-align: center;
    padding: .21rem 0 .82rem;
    font-size: .2rem;
    line-height: .3rem;
    color: #999;

    a {
      color: #999;
    }

    &-nav {
      font-size: .22rem;
      display: flex;
      justify-content: space-around;
      margin-bottom: .5rem;

      li {
        flex: 1;
        position: relative;
      }

      li + li:before {
        content: '';
        width: 1px;
        height: .12rem;
        background-color: #d8d8d8;
        position: absolute;
        left: -.5px;
        margin-top: .09rem;
      }

      a {
        color: #333;
      }
    }

    &-certified {
      padding: 0 .12rem .31rem;
      font-size: 0;

      img {
        display: block;
        margin-left: auto;
        margin-right: auto;
      }

      li {
        padding: .09rem .04rem;
      }

      a {
        display: block;
      }
    }

  }
</style>
