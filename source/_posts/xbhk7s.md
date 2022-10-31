---
title: OD逆向系列1-搭建环境
urlname: xbhk7s
date: '2022-07-11 22:24:43 +0800'
tags: []
categories: []
---

> 逆向、OD
> OD 逆向系列

# 软件

本文所有的涉及到的软件可以关注公众号**全栈编程笔记**回复**OD 逆向工具包**进行下载

## 冰点还原

在逆向的过程中有一些恶意程序会带有破坏性的行为损伤电脑文件，因此需要提前搞好保护措施来保护我们的电脑。
这里使用冰点还原来进行保护。冰点还原可以做到类似网吧的那种效果，每次开机之后都会把系统恢复到之前的状态。

### 为什么不用虚拟机

很多软件都会对虚拟机进行检测，不允许在虚拟机环境中运行

## 常用逆向工具包

这里准备一个逆向工具包，包括常用的工具 od、ce、exeinfope 等工具，具体可以看下面的截图
![捕获.PNG](https://cdn.nlark.com/yuque/0/2022/png/328252/1657712824715-1f511723-b17b-4b9a-ba98-f250e59b660c.png#clientId=u5cdb08e3-a18b-4&crop=0&crop=0&crop=1&crop=1&from=drop&id=ud354a858&margin=%5Bobject%20Object%5D&name=%E6%8D%95%E8%8E%B7.PNG&originHeight=442&originWidth=543&originalType=binary∶=1&rotation=0&showTitle=false&size=21362&status=done&style=none&taskId=u930209b4-7cb3-48a4-8a03-bb0933955f3&title=)

## 驱动 OD

对于一些加了壳的软件，加壳工具可能会对调试工具进行检测，一般的 OD 搞定不了这些壳，需要特别的驱动 OD 进行逆向。

# 特别声明

本文所有的工具均来源于网络，**不保证安全性**，因此在打开之前建议使用**冰点还原**将磁盘冻结，使用完成之后恢复原来的系统。
