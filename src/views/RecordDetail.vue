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

.detail-body {
  background: rgba(0, 0, 0, 0.2);
  padding: 20px;
}
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

.content p { color: #c7d5e0; line-height: 1.8; margin: 10px 0; }
.content :deep(h1), .content :deep(h2), .content :deep(h3) { color: #ffffff; }
.content :deep(a) { color: #66c0f4; }

.not-found { color: #8f98a0; }
</style>
