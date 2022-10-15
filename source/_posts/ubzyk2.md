---
title: Docker客户端访问远程Docker Engine
date: 2022-08-28T01:46:28.000Z
tags: ['docker']
---
  
## 1. 开启 2375 端口

这里以**ubuntu20.04**为例
编辑文件

```bash
vim /usr/lib/systemd/system/docker.service
```

ExecStart 属性添加参数 -H tcp://0.0.0.0:2375
![](images/FioXh1DLW5z5_KbWwjW8WX54-6fT.png)
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