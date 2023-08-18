# GO

# 一、基本结构与基本数据类型

## 1.0 变量

~~~go
package main

import "fmt"

//全局变量：可以不使用
var (
	name string
	age int
)

func main() {
	var v1 string  //不赋值为零值
	var v2 = 2 //自动推导无需定义类型
	v3 := 23   //自动推导简写
	_ := fmt.Sprintf("") //匿名变量 下划线
	fmt.Println(v1,v2,v3)
    //值类型使用只存储
    s1 :=2    
	s2 :=s1
    s1=1
    fmt.Println(s2,s1) 
}
~~~



## 1.1 常量

~~~go
const beef, two, c = "eat", 2, "veg"  //并行赋值
const (
const (
	Mond= iota   //iota表示在常量组的第几行，从零开始
	Tusday
	Wednesday
	Thursday, Friday, Saturday = 4, iota, iota   //两个iota都是三，因为都在第四行
	dsa =iota
)
)

~~~

## 1.2 基本数据类型

Go 中不允许不同类型之间的混合使用

### a.数字类型

~~~go
//整数
int8（-128 -> 127）
int16（-32768 -> 32767）
int32（-2,147,483,648 -> 2,147,483,647）
int64（-9,223,372,036,854,775,808 -> 9,223,372,036,854,775,807）
//无符号整数：
uint8（0 -> 255）
uint16（0 -> 65,535）
uint32（0 -> 4,294,967,295）
uint64（0 -> 18,446,744,073,709,551,615）
//浮点型
float32（+- 1e-45 -> +- 3.4 * 1e38）   精确到小数点后7位
float64（+- 5 1e-324 -> 107 1e308） 	 精确到小数点后15位

~~~

### b.类型转换

~~~go
	i := int8(127)
	var i2 int32
	i2= int32(i)      //类型转换需要显示转换;不能直接  i2 =i
	fmt.Println(i2)

	v1 :=077
	u := uint64(v1)    //类型装换
	fmt.Println(v1,u)
~~~



## 1.3 运算符

~~~go
一元运算符： ！true  取反
		   ^ 按位补足 	 
		    << 位左移 小数点想左移动一位
		    >> 位右移 小数点想右移动一位
二运运算符： && 只有当两边的值都为 true 的时候	
		   ||   一边为true，返回true；两边为false，返回false
注：当二元运算符，左侧为true，则不会运算后面的代码，可以使用()提升优先级
~~~



## 1.4 进制数表示方法

~~~go

 v1 :=077     //增加前缀 0 来表示 8 进制数
 v2 :=0xff			//增加前缀 0x 来表示 16 进制数
	v3 :=0xAA
	V4 := 10e3    //10e3 ：表示10*（10）^3
	
	
~~~



## 1.5 格式化输出字符串

~~~go
%d 用于格式化整数
%x 和 %X 用于格式化 16 进制表示的数字
%g 用于格式化浮点型
%f 输出浮点数，%e 输出科学计数表示法
%0d 用于规定输出定长的整数，其中开头的数字 0 是必须的
%p  指针的格式化标识符为 
%s 
//不同编码的格式化方式
var ch int = '\u0041'   //utf-8的16进制表示方式
var ch2 int = '\u03B2'
var ch3 int = '\U00101234'
fmt.Printf("%d - %d - %d\n", ch, ch2, ch3) // integer
fmt.Printf("%c - %c - %c\n", ch, ch2, ch3) // character
fmt.Printf("%X - %X - %X\n", ch, ch2, ch3) // UTF-8 bytes
fmt.Printf("%U - %U - %U", ch, ch2, ch3) // UTF-8 code point


~~~



## 1.6 运算符优先级

- 二元运算符的运算方向均是从左至右
- 由上至下代表优先级由高到低

~~~go
优先级     运算符
 7      ^ !
 6      * / % << >> & &^
 5      + - | ^
 4      == != < <= >= >
 3      <-
 2      &&
 1      ||


~~~

## 1.7 类别名

- 类型别名得到的新类型并非和原类型完全相同，新类型不会拥有原类型所附带的方法
- TZ 可以自定义一个方法用来输出更加人性化的时区信息

~~~go
	type integer int   //给int起别名
	var v32 integer		//定义变量时可以使用别名来定义
~~~

## 1.8 字符串

~~~go
//1.一般的比较运算符（==、!=、<、<=、>=、>）通过在内存中按字节比较来实现字符串的对比
//2.字符串是字节的定长数组，在中括号 [] 内写入索引
//3.字符串拼接使用+号，或者+=与同一个变量

~~~

## 1.9 strings包

~~~go

func main() {
	s := "w ddd dsjkdsjs dk"
	s2 := "d"
	s3 :="22"
	println(strings.HasPrefix(s, "A"))  //判断s开头
	println(strings.HasSuffix(s2, "a"))//判断s2结尾
	println(strings.Contains(s, "aS")) //判断s包含
	println(strings.Index(s, "SA"))//返回w在s的下标；不存在时，返回-1;从首字符开始算
	println(strings.LastIndex(s, "w"))//返回w最后出现的索引位置；不存在返回-1
	println(strings.Replace(s, s2, s3, 6))  //s:表示原字符穿，s2是s中的字符，s3是替换s2的值，6表示需要替换6次s2
	println(strings.Count(s, "w")) //统计w在s中出现的次数，非重叠
	println(strings.Repeat(s2, 6))   //将s2重复拼接6次
	println(strings.TrimSpace(" s d ")) //剔除字符串开头和结尾的空白符号
	println(strings.Trim("sdds", "s")) //指定去除开头和结尾的s符号
	println(strings.TrimLeft("sdd", "s"))  //剔除左边的开头的字符
	println(strings.Fields("sds ds d"))  //以空格分隔，返回一个切片
	println(strings.Split("sdsd", "s")) //指定以s分割,返回一个切片
	println(strings.Join(strings.Fields("sds ds d"), "2")) //接收一个切片，每个元素中间以2拼接
	println(strings.NewReader("sss"))   //读取字符串内容返回reader对象
}
~~~



## 2.0 strconv包



## 2.1 时间与日期 （time包）



## 2.2 指针

![image-20210803230301286](C:\Users\turan\AppData\Roaming\Typora\typora-user-images\image-20210803230301286.png)

~~~go
var intP *int    //定义一直只接收Int类型数据的指针
i := 2
i =3
intP =&i		//将i变量的指针赋值给inp
*intP++      //指定值操作，会改变原来的值;通过*号取出指针的值
print(*intP,"\n",intP,"\n",&i,"\n",i)

---------
//注意：不能得到一个文字或常量的地址
const i = 5
ptr := &i //error: cannot take the address of i
ptr2 := &10 //error: cannot take the address of 10
~~~

![image-20210803230905383](C:\Users\turan\AppData\Roaming\Typora\typora-user-images\image-20210803230905383.png)

# 二、控制结构

## 1.0 if -else

~~~go

	if v1:="22";v1=="22" {   //定义一个变量，分号隔开，条件判断
		fmt.Println("true")
	}else if v1=="33" {
		fmt.Println("false")
	}else {
		fmt.Println("默认")
	}
~~~



## 1.1 switch

~~~go
//1

switch name {  //name的类型决定了case判断的类型;可以调用函数作为值的判断
	case 1,2,3:      //可以使用多个值并列
		fmt.Println(name)
	case name -0,name-2:     //当name类型为bool值时，可以使用比较运算符
		fmt.Println(name)
	default:
		fmt.Println("default",name)
	}
//2

	switch a, b := x[i], y[j]; {   //平行初始化内容
	case a < b:
		t = -1
	case a == b:
		t = 0
	case a > b:
		t = 1
	}


~~~

## 1.2 for

~~~go

for ;;{   //无限循环
		fmt.Println(1)
	}
----------
	for i := 0; i <10 ; i++ {    //初始值，条件，修饰
		fmt.Println(i)
	}
----------
	var name int =2
	for name<10{  //拿一个变量作为初始值，修饰语句写在方法体
		name++
		fmt.Println(name)
	}
----------

	arry:=[]int{1,23,4,5}
	for index, value := range arry {  //使用for range 遍历数组或map
		fmt.Println(index,value)
	}
~~~

## 1.3 break与continue

- 当函数执行到 return 语句

- return 语句也可以用来结束 for 死循环或者结束一个协程（goroutine）

~~~go
		for i:=0; i<10; i++ {
			for j:=0; j<10; j++ {
				if j>5 {
					break   //break只会退出最内层循环
				}
				print(j)
			}
			print("  ")
		}
	}

---------------


func main() {
    for i := 0; i < 10; i++ {
        if i == 5 {
            continue    //跳过当前循环，进入下一个循环
        }
        print(i)
        print(" ")
    }
}


~~~

## 1.4 标签与goto

~~~go
LABEL1:
	for i := 0; i <= 5; i++ {
		for j := 0; j <= 5; j++ {
			if j == 4 {
				continue LABEL1 //此写法与break作用一致
			}
			fmt.Printf("i is: %d, and j is: %d\n", i, j)
		}
	}
-------------
    i:=0
    HERE:
        print(i)
        i++
        if i==5 {
            return
        }
        goto HERE  //使用goto模拟循环


~~~

# 三、函数

- 当函数执行到 return 语句
- return 语句也可以用来结束 for 死循环或者结束一个协程（goroutine）

## 1.0 按值传递、引用传递

在函数调用时，像切片（slice）、字典（map）、接口（interface）、通道（channel）这样的引用类型都是默认使用引用传递（即使没有显式的指出指针）

~~~go
package main

import "fmt"

func main() {

var name int =3
	var v2 int =4
fmt.Println(name)
modify(&name)
fmt.Println(name)
fmt.Println("----------------")
	fmt.Println(v2)
	s(v2)
	fmt.Println(v2)
}


func modify(var1 *int)   {   //引用传递，操作值的本身
	*var1 =4
}

func s(var2 int)  {     //按置传递，操作副本，
	var2=43
}

~~~

## 1.1 变长函数

~~~go
func main() {
	long1 :=[]int{1,23,4,5}
long(1,23,4,5,6,7,8,99)
	long(long1...)   //放在slice的参数需以...的方式传递
}

func long(arryInt ...int)  {  //固定类型的变长函数
	for i, i2 := range arryInt {
		fmt.Println(i,i2)

	}
}
------------

func main() {
	long1 :=[]int{1,23,4,5}
long(1,23,4,5,6,7,8,99)
	long(long1)   //interface接口任何的数据类型，不需要...
}

func long(arryInt ...interface{})  {  //任意长度，任意类型的边长函数
	for i, i2 := range arryInt {
		fmt.Println(i,i2)

	}
}


~~~

## 1.2 defer 与追踪

~~~go
package main

import "fmt"

func main() {

	defer un(trace(23))   //执行顺序：trace,b,a,un
	defer a(b(23))
	fmt.Println()

}
func b(v int) int{
	fmt.Println("vb:",v)
	return v
}

func a(v int)  {
	fmt.Println("va",a)
}
func trace(s int) int {
	fmt.Println("entering:", s)
	return s
}

func un(s int) {
	fmt.Println("leaving:", s)
}

--------------
func func1(s string) (n int, err error) {
    defer func() {  //记录函数的参数与返回值
        log.Printf("func1(%q) = %d, %v", s, n, err)
    }()
    return 7, io.EOF
}

func main() {
    func1("Go")
}


~~~

## 1.3 函数作为参数

~~~go
func main() {
	callback(1, Add)
}

func Add(a, b int) {
	fmt.Printf("The sum of %d and %d is: %d\n", a, b, a+b)
}

func callback(y int, f func( int, int)){
	f(y, 2) // 传进来的函数在内部调用，参数值可在传进入也可以自己写入

}
~~~

## 1.4 匿名函数

~~~go
func main() {
	add :=func (a ,b int)(c int){   //将匿名函数赋值给一个变量
		defer func() {   //直接调用的匿名函数
			fmt.Println(c)   
		}() 
		c= a+b
		return
	}

   add(2,3)
}
~~~



## 1.5 闭包



# 四、数组与切片

## 1.0 数组的声明

~~~go
var arry [10]int   //声明一个数组，初始化为0
arry[1] =3			
fmt.Println(arry)
arr2 :=&arry    //使用指针赋值会改变原来的数值
arr2[1]=4
fmt.Println(arry,*arr2)

	// var arrAge = [5]int{18, 20, 15, 22, 16}

	var arrKeyValue = [5]string{3: "Chris", 4: "Ron"}   //指定下标存值
	// var arrKeyValue = []string{3: "Chris", 4: "Ron"}

	for i:=0; i < len(arrKeyValue); i++ {
		fmt.Printf("Person at %d is %s\n", i, arrKeyValue[i])
	}
~~~

## 1.1 切片

~~~go
var arrLazy = [...]int{5, 6, 7, 8, 22}
var arrLazy = []int{5, 6, 7, 8, 22}
func aryyM(a []int)  { //切片函数}
-----------------------------------------------
    	var arr []int  //未初始化定义数组
	var arr2 =make([]int,1,3)   //定义3的容量，初始化长度为1
	arr3 := make([]int,1,4)   //初始化长度为2
	fmt.Println(arr,arr2,cap(arr2),len(arr2),arr3)
	for i := 0; i < 4; i++ {
		arr3 = arr3[0:i+1]   //初始化长度扩容，重新定义了空间，i+1的值不能大于容量
		arr3[i] =i
	}
	fmt.Print(arr3)
~~~

## 1.2 new与make

new (T) 为每个新的类型 T 分配一片内存，初始化为 0 并且返回类型为 * T 的内存地址：这种方法 返回一个指向类型为 T，值为 0 的地址的指针，它适用于值类型如数组和结构体（参见第 10 章）；它相当于 &T{}。
make(T) 返回一个类型为 T 的初始值，它只适用于 3 种内建的引用类型：切片、map 和 channel（参见第 8 章，第 13 章）。



# 五、map

## 1.0 map声明与基本使用

~~~go
package main

import "fmt"

func main() {
	var map1 map[int]string                   //定义一个空map
	map1 = map[int]string{1: "23", 2: "2323"} //初始化值
	map1[13] = "2323"                         //动态增加，未初始化的map不能动态增加key:value
	fmt.Println(map1, len(map1))
	//-----------------------------------------------------------
	map2 := make(map[int]string) //直接定义一个map初始化
	map2[2] = "23"               //可直接动态增加
	fmt.Println(map2)
	//=========================================================
	mf := map[int]func() int{   //func() int 表示存放的函数是返回int类型
		1: func() int { return 10 },
		2: func() int { return 20 },
		5: func() int { return 50 },
	}
	mf[3]= func() int {   //添加函数
		return  re()
	}
	fmt.Println(mf)
//----------------------------------------------------------
    map3 :=make(map[int]string,5)//当map增长到容量上限的时候，如果再增加map的大小会自动加1

	for i := 0; i < 10; i++ {
		map3[i]=fmt.Sprintf("%d",i+1)
	}
	fmt.Println(map3[2])   //通过key获取值
//----------------------------------------------------------
	value,inpresnt := map3[2]     //判断map3key为2是否存在，返回值和bool值
	fmt.Println(value,inpresnt)
//----------------------------------------------------------
	delete(map3,2)   //删除map3Key为2的键值对
	fmt.Println(map3)
//--------------------------------------------------------
	i := make([]map[int]int,3)  //给切片定义了3个map为int类型的key，value；但是里面的3个map没有开辟空间
	i[1] = make(map[int]int,2)	//指定数组下标有1的map初始化
	i[0][2]=2  //未初始化赋值，runtime
	i[1][2]=2  //初始化后，可以添加key,value
	fmt.Println(i)
//想要一个排序的列表你最好使用结构体切片
	type name struct {
		key string
		value int
	}
}
func re() int{
	return 10
}
~~~



# 六、结构体与方法

## 1.0 定义与赋值

~~~go
package main

import "fmt"

func main() {
	var person = new(person)  //使用new创建结构体，person变量是一个指针
	person.tpye="女孩"         //类似map的赋值，指针使用的是引用赋值
	person.name="云小卷"
	//fmt.Println(*person)
	//---------------------
	person.p()
	fmt.Println(person)
	person.pr()
	fmt.Println(person)
}

type person struct {
	tpye string
	name string
}

func (receiver *person) p() {   //可以改变原来的属性值
	receiver.name="伊莲"
	fmt.Println(receiver.tpye+receiver.name)
}
func (receiver person) pr() {	//不使用指针，操作为值引用，
	receiver.name="靳夏"
	fmt.Println(receiver.tpye+receiver.name)
}
~~~

## 1.2 使用工厂创建对象

~~~go

func main() {
	person:=NewPerson("女孩","云小卷")   //在结构体私有时，可通过工厂夸包访问
	fmt.Println(*person)

}
func NewPerson(tpye string,name string) *person {
	return &person{  //&person等价于nwe（person）
		tpye: tpye,
		name: name,
	}
}

type person struct {
	tpye string
	name string
}

~~~

## 1.3 结构体继承

~~~go
package main

import "fmt"

func main() {
	person:=NewPerson("女孩","云小卷")   //在结构体私有时，可通过工厂夸包访问


	person.int=2		//调用父类的属性
	person.print()//调用父类的方法
	fmt.Println(person.student.int)   //当父类与子类重名时，通过类找到指定的属性或方法
}
func NewPerson(tpye string,name string) *person {
	return &person{
		tpye: tpye,
		name: name,
	}
}

type student struct {
	 int   //匿名属性
}

func (this *student) print()  {
	this.int=3
}
type person struct {
	tpye string  "这里是标签"
	name string  "标签2"
	int
	student   //继承student类
}
~~~

## 1.4 结构体方法

~~~go

package main
import (
"fmt"
)

type Base struct{}

func (Base) Magic() {
fmt.Println("base magic")
}

func (self Base) MoreMagic() {
self.Magic()
self.Magic()   //同一个包内的结构体属性与方法可以相互访问
}

type Voodoo struct {

}

func (Voodoo) Magic() {
fmt.Println("voodoo magic")
}

func main() {
v := new(Voodoo)
v1:=&Base{}
v.Magic()
//v.MoreMagic()
v1.Magic()
}


~~~

# 七、接口

## 1.0 类实现接口

~~~go
package main

import "fmt"

func main() {
	var dao DAO =new(User)   //创建一个类的实例，当用实例赋值给接口时，表示实现该接口
	dao.findUser()			//所有接口调用运行类型的方法
}

type User struct {
	namn string
}

func (u *User) findAll() []User {
	panic("implement me")
}

func (u *User) findUser() {
	fmt.Println("方法实现")
}
type DAO interface {
	//查询
	findUser()   //定义一个抽象方法
	//查询所有
	findAll() []User
}

~~~



## 1.1接口内嵌接口

一个接口可以包含一个或多个其他的接口，这相当于直接将这些内嵌接口的方法列举在外层接口中一样

~~~go
package main

func main() {
	var simple File =new(Simple)
	println(simple.Write(*(new(Buffer))))
}

type Simple struct {
	int
}

func (s Simple) Read(b Buffer) bool {
	panic("implement me")
}

func (s Simple) Write(b Buffer) bool {
return true
}

func (s Simple) Lock() {
	panic("implement me")
}

func (s Simple) Unlock() {
	panic("implement me")
}

func (s Simple) Close() {
	panic("implement me")
}

type Buffer struct {

}

type ReadWrite interface {
	Read(b Buffer) bool
	Write(b Buffer) bool
}

type Lock interface {
	Lock()
	Unlock()
}

type File interface {
	ReadWrite
	Lock
	Close()
}


~~~

## 1.2 类型断言

~~~go
package main

func main() {
	var person person=&stdunet{}
	person.set(32)
    // T, ok := varI.(T) :向下转型公式，var1必须是接口类型
	if stdunet, ok := person.(*stdunet);ok{    //判断运行类型，ok为true或false，studnet是向下转型的值
		println(stdunet.getInt())
	}
}

type stdunet struct {
	int
}

func (student *stdunet) set(i int) {
	student.int=i
}

func (student *stdunet) getInt() int {
	return student.int
}

type person interface {
	set(int)
}
~~~

## 1.3 tpye-switch 类型判断

~~~go
package main

func main() {
	var Simpler,Simpler2 Simpler =&Simple{},&RSimple{}
	Simpler.set(32)
	Simpler2.set(111)
	bianli(Simpler,Simpler2)

}

func bianli(inter ...interface{})  {
	for index, value := range inter {
		switch type1:=value.(type) {    //判断type1的类型
		case *Simple:
			println(index,type1.getInt())  //走到相应的类型，通过判断的对象调用私有属性
		case *RSimple:
			println(index,type1.getInt())

		}
	}
}

type Simple struct {
	int
}

func (this *Simple) set(i int) {
this.int=i
}

func (this *Simple) getInt() int {
	return this.int
}

type Simpler interface {
	set(int)
}
type RSimple struct {
		int
}

func (this *RSimple) set(i int)  {
this.int =i
}

func (this *RSimple) getInt() int {
	return this.int
}
~~~

## 1.4 方法集的调用规则

在接口上调用方法时，必须有和方法定义时相同的接收者类型或者是可以从具体类型 P 直接可以辨识的：

1. 指针方法可以通过指针调用
2. 值方法可以通过值调用
3. 接收者是值的方法可以通过指针调用，因为指针会首先被解引用
4. 接收者是指针的方法不可以通过值调用，因为存储在接口中的值没有地址
5. 将一个值赋值给一个接口时，编译器会确保所有可能的接口方法都可以在此值上被调用，因此不正确的赋值在编译期就会失败。

---

Go 语言规范定义了接口方法集的调用规则：

1. 类型 *T 的可调用方法集包含接受者为 *T 或 T 的所有方法集
2. 类型 T 的可调用方法集包含接受者为 T 的所有方法

~~~go
package main

import "fmt"

func main() {
	student1 :=student{} //定义一个值对象
	common(&student1)//传入值对象的指针
}

type student struct {
}

func (receiver *student) hi()  {  //指针方法，值对象无法调用
fmt.Println("hi,我是学生")
}

func (student student) say() {//值方法，指针对象和值对象都可以调用
	fmt.Println("我是学生")

}

type person interface {
	say()
	hi()
}

func common(person2 person)  {//person可以接收值类型也可以接口指针类型；
	person2.say()

}
~~~



## 1.5 空接口

因为任何类型都实现了空接口，所有空接口可以接收任意类型值，

~~~go
package main

import "fmt"

func main() {
var interNil interface{}    //定义一个空接口变量，可以接收任意类型
interNil = 2
fmt.Printf("%T\n",interNil)
interNil ="123"
fmt.Printf("%T\n",interNil)
interNil =new(person)
fmt.Printf("%T\n",interNil)
interNil =[]int{12,23}
fmt.Printf("%T",interNil)
}

type person struct {
}
~~~



## 1.6 接口多态

~~~go
func main() {
	sru1 :=new(sru)
	w(sru1)
}

type M1 interface {
	f()
}
type sru struct {

}

func (s sru) f() {
	fmt.Println("我是f")
}
func w(m M1)  {
	m.f()
}
~~~



## 1.7 接口的继承

- 当一个类型包含（内嵌）另一个类型（实现了一个或多个接口）的指针时，这个类型就可以使用（另一个类型）所有的接口方法



# 八、错误处理与测试

## 1.0 定义异常

~~~go
func main() {

	err :=errors.New("输入有问题吗")    //通过实现error接口的类，创建一个异常字符串
	if err != nil {
		fmt.Println("有错误")
	}
	fmt.Println(err)
	W:=FMTerr("2323")   //调用fmt错误对象函数
	fmt.Println(W)
}
type p struct {
	s string
}

func NEW(text string)error  {
	return &p{text}
}
func FMTerr(text string)error  {   //使用fmt创建错误对象
	return fmt.Errorf("%s",text)
}
func (e *p) Error() string {
	return e.s
}

~~~



# 九、协程与通道

## 1.0 通道的声明

- 通常使用这样的格式来声明通道：`var identifier chan datatype`

- 未初始化的通道的值是 nil

- 通道实际上是类型化消息的队列：使数据得以传输。它是先进先出（FIFO）的结构所以可以保证发送给他们的元素的顺序

~~~go
func main() {
	//var identifier chan datatype
	var ch chan chan string       //通道里面包含放string的通道
	var ch1 chan string				//通道里面放string
	var ch2 chan func()        //通道里面放函数
	ch1 =make(chan string)
	fmt.Println(ch1,ch,ch2)
}
------------------------------------------------

func main() {
	ch := make(chan string)
	go func() {
		ch<-"1"
		ch<-"1"
		ch<-"1"	;	ch<-"1"     //写入数据
	}()
go func() {
	for ;; {
		input:=<-ch      //从ch取出数据，
		fmt.Println(input)
	}
}()

	time.Sleep(2e9)
}



~~~

## 1.1 有缓冲与无缓冲通道

- 如果容量大于 0，通道就是异步的了：缓冲满载（发送）或变空（接收）之前通信不会阻塞，元素会按照发送的顺序被接收。

- 如果容量是 0 或者未设置，通信仅在收发双方准备好的情况下才可以成功。

## 1.2 工厂模式返回chan

~~~go
package main

import (
	"fmt"
	"time"
)

func main() {

go pr(sum())  //
	time.Sleep(1e9)
}
func sum() chan int {  //工厂模式返回chan
	ch :=make(chan int,10)
	i :=0
	for i<90 {
		i+=10
		ch<-i
	}
	return ch
}
func pr(ch chan int)  {//接受者接收
	for ;;{
		fmt.Println(<-ch)
	}
}

~~~



## 1.3 单向通道

~~~go
func main() {
	vCh := make(chan int, 10)
	go write(vCh)
	go read(vCh)
	time.Sleep(1e9)
}

func write(vch chan<- int)  {    //单向通道需要开两个协程
	for i := 0; i < 100; i++ {//写入数据大于通道容量造成死锁
		vch <- i
	}
}
func read(vch <-chan int)  {
	for {
		fmt.Println(<-vch)
	}
}
--------------------------------------
~~~



## 1.4 关闭通道、判断阻塞通道

~~~go
func main() {
	ch := make(chan string)
	go sendData(ch)
	getData(ch)
}
func sendData(ch chan string) {
	ch <- "Washington"    //放一个，取一个，未取出则阻塞，当写入最后一个时，通道关闭
	ch <- "Tripoli"
	ch <- "London"
	ch <- "Beijing"
	ch <- "Tokio"
close(ch)
}
func getData(ch chan string) {
	for {
		input, open := <-ch   //无法读取数据时，阻塞并关闭时，open返回false
		fmt.Println(open)
		if !open {
			break
		}
		fmt.Printf("%s ", input)
	}
}


~~~

## 1.5 select切换协程

~~~go

func main() {
	v1 :=make(chan int)
	v2 :=make(chan int)
	go p(v2)
	go p(v1)
	go se(v1,v2)
	time.Sleep(2e9)
}

func p(ch chan<- int)  {
	for i := 0; i<200; i++ {
		ch<-i
	}

}

func se(ch1,ch2 chan int )  {
	for  {
		select {
	case v := <-ch1:   //当ch1无数据可读时，select阻塞等待
		fmt.Println("111", v)
	case <-ch2:
		fmt.Println("222", <-ch2)
	}
	}
}

~~~

## 1.6 通道、超时、计时器



