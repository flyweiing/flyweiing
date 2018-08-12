<template>
  <div :class="['amap-wrapper',fromPage==='home'?'amap-home':'']">
    <el-amap class="amap-box"
             :vid="'amap-vue'"
             :center="this.$store.getters.center"
             :zoom="zoom">
      <!--功能坐标点-->
      <el-amap-marker vid="component-marker"
                      v-for="marker in markers"
                      :key="marker.nodeCode"
                      :position="marker.position"
                      :content="marker.content"
                      :events="events">
      </el-amap-marker>
      <!--坐标点标题弹出框-->
      <el-amap-info-window
        :position="this.$store.getters.center"
        :content="this.$store.getters.selectedNode.name"
        :visible="windowVisible">
      </el-amap-info-window>
    </el-amap>
  </div>
</template>

<script>
  import Vue from 'vue'
  import VueAMap from 'vue-amap'

  Vue.use(VueAMap)
  VueAMap.initAMapApiLoader({
    key: 'c5100a129665b25518fe4bc9576d79e9',
    plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
    v: '1.4.4'
  })

  export default {
    name: 'amap',
    props: {
      markers: {
        type: Array
      },
      fromPage: {
        type: String
      },
      markerType: {
        type: String
      }
    },
    data() {
      return {
        zoom: 16,
        markerRefs: [],
        windowVisible: true,
        events: {
          click: () => {
            this.windowVisible = true
            this.$emit('select', this.markerType)
          }
        }
      }
    },
    mothons: {
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .amap-box {
    /*隐藏高德商标*/
    .amap-logo,
    .amap-copyright {
      display: none !important;
    }
    .amap-info-contentContainer {
      margin-bottom: 8px;
      margin-left: 6px;
    }
  }
  .amap-home{
    .mark-item{
      // background-color: lightpink;
      margin-top: -16.5px;
      height: 63px;
      width: 53px;
      background-image: url(../../assets/home/mark-light-1.png);
      background-repeat: no-repeat;
      background-size: cover;
      background-position:center;
      &.disabled{
        background-image: url(../../assets/home/mark-light-2.png);
      }
    }

  }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  .amap-wrapper {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

</style>
