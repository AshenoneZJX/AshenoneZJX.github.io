<template>
  <div class="container page-professional-detail">
    <div v-if="article">
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
        </div>
        <button  class="back-btn" @click="$router.push({ name: 'ProKnLearning' })">
          <img src="@/assets/images/fanhui.svg" class="back-icon" alt="返回" />
          <span class="back-text">返回</span>
        </button>
      </div>

      <div class="main-layout">
        <div class="mobile-overlay" v-if="showMobileToc" @click="showMobileToc = false"></div>

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

        <main class="center-content">
          <div class="detail-body">
            <!-- 添加视频播放器 -->
            <div v-if="article && article.videoUrl" class="video-container">
              <video controls class="article-video" :src="article.videoUrl">
                您的浏览器不支持视频播放。
              </video>
            </div>

            <MarkdownViewer
              v-if="article"
              :content="article.content"
              :html="article.html"
              @heading-extracted="h => heading = h || (article ? article.title : '')"
              @content-updated="refreshCatalog"
            />
          </div>
        </main>

        <aside class="right-sidebar"></aside>
      </div>
    </div>

    <div v-else class="not-found">
      <p>抱歉，没有找到该内容。</p>
    </div>
  </div>
</template>

<script>
import professionalKnowledge from '@/data/learning/professionalKnowledge.js'
import ArticleCatalog from '@/components/Shared/ArticleCatalog.vue'
import MarkdownViewer from '@/components/Shared/MarkdownViewer.vue'

export default {
  name: 'ProKnDetail',
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
    this.article = professionalKnowledge.find(r => String(r.id) === id) || null
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
.page-professional-detail {
  padding: 0;
  margin: 0;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}
.toc-toggle-btn {
  display: none;
  background: transparent;
  border: 1px solid var(--c-border-default);
  color: var(--c-text-body);
  padding: 6px 12px;
  cursor: pointer;
  align-items: center;
  border-radius: 6px;
  margin-right: 12px;
}
.mobile-overlay { display: none; }
.top-actions-row {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 12px 16px;
  min-height: 28px;
  max-width: 100%;
  margin: 0 auto 0;
  border-bottom: 1px solid var(--c-border-strong);
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
  color: var(--c-text-title);
  font-size: 28px;
  line-height: 1.35;
  margin: 0;
  font-weight: 400;
  letter-spacing: 1.5px;
  text-shadow: 0 2px 4px var(--c-shadow-heavy);
  font-family: 'MotivaSans', sans-serif;
}

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
  position: relative;
  background: transparent;
  padding: 20px 0 20px 4px;
  min-height: 200px;
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
.sidebar-title {
  color: var(--c-text-title);
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
  border-left: 1px solid var(--c-border-strong);
  padding-left: 0;
}
.detail-body {
  background: var(--c-bg-l2);
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
}
::v-deep .video-container, .video-container {
  margin-bottom: 24px;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  background: var(--c-bg-l0);
  box-shadow: 0 4px 12px var(--c-shadow-medium);
}
::v-deep .article-video, .article-video {
  width: 100%;
  max-height: 500px;
  display: block;
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
  .toc-toggle-btn {
    display: flex;
  }
  .right-sidebar, .header-placeholder {
    display: none !important;
  }
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
    border-right: 1px solid var(--c-border-strong);
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
  }
  .top-title { font-size: 16px; }
}

@media (max-width: 768px) {
}




@media (max-width: 768px) {
  
}
</style>
