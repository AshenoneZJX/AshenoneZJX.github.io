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
           <p>这是一个采用 Steam 风格的个人网站，双栏布局与深色主题，模块化呈现个人资料、日志记录、车型数据库与主题空间。</p>
           <br>
           <h3>包含的功能与模块</h3>
           <p>• 个人资料卡片（左侧）：固定展示头像、昵称、签名与社交链接。</p>
           <p>• 活动记录（Records）：列表呈现日志条目，支持按分类筛选与摘要查看，点击进入详情页。</p>
           <p>• 记录详情：完整阅读内容并查看日期、分类等元信息，便于归档与检索。</p>
           <p>• 车辆数据库（Cars）：车型列表与参数图片，包含基础知识（CarBasics）与车型详情（CarDetail）。</p>
          <p>• 个人空间：汽车 / 电子数码 / 摄影主题页，聚合个人兴趣内容与记录。</p>
          <p>• Learning：学习总览页，包含“雅思学习”等子模块，通过卡片进入二级页面。</p>
          <p>• 主题与布局：自适应布局，深色视觉与浅蓝高亮；移动端自动切换为单栏以保证可读性。</p>
          <br>
          <h3>目的与作用</h3>
           <p>以统一的视觉与交互规范，将“日志记录、车型数据、主题空间与个人资料”聚合在同一页面中，便于快速浏览与持续更新。</p>
           <br>
          <h3>个人空间</h3>
           <div class="site-structure-diagram">
             <!-- 根节点 -->
             <div class="node-root">
               <div class="node-box root-box">
                 <span class="node-title">MySpace</span>
                 <span class="node-path">/mySpace</span>
               </div>
             </div>
             
             <!-- 连接线 -->
             <div class="root-connector"></div>

             <div class="tree-container">
               <!-- 分支1：Overview -->
               <div class="tree-branch">
                 <div class="branch-line"></div>
                 <div class="node-box sub-node">
                   <span class="node-title">Overview</span>
                   <span class="node-desc">总览 (默认)</span>
                 </div>
               </div>

               <!-- 分支2：Cars System -->
               <div class="tree-branch">
                 <div class="branch-line"></div>
                 <div class="node-box sub-node highlight">
                   <span class="node-title">Cars System</span>
                   <span class="node-desc">汽车数据库</span>
                 </div>
                 
                 <div class="sub-tree">
                    <div class="sub-branch">
                       <div class="sub-line"></div>
                       <div class="mini-node">CarsHome (专题总览)</div>
                    </div>
                    <div class="sub-branch">
                       <div class="sub-line"></div>
                       <div class="flow-group">
                         <div class="mini-node">Cars List (列表)</div>
                         <span class="arrow">↔</span>
                         <div class="mini-node leaf">Detail (详情)</div>
                       </div>
                    </div>
                    <div class="sub-branch">
                        <div class="sub-line"></div>
                        <div class="flow-group">
                          <div class="mini-node">Brands (品牌)</div>
                          <span class="arrow">↔</span>
                          <div class="mini-node leaf">Detail (详情)</div>
                        </div>
                    </div>
                     <div class="sub-branch">
                        <div class="sub-line"></div>
                        <div class="flow-group">
                          <div class="mini-node">Basics (基础)</div>
                          <span class="arrow">→</span>
                          <div class="mini-node leaf">Detail (详情)</div>
                        </div>
                    </div>
                 </div>
               </div>

               <!-- 分支3：Topics -->
               <div class="tree-branch">
                 <div class="branch-line"></div>
                 <div class="node-group">
                   <div class="node-box sub-node topic-node">Digital (数码)</div>
                   <div class="node-box sub-node topic-node">Photography (摄影)</div>
                 </div>
               </div>
             </div>
           </div>
           
           <p>该架构图展示了 MySpace 模块的路由层级与页面跳转关系，涵盖了从总览到汽车数据库、数码及摄影专栏的完整内容体系。</p>

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
import ProfileCard from '@/components/ProfileCard.vue'

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
.middle-col { flex-grow: 1; background: rgba(0,0,0,0.2); padding: 20px; }
.right-col { width: 280px; flex-shrink: 0; position: sticky; top: 104px; }

/* Quick Access Styles */
.quick-access-panel {
  background: rgba(0, 0, 0, 0.2);
  padding: 15px;
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
  padding: 15px;
  background: rgba(0, 0, 0, 0.15);
  border-radius: 6px;
  border: 1px dashed #3c4551;
  font-family: 'SourceHanSansSC', sans-serif;
  overflow-x: auto;
}

.node-root {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

.node-box {
  background: #1b2838;
  border: 1px solid #3c4551;
  border-radius: 4px;
  padding: 6px 12px;
  color: #c7d5e0;
  font-size: 13px;
  text-align: center;
  position: relative;
  min-width: 100px;
}

.root-box {
  background: linear-gradient(135deg, #1b2838 0%, #2a475e 100%);
  border-color: #66c0f4;
  box-shadow: 0 0 8px rgba(102, 192, 244, 0.2);
}

.node-title {
  display: block;
  font-weight: bold;
  color: #e6f3ff;
}

.node-desc, .node-path {
  display: block;
  font-size: 11px;
  color: #8f98a0;
  margin-top: 2px;
}

.tree-container {
  display: flex;
  justify-content: space-around;
  position: relative;
  padding-top: 15px;
  gap: 10px;
}

/* 根节点到子节点的连线 */
.tree-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 1px;
  height: 15px;
  background: #3c4551;
}

.tree-container::after {
  content: '';
  position: absolute;
  top: 0;
  left: 16%;
  right: 16%;
  height: 1px;
  background: #3c4551;
}

.tree-branch {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  flex: 1;
}

.branch-line {
  position: absolute;
  top: -15px;
  left: 50%;
  width: 1px;
  height: 15px;
  background: #3c4551;
}

.sub-node {
  margin-bottom: 10px;
  background: #171a21;
  width: 90%;
}

.sub-node.highlight {
  border-color: #4b619d;
}

.sub-tree {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 6px;
}

.sub-branch {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;
}

.mini-node {
  background: rgba(0,0,0,0.3);
  border: 1px solid #3c4551;
  border-radius: 3px;
  padding: 4px 8px;
  font-size: 11px;
  color: #aebdc9;
  width: 90%;
  text-align: center;
}

.mini-node.leaf {
  color: #66c0f4;
}

.flow-group {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  width: 100%;
}

.arrow {
  font-size: 10px;
  color: #66c0f4;
}

.node-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  align-items: center;
}

.topic-node {
  background: rgba(46, 75, 50, 0.2);
  border-color: #2e6b36;
}

/* 响应式调整 */
@media (max-width: 600px) {
  .tree-container {
    flex-direction: column;
    align-items: stretch;
  }
  .tree-container::after { display: none; }
  .tree-container::before { display: none; }
  .branch-line { display: none; }
  
  .tree-branch {
    margin-bottom: 15px;
    border-left: 2px solid #3c4551;
    padding-left: 15px;
    align-items: flex-start;
  }
  
  .node-box, .sub-node, .mini-node {
    width: auto;
    min-width: unset;
    text-align: left;
  }
  
  .flow-group {
    justify-content: flex-start;
  }
}

/* Learning 静态卡片展示 */
.learning-grid { display: flex; gap: 12px; margin-top: 10px; }
.learning-card { display: flex; flex-direction: column; justify-content: center; width: 33.333%; min-height: 90px; padding: 12px 14px; background: rgba(0,0,0,0.25); border: 1px solid #3c4551; color: #e6f3ff; cursor: default; border-radius: 8px; }
</style>
