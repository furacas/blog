---
title: Java word转pdf方案
date: 2022-11-23T08:17:48.000Z
updated: 2022-12-03T14:57:31.000Z
tags: ['Java','poi']
---
  
# 方案调研

## xdocreport

[https://github.com/opensagres/xdocreport](https://github.com/opensagres/xdocreport)
我测试的最新版本(2.0.3 )使用图片会报错，默认不是识别汉子（大概因为字体原因？），不支持批注。
网上了解到的可能 word 格式要求较大。

## Aspose

[https://www.aspose.com/](https://www.aspose.com/)
应该是最完美的方案，但是收费，不便宜
![](images/1669194121506-cf95425d-ebfc-463e-b6b6-09b50c900d2f.png)

## WPS 云服务

定价未知，文档上没有明确出来。
需要注册认证成为服务商
需要服务暴露到公网上，因为 wps 会回掉服务。
![](images/1669261180257-216a1bea-f829-497a-90cd-e43f191a6de3.png)
格式没有测试，应该会和 office 有细微的差距。

## 阿里云服务

接口八分钱一次，必须使用阿里云 oss。网上资料很少，个人感觉效果不错，口碑未知。
![](images/1669262327034-9513b07a-166b-41e3-9af9-1fea6f8f8fac.png)
应该是最佳方案。

##

## Libreoffice

需要安装 Libreoffice
可以使用程序去调用他自带的 soffice 工具来转或者通过 UNO 的方式
排版会有差异，而且也涉及到字体问题，涉及到字体版权问题。

## Jacob

仅支持 windows，大致原理就是调用 Microsoft Office / WPS 来实现转换，当然需要安装对应的软件，因为我们生产系统肯定部署在 linux 上面，这个方案肯定不行。

## JobConverter

本质上也是调用 Microsoft Office 或 Libreoffice 完成的转换。需要装对应的软件。

## docx4j 

引入一个 jar 包即可。
有字体问题，需要设置字体，不然中文会是乱码。
支持图片，不支持批注，批注会渲染成报错信息直接出现在输出的 pdf 中（这个就比较蛋了，哪怕你不显示也行啊）一些 word 中设置的格式无法体现出来，比如一些样式，表格的自动换行等。

![](images/1669196381100-0676c37a-98f7-4cb0-b4af-5ce496ee2a6a.png)

# 总结

docx4j、xdocreport 可以在不安装 office 的情况下完成转换，但是格式问题有点大，我们需求的 word 还是蛮复杂的。云服务阿里云的价格还行。其他方案都需要安装软件。关键软件还不小。如果需要免费方案的话，我可能会选择用 Libreoffice 的方案，docker 打一个装好 Libreoffice 的出来，把他变成服务，用程序去调用他。