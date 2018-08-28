<template>
  <div>
    <x-header>{{form.FAreaName}}</x-header>
    <scroller lock-x scrollbar-y height="-46px">
      <div>
        <!--<flow>-->
          <!--<flow-state state="1" title="未上报" is-done></flow-state>-->
          <!--<flow-line :is-done="form.FStatus >= 1 ? true : false" :tip="form.FStatus >= 0 ? '待上报' : ''"></flow-line>-->

          <!--<flow-state state="2" title="待审核" :is-done="form.FStatus >= 1 ? true : false"></flow-state>-->
          <!--<flow-line :is-done="form.FStatus >= 2 ? true : false" :tip="form.FStatus >= 1 ? '审核中' : ''"></flow-line>-->

          <!--<flow-state state="3" title="审核完成":is-done="form.FStatus >= 2 ? true : false"></flow-state>-->
        <!--</flow>-->
        <flow>
          <flow-state state="1" title="已启动" is-done></flow-state>
          <flow-line :is-done="form.FStatus >= 1 ? true : false" :tip="form.FStatus >= 0 ? '签约中' : ''"></flow-line>

          <flow-state state="2" title="已签约" :is-done="form.FStatus >= 1 ? true : false"></flow-state>
          <flow-line :is-done="form.FStatus >= 2 ? true : false" :tip="form.FStatus >= 1 ? '拆除中' : ''"></flow-line>

          <flow-state state="2" title="已拆除" :is-done="form.FStatus >= 2 ? true : false"></flow-state>
          <flow-line :is-done="form.FStatus >= 3 ? true : false" :tip="form.FStatus >= 2 ? '开工中' : ''"></flow-line>

          <flow-state state="2" title="已开工" :is-done="form.FStatus >= 3 ? true : false"></flow-state>
          <flow-line :is-done="form.FStatus >= 4 ? true : false" :tip="form.FStatus >= 3 ? '完工中' : ''"></flow-line>

          <flow-state state="3" title="已完工":is-done="form.FStatus >= 4 ? true : false"></flow-state>
        </flow>
        <group title="改造前基本信息">
          <cell title="区块名称" :value="form.FAreaName"></cell>
          <cell title="行政区划" :value="form.FAgencyName"></cell>
          <cell title="乡镇街道" :value="form.FTownName"></cell>
          <cell title="详细地址" :value="form.FPosition" primary="content"></cell>
          <cell title="主要产业" :value="form.FIndustry" primary="content"></cell>
          <cell title="企业家数" :value="form.FEntrepreneurCount"></cell>
          <cell title="总占地面积" :value="form.FOccupy"></cell>
          <cell title="总建筑面积" :value="form.FTotalAcreage"></cell>
          <cell title="违建面积" :value="form.FNonConBuildingArea"></cell>
          <cell title="责任领导" :value="form.FRespLeader"></cell>
          <cell title="联系人" :value="form.FLinkMan"></cell>
          <cell title="联系方式" :value="form.FLinkMobile"></cell>
          <cell title="十大老旧工业区块改造示范点" :value="form.FDemonstration ? '是': '否'"></cell>
          <cell title="区块情况简介" :value="form.FRemark" primary="content"></cell>
          <cell title="地图定位" :value="form.FGPS"></cell>
        </group>
        <group title="改造信息">
          <cell title="市级改造方式" :value="cityChangeType" primary="content"></cell>
          <cell title="县级改造方式" :value="form.FTownChangeType"></cell>
          <cell title="改造后用途" :value="afterChange"></cell>
          <cell title="拟总投资额" :value="form.FTotalInvestAmount"></cell>
          <cell title="改造后总建筑面积" :value="form.FAfterChangeArea"></cell>
          <cell title="拟启动时间" :value="form.FChangeBeginDate"></cell>
          <cell title="拟完成时间" :value="form.FChangeEndDate"></cell>
          <cell title="改造方案简介" :value="form.FChangeRemark" primary="content"></cell>
        </group>
      </div>
    </scroller>
  </div>
</template>

<script>
import { Group, Cell, XInput, Flow, FlowState, FlowLine, Scroller } from 'vux'

export default {
  components: {
    Group,
    Cell,
    XInput,
    Flow,
    FlowState,
    FlowLine,
    Scroller
  },
  computed: {
    cityChangeType () {
      let self = this
      let obj = this._.find(this.cityTypeOptions, function (item) {
        return item.key === self.form.FCityChangeType
      })
      console.log(obj)
      return obj ? obj.value : ''
    },
    afterChange () {
      let self = this
      let obj = this._.find(this.purposeOptions, function (item) {
        return item.key === self.form.FAfterChange
      })
      console.log(obj)
      return obj ? obj.value : ''
    }
  },
  data () {
    return {
      title: '',
      FID: '',
      FBillTypeID: '',
      countyOptions: [],
      cityTypeOptions: [],
      purposeOptions: [],
      form: {
        FAddTime: '',
        FAddUserID: '',
        FAfterChange: '',
        FAfterChangeArea: '',
        FAgencyName: '',
        FAgencyValue: '',
        FAreaName: '',
        FBillTypeID: '',
        FChangeBeginDate: '',
        FChangeEndDate: '',
        FChangeRemark: '',
        FChangeStatus: '',
        FCheckLevel: '',
        FCheckName: '',
        FCityChangeType: '',
        FDemonstration: '',
        FEntrepreneurCount: '',
        FGPS: '',
        FID: '',
        FIndustry: '',
        FIsDeleted: '',
        FLinkMan: '',
        FLinkMobile: '',
        FModifyTime: '',
        FModifyUserID: '',
        FNextCheckLevel: '',
        FNonConBuildingArea: '',
        FOccupy: '',
        FPosition: '',
        FRemark: '',
        FRespLeader: '',
        FStatus: '',
        FTotalAcreage: '',
        FTotalInvestAmount: '',
        FTownChangeType: '',
        FTownName: '',
        FTownValue: ''
      }
    }
  },
  methods: {
    init () {
      this.getEnumList('按台州市办法分类', 'cityTypeOptions')
      this.getEnumList('改造后用途', 'purposeOptions')
      this.getInfo()
    },
    /**
     * 获取枚举
     */
    getEnumList (str, array) {
      let self = this
      let params = {
        EnumType: str
      }
      this.$api.sbsh.getEnumList(params).then(res => {
        let list = []
        self._.each(res.object, (obj) => {
          list.push({
            key: Number(obj.FValue),
            value: obj.FName
          })
        })
        self[array] = [].concat(list)
      }).catch(error => {
        console.log(error)
        self.$vux.toast.show({
          text: error.message
        })
      })
    },
    getInfo () {
      let self = this
      let params = {
        FID: this.FID
      }
      this.$api.ljcq.getProjectInfo(params).then(res => {
        self.form = res.object
      }).catch(error => {
        console.log(error)
        self.$vux.toast.show({
          text: error.message
        })
      })
    }
  },
  created () {
    this.FID = this.$route.params.fid
    this.init()
  }
}
</script>

<style scoped>

</style>
