---
title: pdfbox实现pdf合并
date: 2022-11-29T07:03:28.000Z
tags: ['pdf','Java','pdfbox']
---
  
目前 Java 的 pdf 文档合并方案常见的有 spire.doc.free、itextpdf、pdfbox 三种。spire.doc.free 的免费版本有页数限制，这里就不考虑了。而性能最好的 itext 的开源协议是[AGPL](https://github.com/itext/itextpdf/blob/develop/LICENSE.md)，为了避免以后可能出现的麻烦我放弃了他，选择了可以商用比较友好的 pdfbox。

## pdfbox

Apache pdfbox 是一个开源 Java 库，可用于创建，渲染，打印，拆分，合并，更改，验证和提取 pdf 文件的文本和元数据。

### maven 依赖

```xml
<dependency>
  <groupId>org.apache.pdfbox</groupId>
  <artifactId>pdfbox</artifactId>
  <version>2.0.24</version>
</dependency>
```

### pdf 合并

```java
public void mergePdf(String... path) throws IOException {
    PDFMergerUtility pdfMerger = new PDFMergerUtility();
    pdfMerger.setDestinationFileName("target/merged.pdf");

    for (String s : path) {
        pdfMerger.addSource(ResourceUtils.getFile(s));
    }

    pdfMerger.mergeDocuments(null);
}
```