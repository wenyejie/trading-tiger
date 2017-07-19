/**
 * tap 事件
 *
 * author: Storm
 * date: 2017/06/26
 */

export default {
  name: 'tap',
  bind: (el, binding, vnode) => {
    console.log(el, binding, vnode);
    /*let startTx, startTy, endTx, endTy;
    el.addEventListener("touchstart", function (e) {
      let touch = e.touches[0];
      startTx = touch.clientX;
      startTy = touch.clientY;
      el.addEventListener("touchend", function (e) {
        let touch = e.changedTouches[0];
        endTx = touch.clientX;
        endTy = touch.clientY;
        if (Math.abs(startTx - endTx) < 6 && Math.abs(startTy - endTy) < 6) {
          let method = binding.value.method;
          let params = binding.value.params;
          method(params);
        }
      }, false);
    }, false);*/
  }
}
