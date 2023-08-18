---
title: "js - vue 基础语法"
date: 2023-08-01T15:06:34+08:00
draft: false
author: "Turan"
tags: [javascript]
categories: [javascript]
hiddenFromHomePage: false

toc:
    auto: false
---


### vue

#### 插值&指令

~~~html
<div id="root">
  <!--
  可执行js表达式
  插值语法： 文本
  指令语法： 标签
  -->
  <h1>hello,{{name}},{{Date.now()}}</h1>
  <a v-bind:href="url" > qeqwe</a>
  <a :href="url" > qeqwe</a>   <!--  v-bind 简写-->
  <!-- 双向数据绑定： v-model   -->
  <input v-model:value="name">
</div>
<script type="text/javascript">
  new Vue({
    el:'#root',
    data() {
      return {
        name :'插值语法',
        url:'指令语法'
      }
    }
  })
</script>
~~~

#### 数据处理

~~~html
<script>
    var bun = 2
    let per = {
        name:'123',
        age:'ww',
    }
    // 数据代理模型
    Object.defineProperty(per,'gender',{
        value:1,
        enumerable:true,   // 支持遍历
        writable:true,      // 支持修改
        configurable:true,  // 支持删除
        get(){
            // 返回bun的值
            return bun
        },
        set(va){
            // 将收到的参数传给bun ，
            bun = va
        }
    })
</script>
~~~

#### 事件处理

~~~html
<div  id="t">
        <!--
            鼠标事件：
            1.  @click.prevent 阻止默认事件
            2.  @click.stop 阻止事件冒泡
            3.  @click.once 只执行一次
            4.  @click.self 事件target为自己时触发
        -->

        <button  @click="show" >点我</button>
        <a href="http://localhost:8080" @click.prevent="show">点我跳转</a>


    <!--
        键盘事件：
        1.  enter 回车
        2.  delete 删除
        3.  esc 退出
        4.  space 空格
        5.  tab 换行  (必须与)
        6.  up  上
        7.  down 下
        8.  left
        9. right 右

        使用：
            keyup:可以实现按键组合
            keydown：单键
    -->

    <input type="text" placeholder="回车提示" @keyup.enter="show">
</div>
<script>
    new Vue({
        el:'#t',
        methods:{
            show(e){
                alert(e.target.value)
            }
        }
    })
</script>
~~~



#### 属性

- computed：计算属性
- watch：监视属性

~~~html
<div id="t">
  姓： <input type="text" v-model:value="firstName" >
  名： <input type="text" v-model:value="lastName" >
  全名：<span>{{fullName}}</span>
</div>
<script>
  new Vue({
    el:'#t',
    data() {
      return{
        firstName :'ww',
        lastName :'w'
      }

    },
      //计算属性计算
    computed:{
      // fullName:{
      //   get(){
      //     return this.firstName +'-'+this.lastName
      //   }
      // }
      fullName(){
        return this.firstName +'-'+this.lastName
      }
    },
       // 监视属性
      watch:{
        firstName: {  //  firsName 修改后调用
            handler(n,o){
                console.log(n,o)
            }
        },
          lastName: {
            // 深度监视   //可以监视多层级属性
            deep:true,
              handler(n, o) {

            }

          }
      }

  })

</script>
~~~

#### 绑定class 样式

~~~html

~~~

