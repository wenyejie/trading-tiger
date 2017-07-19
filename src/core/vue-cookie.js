/**
 * vue-cookie
 *
 * author: Storm
 * date: 2017/06/02
 */

import cookie from './cookie';

export default {

  /**
   * vue install
   * @param Vue Vue Object
   */
  install (Vue) {
    Vue.prototype.$cookie = this;
    Vue.cookie = this;
  },

  /**
   * set cookie
   * @param name cookie name
   * @param value cookie value
   * @param opts cookie options {expires, path, domain, secure}
   */
  set (name, value, opts) {
    return cookie.setItem(name, value, opts.expires, opts.path, opts.domain, opts.secure);
  },

  /**
   * cookie get
   * @param name cookie name
   */
  get (name) {
    return cookie.getItem(name);
  },

  /**
   * remove cookie
   * @param name cookie name
   * @param path cookie path
   * @param domain cookie domain
   * @return {*}
   */
  remove (name, path, domain) {
    return cookie.removeItem(name, path, domain);
  },

  /**
   * cookie has [name] value
   * @param name cookie name
   * @return {*}
   */
  has (name) {
    return cookie.hasItem(name);
  },

  /**
   * get all cookie
   * @return {*}
   */
  keys () {
    return cookie.keys();
  }

}
