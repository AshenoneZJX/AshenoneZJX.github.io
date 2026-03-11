<template>
  <div class="page-photography">
    <div class="section-header">
      <h2>Photography</h2>
      <div class="actions">
        <button class="back-btn" @click="$router.push('/mySpace')">
          <img src="@/assets/images/fanhui.svg" class="back-icon" alt="返回" />
          返回总览
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
.page-photography { padding-top: 20px; }
.section-header { display: flex; justify-content: space-between; align-items: flex-end; }
.section-header h2 { color: #fff; font-weight: 300; letter-spacing: 2px; }
.actions .back-btn { background: transparent; border: 1px solid #3c4551; color: #c7d5e0; padding: 6px 12px; cursor: pointer; border-radius: 6px; display: inline-flex; align-items: center; gap: 6px; }
.back-icon {
  width: 16px;
  height: 16px;
  display: block;
}
.actions .back-btn:hover { color: #e6f3ff; background: rgba(102,192,244,0.12); }
.actions .back-btn:active, .actions .back-btn.router-link-active { background: rgba(102,192,244,0.22); color: #ffffff; }
.divider { height: 2px; background: #2a475e; margin: 10px 0 30px 0; }

.gallery-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 20px; }
.gallery-card { background: #16202d; box-shadow: 0 4px 15px rgba(0,0,0,0.4); transition: transform 0.2s; cursor: pointer; }
.gallery-card:hover { transform: translateY(-5px); }
.card-image { height: 160px; background-size: cover; background-position: center; position: relative; }
.hover-overlay { position: absolute; bottom: 0; left: 0; right: 0; padding: 8px 12px; background: rgba(0,0,0,0.5); color: #fff; font-weight: 600; letter-spacing: 1px; }
.card-info { padding: 12px; }
.card-title { color: #66c0f4; margin-bottom: 5px; font-weight: bold; }
.card-tags .tag { display: inline-block; background: #344658; color: #fff; font-size: 10px; padding: 2px 5px; margin-right: 5px; }
</style>
