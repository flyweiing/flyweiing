# Apache HTTP server
> 搭建一个简单的apache服务器

# yum 安装 Apache（Centos）
一、首先在系统上面查询一下是否已经安装了apache 【Apache在linux系统里的名字是httpd】

``` bash

rpm -qa httpd
```

如果有返回的信息，则会显示已经安装的软件。如果没有则不会显示其它的信息。如下图是没有安装的。查询的时候没有显示其它的信息。

二、查询到系统是还没有进行安装的，那么我们打一个命令直接安装就可以了
``` bash

 yum install httpd -y
```

再次运行rpm -qa httpd就有显示了，证明已经安装完成了
如图：
![demo](https://github.com/flyweiing/flyweiing/blob/master/notes/images/apache1.jpg)
![demo](https://github.com/flyweiing/flyweiing/blob/master/notes/images/apache2.jpg)

三、启动apache服务命令

``` bash

# 启动apache服务器
service httpd start

# 停止apache服务器
service httpd stop

# 重启apache服务器
service httpd restart

# 查看apache服务器status
service httpd status

```
![demo](https://github.com/flyweiing/flyweiing/blob/master/notes/images/apache4.png)

四、修改apache配置

``` bash

#配置文件存放位置/etc/httpd/conf/httpd.conf
vim /etc/httpd/conf/httpd.conf
```

修改监听端口（默认是80端口）
![demo](https://github.com/flyweiing/flyweiing/blob/master/notes/images/apache5.jpg)
修改根目录
![demo](https://github.com/flyweiing/flyweiing/blob/master/notes/images/apache3.jpg)

修改重启服务器service httpd restart
