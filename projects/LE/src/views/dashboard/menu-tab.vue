<template>
  <div class="menu-tab">
    <ul class="function-tab">
      <li class="function-items"
          v-for="(item, index) in imgItems"
          :key="index"
          @click="selectItem(index)"
          :class="{active:index==ins}">
        <img :src="item.imgSrc" alt=""><span>{{ item.title }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'MenuTab',
    data() {
      return {
        ins: '0',
        imgItems: [
          { title: '智慧路灯', imgSrc: 'src/assets/icon_light.png' },
          { title: '摄像机', imgSrc: 'src/assets/icon_camera.png' },
          { title: 'LED显示屏', imgSrc: 'src/assets/icon_led.png' },
          { title: 'WIFI', imgSrc: 'src/assets/icon_wifi.png' },
          { title: '充电桩', imgSrc: 'src/assets/icon_charger.png' },
          { title: '语音广播', imgSrc: 'src/assets/icon_airing.png' },
          { title: '一键求助', imgSrc: 'src/assets/icon_help.png' },
          { title: 'RGB氛围灯', imgSrc: 'src/assets/icon_rgb.png' },
          { title: '手机充电', imgSrc: 'src/assets/icon_usb.png' }
        ]
      }
    },
    methods: {
      selectItem(index) {
        this.ins = index
      }
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
      &.active, &:hover {
        background: linear-gradient(#25a5ef, #3376d0);
      }
    }
  }
</style>

