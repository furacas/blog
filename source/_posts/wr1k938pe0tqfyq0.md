---
title: 搭建基于tailscale的k3s集群
date: 2023-08-29T13:59:49.000Z
updated: 2023-10-21T16:59:32.000Z
tags: ['瞎折腾']
---
  
10 月 22 日更新
k3s 已经官方支持了 taiscale，搭建起来更简单了，以下内容可能失效，请直接看文档。

本文是我基于 tailscale 的 k3s 集群搭建过程的笔记。

## 安装 tailscale

首先需要在全部的服务器上安装 tailscale 并且加入到网络里面

```bash
curl -fsSL https://tailscale.com/install.sh | sh
tailscale up
```

## 安装 master

主节点服务器安装 master
安装 k3s，注意替换 ip 地址

```bash
export INSTALL_K3S_EXEC="server --node-ip MASTER_IP --flannel-iface tailscale0 "
curl -sfL https://get.k3s.io | sh -
```

获取 master 的 token 一会用的到

```bash
cat /var/lib/rancher/k3s/server/node-token
```

## 安装 node

注意替换掉下面的 MASTER_IP、TOKEN、NODE_IP

```bash
export K3S_URL=https://MASTER_IP:6443
export K3S_TOKEN=TOKEN
export INSTALL_K3S_EXEC="agent --flannel-iface=tailscale0 --node-ip NODE_IP --server=${K3S_URL} --token=${K3S_TOKEN}"
curl -sfL https://get.k3s.io | sh -
```

其他的 node 重复一下就行了。这样集群就搭建完毕了。