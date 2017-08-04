import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex);

export function createStore () {
  return new Vuex.Store({
    state: {

      // 公告列表
      announces: [],

      // 商品列表
      goods: {
        list: []
      },

      // 商品详情
      goodsDetail: {}
    },
    actions,
    mutations,
    getters
  })
}
