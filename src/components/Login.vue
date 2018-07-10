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
      <x-button type="primary">登录</x-button>
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
      msg: 'test1',
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      console.log(1)
    }
  }
}
</script>

<style scoped>
  .logo {
    width: 100px;
    height: 100px
  }
</style>
