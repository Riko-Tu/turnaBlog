--- 
title: "go语言设计与实现"
date: 2023-08-16T15:06:34+08:00
draft: false
description: "有[featuredImagePreview]图片时，鼠标聚焦图片展示该文字"
author: "Turan"
tags: [golang]
categories: [golang]
hiddenFromHomePage: false
toc:
  auto: false
---





- url:https://draveness.me/golang/docs/part1-prerequisite/ch01-prepare/golang-debug/

## 第一章

### 1.0、调试go源代码

- 在goroot目录下`./src/make.bash` 脚本会编译 Go 语言的二进制、工具链以及标准库和命令并将源代码和编译好的二进制文件移动到对应的位置上

### 1.1、中间代码

1. 将go文件编译成汇编语言

   ~~~
   go build -gcflags -S main.go       //main.go指定编译的go文件
   ~~~

---

#### 小结：

~~~txt
掌握调试和自定义 Go 语言二进制的方法可以帮助我们快速验证对 Go 语言内部实现的猜想，通过最简单粗暴的 println 函数可以调试 Go 语言的源码和标准库
~~~

## 第二章  ：    编译原理

### 1.0 概述 

~~~txt
Go 语言是一门需要编译才能运行的编程语言，也就是说代码在运行之前需要通过编译器生成二进制机器码，包含二进制机器码的文件才能在目标机器上运行
~~~

### 1.1 抽象语法树(AST)

- 介绍

~~~txt
抽象语法树（Abstract Syntax Tree、AST），是源代码语法的结构的一种抽象表示，它用树状的方式表示编程语言的语法结构1。抽象语法树中的每一个节点都表示源代码中的一个元素，每一棵子树都表示一个语法元素
~~~
{{< image src="/images/golang/语法树.jpg"  >}}


- 简单表述

~~~txt
编译器在执行完语法分析之后会输出一个抽象语法树，这个抽象语法树会辅助编译器进行语义分析，我们可以用它来确定语法正确的程序是否存在一些类型不匹配的问题
~~~

### 1.2 指令集

- 介绍

~~~txt
x86 是目前比较常见的指令集，除了 x86 之外，还有 arm 等指令集，苹果最新 Macbook 的自研芯片就使用了 arm 指令集
~~~

- 类型

~~~txt
复杂指令集计算机（CISC）和精简指令集计算机（RISC）是两种遵循不同设计理念的指令集，从名字我们就可以推测出这两种指令集的区别：

复杂指令集：通过增加指令的类型减少需要执行的指令数；
精简指令集：使用更少的指令类型完成目标的计算任务
~~~

### 1.3 编译原理

- 编译器所在目录

  ~~~txt
  #goroot/src/cmd/compile
  ~~~

- 编译器功能介绍

  ~~~txt
  -编译器的前端承担着词法分析、语法分析、类型检查和中间代码生成几部分工作
  -编译器后端负责目标代码的生成和优化，将中间代码翻译成目标机器能够运行的二进制机器码
  ~~~

- 编译过程

  ~~~txt
  Go 的编译器在逻辑上可以被分成四个阶段：
  	1，词法与语法分析
  	2，类型检查 
  	3，中间代码生成
  	4，机器代码生成
  ~~~


{{< image src="/images/golang/编译过程.jpg"  >}}


#### a. 词法与语法分析

~~~txt
 	词法分析：解析源代码文件，将文件中的字符串序列转换成 Token 序列
 	语法分析: 把Token 序列转换成有意义的结构体，即语法树(AST)
 		TSPS:语法分析时，出现语法错误时会引发err
~~~

#### b.类型检查

- 对语法树中定义和使用的类型进行检查:
  - 静态类型检查
  - 动态类型检查：动态派发、向下转型、反射以及其他特性

~~~txt
 	以下的顺序分别验证和处理不同类型的节点:1.常量、类型和函数名及类型；
                                    2.变量的赋值和初始化；
                                    3.函数和闭包的主体；
                                    4.哈希键值对的类型；
                                    5.导入函数体；
                                    6.外部的声明；
        TIPS:
        	1.所有的类型错误和不匹配都会在这一个阶段被暴露出来，包括结构体对接口的实现
        	2.还会展开和改写一些内建的函数
~~~

#### c.中间代码生成

- 将输入的抽象语法树转换成中间代码
- 编译器会在将源代码转换到机器码的过程中，先把源代码转换成一种中间的表示形式

~~~txt
 	将每个语法树对应的函数进行编译：调用 cmd/compile/internal/gc.compileFunctions 进行编译，转换成中间代码
 		TIPS:这一阶段能够分析出代码中的无用变量和片段并对代码进行优化
~~~

#### d.机器码生成

- 机器码由CPU处理，需要根据不同的cpu使用不同的机器码生成器
- 在[`src/cmd/compile/internal`](https://github.com/golang/go/tree/master/src/cmd/compile/internal) 目录中包含了很多机器码生成相关的包

- 其中包括 amd64、arm、arm64、mips、mips64、ppc64、s390x、x86 和 wasm
  1. wasm：常见的主流浏览器二进制指令格式



### 1.4 编译器入口

~~~txt
1.Go 语言的编译器入口在 src/cmd/compile/internal/gc/main.go 文件中
2.其中 600 多行的 cmd/compile/internal/gc.Main 就是 Go 语言编译器的主程序
3.该函数会先获取命令行传入的参数并更新编译选项和配置
4.随后会调用 cmd/compile/internal/gc.parseFiles 对输入的文件进行词法与语法分析得到对应的抽象语法树：
~~~

### 1.5 本章知识扩展

~~~txt
1.抽象语法树 https://en.wikipedia.org/wiki/Abstract_syntax_tree 

2.静态单赋值 https://en.wikipedia.org/wiki/Static_single_assignment_form 

3.编译器一般分为前端和后端，其中前端的主要工作是将源代码翻译成编程语言无关的中间表示，而后端主要负责目标代码的优化和生成。 

4.指令集架构是计算机的抽象模型，也被称作架构或者计算架架构 https://en.wikipedia.org/wiki/Instruction_set_architecture 

5.SourceFile 表示一个 Go 语言源文件，它由 package 定义、多个 import 语句以及顶层的声明组成 https://golang.org/ref/spec#Source_file_organization 

6.关于 Go 语言文法的是不是 LALR(1) 的讨论 
https://groups.google.com/forum/#!msg/golang-nuts/jVjbH2-emMQ/UdZlSNhd3DwJ

7.LALR 的全称是 Look-Ahead LR，大多数的通用编程语言都会使用 LALR 的文法 https://en.wikipedia.org/wiki/LALR_parser 

8.WebAssembly 是基于栈的虚拟机的二进制指令，简称 Wasm
https://webassembly.org/ 

9.plugin: add Windows support #19282 
https://github.com/golang/go/issues/19282 
~~~

### 1.6 小结

~~~txt
编译过程：
	1.词法分析：将源文件的代码进行正则匹配分组；lex3 是用于生成词法分析器的工具
	2.语法分析：通过形式文法将字符分组转换成token序列，将每个函数得到输出成语法树
	3.类型检查：在语法书中进行类型检查包括静态类型检查和动态类型检查
	4.中间代码：根据传入cpu架构通过SSA将语法书转换成SSA特性的中间代码
	5.机器码生成：根据目标机器的指令架构将中间代码通过对应架构的汇编语言器生成机器码，最后生成可以执行的二进制文件。
~~~



## 第三章：数据结构

### 1.0 数组

- 特性

  ~~~txt
  1.数组在内存中都是一连串的内存空间
  2.数组是由相同类型元素的集合组成的数据结构
  3.通过指向数组开头的指针、元素的数量以及元素类型占的空间大小表示数组
  4.数组长度为固定长度
  ~~~

- 初始化

  方式一：

  ~~~txt
  arr1 := [3]int{1, 2, 3}
  	底层机制：
  		var arr [3]int
  		arr1[0]=1
  		arr1[1]=2
  		arr1[2]=3
  	小结：变量的类型在编译进行到类型检查阶段就会被提取出来，随后使用types.NewArray函数创建包含数组大小的结构体
  ~~~

  方式二：

  ~~~txt
  arr2 := [...]int{1, 2, 3}
  	底层机制：通过遍历元素的方式来计算数组中元素的数量
  ~~~

- 访问和赋值

  ~~~txt
  访问错误：
  	1.访问数组的索引是非整数时报错
  	2.访问数组的索引是负数时报错
  	3.访问数组的索引越界时报错
  tips:如果使用变量去访问数组或者字符串时，编译器就无法提前发现错误，则出现的错误为运行错误;
  ~~~

  ~~~txt
  赋值：数组的操作在编译期间为直接读写内存
  	arry1[i]=2
  	arry2 =arry1
  ~~~

### 1.2 切片

- 特性

  ~~~txt
  1.动态数组，其长度并不固定，向切片中追加元素，在容量不足时自动扩容
  2.声明方式:切片的长度是动态的，声明只需要指定切片中的元素类型
  ~~~

- 数据结构

  ~~~go
  type SliceHeader struct {
  	Data uintptr    //数组的指针：指针传值
  	Len  int		//切片的长度：已存放元素数量
  	Cap  int		//切片的容量：可存放元素容量		
  }
  ~~~

- 切片初始化

  - 方式一：将数值转换成切片或者获得一部分

    ~~~go
    var arr =[8]int{1,2,3,4,5}
    slice1 :=arr[:]
    slice1 :=arr[0:3]
    ~~~

    注意事项：1，arr是数组，没有append方法；

    ​		 		  2，slice1是切片，可以使用append方法，并且slice1会自动扩容

    ​	  			 3，**slice1只能使用append方法添加元素**

    ​		   		4，slice1是指向arr的切片，修改slice1的值，arr中的值也会被修改

    ​		   		5，arr的8是初始化数组长度，5元素后面的元素用0代替

    ​				   6，slice1的cap满后会以两个cap的数量自动扩容

  ---

  - 方式二：声明一个不定长数组

    ~~~go
    slice := []int{1, 2, 3}
    ~~~

  ---

  - 方式三：使用make定义一个切片

    ~~~go
    slice :=make([]int,10)
    ~~~

    

  

  





























