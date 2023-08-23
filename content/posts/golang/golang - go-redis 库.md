
title: "golang - go-redis 基本使用"
date: 2023-08-17T15:06:34+08:00
draft: false
description: "有[featuredImagePreview]图片时，鼠标聚焦图片展示该文字"
author: "Turan"
tags: [golang,database]
categories: [golang]
hiddenFromHomePage: false
toc:
    auto: false
---
## 1 介绍

### 1. 初始化
```bash
go get github.com/redis/go-redis/v9
```
以简洁的方式初始化客户端
```go
import (
    "github.com/redis/go-redis/v9"
)

var db = redis.NewClient(&redis.Options{
Addr:     "localhost:6379",
Password: "", // 没有密码，默认值
//db:       0,  // 默认db 0
})

```

## 2 本数据类型
### 2.0 公共方法
```go
func TestComm(t *testing.T) {
	// keys *    :获取所有key值
	keys := db.Keys(ctx, "*").Val()
	fmt.Println(keys)

	// exists []key :返回存在的数量
	val := db.Exists(ctx, "mykey", "myke1y").Val()
	fmt.Println(val)

	// type key :返回key的数据类型
	vType := db.Type(ctx, "mykey").Val()
	fmt.Println(vType)

	// del key :删除key ；成功1，失败0；  原子性：大值可能造成阻塞
	succ := db.Del(ctx, "mykey").Val()
	fmt.Println(succ)

	// unlink key :删除key; 即时返回，异步执行删除任务
	i := db.Unlink(ctx, "mykey").Val()
	fmt.Println(i)

	// ttl key  :判断key是否过期; -1 永不过去；-2 已过期
	duration := db.TTL(ctx, "mykey").Val()
	fmt.Println(duration)

	// expire key :给已存在的key设置过期时间；true ;false
	expire := db.Expire(ctx, "mykey11", time.Second).Val()
	fmt.Println(expire)

	// select indexDb : 切换数据库
	i2 := db.Do(ctx, "select", 0).Val()
	fmt.Println(i2)

	// flushdb  :清空当前数据库
	do := db.Do(ctx, "flushdb").Val()
	fmt.Println(do)

	// flushall  :清空全部数据库
	i3 := db.Do(ctx, "flushall").Val()
	fmt.Println(i3)

}

```
### 2.1 string
```go
var ctx = context.Background()

func TestString(t *testing.T) {
	// set key value expir ; 设置值，可标记过期时间；
	set := db.Set(ctx, "mykey12", 0, -1)
	fmt.Println(set.Val())

	// set key value xx : 只覆盖已存在的key
	b2 := db.SetXX(ctx, "", "", 0).Val()
	fmt.Println(b2)

	// setnx key value : 不存在时，设置该值
	b := db.SetNX(ctx, "", "", 0).Val()
	fmt.Println(b)

	// get key  : 获取值
	str := db.Get(ctx, "mykey").Val()
	fmt.Println(str)

	// APPEND key value ;  末尾拼接字符串；返回长度
	val := db.Append(ctx, "mykey", "+111111").Val()
	fmt.Println(val)

	// mget ...key ： 获取多个值，失败返回nil
	result := db.MGet(ctx, "key1", "ke2")
	fmt.Println(result.Val(), len(result.Val()), result.Err())

	// mset key vaule key2 vaule : 设置多个值
	result2 := db.MSet(ctx, "key1", "va1", "key2", "va2")
	fmt.Println(result2.Val(), len(result2.Val()))

	// incr key    :  自增 1
	i := db.Incr(ctx, "mykey12").Val()
	fmt.Println(i)

	// Decr key : 自减 1
	i2 := db.Decr(ctx, "mykey12").Val()
	fmt.Println(i2)
}

```
### 2.2 list

```go
func TestList(t *testing.T) {
	// lpush key ...values : 从头部写入数据
	lPush := db.LPush(ctx, "lpush", "v1", "v2").Val()
	fmt.Println(lPush)

	// rpush key ...values : 从尾部写入数据
	rpsh := db.RPush(ctx, "rpush", "var", "var2", "var3").Val()
	fmt.Println(rpsh)

	// lrange key index stop  : 遍历数组元素
	val := db.LRange(ctx, "lpush", 0, -1).Val()
	fmt.Println(val)

	// rpop key : 从数据右边getDel一个元素
	s := db.RPop(ctx, "rpush").Val()
	fmt.Println(s)

	// lindex key index : 下标访问数组元素
	index := db.LIndex(ctx, "rpush", 0).Val()
	fmt.Println(index)

	// llen key  : 返回数组长度
	cmd := db.LLen(ctx, "rpush").Val()
	fmt.Println(cmd)

	// rpoplpush sourcesKey targetKey : 将源key的一个尾部元素，添加到目标key的头部
	s2 := db.RPopLPush(ctx, "lpush", "rpush").Val()
	fmt.Println(s2)

	//
}

```
### 2.3 set
```go
func TestSet(t *testing.T) {
	// sadd key ...value  : 元组添加元素； 自动去重
	val := db.SAdd(ctx, "set1", []string{"222", "{123}", "{1232}", "123", "1233"}).Val()
	fmt.Println(val)

	// srem  key1 memners : 从集合中删除指定的元素
	db.SRem(ctx, "set1", "111", 111)

	// SMembers key value : 判断value 是否存在
	member := db.SIsMember(ctx, "set1", "11").Val()
	fmt.Println(member)

	// scard key: 获取数组长度
	i := db.SCard(ctx, "set1").Val()
	fmt.Println(i)

	// spop key : 随机吐出1个元素
	s := db.SPop(ctx, "set1").Val()
	fmt.Println(s)

	//  spop key N :  随机吐出N个元素
	i2, _ := db.SPopN(ctx, "set1", 2).Result()
	fmt.Println(i2)

	// sRandMember key : 随机获取1个元素
	randMember, _ := db.SRandMember(ctx, "set1").Result()
	fmt.Println(randMember)

	// smove key1 key2 value : 将key1里面的value移动到key2
	move := db.SMove(ctx, "set1", "set2", []int{222, 222}).Val()
	fmt.Println(move)

	// SMembers key value : 获取元组的所有元素
	strings := db.SMembers(ctx, "set1").Val()
	fmt.Println(strings)

}

// 集合运算
func TestSetCal(t *testing.T) {
	// sdiff key1 key2 : 获取key1 有key2没有的元素 ，差集
	val := db.SDiff(ctx, "set1", "set2").Val()
	fmt.Println(val)

	// sunion key1 key2 : 获取key1 和key2 都没有的元素，合集
	strings := db.SUnion(ctx, "set1", "se2").Val()
	fmt.Println(strings)

	// sintercard count key1 key2 : count是参与运算的key数；返回key1 key2 都有的元素的个数；交集后的长度
	i := db.SInterCard(ctx, 2, "set1", "set2").Val()
	fmt.Println(i)

	// sintercard key1 key2 : 返回key1 key2 都有的元素；交集
	inter := db.SInter(ctx, "set1", "set2").Val()
	fmt.Println(inter)

}
```
### 2.4 hash
```go

func TestHash(t *testing.T) {
	var user = "user:001"
	// map[string]map[string]interface{} ： hash本质是嵌套map

	// hset key field value  :  设置值
	val := db.HSet(ctx, user, "name", "wangshao").Val()
	fmt.Println(val)

	// hget key field : 获取值
	name := db.HGet(ctx, user, "name").Val()
	fmt.Println(name)

	// hgetall key : 获取整个map
	m := db.HGetAll(ctx, user).Val()
	fmt.Println(m)

	// hexists key field : 判断字段是否存在
	b := db.HExists(ctx, user, "name").Val()
	fmt.Println(b)

	// hlen key : 獲取key内 键值对数量
	hLen := db.HLen(ctx, user).Val()
	fmt.Println(hLen)

	// hkeys key : 获取key内的所有键
	strings := db.HKeys(ctx, user).Val()
	fmt.Println(strings)

	// hvals key : 获取key内的所有键的值
	i := db.HVals(ctx, user).Val()
	fmt.Println(i)

	// hincrby key field : 对字段的值递增; 可对不存在的值增加,无法对float数增加
	err := db.HIncrBy(ctx, user, "name1", 1).Err()
	if err != nil {
		log.Fatal(err)
	}

	// HIncrByFloat key field : 对字段的值递增; 可对不存在的值增加
	err = db.HIncrByFloat(ctx, user, "name1", 1).Err()
	if err != nil {
		log.Fatal(err)
	}

	// Hsetnx key feild value : field不存在时，设置成功；反之，失败
	err = db.HSetNX(ctx, user, "name1", "name1111").Err()
	if err != nil {
		log.Fatal(err.Error())
	}

}

```
### 2.5 zet