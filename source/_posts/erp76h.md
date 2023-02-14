---
title: 情侣风格的Hexo主题Brave
date: 2022-08-03T11:43:39.000Z
updated: 2023-02-10T15:34:45.000Z
tags: ['hexo']
---
  
## 主题介绍

该主题最初版是 typeecho 主题[Brave](https://github.com/zwying0814/Brave)移植过来的，感谢原作者 🙏。

## ![](images/1659618511529-ff225dca-b16f-4c0d-9aff-d6084dcb826a.png)

## ![](images/1659618537058-0262f678-fb14-4237-8631-9a81b044cf2e.png)

## ![](images/1659618544667-2dca909a-dd73-40ac-a63d-baa1c208cb3f.png)

## ![](images/1659618549623-30772653-45c2-4396-84d6-e9b50ccd1c1e.png)

演示地址 [https://hexo-brave.furacas.com/](https://hexo-brave.furacas.com/)

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
复制默认的[配置文件](https://github.com/furacas/hexo-theme-brave/blob/master/_config.yml)的内容到到刚才新建的文件中
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