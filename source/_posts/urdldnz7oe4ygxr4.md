---
title: 使用一个网段的ipv6地址作为出口ip
date: 2023-08-27T12:49:04.000Z
updated: 2023-08-27T13:02:27.000Z
tags: ['瞎折腾']
---
  
正常情况下选择出口 ip 的前提条件是要把这个 ip 静态配置在网卡上，但是如果是一个网段的 ipv6 可能难以做到的了。一方面他真的很多 linux 不支持配置这么多，另一方面性能也是个问题。因此这篇文章讨论的方案是一个动态话非配置的方式，直接在使用的时候指定 ip 的形式。

## 1. 动态绑定 IPv6 地址

### 1.1 修改内核参数

确保系统允许绑定非本地 IPv6 地址：

```bash
sudo sysctl -w net.ipv6.ip_nonlocal_bind=1
```

要使更改在重启后依然生效

```bash
echo "net.ipv6.ip_nonlocal_bind=1" | sudo tee -a /etc/sysctl.conf
```

### 1.2 设置本地路由

对于使用的 IPv6 地址或地址范围，需要创建一个本地路由条目：

```bash
ip route add local 2XXX:XXXX:XXXX:XXe4::/64 dev eth0
```

## 2. 配置 NDP 代理

`ndppd`允许您对那些未直接分配给机器但您希望使用的 IPv6 地址进行代理。

### 2.1 安装 NDP

```bash
apt install ndppd
```

### 2.2 添加配置：

`/etc/ndppd.conf`

```bash
route-ttl 30000
proxy eth0 {
  router no
  timeout 500
  ttl 30000
  rule 2XXX:XXXX:XXXX:XXe4::/64 {
    static
  }
}
```

### 2.3 启动服务

```bash
sudo systemctl start ndppd
```

## 3. 使用

这样就可以在直接指定出口 ip

```bash
curl --interface 2XXX:XXXX:XXXX:XXe4::2 ipv6.ip.sb
```