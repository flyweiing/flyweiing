<template>
  <div class="menu-tab">
    <ul class="function-tab">
      <li class="function-items"
          v-for="(item, index) in imgItems"
          :key="index"
          @click="selectItem(index, item.type)"
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
        ins: 0,
        imgItems: [
          { title: '智慧路灯', imgSrc: require('@/assets/icons/icon_light.png'), type: 'light' },
          { title: '摄像机', imgSrc: require('@/assets/icons/icon_camera.png'), type: 'camera' },
          { title: 'LED显示屏', imgSrc: require('@/assets/icons/icon_led.png'), type: 'led' },
          { title: 'WIFI', imgSrc: require('@/assets/icons/icon_wifi.png'), type: 'wifi' },
          { title: '充电桩', imgSrc: require('@/assets/icons/icon_charger.png'), type: 'charger' },
          { title: '语音广播', imgSrc: require('@/assets/icons/icon_airing.png'), type: 'airing' },
          { title: '一键求助', imgSrc: require('@/assets/icons/icon_help.png'), type: 'help' },
          { title: 'RGB氛围灯', imgSrc: require('@/assets/icons/icon_rgb.png'), type: 'rgb' },
          { title: '手机充电', imgSrc: require('@/assets/icons/icon_usb.png'), type: 'usb' }
        ]
      }
    },
    methods: {
      selectItem(index, type) {
        const oldIns = this.ins
        if (oldIns !== index) {
          this.ins = index
          this.$emit('select', type)
        }
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
    z-index: 99;
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

