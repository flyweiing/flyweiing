//灯杆管理
package controllers

import (
	"encoding/json"
	"fmt"
	"smartCity/models"
	"strconv"

	"github.com/astaxie/beego"
	"github.com/astaxie/beego/httplib"
)

type LamppostController struct {
	BaseController
}

type Msg struct {
	Message string
	Result  int
}

func (this *LamppostController) Prepare() {
	this.headerFile = "include/header.html"
	// this.sidebarFile = "include/sidebar.html"
	this.footerFile = "include/footer.html"
	this.layoutFile = "include/layout.html"

	this.PrepareViewData()
}

func (this *LamppostController) Lamppost() {
	this.CheckLogin()
	this.MyRender("lamppost.html")
}

//获取当前用户下的网关设备
// @Failure 500 服务器异常
func (this *LamppostController) GetDevItems() {
	listname := this.GetSession("listname").(string)

	var devtable models.Devtable
	devtable.Listname = listname

	devMaps, dErr := devtable.Find()
	// fmt.Println("devMaps:", devMaps, "dErr:", dErr)

	if dErr != nil {
		this.Data["json"] = map[string]string{"code": "500", "message": "服务器异常！"}
	} else {
		this.Data["json"] = devMaps
	}

	this.ServeJSON()
}

//获取网关下灯杆
// @Param	gwcode		query 	string	true		"网关编号"
// @Failure 500 服务器异常
func (this *LamppostController) GetLampByGwcode() {
	gwcode := this.GetString("gwcode")

	var lamptable models.Gateway
	lamptable.Gwcode = gwcode

	lampMaps, lErr := lamptable.Find()
	// fmt.Println("lampMaps:", lampMaps, "lErr:", lErr)

	if lErr != nil {
		this.Data["json"] = map[string]string{"code": "500", "message": "服务器异常！"}
	} else {
		this.Data["json"] = lampMaps
	}

	this.ServeJSON()
}

//获取当前用户下的所有灯杆
func (this *LamppostController) GetAllLamps() {
	username := this.GetSession("name").(string)

	lampsMaps, lErr := models.GetUserInfo(username)
	fmt.Println("lampsMaps:", lampsMaps, "lErr:", lErr)

	if lErr != nil {
		this.Data["json"] = map[string]string{"code": "500", "message": "服务器异常！"}
	} else {
		this.Data["json"] = lampsMaps
	}

	this.ServeJSON()
}

// @单灯控制
// @Param	nodeCode		query 	string	true		"路灯编号"
// @Param	mode			query 	string	true		"控制模式：0：开关灯，1：调节路灯亮度"
// @Param	value			query 	string	true		"控制值 mode(0): 1(开灯), 0(关灯); mode(1): value"
// @Success 200 {string} switch success
// @Failure 403 lamp not exist
// @router /lampSwitch [get]
func (this *LamppostController) LampSwitch() {

	nodeCode, mode, value := this.GetString("nodeCode"), this.GetString("mode"), this.GetString("value")

	req := httplib.Post(beego.AppConfig.String("api_url") + "light/singleControl")
	req.Header("apikey", beego.AppConfig.String("apikey"))
	req.Param("cmdSeq", "11111")
	req.Param("nodeCode", nodeCode)
	req.Param("mode", mode)
	req.Param("value", value)

	str, err := req.String()

	models.Logd.Debug("result: " + str)
	if err != nil {
		models.Logd.Warn(err.Error())
		this.Data["json"] = map[string]string{"code": "503", "msg": err.Error()}
	} else {

		var msg Msg
		json.Unmarshal([]byte(str), &msg) //将json字符串转为json对象
		fmt.Println("message:", msg.Message, " result:", msg.Result)

		this.Data["json"] = map[string]string{"code": "200", "message": msg.Message, "result": strconv.Itoa(msg.Result)}
	}

	this.ServeJSON()
}

// @网关上报故障
// @Param	nodeCode			query 	string	true		"节点类型"
// @Param	alarmType			query 	string	true		"故障类型"
// @Success 1 {string} receive data success
// @router /smartCity/receiveTimelyBulbData [post]
func (this *LamppostController) TakeBulbAlarmData() {
	alarmType, nodeCode := this.GetString("alarmType"), this.GetString("nodeCode")

	models.Logd.Debug("alermType:" + alarmType + " nodeCode:" + nodeCode + "; ")

	this.Data["json"] = map[string]string{"result": "1", "message": "receive data success!", "alarmType": alarmType, "nodeCode": nodeCode}
	this.ServeJSON()
}

// @网关上报采集数据
// @Param	resultJson				query 	string	true		"采集数据"
// @Success 1 {string} receive data success
// @router /smartCity/receiveTimelyBulbData [post]
func (this *LamppostController) ReceiveTimelyBulbData() {
	resultJson := this.GetString("resultJson")

	if resultJson != "" {
		this.Data["json"] = map[string]string{"result": "1", "message": "receive data success!"}
	} else {
		this.Data["json"] = map[string]string{"result": "0", "message": "receive data error!"}
	}

	models.Logd.Debug("resultJson:" + resultJson + "; ")

    resultMap := make(map[string]interface{})
    err := json.Unmarshal([]byte(resultJson), &resultMap)

    if err != nil {
        fmt.Println(err)
    } else {
        data := resultMap["data"]
        fmt.Println(data)
        if v, ok := data.([]interface{})[0].(map[string]interface{}); ok {

			var bulbdata models.Bulbdata

			if v["gwCode"] != nil {
				bulbdata.Gwcode = v["gwCode"].(string)
			}

			if v["nodeCode"] != nil {
				bulbdata.Nodecode = v["nodeCode"].(string)
			}

			if v["measuredVoltage"] != nil {
				bulbdata.Measuredvoltage = v["measuredVoltage"].(string)
			}

			if v["measuredCurrent"] != nil {
				bulbdata.Measuredcurrent = v["measuredCurrent"].(string)
			}

			if v["measuredPower"] != nil {
				bulbdata.Measuredpower = v["measuredPower"].(string)
			}

			if v["powerFactor"] != nil {
				bulbdata.Powerfactor = v["powerFactor"].(string)
			}	

			if v["lightOn"] != nil {
				if v["lightOn"] == true {
					bulbdata.Lighton = "on"
				} else {
					bulbdata.Lighton = "off"
				}
				
			} else {
				bulbdata.Lighton = "off"
			}

			if v["adjustValue"] != nil {
				bulbdata.Adjustvalue = v["adjustValue"].(string)
			} else {
				bulbdata.Adjustvalue = "0.0"
			}

			_, bErr := bulbdata.Update()

			if bErr != nil {
				fmt.Println("Update err:", bErr)
			} else {
				models.Logd.Debug("Update ReceiveTimelyBulbData Success!")
			}

        }
    }

	this.ServeJSON()
}

// @获取设备上报的采集数据
// @Param	nodeCode		query 	string	true		"路灯编号"
// @Success 200 {string} get success
// @router /getTimelyBulbData [get]
func (this *LamppostController) GetTimelyBulbData() {
	nodeCode := this.GetString("nodeCode")

	var bulbdata models.Bulbdata
	bulbdata.Nodecode = nodeCode

	bulbMaps, bErr := bulbdata.Find()

	if bErr != nil {
		this.Data["json"] = map[string]string{"code": "500", "message": "服务器异常！"}
	} else {
		this.Data["json"] = bulbMaps
	}

	this.ServeJSON()
}

// @更新灯具信息
// @Param	nodeCode		query 	string	true		"路灯编号"
// @Param	lightOn			query 	string	true		"开灯状态：on：开灯，off：关灯"
// @Param	adjustValue		query 	string	true		"亮度"
// @Success 200 {string} update success
// @router /updateLightOn [get]
func (this *LamppostController) UpdateLightOn() {
	nodeCode := this.GetString("nodeCode")
	lightOn := this.GetString("lightOn")
	adjustValue := this.GetString("adjustValue")


	var bulbdata models.Bulbdata
	bulbdata.Nodecode = nodeCode
	bulbdata.Lighton = lightOn
	bulbdata.Adjustvalue = adjustValue

	_, bErr := bulbdata.UpdateLightOn()

	if bErr != nil {
		this.Data["json"] = map[string]string{"code": "500", "message": "服务器异常！"}
	} else {
		this.Data["json"] = map[string]string{"code": "200", "message": "receive data success!"}
	}

	this.ServeJSON()
}
