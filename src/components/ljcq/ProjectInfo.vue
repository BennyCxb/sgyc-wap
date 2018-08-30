<template>
  <div>
    <x-header>{{form.FAreaName}}</x-header>
    <scroller lock-x scrollbar-y height="-46px">
      <div>
        <flow v-if="form.FStatus < 2">
          <flow-state state="1" title="未上报" is-done></flow-state>
          <flow-line :is-done="form.FStatus >= 1 ? true : false" :tip="form.FStatus >= 0 ? '待上报' : ''"></flow-line>

          <flow-state state="2" title="待审核" :is-done="form.FStatus >= 1 ? true : false"></flow-state>
          <flow-line :is-done="form.FStatus >= 2 ? true : false" :tip="form.FStatus >= 1 ? '审核中' : ''"></flow-line>

          <flow-state state="3" title="审核完成":is-done="form.FStatus >= 2 ? true : false"></flow-state>
        </flow>
        <flow v-else-if="form.FStatus == 2 && form.FCityChangeType != 3">
          <flow-state state="1" title="未启动" is-done></flow-state>
          <flow-line :is-done="progress >= 1 ? true : false" :tip="progress >= 0 ? '启动中' : ''"></flow-line>

          <flow-state state="2" title="已启动" :is-done="progress >= 1 ? true : false"></flow-state>
          <flow-line :is-done="progress >= 2 ? true : false" :tip="progress >= 1 ? '签约中' : ''"></flow-line>

          <flow-state state="3" title="已签约" :is-done="progress >= 2 ? true : false"></flow-state>
          <flow-line :is-done="progress >= 3 ? true : false" :tip="progress >= 2 ? '拆除中' : ''"></flow-line>

          <flow-state state="4" title="已拆除" :is-done="progress >= 3 ? true : false"></flow-state>
          <flow-line :is-done="progress >= 4 ? true : false" :tip="progress >= 3 ? '开工中' : ''"></flow-line>

          <flow-state state="5" title="已开工" :is-done="progress >= 4 ? true : false"></flow-state>
          <flow-line :is-done="progress >= 5 ? true : false" :tip="progress >= 4 ? '完工中' : ''"></flow-line>

          <flow-state state="6" title="已完工":is-done="progress >= 5 ? true : false"></flow-state>
        </flow>
        <flow v-else-if="form.FStatus == 2 && form.FCityChangeType == 3">
          <flow-state state="1" title="企业进度未上报" is-done></flow-state>
          <flow-line :is-done="form.FStatus >= 1 ? true : false" :tip="form.FStatus >= 0 ? '待上报' : ''"></flow-line>

          <flow-state state="2" title="整治中/拆除中" :is-done="form.FStatus >= 1 ? true : false"></flow-state>
          <flow-line :is-done="form.FStatus >= 2 ? true : false" :tip="form.FStatus >= 1 ? '整治中/拆除中' : ''"></flow-line>

          <flow-state state="3" title="已整治/已拆除":is-done="form.FStatus >= 2 ? true : false"></flow-state>
        </flow>
        <group title="改造前基本信息">
          <cell title="区块名称" :value="form.FAreaName"></cell>
          <cell title="行政区划" :value="form.FAgencyName"></cell>
          <cell title="乡镇街道" :value="form.FTownName"></cell>
          <cell title="详细地址" :value="form.FPosition" primary="content"></cell>
          <cell title="主要产业" :value="form.FIndustry" primary="content"></cell>
          <cell title="企业家数" :value="form.FEntrepreneurCount"></cell>
          <cell title="总占地面积(万m³)" :value="form.FOccupy"></cell>
          <cell title="总建筑面积(万m³)" :value="form.FTotalAcreage"></cell>
          <cell title="违建面积(万m³)" :value="form.FNonConBuildingArea"></cell>
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
          <cell title="拟总投资额(万元)" :value="form.FTotalInvestAmount"></cell>
          <cell title="改造后总建筑面积(万m³)" :value="form.FAfterChangeArea"></cell>
          <cell title="拟启动时间" :value="form.FChangeBeginDate"></cell>
          <cell title="拟完成时间" :value="form.FChangeEndDate"></cell>
          <cell title="改造方案简介" :value="form.FChangeRemark" primary="content"></cell>
        </group>
        <group title="改造进度" v-if="form.FCityChangeType == 3 && progress3.length">
          <group v-for="(item, i) in progress3" :key="i">
            <cell :title="item.FCompanyName"></cell>
            <cell-form-preview :list="item.list"></cell-form-preview>
          </group>
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
      return obj ? obj.value : ''
    },
    afterChange () {
      let self = this
      let obj = this._.find(this.purposeOptions, function (item) {
        return item.key === self.form.FAfterChange
      })
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
      progress: 0,
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
      },
      progress3: []
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
        if (self.form.FCityChangeType === 3) {
          self.getProgress3()
        } else {
          self.getProgress12()
        }
      }).catch(error => {
        console.log(error)
        self.$vux.toast.show({
          text: error.message
        })
      })
    },
    getProgress12 () {
      let self = this
      let params = {
        FLoanID: this.FID
      }
      this.$api.ljcq.getProjectExtend12(params).then(res => {
        console.log(res)
        res.object.forEach((el, index) => {
          if (index === 0 && el.FSubmitStatus === 2) {
            self.progress = 1
          } else if (index === 1 && el.FSubmitStatus === 2) {
            self.progress = 2
          } else if (index === 2 && el.FSubmitStatus === 2) {
            self.progress = 3
          } else if (index === 3 && el.FSubmitStatus === 2) {
            self.progress = 4
          } else if (index === 4 && el.FSubmitStatus === 2) {
            self.progress = 5
          }
        })
        console.log(self.progress)
      }).catch(error => {
        console.log(error)
        self.$vux.toast.show({
          text: error.message
        })
      })
    },
    getProgress3 () {
      let self = this
      let params = {
        FLoanID: this.FID
      }
      this.$api.ljcq.getProjectExtend3(params).then(res => {
        console.log(res)

        res.object.forEach((el) => {
          if (el.FSubmitStatus === 1 && self.progress !== 2) {
            self.progress = 1
          } else if (el.FSubmitStatus === 2) {
            self.progress = 2
          }
          let list = [
            {
              label: '企业名称',
              value: el.FCompanyName
            },
            {
              label: '改造类型',
              value: el.FReadyType ? '整治' : '拆除'
            },
            {
              label: (el.FReadyType ? '整治' : '拆除') + '建筑面积',
              value: el.FReadyArea
            },
            {
              label: (el.FReadyType ? '整治' : '拆除') + '开始时间',
              value: el.FDoingTime
            },
            {
              label: (el.FReadyType ? '整治' : '拆除') + '结束时间',
              value: el.FDoneTime
            }
          ]
          self.progress3.push(list)
        })
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
