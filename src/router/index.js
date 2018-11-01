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
      meta: {
        keepAlive: false
      },
      component: resolve => require(['../components/Home.vue'], resolve)
    },
    // 四边三化
    {
      path: '/ptable:fid-:sid-:tid-:btid',
      meta: {
        keepAlive: true
      },
      component: resolve => require(['../components/sbsh/ProblemTable.vue'], resolve)
    },
    {
      path: '/ptable:fid-:sid-:btid',
      meta: {
        keepAlive: true
      },
      component: resolve => require(['../components/sbsh/ProblemTable.vue'], resolve)
    },
    {
      path: '/ptable:fid-:btid',
      meta: {
        keepAlive: true
      },
      component: resolve => require(['../components/sbsh/ProblemTable.vue'], resolve)
    },
    {
      path: '/ptable:bid',
      meta: {
        keepAlive: true
      },
      component: resolve => require(['../components/sbsh/ProblemTable.vue'], resolve)
    },
    {
      path: '/ProblemInfo-:fid',
      meta: {
        keepAlive: false
      },
      component: resolve => require(['../components/sbsh/ProblemInfo.vue'], resolve)
    },
    {
      path: '/dtable:fid-:sid-:tid-:btid',
      meta: {
        keepAlive: true
      },
      component: resolve => require(['../components/sbsh/ProjectTable.vue'], resolve)
    },
    {
      path: '/dtable:fid-:sid-:btid',
      meta: {
        keepAlive: true
      },
      component: resolve => require(['../components/sbsh/ProjectTable.vue'], resolve)
    },
    {
      path: '/dtable:fid-:btid',
      meta: {
        keepAlive: true
      },
      component: resolve => require(['../components/sbsh/ProjectTable.vue'], resolve)
    },
    {
      path: '/dtable',
      meta: {
        keepAlive: true
      },
      component: resolve => require(['../components/sbsh/ProjectTable.vue'], resolve)
    },
    {
      path: '/ProjectInfo-:fid',
      meta: {
        keepAlive: false
      },
      component: resolve => require(['../components/sbsh/ProjectInfo.vue'], resolve)
    },
    {
      path: '/StatisicsProblem:fid-:sid-:tid-:btid',
      component: resolve => require(['../components/sbsh/StatisticsProblem2.vue'], resolve)
    },
    {
      path: '/StatisicsProblem:fid-:sid-:btid',
      component: resolve => require(['../components/sbsh/StatisticsProblem2.vue'], resolve)
    },
    {
      path: '/StatisicsProblem:fid-:btid',
      component: resolve => require(['../components/sbsh/StatisticsProblem2.vue'], resolve)
    },
    {
      path: '/StatisicsProblem',
      component: resolve => require(['../components/sbsh/StatisticsProblem2.vue'], resolve)
    },
    // 老旧工业区块改造
    {
      path: '/otable:fid-:sid-:tid-:btid',
      meta: {
        keepAlive: true
      },
      component: resolve => require(['../components/ljcq/ProjectTable.vue'], resolve)
    },
    {
      path: '/otable:fid-:sid-:btid',
      meta: {
        keepAlive: true
      },
      component: resolve => require(['../components/ljcq/ProjectTable.vue'], resolve)
    },
    {
      path: '/otable:fid-:btid',
      meta: {
        keepAlive: true
      },
      component: resolve => require(['../components/ljcq/ProjectTable.vue'], resolve)
    },
    {
      path: '/otable',
      meta: {
        keepAlive: true
      },
      component: resolve => require(['../components/ljcq/ProjectTable.vue'], resolve)
    },
    {
      path: '/OldInfo-:fid',
      meta: {
        keepAlive: false
      },
      component: resolve => require(['../components/ljcq/ProjectInfo.vue'], resolve)
    },
    // {
    //   path: '/null:fid-:btid',
    //   component: resolve => require(['../components/page/notfound.vue'], resolve)
    // },
    // 统计-计划
    {
      path: '/StatisticsPlan:fid-:sid-:tid-:btid',
      component: resolve => require(['../components/ljcq/StatisticsPlan.vue'], resolve)
    },
    {
      path: '/StatisticsPlan:fid-:sid-:btid',
      component: resolve => require(['../components/ljcq/StatisticsPlan.vue'], resolve)
    },
    {
      path: '/StatisticsPlan:fid-:btid',
      component: resolve => require(['../components/ljcq/StatisticsPlan.vue'], resolve)
    },
    {
      path: '/StatisticsPlan',
      component: resolve => require(['../components/ljcq/StatisticsPlan.vue'], resolve)
    },
    // 统计-进度
    {
      path: '/StatisticsProgress:fid-:sid-:tid-:btid',
      component: resolve => require(['../components/ljcq/StatisticsProgress.vue'], resolve)
    },
    {
      path: '/StatisticsProgress:fid-:sid-:btid',
      component: resolve => require(['../components/ljcq/StatisticsProgress.vue'], resolve)
    },
    {
      path: '/StatisticsProgress:fid-:btid',
      component: resolve => require(['../components/ljcq/StatisticsProgress.vue'], resolve)
    },
    {
      path: '/StatisticsProgress',
      component: resolve => require(['../components/ljcq/StatisticsProgress.vue'], resolve)
    },
    // 统计-汇总
    {
      path: '/StatisticsSummary:fid-:sid-:tid-:btid',
      component: resolve => require(['../components/ljcq/StatisticsSummary.vue'], resolve)
    },
    {
      path: '/StatisticsSummary:fid-:sid-:btid',
      component: resolve => require(['../components/ljcq/StatisticsSummary.vue'], resolve)
    },
    {
      path: '/StatisticsSummary:fid-:btid',
      component: resolve => require(['../components/ljcq/StatisticsSummary.vue'], resolve)
    },
    {
      path: '/StatisticsSummary',
      component: resolve => require(['../components/ljcq/StatisticsSummary.vue'], resolve)
    }
  ]
})
