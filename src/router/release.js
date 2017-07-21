/**
 * 商品发布
 *
 * author: Storm
 * date: 2017/04/17
 */

import index from '../view/release/index.vue';
import reminder from '../view/release/reminder.vue';
import goodsModify from '../view/release/goodsModify.vue';
import accountModify from '../view/release/accountModify.vue';
import goodsClass from '../view/release/goodsClass.vue';
import selectGame from '../view/release/selectGame.vue';
import selectClass from '../view/release/selectClass.vue';
import selectType from '../view/release/selectType.vue';
import selectClient from '../view/release/selectClient.vue';
import selectArea from '../view/release/selectArea.vue';
import selectServer from '../view/release/selectServer.vue';
import goodsInfo from '../view/release/goodsInfo.vue';
import accountInfo from '../view/release/accountInfo.vue';
import success from '../view/release/success.vue';
import selectAccount from '../view/release/selectAccount.vue';

export default {
  path: '/release',
  component: {
    template: '<router-view></router-view>',
    name: 'Release'
  },
  children: [

    // 全部商品
    {
      path: '',
      name: 'indexRelease',
      component: index
    },

    // 防骗提醒
    {
      path: 'reminder',
      name: 'releaseReminder',
      component: reminder
    },

    // 修改商品信息
    {
      path: 'goodsModify',
      name: 'goodsModifyRelease',
      component: goodsModify
    },

    // 修改寄售账号信息
    {
      path: 'accountModify',
      name: 'accountModifyRelease',
      component: accountModify
    },

    // 商品分类详情
    {
      path: 'goodsClass',
      name: 'goodsClassRelease',
      component: goodsClass
    },

    // 选择商品分类
    {
      path: 'selectGame',
      name: 'selectGameRelease',
      component: selectGame
    },
    {
      path: 'selectClass',
      name: 'selectClassRelease',
      component: selectClass
    },

    // 选择商品类型
    {
      path: 'selectType',
      name: 'selectTypeRelease',
      component: selectType
    },

    // 选择客户端
    {
      path: 'selectClient',
      name: 'selectClientRelease',
      component: selectClient
    },

    // 选择服务区
    {
      path: 'selectArea',
      name: 'selectAreaRelease',
      component: selectArea
    },

    // 选择服务器
    {
      path: 'selectServer',
      name: 'selectServerRelease',
      component: selectServer
    },

    // 填写商品描述
    {
      path: 'goodsInfo',
      name: 'goodsInfoRelease',
      component: goodsInfo
    },

    // 填写寄售账号信息
    {
      path: 'accountInfo',
      name: 'accountInfoRelease',
      component: accountInfo
    },

    // 发布成功
    {
      path: 'success',
      name: 'successRelease',
      component: success
    },

    // 选择账号类型
    {
      path: 'selectAccount',
      name: 'selectAccountRelease',
      component: selectAccount
    }


  ]
}
