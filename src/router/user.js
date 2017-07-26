/**
 * user
 * 登录注册相关模块
 *
 * author: Storm
 * date: 2017/04/27
 */


export default {
  path: '/user',
  component: resolve => require(['../view/user/index.vue'], resolve),
  children: [

    // 登录
    {
      path: 'login',
      component: resolve => require(['../view/user/login.vue'], resolve)
    },

    // 注册
    {
      path: 'register',
      component: resolve => require(['../view/user/register.vue'], resolve)
    },

    // 找回密码
    {
      path: 'findPwd',
      component: resolve => require(['../view/user/findPwd.vue'], resolve)
    }


  ]
}
