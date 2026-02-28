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
          <p>架构与入口：/mySpace 为根路由，MySpace 作为布局容器；默认子路由为 MySpaceOverview（/mySpace）。</p>
          <p>汽车类页面：/mySpace/cars-home（CarsHome，专题总览）、/mySpace/cars（CarsModels，车型列表）、/mySpace/cars/:id（CarDetail，车型详情）。基础知识：/mySpace/car-basics（CarBasics）与 /mySpace/car-basics/:id（CarBasicsDetail）。品牌：/mySpace/brands（BrandList）与 /mySpace/brands/:name（BrandDetail）。</p>
          <p>主题页面：/mySpace/digital（Digital，电子数码）与 /mySpace/photography（Photography，摄影）。</p>
          <p>跳转关系示例：在品牌详情页点击车型名称，若项目收录则跳转到对应 /mySpace/cars/:id；在车型详情页标题处点击品牌名称可返回 /mySpace/brands/:name；在汽车总览页可进入车型列表与基础知识模块。</p>
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
  height: 320px;
  background: linear-gradient(0deg, rgba(27,40,56,1) 0%, rgba(27,40,56,0) 100%), 
              url('~@/assets/images/bg.png');
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
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.quote { 
  color: #fff; 
  font-style: italic; 
  margin-bottom: 8px;
  font-size: 18px; /* 在这里调整字体大小 */
}
.quote-author { color: #66c0f4; font-weight: bold; font-family: serif; font-size: 18px; }

/* 双栏布局 */
.home-layout {
  display: flex;
  gap: 20px;
  width: 940px;
  max-width: 100%;
  margin: 0 auto;
}

.left-col { width: 280px; flex-shrink: 0; position: sticky; top: 104px; }
.right-col { flex-grow: 1; background: rgba(0,0,0,0.2); padding: 20px; }

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
  .left-col { width: 100%; position: static; top: auto; }
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

/* Learning 静态卡片展示 */
.learning-grid { display: flex; gap: 12px; margin-top: 10px; }
.learning-card { display: flex; flex-direction: column; justify-content: center; width: 33.333%; min-height: 90px; padding: 12px 14px; background: rgba(0,0,0,0.25); border: 1px solid #3c4551; color: #e6f3ff; cursor: default; border-radius: 8px; }
</style>
