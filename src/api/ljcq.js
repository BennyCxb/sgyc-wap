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
  getProjectLInfo (params) {
    return get('/LoanApply/GetQXList', params)
  },
  // 获取统计数据
  getStatisticalPlan (params) {
    return get('/Statistical/GetOldCityChangeSchDataByAgency', params)
  }
}
