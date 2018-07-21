package models

import (
	"errors"
	"fmt"

	"github.com/astaxie/beego/orm"
	_ "github.com/mattn/go-sqlite3"
)

type userDb struct {
	UserOrm orm.Ormer
}

type UserDb interface {
	getORM() orm.Ormer
}

type Tmap map[string]string

type Table interface {
	Insert() (int64, error)
	Update() (int64, error)
	Delete() (int64, error)
	Find() ([]Tmap, error)
	Vlookup() (Tmap, error)
	DumpTable() ([]Tmap, error)
}

var singletonInstance UserDb

func (db *userDb) getORM() orm.Ormer {
	return db.UserOrm
}

func GetUserDb() orm.Ormer {
	db := UserDbInstance("data/user.db", true)
	return db.getORM()
}

func UserDbInstance(dbFile string, debugMode bool) UserDb {
	if singletonInstance == nil {
		fmt.Println("New a UserDb:" + dbFile)
		orm.Debug = debugMode
		// register model
		orm.RegisterModel(new(Userinfo))
		orm.RegisterModel(new(Devtable))
		orm.RegisterModel(new(Gateway))
		orm.RegisterModel(new(Strategy))
		orm.RegisterModel(new(Actions))
		orm.RegisterModel(new(Bulbdata))

		// set default database
		err := orm.RegisterDataBase("default", "sqlite3", dbFile)
		if err != nil {
			panic(dbFile + " " + err.Error())
		}
		o := orm.NewOrm()
		singletonInstance = &userDb{
			UserOrm: o,
		}

	}
	return singletonInstance

}

func GetUserInfo(userName string) ([]Tmap, error) {
	var maps []orm.Params
	var uList = []Tmap{}
	user := &Userinfo{
		Username: userName,
	}
	t, err := user.Vlookup()
	if err != nil {
		return uList, err
	}

	db := GetUserDb()
	num, err := db.Raw("SELECT * FROM devtable LEFT JOIN gateway ON devtable.gwcode = gateway.gwcode WHERE listname = ? GROUP BY gateway.id;", t["listname"]).Values(&maps)
	if num <= 0 || err != nil {
		if err != nil {
			return uList, err
		}

		return uList, errors.New("Empty")
	}
	for _, oneMap := range maps {
		result := make(Tmap)
		result["listname"] = t["listname"]

		gwcode := oneMap["gwcode"]
		if gwcode != nil {
			result["gwcode"] = gwcode.(string)
		}

		gwname := oneMap["gwname"]
		if gwname != nil {
			result["gwname"] = gwname.(string)
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

		gwstrategy := oneMap["gwstrategy"]
		if gwstrategy != nil {
			result["gwstrategy"] = gwstrategy.(string)
		}

		nodestrategy := oneMap["nodestrategy"]
		if nodestrategy != nil {
			result["nodestrategy"] = nodestrategy.(string)
		}

		uList = append(uList, result)
	}
	return uList, nil
}
