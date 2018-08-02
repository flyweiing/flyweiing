<template>
  <div class="video" id="cameraVideo"  ref="cameraVideo" ></div>
</template>


<script>
  export default {
    name: 'Camera',
    mounted() {
      this.cameraInit('cameraVideo', '100%', '100%', '192.168.3.64', '', 'admin', 'admin123')
    },
    methods: {
      cameraInit(cTad, cWidth, cHeight, cIP, cPort, cUsername, cPassword) {
        // 检查插件是否已经安装过
        const iRet = WebVideoCtrl.I_CheckPluginInstall()

        if (iRet === -2) {
          console.log('您的Chrome浏览器版本过高，不支持NPAPI插件')
          return
        } else if (iRet === -1) {
          console.log('您还未安装过插件，请先安装WebComponentsKit.exe安装')
          return
        }

        var oPlugin = {
          iWidth: cWidth,
          iHeight: cHeight
        }

        // 初始化插件参数及插入插件
        WebVideoCtrl.I_InitPlugin(oPlugin.iWidth, oPlugin.iHeight, {
          bWndFull: true,
          iWndowType: 1,
          cbSelWnd: function(xmlDoc) {

          }
        })
        WebVideoCtrl.I_InsertOBJECTPlugin(cTad)

        // 检查插件是否最新
        if (WebVideoCtrl.I_CheckPluginVersion() === -1) {
          console.log('检测到新的插件版本，双击开发包目录里的WebComponentsKit.exe升级！')
          return
        }

        var oLiveView = {
          iProtocol: 1,
          szIP: cIP,
          szPort: cPort || '80',
          szUsername: cUsername,
          szPassword: cPassword,
          iStreamType: 1,
          iChannelID: 1,
          bZeroChannel: false
        }

        // 登录设备
        WebVideoCtrl.I_Login(oLiveView.szIP, oLiveView.iProtocol, oLiveView.szPort, oLiveView.szUsername, oLiveView.szPassword, {
          success: function(xmlDoc) {
            console.log('登录成功！')
            // 开始预览
            WebVideoCtrl.I_StartRealPlay(oLiveView.szIP, {
              iStreamType: oLiveView.iStreamType,
              iChannelID: oLiveView.iChannelID,
              bZeroChannel: oLiveView.bZeroChannel
            })
          },
          error: function() {
            console.log('登录失败！')
          }
        })
      }
    }
  }
</script>

