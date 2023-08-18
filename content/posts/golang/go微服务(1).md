# GIN

微服务框架搭建：

- go mod init 项目名

- go get -u github.com/gin-gonic/gin

- go get -u github.com/jinzhu/gorm
- go get -u github.com/go-sql-driver/mysql
- 数据库链接：?charset=utf8&parseTime=True&loc=Local

## 1.0 接口开发

~~~go
package main

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func s(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"状态：":http.StatusOK,
		"msg":"hello",
	})
}
func main() {
	// 1.创建路由
	r := gin.Default()
	// 2.绑定路由规则，执行的函数
	// gin.Context，封装了request和response
	r.GET("/",s )
	r.POST("/hello", func(context *gin.Context) {
		context.JSON(http.StatusOK,gin.H{"状态":http.MethodPut})
	})
	r.PUT("/", func(context *gin.Context) {
		context.JSON(http.StatusOK,gin.H{"状态":http.MethodPut})
	})
	r.DELETE("/", func(context *gin.Context) {
		context.JSON(http.StatusOK,gin.H{"状态":http.MethodDelete})
	})
	// 3.监听端口，默认在8080
	// Run("里面不指定端口号默认为8080")
	r.Run(":8000")
}
~~~



## 1.1 url传递参数

~~~go
package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
)

func main() {
router := gin.Default()

//1,请求带参数/user?name=23;不带参数为默认
	router.GET("/user", func(c *gin.Context) {
		query := c.DefaultQuery("name", "小花")//带默认值的参数
		name := c.Query("name")   							//参数不输入默认值
		c.JSON(http.StatusOK,gin.H{"msg":fmt.Sprintf("%s%s",query,name)})
	})
//2,请求为路径/user/2323；不带Name路径走上面一个请求，name不可省略
router.GET("/user/:name", func(c *gin.Context) {
	name := c.Param("name")
	c.JSON(http.StatusOK,gin.H{"msg":fmt.Sprintf("%s",name)})

})
//3,相同路径可以用不同请求区分，否则会起冲突
router.GET("/user/:name/*action", func(c *gin.Context) {
name := c.Param("name")
action := c.Param("action")
message := name + " is " + action
c.String(http.StatusOK, message)
})

router.POST("/user/:name/*action", func(c *gin.Context) {
b := c.FullPath() == "/user/:name/*action" // true
c.String(http.StatusOK, "%t", b)
})

//4，精确请求
router.GET("/groups", func(c *gin.Context) {   
c.String(http.StatusOK, "The available groups are [...]")
})

router.Run(":8080")
}

~~~

## 1.2 post表单参数

- 表单传输为post请求，http常见的传输格式为四种：
  - application/json
  - application/x-www-form-urlencoded
  - application/xml
  - multipart/form-data
- 表单参数可以通过**PostForm()**方法获取，该方法**默认解析**的是x-www-form-urlencoded或from-data格式的参数

~~~go
package main

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func main() {
	r := gin.Default()
	r.POST("/user",s)			//使用postman以表单参数提交
	r.Run(":8081")  //必须加:号
}
func s(c *gin.Context)  {
	username := c.PostForm("username")		
	password := c.PostForm("password")    		//当不填写该参数时，返回为零值，不会报错
	id := c.DefaultPostForm("id", "20")   //表单形式的默认参数
	c.JSON(http.StatusOK,gin.H{"username":username,"password":password,"id":id})

}
~~~

## 1.3 query+post form

~~~go
//请求url：http://127.0.0.1:8081/user?usernameID=2&sex=女
package main
import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func main() {
	r := gin.Default()
	r.POST("/user",s)			//使用postman以表单参数提交
	r.Run(":8081")  //必须加:号
}
func s(c *gin.Context)  {
	userID := c.Query("usernameID")
	sex := c.DefaultQuery("sex","男") //DefaultQuery必须两个参数
	username := c.PostForm("username")
	password := c.PostForm("password")    		//当不填写该参数时，返回为零值，不会报错
	id := c.DefaultPostForm("id", "20")   //表单形式的默认参数
	c.JSON(http.StatusOK,gin.H{"userid":userID,"username":username,"password":password,"id":id,"sex":sex})
}
~~~

## 1.4 文件上传

### 单文件上传

~~~go
package main


import (
	"fmt"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
)

func main() {
	r := gin.Default()
    // 处理multipart forms提交文件时默认的内存限制是32 MiB
	// 可以通过下面的方式修改
	// router.MaxMultipartMemory = 8 << 20  // 8 MiB
	r.MaxMultipartMemory = 8 << 20  // 8 MiB
	r.POST("/upload",upload)
	r.Run(":8081")  //必须加:号
}

func upload(c *gin.Context)   {
	//单文件上传
	file,err := c.FormFile("file") //指定从的请求头中的file字段获取文件
	if err!=nil{
		c.JSON(http.StatusOK,gin.H{"msg":err.Error()})
		return
	}
	log.Println("文件名：",file.Filename,"文件大小：",file.Size,"请求头参数：",file.Header)
	//拼接存放地址
	sprintf := fmt.Sprintf("E:/GoProject/src/templates/%s", file.Filename)
	// 上传文件到指定的目录
	err = c.SaveUploadedFile(file, sprintf)
	if err!=nil {
		c.JSON(http.StatusOK,gin.H{"msg":err.Error()})
	}
	c.JSON(http.StatusOK,gin.H{"msg":"文件上传成功！"})
}

~~~

### 多文件上传

~~~go
package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
)

func main() {
	router := gin.Default()
	// 处理multipart forms提交文件时默认的内存限制是32 MiB
	// 可以通过下面的方式修改
	// router.MaxMultipartMemory = 8 << 20  // 8 MiB
	router.POST("/upload", func(c *gin.Context) {
		// 多个文件上传
		form, _ := c.MultipartForm() //获取标的数据
		headers := form.File["file"] //通过表单的file获取file的切片

		for _, header := range headers {		//遍历file切片
			log.Println(header.Filename)
			sprintf := fmt.Sprintf("E:/GoProject/src/templates/%s", header.Filename)
			 c.SaveUploadedFile(header, sprintf)
		}
		
		// 上传文件到指定的目录

		c.JSON(http.StatusOK, gin.H{
			"message": fmt.Sprintf("%vuploaded!", len(headers)),
		})
	})
	router.Run()
}

~~~

## 1.5 路由分组（支持嵌套）

~~~go
package main


import (
	"fmt"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
)

func main() {
	r := gin.Default()
	r.MaxMultipartMemory = 8 << 20  // 8 MiB
	user := r.Group("/user")	//分组路由头；user是一个路由组对象，通过路由组创建请求
	{
		user.POST("/upload",upload)   //请求url：http://127.0.0.1:8081/user/upload
	}

	user2 := r.Group("/user2")   //分组路由头
	{
		user2.POST("/login",login)   //请求url：http://127.0.0.1:8081/user2/login
	}
	r.Run(":8081")  //必须加:号
}
func login(c *gin.Context)  {
	username := c.PostForm("username")
	password := c.PostForm("password")
	c.JSON(http.StatusOK,gin.H{"msg":"登陆成功","username":username,"password":password})
}

func upload(c *gin.Context)   {
	//单文件上传
	file,err := c.FormFile("file") //指定从file字段获取文件
	if err!=nil{
		c.JSON(http.StatusOK,gin.H{"msg":err.Error()})
		return
	}
	log.Println("文件名：",file.Filename,"文件大小：",file.Size,"文件头：",file.Header)
	//拼接存放地址
	sprintf := fmt.Sprintf("E:/GoProject/src/templates/%s", file.Filename)
	// 上传文件到指定的目录
	err = c.SaveUploadedFile(file, sprintf)
	if err!=nil {
		c.JSON(http.StatusOK,gin.H{"msg":err.Error()})
	}
	c.JSON(http.StatusOK,gin.H{"msg":"文件上传成功！"})
}

~~~

## 1.6  重定向

~~~go
package main

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func redirectBaidu(c *gin.Context)   {
	c.Redirect(http.StatusMovedPermanently,"https://www.baidu.com")   //站外页面重定向状态码为301
}
func main() {
	r := gin.Default()

	redirect :=r.Group("/redirect")
	{
		redirect.GET("/taobao",redirectBaidu)

		redirect.GET("/a", func(c *gin.Context) { //站内重定向
			c.Request.URL.Path="/redirect/b"   //修改请求的的url,必须添加完整路径
			r.HandleContext(c)  //通过路由执行
		})
		redirect.GET("/b", func(c *gin.Context) {
			c.JSON(http.StatusOK,gin.H{"msg":"b"})
		})
	}
	r.Run(":8081")  //必须加:号
}

~~~

## 1.7 Any与NoRoute

~~~go
package main

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func main() {
	r := gin.Default()

	redirect :=r.Group("/redirect") 
	{
		redirect.Any("/user", func(c *gin.Context) { //any可以接受所有请求
			switch c.Request.Method {  //通过判定请求方式，走对应的请求逻辑
			case http.MethodGet:
				c.JSON(http.StatusOK,gin.H{"method":"get"})
			case http.MethodPost:
				c.JSON(http.StatusOK,gin.H{"method":"post"})
			}
		})
	}
	
	//无路由响应
	r.NoRoute(func(c *gin.Context) {
		c.JSON(http.StatusNotFound,gin.H{"msg":"请求有误"})
	})
	r.Run(":8081")  //必须加:号
}

~~~

## 1.8 中间件（aop）

1. 单路由aop
2. 路由组aop
3. 全局aop

~~~go
package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
)

func full(c *gin.Context) {
	fmt.Println("我是全局的")
	c.Next()
}

func gruop(c *gin.Context) {
	if username := c.PostForm("username"); len(username) == 0 {
		c.Abort()
		c.JSON(http.StatusBadRequest, gin.H{"msg": "用户名不能为空"})
		return
	} else if password := c.PostForm("password"); len(password) == 0 {
		c.Abort()
		c.JSON(http.StatusBadRequest, gin.H{"msg": "密码不能为空"})
		return
	}

	c.Next() //执行下一个handlerfunc

}
func main() {
	gin.SetMode(gin.DebugMode)
	rotuer := gin.Default()


	//rotuer.Use(full)  //1，注册全局中间件

	user := rotuer.Group("/user",gruop ) //2，路由组中间件
	{
		user.GET("/:id", func(request *gin.Context) {
			id := request.Param("id")
			username := request.PostForm("username")
			password := request.PostForm("password")
			request.JSON(http.StatusOK, gin.H{"状态": http.StatusOK, "userID": id, "username": username, "password": password})
		})
	}
	rotuer.NoRoute(func(only *gin.Context) { //3，单路由中间件
		only.Set("msg1", "你的请求有误")
		only.Next()
	}, func(c *gin.Context) {
		get, _ := c.Get("msg1")
		c.JSON(http.StatusNotFound, gin.H{"msg": get})
	})
rotuer.Run(":8082")
}

~~~

 ## 1.9 数据绑定

~~~go
package main

import (
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
)

type student struct {  //字段首字母必须大写
	Id string  `form:"id" json:"id,int"`    //tag：指定不同格式数据的请求体字段名，字符串id可接受int类型数据的序列化
	Name string	`form:"Name" json:"name"`  //json:只支持json；form:支持query与form格式数据
	Sex int	`form:"sex" json:"sex"`
	Password string	`form:"psd" json:"psd"`
}

func main() {
	router:= gin.Default()
	router.GET("/user", func(req *gin.Context) {
		student :=&student{}
		err := req.ShouldBindJSON(&student)  //ShouldBindJSON：用于解析json格式数据；当字段为匹配时，该字段输出零值
		if err!= nil {
			req.JSON(http.StatusBadRequest,gin.H{"mseg":err.Error()})
		}
		log.Printf("%#v",student)
		req.JSON(http.StatusOK,gin.H{"msg":"成功","id":student.Id,"name":student.Name,"sex":student.Sex,"psd":student.Password})
	})
	router.POST("/login",func(req *gin.Context) {
		student :=&student{}
		err := req.ShouldBind(&student)  //可以接受json,form,query数据
		if err!= nil {
			req.JSON(http.StatusBadRequest,gin.H{"mseg":err.Error()})
		}
		log.Printf("%#v",student)
		req.JSON(http.StatusOK,gin.H{"msg":"成功","id":student.Id,"name":student.Name,"sex":student.Sex,"psd":student.Password})
	})
	router.GET("/get",func(req *gin.Context) {   //get请求不能传递json数据
		student :=&student{}
		err := req.ShouldBind(&student)  //可以接受json,form,query数据
		if err!= nil {
			req.JSON(http.StatusBadRequest,gin.H{"mseg":err.Error()})
		}
		log.Printf("%#v",student)
		req.JSON(http.StatusOK,gin.H{"msg":"成功","id":student.Id,"name":student.Name,"sex":student.Sex,"psd":student.Password})
	})
router.Run(":8081")

}
~~~



# GORM

## 1.0 增加

~~~go
type student struct {
	gorm.Model
	Age int
	Name string
}
func main() {
	open, err := gorm.Open("database", "root:123456@(127.0.0.1:3306)/gorm-ecx?charset=utf8mb4")
	if err!=nil {
		panic(err)
	}
	//db.Exec("UPDATE orders SET shipped_at=? WHERE id IN (?)", time.Now(), []int64{11,22,33})
	open.AutoMigrate(&student{})
	students := student{
		Model: gorm.Model{},
		Age:   21,
		Name:  "伊莲",
	}
	//open.Create(&students)
	/*一,选择字段增加；
		a.未增加的字段在数据库中显示为null
		b.表明应与数据库表名一致（+s）
		c，字段应与数据库字段一致
		d.表名错误，字段名错误，字段数量与值数量不对应，则插入失败，但不会报错
		e.可使用RowsAffected检测是否插入成功
	*/
	exec := open.Exec("INSERT INTO students(created_at,name,age) VALUE(?,?,?)",time.Now(), students.Name, students.Age)
	println(exec.RowsAffected)
	/*二、全字段插入
		a.值数量必须与字段数量一致
		b.值的类型与字段类型不一致，则失败
	*/
	selINT := open.Exec("INSERT INTO students VALUE(?,?,?,?,?,?)", students.ID,time.Now(),time.Now(),time.Now(),students.Age,students.Name)
	println(selINT.RowsAffected)
	/*三、库内查询后增加  ：INSERT INTO table1 (column1,column2) SELECT column1,column2 FROM table2
	*/
}
~~~

## 1.1 删除

~~~go
package main

import (
	_ "github.com/go-sql-driver/database"
	"github.com/jinzhu/gorm"
)

type student struct {
	gorm.Model
	Age int
	Name string
}
func main() {
	open, err := gorm.Open("database", "root:123456@(127.0.0.1:3306)/gorm-ecx?charset=utf8mb4")
	if err!=nil {
		panic(err)
	}
	open.AutoMigrate(&student{})
	students := student{
		Model: gorm.Model{},
		Age:   21,
		Name:  "伊莲",
	}
	//删除students表内name为某值的记录，当前代码可删除多条；where多个条件
	exec := open.Exec("DELETE FROM students WHERE name = ? and id = ? ", students.Name,24)
	println(exec.RowsAffected)
~~~

## 1.2 修改

~~~go
package main

import (
	_ "github.com/go-sql-driver/database"
	"github.com/jinzhu/gorm"
)

type student struct {
	gorm.Model
	Age int
	Name string
}
func main() {
	open, err := gorm.Open("database", "root:123456@(127.0.0.1:3306)/gorm-ecx?charset=utf8mb4")
	if err!=nil {
		panic(err)
	}
	open.AutoMigrate(&student{})
	students := student{
		Model: gorm.Model{},
		Age:   25,
		Name:  "小卷",
	}
//UPDATE 表名 SET 列1=新值1,列2=新值2 WHERE 过滤条件
	//1,指定字段名，指定where条件;可以更新字段为空
	exec := open.Exec("UPDATE students SET name =? ,age =? WHERE id =?", students.Name, nil, 25)  
	println(exec.RowsAffected)

}

~~~



## 1.3 查询

~~~go
package main

import (
	"fmt"
	_ "github.com/go-sql-driver/database"
	"github.com/jinzhu/gorm"
)

type student struct {
	gorm.Model
	Age int
	Name string
}
func main() {
	open, err := gorm.Open("database", "root:123456@(127.0.0.1:3306)/gorm-ecx?charset=utf8mb4")
	if err!=nil {
		panic(err)
	}
	open.AutoMigrate(&student{})
	students := student{}
/*四、查询
	a.创建一个返回类型变量，传给scan，反射到字段内
	b.通过类型变量取值
*/
	open.Raw("SELECT name, age FROM students WHERE ID = ?", 25).Scan(&students)
	fmt.Println(students.Name,students.Age)
	open.First(&students)
	fmt.Println(students)
}

~~~

## 1.4 tag

~~~go
column
指定 db 列名

type
列数据类型，推荐使用兼容性好的通用类型，例如：所有数据库都支持 bool、int、uint、float、string、time、bytes 并且可以和其他标签一起使用，例如：not null、size, autoIncrement… 像 varbinary(8) 这样指定数据库数据类型也是支持的。在使用指定数据库数据类型时，它需要是完整的数据库数据类型，如：MEDIUMINT UNSIGNED not NULL AUTO_INSTREMENT

size
指定列大小，例如：size:256

primaryKey
指定列为主键

unique
指定列为唯一

default
指定列的默认值

precision
指定列的精度

scale
指定列大小

not null
指定列为 NOT NULL

autoIncrement
指定列为自动增长

embedded
嵌套字段

embeddedPrefix
嵌入字段的列名前缀

autoCreateTime
创建时追踪当前时间，对于 int 字段，它会追踪时间戳秒数，您可以使用 nano/milli 来追踪纳秒、毫秒时间戳，例如：autoCreateTime:nano

autoUpdateTime
创建 / 更新时追踪当前时间，对于 int 字段，它会追踪时间戳秒数，您可以使用 nano/milli 来追踪纳秒、毫秒时间戳，例如：autoUpdateTime:milli

index
根据参数创建索引，多个字段使用相同的名称则创建复合索引，查看 索引 获取详情

uniqueIndex
与 index 相同，但创建的是唯一索引

check
创建检查约束，例如 check:age > 13，查看 约束 获取详情

<-
设置字段写入的权限， <-:create 只创建、<-:update 只更新、<-:false 无写入权限、<- 创建和更新权限

->
设置字段读的权限，->:false 无读权限

-
忽略该字段，- 无读写权限

~~~



# rpc

##  1.0 server

~~~go
package main

import (
	"log"
	"net/http"
	"net/rpc"
)

type M struct {
	H,Y int
}

func (this *M) Chu(M *M,reply *int) error {
	*reply = M.Y+M.H
	return nil
}
func main() {
	//1,声明一个服务
	m := new(M)
	//2，注册服务
	rpc.Register(m)
	//2,自定义服务名称
	rpc.RegisterName("Mfuwu",m)
	//3，将服务绑定到http协议
	rpc.HandleHTTP()
	//4.启动监听
	err := http.ListenAndServe("127.0.0.1:8080", nil)


	if err!=nil {
		log.Println(err)
	}
}

~~~

## 1.1 client

~~~go
package main

import (
	"fmt"
	"net/rpc"
)

type M struct {
	H,Y int
}
func main() {

	http, err := rpc.DialHTTP("tcp", "127.0.0.1:8080")
	if err !=nil{
		panic(err)
	}
	m :=&M{1,2}
	var name int
	//同步请求
	err = http.Call("Mfuwu.Chu", &m, &name)
	fmt.Println(name)
	//异步请求
	call := http.Go("M.Chu", &m, &name, nil)
	<-call.Done   //完成异步请求提示
	fmt.Println(name)
}
~~~

## 1.2 网络传输数据格式

~~~go
~~~



# Grpc+protobuf

1. 下载github.com/golang/protobuf	

   https://github.com/golang/protobuf 放到$GOPATN/src/github.com/golang目录下

2. 安装grpc

   go get google.golang.org/grpc 

3、安装proto

​	 	go get -u github.com/golang/protobuf/proto

​		go get -u github.com/golang/protobuf/protoc-gen-go



4. 编译grpc/examples/helloworld/helloworld/下的proto文件

   protoc --go_out=plugins=grpc:. .\pkg\admin\proto\admin.proto

## 1.0 编写proto文件

~~~protobuf
//定义版本号

syntax="proto3";

//指定生成user.pb.gp的包名
package proto;

option go_package = "./";  //自定文件的存储位置

//定义客户端请求的数据格式
message UserRequest{
  //定义请求参数
  string name =1;
}

//定义服务端响应的数据格式
message UserResponse{
  //定义响应参数
  int32  id =1;
  string  name =2;
  int32  age =3;
  //表示可变数组，类型切片类型
  repeated string hobby =4;
}

//service定义开放调用服务
service UserInfoService{
  //定一个一个服务的方法，接受的参数，响应的参数
  rpc GetUserInfo(UserRequest) returns  (UserResponse){}
}
~~~



## 1.1 grpc客户端实现

~~~go
package main

import (
	"context"
	"fmt"
	"google.golang.org/grpc"
	"log"
	"mm/MESSAGE"
)

func main() {
	//1,连接grpc服务,得到一个连接对象;rpc.WithInsecure():以安全的方式连接
	clientConn, err := grpc.Dial("127.0.0.1:8081", grpc.WithInsecure())
	if err!=nil{
		log.Println(err)
		return
	}
	defer clientConn.Close()
	//2,通过proto生成的文件初始化客户端
	client := MESSAGE.NewUserClient(clientConn)
	//3，调用远程服务
	requset:=&MESSAGE.Request{Name: "张三"}
	//context.TODO():上下文的空对象，传入一个定义好的类型，返回respoes
	res, err := client.Get(context.TODO(), requset)
	if err!=nil{
		log.Println(err)
	}
	fmt.Println(res)
}
~~~



## 1.2 grpc服务端

~~~go
package main

import (
	"context"
	"google.golang.org/grpc"
	"log"
	"mm/MESSAGE"
	"net"
)

type user1 struct {

}

func (u user1) Get(ctx context.Context, request *MESSAGE.Request) (*MESSAGE.Repones, error) {
return 	&MESSAGE.Repones{Name:  request.Name} ,nil
}

func main() {
	//1.初始化grpc服务对象
	server := grpc.NewServer()
	//2,注册服务;通过proto生成的注册服务方法注册；传入grpc初始化服务与实现了UserServer接口的服务对象
	MESSAGE.RegisterUserServer(server,new(user1))
	//3,设置监听
	listen, err := net.Listen("tcp", "127.0.0.1:8081")
	if err!=nil{
		log.Println(err)
		return
	}
	defer listen.Close()
	//4.通过初始化的grpc对象启动grpc服务，传入监听窗口
	err = server.Serve(listen)
	if err!=nil{
		log.Println(err)
		return
	}
}

~~~

## 1.3 ssl认证

- 安装ssl :官方下载地址： https://www.openssl.org/source/
- 

## 1.4 token认证 

客户端

~~~go
package main
import (
	"context"
	"fmt"
	"google.golang.org/grpc"
	"log"
	"turan.com/go_modules/proto"
)

//定义token结构体
type TokenAuthentication struct {
	appkey string
	appsecret string
}

//实现credentials.PerRPCCredentials接口
func (t *TokenAuthentication) GetRequestMetadata(ctx context.Context, uri ...string) (map[string]string, error) {
	return map[string]string{"AppKey":t.appkey,"AppSecret":t.appsecret},nil
}
func (t TokenAuthentication) RequireTransportSecurity() bool {
	return false  //基于tls进行安全认证
}
func main() {
	//实例化token
	token :=&TokenAuthentication{
		appkey:    "0824",
		appsecret: "hello",
	}
	req := proto.HelloReq{Name: "1"}
 	//传入token，或传入ssl认证信息
	client, err := grpc.Dial("127.0.0.1:8080", grpc.WithInsecure(),grpc.WithPerRPCCredentials(token))
	if err!=nil{
		log.Println(err)
	}
	defer client.Close()
	helloClient := proto.NewHelloserverClient(client)
	res, err := helloClient.Get(context.Background(), &req)
	if err!=nil {
		log.Println("返回错误",err)
		return
	}
	fmt.Println(res.GetOrder())
}

~~~

服务端

~~~go
package main

import (
	"context"
	"fmt"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/metadata"
	"google.golang.org/grpc/status"
	"log"
	"net"
	"strconv"
	"turan.com/go_modules/proto"
)

type hello struct {
}

var m  []*proto.HelloRes

func (h hello) Get(ctx context.Context, req *proto.HelloReq) (*proto.HelloRes, error) {
	keyMap, b := metadata.FromIncomingContext(ctx)  //调用FromIncomingContext，取出在请求头中的map信息，token信息携带请求头中
	if !b {
		return nil,status.Error(codes.Unauthenticated,"无token认证信息")
	}
	var appkey string
	var appsecret string
	for s, strings := range keyMap {  //判断一个map的key是否存在，返回value,bool
		log.Println(s,strings)
	}
	if value,ok := keyMap["appkey"];ok{
		appkey=value[0]
	}else {
		log.Println("appkey不存在")
	}
	if value,ok := keyMap["appsecret"];ok{
		appsecret=value[0]
	}else {
		log.Println("AppSecret不存在")
	}

	if  appkey!="0824"|| appsecret!="hello" {
		return nil,status.Error(codes.Unauthenticated,"token不合法")
	}else {
		atoi, err := strconv.Atoi(req.Name)		//string转int
		if err!=nil {
			return nil,status.Error(codes.Unauthenticated,"请求数据有误")
		}
		fmt.Println("返回数据")
		return m[atoi], nil
	}
}

func main() {
	m = make([]*proto.HelloRes, 5)
	m = append(m, &proto.HelloRes{Order: "8"},&proto.HelloRes{Order: "3"})
	server := grpc.NewServer()
	proto.RegisterHelloserverServer(server,&hello{})
	listen, err := net.Listen("tcp", "127.0.0.1:8080")
	if err!=nil{
		panic(err)
	}
	err= server.Serve(listen)
	if err!=nil {
		panic(err)
	}
}

~~~



## 1.5 拦截器





# redis

```go
import "github.com/go-redis/redis"  //下载地址
```

## 1.0  get与set用法

~~~go
package main

import (
	"fmt"
	"github.com/go-redis/redis"
	"log"
)
func main() {
	client := redis.NewClient(&redis.Options{   //建立连接
		Network:  "tcp",
		Addr:     "127.0.0.1:6379",
		DB:       0,  //指定redis库编号
		PoolSize: 100, //连接池大小

	})
	defer client.Close()
	_, err := client.Ping().Result()  //判断是否出现连接错误
	if err!=nil{
		log.Println(err)
		return
	}
	fmt.Println("连接成功")
	result, err := client.Get("ww").Result()  //返回一个查询结果与错误
	if err==redis.Nil {  //redis.nil:为不存在
		log.Println("name is not exist")
	}else if err!=nil{   //再判断其他类型错误
		log.Println(err)
		return
	}else {
		fmt.Println(result)  //
	}
	resul2t, err := client.Set("token", "2", 0).Result()  //返回一个是成功信息，插入效果类型map，key不可以重复
	if err!=nil{
		log.Println(err)
		return
	}
	if resul2t=="OK" {
		fmt.Println("插入成功")
	}
}
~~~

## 1.1 批量提交



## 1.2 事务（监听值是否变化）





# log日志

**劣势**

- 仅限基本的日志级别
  - 只有一个Print选项。不支持INFO/DEBUG等多个级别;
- 对于错误日志，它有Fatal和Panic
  - Fatal日志通过调用os.Exit(1)来结束程序;
  - Panic日志在写入日志消息之后抛出一个panic;
  - 但是它缺少一个ERROR日志级别，这个级别可以在不抛出panic或退出程序的情况下记录错误
- 缺乏日志格式化的能力——例如记录调用者的函数名和行号，格式化日期和时间格式。等等;
- 不提供日志切割的能力;

## 1.0 日志使用

~~~go
package main

import (
   "log"
   "net/http"
   "os"
)

var url = "https://www.baiu.com"
func main() {
   file, err := os.OpenFile("./log/http.log", os.O_CREATE|os.O_RDWR|os.O_APPEND, 0644)
   if err!=nil {
      log.Println(err)
      return
   }
   log.SetOutput(file)   //传入一个打开的文件，指定日志的输出文件；没有设置时，log输出到终端

   get, err := http.Get(url)
   if err!=nil {
      log.Printf("error :%v  url:%s ",err,url)   //将日志输出到指定的文件夹内
   }else {
      log.Printf("status code:%d  url:%s",http.StatusOK,url)
      get.Body.Close()
   }
}







# zap日志

​~~~go
import "go.uber.org/zap"
~~~

# zap日志

## 1.0 zap日志记录器

NewProduction&Sugar是内置的json格式记录形式

~~~go
package main

import (
	"go.uber.org/zap"
	"net/http"
)

var logger *zap.Logger
var sugareLogger *zap.SugaredLogger

var url ="https://www.baidu.com"

func main() {
	//例如production logger默认记录调用函数信息、日期和时间等;
	logger, _ = zap.NewProduction()//以键值对的形式记录日子
	
	//将prod转换成sugar日志，默认记录调用函数信息、日期和时间等
	sugareLogger = logger.Sugar()   //以格式化字符串的形式记录日志
    
    
	sugareLogger.Debug("get url",url)
	res, err := http.Get(url)
	if err!=nil{
		logger.Error("Error fetching url..",
			zap.String("url",url),
			zap.String("err",err.Error()),
		)
		sugareLogger.Errorf("Error fetching URL %s : Error = %s", url, err)

	}else {
		logger.Info("success",//以键值对的形式记录日子
			zap.String("status code",res.Status),
			)
		
		sugareLogger.Infof("Success! statusCode = %s for URL %s", res.Status, url)//以格式化字符串的形式记录日志
		res.Body.Close()
	}



}
~~~



## 1.1 zap自定义日志

自定义日志配置默认展示：日志级别，时间;

~~~go
package diyzap

import (
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
	"os"
)

var SugareLogger *zap.SugaredLogger
var Logger *zap.Logger
//例如production logger默认记录调用函数信息、日期和时间等;
func init() {
	encoder := getEncoder()
	writerFlie := getLogWriter()
	//new一个新配置，组装编码，输出文件路径，日志级别
	core := zapcore.NewCore(encoder, writerFlie, zapcore.DebugLevel) //传入编码，输出文件，指定日志输出级别
	//将配置传入给生成logger方法,zap32.AddCaller():输出函数被调用的信息
	Logger = zap.New(core,zap.AddCaller())
	SugareLogger = Logger.Sugar() //转换成字符串格式化类型的logger

}


func getEncoder() zapcore.Encoder  {   //
	encoderConfig := zap.NewProductionEncoderConfig()
	encoderConfig.EncodeTime = zapcore.ISO8601TimeEncoder   //添加可读时间格式
	encoderConfig.EncodeLevel = zapcore.CapitalLevelEncoder	 //指定字符串输出的编码类型
	//指定一个json格式输出日志,返回一个json格式的输出配置；encoderConfig：在json格式中添加默认展示字段
	return zapcore.NewJSONEncoder(encoderConfig)
	//指定普通字符串格式输出日志
	//return zapcore.NewConsoleEncoder(zap32.NewProductionEncoderConfig())
}
func getLogWriter()zapcore.WriteSyncer  {
	file, _ := os.OpenFile("./zap32/diyzap/diy.log",os.O_CREATE|os.O_RDWR|os.O_APPEND, 0644)
	return zapcore.AddSync(file)   //传入一个文件句柄，指定输出文件
}


~~~



## 1.2 自定义zap结合gin框架

~~~go
package main

import (
	"go.uber.org/zap"
	"net"
	"net/http"
	"net/http/httputil"
	"os"
	"runtime/debug"
	"strings"
	"time"
	"turan.com/go_modules/zap32/diyzap"
)
import "github.com/gin-gonic/gin"

func main() {
	router := gin.New()
	router.Use(	GinLogger(diyzap.Logger),GinRecovery(diyzap.Logger,true))
	router.GET("/user", func(context *gin.Context) {
		context.JSON(http.StatusOK,gin.H{"msg":"成功"})
	})
	router.Run()
}




//设定一个基于zap的中间件
func GinLogger(logger *zap.Logger) gin.HandlerFunc  {
	return func(c *gin.Context) {
		start := time.Now()

		path := c.Request.URL.Path
		query:=c.Request.URL.RawQuery
		c.Next()
		cost :=time.Since(start)
		logger.Info(path,
			zap.Int("status",c.Writer.Status()),
			zap.String("method",c.Request.Method),
			zap.String("path",path),
			zap.String("query",query),
			zap.String("ip",c.ClientIP()),
			zap.String("user-agent",c.Request.UserAgent()),
			zap.String("errrors",c.Errors.ByType(gin.ErrorTypePrivate).String()),
			zap.Duration("cost",cost))
	}
}
// GinRecovery recover掉项目可能出现的panic
func GinRecovery(logger *zap.Logger, stack bool) gin.HandlerFunc {
	return func(c *gin.Context) {
		defer func() {
			if err := recover(); err != nil {
				// Check for a broken connection, as it is not really a
				// condition that warrants a panic stack trace.
				var brokenPipe bool
				if ne, ok := err.(*net.OpError); ok {
					if se, ok := ne.Err.(*os.SyscallError); ok {
						if strings.Contains(strings.ToLower(se.Error()), "broken pipe") || strings.Contains(strings.ToLower(se.Error()), "connection reset by peer") {
							brokenPipe = true
						}
					}
				}

				httpRequest, _ := httputil.DumpRequest(c.Request, false)
				if brokenPipe {
					logger.Error(c.Request.URL.Path,
						zap.Any("error", err),
						zap.String("request", string(httpRequest)),
					)
					// If the connection is dead, we can't write a status to it.
					c.Error(err.(error)) // nolint: errcheck
					c.Abort()
					return
				}
				if stack {
					logger.Error("[Recovery from panic]",
						zap.Any("error", err),
						zap.String("request", string(httpRequest)),
						zap.String("stack", string(debug.Stack())),
					)
				} else {
					logger.Error("[Recovery from panic]",
						zap.Any("error", err),
						zap.String("request", string(httpRequest)),
					)
				}
				c.AbortWithStatus(http.StatusInternalServerError)
			}
		}()
		c.Next()
	}
}
~~~

## 1.3 日志分割

~~~go
import "github.com/natefinch/lumberjack"
~~~





# viper配置

~~~go
import "github.com/spf13/viper"
~~~

## 1.0 优先级

- 显示调用set设置   （最高）
- 命令行参数
- 环境变量
- 配置文件
- key/value存储
- 默认值（最低）



## 1.1 viper加载配置文件

~~~go
package main

import (
	"github.com/spf13/viper"
	"log"
)

func in2()  {
	viper.Set("name","小卷")   //设置K,V存储到viper的map中、
	println(viper.GetString("name"))

	//找配置文件方式1：
	viper.SetConfigName("config")   //指定文件名，当只有一个文件时可以单用一个
	viper.SetConfigType("yaml")		//指定文件后缀
    viper.AddConfigPath("config")   //在当前项目的config文件下寻找配置文件
    
	//找配置文件方式2：
	viper.SetConfigFile("config/config.yaml")   //当前项目路径目录当文件名
    
	//解析配置文件
	err := viper.ReadInConfig()
	if err!=nil{
		log.Println(err)
		return
	}
	println(viper.GetString("database.host"))
}
func main() {
	in2()
}
~~~

~~~yaml
mysql:
  host: "127.0.0.1"
  port: 3306
  dbname: "emp"
  username: root
  password: 123456

redis:
  host: "127.0.0.1"
  port: 6379
  db: 0
  poolsize: 100


~~~



##  1.2 yaml反序列化

~~~go
package main

import (
	"fmt"
	"github.com/fsnotify/fsnotify"
	"github.com/gin-gonic/gin"
	"github.com/spf13/viper"
	"log"
	"net/http"
)

type mysql struct {
	Host string `mapstructure:"host"`
	Port int `mapstructure:"port"`
	Dbname string `mapstructure:"dbname"`
	Username string `mapstructure:"username"`
	Password string `mapstructure:"password"`

}
var mysql1 mysql

func in2()  {
	viper.SetDefault("fileDir","./")
	viper.SetConfigFile("config/config.yaml")   //当前项目路径目录当文件名

	//解析配置文件
	err := viper.ReadInConfig()

	println(viper.GetString("database.host"))
	err2 := viper.UnmarshalKey("database",&mysql1)  //声明yaml的配置分组,反序列化不知道热加载配置
	if err2!=nil {
		log.Println("erer",err)
		return
	}
	fmt.Printf("%#v",mysql1)
	viper.WatchConfig()     //热加载配置
	viper.OnConfigChange(func(in fsnotify.Event) {  //热加载配置
		log.Println("文件修改了")
	})
}
func main() {
	in2()
	router := gin.Default()
	router.GET("/user", func(c *gin.Context) {
		c.JSON(http.StatusOK,gin.H{"配置信息":viper.GetString("database.dbname")})
	})
	router.Run()
}
~~~



# go_web脚手架

- 加载配置文件
  1. settings目录：创建settings.go与yaml
  2. yaml内容：
     1. 项目：名称，环境，端口
     2. 日志：日志等级，logfilname，单日志文件最大的容量，最大存储天数，备份数量
     3. mysql：主机，端口，用户名，密码，数据库名
     4. redis：主机，端口，数据库编号，密码
  3. settings.go:
     1. 读取yaml配置信息
- 初始化日志
- 初始化mysql连接
- 初始化redis连接
- 注册路由
- 启动服务（优雅关机）





# bluebull

## 1.0 snowflake算法 生成id

~~~go
import "github.com/bwmarrin/snowflake"
~~~



## 1.1 validator参数校验库

~~~txt
https://pkg.go.dev/github.com/go-playground/validator#hdr-Baked_In_Validators_and_Tags
~~~

~~~go
package utils

import (
	"fmt"
	"github.com/gin-gonic/gin/binding"
	"github.com/go-playground/locales/en"
	"github.com/go-playground/locales/zh"
	ut "github.com/go-playground/universal-translator"
	"github.com/go-playground/validator/v10"
	enTranslations "github.com/go-playground/validator/v10/translations/en"
	zhTranslations "github.com/go-playground/validator/v10/translations/zh"
)

// 定义一个全局翻译器T
var trans ut.Translator

// InitTrans 初始化翻译器
func InitTrans(locale string) (err error) {
	// 修改gin框架中的Validator引擎属性，实现自定制
	if v, ok := binding.Validator.Engine().(*validator.Validate); ok {

		zhT := zh.New() // 中文翻译器
		enT := en.New() // 英文翻译器

		// 第一个参数是备用（fallback）的语言环境
		// 后面的参数是应该支持的语言环境（支持多个）
		// uni := ut.New(zhT, zhT) 也是可以的
		uni := ut.New(enT, zhT, enT)

		// locale 通常取决于 http 请求头的 'Accept-Language'
		var ok bool
		// 也可以使用 uni.FindTranslator(...) 传入多个locale进行查找
		trans, ok = uni.GetTranslator(locale)
		if !ok {
			return fmt.Errorf("uni.GetTranslator(%s) failed", locale)
		}

		// 注册翻译器
		switch locale {
		case "en":
			err = enTranslations.RegisterDefaultTranslations(v, trans)
		case "zh":
			err = zhTranslations.RegisterDefaultTranslations(v, trans)
		default:
			err = enTranslations.RegisterDefaultTranslations(v, trans)
		}
		return
	}
	return
}
~~~

## 1.2 jwt

~~~go
import "github.com/dgrijalva/jwt-go"
~~~

Token:

- 头部:用户信息

- 负载:官方字段

- 签名:加密信息



~~~go
package utils

import (
	"errors"
	"github.com/dgrijalva/jwt-go"
	"log"
	"time"
	"turan.com/web_demo/models"
)

const TokenExpirDuration = time.Hour * 2  //定义过期时间

var MySercet = []byte("turan") //定义加密密钥

type Myclaims struct {
	UserID             int64  `json:"user_id"`
	UserName           string `json:"user_name"`
	jwt.StandardClaims        //包含官方字段
}

//生成token
func GetToken(user *models.User) (string, error) {
	c := Myclaims{
		UserID:   user.UserID,
		UserName: user.UserName,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(TokenExpirDuration).Unix(), //指定token过期时间
			Issuer:    "turan",
		},
	}
	Token := jwt.NewWithClaims(jwt.SigningMethodHS256, c)
	return Token.SignedString(MySercet)
}

//解析token
func ParamsToken(tokenString string) (*Myclaims, error) {
	var mc = new(Myclaims) //存放token解析后的数据
	token, err := jwt.ParseWithClaims(tokenString, mc, func(token *jwt.Token) (interface{}, error) {
		return MySercet, nil
	})
	if err != nil {
		log.Println(err.Error())
		return nil, err
	}
	if token.Valid { //校验token
		return mc, nil
	}
	return nil, errors.New("invalid token")
}

~~~

# 1.3 swagger

~~~go
go get -u github.com/swaggo/swag/cmd/swag
~~~

