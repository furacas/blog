---
title: 解决无线网卡偶尔搜不到wifi的问题（信道不统一）
urlname: gtho82
date: '2022-08-19 21:53:37 +0800'
tags: []
categories: []
---

## 背景

家里一台笔记本电脑，还有一个无线网卡偶尔搜不到 wifi，不是必现，但是 mac 电脑还有一些物联网设备，手机从来没有出现这个问题。

## 解决过程

因为绝大部分设备都是没有这个问题的， 因此一开始怀疑是那台电脑的驱动问题，尝试升级了驱动但是并没有解决问题。

家里两个路由器，我就想用另外一个试验一下，发现可以稳定搜到。因为着急用网，就想着用平时不常用的那个路由器中继一下，电脑连上先用起来，发现中继之后就搜不到信号了。这个时候我开始怀疑是信号的问题。

网上找了一下关键字，说是可能两台设备的信道范围不同。

看了一下 Wi-Fi 的信道，设置是自动的范围是 5-13
![image.png](https://cdn.nlark.com/yuque/0/2022/png/328252/1660917945098-6a4132c0-4766-4a75-a3b1-9f887de98286.png#clientId=ubb916786-a7e5-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=318&id=ue8bdd9eb&margin=%5Bobject%20Object%5D&name=image.png&originHeight=636&originWidth=1252&originalType=binary∶=1&rotation=0&showTitle=false&size=70925&status=done&style=none&taskId=ub7e5d93f-b4e1-4a69-b0b8-b24249e936b&title=&width=626)

在看了一下网卡的信道发现范围是 1-11
![image.png](https://cdn.nlark.com/yuque/0/2022/png/328252/1660918127078-bf52dba7-e966-4627-96e4-231014c08d08.png#clientId=u691e9047-7726-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=413&id=uf1e521e6&margin=%5Bobject%20Object%5D&name=image.png&originHeight=413&originWidth=446&originalType=binary∶=1&rotation=0&showTitle=false&size=16752&status=done&style=none&taskId=u052c1d55-3d42-4310-8913-70e0c3b3653&title=&width=446)
所以 12，13 两个信道的信号可能就接受不到，这也和偶发的场景对上了，调整网卡的信道配置
![image.png](https://cdn.nlark.com/yuque/0/2022/png/328252/1660918196794-4beeb843-fba0-4f3b-862b-3ac81bc4a2a9.png#clientId=u691e9047-7726-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=75&id=udce1dfdc&margin=%5Bobject%20Object%5D&name=image.png&originHeight=75&originWidth=198&originalType=binary∶=1&rotation=0&showTitle=false&size=1547&status=done&style=none&taskId=u758b6d51-7db4-4899-b8af-e3cc031a9d9&title=&width=198)
问题解决
