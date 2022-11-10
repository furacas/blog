---
title: 图的问题模版
date: 2022-06-01T09:11:31.000Z
tags: ['算法','图']
---
  
有关图的问题算法一般不是很复杂，难点一般在于数据结构，一张图可以用很多种的数据结构表达出来，相对应的同一种算法在不同的数据结构下面就有不同的表现。因此对于图问题有一个自己顺手的数据结构是很有必要的。当遇到不是自己顺手的数据结构可以手写转换器转换成自己熟悉的数据结构。
以下是个人顺手的数据结构

```java
import java.util.*;

class Node {
    public Integer value;
    /**
     * 入度
     */
    public int in;

    /**
     * 出度
     */
    public int out;

    public List<Node> next;

    public List<Edge> edges;

    public Node(Integer value) {
        this.value = value;
        this.in = 0;
        this.out = 0;
        this.next = new ArrayList<>();
        this.edges = new ArrayList<>();
    }
}

class Edge {

    public int weight;

    public Node from;

    public Node to;

    public Edge(int weight, Node<T> from, Node<T> to) {
        this.weight = weight;
        this.from = from;
        this.to = to;
    }
}

class Graph{
    public Map<Integer,Node> nodes;

    public Set<Edge> edges;

    public Graph() {
        nodes = new HashMap<>();
        edges = new HashSet<>();
    }
}
```

基于模版，实现图的算法

## 广度优先遍历 bfs

```java
public void bfs(Node node){
    if(node == null){
        return;
    }
    Queue<Node> queue = new LinkedList<>();
    HashSet<Node> set = new HashSet<>();

    queue.add(node);
    set.add(node);
    while (!queue.isEmpty()){
        Node cur = queue.poll();
        System.out.println(cur.value);
        for(Node next: cur.next){
            if(!set.contains(next)){
                queue.add(next);
                set.add(next);
            }
        }
    }
}
```

## 深度优先遍历 dfs

```java
public void dfs(Node node){
    if(node == null){
        return;
    }

    Stack<Node> stack = new Stack<>();
    HashSet<Node> set = new HashSet<>();
    stack.add(node);
    set.add(node);
    System.out.println(node.value);
    while (!stack.isEmpty()){
        Node cur = stack.pop();
        for(Node next: cur.next){
            if(!set.contains(next)){
                stack.push(cur);
                stack.push(next);
                set.add(next);
                System.out.println(next.value);
                break;
            }
        }
    }
}
```