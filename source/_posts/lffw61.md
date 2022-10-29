---
title: Kali 暴力破解wifi密码
date: 2022-07-27T11:59:59.000Z
tags: ['安全']
---
  
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
![](images/FoE-xwUVZNmn4AwJBKRR6RQtbMVU.png)
这样就开始自动扫描 wifi 信号了
![](images/Fo1KoFOxNP5sD6fI5vtfHiX65rks.png)
当扫描到你想要的 wifi 的时候按一下 `Ctrl + C`按一下就好了，可能反应有些慢
然后选择你要破解 wifi 的编号，或者输入 all 代表全部。

这里 wifi 可能有几种情况
![](images/FodYYGWNoCcVp8prGP0XGQmSKa_R.png)
可以看到有些的 WPS 是 yes，有些是 no。不同的脚本处理的方式是不同的。但基本都可以自动化。

### 选择 WPS 是 no 的

选择了之后，脚本会进行自动化操作，脚本会尝试破解，当然一般情况下是破解不出来的。因为内置的字典表太弱了
![](images/Fjc52OKjcWehx34y0qEP9gvCT0em.png)
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
![](images/FtQpNbVp058H209-qCDU5KZ_6tYh.png)
这里可以看出来能否破解的主要因素就是密码表是强大了。

这里我准备了 3.95G 的常用 wifi 密码字典。可以关注公众号**全栈编程笔记**回复**破解字典**进行下载
![](images/FskPRkjvIOcojJQxuuM7LAP0DJlG.png)

### 选择 WPS 是 yes 的

这种脚本会尝试破解 PIN

## ![](images/FsDyL78Jz4BrN_JlCfPHCTq76Ijv.png)

虽然路由器会防止 PIN 攻击，但这种跑出来基本只是时间问题（嗯，除非撞大运，否则没个几天跑不出来）