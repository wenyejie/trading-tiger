import './untils/babel';
import './untils/local';
import './untils/session';
import Vue from 'vue';
import cookie from './core/vue-cookie';

Vue.prototype.$cookie = cookie;

import CONFIG from '../publish/config';

// components
import components from './components';

Vue.use(components);

// axios
import axios from 'axios';

Vue.prototype.$http = axios.create({
  baseURL: '//' + CONFIG.BASE_PATH,
  timeout: 10000,
  withCredentials: true
});

if (process.env.VUE_ENV === 'client') {
  require('./untils/local');
  require('./untils/session');
  const VueAwesomeSwiper = require('vue-awesome-swiper/ssr');
  Vue.use(VueAwesomeSwiper);
}

import App from './App.vue';
import {createStore} from './store';
import {createRouter} from './router';
import {sync} from 'vuex-router-sync';
import titleMixin from './util/title';
import * as filters from './util/filters';

// mixin for handling title
Vue.mixin(titleMixin);

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});

// Expose a factory function that creates a fresh set of store, router,
// app instances on each call (which is called for each SSR request)
export function createApp () {
  // create store and router instances
  const store = createStore();
  const router = createRouter();

  // sync the router with the vuex store.
  // this registers `store.state.route`
  sync(store, router);

  // create the app instance.
  // here we inject the router, store and ssr context to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  });

  // expose the app, the router and the store.
  // note we are not mounting the app here, since bootstrapping will be
  // different depending on whether we are in a browser or on the server.
  return {app, router, store}
}
