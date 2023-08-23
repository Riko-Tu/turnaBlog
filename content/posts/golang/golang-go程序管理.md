--- 
title: "golang - go 程序管理"
date: 2023-08-17T15:06:34+08:00
draft: false
author: "Turan"
tags: [golang,go]
categories: [golang]
hiddenFromHomePage: false
toc:
    auto: false
---

## 1 程序介绍

**Go程序管理**是指在开发和部署Go语言应用程序时，如何管理项目结构、依赖管理和构建过程。以下是关于Go程序管理的几个重要方面：

1. 项目结构：
    - Go语言推荐使用特定的项目结构来组织代码。通常，一个Go项目包含一个主包（main package）和若干个辅助包（helper packages）
      。主包通常包含应用程序的入口点，而辅助包则包含可重用的功能或库。
    - Go项目的主包应放置在一个独立的文件夹中，并且可以包含多个源代码文件。辅助包通常位于一个或多个子文件夹中。

2. 依赖管理：
    - Go语言使用Go模块（Go Modules）来管理依赖关系。
    - Go模块是一种用于组织和版本控制Go代码的机制。它通过go.mod文件来定义项目的模块依赖关系和版本要求。
    - 使用Go模块，你可以方便地引入、更新和管理项目所需的依赖包。Go模块还提供了版本管理和语义化版本控制，以确保项目的稳定性和可复现性。

3. 构建和编译：
    - Go语言提供了内置的构建工具来编译和构建Go程序。你可以使用"go build"命令编译整个项目，生成可执行文件。
    - 可以使用"go install"命令将可执行文件安装到系统的bin目录中，以便于全局调用。
    - Go还支持交叉编译，允许你在一个平台上构建针对不同操作系统和体系结构的可执行文件。

4. 文档和测试：
    - 在Go项目中，编写文档注释是一种良好的实践。Go语言提供了内置的文档工具（godoc），可以根据代码注释自动生成文档。
    - 同样，编写测试用例也是一个重要的实践。Go语言具有一个内置的测试框架，你可以编写单元测试和集成测试来确保代码的正确性和稳定性。

以上是关于Go程序管理的一些重要方面。通过合理的项目结构、良好的依赖管理和构建过程，可以帮助你更好地组织和管理Go语言应用程序的开发和部署

{{< admonition type="tip" >}}
Go语言命令行工具的下载地址：https://golang.org/dl/ ↗

{{< /admonition >}}

## 2 命令介绍

- **bug** ： start a bug report
- **build**   ： 编译包和依赖项
- **clean**   ： 删除对象文件和缓存的文件
- **doc**    ： 显示包文档
- **env**   ： 打印Go语言的环境信息
- **fix**   ： 会把指定包中的所有Go语言源码文件中旧版本代码修正为新版本的代码,升级版本时非常有用
- **fmt**    ： 格式化go源文件
- **generate**  ： 通过处理源代码生成Go文件
- **get**    ： 下载并安装包和依赖(下载包和依赖,并对它们进行编译安装)
- **install** ： 编译并安装指定包及它们的依赖包,
- **list**     ： 列出包和模块信息
- **mod**     ：管理模块
- **work**    ： 工作区管理
- **run**   ： 编译并运行Go程序
- **test**    ： 测试包
- **tool**    ： 运行指定的go工具
- **version**  ： 查看当前go语言版本
- **vet**     ： 报告包中可能出现的错误

## 3 依赖管理

### 3.1 get

#### 3.1.1 语法

go get 是 Go 语言的一个命令，用于从远程仓库获取并安装 Go 包或命令行工具

```bash
go get -h

  usage: go get [-t] [-u] [-v]  [packages]
```

下面是各个常用选项的说明：

- `t`：同时下载并安装测试所需的依赖包。
- `u`：强制更新已经存在的包或工具到最新版本。
- `v`：输出详细的日志信息，显示下载过程中的详细信息。
  [packages]：要下载和安装的包或工具的导入路径。可以一次指定多个导入路径。
{{< admonition type="note"  >}}
go get -u 命令会更新当前模块的所有直接和间接依赖，也就是说，它会把所有依赖的版本都升级到最新的版本。这样做可能会导致一些不兼容的问题，因为有些依赖可能会有重大的变化或者不再维护。

go get xxx@latest 命令只会更新指定的模块 xxx 到最新的版本，而不会影响其他依赖。这样做可以避免一些不必要的风险，因为您可以更精确地控制您想要更新的模块
{{< /admonition >}}

#### 3.1.2 案例

```bash
go get github.com/robfig/cron/v3
go get -t -u -v github.com/robfig/cron/v3
```

### 3.2 list

#### 3.2.1 语法

go list 是 Go 语言的一个命令，用于列出包或模块的信息

```bash
go list -h
  
  go list [-f format] [-json] [-m]  [packages]
```

下面是各个选项的说明：

- `f format`：指定输出的格式。你可以使用预定义的格式字符串，也可以自定义格式。例如，{{.Name}} 可以用于输出包的名称。
- `json`：以 JSON 格式输出结果。
- `m`：指定操作模块而不是包。
- [packages]：要列出信息的包或模块的导入路径。可以一次指定多个导入路径

#### 3.2.2 案例

```bash
go list -f "{{.ImportPath}}" go.uber.org/zap/... // 返回 go.uber.org/zap 的所有子包信息， ...  表示通配符（这对于了解包的结构非常有帮助）
go list -f "{{.Name}}" github.com/robfig/cron/v3 // 返回返回一个字符串 cron ，由此可见，导入路径与包名并不一致 
go list -f "{{.Deps}}" github.com/robfig/cron/v3 // 返回一个数组包含了该包所有使用的依赖；
go list -f "{{.GoFiles}}"   go.uber.org/zap // 返回一个数组包含了该包所有的 .go 文件，不包含子包的信息
go list -f "{{.Dir}}"   github.com/robfig/cron/v3       // 返回该包在本地的存放位置，包含版本信息
go list -f "{{.ImportPath}}}{{.GoFiles}}" go.uber.org/zap/... // 可以组合展示：查看所有子包以及子包的 .go 文件
go list -m go.uber.org/zap // 返回  go.uber.org/zap v1.25.0
go list -json go.uber.org/zap //  将 ImportPath，Name，Deps,包括 -m  等等信息以json的格式输出
```

{{< admonition type="note" >}}
一个包在 Go 中具有以下信息：

1. 包的导入路径（Import Path）：每个包都有一个唯一的导入路径，用于在代码中引用该包。导入路径通常是一个 URL 形式的字符串，例如
   github.com/example/mypackage。

2. 包的名称（Name）：包的名称是导入路径的最后一个元素，用于在代码中引用包内的标识符。例如，在导入路径为
   github.com/example/mypackage 的包中，可以使用 mypackage.SomeFunction() 来调用包中的函数。

3. 包的依赖关系（Dependencies）：包可能依赖其他的包。依赖关系表示一个包在编译和运行时所依赖的其他包。Go 模块系统能够自动管理包的依赖关系。

4. 包的源文件列表（Source Files）：一个包通常由多个源文件组成，这些源文件包含包内的代码。源文件列表表示包中的所有源文件。

5. 包的文档注释（Documentation）：包可以包含文档注释，用于提供对包的说明、示例和使用方法的文档。这些文档注释通常使用 Go
   的文档注释格式（以 /* */ 或 // 开头）编写。

6. 包的可见性（Visibility）：Go 中的标识符（变量、函数、结构体等）可以是公开的或私有的。公开的标识符可以在包外部访问，而私有的标识符仅在包内部可见。

7. 包的版本（Version）：对于使用 Go 模块的项目，包还具有版本信息。模块的版本标签用于确保代码的版本一致性和可重复性。

以上是一个包在 Go 中常见的信息。这些信息可以通过 go list 命令或其他工具来获取和查看。
{{< /admonition >}}

### 3.3 mod

#### 3.3.1 语法

go mod 是 Go 命令行工具的模块管理子命令，用于管理和操作 Go 模块。

```bash
go mod help
  
  Usage:
    go mod <command> [arguments]
```

以下是 go mod 命令的常用子命令及其功能：

- `download`：将模块及其依赖项下载到本地缓存中，以供后续构建和编译使用
- `edit`：用于从工具或脚本中编辑 go.mod 文件，手动调整模块依赖或版本。
    - `require`: 添加,修改依赖，需要加 path@version; 例：`github.com/g8rswimmer/go-twitter/v2@v2.1.5`
    - `droprequire`: 删除依赖，只需要 path; 例：`github.com/g8rswimmer/go-twitter/v2`
    - `replace`: 替换依赖，将原有的依赖指向新的依赖,使用`=`号指定； 例： `example.com/module=../local/example.com/module`
    - `dropreplace`: 删除替换依赖项，只需要前者的 path ； 例：`example.com/module`
- `graph`：打印模块依赖关系图，显示模块之间的依赖关系。(**项目根目录下有`.mod`那么该项目就称为模块，没有的话就称为包**)
- `init`：在当前目录中初始化一个新的模块，创建 go.mod 文件。
- `tidy`：维护和更新模块的依赖关系，确保 go.mod 和代码中的导入一致，清理不再使用的依赖项，并检查依赖的完整性
- `vendor`：将项目依赖的模块复制到项目的 vendor Go 会将项目所需的模块及其依赖项复制到 vendor
  目录中，供后续的构建和编译使用。这样可以确保在离线或无法访问外部依赖源时，项目的构建过程仍能够顺利进行。
- `verify`：检查模块文件和其依赖项的哈希值是否匹配，以确保模块没有被篡改或损坏
- `why`： 以更好地理解你的项目的依赖关系，并追踪模块被引入的原因

这些命令提供了一系列功能，用于管理模块的依赖关系、版本控制和构建配置等。

#### 3.3.2 案例

```bash
go mod download // 可下载在代码中红色导入的包
go mod tidy     // 与download类似，但会整合 mod 文件和清理未使用的包
go mod vendor         // 将当前的依赖加入到vendor文件中
go mod init           //  初始化一个新的模块，创建 go.mod 文件。
go mod verify         // 校验依赖，提高安全性

go mod edit -require     github.com/g8rswimmer/go -twitter/v2@v2.1.5 // 添加,修改依赖
go mod edit -droprequire github.com/g8rswimmer/go -twitter/v2 // 删除依赖
go mod edit -replace     example.com/module =../local/example.com/module // 替换依赖
go mod edit -dropreplace example.com/module // 删除替换依赖项

go mod graph // 扫描当前项目 mod 文件的所有依赖，展示包含 mod 文件的依赖项 的 mod 文件内容；

go mod why github.com/g8rswimmer/go -twitter/v2 // 返回引用了该模块的项目文件
```

## 4 构建

### 4.1 build

### 4.2 install

### 4.3 run

### 4.4 tool

## 5 文档

### 5.1 doc

#### 5.1.1 语法

```bash
go help doc

  usage:
    go doc [doc flags] [package |[package.]symbol[.methodOrField]]
```

```text

Flags:
-all     显示包的所有文档
-c       符号匹配区分大小写
-cmd     即使包是一个命令包（带有main函数的库），也显示具有包文档的符号
-short   对于每个符号，只显示一行的简要表示;
-src     显示符号的源代码
-u       显示未导出和导出的文档

```

- `package` : 提供包的导入路径; 例： `github.com/robfig/cron/v3` `fmt`
- `symbol` : 表示标识符（symbol）的占位符。标识符可以是函数、类型、变量、常量、接口等在Go程序中定义的命名实体;
- `methodOrField` : 方法名或字段名；
- `all` : 默认情况下，go doc命令只显示公开（exported）的标识符的文档。
- `c` : 默认情况下，go doc命令在匹配标识符时是不区分大小写的
- `cmd` :命令包是可执行程序的入口点，其中包含main函数。命令包通常用于构建可执行文件，而不是库。 默认情况下，go
  doc命令只显示非命令包的符号的文档。这意味着如果你运行go doc命令时指定的包是一个命令包，它将不会显示包中的符号文档。
- `short` : 默认情况下，go doc命令会显示每个符号的完整文档
- `src` : 默认情况下，go
  doc命令只显示符号的文档，不包括源代码。使用-src选项可以在文档中包含符号的源代码。不是所有的符号都会有源代码可用。有些符号可能是在Go语言标准库或第三方库中定义的，而源代码可能无法直接访问

这些选项提供了不同的方式来定制和获取go doc命令的输出。你可以根据需要使用这些选项的组合来满足你的查看文档的需求。

#### 5.1.2 案例

```bash
go doc net/http.Get // 显示`http.Get`函数的文档和相关信息。
go doc net/http // 显示`http`包所有可导出的类或方法信息。
go doc -all net/http // 显示`http`包所有的类或方法信息。
```

#### 5.1.3 文档结构

go doc命令的文档输出具有以下结构：

1. **导入路径**（Package Import Path）：文档输出的第一行显示了包的导入路径，指示了正在查看文档的包的位置。

2. **摘要**（Package Summary）：紧接着导入路径之后，文档输出会提供有关包的简要说明和概述。这通常是一到两行的描述，用于介绍包的功能和用途。

3. **标识符**（Symbols）：在包的摘要之后，文档输出将列出该包中的各个标识符（函数、类型、变量等）以及它们的文档。
    - 每个标识符都以其名称开头，后面跟着标识符的类型和其他相关信息。
    - 如果标识符有文档注释，则会在名称和类型之后显示文档注释。文档注释通常提供了关于标识符的更详细说明、用法示例、函数签名等信息。
    - 对于某些标识符，如果使用了-src选项，则在文档输出中还会包含该标识符的源代码。
4. **示例**（Examples）：在标识符列表之后，文档输出可能会包含一些示例代码，用于演示如何使用包中的某些功能或标识符。

文档输出的结构可以根据包的复杂性和文档的详细程度而有所变化。一些包可能只包含简单的摘要和标识符列表，而其他包可能提供更详细的文档和示例代码
[Go文档在线搜索工具：可以帮助你更好的搜索和查看Go语言的文档](https://pkg.go.dev/)

## 版本控制：

### fix

## 代码管理：

### generate

### fmt

### test

## 工作空间维护：

### clean

### work

## 其他：

### bug

### env

### version

### vet