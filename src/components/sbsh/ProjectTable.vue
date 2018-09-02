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
              <group>
                <datetime
                  v-model="form.FMonth"
                  format="MM"
                  title="月份"></datetime>
              </group>
              <group>
                <selector title="行政区划" :options="adcdList" v-model="form.FAgencyValue"></selector>
              </group>
              <group>
                <selector title="项目类型" :options="proList" v-model="form.FProjectTypeID"></selector>
              </group>
              <box gap="10px 10px">
                <x-button @click.native="resetSearch">重置</x-button>
              </box>
              <box gap="10px 10px">
                <x-button type="primary" :show-loading="showLoading" @click.native="getProjectList">搜索</x-button>
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
              v-model="form.FPorjectName"
              position="absolute"
              auto-scroll-to-top
              top="46px"
              @on-cancel="getProjectList"
              @on-submit="getProjectList"
              placeholder="项目名称"
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
          <th colspan="2">项目名称</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, i) in tableData" :key="i" @click="openInfo(item.FID)">
          <td>{{item.FYear}}</td>
          <td>{{item.FAgencyName}}</td>
          <td colspan="2" style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{item.FPorjectName}}</td>
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
      title: '示例项目',
      value: '',
      showScreen: false,
      adcdList: [],
      proList: [],
      tableData: [],
      count: 0, // 总记录数
      showLoading: false,
      Agency: [],
      form: {
        FBillTypeID: '100002',
        FPorjectName: '', // 项目名称
        FProjectTypeID: '',
        FYear: '',        // 年份
        FMonth: '',       // 月份
        FAgencyValue: '', // 行政区划
        curr: 1,          // 当前页面
        pageSize: 20,     // 每页显示个数
        strSortFiled: '',
        strSortType: ''
      }
    }
  },
  methods: {
    init () {
      this.getAgencyList()
      this.getEnumList('项目类型', 'proList')
      this.getEnumList('三无四美', 'proList')
      this.getProjectList()
    },
    /**
     * 重置筛选条件
     */
    resetSearch () {
      let FPorjectName = this.form.FPorjectName
      this.form = Object.assign({}, {
        FBillTypeID: '100002',
        FPorjectName: FPorjectName,
        FYear: '',
        FMonth: '',
        FAgencyValue: '',
        FProjectTypeID: '',
        curr: 1,
        pageSize: 20,
        strSortFiled: '',
        strSortType: ''
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
    getProjectList () {
      let self = this
      this.showLoading = true
      this.$api.sbsh.getProjectList(this.form).then(res => {
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
      this.getProjectList()
    },
    // 打开详细信息
    openInfo (FID) {
      this.$router.push({path: '/ProjectInfo' + '-' + FID})
    }
  },
  activated () {
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
</style>
