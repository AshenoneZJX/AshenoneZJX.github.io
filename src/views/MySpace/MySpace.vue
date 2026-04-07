<!--
 * MySpace 概览页面
 * 展示汽车、数码、摄影三个分类的卡片入口，点击后跳转至对应子页面
-->

<template>
  <div class="page-myspace">
    <div class="section-header">
      <h2>个人空间</h2>
      <div class="divider"></div>
    </div>

    <div class="gallery-grid">
      <router-link class="gallery-card" to="/mySpace/cars-home">
        <div class="card-image" :style="bg('https://images.unsplash.com/photo-1611651186486-415f04eb78e4?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')">
          <div class="hover-overlay">汽车 CarsIndex</div>
        </div>
        
      </router-link>

      <router-link class="gallery-card" to="/mySpace/digital">
        <div class="card-image" :style="bg('https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=3164&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')">
          <div class="hover-overlay">数码 Digital</div>
        </div>
        
      </router-link>

      <router-link class="gallery-card" to="/mySpace/photography">
        <div class="card-image" :style="bg('https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')">
          <div class="hover-overlay">摄影 Photography</div>
        </div>
        
      </router-link>
      
    </div>
  </div>
</template>

<script>
export default {
  name: 'MySpace',
  methods: {
    bg(url) {
      return { backgroundImage: `url(${url})` }
    }
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

.page-myspace { 
  padding: 20px;
  width: 100%;
  max-width: 1200px;
  
  margin: 0 auto;
  font-family: 'MotivaSans', sans-serif;
  box-sizing: border-box;
}
.section-header h2 { color: var(--c-text-title); font-weight: 500; letter-spacing: 2px; }
.divider { height: 2px; background: var(--c-border-strong); margin: 10px 0 30px 0; }

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
}

.gallery-card {
  background: var(--c-bg-l2);
  box-shadow: 0 4px 15px var(--c-shadow-medium);
  border: 1px solid var(--c-border-default);
  transition: transform 0.2s, box-shadow 0.2s, filter 0.2s;
  cursor: pointer;
  text-decoration: none;
  border-radius: 10px;
  overflow: hidden;
  display: block;
}
.gallery-card:hover {
  transform: scale(1.03);
  filter: brightness(1.15);
  box-shadow: 0 10px 25px rgba(0,0,0,0.45);
}

.card-image { height: 160px; background-size: cover; background-position: center; position: relative; }
.hover-overlay { position: absolute; bottom: 0; left: 0; right: 0; padding: 8px 12px; background: var(--c-shadow-heavy); color: var(--c-text-title); font-weight: 400; letter-spacing: 1px; }

@media (max-width: 768px) {
  .gallery-grid {
    grid-template-columns: 1fr;
  }
}


</style>
