---
title: OD逆向系列3-多种方式破解实战
urlname: he8bzs
date: '2022-07-14 10:52:59 +0800'
tags: []
categories: []
---

> 逆向、OD、汇编
> OD 逆向系列

本文使用的例子可以关注公众号**全栈编程笔记**回复**OD 逆向工具包**进行下载
特别声明：例子和工具来源于网络，不保证安全性，在操作之前建议使用冰点还原或者你认为安全的工具保护系统。

## 本文介绍

本文使用**密码登录.exe**这个例子来介绍多种方式破解。这里例子的大致工作原理是在一个输入框中输入一个密码，如果错误会提示登录失败
![image.png](https://cdn.nlark.com/yuque/0/2022/png/328252/1657784663589-ccace046-f153-4455-a32f-a9def1584f01.png#clientId=u5eb72eb7-5cfa-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=142&id=u4c3ea0b8&margin=%5Bobject%20Object%5D&name=image.png&originHeight=142&originWidth=134&originalType=binary∶=1&rotation=0&showTitle=false&size=1999&status=done&style=none&taskId=u6a439766-3a91-423f-973e-00e9d73904d&title=&width=134)
如果输入正确的密码就会弹出一个新的窗口
![image.png](https://cdn.nlark.com/yuque/0/2022/png/328252/1657962284787-05aa30f8-2b8d-4e48-ab73-37c63de9ad25.png#clientId=u194d0329-88e0-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=239&id=ufae993b8&margin=%5Bobject%20Object%5D&name=image.png&originHeight=239&originWidth=374&originalType=binary∶=1&rotation=0&showTitle=false&size=1584&status=done&style=none&taskId=u282e4174-f7de-498d-8125-99f60d7513a&title=&width=374)

破解目标，让他弹出来登录成功的窗口

## 破解方法

### 字符串破解法

#### 1. 找到文件头

使用 OD 打开例子，按下`Ctrl + G`进行搜索`00401000`（exe 程序的文件头）
![image.png](https://cdn.nlark.com/yuque/0/2022/png/328252/1657784738962-125d1b34-c3a7-43b7-8714-9bdb36968586.png#clientId=u5eb72eb7-5cfa-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=139&id=uabef98d9&margin=%5Bobject%20Object%5D&name=image.png&originHeight=139&originWidth=677&originalType=binary∶=1&rotation=0&showTitle=false&size=9122&status=done&style=none&taskId=uce1499c4-74e7-40ff-ada8-a850c3c02d4&title=&width=677)

#### 2. 智能搜索

可以搜索关键字，找到"登陆失败"这几个关键字
右击，找到中文搜索引擎中的只能搜索。
![image.png](https://cdn.nlark.com/yuque/0/2022/png/328252/1657784833085-3648b74e-286c-4d7b-a7a4-3e339f22dd08.png#clientId=u5eb72eb7-5cfa-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=638&id=u52669120&margin=%5Bobject%20Object%5D&name=image.png&originHeight=638&originWidth=517&originalType=binary∶=1&rotation=0&showTitle=false&size=41047&status=done&style=none&taskId=uc7c2ad28-c56f-4a9d-b0f6-0bad0b13d24&title=&width=517)
`Ctrl + F `搜索 "登陆失败" 找到位置

可以很容易分析发现，是由于这个跳转导致的弹出登录失败的窗口![批注 2022-07-14 155350.png](https://cdn.nlark.com/yuque/0/2022/png/328252/1657785252233-ac6b24cf-f733-4078-a0c6-adad52c82c66.png#clientId=u5eb72eb7-5cfa-4&crop=0&crop=0&crop=1&crop=1&from=drop&id=u96c96e50&margin=%5Bobject%20Object%5D&name=%E6%89%B9%E6%B3%A8%202022-07-14%20155350.png&originHeight=393&originWidth=1062&originalType=binary∶=1&rotation=0&showTitle=false&size=22144&status=done&style=none&taskId=u9df1d7de-7b71-4418-b55c-d41f8cfd4af&title=)
那我们这里就可以简单的把这个跳转语句抹掉。点击这个语句，右击二进制，使用 nop 填充
![image.png](https://cdn.nlark.com/yuque/0/2022/png/328252/1657786078368-1ae9bf7b-34bb-4661-8d3e-e560d93ddf98.png#clientId=u84620879-29a4-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=204&id=u0dd84a14&margin=%5Bobject%20Object%5D&name=image.png&originHeight=204&originWidth=684&originalType=binary∶=1&rotation=0&showTitle=false&size=15558&status=done&style=none&taskId=uc478d34c-d5d5-4454-a0ba-6f931987ace&title=&width=684)
再次点击登录按钮可以看到登录成功的窗口弹出来了。
![image.png](https://cdn.nlark.com/yuque/0/2022/png/328252/1657962284787-05aa30f8-2b8d-4e48-ab73-37c63de9ad25.png#clientId=u194d0329-88e0-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=239&id=dHIjJ&margin=%5Bobject%20Object%5D&name=image.png&originHeight=239&originWidth=374&originalType=binary∶=1&rotation=0&showTitle=false&size=1584&status=done&style=none&taskId=u282e4174-f7de-498d-8125-99f60d7513a&title=&width=374)

### 弹窗断点法

因为报错信息是一个错误弹窗，我们可以下一个弹窗断点来找到报出错误的地方。

#### 1. 设置消息框断点

![image.png](https://cdn.nlark.com/yuque/0/2022/png/328252/1657966798455-720aece6-c661-4d77-8ff7-3e219fbb7301.png#clientId=ucd84936e-0c49-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=356&id=u8586a1f2&margin=%5Bobject%20Object%5D&name=image.png&originHeight=356&originWidth=524&originalType=binary∶=1&rotation=0&showTitle=false&size=29583&status=done&style=none&taskId=u053ad1f2-69db-4b9d-b76a-27195ae305c&title=&width=524)

#### 2. 运行程序，使其弹出消息框

#### 3. 寻找调用过程

点击![image.png](https://cdn.nlark.com/yuque/0/2022/png/328252/1657966895797-12e802e5-aa8d-4ceb-9799-0d7a4a4b5267.png#clientId=ucd84936e-0c49-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=26&id=ubb16c949&margin=%5Bobject%20Object%5D&name=image.png&originHeight=26&originWidth=18&originalType=binary∶=1&rotation=0&showTitle=false&size=389&status=done&style=none&taskId=u5c3cb700-e1a1-41cc-a6c7-cb7cad9f2e5&title=&width=18)
然后点击![image.png](https://cdn.nlark.com/yuque/0/2022/png/328252/1657966918168-24a994ac-d87c-470f-857c-038ffbaa558d.png#clientId=ucd84936e-0c49-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=18&id=ue3c2fb1f&margin=%5Bobject%20Object%5D&name=image.png&originHeight=18&originWidth=23&originalType=binary∶=1&rotation=0&showTitle=false&size=349&status=done&style=none&taskId=u261487e9-6609-4903-9288-17121a398d6&title=&width=23)
点击 k 查看调用栈
![image.png](https://cdn.nlark.com/yuque/0/2022/png/328252/1657967007981-80cc2b5d-2c3b-4650-8203-2095977d8bce.png#clientId=ucd84936e-0c49-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=220&id=u273a6df9&margin=%5Bobject%20Object%5D&name=image.png&originHeight=220&originWidth=576&originalType=binary∶=1&rotation=0&showTitle=false&size=20023&status=done&style=none&taskId=ua945bfde-2adc-4391-8f96-97a575bdb25&title=&width=576)
右击第二个显示调用
也可以找到这个位置
![image.png](https://cdn.nlark.com/yuque/0/2022/png/328252/1657967079160-2f6b5305-cc01-49c1-9d0e-321b7e7dbd00.png#clientId=ucd84936e-0c49-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=179&id=u77d68ff0&margin=%5Bobject%20Object%5D&name=image.png&originHeight=179&originWidth=1000&originalType=binary∶=1&rotation=0&showTitle=false&size=9319&status=done&style=none&taskId=u3f5a108e-5bee-4b6c-a1b8-664645740af&title=&width=1000)

### Push 大法

push 大法就是让他跳过登录窗口直接到达目标窗口

#### 1. 跳转到文件头

#### 2. 找到窗口

`Ctrl + F`搜索 `push 10001`。`push 10001`隔一条指令就是一个窗口，当然有些软件不止一个窗口，可以使用`Ctrl + L`搜索下一个，把这些窗口复制下来。
![image.png](https://cdn.nlark.com/yuque/0/2022/png/328252/1657963362374-78a9abae-62bc-497f-8e3f-7eeed23d8de2.png#clientId=u00dfcf52-662a-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=133&id=u46badd61&margin=%5Bobject%20Object%5D&name=image.png&originHeight=133&originWidth=1020&originalType=binary∶=1&rotation=0&showTitle=false&size=5721&status=done&style=none&taskId=u62a3a277-2bf7-4e38-b7d9-3e09e245bb4&title=&width=1020)

#### 3. 进行替换

输入`Ctrl + B`搜索`ff25`
![image.png](https://cdn.nlark.com/yuque/0/2022/png/328252/1657963691472-d4da11de-7408-4ea7-a98e-e5d4a248cd82.png#clientId=u00dfcf52-662a-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=224&id=u45bc006d&margin=%5Bobject%20Object%5D&name=image.png&originHeight=224&originWidth=1042&originalType=binary∶=1&rotation=0&showTitle=false&size=15482&status=done&style=none&taskId=u0ebc364f-53b9-4ad2-a0c7-8023065655a&title=&width=1042)
可以看到在搜索结果的上面他 push 进去了一个窗口，现在我们把他修改成我们刚才找到的窗口。
右键汇编 将`push 0x52010001`修改为 `push 0x5201000E`这个时候打开软件就直接跳出来登录成功了。
有多个窗口的情况下需要挨个尝试，直到找到想要的窗口。

### 直接跳转

有时候已经找到了关键的代码的时候可以直接使用 jmp 跳转。
比如我们已经找到了这段逻辑，判断 xxx，如果成立则验证成功。那我们可以直接跳转到判断的逻辑下面去，让他直接执行判断之后的逻辑。
这种和 push 大法比较相似，不同的是 push 大法修改的是窗口地址，这里直接把整条 push 都修改了，这里就不赘述了。

## 如何保存

使用 OD 修改之后可以立刻生效，但是下次打开程序就会失效了,这个时候我们需要把修改保存下来。
右键 保存到可执行文件，所有修改
![image.png](https://cdn.nlark.com/yuque/0/2022/png/328252/1657786821899-bcfe9d32-e537-412b-8935-18402324730f.png#clientId=u84620879-29a4-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=678&id=u5a4663a7&margin=%5Bobject%20Object%5D&name=image.png&originHeight=678&originWidth=618&originalType=binary∶=1&rotation=0&showTitle=false&size=39731&status=done&style=none&taskId=u97bac720-4578-426e-82da-8dac41dfa9e&title=&width=618)
这个时候会出来这样一个框，右键保存到文件即可
![image.png](https://cdn.nlark.com/yuque/0/2022/png/328252/1657786759855-f70917c1-8866-40a4-ad11-532d0d8b6401.png#clientId=u84620879-29a4-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=440&id=u2d133a62&margin=%5Bobject%20Object%5D&name=image.png&originHeight=440&originWidth=727&originalType=binary∶=1&rotation=0&showTitle=false&size=27659&status=done&style=none&taskId=udd378a3e-2159-4ef3-aa35-74bc87fe69c&title=&width=727)
