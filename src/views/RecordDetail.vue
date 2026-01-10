<template>
  <div class="container page-record-detail">
    <div class="section-header">
      <h2>{{ record ? record.title : '记录未找到' }}</h2>
      <div class="actions">
        <router-link to="/records" class="back-btn">返回列表</router-link>
      </div>
    </div>

    <div v-if="record" class="detail-body">
      <div class="meta">
        <span class="month">{{ monthAbbr(record.date) }}</span>
        <span class="day">{{ dayOfMonth(record.date) }}</span>
        <span class="cat">{{ record.category }}</span>
      </div>
      <div class="content" v-html="record.html"></div>
    </div>

    <div v-else class="not-found">
      <p>抱歉，没有找到该日志。</p>
    </div>
  </div>
</template>

<script>
import records from '@/data/records'

const MONTHS = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']

export default {
  name: 'RecordDetail',
  data() {
    return {
      record: null
    }
  },
  computed: {},
  methods: {
    monthAbbr(d) {
      const dt = new Date(d)
      return MONTHS[dt.getMonth()]
    },
    dayOfMonth(d) {
      const dt = new Date(d)
      return dt.getDate()
    }
  },
  created() {
    const id = String(this.$route.params.id)
    this.record = records.find(r => String(r.id) === id) || null
  }
}
</script>

<style scoped>
.page-record-detail { padding-top: 20px; }

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: 1px solid #38424e;
  padding-bottom: 10px;
  margin-bottom: 20px;
}
.actions .back-btn { background: #2a475e; border: 1px solid #3c4551; color: #c7d5e0; padding: 6px 12px; cursor: pointer; text-decoration: none; display: inline-block; }
.actions .back-btn:hover { color: #fff; border-color: #66c0f4; }

.detail-body { background: rgba(0,0,0,0.2); padding: 24px; max-width: 860px; margin: 0 auto; border: 1px solid #38424e; border-radius: 6px; }
.meta {
  display: flex;
  align-items: baseline;
  gap: 12px;
  border-bottom: 1px solid #38424e;
  padding-bottom: 10px;
  margin-bottom: 15px;
}
.month { color: #8f98a0; font-size: 12px; }
.day { color: #66c0f4; font-size: 20px; font-weight: bold; }
.cat { color: #8f98a0; font-size: 12px; }

.content { color: #cfe0ee; font-size: 15px; line-height: 1.9; }
.content :deep(p) { color: #cfe0ee; line-height: 1.9; margin: 12px 0; }
.content :deep(h1) { color: #ffffff; font-size: 28px; line-height: 1.25; margin: 18px 0 12px; font-weight: 700; letter-spacing: 0.3px; }
.content :deep(h2) { color: #e8f2fb; font-size: 24px; line-height: 1.3; margin: 16px 0 10px; font-weight: 700; letter-spacing: 0.2px; }
.content :deep(h3) { color: #d9e9f7; font-size: 20px; line-height: 1.35; margin: 14px 0 8px; font-weight: 600; letter-spacing: 0.1px; }
.content :deep(h4) { color: #d0e0ee; font-size: 17px; line-height: 1.4; margin: 12px 0 6px; font-weight: 600; }
.content :deep(h5), .content :deep(h6) { color: #c7d5e0; font-size: 15px; line-height: 1.5; margin: 10px 0 6px; font-weight: 600; }
.content :deep(a) { color: #66c0f4; text-decoration: none; }
.content :deep(a:hover) { text-decoration: underline; }
.content :deep(ul), .content :deep(ol) { margin: 12px 0 12px 0; padding-left: 22px; }
.content :deep(li) { margin: 6px 0; line-height: 1.85; color: #cfe0ee; }
.content :deep(hr) { border: none; height: 1px; background: #2a475e; margin: 18px 0; }
.content :deep(code) { background: #1b2838; border: 1px solid #38424e; padding: 2px 6px; border-radius: 4px; color: #e6f3ff; font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; font-size: 13px; }
.content :deep(pre) { background: #0f1b2a; border: 1px solid #38424e; border-radius: 6px; padding: 12px; overflow: auto; }
.content :deep(pre code) { background: transparent; border: none; padding: 0; font-size: 13px; }
.content :deep(table) { width: 100%; border-collapse: collapse; border: 1px solid #38424e; margin: 14px 0; }
.content :deep(th), .content :deep(td) { border: 1px solid #38424e; padding: 10px 12px; text-align: left; }
.content :deep(th) { background: #223447; color: #e6f3ff; font-weight: 600; }
.content :deep(tr:nth-child(even)) { background: rgba(34,52,71,0.35); }
.content :deep(blockquote) { border-left: 4px solid #66c0f4; background: rgba(27,40,56,0.5); padding: 10px 14px; margin: 12px 0; color: #cfe0ee; border-radius: 4px; }
.content :deep(img) { max-width: 100%; height: auto; display: block; margin: 12px auto; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.35); border: 1px solid #38424e; }

.not-found { color: #8f98a0; }

@media (max-width: 768px) {
  .detail-body { padding: 16px; border-radius: 6px; }
  .content { font-size: 14px; line-height: 1.85; }
  .content :deep(h1) { font-size: 24px; margin: 16px 0 10px; }
  .content :deep(h2) { font-size: 20px; margin: 14px 0 8px; }
  .content :deep(h3) { font-size: 18px; }
  .content :deep(table) { display: block; overflow-x: auto; -webkit-overflow-scrolling: touch; }
  .content :deep(th), .content :deep(td) { white-space: nowrap; }
  .content :deep(pre) { padding: 10px; }
}
</style>
