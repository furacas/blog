---
title: Docker Wine环境下DLL注入的路径问题
date: 2023-07-12T11:28:42.000Z
updated: 2023-07-13T06:19:46.000Z
tags: ['C++','wine','逆向']
---
  
Wine 环境下进行 DLL 注入时，我遇到了一个奇怪的现象。尽管 DLL 成功注入，但随后程序却立即进入了 DLL_THREAD_DETACH 的生命周期阶段。这个问题困扰了我一段时间，后来我注意到，如果我在 Wine 的目录下（~/.wine）或者 WORKDIR 启动 exe，DLL 注入后程序就不会自动退出。

我怀疑这和 DLL 的搜索路径有关，在 Linux 环境可能没办法做的那么完美，或者和 Wine 的实现相关。如果大家有遇到类似的问题，可以尝试一下在 Wine 目录或者 WORKDIR 启动 exe 程序。