<template>
  <div class="page-brands">
    <div class="section-header">
      <div class="title-group">
        <h2>品牌介绍</h2>
        <span class="brand-count">品牌 -{{ brands.length }}- 个</span>
      </div>
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
        <div class="brand-card-header">
          <div class="brand-title">
            {{ b.name }}
            <span class="brand-meta-sub">{{ b.count }}</span>
          </div>
          <span class="brand-region-tag" :class="getRegionClass(b.region)">{{ b.region }}</span>
        </div>
        <img v-if="getLogoUrl(b.name)" :src="getLogoUrl(b.name)" class="brand-logo" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import cars from '@/data/car/cars.json'
import brandDetails from '@/data/car/brandDetails.json'

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
      // 从 cars.json 统计车型数量
      cars.forEach(c => {
        const brand = getBrand(c.title)
        map.set(brand, (map.get(brand) || 0) + 1)
      })
      
      // 确保 brandDetails.json 中的品牌都显示，即使没有关联的车型
      Object.keys(brandDetails).forEach(brand => {
        if (!map.has(brand)) {
          map.set(brand, 0)
        }
      })

      return Array.from(map.entries()).map(([name, count]) => {
        const detail = brandDetails[name] || {}
        return {
          name,
          count,
          region: detail.region || '其他'
        }
      }).sort((a, b) => {
        // 先按车系分类排序
        if (a.region !== b.region) {
          return a.region.localeCompare(b.region, 'zh-CN')
        }
        // 同车系内按车型数量降序排序
        return b.count - a.count
      })
    }
  },
  methods: {
    getLogoUrl (name) {
      return brandDetails[name] ? brandDetails[name].brandLogo : ''
    },
    getRegionClass (region) {
      const classMap = {
        '日系车': 'region-jp',
        '德系车': 'region-de',
        '欧洲车': 'region-eu',
        '美系车': 'region-us',
        '自主品牌': 'region-cn',
        '其他': 'region-other'
      }
      return classMap[region] || 'region-other'
    }
  }
}
</script>

<style scoped>

.page-brands { 
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
}
.section-header { display: flex; justify-content: space-between; align-items: center; }
.title-group { display: flex; align-items: baseline; gap: 12px; }
.section-header h2 { color: var(--c-text-title); font-weight: 400; letter-spacing: 2px; margin: 0; }
.brand-count { color: var(--c-text-muted); font-size: 13px; letter-spacing: 1px; }
.divider { height: 2px; background: var(--c-border-strong); margin: 10px 0 30px 0; }

.brands-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
}
.brand-card {
  background: #171B21;
  border: 1px solid var(--c-border-default);
  padding: 14px;
  border-radius: 10px;
  box-shadow: 0 4px 15px var(--c-shadow-medium);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s, filter 0.2s;
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
  opacity: 0.72;
}
/* 鼠标悬停时卡片上浮4px，产生轻微浮起效果 */
.brand-card:hover {
  transform: scale(1.03);
  filter: brightness(1.15);
  box-shadow: 0 10px 25px rgba(0,0,0,0.45);
}
.brand-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
  z-index: 2;
  margin-bottom: 6px;
}

.brand-title { 
  display: inline-flex;
  align-items: baseline;
  color: var(--c-text-title); 
  font-weight: 600; 
  font-size: 18px; 
  background: var(--c-shadow-heavy);
  padding: 4px 8px;
  border-radius: 4px;
}

.brand-meta-sub {
  font-size: 11px;
  font-weight: bold;
  color: var(--c-text-muted);
  margin-left: 4px;
  position: relative;
  top: 2px; /* 制造下标效果 */
}

.brand-region-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 18px; /* 固定一个小巧的高度 */
  padding: 0 4px; /* 极小内边距 */
  font-size: 10px; /* 字体随容器调整 */
  font-weight: bold;
  border-radius: 3px;
  color: #fff;
  letter-spacing: 0.5px;
  margin-top: 4px;
  white-space: nowrap;
}

.region-jp { background: #ffffff; color: #333; border: 1px solid #e0e0e0; }
.region-de { background: #212121; color: #fff; }
.region-cn { background: #d32f2f; color: #fff; }
.region-eu { background: #2e7d32; color: #fff; }
.region-us { background: #1976d2; color: #fff; }
.region-other { background: #2e7d32; color: #fff; }

@media (max-width: 768px) {
  .page-brands { padding: 20px 16px; }
  .brands-grid { 
    grid-template-columns: repeat(2, 1fr); 
    gap: 12px;
  }
}




@media (max-width: 768px) {
  
}
</style>
