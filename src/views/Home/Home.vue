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
           <p>• 活动记录（Records）：列表呈现日志条目，支持按分类筛选；详情页配备顶部工具栏与大纲导航。</p>
           <p>• 车辆数据库（Cars）：包含车型列表、参数详情、品牌历史与汽车基础知识，支持移动端手势交互与沉浸式浏览。</p>
           <p>• 个人空间（MySpace）：聚合汽车、电子数码、摄影等兴趣主题，展示评测与作品集。</p>
           <p>• 学习中心（Learning）：包含雅思学习等子模块，提供结构化的知识梳理与练习入口。</p>
           <p>• 主题与交互：全站采用深色视觉与浅蓝高亮；移动端自动切换为单栏布局，底部菜单与悬浮卡片适配触控操作。</p>
           <br>
           <h3>目的与作用</h3>
           <p>以统一的视觉与交互规范，将“日志记录、车型数据、主题空间与个人资料”聚合在同一页面中，便于快速浏览与持续更新。底部 Footer 集成 GitHub 主页链接，方便访问源码与更多项目。</p>
           <br>
          <h3>个人空间</h3>
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
                 
                 <!-- Branch 1: Overview -->
                 <div class="tree-branch">
                   <div class="branch-connector"></div>
                   <div class="node-box sub-node">
                     <span class="node-title">Overview</span>
                     <span class="node-desc">总览 (默认)</span>
                   </div>
                 </div>

                 <!-- Branch 2: Cars System -->
                 <div class="tree-branch">
                   <div class="branch-connector"></div>
                   <div class="node-box sub-node highlight">
                     <span class="node-title">Cars System</span>
                     <span class="node-desc">汽车数据库</span>
                   </div>
                   <!-- Level 2: Sub-items -->
                   <div class="sub-level">
                     <div class="sub-item">CarsHome (专题总览)</div>
                     <div class="sub-item flow-item">
                       <span>Cars List</span><span class="arrow">↔</span><span class="leaf">Detail</span>
                     </div>
                     <div class="sub-item flow-item">
                       <span>Brands</span><span class="arrow">↔</span><span class="leaf">Detail</span>
                     </div>
                     <div class="sub-item flow-item">
                       <span>Basics</span><span class="arrow">→</span><span class="leaf">Detail</span>
                     </div>
                   </div>
                 </div>

                 <!-- Branch 3: Topics -->
                 <div class="tree-branch">
                   <div class="branch-connector"></div>
                   <div class="node-group-vertical">
                     <div class="node-box sub-node topic-node">Digital (数码)</div>
                     <div class="node-box sub-node topic-node">Photography (摄影)</div>
                   </div>
                 </div>
                 
               </div>
             </div>
           </div>
           
          <div class="diagram-description">
             <p>MySpace 模块采用层级化路由结构，分为三个核心分支：</p>
             <ul class="desc-list">
               <li>
                 <span class="desc-label">Overview (总览)</span>
                 <span class="desc-text">默认入口，聚合展示各子模块的精选内容与快捷导航。</span>
               </li>
               <li>
                 <span class="desc-label">Cars System (汽车数据库)</span>
                 <span class="desc-text">深度集成的车辆数据系统。包含车型列表与详情的双向交互，以及品牌历史与基础知识库。</span>
               </li>
               <li>
                 <span class="desc-label">Topics (主题专栏)</span>
                 <span class="desc-text">包含 <em>Digital (数码)</em> 与 <em>Photography (摄影)</em> 两个独立板块，记录生活与爱好。</span>
               </li>
             </ul>
           </div>

           <div class="myspace-grid">
             <div class="myspace-card">
               <div class="card-title">汽车</div>
               <div class="card-desc">车型数据库与评测，支持详情页查看参数与图片。</div>
             </div>
             <div class="myspace-card">
               <div class="card-title">电子数码</div>
               <div class="card-desc">设备清单与短评，聚合常用数码设备与选型记录。</div>
             </div>
             <div class="myspace-card">
               <div class="card-title">摄影</div>
               <div class="card-desc">作品集与器材记录，展示精选照片与拍摄信息。</div>
             </div>
           </div>
           <br>
           <h3>Learning</h3>
           <p>学习总览模块，包含“雅思学习”等子模块。以下为静态展示卡片（不含跳转）：</p>
           <div class="learning-grid">
             <div class="learning-card">
               <div class="card-title">雅思学习</div>
               <div class="card-desc">总览与练习入口展示（无跳转）。</div>
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

<style scoped>
@font-face {
  font-family: 'SourceHanSansSC';
  src: url('~@/assets/fonts/SourceHanSansSC-Regular-2.otf') format('opentype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

/* Hero 区域样式 */
.hero-section {
  /* 使得背景图向上延伸，位于导航栏下方 */
  margin-top: -40px; 
  height: 280px;
  background: linear-gradient(0deg, rgba(27,40,56,1) 0%, rgba(27,40,56,0) 100%), 
              url('~@/assets/images/bg.png');
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 20px;
  margin-bottom: 40px;
}

.hero-overlay {
  text-align: center;
  background: rgba(0, 0, 0, 0.5);
  padding: 20px 40px;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  width: 100%;
  max-width: 1180px;
  box-sizing: border-box;
  -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
  mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
}

.quote { 
  color: #fff; 
  font-style: italic; 
  margin-bottom: 8px;
  font-size: 18px; /* 在这里调整字体大小 */
}
.quote-author { color: #66c0f4; font-weight: bold; font-family: serif; font-size: 18px; }

/* 三栏布局 */
.home-layout {
  display: flex;
  gap: 20px;
  width: 1180px;
  max-width: 100%;
  margin: 0 auto;
  align-items: flex-start; /* 使得各栏高度随内容自适应，不被拉伸 */
}

.left-col { width: 250px; flex-shrink: 0; position: sticky; top: 104px; }
.middle-col { flex-grow: 1; background: rgba(0,0,0,0.2); padding: 20px; border-radius: 6px; }
.right-col { width: 280px; flex-shrink: 0; position: sticky; top: 104px; }

/* Quick Access Styles */
.quick-access-panel {
  background: rgba(0, 0, 0, 0.2);
  padding: 15px;
  border-radius: 6px;
}

.quick-access-title {
  font-size: 16px;
  color: #66c0f4;
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
  background: linear-gradient(to right, rgba(103, 193, 245, 0.1), rgba(65, 122, 155, 0.05));
  padding: 12px 14px;
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.2s;
  border-left: 3px solid #66c0f4;
}

.quick-access-item:hover {
  background: linear-gradient(to right, rgba(103, 193, 245, 0.25), rgba(65, 122, 155, 0.15));
  transform: translateX(4px);
}

.quick-access-item .icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  color: #66c0f4;
}

.quick-access-item .label {
  color: #e6f3ff;
  font-size: 14px;
  font-weight: 500;
}

.showcase-box {
  margin-top: 20px;
  border: 1px solid #3c4551;
  padding: 10px;
}
.showcase-img { height: 160px; background: #000; margin-top: 5px; background-size: cover; background-position: center; border: 1px solid #3c4551;}
.showcase-desc { margin-top: 8px; color: #c7d5e0; font-size: 13px; }

.myspace-grid { display: flex; gap: 12px; margin-top: 10px; }
.myspace-card { display: flex; flex-direction: column; justify-content: center; width: 33.333%; min-height: 90px; padding: 12px 14px; background: rgba(0,0,0,0.25); border: 1px solid #3c4551; color: #e6f3ff; cursor: default; border-radius: 8px; }
.card-title { font-size: 16px; font-weight: 600; margin-bottom: 6px; color: #66c0f4; }
.card-desc { font-size: 13px; color: #c7d5e0; }

@media (max-width: 768px) {
  .myspace-grid { flex-direction: column; }
  .myspace-card { width: 100%; }
}

/* 响应式：手机端变为单栏 */
@media (max-width: 768px) {
  .home-layout { flex-direction: column; }
  .left-col, .right-col { width: 100%; position: static; top: auto; }
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
}
.steam-article h3 {
  font-size: 20px;
  line-height: 1.4;
  margin: 12px 0 8px;
  font-family: 'SourceHanSansSC', sans-serif;
}

/* 站点结构图样式 */
.site-structure-diagram {
  margin: 15px 0;
  padding: 20px;
  background: rgba(0, 0, 0, 0.15);
  border-radius: 6px;
  border: 1px dashed #3c4551;
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
  background: #1b2838;
  border: 1px solid #3c4551;
  border-radius: 4px;
  padding: 8px 12px;
  text-align: center;
  position: relative;
  z-index: 2;
  min-width: 120px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
}

.root-box {
  background: linear-gradient(135deg, #1b2838 0%, #2a475e 100%);
  border-color: #66c0f4;
  box-shadow: 0 0 10px rgba(102, 192, 244, 0.15);
}

.sub-node { 
  background: #171a21; 
  width: 140px; 
}
.sub-node.highlight { 
  border-color: #4b619d; 
  background: rgba(75, 97, 157, 0.1); 
}
.topic-node { 
  background: rgba(46, 75, 50, 0.2); 
  border-color: #2e6b36; 
  margin-bottom: 8px;
  width: 140px;
}
.topic-node:last-child { margin-bottom: 0; }

.node-title { display: block; font-weight: bold; color: #e6f3ff; font-size: 13px; }
.node-path, .node-desc { display: block; font-size: 11px; color: #8f98a0; margin-top: 2px; }

/* 桌面端树状布局 */
.tree-root { position: relative; margin-bottom: 20px; }
/* 根节点向下连线 */
.root-connector {
  width: 1px; height: 20px; background: #3c4551; margin-top: -20px; margin-bottom: 0;
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
  width: 1px; height: 20px; background: #3c4551;
}
/* 顶部水平连线 */
.tree-branch::after {
  content: ''; position: absolute; top: -20px; height: 1px; background: #3c4551;
  width: 100%; left: 0;
}
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
  width: 1px; height: 12px; background: #3c4551;
}

.sub-item {
  font-size: 11px; color: #aebdc9; background: rgba(0,0,0,0.3);
  padding: 4px 8px; border-radius: 3px; border: 1px solid #3c4551;
  width: 100%; box-sizing: border-box; text-align: center;
}
.flow-item { display: flex; align-items: center; justify-content: center; gap: 4px; }
.arrow { color: #66c0f4; font-size: 10px; }
.leaf { color: #66c0f4; }

.node-group-vertical { display: flex; flex-direction: column; align-items: center; width: 100%; }
.node-group-vertical::before {
  content: ''; position: absolute; top: 0; left: 50%;
  width: 1px; height: 10px; background: #3c4551; display: none; /* Already handled by tree-branch */
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
    border-left: 2px dashed #3c4551;
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
    background: #3c4551;
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
    border-left: 1px solid #3c4551;
    margin-left: 10px;
    width: calc(100% - 10px);
    align-items: flex-start;
    box-sizing: border-box;
  }
  .sub-level::before { display: none; } /* 清除桌面端垂直线 */
  
  .sub-item {
    text-align: left;
    justify-content: flex-start;
    background: rgba(255,255,255,0.03);
  }
  .flow-item { justify-content: flex-start; }
}

/* Learning 静态卡片展示 */
.learning-grid { display: flex; gap: 12px; margin-top: 10px; }
.learning-card { display: flex; flex-direction: column; justify-content: center; width: 33.333%; min-height: 90px; padding: 12px 14px; background: rgba(0,0,0,0.25); border: 1px solid #3c4551; color: #e6f3ff; cursor: default; border-radius: 8px; }

/* 架构图描述样式 */
.diagram-description {
  margin-top: 20px;
  background: rgba(0, 0, 0, 0.2);
  padding: 15px;
  border-radius: 6px;
  border-left: 3px solid #66c0f4;
  font-family: 'SourceHanSansSC', sans-serif;
}

.diagram-description p {
  margin: 0 0 10px 0;
  font-size: 14px;
  color: #c7d5e0;
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
  color: #66c0f4;
  font-size: 13px;
  margin-bottom: 2px;
}

.desc-text {
  font-size: 13px;
  color: #8f98a0;
  line-height: 1.5;
}

.desc-text em {
  font-style: normal;
  color: #e6f3ff;
}

.diagram-note {
  font-size: 12px;
  color: #67c1f5;
  font-style: italic;
  margin-top: 10px;
  opacity: 0.8;
}
</style>
