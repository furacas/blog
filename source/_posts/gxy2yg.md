---
title: 无重复字符的最长子串
date: 2022-09-21T07:01:52.000Z
tags: ['leetcode','算法','滑动窗口']
---
  
[原题链接](https://leetcode.cn/problems/longest-substring-without-repeating-characters/)
这是一道比较简单的滑动窗口应用题。之所以写出来是因为面试遇到了，当时还没做出来 😭。

## 题目分析

以例题的 abcabcbb 为例。设置一个滑动窗口，当窗口为 abc 的时候满足题意，但是这个时候 a 入队这样就不满足了，于是需要把窗口左边移动到上一个 a 的位置，让窗口变成 bca，而如何知道上一个 a 的位置，我们就需要一个结构来存储每个字符的上个位置，这个结构很明显用 Map 就可以了。当然这里还有一个易错点就是这个 a 必须在当前窗口里面，否则是没必要移动的。

## 参考代码

```java
class Solution {

    public int lengthOfLongestSubstring(String s) {

        int start = 0,end = 0;
        int len = s.length();
        Map<Character,Integer> map = new HashMap<>();
        int max = 0;
        while(end < len){
            if(map.get(s.charAt(end)) != null){
                start = Math.max(start,map.get(s.charAt(end)) + 1);
            }
            max = Math.max(max,end - start + 1);
            map.put(s.charAt(end),end);
            end++;

        }
        return max;
    }
}

```