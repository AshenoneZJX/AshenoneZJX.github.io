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
        </div>
        <router-link to="/mySpace/car-basics" class="back-btn">
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
            <MarkdownViewer 
              v-if="article"
              :content="article.content" 
              :html="article.html" 
              @heading-extracted="h => heading = h || (article ? article.title : '')" 
              @content-updated="refreshCatalog"
            />
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
      showMobileToc: false
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
@font-face {
  font-family: 'MotivaSans';
  src: url('~@/assets/fonts/MotivaSans-Regular_woff.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

.page-car-basics-detail { 
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
  padding: 12px 16px;
  min-height: 28px;
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

.top-title { 
  color: #ffffff; 
  font-size: 28px; 
  line-height: 1.35; 
  margin: 0; 
  font-weight: 400; 
  letter-spacing: 1.5px; 
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
  font-family: 'MotivaSans', sans-serif;
}

.back-btn { background: transparent; border: none; color: #c7d5e0; padding: 4px 10px; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; border-radius: 6px; margin-left: auto; }
.back-icon {
  width: 16px;
  height: 16px;
  display: block;
}
.back-btn:hover { color: #e6f3ff; background: rgba(102,192,244,0.12); }

/* 下容器：布局相关：三栏 Grid */
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

/* 内容主体 */
.detail-body { 
  background: rgba(0,0,0,0.2); 
  padding: 10px 20px; 
  border: none; 
  border-radius: 6px; 
}

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

/* 移动端适配 */
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
    background: #1b2838;
    z-index: 2000;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    padding: 20px;
    overflow-y: auto;
    overflow-x: auto;
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

  .sidebar-title { font-size: 19px; }
  
  /* Adjust detail body for full width */
  .detail-body { 
    padding: 10px; 
    border-radius: 0; 
    margin: 0;
  }
  
  .center-content {
    border-left: none;
  }
  
  /* Back button text hidden on mobile */
  .back-text { display: none; }
  .back-btn { padding: 4px; }

  .top-title { font-size: 16px; }
}
</style>
