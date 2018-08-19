<template>
  <div>
    <x-header>{{title}}</x-header>
    <div class="statistics-container" style="height: calc(100% - 46px);">
      <div class="table-top">
        <div v-transfer-dom>
          <popup v-model="showScreen" position="right" width="70%">
            <div>
              <x-header :left-options="{showBack: false}">筛选<a slot="right" @click="showScreen = false">Close</a></x-header>
              <group>
                <selector title="问题点位" direction="rtl" :options="proList" v-model="form.FBillTypeID"></selector>
              </group>
              <group>
                <selector title="四边" direction="rtl" :options="edgeList" v-model="form.FPerimeter"></selector>
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
        <flexbox>
          <flexbox-item :span="1" class="table-screen">
            <i class="icon iconfont icon-menu" @click="showScreen = true"></i>
          </flexbox-item>
          <flexbox-item>
            <!--<group gutter="0">-->
              <!--<x-input v-model="value" placeholder="项目名称"></x-input>-->
            <!--</group>-->
            <search
              position="absolute"
              auto-scroll-to-top
              top="46px"
              @on-cancel="getStatistical"
              @on-submit="getStatistical"
              ref="search">
            </search>
          </flexbox-item>
        </flexbox>

      </div>
      <!--<group>-->
        <!--<cell v-for="(item, i) in tableData" :key="i" :title="item.FBillNo" is-link></cell>-->
      <!--</group>-->
      <!--<scroller lock-x scrollbar-y style="height: calc(100% - 44px);">-->
        <div class="box1" style="height: calc(100% - 44px);">
          <group v-for="(item, i) in chartsData" :key="i">
            <div class="charts-title">
              <h3 class="text-center">{{item.title}}</h3>
            </div>
            <div>
              <v-chart ref="demo" :data="item.data">
                <v-scale x field="key" />
                <v-scale y field="value"/>
                <v-bar series-field="name" adjust="stack" />
                <v-tooltip show-value-in-legend />
              </v-chart>
            </div>
          </group>
        </div>
      <!--</scroller>-->
    </div>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem, Group, Cell, Box, XInput, XButton, XTable, Popup, TransferDom, Tab, TabItem, Datetime, Selector, Search, Scroller, VChart, VLine, VArea, VTooltip, VLegend, VBar, VScale } from 'vux'
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
      title: '统计-问题点位',
      value: '',
      showScreen: false,
      edgeList: [],
      proList: [
        {
          value: '省级问题点位',
          key: 1000011
        },
        {
          value: '市级问题点位',
          key: 1000012
        },
        {
          value: '县级自查自纠点位',
          key: 1000013
        }
      ],
      tableData: [],
      count: 0, // 总记录数
      showLoading: false,
      Agency: [],
      thItems: [
        '乱搭乱建',
        '乱堆乱放',
        '废品垃圾',
        '乱采乱挖',
        '广告残留',
        '青山白化',
        '绿化缺失',
        '赤膊房',
        '矿山整治',
        '农田管理用房'
      ],
      form: {
        FBillTypeID: 1000011,
        FPerimeter: 1
      },
      formatter: function (val) {
        return (val * 100).toFixed(0) + '%'
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
      ],
      chartsData: []
    }
  },
  methods: {
    init () {
      this.getAgencyList()
      this.getEnumList('四边', 'edgeList')
      this.getStatistical()
    },
    /**
     * 重置筛选条件
     */
    resetSearch () {
      this.form = Object.assign({}, {
        FBillTypeID: 1000011,
        FPerimeter: 1
      })
    },
    /**
     * 获取行政区划
     */
    getAgencyList () {
      let self = this
      this.$api.sbsh.getAgencyList().then(res => {
        let list = []
        if (self.form.adcd) {
          let item = self._.find(res.object, {FValue: self.form.adcd})
          if (item) {
            list.push({
              key: item.FValue,
              value: item.FName
            })
          }
        } else {
          self._.each(res.object, (obj) => {
            list.push({
              key: obj.FValue,
              value: obj.FName
            })
          })
        }
        self.adcdList = [].concat(list)
      }).catch(error => {
        // self.$vux.loading.hide()
        console.log(error)
        self.$vux.toast.show({
          text: error.message
        })
      })
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
        self._.each(res.object, (obj) => {
          self[array].push({
            key: obj.FValue,
            value: obj.FName
          })
        })
      }).catch(error => {
        console.log(error)
        self.$vux.toast.show({
          text: error.message
        })
      })
    },
    getStatistical () {
      let self = this
      this.showLoading = true
      let params = {
        FBillTypeID: this.form.FBillTypeID,
        FPerimeter: this.form.FPerimeter
      }
      this.$api.sbsh.getStatistical(params).then(res => {
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

  .charts-title {
    padding: 10px;
  }
</style>
