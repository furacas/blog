---
title: 使用位掩码优雅表示多重状态
date: 2023-11-01T06:32:49.000Z
updated: 2023-11-01T06:54:42.000Z
tags: ['java','问题随记']
---
  
## 背景

在编程和数据库设计中，经常会遇到需要存储多个状态或选项的情况。传统的做法可能需要用多个字段或者表来表示这些状态，这样不仅增加了数据的复杂性，还可能影响性能。本文将介绍如何使用位掩码来优雅、高效地解决这一问题。

## 位掩码

位掩码是一种编程技巧，说白了就是位操作。用单个整数的不同位来表示多个布尔值或状态。通过位运算（与、或、非等），可以高效地设置、清除、翻转和检查状态。

### 基本操作

- 设置位（Set）: `mask |= (1 << i)`
- 清除位（Clear）: `mask &= ~(1 << i)`
- 翻转位（Toggle）: `mask ^= (1 << i)`
- 检查位（Check）: `if (mask & (1 << i)) {...}`

### 封装

虽然位操作很方便，但是可读性并不是很好。所以需要进行封装一下，以增强其可读性。以 Java 枚举为例，我们可以把抽象的位操作封装起来

```java
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Getter
@AllArgsConstructor
public enum Role {
    ADMIN(1 << 0, "ADMIN"),
    EDITOR(1 << 1, "EDITOR"),
    VIEWER(1 << 2, "VIEWER");

    private final int bitmask;
    private final String description;

    public static List<Role> getRolesByBitmask(int bitmask) {
        List<Role> result = new ArrayList<>();
        for (Role role : Role.values()) {
            if ((role.getBitmask() & bitmask) > 0) {
                result.add(role);
            }
        }
        return result;
    }

    public static int getBitmaskByRoles(Collection<Role> roles) {
        int bitmask = 0;
        for (Role role : roles) {
            bitmask |= role.getBitmask();
        }
        return bitmask;
    }
}

```

### 数据库操作

找到具有多个特定角色（例如 ADMIN 和 EDITOR）的所有用户，可以这样写 SQL：

```sql
SELECT * FROM users WHERE (roles & ?) = ?
```

其中? 部分就是`getRolesByBitmask`计算出来的位
查找任一角色

```sql
SELECT * FROM users WHERE (roles & ?) != 0
```