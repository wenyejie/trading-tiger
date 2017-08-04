
export default {

  /**
   * 保存公告列表
   * @param state
   * @param list
   * @constructor
   */
  SET_ANNOUNCES: (state, {list}) => {
    state.announces = list;
  },

  /**
   * 保存商品列表
   * @param state
   * @param list
   * @constructor
   */
  SET_GOODS: (state, {goods}) => {
    state.goods = goods;
  },

  /**
   * 保存商品详情
   * @param state
   * @param info
   * @constructor
   */
  SET_GOODS_DETAIL: (state, {info}) => {
    state.goodsDetail = info;
  }
}
