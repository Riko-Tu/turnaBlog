---
title: "linux 各种软件安装"
date: 2023-08-01T15:06:34+08:00
draft: false
description: "有[featuredImagePreview]图片时，鼠标聚焦图片展示该文字"
author: "Turan"
tags: [软件安装]
categories: [linux]

hiddenFromHomePage: false
summary: "这是摘要"
toc:
    auto: ture
---
## docker 与 compose
安装docker 与 compose 请按照以下步骤进行操作：


1. 您可以使用以下命令执行此操作：
```bash
sudo yum update
```

2. 安装Docker和Docker Compose的依赖项。您可以使用以下命令安装它们：
```bash
sudo yum install -y yum-utils device-mapper-persistent-data lvm2
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo

```
3. 安装docker 和 compose 

```bash
sudo yum install docker-ce docker-ce-cli [containerd.io](http://containerd.io/)

sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

```


4. 确认Docker Compose是否安装成功。您可以使用以下命令检查版本：
```bash
docker --version
docker-compose --version
```

5. 启动docker
```bash
sudo systemctl start docker
sudo systemctl enable docker 
```


