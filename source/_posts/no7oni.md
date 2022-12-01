---
title: Nginx反向代理https忽略证书错误
date: 2022-10-01T22:32:24.000Z
updated: 2022-10-01T22:36:05.000Z
tags: ['nginx']
---
  
因为有需求吧 esxi 暴露到公网上，内网穿透之后，然后反向代理到对应的域名上。这个时候一直 502 错误。因为 esxi 那边暴露的是 443 端口，而证书刚好无效。

```nginx
server {
  server_name esxi.${DOMAIN_NAME};
    listen 80;


  location ^~ / {
    proxy_pass  https://host.docker.internal:7002;
    proxy_set_header Host $proxy_host;
    proxy_set_header  X-Real-IP  $remote_addr;
    proxy_set_header  X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-NginX-Proxy true;


    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
  }


  location ~ \.php$ {
    deny all;
  }
}
```

关键部分

```nginx
proxy_http_version 1.1;
proxy_set_header Upgrade $http_upgrade;
proxy_set_header Connection "upgrade";
```