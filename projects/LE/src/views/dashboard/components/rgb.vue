<template>
  <div class="rgb">
    <img :src="imgSrc" alt="">
  </div>
</template>

<script>
  export default {
    name: 'rgb',
    data() {
      return {
        imgSrc: require('@/assets/func/rgb_func.png')
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .rgb {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
</style>
