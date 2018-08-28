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
  // 获取乡镇街道
  getCountyList (params) {
    return get('/Common/GetStreetListByAgency', params)
  },
  // 获取枚举列表
  getEnumList (params) {
    return get('/Common/GetEnumList', params)
  },
  // 获取老旧工业区块改造列表
  getProjectList (params) {
    return post('/OldCity/GetList', params)
  },
  getProjectInfo (params) {
    return get('/OldCity/GetOldCity', params)
  },
  // 获取统计计划表数据
  getStatisticalPlan (params) {
    return get('/Statistical/GetOldCityChangeSchDataByAgency', params)
  },
  // 获取统计进度表数据
  getStatisticalProgress (params) {
    return get('/Statistical/GetOldCityChangeProgressDataByAgency', params)
  },
  // 获取统计汇总表数据
  getStatisticalSummary (params) {
    return get('/Statistical/GetOldCityAllData', params)
  }
}
