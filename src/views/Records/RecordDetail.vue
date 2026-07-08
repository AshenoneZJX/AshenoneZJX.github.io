<template>
  <div class="container page-record-detail">
    <div v-if="record">
      <div class="main-layout">
        <!-- 移动端：遮罩层 -->
        <div class="mobile-overlay" v-if="showMobileToc" @click="showMobileToc = false"></div>

        <!-- 左侧边栏：固定显示目录 -->
        <aside class="sidebar" :class="{ 'mobile-open': showMobileToc }">
          <div class="outline-panel">
            <div class="sidebar-title">标题</div>
            <ArticleCatalog 
              ref="catalog" 
              container-selector=".content" 
              @toc-click="showMobileToc = false" 
            />
          </div>
        </aside>

        <div class="top-actions-row">
          <div class="header-top-row">
            <button class="toc-toggle-btn" @click="showMobileToc = !showMobileToc">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
              <span style="margin-left: 4px; display: none;">目录</span>
            </button>
            <button class="back-btn" @click="$router.push('/records')">
              <img src="@/assets/images/fanhui.svg" class="back-icon" alt="返回" />
              <span class="back-text">返回</span>
            </button>
          </div>
          <div class="header-info">
            <div class="top-title" v-if="heading">{{ heading }}</div>
            <div class="meta">
              <span class="date-group">
                <span class="month">{{ monthAbbr(record.date) }}</span>
                <span class="day">{{ dayOfMonth(record.date) }}</span>
                <span class="year">{{ yearOf(record.date) }}</span>
              </span>
              <span class="tag tag-cat">{{ record.category }}</span>
            </div>
          </div>
        </div>

        <!-- 中间内容区 -->
        <main class="center-content">
          <div class="detail-body">
            <MarkdownViewer 
              v-if="record"
              :content="record.content" 
              :html="record.html" 
              @heading-extracted="h => heading = h || (record ? record.title : '')" 
              @content-updated="refreshCatalog"
            />
          </div>
          <div class="post-nav">
            <button
              type="button"
              class="nav-card prev"
              :class="{ disabled: !prevRecord }"
              :disabled="!prevRecord"
              @click="goToRecord(prevRecord)"
            >
              <div class="nav-label">上一篇</div>
              <div class="nav-title">{{ prevRecord ? prevRecord.title : '没有上一篇了' }}</div>
            </button>
            <button
              type="button"
              class="nav-card next"
              :class="{ disabled: !nextRecord }"
              :disabled="!nextRecord"
              @click="goToRecord(nextRecord)"
            >
              <div class="nav-label">下一篇</div>
              <div class="nav-title">{{ nextRecord ? nextRecord.title : '没有下一篇了' }}</div>
            </button>
          </div>
        </main>

        <!-- 右侧边栏：占位，无内容 -->
        <aside class="right-sidebar"></aside>
      </div>
    </div>
    <div v-else class="not-found">
      <p>抱歉，没有找到该日志。</p>
    </div>
    <button class="back-top" :class="{ show: showBackTop }" @click="scrollToTop" aria-label="回到顶部">↑</button>
  </div>
</template>

<script>
import records from '@/data/records/records.js'
import ArticleCatalog from '@/components/Shared/ArticleCatalog.vue'
import MarkdownViewer from '@/components/Shared/MarkdownViewer.vue'

const MONTHS = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']

export default {
  name: 'RecordDetail',
  components: {
    ArticleCatalog,
    MarkdownViewer
  },
  data() {
    return {
      record: null,
      heading: '',
      showMobileToc: false,
      showBackTop: false
    }
  },
  computed: {
    currentIndex() {
      return records.findIndex(r => this.record && String(r.id) === String(this.record.id))
    },
    prevRecord() {
      return this.currentIndex >= 0 ? records[this.currentIndex + 1] || null : null
    },
    nextRecord() {
      return this.currentIndex > 0 ? records[this.currentIndex - 1] || null : null
    }
  },
  methods: {
    loadRecord() {
      const id = String(this.$route.params.id)
      this.record = records.find(r => String(r.id) === id) || null
      this.heading = this.record ? this.record.title : ''
      this.showMobileToc = false
    },
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
    refreshCatalog() {
      if (this.$refs.catalog) this.$refs.catalog.refresh()
    },
    goToRecord(targetRecord) {
      if (!targetRecord) return
      this.$router.push(`/records/${targetRecord.id}`)
    },
    handleWindowScroll() {
      this.showBackTop = window.scrollY > 300
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  },
  created() {
    this.loadRecord()
  },
  mounted() {
    this.refreshCatalog()
    window.addEventListener('scroll', this.handleWindowScroll, { passive: true })
    this.handleWindowScroll()
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleWindowScroll)
  },
  watch: {
    '$route.params.id'() {
      this.loadRecord()
      this.$nextTick(() => {
        window.scrollTo({ top: 0, behavior: 'auto' })
      })
    }
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
@font-face {
  font-family: 'Georgia';
  src: url('~@/assets/fonts/Georgia.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

.page-record-detail { 
  --rd-bg: var(--c-bg-l0);
  --rd-surface: #1e1e1e;
  --rd-surface-solid: #1e1e1e;
  --rd-surface-soft: #252525;
  --rd-border: #2a2a2a;
  --rd-border-strong: #363636;
  --rd-text: #e0e0e0;
  --rd-text-secondary: #909399;
  --rd-text-muted: #606266;
  --rd-accent: #66b1ff;
  --rd-accent-strong: #8cc5ff;
  --rd-accent-soft: rgba(102, 177, 255, 0.14);
  --rd-code-bg: #282c34;
  --rd-quote-bg: #252525;
  --rd-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
  --rd-shadow-soft: 0 8px 24px rgba(0, 0, 0, 0.22);
  position: relative;
  padding: 60px 20px 60px;
  margin: 0 auto;
  width: 100%;
  max-width: 1100px;
  box-sizing: border-box;
  min-height: 100vh;
  background: var(--rd-bg);
}

.page-record-detail::before {
  content: none;
}

.page-record-detail > div,
.not-found {
  position: relative;
  z-index: 1;
}

.toc-toggle-btn {
  display: none;
  width: 40px;
  height: 40px;
  padding: 0;
  border-radius: 8px;
  border: 1px solid var(--rd-border);
  background: var(--rd-surface);
  color: var(--rd-text-secondary);
  cursor: pointer;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: color 0.2s ease, border-color 0.2s ease;
}

.toc-toggle-btn:hover {
  color: var(--rd-accent-strong);
  border-color: rgba(102, 177, 255, 0.32);
}

.mobile-overlay {
  display: none;
}

/* 顶部操作行样式 */
.top-actions-row {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0;
  justify-content: flex-start;
  padding: 0;
  width: 100%;
  box-sizing: border-box;
  min-height: 0;
  max-width: 100%;
  margin: 0 0 28px;
  border: none;
  border-radius: 0;
  background: transparent;
  backdrop-filter: none;
  box-shadow: none;
  position: static;
  top: auto;
  z-index: auto;
}

.header-top-row {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  margin-bottom: 12px;
}

.header-top-row .toc-toggle-btn {
  margin-right: auto;
}

.header-placeholder {
  width: 0;
  margin-right: 0;
  flex-shrink: 0;
}

.header-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 0;
  flex: 1;
  min-width: 0;
  padding: 0;
  margin-left: 0;
}

.title-row { display: flex; align-items: flex-start; margin: 0 0 10px; }

.top-title {
  color: var(--rd-text);
  font-size: 36px;
  line-height: 1.4;
  margin: 0 0 20px;
  font-weight: 600;
  letter-spacing: 0;
  font-family: 'SourceHanSansSC', sans-serif;
}

.meta {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 0;
  flex-wrap: wrap;
  color: var(--rd-text-secondary);
  font-size: 14px;
}

.date-group {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0;
  border-radius: 0;
  background: transparent;
  border: none;
}

.date-group::before {
  content: '发布于';
  color: var(--rd-text-secondary);
}

.month {
  color: var(--rd-text-secondary);
  font-size: 14px;
  letter-spacing: 0;
}

.day {
  color: var(--rd-text-secondary);
  font-size: 14px;
  font-weight: 400;
  font-family: inherit;
  line-height: inherit;
}

.year {
  color: var(--rd-text-secondary);
  font-size: 14px;
  letter-spacing: 0;
}

.tag {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  border: 1px solid var(--rd-border);
  color: var(--rd-text-secondary);
  background: var(--rd-quote-bg);
}

.tag-cat {
  display: inline-block;
  padding: 0;
  border-radius: 0;
  font-size: 14px;
  color: var(--rd-accent);
  background: transparent;
  border: none;
  text-transform: none;
  letter-spacing: 0;
  white-space: nowrap;
  pointer-events: none;
  font-family: 'MotivaSans', sans-serif;
}

.content-divider { height: 1px; background: var(--rd-border); margin: 8px 0 14px; }

/* 布局相关：三栏 Grid */
.main-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 240px;
  grid-template-rows: auto 1fr;
  gap: 0 60px;
  position: relative;
  align-items: start;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 0;
  background: var(--rd-bg);
}

.sidebar {
  position: sticky;
  top: 100px;
  background: transparent;
  padding: 0;
  height: auto;
  grid-column: 2;
  grid-row: 1 / span 2;
  border-right: none;
  z-index: 1;
  align-self: start;
}

.outline-panel {
  position: sticky;
  top: 100px;
  max-height: none;
  padding: 0;
  overflow: visible;
  box-sizing: border-box;
  background: transparent;
  border: none;
  border-radius: 0;
  box-shadow: none;
  backdrop-filter: none;
}

.top-actions-row {
  grid-column: 1;
  grid-row: 1;
}

.sidebar-title {
  color: var(--rd-text-secondary);
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 16px;
  padding-bottom: 0;
  letter-spacing: 1px;
  text-transform: uppercase;
  border-bottom: none;
  font-family: 'SourceHanSansSC', sans-serif;
}

.right-sidebar {
  display: none;
}

.center-content {
  min-width: 0;
  border-left: none;
  padding-left: 0;
  grid-column: 1;
  grid-row: 2;
}

.post-nav {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 40px;
  padding-top: 30px;
  border-top: 1px solid var(--rd-border);
}

.nav-card {
  padding: 20px;
  background: var(--rd-surface);
  border-radius: 8px;
  text-decoration: none;
  color: var(--rd-text);
  box-shadow: var(--rd-shadow);
  transition: transform 0.2s ease, color 0.2s ease, opacity 0.2s ease;
  border: none;
  cursor: pointer;
  text-align: left;
  width: 100%;
}

.nav-card:hover:not(.disabled) {
  transform: translateY(-2px);
}

.nav-card.disabled {
  opacity: 0.48;
  cursor: not-allowed;
}

.nav-label {
  font-size: 13px;
  color: var(--rd-text-secondary);
  margin-bottom: 8px;
}

.nav-title {
  font-size: 15px;
  font-weight: 500;
  line-height: 1.5;
  color: var(--rd-text);
}

.nav-card.next {
  text-align: right;
}

.back-top {
  position: fixed;
  bottom: 40px;
  right: 40px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--rd-surface);
  color: var(--rd-text-secondary);
  border: none;
  box-shadow: var(--rd-shadow);
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 99;
}

.back-top.show {
  opacity: 1;
  visibility: visible;
}

.back-top:hover {
  color: var(--rd-accent);
  transform: translateY(-2px);
}

/* 目录样式 */
/* 已封装到 ArticleCatalog 组件中 */

/* 内容卡片区域：半透明黑色背景、内边距、边框和圆角，用于包裹正文内容 */
.detail-body { 
  position: relative;
  background: transparent;
  padding: 0;
  margin-right: 0;
  border: none;
  border-radius: 0;
  box-shadow: none;
  overflow: visible;
}

.detail-body::before {
  content: none;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 32px;
  padding: 0 12px;
  border: 1px solid var(--rd-border);
  border-radius: 6px;
  background: var(--rd-surface);
  color: var(--rd-text-secondary);
  cursor: pointer;
  box-shadow: none;
  transition: color 0.2s ease, border-color 0.2s ease;
  flex-shrink: 0;
}

.back-btn:hover {
  color: var(--rd-accent-strong);
  border-color: rgba(102, 177, 255, 0.32);
}

.back-icon {
  width: 16px;
  height: 16px;
  filter: brightness(0) invert(1);
}

.back-text {
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0;
}

.not-found {
  color: var(--rd-text-secondary);
  padding: 60px 24px;
  text-align: center;
}

.outline-panel :deep(.toc-list) {
  gap: 0;
  padding: 0;
  border-left: none;
}

.outline-panel :deep(.toc-section) {
  gap: 0;
  position: relative;
}

.outline-panel :deep(.rail-segment) {
  width: 3px;
  margin: 0;
  border-radius: 999px;
  background: transparent;
  position: relative;
}

.outline-panel :deep(.rail-segment)::before,
.outline-panel :deep(.rail-segment.active)::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 999px;
}

.outline-panel :deep(.rail-segment)::before {
  width: 2px;
  background: var(--rd-border);
}

.outline-panel :deep(.rail-segment.active)::after {
  width: 3px;
  background: var(--rd-accent);
}

.outline-panel :deep(.toc-h2),
.outline-panel :deep(.toc-h3) {
  border: none;
  border-left: 2px solid transparent;
  color: var(--rd-text-secondary);
  border-radius: 0;
  background: transparent;
  transition: color 0.2s ease, border-color 0.2s ease;
}

.outline-panel :deep(.toc-h2) {
  padding: 0 0 0 16px;
  font-size: 14px;
  font-weight: 400;
  margin: 0 0 8px;
  margin-left: -2px;
}

.outline-panel :deep(.toc-h3) {
  padding: 0 0 0 32px;
  font-size: 13px;
  margin: 0 0 8px;
  margin-left: -2px;
}

.outline-panel :deep(.toc-h2:hover),
.outline-panel :deep(.toc-h3:hover) {
  color: var(--rd-accent-strong);
}

.outline-panel :deep(.toc-h2.active),
.outline-panel :deep(.toc-h3.active) {
  background: transparent;
  color: var(--rd-accent-strong);
  border-left-color: var(--rd-accent);
}

.outline-panel :deep(.toc-text),
.outline-panel :deep(.toc-h3-text) {
  color: inherit;
}

.outline-panel :deep(.toc-text.active),
.outline-panel :deep(.toc-h3-text.active) {
  text-decoration: none;
}

.outline-panel :deep(.toc-h3-list) {
  margin: 0;
}

.outline-panel :deep(.caret) {
  border-right-color: var(--rd-text-secondary);
  border-bottom-color: var(--rd-text-secondary);
  margin-right: 0;
}

.outline-panel :deep(.toc-h2.active .caret) {
  border-right-color: var(--rd-accent-strong);
  border-bottom-color: var(--rd-accent-strong);
}

.detail-body :deep(.markdown-viewer) {
  position: relative;
}

.detail-body :deep(.content) {
  --md-body-font-size: 16px;
  --md-body-line-height: 1.8;
  --md-body-font-size-mobile: 16px;
  --md-body-line-height-mobile: 1.8;
  color: var(--rd-text);
  font-size: 16px;
  line-height: 1.8;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}

.detail-body :deep(.content p),
.detail-body :deep(.content li) {
  color: var(--rd-text);
  font-size: var(--md-body-font-size);
  line-height: var(--md-body-line-height);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}

.detail-body :deep(.content p) {
  margin: 0 0 20px;
  text-align: justify;
}

.detail-body :deep(.content h2),
.detail-body :deep(.content h3),
.detail-body :deep(.content h4),
.detail-body :deep(.content h5),
.detail-body :deep(.content h6) {
  color: var(--rd-text);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}

.detail-body :deep(.content h2) {
  font-size: 26px;
  line-height: 1.4;
  margin: 40px 0 20px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--rd-border);
  font-weight: 600;
  scroll-margin-top: 80px;
}

.detail-body :deep(.content h3) {
  font-size: 20px;
  line-height: 1.4;
  margin: 30px 0 16px;
  font-weight: 600;
  display: block;
  scroll-margin-top: 80px;
}

.detail-body :deep(.content h4) {
  font-size: 17px;
  line-height: 1.4;
  margin: 24px 0 12px;
  font-weight: 600;
}

.detail-body :deep(.content h2::before),
.detail-body :deep(.content h3::after) {
  content: none;
}

.detail-body :deep(.content a) {
  color: var(--rd-accent-strong);
  text-decoration: none;
}

.detail-body :deep(.content a:hover) {
  text-decoration: underline;
  text-underline-offset: 3px;
}

.detail-body :deep(.content ul),
.detail-body :deep(.content ol) {
  margin: 16px 0 24px 24px;
  padding-left: 0;
}

.detail-body :deep(.content li) {
  margin: 0 0 8px;
  padding-left: 0;
}

.detail-body :deep(.content hr) {
  border: none;
  border-top: 1px solid var(--rd-border);
  margin: 40px 0;
}

.detail-body :deep(.content blockquote) {
  margin: 26px 0;
  padding: 16px 20px;
  border-left: 4px solid var(--rd-accent);
  background: var(--rd-quote-bg);
  border-radius: 0 8px 8px 0;
  box-shadow: none;
  color: var(--rd-text-secondary);
  font-style: italic;
}

.detail-body :deep(.content blockquote::before) {
  content: none;
}

.detail-body :deep(.content blockquote p) {
  margin: 0;
  color: var(--rd-text-secondary);
}

.detail-body :deep(.content code) {
  background: var(--rd-code-bg);
  border: none;
  padding: 1px 4px;
  border-radius: 4px;
  color: #abb2bf;
  font-size: 0.92em;
}

.detail-body :deep(.content .md-code-wrap) {
  margin: 24px 0;
}

.detail-body :deep(.content pre) {
  margin: 0;
  padding: 20px;
  border: none;
  border-radius: 8px;
  background: var(--rd-code-bg);
  color: #abb2bf;
  box-shadow: none;
  overflow-x: auto;
  font-family: "Consolas", "Monaco", monospace;
  font-size: 14px;
  line-height: 1.6;
  position: relative;
}

.detail-body :deep(.content pre code) {
  background: transparent;
  border: none;
  padding: 0;
  color: inherit;
}

.detail-body :deep(.content .md-copy-btn) {
  top: 10px;
  right: 10px;
  width: 28px;
  height: 28px;
  border-radius: 4px;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  color: #e2ebf6;
  opacity: 0;
  transition: opacity 0.2s, background-color 0.2s;
}

.detail-body :deep(.content pre:hover + .md-copy-btn),
.detail-body :deep(.content .md-code-wrap:hover .md-copy-btn) {
  opacity: 1;
}

.detail-body :deep(.content .md-copy-btn:hover) {
  background: rgba(255, 255, 255, 0.16);
}

.detail-body :deep(.content table) {
  width: 100%;
  margin: 18px 0 24px;
  border-collapse: collapse;
  border: 1px solid var(--rd-border);
  border-radius: 8px;
  overflow: hidden;
  background: var(--rd-surface-solid);
  min-width: 520px;
}

.detail-body :deep(.content th),
.detail-body :deep(.content td) {
  padding: 12px 14px;
  border: 1px solid var(--rd-border);
  color: var(--rd-text);
  background: var(--rd-surface-solid);
}

.detail-body :deep(.content th) {
  background: #25282d;
  font-weight: 700;
}

.detail-body :deep(.content .md-table-wrap) {
  width: 100%;
  overflow-x: auto;
}

.detail-body :deep(.content img) {
  max-width: 100%;
  margin: 26px auto;
  border-radius: 8px;
  box-shadow: var(--rd-shadow-soft);
  display: block;
}

.detail-body :deep(.content .md-image-gallery) {
  gap: 14px;
  margin: 22px 0 28px;
}

.detail-body :deep(.content .md-image-gallery img) {
  margin: 0;
  height: 210px;
  border-radius: 8px;
}

.detail-body :deep(.content mark) {
  background: rgba(102, 177, 255, 0.22);
  color: var(--rd-accent-strong);
  border-radius: 6px;
  padding: 0 4px;
}

.detail-body :deep(.content .mjx-container) {
  background: #1a1a1a;
  border: 1px solid var(--rd-border);
  color: var(--rd-text);
}

@media (max-width: 900px) {
  .page-record-detail {
    width: 100%;
    max-width: 100%;
    padding: 64px 20px 40px;
  }
  .main-layout {
    display: block;
    width: 100%;
    max-width: 100%;
    padding: 0;
  }
  .sidebar,
  .top-actions-row,
  .center-content,
  .right-sidebar {
    grid-column: auto;
    grid-row: auto;
  }

  .top-actions-row {
    position: static;
    top: auto;
    padding: 0;
    width: 100%;
    box-sizing: border-box;
    min-height: 0;
    height: auto;
    border-left: none;
    border-radius: 0;
    z-index: auto;
    margin-bottom: 24px;
  }

  .header-top-row {
    margin-bottom: 10px;
  }
  
  /* Show toggle button */
  .toc-toggle-btn {
    display: flex;
  }

  .back-btn {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    padding: 0;
    flex-shrink: 0;
  }
  .back-btn .back-text {
    display: none;
  }
  .back-btn .back-icon {
    width: 18px;
    height: 18px;
  }
  
  /* Hide right sidebar and placeholder */
  .right-sidebar, .header-placeholder {
    display: none !important;
  }

  /* Mobile Sidebar (Slide-out) */
  .sidebar {
    display: block !important;
    position: fixed;
    top: 0;
    left: 0;
    bottom: auto;
    height: 100dvh;
    min-height: 100vh;
    width: fit-content;
    max-width: 80vw;
    background: rgba(18, 18, 18, 0.98);
    z-index: 2000;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    padding: 20px;
    overflow-y: auto;
    overflow-x: auto;
    box-shadow: 8px 0 32px rgba(0, 0, 0, 0.36);
    border-right: none;
  }
  
  .sidebar.mobile-open {
    transform: translateX(0);
  }
  .outline-panel {
    position: static;
    max-height: none;
    overflow: visible;
  }

  .mobile-overlay {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.42);
    z-index: 1900;
    backdrop-filter: blur(4px);
  }

  .sidebar-title { font-size: 14px; }
  
  /* Adjust detail body for full width */
  .detail-body { 
    padding: 0;
    border-radius: 0;
    margin: 0;
  }
  .center-content {
    border-left: none;
  }

  /* Mobile Title Adjustment */
  .top-title { 
    font-size: 28px; 
    letter-spacing: 0; 
    margin-bottom: 16px; 
    width: 100%; 
    white-space: normal; 
    overflow: visible; 
    text-overflow: clip; 
  }
  
  .header-info { 
    gap: 0; 
    flex-direction: column; 
    align-items: flex-start; 
    margin-left: 0; 
    padding-left: 0;
    min-width: 0;
    flex: 1;
    overflow: hidden;
  }
  .meta { 
    gap: 12px; 
    margin-top: 0; 
    width: auto;
    flex-wrap: wrap;
    overflow: hidden;
  }
  .date-group {
    flex-shrink: 0;
    padding: 0;
    gap: 6px;
  }
  .tag-cat {
    flex-shrink: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-width: 0;
  }
  .month, .day, .year { font-size: 14px; }

  .detail-body :deep(.content h2) {
    font-size: 24px;
    margin: 32px 0 16px;
  }

  .detail-body :deep(.content h3) {
    font-size: 18px;
    margin: 24px 0 14px;
  }

  .detail-body :deep(.content p),
  .detail-body :deep(.content li),
  .detail-body :deep(.content blockquote),
  .detail-body :deep(.content blockquote p) {
    font-size: var(--md-body-font-size-mobile);
    line-height: var(--md-body-line-height-mobile);
  }

  .detail-body :deep(.content img) {
    border-radius: 8px;
  }

  .detail-body :deep(.content .md-image-gallery img) {
    height: 170px;
  }

  .post-nav {
    grid-template-columns: 1fr;
  }

  .back-top {
    right: 20px;
    bottom: 20px;
  }
}

@media (max-width: 480px) {
  .page-record-detail {
    padding: 64px 16px 32px;
  }

  .top-actions-row {
    gap: 10px;
  }

  .header-top-row {
    margin-bottom: 12px;
  }

  .detail-body {
    padding: 0;
    border-radius: 0;
  }

  .top-title {
    font-size: 24px;
  }

  .tag-cat {
    max-width: 140px;
  }

  .detail-body :deep(.content table) {
    min-width: 420px;
  }

  .detail-body :deep(.content pre) {
    padding: 18px 16px;
    border-radius: 8px;
  }
}
</style>
