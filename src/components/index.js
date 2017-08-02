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
import gameGrid from '../components/gameGrid';
import tabs from '../components/tabs';
import tabsPanel from '../components/tabsPanel';
import button from '../components/button';
import input from '../components/input';
import countdown from '../components/countdown';
import slideCode from '../components/slideCode';
import steps from '../components/steps';
import step from '../components/step';
import formMake from '../components/formMake';
import formControl from '../components/formControl';
import spinner from '../components/spinner';
import orderList from '../components/orderList';
import formSelect from '../components/formSelect';
import upload from '../components/upload';
import popup from '../components/popup';
import cell from '../components/cell';
import cellIntro from '../components/cellIntro';
import infinite from '../components/infinite';
import dialog from '../components/dialog';
import message from '../components/message';
import icon from '../components/icon';
import nothing from '../components/nothing';
import panel from '../components/panel';
import link from '../components/link';
import attr from '../components/attr';
import qiniuImg from '../components/qiniuImg';
import game from '../components/game';
import suspension from '../components/suspension';
import label from '../components/label';

const sview = {
  sApp: app,
  sHeader: header,
  sMain: main,
  sSearch: search,
  sRow: row,
  sCol: col,
  sFooter: footer,
  sGrid: grid,
  sGameGrid: gameGrid.gameGrid,
  sGameGridItem: gameGrid.gameGridItem,
  sTabs: tabs,
  sTabsPanel: tabsPanel,
  sButton: button,
  sInput: input,
  sCountdown: countdown,
  sSlideCode: slideCode,
  sSteps: steps,
  sStep: step,
  sFormMake: formMake,
  sFormControl: formControl,
  sSpinner: spinner,
  sOrderList: orderList,
  sFormSelect: formSelect,
  sUpload: upload,
  sPopup: popup,
  sCell: cell,
  sCellIntro: cellIntro,
  sInfinite: infinite,
  sIcon: icon,
  sNothing: nothing,
  sPanel: panel,
  sLink: link,
  sDialog: dialog,
  sMessage: message,
  sAttr: attr,
  sGame: game,
  qiniuImg,
  sSuspension: suspension,
  sLabel: label
};

const install = Vue => {
  Object.keys(sview).forEach(key => Vue.component(key, sview[key]));

  Vue.prototype.$Dialog = dialog;
  Vue.prototype.$Message = message;
};

if (typeof window !== 'undefined' && window.Vue) install(window.Vue);

export default Object.assign(sview, {install});
