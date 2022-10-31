---
title: 情侣风格的Hexo主题Brave
urlname: erp76h
date: '2022-08-03 19:43:39 +0800'
tags: []
categories: []
---

> hexo

## 主题介绍

该主题最初版是 typeecho 主题[Brave](https://github.com/zwying0814/Brave)移植过来的，感谢原作者 🙏。

## ![截屏2022-08-04 09.44.26.png](https://cdn.nlark.com/yuque/0/2022/png/328252/1659618511529-ff225dca-b16f-4c0d-9aff-d6084dcb826a.png#clientId=ua97d6660-1b09-4&crop=0&crop=0&crop=1&crop=1&from=drop&id=u124a3200&margin=%5Bobject%20Object%5D&name=%E6%88%AA%E5%B1%8F2022-08-04%2009.44.26.png&originHeight=1654&originWidth=3326&originalType=binary∶=1&rotation=0&showTitle=false&size=4295364&status=done&style=none&taskId=u1b89f1e4-5c9c-4f68-b42a-36df4cf27c4&title=)

## ![截屏2022-08-04 09.51.40.png](https://cdn.nlark.com/yuque/0/2022/png/328252/1659618537058-0262f678-fb14-4237-8631-9a81b044cf2e.png#clientId=ua97d6660-1b09-4&crop=0&crop=0&crop=1&crop=1&from=drop&id=u1ca93eff&margin=%5Bobject%20Object%5D&name=%E6%88%AA%E5%B1%8F2022-08-04%2009.51.40.png&originHeight=1508&originWidth=3312&originalType=binary∶=1&rotation=0&showTitle=false&size=1125022&status=done&style=none&taskId=uf1e51a25-1565-45a3-80fd-27079e3728e&title=)

## ![截屏2022-08-04 09.55.24.png](https://cdn.nlark.com/yuque/0/2022/png/328252/1659618544667-2dca909a-dd73-40ac-a63d-baa1c208cb3f.png#clientId=ua97d6660-1b09-4&crop=0&crop=0&crop=1&crop=1&from=drop&id=u45b953df&margin=%5Bobject%20Object%5D&name=%E6%88%AA%E5%B1%8F2022-08-04%2009.55.24.png&originHeight=1628&originWidth=3344&originalType=binary∶=1&rotation=0&showTitle=false&size=1199016&status=done&style=none&taskId=ue0922805-c372-4238-a867-55fac969cf4&title=)

## ![截屏2022-08-04 10.02.47.png](https://cdn.nlark.com/yuque/0/2022/png/328252/1659618549623-30772653-45c2-4396-84d6-e9b50ccd1c1e.png#clientId=ua97d6660-1b09-4&crop=0&crop=0&crop=1&crop=1&from=drop&id=u6ec5252b&margin=%5Bobject%20Object%5D&name=%E6%88%AA%E5%B1%8F2022-08-04%2010.02.47.png&originHeight=1618&originWidth=3196&originalType=binary∶=1&rotation=0&showTitle=false&size=343119&status=done&style=none&taskId=u257e85d3-68ec-4bf1-9f7a-0c81a6cb8b8&title=)

演示地址 [https://l.beimengyeyu.com/](https://l.beimengyeyu.com/)

## 主题安装

### 安装主题

```bash
npm i hexo-theme-brave
```

### 选择主题

修改`_config.yml`

```
theme: brave
```

### 安装祝福（评论）系统

目前支持 Waline 集成，安装参考https://waline.js.org/guide/get-started.html

### 修改配置文件

新建`_config.brave.yml`文件
复制默认的[配置文件](https://github.com/beimengyeyu/hexo-theme-brave/blob/master/_config.yml)的内容到到刚才新建的文件中
修改这些配置为您的配置

| 配置项          | 说明                   | 默认值                       |
| --------------- | ---------------------- | ---------------------------- |
| lovebegin       | 恋爱开始时间           | 2017-07-27   ｜              |
| banner          | 页面大图的图片地址     | /img/banner.jpg              |
| leftname        | 左侧情侣头像的名称     | boyname                      |
| leftavatar      | 左侧情侣头像的图片地址 | /img/boyavatar.jpg           |
| rightname       | 右侧情侣头像的名称     | grilname                     |
| rightavatar     | 右侧情侣头像的图片地址 | /img/girlavatar.jpg          |
| slogan          | slogan                 | 💕 愿你三冬暖，愿你天不寒 🍂 |
| sitename        | 站点名称               | 💖 那年初夏 💖               |
| waline          | walin 服务端地址       |                              |
| lovelist.desc   | lovelist 的描述        |                              |
| lovelist.status | lovelist 的完成状态    | 0                            |
| lovelist.img    | lovelist 的图片地址    |                              |

配置项的图片地址均支持 url 和相对位置两种配置方式
