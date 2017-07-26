/**
 * 订单
 *
 * author: Storm
 * date: 2017/04/27
 */

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
          component: resolve => {
            require(['../view/order/arbitration/apply.vue'], resolve);
          }
        },

        // 仲裁进度
        {
          path: 'progress',
          component: resolve => {
            require(['../view/order/arbitration/progress.vue'], resolve);
          }
        },

        // 添加新凭证
        {
          path: 'credentials',
          component: resolve => {
            require(['../view/order/arbitration/credentials.vue'], resolve);
          }
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
          component: resolve => {
            require(['../view/order/seller/index.vue'], resolve);
          }
        },

        // 交易中
        {
          path: 'trading',
          component: resolve => {
            require(['../view/order/seller/trading.vue'], resolve);
          }
        },

        // 已发货, 待买家确认收获
        {
          path: 'receive',
          component: resolve => {
            require(['../view/order/seller/receive.vue'], resolve);
          }
        },

        // 仲裁中
        {
          path: 'arbitrating',
          component: resolve => {
            require(['../view/order/seller/arbitrating.vue'], resolve);
          }
        },

        // 交易成功
        {
          path: 'successful',
          component: resolve => {
            require(['../view/order/seller/successful.vue'], resolve);
          }
        },

        // 交易失败
        {
          path: 'failure',
          component: resolve => {
            require(['../view/order/seller/failure.vue'], resolve);
          }
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
          component: resolve => {
            require(['../view/order/buyer/index.vue'], resolve);
          }
        },

        // 交易证明
        {
          path: 'evidence',
          component: resolve => {
            require(['../view/order/buyer/evidence.vue'], resolve);
          }
        },

        // 提取账号密码
        {
          path: 'extract',
          component: resolve => {
            require(['../view/order/buyer/extract.vue'], resolve);
          }
        },

        // 未支付
        {
          path: 'unpaid',
          component: resolve => {
            require(['../view/order/buyer/unpaid.vue'], resolve);
          }
        },

        // 交易中
        {
          path: 'trading',
          component: resolve => {
            require(['../view/order/buyer/trading.vue'], resolve);
          }
        },

        // 待收货
        {
          path: 'unreceive',
          component: resolve => {
            require(['../view/order/buyer/unreceive.vue'], resolve);
          }
        },

        // 仲裁中
        {
          path: 'arbitrating',
          component: resolve => {
            require(['../view/order/buyer/arbitrating.vue'], resolve);
          }
        },

        // 交易失败
        {
          path: 'failure',
          component: resolve => {
            require(['../view/order/buyer/failure.vue'], resolve);
          }
        },

        // 交易成功
        {
          path: 'successful',
          component: resolve => {
            require(['../view/order/buyer/successful.vue'], resolve);
          }
        }

      ]
    },

    // 发货客服
    {
      path: 'service',
      component: resolve => {
        require(['../view/order/service.vue'], resolve);
      }
    },

    // 交易证明
    {
      path: 'details',
      component: resolve => {
        require(['../view/order/details.vue'], resolve);
      }
    },

    // 查看历史记录
    {
      path: 'history',
      component: resolve => {
        require(['../view/order/history.vue'], resolve);
      }
    }

  ]
}
