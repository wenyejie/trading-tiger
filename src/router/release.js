/**
 * 商品发布
 *
 * author: Storm
 * date: 2017/04/17
 */

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
      component: resolve => {
        require(['../view/release/index.vue'], resolve);
      }
    },

    // 防骗提醒
    {
      path: 'reminder',
      name: 'releaseReminder',
      component: resolve => {
        require(['../view/release/reminder.vue'], resolve);
      }
    },

    // 修改商品信息
    {
      path: 'goodsModify',
      name: 'goodsModifyRelease',
      component: resolve => {
        require(['../view/release/goodsModify.vue'], resolve);
      }
    },

    // 修改寄售账号信息
    {
      path: 'accountModify',
      name: 'accountModifyRelease',
      component: resolve => {
        require(['../view/release/accountModify.vue'], resolve);
      }
    },

    // 商品分类详情
    {
      path: 'goodsClass',
      name: 'goodsClassRelease',
      component: resolve => {
        require(['../view/release/goodsClass.vue'], resolve);
      }
    },

    // 选择商品分类
    {
      path: 'selectGame',
      name: 'selectGameRelease',
      component: resolve => {
        require(['../view/release/selectGame.vue'], resolve);
      }
    },
    {
      path: 'selectClass',
      name: 'selectClassRelease',
      component: resolve => {
        require(['../view/release/selectClass.vue'], resolve);
      }
    },

    // 选择商品类型
    {
      path: 'selectType',
      name: 'selectTypeRelease',
      component: resolve => {
        require(['../view/release/selectType.vue'], resolve);
      }
    },

    // 选择客户端
    {
      path: 'selectClient',
      name: 'selectClientRelease',
      component: resolve => {
        require(['../view/release/selectClient.vue'], resolve);
      }
    },

    // 选择服务区
    {
      path: 'selectArea',
      name: 'selectAreaRelease',
      component: resolve => {
        require(['../view/release/selectArea.vue'], resolve);
      }
    },

    // 选择服务器
    {
      path: 'selectServer',
      name: 'selectServerRelease',
      component: resolve => {
        require(['../view/release/selectServer.vue'], resolve);
      }
    },

    // 填写商品描述
    {
      path: 'goodsInfo',
      name: 'goodsInfoRelease',
      component: resolve => {
        require(['../view/release/goodsInfo.vue'], resolve);
      }
    },

    // 填写寄售账号信息
    {
      path: 'accountInfo',
      name: 'accountInfoRelease',
      component: resolve => {
        require(['../view/release/accountInfo.vue'], resolve);
      }
    },

    // 发布成功
    {
      path: 'success',
      name: 'successRelease',
      component: resolve => {
        require(['../view/release/success.vue'], resolve);
      }
    },

    // 选择账号类型
    {
      path: 'selectAccount',
      name: 'selectAccountRelease',
      component: resolve => {
        require(['../view/release/selectAccount.vue'], resolve);
      }
    }


  ]
}
