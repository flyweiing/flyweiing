//登录
package controllers


type LoginController struct {
	BaseController
}

func (this *LoginController) Login() {
	this.TplName = "login.html"
}


func (this *LoginController) Logout() {
	this.DelSession("name")
	this.Data["json"] = map[string]string{"code": "200", "msg": "logout success!"}
	this.ServeJSON()
}