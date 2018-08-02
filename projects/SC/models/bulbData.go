package models

import (
	"errors"
	"github.com/astaxie/beego/orm"
	"strconv"
)


type Bulbdata struct {
	Id        			int    `orm:"auto"`
	Gwcode    			string `orm:"size(100)"`
	Nodecode  			string `orm:"size(100)"`
	Measuredvoltage  	string `orm:"size(100)"`
	Measuredcurrent 	string `orm:"size(100)"`
	Measuredpower  		string `orm:"size(100)"`
	Powerfactor  		string `orm:"size(100)"`
	Lighton  			string `orm:"size(100)"`
	Adjustvalue  		string `orm:"size(100)"`
}

func (this Bulbdata) Insert() (int64, error) {

	_, err := this.Vlookup()
	if err == nil {
		return -1, errors.New("bulbdata has Exist")
	}

	db := GetUserDb()
	return db.Insert(&this)
}

func (this Bulbdata) Update() (int64, error) {
	oldDev, err := this.Vlookup()
	if err != nil {
		return -1, errors.New("bulbdata has NOT Exist")
	}
	this.Id, _ = strconv.Atoi(oldDev["id"])
	db := GetUserDb()

	return db.Update(&this)
}

func (this Bulbdata) Delete() (int64, error) {
	oldDev, err := this.Vlookup()
	if err != nil {
		return -1, errors.New("bulbdata has NOT Exist")
	}
	this.Id, _ = strconv.Atoi(oldDev["id"])
	db := GetUserDb()
	return db.Delete(&this)
}

func generateBulbData(oneMap orm.Params) Tmap {
	result := make(Tmap)

	gwid := oneMap["id"]
	if gwid != nil {
		result["id"] = gwid.(string)
	}

	gwcode := oneMap["gwcode"]
	if gwcode != nil {
		result["gwcode"] = gwcode.(string)
	}

	nodecode := oneMap["nodecode"]
	if nodecode != nil {
		result["nodecode"] = nodecode.(string)
	}

	nodename := oneMap["nodename"]
	if nodename != nil {
		result["nodename"] = nodename.(string)
	}

	measuredvoltage := oneMap["measuredvoltage"]
	if measuredvoltage != nil {
		result["measuredvoltage"] = measuredvoltage.(string)
	}

	measuredcurrent := oneMap["measuredcurrent"]
	if measuredcurrent != nil {
		result["measuredcurrent"] = measuredcurrent.(string)
	}

	measuredpower := oneMap["measuredpower"]
	if measuredpower != nil {
		result["measuredpower"] = measuredpower.(string)
	}

	powerfactor := oneMap["powerfactor"]
	if powerfactor != nil {
		result["powerfactor"] = powerfactor.(string)
	}

	lighton := oneMap["lighton"]
	if lighton != nil {
		result["lighton"] = lighton.(string)
	}

	adjustvalue := oneMap["adjustvalue"]
	if adjustvalue != nil {
		result["adjustvalue"] = adjustvalue.(string)
	}		

	return result
}

func (this Bulbdata) Find() ([]Tmap, error) {
	var maps []orm.Params
	var uList = []Tmap{}
	db := GetUserDb()
	num, err := db.Raw("SELECT * FROM bulbdata WHERE nodecode = ?", this.Nodecode).Values(&maps)
	if num <= 0 || err != nil {
		if err != nil {
			return uList, err
		}

		return uList, errors.New("Empty")
	}

	for _, oneMap := range maps {
		result := generateBulbData(oneMap)

		uList = append(uList, result)
	}
	return uList, nil
}

func (this Bulbdata) Vlookup() (Tmap, error) {
	var maps []orm.Params
	db := GetUserDb()
	num, err := db.Raw("SELECT * FROM bulbdata WHERE nodecode = ?", this.Nodecode).Values(&maps)
	if num <= 0 || err != nil {
		if err != nil {
			return make(Tmap), err
		}

		return make(Tmap), errors.New("Empty")
	}
	result := generateBulbData(maps[0])

	return result, nil
}

func (this Bulbdata) DumpTable() ([]Tmap, error) {
	var maps []orm.Params
	var uList = []Tmap{}
	db := GetUserDb()
	num, err := db.Raw("SELECT * FROM bulbdata").Values(&maps)
	if num <= 0 || err != nil {
		if err != nil {
			return uList, err
		}
		return uList, errors.New("Empty")
	}

	for _, oneMap := range maps {
		result := generateBulbData(oneMap)
		uList = append(uList, result)
	}
	return uList, nil
}

func (this Bulbdata) UpdateLightOn() (int64, error) {
	var maps []orm.Params

	_, err := this.Vlookup()
	if err != nil {
		return -1, errors.New("bulbdata has Exist")
	}

	db := GetUserDb()
	num, err := db.Raw("UPDATE bulbdata SET lighton = ?, adjustvalue = ? WHERE nodecode = ?", this.Lighton, this.Adjustvalue, this.Nodecode).Values(&maps)

	return num, err
}
