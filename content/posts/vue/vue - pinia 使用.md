--- 
title: "vue - pinia 使用"
date: 2023-08-28T15:06:34+08:00
draft: false
author: "Turan"
tags: [vue]
categories: [vue]
toc:
    auto: false
---

## 1 介绍
`Pinia` 是一个用于 `Vue.js` 的状态管理库。它提供了一个简单、可扩展且高效的方式来管理应用程序的状态。下面是对 Pinia 的介绍：
### 1.1 前身
**Pinia** 是基于 Vue 2.x 版本中的 Vuex 库发展而来的。它借鉴了 Vuex 的设计思想，并在 Vue 3.x 的基础上进行了优化和扩展。Pinia 旨在提供更好的类型推断、模块化和可测试性。


### 1.2 环境
Pinia 适用于 Vue.js 2.x 和 Vue.js 3.x 版本。无论您选择使用哪个版本，Pinia 都能为您提供一致的状态管理解决方案。
{{< admonition type="tip"  >}}
由于**Pinia**在vue3中使用比较简单，本章演示环境会vue3
{{< /admonition >}}
## 2 基本使用

### 2.1 安装
要开始使用 Pinia，您需要通过包管理工具（如 npm 或 yarn）将 Pinia 安装为您的项目依赖：
```bash
npm install pinia
```

```js
// main.js
import App from './App'
import { createPinia } from 'pinia'    // 导入函数
import { createSSRApp } from 'vue'

const pinia = createPinia()          // 获取实例

export function createApp() {
    const app = createSSRApp(App)
    app.use(pinia)                 // 实例注入
    return {
        app
    }
}
```

### 2.2 容器结构
在 Pinia 中，状态被组织在称为 "容器" 的地方。容器是一个包含了状态和相关操作的对象。您可以创建多个容器来管理不同的状态模块。

创建容器的示例代码如下：
```js
// test.js
import { defineStore } from 'pinia'
// 1.定义并导出容器
// 参数1: 容器的 ID，必须唯一，将来 Pina 会把所以的容器挂载到根容器
// 参数2:选项对象
// 返回值: 一个函数，调用得到容器实例
export const tagStore = defineStore('test', {
    /**
     *类似于组件的 data，用来存储全局状态的
     *1.必须是函数:这样是为了在服务端染的时候避免交叉请求导致的数据状态污染
     * 2.必须是箭头函数，这是为了更好的 TS 类型推导
     **/
    state: () => ({
        tt: 100,
    }),

        //类似于组件的 computed，用来封装计算属性，有缓存的功能
    getters: {
        doubleCount: (state) => state.tt * 2,
    },

    //*类似于组件的 methods，封装业务逻辑，修改 state
    actions: {
        increment() {
            this.tt++
        }, 
        add(num){                // 也可以定义有参函数
            this.tt += num
        }
    }
})
```
在设置容器中：
- **ref() s** 成为`state`属性
- **computed()** 成为`getters`
- **function()** 成为`actions`



### 2.3 内置函数
根据您提供的代码，看起来您想要了解关于 `defineStore` 实例的一些方法和属性。以下是对每个方法和属性的简要说明：

- `$id`: **defineStore** 实例的唯一标识符。它是由 `createStore` 函数自动生成的标识符，用于在 Pinia 中唯一标识每个容器实例。
- 
- `$state`: **defineStore** 实例的状态对象。它包含所有在容器中定义的状态属性。您可以直接访问和修改此对象的属性来操作状态。
- 
- `$subscribe()`: 用于订阅 **defineStore** 实例的状态变化。通过调用此方法并提供一个回调函数，您可以在状态发生变化时接收通知，并执行相应的操作。

- `$patch()`: 用于在操作内部修改状态。它接受一个回调函数作为参数，该函数接收当前状态作为参数，并允许您对状态进行修改。
- 
- `$onAction()`: 用于注册一个回调函数，当 **defineStore** 实例的任何`actions`被调用时，该回调函数将被触发。 `func`包含了 **函数名称** 以及 **参数** 等信息 
- 
- `$reset()`: 用于重置 **defineStore** 实例的状态。调用此方法会将状态重置为初始值。这将导致状态的所有订阅者重新计算和更新。

- `$dispose()`: 用于销毁 **defineStore** 实例。调用此方法会清除 **defineStore** 实例的状态和订阅，以及释放与它相关的资源。在不再需要 **defineStore** 实例时，可以调用此方法进行清理。

请注意，这些方法和属性是 **Pinia** 库的特定功能，用于管理和操作容器实例的状态
```vue
<template>
	<view class="container">
		<button @click="tag.increment(10)">increment</button>
		<button @click="reset()">reset</button>
		<button @click="dispose()">dispose</button>
		{{tag.tt}}
		{{ tag.doubleCount }}
	</view>

</template>

<script setup>
	import {storeToRefs} from "pinia";
	import {tagStore} from "../../store/tag.js"

	const tag = tagStore()
	
	// $id :
	console.log('id:', tag.$id);
	
	// $state ： 访问或修改
	console.log('tt:',tag.$state.tt); 
	tag.$state.tt++
	
	// $subscribe() : 订阅状态变化
	const unsubscribe = tag.$subscribe((state) => {
	  console.log('状态变化:', tag.$state.tt)
	 
	})
	unsubscribe()     // 取消订阅
	
	// $patch() ： 批量变更
	tag.$patch((state) =>{
		state.tt++
		// ...
	})	
	
	
	// $onAction :  注册函数回调函数(订阅函数执行)
	tag.$onAction((func) => {
	  console.log('操作被调用:', func)    
	})
	

	// $reset()  : 重置 state 状态
	function reset (){
		 tag.$reset()
	}
	// $dispose() ： 销毁
	function dispose (){
		 tag.$dispose()
	}
	

</script>

```



### 2.4 容器访问
要在组件中使用容器的状态和操作，您可以使用 `tagStore()` 函数。

```vue
<template>
	<view class="container">
		<button @click="tag.increment()">increment</button>
		{{tag.tt}}
		{{ tag.doubleCount }}
	</view>

</template>

<script setup>
	import { tagStore } from ".../test.js"
	
	const tag = tagStore()

</script>
```
导入 `tagStore` 后先进行调用得到一个`defineStore`函数的容器，使用`const`变量接受，之后可以在模版内自行访问，此时都是

### 2.5 解构访问
在 Pinia 中，您可以使用解构语法对容器的状态和操作进行访问。这样可以简化代码并提高可读性
```vue
<template>
	<view class="container">
		<button @click="increment()">increment</button>
		{{tt}}
		{{ doubleCount }}
	</view>

</template>

<script setup>
    import { tagStore } from ".../test.js"
	
	const {tt,doubleCount,increment} = tagStore()

</script>
```
解构后可以直接使用变量进行模版渲染，但是此解构方式，不具备响应式，若需要响应式解构需要调用额外的函数`storeToRefs`

{{< admonition type="note" title="响应式解构" >}}
```vue
<template>
	<view class="container">
		<button @click="increment()">increment</button>
		{{tt}}
		{{ doubleCount }}
	</view>

</template>

<script setup>
	import { storeToRefs } from "pinia";
    import {tagStore} from "/test.js"
	
	const tag = tagStore()
	
	// 解构 state 和 getters 属性为响应式
	const {tt,doubleCount} = storeToRefs(tag)
	
	// 函数可以直接使用容器进行结构
	const {increment} =tag


</script>
```
{{< /admonition >}}

### 2.6 状态变更
在 Pinia 中，要更改状态（state），您可以在容器的操作（actions）中对状态进行修改。操作是用于更新状态的函数，可以在容器中定义并在需要时调用。
{{< admonition type="note" title="单次变更" >}}
```vue
<template>
	<view class="container">
		<button @click="tag.increment()">increment</button>
		<button @click="test()">increment</button>
		{{tag.tt}}
		{{ tag.doubleCount }}
	</view>

</template>

<script setup>
	import {storeToRefs} from "pinia";
	import {tagStore} from "test.js"

	const tag = tagStore()
	// 普通提交
	function test (){
		tag.tt = 100
		tag.doubleCount++
	}
	
</script>

```
这种直接操作状态的方法，变更多次视图就要渲染多次，性能较差
{{< /admonition >}}
{{< admonition type="note" title="批量变更" >}}
```vue
<template>
	<view class="container">
		<button @click="tag.increment()">increment</button>
		<button @click="test()">increment</button>
		{{tag.tt}}
		{{ tag.doubleCount }}
	</view>

</template>

<script setup>
	import {storeToRefs} from "pinia";
	import {tagStore} from "test.js"

	const tag = tagStore()
	// 批量提交
	function test (){
		tag.$patch(state =>{
			state.tt++
			// ...
		})
	}
</script>
```
通过调用`$patch`函数，通过`state`进行访问变更
批量变更适用需要很属性时使用，多次变更,视图只会渲染一次，性能较高
{{< /admonition >}}
{{< admonition type="note" title="actions 批量变更" >}}
```vue
<template>
	<view class="container">
		<button @click="tag.increment()">increment</button>
		<button @click="test2()">increment</button>
		{{tag.tt}}
		{{ tag.doubleCount }}
	</view>

</template>

<script setup>
	import {storeToRefs} from "pinia";
	import {tagStore} from "test.js"

	const tag = tagStore()
	// 封装
	function test2 (){
		tag.test()     // 调用
	}
</script>
```
```js
// test.js 
import {
    defineStore
} from 'pinia'

export const tagStore = defineStore('tag', {
    state: () => ({
        tt: 100,
    }),
    getters: {
        doubleCount: (state) => state.tt * 2,
    },
    actions: {
        increment() {
            this.tt++
        },
        test (){
            this.$patch((state) =>{     // this 访问
                state.tt++
                // ...
            })
        }
    },
})

```
可以将批量变更封装到 `actions`中，注意在调用`$patch`时需要使用`this`
{{< /admonition >}}
