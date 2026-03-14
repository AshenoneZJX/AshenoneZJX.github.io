# Vue.js 简介与入门指南

## 什么是 Vue.js？

Vue (发音为 /vjuː/，类似 view) 是一款用于构建用户界面的 JavaScript 框架。它基于标准 HTML、CSS 和 JavaScript 构建，并提供了一套声明式的、组件化的编程模型，帮助开发者高效地开发用户界面。

Vue 由尤雨溪（Evan You）于 2014 年创建。它采用了 MVVM（Model-View-ViewModel）架构模式，核心库专注于视图层，易于上手，同时也能驱动复杂的单页应用（SPA）。

## 核心特性

### 1. 渐进式框架
Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库（如 Vue Router、Pinia）结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。

### 2. 声明式渲染
Vue 基于标准 HTML 拓展了一套模板语法，使得我们可以声明式地描述最终输出的 HTML 和 JavaScript 状态之间的关系。

### 3. 响应性
Vue 会自动跟踪 JavaScript 状态并在其发生变化时响应式地更新 DOM。

### 4. 组件化
Vue 推崇组件化的开发模式，允许我们将 UI 划分为独立的、可重用的部分，并且每个部分都有自己的逻辑和样式。

## API 风格

Vue 提供了两种不同的 API 风格来编写组件：

### 选项式 API (Options API)
使用包含多个选项的对象来描述组件的逻辑，例如 `data`、`methods` 和 `mounted`。选项所定义的属性都会暴露在函数内部的 `this` 上。

```javascript
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++
    }
  }
}
```

### 组合式 API (Composition API)
使用导入的 API 函数来描述组件逻辑。在单文件组件中，通常配合 `<script setup>` 使用。这种风格更加灵活，利于逻辑复用。

```javascript
<script setup>
import { ref } from 'vue'

const count = ref(0)

function increment() {
  count.value++
}
</script>
```

## 单文件组件 (SFC)

在大多数 Vue 项目中，使用一种类似 HTML 格式的文件来书写 Vue 组件，被称为单文件组件（`*.vue` 文件）。它将组件的逻辑 (JavaScript)、模板 (HTML) 和样式 (CSS) 封装在同一个文件里。

```vue
<script setup>
import { ref } from 'vue'
const greeting = ref('Hello Vue!')
</script>

<template>
  <p class="greeting">{{ greeting }}</p>
</template>

<style scoped>
.greeting {
  color: #42b883;
  font-weight: bold;
}
</style>
```
## 特点

Vue.js 的独特之处在于“渐进式”与“轻量级”兼得：  
1. 学习曲线平滑：模板语法贴近原生 HTML，新手上手成本低于 React 的 JSX 或 Angular 的 TypeScript 强制栈。  
2. 体积更小：运行时压缩后仅约 34 kB（React + ReactDOM 约 45 kB），首屏加载更快。  
3. 响应式系统基于 Proxy，无需手动 setState 或 RxJS 流，代码量更少且性能优于 React 的 Virtual DOM Diff（ benchmark 场景下渲染耗时平均低 10–30 %）。  
4. 单文件组件天然支持 CSS Scoped，样式隔离无需额外 CSS-in-JS 库，降低运行时开销。  
5. 官方生态一体化：Router、Pinia、DevTools、SSR 方案均由官方维护，版本同步、文档一致，避免第三方库碎片化带来的兼容风险。  
6. 渐进增强友好：可直接通过 `<script src>` 引入做页面局部增强，也能无缝对接 Webpack、Vite、TS、JSX，改造存量 jQuery / 后端模板项目的成本远低于重写为纯 SPA。

## 应用场景

Vue 的灵活性使其适用于多种场景：
*   **增强静态 HTML**：无需构建步骤，直接在页面引入。
*   **单页应用 (SPA)**：配合 Vue Router 构建富交互应用。
*   **服务端渲染 (SSR)**：提升首屏加载速度和 SEO。
*   **静态站点生成 (SSG)**：用于构建内容驱动的网站。
*   **多端开发**：支持 Electron（桌面端）、Uni-app（移动端/小程序）等。

---
*参考资料：[Vue.js 官网](https://cn.vuejs.org/guide/introduction?ref=yun.lyyidc.cn)、[百度百科 - Vue.js](https://baike.baidu.com/item/Vue.js/19884851)*
