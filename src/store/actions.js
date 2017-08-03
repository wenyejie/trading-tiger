import axios from '../core/axios';

export default {

  /**
   * 获取公告列表
   * @param commit
   */
  getAnnounces ({commit}) {
    return axios.post('/h5/announceManage/listAnnounce')
      .then(response => {
        if (response.data.code !== '000') return false;

        const list = [];
        response.data.data.forEach(item => item.url && item.title && list.push(item));
        commit('SET_ANNOUNCES', {list});
      })
  },

  /**
   * 获取商品列表
   * @param commit
   * @param filters 商品列表筛选参数
   */
  getGoodsList ({commit}, filters) {

    filters = Object.assign({}, filters, {
      currentPage: 0,
      pageSize: 20
    });
    return axios.post('/h5/goods/gameGoodsFilter', filters)
      .then(response => {
        if (response.data.code !== '000') return false;

        const data = response.data.data;

        commit('SET_GOODS_LIST', {list: data.list});
      })
  },

  /**
   * 获取商品详情
   * @param commit
   * @param id 商品ID
   */
  getGoodsDetail ({commit}, id) {
    return axios.post('/h5/goods/showGoodsInfo', {
      goodsId: id
    })
      .then(response => {
        if (response.data.code !== '000') return false;
        commit('SET_GOODS_DETAIL', {info: response.data.data})
      })
  }
}
