---
weight: 5
title: "docker - 基础命令"
date: 2023-08-16T15:19:34+08:00
draft: false
tags: [docker]
categories: [docker]
featuredImagePreview: ""
toc:
    auto: false
---




docker+微服务+jekins+gitlab+ci/cd

仓库：存储镜像的仓库

镜像：容器的模板，可通过镜像生成多个容器

容器：通过镜像实例化出多个容器



### 一、帮助命令

#### 1.0 版本检测

~~~txt
docker version
~~~

#### 1.1 查看信息

~~~txt
docker info
~~~

#### 1.1 查看命令

~~~txt
docker --help
~~~

---



### 二、镜像命令

#### 1.0 查看镜像

~~~txt
docker images [param]
	param:	-a 展示所有镜像（含中间层）
			-q 只展示镜像id
			-qa 只展示所有镜像的id
			--digests 显示镜像的摘要信息
			--no-trunc 显示完整的镜像信息（完整的id信息）
~~~

#### 1.1 搜索镜像

~~~txt
docker search [options] [imagesName]
	[options]:   -s [number]  展示收藏数大于number的镜像
				
~~~

#### 1.2 下载镜像

~~~txt
docker pull tomcat   //默认最新版
~~~

#### 1.3 删除镜像

~~~txt
docker rmi [imagesName/ID]   //默认删除最新版
docker rmi [imagesName] [imagesName/ID]  //删除多个
docker rmi -f $(docker images -qa)  //删除全部
~~~



### 三、容器命令

#### 1.0 启动容器

~~~txt
docker run [options] IMAGE [CMD] [arg]
	[options]:  --name="容器新名字"：为容器指定一个名称
				-d :后台运行容器，并返回容器id，也即启动守护石容器
				-i:已交互模式运行容器，通常与-t同时使用
				-t:为容器重新分配一个伪输入终端，通常与-i同时使用
				-P:随机端口映射
				-p：指定端口映射，有以下四种格式：
				
docker run -it --name mycentos centoS  //运行centoS,并进入centoS的终端，启动交互式容器	

docker run -d centos   //启动守护式容器

docker run -it -p 8888:8080 tomcat // 8888为docker端口，8080是tomcat端口
----------------------------------------------------------------------------------

docker start [容器id]
~~~

#### 1.1 查看容器

~~~txt
docker ps [param]
	[param]:   -a :列出当前所有正在运行的容器+历史上运行过的
				-l :显示最近创建的容器
				-n :显示最近N个创建的容器
				-q ：静默模式，只显示容器编号
				--no-trunc： 不截断输出
~~~

#### 1.2 退出容器

~~~txt
exit  /容器停止并退出
ctrl +P+Q   容器不停止退出
~~~

#### 1.3 启动已有容器

~~~txt
docker start [容器id/容器名]
~~~

#### 1.4 重启容器

~~~txt
docker restart [容器id/容器名]
~~~

#### 1.5 停止容器

~~~txt
docker stop [容器id/容器名]
docker kill [容器id/容器名]    //强制停止
~~~

#### 1.6 删除容器

~~~txt
docker rm [容器id/容器名]
docker rm -f [容器id/容器名]  //可删除运行中容器
docker rm -f $(docker ps -a -q)
~~~

#### 1.7 容器日志

~~~txt
docker logs -f -t -tail number [容器名/容器id]
	-t:加入时间戳
	-f:跟随最新的日志打印
	--tail:数字显示最后几条
~~~

#### 1.8 查看容器内进程

~~~txt
docker top [容器名/容器id]
~~~

#### 1.9 查看容器细节

~~~txt
docker inspect [容器名/容器id]
~~~

#### 2.0 进入容器

~~~txt
docker attach [容器名/容器id]
~~~

#### 2.1 容器外执行

~~~txt
docker exec -it [容器名/容器id] bashshell
例：
	docker exec -it centos cd /tmp
~~~

#### 2.2 拷贝容器文件

~~~txt
docker cp [容器名/容器id]:[容器文件路径] [当前系统路径]
例：
	docker cp centos:/tmp/yum.log /root
~~~

#### 2.3 生成镜像

~~~txt
docker commit -a="作者" -m="描述信息" [容器id] [新镜像名:版本号]
~~~







#### 重启服务

~~~code
service docker restart
~~~

### 四、镜像原理



### 五、 容器数据卷

~~~TXT
为保存容器的数据，进行持久性开发，共享存储主机与容器之间的数据
~~~

#### 1.0 命令数据同步

~~~txt
docker run -it -v /主机目录：/容器内目录 镜像id


docker run -it -v /containerData/centosData:/centosData centos
	//容器的文件夹与主机的文件夹变成共享文件夹
		
	
docker run -it /主机目录:命令:/容器目录 镜像id
~~~

#### 1.1 dockerFile数据同步

~~~txt
a. 编写可执行的dockerfile文件
b. 构建dockerfile成为新的镜像    docker build -f [指定dockerfile文件] -t [ImageName]
c. 可通过docker inspect [容器id] 查看默认与主机相连的共享文件
~~~

#### 1.2 容器间传递共享

~~~txt
docker run -it --name [newcontainerName] --volums-from [runningContainerName] [imageName]  //image为两个容器的镜像，通过镜像来启动一个newContainer，newContainer再与runningContainer数据互通

~~~

### 六、dockerFile

#### 1.0 语法格式

~~~txt
1. 指令必须大写
2. 语法按照从上到下执行
3. #表示注释
4. 每条指令都会创建一个新的镜像层，并对镜像进行提交
~~~

#### 1.1 dockerfile构建过程

~~~txt
1. docker 从基础镜像运行一个容器
2. 执行一条指令并对容器做出修改
3. 执行类似docker commit的操作提交一个新的镜像
4. docker再基于刚提交的镜像运行一个新容器
5. 执行dockerfile中的下一条指令直到所有指令都执行完成
~~~

#### 1.2 保留字指令

- FROM：基础镜像，当前新镜像是基于哪个镜像
- MAINTAINER：镜像维护者的姓名和邮箱地址
- RUN：容器构建是需要运行的命令
- EXPOSE：当前容器对外暴露的端口号
- WORKDIR：指定在创建容器后，默认进入的目录路径
- ENV：用来在构建镜像过程中设置环境变量
- ADD：将宿主机目录下的文件拷贝进镜像且ADD命令会自动处理URL和解压tar压缩包
- COPY：拷贝文件和目录到镜像中
- VOLUME：容器数据卷，用户数据保存和持久化工作
- CMD：指定一个容器启动时，需要运行的命令（有多个cmd指令时，只有最后一个生效，CMD会被docker run之后的参数替换）
- ENTRYPOINT：指定一个容器启动时，需要运行的命令（追加参数）
- ONBUILD：当构建一个被继承的dockerfile时运行命令，父镜像obnuild会被触发

#### 1.3 语法案例























