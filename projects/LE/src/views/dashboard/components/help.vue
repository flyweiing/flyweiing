<template>
  <div class="help">
    <img :src="imgSrc" alt="">
  </div>
</template>

<script>
  export default {
    name: 'help',
    data() {
      return {
        imgSrc: require('@/assets/func/help_func.png')
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .help {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
</style>
