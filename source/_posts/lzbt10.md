---
title: 备份服务器文件至百度网盘
urlname: lzbt10
date: '2022-08-06 23:00:32 +0800'
tags: []
categories: []
---

> 建站、百度网盘

## 安装[bypy](https://github.com/houtianze/bypy)

```python
pip3 install bypy
```

## 授权登陆

执行

```bash
bypy info
```

访问出现的链接
![image.png](https://cdn.nlark.com/yuque/0/2022/png/328252/1659798437553-e7026bff-5b6a-42cc-aaa6-0d330e3ac93a.png#clientId=u45a0ef65-928d-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=117&id=u068b7ba9&margin=%5Bobject%20Object%5D&name=image.png&originHeight=234&originWidth=1796&originalType=binary∶=1&rotation=0&showTitle=false&size=59371&status=done&style=none&taskId=u773cbe71-0fa6-4429-9270-52266458f36&title=&width=898)
登陆之后，获取到授权码，输入授权码之后授权成功
![image.png](https://cdn.nlark.com/yuque/0/2022/png/328252/1659798567038-879d44ef-f8ec-4100-b9a0-6bcaeec5249b.png#clientId=u45a0ef65-928d-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=81&id=u1e5eb52b&margin=%5Bobject%20Object%5D&name=image.png&originHeight=162&originWidth=908&originalType=binary∶=1&rotation=0&showTitle=false&size=32219&status=done&style=none&taskId=ubaa6c58f-535c-43a8-8e00-93963773ab0&title=&width=454)

## 创建备份脚本

### 创建目录

```bash
mkdir -p /backup/
```

创建**backup_to_baidu.sh **内容如下

```bash
backtar=`date '+%Y%m%d%H%M%S'` #名称为当前时间年月日时分秒
zip -r /backup/${backtar}.zip  /root/app/  #上传某个路径下的文件，以空格隔开，可以添加多个
/usr/local/bin/bypy upload /backup/${backtar}.zip #上传的压缩文件
find /backup -mtime +7 |grep .zip | xargs rm -f  #删除7天前生成的压缩包
```

执行脚本测试备份是否成功

```bash
sh backup_to_baidu.sh
```

## 添加定时任务

```bash
crontab -e
```

设置每天凌晨 2 点备份一次

```bash
0 2 * * * sh /backup/backup_to_baidu.sh
```

重启 crond 服务

```bash
systemctl restart crond
```

如果是 ubuntu

```bash
systemctl restart cron
```
