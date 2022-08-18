---
title: 基于code-server搭建自己的开发环境
date: 2022-08-18T03:18:11.000Z
tags: ['code-server','瞎折腾','Github Action']
---
  
## 背景

平时用的设备不同，win、mac、linux 都用，想统一一下开发环境。而刚好看到 coder-server 这个开源的 WebIDE，这样把 code-server 部署到服务器上，每个环境只要又个浏览器就可以共享部署在服务器上的环境。

## 定制过程

定制一个带有 code-server 的镜像，既包含 code-server 又包含自己想要的工具。
下面列出主要过程，完整版可以直接看这个文件

```dockerfile
FROM codercom/code-server:latest
```

### 配置 ssh

这里我使用宿主机的 ssh 配置，为了安全起见，使用**secrets**的方式进行配置

```dockerfile
RUN ln -s /run/secrets/host_ssh_key ~/.ssh/id_rsa
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

## 使用

使用**docker-compose**编排部署