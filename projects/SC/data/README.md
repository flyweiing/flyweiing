## 数据表
- userinfo
```
CREATE TABLE `userinfo` (
	`id` INTEGER PRIMARY KEY AUTOINCREMENT,
	`username` VARCHAR(64) NULL,
    `password` VARCHAR(64) NULL,
    `permission` VARCHAR(64) NULL, 
    `listname` VARCHAR(64) NULL,
    `created` DATE NULL
);
```
 username: 用户登录名;

 password: 用户登录密码;

 permission: 用户的权限,有supper,normal 等;

 listname: 用户设备列表的名字,用于和表devtable建立关联;

 created: 创建时间 ;

- devtable
```
CREATE TABLE `devtable` (
	`id` INTEGER PRIMARY KEY AUTOINCREMENT,
    `listname` VARCHAR(64) NULL,
	`gwcode` VARCHAR(64) NULL,
	`gwname` VARCHAR(64) NULL,
	`gwstrategy` VARCHAR(64) NULL
);
```
 listname: 用户设备列表的名字,用于和表devtable建立关联;

 gwcode: 网关code, 同一个listname下可以有多个gwcode和gwname

​                 通过gwcode 与表gateway建立关联;

 gwname: 网关名字;

gwstrategy: 网关所用的策略名字，对这个网关下的灯杆起作用；


- gateway
```
CREATE TABLE `gateway` (
	`id` INTEGER PRIMARY KEY AUTOINCREMENT,
	`gwcode` VARCHAR(64) NULL,
    `nodecode` VARCHAR(64) NULL,
	`nodename` VARCHAR(64) NULL,
	`longitude` VARCHAR(64) NULL,
	`latitude` VARCHAR(64) NULL,
	`nodestrategy` VARCHAR(64) NULL
);
```
 gwcode: 网关code;

 nodecode: 单灯节点，gwcode和nodecode决定唯一的一个灯杆;

 nodename: 单灯名字;

 longitude: 单灯经度位置;

 latitude: 单灯纬度位置;

nodestrategy: 这个灯杆的策略名字，在表strategy中查到；

  ***优先级:***nodestrategy > gwstrategy

* strategy

  ```
  CREATE TABLE `strategy` (
  	`id` INTEGER PRIMARY KEY AUTOINCREMENT,
  	`strategyname` VARCHAR(64) NULL,
      `startdate` DATE NULL,
      `enddate` DATE NULL
  );
  ```

strategyname: 策略名字

startdate: 生效时间；

enddate: 失效时间；


* actions

  ```
  CREATE TABLE `actions` (
  	`id` INTEGER PRIMARY KEY AUTOINCREMENT,
      `strategyname` VARCHAR(64) NULL,
      `time` VARCHAR(64) NULL,
      `action` INTEGER NULL
  );
  ```

strategyname: 与表strategy的strategyname对应；

time: 时间点；

action: 亮度值，如 0 表示关灯，100调到最大值。

* bulbdata

  ```
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
  ```

gwcode: 该节点所属网关编码；

nodecode: 该节点通讯编码；

measuredvoltage: 电压;

measuredcurrent: 电流;

measuredpower: 功率;

powerfactor: 功率因素;

lighton: 是否开关灯;

adjustvalue: 调光值;
