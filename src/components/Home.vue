<template>
  <div>
    <x-header :left-options="{backText: '登出'}">
      <span>四边三化</span>
    </x-header>

    <div class="vux-demo">
      <img class="logo" src="../assets/vux_logo.png">
      <h1></h1>
    </div>
    <!--<group v-for="(items, i) in menus" :key="i" :title="items.title">-->
      <!--<cell v-for="(item, index) in items.subs" :key="index" :title="item.title" value="cool" is-link></cell>-->
    <!--</group>-->

    <group v-for="(items, i) in menus":key="i">
      <cell
        :title="items.title"
        is-link
        :link="items.url"
        :border-intent="false"
        :arrow-direction="items.subs ? (items.showContent ? 'up' : 'down') : 'right'"
        @click.native="items.showContent = !items.showContent">
      </cell>

      <template v-if="items.showContent">
        <cell-box v-for="(item, index) in items.subs"
                  :key="index"
                  :border-intent="false"
                  class="sub-item"
                  :class="items.showContent?'animate':''"
                  :link="item.index"
                  is-link>
          {{item.title}}
        </cell-box>
      </template>

    </group>
  </div>
</template>

<script>
import { XHeader, Actionsheet, TransferDom, Group, Cell, CellBox } from 'vux'

export default {
  directives: {
    TransferDom
  },
  components: {
    XHeader,
    Actionsheet,
    Group,
    Cell,
    CellBox
  },
  data () {
    return {
      menus: [],
      showMenus: false
    }
  },
  methods: {
    getMenu () {
      var self = this
      this.$api.sbsh.isLogin()
        .then(res => {
          // console.log(res)
          let items1 = []
          // 一级菜单
          self._.each(res.object.MenuJson, (obj1) => {
            if (obj1.FChild.length > 0) {
              // 二级菜单
              let items2 = []
              self._.each(obj1.FChild, (obj2) => {
                if (obj2.FChild.length > 0) {
                  // 三级菜单
                  let items3 = []
                  self._.each(obj2.FChild, (obj3) => {
                    items3.push({
                      id: obj3.FID,
                      billTypeID: obj3.FBillTypeID,
                      index: obj3.FUrlPath + obj1.FID.toString() + '-' + obj2.FID.toString() + '-' + obj3.FID.toString() + '-' + obj3.FBillTypeID,
                      parentId: obj3.FParentID,
                      title: obj3.FName,
                      url: obj3.FUrlPath,
                      disabled: obj3.FUrlPath ? false : 'disabled'
                    })
                  })
                  items2.push({
                    id: obj2.FID,
                    index: obj2.FUrlPath + obj1.FID.toString() + '-' + obj2.FID.toString() + '-' + obj2.FBillTypeID,
                    parentId: obj2.FParentID,
                    title: obj2.FName,
                    subs: items3,
                    disabled: false
                  })
                } else {
                  items2.push({
                    id: obj2.FID,
                    billTypeID: obj2.FBillTypeID,
                    index: obj2.FUrlPath + obj1.FID.toString() + '-' + obj2.FID.toString() + '-' + obj2.FBillTypeID,
                    parentId: obj2.FParentID,
                    title: obj2.FName,
                    url: obj2.FUrlPath,
                    disabled: obj2.FUrlPath ? false : 'disabled'
                  })
                }
              })
              items1.push({
                id: obj1.FID,
                icon: 'el-icon-menu',
                index: obj1.FUrlPath + obj1.FID.toString() + '-' + obj1.FBillTypeID,
                parentId: obj1.FParentID.toString(),
                title: obj1.FName,
                subs: items2,
                disabled: false,
                showContent: false
              })
            } else {
              items1.push({
                id: obj1.FID,
                billTypeID: obj1.FBillTypeID,
                icon: 'el-icon-menu',
                index: obj1.FUrlPath + obj1.FID.toString() + '-' + obj1.FBillTypeID,
                parentId: obj1.FParentID.toString(),
                title: obj1.FName,
                url: obj1.FUrlPath,
                disabled: obj1.FUrlPath ? false : 'disabled',
                showContent: false
              })
            }
          })
          // console.log(items1)
          self.menus = [].concat(items1)
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  created () {
    this.getMenu()
  }
}
</script>

<style scoped>
  .vux-demo {
    margin-top: 50px;
    text-align: center;
  }

  .logo {
    width: 100px;
    height: 100px
  }

  .overwrite-title-demo {
    margin-top: 5px;
  }

  .sub-item {
    color: #888;
  }
  .slide {
    padding: 0 20px;
    overflow: hidden;
    max-height: 0;
    transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
  }
  .animate {
    max-height: 9999px;
    transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
    transition-delay: 0s;
  }
</style>
