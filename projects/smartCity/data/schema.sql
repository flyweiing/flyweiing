CREATE TABLE `userinfo` (
	`id` INTEGER PRIMARY KEY AUTOINCREMENT,
	`username` VARCHAR(64) NULL,
    `password` VARCHAR(64) NULL,
    `permission` VARCHAR(64) NULL, 
    `listname` VARCHAR(64) NULL,
    `created` DATE NULL
);

CREATE TABLE `devtable` (
	`id` INTEGER PRIMARY KEY AUTOINCREMENT,
    `listname` VARCHAR(64) NULL,
	`gwcode` VARCHAR(64) NULL,
	`gwname` VARCHAR(64) NULL,
    `gwstrategy` VARCHAR(64) NULL
);

CREATE TABLE `gateway` (
	`id` INTEGER PRIMARY KEY AUTOINCREMENT,
	`gwcode` VARCHAR(64) NULL,
    `nodecode` VARCHAR(64) NULL,
    `nodename` VARCHAR(64) NULL,
    `longitude` VARCHAR(64) NULL,
	`latitude` VARCHAR(64) NULL,
    `nodestrategy` VARCHAR(64) NULL
);

CREATE TABLE `strategy` (
	`id` INTEGER PRIMARY KEY AUTOINCREMENT,
	`strategyname` VARCHAR(64) NULL,
    `startdate` DATE NULL,
    `enddate` DATE NULL
);

CREATE TABLE `actions` (
	`id` INTEGER PRIMARY KEY AUTOINCREMENT,
    `strategyname` VARCHAR(64) NULL,
    `time` VARCHAR(64) NULL,
    `action` INTEGER NULL
);

CREATE TABLE `camera` (
    `id` INTEGER PRIMARY KEY AUTOINCREMENT,
    `cameraname` VARCHAR(64) NULL,
    `nodecode` VARCHAR(64) NULL,
    `cameraip` VARCHAR(64) NULL,
    `username` VARCHAR(64) NULL,
    `password` VARCHAR(64) NULL,
    `port` VARCHAR(64) NULL,
    `listname` INTEGER NULL
);

CREATE TABLE `bulbdata` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `gwcode` VARCHAR(64) NULL,
  `nodecode` VARCHAR(64) NULL,
  `measuredvoltage` VARCHAR(64) NULL,
  `measuredcurrent` VARCHAR(64) NULL,
  `measuredpower` VARCHAR(64) NULL,
  `powerfactor` VARCHAR(64) NULL,
  `lighton` VARCHAR(64) NULL,
  `adjustvalue` VARCHAR(64) NULL
);
