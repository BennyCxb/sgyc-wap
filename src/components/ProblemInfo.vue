<template>
  <div>
    <x-header>{{title}}
    <div>
      <group title="mask">
        <x-input title="手机号码格式化" mask="999 9999 9999" v-model="maskValue" :max="13" is-type="china-mobile"></x-input>
        <cell title="value" :value="maskValue"></cell>
        <x-input title="(99) 9-99" mask="(99) 9-99" v-model="maskValue2" :max="9"></x-input>
      </group>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      FID: '',
      FBillTypeID: ''
    }
  },
  methods: {
    init () {
      console.log()
    },
    getInfo () {
      let self = this
      let params = {
        FID: this.FID
      }
      this.$api.sbsh.getProblemLInfo(params).then(res => {
        console.log(res)
      }).catch(error => {
        console.log(error)
        self.$vux.toast.show({
          text: error.message
        })
      })
    }
  },
  created () {
    console.log()
    this.getInfo()
  }
}
</script>

<style scoped>

</style>
