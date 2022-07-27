---
title: Kali 暴力破解wifi密码
date: 2022-07-27T11:59:59.000Z
tags: ['安全']
---
  
网上一大堆教程都是用`aircrack-ng`抓包，操作过程比较繁琐，明明 kali 都内置了自动化的`wifite`了。

## wifi 密码破解

为了方便后面操作先切换到 root

```bash
su root
```

开启`wifite`监听

```
sudo wifite
```

选择一个支持监听的网卡，如果不支持的话，淘宝 20 快可以搞到
![](images/FqdVByF2uv5JKk7nuZZHo0FRV-jG.png)
这样就开始自动扫描 wifi 信号了
![](images/FsQTsHFFVJ4jQW6qnXUxmcexHxbR.png)
当扫描到你想要的 wifi 的时候按一下 `Ctrl + C`按一下就好了，可能反应有些慢
然后选择你要破解 wifi 的编号，或者输入 all 代表全部。

这里 wifi 可能有几种情况
![](images/FhrK3Kd9lE0sY0QVRAiyydy28r9D.png)
可以看到有些的 WPS 是 yes，有些是 no。不同的脚本处理的方式是不同的。但基本都可以自动化。

### 选择 WPS 是 no 的

选择了之后，脚本会进行自动化操作，脚本会尝试破解，当然一般情况下是破解不出来的。因为内置的字典表太弱了
![](images/FpiKwRWb0WPuN1ad1KE_kDlpmbUE.png)
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
![](images/FpIiuslJJL0fKDap3a22Xstb3Zp9.png)
这里可以看出来能否破解的主要因素就是密码表是强大了。

### 选择 WPS 是 yes 的

## ![](images/FurkEHeFD8YPNa2MMjHLBn0e4AHn.png)

脚本也会进行自动跑。这种跑出来只是时间的问题。