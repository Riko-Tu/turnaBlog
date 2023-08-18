---
weight: 5
title: "mongoDB -《二》 基础命令篇"
date: 2023-08-16T15:19:34+08:00
draft: false
tags: [mongoDB]
categories: [database]
featuredImagePreview: ""
toc:
  auto: false
---




## 1、 管理角色介绍

| 权限名               | 描述                                                         |
| -------------------- | ------------------------------------------------------------ |
| read                 | 允许用户读取指定数据库                                       |
| readWrite            | 允许用户读写指定数据库                                       |
| dbAdmin              | 允许用户在指定数据库中执行管理函数，如素引创建、删除，查看统计或访问system.profile |
| dbowner              | 允许用户在指定数据库中执行任意操作，增、删、改、查等         |
| userAdmin            | 许用户向systemm.users集合写入，可以在指定数据库里创建、删除和管理用户 |
| clusterAdmin         | 只在admin数据库中可用，赋予用户所有分片和复制集相关函数的管理权限 |
| readAnyDatabase      | 只在admin数据库中可用，赋予用户所有数据库的读权限            |
| readWriteAnyDatabase | 只在admin数据库中可用，赋了用户所有数据库的读写权限          |
| userAdminAnyDatabase | 只在admin数据库中可用，赋予用户所有数据库的userAdmin权限     |
| dbAdminAnyDatabase   | 只在admin数据库中可用，予用户所有数据库的dbAdmin权限         |
| root                 | 只在admin数据库中可用。招级账号，招级权限                    |

用户认证，返回1表示认证成功



## 2、角色操作

~~~
## 创建角色，root用户必须切换到admin库使用
db.createUser({user:'name',pwd:'pd',roles:['root']})

## 给指定turan数据库创建用户
use turan;
db.createUser({user:'name',pwd:'pd',roles:['dbOwner']})

## 指定用户连接指定数据库
mongo --port 27017 -u "name" -p "pd" --authenticationDatabase=turan

## 删除用户
db.system.users.remove({user:"用户名"})

## 查看当前数据库已存在的用户列表
show users

## 查看当前数据库角色列表,可在创建用户时选择这些角色
show roles
~~~

## 

## 3、 数据库操作

~~~
## 查看所有数据库
show dbs

## 切换数据库，不存在时创建
use  test

## 删除当前数据库，使用前先切换到指定数据库
db.dropDatabase()

## 查看当前数据库集合
show tables
show collections

~~~

## 4、 集合操作

- 集合是一个环形链表，环形链表头尾是相连的，当尾部溢出时，会从头部开始覆盖数据；在创建集合时有三个可选参数

optionse参数：

| 参数   | 类型 | 描述                                                         |
| ------ | ---- | ------------------------------------------------------------ |
| capped | 布尔 | (可选)如果为true，则创建固定集合。固定集合是指有着固定大小的集合，当达到最大值时，它会自动覆盖最早的文档。 |
| size   | 数值 | (可选)为固定集合指定一个最大值 (以字节计) 。如果 capped 为 true，也需要指定该字段 |
| max    | 数值 | (可选)指定固定集合中包含文档的最大数量                       |

> 当集合不存在时，向集合中插入文档也会创建集合

~~~
## 创建集合


## 删除集合 

## 查看集合信息
db.集合名.stats();

## 查看集合帮助信息
db.集合名.help();
~~~



## 5、插入文档

必须先切换到指定的数据库，然后再指定集合使用查询api

use turan  // 使用turan数据库

~~~shell
## 插入一条
db.document.insertOne({"test":'test'},{writeConcern:1,ordered:true} )
- writeConcern ：默认为1，1表示节点的数量，可选大于1;majority表示写操作被大多数节点写入成功才算成功
- ordered ： 按顺序写入，默认为true；

## 插入多条
db.document.insertMany([{"test":'test'},{"test":'test'}])
~~~





## 6、 查询文档

可以用find命令对指定的数据进行更新，命令的格式如下:

~~~
db.document.find(query,projection)     
~~~

- query: 可选，使用查询操作符指定查询条件
- projection:  可选，查询列表



#### 6.1 多文档查询

~~~shell
## 空参数
db.document.find()   一次性最多返回20条，大于时使用it继续获取

## 查询title为qwe的文档，只返回title字段
db.document.find({title:'qwe'},{title:1})   条件和筛选字段查询

## 使用id查询
db.document.find({_id:ObjectID("xxxxxxxxxx")})     需要将id值转成objectid

## 查询likenum数大于60的文档，
db.document.find({likeNum:{$gt:60}})
~~~

#### 6.2 查询操作符

| SQL            | MQL                   |
| -------------- | --------------------- |
| a=1            | {a: 1}                |
| a<>1           | {a: {$ne: 1}}         |
| a>1            | {a: {$gt: 1}}         |
| a>=1           | {a: {$gte: 1}}        |
| a<1            | {a: {$lt: 13}}        |
| a<=1           | {a: ($lte: 1}}        |
| a=1AND b=1     | {a: 1, b: 1}          |
| a= 1 0R b= 1   | {$or:[{a:1},{b:1}]}   |
| a Is NULL      | {a: {$exists: false}} |
| a lN (1, 2, 3) | {a: {$in: [1, 2, 3]}} |

#### 6.3 排序查询

~~~shell
## 按likeNum字段降序
db.document.find(query,projection).sort({likeNum:-1})

## 按likeNum字段升序
db.document.find(query,projection).sort({likeNum:1})
~~~

#### 6.4 分页查询

~~~shell
## 跳过4行后，获取4行数据
db.document.find(query,projection).skip(4).limit(4).sort({likeNum:-1})
~~~

#### 6.5 模糊查询

~~~
## 按tpye模糊匹配qwe
db.document.find({type:/qwe/})
~~~



## 7、 更新文档

可以用update命令对指定的数据进行更新，命令的格式如下:

~~~ shell
## 更新单条
db.collTection.updateOne(query,update,options)
## 更新多条
db.collTection.updateMany(query,update,options)
~~~

- query: 描述更新的查询条件:

- update: 描述更新的动作及新的内容:

- options: 描述更新的 选项
  - upsert: 可选，如果不存在update的记录，是否插入新的记录。默认false，不插入。
  - writeConcern :可选，决定一个写操作落到多少个节点上才算成功。

### 7.1 更新操作符

| 操作符    | 格式                                            | 描述                                           |
| --------- | ----------------------------------------------- | ---------------------------------------------- |
| $set      | ($set:{field:value}}                            | 指定一个键并更新值，若键不存在则创建           |
| $unset    | ($unset : {field : 1 }}                         | 删除一个键                                     |
| $inc      | {$inc : {field : value }}                       | 对数值类型进行增减                             |
| $rename   | {$rename :{ fold field name : new field name }} | 修改字段名称                                   |
| $push     | {$push : {field : value }}                      | 将数值追加到数组中，若数组不存在则会进行初始化 |
| $pushAll  | {$pushAll : {field : value_array}}              | 追加多个值到一个数组字段内                     |
| $pull     | {$pull : {field :_value}}                       | 从数组中删除指定的元素                         |
| $addToSet | {$addToSet : {field ; value }}                  | 添加元素到数组中，具有排重功能                 |
| $pop      | {$pop : {field : 1}}                            | 删除数组的第一个或最后一个元素                 |

### 7.2 操作符使用

~~~shell
## $set  ：查询值为1,2,3的a字段，并将a更新为5
db.collTection.update({a:{$in:[1, 2, 3]}},{$set:{a:5}})

## $unset

## $inc

## $rename

## $push

## $pushAll

## $pull

## $addToSet

## $pop
~~~



### 7.3 upsert 属性

~~~shell
## 如果title为1不存在，则插入一条title为2
db.collTection.updateOne({title:1},{$set:{title:2}},{upsert:true})

## 如果title为1不存在，则放弃更新
db.collTection.updateOne({title:1},{$set:{title:2}})
~~~



### 7.4 replace 语义

~~~shell
## 查询title等于1的文档的全部字段，完全替换为title等于2
db.collTection.updateOne({title:1},{title:2})
~~~



### 7.5 findAndModify 命令

该语句只能更新**单个文档**：

~~~
db.document.findAndModify(
	{query:{test:'test'},update:{$inc:{title:1}},new:true}
	)
~~~

- query：需要查询的字段值
- update：需要更新的字段值
- new：默认为false，返回旧值文档；为true时，返回更新后的文档

~~~shell
##  查询test字段等于test的文档，并将title+1，更新后返回更新后的文档
db.document.findAndModify(
		{
		query:{test:'test'},
		update:{$inc:{title:1}
		},
		new:true}
	)
~~~



## 8、删除文档

删除文档使用deleteMany和deleteOne操作；

~~~shell
## 删除多个文档
db.collection.deleteMany(query)
## 删除单个文档
db.collection.deleteOne(query)
~~~

- query: 查询列表

### 8.1 删除文档

~~~shell
## 将title等于一的文档全部删除
db.collection.deleteMany({title:1})
## 删除单个title等于1的文档
db.collection.deleteOne({title:1})
~~~

### 8.2 返回被删除的文档

~~~shell
## 删除一条test为test的文档，并返回该文档
db.document.findOneAndDelete({test:'test'})
~~~



## 9 、聚合操作

聚合操作处理数招记录并返回计算结果(诸如统计平均值，求和等)。聚合操作组值来自多个文档，可以对分组数据执行各种操作以返回单个结果。案合操作包含三类: 单一作用聚合、聚合管道、MapReduce。

- 单一作用聚合: 提供了对常见聚合过程的简单访问，操作都从单个集合聚合文档。
- 聚合管道是一个数据聚合的框架，模型基于数据处理流水线的概念。文档进入多级管道，将文档转换为聚合结果。
- MapReduce操作具有两个阶段:处理每个文档并向每个输入文档发射一个或多个对象的map阶段，以及reduce组合map操作的输出
  阶段。

### 9.1 单一作用聚合

#### 介绍

MongoDB提供 三种 这类单一作用的聚合函数，这些函数只能在一个集合中使用，所以在实战中使用较少；

| 函数                                   | 描述                                                         |
| -------------------------------------- | ------------------------------------------------------------ |
| db.collection.estimatedDocumentCount() | 忽略查询条件，返回集合或视图中所有文档的计数                 |
| db.collection.count(query)             | 返回与find()集合或视图的查询匹配的文档计数 。等同于db.collection.find(query).count()构造 |
| db.collection.distinct(query,filter)   | 在单个集合或视图中查找指定字段的不同值，并在数组中返回结果   |

#### 使用

~~~shell
## 返回document集合的总文档数量
db.document.estimatedDocumentCount()

##  返回title等于1的文档数量
db.document.count({title:1})

## 只返回去重后的test字段值
db.collection.distinct("test")

## 先查询likeNum小于13的文档，再去重title字段，单独返回title字段值
db.document.distinct("title",{likeNum:{$lt: 13}})
~~~



### 9.2 聚合管道

#### 介绍

- MongoDB 聚合框架 (Aggregation Framework) 是一个计算框架，它可以:

  - 作用在一个或几个集合上:
  - 对集合中的数据进行的一系列运算
  - 将这些数据转化为期望的形式

  > 从效果而言，聚合框架相当于 SQL 查询中的GROUP BY、 LEFT OUTERJOIN 、AS等



- 整个聚合运算过程称为管道 (Pipeline) ，它是由多个阶段 (Stage) 组成的，每个管道:
  - 接受一系列文档 (原始数据)
  - 每个阶段对这些文档进行一系列运算结果将文档输出给下一个阶段;



**在这个例子中**

~~~
db.orders.aggregate([
	{ $match: { status: "A" } },
    { $group: { _id: "$cust_id", total: { $sum: "$amount" } } }
])
~~~

**第一阶段**：[`$match`]()阶段按`status`字段过滤文档，并将`status`等于`"A"`的文档传递到下一阶段。

**第二阶段**：[`$group`]()阶段按`cust_id`字段将文档分组，以计算每个`cust_id`唯一值的金额总和。



#### 语法

聚合管道操作语法

~~~ 
pipeline = [$stage1, $stage2, ...$stageN];
db.co1lection.aggregate(pipeline , {options})
~~~

- pipelines 一组数据聚合阶段。除$out、$Merge和sgeonear阶段之外，每个阶段都可以在管道中出现多次。
- options 可选，聚合操作的其他参数。包含: 查询计划、是否使用临时文件、游标、最大操作时间、读写策略、强制索引等等



#### 使用

~~~shell
## $project : 将title字段改为name；字段值为0时不展示，为1时展示该字段；有as和查询列表功能
db.document.aggregate([{$project:{name:"$title",_id:0,type:1}}])

## $match和$count: 过滤test等于1223，然后统计过滤后的数量，并赋值返回到count字段
db.document.aggregate([{$match:{test:'1223'}},{$count:"count"}])

## $group : 对test进行分组，然后对likeNum字段进行求和
db.document.aggregate([{$group:{_id:"$test",likenum:{$sum:"$likeNum"}}}])

## $group : 对test进行分组，对title进行分组，然后对likeNum字段进行求和
db.document.aggregate([{$group:{_id:{test:"$test",title:"$title"},likenum:{$sum:"$likeNum"}}}])

~~~





### 9.3 聚合操作符

| 阶段           | 描述     | SQL等价运算符   |
| -------------- | -------- | --------------- |
| $match         | 筛选条件 | where           |
| $project       | 投影     | as              |
| $lookup        | 左外连接 | left outer join |
| $sort          | 排序     | order by        |
| $group         | 分组     | group by        |
| $skip/$limit   | 分页     |                 |
| $unwind        | 展开数组 |                 |
| $graphLookup   | 图搜索   |                 |
| $facet/$bucket | 分面搜索 |                 |

[聚合操作符]: https://docs.mongoing.com/aggregation/aggregation-reference/aggregation-pipeline-quick-reference



---

#### $group

$group不会输出具体的文档而只是统计信息。

~~~
{
$group:{ _id: <expression>, <field1>: { <accumulatorl> : <expression1> }, ... }
}
~~~

- _id宇家是必道的但是，可以指d值为null来为整个输入文档计算累计值
- 剩余的计算字段是可选的，并使用<accumulator>运算符进行计算。
- _id和<accumulator>表达式可以接受任何有效的表达式.



#### $unwind

可以将数组拆分为单独的文档

~~~

{$unwind:

path: <field path>，

37
incTudeArrayIndex: <string>,
preserveNu17AndEmptyArrays : <boolean>
~~~

- path:#妻指定字段路径，在字段名称前加上S符并用引号括起来。
- incTudeArrayIndex:#可选，一个新宁段的名称用于存放元素的数组索引。该名称不能以S开头。
- preserveNu17AndEmptyArrays:#可选，default ;false，若为true,如果路径为空，缺少或为空数组，则sunwind输出文档

### 9.4 分组操作符

| 名称        | 描述                                                         |
| ----------- | ------------------------------------------------------------ |
| $avg        | 计算均值                                                     |
| $first      | 返回每组第一个文档，如果有排序，按照排序，如果没有按照默认的存储的顺序的第一个文档。 |
| $last       | 返回每组最后一个文档，如果有排序，按照排序，如果没有按照默认的存储的顺序的最后个文档。 |
| $max        | 根据分组，获取集合中所有文档对应值得最大值。                 |
| $min        | 根据分组，获取集合中所有文档对应值得最小值。                 |
| $push       | 将指定的表达式的值添加到一个数组中。                         |
| $addToSet   | 将表达式的值添加到一个集合中 (无重复值，无序)。              |
| $sum        | 计算总和                                                     |
| $stdDevPop  | 返回输入值的总体标准偏差 (population standard deviation)     |
| $stdDevSamp | 返回输入值的样本标准偏差 (the sample standard deviation)     |

