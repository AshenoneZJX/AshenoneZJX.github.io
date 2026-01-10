<!--
功能：展示所有日志记录
- 从本地 records 数据渲染记录列表
- 每个记录项包含日期、标题、分类及摘要
- 点击记录项可跳转至详情页
-->

<template>
  <div class="container page-records">
    <div class="section-header">
      <h2>Activity Log</h2>
      <div class="filters">
        <span class="filter-icon" aria-hidden="true">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M3 5h18l-7 8v5l-4 3v-8z"/></svg>
        </span>
        <button
          v-for="cat in categories"
          :key="cat"
          class="filter-btn"
          :class="{ active: activeCategory === cat }"
          @click="setCategory(cat)"
        >{{ cat }}</button>
      </div>
    </div>

    <div class="record-list">

      <div class="record-item clickable" v-for="rec in filteredRecords" :key="rec.id" @click="goDetail(rec)">
        <div class="record-content">
          <div class="record-title">{{ rec.title }}</div>
          <div class="record-tags">
            <span class="tag tag-date">{{ formatYMD(rec.date) }}</span>
            <span class="tag tag-cat">{{ rec.category }}</span>
          </div>
          <div class="record-excerpt">
            {{ rec.excerpt || toExcerpt(rec.content) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import records from '@/data/records'

const MONTHS = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']

export default {
  name: 'Records',
  data() {
    return {
      records,
      activeCategory: 'All'
    }
  },
  computed: {
    
    // 从记录中提取所有分类，并添加“All”选项供筛选
    categories() {
      const set = new Set(this.records.map(r => r.category))
      return ['All', ...Array.from(set)]
    },
    filteredRecords() {
      if (this.activeCategory === 'All') return this.records
      return this.records.filter(r => r.category === this.activeCategory)
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
    }
  }
}
</script>

<style scoped>
.page-records { padding-top: 20px; }

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: 1px solid #38424e;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

.filters { display: flex; align-items: center; flex-wrap: nowrap; white-space: nowrap; }
.filter-icon { display: inline-flex; align-items: center; color: #66c0f4; margin-right: 10px; pointer-events: none; }
.filter-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 26px;
  padding: 0 14px;
  border-radius: 0px;
  border: 1px solid #3c4551;
  background: #263545;
  color: #c7d5e0;
  font-size: 13px;
  margin: 0;
  cursor: pointer;
}
.filter-btn:hover { background: #2e4156; color: #e6f3ff; }
.filter-btn.active { background: #3b5f76; border-color: #66c0f4; color: #ffffff; }

.filters::-webkit-scrollbar { display: none; }

/* 列表布局核心 */
.record-list { display: flex; flex-direction: column; gap: 8px; }

.record-item {
  display: flex;
  background: rgba(0, 0, 0, 0.2);
  padding: 15px;
  transition: background 0.2s;
}
.record-item:hover { background: #222b35; }

.month { color: #8f98a0; font-size: 12px; }
.day { color: #66c0f4; font-size: 24px; font-weight: bold; }

.record-title { color: #66c0f4; font-size: 20px; font-weight: 600; margin-bottom: 4px; }
.record-tags { display: flex; gap: 8px; flex-wrap: wrap; margin: 6px 0 10px; }
.tag { display: inline-flex; align-items: center; padding: 4px 10px; border-radius: 2px; font-size: 12px; border: 1px solid #3c4551; color: #c7d5e0; background: rgba(102,192,244,0.10); }
.tag-title { border-color: #66c0f4; color: #ffffff; background: rgba(102,192,244,0.18); }
.tag-date {
  background: transparent;
  border: none;
  padding: 0;
  color: #c7d5e0;
  pointer-events: none;
}
.tag-cat {
  background: rgba(102,192,244,0.16);
  color: #e6f3ff;
  border: 1px solid rgba(103,193,245,0.50);
  border-radius: 9999px;
  padding: 4px 14px;
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.06);
  pointer-events: none;
}
.record-item.clickable { cursor: pointer; }
.record-excerpt { font-size: 13px; color: #8f98a0; }
</style>
