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
        <div class="card-image" :style="bg('https://images.unsplash.com/photo-1692450931594-e076fcdb896f?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')">
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
  name: 'MySpaceOverview',
  methods: {
    bg(url) {
      return { backgroundImage: `url(${url})` }
    }
  }
}
</script>

<style scoped>
.page-myspace { padding-top: 20px; }
.section-header h2 { color: #fff; font-weight: 700; letter-spacing: 2px; }
.divider { height: 2px; background: #2a475e; margin: 10px 0 30px 0; }

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
}

.gallery-card {
  background: #16202d;
  box-shadow: 0 4px 15px rgba(0,0,0,0.4);
  transition: transform 0.2s;
  cursor: pointer;
  text-decoration: none;
}
.gallery-card:hover { transform: translateY(-5px); }

.card-image { height: 160px; background-size: cover; background-position: center; position: relative; }
.hover-overlay { position: absolute; bottom: 0; left: 0; right: 0; padding: 8px 12px; background: rgba(0,0,0,0.5); color: #fff; font-weight: 600; letter-spacing: 1px; }

</style>
