---
title: Java字符串replaceAll忽略全半角和大小写
date: 2022-11-25T05:07:31.000Z
tags: ['Java']
---
  
忽略大小写很简，使用正则就可以实现

```java
String s = "Hello word".replaceAll("(?i)hello","你好");
```

忽略全角半角就需要自己实现了，实现思路是把原字符串、要匹配的字符串全部转换成半角（全角），然后对转换后的字符串做 indexOf，得到 index 之后替换原字符串。

```java
public static String replaceAllIgnoreHalfFull(String source, String toReplace, String replacement) {
    StringBuilder sbSource = new StringBuilder(source);
    StringBuilder sbSourceHalf = new StringBuilder(StringUtils.fullToHalf(source));
    String searchString = StringUtils.fullToHalf(toReplace);
    int idx = 0;
    while((idx = sbSourceHalf.indexOf(searchString, idx)) != -1) {
        sbSource.replace(idx, idx + searchString.length(), replacement);
        idx += replacement.length();
    }
    return sbSource.toString();
}
```