import { post, get } from '../axiosconfig/axiosConfig'
export default {
  login (params) {
    return post('/Login/GetUserInfo', params)
  },
  isLogin () {
    return get('/Login/IsLogin')
  }
}
