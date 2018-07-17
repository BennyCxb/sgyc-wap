<template>
  <div>
    <div class="text-center">
      <img class="logo" src="../assets/vux_logo.png">
      <h1>四边三化信息管理平台</h1>
    </div>
    <group label-width="4.5em" label-margin-right="2em" label-align="right">
      <x-input title="用户名" v-model="username"></x-input>
      <x-input title="密&nbsp;&nbsp;&nbsp;码" v-model="password" type="password"></x-input>
    </group>
    <div style="padding:15px;">
      <x-button type="primary" @click.native="login">登录</x-button>
    </div>
  </div>
</template>

<script>
import { Group, XInput, XButton } from 'vux'
export default {
  name: 'login',
  components: {
    Group,
    XInput,
    XButton
  },
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      let params = {
        UserName: this.username,
        UserPwd: this.password,
        FProject: 1
      }
      this.$api.api.login(params).then(res => {
        console.log(res)
      }).catch(error => {
        console.log(error)
      })
    }
    // login () {
    //   let params = {
    //     UserName: this.username,
    //     UserPwd: this.password,
    //     FProject: 1
    //   }
    //   AjaxPlugin.$http.post('http://39.108.115.189:9001/api/Login/GetUserInfo', params)
    //     .then(res => {
    //       console.log(res)
    //     })
    // }
  }
}
</script>

<style scoped>
  .logo {
    width: 100px;
    height: 100px
  }
</style>
