---
title: 岛屿的数量
date: 2023-01-17T07:36:02.000Z
updated: 2023-01-17T07:45:38.000Z
tags: ['leetcode','算法','并查集']
---
  
原题连接 [https://leetcode.cn/problems/number-of-islands/description/](https://leetcode.cn/problems/number-of-islands/description/)

## 方法 1 并查集

这是一个很典型的并查集问题。初始化并查集，把全部的陆地分别设置成单独的集合，然后遍历，如果有陆地相连则把集合合并，最后计算最后剩余的集合个数

```python
class Solution:
    def numIslands(self, grid: List[List[str]]) -> int:
        union_find = UnionFind(grid)
        l1,l2 = len(grid),len(grid[0])
        for i in range(l1):
            for j in range(l2):
                if grid[i][j] == '1':
                    # 这里做不做这个都可以，因为并查集做了路径压缩，这里改成0是优化，但是影响不大
                    grid[i][j] == '0'
                    if i > 1 and grid[i - 1][j] == '1':
                        union_find.union((i,j), (i-1,j))
                    if i + 1 < l1 and grid[i + 1][j] == '1':
                        union_find.union((i,j), (i+1,j))
                    if j > 1 and grid[i][j - 1] == '1':
                        union_find.union((i,j), (i,j - 1))
                    if j + 1 <  l2 and grid[i][j + 1] == '1':
                        union_find.union((i,j), (i,j + 1))
        return union_find.count()

class UnionFind:
    def __init__(self,grid):
        self.cnt = 0
        self.par = {}
        l1,l2 = len(grid),len(grid[0])
        for i in range(l1):
            for j in range(l2):
                if grid[i][j] == '1':
                    self.par[(i,j)] = (i,j)
                    self.cnt += 1
    def find(self,p):
        if p not in self.par:
            self.par[p] = p
            self.cnt += 1
        if self.par[p] != p:
            self.par[p] = self.find(self.par[p])
        return self.par[p]
    def union(self,p1,p2):
        if self.find(p1) != self.find(p2):
            self.par[self.find(p1)] = self.find(p2)
            self.cnt -= 1
    def count(self):
        return self.cnt

```