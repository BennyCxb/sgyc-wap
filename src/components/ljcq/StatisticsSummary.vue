<template>
  <div>
    <x-header>{{title}}</x-header>
    <div>
      <div class="table-top">
        <div v-transfer-dom>
          <popup v-model="showScreen" position="right" width="70%">
            <div>
              <x-header :left-options="{showBack: false}">筛选<a slot="right" @click="showScreen = false">Close</a></x-header>
              <group>
                <datetime
                  v-model="form.FYear"
                  format="YYYY"
                  title="年份"></datetime>
              </group>
              <box gap="10px 10px">
                <x-button @click.native="resetSearch">重置</x-button>
              </box>
              <box gap="10px 10px">
                <x-button type="primary" :show-loading="showLoading" @click.native="getStatistical">搜索</x-button>
              </box>
            </div>
          </popup>
        </div>
        <datetime
          v-model="form.FYear"
          format="YYYY"
          title="年份"></datetime>

      </div>
      <!--<group>-->
        <!--<cell v-for="(item, i) in tableData" :key="i" :title="item.FBillNo" is-link></cell>-->
      <!--</group>-->
      <scroller lock-y scrollbar-x>
        <div class="box1">
          <x-table :cell-bordered="true" style="background-color:#fff; table-layout: fixed;">
            <thead>
            <tr>
              <th width="50px">#</th>
              <th>区块名称</th>
              <th>县(市、区)</th>
              <th>乡镇街道</th>
              <th>总占地</th>
              <th>总建筑面积</th>
              <th>其中违建面积</th>
              <th>市定改造方式</th>
              <th>县市区自定改造方式</th>
              <th>改造后用途</th>
              <th>拟投资额</th>
              <th>改造后违建面积</th>
              <th>拟启动时间</th>
              <th>拟完成时间</th>
              <th>目前进度</th>
              <th>是否是示范项目</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, i) in tableData" :key="i">
              <td>{{item.rowID}}</td>
              <td>{{item.FAreaName}}</td>
              <td>{{item.FAgencyName}}</td>
              <td>{{item.FTownName}}</td>
              <td>{{item.FOccupy}}</td>
              <td>{{item.FTotalAcreage}}</td>
              <td>{{item.FNonConBuildingArea}}</td>
              <td>{{item.FEVName}}</td>
              <td>{{item.FTownChangeType}}</td>
              <td>{{item.FEVName1}}</td>
              <td>{{item.FTotalInvestAmount}}</td>
              <td>{{item.FAfterChangeArea}}</td>
              <td>{{item.FChangeBeginDate}}</td>
              <td>{{item.FChangeEndDate}}</td>
              <td>{{item.FProgress}}</td>
              <td>{{item.FDemonstration}}</td>
            </tr>
            <tr v-if="!tableData.length">
              <td colspan="4">暂无数据</td>
            </tr>
            </tbody>
          </x-table>
        </div>
      </scroller>
    </div>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem, Group, Cell, dateFormat, Box, XInput, XButton, XTable, Popup, TransferDom, Tab, TabItem, Datetime, Selector, Search, Scroller } from 'vux'
import pagination from '../Pagination'
export default {
  directives: {
    TransferDom
  },
  components: {
    Flexbox,
    FlexboxItem,
    Group,
    Cell,
    dateFormat,
    Box,
    XInput,
    XButton,
    XTable,
    Popup,
    Datetime,
    Selector,
    Search,
    Scroller,
    Tab,
    TabItem,
    pagination
  },
  data () {
    return {
      title: '统计-汇总表',
      value: '',
      showScreen: false,
      edgeList: [],
      tableData: [],
      showLoading: false,
      Agency: [],
      form: {
        FYear: dateFormat(new Date(), 'YYYY')
      }
    }
  },
  methods: {
    init () {
      this.getStatistical()
    },
    /**
     * 重置筛选条件
     */
    resetSearch () {
      this.form = Object.assign({}, {
        FYear: dateFormat(new Date(), 'YYYY')
      })
    },
    getStatistical () {
      let self = this
      this.showLoading = true
      this.$api.ljcq.getStatisticalSummary(this.form).then(res => {
        self.showLoading = false
        self.showScreen = false
        self.tableData = res.object
      }).catch(error => {
        console.log(error)
        self.showLoading = false
        self.showScreen = false
      })
    },
    getResult (val) {
      console.log('on-change', val)
      this.results = val ? getResult(this.value) : []
    },
    // 从page组件传递过来的当前page
    pageChange (page) {
      this.form.curr = page
      this.getStatistical()
    }
  },
  created () {
    console.log(this.$route.params)
    // let billtypeId = Number(this.$route.params.btid)
    // this.form.FBillTypeID = billtypeId
    this.init()
  }
}

function getResult (val) {
  let rs = []
  for (let i = 0; i < 20; i++) {
    rs.push({
      title: `${val} result: ${i + 1} `,
      other: i
    })
  }
  return rs
}
</script>

<style lang="less" scoped>
  @import '../../../node_modules/vux/src/styles/close.less';
  .table-top {
    height: 44px;
    padding: 0;
  }

  .vux-x-input {
    padding: 5px;
    border: 1px solid gray;
    border-radius: 5px;
  }

  .vux-flexbox {
    background-color: #EFEFF4;
  }

  .table-screen .icon {
    padding: 0 15px;
    font-size: 20px;
  }

  .box1 {
    position: relative;
    width: 2000px;
  }
</style>
