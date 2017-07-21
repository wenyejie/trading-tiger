/**
 * author: Storm
 * date: 2017/03/28
 */

/*import Radio from './radio';
import RadioGroup from './radioGroup';
import Checkbox from './checkbox';
import Icon from './icon';
import Button from './button';
import Dialog from './dialog';
import Row from './row';
import Col from './col';
import Message from './message';

import Cell from './cell';
import CellIntro from './cellIntro';
import Link from './link';
import Main from './main';
import Panel from './panel';*/
/*import Nothing from './nothing';
import Infinite from './infinite';
import footer from './footer';
import qiniuImg from './qiniuImg';
import popup from './popup';
import suspension from './suspension';
import label from './label';
import attr from './attr';
import grid from './grid';
// import share from './share';*/
import App from './app';
import Header from './header';

const sview = {
  sApp: App,
  sHeader: Header,
  /*sRadio: Radio,
  sRadioGroup: RadioGroup,
  sCheckbox: Checkbox,
  sIcon: Icon,
  sButton: Button,
  sDialog: Dialog,
  sRow: Row,
  sCol: Col,
  sMessage: Message,

  sCell: Cell,
  sCellIntro: CellIntro,
  sLink: Link,
  sMain: Main,
  sPanel: Panel,*/
  /*sNothing: Nothing,
  sInfinite: Infinite,
  sFooter: footer,
  qiniuImg,
  sPopup: popup,
  sSuspension: suspension,
  sLabel: label,
  sAttr: attr,
  sGrid: grid,*/
  // sShare: share
};

const install = Vue => {
  Object.keys(sview).forEach(key => Vue.component(key, sview[key]));

  /*Vue.prototype.$Dialog = Dialog;
  Vue.prototype.$Message = Message;*/
};

if (typeof window !== 'undefined' && window.Vue) install(window.Vue);

export default Object.assign(sview, {install});
