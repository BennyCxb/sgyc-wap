<template>
  <div class="login-container">
    <div class="text-center">
      <img class="logo" src="../assets/logo-2.png">
    </div>
    <div class="login-box">
      <h1 class="text-center login-title" v-text="title"></h1>
      <group label-width="4.5em" label-margin-right="2em" label-align="right">
        <x-input title="用户名" v-model="username" show-clear></x-input>
        <x-input title="密&nbsp;&nbsp;&nbsp;码" v-model="password" type="password" show-clear></x-input>
      </group>
      <div style="padding:15px 0;">
        <x-button type="primary" @click.native="login">登录</x-button>
        <x-button @click.native="changeProject">{{btnText}}</x-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Group, XInput, XButton, cookie } from 'vux'
export default {
  name: 'login',
  components: {
    Group,
    XInput,
    XButton
  },
  data () {
    return {
      project: 1,
      title: '四边三化',
      btnText: '"老旧工业区改造"专题',
      username: '',
      password: ''
    }
  },
  methods: {
    init () {
      let project = localStorage.getItem('project')
      if (project) {
        this.project = Number(project)
      }
    },
    login () {
      var self = this
      let params = {
        UserName: this.username,
        UserPwd: this.password,
        FProject: this.project
      }
      if (this.project === 1) {
        this.$api.sbsh.login(params).then(res => {
          cookie.set('TZManage', res.object, {expires: 12})
          self.$router.push({path: '/home'})
          localStorage.setItem('project', this.project)
        }).catch(error => {
          self.$vux.loading.hide()
          console.log(error)
        })
      } else {
        this.$api.ljcq.login(params).then(res => {
          cookie.set('TZOldManage', res.object, {expires: 12})
          self.$router.push({path: '/home'})
          localStorage.setItem('project', this.project)
        }).catch(error => {
          self.$vux.loading.hide()
          console.log(error)
        })
      }
    },
    changeProject () {
      if (this.project === 1) {
        this.project = 2
      } else {
        this.project = 1
      }
      localStorage.setItem('project', this.project)
    }
  },
  watch: {
    project (val, old) {
      if (val === 1) {
        this.title = '四边三化'
        this.btnText = '"老旧工业区块"专题'
      } else {
        this.title = '老旧工业区改造'
        this.btnText = '"四边三化"专题'
      }
    }
  },
  created () {
    this.init()
  }
}
</script>

<style scoped>
  .login-container {
    height: 100%;
    background: url("../assets/parallax-bg.jpg") no-repeat;
    background-size: cover;
  }
  .logo {
    width: 150px;
    height: 150px;
    margin-top: 60px;
  }

  .login-box {
    width: 320px;
    margin: auto;
    padding: 10px;
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.3);
  }

  .login-title {
    color: #ffffff;
  }
</style>
