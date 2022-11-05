---
title: 解决poi插入的换行符无法被复制的问题
urlname: cddgaa
date: '2022-11-04 18:03:34 +0800'
tags: []
categories: []
---

> poi、java

## 问题背景

在 word 中有两种换行，一种是直接按下回车的"段落换行"![image.png](https://cdn.nlark.com/yuque/0/2022/png/328252/1667556405124-28604506-8839-4231-8038-fd17fc9e1802.png#clientId=u996beacd-d6b1-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=13&id=u0a5a81d8&margin=%5Bobject%20Object%5D&name=image.png&originHeight=25&originWidth=34&originalType=binary∶=1&rotation=0&showTitle=false&size=771&status=done&style=none&taskId=uf8e6c067-733c-49c9-8828-ae86b625935&title=&width=17)而另一种换行符是按下 shift + 回车打出来的换行符 ![image.png](https://cdn.nlark.com/yuque/0/2022/png/328252/1667556470690-9489e920-0b49-4c04-8984-f0e11a0b40f4.png#clientId=u996beacd-d6b1-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=12&id=u0f8fae03&margin=%5Bobject%20Object%5D&name=image.png&originHeight=24&originWidth=24&originalType=binary∶=1&rotation=0&showTitle=false&size=696&status=done&style=none&taskId=u8f5e30fd-6ac8-4d52-bfde-df45a6f3179&title=&width=12)

```
## 第一种换行符
org.apache.poi.xwpf.usermodel.XWPFRun#addCarriageReturn()

## 第二种换行符
org.apache.poi.xwpf.usermodel.XWPFRun#addBreak()
```

第一种换行符比较符合我们日常的使用习惯，但是使用上述 api 打出来的换行符可以在 word 中被正常识别，但是无法通过复制的方式把这个换行符复制到一段文本中。
举个例子，如下 word 内容

```
第一行
第二行
第三行
```

复制到文本文件中变成

```
第一行 第二行 第三行
```

而我们直接在 word 中敲出来的回车换行符可以被正确复制。

## 解决思路
