<template>
  <div class="page-brand-detail">
    <div class="section-header span-full">
      <div class="title-with-logo">
        <img v-if="brandLogoFor" class="brand-logo" :src="brandLogoFor" :alt="brandName" />
        <h2>{{ brandName }}</h2>
      </div>
      <button class="back-btn" @click="$router.push('/mySpace/brands')">
        <img src="@/assets/images/fanhui.svg" class="back-icon" alt="返回" />
        <span class="back-text">返回</span>
      </button>
    </div>
    <div class="divider span-full"></div>

    <!-- 简介 -->
    <blockquote class="wiki-box span-full" v-if="brandInfo && brandInfo.description">
      <p class="summary">{{ brandInfo.description }}</p>
    </blockquote>

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
        <h4 class="tech-header">{{ tech.title }}</h4>
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

@font-face {
  font-family: 'Motiva Sans';
  src: url('~@/assets/fonts/MotivaSans-Regular_woff.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'AlibabaPuHuiTi';
  src: url('~@/assets/fonts/AlibabaPuHuiTi-3-65-Medium.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

h2, h3, h4 {
  font-family: 'AlibabaPuHuiTi', 'Motiva Sans', sans-serif;
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
  color: var(--c-text-title);
  font-weight: 500;
  letter-spacing: 2px;
  font-size: var(--brand-title-size);
  font-family: 'AlibabaPuHuiTi', 'Motiva Sans', sans-serif;
  margin: 0;
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
  background: var(--c-border-strong);
  margin: 10px 0 30px 0;
}

.brand-section {
  margin-bottom: 40px;
}

.section-title {
  color: var(--c-text-title);
  font-size: 20px;
  font-weight: 500;
  font-family: 'AlibabaPuHuiTi', 'Motiva Sans', sans-serif;
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
  margin: 0 0 30px 0;
  padding: 24px 100px;
  background: linear-gradient(135deg, var(--c-primary-alpha-20) 0%, transparent 100%);
  border-left: 4px solid var(--c-primary);
  border-radius: 0;
  color: var(--c-text-body-alt);
  position: relative;
  box-shadow: 0 4px 12px var(--c-shadow-light);
  overflow: hidden;
  z-index: 1;
}

.wiki-box::before {
  content: '“';
  position: absolute;
  top: -10px;
  left: 10px;
  font-size: 100px;
  color: var(--c-primary-alpha-20);
  font-family: Georgia, serif;
  line-height: 1;
  z-index: -1;
  pointer-events: none;
}

.wiki-box::after {
  content: '”';
  position: absolute;
  bottom: -50px;
  right: 10px;
  font-size: 100px;
  color: var(--c-primary-alpha-20);
  font-family: Georgia, serif;
  line-height: 1;
  z-index: -1;
  pointer-events: none;
}

.wiki-box p {
  margin: 0;
  line-height: 1.8;
  font-size: 16px;
  font-style: italic;
  color: var(--c-text-title);
  letter-spacing: 0.5px;
}

.history-text {
  color: var(--c-text-muted);
  line-height: 1.8;
  font-size: 15px;
  text-indent: 2em;
}

.tech-card {
  background: var(--c-bg-l1);
  border-radius: 8px;
  padding: 10px;
  border: 1px solid var(--c-primary-alpha-20);
  box-shadow: 0 4px 12px var(--c-shadow-light);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.tech-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px var(--c-shadow-medium);
  border-color: var(--c-primary-alpha-40);
}

.tech-header {
  color: var(--c-text-title);
  font-weight: 500;
  font-family: 'AlibabaPuHuiTi', 'Motiva Sans', sans-serif;
  font-size: 18px;
  margin: 0 0 12px 0;
  display: inline-block;
  position: relative;
  z-index: 1;
}

.tech-header::after {
  content: '';
  position: absolute;
  bottom: 2px;
  left: 0;
  width: 100%;
  height: 8px;
  background: var(--c-primary-alpha-40);
  z-index: -1;
  border-radius: 2px;
}

.tech-body {
  color: var(--c-text-muted);
  font-size: 14px;
  line-height: 1.6;
}

.empty-state {
  color: var(--c-text-muted);
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
  color: var(--c-primary);
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
  color: var(--c-text-title); 
  text-decoration: none; 
  background: var(--c-primary-alpha-10);
  padding: 0 4px;
  margin: 0 -4px;
  border-radius: 4px;
}
.model-link:hover::after {
  opacity: 1;
  transform: translateX(2px);
  color: var(--c-primary);
}
.model-name {
  color: var(--c-text-muted);
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
}




@media (max-width: 768px) {
  
}
</style>
