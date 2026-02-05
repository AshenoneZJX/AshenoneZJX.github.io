## 改造要点（按要求调整）
- 保留“车型列表页”组件文件 Cars.vue，但路由名称改为 CarsModels，路径仍用 /mySpace/cars 以保持兼容。
- 新增“汽车主页” CarsHome（路径：/mySpace/cars-home），概览页的 Cars 卡片跳转至此。
- 图表统一采用 ECharts（直接在 Vue2 组件中使用 echarts.init/dispose）。

## 路由层级与命名
- /mySpace/cars-home（name: 'CarsHome'）→ 汽车主页。
- /mySpace/cars（name: 'CarsModels'，component: Cars.vue）→ 车型列表页。
- /mySpace/cars/:id（name: 'CarDetail'）→ 车型详情页。
- /mySpace/car-basics（name: 'CarBasics'），/mySpace/car-basics/:id（name: 'CarBasicsDetail'）。
- /mySpace/brands（name: 'BrandList'），/mySpace/brands/:name（name: 'BrandDetail'）。
- 兼容性：保留路径 /mySpace/cars，不改；仅更名路由 name 为 CarsModels。对任何使用 name:'Cars' 的跳转进行替换。

## 页面与组件
- 新增 CarsHome.vue（汽车主页）：
  - 上部“图表区”：默认展示“年度车型销量 Top-N 排名”（ECharts 条形/柱状图），支持年份切换。
  - 下部“跳转卡片区”：
    - 汽车基础知识 → /mySpace/car-basics。
    - 车型大全 → /mySpace/cars（CarsModels）。
    - 品牌介绍 → /mySpace/brands。
- 保留 Cars.vue 为列表页；现有筛选/分页逻辑不变。
- 保留 CarDetail.vue；按路由参数加载详情。
- 新增 BrandList.vue（按 cars.json 的 brand 聚合列表）、BrandDetail.vue（品牌下车型与统计）。

## 图表实现（ECharts）
- 依赖：新增 'echarts'（ECharts 5）。
- 封装图表组件 YearlySalesRankingChart.vue：
  - 直接 import * as echarts from 'echarts'；mounted 中通过 ref 初始化，beforeDestroy 中 dispose。
  - props：data（含 name、value）、year、title；支持响应式刷新。
  - 主题与交互：启用 tooltip、legend、dataset；条形图水平展示 Top-N 排名。
- 可选 BrandTrendChart.vue（后续用于品牌趋势/占比）。

## 数据方案
- 现有：src/data/cars.json；用于品牌聚合与基础信息。
- 销量数据：若暂无真实数据，先提供 mock（src/data/sales.json），结构如：{ year: 2025, items: [{ modelId, modelName, brand, sales }] }。
- 数据映射：主页图表按 year 选择，聚合排序取 Top-N；后续仅替换数据源即可。

## 交互与跳转
- 概览页 MySpaceOverview 的 Cars 卡片 to 改为 /mySpace/cars-home（不改样式）。
- 主页跳转卡片分别链接到 CarBasics、CarsModels（路径 /mySpace/cars）、BrandList。
- 列表页与详情页继续使用命名路由（CarDetail）；如存在 name:'Cars' 的跳转，统一改为 name:'CarsModels' 或使用路径。

## 样式与一致性
- 复用现有 card-image 与 hover-overlay 视觉；图表区采用自适应容器，保证在移动端与桌面端显示良好。
- 筛选按钮遵循项目风格（纯文字+悬停浅色主色透明高亮）。

## 验收与测试
- 路由跳转链路：概览 → 汽车主页 →（知识/列表/品牌）；列表 → 详情。
- 图表渲染：以 mock 数据验证年度销量 Top-N；切换年份、窗口尺寸响应。
- 兼容性：旧路径 /mySpace/cars 可直接访问列表；命名路由改名不影响基于路径的外链。

## 交付清单
- 新增：CarsHome.vue、BrandList.vue、BrandDetail.vue、YearlySalesRankingChart.vue（以及必要的图表封装）。
- 路由更新：新增 CarsHome；将 name:'Cars' 更名为 name:'CarsModels'；新增品牌路由。
- 概览页跳转更新：MySpaceOverview.vue 的 Cars 卡片改为 /mySpace/cars-home。