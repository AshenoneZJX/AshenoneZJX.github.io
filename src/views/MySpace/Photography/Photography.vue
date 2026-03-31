<template>
  <div class="page-photography">
    <div class="section-header">
      <h2>Photography</h2>
      <div class="actions">
        <button class="back-btn" @click="$router.push('/mySpace')">
          <img src="@/assets/images/fanhui.svg" class="back-icon" alt="返回" />
          <span class="back-text">返回总览</span>
        </button>
      </div>
    </div>

    <div class="divider"></div>

    <div class="gallery-grid">
      <div class="gallery-card" v-for="item in items" :key="item.title">
        <div class="card-image" :style="{ backgroundImage: `url(${item.img})` }">
          <div class="hover-overlay">VIEW DETAILS</div>
        </div>
        <div class="card-info">
          <div class="card-title">{{ item.title }}</div>
          <div class="card-tags">
            <span class="tag" v-for="t in item.tags" :key="t">{{ t }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Photography',
  data() {
    return {
      items: [
        { title: 'Pro DSLR', img: 'https://images.unsplash.com/photo-1519183071298-a2962be96d0a?auto=format&fit=crop&w=900&q=60', tags: ['Full Frame', '4K'] },
        { title: 'Vintage Lens', img: 'https://images.unsplash.com/photo-1512938992-07fb9f4c9d12?auto=format&fit=crop&w=900&q=60', tags: ['50mm', 'f/1.4'] },
        { title: 'Tripod', img: 'https://images.unsplash.com/photo-1542332213-8bf63f355a88?auto=format&fit=crop&w=900&q=60', tags: ['Carbon', 'Lightweight'] },
        { title: 'Action Camera', img: 'https://images.unsplash.com/photo-1517144743165-9ec007e39a3f?auto=format&fit=crop&w=900&q=60', tags: ['4K', 'Stabilization'] },
        { title: 'Drone', img: 'https://images.unsplash.com/photo-1514774429031-11f963ffbdc0?auto=format&fit=crop&w=900&q=60', tags: ['HDR', 'GPS'] }
      ]
    }
  }
}
</script>

<style scoped>

.page-photography { 
  padding-top: 20px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
}
.section-header { display: flex; justify-content: space-between; align-items: flex-end; }
.section-header h2 { color: var(--c-text-title); font-weight: 300; letter-spacing: 2px; }
.divider { height: 2px; background: var(--c-border-strong); margin: 10px 0 30px 0; }

.gallery-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 20px; }
.gallery-card { background: var(--c-bg-l2); box-shadow: 0 4px 15px var(--c-shadow-medium); border: 1px solid var(--c-border-default); border-radius: 10px; overflow: hidden; transition: transform 0.2s, box-shadow 0.2s, filter 0.2s; cursor: pointer; }
.gallery-card:hover { transform: scale(1.03); filter: brightness(1.15); box-shadow: 0 10px 25px rgba(0, 0, 0, 0.45); }
.card-image { height: 160px; width: 100%; background-size: cover; background-position: center; position: relative; overflow: hidden; }
.hover-overlay { position: absolute; bottom: 0; left: 0; right: 0; padding: 8px 12px; background: var(--c-shadow-heavy); color: var(--c-text-title); font-weight: 600; letter-spacing: 1px; }
.card-info { padding: 12px; width: 100%; box-sizing: border-box; background: #171B21; }
.card-title { color: var(--c-text-title); margin-bottom: 5px; font-weight: bold; }
.card-tags .tag { display: inline-block; background: #3a3f45; color: var(--c-text-title); font-size: 10px; padding: 2px 5px; margin-right: 5px; border-radius: 4px; }

@media (max-width: 768px) {
  .page-photography { padding: 20px 16px; box-sizing: border-box; }
  .gallery-grid { grid-template-columns: 1fr; }
}




@media (max-width: 768px) {
  
}
</style>
