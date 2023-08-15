---
weight: 5
title: "window对象详解"
date: 2023-08-03T15:19:34+08:00
draft: false
tags: [javascript]
categories: [javascript]
summary: "js window 对象 详解"
featuredImagePreview: ""
toc:
  auto: false
---

## 什么是`window`对象?

`window` 是 JS 的最顶层对象 又叫 `BOM` 浏览器对象，`window` 包含了
主要的`document`,`location`,`navigator`,`screen`,`history`对象和自己的一些方法；
{{< mermaid >}}
graph TD;
window --> document
window --> location
window --> navigator
window --> screen
window --> history
{{< /mermaid >}}

## `window` 的常用方法

因为window对象是js中的顶级对象，因此所有定义在全局作用域中的变量、函数都会变成window对象的属性和方法，在调用的时候可以省略window。

### 字符串类

用于对字符串进行转义、解析或执行。

#### `encodeURI()`  `decodeURI()`

函数是用来对整个URL进行编码和解码的，它们会保留URL中的特殊字符，如冒号、斜杠、问号等。

```js

const url = "http://www.example.com?name=张三&age=20";
console.log(encodeURI(url)); // http://www.example.com?name=%E5%BC%A0%E4%B8%89&age=20
console.log(decodeURI("http://www.example.com?name=%E5%BC%A0%E4%B8%89&age=20")); // http://www.example.com?name=张三&age=20
```

#### `String()`

对一个非字符串类型的值进行文本操作时，可以用`String()`
来将其转换为字符串类型。入参可以是任何类型的值，会根据一定的规则将其转换为字符串类型。反参是一个字符串类型的值，如果入参是一个对象，那么反参就是该对象的字符串表示

```js
// 数字类型的值
String(37); // "37"

// 字符串类型的值
String("37"); // "37"
String("37.37"); // "37.37"
String("37,5"); // "37,5"
String("123ABC"); // "123ABC"

// 其他类型的值
String(true); // "true"
String(false); // "false"
String(null); // "null"
String(undefined); // "undefined"
```

{{< admonition tip>}}
`String()` 方法是通过原型对象的 `toString()` 转换的，但不一定总是调用 `toString()` 。有些对象可能重写了 `toString()`
或 `valueOf()` 方法，或者定义了自己的 `@@toPrimitive` 方法，来改变转换的逻辑。
{{< /admonition >}}

### 数值类型

#### `isNaN()`

在将任意值转换为数值类型时，判断该值是否为`NaN`;如果入参是NaN或者无法转换为数字，那么反参就是`true`，否则就是`false`

```js
    console.log(isNaN(37))     // false
isNaN(0 / 0); // true

isNaN("37"); // false
isNaN("37.37"); // false
isNaN("37,5"); // true
isNaN("123ABC"); // true
isNaN(true); // false
isNaN(false); // false
isNaN(null)   // false
isNaN(undefined); // true
isNaN({}); // true
isNaN(new Date()); // false
```

#### `Number()`

`Number()`
的入参可以是任何类型的值，它会根据一定的规则将其转换为数字类型。反参是一个数字类型的值，如果入参无法转换为数字类型，那么反参就是`NaN`

```js
    Number(37); // 37

// 字符串类型的值
Number("37"); // 37
Number("37.37"); // 37.37
Number("37,5"); // NaN
Number("123ABC"); // NaN

// 其他类型的值
Number(true); // 1
Number(false); // 0
Number(null); // 0
Number(undefined); // NaN
Number({}); // NaN
Number(new Date()); // 时间戳（毫秒数）
```

#### `parseFloat()`

用来把一个字符串转换成一个浮点数的，它只接受十进制的字符串。它会忽略字符串前面的空白字符，然后从第一个非空白字符开始解析，直到遇到一个不能被解析为数字的字符为止。如果字符串的第一个非空白字符不能被解析为数字，或者字符串为空，那么它会返回NaN

```js
console.log(parseFloat("10")); // 10
console.log(parseFloat("10.5")); // 10.5
console.log(parseFloat("abc")); // NaN
console.log(parseFloat("   10.5")); // 10.5
console.log(parseFloat("10.5abc")); // 10.5
```

#### `parseInt()`

用来把一个字符串转换成一个整数的，它可以接受一个基数参数来指定字符串的进制。异常规则同上；

```js
console.log(parseInt("1011", 2)); // 11
console.log(parseInt("B", 16)); // 11
console.log(parseInt("10.5")); // 10


```

### 定时器函数

用于设置延时或周期性执行的回调函数。

#### `setTimeout()`

此定时器只会执行一次并接收三个参数:

- `handler`: 需要执行函数;
- `timeout`： 延迟执行的时间;
- `...arguments`： 执行函数的入参,执行函数没有入参时，可以不传;  
  该函数会返回定时器的**唯一标识符**，可以通过该**标识符**对定时器进行**取消**或**修改**

```js
// 执行函数
function sayHello(msg, age) {
    console.log(msg, age);
}

const msg = "Hello World"
// 设置定时器，延时一秒后执行；
var timer = setTimeout(sayHello, 1000, msg, 1);  // Hello World 1
```

#### `clearTimeout()`

专门用于清除通过`setTimeout()`生成的定时器，只需将定时器**标识符**传入即可；调用`clearTimeout()`后，定时器则自己销毁，不会再执行函数;

```js
    // 执行函数
function sayHello(msg, age) {
    console.log(msg, age);
}

const msg = "Hello World"
// 设置定时器，延时一秒后执行；
var timer = setTimeout(sayHello, 1000, msg, 1);

// 如果想要取消定时器，可以调用 clearTimeout 函数，并传入定时器的标识符
clearTimeout(timer);  
```

#### `setInterval()`

此定时器为周期性定时器函数，延时执行周期相同：如果不清理该定时器，则会永远按周期执行下去；入参和返参与`setTimeout()`相同

```js
    const msg = "Hello World"

// 定义一个函数，打印出 Hello World
function sayHello(msg, age) {
    console.log(msg, age);

}

// 设置定时器，延时一秒后循环执行；
var timer = setInterval(sayHello, 1000, msg, 1);
// Hello World 1
// Hello World 1
// Hello World 1
// ...
```

{{< admonition type="tip"  >}}
如果想要循环执行定时器，但是每个周期不同，可以参数以下操作；

```js
const msg = "Hello World"

// 定义一个函数，打印出 Hello World
function sayHello(msg, age) {
    console.log(msg);
    console.log(age)
}

for (let i = 0; i < 10; i++) {
    // 每次循环创建一个定时器，按照不同的延时执行；
    var timer = setTimeout(sayHello, i * 1000, msg, 1);
    console.log(timer)
}

```

注意！这样做会创建多个定时器
{{< /admonition >}}

#### `clearInterval()`

专门用于清除通过`setInterval()`生成的定时器，只需将定时器**标识符**传入即可；调用`clearInterval()`后，定时器则自己销毁，不会再执行函数;

```js
    // 定义一个函数，打印出当前时间
function showTime() {
    console.log(new Date().toLocaleString());
}

// 设置一个重复执行的定时器，每隔1秒执行 showTime 函数
var timer = setInterval(showTime, 1000);

// 在重复执行之前，调用 clearInterval 函数，并传入定时器的标识符
clearInterval(timer);
```

#### 暂停 和 继续
主要是靠一个功能变量来记录上一个
### 辅助函数

用于与用户交互或操作窗口。

`close()` 关闭窗口
此方法可直接关闭当前窗口;

#### `alert()`

显示一个带有消息和确定按钮的对话框。它的主要用途是向用户显示一些提示信息或警告信息。它的入参是一个字符串，表示要显示的消息内容。它没有返回值

```js
alert("Hello World");
```

#### `confirm()`

显示一个带有消息和确定按钮和取消按钮的对话框。它的主要用途是向用户询问一些需要确认或拒绝的操作。它的入参是一个字符串，表示要显示的消息内容。它的返回值是一个布尔值，表示用户点击了确定按钮还是取消按钮

```js
// 显示一个对话框，内容为 Are you sure?
var result = confirm("Are you sure?");

// 根据用户的选择，打印出不同的消息
if (result) {
    console.log("You clicked OK");
} else {
    console.log("You clicked Cancel");
}
```

#### `prompt()`

显示一个带有消息和输入框和确定按钮和取消按钮的对话框。它的主要用途是向用户请求一些输入信息。它的入参有两个：第一个是一个字符串，表示要显示的消息内容，第二个是可选的，表示输入框的默认值。它的返回值是一个字符串，表示用户输入的内容，或者是
null，表示用户点击了取消按钮

```js
// 显示一个对话框，内容为 What is your name?，输入框的默认值为 John
var name = prompt("What is your name?", "John");

// 根据用户的输入，打印出不同的消息
if (name) {
    console.log("Hello, " + name);
} else {
    console.log("You did not enter your name");
}
```

#### `close()`

关闭当前浏览器窗口或标签页。它没有入参和返回值

```js
// 关闭当前浏览器窗口或标签页
close()
```

#### `open()`

打开新窗口并访问网页

```js
open("https://www.baidu.com")
```

## `navigator`

`navigator` 对象是 `JavaScript` 中的一个内置对象，它表示用户代理（浏览器）的状态和标识(包含有关浏览器的信息)。
它可以用于**获取**浏览器相关的信息和功能(**获取用户客户端环境**)。
可以直接使用 `navigator` 作为全局对象。

### 查看`navigator` 对象

{{< image src="/images/javascript/navigator.png" caption="查看`navigator` 对象" >}}

### 常用属性

#### `userAgent`

```js
console.log(navigator.userAgent)
```

表示浏览器的用户代理信息，也就是浏览器的类型、版本、操作系统等。你可以用这个属性来检测用户使用的是什么浏览器，或者做一些针对不同浏览器的兼容性处理。

#### `language`

```js
console.log(navigator.language)
```

表示用户设置的首选语言，通常是浏览器界面的语言。你可以用这个属性来判断用户使用的是什么语言，或者做一些针对不同语言的本地化处理

#### `geolocation`

这个属性返回一个`Geolocation`对象，可以用来获取用户的地理位置信息，比如经度、纬度、海拔等。
`geolocation`有三个方法`getCurrentPosition()`，`watchPosition()`， `clearWatch()` 这三个方法的功能和用途,下面分别介绍

##### `getCurrentPosition()`

可以获取设备的当前位置，这方法接收两个函数类型的参数`successCallback`和`errorCallback` ;  
`successCallback`参数有个`Position` 对象，该对象包含经度、纬度、精度等属性。
`errorCallback`参数有一个`error`对象，该对象包含了获取位置信息失败的原因；

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<style>
</style>
<body>
<div id="demo">
    <span class="nav-sub"></span>
    <button onclick="getLocation()">获取位置信息</button>
</div>
</body>
<script>
    const x = document.getElementById("demo"); // 获取显示位置信息的元素

    function getLocation() { // 定义获取位置的函数
        if (navigator.geolocation) { // 检查浏览器是否支持 Geolocation
            navigator.geolocation.getCurrentPosition(showPosition, showError); // 调用 getCurrentPosition 方法，传入成功和错误回调函数
        } else {
            x.innerHTML = "该浏览器不支持获取地理位置。"; // 如果不支持，显示提示信息
        }
    }

    function showPosition(position) { // 定义成功回调函数
        x.innerHTML = "纬度: " + position.coords.latitude + "<br>经度: " + position.coords.longitude; // 在网页上显示经纬度
    }

    function showError(error) { // 定义错误回调函数
        switch (error.code) { // 根据错误码显示不同的提示信息
            case error.PERMISSION_DENIED:
                x.innerHTML = "用户拒绝了获取地理位置的请求。"
                break;
            case error.POSITION_UNAVAILABLE:
                x.innerHTML = "无法获取当前位置信息。"
                break;
            case error.TIMEOUT:
                x.innerHTML = "获取位置信息超时。"
                break;
            case error.UNKNOWN_ERROR:
                x.innerHTML = "发生了未知错误。"
                break;
        }
    }
</script>
</html>
```

##### `watchPosition()`  `clearWatch()`

`watchPosition()`:注册一个位置变化的监听器，每当设备位置发生变化时，就会返回一个 Position 对象。你需要传入同样的参数，以及一个返回值，表示监听器的
ID。这个方法的主要用途是在需要实时监控位置变化的场景下使用，比如跟踪运动轨迹、显示实时地图等  
`clearWatch()`：取消由 `watchPosition` 注册的监听器，你需要传入监听器的 ID。这个方法的主要用途是在不需要继续监控位置变化时使用，比如停止运动、关闭地图等。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<style>
</style>
<body>
<div id="demo">
    <span class="nav-sub"></span>
    <button onclick="startWatch() ">获取位置信息</button>
    <button onclick="stopWatch() ">停止位置信息</button>
</div>
</body>
<script>
    var x = document.getElementById("demo"); // 获取显示距离信息的元素
    var watchId; // 定义监听器 ID 的变量
    var prevPos; // 定义上一次位置信息的变量

    function startWatch() { // 定义开始监听位置变化的函数
        if (navigator.geolocation) { // 检查浏览器是否支持 Geolocation
            watchId = navigator.geolocation.watchPosition(showDistance, showError); // 调用 watchPosition 方法，传入成功和错误回调函数，并保存监听器 ID
        } else {
            x.innerHTML = "该浏览器不支持获取地理位置。"; // 如果不支持，显示提示信息
        }
    }

    function stopWatch() { // 定义停止监听位置变化的函数
        if (watchId) { // 检查是否有有效的监听器 ID
            navigator.geolocation.clearWatch(watchId); // 调用 clearWatch 方法，传入监听器 ID，取消监听
            watchId = null; // 将监听器 ID 设为 null
            prevPos = null; // 将上一次位置信息设为 null
        }
    }

    function showDistance(position) { // 定义成功回调函数
        if (prevPos) { // 检查是否有上一次位置信息
            var distance = getDistance(prevPos.coords, position.coords); // 调用自定义的 getDistance 函数，计算两个位置之间的距离，单位为米
            x.innerHTML = "你已经移动了 " + distance + " 米。"; // 在网页上显示移动的距离
        }
        prevPos = position; // 将当前位置信息保存为上一次位置信息
        x.innerHTML = "你已经移动了 " + prevPos.coords.latitude + prevPos.coords.longitude + " 米。"; // 在网页上显示移动的距离

    }

    function showError(error) { // 定义错误回调函数
// 同上
    }

    function getDistance(p1, p2) { // 定义计算两个位置之间距离的函数，使用 Haversine 公式
        var R = 6371e3; // 地球半径，单位为米
        var lat1 = p1.latitude * Math.PI / 180; // 将第一个位置的纬度转换为弧度
        var lat2 = p2.latitude * Math.PI / 180; // 将第二个位置的纬度转换为弧度
        var dLat = (p2.latitude - p1.latitude) * Math.PI / 180; // 计算两个位置的纬度差，转换为弧度
        var dLon = (p2.longitude - p1.longitude) * Math.PI / 180; // 计算两个位置的经度差，转换为弧度
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2); // 计算 Haversine 公式中的 a
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); // 计算 Haversine 公式中的 c
        var d = R * c; // 计算 Haversine 公式中的 d，即两个位置之间的距离，单位为米
        return d;
    }


</script>
</html>
```

{{< admonition type="tip">}}
你可以用这个属性来实现一些基于位置的功能，比如导航、地图、天气等。你需要注意，这个属性需要用户授权才能使用，并且只能在安全的页面（HTTPS）上使用

```js
  console.log(position)
```

如果不了解`position`参数，可以打印查看
{{< /admonition >}}

#### `mediaDevices`

可以用来访问用户的媒体设备，比如摄像头、麦克风、扬声器等。你可以用这个属性来实现一些基于媒体的功能，比如视频聊天、录音、拍照等。你需要注意，这个属性需要用户授权才能使用，

#### `clipboard`

可以用来访问用户的剪贴板，比如复制、粘贴、剪切等。你可以用这个属性来实现一些基于剪贴板的功能，比如分享、编辑、转换等。你需要注意，这个属性需要用户授权才能使用，

### 常用方法

#### `sendBeacon()`

可以在浏览器关闭或切换页面时，向指定的url发送一些数据，比如统计信息、日志信息等。这个方法不会阻塞浏览器的卸载过程，也不会影响用户体验。

#### `vibrate()`

可以让设备产生振动效果，比如在游戏、通知、警告等场景中使用。pattern参数是一个数组，表示振动和停止的时间间隔，单位是毫秒

#### `share()`

可以让用户分享一些文本、链接、图片等内容到其他应用或平台，比如微信、微博、QQ等。data参数是一个对象，包含title、text、url等属性。你需要注意，这个方法只能在支持Web
Share API的浏览器中使用，并且需要用户手动触发

## `document`

**document** 对象是一个表示当前网页的对象，它有许多属性和方法可以用来获取和操作文档的内容、结构和样式。根据你的要求，我将 *
*document** 的属性和方法按以下几个类别进行介绍

### 文档对象(DOM元素)
---
#### 获取DOM元素
在`document`中有多种方式可以获取DOM元素主要方法有
```js
    // 获取一个
    document.querySelector();
    // 获取匹配到的全部
    document.querySelectorAll();
```
该函数接收`CSS`选择器的字符串，返回一个`HtmlElement`对象;未匹配到时，返回`null`
- 通过ID获取需要使用`#`代表，通过id选择
```html
<body>
<div id="demo">
  <input type="text">
</div>
</body>
<script >
  let paragraph = document.querySelector("#demo");
  console.log(paragraph)
</script>

```
- 通过Class获取需要使用`.`代表，通过Class选择
```html
<body>
<div class="demo">
  <input type="text">
</div>
</body>
<script >
  let paragraph = document.querySelector(".demo");
  console.log(paragraph)
</script>

```

- 通过子代组合器获取
```html
<body>
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
</ul>
</body>
<script >
  let paragraph1 = document.querySelector("ul > li:nth-child(1)");
  let paragraph2 = document.querySelector("ul > li:nth-child(2)");
  console.log(paragraph)
  console.log(paragraph2)
</script>

```
{{< admonition type="note"  >}}
选择器之间可以交替使用
```html

<body>
<div id="demo">
  <div id="demo2">
    <input type="text" placeholder="1">
    <input type="text" placeholder="2">
  </div>
</div>

</body>
<script>

  let paragraph = document.querySelector("#demo  #demo2 input:nth-child(2) ");
  // 监听鼠标移动事件
  paragraph.addEventListener("mouseleave", function () {
    console.log(111)
  })

</script>
```
{{< /admonition >}}


### 文档事件
---
#### 事件添加
通过选择器获取`htmlElement`对象，然后调用`addEventListener`该函数入参有两个，第一个是指定**事件的类型**和**事件的执行函数**；**执行函数**有一个`event`对象,该对象叫做**事件对象**；
```js
    let paragraph = document.querySelector("#demo");
    // 监听鼠标移动事件
    paragraph.addEventListener("mouseleave",function (event) {
        console.log(111)
    })

```
#### 事件对象
事件对象（Event Object）具有许多常用的属性和方法，可以用于处理事件的相关信息。以下是一些常用的事件对象属性和方法：

属性：
- `event.target`：获取触发事件的元素。
- `event.type`：获取事件的类型。
- `event.key`：获取按下的键的标识符。
- `event.clientX` 和 `event.clientY`：获取鼠标指针相对于浏览器窗口可视区域的水平和垂直坐标。
- `event.pageX` 和 `event.pageY`：获取鼠标指针相对于整个文档页面的水平和垂直坐标。
方法：
- `event.preventDefault()`：阻止事件的默认行为。
- `event.stopPropagation()`：停止事件的捕获和事件冒泡。


#### 事件流
事件流包含两个阶段：事件的捕获与冒泡，只能选择其中一个阶段
- 捕获 ： 当触发一个事件时，该事件会从DOM对象开始先执行，然后在向内部节点执行；

  {{< admonition type="note" >}}
  当点击c2的div时，会触发click事件， 事件执行过程为  先执行document 对象监听的**click**事件，然后执行**c1**的点击事件，最后执行**c2**的点击事件
   ```html
    <div class="c1" onclick="f1">
    <div class="c2" onclick="f2">
        
    </div>
    </div>
  ```
  这个由外向内的过程称为：捕获
  {{< /admonition >}}

- 冒泡：该阶段与捕获阶段相反，先执行被点击的节点的点击事件，再往父级执行，最后执行document的`click`事件,整个过程为 **由内向外**
  



#### 事件委托
这是类似一种设计模式，通过事件流的**冒泡**实现，设计思路为将事件绑定到父级中，当子级触发事件时，通过冒泡方式到父级上，父级可以通过事件对象来操控所有子级对象；从而减少代码量
```js
<body>
<ul>
    <li>l1</li>
    <li>l2</li>
    <li>l3</li>
</ul>
</body>
<script>

    let paragraph = document.querySelector("ul");
    paragraph.addEventListener("click",function (ev) {
    if (ev.target.targetName === "LI"){
        
        if (ev.target.style.color ==='red'){
            ev.target.style.color ='black'
            return
        }
        ev.target.style.color ='red'
    }})


</script>
```

#### 事件类型
{{< image src="/images/javascript/基本js事件.png" caption="基本事件" >}}


