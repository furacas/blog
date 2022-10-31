---
title: Docker客户端访问远程Docker Engine
urlname: ubzyk2
date: '2022-08-28 09:46:28 +0800'
tags: []
categories: []
---

> docker

## 1. 开启 2375 端口

这里以**ubuntu20.04**为例
编辑文件

```bash
vim /usr/lib/systemd/system/docker.service
```

ExecStart 属性添加参数 -H tcp://0.0.0.0:2375
![image.png](https://cdn.nlark.com/yuque/0/2022/png/328252/1661652340332-5fdde1fb-96d4-4b96-99db-48d0a418533d.png#clientId=ucc39f157-0757-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=56&id=uc15088cd&margin=%5Bobject%20Object%5D&name=image.png&originHeight=112&originWidth=1470&originalType=binary∶=1&rotation=0&showTitle=false&size=40819&status=done&style=none&taskId=u67a50359-9125-40a1-8d8d-7493b729438&title=&width=735)
加载 docker 守护进程
重启 docker

```bash
systemctl daemon-reload
systemctl restart docker
```

注意 ⚠️ **防火墙无需开启 2375 端口放行**

## 2. 配置 ssh

这里没什么好说的，配置本地访问的 ssh 密钥，略

## 3. 创建 docker context

本地创建 docker context

```bash
docker context create <context name> --docker "host=ssh://<user>@<host>"
```

切换到刚才的 context

```bash
docker context use <context name>
```

这样就可以在本地直接操作远程的 docker 了

### 切换到本地

如果想切回本地

```bash
docker context use default
```
