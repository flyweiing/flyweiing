<template>
  <div class="light">
    <div class="light-info"></div>
    <!--<button>开关</button>-->
    <div class="slider">
      <span class="dimming-value">{{ value }}%</span>
      <el-slider
        class="dimming-slider"
        v-model="value"
        :show-tooltip="false"
        vertical>
      </el-slider>
      <span class="dimming-label">智能调光</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Light',
  data() {
    return {
      value: 50
    }
  },
  computed: {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  /* reset element-ui css */
  .dimming-slider {
    height: 110px;
    margin-right: 5px;
    .el-slider__button {
      height: 10px;
      border: none;
      border-radius: 0;
      background-color: #409EFF;
    }
    .el-slider__bar {
      background: linear-gradient(#3d83c7, #9b3898);
    }
  }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  .light {

  }
</style>
