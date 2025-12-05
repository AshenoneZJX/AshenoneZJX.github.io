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
        <div class="panel-header">ABOUT ME</div>
        <div class="steam-article">
           <p>欢迎来到我的 Steam 风格博客。这里复刻了 Steam 个人资料页面的布局逻辑。</p>
           <br>
           <h3>最近动态</h3>
           <p>最近正在重构前端项目，尝试将传统的博客样式改造成游戏玩家熟悉的界面。右侧是我的主要内容展示区，左侧则是固定的个人信息卡片。</p>
           <div class="showcase-box">
             <div class="showcase-title">Featured Project</div>
             <div class="showcase-img"></div>
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
.showcase-img { height: 150px; background: #000; margin-top: 5px;}

/* 响应式：手机端变为单栏 */
@media (max-width: 768px) {
  .home-layout { flex-direction: column; }
  .left-col { width: 100%; }
}
</style>