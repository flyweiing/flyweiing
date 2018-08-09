<template>
  <div class="dashboard-container">
    <dash-aside @select="selectNode" :itemList="allList"></dash-aside>
    <menu-tab @select="selectFunc"></menu-tab>
    <amap @select="clickMarker" :markers="mapItem" :markerType="iconType"></amap>
    <div class="operation" v-show="isShow">
      <i class="close el-icon-close" @click="close()"></i>
      <div class="func-module">
          <router-view></router-view>
      </div>
    </div>
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
        mapItem: [],
        selectLight: [],
        selectItem: [],
        iconType: 'light',
        isShow: false
      }
    },
    created() {
      this._getAllNode()
    },
    methods: {
      close() {
        this.isShow = false
      },
      // 监听灯杆列表点击时间
      selectNode(item) {
        this.isShow = true
        this.selectItem = item
        this.$store.commit('SET_CENTER', this.selectItem)
        this.$router.push({
          path: `/dashboard/light`
        })
        this.mapItem = this.selectLight
      },
      // 监听地图坐标点击事件
      clickMarker(type) {
        this.$router.push({
          path: `/dashboard/${type}`
        })
        this.isShow = true
      },
      // 监听左边功能菜单点击事件
      selectFunc(type) {
        this.iconType = type
        this.$router.push({
          path: `/dashboard/${type}`
        })
        if (type === 'light') {
          this.mapItem = this.selectLight
        }
        // 一下数据为模拟个个功能模块的地图坐标数据
        if (type === 'camera') {
          this.mapItem = [
            {
              content: '<img class="img-marker" src=' + require('@/assets/icons/camera_on.png') + ' alt="">',
              position: [113.802454, 22.682169]
            },
            {
              content: '<img class="img-marker" src=' + require('@/assets/icons/camera_off.png') + ' alt="">',
              position: [113.804454, 22.682169]
            }
          ]
        }
        if (type === 'led') {
          this.mapItem = [
            {
              content: '<img class="img-marker" src=' + require('@/assets/icons/led_on.png') + ' alt="">',
              position: [113.802454, 22.682169]
            },
            {
              content: '<img class="img-marker" src=' + require('@/assets/icons/led_off.png') + ' alt="">',
              position: [113.804454, 22.682169]
            }
          ]
        }
        if (type === 'wifi') {
          this.mapItem = [
            {
              content: '<img class="img-marker" src=' + require('@/assets/icons/wifi_on.png') + ' alt="">',
              position: [113.802454, 22.682169]
            },
            {
              content: '<img class="img-marker" src=' + require('@/assets/icons/wifi_off.png') + ' alt="">',
              position: [113.804454, 22.682169]
            }
          ]
        }
        if (type === 'charger') {
          this.mapItem = [
            {
              content: '<img class="img-marker" src=' + require('@/assets/icons/charger_on.png') + ' alt="">',
              position: [113.802454, 22.682169]
            },
            {
              content: '<img class="img-marker" src=' + require('@/assets/icons/charger_off.png') + ' alt="">',
              position: [113.804454, 22.682169]
            }
          ]
        }
        if (type === 'airing') {
          this.mapItem = [
            {
              content: '<img class="img-marker" src=' + require('@/assets/icons/airing_on.png') + ' alt="">',
              position: [113.802454, 22.682169]
            },
            {
              content: '<img class="img-marker" src=' + require('@/assets/icons/airing_off.png') + ' alt="">',
              position: [113.804454, 22.682169]
            }
          ]
        }
        if (type === 'help') {
          this.mapItem = [
            {
              content: '<img class="img-marker" src=' + require('@/assets/icons/help_on.png') + ' alt="">',
              position: [113.802454, 22.682169]
            },
            {
              content: '<img class="img-marker" src=' + require('@/assets/icons/help_off.png') + ' alt="">',
              position: [113.804454, 22.682169]
            }
          ]
        }
        if (type === 'rgb') {
          this.mapItem = [
            {
              content: '<img class="img-marker" src=' + require('@/assets/icons/rgb_on.png') + ' alt="">',
              position: [113.802454, 22.682169]
            },
            {
              content: '<img class="img-marker" src=' + require('@/assets/icons/rgb_off.png') + ' alt="">',
              position: [113.804454, 22.682169]
            }
          ]
        }
        if (type === 'usb') {
          this.mapItem = [
            {
              content: '<img class="img-marker" src=' + require('@/assets/icons/usb_on.png') + ' alt="">',
              position: [113.802454, 22.682169]
            },
            {
              content: '<img class="img-marker" src=' + require('@/assets/icons/usb_off.png') + ' alt="">',
              position: [113.804454, 22.682169]
            }
          ]
        }
      },
      _getAllNode() {
        const _this = this
        getAllNode().then(response => {
          const list = response.list
          _this.allList = list
          list.forEach((item, index) => { // 遍历拼接地图组件需要的数组
            const nodeList = item.nodeList
            if (nodeList.length > 0) {
              nodeList.forEach((mItem, mIndex) => {
                // 拼接图片地址，例如：light_on.png,light_off.png,wifi_on.png
                const imgSrc = require('@/assets/icons/light_' + (mItem.isOnline === 1 ? 'on' : 'off') + '.png')
                _this.selectLight.push({
                  nodeName: mItem.name,
                  nodeCode: mItem.code,
                  position: [mItem.longitude, mItem.latitude],
                  content: '<img class="img-marker" src="' + imgSrc + '" alt="">'
                })
              })
            }
          })
          _this.mapItem = _this.selectLight
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
    .operation {
      position: absolute;
      width: 40%;
      top: 10px;
      bottom: 30px;
      left: 115px;
      background-image: url('../../assets/bg_operation.png');
      background-size: 100% 100%;
      .close {
        position: absolute;
        top: 6px;
        right: 6px;
        font-size: 22px;
        color: #fff;
        cursor: pointer;
        &:hover {
          color: #F56C6C;
        }
      }
    }
    .func-module{
      position: absolute;
      top: 30px;
      bottom: 30px;
      width: 100%;
    }
  }
</style>
