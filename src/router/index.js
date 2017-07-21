import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

import index from '../view/index.vue';
import guide from './guide';

export function createRouter () {
  return new Router({
    mode: 'history',
    scrollBehavior: () => ({y: 0}),
    routes: [
      {
        path: '/',
        component: index
      },

      guide
    ]
  })
}
