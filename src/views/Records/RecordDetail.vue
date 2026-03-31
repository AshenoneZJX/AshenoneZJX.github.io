<template>
  <div class="container page-record-detail">
    <div v-if="record">
      <div class="main-layout">
        <!-- 移动端：遮罩层 -->
        <div class="mobile-overlay" v-if="showMobileToc" @click="showMobileToc = false"></div>

        <!-- 左侧边栏：固定显示大纲 -->
        <aside class="left-sidebar" :class="{ 'mobile-open': showMobileToc }">
          <div class="outline-panel">
            <div class="sidebar-title">大纲</div>
            <ArticleCatalog 
              ref="catalog" 
              container-selector=".content" 
              @toc-click="showMobileToc = false" 
            />
          </div>
        </aside>

        <div class="top-actions-row">
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
              <span class="date-group">
                <span class="month">{{ monthAbbr(record.date) }}</span>
                <span class="day">{{ dayOfMonth(record.date) }}</span>
                <span class="year">{{ yearOf(record.date) }}</span>
              </span>
              <span class="tag tag-cat">{{ record.category }}</span>
            </div>
          </div>
          <div class="font-size-controls desktop-controls" role="group" aria-label="字号大小">
            <button type="button" class="font-size-btn" :class="{ active: fontSizePreset === 'small' }" @click="fontSizePreset = 'small'">小</button>
            <button type="button" class="font-size-btn" :class="{ active: fontSizePreset === 'standard' }" @click="fontSizePreset = 'standard'">标准</button>
            <button type="button" class="font-size-btn" :class="{ active: fontSizePreset === 'large' }" @click="fontSizePreset = 'large'">大</button>
          </div>
          <div class="font-size-controls mobile-controls" role="group" aria-label="字号大小">
            <button type="button" class="font-size-btn" @click="decreaseFontSize" :class="{ disabled: fontSizePreset === 'small' }">
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </button>
            <button type="button" class="font-size-btn" @click="increaseFontSize" :class="{ disabled: fontSizePreset === 'large' }">
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </button>
          </div>
          <button class="back-btn" @click="$router.push('/records')">
            <img src="@/assets/images/fanhui.svg" class="back-icon" alt="返回" />
            <span class="back-text">返回</span>
          </button>
        </div>

        <!-- 中间内容区 -->
        <main class="center-content">
          <div class="detail-body">
            <MarkdownViewer 
              v-if="record"
              :content="record.content" 
              :html="record.html" 
              :font-size-preset="fontSizePreset"
              @heading-extracted="h => heading = h || (record ? record.title : '')" 
              @content-updated="refreshCatalog"
            />
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
      fontSizePreset: 'standard'
    }
  },
  methods: {
    decreaseFontSize() {
      if (this.fontSizePreset === 'large') this.fontSizePreset = 'standard';
      else if (this.fontSizePreset === 'standard') this.fontSizePreset = 'small';
    },
    increaseFontSize() {
      if (this.fontSizePreset === 'small') this.fontSizePreset = 'standard';
      else if (this.fontSizePreset === 'standard') this.fontSizePreset = 'large';
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
    }
  },
  created() {
    const id = String(this.$route.params.id)
    this.record = records.find(r => String(r.id) === id) || null
  },
  mounted() {
    this.refreshCatalog()
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
  padding: 0;
  margin: 0 auto;
  width: 100%;
  max-width: 1440px;
  box-sizing: border-box;
  background: #131314;
}

.toc-toggle-btn {
  display: none;
  background: transparent;
  border: 1px solid var(--c-border-default);
  color: var(--c-text-body-alt);
  padding: 6px 12px;
  cursor: pointer;
  align-items: center;
  border-radius: 6px;
  margin-right: 16px;
}

.mobile-overlay {
  display: none;
}

/* 顶部操作行样式 */
.top-actions-row {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 12px 20px;
  width: 100%;
  box-sizing: border-box;
  min-height: 28px;
  max-width: 100%;
  margin: 0;
  background: #131314;
  border-left: 1px solid var(--c-border-default);
  border-bottom: none;
  position: sticky;
  top: 80px;
  z-index: 100;
}

.header-placeholder {
  width: 0;
  margin-right: 0;
  flex-shrink: 0;
}

.header-info {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  flex: 1;
  min-width: 0;
  padding: 2px 8px;
  margin-left: 8px;
}

.title-row { display: flex; align-items: flex-start; margin: 0 0 10px; }

.top-title { color: #d1d5da; font-size: 28px; line-height: 1.35; margin: 0; font-weight: 700; letter-spacing: 1.5px; text-shadow: 0 2px 4px var(--c-shadow-heavy); font-family: 'SourceHanSansSC', sans-serif; }
.meta {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 0;
}
.date-group {
  display: inline-flex;
  align-items: center;
  gap: 12px;
}
.month { color: var(--c-text-muted); font-size: 11px; }
.day { color: #9aa0a6; font-size: 20px; font-weight: bold; font-family: 'Georgia', 'RobotoMono', Menlo, Monaco, Consolas, "Courier New", monospace; line-height: 1; }
.year { color: var(--c-text-muted); font-size: 11px; }
.tag { display: inline-flex; align-items: center; padding: 4px 10px; border-radius: 2px; font-size: 12px; border: 1px solid var(--c-border-hover); color: var(--c-text-body-alt); background: var(--c-bg-input); }
.tag-cat {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 999px;
  font-size: 12px;
  color: var(--c-text-emphasis);
  background: rgba(102, 192, 244, 0.12);
  border: 1px solid rgba(102, 192, 244, 0.3);
  text-transform: uppercase;
  letter-spacing: 1px;
  white-space: nowrap;
  pointer-events: none;
  font-family: 'MotivaSans', sans-serif;
}
.content-divider { height: 1px; background: var(--c-border-default); margin: 8px 0 14px; }
.font-size-controls {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid var(--c-border-default);
  border-radius: 999px;
  padding: 2px;
  gap: 0;
  margin-left: auto;
  margin-right: 12px;
  height: 30px;
  width: 132px;
  box-sizing: border-box;
}
.font-size-btn {
  position: relative;
  border: 1px solid transparent;
  background: transparent;
  color: var(--c-text-body-alt);
  border-radius: 999px;
  padding: 0 6px;
  font-size: 12px;
  line-height: 1;
  cursor: pointer;
  flex: 1 1 0;
  min-width: 0;
  height: 24px;
  transition: all 0.2s ease;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.font-size-btn::before {
  display: none;
}
.font-size-btn:first-child::before {
  display: none;
}
.font-size-btn:hover {
  color: var(--c-text-emphasis);
}
.font-size-btn.active {
  background: rgba(255, 255, 255, 0.18);
  color: var(--c-text-title);
  font-weight: 500;
  border-color: var(--c-border-hover);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.28), inset 0 1px 1px rgba(255, 255, 255, 0.08);
}
.mobile-controls {
  display: none;
}
.font-size-btn.disabled {
  opacity: 0.3;
  cursor: not-allowed;
}
.font-size-btn.disabled:hover {
  color: var(--c-text-body-alt);
}

/* 布局相关：三栏 Grid */
.main-layout {
  display: grid;
  grid-template-columns: 260px minmax(0, 1fr) 260px;
  grid-template-rows: auto 1fr;
  gap: 0;
  position: relative;
  align-items: start;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 0;
  background: #131314;
}

.left-sidebar {
  position: sticky;
  top: 80px;
  background: transparent;
  padding: 20px 0 20px 20px;
  height: calc(100vh - 80px);
  grid-column: 1;
  grid-row: 1 / span 2;
  border-right: none;
  z-index: 90;
}
.outline-panel {
  position: sticky;
  top: 80px;
  max-height: calc(100vh - 80px);
  padding: 0;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
}

.top-actions-row {
  grid-column: 2 / 4;
  grid-row: 1;
}

.sidebar-title {
  color: var(--c-text-title);
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
  background: #131314; 
  grid-column: 3;
  grid-row: 2;
}

.center-content {
  min-width: 0;
  border-left: 1px solid var(--c-border-default);
  padding-left: 0;
  grid-column: 2;
  grid-row: 2;
}

/* 目录样式 */
/* 已封装到 ArticleCatalog 组件中 */

/* 内容卡片区域：半透明黑色背景、内边距、边框和圆角，用于包裹正文内容 */
.detail-body { 
  background: #1a1b1e;
  padding: 8px 32px 32px;
  margin-right: 20px;
  border: none; /* 移除边框 */
  border-radius: 6px;        /* 6px 圆角，柔和视觉，避免生硬矩形 */
}

.not-found { color: var(--c-text-muted); }

@media (max-width: 1240px) and (min-width: 769px) {
  .main-layout {
    grid-template-columns: 260px minmax(0, 1fr);
  }
  .right-sidebar {
    display: none !important;
  }
  .top-actions-row {
    grid-column: 2 / 3;
  }
  .center-content {
    grid-column: 2;
  }
}

@media (max-width: 768px) {
  .page-record-detail {
    width: 100%;
    max-width: 100%;
    padding: 0;
  }
  .main-layout {
    display: block;
    width: 100%;
    max-width: 100%;
    padding: 0;
  }
  .left-sidebar,
  .top-actions-row,
  .center-content,
  .right-sidebar {
    grid-column: auto;
    grid-row: auto;
  }

  .top-actions-row {
    position: sticky;
    top: 80px; /* 避开导航栏高度 */
    padding: 8px 12px;
    width: 100%;
    box-sizing: border-box;
    border-left: none;
    height: 72px;
    z-index: 100;
  }
  
  /* Show toggle button */
  .toc-toggle-btn {
    display: flex;
    width: 44px;
    height: 44px;
    padding: 0;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    margin-right: 12px;
    flex-shrink: 0;
  }

  .back-btn {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    padding: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-left: 12px;
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
  .left-sidebar {
    display: block !important;
    position: fixed;
    top: 0;
    left: 0;
    bottom: auto;
    height: 100dvh;
    min-height: 100vh;
    width: fit-content;
    max-width: 80vw;
    background: var(--c-bg-l1);
    z-index: 2000;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    padding: 20px;
    overflow-y: auto;
    overflow-x: auto;
    box-shadow: 2px 0 12px var(--c-shadow-heavy);
    border-right: none;
  }
  
  .left-sidebar.mobile-open {
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
    background: var(--c-shadow-heavy);
    z-index: 1900;
    backdrop-filter: blur(2px);
  }

  .sidebar-title { font-size: 19px; }
  
  /* Adjust detail body for full width */
  .detail-body { 
    padding: 8px 20px 20px 20px; 
    border-radius: 0;
    margin: 0;
  }
  .center-content {
    border-left: none;
  }

  /* Mobile Title Adjustment */
  .top-title { font-size: 20px; letter-spacing: 0.5px; margin-bottom: 0; width: 100%; }
  
  .header-info { gap: 0; flex-direction: column; align-items: flex-start; margin-left: 0; }
  .header-info {
    padding-left: 0;
  }
  .meta { gap: 6px; margin-top: 6px; }
  .month { font-size: 9px; }
  .day { font-size: 16px; }
  .year { font-size: 9px; }
  .cat { font-size: 9px; padding: 1px 4px; border-radius: 4px; }
  .desktop-controls {
    display: none !important;
  }
  .mobile-controls {
    display: inline-flex !important;
  }
  .font-size-controls {
    margin-left: auto;
    margin-right: 10px;
    height: 26px;
    padding: 1px;
    border-radius: 999px;
    width: 66px;
  }
  .font-size-btn {
    width: auto;
    height: 22px;
    border-radius: 999px;
    padding: 0;
    min-width: 0;
  }
  .font-size-btn svg {
    width: 14px;
    height: 14px;
  }
}
</style>
