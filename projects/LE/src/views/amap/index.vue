<template>
  <div class="amap-wrapper">
    <el-amap class="amap-box"
             :vid="'amap-vue'"
             :center="center"
             :zoom="zoom">
      <el-amap-marker vid="component-marker"
                      v-for="marker in markers"
                      :position="marker.position"
                      :content="marker.content">
      </el-amap-marker>
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
      }
    },
    data() {
      return {
        zoom: 16,
        center: [113.802454, 22.682169],
        markerRefs: [],
        events: {
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .amap-wrapper {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
</style>
