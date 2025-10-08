# ASHENONE's Personal Blog

一个基于 Vue.js 2.x 构建的个人博客网站，展示个人简介、技能和作品集。
![介绍1](./src/assets/img/index_1.png)

## 🌟 项目特色

- **响应式设计**: 适配各种设备屏幕尺寸
- **暗黑模式**: 支持明亮/暗黑主题切换
- **动画效果**: 丰富的 CSS 动画和交互效果
- **多页面导航**: 包含主页、汽车、记录等多个页面
- **个人展示**: 完整的个人简介和技能展示

## 🛠️ 技术栈

- **前端框架**: Vue.js 2.6.11
- **构建工具**: Vue CLI 4.5.19
- **开发语言**: JavaScript (ES6+)
- **样式**: CSS3 + 自定义样式
- **代码规范**: ESLint + Vue 官方规范

## 📁 项目结构

```
src/
├── components/          # Vue 组件
│   ├── Index.vue       # 主页组件
│   └── HelloWorld.vue  # 示例组件
├── assets/             # 静态资源
│   ├── img/           # 图片资源
│   └── logo.png       # 项目 Logo
├── App.vue            # 根组件
├── main.js            # 入口文件
├── mycar.html         # 汽车页面
├── notes.html         # 记录页面
├── mycar.css          # 汽车页面样式
├── notes.css          # 记录页面样式
└── fly.css            # 动画效果样式
```

## 🚀 快速开始

### 环境要求

- Node.js >= 12.0.0
- npm >= 6.0.0

### 安装依赖

```bash
npm install
```

### 开发模式

启动开发服务器，支持热重载：

```bash
npm run serve
```

访问 `http://localhost:8080` 查看网站

### 生产构建

构建生产版本：

```bash
npm run build
```

构建文件将输出到 `dist/` 目录

### 代码检查

运行 ESLint 检查并自动修复：

```bash
npm run lint
```

## 🎨 页面功能

### 主页 (Index.vue)
- 个人简介和头像展示
- 技能统计和能力介绍
- 明暗主题切换功能
- 响应式导航菜单

### 汽车页面 (mycar.html)
- 汽车相关内容展示
- 独立的页面布局和样式

### 记录页面 (notes.html)
- 个人记录和笔记展示
- 专门的内容管理界面

## 🎯 主要特性

1. **主题切换**: 支持明亮和暗黑两种主题模式
2. **响应式布局**: 适配桌面端和移动端
3. **动画效果**: 流畅的页面过渡和交互动画
4. **个人展示**: 完整的个人信息和技能展示
5. **多页面支持**: 包含多个功能页面

## 📱 浏览器支持

- Chrome >= 60
- Firefox >= 60
- Safari >= 12
- Edge >= 79

## 🔧 自定义配置

更多配置选项请参考 [Vue CLI 配置文档](https://cli.vuejs.org/config/)

## 📄 许可证

本项目仅供个人学习和展示使用。

## 👤 作者

**ASHENONE**

- 个人博客: [AshenoneZJX.github.io](https://AshenoneZJX.github.io)

---

*"世界上只有一种真正的英雄主义：那就是在认清生活的真相之后依然热爱生活。"*
