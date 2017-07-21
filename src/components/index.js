/**
 * author: Storm
 * date: 2017/03/28
 */


import app from '../components/app';
import header from '../components/header';
import main from '../components/main';
import search from '../components/search';
import row from '../components/row';
import col from '../components/col';
import footer from '../components/footer';
import grid from '../components/grid';
import {gameGrid, gameGridItem} from '../components/gameGrid';
import tabs from '../components/tabs';
import tabsPanel from '../components/tabsPanel';
import button from '../components/button';

const sview = {
  sApp: app,
  sHeader: header,
  sMain: main,
  sSearch: search,
  sRow: row,
  sCol: col,
  sFooter: footer,
  sGrid: grid,
  sGameGrid: gameGrid,
  sGameGridItem: gameGridItem,
  sTabs: tabs,
  sTabsPanel: tabsPanel,
  sButton: button
};

const install = Vue => {
  Object.keys(sview).forEach(key => Vue.component(key, sview[key]));

  /*Vue.prototype.$Dialog = Dialog;
  Vue.prototype.$Message = Message;*/
};

if (typeof window !== 'undefined' && window.Vue) install(window.Vue);

export default Object.assign(sview, {install});
