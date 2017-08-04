/**
 * axios
 *
 * author: Storm
 * date: 2017/08/01
 */

import axios from 'axios';
import axiosFinally from 'promise.prototype.finally';
axiosFinally.shim();

axios.defaults.baseURL = 'http://server.jiaoyihu.com';
axios.defaults.withCredentials = true;
axios.defaults.timeout = 5000;

axios.interceptors.request.use(config => {
  if (!config.data) config.data = {};

  return config;
}, error => {
  console.log('request error =>', error.message);
  return Promise.reject(error)
});

axios.interceptors.response.use(response => {

  return response;
}, error => {
  console.log('response error =>', error.message);
  return Promise.reject(error);
});

export default axios;