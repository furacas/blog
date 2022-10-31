---
title: N5105安装ESXi
urlname: sgemn2
date: '2022-09-28 19:59:43 +0800'
tags: []
categories: []
---

> 软路由、瞎折腾、N5105

## 软件准备

[Ventoy ](https://www.ventoy.net/cn/)
PE 工具，这里我使用的是[微 PE](https://www.wepe.com.cn/download.html)
带网卡驱动的 ESXI iso 文件

我打包了需要的软件，懒得找的可以直接用我的。
链接：[https://pan.baidu.com/s/1hHHfWzF_yR6zN8UhbG9S2g?pwd=p2bd](https://pan.baidu.com/s/1hHHfWzF_yR6zN8UhbG9S2g?pwd=p2bd)
提取码：p2bd

## 刻录 U 盘

1. 把 Ventory 安装到 U 盘中

![image.png](https://cdn.nlark.com/yuque/0/2022/png/328252/1664367921005-710672fe-4df3-41ec-acb6-04b7be723791.png#clientId=u25f45e81-565e-4&crop=0&crop=0&crop=1&crop=1&errorMessage=unknown%20error&from=paste&height=34&id=u252eab0e&margin=%5Bobject%20Object%5D&name=image.png&originHeight=34&originWidth=279&originalType=binary∶=1&rotation=0&showTitle=false&size=2364&status=error&style=none&taskId=ucbf64306-b3b4-4976-848a-fe6b3b6a3d8&title=&width=279)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/328252/1664368346556-6c4ec54d-a655-4586-aec7-aec1a4de9694.png#clientId=u25f45e81-565e-4&crop=0&crop=0&crop=1&crop=1&errorMessage=unknown%20error&from=paste&height=343&id=uf2058e6f&margin=%5Bobject%20Object%5D&name=image.png&originHeight=343&originWidth=454&originalType=binary∶=1&rotation=0&showTitle=false&size=29962&status=error&style=none&taskId=ua1109ebc-4bc3-46c9-9cfa-37b6fed9de0&title=&width=454)

2. 使用微 PE 制作 iso 镜像

![image.png](https://cdn.nlark.com/yuque/0/2022/png/328252/1664537354599-da0c8f29-d3e3-4aec-ba66-dc945703cffe.png#clientId=u566143ad-b2a3-4&crop=0&crop=0&crop=1&crop=1&errorMessage=unknown%20error&from=paste&height=364&id=u077ce5b5&margin=%5Bobject%20Object%5D&name=image.png&originHeight=364&originWidth=574&originalType=binary∶=1&rotation=0&showTitle=false&size=42289&status=error&style=none&taskId=u938e8a13-0bb3-4473-9965-fc988a5d504&title=&width=574)

3. 将制作好的的 PE 以及 ESXI 的 iso 文件复制到 U 盘中

## 系统安装

1. 进入 bios 关闭安全 boot。
2. 如果要安装的系统盘需要格式化，那么开机的时候按 F7，选择微 PE 系统进去格式化一下。如果不需要则跳过这一步。
3. 开机的时候按 F7，选择 ESXi 的系统进入，跟着步骤走即可。
4. 配置 ESXi 的网络，这里我使用的是 192.168.50.X 网段，可以根据自己的需求调整。
