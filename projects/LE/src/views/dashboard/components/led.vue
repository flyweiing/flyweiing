<template>
  <div class="led">
    <img :src="imgSrc" alt="">
  </div>
</template>

<script>
  export default {
    name: 'led',
    data() {
      return {
        imgSrc: require('@/assets/func/led_func.png')
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .led {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
</style>
