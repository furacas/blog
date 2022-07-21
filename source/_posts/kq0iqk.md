---
title: 逆向汇编基础
date: 2022-07-18T13:57:00.000Z
tags: ['汇编','逆向']
---
  
## mov

mov 是赋值语句
例：

- `mov 地址,0x123456` 把 0x123456 赋给地址位置
- `mov 地址1,地址2`把地址 2 位置的值赋给地址 1 位置

## call

call 是调用函数
如果有参数需要用 push 传递参数

```
push 0x01
call xxx
```

## inc

inc 就是+1

## jmp

jmp 是无条件跳转。可以跟地址也可以跟函数

```
jmp 地址
jmp 函数
```

## 子程序（函数）

子程序的汇编一定以以下代码开头

```
push ebp
mov ebp,esp
```

一定以以下代码结尾

```
mov esp,ebp
pop ebp
```

# 本文未完，挖坑待更新