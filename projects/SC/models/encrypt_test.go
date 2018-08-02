package models

import (
	"fmt"
	"testing"
)

func TestEncrypt(t *testing.T) {
	s := EncryptPasswd("admin", "11111", "unilumin")
	fmt.Println("passwd result:" + s)
}
