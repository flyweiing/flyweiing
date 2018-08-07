<template>
  <div class="dashboard-container">
    <dash-aside :itemList="allList"></dash-aside>
    <menu-tab></menu-tab>
    <amap :markers="mapItem"></amap>
  </div>
</template>

<script>
  import Amap from '@/views/amap/index'
  import DashAside from './dash-aside'
  import MenuTab from './menu-tab'
  import { getAllNode } from '@/api/light'

  export default {
    name: 'dashboard',
    data() {
      return {
        allList: null,
        mapItem: []
      }
    },
    created() {
      this.getAllNode()
    },
    methods: {
      getAllNode() {
        const _this = this
        getAllNode().then(response => {
          const list = response.list
          _this.allList = list
          list.forEach((item, index) => {
            const nodeList = item.nodeList
            if (nodeList.length > 0) {
              nodeList.forEach((mItem, mIndex) => {
                const status = mItem.isOnline === 1 ? 'on' : 'off'
                _this.mapItem.push({
                  nodeName: mItem.address,
                  nodeCode: mItem.code,
                  position: [mItem.longitude, mItem.latitude],
                  content: '<img class="img-marker" src="src/assets/icons/light_' + status + '.png" alt="">'
                })
              })
            }
          })
        })
      }
    },
    components: {
      Amap,
      DashAside,
      MenuTab
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard-container {
    width: 100%;
    height: 100%;
    background-color: #101a23;
  }
</style>
