<template>
  <div class="page-chart">
    <div class="page-chart-bottom"></div>
    <div class="chart-wrapper">
      <div class="chart-caption">数据统计</div>
      <div class="chart-content">
        <el-row :gutter="30" class="chart-row">
          <el-col :span="12">
            <div class="chart-item">
              <div id="myChart1" :style="{width: '100%', height: '100%'}"></div>
              <el-date-picker class="my-datepicker1" @change="myDatepicker1Change" format="yyyy-MM-dd"
      value-format="yyyy-MM-dd" type="date" v-model="datapickerValue1" placeholder="选择日期"></el-date-picker>              
            </div>
          </el-col>
          <el-col :span="12">
            <div class="chart-item">
              <div id="myChart2" :style="{width: '100%', height: '100%'}"></div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="30" class="chart-row">
          <el-col :span="12">
            <div class="chart-item">
              <div id="myChart3" :style="{width: '100%', height: '100%'}"></div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="chart-item">
              <div id="myChart4" :style="{width: '100%', height: '100%'}"></div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
  import Echarts from 'echarts'
  import { addZero, dateFormate } from '@/utils/fn'
  import { getOnlineOffline } from '@/api/chart'

  export default {
    name: 'Chart',
    data(){     
      return {  
        datapickerValue1: dateFormate(new Date()),
        chart1:{
          data1: [7,7,10,7,9, 7,9,8,7,9, 8,7,6,7,8, 7,7,10,7,9, 7,9,8,7],
          data2: [3,5,3,5,3, 4,3,5,3,4, 2,4,3,5,4, 3,5,3,5,3, 4,3,5,3]
        }
      }
    },
    mounted(){
      // this.initMyChart1();
      this.myDatepicker1Change(this.datapickerValue1)
      this.initMyChart2();
      this.initMyChart3();
      this.initMyChart4();
    },
    methods: {
      initMyChart1(){
        let _this = this;
        let myChart1 = Echarts.init(document.getElementById('myChart1'))
        myChart1.setOption({
            title: { 
              text: '灯节点在线统计',
              left: 'center',
              top: '10px',
              textStyle: {
                color: '#f0f0f0',
                fontWeight: 'normal',
                fontSize: 16
              }
            },
            legend: {
                left: 'center',
                top: '45px',
                data: ['在线','离线'],
                textStyle: {
                  color: ['#54d72c','#fc5a5a']
                }
            },       
            tooltip: {},
            toolbox: {
                show: true,
                top: '35',
                right: '10',
                itemSize: '20',
                feature: {                    
                    dataView: {
                      show: true,
                      title: '数据视图',
                      iconStyle: {
                        borderColor: '#1669b8'
                      },
                      readOnly: false
                    },
                    magicType: {
                      show: true,
                      title: '折线图',
                      type: ['line'],
                      iconStyle: {
                        borderColor: '#1fad22'//['#1fad22','#370869']
                      }
                    },
                    restore: {
                      iconStyle: {borderColor:'#cf681e'}
                    },
                    saveAsImage: {
                      name: '灯节点在线统计',
                      title: '保存',
                      backgroundColor: '#061a2c',
                      iconStyle: {color:'#125798'}
                    }
                }
            },
            grid:{
                x:80,
                y:100,
                x2:80,
                y2:'15%',
                borderWidth:1
            },
            xAxis: {
                type: 'category',
                data: ['0点','1点','2点','3点','4点','5点','6点','7点','8点','9点','10点','11点','12点','13点','14点','15点','16点','17点','18点','19点','20点','21点','22点','23点'],
                splitLine: {
                  show: true,
                  lineStyle: {
                    color: ['#a7abae']
                  }
                },
                axisLine: {
                  lineStyle: {
                    color: '#a7abae'
                  }
                },
                axisTick: {
                  show: false
                }
                
            },
            yAxis: [
              {              
                axisLine: {
                  lineStyle: {
                    color: '#a7abae'
                  }
                },
                axisTick: {
                  show: false
                }
              },
              {              
                axisLine: {
                  lineStyle: {
                    color: '#a7abae'
                  }
                },
                axisTick: {
                  show: false
                }
              }
            ],
            series: [
              {
                name: '在线',
                type: 'bar',
                data: _this.chart1.data1,
                itemStyle: {
                  color: '#54d72c'
                }
              },
              {
                name: '离线',
                type: 'bar',
                data: _this.chart1.data2,
                itemStyle: {
                  color: '#fc5a5a'
                }
              }
            ]
        });
      },
      initMyChart2(){
        let myChart2 = Echarts.init(document.getElementById('myChart2'))
        myChart2.setOption({
          title: { 
            text: '巡检维修统计',
            left: 'center',
            top: '10px',
            textStyle: {
              color: '#f0f0f0',
              fontWeight: 'normal',
              fontSize: 16
            }
          },
          tooltip : {},
          toolbox: {
              show: true,
              top: '35',
              right: '10',
              itemSize: '20',
              orient: 'vertical',              
              feature: {                    
                  dataView: {
                    show: true,
                    title: '数据视图',
                    iconStyle: {
                      borderColor: '#1669b8'
                    },
                    readOnly: false
                  },
                  // magicType: {
                  //   show: true,
                  //   title: '折线图',
                  //   type: ['line'],
                  //   iconStyle: {
                  //     borderColor: '#1fad22'
                  //   }
                  // },
                  restore: {
                    iconStyle: {borderColor:'#cf681e'}
                  },
                  saveAsImage: {
                    name: '巡检维修统计',
                    title: '保存',
                    backgroundColor: '#061a2c',
                    iconStyle: {color:'#125798'}
                  }
              }
          },
          legend: {
            orient: 'vertical',
              left: '10',
              top: '45px',
              data: ['灯具不亮','灯杆损坏','灯杆被拆','天线损坏','其他'],              
              textStyle: {
                color: ['#54d72c','#fc5a5a']
              }
          },           
          series : [
              {
                  name: '巡检维修统计',
                  type: 'pie',
                  radius : '55%',
                  center: ['50%', '60%'],
                  data:[                      
                      {value:240, name:'灯具不亮',itemStyle: {color:'#ff7f50'}},
                      {value:65, name:'灯杆损坏',itemStyle: {color:'#87cefa'}},
                      {value:40, name:'灯杆被拆',itemStyle: {color:'#da70d6'}},
                      {value:30, name:'天线损坏',itemStyle: {color:'#32cd32'}},
                      {value:10, name:'其他',itemStyle: {color:'#6495ed'}}
                  ],
                  itemStyle: {                    
                      emphasis: {
                          shadowBlur: 10,
                          shadowOffsetX: 0,
                          shadowColor: 'rgba(0, 0, 0, 0.5)'
                      }
                  }
              }
          ]
        });
      },
      initMyChart3(){
        let myChart3 = Echarts.init(document.getElementById('myChart3'))
        myChart3.setOption({
          title: {
            text: '设备瞬时功率（W）',
            left: 'center',
            top: '10px',
            textStyle: {
              color: '#f0f0f0',
              fontWeight: 'normal',
              fontSize: 16
            }
          },
          tooltip : {
              trigger: 'axis',
              axisPointer: {
                  type: 'cross',
                  label: {
                      backgroundColor: '#6a7985'
                  }
              }
          },
          toolbox: {
              show: true,
              top: '35',
              right: '10',
              itemSize: '20',
              feature: {                    
                  dataView: {
                    show: true,
                    title: '数据视图',
                    iconStyle: {
                      borderColor: '#1669b8'
                    },
                    readOnly: false
                  },
                  // magicType: {
                  //   show: true,
                  //   title: '折线图',
                  //   type: ['line'],
                  //   iconStyle: {
                  //     borderColor: '#1fad22'
                  //   }
                  // },
                  restore: {
                    iconStyle: {borderColor:'#cf681e'}
                  },
                  saveAsImage: {
                    name: '设备瞬时功率（W）',
                    title: '保存',
                    backgroundColor: '#061a2c',
                    iconStyle: {color:'#125798'}
                  }
              }
          },
          legend: {              
            left: 'center',
            top: '45px',
            data:['灯节点功率','集中控制器功率'],
            textStyle: {
              color: ['#ff7f50','#87cefa']
            }
          },
          color: ['#ff7f50','#87cefa'],
          grid:{
                x:80,
                y:100,
                x2:80,
                y2:'15%',
                borderWidth:1
          },       
          xAxis: {
              type: 'category',
              boundaryGap : false,
              data: ['0点','1点','2点','3点','4点','5点','6点','7点','8点','9点','10点','11点','12点','13点','14点','15点','16点','17点','18点','19点','20点','21点','22点','23点'],
              splitLine: {
                show: true,
                lineStyle: {
                  color: ['#a7abae']
                }
              },
              axisLine: {
                lineStyle: {
                  color: '#a7abae'
                }
              },
              axisTick: {
                show: false
              }
              
          },
          yAxis : [{
            axisLine: {
              lineStyle: {
                color: '#a7abae'
              }
            },
            axisTick: {
              show: false
            }
          },{
            axisLine: {
              lineStyle: {
                color: '#a7abae'
              }
            },
            axisTick: {
              show: false
            }
          }],
          series : [
              {
                  name:'灯节点功率',
                  type:'line',
                  areaStyle: {normal: {}},
                  data:[118,118,84,86,86, 86,88,12,10,10, 10,10,10,10,10, 10,10,10,86,84, 82,118,118,118],
                  itemStyle: {
                    color: '#ff7f50'
                  }
              },
              {
                  name:'集中控制器功率',
                  type:'line',
                  areaStyle: {normal: {}},
                  data:[15,15,25,15,15, 15,25,14,14,14, 14,14,14,14,14, 14,14,14,25,14, 25,14,14,14],
                  itemStyle: {
                    color: '#87cefa'
                  }
              }
          ]
        });
      },
      initMyChart4(){
        let myChart4 = Echarts.init(document.getElementById('myChart4'))
        myChart4.setOption({
          title: {
            text: '故障分布统计',
            left: 'center',
            top: '10px',
            textStyle: {
              color: '#f0f0f0',
              fontWeight: 'normal',
              fontSize: 16
            }
          },
          tooltip: {
              trigger: 'item',
              formatter: "{b}：{d}%"
          },
          legend: {              
              left: 'center',
              top: '45px',
              data:[
                {name:'控制器故障',textStyle:{color:'#ff7f50'}},
                {name:'灯节点故障',textStyle:{color:'#87cefa'}},
                {name:'功率故障',textStyle:{color:'#da70d6'}}
              ]
          },
          color: ['#ff7f50','#87cefa','#da70d6'],
          toolbox: {
              show: true,
              top: '35',
              right: '10',
              itemSize: '20',
              feature: {                    
                  dataView: {
                    show: true,
                    title: '数据视图',
                    iconStyle: {
                      borderColor: '#1669b8'
                    },
                    readOnly: false
                  },
                  // magicType: {
                  //   show: true,
                  //   title: '折线图',
                  //   type: ['line'],
                  //   iconStyle: {
                  //     borderColor: '#1fad22'
                  //   }
                  // },
                  restore: {
                    iconStyle: {borderColor:'#cf681e'}
                  },
                  saveAsImage: {
                    name: '故障分布统计',
                    title: '保存',
                    backgroundColor: '#061a2c',
                    iconStyle: {color:'#125798'}
                  }
              }
          },
          series: [
              {
                  name:'控制器故障',
                  type:'pie',
                  center : ['20%', '65%'],
                  radius: ['40', '60'],
                  label: {
                      show: true,
                      position: 'center',
                      formatter: function(params){
                        if(params.dataIndex===0){
                          return ''; 
                        } else {
                          return params.name+'\n\n'+params.percent+'%';
                        }
                      }

                  },
                  labelLine: {
                      show: false
                  },
                  data:[                      
                      {value:46, name:'控制器无故障',itemStyle: {color:'#cccccc'}},
                      {value:54, name:'控制器故障',itemStyle: {color:'#ff7f50'}}
                  ]
              },
              {
                  name:'灯节点故障',
                  type:'pie',
                  center : ['50%', '65%'],
                  radius: ['40', '60'],
                  label: {
                      show: true,
                      position: 'center',
                      formatter: function(params){
                        if(params.dataIndex===0){
                          return ''; 
                        } else {
                          return params.name+'\n\n'+params.percent+'%';
                        }
                      }
                  },
                  labelLine: {
                      normal: {
                          show: false
                      }
                  },
                  data:[
                      {value:56, name:'灯节点无故障',itemStyle: {color:'#cccccc'}},
                      {value:44, name:'灯节点故障',itemStyle: {color:'#87cefa'}}                      
                  ]
              },
              {
                  name:'功率故障',
                  type:'pie',
                  center : ['80%', '65%'],
                  radius: ['40', '60'],
                  label: {
                      show: true,
                      position: 'center',
                      formatter: function(params){
                        if(params.dataIndex===0){
                          return ''; 
                        } else {
                          return params.name+'\n\n'+params.percent+'%';
                        }
                      }
                  },
                  labelLine: {
                      normal: {
                          show: false
                      }
                  },
                  data:[
                      {value:65, name:'功率无故障',itemStyle: {color:'#cccccc'}},
                      {value:35, name:'功率故障',itemStyle: {color:'#da70d6'}}                      
                  ]
              }
          ]
        });
      },
      //chart1-改变日历；
      myDatepicker1Change(d){
        let _this = this;        
        getOnlineOffline(d).then((res) => { 
          
          if(res.code===0){
            let chart1 = {
              data1: [],
              data2: []
            };
            let ls_online = res.list[0];
            let ls_offline = res.list[1];
            
            for(let k  in ls_online){
              if(k.charAt(0)==='h'){
                let kk = parseInt(k.trim().slice(1))-1
                chart1.data1[kk] = parseInt(ls_online[k]||0);
              }
            }
            for(let k  in ls_offline){
              if(k.charAt(0)==='h'){
                let kk = parseInt(k.trim().slice(1))-1
                chart1.data2[kk] = parseInt(ls_online[k]||0);
              }
            }
            _this.$set(_this.chart1,'data1',chart1.data1)
            _this.$set(_this.chart1,'data2',chart1.data2)
            _this.initMyChart1();
            console.log(chart1)
          } else {
             _this.$message({
              showClose: true,
              message: res.msg,
              type: 'error'
            });
          } 
        }).catch(error => {
          // console.log('error:',error)
        })
      },
    }
  }
  
</script>

<style lang="scss" scoped src="@/styles/chart.scss"></style>
<style lang="scss">
.el-input--prefix .el-input__inner {
    padding-left: 30px;
    height: 28px;
    line-height: 28px;
    border-radius: 0;
    color: #fff;
    background: rgba(255,255,255,.1);
    border-color: #555;
}
.el-input__icon {
    line-height: 28px;
}
</style>
