<template>
  <div class="page-home">
    <div class="page-home-bottom"></div>
    <div class="home-wrapper">
        <!-- bd -->
        <div class="home-bd">
          <span class="bd-lf"></span>
          <span class="bd-rt"></span>
          <div class="bd-caption">智慧灯杆</div>
        </div>
        <!-- home-lf      -->
        <div class="home-lf">
          <div class="lf-pannel">
            <span class="node node-lf"></span>
            <span class="node node-rt"></span>
            <h2 class="lf-caption">照明控制</h2>
            <ul class="lf-cont">
              <li class="pannel">
                <div class="pannel-hd">
                  <div :class="['light-off',lightObj.isOnline===0?'disabled':'']" @click="lightOff"></div>
                  <!-- <img src="@/assets/home/light-1.png" alt="light-1.png"> -->
                </div>
                <p class="pannel-bd">照明开关</p>
              </li>

              <li class="range">
                <div class="pannel-hd">
                  <div class="slider">
                    <span class="dimming-value">{{ value }}%</span>
                    <div class="slider-wrapper">
                      <el-slider
                        class="dimming-slider"
                        v-model="value"
                        :show-tooltip="false"
                        @change = "rangeBlur"
                        vertical>
                      </el-slider>
                    </div>
                    <div class="slider-bt"></div>
                  </div>
                </div>
                <p class="pannel-bd">智能调光</p>
              </li>
            </ul>
          </div>
          <div class="lf-charge">
            <span class="node node-lf"></span>
            <div class="lf-charge-lf">
              <h3>充电桩</h3>
              <img src="@/assets/home/charge-1.png" alt="charge-1.png">
            </div>
            <div class="lf-charge-md">
              <div class="car">
                 <img src="@/assets/home/car-1.png" alt="car-1.png"> 
                <span class="percentage">{{chargePercentage}} %</span>
              </div>
              <p>充电时长：{{chargeTimeTotalFormat}}</p>
            </div>
            <div class="lf-charge-rt">
              <h3>车辆信息：</h3>
              <p>
                汽车型号：比亚迪51 <br>
                车牌：E52654 <br>
                输入电压/电流：90A/220V
              </p>
            </div>
          </div>
          <div class="lf-map">
            <div class="map">
              <amap-home :markers="mapItems" :fromPage="'home'"></amap-home>
            </div>
          </div>
        </div>
        <!-- home-md -->
        <div class="home-md">
          <div class="md-status">
            <h2 class="title">{{lightObj.name}}</h2>
            <p class="subTitle">编号：{{lightObj.code}}</p>
            <table>
              <tr>
                <td>灯杆状态：</td>
                <td>正常</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>照明状态：</td>
                <td>{{lightObj.isOnline===0?'关闭':'开启'}}</td>
                <td>亮度大小：</td>
                <td>{{value}}%</td>
              </tr>
              <tr>
                <td>监控视频：</td>
                <td>正常</td>
                <td>环境传感器：</td>
                <td>正常</td>
              </tr>
              <tr>
                <td>WiFi状态：</td>
                <td>正常</td>
                <td>天气温度：</td>
                <td>36°C</td>
              </tr>
              <tr>
                <td>充电桩状态：</td>
                <td>正常</td>
                <td>温度：</td>
                <td>64%</td>
              </tr>
              <tr>
                <td>信息屏状态：</td>
                <td>正常</td>
                <td>风速：</td>
                <td>东 3米/秒</td>
              </tr>
            </table>
          </div>
          <div class="md-video">
            <div class="md-video-lf"></div>
            <div class="md-video-rt"></div>
            <div class="md-video-wrapper">
              <div class="video"><my-camera></my-camera></div>
            </div>
            <span class="md-video-caption">实时监控</span>
          </div>
        </div>
        <!-- home-rt -->
        <div class="home-rt">
          <div class="rt-show">
            <span class="node node-lf"></span>
            <img class="rt-show-line" src="@/assets/home/line-1.png" alt="light-1.png">
            <div class="rt-show-lf"></div>
            <div class="rt-show-rt"></div>
            <div class="rt-show-pic">
              <img src="@/assets/home/light-2.png" alt="light-2.png">
            </div>
          </div>
          <div class="rt-info">
            <div class="rt-divider"></div>
            <div class="rt-wifi">
              <span class="node node-info"></span>
              <h3 class="rt-wifi-caption">WiFi热点：</h3>
              <img src="@/assets/home/wifi-1.png" alt="wifi-1.png">
              <p><span>型号：</span>TP-LINK TL-WDR6500 </p>
              <p><span>编号：</span>25142</p>
              <p><span>网速：</span>10M/s </p>
            </div>
            <div class="rt-line">
              <img src="@/assets/home/line-2.png" alt="line-2.png">
            </div>
            <div class="rt-poster">
              <span class="node node-lf"></span>
              <span class="node node-rt"></span>
              <h3>LED信息屏</h3>
              <div class="poster"></div>
            </div>
          </div>
        </div>
    </div>

    <!--照明开关提示  -->
    <el-dialog
      title="提示"
      :visible.sync="onoffDialogVisible"
      width="300px"
      center>
      <span>你确定要切换照明开关吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onoffDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeLightOff">确 定</el-button>
      </span>
    </el-dialog>
    <!--智能调光提示  -->
    <el-dialog
      title="提示"
      :visible.sync="rangeDialogVisible"
      width="360px"
      center
      @close="changeRange">
      <span>是否将灯光亮度调为<span class="color-danger">{{value}}%</span>【 <span class="color-danger">如果执行的组、网关或节点已绑定策略；为避免误操作，操作将会在10分钟内恢复策略；如果需要长时间执行，请先禁用策略，再操作。</span>】</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="rangeDialogVisible=false">取 消</el-button>
        <el-button type="primary" @click="closeRangeDialog">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import AmapHome from '@/views/amap/index'
  import MyCamera from '@/components/camera/camera'
  import { getSingleControl, getAllNode } from '@/api/light'

  export default {
    name: 'Home',
    components: {
      AmapHome, //地图；
      MyCamera  //实时监控；（需要在内网环境下）
    },
    data(){
      return {
        lightObj: {
          name: '智慧灯杆 · 樊花',
          code: '8003',
          isOnline: 1 //照明开关；
        },
        onoffDialogVisible: false, //控制照明开关提示框；
        rangeDialogVisible: false, //控制智能调光提示框；
        value: 50,  //调光百分比值；
        valuePrev: 0,  //原调光百分比值；
        rangeAllowed: false,
        chargePercentage: 79, //充电百分比；
        chargeTimeTotal: 240, //充电时长；
        mapItems: []  //地图节点列表；
      }
    },
    computed: {
      //充电时长格式化；
      chargeTimeTotalFormat: function(){
        let total = this.chargeTimeTotal;
        let h = Math.floor(total/3600);
        let m = Math.floor(total%3600/60);
        let s = Math.floor(total%60);
        return addZero(h)+' : '+addZero(m)+' : '+addZero(s);
      }
    },
    created(){
      this.$set(this,'valuePrev',this.value)      
      this._getAllNode(); //地图；

    },
    methods:{
      //点击照明开关-callback；
      lightOff(){
        this.$set(this,'onoffDialogVisible',true)
      },
      //照明开关弹框-确定；
      changeLightOff(){
        // this.$set(this,'lightObj.isOnline',!this.lightObj.isOnline)
        this._lightOnoff(); //照明开关；
        this.$set(this,'onoffDialogVisible',false)
      },
      //智能调光-显示弹框
      rangeBlur(){        
        this.$set(this,'rangeDialogVisible',true)
      },
      //智能调光提示框-确定
      closeRangeDialog(){
        let _this = this;        
        // 请求调光；
        getSingleControl(_this.lightObj.code,1,_this.value).then((res) => {          
          // console.log('res:',res)
          if(res.code===0){
            _this.$set(_this,'rangeAllowed',true)
            _this.$set(_this,'valuePrev',this.value)
            _this.$set(_this,'rangeDialogVisible',false)
          } 
        }).catch(error => {
          // console.log('error:',error)
          _this.$set(this,'rangeDialogVisible',false)
        })
        
      },
      //智能调光-change
      changeRange(){
        if(this.rangeAllowed){
          this.$set(this,'value',this.value)
        }else{
          this.$set(this,'value',this.valuePrev)
        }        
        this.$set(this,'rangeDialogVisible',false)
        this.$set(this,'rangeAllowed',false)
      },
      //照明开关-api；
      _lightOnoff(){
        let _this = this;        
        getSingleControl(_this.lightObj.code,0,_this.lightObj.isOnline).then((res) => {          
          console.log('res:',res)
          if(res.code===0){
            let n = _this.lightObj.isOnline===1 ? 0 : 1;
            _this.$set(_this.lightObj,'isOnline',n)
          } 
        }).catch(error => {
          // console.log('error:',error)
        })
      },
      //地图-api
      _getAllNode() {
        const _this = this
        getAllNode().then(response => {
          const list = response.list;

          let mapItems = [];
          list.forEach((item, index) => {
            const nodeList = item.nodeList
            if (nodeList.length > 0) {
              nodeList.forEach((mItem, mIndex) => {
                const status = mItem.isOnline === 1 ? '' : 'disabled'
                mapItems.push({
                  nodeName: mItem.address,
                  nodeCode: mItem.code,
                  position: [mItem.longitude, mItem.latitude],
                  content: '<div class="mark-item '+status+'"></div>'
                })
              })
            }
          })
          _this.$set(_this,'mapItems',mapItems)
        })
      }

    }
  }
  //个位数补零；
  function addZero(n){
    n = parseInt(n)||0;
    return n>9? ''+n:'0'+n;
  }
</script>

<style lang="scss" scoped src="@/styles/home.scss"></style>

<style lang="scss">
  .color-danger{color: red;}
  .dimming-slider{
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
