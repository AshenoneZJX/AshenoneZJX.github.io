<!--
  功能说明：
  本组件为“车辆展示页”，用于以卡片网格形式展示多款跑车。
  主要功能：
  1. 顶部标题栏含“Cars”标题及“返回总览”按钮，点击按钮可跳转至 /mySpace。
  2. 使用 CSS Grid 自适应布局，渲染 8 张跑车卡片，每张卡片包含：
     - 背景图（Unsplash 跑车图）
     - 悬停遮罩显示“VIEW DETAILS”
     - 标题与标签（Sport / V8）
  3. 整体采用暗色主题，悬停时卡片上浮 5px，提供视觉反馈。
-->

<template>
  <div class="page-cars">
    <div class="section-header">
      <div class="header-left">
        <h2>Cars</h2>
        <button class="filter-btn filter-toggle mobile-only" @click="toggleFilters">筛选</button>
        <div class="filters">
          <div class="filter-group">
            <select class="select" v-model="selectedEnergy">
              <option :value="null">全部能源</option>
              <option v-for="opt in energyOptions" :key="opt" :value="opt">{{ opt }}</option>
            </select>
          </div>
          <div class="filter-group">
            <select class="select" v-model="selectedBody">
              <option :value="null">全部车型</option>
              <option v-for="opt in bodyOptions" :key="opt" :value="opt">{{ opt }}</option>
            </select>
          </div>
          <div class="filter-group">
            <select class="select" v-model="selectedBrand">
              <option :value="null">全部品牌</option>
              <option v-for="opt in brandOptions" :key="opt" :value="opt">{{ opt }}</option>
            </select>
          </div>
          <div class="filter-group">
            <select class="select" v-model="selectedSizeClass">
              <option :value="null">全部尺寸</option>
              <option v-for="opt in sizeClassOptions" :key="opt" :value="opt">{{ opt }}</option>
            </select>
          </div>
          <button v-if="hasActiveFilters" class="chip clear-chip" @click="clearFilters">清除所有筛选</button>
        </div>
      </div>
      <button class="back-btn" @click="$router.push('/mySpace/cars-home')">
        <img src="@/assets/images/fanhui.svg" class="back-icon" alt="返回" />
        <span class="back-text">返回汽车主页</span>
      </button>
    </div>
    <aside class="filters-panel mobile-sheet" :class="{ active: filterOpen }">
      <div class="sheet-header">
        <span class="sheet-title">筛选</span>
      </div>
      <div class="sheet-content">
        <div class="sheet-subtitle">能源类型</div>
        <div class="filter-group">
          <select class="select" v-model="selectedEnergy">
            <option :value="null">全部能源</option>
            <option v-for="opt in energyOptions" :key="opt" :value="opt">{{ opt }}</option>
          </select>
        </div>
        <div class="sheet-subtitle">车型</div>
        <div class="filter-group">
          <select class="select" v-model="selectedBody">
            <option :value="null">全部车型</option>
            <option v-for="opt in bodyOptions" :key="opt" :value="opt">{{ opt }}</option>
          </select>
        </div>
        <div class="sheet-subtitle">品牌</div>
        <div class="filter-group">
          <select class="select" v-model="selectedBrand">
            <option :value="null">全部品牌</option>
            <option v-for="opt in brandOptions" :key="opt" :value="opt">{{ opt }}</option>
          </select>
        </div>
        <div class="sheet-subtitle">尺寸等级</div>
        <div class="filter-group">
          <select class="select" v-model="selectedSizeClass">
            <option :value="null">全部尺寸</option>
            <option v-for="opt in sizeClassOptions" :key="opt" :value="opt">{{ opt }}</option>
          </select>
        </div>
        <button v-if="hasActiveFilters" class="chip clear-chip" @click="clearFilters">清除所有筛选</button>
      </div>
    </aside>
    <div v-if="filterOpen" class="sheet-mask mobile-only" @click="closeFilters"></div>
    <div class="divider"></div>

    <div class="gallery-grid">
      <router-link
        class="gallery-card"
        v-for="car in paginatedCars"
        :key="car.id"
        :to="{ name: 'CarDetail', params: { id: car.id } }"
      >
        <div class="card-image" :style="coverBg(car)"></div>
        <div class="card-info">
          <div class="card-title">
            <img
              v-if="brandLogoFor(car)"
              class="brand-logo"
              :src="brandLogoFor(car)"
              :alt="car.brand"
            />
            <span class="title-text">{{ car.title }}</span>
          </div>
          <div class="card-tags">
            <span class="tag tag-energy" v-for="e in energyList(car)" :key="e">{{ e }}</span>
            <span class="tag tag-body">{{ car.body }}</span>
            <span class="tag tag-size" v-if="car.sizeClass">{{ car.sizeClass }}</span>
          </div>
        </div>
      </router-link>
    </div>
    <div class="pagination" v-if="totalPages > 1">
      <button class="page-btn" :disabled="page === 1" @click="goPage(page - 1)" aria-label="上一页">‹</button>
      <button
        class="page-btn"
        v-for="n in totalPages"
        :key="n"
        :class="{ active: page === n }"
        @click="goPage(n)"
      >{{ n }}</button>
      <button class="page-btn" :disabled="page === totalPages" @click="goPage(page + 1)" aria-label="下一页">›</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cars',
  data() {
    return {
      energyOptions: ['纯电', '混动', '燃油'],
      bodyOptions: ['轿车', 'SUV'],
      selectedEnergy: null,
      selectedBrand: null,
      selectedSizeClass: null,
      selectedEnergies: [],
      selectedBody: null,
      brandLogoMap: {},
      cars: [],
      page: 1,
      pageSize: 12,
      filterOpen: false
    }
  },
  computed: {
    hasActiveFilters() {
      return Boolean(this.selectedEnergy || this.selectedBody || this.selectedBrand || this.selectedSizeClass)
    },
    brandOptions() {
      const set = new Set(this.cars.map(c => c.brand).filter(Boolean))
      return Array.from(set)
    },
    sizeClassOptions() {
      const set = new Set(this.cars.map(c => c.sizeClass).filter(Boolean))
      return Array.from(set)
    },
    filteredCars() {
      return this.cars.filter(c => {
        const selected = this.selectedEnergies
        const carEnergy = Array.isArray(c.energy) ? c.energy : [c.energy]
        const energyOk = selected.length ? selected.every(e => carEnergy.includes(e)) : true
        const bodyOk = this.selectedBody ? c.body === this.selectedBody : true
        const brandOk = this.selectedBrand ? c.brand === this.selectedBrand : true
        const sizeOk = this.selectedSizeClass ? c.sizeClass === this.selectedSizeClass : true
        return energyOk && bodyOk && brandOk && sizeOk
      })
    },
    totalPages() {
      const len = this.filteredCars.length
      return Math.max(1, Math.ceil(len / this.pageSize))
    },
    paginatedCars() {
      const start = (this.page - 1) * this.pageSize
      return this.filteredCars.slice(start, start + this.pageSize)
    }
  },
  methods: {
    coverBg(car) {
      const imgs = Array.isArray(car.images) ? car.images : []
      const url = imgs.length ? imgs[0] : ''
      return { backgroundImage: url ? `url(${url})` : '' }
    },
    brandLogoFor(car) {
      if (car && car.brandLogo) return car.brandLogo
      if (this.brandLogoMap && car && car.brand && this.brandLogoMap[car.brand]) {
        return this.brandLogoMap[car.brand]
      }
      return ''
    },
    energyList(car) {
      return Array.isArray(car.energy) ? car.energy : [car.energy]
    },
    toggleFilters() {
      this.filterOpen = !this.filterOpen
    },
    closeFilters() {
      this.filterOpen = false
    },
    toggleEnergy(opt) {
      if (this.selectedEnergies.includes(opt)) {
        this.selectedEnergies = this.selectedEnergies.filter(e => e !== opt)
        return
      }
      if (opt === '纯电' && this.selectedEnergies.includes('燃油')) {
        this.selectedEnergies = this.selectedEnergies.filter(e => e !== '燃油')
      }
      if (opt === '燃油' && this.selectedEnergies.includes('纯电')) {
        this.selectedEnergies = this.selectedEnergies.filter(e => e !== '纯电')
      }
      this.selectedEnergies = [...this.selectedEnergies, opt]
    },
    toggleBody(opt) {
      this.selectedBody = this.selectedBody === opt ? null : opt
    },
    toggleBrand(opt) {
      this.selectedBrand = this.selectedBrand === opt ? null : opt
    },
    toggleSizeClass(opt) {
      this.selectedSizeClass = this.selectedSizeClass === opt ? null : opt
    },
    clearFilters() {
      this.selectedEnergy = null
      this.selectedEnergies = []
      this.selectedBody = null
      this.selectedBrand = null
      this.selectedSizeClass = null
      this.page = 1
    },
    goPage(n) {
      if (n < 1) n = 1
      if (n > this.totalPages) n = this.totalPages
      this.page = n
    }
  },
  watch: {
    selectedEnergies() { this.page = 1 },
    selectedBody() {
      this.page = 1
    },
    selectedEnergy() {
      this.selectedEnergies = this.selectedEnergy ? [this.selectedEnergy] : []
      this.page = 1
    },
    selectedBrand() {
      this.page = 1
    },
    selectedSizeClass() {
      this.page = 1
    }
  },
  created() {
    import('@/data/car/cars.json').then(mod => { this.cars = mod.default })
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

@font-face {
  font-family: 'MSYaHei-Semibold';
  src: url('~@/assets/fonts/wryh/msyhsb.ttc') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

.page-cars { 
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
}
.section-header { display: flex; justify-content: space-between; align-items: center; }
.section-header h2 { color: #fff; font-weight: normal; letter-spacing: 2px; }
.header-left { display: flex; align-items: center; gap: 16px; }
.header-left { position: relative; }
.back-btn { background: transparent; border: 1px solid #3c4551; color: #c7d5e0; padding: 4px 10px; cursor: pointer; border-radius: 6px; font-size: 14px; display: inline-flex; align-items: center; gap: 6px; }
.back-icon {
  width: 16px;
  height: 16px;
  display: block;
}
.back-btn:hover { color: #e6f3ff; background: rgba(102,192,244,0.12); }
.back-btn:active, .back-btn.router-link-active { background: rgba(102,192,244,0.22); color: #ffffff; }

/* 筛选按钮容器：横向排列，元素垂直居中，间距20px */
.filters { display: flex; flex-direction: row; align-items: center; gap: 20px; }

/* 单个筛选组：横向排列，带半透明背景、圆角边框与内边距 */
.filter-group {
  display: flex;
  align-items: center;
  gap: 0px;
  background: transparent;
  border-radius: 0;
  padding: 0;
}

.filter-sep {
  display: inline-block;
  width: 1px;
  height: 22px;
  background: #38424e;
  align-self: center;
}

/* 标签按钮：默认状态，深色背景，圆角，禁止换行 */
.filter-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 26px;
  padding: 0 14px;
  border-radius: 6px;
  border: none;
  background: transparent;
  color: #c7d5e0;
  font-size: 13px;
  margin: 0;
  cursor: pointer;
}
.filter-btn:hover { background: rgba(102,192,244,0.12); color: #e6f3ff; }
.filter-btn.active { background: rgba(102,192,244,0.22); color: #ffffff; }

.chip {
  background: transparent;
  border: none;
  color: #c7d5e0;
  padding: 0 20px;
  font-size: 12px;
  cursor: pointer;
  border-radius: 6px;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 28px;
  line-height: 1;
  font-family: 'MSYaHei-Semibold', sans-serif;
}

/* 标签按钮：悬停高亮，边框与文字变色 */
.chip:hover { background: rgba(102,192,244,0.12); color: #e6f3ff; }

/* 标签按钮：激活状态，高亮边框与背景，白色文字 */
.chip.active {
  background: rgba(102,192,244,0.22);
  color: #ffffff;
}

.clear-chip {
  border: none;
  padding: 0 12px;
}
.clear-chip:hover { }

.select {
  background: transparent;
  border: 1px solid #3c4551;
  color: #c7d5e0;
  padding: 0 8px;
  font-size: 12px;
  border-radius: 6px;
  height: 28px;
  line-height: 28px;
  width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.select:focus,
.select:focus-visible {
  outline: none;
  border-color: #66c0f4;
}
.select:hover {
  border-color: #66c0f4;
}

.mobile-only { display: none; }
.filters-panel { display: none; }

/* Grid 布局核心 */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); /* 自适应列 */
  gap: 20px;
}

@media (max-width: 768px) {
  /* 移动端：隐藏桌面端横向筛选条，改用底部抽屉式筛选 */
  .page-cars { padding: 10px; }
  .filters { display: none; }
  .filter-toggle.mobile-only { display: inline-flex; }
  .filters-panel.mobile-sheet {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 50%;
    max-width: 360px;
    padding: 12px 14px;
    background: #0f1a24;
    box-shadow: 10px 0 24px rgba(0,0,0,0.45);
    transform: translateX(-100%);
    transition: transform 0.25s ease;
    z-index: 1001;
    display: block;
  }
  .filters-panel.mobile-sheet.active { transform: translateX(0); }
  .sheet-mask.mobile-only {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.4);
    z-index: 1000;
    display: block;
  }
  .sheet-header { display: flex; align-items: center; justify-content: space-between; padding: 10px 12px; border-bottom: 1px solid #38424e; }
  .sheet-title { color: #8f98a0; font-size: 14px; font-weight: 600; }
  .sheet-content { padding: 12px; display: flex; flex-direction: column; gap: 10px; }
  .sheet-subtitle { color: #8f98a0; font-size: 13px; margin-top: 6px; }
  .filter-toggle.mobile-only {
    font-size: 14px;
    border: 1px solid #3c4551;
    border-radius: 6px;
    padding: 0 16px;
    height: 30px;
  }
  .filter-toggle.mobile-only:hover {
    background: rgba(102,192,244,0.12);
    color: #e6f3ff;
    border-color: #66c0f4;
  }
  .filters-panel .filter-group { flex-direction: column; align-items: stretch; gap: 6px; }
  .filters-panel .select { width: 100%; height: 32px; font-size: 13px; }
  .gallery-grid { grid-template-columns: repeat(2, 1fr); gap: 6px; }
  .card-image { height: 80px; }
  .card-info { padding: 6px; }
  .card-title { margin-bottom: 4px; gap: 4px; font-size: 13px; }
  .brand-logo { width: 16px; height: 16px; }
  .card-tags { flex-wrap: nowrap; overflow-x: hidden; gap: 2px; }
  .card-tags .tag { padding: 1px 2px; font-size: 9px; white-space: nowrap; flex-shrink: 0; }
}
/* 分隔线：深色横线，用于区隔头部与内容区域 */
.divider { height: 2px; background: #2a475e; margin: 10px 0 30px 0; }

.gallery-card {
  background: #16202d;
  box-shadow: 0 4px 15px rgba(0,0,0,0.4);
  border: none;
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s, filter 0.2s;
  cursor: pointer;
  text-decoration: none;
  display: block;
}
.gallery-card:hover {
  transform: translateY(-8px);
  filter: brightness(1.15);
  box-shadow: 0 10px 25px rgba(0,0,0,0.45);
}

.card-image {
  height: 160px;
  background-size: cover;
  background-position: center;
  position: relative;
}

.card-info { padding: 12px; background: #222e3b; }
.card-title { color: #ffffff; margin-bottom: 8px; font-weight: normal; font-family: 'Motiva Sans', sans-serif; display: flex; align-items: center; gap: 8px; }
.card-title .title-text { display: inline-block; }
.brand-logo { width: 24px; height: 24px; object-fit: contain; background: transparent; }
.brand-logo { height: 1em; width: auto; object-fit: contain; background: transparent; }
.card-tags { display: flex; align-items: center; gap: 6px; }
.card-tags .tag { display: inline-block; padding: 2px 6px; font-size: 10px; border-radius: 3px; }
.card-tags .tag-energy { background: #1a4d7a; color: #ffffff; font-weight: 600; }
.card-tags .tag-body { background: #2e6b36; color: #ffffff; font-weight: 600; }
.card-tags .tag-size { background: #3a3f45; color: #ffffff; font-weight: 600; }
.pagination { display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: 32px; }
.page-btn { background: none; border: none; color: #c7d5e0; padding: 6px 10px; cursor: pointer; border-radius: 4px; font-size: 12px; }
.page-btn:hover { color: #fff; }
.page-btn.active { background: #2a475e; color: #fff; }
.page-btn[disabled] { opacity: 0.5; cursor: not-allowed; }

  @media (max-width: 768px) {
    .back-text { display: none; }
    .back-btn { padding: 4px; }
  }
</style>
