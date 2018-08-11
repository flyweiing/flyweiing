<template>
  <div class="usb">
    <img :src="imgSrc" alt="">
  </div>
</template>

<script>
  export default {
    name: 'usb',
    data() {
      return {
        imgSrc: require('@/assets/func/usb_func.png')
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .usb {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
</style>
