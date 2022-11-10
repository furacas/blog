---
title: 解决poi插入的换行符无法被复制的问题
date: 2022-11-04T10:03:34.000Z
tags: ['poi','java']
---
  
## 问题背景

在 word 中有两种换行，一种是直接按下回车的"段落换行"![](images/1667556405124-28604506-8839-4231-8038-fd17fc9e1802.png)而另一种换行符是按下 shift + 回车打出来的换行符 ![](images/1667556470690-9489e920-0b49-4c04-8984-f0e11a0b40f4.png)

```
## 第一种换行符
org.apache.poi.xwpf.usermodel.XWPFRun#addCarriageReturn()

## 第二种换行符
org.apache.poi.xwpf.usermodel.XWPFRun#addBreak()
```

第一种换行符比较符合我们日常的使用习惯，但是使用上述 api 打出来的换行符可以在 word 中被正常识别，但是无法通过复制的方式把这个换行符复制到一段文本中。
举个例子，如下 word 内容

```
第一行
第二行
第三行
```

复制到文本文件中变成

```
第一行 第二行 第三行
```

而我们直接在 word 中敲出来的回车换行符可以被正确复制。

## 解决思路

因为直接使用 poi 的 api 无法解决这个问题，所以只能另辟蹊径。最后参考[https://stackoverflow.com/questions/14830667/insert-a-line-break-inside-a-paragraph-in-xwpfdocument](https://stackoverflow.com/questions/14830667/insert-a-line-break-inside-a-paragraph-in-xwpfdocument) 这篇文章实现的。
既然换行符不行，那就新建一个段落来解决这个问题。

原文代码如下，因为我这边涉及到业务代码，我就不贴出来了，本质都是一样的。

```java
protected void replaceElementInParagraphs(List<XWPFParagraph> xwpfParagraphs,
                                              Map<String, String> replacedMap) {
        if (!searchInParagraphs(xwpfParagraphs, replacedMap)) {
            replaceElementInParagraphs(xwpfParagraphs, replacedMap);
        }
    }

 private boolean searchInParagraphs(List<XWPFParagraph> xwpfParagraphs, Map<String, String> replacedMap) {
        for(XWPFParagraph xwpfParagraph : xwpfParagraphs) {
            List<XWPFRun> xwpfRuns = xwpfParagraph.getRuns();
            for(XWPFRun xwpfRun : xwpfRuns) {
                String xwpfRunText = xwpfRun.getText(xwpfRun.getTextPosition());
                for(Map.Entry<String, String> entry : replacedMap.entrySet()) {
                    if (xwpfRunText != null && xwpfRunText.contains(entry.getKey())) {
                        if (entry.getValue().contains("\n")) {
                            String[] paragraphs = entry.getValue().split("\n");
                            entry.setValue("");
                            createParagraphs(xwpfParagraph, paragraphs);
                            return false;
                        }
                        xwpfRunText = xwpfRunText.replaceAll(entry.getKey(), entry.getValue());
                    }
                }
                xwpfRun.setText(xwpfRunText, 0);
            }
        }
        return true;
    }

 private void createParagraphs(XWPFParagraph xwpfParagraph, String[] paragraphs) {
        if(xwpfParagraph!=null){
            for (int i = 0; i < paragraphs.length; i++) {
                XmlCursor cursor = xwpfParagraph.getCTP().newCursor();
                XWPFParagraph newParagraph = document.insertNewParagraph(cursor);
                newParagraph.setAlignment(xwpfParagraph.getAlignment());
                newParagraph.getCTP().insertNewR(0).insertNewT(0).setStringValue(paragraphs[i]);
                newParagraph.setNumID(xwpfParagraph.getNumID());
            }
            document.removeBodyElement(document.getPosOfParagraph(xwpfParagraph));
        }
    }

```