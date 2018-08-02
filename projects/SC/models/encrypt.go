package models

import (
	"crypto/md5"
	"fmt"
	"io"
)

// encrypt password
func EncryptPasswd(name, pass, salt string) string {
	salt1 := "%$@w"
	h := md5.New()
	io.WriteString(h, salt1)
	io.WriteString(h, name)
	io.WriteString(h, salt)
	io.WriteString(h, pass)
	return fmt.Sprintf("%x", h.Sum(nil))
}

func VerifyPasswd(passwd, name, pass, salt string) bool {
	return passwd == EncryptPasswd(name, pass, salt)
}
