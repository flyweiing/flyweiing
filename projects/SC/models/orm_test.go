package models

import (
	"fmt"
	"testing"
	"time"
)

func insertTest(t Table) {
	id, err := t.Insert()
	if err != nil {
		Logs().Error(err.Error())
	}
	Logs().Debug(id)
}

func updateTest(t Table) {
	id, err := t.Update()
	if err != nil {
		Logs().Error(err.Error())
	}
	Logs().Debug(id)
}

func deleteTest(t Table) {
	id, err := t.Delete()
	if err != nil {
		Logs().Error(err.Error())
	}
	Logs().Debug(id)
}

func dumpDataTest(t Table) {
	maps, err := t.DumpTable()
	if err != nil {
		Logs().Error(err.Error())
	}
	for _, one := range maps {
		fmt.Printf("User: %v\n", one)
	}
}

func TestOrm(t *testing.T) {
	oneUser := Userinfo{
		Username:   "szzm3",
		Password:   "11111",
		Permission: "normal",
		Listname:   "zhouming",
		Created:    time.Now().Format("2006-01-02 15:04:05"),
	}
	dev := Devtable{
		Listname: "zhouming0",
		Gwname:   "zhouming_fy",
		Gwcode:   "29789",
	}

	gw := Gateway{
		Gwcode:   "26789",
		Nodecode: "139345",
		Nodename: "lamp1",
	}
	strategy1 := Strategy{
		Strategyname: "zhouming",
		Startdate:    time.Now().Format("2006-01-02 15:04:05"),
		Enddate:      time.Now().Format("2006-01-02 15:04:05"),
		Actionlist:   "testAction",
	}

	a := Actions{
		Actionlist: "testAction",
		Time:       "11:00:00",
		Action:     50,
	}

	//insertTest(a)
	updateTest(a)
	dumpDataTest(gw)
	//deleteTest(gw)
	dumpDataTest(dev)
	dumpDataTest(oneUser)
	dumpDataTest(gw)
	dumpDataTest(strategy1)
	dumpDataTest(a)

	a_info, err := GetUserInfo("szzm")
	if err != nil {
		fmt.Println("not found!!")
		return
	}
	fmt.Println(a_info)

	st, err := GetStrategy("zhouming")
	if err != nil {
		fmt.Println("Not found!!")
		return
	}
	fmt.Println(st)

}
