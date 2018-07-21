package models

import (
	"errors"
	"github.com/astaxie/beego/orm"
	"strconv"
)

type Devtable struct {
	Id       int    `orm:"auto"`
	Listname string `orm:"size(100)"`
	Gwname   string `orm:"size(100)"`
	Gwcode   string `orm:"size(100)"`
}

func (this Devtable) Insert() (int64, error) {

	_, err := this.Vlookup()
	if err == nil {
		return -1, errors.New("Device has Exist")
	}

	db := GetUserDb()
	return db.Insert(&this)
}

func (this Devtable) Update() (int64, error) {
	oldDev, err := this.Vlookup()
	if err != nil {
		return -1, errors.New("Device has NOT Exist")
	}
	this.Id, _ = strconv.Atoi(oldDev["id"])
	db := GetUserDb()
	return db.Update(&this)
}

func (this Devtable) Delete() (int64, error) {
	oldDev, err := this.Vlookup()
	if err != nil {
		return -1, errors.New("Device has NOT Exist")
	}
	this.Id, _ = strconv.Atoi(oldDev["id"])
	db := GetUserDb()
	return db.Delete(&this)
}

func generateDevice(oneDevice orm.Params) Tmap {
	result := make(Tmap)

	id := oneDevice["id"]
	if id != nil {
		result["id"] = id.(string)
	}

	listname := oneDevice["listname"]
	if listname != nil {
		result["listname"] = listname.(string)
	}

	gwname := oneDevice["gwname"]
	if gwname != nil {
		result["gwname"] = gwname.(string)
	}

	gwcode := oneDevice["gwcode"]
	if gwcode != nil {
		result["gwcode"] = gwcode.(string)
	}

	gwstrategy := oneDevice["gwstrategy"]
	if gwstrategy != nil {
		result["gwstrategy"] = gwstrategy.(string)
	}

	return result
}

func (this Devtable) Find() ([]Tmap, error) {
	var maps []orm.Params
	var uList = []Tmap{}
	db := GetUserDb()
	num, err := db.Raw("SELECT * FROM devtable WHERE listname = ?", this.Listname).Values(&maps)
	if num <= 0 || err != nil {
		if err != nil {
			return uList, err
		}

		return uList, errors.New("Empty")
	}

	for _, oneMap := range maps {
		result := generateDevice(oneMap)

		uList = append(uList, result)
	}
	return uList, nil
}

func (this Devtable) Vlookup() (Tmap, error) {
	var maps []orm.Params
	db := GetUserDb()
	num, err := db.Raw("SELECT * FROM devtable WHERE listname = ? and gwcode = ?", this.Listname, this.Gwcode).Values(&maps)
	if num <= 0 || err != nil {
		if err != nil {
			return make(Tmap), err
		}

		return make(Tmap), errors.New("Empty")
	}

	result := generateDevice(maps[0])

	return result, nil
}

func (this Devtable) DumpTable() ([]Tmap, error) {
	var maps []orm.Params
	var uList = []Tmap{}
	db := GetUserDb()
	num, err := db.Raw("SELECT * FROM devtable").Values(&maps)
	if num <= 0 || err != nil {
		if err != nil {
			return uList, err
		}
		return uList, errors.New("Empty")
	}

	for _, oneMap := range maps {
		result := generateDevice(oneMap)

		uList = append(uList, result)
	}
	return uList, nil
}
