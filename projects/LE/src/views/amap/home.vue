<template>
  <div class="amap-home">
    <el-amap class="amap-box" :vid="'amap-vue'"
        :center="center"
        :zoom="zoom"
        :events="events">
        <el-amap-marker 
          v-for="marker in markers" 
          :position="marker.position" 
          :content="marker.content" 
          :events="marker.events">            
        </el-amap-marker>
      
    </el-amap>
  </div>
</template>

<script>
  import Vue from 'vue'
  import VueAMap from 'vue-amap'

  Vue.use(VueAMap)
  VueAMap.initAMapApiLoader({
    key: 'c5100a129665b25518fe4bc9576d79e9',
    plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'MarkerClusterer'],
    v: '1.4.4'
  })

  export default {
    name: 'AmapHome',
    data(){
        let self = this;

        return {
          zoom: 15,
          center: [113.8017550000,22.6820720000],
          markers: [],
          markerRefs: [],
          events: {
            init(o) {
              setTimeout(() => {
                console.log(self.markerRefs);
                let cluster = new AMap.MarkerClusterer(o, self.markerRefs,{
                  gridSize: 20,
                  renderCluserMarker: self._renderCluserMarker
                });
                console.log(cluster);
              }, 1000);
            }
          }
        };
    },
    created(){
        let self = this;
        let markers = [];
        let index = 0;

        let basePosition = self.center;

        while (++index <= 30) {
          markers.push({
            position: [basePosition[0] + 0.001*index*Math.pow(-1,Math.ceil(Math.random()*10)), basePosition[1]+ 0.001*index*Math.pow(-1,Math.ceil(Math.random()*10))],
            content: '<div class="mark-item '+((index%2===0)?'':'disabled')+'"></div>',
            events: {
              init(o) {
                self.markerRefs.push(o);
              }
            }
          });
        }

        this.markers = markers;
    },
    methods: {
        _renderCluserMarker(context) {
          const count = this.markers.length;

          let factor = Math.pow(context.count/count, 1/18)
          let div = document.createElement('div');
          let Hue = 180 - factor* 180;
          let bgColor = 'hsla('+Hue+',100%,50%,0.7)';
          let fontColor = 'hsla('+Hue+',100%,20%,1)';
          let borderColor = 'hsla('+Hue+',100%,40%,1)';
          let shadowColor = 'hsla('+Hue+',100%,50%,1)';
          div.style.backgroundColor = bgColor
          let size = Math.round(30 + Math.pow(context.count/count,1/5) * 20);
          div.style.width = div.style.height = size+'px';
          div.style.border = 'solid 1px '+ borderColor;
          div.style.borderRadius = size/2 + 'px';
          div.style.boxShadow = '0 0 1px '+ shadowColor;
          div.innerHTML = context.count;
          div.style.lineHeight = size+'px';
          div.style.color = fontColor;
          div.style.fontSize = '14px';
          div.style.textAlign = 'center';
          context.marker.setOffset(new AMap.Pixel(-size/2,-size/2));
          context.marker.setContent(div)
        }
      }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .amap-home {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
</style>
<style lang="scss">
  .amap-home{
    .mark-item{
      // background-color: lightpink; 
      margin-top: -16.5px;
      height: 63px; 
      width: 53px;
      background-image: url(../../assets/home/mark-light-1.png);
      background-repeat: no-repeat;
      background-size: cover;
      background-position:center;
      &.disabled{
        background-image: url(../../assets/home/mark-light-2.png);
      }
    }

  }
  
</style>