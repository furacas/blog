---
title: Kali 暴力破解wifi密码
urlname: lffw61
date: '2022-07-27 19:59:59 +0800'
tags: []
categories: []
---

> 安全

## 特别声明

本文仅用于学习研究，切勿用于非法用途

## wifi 密码破解

网上一大堆教程都是用`aircrack-ng`抓包，操作过程比较繁琐，明明 kali 都内置了自动化的`wifite`了。
为了方便后面操作先切换到 root

```bash
su root
```

启动`wifite`

```bash
wifite
```

选择一个支持监听的网卡，如果不支持的话，淘宝 20 快可以搞到
![image.png](https://cdn.nlark.com/yuque/0/2022/png/328252/1658926621769-71b84339-4ca8-4fa6-a82a-06ab0d47bfb1.png#clientId=u1cd54116-6e0c-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=97&id=u3a96b923&margin=%5Bobject%20Object%5D&name=image.png&originHeight=97&originWidth=614&originalType=binary∶=1&rotation=0&showTitle=false&size=19078&status=done&style=none&taskId=u95503e3a-4cec-4683-ae15-02973c0bda6&title=&width=614)
这样就开始自动扫描 wifi 信号了
![image.png](https://cdn.nlark.com/yuque/0/2022/png/328252/1658923725918-8497ae8b-d3fa-4c07-a8e9-11cc62889fc2.png#clientId=u1cd54116-6e0c-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=292&id=u1802d1a0&margin=%5Bobject%20Object%5D&name=image.png&originHeight=292&originWidth=616&originalType=binary∶=1&rotation=0&showTitle=false&size=74738&status=done&style=none&taskId=ud10c5d82-cef4-448d-9a8c-a32a371c670&title=&width=616)
当扫描到你想要的 wifi 的时候按一下 `Ctrl + C`按一下就好了，可能反应有些慢
然后选择你要破解 wifi 的编号，或者输入 all 代表全部。

这里 wifi 可能有几种情况
![image.png](https://cdn.nlark.com/yuque/0/2022/png/328252/1658927879706-b6155ea8-1169-4561-bb57-a9759d9d099e.png#clientId=ueaa9db9a-cfc2-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=157&id=u5fef6ec1&margin=%5Bobject%20Object%5D&name=image.png&originHeight=157&originWidth=210&originalType=binary∶=1&rotation=0&showTitle=false&size=13301&status=done&style=none&taskId=u67023f59-ba21-471b-8273-27c7a73f0be&title=&width=210)
可以看到有些的 WPS 是 yes，有些是 no。不同的脚本处理的方式是不同的。但基本都可以自动化。

### 选择 WPS 是 no 的

选择了之后，脚本会进行自动化操作，脚本会尝试破解，当然一般情况下是破解不出来的。因为内置的字典表太弱了
![image.png](https://cdn.nlark.com/yuque/0/2022/png/328252/1658926833066-669dc262-4971-451c-964c-22fea159efe9.png#clientId=u1cd54116-6e0c-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=91&id=ud8f885d3&margin=%5Bobject%20Object%5D&name=image.png&originHeight=91&originWidth=728&originalType=binary∶=1&rotation=0&showTitle=false&size=37245&status=done&style=none&taskId=u84d851ab-5a68-45a8-9b1c-4d79c31f14f&title=&width=728)
等他破解失败之后我们获取到刚才生成的文件`hs/handshake_2412016_58-41-20-91-3F-3F_2022-07-27T08-58-37.cap`
开始尝试使用我们自己的字典表破解
这里我们使用 kali 自带的弱密码表来进行破解，当然这里只是演示，这份弱密码是老外的，并不一定符合我们的习惯。

解压 kali 的弱密码列表

```bash
gzip -d /usr/share/wordlists/rockyou.txt.gz
```

开始破解

```bash
aircrack-ng -w /usr/share/wordlists/rockyou.txt hs/handshake_2412016_58-41-20-91-3F-3F_2022-07-27T08-58-37.cap
```

然后就会自动进行破解了
![image.png](https://cdn.nlark.com/yuque/0/2022/png/328252/1658924228983-e689f097-6593-4d0f-a796-5fad4fb349e5.png#clientId=u1cd54116-6e0c-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=324&id=u8fd37f32&margin=%5Bobject%20Object%5D&name=image.png&originHeight=324&originWidth=597&originalType=binary∶=1&rotation=0&showTitle=false&size=95038&status=done&style=none&taskId=ue9c45c78-4383-474f-b738-6a491dd8469&title=&width=597)
这里可以看出来能否破解的主要因素就是密码表是强大了。

这里我准备了 3.95G 的常用 wifi 密码字典。可以关注公众号**全栈编程笔记**回复**破解字典**进行下载
![image.png](https://cdn.nlark.com/yuque/0/2022/png/328252/1658933196404-c320fcf7-d55f-48d0-97f6-76ecfcb27abb.png#clientId=u3d01c62d-fba3-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=374&id=u9a3790ad&margin=%5Bobject%20Object%5D&name=image.png&originHeight=374&originWidth=606&originalType=binary∶=1&rotation=0&showTitle=false&size=53803&status=done&style=none&taskId=u9c891237-1881-4121-bac8-df58428d1d7&title=&width=606)

### 选择 WPS 是 yes 的

这种脚本会尝试破解 PIN

## ![image.png](https://cdn.nlark.com/yuque/0/2022/png/328252/1658928017973-ae994123-aadf-48da-8c93-f28f84107a7d.png#clientId=ueaa9db9a-cfc2-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=79&id=udef217c3&margin=%5Bobject%20Object%5D&name=image.png&originHeight=79&originWidth=602&originalType=binary∶=1&rotation=0&showTitle=false&size=15291&status=done&style=none&taskId=ub9848414-48d5-44de-95fc-c2b6ebcb27c&title=&width=602)

虽然路由器会防止 PIN 攻击，但这种跑出来基本只是时间问题（嗯，除非撞大运，否则没个几天跑不出来）
