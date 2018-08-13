<template>
  <div class="dashboard-container">
    <dash-aside @select="selectNode" :itemList="allList"></dash-aside>
    <menu-tab @select="selectFunc"></menu-tab>
    <amap :markers="mapItem" :markerType="iconType"></amap>
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
      // 监听灯杆列表点击事件
      selectNode(item) {
        const _this = this
        _this.isShow = true
        _this.selectItem = item
        _this.$store.commit('SET_CENTER', _this.selectItem)
        _this.$store.commit('SET_SELECTNNODE', _this.selectItem)
        _this.$store.commit('SET_MAPWINDOWSHOW', true)
        _this.$router.push({
          path: `/dashboard/light`
        })
        _this.mapItem = _this.selectLight
      },
      // 监听左边功能菜单点击事件
      selectFunc(type) {
        const _this = this
        _this.isShow = false
        _this.iconType = type
        _this.$store.commit('SET_MAPWINDOWSHOW', false)
        _this.$router.push({
          path: `/dashboard/${type}`
        })
        if (type === 'light') {
          _this.mapItem = _this.selectLight
        }
        // 一下数据为模拟个个功能模块的地图坐标数据
        if (type === 'camera') {
          _this.mapItem = [
            {
              content: '<img class="img-marker" src=' + require('@/assets/icons/camera_on.png') + ' alt="">',
              position: [113.802454, 22.682169],
              events: {
                click() { // 地图点击事件
                  _this.isShow = true
                }
              }
            },
            {
              content: '<img class="img-marker" src=' + require('@/assets/icons/camera_off.png') + ' alt="">',
              position: [113.804454, 22.682169],
              events: {
                click() { // 地图点击事件
                  _this.isShow = true
                }
              }
            }
          ]
        }
        if (type === 'led') {
          _this.mapItem = [
            {
              content: '<img class="img-marker" src=' + require('@/assets/icons/led_on.png') + ' alt="">',
              position: [113.802454, 22.682169],
              events: {
                click() { // 地图点击事件
                  _this.isShow = true
                }
              }
            },
            {
              content: '<img class="img-marker" src=' + require('@/assets/icons/led_off.png') + ' alt="">',
              position: [113.804454, 22.682169],
              events: {
                click() { // 地图点击事件
                  _this.isShow = true
                }
              }
            }
          ]
        }
        if (type === 'wifi') {
          _this.mapItem = [
            {
              content: '<img class="img-marker" src=' + require('@/assets/icons/wifi_on.png') + ' alt="">',
              position: [113.802454, 22.682169],
              events: {
                click() { // 地图点击事件
                  _this.isShow = true
                }
              }
            },
            {
              content: '<img class="img-marker" src=' + require('@/assets/icons/wifi_off.png') + ' alt="">',
              position: [113.804454, 22.682169],
              events: {
                click() { // 地图点击事件
                  _this.isShow = true
                }
              }
            }
          ]
        }
        if (type === 'charger') {
          _this.mapItem = [
            {
              content: '<img class="img-marker" src=' + require('@/assets/icons/charger_on.png') + ' alt="">',
              position: [113.802454, 22.682169],
              events: {
                click() { // 地图点击事件
                  _this.isShow = true
                }
              }
            },
            {
              content: '<img class="img-marker" src=' + require('@/assets/icons/charger_off.png') + ' alt="">',
              position: [113.804454, 22.682169],
              events: {
                click() { // 地图点击事件
                  _this.isShow = true
                }
              }
            }
          ]
        }
        if (type === 'airing') {
          _this.mapItem = [
            {
              content: '<img class="img-marker" src=' + require('@/assets/icons/airing_on.png') + ' alt="">',
              position: [113.802454, 22.682169],
              events: {
                click() { // 地图点击事件
                  _this.isShow = true
                }
              }
            },
            {
              content: '<img class="img-marker" src=' + require('@/assets/icons/airing_off.png') + ' alt="">',
              position: [113.804454, 22.682169],
              events: {
                click() { // 地图点击事件
                  _this.isShow = true
                }
              }
            }
          ]
        }
        if (type === 'help') {
          _this.mapItem = [
            {
              content: '<img class="img-marker" src=' + require('@/assets/icons/help_on.png') + ' alt="">',
              position: [113.802454, 22.682169],
              events: {
                click() { // 地图点击事件
                  _this.isShow = true
                }
              }
            },
            {
              content: '<img class="img-marker" src=' + require('@/assets/icons/help_off.png') + ' alt="">',
              position: [113.804454, 22.682169],
              events: {
                click() { // 地图点击事件
                  _this.isShow = true
                }
              }
            }
          ]
        }
        if (type === 'rgb') {
          _this.mapItem = [
            {
              content: '<img class="img-marker" src=' + require('@/assets/icons/rgb_on.png') + ' alt="">',
              position: [113.802454, 22.682169],
              events: {
                click() { // 地图点击事件
                  _this.isShow = true
                }
              }
            },
            {
              content: '<img class="img-marker" src=' + require('@/assets/icons/rgb_off.png') + ' alt="">',
              position: [113.804454, 22.682169],
              events: {
                click() { // 地图点击事件
                  _this.isShow = true
                }
              }
            }
          ]
        }
        if (type === 'usb') {
          _this.mapItem = [
            {
              content: '<img class="img-marker" src=' + require('@/assets/icons/usb_on.png') + ' alt="">',
              position: [113.802454, 22.682169],
              events: {
                click() { // 地图点击事件
                  _this.isShow = true
                }
              }
            },
            {
              content: '<img class="img-marker" src=' + require('@/assets/icons/usb_off.png') + ' alt="">',
              position: [113.804454, 22.682169],
              events: {
                click() { // 地图点击事件
                  _this.isShow = true
                }
              }
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
                  content: '<img class="img-marker" src="' + imgSrc + '" alt="">',
                  events: {
                    click() { // 地图点击事件
                      _this.$store.commit('SET_CENTER', mItem)
                      _this.$store.commit('SET_SELECTNNODE', mItem)
                      _this.$store.commit('SET_MAPWINDOWSHOW', true)
                      _this.$router.push({
                        path: `/dashboard/light`
                      })
                      _this.isShow = true
                    }
                  }
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
      min-width: 450px;
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
