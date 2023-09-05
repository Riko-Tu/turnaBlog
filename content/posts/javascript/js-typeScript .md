--- 
title: "js - typescript"
date: 2023-08-029T15:06:34+08:00
draft: false
description: "有[featuredImagePreview]图片时，鼠标聚焦图片展示该文字"
author: "Turan"
tags: [typescript]
categories: [javascript]
hiddenFromHomePage: false
toc:
    auto: false
---

## 1 环境搭建

```bash
npm i -g typesrcipt
```

测试安装成功

```bash
tsc -v
```
会展示版本号，则安装成功

## 2 语法

### 2.0 基本类型
{{< image src="/images/javascript/type.jpg" caption="Lighthouse (`type`)" >}}

### 2.1 变量

```ts
// 声明类型
let a: number;
let b: string;
let c: boolean;

// 类型声明并赋值
let t: boolean = true;

// 类型推到
let d = 2;


```

### 2.2 函数
```ts
// 入参声明类型，返回值类型

function sum(a:number,b:number):number {
    return a+b
}

```

### 2.3 对象
```ts

class Person{
    
    // 静态属性(类属性)：不需要创建创建实例可以直接使用, Person.num
    static num : number 
    
    // 实例属性
    name:string
    age:number
    gender:string
}

```