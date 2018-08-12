<template>
  <div class="light">
    <div class="title">展会节点</div>
    <div class="operate-item switch-op">
      <div class="switch"></div>
      <span class="label">照明开关</span>
    </div>
    <div class="operate-item slider-op">
      <div class="slider">
        <span class="dimming-value">{{ value }}%</span>
        <el-slider
          class="operation-slider"
          v-model="value"
          :show-tooltip="false"
          vertical>
        </el-slider>
      </div>
      <span class="label">智能调光</span>
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
  .operation-slider {
    height: 200px;
    margin-right: 7px;
    .el-slider__button {
      height: 10px;
      border: none;
      border-radius: 0;
      background-color: #409EFF;
    }
    .el-slider__bar {
      background: linear-gradient(#78e4ff, #012853);
    }
  }

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  .light {
    width:100%;
    height: 100%;
    color: #fff;
    overflow: hidden;
    .title {
      padding-left: 6%;
    }
    .operate-item {
      display: inline-block;
      position: absolute;
      top: 15%;
      right: 0;
      left: 0;
      margin: auto;
      width: 200px;
      height: 330px;
      .label {
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto;
        width: 66px;
      }
      &.switch-op {
        right: 210px;
      }
      &.slider-op {
        left: 210px;
      }
    }
    .switch{
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      width: 120px;
      height: 120px;
      background-image: url('../../../assets/home/light-1.png');
      background-size: 100% 100%;
      cursor: pointer;
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
        padding-bottom: 24px;
      }
    }
  }
</style>
