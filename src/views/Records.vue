<!--
功能：展示所有日志记录
- 从本地 records 数据渲染记录列表
- 每个记录项包含日期、标题、分类及摘要
- 点击记录项可跳转至详情页
-->

<template>
  <div class="container page-records">
    <div class="section-header">
      <h2>日志记录</h2>
      <button class="filter-btn filter-toggle mobile-only" @click="toggleFilters">筛选</button>
    </div>

    <div class="content-2col">
      <div class="record-list col-left">
        <div class="record-item clickable" v-for="rec in filteredRecords" :key="rec.id" @click="goDetail(rec)">
          <div class="record-title">{{ rec.title }}</div>
          <div class="record-divider"></div>
          <div class="record-tags">
            <span class="tag tag-date">{{ formatYMD(rec.date) }}</span>
            <span class="tag tag-cat">{{ rec.category }}</span>
          </div>
          <div class="record-excerpt">
            {{ rec.excerpt || toExcerpt(rec.content) }}
          </div>
        </div>
      </div>
      <aside class="filters-panel col-right mobile-sheet" :class="{ active: filterOpen }">
        <div class="panel-header">
          <span class="filter-icon" aria-hidden="true">
            <img :src="filterIcon" width="16" height="16" alt="">
          </span>
          <span class="panel-title">筛选</span>
          <div class="panel-actions">
            <button class="filter-btn clear-btn" @click="clearDateFilters">清除所有筛选</button>
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
          <div class="panel-buttons">
            <button
              v-for="y in uniqueYears"
              :key="y"
              class="filter-btn"
              :class="{ active: dateMode === 'year' && filterYear === y }"
              @click="setYear(y)"
            >{{ y }}</button>
          </div>
        </div>
        <div class="panel-section">
          <div class="panel-buttons">
            <button class="filter-btn" :class="{ active: dateMode === 'thisMonth' }" @click="setThisMonth">筛选本月</button>
          </div>
        </div>
      </aside>
      <div v-if="filterOpen" class="sheet-mask mobile-only" @click="closeFilters"></div>
    </div>
  </div>
</template>

<script>
import records from '@/data/records'
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
      filterOpen: false
    }
  },
  computed: {
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
  methods: {
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
@font-face {
  font-family: "RobotoVar";
  src: url("~@/assets/fonts/Roboto-VariableFont_wdth,wght.ttf") format("truetype");
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
  unicode-range: U+0030-0039, U+0041-005A, U+0061-007A;
}
.page-records { padding-top: 20px; font-family: "RobotoVar", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans CJK SC", "Source Han Sans SC", sans-serif; }

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: 1px solid #38424e;
  padding-bottom: 10px;
  margin-bottom: 20px;
}
.section-header h2 { font-weight: 400; }

.filters { display: flex; align-items: center; flex-wrap: nowrap; white-space: nowrap; }
.filter-icon { display: inline-flex; align-items: center; color: #66c0f4; margin-right: 14px; pointer-events: none; }
.filter-icon img { width: 16px; height: 16px; display: block; }
.filter-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 26px;
  padding: 0 14px;
  border-radius: 6px;
  border: none;
  background: transparent;
  color: #c7d5e0;
  font-size: 13px;
  margin: 0;
  cursor: pointer;
}
.filter-btn:hover { background: rgba(102,192,244,0.12); color: #e6f3ff; }
.filter-btn.active { background: rgba(102,192,244,0.22); color: #ffffff; }

.filters::-webkit-scrollbar { display: none; }

.content-2col { display: flex; gap: 16px; }
.col-left { width: 70%; }
.col-right { width: 30%; }

.filters-panel {
  display: flex;
  flex-direction: column;
  gap: 14px;
  background: transparent;
  border: none;
  border-radius: 8px;
  padding: 0 12px;
}
.panel-header { display: flex; align-items: center; gap: 8px; color: #c7d5e0; }
.panel-actions { margin-left: auto; display: flex; align-items: center; }
.panel-title { font-size: 16px; color: #8f98a0; }
.panel-section { display: flex; flex-direction: column; gap: 8px; }
.panel-subtitle { font-size: 13px; color: #8f98a0; display: block; background: transparent; padding: 2px 0; border-bottom: 1px solid #38424e; }
.panel-buttons { display: flex; flex-wrap: wrap; column-gap: 8px; row-gap: 2px; }
.panel-buttons.compact { flex-wrap: nowrap; gap: 6px; white-space: nowrap; overflow-x: auto; }
.panel-buttons.compact::-webkit-scrollbar { display: none; }
.panel-buttons.compact .filter-btn { height: 24px; padding: 0 10px; font-size: 12px; }
.date-range { display: flex; flex-direction: column; align-items: flex-start; gap: 8px; }
.date-row { display: flex; align-items: center; gap: 8px; }
.date-input {
  height: 28px;
  background: transparent;
  border: 1px solid #3c4551;
  border-radius: 6px;
  color: #c7d5e0;
  padding: 0 8px;
}
.date-sep { color: #8f98a0; }
.date-label { color: #8f98a0; font-size: 12px; }
.clear-btn { padding: 0 10px; }
.panel-hint { font-size: 12px; color: #d7a05f; }
.panel-header { background: transparent; padding: 8px 0; border-bottom: 1px solid #38424e; }
.mobile-only { display: none; }

@media (max-width: 768px) {
  .content-2col { flex-direction: column; }
  .col-left, .col-right { width: 100%; }
  .filter-toggle.mobile-only { display: inline-flex; }
  .filter-toggle.mobile-only {
    font-size: 14px;
    border: 1px solid #3c4551;
    border-radius: 6px;
    padding: 0 16px;
    height: 30px;
  }
  .filter-toggle.mobile-only:hover {
    background: rgba(102,192,244,0.12);
    color: #e6f3ff;
    border-color: #66c0f4;
  }
  .filters-panel.mobile-sheet {
    position: fixed;
    top: 0;
    right: 0;
    height: 100%;
    width: 50%;
    max-width: 360px;
    padding: 12px 14px;
    background: #0f1a24;
    box-shadow: -10px 0 24px rgba(0,0,0,0.45);
    transform: translateX(100%);
    transition: transform 0.25s ease;
    z-index: 1001;
  }
  .filters-panel.mobile-sheet.active { transform: translateX(0); }
  .sheet-mask.mobile-only {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.4);
    z-index: 1000;
  }
}

/* 列表布局核心 */
.record-list { display: flex; flex-direction: column; gap: 8px; }

.record-item {
  display: flex;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.2);
  padding: 15px;
  border: 1px solid #3c4551;
  border-radius: 8px;
  transition: background 0.2s, border-color 0.2s, box-shadow 0.2s;
}
.record-item:hover { 
  background: #1b2838; 
  border-color: #66c0f4; 
  box-shadow: 0 8px 20px rgba(0,0,0,0.35), 0 0 0 2px rgba(102,192,244,0.35);
}

.month { color: #8f98a0; font-size: 12px; }
.day { color: #66c0f4; font-size: 24px; font-weight: bold; }

.record-title { color: #66c0f4; font-size: 20px; font-weight: 600; }
.record-divider { height: 1px; background: #38424e; margin: 8px 10px 10px; }

/* 标签容器：水平排列，自动换行，上下间距 */
.record-tags { display: flex; gap: 8px; flex-wrap: wrap; margin: 0 0 10px; }

/* 基础标签样式：圆角、边框、淡蓝背景 */
.tag { display: inline-flex; align-items: center; padding: 4px 10px; border-radius: 2px; font-size: 12px; border: 1px solid #3c4551; color: #c7d5e0; background: rgba(102,192,244,0.50); }
/* 标题标签：高亮边框与背景 */
.tag-title { border-color: #66c0f4; color: #ffffff; background: rgba(102,192,244,0.18); }

/* 日期标签：无背景无边框，仅文字 */
.tag-date {
  background: transparent;
  border: none;
  padding: 0;
  color: #c7d5e0;
  pointer-events: none; /* 禁止鼠标事件 */
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-variant-numeric: tabular-nums;
}

/* 分类标签：胶囊形、毛玻璃效果、内阴影 */
.tag-cat {
  background: rgba(102,192,244,0.16);
  color: #e6f3ff;
  border-radius: 6px;
  padding: 2px 12px;
  backdrop-filter: blur(6px); /* 背景模糊 */
  -webkit-backdrop-filter: blur(6px);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.06); /* 顶部内阴影 */
  pointer-events: none; /* 禁止鼠标事件 */
}
.record-item.clickable { cursor: pointer; }
.record-excerpt { font-size: 13px; color: #8f98a0; }
</style>
