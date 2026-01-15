<template>
  <div class="page-digital">
    <div class="section-header">
      <h2>Digital</h2>
      <div class="actions">
        <button class="back-btn" @click="$router.push('/mySpace')">返回总览</button>
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
  name: 'Digital',
  data() {
    return {
      items: [
        { title: 'Gaming Laptop', img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=60', tags: ['RTX', '16GB'] },
        { title: 'Mechanical Keyboard', img: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=900&q=60', tags: ['Cherry', 'RGB'] },
        { title: 'Smartphone', img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=60', tags: ['OLED', '5G'] },
        { title: 'Wireless Headset', img: 'https://images.unsplash.com/photo-1518443892821-4c92fca02a0a?auto=format&fit=crop&w=900&q=60', tags: ['ANC', 'Bluetooth'] },
        { title: 'Ultrawide Monitor', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=60', tags: ['144Hz', 'IPS'] }
      ]
    }
  }
}
</script>

<style scoped>
.page-digital { padding-top: 20px; }
.section-header { display: flex; justify-content: space-between; align-items: flex-end; }
.section-header h2 { color: #fff; font-weight: 300; letter-spacing: 2px; }
.actions .back-btn { background: transparent; border: none; color: #c7d5e0; padding: 6px 12px; cursor: pointer; border-radius: 6px; }
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
