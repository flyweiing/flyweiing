package models

import (
	"errors"
	"strconv"
	"time"
)

/*
type User struct {
	Id       string
	Username string
	Password string
	Profile  Profile
}

type Profile struct {
	Gender  string
	Age     int
	Address string
	Email   string
}

var (
	UserList map[string]*User
)
*/

func init() {
	/*
		UserList = make(map[string]*User)
		u := User{"user_11111", "admin", "11111", Profile{"male", 20, "Singapore", "astaxie@gmail.com"}}
		UserList["user_11111"] = &u
	*/
	//db = NewUserDb("models/user.db", true)
}

func AddUser(u Userinfo) string {
	/*
		u.Id = "user_" + strconv.FormatInt(time.Now().UnixNano(), 10)
		UserList[u.Id] = &u

		return u.Id
	*/
	// u.Password = EncryptPasswd(u.Username, u.Password, SALT)
	u.Created = time.Now().Format("2006-01-02 15:04:05")
	id, err := u.Insert()
	if err != nil {
		return ""
	}
	return strconv.FormatInt(id, 10)
}

func GetUser(username string) (u Userinfo, err error) {
	/*
		if u, ok := UserList[uid]; ok {
			return u, nil
		}
		return nil, errors.New("User not exists")
	*/
	var u1 = Userinfo{
		Username: username,
	}
	tmap, err := u1.Vlookup()
	if err != nil {
		return u1, errors.New("User not exists")

	}
	u1.Password = tmap["password"]
	u1.Permission = tmap["permission"]
	u1.Listname = tmap["listname"]
	u1.Created = tmap["created"]
	return u1, nil
}

func GetAllUsers() []Userinfo {
	u := Userinfo{}
	maps, err := u.DumpTable()
	if err != nil {
		return []Userinfo{}
	}
	var uList = []Userinfo{}
	for _, oneUserMap := range maps {
		user := Userinfo{}
		user.Id, _ = strconv.Atoi(oneUserMap["id"])
		user.Username = oneUserMap["username"]
		user.Password = oneUserMap["password"]
		user.Permission = oneUserMap["permission"]
		user.Listname = oneUserMap["listname"]
		user.Created = oneUserMap["created"]

		uList = append(uList, user)
	}
	return uList
}

func UpdateUser(uu Userinfo) (a Userinfo, err error) {
	_, err = uu.Update()
	if err != nil {
		return uu, err
	}
	return GetUser(uu.Username)
}

func Login(username, password string) bool {
	/*
		for _, u := range UserList {
			if u.Username == username && u.Password == password {
				return true
			}
		}
	*/
	u1, err := GetUser(username)
	if err != nil {
		return false
	}

	if u1.Password == password {
		// add encrypt password module.
		// if VerifyPasswd(u1.Password, username, password, SALT) {
		Logd.Debug(username + " login success")
		return true
	}
	return false
}

func DeleteUser(username string) {
	u1 := Userinfo{
		Username: username,
	}

	u1.Delete()
}
