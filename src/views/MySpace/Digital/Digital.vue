<template>
  <div class="page-digital">
    <div class="section-header">
      <h2>Digital</h2>
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
.back-btn {
  background: transparent;
  border: 1px solid var(--c-border-strong);
  color: var(--c-text-body-alt);
  padding: 6px 12px;
  cursor: pointer;
  border-radius: 6px;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-left: auto; /* Ensure right alignment in flex container */
  transition: all 0.2s ease;
  text-decoration: none;
}
.back-icon {
  width: 16px;
  height: 16px;
  display: block;
}
.back-btn:hover {
  color: var(--c-text-emphasis);
  background: var(--c-primary-alpha-10);
  border-color: var(--c-border-hover);
}
.back-btn:active, .back-btn.router-link-active {
  background: var(--c-bg-l1);
  border-color: var(--c-primary);
  color: var(--c-text-title);
}

.page-digital { 
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
.gallery-card { background: var(--c-bg-l2); box-shadow: 0 4px 15px var(--c-shadow-medium); transition: transform 0.2s; cursor: pointer; }
.gallery-card:hover { transform: translateY(-5px); }
.card-image { height: 160px; background-size: cover; background-position: center; position: relative; }
.hover-overlay { position: absolute; bottom: 0; left: 0; right: 0; padding: 8px 12px; background: var(--c-shadow-heavy); color: var(--c-text-title); font-weight: 600; letter-spacing: 1px; }
.card-info { padding: 12px; }
.card-title { color: var(--c-primary); margin-bottom: 5px; font-weight: bold; }
.card-tags .tag { display: inline-block; background: #344658; color: var(--c-text-title); font-size: 10px; padding: 2px 5px; margin-right: 5px; }

@media (max-width: 768px) {
  .page-digital { padding: 20px 16px; box-sizing: border-box; }
  .back-text { display: none; }
  .gallery-grid { grid-template-columns: 1fr; }
}




@media (max-width: 768px) {
  
}
</style>
