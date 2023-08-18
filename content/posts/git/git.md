---
weight: 5
title: "git - 基础命令"
date: 2023-08-16T15:19:34+08:00
draft: false
tags: [git]
categories: [git]
featuredImagePreview: ""
toc:
  auto: false
---

# git

## .gitignore 文件

有时一些文件最好不要用 Git 去查。这通常是在不知名`.gitignore`的特殊文件中完成。你可以在[github.com/github/gitignore](https://github.com/github/gitignore)找到[细节](https://github.com/github/gitignore)的`.gitignore`文件模板。

```
需要特别注意的是：
1）.gitignore只能忽略那些原来没有被track的文件，如果某些文件已经被纳入了版本管理中，则修改.gitignore是无效的。
2）想要.gitignore起作用，必须要在这些文件不在暂存区中才可以，.gitignore文件只是忽略没有被staged(cached)文件，
  ``对于已经被staged文件，加入ignore文件时一定要先从staged移除，才可以忽略。
```

## 配置

对所有本地仓库的用户信息进行配置

```
$ git config --global user.name "[name]"
```

对你的提交操作设置关联的用户名

```
$ git config --global user.email "[email address]"
```

对你的提交操作设置关联的邮箱地址

```
$ git config --global color.ui auto
```

可以有帮助的彩色液晶输出

### 初始化git

~~~ 
git rm -r --cached .     //清除git所有缓存
~~~





## 创建仓库

当某物于一个新的仓库时，你很相似一次。

```
$ git init
```

在使用过`git init`命令后，使用以下命令将本地仓库与一个 GitHub 上的空仓库连接起来：

```
$ git remote add origin [url]
```

将现有目录转换为一个 Git 仓库

```
$ git clone [url]
```

克隆（下载）一个已在 GitHub 上的仓库，包括所有的文件、分支和提交（提交）



## 分支

分支是使用 Git 工作的一个部分`git status`。

```
$ git branch [branch-name]
```

创建一个新分支

```
$ git switch -c [branch-name]
```

切换到分支指定并更新工作目录（工作目录）

```
$ git merge [branch]
```

将指定分支的历史合并到当前分支。这通常在拉取请求（PR）中完成，但也是一个重要的 Git 操作。

```
$ git branch -d [branch-name]
```

删除指定分支

## 进行更改

浏览并检查项目文件的发展

```
$ git log
```

当前版本的历史版本

```
$ git log --follow [file]
```

过去文件的版本历史，包括重例

```
$ git diff [first-branch]...[second-branch]
```

展示两个分支的内容千差万别

```
$ git show [commit]
```

输出指定提交的元数据和内容变化

```
$ git add [file]
```

将文件进行处理用于版本控制

```
$ git commit -m "[descriptive message]"
```

将文件时刻地记录在历史中



## 重做提交

清除错误和构建用于替换的历史

```
$ git reset [commit]
```

撤销所有`[commit]`后的提交，在本地保存更改

```
$ git reset --hard [commit]
```

放弃所有历史，改回指定提交。

> 小心！更改历史可能会带来不良后果。如果您需要更改 GitHub（谨慎）已提交的，请操作。如果您需要帮助，可访问[github.community](https://github.community/)或联系支持（支持）。
>
> 

## 同步更改

将你本地收藏与GitHub.com 上的远端同步

```
$ git fetch
```

下载远端追踪的所有历史

```
$ git merge
```

将远端分支合并到当前局部分支

```
$ git pull
```

将所有本地分支提交上传到 GitHub

```
$ git push
```

使用来自GitHub上的对应远端分支的所有新提交更新你当前的本地工作分支。`git pull`的英文`git fetch`状语从句：`git merge`的结合





## 术语表

- **git** : 一个开源的发行版本控制系统
- **GitHub** : 一个和协作管理 Git 仓库的平台
- **commit 提交**: 一个 Git 对象是你整个仓库的散光值
- **分支分支**：一个较轻的可移动的提交**分支**
- **clone** : 一个仓库的本地版本，包含所有提交和分支
- **远程远端**：一个 GitHub 上的公共仓库，所有小组成员通过它来交换修改
- **fork** : 一个另一个用户的 GitHub 上的仓库的副本
- **拉取请求**：为了更好地和讨论上引入的差异，且具有验证、评论、集成测试等功能的地方的
- **HEAD**：代表你当前的工作目录。使用`git checkout`可移动 HEAD 提交到不同的分支、标记（标签）或



## 本地

- 版本切换

  ~~~txt
   git reset --hard HEAD^        //head^   head^^    也是可把head改成commit号
  ~~~

  

## 分支

### 创建分支

~~~txt
git branch  [分支名] 
~~~

### 查看本库已有分支

~~~txt
git branch -v
~~~

### 切换分支

~~~txtx
git checkout [分支名]
~~~

### 合并分支

~~~txt
git merge [要合并过来的分支名]           //切换到接受的分支执行         
~~~

### 合并分支冲突

- 当两个分支的同一个文件同一处被修改后，合并两分支会产生冲突

~~~txt
第一步：打开产生冲突的文件
第二部：将冲突标记符号删除(此时可以直接保存提交)，并将文件修改到不产生冲突为止，保存退出
第三步：git  add .      （add添加到暂存区）
第四部： git commit -m "日志信息"   （添加到本地库）
第五步： git merge [分支名]
~~~

### 更改分支名

~~~txt
git branch -m [原分支名] [新分支名]
~~~



## 远程库

### 连接

~~~txt
git remote add [仓库地址别名]  仓库地址
实例:git remote add origin git@github.com:Riko-Tu/test.git
~~~

### 查看已连接

~~~txt
git remote -v
~~~

### 推送

~~~txt
git push [仓库地址别名] [仓库的分支]
tip:
	1.该命令需要将推送用户邀请进入仓库团队后才可使用
	2.如果仓库不存在该分支，则会在远程库自动创建该分支
~~~

### 强制推送

~~~txt
git push origin master -f       //f表示force
~~~



### rebase拉取

~~~txt
git pull --rebase origin master
~~~

### 克隆本地

~~~txt
git clone 仓库地址
作用：
	1.自动创建origin的远程库别名
	2.自动初始化为本地库
~~~

### 拉取代码：分步操作

~~~txt
git fetch [远程仓库] [分支名]   //将远程代码拉取到本地，但不合并本地的代码
git checkout [远程仓库] [分支名]  //切换到拉取下来的代码分支，查看代码内容，如果问题不大可以再合并代码
git merge [远程仓库/分支名]  //将fetch的代码与本地库的代码合并
~~~

### 拉取代码：直接合并

~~~txt
git pull [远程仓库] [分支名]  //pull  等于fetch +merge
~~~

### origin branch修改时

~~~txt
更新本地库的分支名
git branch -m main master
git fetch origin
git branch -u origin/master master
git remote set-head origin -a
~~~

