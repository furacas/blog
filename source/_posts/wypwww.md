---
title: 两个字符串的最长公共子序列问题-从暴力递归到动态规划优化
date: 2022-06-09T08:53:52.000Z
tags: ['算法','动态规划','暴力递归']
---
  
动态规划问题的最终解是找到转移方程，但是转移方程很多时候并不是那么好找的。

## 问题描述

给定两个字符串寻找最长公共子序列。例如"ab1c2de3f"和"x1y2z3"的最长子序列为"123"

## 暴力递归

暴力递归的解决思路是很容易想到的。
递归函数返回两个字符串 str1，str2 到 index1，index2 位置的最长公共子序列的长度。
递归终止的条件是两个串中任意一个串是空串，那么最长公共子序列的长度为 0。
到任意一个 index1，index2 位置有以下几种可能性

- 最长公共子序列的最后一个值和 str1[index1] 、str2[index2]都相同。
- 最长公共子序列的最后一个值和 str1[index1] 、str2[index2]都不相同。
- 最长公共子序列的最后一个值和 str1[index1] 、str2[index2]其中一个相同。

这样就把问题拆分成了子问题，使用递归求解。

```java
class Solution {
    public int longestCommonSubsequence(String text1, String text2) {
        return process(text1.toCharArray(),text1.length() - 1,text2.toCharArray(),text2.length() - 1);
    }

    public int process(char[] str1, int index1, char[] str2, int index2) {
        if(index2 < 0 || index1 < 0){
            return 0;
        }
        if(str1[index1] == str2[index2]){
            return process(str1,index1 -1 ,str2, index2 -1) + 1;
        } else {
            int p1 = process(str1,index1,str2,index2 - 1);
            int p2 = process(str1,index1 - 1,str2,index2);
            int p3 = process(str1,index1 - 1,str2,index2 - 1);
            return Math.max(Math.max(p1,p2),p3);
        }
    }
}
```

但是递归里面会进行很多次的重复计算，通常而言对于动态规划问题，暴力递归一般会超时。

## 缓存优化记忆化搜索

对于上述递归过程，其实会有很多重复的求解过程。
把重复的解放到一个缓存里面，每次直接从缓存中取值，这样就可以减少很多的重复过程。
新建 db 数组(当然 map 也可以)，作为缓存数组。

```java
class Solution {

    private int db[][];

    public int longestCommonSubsequence(String text1, String text2) {

        db = new int[text1.length()][text2.length()];
        for(int i = 0; i < text1.length();i++){
            for(int j = 0; j < text2.length();j++){
                db[i][j] = -1;
            }
        }

        return process(text1.toCharArray(),text1.length() - 1,text2.toCharArray(),text2.length() - 1);
    }

    public int process(char[] str1, int index1, char[] str2, int index2) {
        if(index2 < 0 || index1 < 0){
            return 0;
        }

        if(db[index1][index2] != -1){
            return db[index1][index2];
        }

        if(str1[index1] == str2[index2]){
            db[index1][index2] = process(str1,index1 -1 ,str2, index2 -1) + 1;
            return db[index1][index2];
        } else {
            int p1 = process(str1,index1,str2,index2 - 1);
            int p2 = process(str1,index1 - 1,str2,index2);
            int p3 = process(str1,index1 - 1,str2,index2 - 1);
            db[index1][index2] = Math.max(Math.max(p1,p2),p3);
            return db[index1][index2];
        }
    }
}
```

## 动态规划

上述的记忆化搜索已经可以 AC 了。看着上述的记忆化搜索的过程其实也比较容易推导出来动画规划的的转移方程了。其实从 0 开始直接构建上述的缓存 db 数组的过程就是动态规划的转移方程。把缓存想象成二位表，而转移方程就是构建二位表的过程。
PS：这里为了简化判断流程给二位表 db 多套了一层

```java
class Solution {

    public int longestCommonSubsequence(String text1, String text2) {
        char[] str1 = text1.toCharArray();
        char[] str2 = text2.toCharArray();
        int[][] db = new int[text1.length() + 1][text2.length() + 1];
        for(int i = 1; i <= text1.length();i++){
            for(int j = 1; j <= text2.length();j++){
                if(str1[i-1] == str2[j-1]) {
                    db[i][j] = db[i-1][j-1] + 1;
                }else {
                    int p1 = db[i][j-1];
                    int p2 = db[i-1][j-1];
                    int p3 = db[i-1][j];
                    db[i][j] = Math.max(Math.max(p1,p2),p3);
                }
            }
        }

        return db[text1.length()][text2.length()];
    }

}
```