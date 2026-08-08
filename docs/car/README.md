# 汽车相关资料目录

本目录用于存放「汽车主页 → 相关资料」页面展示的文档文件（PDF、Word 等）。

## 使用方式

1. 将文件（`.pdf` / `.doc` / `.docx` 等）放入本目录。
2. 在 `src/data/car/carDocs.js` 中新增一条记录：

```js
{
  id: 1,
  title: '文档标题',
  description: '一句话简介',
  file: '文件名.pdf',   // 本目录下的文件名
  type: 'pdf',          // pdf | word | other
  cover: '封面图.png',  // 可选：自定义封面图；PDF 不填则自动用首页内容做预览
  words: '1.2万',       // 可选：字数（需手动填写）
  pages: 36,            // 可选：页数（需手动填写）
  size: '2.3 MB'        // 可选：文件大小，不填则自动读取
}
```

3. 重新构建部署后，PDF 可直接在页面内阅读，Word 等文件提供下载。
