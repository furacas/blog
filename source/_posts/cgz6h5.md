---
title: Windows 搜不到wifi解决
date: 2022-06-26T14:23:55.000Z
updated: 2022-06-26T14:35:06.000Z
tags: ['Windows']
---
  
我是用 mac 的，最近在折腾一些跟`.net framwork`相关的东西，一直远程也不太方便就用`Boot Camp`装了个了个 Windows，刚开始用多个好好的，直到因为一些问题我手贱点了重置网络。然后系统就搜不到 wifi 了。

## 驱动问题？

我一开始认为是驱动问题，我以为是因为硬件驱动导致的，苹果的硬件不支持微软的系统不是很正常，第一次驱动时`Boot Camp`装的，在 Windows 上面点了重置，鬼知道把驱动重置成了什么样子。所以我的想法就是搞一个`Boot Camp`。切换到 Mac，打开`Boot Camp`选择下载 windows 支持，将下载好的文件搞到 windows 里面安装。
但是并没有什么用，依然搜不到 wifi。
网上搜了一下，几乎都是认为是驱动的问题，说要安装驱动精灵什么的，试了一下果然没用，官方的驱动软件都搞不定的杂牌子搞不定很正常。

## Wifi Autoconfig

继续查了一些资料，发现可能是`Wifi Autoconfig`服务没启动。按下 Win + R 快捷键，输入 service 回车。然后找到`Wifi Autoconfig`这个服务，果然没启动。把他启动了 wifi 功能恢复。