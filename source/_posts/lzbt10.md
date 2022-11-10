---
title: 备份服务器文件至百度网盘
date: 2022-08-06T15:00:32.000Z
tags: ['建站','百度网盘']
---
  
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
![](images/FrLv1aH9ED5z3FjIONtFO7A6rq5T.png)
登陆之后，获取到授权码，输入授权码之后授权成功
![](images/FsaePFUWQScOaZycVWY5TF0yM_sJ.png)

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