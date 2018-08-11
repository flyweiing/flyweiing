<template>
  <div class="airing">
    <img :src="imgSrc" alt="">
  </div>
</template>

<script>
  export default {
    name: 'airing',
    data() {
      return {
        imgSrc: require('@/assets/func/airing_func.png')
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .airing {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
</style>
