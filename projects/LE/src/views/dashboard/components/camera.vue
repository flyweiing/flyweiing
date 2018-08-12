<template>
  <div class="camera">
    <div class="camera-header">
      <div class="camera-img"></div>
      <div class="camera-info">
        <div class="title">摄像机</div>
        <div class="info"><span class="label">型号：</span>A126</div>
        <div class="info"><span class="label">编号：</span>19264</div>
        <div class="info"><span class="label">清晰度：</span>200万(720P)</div>
        <div class="info"><span class="label">设备状态：</span>正常</div>
      </div>
    </div>
    <div class="camera-video">
      <div class="player">
        <my-camera></my-camera>
      </div>
      <div class="play">
        <div class="circle">
          <svg-icon icon-class="pause-circle" />
          <span>暂停</span>
        </div>

      </div>
    </div>
    <div class="camera-operation">
      <div class="ptz-operation">
        <div class="directions">
          <span class="direction left-up" data-ptz="5" title="左上"></span>
          <span class="direction up" data-ptz="1" title="向上"></span>
          <span class="direction right-up" data-ptz="7" title="右上"></span>
          <span class="direction left" data-ptz="3" title="向左"></span>
          <span class="direction center" data-ptz="9" title="自动"></span>
          <span class="direction right" data-ptz="4" title="向右"></span>
          <span class="direction left-down" data-ptz="6" title="左下"></span>
          <span class="direction down" data-ptz="2" title="向下"></span>
          <span class="direction right-down" data-ptz="8" title="右下"></span>
        </div>
        <span>云台控制</span>
      </div>
      <div class="ptz-speed">
        <div class="ptz-slider">
          <el-slider
            class="speed-slider"
            :min="speedMin"
            :max="speedMax"
            v-model="speed"
            vertical>
          </el-slider>
        </div>
        <span>云台速度</span>
      </div>
      <div class="lens-operation">
        <span>镜头控制</span>
      </div>
    </div>
  </div>
</template>


<script>
  import MyCamera from '@/components/camera/camera'

  export default {
    name: 'Camera',
    data() {
      return {
        speedMin: 1,
        speedMax: 7,
        speed: 4
      }
    },
    methods: {
    },
    components: {
      MyCamera
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  /* reset element-ui css */
  .speed-slider{
    height: 100%;
    .el-slider__button {
      height: 10px;
      border: none;
      border-radius: 0;
      background-color: #409EFF;
    }
    .el-slider__bar {
      background: -webkit-linear-gradient(#3d83c7, #9b3898);
      background: -moz-linear-gradient(#3d83c7, #9b3898);
      background: -o-linear-gradient(#3d83c7, #9b3898);
      background: linear-gradient(#3d83c7, #9b3898);
    }
  }
</style>

<style lang="scss" scoped src="@/styles/dash-camera.scss"></style>

