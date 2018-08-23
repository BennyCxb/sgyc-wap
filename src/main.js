// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import vuexI18n from 'vuex-i18n'
import FastClick from 'fastclick'
import router from './router'
import VueRouter from 'vue-router'
import App from './App'
import api from './api'

import { AjaxPlugin, LoadingPlugin, ToastPlugin, XHeader } from 'vux'
import './assets/iconfont/iconfont.css'
// import _ from 'vue-lodash'
import _ from 'lodash'
// import ECharts from 'vue-echarts/components/ECharts'
// import ECharts modules manually to reduce bundle size
// import 'echarts/lib/chart/bar'
// import 'echarts/lib/component/tooltip'

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(AjaxPlugin)
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)
Vue.component('x-header', XHeader)
// Vue.component('chart', ECharts)
Vue.prototype._ = _
require('es6-promise').polyfill()

/** i18n **/
let store = new Vuex.Store({
  modules: {
    i18n: vuexI18n.store
  }
})

Vue.use(vuexI18n.plugin, store)

FastClick.attach(document.body)

Vue.config.productionTip = false

Vue.prototype.$api = api

/* eslint-disable no-new */
let myThis = new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')

export default myThis
