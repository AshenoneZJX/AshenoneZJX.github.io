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
        <div class="font-size-controls" role="group" aria-label="字号大小">
          <button type="button" class="font-size-btn" :class="{ active: fontSizePreset === 'small' }" @click="fontSizePreset = 'small'">
            <span class="label-full">小</span>
            <span class="label-short">小</span>
          </button>
          <button type="button" class="font-size-btn" :class="{ active: fontSizePreset === 'standard' }" @click="fontSizePreset = 'standard'">
            <span class="label-full">标准</span>
            <span class="label-short">标</span>
          </button>
          <button type="button" class="font-size-btn" :class="{ active: fontSizePreset === 'large' }" @click="fontSizePreset = 'large'">
            <span class="label-full">大</span>
            <span class="label-short">大</span>
          </button>
        </div>
        <button  class="back-btn" @click="$router.push('/records')">
          <img src="@/assets/images/fanhui.svg" class="back-icon" alt="返回" />
          <span class="back-text">返回</span>
        </button>
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
            <MarkdownViewer 
              v-if="record"
              :content="record.content" 
              :html="record.html" 
              :font-size-preset="fontSizePreset"
              @heading-extracted="h => heading = h" 
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
.back-btn {
  background: transparent;
  border: 1px solid var(--c-border-strong);
  color: var(--c-text-body-alt);
  padding: 6px 12px;
  cursor: pointer;
  border-radius: 6px;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-left: 8px;
  transition: all 0.2s ease;
  text-decoration: none;
}
.back-icon {
  width: 16px;
  height: 16px;
  display: block;
}
.back-btn:hover {
  color: var(--c-text-emphasis);
  background: var(--c-primary-alpha-10);
  border-color: var(--c-border-hover);
}
.back-btn:active, .back-btn.router-link-active {
  background: var(--c-bg-l1);
  border-color: var(--c-primary);
  color: var(--c-text-title);
}

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
  padding: 12px 16px;
  min-height: 28px;
  max-width: 100%;
  margin: 0 auto 0;
  background: #131314;
  border-bottom: 1px solid var(--c-border-default);
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

.top-title { color: var(--c-text-title); font-size: 28px; line-height: 1.35; margin: 0; font-weight: 400; letter-spacing: 1.5px; text-shadow: 0 2px 4px var(--c-shadow-heavy); font-family: 'SourceHanSansSC', sans-serif; }
.meta {
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 0;
}
.month { color: var(--c-text-muted); font-size: 11px; }
.day { color: #9aa0a6; font-size: 18px; font-weight: bold; font-family: 'RobotoMono', Menlo, Monaco, Consolas, "Courier New", monospace; }
.year { color: var(--c-text-muted); font-size: 11px; }
.cat { color: #ffffff; font-size: 11px; display: inline-flex; align-items: center; justify-content: center; padding: 3px 12px; border: none; border-radius: 8px; background-color: #8a9098; font-family: Helvetica, Arial, sans-serif; text-transform: uppercase; letter-spacing: 1.2px; font-weight: 400; }
.content-divider { height: 1px; background: var(--c-border-default); margin: 8px 0 14px; }
.font-size-controls {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-left: auto;
  margin-right: 2px;
  padding: 5px 8px;
  min-height: 40px;
}
.font-size-btn {
  border: none;
  background: transparent;
  color: var(--c-text-body-alt);
  border-radius: 8px;
  padding: 4px 10px;
  font-size: 12px;
  line-height: 1;
  cursor: pointer;
  min-width: 32px;
  transition: color 0.2s ease, background-color 0.2s ease;
}
.font-size-btn:hover {
  color: var(--c-text-emphasis);
  background: var(--c-primary-alpha-10);
}
.font-size-btn.active {
  background: rgba(255, 255, 255, 0.12);
  font-weight: 700;
}
.label-short {
  display: none;
}

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
  background: #131314;
}

.left-sidebar {
  position: sticky;
  top: 80px;
  background: #131314;
  padding: 20px 0 20px 20px;
  min-height: 200px;
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
}

.center-content {
  min-width: 0;
  border-left: 1px solid var(--c-border-default);
  padding-left: 0;
}

/* 目录样式 */
/* 已封装到 ArticleCatalog 组件中 */

/* 内容卡片区域：半透明黑色背景、内边距、边框和圆角，用于包裹正文内容 */
.detail-body { 
  background: #131314;
  padding: 10px 40px;   /* 上下 10px、左右 40px 的内边距 */
  border: none; /* 移除边框 */
  border-radius: 6px;        /* 6px 圆角，柔和视觉，避免生硬矩形 */
}

.not-found { color: var(--c-text-muted); }

@media (max-width: 768px) {
  .main-layout {
    display: block;
    padding: 0;
  }

  .top-actions-row {
    padding: 10px 12px;
  }
  
  /* Show toggle button */
  .toc-toggle-btn {
    display: flex;
    width: 34px;
    height: 34px;
    padding: 0;
    border-radius: 50%;
    justify-content: center;
    margin-right: 8px;
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
    border-right: 1px solid var(--c-border-default);
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
    background: var(--c-shadow-heavy);
    z-index: 1900;
    backdrop-filter: blur(2px);
  }

  .sidebar-title { font-size: 19px; }
  
  /* Adjust detail body for full width */
  .detail-body { 
    padding: 20px; 
    border-radius: 0;
    margin: 0;
  }

  /* Back button text hidden on mobile */
  .back-text { display: none; }
  .back-btn {
    width: 34px;
    height: 34px;
    padding: 0;
    border-radius: 50%;
    justify-content: center;
    gap: 0;
    background: transparent;
  }
  .back-btn:hover,
  .back-btn:active,
  .back-btn.router-link-active {
    background: transparent;
  }
  
  /* Mobile Title Adjustment */
  .top-title { font-size: 18px; letter-spacing: 0.5px; margin-bottom: 0; width: 100%; }
  
  .header-info { gap: 4px; flex-direction: column; align-items: flex-start; }
  .meta { gap: 8px; margin-top: 4px; }
  .month { font-size: 10px; }
  .day { font-size: 16px; }
  .year { font-size: 10px; }
  .cat { font-size: 10px; padding: 1px 6px; }
  .font-size-controls {
    margin-left: auto;
    margin-right: 6px;
    gap: 4px;
    padding: 4px 6px;
    min-height: 38px;
  }
  .font-size-btn {
    width: 34px;
    height: 34px;
    border-radius: 10px;
    padding: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    min-width: 0;
  }
  .label-full {
    display: none;
  }
  .label-short {
    display: inline;
  }
}




@media (max-width: 768px) {
  
}
</style>
