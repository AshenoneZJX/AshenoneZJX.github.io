<template>
  <div class="page-brand-detail">
    <div class="section-header span-full">
      <div class="title-with-logo">
        <img v-if="brandLogoFor" class="brand-logo" :src="brandLogoFor" :alt="brandName" />
        <h2>{{ brandName }}</h2>
      </div>
      <router-link class="back-btn" to="/mySpace/brands">
        <img src="@/assets/images/fanhui.svg" class="back-icon" alt="返回" />
        <span class="back-text">返回</span>
      </router-link>
    </div>
    <div class="divider span-full"></div>

    <!-- 简介 -->
    <div class="wiki-box span-full" v-if="brandInfo && brandInfo.description">
      <p class="summary">{{ brandInfo.description }}</p>
    </div>

    <!-- 历史 -->
    <section class="brand-section span-full" v-if="brandInfo && brandInfo.history">
      <h3 class="section-title">
        <span class="icon">📜</span> 品牌历史
      </h3>
      <p class="history-text">{{ brandInfo.history }}</p>
    </section>

    <!-- 左侧：代表车型 (30%) -->
    <section class="brand-section col-left" v-if="brandModels.length">
      <h3 class="section-title">
        <span class="icon">🚗</span> 代表车型
      </h3>
      <ul class="models-list">
        <li
          v-for="m in representativeModelNames"
          :key="m"
          class="model-item"
        >
          <router-link
            v-if="carIdOfModelName(m) !== null"
            class="model-link"
            :to="{ name: 'CarDetail', params: { id: carIdOfModelName(m) } }"
          >{{ m }}</router-link>
          <span v-else class="model-name">{{ m }}</span>
        </li>
      </ul>
    </section>

    <!-- 右侧：核心技术 (70%) -->
    <section class="brand-section col-right" v-if="brandInfo && brandInfo.technology && brandInfo.technology.length">
      <h3 class="section-title">
        <span class="icon">🔬</span> 核心技术
      </h3>
      <div v-for="(tech, index) in brandInfo.technology" :key="index" class="tech-card">
        <div class="tech-header">{{ tech.title }}</div>
        <div class="tech-body">{{ tech.content }}</div>
      </div>
    </section>
    
    <div v-if="!brandInfo && brandModels.length === 0" class="empty-state span-full">
      暂无该品牌相关信息
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
  name: 'BrandDetail',
  computed: {
    brandName () {
      return this.$route.params.name
    },
    brandModels () {
      return cars.filter(c => getBrand(c.title) === this.brandName)
    },
    brandInfo () {
      return brandDetails[this.brandName] || null
    },
    brandLogoFor () {
      const name = this.brandName
      if (!name) return ''
      if (this.brandLogoMap && this.brandLogoMap[name]) return this.brandLogoMap[name]
      return ''
    },
    representativeModelNames () {
      const listFromDetails = (this.brandInfo && Array.isArray(this.brandInfo.models)) ? this.brandInfo.models : []
      const listFromCars = this.brandModels.map(c => this.modelNameOf(c))
      const merged = [...listFromDetails, ...listFromCars]
      const dedup = Array.from(new Set(merged.filter(Boolean)))
      return dedup
    }
  },
  data () {
    return {
      brandLogoMap: {}
    }
  },
  methods: {
    modelNameOf (car) {
      const t = car && car.title ? String(car.title) : ''
      const b = getBrand(t)
      if (b && t.startsWith(b)) return t.slice(b.length).trim()
      return t
    },
    carIdOfModelName (name) {
      const brand = this.brandName
      if (!name || !brand) return null
      const hit = cars.find(c => {
        const b = getBrand(c.title)
        if (b !== brand) return false
        const model = this.modelNameOf(c)
        return model === name
      })
      return hit ? hit.id : null
    }
  },
  created () {
    import('@/data/car/brandLogos.json').then(mod => { this.brandLogoMap = mod.default })
  }
}
</script>

<style scoped>
@font-face {
  font-family: 'Motiva Sans';
  src: url('~@/assets/fonts/MotivaSans-Regular_woff.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

.page-brand-detail {
  padding-top: 20px;
  width: 1200px;
  min-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
  padding-left: 20px;
  padding-right: 20px;
  /* Layout: Grid for 2-column support */
  display: grid;
  grid-template-columns: 3fr 7fr;
  column-gap: 40px;
  align-items: start;
}

.span-full {
  grid-column: 1 / -1;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title-with-logo {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  --brand-title-size: 28px;
}

.section-header h2 {
  color: #fff;
  font-weight: normal;
  letter-spacing: 2px;
  font-size: var(--brand-title-size);
  font-family: 'Motiva Sans', sans-serif;
}

.brand-logo {
  height: var(--brand-title-size);
  width: auto;
  object-fit: contain;
  border-radius: 4px;
  background: transparent;
}

.divider {
  height: 2px;
  background: #2a475e;
  margin: 10px 0 30px 0;
}

.back-btn { background: transparent; border: 1px solid #3c4551; color: #c7d5e0; padding: 6px 12px; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; border-radius: 6px; }
.back-icon {
  width: 16px;
  height: 16px;
  display: block;
}
.back-btn:hover { color: #e6f3ff; background: rgba(102,192,244,0.12); }

.brand-section {
  margin-bottom: 40px;
}

.section-title {
  color: #fff;
  font-size: 20px;
  font-weight: normal;
  font-family: 'Motiva Sans', sans-serif;
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 10px;
  display: flex;
  align-items: center;
}

.section-title .icon {
  margin-right: 10px;
  font-size: 20px;
}

.wiki-box {
  background: rgba(22, 32, 45, 0.5);
  border-left: 4px solid #66c0f4;
  padding: 16px 20px;
  border-radius: 0 4px 4px 0;
  margin-bottom: 30px;
}

.summary {
  color: #c6d4df;
  font-size: 16px;
  line-height: 1.6;
  margin: 0;
}

.history-text {
  color: #acb2b8;
  line-height: 1.8;
  font-size: 15px;
  text-indent: 2em;
}

.tech-card {
  background: #1b2838;
  border-radius: 8px;
  padding: 20px;
  border: 1px solid #2a475e;
}

.tech-header {
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 10px;
  color: #66c0f4;
}

.tech-body {
  color: #8f98a0;
  font-size: 14px;
  line-height: 1.6;
}

.empty-state {
  color: #666;
  text-align: center;
  padding: 40px;
}

/* 仅显示车型名称的列表样式 */
.models-list {
  list-style: disc;
  margin: 0;
  padding-left: 22px;
}
.model-item { line-height: 1.8; margin: 4px 0; font-size: 15px; }
.model-link {
  color: #66c0f4;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-weight: 500;
  transition: all 0.2s ease;
}
.model-link::after {
  content: "➜";
  font-size: 10px;
  opacity: 0.6;
  transform: translateX(0);
  transition: all 0.2s ease;
}
.model-link:hover { 
  color: #fff; 
  text-decoration: none; 
  background: rgba(102, 192, 244, 0.1);
  padding: 0 4px;
  margin: 0 -4px;
  border-radius: 4px;
}
.model-link:hover::after {
  opacity: 1;
  transform: translateX(2px);
  color: #66c0f4;
}
.model-name {
  color: #acb2b8;
}

.col-left {
  grid-column: 1;
  min-width: 0;
}
.col-right {
  grid-column: 2;
  min-width: 0;
  
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
}

.col-right .section-title {
  grid-column: 1 / -1;
  margin-bottom: 0;
}

@media (max-width: 768px) {
  .page-brand-detail {
    grid-template-columns: 1fr;
  }
  .col-left, .col-right {
    grid-column: 1;
  }
  
  .back-text { display: none; }
  .back-btn { padding: 6px; }
}
</style>
