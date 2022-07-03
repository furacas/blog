---
title: Github Action 不同Job共享数据
date: 2022-06-21T02:10:40.000Z
tags: ['工具','GithubAction']
---
  
## 背景

一个.net framwork 项目需要 windows 环境进行构建，构建完之后依赖一些其他的 action 进行一些后续的操作，但这些 action 其中一些不支持 windows 环境。

## 实现

使用`actions/upload-artifact@v2`上传需要共享的数据。使用`actions/download-artifact@v2`下载需要共享的数据

```yaml
name: .NET

on:
  workflow_dispatch:
  push:
    branches:
      - master

jobs:
  build_job:
    runs-on: windows-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup MSBuild
        uses: microsoft/setup-msbuild@v1
      - name: Setup NuGet
        uses: NuGet/setup-nuget@v1
      - name: Restore Packages
        run: nuget restore HearthstoneHelper.sln
      - name: Build Solution
        run: |
          msbuild.exe HearthstoneHelper.sln /nr:false /p:platform="Any CPU" /p:configuration="Release"
      - name: release
        run: |
          cp Mercenary/bin/Release/*.dll BepInEx/BepInEx/plugins
      - uses: actions/upload-artifact@v2
        with:
          name: BepInEx
          path: BepInEx/
  upload_job:
    needs: build_job #job 依赖
    runs-on: ubuntu-latest
    steps:
      - uses: actions/download-artifact@v2
        with:
          name: BepInEx
      # Github空间有限 用完以后删掉
      - uses: geekyeggo/delete-artifact@v1
        with:
          name: BepInEx
```