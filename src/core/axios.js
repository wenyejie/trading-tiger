/**
 * axios
 *
 * author: Storm
 * date: 2017/08/01
 */

import axios from 'axios';
import axiosFinally from 'promise.prototype.finally';
axiosFinally.shim();

export default axios.create({
  baseURL: 'http://wfadmin.dm.com:8081',
  timeout: 30000
  // withCredentials: true
});