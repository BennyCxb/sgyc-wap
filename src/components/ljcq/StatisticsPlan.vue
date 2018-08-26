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
      <scroller scrollbar-x scrollbar-y height="-44px">
        <div class="box1">
          <x-table :cell-bordered="true" style="background-color:#fff; table-layout: fixed;">
            <thead>
            <tr>
              <th rowspan="3">行政区划</th>
              <th rowspan="3">三年改造任务数</th>
              <!--<th colspan="3" v-for="(item, i) in thItems" :key="i">{{item}}</th>-->
              <th colspan="6">{{Number(form.FYear)}}</th>
              <th colspan="6">{{Number(form.FYear) + 1}}</th>
              <th colspan="6">{{Number(form.FYear) + 2}}</th>
            </tr>
            <tr>
              <th colspan="2">整体(或大部分)拆除退出工业用途</th>
              <th colspan="2">整体(或大部分)拆除重建用于工业</th>
              <th colspan="2">综合整治(含部分拆除)用于产业提升或转型</th>
              <th colspan="2">整体(或大部分)拆除退出工业用途</th>
              <th colspan="2">整体(或大部分)拆除重建用于工业</th>
              <th colspan="2">综合整治(含部分拆除)用于产业提升或转型</th>
              <th colspan="2">整体(或大部分)拆除退出工业用途</th>
              <th colspan="2">整体(或大部分)拆除重建用于工业</th>
              <th colspan="2">综合整治(含部分拆除)用于产业提升或转型</th>
            </tr>
            <tr>
              <th>拟启动</th>
              <th>拟完成</th>
              <th>拟启动</th>
              <th>拟完成</th>
              <th>拟启动</th>
              <th>拟完成</th>
              <th>拟启动</th>
              <th>拟完成</th>
              <th>拟启动</th>
              <th>拟完成</th>
              <th>拟启动</th>
              <th>拟完成</th>
              <th>拟启动</th>
              <th>拟完成</th>
              <th>拟启动</th>
              <th>拟完成</th>
              <th>拟启动</th>
              <th>拟完成</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, i) in tableData" :key="i">
              <td>{{item.FAgencyName}}</td>
              <td>{{item.FSumCount}}</td>
              <td>{{item.Type1BeginFirst}}</td>
              <td>{{item.Type1EndFirst}}</td>
              <td>{{item.Type1BeginSecond}}</td>
              <td>{{item.Type1EndSecond}}</td>
              <td>{{item.Type1BeginThree}}</td>
              <td>{{item.Type1EndThree}}</td>
              <td>{{item.Type2BeginFirst}}</td>
              <td>{{item.Type2EndFirst}}</td>
              <td>{{item.Type2BeginSecond}}</td>
              <td>{{item.Type2EndSecond}}</td>
              <td>{{item.Type2BeginThree}}</td>
              <td>{{item.Type2EndThree}}</td>
              <td>{{item.Type3BeginFirst}}</td>
              <td>{{item.Type3EndFirst}}</td>
              <td>{{item.Type3BeginSecond}}</td>
              <td>{{item.Type3EndSecond}}</td>
              <td>{{item.Type3BeginThree}}</td>
              <td>{{item.Type3EndThree}}</td>
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
      title: '统计-计划表',
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
      this.$api.ljcq.getStatisticalPlan(this.form).then(res => {
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
    padding-bottom: 50px;
  }
</style>
