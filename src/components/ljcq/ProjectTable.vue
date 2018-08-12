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
                  @on-change="change"
                  title="年份"
                  @on-cancel="log('cancel')"
                  @on-confirm="onConfirm"
                  @on-hide="log('hide', $event)"></datetime>
              </group>
              <group>
                <datetime
                  v-model="form.FMonth"
                  format="MM"
                  @on-change="change"
                  title="月份"
                  @on-cancel="log('cancel')"
                  @on-confirm="onConfirm"
                  @on-hide="log('hide', $event)"></datetime>
              </group>
              <group>
                <selector title="行政区划" direction="rtl" :options="adcdList" v-model="form.FAgencyValue" @on-change="getCountyList"></selector>
              </group>
              <group>
                <selector title="乡镇街道" direction="rtl" :options="countyOptions" v-model="form.FTownValue"></selector>
              </group>
              <group>
                <selector title="市级改造方式" direction="rtl" :options="cityOption" v-model="form.FCityChangeType"></selector>
              </group>
              <group>
                <selector title="示范项目" direction="rtl" :options="typeOption" v-model="form.FStatus"></selector>
              </group>
              <box gap="10px 10px">
                <x-button @click.native="resetSearch">重置</x-button>
              </box>
              <box gap="10px 10px">
                <x-button type="primary" :show-loading="showLoading" @click.native="getProblemList">搜索</x-button>
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
              v-model="form.FBillNo"
              position="absolute"
              auto-scroll-to-top
              top="46px"
              @on-cancel="getProblemList"
              @on-submit="getProblemList"
              placeholder="区块名称"
              ref="search">
            </search>
          </flexbox-item>
        </flexbox>

      </div>
      <!--<group>-->
        <!--<cell v-for="(item, i) in tableData" :key="i" :title="item.FBillNo" is-link></cell>-->
      <!--</group>-->
      <x-table :cell-bordered="false" style="background-color:#fff; table-layout: fixed;">
        <thead>
        <tr>
          <th>年份</th>
          <th>行政区划</th>
          <th>区块名称</th>
          <th>示范项目</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, i) in tableData" :key="i">
          <td>{{item.FYear}}</td>
          <td>{{item.FAgencyName}}</td>
          <td style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{item.FAreaName}}</td>
          <td>{{item.FDemonstration}}</td>
        </tr>
        <tr v-if="!tableData.length">
          <td colspan="4">暂无数据</td>
        </tr>
        </tbody>
        <tfoot>
        <tr>
          <td colspan="4">
            <pagination :page-index="form.curr"
                        :total="count"
                        :page-size="form.pageSize"
                        @change="pageChange">
            </pagination>
          </td>
        </tr>
        </tfoot>
      </x-table>
      <div class="text-center">

      </div>
    </div>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem, Group, Cell, Box, XInput, XButton, XTable, Popup, TransferDom, Tab, TabItem, Datetime, Selector, Search } from 'vux'
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
    Tab,
    TabItem,
    pagination
  },
  data () {
    return {
      title: '老旧工业区区块',
      value: '',
      showScreen: false,
      adcdList: [],
      countyOptions: [],
      cityOption: [],
      typeOption: [{
        key: 1,
        value: '是'
      }, {
        key: 0,
        value: '否'
      }],
      tableData: [],
      count: 0, // 总记录数
      showLoading: false,
      form: {
        FBillTypeID: 200001,
        FYear: '',        // 年份
        FAgencyValue: '',   // 行政区划
        FTownValue: '',
        FCityChangeType: '',
        FTownChangeType: '',
        FAfterChange: '',
        FChangeDate: [],
        FChangeBeginDate: '',
        FChangeEndDate: '',
        FDemonstration: '',
        curr: 1,              // 当前页面
        pageSize: 20,         // 每页显示个数
        strSortFiled: '',
        strSortType: ''
      }
    }
  },
  methods: {
    init () {
      this.getAgencyList()
      this.getCountyList()
      this.getEnumList('按台州市办法分类', 'cityOption')
      this.getProblemList()
    },
    /**
     * 重置筛选条件
     */
    resetSearch () {
      this.form = Object.assign({}, {
        FBillTypeID: 200001,
        FYear: '',        // 年份
        FAgencyValue: '',   // 行政区划
        FTownValue: '',
        FCityChangeType: '',
        FTownChangeType: '',
        FAfterChange: '',
        FChangeDate: [],
        FChangeBeginDate: '',
        FChangeEndDate: '',
        FDemonstration: '',
        curr: 1,
        pageSize: 20,
        strSortFiled: '',
        strSortType: ''
      })
    },
    log (str1, str2 = '') {
      console.log(str1, str2)
    },
    change (value) {
      console.log('change', value)
    },
    onConfirm (val) {
      console.log('on-confirm arg', val)
    },
    /**
     * 获取行政区划
     */
    getAgencyList () {
      let self = this
      this.$api.ljcq.getAgencyList().then(res => {
        let list = []
        if (self.form.adcd) {
          let item = self._.find(res.object, {FValue: self.form.adcd})
          if (item) {
            list.push({
              key: Number(item.FValue),
              value: item.FName
            })
          }
        } else {
          self._.each(res.object, (obj) => {
            list.push({
              key: Number(obj.FValue),
              value: obj.FName
            })
          })
        }
        self.adcdList = [].concat(list)
      }).catch(error => {
        // self.$vux.loading.hide()
        console.log(error)
      })
    },
    /**
     * 获取乡镇街道
     */
    getCountyList () {
      let self = this
      this.FTownValue = ''
      let params = {
        AgencyValue: this.form.FAgencyValue
      }
      this.$api.ljcq.getCountyList(params).then(res => {
        let list = []
        self._.each(res.object, (obj) => {
          list.push({
            key: Number(obj.FValue),
            value: obj.FName
          })
        })
        self.countyOptions = [].concat(list)
      }).catch(error => {
        console.log(error)
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
      this.$api.ljcq.getEnumList(params).then(res => {
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
      })
    },
    getProblemList () {
      let self = this
      this.showLoading = true
      this.$api.ljcq.getProjectList(this.form).then(res => {
        // console.log(res)
        self.showLoading = false
        self.showScreen = false
        self.tableData = res.object
        self.count = res.page.totalRecords
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
      this.getProblemList()
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
</style>
