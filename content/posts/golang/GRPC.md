---
weight: 5
title: "golang - grpc 开源框架"
date: 2023-08-16T15:19:34+08:00
draft: false
tags: [golang]
categories: [golang]
featuredImagePreview: ""
toc:
  auto: false
---

## grpc开源框架

- 简介

  ~~~txt
  a. 传输协会http 2.0 
  b. 采用protobuffer传输消息
  c. 具备四种传输模式
  ~~~

- http版本特性

  ~~~txt
  http 1.0：提供长连接，请求回应的模式
  	短连接：一次连接只能发送一个请求；每个请求都要进行三次握手和四次挥手
  	长连接（发送ack包）：一次连接可以发送多个请求；请求为同步请求，阻塞后影响效果
  http 1.1：
  	piperline:一次连接并发多个请求；请求按顺序返回
  http 2.0 ：
  	stream: 乱序发送,乱序接收
  	
  	
  http 具备安全连接机制：
  	a. ssl:
  	b. tls:
  ~~~



- protobuffer

  ~~~txt
  跨语言
  数据流小：传输时，只把value进行压缩传输
  数据压缩快：
  
  ~~~



- grpc service API

  ~~~TXT
  1. unary api  一元普通模式
  		：	一个请求一个响应
          
  2.client stream api  客户端流模式
  		：	多个请求一个响应，客户端任务繁重时使用
  		
  3.server stream api 服务端流
  		：	一个请求多个响应，客户端任务繁重时使用
  		
  4.bidirectional stream api  双端流
  		：	多个请求多个响应
  
  ~~~

  

  

## 一、编译器安装

- 安装proto文件编译器

  ~~~go
   go install google.golang.org/protobuf/cmd/protoc-gen-go@v1.26
   go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@v1.1
  ~~~

  tips:安装完后默认存储到gopath里的bin目录下



- 安装golangProto文件识别插件

  ~~~txt
  打开goland编译器，打开插件搜索protocol buffers 点击安装
  ~~~

  

- 安装grpc包

  ~~~go
  go get google.golang.org/grpc 
  ~~~

  tpis:建议使用go mod tidy



## 二、proto

### 创建proto文件

~~~txt
在goland文件中创建file类型文件后缀为.proto
~~~

### 编写proto文件

~~~protobuf
syntax = "proto3";
option go_package = "./;admin";
package admin;

//-------------------------------------------------------------------
message  HelloReq {
  string Name =1;
}

message HelloRes{
  string Order =1;
}

service Hello{
  rpc GET(HelloReq) returns (HelloRes){}
}
~~~



### 编译proto

- 方式一：	

  ~~~go
  protoc --go_out=. --go_opt=paths=source_relative    --go-grpc_out=. --go-grpc_opt=paths=source_relative     [proto文件路径]
  ~~~

  tips:  1. 使用后会在目标文件下生成pb.gp和grpc.pb.go文件

  ​	      2. massge放在pb文件内；server和client放在grpc文件内
  
     3. 这种方式在服务实现时，必须在结构体内嵌入Unimplemented才算实现了接口
  
        ~~~go
        type Admin struct {
        	person.UnimplementedPersonServer   
        }
        ~~~
  
        
  
- 方式二：

  ~~~txt
   protoc --go_out=plugins=grpc:. [proto文件]
  ~~~

  tips：1. 在proto文件目录下执行命令，会在当前目录下生成一个pb.go文件

  ​		   2. massge与server和client放在一个文件内



- proto生成对应的主要代码

  ~~~go
  type HelloReq struct {
  	state         protoimpl.MessageState
  	sizeCache     protoimpl.SizeCache
  	unknownFields protoimpl.UnknownFields
  
  	Name string `protobuf:"bytes,1,opt,name=Name,proto3" json:"Name,omitempty"`
  }
  
  
  type HelloClient interface {
  	GET(ctx context.Context, in *HelloReq, opts ...grpc.CallOption) (*HelloRes, error)
  }
  
  type helloClient struct {
  	cc grpc.ClientConnInterface
  }
  
  func NewHelloClient(cc grpc.ClientConnInterface) HelloClient {
  	return &helloClient{cc}
  }
  
  func (c *helloClient) GET(ctx context.Context, in *HelloReq, opts ...grpc.CallOption) (*HelloRes, error) {
  	out := new(HelloRes)
  	err := c.cc.Invoke(ctx, "/admin.Hello/GET", in, out, opts...)
  	if err != nil {
  		return nil, err
  	}
  	return out, nil
  }
  
  
  
  type HelloServer interface {
  	GET(context.Context, *HelloReq) (*HelloRes, error)
  	mustEmbedUnimplementedHelloServer()
  }
  
  // UnimplementedHelloServer must be embedded to have forward compatible implementations.
  type UnimplementedHelloServer struct {
  }
  
  func (UnimplementedHelloServer) GET(context.Context, *HelloReq) (*HelloRes, error) {
  	return nil, status.Errorf(codes.Unimplemented, "method GET not implemented")
  }
  ~~~

### proto语法

- 官网语法地址

  ~~~txt
  https://developers.google.com/protocol-buffers/docs/proto3
  ~~~



- 语法演示

~~~protobuf
//--------------------------声明---------------------------------

syntax = "proto3";                         // 向编译器声明语法版本
option go_package = "./;admin";   //admin表示包名；需求放在admin文件夹下，否则报错
package admin;

//----------------------------结构体------------------------------

/*
多行注释

*/   

//------数据类型-----
message User {
  string query = 1;         // 字段值可传一个或者不传；编号用在二进制消息格式中区分字段
    string Name =1;
    bool  x10=10;
    double id=2;
    float x0=9;
    bytes x11=11;

    int32 x=3;
    int64  x2=5;
    uint32 x1=4;
    uint64 x3=6;
    sint32 x4=7;
    sint64 x5=8;
}

//-------数据结构-----
message person{
  repeated string ary =1;       //数组
  map<string,string> map_S=3;	//地图
  enum SEX{                    //枚举全部大写，必须0开始
  	MAN =0;
  	WOMAN=1;
  	OTHER =3;
  }
  SEX sex =3;
}

//----------嵌套类型------------
message Test{
  map<string,user> map_user=1;
  repeated user user_ary=2;
  message V{
    string name =1;
    }
    
    V v=3；   //使用嵌套结构体V;结构体与名称不能相同；
}

//-------------
message save_key {

	reserved "key1","key2"；//保留key值
	reserved 4,5,6,7;       //保留唯一标识
}



//----------------------------服务端四种传输方式---------------------------

service Person{
  rpc serch(personRequest) returns(personRely){}  //即可响应
  rpc serchin(stream personRequest) returns(personRely){} //入参为流
  rpc serchout(personRequest) returns(stream personRely){} //出参为流
  rpc serchio(stream personRequest) returns(stream personRely){} //双向流
}



//----------------------------消息体------------------------------
message loginRequest{
}

message loginReply{
}


~~~



## 三、grpc代码实现

  ### 服务端代码实现

- 代码实现步骤

  ~~~txt
  server端实现
  - 实现步骤
    1. 服务实现
    2. 创建监听套接字
    3. 创建服务端
    4. 注册服务
    5. 启动服务端
  ~~~



~~~txt
~~~



~~~go
func main() {
	//2.创建套接字监听
	listen, err := net.Listen("tcp", "127.0.0.1:8080")
	if err != nil{
		panic(err.Error())
	}
	//3.创建服务端
	server:=grpc.NewServer()
	//4.注册服务：
	person.RegisterPersonServer(server,admin.Admin{})
	person.RegisterAdminServer(server,P.P{})
	reflection.Register(server)   //配合grpcUI使用
	//5.启动服务端：
	err= server.Serve(listen)
}
~~~



- 官方服务端实现实例

  ~~~txt
  https://github.com/grpc/grpc-go/blob/master/examples/helloworld/greeter_server/main.go
  ~~~











## 四、grpc-UI

- 官网

  ~~~txt
  https://github.com/fullstorydev/grpcui
  ~~~

### 安装

~~~txt
go install github.com/fullstorydev/grpcui/cmd/grpcui@latest
~~~

- 下载成功后会在gopath的bin目录下生成grpcui的可执行程序



### 基本命令

~~~txt
grpcui -help    //表示安装成功

grpcui -plaintext localhost:12345    //启动grpc客户端进行grpc调用测试
~~~



### 四种传输方式的请求

#### requsert form

- 即可响应

  - request Data

    输入一个请求对象的参数

  - response

    返回一个响应对象

    

- 入参为流

  - request Data

    点击request data 中的add item按钮，添加多个对象，多个对象按一次请求发送（后端需要for接收recv对象，当出错时就传输完成了）

  - response

    返回一个响应对象



- 出参为流

  - request Data

    输入一个请求对象的参数

  - response

    返回多个对象（后端需要for来返回send对象，当一个对象返回结束后，给出一个提示继续返回下一个对象）

    

- 出入均为流

  



#### json

~~~txt
在处理具有流请求的 RPC 时，JSON 数据将是一个 JSON 数组，其中每个元素都是流中的一条消息。
~~~







