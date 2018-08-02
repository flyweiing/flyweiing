package models

import (
	"github.com/deepzz0/logd"
	"os"
)

var Logd *logd.Logger

const LOG_FILE = "logs/smartCityLog.log"

func init() {
	fd, err := os.OpenFile(LOG_FILE, os.O_CREATE|os.O_APPEND|os.O_WRONLY, 0666)
	if err != nil {
		if !os.IsExist(err) {
			err = os.Mkdir("logs", os.ModePerm)
			if err != nil {
				panic(err)
			}
		} else {
			panic(err)
		}
	}
	defer fd.Close()
	Flags := logd.Ldebug | logd.Linfo | logd.Lwarn | logd.Lerror | logd.Lfatal | logd.Ldate | logd.Ltime | logd.Lshortfile | logd.LDaily | logd.LAsync

	Logd = logd.New(logd.LogOption{
		Out:        fd,
		Flag:       Flags,
		LogDir:     "logs",
		ChannelLen: 1000,
	})
	defer Logd.WaitFlush()

}
