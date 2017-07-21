/**
 * user
 * 登录注册相关模块
 *
 * author: Storm
 * date: 2017/04/27
 */

import index from '../view/user/index.vue';
import login from '../view/user/login.vue';
import register from '../view/user/register.vue';
import findPwd from '../view/user/findPwd.vue';

export default {
  path: '/user',
  component: index,
  children: [

    // 登录
    {
      path: 'login',
      component: login
    },

    // 注册
    {
      path: 'register',
      component: register
    },

    // 找回密码
    {
      path: 'findPwd',
      component: findPwd
    }


  ]
}
