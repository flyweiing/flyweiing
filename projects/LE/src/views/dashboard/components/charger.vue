<template>
  <div class="charger">
    <img :src="imgSrc" alt="">
  </div>
</template>

<script>
  export default {
    name: 'charger',
    data() {
      return {
        imgSrc: require('@/assets/func/charger_func.png')
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .charger {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
</style>
