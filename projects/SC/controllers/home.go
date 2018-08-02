// 首页统计
package controllers


type HomeController struct {
	BaseController
}

func (this *HomeController) Prepare() {
	this.headerFile = "include/header.html"
	this.footerFile = "include/footer.html"
	this.layoutFile = "include/layout.html"

	this.PrepareViewData()
}

func (this *HomeController) Home() {
	// name := this.GetSession("name").(string)
	this.CheckLogin()
	this.MyRender("home.html")
}