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

      <div class="right-col content-panel">
        <div class="panel-header">站点介绍</div>
        <div class="steam-article">
           <p>这是一个采用 Steam 风格的个人网站，整体沿用双栏布局与深色主题，以模块化方式呈现内容与项目。</p>
           <br>
           <h3>包含的功能与模块</h3>
           <p>• 个人信息卡片（左侧）：展示头像、昵称、签名与社交链接，是固定的个人资料区。</p>
           <p>• 活动记录（右侧）：以列表形式呈现日志条目，支持按分类筛选与查看摘要，点击进入详情页。</p>
           <p>• 记录详情：阅读完整内容，查看日期与分类等元信息，便于归档与检索。</p>
           <p>• 项目展示（Showcase）：用于展示精选项目或作品封面，强调当前重点方向。</p>
           <p>• 筛选模块：左侧使用 SVG 图标作功能标识，后随矮宽按钮快速切换分类，按钮根据文字长度自适应。</p>
           <p>• 主题与布局：双栏自适应布局，深色视觉与浅蓝高亮，移动端自动切换为单栏以保证可读性。</p>
           <br>
           <h3>目的与作用</h3>
           <p>通过统一的视觉与交互规范，将“日志记录、项目展示、个人资料”三个核心信息聚合在同一页面中，便于快速浏览与持续更新。</p>
           <br>
           <h3>MYSPACE</h3>
           <p>个人主题空间，包含“汽车”“电子数码”“摄影”三个子页面：</p>
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
           <div class="showcase-box">
             <div class="showcase-title">Featured Project</div>
             <div class="showcase-img" :style="{ backgroundImage: 'url(https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=60)' }"></div>
             <div class="showcase-desc">Steam 风格博客重构：双栏布局、活动记录与分类筛选、详情阅读与项目展示。</div>
           </div>
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
/* Hero 区域样式 */
.hero-section {
  /* 使得背景图向上延伸，位于导航栏下方 */
  margin-top: -40px; 
  height: 320px;
  background: linear-gradient(0deg, rgba(27,40,56,1) 0%, rgba(27,40,56,0) 100%), 
              url('https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.hero-overlay {
  text-align: center;
  background: rgba(0, 0, 0, 0.5);
  padding: 20px 40px;
  backdrop-filter: blur(4px);
  border: 1px solid #66c0f4;
}

.quote { 
  color: #fff; 
  font-style: italic; 
  margin-bottom: 8px;
  font-size: 18px; /* 在这里调整字体大小 */
}
.quote-author { color: #66c0f4; font-weight: bold; }

/* 双栏布局 */
.home-layout {
  display: flex;
  gap: 20px;
}

.left-col { width: 280px; flex-shrink: 0; }
.right-col { flex-grow: 1; background: rgba(0,0,0,0.2); padding: 20px; }

.panel-header {
  background: linear-gradient(to right, #2a475e, #1b2838);
  padding: 10px 15px;
  color: #fff;
  margin-bottom: 20px;
}

.showcase-box {
  margin-top: 20px;
  border: 1px solid #3c4551;
  padding: 10px;
}
.showcase-img { height: 160px; background: #000; margin-top: 5px; background-size: cover; background-position: center; border: 1px solid #3c4551;}
.showcase-desc { margin-top: 8px; color: #c7d5e0; font-size: 13px; }

.myspace-grid { display: flex; gap: 0; margin-top: 10px; }
.myspace-card { display: flex; flex-direction: column; justify-content: center; width: 33.333%; min-height: 90px; padding: 12px 14px; background: rgba(0,0,0,0.25); border: 1px solid #3c4551; color: #e6f3ff; cursor: default; }
.card-title { font-size: 16px; font-weight: 600; margin-bottom: 6px; color: #66c0f4; }
.card-desc { font-size: 13px; color: #c7d5e0; }

@media (max-width: 768px) {
  .myspace-grid { flex-direction: column; }
  .myspace-card { width: 100%; }
}

/* 响应式：手机端变为单栏 */
@media (max-width: 768px) {
  .home-layout { flex-direction: column; }
  .left-col { width: 100%; }
}
</style>
