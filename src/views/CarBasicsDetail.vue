<template>
  <div class="container page-car-basics-detail">
    <div v-if="article">
      <div class="top-actions">
        <button
          class="toc-toggle"
          @click="toggleToc"
          :aria-label="tocCollapsed ? '展开大纲' : '折叠大纲'"
          :title="tocCollapsed ? '展开大纲' : '折叠大纲'"
        >
          <span
            class="arrow-icon"
            :class="tocCollapsed ? 'arrow-open' : 'arrow-close'"
            :title="tocCollapsed ? '展开大纲' : '折叠大纲'"
          ></span>
          <span class="toc-label">{{ tocCollapsed ? '展开大纲' : '折叠大纲' }}</span>
        </button>
        <router-link to="/mySpace/car-basics" class="back-btn">返回列表</router-link>
      </div>
      <div class="detail-layout" :class="{ 'toc-hidden': tocCollapsed }">
        <aside class="toc-sidebar">
          <div class="toc-overview" v-show="!tocCollapsed">Overview</div>
          <div class="toc-list" v-show="!tocCollapsed">
            <div class="toc-section" v-for="sec in toc" :key="sec.id">
              <button class="toc-h2" @click="toggle(sec.id)">
                <span class="caret" :class="{ open: !sec.collapsed }"></span>
                <span class="toc-text">{{ sec.text }}</span>
              </button>
              <div class="toc-h3-list" v-show="!sec.collapsed">
                <button class="toc-h3" v-for="it in sec.children" :key="it.id" @click="scrollTo(it.id)">{{ it.text }}</button>
              </div>
            </div>
          </div>
        </aside>
      <div class="detail-body">
          <div ref="contentRef" class="content" v-html="displayHtml"></div>
      </div>
      </div>
    </div>

    <div v-else class="not-found">
      <p>抱歉，没有找到该内容。</p>
    </div>
  </div>
</template>

<script>
import carBasics from '@/data/carBasics'
import MarkdownIt from 'markdown-it'

export default {
  name: 'CarBasicsDetail',
  data() {
    return {
      article: null,
      toc: [],
      tocCollapsed: false,
      displayHtml: ''
    }
  },
  methods: {
    toggleToc() {
      this.tocCollapsed = !this.tocCollapsed
    },
    toggle(id) {
      const sec = this.toc.find(s => s.id === id)
      if (sec) sec.collapsed = !sec.collapsed
    },
    scrollTo(id) {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    },
    buildToc() {
      const root = this.$refs.contentRef
      if (!root) return
      const used = {}
      const makeId = (text) => {
        const base = String(text).toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '').slice(0, 64) || 'section'
        let id = base
        let i = 1
        while (used[id]) { id = `${base}-${i++}` }
        used[id] = true
        return id
      }
      const nodes = Array.from(root.querySelectorAll('h2, h3'))
      const toc = []
      let current = null
      nodes.forEach(n => {
        const text = n.textContent.trim()
        if (n.tagName.toLowerCase() === 'h2') {
          const id = makeId(text)
          n.id = id
          current = { id, text, children: [], collapsed: true }
          toc.push(current)
        } else if (n.tagName.toLowerCase() === 'h3') {
          const id = makeId(text)
          n.id = id
          if (current) current.children.push({ id, text })
        }
      })
      this.toc = toc
    },
    loadMathJax() {
      return new Promise(resolve => {
        if (window.MathJax) { resolve(); return }
        window.MathJax = {
          tex: { inlineMath: [['$', '$'], ['\\(', '\\)']] },
          options: { skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code'] },
          startup: { typeset: false }
        }
        const s = document.createElement('script')
        s.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js'
        s.async = true
        s.onload = () => resolve()
        document.head.appendChild(s)
      })
    },
    typesetMath() {
      if (!this.$refs.contentRef) return
      if (window.MathJax && window.MathJax.typesetPromise) {
        window.MathJax.typesetPromise([this.$refs.contentRef]).catch(() => {})
      }
    },
    prepareContent() {
      const md = new MarkdownIt({ html: true, linkify: true, breaks: false })
      const source = this.article && this.article.content ? this.article.content : (this.article ? this.article.html || '' : '')
      this.displayHtml = source ? md.render(source) : ''
    }
  },
  created() {
    const id = String(this.$route.params.id)
    this.article = carBasics.find(r => String(r.id) === id) || null
    this.prepareContent()
    this.$nextTick(async () => {
      this.buildToc()
      await this.loadMathJax()
      this.typesetMath()
    })
  },
  mounted() {
    this.buildToc()
    this.loadMathJax().then(() => this.typesetMath())
  }
}
</script>

<style scoped>
.page-car-basics-detail { padding-top: 20px; }
.back-btn { background: transparent; border: none; color: #c7d5e0; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; height: 28px; padding: 0 10px; font-size: 12px; border-radius: 6px; }
.back-btn:hover { color: #e6f3ff; background: rgba(102,192,244,0.12); }
.top-actions { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 14px; padding-bottom: 10px; border-bottom: 1px solid #38424e; }
.detail-layout {
  display: grid;
  grid-template-columns: 140px minmax(0, 1fr);
  gap: 16px;
  position: relative;
}
.detail-layout.toc-hidden { grid-template-columns: 1fr; }
.detail-layout.toc-hidden .toc-sidebar { display: none; }
.toc-sidebar {
  position: sticky;
  top: 80px;
  align-self: start;
  border: none;
  background: transparent;
  border-radius: 0;
  padding: 0;
}
.toc-toggle {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: none;
  cursor: pointer;
  height: 32px;
  padding: 0 12px;
  border-radius: 6px;
}
.toc-toggle:hover { background: rgba(102,192,244,0.12); }
.arrow-icon {
  width: 20px;
  height: 20px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 18px 18px;
  display: inline-block;
  margin: 0;
}
.arrow-open { background-image: url(~@/assets/images/zhankai.svg); }
.arrow-close { background-image: url(~@/assets/images/zhedie.svg); }
.back-btn {
  height: 32px;
  padding: 0 12px;
  font-size: 13px;
}
.toc-label { color: #c7d5e0; font-size: 13px; }
.toc-overview {
  color: #c7d5e0;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.4px;
  margin-bottom: 6px;
}
.toc-list { display: flex; flex-direction: column; gap: 4px; }
.toc-section { display: flex; flex-direction: column; }
.toc-h2 {
  display: flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: none;
  color: #8f98a0;
  padding: 6px 0;
  cursor: pointer;
  text-align: left;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.3px;
  text-transform: uppercase;
}
.toc-h2:hover { color: #c7d5e0; }
.caret {
  width: 0; height: 0;
  border-left: 5px solid #8f98a0;
  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
  transform: rotate(-90deg);
  transition: transform 0.15s;
}
.caret.open { transform: rotate(0deg); }
.toc-text { flex: 1; font-size: 12px; }
.toc-h3-list { display: flex; flex-direction: column; margin: 4px 0 10px 16px; gap: 2px; }
.toc-h3 {
  background: transparent;
  border: none;
  color: #c7d5e0;
  text-align: left;
  padding: 4px 0;
  cursor: pointer;
  font-size: 12px;
  font-weight: 400;
}
.toc-h3:hover { color: #66c0f4; }
.detail-body { background: rgba(0,0,0,0.2); padding: 24px; border: 1px solid #38424e; border-radius: 6px; min-width: 0; }
/* 文章分类标签样式 */
.cat {
  background: rgba(102,192,244,0.16); /* 背景色：半透明蓝色 */
  color: #e6f3ff;                   /* 文字色：淡蓝白 */
  border: 1px solid rgba(103,193,245,0.50); /* 边框：半透明蓝色 */
  border-radius: 9999px;            /* 圆角：胶囊形状 */
  padding: 4px 14px;                /* 内边距：上下4px，左右14px */
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.06); /* 内阴影：轻微高光 */
  font-size: 12px;                  /* 字号：12px */
}

.content { color: #cfe0ee; font-size: 14px; line-height: 1.9; overflow-wrap: anywhere; font-family: "Times New Roman", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans CJK SC", "Source Han Sans SC", sans-serif; }
.content :deep(p) { color: #cfe0ee; line-height: 1.9; margin: 12px 0; font-size: 14px; font-weight: 400; }
.content :deep(h1) { color: #ffffff; font-size: 28px; line-height: 1.35; margin: 18px 0 14px; padding-bottom: 8px; border-bottom: 1px solid #38424e; font-weight: 700; letter-spacing: 0.3px; }
.content :deep(h2) { color: #66c0f4; font-size: 22px; line-height: 1.25; margin: 16px 0 10px; font-weight: 700; letter-spacing: 0.2px; }
.content :deep(h2)::before { content: "¶"; display: inline-block; margin-right: 8px; color: #66c0f4; font-weight: 700; }
.content :deep(h3) { color: #d9e9f7; font-size: 18px; line-height: 1.2; margin: 14px 0 8px; font-weight: 700; letter-spacing: 0.1px; }
.content :deep(h4), .content :deep(h5), .content :deep(h6) { color: #cfe0ee; font-size: 14px; line-height: 1.9; margin: 12px 0; font-weight: 400; }
.content :deep(a) { color: #66c0f4; text-decoration: none; }
.content :deep(a:hover) { text-decoration: underline; }
.content :deep(ul), .content :deep(ol) { margin: 12px 0 12px 0; padding-left: 22px; }
.content :deep(li) { margin: 6px 0; line-height: 1.85; color: #cfe0ee; font-size: 14px; font-weight: 400; }
.content :deep(hr) { border: none; height: 1px; background: #2a475e; margin: 18px 0; }
.content :deep(code) { background: #1b2838; border: 1px solid #38424e; padding: 2px 6px; border-radius: 4px; color: #e6f3ff; font-family: "Times New Roman", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans CJK SC", "Source Han Sans SC", serif; font-size: 13px; }
.content :deep(pre) { background: #0f1b2a; border: 1px solid #38424e; border-radius: 6px; padding: 12px; overflow: auto; font-family: "Times New Roman", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans CJK SC", "Source Han Sans SC", serif; }
.content :deep(pre code) { background: transparent; border: none; padding: 0; font-size: 13px; font-family: "Times New Roman", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans CJK SC", "Source Han Sans SC", serif; }
.content :deep(table) { width: 100%; border-collapse: collapse; border: 1px solid #38424e; margin: 14px 0; }
.content :deep(th), .content :deep(td) { border: 1px solid #38424e; padding: 10px 12px; text-align: left; }
.content :deep(th) { background: #223447; color: #e6f3ff; font-weight: 600; }
.content :deep(tr:nth-child(even)) { background: rgba(34,52,71,0.35); }
.content :deep(blockquote) { border-left: 4px solid #66c0f4; background: rgba(27,40,56,0.5); padding: 10px 14px; margin: 12px 0; color: #cfe0ee; border-radius: 4px; }
.content :deep(img) { max-width: 100%; height: auto; display: block; margin: 12px auto; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.35); border: 1px solid #38424e; }
.content :deep(.mjx-container) { color: #cfe0ee; background: rgba(27,40,56,0.5); border: 1px solid #38424e; border-radius: 6px; padding: 2px 6px; display: inline-block; margin: 0 2px; }
.content :deep(.mjx-container[display="true"]) { display: block; padding: 10px 12px; margin: 10px 0; }
.not-found { color: #8f98a0; }

/* 移动端适配：当视口宽度 ≤ 768px 时生效 */
@media (max-width: 768px) {
  /* 目录与正文不再左右分栏，改为上下堆叠 */
  .detail-layout { grid-template-columns: 1fr; }
  
  /* 目录侧边栏取消粘性定位，随文档流滚动 */
  .toc-sidebar { position: relative; top: 0; }
  
  /* 正文区域减少内边距，保证小屏可用空间 */
  .detail-body { padding: 16px; border-radius: 6px; }
  
  /* 基础字号略调小，行高更紧凑，提升阅读效率 */
  .content { font-size: 14px; line-height: 1.85; }
  
  /* 逐级缩小标题字号，保持层级清晰 */
  .content :deep(h1) { font-size: 24px; line-height: 1.3; margin: 16px 0 10px; }
  .content :deep(h2) { font-size: 20px; line-height: 1.25; margin: 14px 0 8px; }
  .content :deep(h3) { font-size: 18px; line-height: 1.2; font-weight: 700; }
  
  /* 表格横向可滚动，避免内容溢出撑破布局 */
  .content :deep(table) { display: block; overflow-x: auto; -webkit-overflow-scrolling: touch; }
  
  /* 表头与单元格禁止换行，保持表格整齐 */
  .content :deep(th), .content :deep(td) { white-space: nowrap; }
  
  /* 代码块减少内边距，节省横向空间 */
  .content :deep(pre) { padding: 10px; }
}
</style>
