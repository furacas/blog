---
title: N5105安装ESXi
date: 2022-09-28T11:59:43.000Z
updated: 2022-12-03T14:58:14.000Z
tags: ['软路由','瞎折腾','N5105']
---
  
## 软件准备

[Ventoy ](https://www.ventoy.net/cn/)
PE 工具，这里我使用的是[微 PE](https://www.wepe.com.cn/download.html)
带网卡驱动的 ESXI iso 文件

我打包了需要的软件，懒得找的可以直接用我的。
链接：[https://pan.baidu.com/s/1hHHfWzF_yR6zN8UhbG9S2g?pwd=p2bd](https://pan.baidu.com/s/1hHHfWzF_yR6zN8UhbG9S2g?pwd=p2bd)
提取码：p2bd

## 刻录 U 盘

1. 把 Ventory 安装到 U 盘中

![](images/1664367921005-710672fe-4df3-41ec-acb6-04b7be723791.png)
![](images/1664368346556-6c4ec54d-a655-4586-aec7-aec1a4de9694.png)

2. 使用微 PE 制作 iso 镜像

![](images/1664537354599-da0c8f29-d3e3-4aec-ba66-dc945703cffe.png)

3. 将制作好的的 PE 以及 ESXI 的 iso 文件复制到 U 盘中

## 系统安装

1. 进入 bios 关闭安全 boot。
2. 如果要安装的系统盘需要格式化，那么开机的时候按 F7，选择微 PE 系统进去格式化一下。如果不需要则跳过这一步。
3. 开机的时候按 F7，选择 ESXi 的系统进入，跟着步骤走即可。
4. 配置 ESXi 的网络，这里我使用的是 192.168.50.X 网段，可以根据自己的需求调整。