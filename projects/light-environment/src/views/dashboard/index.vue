<template>
  <div class="dashboard-container">
    <dash-aside></dash-aside>
    <menu-tab></menu-tab>
    <amap></amap>
  </div>
</template>

<script>
  import Amap from '@/views/amap/index'
  import DashAside from './dash-aside'
  import MenuTab from './menu-tab'

  export default {
    name: 'dashboard',
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
