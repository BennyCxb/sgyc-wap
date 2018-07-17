import { post } from '../axiosconfig/axiosConfig'
export default {
  login (params) {
    return post('/Login/GetUserInfo', params)
  }
}
