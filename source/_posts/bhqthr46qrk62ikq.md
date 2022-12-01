---
title: 常用python3刷题语法
date: 2022-11-29T13:21:23.000Z
updated: 2022-11-30T13:33:31.000Z
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

## 数组

### 切片

```python
# 复制数组
b = a[:]

# 取前四个数
b = a[:4]
b = a[0:4]
b = a[0:4:1]

# 取前四个没隔两个一取
b = a[:4:2]
```

### 数组比较

直接比就可以了

```python
list1 == list2
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

### 切片

同数组

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

### 乘方

```python
a = pow(3,4)
a = 3 ** 4
```

## 其他

### zip

将可迭代的对象打包成元组

```python
a = [1, 2, 3]
b = [2, 3, 4]
c = [4, 5, 6]
d = list(zip(a, b, c))
```

输出

```
[(1, 2, 4), (2, 3, 5), (3, 4, 6)]
```

### reduce

函数将一个数据集合（链表，元组等）中的所有数据进行下列操作：用传给 reduce 中的函数 function（有两个参数）先对集合中的第 1、2 个元素进行操作，得到的结果再与第三个数据用 function 函数运算，最后得到一个结果。

```python
s = reduce(lambda x, y: x+y, [1,2,3,4,5])

# 当然在python中 list相加不需要自己写
s = sum([1,2,3,4,5])
```