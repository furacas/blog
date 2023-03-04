---
title: 解决poi读出来的sheet个数和实际看到个数不一致
date: 2023-03-03T05:59:47.000Z
updated: 2023-03-03T06:21:43.000Z
tags: ['excel','poi']
---
  
## 背景

业务那边给了个 excel，用 office 软件打开只显示一个 Sheet，但是使用 poi 读可以读出来 3 个 sheet，并且看了这个 excel 确实没有隐藏 sheet。

## 解决过程

一开始用了一些关键字并没有找到相应的结果。并且使用 poi 查看这个看不到的 sheet 的 isHidden 也确实都是 fasle。
后来快要放弃的时候，发现了 poi 接口有个方法

```java
org.apache.poi.ss.usermodel.Workbook#getSheetVisibility
```

这个方法和 isHidden 是同一个层级的，只是因为在找 isHidden 的时候 ide 自动提示出来的。然后我就调用了一下这个方法，发现看不到的 excel 使用这个方法返回的是`VERY_HIDDEN`这个枚举值。

有了这个关键字，然后去搜索这个关键字就比较容易了。找到了一个比较好的解释，链接我放到参考里面去了。大概意思 excel 有一种 very hidden 模式，这个模式默认情况下不会漏出来，需要在开发者模式下，或者像我这样用 poi 才能看到。

## 参考

[https://theexcelclub.com/excel-hidden-and-very-hidden-sheets-whats-the-difference/](https://theexcelclub.com/excel-hidden-and-very-hidden-sheets-whats-the-difference/)