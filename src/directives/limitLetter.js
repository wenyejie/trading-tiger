/**
 * 输入框限制只能输入字母
 *
 * author: Storm
 * date: 2017/05/04
 */

export default {
  name: 'limitLetter',
  bind (el, binding, vnode) {
    console.log(vnode.data.domProps);
    el.addEventListener('input', () => {
      el.value = el.value.replace(/[^a-zA-Z]/gi, '');
      vnode.data.domProps.value = el.value;
    });
  },
  componentUpdated (el, binding, vnode) {
    binding.value = el.value;
    el.value = el.value.replace(/[^a-zA-Z]/gi, '');
  }
}
