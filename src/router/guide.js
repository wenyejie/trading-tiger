/**
 * 交易指南, 包括其它帮助页面
 *
 * author: Storm
 * date: 2017/06/07
 */


export default {
  path: '/guide',
  component: {
    template: '<router-view></router-view>',
    name: 'guide'
  },
  children: [

    // 交易指南
    {
      path: '/guide/',
      component: resolve => require(['../view/guide/index.vue'], resolve)
    },

    // 购买流程
    {
      path: 'buy',
      component: resolve => {
        require(['../view/guide/buy.vue'], resolve);
      }
    },

    // 出售流程
    {
      path: 'sell',
      component: resolve => {
        require(['../view/guide/sell.vue'], resolve);
      }
    },

    // 防骗说明
    {
      path: 'instruction',
      component: resolve => {
        require(['../view/guide/instruction.vue'], resolve);
      }
    },

    // 收费规则
    {
      path: 'rule',
      component: resolve => {
        require(['../view/guide/rule.vue'], resolve);
      }
    },

    // 常见问题
    {
      path: 'question',
      component: resolve => {
        require(['../view/guide/question.vue'], resolve);
      }
    },

    // 免责声明
    {
      path: 'disclaimer',
      component: resolve => require(['../view/guide/disclaimer.vue'], resolve)
    },

    // 隐私保护
    {
      path: 'privacyProtection',
      component: resolve => require(['../view/guide/privacyProtection.vue'], resolve)
    },

    // 交易虎用户协议
    {
      path: 'userAgreement',
      component: resolve => require(['../view/guide/userAgreement.vue'], resolve)
    },

    // 商品购买服务协议
    {
      path: 'purchaseService',
      component: resolve => require(['../view/guide/purchaseService.vue'], resolve)
    },

    // 关于我们
    {
      path: 'aboutUs',
      component: resolve => require(['../view/guide/aboutUs.vue'], resolve)
    },

    // 联系方式
    {
      path: 'contactInformation',
      component: resolve => require(['../view/guide/contactInformation.vue'], resolve)
    },

    // 公告详情
    {
      path: 'announce',
      component: resolve => require(['../view/guide/announce.vue'], resolve)
    }
  ]
};
