<!-- 
 汽车基础知识详情页：
    左侧目录
    中间 Markdown 渲染内容
    右侧占位栏
    支持 MathJax 公式与响应式布局
-->

<template>
  <div class="container page-car-basics-detail" v-if="article">
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

    <section class="right-area">
      <div class="top-actions-row">
        <button class="toc-toggle-btn" @click="showMobileToc = !showMobileToc">
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
          <span style="margin-left: 4px; display: none;">目录</span>
        </button>
        <div class="header-info">
          <div class="top-title" v-if="heading">{{ heading }}</div>
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
        <button class="back-btn" @click="$router.push('/mySpace/car-basics')">
          <img src="@/assets/images/fanhui.svg" class="back-icon" alt="返回" />
          <span class="back-text">返回</span>
        </button>
      </div>

      <div class="content-layout">
        <main class="center-content">
          <div class="detail-body">
            <MarkdownViewer 
              v-if="article"
              :content="article.content" 
              :html="article.html" 
              :font-size-preset="fontSizePreset"
              @heading-extracted="h => heading = h || (article ? article.title : '')" 
              @content-updated="refreshCatalog"
            />
          </div>
        </main>
        <aside class="right-sidebar"></aside>
      </div>
    </section>

    <div class="mobile-overlay" v-if="showMobileToc" @click="showMobileToc = false"></div>
  </div>
  <div v-else class="not-found container">
    <p>抱歉，没有找到该内容。</p>
  </div>
</template>
<script>
import carBasics from '@/data/car/carBasics.js'
import ArticleCatalog from '@/components/Shared/ArticleCatalog.vue'
import MarkdownViewer from '@/components/Shared/MarkdownViewer.vue'

export default {
  name: 'CarBasicsDetail',
  components: {
    ArticleCatalog,
    MarkdownViewer
  },
  data() {
    return {
      article: null,
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
    refreshCatalog() {
      if (this.$refs.catalog) this.$refs.catalog.refresh()
    }
  },
  created() {
    const id = String(this.$route.params.id)
    this.article = carBasics.find(r => String(r.id) === id) || null
  },
  mounted() {
    this.refreshCatalog()
  }
}
</script>

<style scoped>

@font-face {
  font-family: 'MotivaSans';
  src: url('~@/assets/fonts/MotivaSans-Regular_woff.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

.page-car-basics-detail { 
  --layout-max-width: 1440px;
  --layout-gutter: 20px;
  --header-bar-height: 52px;
  --side-col-width: 260px;
  padding: 0;
  margin: 0;
  width: 100%;
  max-width: 1440px;
  box-sizing: border-box;
  background: #131314;
  
  display: grid;
  grid-template-columns: var(--side-col-width) minmax(0, 1fr);
  min-height: 100vh;
  align-items: stretch;
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
  padding: 12px var(--layout-gutter);
  min-height: var(--header-bar-height);
  border-bottom: 1px solid var(--c-border-default);
  width: 100%;
  box-sizing: border-box;
  background: var(--c-bg-l1);
  position: sticky;
  top: 80px; /* 避开导航栏高度 */
  z-index: 100;
}

.header-info {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  gap: 12px;
  flex-wrap: wrap;
  min-width: 0;
  padding: 2px 8px;
  margin-left: 8px;
}

.top-title { 
  color: #d1d5da; 
  font-size: 28px; 
  line-height: 1.35; 
  margin: 0; 
  font-weight: 700; 
  letter-spacing: 1.5px; 
  text-shadow: 0 2px 4px var(--c-shadow-heavy);
  font-family: 'MotivaSans', sans-serif;
}
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

.right-area {
  display: flex;
  flex-direction: column;
  min-width: 0;
  width: 100%;
}

.content-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) var(--side-col-width);
  gap: 0;
  align-items: start;
  min-height: 0;
  width: 100%;
}

.left-sidebar {
  position: sticky;
  top: 80px; /* 避开导航栏高度 */
  width: var(--side-col-width);
  height: calc(100vh - 80px); /* 减去导航栏高度 */
  background: var(--c-bg-l1);
  padding: 0 20px;
  border-right: 1px solid var(--c-border-default);
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
  z-index: 90;
}
.outline-panel {
  padding: 0;
  box-sizing: border-box;
}

.left-sidebar > * {
  width: 100%;
  max-width: 100%;
  min-width: 0;
}

.sidebar-title {
  color: var(--c-text-title);
  font-size: 17px;
  font-weight: 700;
  margin: 0 0 12px;
  min-height: 65px;
  padding: 0;
  display: flex;
  align-items: center;
  letter-spacing: 0.5px;
  border-bottom: 1px solid var(--c-border-default);
  box-sizing: border-box;
}

.right-sidebar {
  position: sticky;
  top: 80px; /* 避开导航栏高度 */
  width: var(--side-col-width);
  height: calc(100vh - 80px);
  background: var(--c-bg-l1); 
  box-sizing: border-box;
}

.center-content {
  min-width: 0;
  border-left: none;
  padding: 0;
  background: var(--c-bg-l1);
}

/* 目录样式 */
/* 已封装到 ArticleCatalog 组件中 */

/* 内容主体 */
.detail-body { 
  background: #191919;
  padding: 8px var(--layout-gutter) var(--layout-gutter);
  margin-right: 20px;
  border: none; 
  border-radius: 6px; 
  box-sizing: border-box;
}

.left-sidebar :deep(.toc-list) {
  width: 100%;
  max-width: 100%;
  min-width: 0;
  margin: 0;
  padding: 0 0 12px;
  box-sizing: border-box;
}

.left-sidebar :deep(.toc-section),
.left-sidebar :deep(.toc-h3-list) {
  width: 100%;
  max-width: 100%;
  min-width: 0;
}

.left-sidebar :deep(.toc-h2),
.left-sidebar :deep(.toc-h3) {
  width: 100%;
  margin-left: 0;
}

.not-found { color: var(--c-text-muted); }

@media (max-width: 1240px) and (min-width: 769px) {
  .content-layout {
    grid-template-columns: minmax(0, 1fr);
  }

  .right-sidebar {
    display: none !important;
  }
}

/* 移动端适配 */
@media (max-width: 768px) {
  .page-car-basics-detail {
    display: block;
    max-width: 100%;
    padding: 0;
  }

  .top-actions-row {
    position: sticky;
    top: 80px; /* 避开导航栏高度 */
    padding: 8px 12px;
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
  .content-layout {
    display: block;
  }

  .right-sidebar {
    display: none !important;
  }

  .left-sidebar {
    display: block !important;
    position: fixed;
    top: 0;
    left: 0;
    bottom: auto;
    height: 100dvh;
    min-height: 100vh;
    width: min(82vw, 360px);
    max-width: 82vw;
    background: var(--c-bg-l1);
    z-index: 2000;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    padding: 0;
    overflow-y: auto;
    overflow-x: auto;
    box-shadow: 2px 0 12px var(--c-shadow-heavy);
    border-right: 1px solid var(--c-border-default);
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
  
  .detail-body { 
    padding: 8px 10px 10px; 
    border-radius: 0; 
    margin: 0;
  }
  
  .center-content {
    border-left: none;
    padding: 0;
  }
  
  .header-info { gap: 0; flex-direction: column; align-items: flex-start; margin-left: 0; }
  .top-title { font-size: 20px; }
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
