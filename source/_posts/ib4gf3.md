---
title: Ubuntu安装frp
date: 2022-09-30T11:40:35.000Z
tags: ['内网穿透','瞎折腾']
---
  
## 下载 frp

```bash
wget https://github.com/fatedier/frp/releases/download/v0.44.0/frp_0.44.0_linux_amd64.tar.gz
```

## 安装

```bash
# 解压
tar -vxzf frp_0.44.0_linux_amd64.tar.gz
mv frp_0.44.0_linux_amd64 frp
```

## 设置开启启动

```bash
# 创建并编辑 service文件
vim /lib/systemd/system/frps.service
```

文件内容

```bash
[Unit]
Description=frps daemon

[Service]
Type=simple

# 这里换成你的frp目录
ExecStart=/root/app/frp/frps -c /root/app/frp/frps.ini

[Install]
WantedBy=multi-user.target
```

这里是我主要用作服务端，因此我只设置了服务端的开机自启动，可以根据需求自行设置

```bash
# 启动frp
systemctl start frps
# 设置frp自启动
systemctl enable frps
```