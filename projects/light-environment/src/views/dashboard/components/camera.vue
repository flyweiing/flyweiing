<template>
  <div class="camera">
    <div class="video" ref="cameraVideo" ></div>
  </div>
</template>


<script>
//  import WebVideoCtrl from '@/utils/webVideoCtrl'

export default {
  name: 'Camera',
  computed: {
    init() {
      //const iRet = WebVideoCtrl.I_CheckPluginInstall()
      console.log('123')
    }
  },
  methods: {

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .video {
    width: 300px;
    height: 200px;
  }
</style>

