package routers

import (
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/context/param"
)

func init() {

	beego.GlobalControllerRouter["smartCity/controllers:LamppostController"] = append(beego.GlobalControllerRouter["smartCity/controllers:LamppostController"],
		beego.ControllerComments{
			Method: "GetTimelyBulbData",
			Router: `/getTimelyBulbData`,
			AllowHTTPMethods: []string{"get"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["smartCity/controllers:LamppostController"] = append(beego.GlobalControllerRouter["smartCity/controllers:LamppostController"],
		beego.ControllerComments{
			Method: "LampSwitch",
			Router: `/lampSwitch`,
			AllowHTTPMethods: []string{"get"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["smartCity/controllers:LamppostController"] = append(beego.GlobalControllerRouter["smartCity/controllers:LamppostController"],
		beego.ControllerComments{
			Method: "TakeBulbAlarmData",
			Router: `/smartCity/receiveTimelyBulbData`,
			AllowHTTPMethods: []string{"post"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["smartCity/controllers:LamppostController"] = append(beego.GlobalControllerRouter["smartCity/controllers:LamppostController"],
		beego.ControllerComments{
			Method: "ReceiveTimelyBulbData",
			Router: `/smartCity/receiveTimelyBulbData`,
			AllowHTTPMethods: []string{"post"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["smartCity/controllers:LamppostController"] = append(beego.GlobalControllerRouter["smartCity/controllers:LamppostController"],
		beego.ControllerComments{
			Method: "UpdateLightOn",
			Router: `/updateLightOn`,
			AllowHTTPMethods: []string{"get"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["smartCity/controllers:ObjectController"] = append(beego.GlobalControllerRouter["smartCity/controllers:ObjectController"],
		beego.ControllerComments{
			Method: "Post",
			Router: `/`,
			AllowHTTPMethods: []string{"post"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["smartCity/controllers:ObjectController"] = append(beego.GlobalControllerRouter["smartCity/controllers:ObjectController"],
		beego.ControllerComments{
			Method: "GetAll",
			Router: `/`,
			AllowHTTPMethods: []string{"get"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["smartCity/controllers:ObjectController"] = append(beego.GlobalControllerRouter["smartCity/controllers:ObjectController"],
		beego.ControllerComments{
			Method: "Get",
			Router: `/:objectId`,
			AllowHTTPMethods: []string{"get"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["smartCity/controllers:ObjectController"] = append(beego.GlobalControllerRouter["smartCity/controllers:ObjectController"],
		beego.ControllerComments{
			Method: "Put",
			Router: `/:objectId`,
			AllowHTTPMethods: []string{"put"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["smartCity/controllers:ObjectController"] = append(beego.GlobalControllerRouter["smartCity/controllers:ObjectController"],
		beego.ControllerComments{
			Method: "Delete",
			Router: `/:objectId`,
			AllowHTTPMethods: []string{"delete"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["smartCity/controllers:UserController"] = append(beego.GlobalControllerRouter["smartCity/controllers:UserController"],
		beego.ControllerComments{
			Method: "Post",
			Router: `/`,
			AllowHTTPMethods: []string{"post"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["smartCity/controllers:UserController"] = append(beego.GlobalControllerRouter["smartCity/controllers:UserController"],
		beego.ControllerComments{
			Method: "GetAll",
			Router: `/`,
			AllowHTTPMethods: []string{"get"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["smartCity/controllers:UserController"] = append(beego.GlobalControllerRouter["smartCity/controllers:UserController"],
		beego.ControllerComments{
			Method: "Get",
			Router: `/:uid`,
			AllowHTTPMethods: []string{"get"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["smartCity/controllers:UserController"] = append(beego.GlobalControllerRouter["smartCity/controllers:UserController"],
		beego.ControllerComments{
			Method: "Put",
			Router: `/:uid`,
			AllowHTTPMethods: []string{"put"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["smartCity/controllers:UserController"] = append(beego.GlobalControllerRouter["smartCity/controllers:UserController"],
		beego.ControllerComments{
			Method: "Delete",
			Router: `/:uid`,
			AllowHTTPMethods: []string{"delete"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["smartCity/controllers:UserController"] = append(beego.GlobalControllerRouter["smartCity/controllers:UserController"],
		beego.ControllerComments{
			Method: "Login",
			Router: `/login`,
			AllowHTTPMethods: []string{"get"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["smartCity/controllers:UserController"] = append(beego.GlobalControllerRouter["smartCity/controllers:UserController"],
		beego.ControllerComments{
			Method: "Logout",
			Router: `/logout`,
			AllowHTTPMethods: []string{"get"},
			MethodParams: param.Make(),
			Params: nil})

}
