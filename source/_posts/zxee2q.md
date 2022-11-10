---
title: 基于Antlr的计算器程序
date: 2022-07-21T12:39:33.000Z
tags: ['java','antlr']
---
  
## 定义语法

`Calc.g4`

```
grammar Calc;

prog: stat+;

stat: expr NEWLINE         # printExpr
    | NEWLINE              # blank
    ;

expr: expr MUL expr # Mul
    | expr DIV expr # Div
    | expr ADD expr # Add
    | expr SUB expr # Sub
    | INT                        # int
    | '(' expr ')'               # parens
    ;

MUL : '*' ;
DIV : '/' ;
ADD : '+' ;
SUB : '-' ;
INT : [0-9]+ ;
NEWLINE:'\r'? '\n' ;
WS : [ \t]+ -> skip;
```

## 生成代码

使用插件或者 jar 根据语法生成代码。
安装 idea 插件

![](images/FpWHc1ouhZnZ3Aj0EFfrxeWCrRYB.png)
生成词法分析和语法分析的代码
![](images/Fj_8u_Xwmt9qHc1gqynjV6bAdZfU.png)

## 编写程序代码

```java
package io.github.lmikoto.calc;

import io.github.lmikoto.calc.gen.CalcBaseVisitor;
import io.github.lmikoto.calc.gen.CalcParser;

/**
 * @author 刘阳
 * @date 2021/9/18 1:01 下午
 */
public class CalcEvalVisitor extends CalcBaseVisitor<Integer> {

    @Override
    public Integer visitPrintExpr(CalcParser.PrintExprContext ctx) {
        return visit(ctx.expr());
    }

    @Override
    public Integer visitInt(CalcParser.IntContext ctx) {
        return Integer.valueOf(ctx.INT().getText());
    }

    @Override
    public Integer visitMul(CalcParser.MulContext ctx) {
        Integer left = visit(ctx.expr(0));
        Integer right = visit(ctx.expr(1));
        return left * right;
    }

    @Override
    public Integer visitDiv(CalcParser.DivContext ctx) {
        Integer left = visit(ctx.expr(0));
        Integer right = visit(ctx.expr(1));
        return left / right;
    }

    @Override
    public Integer visitAdd(CalcParser.AddContext ctx) {
        Integer left = visit(ctx.expr(0));
        Integer right = visit(ctx.expr(1));
        return left + right;
    }

    @Override
    public Integer visitSub(CalcParser.SubContext ctx) {
        Integer left = visit(ctx.expr(0));
        Integer right = visit(ctx.expr(1));
        return left - right;
    }

    @Override
    public Integer visitParens(CalcParser.ParensContext ctx) {
        return visit(ctx.expr());
    }
}
```

## 编写 main 方法执行

```java
package io.github.lmikoto.calc;

import io.github.lmikoto.calc.gen.CalcLexer;
import io.github.lmikoto.calc.gen.CalcParser;
import org.antlr.v4.runtime.CharStreams;
import org.antlr.v4.runtime.CodePointCharStream;
import org.antlr.v4.runtime.CommonTokenStream;
import org.antlr.v4.runtime.tree.ParseTree;

public class Calc {

    public static void main(String[] args) {

        CodePointCharStream inputStream = CharStreams.fromString("6 + (1 + 5) * 4+ 6 / 2 \n");
        CalcLexer lexer = new CalcLexer(inputStream);

        CommonTokenStream tokenStream = new CommonTokenStream(lexer);
        CalcParser parser = new CalcParser(tokenStream);
        ParseTree parseTree = parser.prog();
        CalcEvalVisitor visitor = new CalcEvalVisitor();
        Integer rtn = visitor.visit(parseTree);
        System.out.println(rtn);
    }
}
```