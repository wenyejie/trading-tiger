/**
 * LocalStorage
 * typeof: string, number, object, function, boolean, undefined, symbol
 *
 * author: Storm
 * date: 2017/04/21
 */

const msg = '你正处于无痕模式下, 为了获得更好的体验, 请切换到正常模式, 否则该功能将无法使用!';

const local = {

  /**
   * 获取本地存储的值
   * @param key
   */
  get (key) {
    try {
      return (JSON.parse(localStorage.getItem(key)) || {value: null}).value;
    } catch (e) {
      alert(msg);
    }

  },

  /**
   * 设置本地存储
   * @param key 键
   * @param value 值
   */
  set (key, value) {
    try {
      localStorage.setItem(key, JSON.stringify({type: typeof value, value}));
    } catch (e) {
      alert(msg);
    }
  },

  /**
   * 移除本地存储
   * @param key
   */
  remove (key) {
    try {
      for (let i = 0; i < arguments.length; i++) {
        if (typeof arguments[i] === 'string') localStorage.removeItem(arguments[i]);
        if (Array.isArray(arguments[i])) arguments[i].forEach(value => localStorage.removeItem(value));
      }
    } catch (e) {
      alert(msg);
    }
  },

  /**
   * 移除所有storage
   */
  clear () {
    localStorage.clear();
  },

  length () {
    return localStorage.length;
  }
};

if (typeof window !== 'undefined') {
  window.local = local;
}

export default local;
