<!--
 - goods list 商品列表
 -
 - author: Storm
 - date: 2017/04/23
 -->

<template>
  <router-link :to="`/goods/detail?goodsId=${goods.goodsId}`" class="s-goodsList">

    <!--<s-flag-group>-->
    <!--<s-flag>热门商品</s-flag>-->
    <!--<s-flag type="warning"><span>9.9</span>折</s-flag>-->
    <!--<s-flag type="info">闪电发货</s-flag>-->
    <!--</s-flag-group>-->

    <div class="s-goodsList-tags">
      <span class="bg-img" v-if="goods.showType === 2"></span>
      <s-label :type="goddsType">{{goods.classId | goodsClass}}</s-label>
      <s-label :type="platformType">{{goods.platformId | platformType}}</s-label>
      <span class="s-goodsList-area">{{goods.domainName || goods.serverName || '全服通用'}}</span>
    </div>

    <h3 class="s-goodsList-title text-ellipsis">{{goods.showTitle}}</h3>

    <div class="s-goodsList-price">¥ {{goods.price}}</div>

  </router-link>
</template>

<script>
  /*import Flag from '../components/flag';
   import FlagGroup from '../components/flagGroup';*/
  import platformType from '../../filters/platformType';
  import goodsClass from '../../filters/goodsClass';

  export default {
    name: 'goodsList',
    components: {
      /*sFlag: Flag,
       sFlagGroup: FlagGroup,*/
    },
    filters: {
      platformType,
      goodsClass
    },
    props: {
      goods: Object
    },
    data () {
      return {}
    },
    methods: {},
    computed: {

      /**
       * 商品分类
       */
      goddsType () {
        return goodsClass(this.goods.classId, 'className');
      },

      /**
       * 平台类型
       */
      platformType () {
        return platformType(this.goods.platformId, 'type');
      },

      /**
       * CSS 样式对齐
       * @return {{}}
       */
      /*styles () {
       let result = {};
       if (/^【/.test(this.goods.showTitle)) result.marginLeft = '-.16rem';
       return result;
       }*/
    }
  }
</script>
