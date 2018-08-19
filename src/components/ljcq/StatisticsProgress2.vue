<template>
  <div>
    <x-header>{{title}}</x-header>
    <div style="height: calc(100% - 46px);">
      <div class="table-top">
        <datetime
          v-model="form.FYear"
          format="YYYY"
          title="年份"></datetime>
      </div>
      <div class="box1" style="height: calc(100% - 44px);">
        <group v-for="(item, i) in chartsData" :key="i">
          <div class="charts-title">
            <h3 class="text-center">{{item.title}}</h3>
          </div>
          <v-chart
            ref="demo"
            :data="item.data">
            <v-scale x field="key" />
            <v-scale y field="value" />
            <v-bar series-field="name" :adjust="{
              type: 'dodge',
              marginRatio: 0.05 // 设置分组间柱子的间距
            }" />
            <v-tooltip show-value-in-legend />
          </v-chart>
        </group>
      </div>
    </div>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem, Group, Cell, dateFormat, Box, XInput, XButton, XTable, Popup, TransferDom, Tab, TabItem, Datetime, Selector, Search, Scroller, VChart, VLine, VArea, VTooltip, VLegend, VBar, VScale } from 'vux'
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
    pagination,
    VChart,
    VLine,
    VArea,
    VTooltip,
    VLegend,
    VBar,
    VScale
  },
  data () {
    return {
      title: '统计-进度表',
      value: '',
      showScreen: false,
      edgeList: [],
      tableData: [],
      showLoading: false,
      Agency: [],
      form: {
        FYear: dateFormat(new Date(), 'YYYY')
      },
      thItems: ['整体(或大部分)拆除退出工业用途', '整体(或大部分)拆除崇敬用于工业', '综合整治(含部分拆除)用于产业提升或转型'],
      data: [],
      chartsData: []
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
      this.$api.ljcq.getStatisticalProgress(this.form).then(res => {
        self.showLoading = false
        self.showScreen = false
        self.tableData = res.object
        self.chartsData = [].concat([])
        self.thItems.forEach(function (obj1, index1) {
          self.chartsData.push({
            title: obj1,
            data: []
          })
          if (obj1 !== '综合整治(含部分拆除)用于产业提升或转型') {
            self._.each(res.object, function (obj2) {
              if (obj2.FAgencyName !== '合计') {
                let object1 = {
                  name: '已启动',
                  key: obj2.FAgencyName,
                  value: obj2['Change' + (index1 + 1) + 'Status1']
                }

                let object2 = {
                  name: '已签约',
                  key: obj2.FAgencyName,
                  value: obj2['Change' + (index1 + 1) + 'Status2']
                }

                let object3 = {
                  name: '已拆除',
                  key: obj2.FAgencyName,
                  value: obj2['Change' + (index1 + 1) + 'Status3']
                }

                let object4 = {
                  name: '已开工',
                  key: obj2.FAgencyName,
                  value: obj2['Change' + (index1 + 1) + 'Status4']
                }

                let object5 = {
                  name: '已完工',
                  key: obj2.FAgencyName,
                  value: obj2['Change' + (index1 + 1) + 'Status5']
                }
                self.chartsData[index1].data.push(object1)
                self.chartsData[index1].data.push(object2)
                self.chartsData[index1].data.push(object3)
                self.chartsData[index1].data.push(object4)
                self.chartsData[index1].data.push(object5)
              }
            })
          } else {
            self._.each(res.object, function (obj2) {
              if (obj2.FAgencyName !== '合计') {
                let object1 = {
                  name: '整治中(拆除中)',
                  key: obj2.FAgencyName,
                  value: obj2['Change3Status0']
                }

                let object2 = {
                  name: '已整治(已拆除)',
                  key: obj2.FAgencyName,
                  value: obj2['Change3Status2']
                }
                self.chartsData[index1].data.push(object1)
                self.chartsData[index1].data.push(object2)
              }
            })
          }
        })
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
    overflow: auto;
  }
</style>
