---
title: "本站编写文章 Markdown 基本语法"
date: 2023-08-01T15:06:34+08:00
draft: false
tags: [Markdown]
categories: [Markdown]
summary: "介绍文章编写规则"
featuredImagePreview: "/posts/Markdown/makrdown.png"

toc:
  auto: false
---

## 1 前置参数

以下字段为必填项：

```yaml
--- 
title: "文章名称"
date: 2023-08-01T15:06:34+08:00
draft: false
description: "有[featuredImagePreview]图片时，鼠标聚焦图片展示该文字"
author: "Turan"
# 标签
tags: [test]
# 分类
categories: [文章编写]
# 进入文章详情后的置顶图
featuredImage: "/images/2.jpg"
# 文章外侧预览图
featuredImagePreview: "images/1.jpg"
# 是否展示在首页
hiddenFromHomePage: false
# 预览界面展示文字
summary: "这是摘要"
# 展开所有标题
toc:
  auto: false
---
```

## 2 内容样式语法

### 2.1 标题

- 文章主题（即**tittle**）:  不需要明确写在文章内，在前置参数内的title表明即可；为 `#` ；
- 二级标题：比文章主题小一级的标题，语法使用 `##` ;
- 其他表示：语法以此类推；三级 `###` ,四级 `####` ;



### 2.2 段落

段落文章不需要加任何语法，直接编写；



### 2.3 样式字体
- 加粗： **加粗字体**
  - ``**加粗字体**
    ``
- 关键字： `关键字`、
  - `` `关键字`
    ``
- 超链接： [百度一下](https://www.baidu.com/)
  - ``  [百度一下](https://www.baidu.com/)
    ``

### 2.4 文本块
- 代码块：`` ```yaml ``` ``
  
  - 关键字：`go`,`toml`,`bash`...
  
- 短码文本块：
  - type: `abstract`,`info`,`tip`,`success`,`question`,`warning`,`failure`,`danger`,`bug`,`example`,`quote`
```markdown
{{</* admonition type="note" title="This is a note" */>}}
This is the content of the note.
{{</* /admonition */>}}
```


{{< admonition >}}
一个 **注意** 横幅
{{< /admonition >}}

{{< admonition abstract >}}
一个 **摘要** 横幅
{{< /admonition >}}

{{< admonition info >}}
一个 **信息** 横幅
{{< /admonition >}}

{{< admonition tip >}}
一个 **技巧** 横幅
{{< /admonition >}}

{{< admonition success >}}
一个 **成功** 横幅
{{< /admonition >}}

{{< admonition question >}}
一个 **问题** 横幅
{{< /admonition >}}

{{< admonition warning >}}
一个 **警告** 横幅
{{< /admonition >}}

{{< admonition failure >}}
一个 **失败** 横幅
{{< /admonition >}}

{{< admonition danger >}}
一个 **危险** 横幅
{{< /admonition >}}

{{< admonition bug >}}
一个 **Bug** 横幅
{{< /admonition >}}

{{< admonition example >}}
一个 **示例** 横幅
{{< /admonition >}}

{{< admonition quote >}}
一个 **引用** 横幅
{{< /admonition >}}


### 2.5 引文
- 语法: `>` 这是一个多行引文
> 这是一个多行引文


## 3 多媒体
### 3.1 图片
#### 3.1.1 md 语法
![Minion](https://octodex.github.com/images/minion.png)
- 语法:
```markdown
![Minion](https://octodex.github.com/images/minion.png)

// 站内
images 为content的子文件夹
![navigator](/images/javascript/navigator.png)
```

#### 3.1.2 `image` 短码
## 3 image {#image}

{{< version 0.2.0 changed >}}

`image` shortcode 是 [`figure` shortcode](../theme-documentation-built-in-shortcodes#figure) 的替代. `image` shortcode 可以充分利用 [lazysizes](https://github.com/aFarkas/lazysizes) 和 [lightGallery](https://github.com/sachinchoolur/lightgallery) 两个依赖库.

{{< version 0.2.10 >}} 支持[本地资源引用](../theme-documentation-content#contents-organization)的完整用法.

`image` shortcode 有以下命名参数:

* **src** *[必需]* (**第一个**位置参数)

  图片的 URL.

* **alt** *[可选]* (**第二个**位置参数)

  图片无法显示时的替代文本, 默认值是 **src** 参数的值.

  *支持 Markdown 或者 HTML 格式.*

* **caption** *[可选]* (**第三个**位置参数)

  图片标题.

  *支持 Markdown 或者 HTML 格式.*

* **title** *[可选]*

  当悬停在图片上会显示的提示.

* **class** *[可选]*

  HTML `figure` 标签的 `class` 属性.

* **src_s** *[可选]*

  图片缩略图的 URL, 用在画廊模式中, 默认值是 **src** 参数的值.

* **src_l** *[可选]*

  高清图片的 URL, 用在画廊模式中, 默认值是 **src** 参数的值.

* **height** *[可选]*

  图片的 `height` 属性.

* **width** *[可选]*

  图片的 `width` 属性.

* **linked** *[可选]*

  图片是否需要被链接, 默认值是 `true`.

* **rel** *[可选]*

  HTML `a` 标签 的 `rel` 补充属性, 仅在 **linked** 属性设置成 `true` 时有效.

一个 `image` 示例:

```markdown
{{</* image src="/images/Markdown/tn.png" caption="Lighthouse (`image`)" */>}}
```

呈现的输出效果如下:

{{< image src="/images/Markdown/tn.png" caption="Lighthouse (`image`)" >}}

### 3.2 图
#### 3.2.1 思维导图
```markdown
{{</* mermaid */>}}
graph LR;
A[Hard edge] -->|Link text| B(Round edge)
B --> C{Decision}
C -->|One| D[Result one]
C -->|Two| E[Result two]
{{</* /mermaid */>}}
```
{{< mermaid >}}
graph LR;
A[Hard edge] -->|Link text| B(Round edge)
B --> C{Decision}
C -->|One| D[Result one]
C -->|Two| E[Result two]
{{< /mermaid >}}



## 4 表格
- 语法：
```markdown
在任何标题下方的破折号右侧添加冒号将使该列的文本右对齐.
在任何标题下方的破折号两边添加冒号将使该列的对齐文本居中.

| Option | Description |
| :------: | :----------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |

```

| Option | Description |
| :------: | :----------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |