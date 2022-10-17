---
title: OD逆向系列3-多种方式破解实战
date: 2022-07-14T02:52:59.000Z
tags: ['逆向','OD','汇编']
category: OD 逆向系列
---
  
本文使用的例子可以关注公众号**全栈编程笔记**回复**OD 逆向工具包**进行下载
特别声明：例子和工具来源于网络，不保证安全性，在操作之前建议使用冰点还原或者你认为安全的工具保护系统。

## 本文介绍

本文使用**密码登录.exe**这个例子来介绍多种方式破解。这里例子的大致工作原理是在一个输入框中输入一个密码，如果错误会提示登录失败
![](images/FqrQtEp013Q4HtzpqXXe6vZdlWuR.png)
如果输入正确的密码就会弹出一个新的窗口
![](images/Fny2Mz7qEbCQAuzKPSwTdFq8Qs-4.png)

破解目标，让他弹出来登录成功的窗口

## 破解方法

### 字符串破解法

#### 1. 找到文件头

使用 OD 打开例子，按下`Ctrl + G`进行搜索`00401000`（exe 程序的文件头）
![](images/Ft_OpywwTNaroRsigIokxd6hGRb4.png)

#### 2. 智能搜索

可以搜索关键字，找到"登陆失败"这几个关键字
右击，找到中文搜索引擎中的只能搜索。
![](images/FrfTeHMj6twRPzIogklBQjveUYOD.png)
`Ctrl + F `搜索 "登陆失败" 找到位置

可以很容易分析发现，是由于这个跳转导致的弹出登录失败的窗口![](images/Fo5ryDJaUayFxPitw5RljgxYYf8B.png)
那我们这里就可以简单的把这个跳转语句抹掉。点击这个语句，右击二进制，使用 nop 填充
![](images/Fid4kWFIHnacBjxA3ux1loYaQ7js.png)
再次点击登录按钮可以看到登录成功的窗口弹出来了。
![](images/Flb2ZtbYKUi5H88yjqalgtHHBjbt.png)

### 弹窗断点法

因为报错信息是一个错误弹窗，我们可以下一个弹窗断点来找到报出错误的地方。

#### 1. 设置消息框断点

![](images/FqVMg-nQj4hIJaWKGF9jvJNbD1bY.png)

#### 2. 运行程序，使其弹出消息框

#### 3. 寻找调用过程

点击![](images/Fiej6WiqNMXctVtkYaxgV76y9Ie2.png)
然后点击![](images/Fg3xf1hnfkQcWpTWJ7t6SMEjhina.png)
点击 k 查看调用栈
![](images/FuucX0LIcvTKGCfdVgH7Iqa0IXeZ.png)
右击第二个显示调用
也可以找到这个位置
![](images/Ft_Zj4UYMEqhf-0HLNkPcGdub2p6.png)

### Push 大法

push 大法就是让他跳过登录窗口直接到达目标窗口

#### 1. 跳转到文件头

#### 2. 找到窗口

`Ctrl + F`搜索 `push 10001`。`push 10001`隔一条指令就是一个窗口，当然有些软件不止一个窗口，可以使用`Ctrl + L`搜索下一个，把这些窗口复制下来。
![](images/FucKvSqKKgVMgRyz76xbxaVSfrSA.png)

#### 3. 进行替换

输入`Ctrl + B`搜索`ff25`
![](images/FtGIR3XjjrB4MYoanaWxMzUOGxuz.png)
可以看到在搜索结果的上面他 push 进去了一个窗口，现在我们把他修改成我们刚才找到的窗口。
右键汇编 将`push 0x52010001`修改为 `push 0x5201000E`这个时候打开软件就直接跳出来登录成功了。
有多个窗口的情况下需要挨个尝试，直到找到想要的窗口。

### 直接跳转

有时候已经找到了关键的代码的时候可以直接使用 jmp 跳转。
比如我们已经找到了这段逻辑，判断 xxx，如果成立则验证成功。那我们可以直接跳转到判断的逻辑下面去，让他直接执行判断之后的逻辑。
这种和 push 大法比较相似，不同的是 push 大法修改的是窗口地址，这里直接把整条 push 都修改了，这里就不赘述了。

## 如何保存

使用 OD 修改之后可以立刻生效，但是下次打开程序就会失效了,这个时候我们需要把修改保存下来。
右键 保存到可执行文件，所有修改
![](images/FmyFk8BVt_HOLHEVUC8AHPCupH8k.png)
这个时候会出来这样一个框，右键保存到文件即可
![](images/Fp8kQiBgmPwkl5PFZBmLc545Qq99.png)