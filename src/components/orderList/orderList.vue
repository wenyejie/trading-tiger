<!--
 - 订单列表
 - 当订单状态orderStatus等于1时即未支付, 点击链接跳转至商品详情
 -
 - author: Storm
 - date: 2017/05/03
 -->

<template>
  <section class="s-card">
    <s-cell class="s-card-header" tag="header">
      <span class="s-card-time c-9">订单号:{{order.orderNo}}</span>
      <s-button size="xs" type="default" @click="handleCopy">复制</s-button>
      <template slot="right">
        <span v-if="order.hasCountdown !== false"
              class="s-card-type c-9">
          <span v-if="order.orderStatus === 7">{{order.processStatusType | orderStatus}}</span>
          <span v-if="order.orderStatus !== 7">{{order.orderStatus | orderProcessStatus}}</span>
        </span>
        <span v-if="order.hasCountdown === false"
              class="s-card-type c-9">超时未支付</span>
      </template>
    </s-cell>
    <s-link
      :to="order.orderStatus === 1 ? `/goods/detail?goodsId=${order.goodsId}` : `/order/details?orderId=${order.orderId}&type=${type}`"
      class="s-card-body" size="lg">
      <div class="s-card-left">
        <h4 class="s-card-title">
          <span v-if="goods.showType === 2" class="s-card-img"></span>
          <s-label :type="classType">{{goods.subClassName}}</s-label>
          <span class="s-card-title-inner">{{goods.showTitle}}</span>
        </h4>
        <div class="s-card-desc">{{goods.gameName}}{{goods.domainName && '-' + goods.domainName}}-{{goods.serverName}}
        </div>
      </div>

    </s-link>
    <s-cell class="s-card-other">
      <div class="s-card-storge">数量:{{order.num}}</div>
      <div slot="right" class="s-card-storge">总价:<span style="color: #fd802c">¥{{order.price}}</span></div>
    </s-cell>
    <s-cell class="s-card-footer" tag="footer" v-if="$slots.tool || order.processStatusType === 3">
      <div class="s-card-confirm"
           v-if="order.processStatusType === 3 && order.orderStatus === 7 && type === 'seller'">
        最晚确认时间：{{order.protectionTime | date('YYYY-MM-DD hh:mm')}}
      </div>
      <div class="s-card-tool" slot="right" v-if="$slots.tool">
        <slot name="tool"></slot>
      </div>
    </s-cell>
  </section>
</template>

<script>
  import orderStatus from '../../filters/orderStatus';
  import orderProcessStatus from '../../filters/orderProcessStatus';
  import copy from '../../core/copy';

  /* case 1: return '账号';case 2: return '道具';case 3: return '游戏币'; */
  const classClss = [
    {
      classId: 1,
      type: 'primary'
    },
    {
      classId: 2,
      type: 'info'
    },
    {
      classId: 3,
      type: 'warning'
    },
  ];

  export default {
    name: 'orderList',
    filters: {
      orderStatus,
      orderProcessStatus
    },
    props: {
      order: Object,
      goods: Object,
      type: String,
      link: String
    },
    computed: {
      classType () {
        const cls = classClss.find(item => item.classId === this.goods.goodsClassId);
        return cls && cls.type;
      }
    },
    data () {
      return {}
    },
    methods: {

      /**
       * 复制订单号
       * @return {boolean}
       */
      handleCopy () {
        if (this.$browser.isMobile) {
          this.$Dialog.alert('长按复制', {
            mini: true,
            title: this.order.orderNo
          });
          return false;
        }
        copy(this.order.orderNo);
        this.$Message.success('复制成功！');

      }
    }
  }
</script>
