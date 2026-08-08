<template>
  <div class="home-view">
    <div class="hero-section">
      <div class="hero-overlay">
        <h2 class="quote">
            <p>世界上只有一种英雄主义，那就是在认清生活真相后依然热爱生活。</p>
            <p>Il n'ya qu'un héroïsme au monde : c'est de voir le monde tel qu'il est et de l'aimer.</p>
        </h2>
        <p class="quote-author">- Romain Rolland.</p>
      </div>
    </div>

    <div class="container home-layout">
      <div class="left-col">
        <ProfileCard />
      </div>

      <div class="middle-col content-panel">
        <div class="quick-access-panel">
          <h3 class="quick-access-header">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="section-icon"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
            快捷入口
          </h3>
          <div class="quick-access-list">
            <router-link v-for="link in quickLinks" :key="link.path" :to="link.path" class="quick-access-card">
              <div class="qa-card-bg"></div>
              <div class="qa-card-content">
                <div class="qa-icon-wrapper">
                  <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" v-html="link.icon"></svg>
                </div>
                <div class="qa-text">
                  <span class="qa-title">{{ link.title }}</span>
                  <span class="qa-desc">{{ link.desc }}</span>
                </div>
                <svg class="qa-arrow" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </div>
              <div class="qa-tooltip">{{ link.title }}</div>
            </router-link>
          </div>
        </div>

        <div class="steam-article">
           <section class="article-section intro-section">
             <p>这是一个采用 Steam 风格的个人网站，基于双栏响应式布局与深色主题构建。融合了 Windows 11 Mica 材质效果与 Motiva Sans 字体，模块化呈现个人资料、活动记录、车辆数据库、数码与摄影空间，以及学习空间等内容。</p>
           </section>
           
           <section class="article-section module-section">
              <h3>
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" class="section-icon"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                包含的功能与模块
              </h3>
              <ul class="desc-list">
                <li>
                  <span class="desc-label">个人资料卡片（左侧）</span>
                  <span class="desc-text">固定展示头像、昵称、签名与社交链接。</span>
                </li>
                <li>
                  <span class="desc-label">快捷入口（顶部）</span>
                  <span class="desc-text">集成本站主要页面的快速导航，覆盖汽车、数码、摄影、记录、学习等模块。</span>
                </li>
                <li>
                  <span class="desc-label">活动记录（Records）</span>
                  <span class="desc-text">两栏响应式设计，列表呈现日志条目，支持按分类与时间维度组合筛选；详情页配备顶部工具栏与大纲导航。</span>
                </li>
                <li>
                  <span class="desc-label">车辆数据库（Cars）</span>
                  <span class="desc-text">作为子系统深度集成，包含数据大盘（可视化图表）、车型列表、参数详情、品牌历史、汽车基础知识与相关资料文档，支持移动端手势交互与沉浸式浏览。</span>
                </li>
                <li>
                  <span class="desc-label">个人空间（MySpace）</span>
                  <span class="desc-text">层级化路由架构，聚合汽车、电子数码、摄影等兴趣主题的评测与作品集。</span>
                </li>
                <li>
                  <span class="desc-label">学习空间（Learning）</span>
                  <span class="desc-text">承载学习计划与长期学习记录，目前包含雅思（IELTS）备考专栏，持续沉淀学习内容。</span>
                </li>
                <li>
                  <span class="desc-label">主题与交互</span>
                  <span class="desc-text">全站采用深色视觉与浅蓝高亮；移动端自动切换为单栏布局，底部菜单、悬浮卡片及侧边抽屉适配触控操作。</span>
                </li>
              </ul>
            </section>
           
           <section class="article-section records-section">
             <h3>
               <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" class="section-icon"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
               活动记录 (Records)
             </h3>
             <p><strong>Records</strong> 页面采用专业的后台管理系统风格，用于沉淀日常记录与长文内容：</p>
             <ul class="desc-list">
               <li>
                 <span class="desc-label">两栏响应式布局</span>
                 <span class="desc-text">桌面端采用“左内容-右筛选”的双栏布局，充分利用宽屏空间；移动端自动折叠为单栏，并通过悬浮抽屉呼出筛选面板。</span>
               </li>
               <li>
                 <span class="desc-label">多维组合筛选</span>
                 <span class="desc-text">在原有标签分类的基础上，新增了“按时间维度”过滤（包括年度筛选、自定义时间范围等），筛选逻辑联动更加智能。</span>
               </li>
               <li>
                 <span class="desc-label">动态数据提取</span>
                 <span class="desc-text">年度筛选选项不再硬编码，而是通过解析 Markdown 元数据，自动提取文章存在的年份进行聚合。</span>
               </li>
             </ul>
           </section>
           
           <section class="article-section myspace-section">
             <h3>
               <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" class="section-icon"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
               个人空间 (MySpace)
             </h3>
           <div class="architecture-diagram" ref="archDiagram">
            <div class="arch-scale" ref="archScale" :style="{ transform: 'scale(' + archScale + ')' }">
             <div class="arch-root">
               <div class="arch-node arch-root-node">
                 <span class="node-title">MySpace</span>
                 <span class="node-path">/mySpace</span>
               </div>
             </div>
             
             <div class="arch-branches">
               <!-- Branch 1: Cars System -->
               <div class="arch-branch">
                 <div class="arch-node arch-primary-node">
                   <span class="node-title">Cars (汽车)</span>
                   <span class="node-path">/mySpace/cars-home</span>
                 </div>
                 <div class="arch-leaves">
                   <div class="arch-leaf"><span class="leaf-name">CarsHome</span><span class="leaf-arrow">→</span><span class="leaf-target">大盘</span></div>
                   <div class="arch-leaf"><span class="leaf-name">CarsList</span><span class="leaf-arrow">↔</span><span class="leaf-target">Detail</span></div>
                   <div class="arch-leaf"><span class="leaf-name">BrandsList</span><span class="leaf-arrow">↔</span><span class="leaf-target">Detail</span></div>
                   <div class="arch-leaf"><span class="leaf-name">CarBasics</span><span class="leaf-arrow">↔</span><span class="leaf-target">Detail</span></div>
                 </div>
               </div>

               <!-- Branch 2: Digital -->
               <div class="arch-branch">
                 <div class="arch-node arch-secondary-node">
                   <span class="node-title">Digital (数码)</span>
                   <span class="node-path">/mySpace/digital</span>
                 </div>
               </div>

               <!-- Branch 3: Photography -->
               <div class="arch-branch">
                 <div class="arch-node arch-secondary-node">
                   <span class="node-title">Photography</span>
                   <span class="node-path">/mySpace/photography</span>
                 </div>
               </div>
             </div>
            </div>
           </div>
           
           <h3 class="myspace-features-header">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" class="section-icon"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
              核心专栏
            </h3>
 
            <div class="myspace-feature-grid">
              <div class="feature-card">
                <div class="feature-card-head">
                  <span class="feature-icon">
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/><path d="M5 17h2v-6H5v6z"/></svg>
                  </span>
                  <h4 class="feature-title">Cars 汽车系统</h4>
                </div>
                <p class="feature-desc">深度集成的车辆数据中心，涵盖可视化大盘、多维车型检索、参数配置详情与品牌知识百科。</p>
              </div>
              
              <div class="feature-card">
                <div class="feature-card-head">
                  <span class="feature-icon">
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>
                  </span>
                  <h4 class="feature-title">Digital 数码专区</h4>
                </div>
                <p class="feature-desc">记录常用数码设备的配置清单，分享硬核评测心得、折腾历程与选型避坑指南。</p>
              </div>
              
              <div class="feature-card">
                <div class="feature-card-head">
                  <span class="feature-icon">
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
                  </span>
                  <h4 class="feature-title">Photography 摄影图集</h4>
                </div>
                <p class="feature-desc">定格光影瞬间的画廊，直观呈现精选摄影作品，并记录背后的器材与详尽拍摄参数。</p>
              </div>
            </div>
            </section>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileCard from '@/components/Shared/ProfileCard.vue'

export default {
  name: 'Home',
  components: {
    ProfileCard
  },
  data () {
    return {
      archScale: 1,
      // 快捷入口：集成本站主要页面
      quickLinks: [
        { path: '/mySpace/cars-home', title: '汽车主页', desc: '数据大盘与入口', icon: '<rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect>' },
        { path: '/mySpace/cars', title: '车型总览', desc: '车辆数据系统', icon: '<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/><path d="M5 17h2v-6H5v6z"/>' },
        { path: '/mySpace/brands', title: '品牌介绍', desc: '汽车品牌百科', icon: '<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line>' },
        { path: '/mySpace/car-basics', title: '汽车基础知识', desc: '入门到进阶', icon: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>' },
        { path: '/mySpace/car-docs', title: '相关资料', desc: '文档在线阅读', icon: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line>' },
        { path: '/mySpace/digital', title: '数码专区', desc: '清单与选型', icon: '<rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line>' },
        { path: '/mySpace/photography', title: '摄影图集', desc: '作品与器材', icon: '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle>' },
        { path: '/records', title: '日志记录', desc: '日志与多维筛选', icon: '<line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line>' },
        { path: '/learning', title: '学习空间', desc: '学习计划与记录', icon: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>' }
      ]
    }
  },
  methods: {
    // 根据父容器宽度等比缩放架构图，保证完整显示、不出现横向滚动条
    updateArchScale () {
      const container = this.$refs.archDiagram
      const scaleEl = this.$refs.archScale
      if (!container || !scaleEl) return
      if (window.matchMedia('(max-width: 768px)').matches) {
        this.archScale = 1
        container.style.height = ''
        scaleEl.style.marginLeft = ''
        return
      }
      // offsetWidth/offsetHeight 不受 transform 影响，拿到的是自然尺寸
      const naturalWidth = scaleEl.offsetWidth
      const naturalHeight = scaleEl.offsetHeight
      if (!naturalWidth) return
      const cs = getComputedStyle(container)
      const padX = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight)
      const padY = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom)
      const availW = container.clientWidth - padX
      const scale = Math.min(1, availW / naturalWidth)
      this.archScale = scale
      // transform 不改变布局：手动把容器高度设为缩放后的可视高度，
      // 并用左边距把缩放后的图形在容器内水平居中（flex 的 auto 边距在溢出时会失效导致右侧被裁）
      container.style.height = (naturalHeight * scale + padY) + 'px'
      scaleEl.style.marginLeft = Math.max(0, (availW - naturalWidth * scale) / 2) + 'px'
    }
  },
  mounted () {
    this.$nextTick(this.updateArchScale)
    window.addEventListener('resize', this.updateArchScale)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.updateArchScale)
  }
}
</script>

<style scoped>
/* Home View 整体作为背景承载 */
.home-view {
  background-color: var(--c-bg-l1);
  min-height: 100vh;
  margin-top: 0;
  padding-top: 0;
}

/* Hero 区域样式 */
.hero-section {
  height: clamp(420px, 62vh, 680px);
  margin-top: -80px;
  margin-bottom: 28px;
  width: 100%;
  background-image: url('~@/assets/images/bg.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center -80px;
  background-attachment: fixed;
  position: relative;
  overflow: hidden;
  isolation: isolate;
}

.hero-overlay {
  position: absolute;
  top: 45%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  text-align: center;
  background: rgba(9, 14, 22, 0.62);
  padding: 20px 40px;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  width: 100%;
  box-sizing: border-box;
  -webkit-mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
  mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
  z-index: 2;
}

.quote { 
  color: var(--c-text-title); 
  font-style: italic; 
  margin-bottom: 8px;
  font-size: 18px; /* 在这里调整字体大小 */
}
.quote-author { color: var(--c-text-emphasis); font-weight: bold; font-family: serif; font-size: 18px; }

/* 三栏布局 */
.home-layout {
  display: flex;
  gap: 20px;
  width: 100%;
  max-width: 1180px; /* 恢复原有的最大宽度限制 */
  margin: -150px auto 0;
  align-items: flex-start; /* 使得各栏高度随内容自适应，不被拉伸 */
  padding: 0 20px 30px; /* 两侧增加一些内边距防止贴边 */
  box-sizing: border-box;
  position: relative;
  z-index: 3;
}

.left-col { 
  width: 250px; 
  flex-shrink: 0; 
  position: sticky; 
  top: 104px; 
}
.left-col :deep(.profile-card) {
  background: #1E1F20;
  border: 1px solid #2d333b;
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.28);
}
.middle-col { 
  flex-grow: 1; 
  width: 0; /* 防止内容超出导致 flex-grow 失效 */
  min-width: 400px; /* 设置最小宽度限制，防止被左右栏过度挤压 */
  background: #1E1F20;
  padding: 20px; 
  border-radius: 6px; 
  border: 1px solid var(--c-border-hover);
  box-shadow: 0 10px 28px var(--c-shadow-medium);
}

.left-col :deep(.languages-section) {
  padding: 0 14px;
  box-sizing: border-box;
}

/* Quick Access Styles 重构：位于中栏顶部，网格布局 */
/* 父容器不再使用边框与底色，仅作为布局容器，使中栏更紧凑 */
.quick-access-panel {
  padding: 0;
  margin-bottom: 20px;
}

/* 标题样式与 article-section 的 h3 保持统一 */
.quick-access-header {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 20px;
  line-height: 1.4;
  margin: 0 0 14px 0;
  font-family: 'SourceHanSansSC', sans-serif;
  color: var(--c-text-title);
  font-weight: 600;
  letter-spacing: 0.5px;
}

.quick-access-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 12px;
}

.quick-access-card {
  position: relative;
  display: flex;
  align-items: center; /* 内容在固定高度的卡片内垂直居中 */
  height: 64px; /* 固定卡片尺寸，不随内容多少变化 */
  border-radius: 10px;
  overflow: visible; /* 允许 tooltip 溢出显示，圆角裁剪由 qa-card-bg 承担 */
  text-decoration: none;
  background: #21262d;
  border: 1px solid #30363d;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-sizing: border-box;
}

.quick-access-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  border-color: #58a6ff;
}

.qa-card-bg {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 0.05;
  transition: opacity 0.3s ease;
  z-index: 1;
  background: linear-gradient(135deg, transparent 0%, #58a6ff 100%);
  border-radius: inherit; /* 卡片改为 overflow: visible 后，由背景层保持圆角外观 */
}

/* 悬浮显示完整标题的 tooltip */
.qa-tooltip {
  position: absolute;
  bottom: calc(100% + 6px);
  left: 50%;
  transform: translateX(-50%) translateY(4px);
  background: #2d333b;
  color: var(--c-text-emphasis);
  border: 1px solid #444c56;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease, transform 0.2s ease;
  z-index: 10;
}

.quick-access-card:hover .qa-tooltip {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

.quick-access-card:hover .qa-card-bg {
  opacity: 0.15;
}

.qa-card-content {
  position: relative;
  z-index: 2;
  padding: 10px 12px;
  display: flex;
  align-items: flex-start; /* 内部图标与文字顶端对齐 */
  gap: 10px;
  flex: 1;
  min-width: 0;
  box-sizing: border-box;
}

.qa-icon-wrapper {
  width: 38px;
  height: 38px;
  border-radius: 8px;
  background: #161b22;
  border: 1px solid #30363d;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #c6cbd3;
  transition: all 0.3s ease;
}

.quick-access-card:hover .qa-icon-wrapper {
  background: rgba(88, 166, 255, 0.1);
  color: #58a6ff;
  border-color: rgba(88, 166, 255, 0.2);
}

.qa-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.qa-title {
  color: var(--c-text-emphasis);
  font-size: 15px;
  font-weight: 600;
  transition: color 0.3s ease;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.quick-access-card:hover .qa-title {
  color: #58a6ff;
}

.qa-desc {
  color: var(--c-text-muted);
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.qa-arrow {
  color: #8b949e;
  transform: translateX(-4px);
  opacity: 0;
  transition: all 0.3s ease;
  align-self: center;
}

.quick-access-card:hover .qa-arrow {
  transform: translateX(0);
  opacity: 1;
  color: #58a6ff;
}

.showcase-box {
  margin-top: 20px;
  border: 1px solid var(--c-border-hover);
  padding: 10px;
}
.showcase-img { height: 160px; background: #000; margin-top: 5px; background-size: cover; background-position: center; border: 1px solid var(--c-border-hover);}
.showcase-desc { margin-top: 8px; color: var(--c-text-body-alt); font-size: 13px; }

.myspace-grid { display: flex; gap: 12px; margin-top: 10px; }
.myspace-card { display: flex; flex-direction: column; justify-content: center; text-align: left; width: 33.333%; min-height: 90px; padding: 12px 14px; background: #252729; border: 1px solid #3a3d41; color: var(--c-text-emphasis); cursor: default; border-radius: 8px; }
.card-title { font-size: 16px; font-weight: 600; margin-bottom: 6px; color: #d3d7dd; }
.card-desc { font-size: 13px; color: var(--c-text-body-alt); }

@media (max-width: 768px) {
  .myspace-grid { flex-direction: column; }
  .myspace-card { width: 100%; }
}

/* 响应式：手机端变为单栏 */
@media (max-width: 768px) {
  .home-layout { flex-direction: column; }
  .home-layout { padding: 0 12px; box-sizing: border-box; margin: -100px auto 0; z-index: 3; }
  .home-layout :deep(.profile-info) { width: auto; max-width: none; margin: 0; box-sizing: border-box; }
  .left-col { width: 250px; position: static; top: auto; margin: 0 auto; }
  .left-col :deep(.profile-card) { width: 250px; box-sizing: border-box; }
  .hero-section { background-attachment: fixed; }
  .home-view { padding-top: 0; }
  .hero-section { height: clamp(320px, 54vh, 480px); background-position: center -60px; }
  .hero-overlay { top: 48%; transform: translateY(-50%); padding: 16px 40px; }
  .home-layout { padding-bottom: 20px; }
  /* Reorder: Profile(1) -> Content(2) */
  .left-col { order: 1; }
  .middle-col { 
    order: 2; 
    width: 100%; 
    min-width: 0; /* 取消移动端下的 400px 最小宽度限制 */
    box-sizing: border-box;
    padding: 16px 14px; /* 移动端收窄容器内边距 */
  }

  /* 中栏内部各元素随屏幕宽度自适应 */
  .quick-access-panel { margin-bottom: 16px; }
  .quick-access-header { margin-bottom: 12px; }
  .quick-access-list {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); /* 窄屏下允许更小的卡片宽度 */
    gap: 10px;
  }
  .quick-access-card { height: 60px; }
  .qa-icon-wrapper { width: 32px; height: 32px; }
  .qa-title { font-size: 14px; }
  .qa-tooltip { display: none; /* 触屏无悬浮，禁用 tooltip */ }

  .steam-article { gap: 24px; }
  .article-section h3, .quick-access-header { font-size: 18px; }
  .article-section p, .desc-label, .desc-text { font-size: 13px; }

  .feature-card { padding: 12px 14px; }
}

/* 站点介绍正文与标题排版调整 */
.steam-article {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.article-section {
  position: relative;
  padding-bottom: 20px;
}

.article-section:not(:last-child)::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%);
}

.article-section h3 {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 20px;
  line-height: 1.4;
  margin: 0 0 16px 0;
  font-family: 'SourceHanSansSC', sans-serif;
  color: var(--c-text-title);
  font-weight: 600;
  letter-spacing: 0.5px;
}

.section-icon {
  color: #58a6ff;
  opacity: 0.8;
}

.article-section p {
  font-size: 14px;
  line-height: 1.6;
  margin: 0 0 12px 0;
  font-family: 'SourceHanSansSC', sans-serif;
  color: var(--c-text-body);
}

.article-section p:last-child {
  margin-bottom: 0;
}

/* 描述列表样式优化 */
.desc-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.desc-list li {
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  position: relative;
  padding-left: 16px; /* 增加整体缩进以容纳左侧小圆点 */
}

.desc-list li::before {
  content: '•';
  position: absolute;
  left: 0;
  top: 0;
  color: #58a6ff;
  font-size: 16px;
  line-height: 1.6;
}

.desc-label {
  font-weight: 600;
  color: var(--c-text-title);
  font-size: 14px; /* 调大字号，与普通段落一致 */
  margin-bottom: 4px;
  font-family: 'SourceHanSansSC', sans-serif;
}

.desc-text {
  font-size: 14px; /* 统一文字大小与 p 一致 */
  color: var(--c-text-body);
  line-height: 1.6;
  font-family: 'SourceHanSansSC', sans-serif;
}

.desc-text em {
  font-style: normal;
  color: var(--c-text-emphasis);
}

/* 架构图重构样式 */
.architecture-diagram {
  margin: 16px 0 20px;
  padding: 20px 16px;
  background: #181a1d;
  border-radius: 12px;
  border: 1px solid #2d333b;
  overflow: hidden; /* 内部按容器宽度自动缩放，不再需要横向滚动 */
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;
  box-sizing: border-box;
}

/* 缩放承载层：保持自然宽度，由 JS 按容器宽度计算 transform: scale 和左边距居中 */
.arch-scale {
  width: max-content;
  align-self: flex-start;
  transform-origin: top left;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.arch-root {
  position: relative;
  margin-bottom: 28px;
  z-index: 2;
}

.arch-root::after {
  content: '';
  position: absolute;
  bottom: -28px;
  left: 50%;
  width: 2px;
  height: 28px;
  background: linear-gradient(to bottom, #58a6ff, #30363d);
  transform: translateX(-50%);
  z-index: 1;
}

/* 移除原有位置重复的 arch-node 和 arch-root-node 定义 */
.arch-primary-node {
  border-color: #58a6ff;
  background: rgba(88, 166, 255, 0.1);
}

.arch-secondary-node {
  border-color: #8b949e;
  background: rgba(139, 148, 158, 0.1);
}

.node-title {
  font-weight: 600;
  color: var(--c-text-emphasis);
  font-size: 14px;
}

/* 节点仅标注名称与路由地址 */
.node-path {
  font-size: 12px;
  color: var(--c-text-muted);
  margin-top: 2px;
}

.arch-branches {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  width: max-content;
  /* 移除 gap，通过 margin 控制间距，方便精确绘制连线 */
}

/* 顶部横向连接线 */
.arch-branches::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 224px); /* 动态计算：总宽度减去左右两个节点的一半宽度加外边距（200/2 + 12） */
  height: 2px;
  background: #30363d;
  z-index: 1;
}

.arch-branch {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin: 0 12px; /* 左右间距 12px，相当于 gap: 24px */
}

/* 垂直连接线 */
.arch-branch::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  width: 2px;
  height: 20px;
  background: #30363d;
  transform: translateX(-50%);
  z-index: 1;
}

.arch-node {
  /* 确保节点在连线下方有足够的空间，并盖住底部的连线 */
  margin-top: 20px;
  background: #21262d;
  border: 1px solid #30363d;
  border-radius: 8px;
  padding: 12px 20px;
  text-align: center;
  position: relative;
  z-index: 2;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  width: 200px; /* 给所有节点一个固定宽度，方便对齐和计算连线 */
  box-sizing: border-box;
}

.arch-root-node {
  margin-top: 0; /* 根节点不需要 margin-top */
  width: auto;
  min-width: 200px;
  background: linear-gradient(135deg, #1f2a38 0%, #2f425a 100%);
  border-color: #58a6ff;
  box-shadow: 0 0 15px rgba(88, 166, 255, 0.2);
  gap: 4px;
  padding: 14px 30px;
}

/* 高亮主分支连接线 */
.arch-branch:first-child::before {
  background: linear-gradient(to bottom, #30363d, #58a6ff);
}

.arch-leaves {
  margin-top: 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
  padding-top: 10px;
}

.arch-leaves::before {
  content: '';
  position: absolute;
  top: -14px;
  left: 50%;
  width: 2px;
  height: 24px;
  background: #58a6ff;
  opacity: 0.5;
  transform: translateX(-50%);
}

.arch-leaf {
  background: #161b22;
  border: 1px solid #30363d;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  color: #c6cbd3;
}

.leaf-name { color: #8ab4ff; font-weight: 500; }
.leaf-arrow { color: #484f58; font-size: 10px; }
.leaf-target { color: #8b949e; }

@media (max-width: 768px) {
  .architecture-diagram {
    align-items: flex-start;
    padding: 20px 15px;
  }

  /* 移动端为纵向布局，不做缩放，缩放层占满容器宽度 */
  .arch-scale {
    width: 100%;
    margin: 0;
    align-items: flex-start;
  }
  
  .arch-root { margin-bottom: 20px; }
  .arch-root::after { display: none; }
  
  .arch-branches {
    flex-direction: column;
    gap: 20px;
    width: 100%;
    padding-left: 20px;
    border-left: 2px solid #30363d;
  }
  
  .arch-branches::before { display: none; }
  
  .arch-branch {
    align-items: flex-start;
    width: 100%;
  }
  
  .arch-branch::before {
    top: 20px;
    left: -20px;
    width: 20px;
    height: 2px;
    transform: none;
  }
  
  .arch-node {
    width: 100%;
    box-sizing: border-box;
  }
  
  .arch-leaves {
    width: 100%;
    padding-left: 20px;
    margin-top: 10px;
    border-left: 2px dashed #30363d;
    margin-left: 20px;
  }
  
  .arch-leaves::before { display: none; }
}

/* Learning 静态卡片展示已移除，此处清除无关 CSS 以保持整洁 */

/* MySpace Features Grid - 紧凑实用的展示卡片，与中栏深色风格一致 */
/* 标题与上方 article-section 的 h3 样式统一，仅补充与架构图的间距 */
.myspace-features-header {
  margin: 22px 0 14px 0;
}

.myspace-feature-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 4px;
}

/* 卡片为纯展示用途，不可点击：无悬浮交互反馈，光标保持默认 */
.feature-card {
  background: #252729;
  border: 1px solid #3a3d41;
  border-radius: 8px;
  padding: 14px 16px;
  cursor: default;
}

/* 卡片头部：小图标 + 标题同行排列 */
.feature-card-head {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.feature-icon {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background: #1a1e24;
  border: 1px solid #30363d;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #c6cbd3;
  flex-shrink: 0;
}

.feature-title {
  color: var(--c-text-title);
  font-size: 15px;
  font-weight: 600;
  margin: 0;
  font-family: 'SourceHanSansSC', sans-serif;
}

.feature-desc {
  color: var(--c-text-muted);
  font-size: 13px;
  line-height: 1.6;
  margin: 0;
}

@media (max-width: 768px) {
  .myspace-feature-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
}
</style>
