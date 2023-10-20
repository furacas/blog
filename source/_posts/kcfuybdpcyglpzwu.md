---
title: 解决longhorn卸载的问题
date: 2023-10-18T23:10:17.000Z
updated: 2023-10-19T03:00:36.000Z
tags: ['k8s','问题随记']
---
  
## 背景

longhorn 使用 helm 卸载的时候需要[deleting-confirmation-flag](https://longhorn.io/docs/1.5.1/references/settings/#deleting-confirmation-flag)为 true，官方给的命令是

```bash
kubectl -n longhorn-system patch -p '{"value": "true"}' --type=merge lhs deleting-confirmation-flag
```

执行报错

```bash
Error from server (NotFound): settings.longhorn.io "deleting-confirmation-flag" not found
```

## 解决

看报错信息是没有这个 setting 所以无法用官方给的命令。
我猜因该是安装的时候被打断了没有完全安装导致这值没有被正确设置
既然没有，那就帮他新建一个

```bash
kubectl -n longhorn-system apply -f - <<EOF
apiVersion: longhorn.io/v1beta1
kind: Setting
metadata:
  name: deleting-confirmation-flag
  namespace: longhorn-system
value: "true"
EOF

```