//灯杆管理
package controllers

import (
	"encoding/json"
	"fmt"
	"strconv"
	"strings"
	"path"

	"github.com/astaxie/beego/httplib"
)

type DisplayController struct {
	BaseController
}

func (this *DisplayController) Display() {
	this.Data["imgWidth"] = "128"
	this.Data["imgHeight"] = "256"
	this.Data["imgSrc"] = "unilumin.jpg"
	this.TplName = "display.html"
}


//发送节目
func (this *DisplayController) SendProgram() {
	postUrl := this.GetString("postUrl")
	loadUrl := this.GetString("loadUrl")  //"http://192.168.0.101:8080/display"

	req := httplib.Post(postUrl)
	req.Param("type", "loadUrl")
	req.Param("url", loadUrl)
	req.Param("persistent", "true")

	str, err := req.String()

	if err != nil {
		this.Data["json"] = map[string]string{"code": "503", "msg": err.Error()}
	} else {
		var msg Msg
		json.Unmarshal([]byte(str), &msg) //将json字符串转为json对象
		fmt.Println("message:", msg.Message, " result:", msg.Result)

		this.Data["json"] = map[string]string{"code": "200", "message": msg.Message, "result": strconv.Itoa(msg.Result)}
	}

	this.ServeJSON()
}

func (this *DisplayController) StopProgram() {
	postUrl := this.GetString("postUrl")

	req := httplib.Post(postUrl)
	req.Param("type", "clear")

	str, err := req.String()

	if err != nil {
		this.Data["json"] = map[string]string{"code": "503", "msg": err.Error()}
	} else {
		var msg Msg
		json.Unmarshal([]byte(str), &msg) //将json字符串转为json对象
		fmt.Println("message:", msg.Message, " result:", msg.Result)

		this.Data["json"] = map[string]string{"code": "200", "message": msg.Message, "result": strconv.Itoa(msg.Result)}
	}

	this.ServeJSON()
}

//上传图片
func (this *DisplayController) Upload() {
	//image，这是一个key值，对应的是html中input type-‘file’的name属性值
    f, h, _ := this.GetFile("image")
    //得到文件的名称
    fileName := h.Filename 
    arr := strings.Split(fileName, ":")
    if len(arr) > 1 {   
      index := len(arr) - 1
      fileName = arr[index]
    }
    fmt.Println("文件名称:")
    fmt.Println(fileName)
    //关闭上传的文件，不然的话会出现临时文件不能清除的情况
    f.Close()  
    //保存文件到指定的位置
    //static/uploadfile,这个是文件的地址，第一个static前面不要有/
    this.SaveToFile("image", path.Join("static/display", "unilumin.jpg"))
    fmt.Println("上传成功")
}

