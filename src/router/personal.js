/**
 * 商品信息
 *
 * author: Storm
 * date: 2017/04/22
 */

import index from '../view/personal/index.vue';
import messageList from '../view/personal/messageList.vue';
import messageDetail from '../view/personal/messageDetail.vue';
import balances from '../view/personal/balances.vue';
import balanceSell from '../view/personal/balanceSell.vue';
import balancePayment from '../view/personal/balancePayment.vue';
import balanceWithdraw from '../view/personal/balanceWithdraw.vue';
import withdrawList from '../view/personal/withdrawList.vue';
import withdrawStep from '../view/personal/withdrawStep.vue';
import withdraw from '../view/personal/withdraw.vue';
import withdrawSet from '../view/personal/withdrawSet.vue';
import withdrawSetSuccess from '../view/personal/withdrawSetSuccess.vue';
import withdrawModify from '../view/personal/withdrawModify.vue';
import withdrawNew from '../view/personal/withdrawNew.vue';

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
      component: index
    },

    // 消息列表
    {
      path: 'messageList',
      component: messageList
    },

    // 消息详情
    {
      path: 'messageDetail',
      component: messageDetail
    },

    // 余额列表
    {
      path: 'balances',
      component: balances
    },

    // 出售成功
    {
      path: 'balanceSell',
      component: balanceSell
    },

    // 余额支付
    {
      path: 'balancePayment',
      component: balancePayment
    },

    // 余额提现
    {
      path: 'balanceWithdraw',
      component: balanceWithdraw
    },

    // 提现明细
    {
      path: 'withdrawList',
      component: withdrawList
    },

    // 提现详情
    {
      path: 'withdrawStep',
      component: withdrawStep
    },

    // 提现
    {
      path: 'withdraw',
      component: withdraw
    },

    // 设置提现账户
    {
      path: 'withdrawSet',
      component: withdrawSet
    },

    // 设置提现账户成功
    {
      path: 'withdrawSetSuccess',
      component: withdrawSetSuccess
    },

    // 修改提现账户
    {
      path: 'withdrawModify',
      component: withdrawModify
    },

    // 设置新的提现账户
    {
      path: 'withdrawNew',
      component: withdrawNew
    }

  ]
}
