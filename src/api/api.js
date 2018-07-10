import { post } from '../axiosconfig/axiosConfig'
export default {
  login (params) {
    return post('/users/api/login', params)
  }
}
