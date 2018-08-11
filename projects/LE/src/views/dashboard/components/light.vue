<template>
  <div class="light">
    <div class="light-info"></div>
    <div class="switch"></div>
    <div class="slider">
      <span class="dimming-value">{{ value }}%</span>
      <el-slider
        class="dimming-slider"
        v-model="value"
        :show-tooltip="false"
        vertical>
      </el-slider>
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
    height: 200px;
    margin-right: 7px;
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
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width:100%;
    height: 100%;
    .switch{
      cursor: pointer;
      display:inline-block;
      width: 120px;
      height: 120px;
      margin-right: 8%;
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
      background-image: url('../../../assets/home/light-1.png');
      &.disabled{
        background-image: url('../../../assets/home/light-1-2.png');
      }
    }
    .slider {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 200px;
      height: 300px;
      background-image: url("../../../assets/func/bg_dimming.png");
      background-size: 100% 100%;
      color: #fff;
      .dimming-value {
        padding-bottom: 10px;
      }
      .dimming-label {
        padding-top: 10px;
      }
    }
  }
</style>
