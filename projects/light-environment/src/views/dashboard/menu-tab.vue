<template>
  <div class="menu-tab">
    <ul class="function-tab">
      <li class="function-items is-active">
        <img src="../../assets/icon_light.png" alt=""><span>智慧路灯</span>
      </li>
      <li class="function-items">
        <img src="../../assets/icon_camera.png" alt=""><span>摄像机</span>
      </li>
      <li class="function-items">
        <img src="../../assets/icon_led.png" alt=""><span>LED显示屏</span>
      </li>
      <li class="function-items">
        <img src="../../assets/icon_wifi.png" alt=""><span>WIFI</span>
      </li>
      <li class="function-items">
        <img src="../../assets/icon_charger.png" alt=""><span>充电桩</span>
      </li>
      <li class="function-items">
        <img src="../../assets/icon_airing.png" alt=""><span>语音广播</span>
      </li>
      <li class="function-items">
        <img src="../../assets/icon_help.png" alt=""><span>一键求助</span>
      </li>
      <li class="function-items">
        <img src="../../assets/icon_rgb.png" alt=""><span>RGB氛围灯</span>
      </li>
      <li class="function-items">
        <img src="../../assets/icon_usb.png" alt=""><span>手机充电</span>
      </li>
    </ul>
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

<style rel="stylesheet/scss" lang="scss" scoped>
  .menu-tab {
    position: absolute;
    width: 105px;
    top: 10px;
    bottom: 10px;
    left: 0;
    background-image: url("../../assets/bg-color.png");
    color: #fff;
    z-index: 999;
    overflow-y: hidden;
    .function-tab {
      padding: 0;
    }
    .function-items {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 66px;
      cursor: pointer;
    }
    .is-active, .function-items:hover {
      background: linear-gradient(#25a5ef, #3376d0);
    }
  }
</style>

