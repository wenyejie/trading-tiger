/**
 * author: Storm
 * date: 2017/03/29
 */

import Vue from 'vue';
import Dialog from './dialog.vue';
import props2string from '../../untils/props2string';

let vmInstance;

/**
 * 实例化一个Dialog对象，new一个Vue来存放对象
 * @param opts
 * @returns {*}
 */
const newInstance = opts => {
  let props = props2string(opts);

  const $warp = document.createElement('div');
  $warp.classList.add('s-dialog-wrap');
  $warp.innerHTML = `<s-dialog${props} v-model="visible" @ok="ok" @cancel="cancel"></s-dialog>`;
  document.body.appendChild($warp);

  const vm = new Vue({
    el: $warp,
    data () {
      return Object.assign({}, opts, {
        visible: false
      })
    },
    methods: {
      ok (value) {
        this.onOk(value);
        this.remove();
      },
      cancel () {
        this.onCancel && this.onCancel();
        this.remove();
      },
      remove () {
        setTimeout(this.destroy, 300);
      },
      destroy () {
        this.$destroy();
        document.body.removeChild(this.$el);
        this.onRemove();
      },
      onRemove () {
        vmInstance = null;
      },
      onOk () {
      },
      onCancel () {
      }
    }
  }).$children[0];

  return {
    show (opts) {
      Object.keys(opts).forEach(key => {
        vm.$parent[key] = opts[key];
      });
      vm.visible = true;
    },
    remove () {
      vm.visible = false;
      vm.remove();
    }
  }
};

/**
 * 获取dialog实例
 * @param opts 选项
 * @returns {*|{show, remove}} 返回dialog实例
 */
const getInstance = (opts) => {
  vmInstance = vmInstance || newInstance(opts);
  return vmInstance;
};

/**
 * 初始化dialog实例
 * @param text 提示文本
 * @param opts 实例化选项
 * @returns {Promise} 返回一个Promise
 */
Dialog.init = (text = '', opts = {}) => {
  return new Promise((resolve, reject) => {
    if (typeof text === 'string') {
      opts.body = text;
    } else if (typeof text === 'object') {
      opts = text;
    }
    const vm = getInstance(opts);
    opts.onOk = resolve;
    opts.onCancel = reject;
    vm.show(opts);
  });
};

/**
 * 确定弹出框
 * @param text 弹出框文本
 * @param opts 弹出框选项
 * @returns {Promise} 返回一个Promise对象
 */
Dialog.confirm = (text = '', opts = {}) => {
  opts.name = 'confirm';
  return Dialog.init(text, opts);
};

/**
 * 警告弹出框
 * @param text 弹出框文本
 * @param opts 弹出框选项
 * @returns {Promise} 返回一个Promise对象
 */
Dialog.alert = (text = '', opts = {}) => {
  opts.showCancel = false;
  opts.name = 'alert';
  return Dialog.init(text, opts);
};

Dialog.prompt = (title = '', opts = {}) => {
  opts.title = title;
  opts.mini = true;
  opts.name = 'prompt';
  return Dialog.init(opts);
};

/**
 * 移除弹出框
 */
Dialog.remove = () => {

  // 判断是否存在实例对象
  if (!vmInstance) {
    return false;
  }

  // 获取当前实例，执行remove方法
  const vmInstance = getInstance();
  vmInstance.remove();
};

export default Dialog;
