---
title: 基于code-server搭建自己的开发环境
urlname: hbobkc
date: '2022-08-18 11:18:11 +0800'
tags: []
categories: []
---

> code-server、瞎折腾、Github Action

## 背景

平时用的设备不同，win、mac、linux 都用，想统一一下开发环境。而刚好看到 coder-server 这个开源的 WebIDE，这样把 code-server 部署到服务器上，每个环境只要又个浏览器就可以共享部署在服务器上的环境。

## 定制过程

定制一个带有 code-server 的镜像，既包含 code-server 又包含自己想要的工具。
下面列出主要过程，完整版可以直接看[这个文件](https://github.com/beimengyeyu/my-code-server/blob/main/Dockerfile)

```dockerfile
FROM codercom/code-server:latest
```

### 配置 git

```dockerfile
# git config
RUN git config --global --add pull.rebase false \
    && git config --global --add user.name beimengyeyu \
    && git config --global --add user.email me@beimengyeyu.com \
    && git config --global core.editor vim \
    && git config --global init.defaultBranch master
```

### 安装 node 环境

```dockerfile
# node env
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh >> /home/coder/install_nvm.sh \
    && . /home/coder/install_nvm.sh \
    && rm -rf /home/coder/install_nvm.sh

ENV NODE_VERSION 14.18.0

RUN source ~/.nvm/nvm.sh \
    && nvm install $NODE_VERSION \
    $$ nvm alias default $NODE_VERSION \
    && nvm use default
```

### 安装 oh-my-zsh

```dockerfile
# zsh
RUN curl -o- https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh >> ~/oh_my_zsh.sh \
  && echo 'y' | . ~/oh_my_zsh.sh \
  && rm -rf  ~/oh_my_zsh.sh \
  && git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions \
  && git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting \
  && sed -i "s/plugins=(git.*)$/plugins=(git zsh-syntax-highlighting zsh-autosuggestions)/" ~/.zshrc
```

### 安装插件

```dockerfile
# vscode plugin
RUN HOME=/home/coder code-server \
	--user-data-dir=/home/coder/.local/share/code-server \
	--install-extension equinusocio.vsc-material-theme \
  --install-extension k--kato.intellij-idea-keybindings \
  --install-extension eamodio.gitlens \
  --install-extension tabnine.tabnine-vscode
```

## Github Action 构建

```yaml
name: Publish Docker image

on: # 配置触发workflow的事件
  push:
    branches: # master分支有push时触发此workflow
      - "main"
jobs:
  push_to_registry:
    name: Push Docker image to Docker Hub
    runs-on: ubuntu-latest
    steps:
      - name: Check out the repo
        uses: actions/checkout@v2
      - name: Log in to Docker Hub
        uses: docker/login-action@v1
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}
      - name: Build and push Docker image
        uses: docker/build-push-action@v2 # docker build & push
        with:
          context: .
          push: true
          tags: beimengyeyu/code-server:latest
```

## 账号配置

在实际的使用过程中，还需要有一些账号信息，但是这些信息不方便打在公开镜像里，所以在实际的使用过程中我再上述镜像的基础上又包了一层。
