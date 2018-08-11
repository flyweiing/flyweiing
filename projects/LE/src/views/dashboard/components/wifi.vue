<template>
  <div class="wifi">
    <img :src="imgSrc" alt="">
  </div>
</template>

<script>
  export default {
    name: 'wifi',
    data() {
      return {
        imgSrc: require('@/assets/func/wifi_func.png')
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .wifi {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
</style>
