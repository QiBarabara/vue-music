// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'

import VueLazyLoad from 'vue-lazyload'
import fastclick from 'fastclick'
import router from './router'
import 'common/stylus/index.styl'

import store from './store';

fastclick.attach(document.body);//点击不会有300ms的延迟

Vue.use(VueLazyLoad,{
	loading:require('common/image/default.png')
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  store
})
