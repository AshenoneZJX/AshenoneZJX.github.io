<template>
  <div class="page-brands">
    <div class="section-header">
      <h2>品牌介绍</h2>
      <button class="back-btn" @click="$router.push('/mySpace/cars-home')">
        <img src="@/assets/images/fanhui.svg" class="back-icon" alt="返回" />
        <span class="back-text">返回汽车主页</span>
      </button>
    </div>
    <div class="divider"></div>

    <div class="brands-grid">
      <div
        v-for="b in brands"
        :key="b.name"
        class="brand-card"
        @click="$router.push({ name: 'BrandDetail', params: { name: b.name } })"
      >
        <img v-if="getLogoUrl(b.name)" :src="getLogoUrl(b.name)" class="brand-logo" alt="" />
        <div class="brand-title">{{ b.name }}</div>
        <div class="brand-meta">车型数：{{ b.count }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import cars from '@/data/car/cars.json'
import brandLogos from '@/data/car/brandLogos.json'

function getBrand (title) {
  if (!title) return '未知'
  const parts = String(title).split(' ')
  return parts[0]
}

export default {
  name: 'BrandList',
  computed: {
    brands () {
      const map = new Map()
      cars.forEach(c => {
        const brand = getBrand(c.title)
        map.set(brand, (map.get(brand) || 0) + 1)
      })
      return Array.from(map.entries()).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count)
    }
  },
  methods: {
    getLogoUrl (name) {
      return brandLogos[name] || ''
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

.page-brands { 
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
}
.section-header { display: flex; justify-content: space-between; align-items: center; }
.section-header h2 { color: var(--c-text-title); font-weight: 400; letter-spacing: 2px; }
.divider { height: 2px; background: var(--c-border-strong); margin: 10px 0 30px 0; }

.brands-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
}
.brand-card {
  background-color: var(--c-bg-l2);
  padding: 14px;
  border-radius: 6px;
  box-shadow: 0 4px 15px var(--c-shadow-medium);
  cursor: pointer;
  transition: transform 0.2s;
  min-height: 120px;
  position: relative;
  overflow: hidden;
}
.brand-logo {
  position: absolute;
  left: 50%;
  top: 66.67%;
  width: 70%;
  transform: translate(-50%, -50%);
  z-index: 0;
  pointer-events: none;
  opacity: 0.8;
}
.brand-card::before {
  content: "";
  position: absolute;
  inset: 0;
  background: var(--c-shadow-medium);
  border-radius: 6px;
  pointer-events: none;
  z-index: 1;
}
/* 鼠标悬停时卡片上浮4px，产生轻微浮起效果 */
.brand-card:hover { transform: translateY(-4px); }
.brand-title { 
  color: var(--c-text-title); 
  font-weight: 600; 
  font-size: 18px; 
  margin-bottom: 6px; 
  position: relative; 
  z-index: 2;
  background: var(--c-shadow-heavy);
  padding: 4px 8px;
  border-radius: 4px;
  width: fit-content;
}
.brand-meta { 
  color: var(--c-primary); 
  font-size: 13px; 
  position: relative; 
  z-index: 2;
  background: var(--c-shadow-heavy);
  padding: 2px 6px;
  border-radius: 4px;
  width: fit-content;
}

@media (max-width: 768px) {
  .back-text { display: none; }
}




@media (max-width: 768px) {
  
}
</style>
