<template>
  <div class="page-brand-detail">
    <div class="section-header">
      <div class="title-with-logo">
        <img v-if="brandLogoFor" class="brand-logo" :src="brandLogoFor" :alt="brandName" />
        <h2>{{ brandName }}</h2>
      </div>
      <router-link class="back-btn" to="/mySpace/brands">
        <img src="@/assets/images/fanhui.svg" class="back-icon" alt="返回" />
        返回
      </router-link>
    </div>
    <div class="divider"></div>

    <div class="brand-content">
      <!-- 简介 -->
      <section class="brand-intro" v-if="brandInfo && brandInfo.description">
        <div class="wiki-box">
          <p class="summary">{{ brandInfo.description }}</p>
        </div>
      </section>

      <!-- 历史 -->
      <section class="brand-section" v-if="brandInfo && brandInfo.history">
        <h3 class="section-title">
          <span class="icon">📜</span> 品牌历史
        </h3>
        <div class="wiki-text">
          <p>{{ brandInfo.history }}</p>
        </div>
      </section>

      <!-- 车型列表 -->
      <section class="brand-section" v-if="brandModels.length">
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

      <!-- 核心技术 -->
      <section class="brand-section" v-if="brandInfo && brandInfo.technology && brandInfo.technology.length">
        <h3 class="section-title">
          <span class="icon">🔬</span> 核心技术
        </h3>
        <div class="tech-grid">
          <div v-for="(tech, index) in brandInfo.technology" :key="index" class="tech-card">
            <div class="tech-header">{{ tech.title }}</div>
            <div class="tech-body">{{ tech.content }}</div>
          </div>
        </div>
      </section>
      
      <div v-if="!brandInfo && brandModels.length === 0" class="empty-state">
        暂无该品牌相关信息
      </div>
    </div>
  </div>
</template>

<script>
import cars from '../data/cars.json'
import brandDetails from '../data/brandDetails.json'

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
    import('@/data/brandLogos.json').then(mod => { this.brandLogoMap = mod.default })
  }
}
</script>

<style scoped>
.page-brand-detail {
  padding-top: 20px;
  max-width: 1200px;
  margin: 0 auto;
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
  font-weight: 700;
  letter-spacing: 2px;
  font-size: var(--brand-title-size);
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
  font-weight: 500;
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

.wiki-text p {
  color: #acb2b8;
  line-height: 1.8;
  font-size: 15px;
  text-indent: 2em;
}

.models-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
}

.model-card {
  background: #16202d;
  padding: 12px;
  border-radius: 6px;
  border: 1px solid transparent;
}

.model-img {
  width: 100%;
  height: 140px;
  object-fit: cover;
  border-radius: 4px;
}

.model-title {
  color: #fff;
  font-weight: 600;
  margin-top: 12px;
  font-size: 16px;
}

.model-meta {
  color: #66c0f4;
  font-size: 12px;
  margin-top: 4px;
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
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
  color: #acb2b8;
  text-decoration: none;
}
.model-link:hover { color: #66c0f4; text-decoration: underline; }
.model-link:focus { color: #66c0f4; text-decoration: underline; }
.model-name {
  color: #acb2b8;
}
</style>
