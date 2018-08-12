<template>
  <div class="light">
    <div class="title">路灯名称：{{ selectedNode.name }}</div>
    <div class="operate-item switch-op">
      <div @click="clickSwitch" class="switch" :class="switchStatus"></div>
      <span class="label">照明开关</span>
    </div>
    <div class="operate-item slider-op">
      <div class="slider">
        <span class="dimming-value">{{ value }}%</span>
        <el-slider
          class="operation-slider"
          v-model="value"
          :show-tooltip="false"
          vertical
          @change="sliderChange">
        </el-slider>
      </div>
      <span class="label">智能调光</span>
    </div>


  </div>
</template>

<script>
import { getSingleControl } from '@/api/light'
import { mapGetters } from 'vuex'

export default {
  name: 'Light',
  data() {
    return {
      switchStatus: 'on',
      value: 50
    }
  },
  computed: {
    ...mapGetters([
      'selectedNode'
    ])
  },
  mounted() {
    console.log(this.selectedNode.name)
  },
  methods: {
    clickSwitch() { // 开关灯操作
      const _this = this
      const vText = (_this.switchStatus === 'on' ? '关灯' : '开灯')
      const vValue = (_this.switchStatus === 'on' ? 0 : 1)
      _this.$confirm('此操作将对【' + _this.selectedNode.name + '】进行' + vText + ', 是否继续?', '提示', {
        confirmButtonText: vText,
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _this._getSingleControl(_this.selectedNode.code, 0, vValue)
      }).catch(() => {
        _this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    },
    sliderChange() { // 调光操作
      const _this = this
      const vValue = _this.value
      this.$confirm('此操作将【' + _this.selectedNode.name + '】的亮度调为' + vValue + '%, 是否继续?', '提示', {
        confirmButtonText: '确认调光',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _this._getSingleControl(_this.selectedNode.code, 1, vValue)
      }).catch(() => {
        _this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    },
    // 单灯请求mode:0表示开关,1表示调光,开关灯时，1表示开，0表示关。调光时，1-100表示调光值
    _getSingleControl(code, mode, value) {
      const _this = this
      getSingleControl(code, mode, value).then((res) => {
        if (res.code === 0) {
          if (mode === 0) { // 开关时更换按钮状态
            if (_this.switchStatus === 'on') {
              _this.switchStatus = 'off'
            } else {
              _this.switchStatus = 'on'
            }
          }
          _this.$message({
            type: 'success',
            message: '命令成功下发!'
          })
        }
      }).catch(error => {
        console.log('error:', error)
      })
    }
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
      background-size: 100% 100%;
      cursor: pointer;
      &.on {
        background-image: url('../../../assets/home/light-1.png');
      }
      &.off {
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
