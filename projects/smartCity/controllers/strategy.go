//灯杆管理
package controllers

import (
	"fmt"
	"strconv"
	"smartCity/models"
)

type StrategyController struct {
	BaseController
}

func (this *StrategyController) Prepare() {
	this.headerFile = "include/header.html"
	// this.sidebarFile = "include/strategySidebar.html"
	this.footerFile = "include/footer.html"
	this.layoutFile = "include/layout.html"

	this.PrepareViewData()
}

func (this *StrategyController) Strategy() {
	this.CheckLogin()
	this.MyRender("strategy.html")
}

//获取所有的策略
// @Failure 500 服务器异常
func (this *StrategyController) GetStrategyItems() {
	
	var strTable models.Strategy
 
	strMaps, sErr := strTable.DumpTable()
	fmt.Println("strMaps:", strMaps)

	if sErr != nil {
		this.Data["json"] = map[string]string{"code": "500", "message": "服务器异常！"}
	} else {
		this.Data["json"] = strMaps
	}

	this.ServeJSON()
}

//添加策略
// @Param	stragegyname	query 	string	true		"策略名称"
// @Param	startdate		query 	string	true		"生效时间"
// @Param	enddate			query 	string	true		"失效时间"
// @Failure 500 服务器异常
func (this *StrategyController) AddStrategy() {
	strategyname := this.GetString("strategyname")
	startdate := this.GetString("startdate")
	enddate := this.GetString("enddate")

	var strTable models.Strategy
	strTable.Strategyname = strategyname
	strTable.Startdate = startdate
	strTable.Enddate = enddate

	strMaps, sErr := strTable.Insert()

	if sErr != nil {
		this.Data["json"] = map[string]string{"code": "500", "message": "服务器异常！"}
	} else {
		this.Data["json"] = strMaps
	}

	this.ServeJSON()
}

//修改策略
// @Param	id				query 	int	true			"策略id"
// @Param	stragegyname	query 	string	true		"策略名称"
// @Param	startdate		query 	string	true		"生效时间"
// @Param	enddate			query 	string	true		"失效时间"
// @Failure 500 服务器异常
func (this *StrategyController) UpdateStrategy() {
	strId, _ := strconv.Atoi(this.GetString("id"))
	strategyname := this.GetString("strategyname")
	startdate := this.GetString("startdate")
	enddate := this.GetString("enddate")

	var strTable models.Strategy
	strTable.Id = strId
	strTable.Strategyname = strategyname
	strTable.Startdate = startdate
	strTable.Enddate = enddate

	strMaps, sErr := strTable.Update()

	if sErr != nil {
		this.Data["json"] = map[string]string{"code": "500", "message": "服务器异常！"}
	} else {
		this.Data["json"] = strMaps
	}

	this.ServeJSON()
}

//删除策略
// @Param	id		query 	string	true		"策略id"
// @Failure 500 服务器异常
// @success 200 删除成功
func (this *StrategyController) DeleteStrategy() {
	strId, _ := strconv.Atoi(this.GetString("id"))

	var strTable models.Strategy
	strTable.Id = strId

	_, sErr := strTable.Delete()

	if sErr != nil {
		this.Data["json"] = map[string]string{"code": "500", "message": "服务器异常！"}
	} else {
		this.Data["json"] = map[string]string{"code": "200", "message": "删除成功！"}
	}

	this.ServeJSON()
}

//获取策略下的详情
// @Param	Strategyname		query 	string	true	"策略名称"
// @Failure 500 服务器异常
func (this *StrategyController) GetActionsItems() {
	strategyname := this.GetString("strategyname")

	var actionsTable models.Actions
	actionsTable.Strategyname = strategyname
 
	actionsMaps, aErr := actionsTable.Find()

	if aErr != nil {
		this.Data["json"] = map[string]string{"code": "500", "message": "服务器异常！"}
	} else {
		this.Data["json"] = actionsMaps
	}

	this.ServeJSON()
}

//添加详情
// @Param	stragegyname	query 	string	true		"策略名称"
// @Param	time			query 	string	true		"执行动作时间"
// @Param	action			query 	int		true		"执行动作的亮度"
// @Failure 500 服务器异常
func (this *StrategyController) AddAction() {
	strategyname := this.GetString("strategyname")
	time := this.GetString("time")
	action, _ := strconv.Atoi(this.GetString("action"))

	var actTable models.Actions
	actTable.Strategyname = strategyname
	actTable.Time = time
	actTable.Action = action

	actMaps, aErr := actTable.Insert()

	if aErr != nil {
		this.Data["json"] = map[string]string{"code": "500", "message": "服务器异常！"}
	} else {
		this.Data["json"] = actMaps
	}

	this.ServeJSON()
}

//修改详情
// @Param	id				query 	id  	true		"策略id"
// @Param	stragegyname	query 	string	true		"策略名称"
// @Param	time			query 	string	true		"执行动作时间"
// @Param	action			query 	int		true		"执行动作的亮度"
// @Failure 500 服务器异常
func (this *StrategyController) UpdateAction() {
	actId, _ := strconv.Atoi(this.GetString("id"))
	strategyname := this.GetString("strategyname")
	time := this.GetString("time")
	action, _ := strconv.Atoi(this.GetString("action"))

	var actTable models.Actions
	actTable.Id = actId
	actTable.Strategyname = strategyname
	actTable.Time = time
	actTable.Action = action

	actMaps, aErr := actTable.Update()

	if aErr != nil {
		this.Data["json"] = map[string]string{"code": "500", "message": "服务器异常！"}
	} else {
		this.Data["json"] = actMaps
	}

	this.ServeJSON()
}

//删除详情
// @Param	id	query 	string	true		"详情id"
// @Failure 500 服务器异常
func (this *StrategyController) DeleteAction() {
	actId, _ := strconv.Atoi(this.GetString("id"))

	var actTable models.Actions
	actTable.Id = actId

	_, aErr := actTable.Delete()

	if aErr != nil {
		this.Data["json"] = map[string]string{"code": "500", "message": "服务器异常！"}
	} else {
		this.Data["json"] = map[string]string{"code": "200", "message": "删除成功！"}
	}

	this.ServeJSON()
}