## 功能介绍

​    系统采用go web [beego](https://beego.me/)架构，运行在服务器平台上。该系统接入洲明IoT网关，用户通过浏览器登录路灯控制系统，实现对路灯的智能控制、显示屏的信息发布、视频监控和环境的实时检测等。

###   主要功能包括：

1. 路灯的智能控制, 如路灯的定时开关和智能调光管理,
2. 广告屏显示内容的控制和播放, 包括字符内容、图片内容、视频内容等;
3. 摄像头实时视频监控;
4. 智慧城市传感设备和资产管理设备的数据采集, 处理, 封装, 以及在系统中的实时显示;

## 部署方法

1.  软件安装包:

   * 根据相应的软件平台，编译好软件安装包;

   * 软件安装包的构成:

     ```
     .
     |-- [4.0K]  conf
     |-- [4.0K]  data
     |-- [ 14M]  smartCity
     |-- [4.0K]  static
     `-- [4.0K]  views
     ```

   * 把软件安装包放在放在服务器上，如 `/home/yourUserName/app/`下

2. 编写smartCity.service文件:

```
[Unit]
Description=smartCity
After=syslog.target
After=network.target
After=mariadb.service mysqld.service postgresql.service memcached.service redis.service

[Service]
# Modify these two values and uncomment them if you have
# repos with lots of files and get an HTTP error 500 because
# of that
###
#LimitMEMLOCK=infinity
#LimitNOFILE=65535
Type=simple
User=yourUserName
Group=yourGroupName
WorkingDirectory=dir_of_your_app
ExecStart=dir_of_your_app/smartCity
Restart=always
Environment=USER=yourUserName HOME=/home/yourUserName

[Install]
WantedBy=multi-user.target
```



3. 把文件放在/etc/systemd/system/下：

```
sudo cp smartCity.service /etc/systemd/system/
```

4. 使能smartCity服务, 开机自动启动:

```
sudo systemctl enable smartCity.service
```

5. 启动smartCity服务:

```
sudo service smartCity start
```

另外，读取该服务的状态:

```
sudo service smartCity status
```

停止服务:

```
sudo service smartCity stop
```

重启服务:

```
sudo service smartCity restart
```

## 注意问题

* 数据库采用sqlite3, 编译和部署时要注意相应环境的安装;

  ​