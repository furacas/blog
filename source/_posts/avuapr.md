---
title: Ubuntu20.04修改静态ip
urlname: avuapr
date: '2022-10-02 21:46:24 +0800'
tags: []
categories: []
---

> 瞎折腾、ubuntu

给自己瞎折腾的服务器配置一个固定的静态 ip，虽然这玩意对内网穿透没啥用，但是总不能在内网中也从外网走一圈吧，在内网中直接用 ip 访问就好了。

```bash
sudo vi /etc/netplan/00-installer-config.yaml
```

修改文件内容为

```yaml
network:
  ethernets:
    ens160:
      addresses: [192.168.50.8/24] #要修改的ip地址
      dhcp4: no #no为静态 yes为自动获取
      optional: true
      gateway4: 192.168.50.4 #网关地址
      nameservers:
        addresses: [192.168.50.4] #dns服务器，多个之间逗号分隔
  version: 2
```

静态 ip 下一定要配置 dns 服务器，否则无法访问外网

使设置生效

```yaml
sudo netplan apply
```
