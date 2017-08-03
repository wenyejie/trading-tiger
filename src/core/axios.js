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
  baseURL: 'https://server.jiaoyihu.com',
  timeout: 30000
  // withCredentials: true
});