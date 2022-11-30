---
title: JS修改依赖代码逻辑
date: 2022-07-15T11:29:27.000Z
tags: ['js']
---
  
在开发的过程中，有一些依赖中有一些 bug 或者某一点点的逻辑不是我们想要的，这个时候我们需要去修改他的逻辑。在某些语言中这样的操作很麻烦的，需要把他的代码找到，然后修改重新打包，把依赖换成重新打包后的包。
而在 js 中是很容易的。可以把修改逻辑放到`postinstall`中，这样即使是团队开发，大家也都可以共享这段逻辑。而[patch-package](https://github.com/ds300/patch-package)就是一个类似这样的工具，他可以更好，更规范话的帮助我们修改依赖中的逻辑

## 实战

我的博客是使用`butterfly`作为博客主题`gitalk`作为评论工具。在`butterfly`主题中，他的内嵌的`gitalk`集成逻辑是使用 url 的 path 作为`gitalk`的 id，而最近我正在优化博客的 SEO，所以文章的 url path 可能会改变，这样文章变了，评论就都没了，这并不是我想要的。我想修改这段逻辑让他变成使用 path 的最后一段作为 id，而我保证无论 url 怎么变，最后一段 path 不变。

安装`patch-package`

```bash
npm i patch-package --save-dev
```

添加`postinstall`脚本，以便后面我换电脑或者我的 CI 机器人可以自动执行我的修改逻辑

```json
{
  "scripts": {
    "postinstall": "patch-package"
  }
}
```

直接进入`node_modeles`中修改逻辑
原来的代码如下

```javascript
function initGitalk () {
  var gitalk = new Gitalk(Object.assign({
    clientID: '!{theme.gitalk.client_id}',
    clientSecret: '!{theme.gitalk.client_secret}',
    repo: '!{theme.gitalk.repo}',
    owner: '!{theme.gitalk.owner}',
    admin: ['!{theme.gitalk.admin}'],
    id: '!{md5(page.path)}',
    updateCountCallback: commentCount
  },!{JSON.stringify(theme.gitalk.option)}))

  gitalk.render('gitalk-container')
}
```

修改后的代码如下

```javascript
function initGitalk () {
  var gitalk = new Gitalk(Object.assign({
    clientID: '!{theme.gitalk.client_id}',
    clientSecret: '!{theme.gitalk.client_secret}',
    repo: '!{theme.gitalk.repo}',
    owner: '!{theme.gitalk.owner}',
    admin: ['!{theme.gitalk.admin}'],
    id: '!{md5(page.path.split("/").slice(-2)[0])}',
    updateCountCallback: commentCount
  },!{JSON.stringify(theme.gitalk.option)}))

  gitalk.render('gitalk-container')
}
```

执行`npx patch-package hexo-theme-butterfly`
可以看到他生成了一个`hexo-theme-butterfly+4.3.1.patch`的文件，里面记录了上述修改。

这样就完成了修改。