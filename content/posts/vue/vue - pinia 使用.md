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
### 2 基本使用

### 2.1 安装
要开始使用 Pinia，您需要通过包管理工具（如 npm 或 yarn）将 Pinia 安装为您的项目依赖：
```bash
npm install pinia
```

```js
// main.js
import App from './App'
import { createPinia } from 'pinia'
import { createSSRApp } from 'vue'

const pinia = createPinia()

export function createApp() {
    const app = createSSRApp(App)
    app.use(pinia)
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
export const useMainStore = defineStore('test', {
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
    }
})
```
在设置容器中：
- **ref() s** 成为`state`属性
- **computed()** 成为`getters`
- **function()** 成为`actions`

### 2.3 容器访问
要在组件中使用容器的状态和操作，您可以使用 useMainStore() 函数。

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
导入 `tagStore` 后先进行调用得到一个容器，使用`const`变量接受，之后可以在模版内自行访问，此时都是

### 2.4 解构访问
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

{{< admonition type="note" title="响应式结构" >}}
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
