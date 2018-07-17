import Vue from 'vue'
import { AjaxPlugin, Msg, Loading } from 'vux'
import qs from 'qs'
// 响应时间
AjaxPlugin.$http.defaults.timeout = 5 * 1000
// 配置cookie
// AjaxPlugin.$http.defaults.withCredentials = true
// 配置请求头
AjaxPlugin.$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// 静态资源
Vue.prototype.$static = ''

// 配置接口地址
AjaxPlugin.$http.defaults.baseURL = process.env.API_ROOT
// var loadingInstance = Loading
// POST传参序列化(添加请求拦截器)
AjaxPlugin.$http.interceptors.request.use(
  config => {
    // Loading.show({
    //   text: '数据加载中，请稍后...'
    // })
    if (config.method === 'post') {
      config.data = qs.stringify(config.data)
    }
    return config
  },
  err => {
    // loadingInstance.hide()
    Msg.error('请求错误')
    return Promise.reject(err)
  }
)
// 返回状态判断(添加响应拦截器)
AjaxPlugin.$http.interceptors.response.use(
  res => {
    if (res.data.code === 200) {
      // loadingInstance.hide()
      return res
    } else {
      // loadingInstance.hide()
      Msg.error(res.data.msg)
    }
  },
  err => {
    // loadingInstance.hide()
    Msg.error('请求失败，请稍后再试')
    return Promise.reject(err)
  }
)
// 发送请求
export function post (url, params) {
  url = process.env.API_ROOT + url
  return new Promise((resolve, reject) => {
    AjaxPlugin.$http.post(url, params)
      .then(
        res => {
          resolve(res.data)
        },
        err => {
          reject(err.data)
        }
      )
      .catch(err => {
        reject(err.data)
      })
  })
}
export function get (url, params) {
  return new Promise((resolve, reject) => {
    AjaxPlugin.$http
      .get(url, {
        params: params
      })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}