---
title: 常用python3刷题语法
date: 2022-11-29T13:21:23.000Z
tags: ['算法','python']
---
  
因为主编程语言不是 python，很多语法容易忘，特意记录一下。

## 循环

### 普通循环

range 是左闭右开区间

```python
for i in range(0, 10):
    print(i)
```

### 逆序

```python
for i in range(10, 0, -1):
    print(i)
```

循环变量在循环体外面依然可以用

```python
for i in range(0, 10):
    pass
# 这里输出的是9，并不等价于类c语言里面的 for(i = 0;i < 10; i++)
print(i)
```

## 字符串

### 按照字典序排序

```python
a = "dcba"
b = "".join(sorted(a))
```

### 转换成 asc 码

```python
a = ord('a')
```

##

## collections

### Counter

可以用来统计字符出现的个数

```python
a = ["A", "B", "A", "C", "A"]
b = collections.Counter(a)
```

返回的是个字典

```
{'A': 3, 'B': 1, 'C': 1}
```

### defaultdict

相比于 dict 可以在 key 不存在的时候返回一个默认值，而不是报错

```python
a = collections.defaultdict(list)
a = collections.defaultdict(int)
a = collections.defaultdict(set)
a = collections.defaultdict(set)

a = collections.defaultdict(lambda: 10)
```

## 数学相关

### 开方

会返回一个浮点数

```python
import math
a = math.sqrt(16)
```

##