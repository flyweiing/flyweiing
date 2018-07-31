<template>
  <div class="amap-wrapper">
    <el-amap class="amap-box" :vid="'amap-vue'"></el-amap>
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
    name: 'amap'
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .amap-wrapper {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: calc(19% + 5px);
  }
</style>
