<template>
  <div class="container page-record-detail">
    <div class="section-header">
      <div class="actions">
        <router-link to="/records" class="back-btn">返回列表</router-link>
      </div>
    </div>

    <div v-if="record" class="detail-body">
      <div class="top-title" v-if="heading">{{ heading }}</div>
      <div class="meta">
        <span class="month">{{ monthAbbr(record.date) }}</span>
        <span class="day">{{ dayOfMonth(record.date) }}</span>
        <span class="cat">{{ record.category }}</span>
      </div>
      <div class="content-divider"></div>
      <div class="content" v-html="displayHtml"></div>
    </div>

    <div v-else class="not-found">
      <p>抱歉，没有找到该日志。</p>
    </div>
  </div>
</template>

<script>
import records from '@/data/records'
import MarkdownIt from 'markdown-it'

const MONTHS = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']

export default {
  name: 'RecordDetail',
  data() {
    return {
      record: null,
      heading: '',
      displayHtml: ''
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
    },
    prepareContent() {
      if (!this.record || !this.record.html) {
        this.heading = ''
        this.displayHtml = ''
        return
      }
      const md = new MarkdownIt({
        html: true,
        linkify: true,
        breaks: false
      })
      const sourceHtml = this.record.content ? md.render(this.record.content) : this.record.html
      const tmp = document.createElement('div')
      tmp.innerHTML = sourceHtml
      const h1 = tmp.querySelector('h1')
      if (h1) {
        this.heading = h1.textContent.trim()
        h1.remove()
      } else {
        this.heading = ''
      }
      this.displayHtml = tmp.innerHTML
    }
  },
  created() {
    const id = String(this.$route.params.id)
    this.record = records.find(r => String(r.id) === id) || null
    this.prepareContent()
  }
}
</script>

<style scoped>
.page-record-detail { padding-top: 20px; }

.section-header {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  border-bottom: 1px solid #38424e;
  padding-bottom: 10px;
  margin-bottom: 20px;
}
.actions .back-btn { background: transparent; border: none; color: #c7d5e0; padding: 6px 12px; cursor: pointer; text-decoration: none; display: inline-block; border-radius: 6px; }
.actions .back-btn:hover { color: #e6f3ff; background: rgba(102,192,244,0.12); }

.detail-body { background: rgba(0,0,0,0.2); padding: 24px; max-width: 860px; margin: 0 auto; border: 1px solid #38424e; border-radius: 6px; }
.top-title { color: #ffffff; font-size: 28px; line-height: 1.35; margin: 0 0 10px; font-weight: 700; letter-spacing: 0.3px; }
.meta {
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 10px;
}
.month { color: #8f98a0; font-size: 12px; }
.day { color: #66c0f4; font-size: 20px; font-weight: bold; }
.cat { color: #8f98a0; font-size: 12px; }
.content-divider { height: 1px; background: #38424e; margin: 8px 0 14px; }

.content { color: #cfe0ee; font-size: 14px; line-height: 1.9; overflow-wrap: anywhere; font-family: "Times New Roman", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans CJK SC", "Source Han Sans SC", sans-serif; }
.content :deep(p) { color: #cfe0ee; line-height: 1.9; margin: 12px 0; font-size: 14px; font-weight: 400; }
.content :deep(h1) { color: #ffffff; font-size: 28px; line-height: 1.35; margin: 18px 0 12px; font-weight: 700; letter-spacing: 0.3px; }
.content :deep(h2) { color: #66c0f4; font-size: 22px; line-height: 1.25; margin: 16px 0 10px; font-weight: 700; letter-spacing: 0.2px; }
.content :deep(h2)::before { content: "¶"; display: inline-block; margin-right: 8px; color: #66c0f4; font-weight: 700; }
.content :deep(h3) { color: #d9e9f7; font-size: 18px; line-height: 1.2; margin: 14px 0 8px; font-weight: 700; letter-spacing: 0.1px; }
.content :deep(h4), .content :deep(h5), .content :deep(h6) { color: #cfe0ee; font-size: 14px; line-height: 1.9; margin: 12px 0; font-weight: 400; }
.content :deep(a) { color: #66c0f4; text-decoration: none; }
.content :deep(a:hover) { text-decoration: underline; }
.content :deep(ul), .content :deep(ol) { margin: 12px 0 12px 0; padding-left: 22px; }
.content :deep(li) { margin: 6px 0; line-height: 1.85; color: #cfe0ee; font-size: 14px; font-weight: 400; }
.content :deep(hr) { border: none; height: 1px; background: #2a475e; margin: 18px 0; }
.content :deep(code) { background: #1b2838; border: 1px solid #38424e; padding: 2px 6px; border-radius: 4px; color: #e6f3ff; font-family: Menlo, Monaco, Consolas, "Courier New", monospace; font-size: 13px; }
.content :deep(pre) { background: #0f1b2a; border: 1px solid #38424e; border-radius: 6px; padding: 12px; overflow: auto; font-family: Menlo, Monaco, Consolas, "Courier New", monospace; }
.content :deep(pre code) { background: transparent; border: none; padding: 0; font-size: 13px; font-family: Menlo, Monaco, Consolas, "Courier New", monospace; }
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
  .content :deep(h3) { font-size: 18px; line-height: 1.2; font-weight: 700; }
  .content :deep(table) { display: block; overflow-x: auto; -webkit-overflow-scrolling: touch; }
  .content :deep(th), .content :deep(td) { white-space: nowrap; }
  .content :deep(pre) { padding: 10px; }
}
</style>
