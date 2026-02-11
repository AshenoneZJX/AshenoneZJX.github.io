<!-- 
 汽车基础知识详情页：
    左侧目录
    中间 Markdown 渲染内容
    右侧占位栏
    支持 MathJax 公式与响应式布局
-->

<template>
  <div class="container page-car-basics-detail">
    <div v-if="article">
      <!-- 顶部操作行：独占一行 -->
      <div class="top-actions-row">
        <div class="spacer"></div>
        <router-link to="/mySpace/car-basics" class="back-btn">返回列表</router-link>
      </div>

      <div class="main-layout">
        <!-- 左侧边栏：固定显示大纲 -->
        <aside class="left-sidebar">
          <div class="sidebar-title">大纲</div>
          
          <div class="toc-list">
            <div class="toc-section" v-for="sec in toc" :key="sec.id">
              <button class="toc-h2" @click="toggle(sec.id)">
                <span v-if="sec.children && sec.children.length > 0" class="caret" :class="{ open: !sec.collapsed }"></span>
                <span v-else class="caret-placeholder"></span>
                <span class="toc-text">{{ sec.text }}</span>
              </button>
              <div class="toc-h3-list" v-show="!sec.collapsed && sec.children && sec.children.length > 0">
                <button class="toc-h3" v-for="it in sec.children" :key="it.id" @click="scrollTo(it.id)">{{ it.text }}</button>
              </div>
            </div>
          </div>
        </aside>

        <!-- 中间内容区 -->
        <main class="center-content">
          <div class="detail-body">
            <div class="title-row">
              <div class="top-title" v-if="heading">{{ heading }}</div>
            </div>
            <div class="content-divider"></div>
            <div ref="contentRef" class="content" v-html="displayHtml"></div>
          </div>
        </main>

        <!-- 右侧边栏：占位，无内容 -->
        <aside class="right-sidebar"></aside>
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
      displayHtml: '',
      heading: ''
    }
  },
  methods: {
    toggle(id) {
      const sec = this.toc.find(s => s.id === id)
      if (sec) {
        // 如果没有子标题，点击直接滚动到该位置
        if (!sec.children || sec.children.length === 0) {
          this.scrollTo(sec.id)
        } else {
          sec.collapsed = !sec.collapsed
        }
      }
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
      if (!this.article) {
        this.heading = ''
        this.displayHtml = ''
        return
      }
      const md = new MarkdownIt({ html: true, linkify: true, breaks: false })
      // 优先使用 content 重新渲染，以便统一处理 H1
      const source = this.article.content || ''
      const sourceHtml = source ? md.render(source) : (this.article.html || '')
      
      const tmp = document.createElement('div')
      tmp.innerHTML = sourceHtml
      const h1 = tmp.querySelector('h1')
      if (h1) {
        this.heading = h1.textContent.trim()
        h1.remove()
      } else {
        this.heading = this.article.title || ''
      }
      this.displayHtml = tmp.innerHTML
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
@font-face {
  font-family: 'SourceHanSansSC';
  src: url('~@/assets/fonts/SourceHanSansSC-Regular-2.otf') format('opentype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'RobotoMono';
  src: url('~@/assets/fonts/RobotoMono-VariableFont_wght.ttf') format('truetype');
  font-weight: 100 900;
  font-display: swap;
}

.page-car-basics-detail { 
  padding-top: 20px;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  padding-left: 20px;
  padding-right: 20px;
}

/* 顶部操作行 */
.top-actions-row {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  padding: 0 10px;
  min-height: 32px;
}

.spacer {
  flex: 1; 
}

.back-btn { 
  background: transparent; 
  border: none; 
  color: #c7d5e0; 
  padding: 6px 12px; 
  cursor: pointer; 
  text-decoration: none; 
  display: inline-block; 
  border-radius: 6px; 
}
.back-btn:hover { 
  color: #e6f3ff; 
  background: rgba(102,192,244,0.12); 
}

/* 布局相关：三栏 Grid */
.main-layout {
  display: grid;
  grid-template-columns: 200px minmax(0, 1fr) 200px;
  gap: 16px;
  position: relative;
  align-items: start;
}

.left-sidebar {
  position: sticky;
  top: 80px;
  background: transparent;
  padding: 0;
  min-height: 200px;
}

.sidebar-title {
  color: #66c0f4;
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 2px solid #38424e;
  letter-spacing: 0.5px;
  font-family: 'SourceHanSansSC', sans-serif;
}

.right-sidebar {
  position: sticky;
  top: 80px;
  min-height: 200px;
  background: transparent; 
}

.center-content {
  min-width: 0;
}

/* 目录样式 */
.toc-list { display: flex; flex-direction: column; gap: 4px; }
.toc-section { display: flex; flex-direction: column; }
.toc-h2 {
  display: flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: none;
  color: #ffffff;
  padding: 6px 0;
  cursor: pointer;
  text-align: left;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.3px;
  text-transform: uppercase;
  width: 100%;
  font-family: 'SourceHanSansSC', sans-serif;
}
.toc-h2:hover { color: #66c0f4; text-decoration: underline; }
.caret {
  width: 0; height: 0;
  border-left: 5px solid #ffffff;
  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
  transform: rotate(-90deg);
  transition: transform 0.15s;
}
.caret.open { transform: rotate(0deg); }
.caret-placeholder {
  width: 5px;
  height: 10px;
  display: inline-block;
  margin-right: 0;
}
.toc-text { flex: 1; font-size: 15px; }
.toc-h3-list { display: flex; flex-direction: column; margin: 4px 0 10px 16px; gap: 2px; }
.toc-h3 {
  background: transparent;
  border: none;
  color: #c7d5e0;
  text-align: left;
  padding: 4px 0;
  cursor: pointer;
  font-size: 13px;
  font-weight: 400;
  width: 100%;
  font-family: 'SourceHanSansSC', sans-serif;
}
.toc-h3:hover { color: #66c0f4; text-decoration: underline; }

/* 内容主体 */
.detail-body { background: rgba(0,0,0,0.2); padding: 24px; border: 1px solid #38424e; border-radius: 6px; min-width: 0; }

.title-row { display: flex; align-items: flex-start; margin: 0 0 10px; }
.top-title { color: #ffffff; font-size: 28px; line-height: 1.35; margin: 0; font-weight: 700; letter-spacing: 0.3px; }

.content-divider { height: 1px; background: #38424e; margin: 8px 0 14px; }

.content { color: #cfe0ee; font-size: 16px; line-height: 1.9; overflow-wrap: anywhere; font-family: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans CJK SC", "Source Han Sans SC", sans-serif; }
.content :deep(p) { color: #cfe0ee; line-height: 1.9; margin: 12px 0; font-size: 16px; font-weight: 400; }
.content :deep(h1) { color: #ffffff; font-size: 28px; line-height: 1.35; margin: 18px 0 12px; font-weight: 700; letter-spacing: 0.3px; }
.content :deep(h2) { color: #66c0f4; font-size: 22px; line-height: 1.25; margin: 16px 0 10px; font-weight: 700; letter-spacing: 0.2px; }
.content :deep(h2)::before { content: "¶"; display: inline-block; margin-right: 8px; color: #66c0f4; font-weight: 700; }
.content :deep(h3) { color: #d9e9f7; font-size: 18px; line-height: 1.2; margin: 14px 0 8px; font-weight: 700; letter-spacing: 0.1px; }
.content :deep(h4), .content :deep(h5), .content :deep(h6) { color: #cfe0ee; font-size: 14px; line-height: 1.9; margin: 12px 0; font-weight: 400; }
.content :deep(a) { color: #66c0f4; text-decoration: none; }
.content :deep(a:hover) { text-decoration: underline; }
.content :deep(ul), .content :deep(ol) { margin: 12px 0 12px 0; padding-left: 28px; }
.content :deep(ol) { font-family: 'RobotoMono', Menlo, Monaco, Consolas, "Courier New", monospace; }
.content :deep(li) { margin: 6px 0; line-height: 1.85; color: #cfe0ee; font-size: 16px; font-weight: 400; padding-left: 6px; font-family: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans CJK SC", "Source Han Sans SC", sans-serif; }
.content :deep(ul) :deep(li) { font-family: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans CJK SC", "Source Han Sans SC", sans-serif; }
.content :deep(hr) { border: none; height: 1px; background: #2a475e; margin: 18px 0; }
.content :deep(code) { background: #1b2838; border: 1px solid #38424e; padding: 2px 6px; border-radius: 4px; color: #e6f3ff; font-family: 'RobotoMono', Menlo, Monaco, Consolas, "Courier New", monospace; font-size: 13px; }
.content :deep(pre) { background: #0f1b2a; border: 1px solid #38424e; border-radius: 6px; padding: 12px; overflow: auto; font-family: 'RobotoMono', Menlo, Monaco, Consolas, "Courier New", monospace; }
.content :deep(pre code) { background: transparent; border: none; padding: 0; font-size: 13px; font-family: 'RobotoMono', Menlo, Monaco, Consolas, "Courier New", monospace; }
.content :deep(table) { width: 100%; border-collapse: collapse; border: 1px solid #38424e; margin: 14px 0; font-size: 14px; }
.content :deep(th), .content :deep(td) { border: 1px solid #38424e; padding: 6px 8px; text-align: left; line-height: 3; }
.content :deep(th) { background: #223447; color: #e6f3ff; font-weight: 600; }
.content :deep(tr:nth-child(even)) { background: rgba(34,52,71,0.35); }
.content :deep(blockquote) { border-left: 4px solid #66c0f4; background: rgba(27,40,56,0.5); padding: 10px 14px; margin: 12px 0; color: #cfe0ee; border-radius: 4px; }
.content :deep(img) { max-width: 100%; height: auto; display: block; margin: 12px auto; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.35); border: 1px solid #38424e; }
.content :deep(.mjx-container) { color: #cfe0ee; background: rgba(27,40,56,0.5); border: 1px solid #38424e; border-radius: 6px; padding: 2px 6px; display: inline-block; margin: 0 2px; }
.content :deep(.mjx-container[display="true"]) { display: block; padding: 10px 12px; margin: 10px 0; }
.not-found { color: #8f98a0; }

/* 响应式调整：当宽度不足以容纳三栏时（例如 < 1200px），隐藏右侧占位栏 */
@media (max-width: 1200px) {
  .main-layout {
    grid-template-columns: 200px minmax(0, 1fr);
  }
  .right-sidebar {
    display: none;
  }
}

/* 移动端适配 */
@media (max-width: 768px) {
  .main-layout {
    display: block;
  }
  .left-sidebar, .right-sidebar {
    display: none !important;
  }
  
  .detail-body { padding: 16px; border-radius: 6px; }
  
  .content { font-size: 17px; line-height: 2.0; }
  .content :deep(p) { font-size: 17px; line-height: 2.0; }
  .content :deep(li) { font-size: 17px; line-height: 2.0; }
  .content :deep(h1) { font-size: 24px; margin: 16px 0 10px; }
  .content :deep(h2) { font-size: 20px; margin: 14px 0 8px; }
  .content :deep(h3) { font-size: 18px; line-height: 1.2; font-weight: 700; }
  .content :deep(table) { display: block; overflow-x: auto; -webkit-overflow-scrolling: touch; }
  .content :deep(th), .content :deep(td) { white-space: nowrap; }
  .content :deep(pre) { padding: 10px; }
}
</style>
