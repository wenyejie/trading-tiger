/**
 * game grid
 *
 * author: Storm
 * date: 2017/04/25
 */

// import gameGrid from './gameGrid.vue';

// import gameGridItem from './gameGridItem.vue';

export default {
  gameGrid: resolve => require(['./gameGrid.vue'], resolve),
  gameGridItem: resolve => require(['./gameGridItem.vue'], resolve)
};
