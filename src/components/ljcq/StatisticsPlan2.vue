<template>
  <div>
    <x-header>{{title}}</x-header>
    <div>
      <div class="table-top">
        <datetime
          v-model="form.FYear"
          format="YYYY"
          title="年份"></datetime>
      </div>
      <!--<group>-->
        <!--<cell v-for="(item, i) in tableData" :key="i" :title="item.FBillNo" is-link></cell>-->
      <!--</group>-->
      <!--<scroller lock-y scrollbar-x>-->
      <div class="box1" style="height: calc(100% - 44px);">
        <group>
          <v-chart
            ref="demo"
            :data="data">
            <v-scale x field="月份" />
            <v-scale y field="月均降雨量" />
            <v-bar series-field="name" :adjust="{
              type: 'dodge',
              marginRatio: 0.05 // 设置分组间柱子的间距
            }" />
            <v-tooltip show-value-in-legend />
          </v-chart>
        </group>
      </div>
      <!--</scroller>-->
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
      title: '统计-计划表',
      value: '',
      showScreen: false,
      edgeList: [],
      tableData: [],
      showLoading: false,
      Agency: [],
      form: {
        FYear: dateFormat(new Date(), 'YYYY')
      },
      data: [
        { name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 },
        { name: 'London', 月份: 'Feb.', 月均降雨量: 28.8 },
        { name: 'London', 月份: 'Mar.', 月均降雨量: 39.3 },
        { name: 'London', 月份: 'Apr.', 月均降雨量: 81.4 },
        { name: 'London', 月份: 'May.', 月均降雨量: 47 },
        { name: 'London', 月份: 'Jun.', 月均降雨量: 20.3 },
        { name: 'London', 月份: 'Jul.', 月均降雨量: 24 },
        { name: 'London', 月份: 'Aug.', 月均降雨量: 35.6 },
        { name: 'Berlin', 月份: 'Jan.', 月均降雨量: 12.4 },
        { name: 'Berlin', 月份: 'Feb.', 月均降雨量: 23.2 },
        { name: 'Berlin', 月份: 'Mar.', 月均降雨量: 34.5 },
        { name: 'Berlin', 月份: 'Apr.', 月均降雨量: 99.7 },
        { name: 'Berlin', 月份: 'May.', 月均降雨量: 52.6 },
        { name: 'Berlin', 月份: 'Jun.', 月均降雨量: 35.5 },
        { name: 'Berlin', 月份: 'Jul.', 月均降雨量: 37.4 },
        { name: 'Berlin', 月份: 'Aug.', 月均降雨量: 42.4 }
      ]
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
      this.$api.ljcq.getStatisticalPlan(this.form).then(res => {
        self.showLoading = false
        self.showScreen = false
        self.tableData = res.object
        self.chartsData = [].concat([])
        self.thItems.forEach(function (obj1, index1) {
          self.chartsData.push({
            title: obj1,
            data: []
          })
          self._.each(res.object, function (obj2) {
            let object1 = {
              name: '未完成数',
              key: obj2.FAgencyName,
              value: obj2['FPerimeter' + (index1 + 1) + 'Count'] - obj2['FPerimeter' + (index1 + 1) + 'Finish']
            }

            let object2 = {
              name: '完成数',
              key: obj2.FAgencyName,
              value: obj2['FPerimeter' + (index1 + 1) + 'Finish']
            }
            self.chartsData[index1].data.push(object1)
            self.chartsData[index1].data.push(object2)
          })
        })
      }).catch(error => {
        console.log(error)
        self.showLoading = false
        self.showScreen = false
        self.$vux.toast.show({
          text: error.message
        })
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
