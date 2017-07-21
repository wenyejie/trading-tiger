import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import index from '../view/index.vue';
import search from '../view/search.vue';
import gallery from '../view/gallery.vue';
import guide from './guide';
import personal from './personal';
import user from './user';
import goods from './goods';

export function createRouter () {
  return new Router({
    mode: 'history',
    scrollBehavior: () => ({y: 0}),
    routes: [

      // index
      {
        path: '/',
        name: 'index',
        component: index
      },

      // 搜索
      {
        path: '/search',
        name: 'search',
        component: search
      },

      // 画廊
      {
        path: '/gallery',
        name: 'gallery',
        component: gallery
      },

      guide,

      personal,

      user,

      goods
    ]
  })
}
