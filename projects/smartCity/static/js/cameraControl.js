/**
 * 摄像头控制函数
 * @date    2018-3-15 14:54:02
 */
define(['jquery'], function ($) {
    var g_bPTZAuto = false;

    return {
        /**
         * [cameraInit 初始化摄像头]
         * @param  {[string]} cTad      [视频标签]
         * @param  {[string]} cWidth    [视频标签宽]
         * @param  {[string]} cHeight   [视频标签高]
         * @param  {[string]} cIP       [摄像头IP]
         * @param  {[string]} cPort     [摄像头端口]
         * @param  {[string]} cUsername [摄像头用户名]
         * @param  {[string]} cPassword [摄像头密码]
         */
        cameraInit: function (cTad, cWidth, cHeight, cIP, cPort, cUsername, cPassword) {
                // 检查插件是否已经安装过
                var iRet = WebVideoCtrl.I_CheckPluginInstall();
                if (-2 == iRet) {
                    // alert("您的Chrome浏览器版本过高，不支持NPAPI插件！");
                    console.log("您的Chrome浏览器版本过高，不支持NPAPI插件！");
                    return;
                } else if (-1 == iRet) {
                    alert("您还未安装过插件，请先安装WebComponentsKit.exe安装！");
                    return;
                }

                var oPlugin = {
                    iWidth: cWidth,         // plugin width
                    iHeight: cHeight            // plugin height
                };
                
                // 初始化插件参数及插入插件
                WebVideoCtrl.I_InitPlugin(oPlugin.iWidth, oPlugin.iHeight, {
                    bWndFull: true,//是否支持单窗口双击全屏，默认支持 true:支持 false:不支持
                    iWndowType: 1,
                    cbSelWnd: function (xmlDoc) {
                        
                    }
                });
                WebVideoCtrl.I_InsertOBJECTPlugin(cTad);

                // 检查插件是否最新
                if (-1 == WebVideoCtrl.I_CheckPluginVersion()) {
                    alert("检测到新的插件版本，双击开发包目录里的WebComponentsKit.exe升级！");
                    return;
                }

                var oLiveView = {
                    iProtocol: 1,           // protocol 1：http, 2:https
                    szIP: cIP,   // protocol ip
                    szPort: cPort || "80",           // protocol port
                    szUsername: cUsername,    // device username
                    szPassword: cPassword, // device password
                    iStreamType: 1,         // stream 1：main stream  2：sub-stream  3：third stream  4：transcode stream
                    iChannelID: 1,          // channel no
                    bZeroChannel: false     // zero channel
                };

                // 登录设备
                WebVideoCtrl.I_Login(oLiveView.szIP, oLiveView.iProtocol, oLiveView.szPort, oLiveView.szUsername, oLiveView.szPassword, {
                    success: function (xmlDoc) {
                        console.log("登录成功！");
                        // 开始预览
                        WebVideoCtrl.I_StartRealPlay(oLiveView.szIP, {
                            iStreamType: oLiveView.iStreamType,
                            iChannelID: oLiveView.iChannelID,
                            bZeroChannel: oLiveView.bZeroChannel
                        });
                    },
                    error: function () {
                        console.log('登录失败！')
                    }
                });
            },
            //开始播放
            ClickStartRealPlay: function (szIP) {
                var oWndInfo = WebVideoCtrl.I_GetWindowStatus(),
                    iStreamType = 1,
                    iChannelID = 1,
                    bZeroChannel = false;

                if ("" == szIP) {
                    return;
                }

                if (oWndInfo != null) {// 已经在播放了，先停止
                    WebVideoCtrl.I_Stop();
                }

                var iRet = WebVideoCtrl.I_StartRealPlay(szIP, {
                    iStreamType: iStreamType,
                    iChannelID: iChannelID,
                    bZeroChannel: bZeroChannel
                });

                if (0 == iRet) {
                    console.log("开始预览成功！");
                } else {
                    console.log("开始预览失败！");
                }
            },
            // 停止播放
            ClickStopRealPlay: function () {
                var oWndInfo = WebVideoCtrl.I_GetWindowStatus();

                if (oWndInfo != null) {
                    var iRet = WebVideoCtrl.I_Stop();
                    if (0 == iRet) {
                        console.log("停止预览成功！");
                    } else {
                        console.log("停止预览失败！");
                    }
                }
            },            
            // 退出
            clickLogout: function (szIP) {

                if (szIP == "") {
                    return;
                }

                var iRet = WebVideoCtrl.I_Logout(szIP);
                if (0 == iRet) {
                    console.log("退出成功！");
                } else {
                    console.log("退出失败！");
                }
            },            
            mouseDownPTZControl: function(iPTZIndex, iPTZSpeed){
                // PTZ控制 9为自动，1,2,3,4,5,6,7,8为方向PTZ
                var oWndInfo = WebVideoCtrl.I_GetWindowStatus();
                    
                // if (bZeroChannel) {// 零通道不支持云台
                //  return;
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
            },
            //停止云台转动
            mouseUpPTZControl: function () {
                var oWndInfo = WebVideoCtrl.I_GetWindowStatus();

                if (oWndInfo != null) {
                    WebVideoCtrl.I_PTZControl(1, true, {
                        success: function (xmlDoc) {
                            console.log(oWndInfo.szIP + " 停止云台成功！");
                        },
                        error: function () {
                            console.log(oWndInfo.szIP + " 停止云台失败！");
                        }
                    });
                }
            },
            //调焦+
            PTZZoomIn: function () {
                var oWndInfo = WebVideoCtrl.I_GetWindowStatus();

                if (oWndInfo != null) {
                    WebVideoCtrl.I_PTZControl(10, false, {
                        iWndIndex: '0',
                        success: function (xmlDoc) {
                            console.log(" 调焦+成功！");
                        },
                        error: function () {
                            console.log("  调焦+失败！");
                        }
                    });
                }
            },
            //调焦-
            PTZZoomOut: function () {
                var oWndInfo = WebVideoCtrl.I_GetWindowStatus();

                if (oWndInfo != null) {
                    WebVideoCtrl.I_PTZControl(11, false, {
                        iWndIndex: '0',
                        success: function (xmlDoc) {
                            console.log(" 调焦-成功！");
                        },
                        error: function () {
                            console.log("  调焦-失败！");
                        }
                    });
                }
            },
            //停止调焦
            PTZZoomStop: function () {
                var oWndInfo = WebVideoCtrl.I_GetWindowStatus();

                if (oWndInfo != null) {
                    WebVideoCtrl.I_PTZControl(11, true, {
                        iWndIndex: '0',
                        success: function (xmlDoc) {
                            console.log(" 调焦停止成功！");
                        },
                        error: function () {
                            console.log("  调焦停止失败！");
                        }
                    });
                }
            },
            //聚焦+
            PTZFocusIn: function () {
                var oWndInfo = WebVideoCtrl.I_GetWindowStatus();

                if (oWndInfo != null) {
                    WebVideoCtrl.I_PTZControl(12, false, {
                        iWndIndex: '0',
                        success: function (xmlDoc) {
                            console.log(" 聚焦+成功！");
                        },
                        error: function () {
                            console.log("  聚焦+失败！");
                        }
                    });
                }
            },
            //聚焦-
            PTZFocusOut: function () {
                var oWndInfo = WebVideoCtrl.I_GetWindowStatus();

                if (oWndInfo != null) {
                    WebVideoCtrl.I_PTZControl(13, false, {
                        iWndIndex: '0',
                        success: function (xmlDoc) {
                            console.log(" 聚焦-成功！");
                        },
                        error: function () {
                            console.log("  聚焦-失败！");
                        }
                    });
                }
            },
            //停止聚焦
            PTZFocusStop: function () {
                var oWndInfo = WebVideoCtrl.I_GetWindowStatus();

                if (oWndInfo != null) {
                    WebVideoCtrl.I_PTZControl(12, true, {
                        iWndIndex: '0',
                        success: function (xmlDoc) {
                            console.log(" 聚焦停止成功！");
                        },
                        error: function () {
                            console.log("  聚焦停止失败！");
                        }
                    });
                }
            },
            //光圈+
            PTZIrisIn: function () {
                var oWndInfo = WebVideoCtrl.I_GetWindowStatus();

                if (oWndInfo != null) {
                    WebVideoCtrl.I_PTZControl(14, false, {
                        iWndIndex: '0',
                        success: function (xmlDoc) {
                            console.log(" 光圈+成功！");
                        },
                        error: function () {
                            console.log("  光圈+失败！");
                        }
                    });
                }
            },
            //光圈-
            PTZIrisOut: function () {
                var oWndInfo = WebVideoCtrl.I_GetWindowStatus();

                if (oWndInfo != null) {
                    WebVideoCtrl.I_PTZControl(15, false, {
                        iWndIndex: '0',
                        success: function (xmlDoc) {
                            console.log(" 光圈-成功！");
                        },
                        error: function () {
                            console.log("  光圈-失败！");
                        }
                    });
                }
            },
            //停止调动光圈
            PTZIrisStop: function () {
                var oWndInfo = WebVideoCtrl.I_GetWindowStatus();

                if (oWndInfo != null) {
                    WebVideoCtrl.I_PTZControl(14, true, {
                        iWndIndex: '0',
                        success: function (xmlDoc) {
                            console.log(" 光圈停止成功！");
                        },
                        error: function () {
                            console.log("  光圈停止失败！");
                        }
                    });
                }
            }
        }
});
