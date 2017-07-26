/**
 * 商品信息
 *
 * author: Storm
 * date: 2017/04/22
 */

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
      component: resolve => require(['../view/goods/index.vue'], resolve)
    },

    // 商品详情
    {
      path: 'detail',
      name: 'detailGoods',
      component: resolve => require(['../view/goods/detail.vue'], resolve)
    },

    // 商品预览
    {
      path: 'preview',
      component: resolve => require(['../view/goods/preview.vue'], resolve)
    },

    // 下单购买
    {
      path: 'buy',
      name: 'buyGoods',
      component: resolve => require(['../view/goods/buy.vue'], resolve)
    },

    // 等待返回支付结果
    {
      path: 'payment',
      name: 'paymentGoods',
      component: resolve => require(['../view/goods/payment.vue'], resolve)
    }

  ]
}
