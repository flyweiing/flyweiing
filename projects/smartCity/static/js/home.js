/**
 * 统计页面
 * @date    2017-11-10 14:54:02
 */
require(['jquery', 'common', 'basejs/echarts-all'], function ($, common ) {
	$(function () {
    	$('.nav .home').addClass('active');

    	//在线统计
    	var onlineChart = echarts.init(document.getElementById('online-chart'));

		var onlineOption = {
		    tooltip : {
		        trigger: 'axis'
		    },
		    legend: {
		        data:[
	        	    {
		                name:'在线',
		                textStyle:{color:'#54d72c'}
        			},
        			{
		                name:'离线',
		                textStyle:{color:'#fc5a5a'}
        			}
		        ]
		    },
		    toolbox: {
		        show : true,
		        feature : {
		            dataView : {show: true, readOnly: false},
		            magicType : {show: true, type: ['line', 'bar']},
		            restore : {show: true},
		            saveAsImage : {show: true}
		        }
		    },
		    calculable : true,
		    xAxis : [
		        {
		            type : 'category',
		            data : ['0点','1点','2点','3点','4点','5点','6点','7点','8点','9点','10点','11点','12点','13点','14点','15点','16点','17点','18点','19点','20点','21点','22点','23点']
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value'
		        }
		    ],
		    series : [
		        {
		            name:'在线',
		            type:'bar',
		            itemStyle: {
		            	normal: {
		            		color: "#54d72c"
		            	}
		            },
		            data:[7, 7, 8, 7, 6, 6, 7, 7, 8, 7, 6, 6, 7, 7, 8, 7, 6, 6, 7, 7, 8, 7, 6, 6]
		        },
		        {
		            name:'离线',
		            type:'bar',
		            itemStyle: {
		            	normal: {
		            		color: "#fc5a5a"
		            	}
		            },
		            data:[3, 3 ,2 ,3, 4, 4, 3, 3 ,2 ,3, 4, 4, 3, 3 ,2 ,3, 4, 4, 3, 3 ,2 ,3, 4, 4]
		        }
		    ]
		};

        onlineChart.setOption(onlineOption);

        //巡检维修统计
        var faultChart = echarts.init(document.getElementById('fault-chart'));

		var faultOption = {
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
		    legend: {
		        orient : 'vertical',
		        x : 'left',
		        data:['灯具不亮','灯杆损坏','灯杆被拆','天线损坏','其他']
		    },
		    toolbox: {
		        show : true,
		        orient: 'vertical',
		        x: 'right',
		        feature : {
		            dataView : {show: true, readOnly: false},
		            restore : {show: true},
		            saveAsImage : {show: true}
		        }
		    },
		    calculable : true,
		    series : [
		        {
		            name:'故障类型：',
		            type:'pie',
		            radius : '55%',
		            // center: ['50%', '60%'],
		            data:[
		                {value:1548, name:'灯具不亮'},
		                {value:335, name:'灯杆损坏'},
		                {value:310, name:'灯杆被拆'},
		                {value:234, name:'天线损坏'},
		                {value:135, name:'其他'}
		            ]
		        }
		    ]
		}

		faultChart.setOption(faultOption);

		//控制器在线跟踪
		var gatewayChart = echarts.init(document.getElementById('gateway-chart'));

		var gatewayOption = {
		    tooltip : {
		        trigger: 'axis'
		    },
		    legend: {
		        data:['灯节点功率','集中控制器功率']
		    },
		    toolbox: {
		        show : true,
		        feature : {
		            dataView : {show: true, readOnly: false},
		            restore : {show: true},
		            saveAsImage : {show: true}
		        }
		    },
		    calculable : true,
		    xAxis : [
		        {
		            type : 'category',
		            boundaryGap : false,
		            data : ['0点','1点','2点','3点','4点','5点','6点','7点','8点','9点','10点','11点','12点','13点','14点','15点','16点','17点','18点','19点','20点','21点','22点','23点']
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value'
		        }
		    ],
		    series : [
		        {
		            name:'集中控制器功率',
		            type:'line',
		            smooth:true,
		            itemStyle: {normal: {areaStyle: {type: 'default'}}},
		            data:[10, 10, 20, 10, 10, 10, 20, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 20, 10, 20, 10, 10, 10]
		        },
		        {
		            name:'灯节点功率',
		            type:'line',
		            smooth:true,
		            itemStyle: {normal: {areaStyle: {type: 'default'}}},
		            data:[121, 121, 80, 80, 80, 80, 80, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 80, 80, 80, 121, 121, 121]
		        }
		    ]
		};

		gatewayChart.setOption(gatewayOption);

		//故障分布统计
		var repairChart = echarts.init(document.getElementById('repair-chart'));

		var labelTop = {
		    normal : {
		        label : {
		            show : true,
		            position : 'center',
		            formatter : '{b}',
		            textStyle: {
		                baseline : 'bottom'
		            }
		        },
		        labelLine : {
		            show : false
		        }
		    }
		};
		var labelFromatter = {
		    normal : {
		        label : {
		            formatter : function (params){
		                return 100 - params.value + '%'
		            },
		            textStyle: {
		                baseline : 'top'
		            }
		        }
		    },
		}
		var labelBottom = {
		    normal : {
		        color: '#ccc',
		        label : {
		            show : true,
		            position : 'center'
		        },
		        labelLine : {
		            show : false
		        }
		    },
		    emphasis: {
		        color: 'rgba(0,0,0,0)'
		    }
		};
		var radius = [40, 55];
		var repairOption = {
		    legend: {
		        x : 'center',
		        y : 'top',
		        data:[
		            '控制器故障','灯节点故障','功率故障'
		        ]
		    },
		    toolbox: {
		        show : true,
		        feature : {
		            dataView : {show: true, readOnly: false},
		            restore : {show: true},
		            saveAsImage : {show: true}
		        }
		    },
		    series : [
		        {
		            type : 'pie',
		            center : ['20%', '55%'],
		            radius : radius,
		            x: '10%', // for funnel
		            itemStyle : labelFromatter,
		            data : [
		                {name:'other', value:46, itemStyle : labelBottom},
		                {name:'控制器故障', value:54, itemStyle : labelTop}
		            ]
		        },
		        {
		            type : 'pie',
		            center : ['50%', '55%'],
		            radius : radius,
		            x:'30%', // for funnel
		            itemStyle : labelFromatter,
		            data : [
		                {name:'other', value:56, itemStyle : labelBottom},
		                {name:'灯节点故障', value:44, itemStyle : labelTop}
		            ]
		        },
		        {
		            type : 'pie',
		            center : ['80%', '55%'],
		            radius : radius,
		            x:'50%', // for funnel
		            itemStyle : labelFromatter,
		            data : [
		                {name:'other', value:65, itemStyle : labelBottom},
		                {name:'功率故障', value:35, itemStyle : labelTop}
		            ]
		        }

		    ]                    
		}

		repairChart.setOption(repairOption);

	});
});
