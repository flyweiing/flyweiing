<template>
  <div class="light">
    <img class="bg_image" src="../../../assets/light_model.png" alt="">
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
    display: flex;
    flex-wrap: wrap;
    height: 100%;
    color: #fff;
    .bg_image{
      width: 50%;
      height: 50%;
      margin-top: 5%;
    }
    .light-info {
      width: 30%;
      height: 45%;
      margin: 5% 0 0 9%;
      background-image: url("../../../assets/light_info.png");
      background-size: 100% 100%;
    }
    .slider {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 115px;
      height: 200px;
      background-image: url("../../../assets/light_dimming.png");
      background-size: 100% 100%;
      .dimming-value {
        padding-bottom: 10px;
      }
      .dimming-label {
        padding-top: 10px;
      }
    }

  }
</style>
