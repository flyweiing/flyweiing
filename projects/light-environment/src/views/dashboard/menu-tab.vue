<template>
  <div class="menu-tab">
    <el-tabs value="first" class="el-tabs-function" tab-position="left">
      <el-tab-pane disabled>
        <span class="function-menu" slot="label"></span>
      </el-tab-pane>
      <el-tab-pane name="first">
        <div class="function-label" slot="label"><img src="../../assets/icon_light.png" alt=""><span>智慧路灯</span></div>
        <light></light>
      </el-tab-pane>
      <el-tab-pane>
        <div class="function-label" slot="label"><img src="../../assets/icon_camera.png" alt=""><span>摄像机</span></div>
        <camera></camera>
      </el-tab-pane>
      <el-tab-pane>
        <div class="function-label" slot="label"><img src="../../assets/icon_led.png" alt=""><span>LED显示屏</span></div>
        <led></led>
      </el-tab-pane>
      <el-tab-pane label="wifi">
        <div class="function-label" slot="label"><img src="../../assets/icon_wifi.png" alt=""><span>WiFi</span></div>
        <wifi></wifi>
      </el-tab-pane>
      <el-tab-pane label="充电桩">
        <div class="function-label" slot="label"><img src="../../assets/icon_charger.png" alt=""><span>充电桩</span></div>
        <charger></charger>
      </el-tab-pane>
      <el-tab-pane label="语音广播">
        <div class="function-label" slot="label"><img src="../../assets/icon_airing.png" alt=""><span>语音广播</span></div>
        <airing></airing>
      </el-tab-pane>
      <el-tab-pane label="一键求助">
        <div class="function-label" slot="label"><img src="../../assets/icon_help.png" alt=""><span>一键求助</span></div>
        <help></help>
      </el-tab-pane>
      <el-tab-pane label="氛围灯">
        <div class="function-label" slot="label"><img src="../../assets/icon_rgb.png" alt=""><span>氛围灯</span></div>
        <rgb></rgb>
      </el-tab-pane>
      <el-tab-pane label="手机充电">
        <div class="function-label" slot="label"><img src="../../assets/icon_usb.png" alt=""><span>手机充电</span></div>
        <usb></usb>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import { Light, Camera, Led, Wifi, Charger, Airing, Help, Rgb, Usb } from './components'

  export default {
    name: 'MenuTab',
    components: {
      Light,
      Camera,
      Led,
      Wifi,
      Charger,
      Airing,
      Help,
      Rgb,
      Usb
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  /* reset element-ui css */
  .el-tabs-function {
      height: 100%;
    .el-tabs__item {
      width: 120px;
      height: 60px;
      padding: 0;
      color: #fff;
    }
    #tab-0 {
      height: 70px;
      background-image: url("../../assets/function_menu.png");
      background-size: 100% 100%;
    }
    .is-active {
      background: linear-gradient(right, #219be2, #1c529b);
    }
    .el-tabs__header.is-left {
      border-right: 5px solid #00375d;
    }
    .el-tabs__nav-wrap::after {
      content: none;
    }
    .el-tabs__content, .el-tab-pane {
      height: 100%;
    }
  }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  .menu-tab {
    position: absolute;
    width: 50%;
    top: 0;
    bottom: 0;
    left: calc(19% + 5px);
    background-image: url("../../assets/bg-color.png");
    z-index: 999;
    .function-label {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      img {
        width: 30px;
        height: 30px;
        margin-top: 5px;
      }
      span {
        margin-top: -8px;
      }
    }
  }
</style>

