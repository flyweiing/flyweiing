# Apache HTTP server
> 搭建一个简单的apache服务器

# 首先在系统上面查询一下是否已经安装了apache 【Apache在linux系统里的名字是httpd】

``` bash

rpm -qa httpd
```

如果有返回的信息，则会显示已经安装的软件。如果没有则不会显示其它的信息。如下图是没有安装的。查询的时候没有显示其它的信息。

# 查询到系统是还没有进行安装的，那么我们打一个命令直接安装就可以了
``` bash


 yum install httpd -y
```

再次运行rpm -qa httpd就有显示了，证明已经安装完成了
如图：
![demo](https://github.com/flyweiing/flyweiing/blob/master/notes/images/apache1.jpg)
![demo](https://github.com/flyweiing/flyweiing/blob/master/notes/images/apache2.jpg)
