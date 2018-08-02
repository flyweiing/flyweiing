package controllers

import (
	// "beego_action/helpers"
	// "beego_action/models"
	"fmt"
	"time"

	"github.com/astaxie/beego"
)

type BaseController struct {
	beego.Controller

	layoutFile  string
	headerFile  string
	sidebarFile string
	footerFile  string
	username    string
}

func (this *BaseController) Prepare() {
	fmt.Println("prepare")
	this.PrepareViewData()
}

func (this *BaseController) MyRender(viewFile string) {
	this.Layout = this.layoutFile
	this.TplName = viewFile

	this.LayoutSections = make(map[string]string)
	this.LayoutSections["headerFile"] = this.headerFile
	this.LayoutSections["footerFile"] = this.footerFile
	this.LayoutSections["sidebarFile"] = this.sidebarFile
	this.Data["username"] = this.GetSession("name")
	this.Data["loginTime"] = time.Now().Format("2006年01月02日")
	this.Render()

}

func (this *BaseController) PrepareViewData() {
	staticUrl := beego.AppConfig.String("static_url")
	siteUrl := beego.AppConfig.String("siteUrl")

	this.Data["staticUrl"] = staticUrl
	this.Data["siteUrl"] = siteUrl
}

func (this *BaseController) CheckLogin() bool {
	name := this.GetSession("name")
	if name != nil {
		return true
	} else {
		// this.Redirect(helpers.SiteUrl("login/login"), 302)
		this.Redirect("/login", 302)
		return false
	}
}

// func (this *BaseController) GetSessionUser() models.UserModel {
// 	id := this.GetSession("id")
// 	userInfo := models.UserModel{}
// 	if id != nil {
// 		userModel := &models.UserModel{}
// 		userInfo = userModel.GetUserById(id.(int))
// 	}

// 	fmt.Println(userInfo)
// 	return userInfo
// }
