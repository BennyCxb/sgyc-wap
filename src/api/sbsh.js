import { post, get } from '../axiosconfig/axiosConfig'
export default {
  login (params) {
    return post('/Login/GetUserInfo', params)
  },
  isLogin () {
    return get('/Login/IsLogin')
  },
  // 获取行政区划
  getAgencyList () {
    return get('/Common/GetAgencyList')
  },
  // 获取枚举列表
  getEnumList (params) {
    return get('/Common/GetEnumList', params)
  },
  // 获取问题点位
  getProblemList (params) {
    return post('/LoanApply/GetSJList', params)
  }
}
