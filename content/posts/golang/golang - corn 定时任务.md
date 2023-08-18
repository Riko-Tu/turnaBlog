---
weight: 5
title: "golang - cron 定时任务"
date: 2023-08-16T15:19:34+08:00
draft: false
tags: [golang,cron]
categories: [golang]
featuredImagePreview: ""
toc:
    auto: false
---
## 介绍



## 使用
### 初始化
```bash
go get github.com/robfig/cron/v3
```
```go

import (
    "github.com/robfig/cron/v3"
)

// CronConfig 定时脚本配置
type CronConfig struct {
	ID         int    `json:"id"`
	Spec       string `json:"spec"  gorm:"size:64" `     // cron表达式  ： 秒分时日月周
	FuncName   string `json:"funcName" gorm:"size:64"`   // 函数名
	Describe   string `json:"describe"  gorm:"size:256"` // 任务名
	ServerName string `gorm:"size:32"`                   // 服务名
	Status     string `json:"status" gorm:"size:32"`     // 有效;  无效
}

// 任务函数
// PrintOne 打印一
func PrintOne() {

	cronTime := make(chan bool)

	go func() {
		time.Sleep(time.Minute)
		cronTime <- true
	}()
	for {
		select {
		case <-cronTime:
			return
		case <-time.After(time.Second):
			fmt.Println("1")
		}
	}
}

// 任务映射表
var taskMap = map[string]func(){
	"PrintOne": PrintOne,
}

func TestTimingTask(t *testing.T) {

	tasks := []CronConfig{{
		Spec:     "0 * * * * *", // 每分钟第0秒时执行
		FuncName: "PrintOne",
		Describe: "循环打印1,一分钟",
	}}
	// 初始化
	jobs := cron.New(cron.WithSeconds()) // cron.WithSeconds() 配置cron表达式
	for _, task := range tasks {
		// 添加任务
		_, err := jobs.AddFunc(task.Spec, taskMap[task.FuncName])
		if err != nil {
			log.Fatal(err)
		}
	}
	// 开始定时
	jobs.Start() // 加载到内存中等待执行
	time.Sleep(time.Hour)
}

```