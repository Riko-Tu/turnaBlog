---
title: "linux - 基础命令"
date: 2023-08-01T15:06:34+08:00
draft: false
author: "Turan"
tags: [linux]
categories: [linux]
hiddenFromHomePage: false

toc:
    auto: false
---

### 一、 虚拟机

#### 1. 概念
{{< image src="/images/linux/虚拟机概念.jpg" caption="虚拟机概念" >}}





### 二、 目录结构

#### 1. 根目录

~~~txt
* linux采用单根目录结构（不同于windos使用多根目录）
~~~

#### 2. 二级目录
{{< image src="/images/linux/linux二级目录.jpg" caption="linux二级目录" >}}


#### 3. 常用文件功能介绍

~~~txt
/etc/passwd       存储帐号的文件
/etc/shadow		  存储密码的文件
/etc/group		  存储用户组的文件
/etc/sudoers	  存放临时命令权限的用户与命令,在该文件100内添加用户和命令可使用sudo获取临时权限,该文件需用visudo编辑,使用whereis cmd 定位命令文件，并添加nopasswd： cmd
/etc/profile	   配置环境变量文件，设置好后使用. /etc/profile 来重新加载配置
~~~



### 三、 命令范式 
{{< image src="/images/linux/linux命令范式.jpg" caption="linux命令范式" >}}


##### 1. 文件操作

###### ls

~~~
ls [选项]  [命令参数]
选项 :
    -a 显示所有文件及目录 (. 开头的隐藏文件也会列出)
    -l 除文件名称外，亦将文件型态、权限、拥有者、文件大小等资讯详细列出
    -lh 将文件大小转为kb单位
    -r 将文件以相反次序显示(原定依英文字母次序)
    -t 将文件依建立时间之先后次序列出
    -A 同 -a ，但不列出 "." (目前目录) 及 ".." (父目录)
    -F 在列出的文件名称后加一符号；例如可执行档则加 "*", 目录则加 "/"
    -R 若目录下有文件，则以下之文件亦皆依序列出	
    
    
实例：
	ls -l s*    展示以s开头的文件
~~~

###### mkdir

~~~txt
mkdir [选项] dirName
选项：
	-p 确保目录名称存在，不存在的就建一个
	
实例：
	mkdir -p run/test       如run文件夹不存在，创建后再创建test
~~~

###### touch

~~~txt
touch [选项] 参数
选项：
	可通过touch --help查看
	
实例：
	touch testfile  创建一个没有格式的testfile文件
~~~

###### cat

~~~txt
cat [选项] 文件路径
选项： 
	-n     将文本内容带行号输出
	-b     去除空格，带行号输出
	-E	    在每行结束处显示 $
	
实例： 
	cat -bE 文件路径
~~~

###### more

~~~txt
more [选项] 文件路径
选项： 
	-l 向前翻页，展示剩余行数百分比
	-p 不以卷动的方式显示每一页，而是先清除萤幕后再显示内容
	
实例：
	more -p  文件路径
~~~

###### less

~~~txt
less [选项] 文件路径
选项：
	-m  显示剩余百分比
	-N  显示行号
	-g 	只显示第一个搜索的关键词   
		
	
实例：
less -mNg 文件路径
	输入：
		/字符串：向下搜索
		？字符串：向上搜索
		n 查看下一个关键字
		N 查看上一个关键字
		b 向上翻页
		d 向下翻页
		Q 退出查看
		u 向前翻半页
		F 读取写入文件的最新内容，ctrl+C停止
~~~

###### head

~~~txt
head [选项] 文件路径
选项：
	-q 隐藏文件名
	-v 显示文件名
	-c 显示字节数
	-n 显示的行数
	
实例：
	head -c 20 文件路径        显示文件前20个字节数
	head -n 10 文件路径		   显示文件前10行文字
~~~

###### tail

~~~txt
tail [选项]  文件路径
选项：
	-f 循环读取
	-n 显示文件的尾部行内容
实例：
	tail -f 文件路径           默认显示文件最后10行，并实时读取文件内容
	tail -n 200 文件路径	   显示文件倒数200行内容 
    tail -n -100 文件路径	   显示行数从第100行开始到尾部行
~~~

###### cp

~~~txt
cp [选项] source dest    ||    cp [选项] source directory
选项：
	-a  保留源文件所有属性
	-f  覆盖文件
	-p  将修改时间和访问权限页复制到新文件中
	-r  复制文件夹下的所有文件和目录
	-l  不复制文件，只生成链接文件
	
实例：
	cp 源文件名  目的文件名         复制一个文件
	cp -f 源文件名 目的文件名       将源文件复制一份覆盖目的文件
	cp -r sourceDir destDir      复制目录下的所有文件
~~~

###### mv

~~~txt
mv [选项] source dest    
选项：
	-u 源文件比目标文件新或者目标文件不存在时，才执行
	-i 覆盖时询问
	
实例：
	mv source（文件） dest（文件）           将source名称改为dest
	mv source（文件） dest（目录）		     移动文件到目录中
	mv source（目录） dest（目录）           dest存在，则移动；不存在，则更名 
~~~

###### rm

~~~txt
rm [选项] 文件或目录路径
选项：
	-i 删除前逐一询问
	-f 直接删除
	-r 删除目录

实例：
	rm 文件路径      删除文件
	rm -r 目录路径	 删除目录
~~~

###### rmdir

~~~txt
rmdir [选项]  dirName
选项：
	-p 当子目录被删除后使它也成为空目录的话，则顺便一并删除
	
实例：
	rmdir -p BBB/test   将test删除后，如果BBB变成空目录，则也删除
~~~

###### umask

~~~txt
umask [选项] [掩码]
选项：
	-S  文字的方式来表示权限掩码
	
实例：
	umask          展示当前用户的创建权限掩码；root默认为0022
	umask -S 000   将U,G,O的权限都改为777
	umask -S 222   将u,g,o的权限都改为555
~~~







### 四、用户和组

#### 1. 用户的分类
{{< image src="/images/linux/用户的分类.jpg" caption="用户的分类" >}}


#### 2. 配置文件简介
{{< image src="/images/linux/用户配置文件.jpg" caption="用户配置文件" >}}


#### 3. 用户相关

###### groupadd

~~~txt
groupadd [选项] GroupId gName
	-g 指定新建工作组的 id
	
实例：
	groupadd -g 344 normol    在/etc/group文件中增加一个组名为normol,id为344的key雨vaule
~~~



###### groupmod

~~~txt
groupmod [选项] 原组名 新组名
选项：
	-g 设置群组识别码
	-n 设置群组名
	
实例：
	groupmod -n test runoob      将runoob改名为test
~~~



###### groupdel

~~~txt
groupdel [群组名称]

实例：
	groupdel test
~~~



###### useradd

~~~txt
useradd [选项] userName
选项：
	-c  加上备注文字；备注文字会保存在passwd的备注栏位中
	-d  指定用户登入时的起始目录
	-D 　变更预设值;只用使用-b ,-e ,f,-g,-s
	-e<有效期限> 　指定帐号的有效期限。参数应使用 YYYY-MM-DD 格式
	-f<缓冲天数> 　指定在密码过期后多少天即关闭该帐号。   -g 7
	-g<群组> 　指定用户所属的群组。
	-s<shell>　 　指定用户登入后所使用的shell
	-m 　自动建立用户的登入目录。
	
实例：
	#创建的用户信心会保存在/etc/passwd中
	useradd -c turan -d /home/turan -g turanGroup turan 
	
    #添加一个不能登录的用户
	useradd -d /usr/local/apache -g apache -s /bin/false apache    
	
	##建立用户指定id
	useradd turan -u 544
~~~

###### usermod

~~~txt
usermod [选项] userName
选项：
	-c<备注> 　修改用户帐号的备注文字。
	-d登入目录> 　修改用户登入时的目录。
	-e<有效期限> 　修改帐号的有效期限。
	-f<缓冲天数> 　修改在密码过期后多少天即关闭该帐号。
	-g<群组> 　修改用户所属的群组。
	-G<群组> 　修改用户所属的附加群组。
	-l<帐号名称> 　修改用户帐号名称。
	-L 　锁定用户密码，使密码无效。
	-s<shell> 　修改用户登入后所使用的shell。
	-u<uid> 　修改用户ID。
	-U 　解除密码锁定。
	
实例：
	usermod -u 300 turan    //修改turan Uid为300
~~~

###### userdel

~~~txt
userdel [选项] username
选项：
	-r 删除用户登入目录以及目录中所有文件。
	
实例：
	##仅删除账号，不删除账号的数据
	userdel turan
	
	##账号与数据一并删除
	userdel -r turan
~~~

###### passwd

~~~txt
passwd [选项] userName
选项：
	-d 删除密码
	-l 停止账号的使用
	-S 显示密码信息(不展示密码)
	-u 启用被停止的账户
	-w 口令要到期提前警告的天数
	-x 指定口令最长存活期
	
实例：
	passwd turan      //修改用户密码，之后输入两次密码
	
	 //查看用户密码：用户名，密码状态（LK锁住,NP无密码,p可用），密码最后修改时间，失效前警告天数，密码失效时间(-1表示没有失效时间)
	passwd -S turan  
~~~











### 五、 文件权限

#### 1. 权限引入
{{< image src="/images/linux/文件权限引入.jpg" caption="文件权限引入" >}}

{{< image src="/images/linux/20220114161250781.png" caption="文件权限引入" >}}


#### 2. 文件的7种类型

~~~txt
 - 普通文件：纯文本文件(ASCII)；二进制文件(binary)；
 		   数据格式的文件(data);各种压缩文件
 d 目录文件：
 c 字符设备文件：
 b 块设备文件：
 s 套接字：
 p 管道文件：
 l 链接文件：快捷方式
 

~~~

#### 3. 文件权限掩码

~~~txt
第一个rwx   表示创建者所有权限  r=4 w=2 x=1  
第二个rwx	 表示所属组所有权限
第三个rwx	 其他成员所有权限
~~~



#### 4. 权限相关

###### chown

~~~txt
chown [选项] fileName
选项：
	-R 处理指定目录以及其子目录下的所有文件
	
实例：
	chown root xiaotu      //将xiaotu文件或目录的所有者设置为root
	chown turan:turanGroup xiaotu  //更改xiaotu的所有者与群体使用者
	chown -R turan:turanGroup *   //将当前目录下的所有文件的所有者和群使用者修改
~~~

###### chgrp

~~~txt
chgrp [选项] filename
选项：
   -v 修改群组所有

实例：
	chgrp -v group filename      //更改文件的群组信息

~~~

###### chmod

~~~txt
chmod  [选项]   filename
选项：
	-R 递归更改目录内的所有文件
	
实例：
	chmod +r file    //所有用户添加r权限
	chmod o+r file    //o用户增加file权限
	chmod u=rw,go= file  //u为rw权限,go没有任何权限
~~~

###### sudo

> ~~~txt
> sudo userName cmd
> 
> 实例：
> 	sudo useradd -g gid usrname      //临时普通用户使用useradd命令，配置临时命令，请查看二中的常用文件功能介绍
> 	
> ~~~
{{< image src="/images/linux/sudo工作流程.jpg" caption="sudo工作流程" >}}




#### 5. 权限的类型

##### 目录权限

~~~txt
r    读取牧区结构列表（可获取文件名）
w    更改目录结构列表（新增，删除，移动，复制）
x	 可cd进入该目录
~~~

##### 文件权限

~~~txt
r	 读取文件内容
w	 编辑文件内容
x	 可执行文件
~~~



### 六、 yum服务

#### 1. 服务介绍
{{< image src="/images/linux/yum服务.jpg" caption="yum服务" >}}

#### 2、 yum源介绍
{{< image src="/images/linux/yum源.jpg" caption="yum源" >}}



#### 3. yum源配置文件
{{< image src="/images/linux/yum源配置文件.jpg" caption="yum源配置文件" >}}

#### 4. Base网络源文件介绍
{{< image src="/images/linux/yum网络源文件介绍.jpg" caption="yum网络源文件介绍" >}}

#### 5. yum常用命令

##### yum repolist

- 查看使用的代理



##### yum list

- 查询仓库中所有rnp包
- 



### 七 、 进程与服务

#### 1. 程序与进程的区别
{{< image src="/images/linux/程序与进程区别.jpg" caption="程序与进程区别" >}}

{{< image src="/images/linux/服务.jpg" caption="服务" >}}


#### 2. 进程介绍
{{< image src="/images/linux/进程介绍.jpg" caption="进程介绍" >}}

{{< image src="/images/linux/进程介绍2.jpg" caption="进程介绍2" >}}


#### 3. 进程的分类
{{< image src="/images/linux/进程的类型.jpg" caption="进程的类型" >}}


#### 4. 进程的状态
{{< image src="/images/linux/进程的状态.jpg" caption="进程的状态" >}}


#### 5. 服务的分类
{{< image src="/images/linux/服务的分类.jpg" caption="服务的分类" >}}


#### 6. 进程的管理

##### 1. 进程监控命令

- 监控静态和动态的进程

###### ps

~~~txt
ps [选项] 
选项：
	-aux 显示所有包含其他使用者的行程
	-ef  显示所有进程信息，连同命令行

实例：
	ps -ef | grep 进程名     //查找进程   可查看pid与ppid
	ps -aux       			//查看所有进程
	ps -u root				//查看root用户的持有进程
~~~



###### pstree

~~~txt
实例：

	pstree -apnh 	//显示进程间的关系
	pstree -u 		//显示用户名称
~~~





###### top

~~~txt
 top [选项] 
 
 选项：
 	-d    改变显示的更新速度
 	-c 	  显示完整的路径与名称
 	
 实例：
 	top -d 3  		//每三秒刷新进程信息
 	top -c			// 显示完整的路径与名称
~~~



##### 2. 进程控制命令

- 终止进程

###### kill 

~~~txt
kill [选项] pid
选项：
	-9  强制杀死
	-1 	重新加载进程
	-15 正常终止进程
~~~

#### 5. 服务的管理

##### systemdctl

~~~txt
systemdctl [选项]  服务名
选项：
	start
	
~~~



### 八、 ssh服务

#### 1. ssh介绍
{{< image src="/images/linux/ssh介绍.jpg" caption="ssh介绍" >}}




#### 2. ssh版本
{{< image src="/images/linux/ssh版本.png" caption="ssh版本" >}}

#### 3. ssh远程登录
{{< image src="/images/linux/ssh远程登录.jpg" caption="ssh远程登录" >}}


#### 4. 文件上传和下载
{{< image src="/images/linux/上传文件.jpg" caption="服务的分类" >}}


### 九、 shell

#### 1. shell介绍
{{< image src="/images/linux/shell介绍.jpg" caption="shell介绍" >}}


#### 2. shell的类型
{{< image src="/images/linux/shell的分类.jpg" caption="shell的分类" >}}


#### 3. bash特性
{{< image src="/images/linux/shell-bash功能.jpg" caption="shell-bash功能" >}}

{{< image src="/images/linux/shell通配符.jpg" caption="shell通配符" >}}

##### 别名

~~~txt
alias chm='cd /home'
将命令封装为chm，使用chm可直接打开home目录
~~~

##### 通配符

~~~txt
ls *
ls l*
-------
ls l?
ls ??
-------
ls l[abcd]
~~~

#### 4. 变量

{{< image src="/images/linux/变量.jpg" caption="变量" >}}


#### 5. 脚本

{{< image src="/images/linux/脚本.jpg" caption="脚本" >}}

