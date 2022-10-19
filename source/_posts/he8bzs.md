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
![](https://cdn.nlark.com/yuque/0/2022/png/328252/1657784663589-ccace046-f153-4455-a32f-a9def1584f01.png)
如果输入正确的密码就会弹出一个新的窗口
![](images/FjEkZ33_jiJqOgRfiG9FhcxoONrp.png)

破解目标，让他弹出来登录成功的窗口

## 破解方法

### 字符串破解法

#### 1. 找到文件头

使用 OD 打开例子，按下`Ctrl + G`进行搜索`00401000`（exe 程序的文件头）
![](images/FkHotpvA2jyYJf6Na1Yj6vf4oA9e.png)

#### 2. 智能搜索

可以搜索关键字，找到"登陆失败"这几个关键字
右击，找到中文搜索引擎中的只能搜索。
![](https://cdn.nlark.com/yuque/0/2022/png/328252/1657784833085-3648b74e-286c-4d7b-a7a4-3e339f22dd08.png)
`Ctrl + F `搜索 "登陆失败" 找到位置

可以很容易分析发现，是由于这个跳转导致的弹出登录失败的窗口![](https://cdn.nlark.com/yuque/0/2022/png/328252/1657785252233-ac6b24cf-f733-4078-a0c6-adad52c82c66.png)
那我们这里就可以简单的把这个跳转语句抹掉。点击这个语句，右击二进制，使用 nop 填充
![](images/FmcwIfPxNpOlsMd6b1DwX7rXt-ox.png)
再次点击登录按钮可以看到登录成功的窗口弹出来了。
![](images/Fhikeim1i01q5CG6Jl6m1WhrGx5y.png)

### 弹窗断点法

因为报错信息是一个错误弹窗，我们可以下一个弹窗断点来找到报出错误的地方。

#### 1. 设置消息框断点

![](images/FjxoDNUmFRdtmQU4iWwyg9hXuFIN.png)

#### 2. 运行程序，使其弹出消息框

#### 3. 寻找调用过程

点击![](images/FoeXTxVx8s2J5X-_Z81QdzPbG2tA.png)
然后点击![](images/FhOO4Hg2m4S2j4owHHlEjriW4Fjr.png)
点击 k 查看调用栈
![](images/Ftsa6vie09swQBfNH0qVJYJuGztg.png)
右击第二个显示调用
也可以找到这个位置
![](images/FgQSvJX3s8Oetn_IS75X9mb_Ps6O.png)

### Push 大法

push 大法就是让他跳过登录窗口直接到达目标窗口

#### 1. 跳转到文件头

#### 2. 找到窗口

`Ctrl + F`搜索 `push 10001`。`push 10001`隔一条指令就是一个窗口，当然有些软件不止一个窗口，可以使用`Ctrl + L`搜索下一个，把这些窗口复制下来。
![](images/Fr9Pp4r5o2HJZvoLLotiiys1-OLb.png)

#### 3. 进行替换

输入`Ctrl + B`搜索`ff25`
![](https://cdn.nlark.com/yuque/0/2022/png/328252/1657963691472-d4da11de-7408-4ea7-a98e-e5d4a248cd82.png)
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
![](images/FpeS9pLAvm2Hu9GqNeD712XhD8Fn.png)
这个时候会出来这样一个框，右键保存到文件即可
![](images/FohRvSa7fFLheOvSgfH_0C9Mvc68.png)