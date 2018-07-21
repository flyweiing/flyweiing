// @APIVersion 1.0.0
// @Title beego Test API
// @Description beego has a very cool tools to autogenerate documents for your API
// @Contact astaxie@gmail.com
// @TermsOfServiceUrl http://beego.me/
// @License Apache 2.0
// @LicenseUrl http://www.apache.org/licenses/LICENSE-2.0.html
package routers

import (
	"smartCity/controllers"

	"github.com/astaxie/beego"
)

func init() {
	
	//login.controller
	beego.Router("/login", &controllers.LoginController{}, "get:Login")
	beego.Router("/logout", &controllers.LoginController{}, "get:Logout")

	//home.controller
	beego.Router("/", &controllers.HomeController{}, "get:Home")
	beego.Router("/index", &controllers.HomeController{}, "get:Home")
	
	//lamppost.controller
	beego.Router("/lamppost", &controllers.LamppostController{}, "get:Lamppost")										//跳转到灯杆管理页面
	beego.Router("/lamppost/getDevItems", &controllers.LamppostController{}, "get:GetDevItems")  						//获取当前用户下所有网关设备
	beego.Router("/lamppost/getLampByGwcode", &controllers.LamppostController{}, "get:GetLampByGwcode")  				//获取网关下的灯杆
	beego.Router("/lamppost/getAllLamps", &controllers.LamppostController{}, "get:GetAllLamps")  						//获取网关下的灯杆
	beego.Router("/lamppost/lampSwitch", &controllers.LamppostController{}, "get:LampSwitch")							//单灯开关亮度
	beego.Router("/smartCity/takeBulbAlarmData", &controllers.LamppostController{}, "post:TakeBulbAlarmData")     		//网关上报故障
	beego.Router("/smartCity/receiveTimelyBulbData", &controllers.LamppostController{}, "post:ReceiveTimelyBulbData") 	//网关上报采集数据
	beego.Router("/lamppost/getTimelyBulbData", &controllers.LamppostController{}, "get:GetTimelyBulbData") 			//获取设备上报的采集数据
	beego.Router("/lamppost/updateLightOn", &controllers.LamppostController{}, "get:UpdateLightOn") 			//获取设备上报的采集数据

	//stragegy.controller
	beego.Router("/strategy", &controllers.StrategyController{}, "get:Strategy")										//跳转到策略管理页面         								
	beego.Router("/strategy/getStrategyItems", &controllers.StrategyController{}, "get:GetStrategyItems")				//获取所有的策略
	beego.Router("/strategy/addStrategy", &controllers.StrategyController{}, "get:AddStrategy")							//添加策略
	beego.Router("/strategy/updateStrategy", &controllers.StrategyController{}, "get:UpdateStrategy")					//修改策略
	beego.Router("/strategy/deleteStrategy", &controllers.StrategyController{}, "get:DeleteStrategy")					//删除策略
	beego.Router("/strategy/getActionsItems", &controllers.StrategyController{}, "get:GetActionsItems")					//获取某策略下的详情
	beego.Router("/strategy/addAction", &controllers.StrategyController{}, "get:AddAction")								//添加策略详情
	beego.Router("/strategy/updateAction", &controllers.StrategyController{}, "get:UpdateAction")						//修改策略详情
	beego.Router("/strategy/deleteAction", &controllers.StrategyController{}, "get:DeleteAction")						//删除策略详情

	//camera.controller
	beego.Router("/camera", &controllers.CameraController{}, "get:Camera")

	beego.Router("/display", &controllers.DisplayController{}, "get:Display")
	beego.Router("/display/sendProgram", &controllers.DisplayController{}, "get:SendProgram")
	beego.Router("/display/stopProgram", &controllers.DisplayController{}, "get:StopProgram")
	beego.Router("/display/upload", &controllers.DisplayController{}, "post:Upload")


	ns := beego.NewNamespace("/v1",
		beego.NSNamespace("/object",
			beego.NSInclude(
				&controllers.ObjectController{},
			),
		),
		beego.NSNamespace("/user",
			beego.NSInclude(
				&controllers.UserController{},
			),
		),
	)
	beego.AddNamespace(ns)
}
