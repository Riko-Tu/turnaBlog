---
weight: 5
title: "css3"
date: 2023-08-03T15:19:34+08:00
draft: false
tags: [css3]
categories: [css3]
summary: "css3 详解"
featuredImagePreview: ""
toc:
    auto: false
---


### 样式引入
外部文件引入
```html
<link rel="stylesheet" href="t.css">
```
`link`标签不需要放在`style`内部


### 样式选择器
- 标签选择器

- 类型选择器

- ID选择器

- 通配符选择器


{{< admonition type="note"  >}}
一个标签可以选择多个样式,但是需要空格隔开
```html
<style>
    .ul-l {
        color: red;
    }
    
    .ul-l2 {
        font-size: larger;
    }
</style>
<ul class="ul-l ul-l2">
    <li>l1</li>
    <li>l2</li>
    <li>l3</li>
</ul>

```
{{< /admonition >}}
