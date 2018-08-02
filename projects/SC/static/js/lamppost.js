/**
 * 灯杆管理
 * @date    2017-11-10 14:54:02
 */

require(['jquery', 'common', 'easyui', 'basejs/xajax', 'basejs/xwindow', 'cameraControl', 'lampView', 'basejs/ajaxfileupload'], 
	function ($, common, ui, xajax, xwindow, camera, lampview) {
	$(function () {
	    $('.nav .lamppost').addClass('active');

	    var lampTips = '【<span style="color:#dc3545"> 如果执行的组、网关或节点已绑定策略；为避免误操作，操作将会在10分钟内恢复策略；如果需要长时间执行，请先禁用策略，再操作。</span>】';
	    
		//获取灯杆列表
	    getlampslist(true);
	    
	    var map = new BMap.Map("container", {mapType: BMAP_SATELLITE_MAP}); 				// 创建地图实例
		var point = new BMap.Point(113.808956,22.688007); 	// 创建点坐标
		map.centerAndZoom(point, 18); 						// 初始化地图，设置中心点坐标和地图级别
		map.enableScrollWheelZoom();   						// 启用滚轮放大缩小，默认禁用
		// map.addControl(new BMap.NavigationControl()); 		// 地图平移缩放控件，左上方
		// map.addControl(new BMap.ScaleControl()); 			// 比例尺控件左下方

		map.addControl(new BMap.MapTypeControl({mapTypes: [BMAP_NORMAL_MAP,BMAP_HYBRID_MAP]}));          //左上角，默认地图控件
		map.addControl(new BMap.OverviewMapControl()); 		// 可折叠的缩略地图，右下方


	    /**
	     * 创建地图标注
	     * @param {[type]} longitude [经度]
	     * @param {[type]} latitude  [纬度]
	     * @param {[type]} index     [第几个标注]
	     */
		function addMarker(longitude, latitude, index, name, code) {

			// 创建图标对象
			var myIcon = new BMap.Icon(
					"http://" + window.location.host + "/static/img/lamp_on.png", 
					new BMap.Size(21, 24), {
								// 指定定位位置。
								// 当标注显示在地图上时，其所指向的地理位置距离图标左上
								// 角各偏移10像素和25像素。您可以看到在本例中该位置即是
								// 图标中央下端的尖角位置。
								offset: new BMap.Size(10, 25),
								// 设置图片偏移。
								// 当您需要从一幅较大的图片中截取某部分作为标注图标时，您
								// 需要指定大图的偏移位置，此做法与 css sprites 技术类似。
								imageOffset: new BMap.Size(0, 0) // 设置图片偏移
					}
			);
			// 创建标注对象并添加到地图
			var marker = new BMap.Marker(new BMap.Point(longitude, latitude), {icon: myIcon});
			map.addOverlay(marker);

			var point = new BMap.Point(longitude, latitude);
			var opts = {
			  width : 0,     // 信息窗口宽度
			  height: 0,     // 信息窗口高度
			  title : name , // 信息窗口标题
			  enableMessage:false,	//设置允许信息窗发送短息
			  enableAutoPan: false
			}
			var infoWindow = new BMap.InfoWindow('路灯编号：' + code + '<br>路灯状态：<span class="green">正常</span>', opts);  // 创建信息窗口对象 
			marker.addEventListener("click", function(){          
				map.openInfoWindow(infoWindow,point); //开启信息窗口
			});

		}

		//获取灯杆列表
	    function getlampslist(first) {
		    xajax('/lamppost/getAllLamps', '' ,
		    	function (data) {
		    		var lampHtml = lampview.getLampItemHtml(data);
		    		$('.list-content').html(lampHtml);
		    		bindlampClick();

		    		//第一次加载的时候在地图上描点
		    		if(first) {
			    		$('.list-item').each(function(index, el) {
					    	var $this = $(this),
					    		longitude = $this.data('longitude'),
					    		latitude = $this.data('latitude'),
					    		name = $this.find('.name').text(),
					    		code = $this.data('code');

					    	addMarker(longitude, latitude, index, name, code);
							// addInfoWindown(longitude, latitude, name);
					    	
					    });
		    		}

		    	}, 
		    	function () {
		    		console.log('error for getAllLamps');
		    	}, 'GET');
	    }

		/**
		 * 请求单灯控制接口
		 * @param  {[type]} data [请求参数]
		 * @return {[type]}      [description]
		 */
		function lampSwitchAjax (data) {
			var mode = data.mode,
				nodeCode = data.nodeCode,
				aValue = data.value;
			xajax(
				'/lamppost/lampSwitch', 
				data,
				function (data) {
					if (!data) {
						common.setTips('error', '操作失败！');
						return;
					}

					if (data.result == 1) {
						var $switch = $('#switch'),
						  	value = $switch.data('value'),
						  	$status = $('.lamp-details .switch-status');

						common.setTips('success', '操作成功！');
						
						//更改开关状态
						if((value == 1 && mode == 0) || (value == 1 && mode == 1)) {
							$switch.removeClass('switch-off').addClass('switch-on').data('value', '0');
							$status.removeClass('red').addClass('green').text('开灯');
							if (mode == 0)
								$("#dimming").slider({value: 80});
						} else if(value == 0 && mode == 0) {
							$switch.removeClass('switch-on').addClass('switch-off').data('value', '1');
							$status.removeClass('green').addClass('red').text('关灯');
							$("#dimming").slider({value: 0});
						}

						var lightStatus = 'on',
							adjustValue = '50';
						if (mode == 0) {
							if (aValue == 0) {
								lightStatus = 'off';
								adjustValue = '0';
							} else {
								lightStatus = 'on';
							}

						} else {
							adjustValue = aValue;
						}

						var updateData = {
							nodeCode : nodeCode,
							lightOn: lightStatus,
							adjustValue: adjustValue
						}

						xajax('/lamppost/updateLightOn', updateData, '', '', 'GET');

					} else if (data.result == 0) {
						common.setTips('error', data.message);
					} else {
						common.setTips('error', '操作失败！');
					}
					
				}, 
				function (data) {
					common.setTips('error', '操作失败！');
					console.log(data);
				}, 
				'GET'
			);
			common.closeWindow('#dialog');
		}

		/**
		 * Ajax获取单灯的开灯状态和亮度等采集数据
		 * @param  {string} nodecode [请求参数]
		 */
		function getTimelyBulbData(nodeCode) {
			xajax(
				'/lamppost/getTimelyBulbData', 
				{nodeCode: nodeCode}, 
				function (data) {
					var bulbData = data[0];

					if (bulbData.lighton === "off") {
						var $switch = $('#switch'),
						  	$status = $('.lamp-details .switch-status');

						$switch.removeClass('switch-on').addClass('switch-off').data('value', '1');
						$status.removeClass('green').addClass('red').text('关灯');
					}

					$("#dimming").slider({value: bulbData.adjustvalue || 50});

				}, 
				function (data) {
					console.log("获取单灯数据失败！");
				}, 
				'GET'
			);
		}

		/**
		 * 标注
		 * @param {[type]} longitude [纬度]
		 * @param {[type]} latitude  [经度]
		 * @param {[type]} info      [表述信息]
		 */
		function addInfoWindown(longitude, latitude, info) {
			var opts = {

		  			position : new BMap.Point(longitude, latitude),    // 指定文本标注所在的地理位置
		  			offset   : new BMap.Size(10, -25)    //设置文本偏移量
				}
			var label = new BMap.Label(info, opts);  // 创建文本标注对象
			label.setStyle({
				 color : "#0C69B8",
				 fontSize : "12px",
				 height : "20px",
				 fontFamily:"微软雅黑",
				 borderColor: "#0C69B8"
			 });
			map.addOverlay(label);
		}

		camera.cameraInit("cameraVideo", "100%", "100%", "192.168.3.64", "", "admin", "admin123");

		// setTimeout(function() {
		// 	camera.ClickStopRealPlay();
		// 	camera.ClickStartRealPlay("192.168.1.65");
		// }, 1000);
		
		

		$('.account-title .fa-close').click(function () {
			$(this).parents('.lamp-account').hide();
		});
		$('.surveillance-title .fa-close').click(function () {
			camera.clickLogout('192.168.3.64');
			$(this).parents('.surveillance').remove();
		});
		$('.control-title .fa-close').click(function () {
			$(this).parents('.resources-control').hide();
		});

		//灯杆列表切换
		$('.img-light').click(function () {
			var $this = $(this);
			
			if(!$this.hasClass('active')) {
				$this.siblings().removeClass('active');
				$this.addClass('active');
			}
			
			getlampslist();			
		});

		//灯控列表点击事件
		function bindlampClick() {
			$('.lamp-item').click(function () {
				var $this =$(this),
					parent = $this.parents('.list-content'),
					name = $this.find('.name').text(),
					status = $this.find('.status').data('status'),
					$resControl = $('.resources-control'),
					lHtml = lampview.getLampHtml(),
					longitude = $this.data('longitude'),
					latitude = $this.data('latitude');

				$this.siblings().removeClass('selected');
				$this.addClass('selected');

				if($resControl.is(':hidden'))
					$resControl.show();

				$('.control-title span').text(name + '--智慧路灯');
				$('.control-box').html(lHtml);
				bindSwitchClick();
				//更换灯杆信息
				$('.lamp-details .name').text(name);

				if(status == 1)
					$('.lamp-details .status').removeClass('red').addClass('green').text('正常');
				else 
					$('.lamp-details .status').removeClass('green').addClass('red').text('故障');

				map.panTo(new BMap.Point(longitude, latitude));	//跳到以该灯杆为中心

				getTimelyBulbData($this.data('code'));		//获取开灯状态和亮度等采集数据

				//智能调光
			    $("#dimming").slider({
					mode: 'h',
					value: 50,
					width: 360,
					min: 0,
					max: 100,
					rule: [ 0, '|', 25, '|', 50, '|', 75, '|', 100 ],
					showTip: true,
					tipFormatter: function(value) {
						return value + '%';
					},
					onComplete: function(value) {
						var lampCode = $('.list-content').find('.selected').data('code');
						
			        	var data = {
			        		nodeCode: lampCode,
			        		mode: 1,
			        		value: (value < 20 ? 20 : value)
			        	}

						xwindow('dialog', '调光提示', '', '', true, '是否将灯光亮度调为<b style="color:#dc3545">' + value + '%</b>' + lampTips, lampSwitchAjax, data);
					}
				}); 

			});
		}


		//开关灯
		function bindSwitchClick() {
			$('#switch').click(function () {
				var mode = $(this).data('mode'),
		    		value = $(this).data('value'),
		    		lampCode = $('.list-content').find('.selected').data('code');

		    	var data = {
		    		nodeCode: lampCode,
		    		mode: mode,
		    		value: value
		    	}

		    	var tips1 = (value == 0 ? "关灯提示" : "开灯提示"),
		    		tips2 = (value == 0 ? '是否确认关灯' : '是否确认开灯');


		    	//开灯提示弹窗
				xwindow('dialog', tips1, '', '', true, tips2 + lampTips, lampSwitchAjax, data);
			});
		}


		//摄像机列表切换
		$('.img-camera').click(function () {
			var $this = $(this);
			
			if(!$this.hasClass('active')) {
				$this.siblings().removeClass('active');
				$this.addClass('active');
			}


			var cameraHtml = lampview.getCameraItemHtml();
	    	$('.list-content').html(cameraHtml);
	    	bindCameraClick();
		});
		//摄像头列表点击事件
		function bindCameraClick() {
			$('.camera-item').click(function () {

				var $this =$(this),
					parent = $this.parents('.list-content'),
					name = $this.find('.name').text(),
					status = $this.find('.status').data('status'),
					$resControl = $('.resources-control'),
					cameraIp = $this.data('ip'),
					cUsername = $this.data('username'),
					cPassword = $this.data('password'),
					cHtml = lampview.getCameraHtml();

				$this.siblings().removeClass('selected');
				$this.addClass('selected');

				if($resControl.is(':hidden'))
					$resControl.show();

				$('.control-title span').text(name + '--摄像机');

				$('.control-box').html(cHtml);
				$('.surveillance-title .fa-close').click();

				camera.cameraInit("cameraControl", "100%", "100%", cameraIp, "", cUsername, cPassword);
				camera.ClickStartRealPlay(cameraIp);
				//转动摄像头
				$(".direction").mousedown(function() {
					var $this = $(this),
						iPTZIndex = $this.data('ptz'),
						iPTZSpeed = $('#ptzspeed').val();  //云台速度;

					camera.mouseDownPTZControl(iPTZIndex, iPTZSpeed);
				});

				$(".direction").mouseup(function() {
					camera.mouseUpPTZControl();
				});

				//调焦-
				$("i.zoomout").mousedown(function() {
					camera.PTZZoomOut();
				});

				$("i.zoomout").mouseup(function() {
					camera.PTZZoomStop();
				});

				//调焦+
				$("i.zoomin").mousedown(function() {
					camera.PTZZoomIn();
				});

				$("i.zoomin").mouseup(function() {
					camera.PTZZoomStop();
				});

				//聚焦-
				$("i.focusout").mousedown(function() {
					camera.PTZFocusOut();
				});

				$("i.focusout").mouseup(function() {
					camera.PTZFocusStop();
				});

				//聚焦+
				$("i.focusin").mousedown(function() {
					camera.PTZFocusIn();
				});

				$("i.focusin").mouseup(function() {
					camera.PTZFocusStop();
				});

				//光圈-
				$("i.irisout").mousedown(function() {
					camera.PTZIrisOut();
				});

				$("i.irisout").mouseup(function() {
					camera.PTZIrisStop();
				});

				//光圈+
				$("i.irisin").mousedown(function() {
					camera.PTZIrisIn();
				});

				$("i.irisin").mouseup(function() {
					camera.PTZIrisStop();
				});

				//暂停、播放
				$('#video-player').click(function () {
					var $this = $(this);
					if($this.hasClass('fa-pause')) {//暂停播放
						camera.ClickStopRealPlay();
						$this.removeClass('fa-pause').addClass('fa-play');
					} else {//开始播放
						camera.ClickStartRealPlay(cameraIp);
						$this.removeClass('fa-play').addClass('fa-pause');
					}
				});

			});
		}

		//LED显示屏列表切换
		$('.img-led').click(function () {
			var $this = $(this);
			
			if(!$this.hasClass('active')) {
				$this.siblings().removeClass('active');
				$this.addClass('active');
			}

			var ledHtml = lampview.getLedItemHtml();
	    	$('.list-content').html(ledHtml);

	    	$('.led-item').click(function () {
				var $this =$(this),
					parent = $this.parents('.list-content'),
					name = $this.find('.name').text(),
					$resControl = $('.resources-control'),
					lHtml = lampview.getLedHtml();

				$this.siblings().removeClass('selected');
				$this.addClass('selected');

				$('.control-box').html("");
				if($resControl.is(':hidden'))
					$resControl.show();

				$('.control-title span').text(name + '--显示屏');
				$('.control-box').html(lHtml);

				bindImgChange();
				//上传图片
				$('#send-program').click(function () {
					var code = $('.list-content').find('.selected').data('code');
					var param = {
						postUrl: "http://localhost:8081/command/" + code,
						loadUrl: "http://192.168.0.101:8080/display"
					}
					// var  $this = $(this);
					$.ajaxFileUpload({
                        url: '/display/upload',
                        secureuri: false,
                        fileElementId: 'input-file',
                        dataType: 'json',
                        data: {'Name': 'unilumin'},
                        success: function (response, status) {
                        	xajax('/display/sendProgram', param, '', '', 'GET');
                        	bindImgChange();
                            console.log(response);
                            console.log(status);
                        },
                        error: function (data, status, code) {
                        	xajax('/display/sendProgram', param, '', '', 'GET');
                        	bindImgChange();
                            console.log(data);
                            console.log(status);
                            console.log(code);
                        }
                    });
                    
				});
				$('#stop-program').click(function () {
					var code = $('.list-content').find('.selected').data('code');
					var param = {
						postUrl: "http://localhost:8081/command/" + code
					}
					xajax('/display/stopProgram', param, 
						function () {
							common.setTips('success', '停止播放成功！');
						}, function () {
							common.setTips('error', '停止播放失败！');
						}, 'GET');
				});

			});
		});

		//绑定图片选择框change事件
        function bindImgChange() {
			$("#input-file").change( function () {
			    var file = this.files[0],
			    	url = null;

			    //建立一個可存取到該file的url	
			    if (window.createObjectURL!=undefined) 
			    { // basic
			      url = window.createObjectURL(file);
			    }
			    else if (window.URL!=undefined) 
			    {
			      // mozilla(firefox)
			      url = window.URL.createObjectURL(file);
			    } 
			    else if (window.webkitURL!=undefined) {
			      // webkit or chrome
			      url = window.webkitURL.createObjectURL(file);
			    }
			    $("#program-img").attr("src", url);
			});
        }

		//WIFI列表切换
		$('.img-wifi').click(function () {
			var $this = $(this);
			
			if(!$this.hasClass('active')) {
				$this.siblings().removeClass('active');
				$this.addClass('active');
			}

			var wHtml = lampview.getWifiItemHtml();
	    	$('.list-content').html(wHtml);

	    	$('.wifi-item').click(function () {
				var $this =$(this),
					parent = $this.parents('.list-content'),
					name = $this.find('.name').text(),
					$resControl = $('.resources-control'),
					wHtml = lampview.getWifiHtml();

				$this.siblings().removeClass('selected');
				$this.addClass('selected');

				$('.control-box').html("");
				if($resControl.is(':hidden'))
					$resControl.show();

				$('.control-title span').text(name + '--wifi');
				$('.control-box').html(wHtml);
			});

		});

		//充电桩列表切换
		$('.img-charger').click(function () {
			var $this = $(this);
			
			if(!$this.hasClass('active')) {
				$this.siblings().removeClass('active');
				$this.addClass('active');
			}

			var cHtml = lampview.getChargerItemHtml();
	    	$('.list-content').html(cHtml);

	    	$('.charger-item').click(function () {
				var $this =$(this),
					parent = $this.parents('.list-content'),
					name = $this.find('.name').text(),
					$resControl = $('.resources-control'),
					cHtml = lampview.getChargerHtml();

				$this.siblings().removeClass('selected');
				$this.addClass('selected');

				$('.control-box').html("");
				if($resControl.is(':hidden'))
					$resControl.show();

				$('.control-title span').text(name + '--充电桩');
				$('.control-box').html(cHtml);
			});


		});

		//语音广播列表切换
		$('.img-airing').click(function () {
			var $this = $(this);

			if(!$this.hasClass('active')) {
				$this.siblings().removeClass('active');
				$this.addClass('active');
			}
				
			var aHtml = lampview.getAiringItemHtml();
	    	$('.list-content').html(aHtml);

	    	$('.airing-item').click(function () {
				var $this =$(this),
					parent = $this.parents('.list-content'),
					name = $this.find('.name').text(),
					$resControl = $('.resources-control'),
					aHtml = lampview.getAiringHtml();

				$this.siblings().removeClass('selected');
				$this.addClass('selected');

				$('.control-box').html("");
				if($resControl.is(':hidden'))
					$resControl.show();

				$('.control-title span').text(name + '--语音广播');
				$('.control-box').html(aHtml);
			});


		});

		//点击资源列表图标跟换图片
		$('.kind-right').click(function () {
			if ($('.img-wifi').attr('data-item') == 1)
				return;

			$('.resources-img').each(function(index, el) {
				var $this = $(this),
				    index = index + 1,
				    curItem = $this.attr('data-item');

				if(curItem == 1) {
					$this.hide();
					$this.attr('data-item', 9);
				} else if(curItem == 7){
					$this.show();
					$this.attr('data-item', curItem - 1);
				} else {
					$this.attr('data-item', curItem - 1);
				}			
			});
		});

		//点击资源列表图标跟换图片
		$('.kind-left').click(function () {
			if ($('.img-light').attr('data-item') == 1)
				return;

			$('.resources-img').each(function(index, el) {
				var $this = $(this),
				    index = index + 1,
				    curItem = parseInt($this.attr('data-item'));

				if(curItem == 9) {
					$this.show();
					$this.attr('data-item', 1);
				} else if(curItem == 6){
					$this.hide();
					$this.attr('data-item', curItem + 1);
				} else {
					$this.attr('data-item', curItem + 1);
				}
			});
		});

		//统计栏目的滚动
		setInterval(function () {
			$('.each-count').each(function(index, el) {
				var $this = $(this),
					distance = parseInt($this.attr('data-left'));

				if (distance == -18) {
					$this.css({
						left: "121%"
					});
					$this.attr('data-left', 121);
				} else {

					$this.css({
						left: (distance - 1) + "%"
					});

					$this.attr('data-left', distance -1);		
				}
			});
		}, 1500);

		//模拟显示屏可视化
		setInterval(function () {
			var $item = $('.program-img'),
				current = parseInt($item.attr('data-value'));

			if (current == 4) {
				$item.attr('data-value', 1);
				$item.attr('src', '../static/img/program1.jpg');
			} else {
				var value = current + 1;
				$item.attr('data-value', value);
				$item.attr('src', '../static/img/program' + value + '.jpg');
			}
			
		}, 10000);
		
	});
});
