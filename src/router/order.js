/**
 * 订单
 *
 * author: Storm
 * date: 2017/04/27
 */

import service from '../view/order/service.vue';
import details from '../view/order/details.vue';
import history from '../view/order/history.vue';

import apply from '../view/order/arbitration/apply.vue';
import progress from '../view/order/arbitration/progress.vue';
import credentials from '../view/order/arbitration/credentials.vue';

import sellerIndex from '../view/order/seller/index.vue';
import sellerTrading from '../view/order/seller/trading.vue';
import sellerReceive from '../view/order/seller/receive.vue';
import sellerArbitrating from '../view/order/seller/arbitrating.vue';
import sellerSuccessful from '../view/order/seller/successful.vue';
import sellerFailure from '../view/order/seller/failure.vue';

import buyerIndex from '../view/order/buyer/index.vue';
import buyerEvidence from '../view/order/buyer/evidence.vue';
import buyerExtract from '../view/order/buyer/extract.vue';
import buyerUnpaid from '../view/order/buyer/unpaid.vue';
import buyerTrading from '../view/order/buyer/trading.vue';
import buyerUnreceive from '../view/order/buyer/unreceive.vue';
import buyerArbitrating from '../view/order/buyer/arbitrating.vue';
import buyerFailure from '../view/order/buyer/failure.vue';
import buyerSuccessful from '../view/order/buyer/successful.vue';

export default {
  path: '/order',
  component: {
    template: '<router-view></router-view>',
    name:'orderRouter'
  },
  children: [

    // 仲裁
    {
      path: 'arbitration',
      component: {
        template: '<router-view></router-view>',
        name:'arbitrationRouter',
      },
      children: [

        // 仲裁申请
        {
          path: 'apply',
          component: apply
        },

        // 仲裁进度
        {
          path: 'progress',
          component: progress
        },

        // 添加新凭证
        {
          path: 'credentials',
          component: credentials
        }
      ]
    },

    // 卖家
    {
      path: 'seller',
      component: {
        template: '<router-view></router-view>',
        name:'sellerRouter',
      },
      children: [

        // 订单列表
        {
          path: '',
          component: sellerIndex
        },

        // 交易中
        {
          path: 'trading',
          component: sellerTrading
        },

        // 已发货, 待买家确认收获
        {
          path: 'receive',
          component: sellerReceive
        },

        // 仲裁中
        {
          path: 'arbitrating',
          component: sellerArbitrating
        },

        // 交易成功
        {
          path: 'successful',
          component: sellerSuccessful
        },

        // 交易失败
        {
          path: 'failure',
          component: sellerFailure
        }

      ]
    },

    // 买家
    {
      path: 'buyer',
      component: {
        template: '<router-view></router-view>',
        name:'buyerRouter',
      },
      children: [

        // 订单列表
        {
          path: '',
          component: buyerIndex
        },

        // 交易证明
        {
          path: 'evidence',
          component: buyerEvidence
        },

        // 提取账号密码
        {
          path: 'extract',
          component: buyerExtract
        },

        // 未支付
        {
          path: 'unpaid',
          component: buyerUnpaid
        },

        // 交易中
        {
          path: 'trading',
          component: buyerTrading
        },

        // 待收货
        {
          path: 'unreceive',
          component: buyerUnreceive
        },

        // 仲裁中
        {
          path: 'arbitrating',
          component: buyerArbitrating
        },

        // 交易失败
        {
          path: 'failure',
          component: buyerFailure
        },

        // 交易成功
        {
          path: 'successful',
          component: buyerSuccessful
        }

      ]
    },

    // 发货客服
    {
      path: 'service',
      component: service
    },

    // 交易证明
    {
      path: 'details',
      component: details
    },

    // 查看历史记录
    {
      path: 'history',
      component: history
    }

  ]
}
