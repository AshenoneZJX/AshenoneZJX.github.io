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
        <div class="steam-article">
           <p>这是一个采用 Steam 风格的个人网站，基于三栏响应式布局与深色主题构建。融合了 Windows 11 Mica 材质效果与 Motiva Sans 字体，模块化呈现个人资料、日志记录、车型数据库与主题空间。</p>
           <br>
           <h3>包含的功能与模块</h3>
           <p>• 个人资料卡片（左侧）：固定展示头像、昵称、签名与社交链接。</p>
           <p>• 快捷入口（右侧）：提供车型总览、品牌介绍等快速导航功能。</p>
           <p>• 活动记录（Records）：两栏响应式设计，列表呈现日志条目，支持按分类与日期筛选；详情页配备顶部工具栏与大纲导航。</p>
           <p>• 车辆数据库（Cars）：作为子系统深度集成，包含数据大盘（可视化图表）、车型列表、参数详情、品牌历史与汽车基础知识，支持移动端手势交互与沉浸式浏览。</p>
           <p>• 个人空间（MySpace）：层级化路由架构，聚合汽车、电子数码、摄影等兴趣主题的评测与作品集。</p>
           <p>• 主题与交互：全站采用深色视觉与浅蓝高亮；移动端自动切换为单栏布局，底部菜单、悬浮卡片及侧边抽屉适配触控操作。</p>
           <br>
           <h3>活动记录 (Records)</h3>
           <p>近期重构了 <strong>Records</strong> 页面，使其具备了更为专业的后台管理系统风格：</p>
           <ul class="desc-list" style="margin-top: 10px;">
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
           <br>
           <h3>个人空间 (MySpace)</h3>
           <div class="site-structure-diagram">
             <div class="diagram-content">
               <!-- Level 0: Root -->
               <div class="tree-root">
                 <div class="node-box root-box">
                   <span class="node-title">MySpace</span>
                   <span class="node-path">/mySpace</span>
                 </div>
               </div>
               
               <!-- Connector Line Root -> Children -->
               <div class="root-connector"></div>

               <!-- Level 1: Children -->
               <div class="tree-level-1">
                 
                 <!-- Branch 1: Cars System -->
                 <div class="tree-branch">
                   <div class="branch-connector"></div>
                   <div class="node-box sub-node highlight">
                     <span class="node-title">Cars (汽车)</span>
                     <span class="node-desc">独立数据系统</span>
                   </div>
                   <!-- Level 2: Sub-items -->
                   <div class="sub-level">
                     <div class="sub-item">CarsHome (数据大盘)</div>
                     <div class="sub-item flow-item">
                       <span>Cars List</span><span class="arrow">↔</span><span class="leaf">Detail</span>
                     </div>
                     <div class="sub-item flow-item">
                       <span>Brands List</span><span class="arrow">↔</span><span class="leaf">Detail</span>
                     </div>
                     <div class="sub-item flow-item">
                       <span>Basics</span><span class="arrow">→</span><span class="leaf">Detail</span>
                     </div>
                   </div>
                 </div>

                 <!-- Branch 2: Digital -->
                 <div class="tree-branch">
                   <div class="branch-connector"></div>
                   <div class="node-box sub-node topic-node">
                     <span class="node-title">Digital (数码)</span>
                     <span class="node-desc">设备与选型</span>
                   </div>
                 </div>

                 <!-- Branch 3: Photography -->
                 <div class="tree-branch">
                   <div class="branch-connector"></div>
                   <div class="node-box sub-node topic-node">
                     <span class="node-title">Photography (摄影)</span>
                     <span class="node-desc">作品集与器材</span>
                   </div>
                 </div>
                 
               </div>
             </div>
           </div>
           
          <div class="diagram-description">
             <p>MySpace 模块采用并列入口结构，目前包含三个核心专栏：</p>
             <ul class="desc-list">
               <li>
                 <span class="desc-label">Cars (汽车)</span>
                 <span class="desc-text">深度集成的车辆数据系统。包含可视化数据大盘、车型检索与参数详情，以及品牌库和汽车基础知识。</span>
               </li>
               <li>
                 <span class="desc-label">Digital (数码)</span>
                 <span class="desc-text">个人常用数码设备的清单、使用评测与选型指南。</span>
               </li>
               <li>
                 <span class="desc-label">Photography (摄影)</span>
                 <span class="desc-text">摄影作品集与器材记录，展示精选照片与拍摄参数信息。</span>
               </li>
             </ul>
           </div>

           <div class="myspace-grid">
             <div class="myspace-card">
               <div class="card-title">汽车 (Cars)</div>
               <div class="card-desc">独立数据系统，含可视化大盘、车型检索、配置详情与品牌百科。</div>
             </div>
             <div class="myspace-card">
               <div class="card-title">数码 (Digital)</div>
               <div class="card-desc">设备清单与短评，聚合常用数码设备与选型记录。</div>
             </div>
             <div class="myspace-card">
               <div class="card-title">摄影 (Photography)</div>
               <div class="card-desc">作品集与器材记录，展示精选照片与拍摄信息。</div>
             </div>
           </div>
         </div>
      </div>

      <div class="right-col quick-access-panel">
        <div class="quick-access-title">快捷入口</div>
        <div class="quick-access-list">
          <router-link to="/mySpace/cars" class="quick-access-item">
            <span class="icon">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/><path d="M5 17h2v-6H5v6z"/></svg>
            </span>
            <span class="label">车型总览</span>
          </router-link>
          <router-link to="/mySpace/brands" class="quick-access-item">
            <span class="icon">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
            </span>
            <span class="label">品牌介绍</span>
          </router-link>
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
  }
}
</script>

<style>
/* Light Mode 针对首页 Hero 区域的独立样式覆盖 */
[data-theme="light"] .home-view {
  background: var(--c-bg-l1) !important;
  background-color: var(--c-bg-l1) !important;
}
[data-theme="light"] .home-view .hero-section {
  background-image: url('~@/assets/images/bg.png') !important;
  background-size: cover !important;
  background-repeat: no-repeat !important;
  background-position: center center !important;
  background-attachment: fixed !important;
}
[data-theme="light"] .home-view .hero-overlay {
  background: rgba(9, 14, 22, 0.62) !important;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
}
[data-theme="light"] .home-view .quote {
  color: #e6edf3 !important;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.45);
  font-weight: 500;
}
[data-theme="light"] .home-view .quote-author {
  color: #4daafc !important;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.45);
}
</style>

<style scoped>
@font-face {
  font-family: 'SourceHanSansSC';
  src: url('~@/assets/fonts/SourceHanSansSC-Regular-2.otf') format('opentype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

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
  max-width: 1180px;
  margin: -150px auto 0;
  align-items: flex-start; /* 使得各栏高度随内容自适应，不被拉伸 */
  padding-bottom: 30px;
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
  background: #1E1F20;
  padding: 20px; 
  border-radius: 6px; 
  border: 1px solid var(--c-border-hover);
  box-shadow: 0 10px 28px var(--c-shadow-medium);
}
.right-col { width: 280px; flex-shrink: 0; position: sticky; top: 104px; }

.left-col :deep(.languages-section) {
  padding: 0 14px;
  box-sizing: border-box;
}

/* Quick Access Styles */
.quick-access-panel {
  background: #1E1F20;
  padding: 15px;
  border-radius: 6px;
  border: 1px solid var(--c-border-hover);
  box-shadow: 0 10px 28px var(--c-shadow-medium);
}

.quick-access-title {
  font-size: 16px;
  color: #d3d7dd;
  margin-bottom: 12px;
  font-weight: bold;
  font-family: 'SourceHanSansSC', sans-serif;
}

.quick-access-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.quick-access-item {
  display: flex;
  align-items: center;
  background: linear-gradient(to right, rgba(138, 144, 152, 0.34), rgba(138, 144, 152, 0.16));
  padding: 12px 14px;
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.2s;
  border-left: 3px solid #8a9098;
}

.quick-access-item:hover {
  background: linear-gradient(to right, rgba(138, 144, 152, 0.46), rgba(138, 144, 152, 0.24));
  transform: translateX(4px);
}

.quick-access-item .icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  color: #d3d7dd;
}

.quick-access-item .label {
  color: var(--c-text-emphasis);
  font-size: 14px;
  font-weight: 500;
}

.showcase-box {
  margin-top: 20px;
  border: 1px solid var(--c-border-hover);
  padding: 10px;
}
.showcase-img { height: 160px; background: #000; margin-top: 5px; background-size: cover; background-position: center; border: 1px solid var(--c-border-hover);}
.showcase-desc { margin-top: 8px; color: var(--c-text-body-alt); font-size: 13px; }

.myspace-grid { display: flex; gap: 12px; margin-top: 10px; }
.myspace-card { display: flex; flex-direction: column; justify-content: center; width: 33.333%; min-height: 90px; padding: 12px 14px; background: #252729; border: 1px solid #3a3d41; color: var(--c-text-emphasis); cursor: default; border-radius: 8px; }
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
  .left-col, .right-col { width: 100%; position: static; top: auto; }
  .left-col { width: 250px; margin: 0 auto; }
  .left-col :deep(.profile-card) { width: 250px; box-sizing: border-box; }
  .right-col { width: 250px; margin: 0 auto; }
  .right-col.quick-access-panel { width: 250px; box-sizing: border-box; }
  .hero-section { background-attachment: fixed; }
  .home-view { padding-top: 0; }
  .hero-section { height: clamp(320px, 54vh, 480px); background-position: center -60px; }
  .hero-overlay { top: 48%; transform: translateY(-50%); padding: 16px 40px; }
  .home-layout { padding-bottom: 20px; }
  /* Reorder: Profile(1) -> Quick Access(2) -> Intro(3) */
  .left-col { order: 1; }
  .right-col { order: 2; }
  .middle-col { order: 3; }
}

/* 站点介绍正文与标题排版调整 */
.steam-article p {
  font-size: 14px;
  line-height: 1.5;
  margin: 6px 0;
  font-family: 'SourceHanSansSC', sans-serif;
  color: var(--c-text-body);
}
.steam-article h3 {
  font-size: 20px;
  line-height: 1.4;
  margin: 12px 0 8px;
  font-family: 'SourceHanSansSC', sans-serif;
  color: var(--c-text-title);
}

/* 站点结构图样式 */
.site-structure-diagram {
  margin: 15px 0;
  padding: 20px;
  background: #242628;
  border-radius: 6px;
  border: 1px solid #3f4650;
  font-family: 'SourceHanSansSC', sans-serif;
  overflow-x: auto;
}

.diagram-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: fit-content; /* 保证在小屏幕下内容不折行，而是出现滚动条（如果需要） */
}

/* 节点通用样式 */
.node-box {
  background: #1b2128;
  border: 1px solid #3f4650;
  border-radius: 4px;
  padding: 8px 12px;
  text-align: center;
  position: relative;
  z-index: 2;
  min-width: 120px;
  box-shadow: 0 2px 6px var(--c-shadow-light);
}

.root-box {
  background: linear-gradient(135deg, #1f2a38 0%, #2f425a 100%);
  border-color: #58a6ff;
  box-shadow: 0 0 10px rgba(88, 166, 255, 0.22);
}

.sub-node { 
  background: #1b222d; 
  width: 140px; 
}
.sub-node.highlight { 
  border-color: #58a6ff; 
  background: rgba(88, 166, 255, 0.18); 
}
.topic-node { 
  background: rgba(155, 120, 255, 0.16); 
  border-color: #9b78ff; 
  margin-bottom: 8px;
  width: 140px;
}
.topic-node:last-child { margin-bottom: 0; }

.node-title { display: block; font-weight: bold; color: var(--c-text-emphasis); font-size: 13px; }
.node-path, .node-desc { display: block; font-size: 11px; color: var(--c-text-muted); margin-top: 2px; }

/* 桌面端树状布局 */
.tree-root { position: relative; margin-bottom: 20px; }
/* 根节点向下连线 */
.root-connector {
  width: 1px; height: 20px; background: var(--c-border-hover); margin-top: -20px; margin-bottom: 0;
}

.tree-level-1 {
  display: flex;
  justify-content: center;
  gap: 20px;
  padding-top: 20px; /* 留出横线位置 */
  position: relative;
}

/* 分支通用样式 */
.tree-branch {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 0 10px;
}

/* 桌面端连线逻辑：使用伪元素绘制 */
/* 向上垂直连线 */
.tree-branch::before {
  content: ''; position: absolute; top: -20px; left: 50%;
  width: 1px; height: 20px; background: var(--c-border-hover);
}
/* 顶部水平连线 */
.tree-branch::after {
  content: ''; position: absolute; top: -20px; height: 1px; background: var(--c-border-hover);
  width: 100%; left: 0;
}
/* 居中分支：线贯穿 */
.tree-branch:nth-child(2)::after { left: 0; width: 100%; }
/* 第一个分支：线从中心向右 */
.tree-branch:first-child::after { left: 50%; width: 50%; }
/* 最后一个分支：线从左向中心 */
.tree-branch:last-child::after { width: 50%; }
/* 隐藏 HTML 中的辅助连线 div，仅在移动端使用或完全弃用 */
.branch-connector { display: none; }

/* 子级内容 (Cars System 下的列表) */
.sub-level {
  margin-top: 12px;
  display: flex; flex-direction: column; gap: 6px;
  width: 100%; align-items: center;
  position: relative;
}
/* 连接 sub-level 到父节点的线 */
.sub-level::before {
  content: ''; position: absolute; top: -12px; left: 50%;
  width: 1px; height: 12px; background: var(--c-border-hover);
}

.sub-item {
  font-size: 11px; color: var(--c-text-muted); background: #1a212c;
  padding: 4px 8px; border-radius: 3px; border: 1px solid #3f4d5f;
  width: 100%; box-sizing: border-box; text-align: center;
}
.flow-item { display: flex; align-items: center; justify-content: center; gap: 4px; }
.arrow { color: #8ab4ff; font-size: 10px; }
.leaf { color: #c5d9ff; }

.node-group-vertical { display: flex; flex-direction: column; align-items: center; width: 100%; }
.node-group-vertical::before {
  content: ''; position: absolute; top: 0; left: 50%;
  width: 1px; height: 10px; background: var(--c-border-hover); display: none; /* Already handled by tree-branch */
}

/* 移动端/窄屏 垂直布局重构 */
@media (max-width: 768px) {
  .site-structure-diagram { padding: 15px; overflow-x: hidden; }
  .diagram-content { 
    align-items: flex-start; 
    min-width: auto; 
  }

  /* Root */
  .tree-root { margin-bottom: 15px; width: 100%; }
  .root-box { width: 100%; box-sizing: border-box; text-align: left; display: flex; justify-content: space-between; align-items: center; }
  .root-connector { display: none; }

  /* Level 1 Container */
  .tree-level-1 {
    display: flex;
    flex-direction: column;
    padding-top: 0;
    gap: 20px;
    width: 100%;
    position: relative;
    /* 左侧大连线 */
    border-left: 2px dashed var(--c-border-hover);
    margin-left: 10px;
    padding-left: 20px;
    box-sizing: border-box;
  }
  
  /* 清除桌面端连线 */
  .tree-branch::before { display: none; }
  .tree-branch::after { display: none; }

  /* 移动端分支样式 */
  .tree-branch {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    padding: 0;
    position: relative;
  }
  
  /* 移动端水平连接线 */
  .branch-connector {
    display: block;
    position: absolute;
    top: 18px; /* 大约在节点中心高度 */
    left: -22px; /* 连接到左侧大连线 */
    width: 20px;
    height: 1px;
    background: var(--c-border-hover);
  }

  /* 节点样式调整 */
  .node-box, .sub-node, .topic-node {
    width: 100%;
    min-width: unset;
    text-align: left;
    box-sizing: border-box;
  }
  
  /* 子级列表调整 */
  .sub-level {
    margin-top: 10px;
    padding-left: 15px;
    border-left: 1px solid var(--c-border-hover);
    margin-left: 10px;
    width: calc(100% - 10px);
    align-items: flex-start;
    box-sizing: border-box;
  }
  .sub-level::before { display: none; } /* 清除桌面端垂直线 */
  
  .sub-item {
    text-align: left;
    justify-content: flex-start;
    background: #1a212c;
  }
  .flow-item { justify-content: flex-start; }
}

/* Learning 静态卡片展示已移除，此处清除无关 CSS 以保持整洁 */

/* 架构图描述样式 */
.diagram-description {
  margin-top: 20px;
  background: transparent;
  padding: 15px;
  border-radius: 6px;
  border-left: none;
  font-family: 'SourceHanSansSC', sans-serif;
}

.diagram-description p {
  margin: 0 0 10px 0;
  font-size: 14px;
  color: var(--c-text-body-alt);
}

.desc-list {
  list-style: none;
  padding: 0;
  margin: 0 0 10px 0;
}

.desc-list li {
  margin-bottom: 8px;
  display: flex;
  flex-direction: column;
}

.desc-label {
  font-weight: bold;
  color: #c6cbd3;
  font-size: 13px;
  margin-bottom: 2px;
}

.desc-text {
  font-size: 13px;
  color: var(--c-text-muted);
  line-height: 1.5;
}

.desc-text em {
  font-style: normal;
  color: var(--c-text-emphasis);
}

.diagram-note {
  font-size: 12px;
  color: #b7bcc5;
  font-style: italic;
  margin-top: 10px;
  opacity: 0.8;
}
</style>
