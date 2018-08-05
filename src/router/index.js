import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import Home from './components/HelloFromVux'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: resolve => require(['../components/Login.vue'], resolve)
    },
    {
      path: '/home',
      component: resolve => require(['../components/Home.vue'], resolve)
    },
    {
      path: '/ptable:fid-:sid-:tid-:btid',
      component: resolve => require(['../components/ProblemTable.vue'], resolve)
    },
    {
      path: '/ptable:fid-:sid-:btid',
      component: resolve => require(['../components/ProblemTable.vue'], resolve)
    },
    {
      path: '/ptable:fid-:btid',
      component: resolve => require(['../components/ProblemTable.vue'], resolve)
    },
    {
      path: '/ptable:bid',
      component: resolve => require(['../components/ProblemTable.vue'], resolve)
    }
  ]
})
