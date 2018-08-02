package models

import (
	"errors"
	"github.com/astaxie/beego/orm"
	"strconv"
)

type Userinfo struct {
	Id         int    `orm:"auto"`
	Username   string `orm:"size(100)"`
	Password   string `orm:"size(100)"`
	Permission string `orm:"size(100)"`
	Listname   string `orm:"size(100)"`
	Created    string `orm:"size(100)"`
}

func (info Userinfo) Insert() (int64, error) {

	_, err := info.Vlookup()
	if err == nil {
		return -1, errors.New("User has Exist")
	}

	db := GetUserDb()
	return db.Insert(&info)
}

func (info Userinfo) Update() (int64, error) {
	oldInfo, err := info.Vlookup()
	if err != nil {
		return -1, errors.New("User has NOT Exist")
	}
	info.Id, _ = strconv.Atoi(oldInfo["id"])
	db := GetUserDb()
	return db.Update(&info)
}

func (info Userinfo) Delete() (int64, error) {
	oldInfo, err := info.Vlookup()
	if err != nil {
		return -1, errors.New("User has NOT Exist")
	}
	info.Id, _ = strconv.Atoi(oldInfo["id"])
	db := GetUserDb()
	return db.Delete(&info)
}

func generateUser(oneUserMap orm.Params) Tmap {
	result := make(Tmap)

	id := oneUserMap["id"]
	if id != nil {
		result["id"] = id.(string)
	}

	username := oneUserMap["username"]
	if username != nil {
		result["username"] = username.(string)
	}

	password := oneUserMap["password"]
	if password != nil {
		result["password"] = password.(string)
	}

	permission := oneUserMap["permission"]
	if permission != nil {
		result["permission"] = permission.(string)
	}

	listname := oneUserMap["listname"]
	if listname != nil {
		result["listname"] = listname.(string)
	}

	created := oneUserMap["created"]
	if created != nil {
		result["created"] = created.(string)
	}

	return result

}

// As default, it has only one username in the 'userinfo' table
// And for some logice request, it need to return an ARRAY to deal with defference request.
// Modify by Andy.
func (info Userinfo) Find() ([]Tmap, error) {
	var maps []orm.Params
	var uList = []Tmap{}
	db := GetUserDb()
	num, err := db.Raw("SELECT * FROM userinfo WHERE username = ?", info.Username).Values(&maps)
	if num <= 0 || err != nil {
		if err != nil {
			return uList, err
		}

		return uList, errors.New("Empty")
	}
	result := generateUser(maps[0])

	uList = append(uList, result)
	return uList, nil
}

func (this Userinfo) Vlookup() (Tmap, error) {
	resultMaps, err := this.Find()
	if err != nil {
		return make(Tmap), err
	}
	return resultMaps[0], nil
}

func (info Userinfo) DumpTable() ([]Tmap, error) {
	var maps []orm.Params
	var uList = []Tmap{}
	db := GetUserDb()
	num, err := db.Raw("SELECT * FROM userinfo").Values(&maps)
	if num <= 0 || err != nil {
		if err != nil {
			return uList, err
		}
		return uList, errors.New("Empty")
	}

	for _, oneUserMap := range maps {
		result := generateUser(oneUserMap)

		uList = append(uList, result)
	}
	return uList, nil
}
