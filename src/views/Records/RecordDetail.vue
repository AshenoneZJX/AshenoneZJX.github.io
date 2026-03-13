<template>
  <div class="container page-record-detail">
    <div v-if="record">
      <!-- 上容器：顶部工具栏 -->
      <div class="top-actions-row">
        <!-- 移动端：目录切换按钮 -->
        <button class="toc-toggle-btn" @click="showMobileToc = !showMobileToc">
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
          <span style="margin-left: 4px; display: none;">目录</span>
        </button>

        <div class="header-placeholder"></div>
        <div class="header-info">
          <div class="top-title" v-if="heading">{{ heading }}</div>
          <div class="meta">
            <span class="month">{{ monthAbbr(record.date) }}</span>
            <span class="day">{{ dayOfMonth(record.date) }}</span>
            <span class="year">{{ yearOf(record.date) }}</span>
            <span class="cat">{{ record.category }}</span>
          </div>
        </div>
        <router-link to="/records" class="back-btn">
          <img src="@/assets/images/fanhui.svg" class="back-icon" alt="返回" />
          <span class="back-text">返回</span>
        </router-link>
      </div>

      <!-- 下容器：内容布局 -->
      <div class="main-layout">
        <!-- 移动端：遮罩层 -->
        <div class="mobile-overlay" v-if="showMobileToc" @click="showMobileToc = false"></div>

        <!-- 左侧边栏：固定显示大纲 -->
        <aside class="left-sidebar" :class="{ 'mobile-open': showMobileToc }">
          <div class="sidebar-title">大纲</div>
          <ArticleCatalog 
            ref="catalog" 
            container-selector=".content" 
            @toc-click="showMobileToc = false" 
          />
        </aside>

        <!-- 中间内容区 -->
        <main class="center-content">
          <div class="detail-body">
            <div ref="contentRef" class="content" v-html="displayHtml"></div>
          </div>
        </main>

        <!-- 右侧边栏：占位，无内容 -->
        <aside class="right-sidebar"></aside>
      </div>
    </div>
    <div v-else class="not-found">
      <p>抱歉，没有找到该日志。</p>
    </div>
  </div>
</template>

<script>
import records from '@/data/records/records.js'
import MarkdownIt from 'markdown-it'
import ArticleCatalog from '@/components/Shared/ArticleCatalog.vue'

const MONTHS = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']

export default {
  name: 'RecordDetail',
  components: {
    ArticleCatalog
  },
  data() {
    return {
      record: null,
      heading: '',
      displayHtml: '',
      showMobileToc: false
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
    yearOf(d) {
      const dt = new Date(d)
      return dt.getFullYear()
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
      
      this.$nextTick(() => {
        if (this.$refs.catalog) this.$refs.catalog.refresh()
      })
    }
  },
  created() {
    const id = String(this.$route.params.id)
    this.record = records.find(r => String(r.id) === id) || null
    this.prepareContent()
  },
  mounted() {
    if (this.$refs.catalog) this.$refs.catalog.refresh()
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
@font-face {
  font-family: 'MotivaSans';
  src: url('~@/assets/fonts/MotivaSans-Regular_woff.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

.page-record-detail { 
  padding: 0;
  margin: 0;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}

.toc-toggle-btn {
  display: none;
  background: transparent;
  border: 1px solid #38424e;
  color: #c7d5e0;
  padding: 6px 12px;
  cursor: pointer;
  align-items: center;
  border-radius: 6px;
  margin-right: 12px;
}

.mobile-overlay {
  display: none;
}

/* 顶部操作行样式 */
.top-actions-row {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 20px 20px;
  min-height: 32px;
  max-width: 100%;
  margin: 0 auto 0;
  border-bottom: 1px solid #2a475e;
}

.header-placeholder {
  width: 20%;
  margin-right: 0;
  flex-shrink: 0;
}

.header-info {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  gap: 12px;
  flex-wrap: wrap;
}

.title-row { display: flex; align-items: flex-start; margin: 0 0 10px; }
.title-row .back-btn { margin-left: auto; }
.back-btn { background: transparent; border: none; color: #c7d5e0; padding: 6px 12px; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; border-radius: 6px; margin-left: auto; }
.back-icon {
  width: 16px;
  height: 16px;
  display: block;
}
.back-btn:hover { color: #e6f3ff; background: rgba(102,192,244,0.12); }

.top-title { color: #ffffff; font-size: 30px; line-height: 1.4; margin: 0; font-weight: 400; letter-spacing: 1.5px; text-shadow: 0 2px 4px rgba(0,0,0,0.5); font-family: 'SourceHanSansSC', sans-serif; }
.meta {
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 0;
}
.month { color: #8f98a0; font-size: 12px; }
.day { color: #66c0f4; font-size: 20px; font-weight: bold; font-family: 'RobotoMono', Menlo, Monaco, Consolas, "Courier New", monospace; }
.year { color: #8f98a0; font-size: 12px; }
.cat { color: #ffffff; font-size: 12px; display: inline-block; padding: 2px 8px; border: 1px solid #38424e; border-radius: 6px; background: rgba(102,192,244,0.12); font-family: 'RobotoMono', monospace; }
.content-divider { height: 1px; background: #38424e; margin: 8px 0 14px; }

/* 布局相关：三栏 Grid */
.main-layout {
  display: grid;
  grid-template-columns: 20% minmax(0, 1fr) 20%;
  gap: 0;
  position: relative;
  align-items: start;
  max-width: 100%;
  margin: 0;
  padding: 0 20px;
}

.left-sidebar {
  position: sticky;
  top: 80px;
  background: transparent;
  padding: 20px 0 20px 20px;
  min-height: 200px;
}

.sidebar-title {
  color: #ffffff;
  font-size: 17px;
  font-weight: 700;
  margin-bottom: 12px;
  padding-bottom: 8px;
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
  border-left: 1px solid #2a475e;
  padding-left: 0;
}

/* 目录样式 */
/* 已封装到 ArticleCatalog 组件中 */


/* 内容卡片区域：半透明黑色背景、内边距、边框和圆角，用于包裹正文内容 */
.detail-body { 
  background: rgba(0,0,0,0.2); /* 20% 透明度的黑色背景，使下方暗色主题更沉浸 */
  padding: 40px;   /* 上下 40px、左右 40px 的内边距 */
  border: none; /* 移除边框 */
  border-radius: 6px;        /* 6px 圆角，柔和视觉，避免生硬矩形 */
}

.content { color: #cfe0ee; font-size: 16px; line-height: 1.9; overflow-wrap: anywhere; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; }
.content :deep(p) { color: #cfe0ee; line-height: 1.9; margin: 12px 0; font-size: 16px; font-weight: 400; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; }
.content :deep(h1) { color: #ffffff; font-size: 28px; line-height: 1.35; margin: 18px 0 12px; font-weight: 700; letter-spacing: 0.3px; }
.content :deep(h2) { color: #66c0f4; font-size: 22px; line-height: 1.25; margin: 16px 0 10px; font-weight: 700; letter-spacing: 0.2px; }
.content :deep(h2)::before { content: "¶"; display: inline-block; margin-right: 8px; color: #66c0f4; font-weight: 700; }
.content :deep(h3) { color: #d9e9f7; font-size: 18px; line-height: 1.2; margin: 14px 0 8px; font-weight: 700; letter-spacing: 0.1px; }
.content :deep(h4), .content :deep(h5), .content :deep(h6) { color: #cfe0ee; font-size: 14px; line-height: 1.9; margin: 12px 0; font-weight: 400; }
.content :deep(a) { color: #66c0f4; text-decoration: none; }
.content :deep(a:hover) { text-decoration: underline; }
.content :deep(ul), .content :deep(ol) { margin: 12px 0 12px 0; padding-left: 28px; }
.content :deep(ol) { font-family: 'RobotoMono', Menlo, Monaco, Consolas, "Courier New", monospace; }
.content :deep(li) { margin: 6px 0; line-height: 1.85; color: #cfe0ee; font-size: 16px; font-weight: 400; padding-left: 6px; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; }
.content :deep(ul) :deep(li) { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; }
.content :deep(hr) { border: none; height: 1px; background: #2a475e; margin: 18px 0; }
.content :deep(code) { background: #1b2838; border: 1px solid #38424e; padding: 2px 6px; border-radius: 4px; color: #e6f3ff; font-family: 'RobotoMono', Menlo, Monaco, Consolas, "Courier New", monospace; font-size: 13px; }
.content :deep(pre) { background: #0f1b2a; border: 1px solid #38424e; border-radius: 6px; padding: 12px; overflow: auto; font-family: 'RobotoMono', Menlo, Monaco, Consolas, "Courier New", monospace; }
.content :deep(pre code) { background: transparent; border: none; padding: 0; font-size: 13px; font-family: 'RobotoMono', Menlo, Monaco, Consolas, "Courier New", monospace; }
.content :deep(table) { width: 100%; border-collapse: collapse; border: 1px solid #38424e; margin: 14px 0; font-size: 14px; }
.content :deep(th), .content :deep(td) { border: 1px solid #38424e; padding: 6px 8px; text-align: left; line-height: 2; vertical-align: top; }
.content :deep(th) { background: #223447; color: #e6f3ff; font-weight: 600; }
.content :deep(tr) { background: transparent; }
.content :deep(blockquote) { border-left: 4px solid #66c0f4; background: rgba(27,40,56,0.5); padding: 10px 14px; margin: 12px 0; color: #cfe0ee; border-radius: 4px; }
.content :deep(img) { max-width: 100%; height: auto; display: block; margin: 12px auto; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.35); border: 1px solid #38424e; }
.not-found { color: #8f98a0; }

/* 响应式调整：当宽度不足以容纳三栏时（例如 < 1200px），隐藏右侧占位栏 */
@media (max-width: 1200px) {
  .main-layout {
    grid-template-columns: 25% minmax(0, 1fr);
  }
  .header-placeholder {
    width: 25%;
  }
  .right-sidebar {
    display: none;
  }
}

@media (max-width: 768px) {
  .main-layout {
    display: block;
    padding: 0;
  }
  
  /* Show toggle button */
  .toc-toggle-btn {
    display: flex;
  }
  
  /* Hide right sidebar and placeholder */
  .right-sidebar, .header-placeholder {
    display: none !important;
  }

  /* Mobile Sidebar (Slide-out) */
  .left-sidebar {
    display: block !important;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 26%;
    background: #1b2838;
    z-index: 2000;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    padding: 20px;
    overflow-y: auto;
    box-shadow: 2px 0 12px rgba(0,0,0,0.5);
    border-right: 1px solid #2a475e;
  }
  
  .left-sidebar.mobile-open {
    transform: translateX(0);
  }

  .mobile-overlay {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.6);
    z-index: 1900;
    backdrop-filter: blur(2px);
  }
  
  /* Adjust detail body for full width */
  .detail-body { 
    padding: 20px; 
    border-radius: 0;
    margin: 0;
  }

  /* Back button text hidden on mobile */
  .back-text { display: none; }
  .back-btn { padding: 6px; }
  
  /* Mobile Title Adjustment */
  .top-title { font-size: 20px; letter-spacing: 0.5px; }

  .content { font-size: 16px; line-height: 1.8; }
  .content :deep(p) { font-size: 16px; line-height: 1.8; }
  .content :deep(li) { font-size: 16px; line-height: 1.8; }
  .content :deep(h1) { font-size: 24px; margin: 16px 0 10px; }
  .content :deep(h2) { font-size: 22px; margin: 14px 0 8px; }
  .content :deep(h3) { font-size: 18px; line-height: 1.2; font-weight: 700; }
  .content :deep(table) { display: block; overflow-x: auto; -webkit-overflow-scrolling: touch; }
  .content :deep(th), .content :deep(td) { white-space: nowrap; }
  .content :deep(pre) { padding: 10px; }
}
</style>