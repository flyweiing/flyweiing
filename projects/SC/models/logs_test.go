package models

import (
	"testing"
)

func TestLog(t *testing.T) {

	Logs().Debug("Testlog debug")
	Logs().Info("Testlog Info")
	Logs().Warn("Testlog warning...")
	Logs().Error("Testlog Error...")

}
