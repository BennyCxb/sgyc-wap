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
      <scroller lock-y scrollbar-x>
        <div class="box1">
          <x-table :cell-bordered="true" style="background-color:#fff; table-layout: fixed;">
            <thead>
            <tr>
              <th rowspan="2">行政区划</th>
              <!--<th colspan="3" v-for="(item, i) in thItems" :key="i">{{item}}</th>-->
              <th colspan="3">乱搭乱建</th>
              <th colspan="3">乱堆乱放</th>
              <th colspan="3">废品垃圾</th>
              <th colspan="3">乱采乱挖</th>
              <th colspan="3">广告残留</th>
              <th colspan="3">青山白化</th>
              <th colspan="3">绿化缺失</th>
              <th colspan="3">赤膊房</th>
              <th colspan="3">矿山整治</th>
              <th colspan="3">农田管理用房</th>
              <th colspan="3">总计</th>
            </tr>
            <tr>
              <th>目标任务(个)</th>
              <th>已完成(个)</th>
              <th>完成比例(%)</th>
              <th>目标任务(个)</th>
              <th>已完成(个)</th>
              <th>完成比例(%)</th>
              <th>目标任务(个)</th>
              <th>已完成(个)</th>
              <th>完成比例(%)</th>
              <th>目标任务(个)</th>
              <th>已完成(个)</th>
              <th>完成比例(%)</th>
              <th>目标任务(个)</th>
              <th>已完成(个)</th>
              <th>完成比例(%)</th>
              <th>目标任务(个)</th>
              <th>已完成(个)</th>
              <th>完成比例(%)</th>
              <th>目标任务(个)</th>
              <th>已完成(个)</th>
              <th>完成比例(%)</th>
              <th>目标任务(个)</th>
              <th>已完成(个)</th>
              <th>完成比例(%)</th>
              <th>目标任务(个)</th>
              <th>已完成(个)</th>
              <th>完成比例(%)</th>
              <th>目标任务(个)</th>
              <th>已完成(个)</th>
              <th>完成比例(%)</th>
              <th>目标任务(个)</th>
              <th>已完成(个)</th>
              <th>完成比例(%)</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, i) in tableData" :key="i">
              <td>{{item.FAgencyName}}</td>
              <td>{{item.FPerimeter1Count}}</td>
              <td>{{item.FPerimeter1Finish}}</td>
              <td>{{item.FPerimeter1Rate}}</td>
              <td>{{item.FPerimeter2Count}}</td>
              <td>{{item.FPerimeter2Finish}}</td>
              <td>{{item.FPerimeter2Rate}}</td>
              <td>{{item.FPerimeter3Count}}</td>
              <td>{{item.FPerimeter3Finish}}</td>
              <td>{{item.FPerimeter3Rate}}</td>
              <td>{{item.FPerimeter4Count}}</td>
              <td>{{item.FPerimeter4Finish}}</td>
              <td>{{item.FPerimeter4Rate}}</td>
              <td>{{item.FPerimeter5Count}}</td>
              <td>{{item.FPerimeter5Finish}}</td>
              <td>{{item.FPerimeter5Rate}}</td>
              <td>{{item.FPerimeter6Count}}</td>
              <td>{{item.FPerimeter6Finish}}</td>
              <td>{{item.FPerimeter6Rate}}</td>
              <td>{{item.FPerimeter7Count}}</td>
              <td>{{item.FPerimeter7Finish}}</td>
              <td>{{item.FPerimeter7Rate}}</td>
              <td>{{item.FPerimeter8Count}}</td>
              <td>{{item.FPerimeter8Finish}}</td>
              <td>{{item.FPerimeter8Rate}}</td>
              <td>{{item.FPerimeter9Count}}</td>
              <td>{{item.FPerimeter9Finish}}</td>
              <td>{{item.FPerimeter9Rate}}</td>
              <td>{{item.FPerimeter10Count}}</td>
              <td>{{item.FPerimeter10Finish}}</td>
              <td>{{item.FPerimeter10Rate}}</td>
              <td>{{item.FAllCount}}</td>
              <td>{{item.FAllFinish}}</td>
              <td>{{item.FAllRate}}</td>
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
import { Flexbox, FlexboxItem, Group, Cell, Box, XInput, XButton, XTable, Popup, TransferDom, Tab, TabItem, Datetime, Selector, Search, Scroller } from 'vux'
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
    pagination
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
      }
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
        FBillTypeID: 1,
        FPerimeter: 1
      }
      this.$api.sbsh.getStatistical(params).then(res => {
        self.showLoading = false
        self.showScreen = false
        self.tableData = res.object
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
    width: 3000px;
  }
</style>
