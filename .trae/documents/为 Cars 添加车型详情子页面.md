## 路由
- 在 `src/router/index.js` 的 `/mySpace` 子路由下新增：`{ path: 'cars/:id', name: 'CarDetail', component: CarDetail }`
- 详情页路径示例：`/mySpace/cars/1`

## 数据源
- 新增 `src/data/cars.js`，集中维护车型数据，字段包含：`id`、`title`、`img`、`energy`、`body`、`desc`（可选）。
- `Cars.vue` 与 `CarDetail.vue` 共同从该数据文件读取，避免重复定义。

## Cars.vue 修改
- 引入 `@/data/cars`，替换本地 `cars` 数据；为每条数据增加 `id`。
- 将卡片容器改为可点击跳转：
  - 方案 A：用 `router-link` 包裹每张卡片，`to: { name: 'CarDetail', params: { id: car.id } }`
  - 方案 B：保留 `div`，加 `@click` 执行 `this.$router.push({ name: 'CarDetail', params: { id: car.id } })`
- 其他筛选逻辑保持不变；过滤后 `v-for` 仍遍历 `filteredCars`。

## CarDetail.vue 新增
- 位置：`src/views/CarDetail.vue`
- 内容结构：
  - 顶部标题栏：显示车型名；右侧提供返回按钮，`to='/mySpace/cars'`
  - 详情主体：车型大图、两类标签（能源浅蓝、车身文字浅黄）以及可选描述/参数占位
  - 未找到状态：当 `id` 无匹配时显示提示
- 生命周期：在 `created()` 读取 `this.$route.params.id`，从 `@/data/cars` 中查找对应车型。

## 样式规范
- 继承现有暗色主题与标题栏样式（参考 `RecordDetail.vue` 的 `section-header`）。
- 标签样式沿用 `Cars.vue` 已定义：能源为浅蓝底深色字（`.tag-energy`），车身为深色底浅黄色字（`.tag-body`）。

## 交互与返回
- 详情页返回按钮：点击返回 `/mySpace/cars`。
- 浏览器后退同样可返回列表页。

## 验证步骤
- 运行开发服务并访问 `/mySpace/cars`。
- 点击不同卡片确认能跳转到对应 `/mySpace/cars/:id`。
- 检查标签与图片渲染、404（未匹配 id）提示与返回按钮是否正常。