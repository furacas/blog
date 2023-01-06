---
title: Java字符串split、replaceAll忽略全半角和大小写
date: 2022-11-25T05:07:31.000Z
updated: 2022-12-12T02:14:13.000Z
tags: ['Java']
---
  
## replaceAll

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
            idx += searchString.length();
        }
        return sbSource.toString();
    }
```

## split

原理和上面一样

```java
public static List<String> split(String source,String separator){
    StringBuilder sbSourceHalf = new StringBuilder(StringUtils.fullToHalf(source));
    String separatorStr = StringUtils.fullToHalf(separator);
    int len = separatorStr.length();
    int idx = 0;
    int termStart = 0;
    List<String> ret = new ArrayList<>();
    while((idx = sbSourceHalf.indexOf(separatorStr, idx)) != -1) {
        String term = source.substring(termStart,idx);
        ret.add(term);
        idx +=  separatorStr.length();
        termStart = idx;
    }

    ret.add(source.substring(termStart));
    return ret;
}
```