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
                <selector title="行政区划" direction="rtl" :options="adcdList" v-model="form.FAgencyValue"></selector>
              </group>
              <group>
                <selector title="四边" direction="rtl" :options="edgeList" v-model="form.FEdge"></selector>
              </group>
              <group>
                <selector title="存在问题" direction="rtl" :options="proList" v-model="form.FProbType"></selector>
              </group>
              <group>
                <selector title="审核状态" direction="rtl" :options="statusList" v-model="form.FStatus"></selector>
              </group>
              <box gap="10px 10px">
                <x-button type="primary">搜索</x-button>
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
              @result-click="resultClick"
              @on-change="getResult"
              v-model="form.FBillNo"
              position="absolute"
              auto-scroll-to-top
              top="46px"
              @on-focus="onFocus"
              @on-cancel="onCancel"
              @on-submit="onSubmit"
              ref="search"></search>
          </flexbox-item>
        </flexbox>

      </div>
      <group>
        <cell v-for="(item, i) in tableData" :key="i" :title="item.FBillNo" is-link></cell>
      </group>
      <!--<x-table :cell-bordered="false" style="background-color:#fff;">-->
        <!--<thead>-->
        <!--<tr>-->
          <!--<th>Product</th>-->
          <!--<th>Price</th>-->
          <!--<th>Quantity</th>-->
          <!--<th>Quantity</th>-->
        <!--</tr>-->
        <!--</thead>-->
        <!--<tbody>-->
        <!--<tr>-->
          <!--<td>Apple</td>-->
          <!--<td>$1.25</td>-->
          <!--<td> x 1</td>-->
          <!--<td> x 1</td>-->
        <!--</tr>-->
        <!--<tr>-->
          <!--<td>Banana</td>-->
          <!--<td>$1.20</td>-->
          <!--<td> x 2</td>-->
          <!--<td> x 2</td>-->
        <!--</tr>-->

        <!--</tbody>-->
      <!--</x-table>-->
    </div>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem, Group, Cell, Box, XInput, XButton, XTable, Popup, TransferDom, Datetime, Selector, Search } from 'vux'
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
    Search
  },
  data () {
    return {
      title: '',
      value: '',
      showScreen: false,
      adcdList: [],
      edgeList: [],
      proList: [],
      statusList: [],
      tableData: [],
      form: {
        FBillTypeID: this.$route.params.btid,
        FBillNo: '',      // 问题编号
        FYear: '',        // 年份
        FMonth: '',       // 月份
        FAgencyValue: '', // 行政区划
        FEdge: '',        // 四边类型
        FProbType: '',    // 问题类型
        FStatus: '',      // 审核状态
        curr: 1,          // 当前页面
        pageSize: 10,     // 每页显示个数
        strSortFiled: '',
        strSortType: ''
      }
    }
  },
  methods: {
    init () {
      this.getAgencyList()
      this.getEnumList('四边', 'edgeList')
      this.getEnumList('问题类型', 'proList')
      this.getEnumList('审核状态', 'statusList')
      this.getProblemList()
    },
    log (str1, str2 = '') {
      console.log(str1, str2)
    },
    change (value) {
      console.log('change', value)
    },
    resultClick (item) {
      window.alert('you click the result item: ' + JSON.stringify(item))
    },
    onConfirm (val) {
      console.log('on-confirm arg', val)
      console.log('current value', this.value1)
    },
    onSubmit () {
      this.$refs.search.setBlur()
      this.$vux.toast.show({
        type: 'text',
        position: 'top',
        text: 'on submit'
      })
    },
    onFocus () {
      console.log('on focus')
    },
    onCancel () {
      console.log('on cancel')
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
    getProblemList () {
      let self = this
      this.$api.sbsh.getProblemList(this.form).then(res => {
        console.log(res)
        self.tableData = res.object
      }).catch(error => {
        console.log(error)
        self.$vux.toast.show({
          text: error.message
        })
      })
    },
    getResult (val) {
      console.log('on-change', val)
      this.results = val ? getResult(this.value) : []
    }
  },
  created () {
    console.log(this.$route.params)
    let billtypeId = Number(this.$route.params.btid)
    if (billtypeId === 1000011) {
      this.title = '省级问题点位'
    } else if (billtypeId === 1000012) {
      this.title = '市级问题点位'
    } else if (billtypeId === 1000013) {
      this.title = '县级自查自纠问题点位'
    }
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
  @import '~vux/src/styles/close.less';
  .table-top {
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
