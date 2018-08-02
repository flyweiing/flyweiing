package models

import (
	"errors"
	"github.com/astaxie/beego/orm"
	"strconv"
)

type Gateway struct {
	Id        int    `orm:"auto"`
	Gwcode    string `orm:"size(100)"`
	Nodecode  string `orm:"size(100)"`
	Nodename  string `orm:"size(100)"`
	Longitude string `orm:"size(100)"`
	Latitude  string `orm:"size(100)"`
}

func (this Gateway) Insert() (int64, error) {

	_, err := this.Vlookup()
	if err == nil {
		return -1, errors.New("gateway has Exist")
	}

	db := GetUserDb()
	return db.Insert(&this)
}

func (this Gateway) Update() (int64, error) {
	oldDev, err := this.Vlookup()
	if err != nil {
		return -1, errors.New("gateway has NOT Exist")
	}
	this.Id, _ = strconv.Atoi(oldDev["id"])
	db := GetUserDb()
	return db.Update(&this)
}

func (this Gateway) Delete() (int64, error) {
	oldDev, err := this.Vlookup()
	if err != nil {
		return -1, errors.New("gateway has NOT Exist")
	}
	this.Id, _ = strconv.Atoi(oldDev["id"])
	db := GetUserDb()
	return db.Delete(&this)
}

func generateGateway(oneMap orm.Params) Tmap {
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

	longittude := oneMap["longitude"]
	if longittude != nil {
		result["longitude"] = longittude.(string)
	}

	latitude := oneMap["latitude"]
	if latitude != nil {
		result["latitude"] = latitude.(string)
	}

	nodestrategy := oneMap["nodestrategy"]
	if nodestrategy != nil {
		result["nodestrategy"] = nodestrategy.(string)
	}
	return result
}

func (this Gateway) Find() ([]Tmap, error) {
	var maps []orm.Params
	var uList = []Tmap{}
	db := GetUserDb()
	num, err := db.Raw("SELECT * FROM gateway WHERE gwcode = ?", this.Gwcode, this.Nodecode).Values(&maps)
	if num <= 0 || err != nil {
		if err != nil {
			return uList, err
		}

		return uList, errors.New("Empty")
	}

	for _, oneMap := range maps {
		result := generateGateway(oneMap)

		uList = append(uList, result)
	}
	return uList, nil
}

func (this Gateway) Vlookup() (Tmap, error) {
	var maps []orm.Params
	db := GetUserDb()
	num, err := db.Raw("SELECT * FROM gateway WHERE gwcode = ? and nodecode = ?", this.Gwcode, this.Nodecode).Values(&maps)
	if num <= 0 || err != nil {
		if err != nil {
			return make(Tmap), err
		}

		return make(Tmap), errors.New("Empty")
	}
	result := generateGateway(maps[0])

	return result, nil
}

func (this Gateway) DumpTable() ([]Tmap, error) {
	var maps []orm.Params
	var uList = []Tmap{}
	db := GetUserDb()
	num, err := db.Raw("SELECT * FROM gateway").Values(&maps)
	if num <= 0 || err != nil {
		if err != nil {
			return uList, err
		}
		return uList, errors.New("Empty")
	}

	for _, oneMap := range maps {
		result := generateGateway(oneMap)
		uList = append(uList, result)
	}
	return uList, nil
}
