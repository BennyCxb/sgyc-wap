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
  },
  getProblemInfo (params) {
    return get('/LoanApply/GetApplyInfo', params)
  },
  // 获取问题点位
  getProjectList (params) {
    return post('/LoanApply/GetQXList', params)
  },
  getProjectInfo (params) {
    return get('/LoanApply/GetQXList', params)
  },
  // 获取统计数据
  getStatistical (params) {
    return get('/Statistical/GetPerimeterTable', params)
  }
}
