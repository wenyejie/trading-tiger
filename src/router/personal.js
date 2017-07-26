/**
 * 商品信息
 *
 * author: Storm
 * date: 2017/04/22
 */

export default {
  path: '/personal',
  component: {
    template: '<router-view></router-view>',
    name: 'personal'
  },
  children: [

    // 个人中心
    {
      path: '',
      component: resolve => {
        require(['../view/personal/index.vue'], resolve);
      }
    },

    // 消息列表
    {
      path: 'messageList',
      component: resolve => {
        require(['../view/personal/messageList.vue'], resolve);
      }
    },

    // 消息详情
    {
      path: 'messageDetail',
      component: resolve => {
        require(['../view/personal/messageDetail.vue'], resolve);
      }
    },

    // 余额列表
    {
      path: 'balances',
      component: resolve => {
        require(['../view/personal/balances.vue'], resolve);
      }
    },

    // 出售成功
    {
      path: 'balanceSell',
      component: resolve => {
        require(['../view/personal/balanceSell.vue'], resolve);
      }
    },

    // 余额支付
    {
      path: 'balancePayment',
      component: resolve => {
        require(['../view/personal/balancePayment.vue'], resolve);
      }
    },

    // 余额提现
    {
      path: 'balanceWithdraw',
      component: resolve => {
        require(['../view/personal/balanceWithdraw.vue'], resolve);
      }
    },

    // 提现明细
    {
      path: 'withdrawList',
      component: resolve => {
        require(['../view/personal/withdrawList.vue'], resolve);
      }
    },

    // 提现详情
    {
      path: 'withdrawStep',
      component: resolve => {
        require(['../view/personal/withdrawStep.vue'], resolve);
      }
    },

    // 提现
    {
      path: 'withdraw',
      component: resolve => {
        require(['../view/personal/withdraw.vue'], resolve);
      }
    },

    // 设置提现账户
    {
      path: 'withdrawSet',
      component: resolve => {
        require(['../view/personal/withdrawSet.vue'], resolve);
      }
    },

    // 设置提现账户成功
    {
      path: 'withdrawSetSuccess',
      component: resolve => {
        require(['../view/personal/withdrawSetSuccess.vue'], resolve);
      }
    },

    // 修改提现账户
    {
      path: 'withdrawModify',
      component: resolve => {
        require(['../view/personal/withdrawModify.vue'], resolve);
      }
    },

    // 设置新的提现账户
    {
      path: 'withdrawNew',
      component: resolve => {
        require(['../view/personal/withdrawNew.vue'], resolve);
      }
    }

  ]
}
