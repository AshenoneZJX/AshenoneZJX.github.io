<template>
  <div class="page-brands">
    <div class="section-header">
      <h2>品牌介绍</h2>
      <button class="back-btn" @click="$router.push('/mySpace/cars-home')">返回汽车主页</button>
    </div>
    <div class="divider"></div>

    <div class="brands-grid">
      <div
        v-for="b in brands"
        :key="b.name"
        class="brand-card"
        :style="cardStyle(b.name)"
        @click="$router.push({ name: 'BrandDetail', params: { name: b.name } })"
      >
        <div class="brand-title">{{ b.name }}</div>
        <div class="brand-meta">车型数：{{ b.count }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import cars from '../data/cars.json'
import brandLogos from '../data/brandLogos.json'

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
    cardStyle (name) {
      const url = brandLogos[name]
      if (!url) return {}
      return {
        backgroundImage: `url(${url})`
      }
    }
  }
}
</script>

<style scoped>
.page-brands { 
  padding-top: 20px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}
.section-header { display: flex; justify-content: space-between; align-items: center; }
.section-header h2 { color: #fff; font-weight: bold; letter-spacing: 2px; }
.divider { height: 2px; background: #2a475e; margin: 10px 0 30px 0; }
.back-btn { background: transparent; border: none; color: #c7d5e0; padding: 6px 12px; cursor: pointer; border-radius: 6px; font-size: 16px; }
.back-btn:hover { color: #e6f3ff; background: rgba(102,192,244,0.12); }

.brands-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
}
.brand-card {
  background-color: #16202d;
  background-repeat: no-repeat;
  /* 品牌Logo定位：水平居中，垂直位于卡片65%位置，留出上方文字空间 */
  background-position: center 20px;
  /* 品牌Logo尺寸：占卡片宽度70%，保持比例缩放 */
  background-size: 70%;
  padding: 14px;
  border-radius: 6px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.4);
  cursor: pointer;
  transition: transform 0.2s;
  min-height: 120px;
  position: relative;
}
.brand-card::before {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.35);
  border-radius: 6px;
  pointer-events: none;
}
/* 鼠标悬停时卡片上浮4px，产生轻微浮起效果 */
.brand-card:hover { transform: translateY(-4px); }
.brand-title { color: #fff; font-weight: 600; font-size: 18px; margin-bottom: 6px; position: relative; z-index: 1; }
.brand-meta { color: #9cc9f5; font-size: 13px; position: relative; z-index: 1; }
</style>
