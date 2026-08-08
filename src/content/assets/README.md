# 文章附件目录

本目录用于存放 `src/content` 下各文章（Markdown）用到的本地资源，如图片等。

## 使用方式

1. 将图片等资源放入本目录（可按需建立子目录，如 `records/`、`car-basics/`）。
2. 在 Markdown 中以根路径引用：

```markdown
![描述](/content/assets/xxx.jpg)
```

## 原理

构建时 `vue.config.js` 中的 `copy-webpack-plugin` 会将本目录复制到
`dist/content/assets`，因此运行时通过 `/content/assets/...` 访问。
本目录中的 `*.md` 与 `.DS_Store` 文件不会被复制。
