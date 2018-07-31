<template>
  <div class="main-container">
    <!--<transition name="fade" mode="out-in">-->
      <!-- <router-view :key="key"></router-view> -->
      <router-view></router-view>
    <!--</transition>-->
  </div>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .main-container {
    position: absolute;
    top: 68px;
    right: 0;
    bottom: 0;
    left: 0;
    background: #fff;
  }
</style>
