 <template>
  <div>
    <x-header>{{form.FPorjectName}}</x-header>
    <scroller lock-x scrollbar-y height="-46px">
      <div>
        <!--<flow>-->
          <!--<flow-state state="1" title="未上报" is-done></flow-state>-->
          <!--<flow-line :is-done="form.FStatus >= 1 ? true : false" :tip="form.FStatus >= 0 ? '待上报' : ''"></flow-line>-->

          <!--<flow-state state="2" title="待审核" :is-done="form.FStatus >= 1 ? true : false"></flow-state>-->
          <!--<flow-line :is-done="form.FStatus >= 2 ? true : false" :tip="form.FStatus >= 1 ? '审核中' : ''"></flow-line>-->

          <!--<flow-state state="3" title="审核完成":is-done="form.FStatus >= 2 ? true : false"></flow-state>-->
        <!--</flow>-->
        <!--<group>-->
          <cell title="年度月份" :value="form.FYear + '-' + form.FMonth"></cell>
          <cell title="行政区划" :value="form.FAgencyName"></cell>
          <cell title="乡镇街道" :value="form.FTwon"></cell>
          <cell title="里程/村庄" :value="form.FMileage" primary="content"></cell>
          <cell title="项目名称" :value="form.FPorjectName" primary="content"></cell>
          <cell title="项目类型" :value="problemType"></cell>
          <cell title="长度" :value="form.FLength"></cell>
          <cell title="投资金额" :value="form.FInvestment" primary="content"></cell>
          <cell title="利用面积" :value="form.FAcreage" primary="content"></cell>
          <cell title="计划完工时间" :value="form.FPlanDate" primary="content"></cell>
          <cell title="定位信息" :value="form.FGPS" primary="content"></cell>
          <cell title="用途" :value="form.FPurpose" primary="content"></cell>
          <cell title="负责单位" :value="form.FAccountabilityUnit" primary="content"></cell>
          <cell title="联系人" :value="form.FLiablePerson" primary="content"></cell>
          <cell title="联系方式" :value="form.FMobile" primary="content"></cell>
          <cell title="精品示范项目" :value="form.FIsSpecialProject ? '是': '否'" primary="content"></cell>
          <cell title="项目简介" :value="form.FSynopsis" primary="content"></cell>
          <cell title="备注" :value="form.FRemark" primary="content"></cell>
        <!--</group>-->
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
    problemType () {
      let self = this
      let edge = ''
      let obj = this._.find(this.proList, function (item) {
        return item.key === self.form.FProjectTypeID
      })
      if (obj) {
        edge = obj.value
      }
      return edge
    }
  },
  data () {
    return {
      title: '',
      FID: '',
      FBillTypeID: '',
      edgeList: [],
      proList: [],
      form: {
        FAccountabilityUnit: '',
        FAcreage: '',
        FAddTime: '',
        FAddUserID: '',
        FAgencyName: '',
        FAgencyValue: '',
        FBillNo: '',
        FBillTypeID: '',
        FChangeStatus: '',
        FCheckLevel: '',
        FCheckName: '',
        FGPS: '',
        FID: '',
        FInvestment: '',
        FIsDeleted: '',
        FIsSpecialProject: '',
        FLength: '',
        FLiablePerson: '',
        FLineName: '',
        FMileage: '',
        FMobile: '',
        FModifyTime: '',
        FModifyUserID: '',
        FMonth: '',
        FNextCheckLevel: '',
        FPerimeter: '',
        FPlanDate: '',
        FPorjectName: '',
        FProbDescribe: '',
        FProbTypeID: '',
        FProjectTypeID: '',
        FPurpose: '',
        FRemark: '',
        FStatus: '',
        FSynopsis: '',
        FTwon: '',
        FYear: ''
      }
    }
  },
  methods: {
    init () {
      this.getEnumList('问题类型', 'proList')
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
      this.$api.sbsh.getProblemInfo(params).then(res => {
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
