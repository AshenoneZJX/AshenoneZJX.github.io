<!--
功能：展示所有日志记录
- 从本地 records 数据渲染记录列表
- 每个记录项包含日期、标题、分类及摘要
- 点击记录项可跳转至详情页
UI：现代博客归档风格 —— 左侧时间线（日期 + 竖线 + 节点圆点）+ 右侧吸顶侧栏（统计 / 热力图 / 筛选）
配色全部取自全局主题变量（--c-*），跟随设置页主题色实时联动
-->

<template>
  <div class="container page-records">
    <header class="section-header">
      <div class="header-title-group">
        <h2>日志记录</h2>
        <span class="record-count">共 {{ filteredRecords.length }} 篇</span>
      </div>
      <button class="filter-btn filter-toggle mobile-only" @click="toggleFilters">筛选</button>
    </header>

    <div class="content-2col">
      <div class="record-list col-left" :class="{ 'has-items': filteredRecords.length }">
        <div
          class="record-item clickable"
          v-for="(rec, index) in filteredRecords"
          :key="rec.id"
          :style="{ animationDelay: Math.min(index, 12) * 45 + 'ms' }"
          @click="goDetail(rec)"
        >
          <div class="record-rail" v-if="parseDate(rec.date)" aria-hidden="true">
            <span class="rail-day">{{ dayOfMonth(rec.date) }}</span>
            <span class="rail-month">{{ monthAbbr(rec.date) }}</span>
          </div>
          <div class="record-body">
            <div class="record-head">
              <div class="record-title">{{ rec.title }}</div>
              <span class="record-arrow" aria-hidden="true">&rarr;</span>
            </div>
            <div class="record-excerpt">
              {{ rec.excerpt || toExcerpt(rec.content) }}
            </div>
            <div class="record-footer">
              <span class="tag tag-date">{{ formatYMD(rec.date) }}</span>
              <span class="tag tag-cat">{{ rec.category }}</span>
            </div>
          </div>
        </div>
        <div v-if="!filteredRecords.length" class="empty-state">
          <span class="empty-icon" aria-hidden="true">
            <img :src="filterIcon" width="28" height="28" alt="">
          </span>
          <div class="empty-title">没有符合条件的记录</div>
          <div class="empty-desc">试试调整分类或日期范围</div>
          <button class="filter-btn empty-clear" @click="clearDateFilters">清除筛选</button>
        </div>
      </div>
      <aside class="filters-panel col-right mobile-sheet" :class="{ active: filterOpen }">
        <div class="panel-section stats-card">
          <div class="stats-row">
             <div class="stat-item">
                <span class="stat-num">{{ totalNoteCount }}</span>
                <span class="stat-label">笔记数</span>
             </div>
             <div class="stat-item">
                <span class="stat-num">{{ totalTagCount }}</span>
                <span class="stat-label">标签数</span>
             </div>
          </div>
          <div class="stats-divider"></div>
          <div class="heatmap-container">
             <div class="heatmap-header">
                <button class="heatmap-nav" @click="changeYear(-1)">&lt;</button>
                <span class="heatmap-year">{{ heatmapYear }}</span>
                <button class="heatmap-nav" @click="changeYear(1)">&gt;</button>
             </div>
             <div class="heatmap-grid">
                <div v-for="(week, index) in currentYearWeeks" :key="index"
                     class="week-box"
                     :class="`intensity-${week.intensity}`"
                     :title="week.title">
                </div>
             </div>
          </div>
        </div>
        <div class="filter-card">
          <div class="panel-header">
            <span class="filter-icon" aria-hidden="true">
              <img :src="filterIcon" width="16" height="16" alt="">
            </span>
            <span class="panel-title">筛选</span>
            <div class="panel-actions">
              <button class="filter-btn clear-btn" @click="clearDateFilters">clear</button>
            </div>
          </div>
          <div class="panel-section">
            <div class="panel-subtitle">分类</div>
            <div class="panel-buttons compact">
              <button
                v-for="cat in categories"
                :key="cat"
                class="filter-btn"
                :class="{ active: activeCategory === cat }"
                @click="setCategory(cat)"
              >{{ cat }}</button>
            </div>
          </div>
          <div class="panel-section">
            <div class="panel-subtitle">日期</div>
            <div class="date-range">
              <div class="date-row">
                <span class="date-label">起始日期</span>
                <input type="date" v-model="dateStart" @input="onDateInput" class="date-input">
              </div>
              <div class="date-row">
                <span class="date-label">结束日期</span>
                <input type="date" v-model="dateEnd" @input="onDateInput" class="date-input">
              </div>
            </div>
            <div class="panel-hint" v-if="invalidRange">起止日期不合法</div>
          </div>
          <div class="panel-section" v-if="uniqueYears.length">
            <div class="panel-subtitle">快速筛选</div>
            <div class="panel-buttons compact">
              <button
                v-for="y in uniqueYears"
                :key="y"
                class="filter-btn"
                :class="{ active: dateMode === 'year' && filterYear === y }"
                @click="setYear(y)"
              >{{ y }}</button>
              <button class="filter-btn" :class="{ active: dateMode === 'thisMonth' }" @click="setThisMonth">本月</button>
            </div>
          </div>
        </div>
      </aside>
      <div v-if="filterOpen" class="sheet-mask mobile-only" @click="closeFilters"></div>
    </div>
  </div>
</template>

<script>
import records from '@/data/records/records.js'
import filterIcon from '@/assets/images/shaixuan.svg'

const MONTHS = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']

export default {
  name: 'Records',
  data() {
    return {
      records,
      activeCategory: 'All',
      filterIcon,
      dateMode: 'none',
      dateStart: null,
      dateEnd: null,
      filterYear: null,
      filterOpen: false,
      heatmapYear: new Date().getFullYear()
    }
  },
  computed: {
    totalNoteCount() {
      return this.records.length
    },
    totalTagCount() {
      return this.categories.length - 1
    },
    currentYearWeeks() {
      const year = this.heatmapYear
      const counts = new Array(53).fill(0)

      this.records.forEach(r => {
        const dt = this.parseDate(r.date)
        if (dt && dt.getFullYear() === year) {
          const week = this.getWeekNumber(dt)
          if (week >= 1 && week <= 53) {
            counts[week - 1]++
          }
        }
      })

      return counts.map((count, index) => {
        let intensity = 0
        if (count > 0) intensity = 1
        if (count > 1) intensity = 2
        if (count > 2) intensity = 3
        if (count >= 4) intensity = 4

        return {
          count,
          intensity,
          title: `${year} 第 ${index + 1} 周: ${count} 篇`
        }
      })
    },
    categories() {
      const set = new Set(this.records.map(r => r.category))
      return ['All', ...Array.from(set)]
    },
    filteredRecords() {
      const byCat = this.activeCategory === 'All'
        ? this.records
        : this.records.filter(r => r.category === this.activeCategory)
      return byCat.filter(r => this.applyDateFilter(r))
    },
    uniqueYears() {
      const years = []
      for (const r of this.records) {
        const dt = this.parseDate(r.date)
        if (!dt) continue
        years.push(dt.getFullYear())
      }
      const s = Array.from(new Set(years)).sort((a, b) => b - a)
      return s
    },
    invalidRange() {
      if (this.dateMode !== 'range') return false
      if (!this.dateStart || !this.dateEnd) return false
      return this.dateStart > this.dateEnd
    }
  },
  mounted() {
    this.heatmapYear = new Date().getFullYear()
  },
  methods: {
    changeYear(delta) {
      this.heatmapYear += delta
    },
    getWeekNumber(d) {
      d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
      d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7))
      var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1))
      var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7)
      return weekNo
    },
    monthAbbr(d) {
      const dt = new Date(d)
      return MONTHS[dt.getMonth()]
    },
    dayOfMonth(d) {
      const dt = new Date(d)
      return dt.getDate()
    },
    toExcerpt(text) {
      if (!text) return ''
      const t = String(text).replace(/\n/g, ' ')
      return t.length > 120 ? t.slice(0, 120) + '…' : t
    },
    formatYMD(d) {
      const dt = new Date(d)
      if (!isNaN(dt.getTime())) {
        const y = dt.getFullYear()
        const m = String(dt.getMonth() + 1).padStart(2, '0')
        const day = String(dt.getDate()).padStart(2, '0')
        return `${y}-${m}-${day}`
      }
      const s = String(d)
      return s.length >= 10 ? s.slice(0, 10) : s
    },
    goDetail(rec) {
      this.$router.push({ name: 'RecordDetail', params: { id: rec.id } })
    },
    setCategory(cat) {
      this.activeCategory = cat
    },
    parseDate(d) {
      const dt = new Date(d)
      if (isNaN(dt.getTime())) return null
      return dt
    },
    onDateInput() {
      this.dateMode = 'range'
      this.filterYear = null
    },
    clearDateFilters() {
      this.activeCategory = 'All'
      this.dateMode = 'none'
      this.dateStart = null
      this.dateEnd = null
      this.filterYear = null
    },
    setYear(y) {
      this.filterYear = y
      this.dateMode = 'year'
      this.dateStart = null
      this.dateEnd = null
    },
    setThisMonth() {
      this.dateMode = 'thisMonth'
      this.filterYear = null
      this.dateStart = null
      this.dateEnd = null
    },
    applyDateFilter(rec) {
      if (this.dateMode === 'none') return true
      const dt = this.parseDate(rec.date)
      if (!dt) return false
      if (this.dateMode === 'range') {
        if (this.invalidRange) return true
        const val = this.formatYMD(dt)
        if (this.dateStart && val < this.dateStart) return false
        if (this.dateEnd && val > this.dateEnd) return false
        return true
      }
      if (this.dateMode === 'year') {
        return dt.getFullYear() === this.filterYear
      }
      if (this.dateMode === 'thisMonth') {
        const now = new Date()
        return dt.getFullYear() === now.getFullYear() && dt.getMonth() === now.getMonth()
      }
      return true
    },
    toggleFilters() {
      this.filterOpen = !this.filterOpen
    },
    closeFilters() {
      this.filterOpen = false
    }
  }
}
</script>

<style scoped>
/* ===== 页面容器：沿用全局主题变量，跟随设置页主题色联动 ===== */
.page-records {
  padding: 48px 20px 72px;
  width: 100%;
  max-width: 1120px;
  margin-left: auto;
  margin-right: auto;
  box-sizing: border-box;
  font-family: var(--body-font);
}

/* ===== 页头：编辑级大标题 + 计数胶囊 + 渐变分隔线 ===== */
.section-header {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 36px;
  padding-bottom: 20px;
}
.section-header::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px;
  background: linear-gradient(90deg, var(--c-border-hover) 0%, var(--c-border-default) 45%, transparent 100%);
}
.header-title-group {
  display: flex;
  align-items: baseline;
  gap: 16px;
  flex-wrap: wrap;
}
.section-header h2 {
  color: var(--c-text-title);
  font-size: 30px;
  line-height: 1.4;
  font-weight: 600;
  letter-spacing: 3px;
  margin: 0;
  font-family: 'MotivaTitle', 'SourceHanSansSC', sans-serif;
}
.record-count {
  display: inline-flex;
  align-items: center;
  padding: 3px 12px;
  border: 1px solid var(--c-border-default);
  border-radius: 999px;
  font-size: 12px;
  color: var(--c-text-muted);
  font-family: 'RobotoMono', monospace;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  transform: translateY(-2px);
}

.filter-icon { display: inline-flex; align-items: center; margin-right: 4px; pointer-events: none; }
.filter-icon img { width: 16px; height: 16px; display: block; filter: brightness(0) invert(0.63); }

/* ===== 筛选按钮：胶囊样式，激活态使用全局主题色 ===== */
.filter-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 28px;
  padding: 0 14px;
  border-radius: 999px;
  border: 1px solid transparent;
  background: transparent;
  color: var(--c-text-body-alt);
  font-size: 13px;
  margin: 0;
  cursor: pointer;
  transition: color 0.2s ease, background 0.2s ease, border-color 0.2s ease;
}
.filter-btn:hover { background: var(--c-primary-alpha-10); color: var(--c-primary); }
.filter-btn.active {
  background: var(--c-primary-alpha-20);
  border-color: var(--c-primary-alpha-40);
  color: var(--c-primary);
}

/* ===== 双栏布局：左列表右侧栏，侧栏吸顶 ===== */
.content-2col { display: flex; gap: 44px; align-items: flex-start; }
.col-left { width: 68%; min-width: 0; }
.col-right {
  width: 32%;
  min-width: 0;
  position: sticky;
  top: 104px;
}

/* ===== 侧栏卡片：玻璃拟态表面 ===== */
.filters-panel {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.stats-card,
.filter-card {
  background: var(--c-bg-l2);
  border: 1px solid var(--c-border-default);
  border-radius: 12px;
  box-shadow: 0 4px 16px var(--c-shadow-light);
  box-sizing: border-box;
}
.filter-card { padding: 6px 16px 16px; }

.panel-header {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 12px 0;
  border-bottom: 1px solid var(--c-border-default);
}
.panel-actions { margin-left: auto; display: flex; align-items: center; }
.panel-title {
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--c-text-muted);
  font-family: 'SourceHanSansSC', sans-serif;
}
.panel-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 14px 0;
}
.filter-card .panel-section + .panel-section {
  border-top: 1px dashed var(--c-border-default);
}
.panel-subtitle {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--c-text-label);
  font-family: 'SourceHanSansSC', sans-serif;
  display: block;
}
.panel-buttons { display: flex; flex-wrap: wrap; gap: 8px; }
.panel-buttons.compact .filter-btn {
  height: 26px;
  padding: 0 12px;
  font-size: 12px;
  border: 1px solid var(--c-border-default);
  color: var(--c-text-body-alt);
}
.panel-buttons.compact .filter-btn:hover {
  border-color: var(--c-primary-alpha-40);
  color: var(--c-primary);
  background: var(--c-primary-alpha-10);
}
.panel-buttons.compact .filter-btn.active {
  background: var(--c-primary-alpha-20);
  border-color: var(--c-primary-alpha-40);
  color: var(--c-primary);
}
.date-range { display: flex; flex-direction: column; align-items: stretch; gap: 8px; }
.date-row { display: flex; align-items: center; gap: 10px; }
.date-row .date-label { flex-shrink: 0; width: 52px; }
.date-input {
  flex: 1;
  min-width: 0;
  height: 30px;
  background: var(--c-bg-input);
  border: 1px solid var(--c-border-default);
  border-radius: 8px;
  color: var(--c-text-body);
  padding: 0 10px;
  color-scheme: dark;
  font-family: 'RobotoMono', monospace;
  font-size: 12px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
.date-input:focus {
  outline: none;
  border-color: var(--c-primary);
  box-shadow: 0 0 0 3px var(--c-primary-alpha-20);
}
.date-label { color: var(--c-text-muted); font-size: 12px; }
.clear-btn { padding: 0 10px; font-family: 'RobotoMono', monospace; font-size: 12px; }
.panel-hint { font-size: 12px; color: #e3b061; }
.mobile-only { display: none; }

/* ===== 记录列表：时间线布局 ===== */
.record-list {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
/* 连续时间轴竖线（仅有记录时绘制） */
.record-list.has-items::before {
  content: '';
  position: absolute;
  top: 12px;
  bottom: 12px;
  left: 81px;
  width: 1px;
  background: var(--c-border-hover);
}

.record-item {
  position: relative;
  display: flex;
  gap: 22px;
  animation: record-in 0.45s ease backwards;
}
/* 时间轴节点圆点，锚定在竖线上（挂在 item 上避免被卡片 overflow 裁剪） */
.record-item::after {
  content: '';
  position: absolute;
  left: 76.5px;
  top: 30px;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--c-bg-l1);
  border: 2px solid var(--c-text-label);
  box-sizing: border-box;
  transition: border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
}
.record-item:hover::after {
  background: var(--c-primary);
  border-color: var(--c-primary);
  box-shadow: 0 0 10px var(--c-primary-alpha-60);
}
@keyframes record-in {
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
}

/* 时间线日期列 */
.record-rail {
  flex-shrink: 0;
  width: 70px;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
  text-align: right;
}
.rail-day {
  font-family: 'RobotoMono', monospace;
  font-size: 26px;
  font-weight: 700;
  line-height: 1.1;
  color: var(--c-text-emphasis);
  font-variant-numeric: tabular-nums;
  transition: color 0.2s ease;
}
.rail-month {
  font-family: 'RobotoMono', monospace;
  font-size: 11px;
  letter-spacing: 2px;
  color: var(--c-text-muted);
}
.record-item:hover .rail-day { color: var(--c-primary); }

/* 记录卡片 */
.record-body {
  position: relative;
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  background: var(--c-bg-l2);
  border: 1px solid var(--c-border-default);
  border-radius: 12px;
  padding: 18px 22px;
  box-shadow: 0 4px 16px var(--c-shadow-light);
  overflow: hidden;
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
}
.record-item:hover .record-body {
  transform: translateY(-2px);
  border-color: var(--c-primary-alpha-40);
  box-shadow: 0 10px 28px var(--c-shadow-medium), 0 0 20px var(--c-primary-alpha-10);
}
.record-item:active .record-body { transform: translateY(0); }

.record-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin: 0 0 10px;
}
.record-title {
  flex: 1;
  min-width: 0;
  color: var(--c-text-title);
  font-size: 19px;
  font-weight: 600;
  line-height: 1.5;
  margin: 0;
  font-family: 'MotivaTitle', 'SourceHanSansSC', sans-serif;
  transition: color 0.25s ease;
}
.record-item:hover .record-title { color: var(--c-primary); }
.record-arrow {
  flex-shrink: 0;
  color: var(--c-primary);
  font-size: 16px;
  line-height: 1.7;
  opacity: 0;
  transform: translateX(-6px);
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.record-item:hover .record-arrow { opacity: 1; transform: translateX(0); }

.record-item.clickable { cursor: pointer; }
.record-excerpt {
  font-size: 14px;
  color: var(--c-text-body-alt);
  line-height: 1.8;
  font-family: 'SourceHanSansSC', sans-serif;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

/* 卡片底部元信息行 */
.record-footer {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 14px;
  padding-top: 12px;
  border-top: 1px solid var(--c-border-default);
}
.tag { display: inline-flex; align-items: center; font-size: 12px; }
.tag-date {
  color: var(--c-text-muted);
  pointer-events: none;
  font-family: 'RobotoMono', monospace;
  font-variant-numeric: tabular-nums;
}
.tag-cat {
  display: inline-flex;
  align-items: center;
  padding: 2px 10px;
  font-size: 12px;
  line-height: 1.5;
  border-radius: 999px;
  color: var(--c-primary);
  background: var(--c-primary-alpha-10);
  border: 1px solid var(--c-primary-alpha-20);
  white-space: nowrap;
  pointer-events: none;
  font-family: 'SourceHanSansSC', sans-serif;
}

/* ===== 空状态 ===== */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  background: var(--c-bg-l2);
  border: 1px dashed var(--c-border-hover);
  border-radius: 12px;
  padding: 56px 24px;
  text-align: center;
  animation: record-in 0.3s ease backwards;
}
.empty-icon { opacity: 0.5; margin-bottom: 4px; }
.empty-icon img { display: block; filter: brightness(0) invert(0.63); }
.empty-title {
  color: var(--c-text-title);
  font-size: 16px;
  font-weight: 600;
  font-family: 'SourceHanSansSC', sans-serif;
}
.empty-desc { color: var(--c-text-muted); font-size: 13px; margin-bottom: 8px; }
.empty-clear { border: 1px solid var(--c-border-hover); height: 32px; }

/* ===== 统计卡片 + 热力图（主题色透明度阶梯，随设置联动） ===== */
.stats-card { padding: 16px; }
.stats-row {
  display: flex;
  justify-content: space-around;
  padding: 6px 0 10px;
}
.stats-divider {
  height: 1px;
  background: var(--c-border-default);
  margin: 6px 0 12px;
}
.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.stat-num {
  font-size: 26px;
  font-weight: 700;
  color: var(--c-text-title);
  font-family: 'RobotoMono', monospace;
  font-variant-numeric: tabular-nums;
  line-height: 1.2;
}
.stat-label {
  font-size: 12px;
  color: var(--c-text-muted);
  letter-spacing: 2px;
  margin-top: 4px;
  font-family: 'SourceHanSansSC', sans-serif;
}

.heatmap-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.heatmap-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--c-text-muted);
  font-size: 13px;
  margin-bottom: 4px;
}
.heatmap-nav {
  background: transparent;
  border: none;
  color: var(--c-text-muted);
  cursor: pointer;
  padding: 2px 8px;
  font-weight: bold;
  border-radius: 6px;
  line-height: 1.2;
  transition: color 0.2s ease, background 0.2s ease;
}
.heatmap-nav:hover {
  background: var(--c-primary-alpha-10);
  color: var(--c-primary);
}
.heatmap-year {
  font-family: 'RobotoMono', monospace;
  color: var(--c-text-body-alt);
  font-variant-numeric: tabular-nums;
}
.heatmap-grid {
  display: grid;
  grid-template-columns: repeat(13, 1fr);
  gap: 3px;
}
.week-box {
  aspect-ratio: 1;
  background: #21262d;
  border-radius: 3px;
  transition: background 0.2s;
}
.intensity-0 { background: #21262d; }
.intensity-1 { background: var(--c-primary-alpha-20); }
.intensity-2 { background: var(--c-primary-alpha-40); }
.intensity-3 { background: var(--c-primary-alpha-60); }
.intensity-4 { background: var(--c-primary); box-shadow: 0 0 6px var(--c-primary-alpha-50); }

/* ===== 移动端适配 ===== */
@media (max-width: 768px) {
  .page-records { padding: 32px 20px 48px; }
  .content-2col { flex-direction: column; gap: 0; }
  .col-left, .col-right { width: 100%; }
  .col-right { position: static; top: auto; }
  .section-header { margin-bottom: 28px; align-items: center; }
  .section-header h2 { font-size: 24px; letter-spacing: 2px; }

  /* 时间线收起为行内日期，隐藏竖线与圆点 */
  .record-list.has-items::before { display: none; }
  .record-item { flex-direction: column; gap: 6px; }
  .record-rail {
    width: auto;
    padding-top: 0;
    flex-direction: row;
    align-items: baseline;
    gap: 8px;
    text-align: left;
  }
  .rail-day { font-size: 15px; }
  .rail-month { font-size: 11px; }
  .record-item::after { display: none; }
  .record-body { padding: 16px 18px; }

  /* 移动端无悬浮态，箭头常显以提示可点击 */
  .record-arrow { opacity: 0.6; transform: none; }

  /* 移动端筛选按钮 */
  .filter-toggle.mobile-only {
    display: inline-flex;
    width: 40px;
    height: 40px;
    padding: 0;
    font-size: 0;
    border: 1px solid var(--c-border-default);
    border-radius: 10px;
    background: var(--c-bg-l2);
    color: var(--c-text-body-alt);
    flex-shrink: 0;
  }
  .filter-toggle.mobile-only::before {
    content: '☰';
    font-size: 16px;
  }
  .filter-toggle.mobile-only:hover {
    color: var(--c-primary);
    border-color: var(--c-primary-alpha-40);
    background: var(--c-bg-l2);
  }

  /* 移动端筛选抽屉 */
  .filters-panel.mobile-sheet {
    position: fixed;
    top: 80px;
    right: 0;
    height: calc(100dvh - 80px);
    min-height: calc(100vh - 80px);
    max-height: none;
    width: fit-content;
    max-width: 80vw;
    padding: 20px;
    background: rgba(19, 19, 20, 0.98);
    border-left: 1px solid var(--c-border-default);
    box-shadow: -8px 0 32px rgba(0, 0, 0, 0.36);
    transform: translateX(100%);
    transition: transform 0.3s ease;
    z-index: 2000;
    display: block;
    overflow-y: auto;
  }
  .filters-panel.mobile-sheet.active { transform: translateX(0); }
  .sheet-mask.mobile-only {
    display: block;
    position: fixed;
    top: 80px;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.42);
    backdrop-filter: blur(4px);
    z-index: 1900;
  }
}

@media (prefers-reduced-motion: reduce) {
  .record-item,
  .empty-state { animation: none; }
}
</style>
