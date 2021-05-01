// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
// eslint-disable-next-line import/first
import VueParticles from 'vue-particles';
// eslint-disable-next-line import/first
import ElementUI from 'element-ui';
// eslint-disable-next-line import/first
import 'element-ui/lib/theme-chalk/index.css';
// eslint-disable-next-line import/first
import dataV from '@jiaminghi/data-view';
// eslint-disable-next-line import/first,import/no-unresolved
// eslint-disable-next-line import/first
import axios from 'axios';

Vue.prototype.axios = axios;
Vue.use(dataV);
Vue.use(ElementUI);
Vue.use(VueParticles);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
