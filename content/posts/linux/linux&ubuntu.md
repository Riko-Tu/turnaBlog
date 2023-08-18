---
title: "linux - yum rpm包制作与发布"
date: 2023-08-01T15:06:34+08:00
draft: false
author: "Turan"
tags: [linux]
categories: [linux]
hiddenFromHomePage: false

toc:
    auto: false
---


#### 0. 流程

~~~
1. 下载rpm包制作工具  
2. 把可执行制文件成压缩包
3. 把压缩包制成rpm
4. 将rpm上传的yum源；采取自制yum源方式
~~~

#### 1. 下载rpm包制作工具

- 步骤

~~~txt
1. yum install rpm-build
2. yum install rpmdevtools
3. rpmdev-setuptree    //生成rpm工具的工作区，执行后默认在ROOT下生成rpmbuild目录
~~~

- rpmbuild**目录结构**
{{< image src="/images/linux/build目录结构.jpg" caption="build目录结构" >}}




#### 2. 把可执行制文件成压缩包

- 步骤

~~~txt
1. 进入SOURCES目录
2. 创建一个目录存放**可执行文件**，目录名称与版本号应与spec文件中的对应
3. 将可执行文件放入创建的目录中
4. 将创建的目录打包成压缩包


1. cd /root/rpmbuild/SOURCES       
2. mkdir %{fileName}-%{version}   
3. cp %{fileName} /root/rpmbuild/SOURCES/%{fileName}-%{version}  
4. tar -zcvf %{fileName}-%{version}.tar.gz %{fileName}-%{version} 
~~~

#### 3. 把压缩包制成rpm

- 步骤

~~~txt
1. 进入SPECS目录，创建并编辑spec文件
2. 使用工具构建rpm包


1. touch %{fileName}.spec
2. rpmbuild -bb %{fileName}.spec
~~~

- spec文件详解

```bash
%define __debug_install_post   \
   %{_rpmconfigdir}/find-debuginfo.sh %{?_find_debuginfo_opts} "%{_builddir}/%{?buildsubdir}"\
%{nil}
Name:app
Version:1.0.1
Release:6%{?dist}
Summary:app-1.0.1
Group:Applications/System
License:GPL
Source0:%{name}-%{version}.tar.gz
%description
this is app-1.0.1
%prep
%setup -q
%build
%install
mkdir -p ${RPM_BUILD_ROOT}/usr/bin
cp -f ./%{name} ${RPM_BUILD_ROOT}/usr/bin/
%post
%clean
%files
/usr/bin/%{name}
%defattr(-,root,root,-)
%doc
%changelog
```

- rpmbuild 构建详解
{{< image src="/images/linux/rpmbuild构建详解.jpg" caption="rpmbuild构建详解" >}}




+ 找到RPM文件：
```bash
[root@localhost ~]# ll rpmbuild/RPMS/x86_64/
total 476
-rw-r--r--. 1 root root 485768 Sep 16 20:14 main-v0.0.1-1.el7.x86_64.rpm
```

- 测试安装:

~~~txt
 rpm -ivh  rpmbuild/RPMS/x86_64/main-v0.0.1-1.el7.x86_64.rpm 
~~~



- 远程安装：

~~~
[test_base]
name=test_base_res
baseurl=ftp://47.94.170.239/pub/base
gpgcheck=0
~~~





#### 4. 将rpm上传的yum源

- 步骤

~~~txt
1. 安装并启动ftp服务;安装本地仓库搭建工具createrepo
2. 在ftp目录下，创建本地yum仓库
3. 编写yum源配置


1. yum install vsftpd && service vsftpd restart
2. cd /var/ftp/pub && mkdir base && createrepo ./base 
~~~

- 编写yum源配置    

~~~txt
[test_base]
name=test_base_res
baseurl=ftp://47.94.170.239/pub/base/
gpgcheck=0
enabled=1


[test_epel]
name=test_epel_res
baseurl=ftp://47.94.170.239/pub/epel
gpgcheck=0
enabled=1
~~~



#### 5. 扩展功能

- 软件名重复



- 自动更新



- 手动更新







# ubuntu

###### 1. ubuntu20.04开启SSH远程登录
默认情况下，首次安装Ubuntu时，不允许通过SSH进行远程访问。以root 用户或具有sudo特权的用户执行以下步骤，以在Ubuntu系统上安装并启用SSH：
1. 打开终端并安装openssh-server软件包
sudo apt update
sudo apt install openssh-server
出现提示时，输入密码，然后按Enter继续安装。
安装完成后，SSH服务将自动启动。您可以通过键入以下命令来验证SSH是否正在运行：
sudo systemctl status ssh
输出应告诉您该服务正在运行，并已启用以在系统引导时启动：
● ssh.service - OpenBSD Secure Shell server
   Loaded: loaded (/lib/systemd/system/ssh.service; enabled; vendor preset: enabled)
   Active: active (running) since Sat 2022-09-17 05:47:27 UTC; 3h 2min ago
    Process: 1710 ExecStartPre=/usr/sbin/sshd -t (code=exited, status=0/SUCCESS)
 Main PID: 1721 (sshd)
    Tasks: 1 (limit: 4625)
   CGroup: /system.slice/ssh.service
           └─1721 /usr/sbin/sshd -D
如果运行状态不为active(running)，需要手动开启，命令为：
/etc/init.d/ssh start

2. 修改SSH登录配置
sudo gedit /etc/ssh/sshd_config
将PermitRootLogin prohibit-password那一行修改为PermitRootLogin yes，去掉前面的#号
将port 22前面的#去掉


### 制作deb
1. 在任意目录下创建如上所示的目录以及文件,eg:

  ~~~
  mkdir -p /root/mydeb                   # 在该目录下存放生成deb包的文件以及目录
  mkdir -p /root/mydeb/DEBIAN            # 目录名必须大写
  mkdir -p /root/mydeb/usr/bin             # 指定将文件安装到根目录的/boot目录下
  touch /root/mydeb/DEBIAN/control       # 必须要有该文件
  touch /root/mydeb/DEBIAN/postinst      # 软件安装完后，执行该Shell脚本
  touch /root/mydeb/DEBIAN/postrm        # 软件卸载后,执行该Shell脚本
  
  mkdir -p /root/mydeb &&  mkdir /root/mydeb/DEBIAN  &&  mkdir  /root/mydeb/usr/bin && touch /root/mydeb/DEBIAN/control && touch /root/mydeb/DEBIAN/postinst && touch/root/mydeb/DEBIAN/postrm  
  ~~~

  

  

2. control文件内容：

  ~~~
  Package: my-deb            （软件名称，中间不能有空格）
  Version: 1                  (软件版本)
  Section: utils             （软件类别）
  Priority: optional         （软件对于系统的重要程度）
  Architecture: amd64        （软件所支持的平台架构）
  Maintainer: xxxxxx <>      （打包人和联系方式）
  Description: my first deb  （对软件所的描述）
  ~~~

1. postinst文件内容（ 软件安装完后，执行该Shell脚本，一般用来配置软件执行环境，必须以“#!/bin/sh”为首行，然后给该脚本赋予可执行权限：chmod +x postinst）：

  ~~~
  #!/bin/sh
  chmod +x main
  echo "my deb" > /root/mydeb.log
  ~~~

  

2. postrm文件内容（ 软件卸载后，执行该Shell脚本，一般作为清理收尾工作，必
  须以“#!/bin/sh”为首行，然后给该脚本赋予可执行权限：chmod +x postrm）：

  ~~~
  #!/bin/sh
  rm -rf /root/mydeb.log
  ~~~

3. 给mydeb目录打包：
  dpkg -b   mydeb   mydeb-1.deb  (第一个参数为将要打包的目录名，第二个参数为生成包的名称。)
```bash
root@u1804:~# dpkg -b mydeb mydeb-amd64-0.0.2.deb
dpkg-deb: building package 'main-amd64' in 'mydeb-amd64-0.0.2.deb'.
```

6. 安装deb包：
dpkg -i   mydeb-1.deb      
将initrd-vstools.img复制到/boot目录下后，执行postinst，
postinst脚本在/root目录下生成一个含有"my deb"字符的mydeb.log文件
```bash
root@u1804:~# dpkg -i mydeb-amd64-0.0.2.deb 
Selecting previously unselected package main-amd64.
(Reading database ... 67385 files and directories currently installed.)
Preparing to unpack mydeb-amd64-0.0.2.deb ...
Unpacking main-amd64 (0.0.2) ...
Setting up main-amd64 (0.0.2) ...
```

7. 卸载deb包：
dpkg -r   my-deb      
这里要卸载的包名为control文件Package字段所定义的 my-deb 。
将/boot目录下initrd-vstools.img删除后，执行posrm，
postrm脚本将/root目录下的mydeb.log文件删除
dpkg -p   my-deb: 删除配置文件

8. 查看deb包是否安装：
dpkg -s   my-deb     
这里要卸载的包名为control文件Package字段所定义的 my-deb

9. 查看deb包安装在哪：
dpkg -L package-name