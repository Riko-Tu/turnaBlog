---
weight: 5
title: "javascript 数据结构"
date: 2023-08-03T15:19:34+08:00
draft: false
tags: [javascript]
categories: [javascript]
summary: "记录js的基本常用语法"
featuredImagePreview: ""
---

## 数组
### 什么是数组？

数组是值的有序集合;

JavaScript 数组Array可以包含任意数据类型，并通过索引来访问每一个元素。

### 数组特点

1. 数组定义时无需指定数据类型，无需指定数组长度，可以存储任何数据类型的数据；

2. 数组成员可以是任何类型的值(原始类型,对象类型(包括数组),函数类型)；

3. 如果数组的成员的值也是数组,那么就构成了多维数组.多维数组是变长的。

### 创建数组

```js
const arr =  [];    // 空数组

// 字面量：数组可以存放任意数据；
const arr2 = [1,"1",{id:1},["test",3]];   
```
### 添加元素
```js
const arr =  [];    // 空数组

arr[arr.length] = 1;   // 在末尾添加
arr[arr.length] = 2;
console.log(arr);   // [ 1, 2 ]
```
### 访问和修改元素
```js
const arr2 = [1,"1",{id:1},["test",3]];
console.log(arr2[1]);  // 1
console.log(arr2[0]);  // 1

arr2[0] = {id :10};
console.log(arr2[0]);   // {id :10}
```
{{< admonition tip >}}
数组的 `length` 属性和数值属性是连接的，修改其中一个会影响另一个。特别是，减少 `length` 属性会删除数组的尾部元素;

```js
const arr2 = [1,"1",{id:1},["test",3]];
console.log(arr2.length)   // 4
arr2.length = 3
console.log(arr2)   //  [ 1, '1', { id: 1 } ]
arr2.length = 10
console.log(arr2)   //  [ 1, '1', { id: 1 }, <7 empty items> ]
console.log(arr2[7])   // undefined
console.log(arr2[20])   // undefined
```
如果通过下标访问得到的值是`undefined`,那么大概率是数组越界了，因为一般不会像 `arr2.length = 10`这样去赋值数组的长度；
{{< /admonition >}}
### 迭代方式 

#### `for`
```js
const arr2 = [1,"1",{id:1},["test",3]];
for(var i = 0; i < arr2.length; i++) {
  console.log(arr2[i]);
}
// 1
// 1
// { id: 1 }
// [ 'test', 3 ]


const arr2 = [1,"1",{id:1},["test",3]];
// 先缓存 arr2.length
for(var i = 0, len = arr2.length; i < len; i++) {
  console.log(arr2[i]);
}
```

#### `for-of`

```js
const arr2 = [1,"1",{id:1},["test",3]];
for(let item of arr2) {
    console.log(item);
}
// 1
// 1
// { id: 1 }
// [ 'test', 3 ]
```

#### `forEach()`

用来遍历数组中的每一项，不影响原数组，性能差
- 缺点：
  1. 无法使用`return`返回元素,因为返回后会被`forEach`函数接受；
  2. 函数内部不能使用 `break`
```js
const arr2 = [1,"1",{id:1},["test",3]];

arr2.forEach( function(item) {
    // break
    console.log( item);
    // if (item ===1) {
        // return item;  
    // }

})
```

#### `map()`

相当与原数组克隆了一份,把克隆的每项改变了,不影响原数组
```js
const arr2 = [1,"1",{id:1},["test",3]];
const newarr = arr2.map( function(item) {
  console.log(item);
  item = 1
  return item;
})
console.log(arr2);  // [1,"1",{id:1},["test",3]]
console.log(newarr);  // [ 1, 1, 1, 1 ]
```

### 常规操作
#### 改变原数组的方法
##### `pop()` 末尾取出
从末尾取出一个元素,此函数会返回被取出元素
```js
const arr2 = [1,"1",{id:1},["test",3]];
console.log(arr2.pop());    //  ["test",3]
console.log(arr2);   // [ 1, '1', { id: 1 } ]
```
##### `push()` 末尾添加
从末尾添加一个元素,此函数会返回添加元素后的数组长度;
```js
const arr2 = [1, "1"];
const arr3 = [23, 23];

// 添加 "test"  元素
arr2.push("test");
console.log(arr2)  // [ 1, '1', 'test' ]

// 将 arr3 数组作为一个元素添加
arr2.push(arr3);
console.log(arr2)  // [ 1, '1', 'test', [ 23, 23 ] ]

// 遍历 arr3 的每个元素顺序添加到 arr2 数组中
arr2.push(...arr3);
console.log(arr2) // [ 1, '1', 'test', [ 23, 23 ], 23, 23 ]
```
##### `unshift()` 头部添加
从元素的头部添加数据,此函数会返回添加元素后的数组长度;
```js
const arr2 = [1, "1"];
const arr3 = [23, 24];

// 添加 "test"  元素
arr2.unshift("test");
console.log(arr2)  // [ 'test', 1, '1' ]

// 将 arr3 数组作为一个元素添加
arr2.unshift(arr3);
console.log(arr2)  // [ [ 23, 23 ], 'test', 1, '1' ]

// 遍历 arr3 的每个元素顺序添加到 arr2 数组中
arr2.unshift(...arr3);
console.log(arr2) // [ 23, 24, [ 23, 24 ], 'test', 1, '1' ]
```
{{< admonition tip >}}
当通过 `...arr3` 的方式写入时,写入元素的顺序与arr3的顺序是一致的;
```js
// 遍历 arr3 的每个元素顺序添加到 arr2 数组中
arr2.unshift(...arr3);
console.log(arr2) // [ 23, 24, [ 23, 24 ], 'test', 1, '1' ]
```
{{< /admonition >}}

##### `shift()` 头部删除
从头部删除元素,此函数会返回被删除的元素;
```js
const arr2 = [1, "1"];
console.log(arr2.shift())   //  1
console.log(arr2)   // [ '1' ]
```
##### `reverse()` 数组翻转
数组元素翻转,此函数会返回翻转后的数组;
```js
const arr2 = [1, 2, 3, 4];
console.log(arr2.reverse())   //  [ 4, 3, 2, 1 ]
console.log(arr2)   // [ 4, 3, 2, 1 ]
```
##### `sort()` 排序
数组排序,接受更改排序方式函数;此函数会返回排序后的数组;
```js
const arr2 = [2,1,4,  3];
console.log(arr2.sort())  // [ 1, 2, 3, 4 ]
console.log(arr2)   // [ 1, 2, 3, 4 ]

// 倒序
console.log(arr2.sort((a, b)=> {return b-a})) // [ 4, 3, 2, 1 ]
console.log(arr2)   // [ 4, 3, 2, 1 ]
```
{{< admonition tip >}}
更改排序方式案例:
```js
const arr2 = [{id: 1,name:"jack"},{id: 2,name:"tom"},{id: 3,name:"bob"},  {id: 4,name:"anni"}];
// 倒序
console.log(arr2.sort((a, b)=> {return b.id-a.id})) // [ 4, 3, 2, 1 ]
```
{{< /admonition >}}

#### 不改变原数组的方法
##### `concat()` 数组合并
合并接收到的元素对象, `return` 合并后的新数组
```js
const arr2 = [1, "1"];
const arr3 = [23, 23];

// 添加 "test"  元素
newarr = arr2.concat("test",arr3);
console.log(arr2)  // [ 1, '1' ]
console.log(newarr) // [ 1, '1', 'test', 23, 23 ]
```
##### `join()` 数组转String
接受任意的连接符号, `return` 连接后的字符串
```js
const arr2 = [1, 2,3,4,5,6];

console.log(arr2.join(","))  // 1,2,3,4,5,6
console.log(typeof arr2.join(","))  // string
```

##### `indexOf()` 元素查询
传入需要任意需要查询元素, `return` 元素所在下标；未找到时, 返回 -1
- 可选择从第几个下标开始查找, 默认0 
```js
const arr2 = [1, 2,3,4,3,5];

console.log(arr2.indexOf(3,0))   // 2
console.log(arr2.indexOf(0))   // -1

```

##### `filter()` 数组过滤
接收一个函数, 此函数接受三个值, `value` 原数组的每一个元素, `index` 对应元素的下标, `array` 原数组;

```js
const arr2 = [1, 2,3,4,3,5];
newarr = arr2.filter(function (value, index, array) {
      if (value ===1 ){
          return value
      }
})
console.log(newarr)    // [1]
```

{{< admonition tip>}}
需要注意的是如果在过滤元素时，出现了一次返回 `array` 的情况, 那么就会直接得到原数组
```js
const arr2 = [1, 2, 3, 4, 3, 5];
newarr = arr2.filter(function (value, index, array) {
    if (value !== 5) {
        return value
    }
    return array
})
console.log(newarr)    // [ 1, 2, 3, 4, 3, 5 ]
```
{{< /admonition >}}


