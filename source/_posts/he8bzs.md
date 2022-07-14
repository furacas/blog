---
title: OD逆向系列3-多种方式破解实战（未完）
date: 2022-07-14T02:52:59.000Z
tags: ['逆向','OD','汇编']
category: OD 逆向系列
---
  
本文使用的例子可以关注公众号**全栈编程笔记**回复**OD 逆向工具包**进行下载
特别声明：例子和工具来源于网络，不保证安全性，在操作之前建议使用冰点还原或者你认为安全的工具保护系统。

## 本文介绍

本文使用**密码登录.exe**这个例子来介绍多种方式破解。这里例子的大致工作原理是在一个输入框中输入一个密码，如果错误会提示登录失败
![](images/Fg6TVCQKWHxBT1SXZ2nnJ0GwoEFm.png)

破解目标，让他弹出来登录成功的窗口

## 破解方法

### 字符串破解法

#### 找到文件头

使用 OD 打开例子，按下`Ctrl + G`进行搜索`00401000`（exe 程序的文件头）
![](images/FtHzEIsqiaybId1v6HU6LDFDxyhh.png)

#### 智能搜索

可以搜索关键字，找到"登陆失败"这几个关键字
右击，找到中文搜索引擎中的只能搜索。
![](images/FpD3XjBIYjsuc3kAavAUaZoLtFCY.png)
`Ctrl + F `搜索 "登陆失败" 找到位置

可以很容易分析发现，是由于这个跳转导致的弹出登录失败的窗口![](images/Frwk7HONMtdlp6QtcNxLioJzbcdp.png)
那我们这里就可以简单的把这个跳转语句抹掉。点击这个语句，右击二进制，使用 nop 填充
![](images/FuAigYe8tos5WPf6-TX4Khy5K_tS.png)
再次点击登录按钮可以看到登录成功的窗口弹出来了。
![](images/FiiUibEwFfO4iN4LVLbdXylGtMNL.png)

### 其他方法（待更新）

## 如何保存

使用 OD 修改之后可以立刻生效，但是下次打开程序就会失效了,这个时候我们需要把修改保存下来。
右键 保存到可执行文件，所有修改
![](images/FmHEtxKb2ewlj7o3HgI5cAdjcso4.png)
这个时候会出来这样一个框，右键保存到文件即可
![](images/FrLfNgm2-7fDmBnRnmkTH322ZV1I.png)