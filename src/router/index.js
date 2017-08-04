import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import guide from './guide';
import personal from './personal';
import user from './user';
import goods from './goods';
import order from './order.js';

export function createRouter () {
  return new Router({
    mode: 'history',
    scrollBehavior: () => ({y: 0}),
    routes: [

      // index
      {
        path: '/',
        name: 'index',
        component: resolve => require(['../view/index.vue'], resolve)
      },

      // 搜索
      {
        path: '/search',
        name: 'search',
        component: resolve => {
          require(['../view/search.vue'], resolve);
        }
      },

      // 画廊
      {
        path: '/gallery',
        name: 'gallery',
        component: resolve => require(['../view/gallery.vue'], resolve)
      },

      guide,

      personal,

      user,

      goods,

      order,

      {
        path: '/500',
        component: resolve => require(['../view/500.vue'], resolve)
      },

      {
        path: '*',
        name: 'Page404',
        component: resolve => {
          require(['@/view/404.vue'], resolve);
        }
      }
    ]
  })
}
