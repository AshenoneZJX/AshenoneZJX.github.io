<template>
  <div class="page-cars">
    <div class="section-header">
      <h2>Cars</h2>
      <div class="actions">
        <button class="back-btn" @click="$router.push('/mySpace')">返回总览</button>
      </div>
    </div>
    <div class="divider"></div>

    <div class="gallery-grid">
      <div class="gallery-card" v-for="i in 8" :key="i">
        <div class="card-image" :style="{ backgroundImage: `url(https://images.unsplash.com/photo-1503376763036-066120622c74?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60)` }">
          <div class="hover-overlay">VIEW DETAILS</div>
        </div>
        <div class="card-info">
          <div class="card-title">Supercar Model {{i}}</div>
          <div class="card-tags">
            <span class="tag">Sport</span>
            <span class="tag">V8</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-cars { padding-top: 20px; }
.section-header { display: flex; justify-content: space-between; align-items: flex-end; }
.section-header h2 { color: #fff; font-weight: 300; letter-spacing: 2px; }
.actions .back-btn { background: #2a475e; border: 1px solid #3c4551; color: #c7d5e0; padding: 6px 12px; cursor: pointer; }
.actions .back-btn:hover { color: #fff; border-color: #66c0f4; }
.divider { height: 2px; background: #2a475e; margin: 10px 0 30px 0; }

/* Grid 布局核心 */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); /* 自适应列 */
  gap: 20px;
}

.gallery-card {
  background: #16202d;
  box-shadow: 0 4px 15px rgba(0,0,0,0.4);
  transition: transform 0.2s;
  cursor: pointer;
}
.gallery-card:hover { transform: translateY(-5px); }

.card-image {
  height: 160px;
  background-size: cover;
  background-position: center;
  position: relative;
}

.card-info { padding: 12px; }
.card-title { color: #66c0f4; margin-bottom: 5px; font-weight: bold; }
.card-tags .tag {
  display: inline-block;
  background: #344658;
  color: #fff;
  font-size: 10px;
  padding: 2px 5px;
  margin-right: 5px;
}
</style>
