/**
 * 商品信息
 *
 * author: Storm
 * date: 2017/04/22
 */

import index from '../view/goods/index.vue';
import detail from '../view/goods/detail.vue';
import preview from '../view/goods/preview.vue';
import buy from '../view/goods/buy.vue';
import payment from '../view/goods/payment.vue';

export default {
  path: '/goods',
  component: {
    template: `<router-view></router-view>`,
    name: 'goods'
  },
  children: [

    // 全部商品
    {
      path: '',
      name: 'indexGoods',
      meta: {
        keepAlive: true
      },
      component: index
    },

    // 商品详情
    {
      path: 'detail',
      name: 'detailGoods',
      meta: {
        keepAlive: true
      },
      component: detail
    },

    // 商品预览
    {
      path: 'preview',
      component: preview
    },

    // 下单购买
    {
      path: 'buy',
      name: 'buyGoods',
      component: buy
    },

    // 等待返回支付结果
    {
      path: 'payment',
      name: 'paymentGoods',
      component: payment
    }

  ]
}
