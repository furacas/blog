---
title: k3s折腾笔记
date: 2023-08-09T15:02:08.000Z
updated: 2023-08-10T13:28:37.000Z
tags: ['瞎折腾','k3s','k8s']
---
  
笔记亦是备忘录。本文记录了我在安装使用 k3s 的一些步骤和过程。没有过多的解释，可能更偏向于实操。

## 安装 k3s

todo

# Ingress 白名单中间件

有一些服务需要仅内网访问，把白名单做成中间件的形式

```bash
apiVersion: traefik.containo.us/v1alpha1
kind: Middleware
metadata:
  name: ip-whitelist
spec:
  ipWhiteList:
    sourceRange:
      - "10.0.0.0/16"
```

# 安装 Kubernetes Dashboard

```bash
sudo k3s kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.5.1/aio/deploy/recommended.yaml
```

### 创建一个 ServiceAccount 和 ClusterRoleBinding

**dashboard.yaml**

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: admin-user
  namespace: kubernetes-dashboard

---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: admin-user
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
  - kind: ServiceAccount
    name: admin-user
    namespace: kubernetes-dashboard
```

```bash
sudo k3s kubectl apply -f dashboard.yaml
```