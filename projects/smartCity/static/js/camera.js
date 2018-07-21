/**
 * 视频监控
 * @date    2017-11-10 14:54:02
 */
require(['jquery', 'common', 'easyui', 'cameraControl'], function ($, common, ui, camera) {
	$(function () {
    	$('.nav .camera').addClass('active');

		$('.left-menu dl').off("click").bind("click", function () {
	        var $this = $(this),
	        	pMenu = $this.parents('.left-menu'),
	        	cDd = $this.find('dd'),
	        	cIcon = $this.find('.chevron-icon');

		        if (cDd.is(':hidden')) {
		        	pMenu.find('dd').slideUp(200);
		            cDd.slideDown(200);
		            cIcon.removeClass('fa-chevron-right').addClass('fa-chevron-down');
		        }
		        else {
		            cDd.slideUp(200);
		            cIcon.removeClass('fa-chevron-down').addClass('fa-chevron-right');
		        }
	        });

		$('.left-menu dd').off("click").bind("click", function (event) {
		        var $this = $(this),
		        	pMenu = $this.parents('.left-menu');
		 
		        if (!$this.hasClass('active')) {
		        	pMenu.find('dd').removeClass('active');
		        	$this.addClass('active');
		        }

		        event.stopPropagation();
		    });

		camera.cameraInit("cameraVideo", "100%", "500", "192.168.1.88", "", "admin", "admin123");
		




		// PTZ控制 9为自动，1,2,3,4,5,6,7,8为方向PTZ
		var g_bPTZAuto = false;
		function mouseDownPTZControl(iPTZIndex) {
			var oWndInfo = WebVideoCtrl.I_GetWindowStatus(),
				iPTZSpeed = $('#ptzspeed').val();  //云台速度

			// if (bZeroChannel) {// 零通道不支持云台
			// 	return;
			// }
			
			if (oWndInfo != null) {
				if (9 == iPTZIndex && g_bPTZAuto) {
					iPTZSpeed = 0;// 自动开启后，速度置为0可以关闭自动
				} else {
					g_bPTZAuto = false;// 点击其他方向，自动肯定会被关闭
				}

				WebVideoCtrl.I_PTZControl(iPTZIndex, false, {
					iPTZSpeed: iPTZSpeed,
					success: function (xmlDoc) {
						if (9 == iPTZIndex) {
							g_bPTZAuto = !g_bPTZAuto;
						}
						console.log(oWndInfo.szIP + " 开启云台成功！");
					},
					error: function () {
						console.log(oWndInfo.szIP + " 开启云台失败！");
					}
				});
			}
		}

		//转动摄像头
		$(".direction").mousedown(function() {
			var $this = $(this),
				iPTZIndex = $this.data('ptz');

			camera.mouseDownPTZControl(iPTZIndex)
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


		// 关闭浏览器
		$(window).unload(function () {
			WebVideoCtrl.I_Stop();
		});

	});
});
