## 目标
- 将列表与筛选分栏：左侧列表宽度 60%，右侧筛选面板宽度 40%
- 集成分类筛选与日期筛选（日期段、按年份、本月）并可组合/切换

## 改动概览
- 模板：新增两列布局容器，左列保留 record-list，右列新增 filters-panel
- 状态：新增日期筛选相关响应式状态与唯一年份集合
- 逻辑：重构 filteredRecords，统一按分类 + 日期条件过滤
- 样式：为两列布局与右侧面板补充样式，沿用站点配色与按钮规范

## 模板结构
- 外层容器改为两列：
  - 左列：现有 record-list（v-for 渲染）
  - 右列：筛选面板，包含：
    - 分类筛选：沿用现有 categories/activeCategory 与按钮
    - 日期筛选：
      - 日期段：起始/结束两个 <input type="date"> + 清除
      - 按年份：渲染唯一年份按钮（来自记录数据）
      - 本月：一键筛选当前系统年/月
- 原 section-header 内的 filters 迁移至右侧面板；header 保留标题

## 数据与状态
- data：
  - activeCategory: string（默认 "All"）
  - dateMode: 'none' | 'range' | 'year' | 'thisMonth'
  - dateStart: string|null（YYYY-MM-DD）
  - dateEnd: string|null（YYYY-MM-DD）
  - filterYear: number|null
- computed：
  - categories：保持现有逻辑
  - uniqueYears：从 records 的 rec.date 提取年份去重排序
  - filteredRecords：按分类 + dateMode 对应条件过滤

## 过滤逻辑
- 基础：先按 activeCategory 过滤（All 则不过滤）
- 日期段（range）：
  - 解析 rec.date → Date；比较 >= dateStart 且 <= dateEnd（若某端为空则不限制该端）
- 按年份（year）：
  - 提取 rec.date 的年份与 filterYear 相等
- 本月（thisMonth）：
  - 使用系统当前年月；rec.date 的年月相等
- 切换规则：
  - 点击年份按钮 → dateMode='year' 且设置 filterYear，清空 dateStart/dateEnd
  - 点击本月 → dateMode='thisMonth'，清空 year 与 range 值
  - 修改日期输入任一端 → dateMode 自动置为 'range'
  - 清除按钮 → dateMode='none' 且清空所有日期相关状态

## 样式与布局
- .page-records 设为 display:flex; gap 合理；
- 左列 .record-list 宽度 60%
- 右列 .filters-panel 宽度 40%；内部分组标题、按钮栅格；
- 按钮样式沿用现有 .filter-btn/.active（透明背景、悬停高亮 #66c0f4）

## 边界与稳健性
- 日期解析失败的记录不参与日期过滤（但仍可显示在无日期筛选时）
- dateStart > dateEnd 时，显示提示并视为无效（不应用过滤）
- uniqueYears 基于有效日期集计算；若为空则隐藏该分组

## 验证要点
- 分类与日期可独立/组合工作：
  - 仅分类、仅日期段、仅年份、仅本月
  - 分类 + 年份、本月、日期段
- 清除按钮恢复到仅分类或全量
- 路由跳转详情保持工作
- 响应式：窄屏下两列可改为纵向堆叠（可选）

## 代码改动范围
- src/views/Records.vue：模板重排、data/computed/methods 扩充、样式补充
- 不改动数据源与路由命名（RecordDetail）