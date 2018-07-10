<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import "../static/css/basic.css";     /*深色主题*/

body {
  background-color: #fbf9fe;
}
</style>
