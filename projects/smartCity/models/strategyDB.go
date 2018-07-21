package models

import (
	"errors"
	// "strconv"

	"github.com/astaxie/beego/orm"
)

type Strategy struct {
	Id           int    `orm:"auto"`
	Strategyname string `orm:"size(100)"`
	Startdate    string `orm:"size(100)"`
	Enddate      string `orm:"size(100)"`
}

type Actions struct {
	Id           int    `orm:"auto"`
	Strategyname string `orm:"size(100)"`
	Time         string `orm:"size(100)"`
	Action       int    `orm:"size(32)"`
}

func (s Strategy) Insert() (int64, error) {

	_, err := s.Vlookup()
	if err == nil {
		return -1, errors.New("strategy  has Exist")
	}

	db := GetUserDb()
	return db.Insert(&s)
}

func (s Strategy) Update() (int64, error) {
	_, err := s.FindById()
	if err != nil {
		return -1, errors.New("strategy has NOT Exist")
	}
	db := GetUserDb()
	return db.Update(&s)

}
func (s Strategy) Delete() (int64, error) {
	_, err := s.FindById()
	if err != nil {
		return -1, errors.New("strategy has NOT Exist")
	}
	db := GetUserDb()
	return db.Delete(&s)

}
func (s Strategy) Find() ([]Tmap, error) {
	var maps []orm.Params
	var uList = []Tmap{}
	db := GetUserDb()
	num, err := db.Raw("SELECT * FROM strategy WHERE strategyname = ?", s.Strategyname).Values(&maps)
	if num <= 0 || err != nil {
		if err != nil {
			return uList, err
		}

		return uList, errors.New("Empty")
	}
	result := generateStratrgy(maps[0])

	uList = append(uList, result)
	return uList, nil

}

func (s Strategy) FindById() ([]Tmap, error) {
	var maps []orm.Params
	var uList = []Tmap{}
	db := GetUserDb()
	num, err := db.Raw("SELECT * FROM strategy WHERE id = ?", s.Id).Values(&maps)
	if num <= 0 || err != nil {
		if err != nil {
			return uList, err
		}

		return uList, errors.New("Empty")
	}
	result := generateStratrgy(maps[0])

	uList = append(uList, result)
	return uList, nil

}

func (s Strategy) Vlookup() (Tmap, error) {
	resultMaps, err := s.Find()
	if err != nil {
		return make(Tmap), err
	}
	return resultMaps[0], nil
}

func (s Strategy) DumpTable() ([]Tmap, error) {
	var maps []orm.Params
	var uList = []Tmap{}
	db := GetUserDb()
	num, err := db.Raw("SELECT * FROM strategy").Values(&maps)
	if num <= 0 || err != nil {
		if err != nil {
			return uList, err
		}
		return uList, errors.New("Empty")
	}

	for _, oneStrategy := range maps {
		result := generateStratrgy(oneStrategy)

		uList = append(uList, result)
	}
	return uList, nil

}

func generateStratrgy(oneStrategy orm.Params) Tmap {
	result := make(Tmap)

	strategyId := oneStrategy["id"]
	if strategyId != nil {
		result["id"] = strategyId.(string)
	}

	strategyName := oneStrategy["strategyname"]
	if strategyName != nil {
		result["strategyname"] = strategyName.(string)
	}

	startDate := oneStrategy["startdate"]
	if startDate != nil {
		result["startdate"] = startDate.(string)
	}

	endDate := oneStrategy["enddate"]
	if endDate != nil {
		result["enddate"] = endDate.(string)
	}

	return result
}

//=====================================
func (action Actions) Insert() (int64, error) {
	_, err := action.Vlookup()
	if err == nil {
		return -1, errors.New("The action has Exist")
	}

	db := GetUserDb()
	return db.Insert(&action)

}

func (action Actions) Update() (int64, error) {
	_, err := action.FindById()
	if err != nil {
		return -1, errors.New("action has NOT Exist")
	}
	db := GetUserDb()
	return db.Update(&action)

}

func (action Actions) Delete() (int64, error) {
	_, err := action.FindById()
	if err != nil {
		return -1, errors.New("action has NOT Exist")
	}
	db := GetUserDb()
	return db.Delete(&action)
}

func (action Actions) Find() ([]Tmap, error) {
	var maps []orm.Params
	var uList = []Tmap{}
	db := GetUserDb()
	num, err := db.Raw("SELECT * FROM actions WHERE strategyname = ?", action.Strategyname).Values(&maps)
	if num <= 0 || err != nil {
		if err != nil {
			return uList, err
		}

		return uList, errors.New("Empty")
	}

	for _, oneAction := range maps {
		result := generateAction(oneAction)

		uList = append(uList, result)
	}

	return uList, nil

}

func (action Actions) FindById() ([]Tmap, error) {
	var maps []orm.Params
	var uList = []Tmap{}
	db := GetUserDb()
	num, err := db.Raw("SELECT * FROM actions WHERE id = ?", action.Id).Values(&maps)
	if num <= 0 || err != nil {
		if err != nil {
			return uList, err
		}

		return uList, errors.New("Empty")
	}

	for _, oneAction := range maps {
		result := generateAction(oneAction)

		uList = append(uList, result)
	}

	return uList, nil

}

func (action Actions) Vlookup() (Tmap, error) {
	var maps []orm.Params
	db := GetUserDb()
	num, err := db.Raw("SELECT * FROM actions WHERE strategyname = ? and time = ?", action.Strategyname, action.Time).Values(&maps)
	if num <= 0 || err != nil {
		if err != nil {
			return make(Tmap), err
		}

		return make(Tmap), errors.New("Empty")
	}

	result := generateAction(maps[0])

	return result, nil
}

func (action Actions) DumpTable() ([]Tmap, error) {
	var maps []orm.Params
	var uList = []Tmap{}
	db := GetUserDb()
	num, err := db.Raw("SELECT * FROM actions").Values(&maps)
	if num <= 0 || err != nil {
		if err != nil {
			return uList, err
		}
		return uList, errors.New("Empty")
	}
	for _, oneAction := range maps {
		result := generateAction(oneAction)

		uList = append(uList, result)
	}

	return uList, nil

}

func generateAction(oneAction orm.Params) Tmap {
	result := make(Tmap)

	actionId := oneAction["id"]
	if actionId != nil {
		result["id"] = actionId.(string)
	}

	strategyname := oneAction["strategyname"]
	if strategyname != nil {
		result["strategyname"] = strategyname.(string)
	}

	time := oneAction["time"]
	if time != nil {
		result["time"] = time.(string)
	}

	action := oneAction["action"]
	if action != nil {
		result["action"] = action.(string)
	}

	return result
}

func GetStrategy(name string) ([]Tmap, error) {
	var maps []orm.Params
	var uList = []Tmap{}

	db := GetUserDb()
	num, err := db.Raw("SELECT * FROM strategy LEFT JOIN actions ON strategy.strategyname = actions.strategyname WHERE strategy.strategyname = ? GROUP BY actions.id;", name).Values(&maps)
	if num <= 0 || err != nil {
		if err != nil {
			return uList, err
		}

		return uList, errors.New("Empty")
	}
	for _, oneAction := range maps {
		result := make(Tmap)

		strategyName := oneAction["strategyname"]
		if strategyName != nil {
			result["strategyname"] = strategyName.(string)
		}

		startDate := oneAction["startdate"]
		if startDate != nil {
			result["startdate"] = startDate.(string)
		}

		endDate := oneAction["enddate"]
		if endDate != nil {
			result["enddate"] = endDate.(string)
		}

		time := oneAction["time"]
		if time != nil {
			result["time"] = time.(string)
		}

		action := oneAction["action"]
		if action != nil {
			result["action"] = action.(string)
		}

		uList = append(uList, result)
	}
	return uList, nil

}
