<!-- 
 汽车基础知识详情页：
    左侧目录
    中间 Markdown 渲染内容
    右侧占位栏
    支持 MathJax 公式与响应式布局
-->

<template>
  <div class="container page-car-basics-detail">
    <div v-if="article" class="three-col-layout">
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
    <div v-else class="not-found">
      <p>抱歉，没有找到该内容。</p>
    </div>
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
  font-family: 'MotivaSans';
  src: url('~@/assets/fonts/MotivaSans-Regular_woff.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

.page-car-basics-detail { 
  --layout-max-width: 1680px;
  --layout-gutter: 20px;
  --header-bar-height: 52px;
  --side-col-width: 280px;
  padding: 0;
  margin: 0;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  background: #191919;
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
}

.top-title { 
  color: var(--c-text-title); 
  font-size: 28px; 
  line-height: 1.35; 
  margin: 0; 
  font-weight: 400; 
  letter-spacing: 1.5px; 
  text-shadow: 0 2px 4px var(--c-shadow-heavy);
  font-family: 'MotivaSans', sans-serif;
}
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

/* 下容器：布局相关：三栏 Grid */
.three-col-layout {
  display: grid;
  grid-template-columns: var(--side-col-width) minmax(0, 1fr);
  min-height: 100vh;
  width: min(100%, var(--layout-max-width));
  margin: 0 auto;
  align-items: stretch;
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
}

/* 目录样式 */
/* 已封装到 ArticleCatalog 组件中 */

/* 内容主体 */
.detail-body { 
  background: #191919;
  padding: 10px var(--layout-gutter); 
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
    display: none;
  }
}

/* 移动端适配 */
@media (max-width: 768px) {
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
  .three-col-layout {
    display: block;
    min-height: 0;
  }

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
    bottom: 0;
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
    padding: 10px; 
    border-radius: 0; 
    margin: 0;
  }
  
  .center-content {
    border-left: none;
    padding: 0;
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

  .top-title { font-size: 16px; }
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
</style>
