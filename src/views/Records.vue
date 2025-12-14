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
        <span v-for="cat in categories" :key="cat" :class="{ active: activeCategory === cat }" @click="setCategory(cat)">{{ cat }}</span>
      </div>
    </div>

    <div class="record-list">

      <div class="record-item clickable" v-for="rec in filteredRecords" :key="rec.id" @click="goDetail(rec)">
        <div class="record-date-box">
          <span class="month">{{ monthAbbr(rec.date) }}</span>
          <span class="day">{{ dayOfMonth(rec.date) }}</span>
        </div>
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

.filters span {
  margin-left: 12px;
  cursor: pointer;
  font-size: 14px;
}
.filters span:hover, .filters span.active { color: #fff; }

.filters { display: flex; align-items: center; }
.filter-icon { display: inline-flex; align-items: center; color: #66c0f4; margin-right: 10px; }

/* 列表布局核心 */
.record-list { display: flex; flex-direction: column; gap: 8px; }

.record-item {
  display: flex;
  background: rgba(0, 0, 0, 0.2);
  padding: 15px;
  transition: background 0.2s;
}
.record-item:hover { background: #222b35; }

.record-date-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 60px;
  margin-right: 20px;
  border-right: 1px solid #38424e;
  padding-right: 15px;
}
.month { color: #8f98a0; font-size: 12px; }
.day { color: #66c0f4; font-size: 24px; font-weight: bold; }

.record-title { color: #ffffff; font-size: 20px; font-weight: 600; margin-bottom: 4px; }
.record-tags { display: flex; gap: 8px; flex-wrap: wrap; margin: 6px 0 10px; }
.tag { display: inline-block; padding: 2px 8px; border-radius: 2px; font-size: 12px; border: 1px solid #3c4551; color: #c7d5e0; background: rgba(102,192,244,0.12); }
.tag-title { border-color: #66c0f4; color: #ffffff; background: rgba(102,192,244,0.18); }
.tag-date { border-color: #a1cf70; color: #a1cf70; background: rgba(161,207,112,0.12); }
.tag-cat { border-color: #c7d5e0; color: #c7d5e0; background: rgba(199,213,224,0.10); }
.record-item.clickable { cursor: pointer; }
.record-excerpt { font-size: 13px; color: #8f98a0; }
/* 
.todo-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 10px;
  color: #8f98a0;
  font-size: 14px;
}

.todo-list label {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.todo-list input[type="checkbox"] {
  accent-color: #66c0f4;
} */
</style>
