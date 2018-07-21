// 首页统计
package controllers


type CameraController struct {
	BaseController
}

func (this *CameraController) Prepare() {
	this.headerFile = "include/header.html"
	this.footerFile = "include/footer.html"
	this.layoutFile = "include/layout.html"
	this.sidebarFile = "include/cameraSidebar.html"

	this.PrepareViewData()
}

func (this *CameraController) Camera() {
	this.CheckLogin()
	this.MyRender("camera.html")
}