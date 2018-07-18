// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router'
import VueRouter from 'vue-router'
import App from './App'
import api from './api'
import { AjaxPlugin, LoadingPlugin, ToastPlugin } from 'vux'

Vue.use(VueRouter)
Vue.use(AjaxPlugin)
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)

FastClick.attach(document.body)

Vue.config.productionTip = false

Vue.prototype.$api = api

/* eslint-disable no-new */
let myThis = new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')

export default myThis
