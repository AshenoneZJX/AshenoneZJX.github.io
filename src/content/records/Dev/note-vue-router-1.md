---
date: 2024-10-11
category: Dev
excerpt: 重构项目结构，采用独立组件文件。路由逻辑由 Vue Router 统一管理，提升 SPA 体验。
---

# Vue Router笔记 #1

本次更新将项目结构调整为基于组件的组织方式。
将页面拆分为 `views` 目录，公用模块放在 `components` 中，路由统一由 `src/router/index.js` 管理。
路由模式使用 `history`，匹配到 `/`、`/cars`、`/records` 三个入口。
这样做的好处是：代码更清晰、易于维护，用户在页面间切换更加流畅。

