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
        <div
          class="search-wrap"
          ref="searchWrap"
          :class="{ expanded: searchExpanded }"
          @mousedown.stop
        >
          <button class="search-icon-btn" @click="onSearchIconClick" aria-label="搜索">
            <svg class="search-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M10.5 3a7.5 7.5 0 0 1 5.93 12.1l3.24 3.24a1 1 0 1 1-1.42 1.42l-3.24-3.24A7.5 7.5 0 1 1 10.5 3Zm0 2a5.5 5.5 0 1 0 0 11a5.5 5.5 0 0 0 0-11Z"
              />
            </svg>
          </button>
          <div class="search-panel">
            <input
              ref="searchInput"
              class="search-input"
              v-model.trim="searchText"
              @focus="searchOpen = true"
              @keydown.enter.prevent="applySearch"
              @blur="onSearchBlur"
              placeholder="搜索车型"
              aria-label="搜索车型"
            />
            <button
              v-if="appliedSearchText"
              class="search-clear-btn"
              @click="clearSearch"
              aria-label="清除搜索"
              type="button"
            >×</button>
            <div v-if="searchExpanded && searchOpen && searchText" class="search-suggest" role="listbox">
              <button
                v-for="name in searchSuggestions"
                :key="name"
                class="suggest-item"
                type="button"
                @mousedown.prevent.stop="chooseSuggestion(name)"
              >{{ name }}</button>
              <div v-if="!searchSuggestions.length" class="suggest-empty">无匹配车型</div>
            </div>
          </div>
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
        <div class="card-body">
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
        </div>
      </router-link>
    </div>
    <div class="total-count">共-{{ totalCarCount }}-条记录</div>
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
      filterOpen: false,
      searchText: '',
      appliedSearchText: '',
      searchOpen: false,
      searchExpanded: false
    }
  },
  computed: {
    totalCarCount() {
      return Array.isArray(this.cars) ? this.cars.length : 0
    },
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
    filteredCarsBase() {
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
    filteredCars() {
      return this.filteredCarsBase.filter(c => this.matchBySearch(c && c.title, this.appliedSearchText))
    },
    totalPages() {
      const len = this.filteredCars.length
      return Math.max(1, Math.ceil(len / this.pageSize))
    },
    paginatedCars() {
      const start = (this.page - 1) * this.pageSize
      return this.filteredCars.slice(start, start + this.pageSize)
    },
    searchSuggestions() {
      const list = this.filteredCarsBase
        .filter(c => this.matchBySearch(c && c.title, this.searchText))
        .map(c => c.title)
        .filter(Boolean)
      const set = new Set(list)
      return Array.from(set).slice(0, 30)
    }
  },
  methods: {
    normalizeText(s) {
      return String(s || '').toLowerCase().replace(/\s+/g, '')
    },
    matchBySearch(title, query) {
      const t = this.normalizeText(title)
      const q = this.normalizeText(query)
      if (!q) return true
      if (!t) return false
      if (t.includes(q)) return true
      const chars = Array.from(new Set(Array.from(q))).filter(ch => ch && ch.trim())
      return chars.every(ch => t.includes(ch))
    },
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
    onSearchBlur() {
      window.setTimeout(() => {
        this.searchOpen = false
      }, 120)
    },
    onSearchIconClick() {
      if (!this.searchExpanded) {
        this.openSearch()
        return
      }
      this.applySearch()
    },
    openSearch() {
      this.searchExpanded = true
      this.searchOpen = true
      this.$nextTick(() => {
        const el = this.$refs.searchInput
        if (el && typeof el.focus === 'function') el.focus()
      })
    },
    closeSearch() {
      this.searchOpen = false
      this.searchExpanded = false
    },
    onDocumentPointerDown(e) {
      if (!this.searchExpanded) return
      const wrap = this.$refs.searchWrap
      if (wrap && wrap.contains && wrap.contains(e.target)) return
      this.closeSearch()
    },
    chooseSuggestion(name) {
      this.searchText = name
      this.searchOpen = false
    },
    applySearch() {
      this.appliedSearchText = this.searchText || ''
      this.page = 1
      this.searchOpen = false
    },
    clearSearch() {
      this.searchText = ''
      this.appliedSearchText = ''
      this.page = 1
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
  mounted() {
    document.addEventListener('mousedown', this.onDocumentPointerDown)
  },
  beforeDestroy() {
    document.removeEventListener('mousedown', this.onDocumentPointerDown)
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
  font-family: 'MSYaHei-Semibold';
  src: url('~@/assets/fonts/wryh/msyhsb.ttc') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'PuHuiTi';
  src: url('~@/assets/fonts/AlibabaPuHuiTi-3-65-Medium.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

.page-cars { 
  padding: 20px;
  width: 100%;
  max-width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
}
.section-header { display: flex; justify-content: space-between; align-items: center; }
.section-header h2 { color: var(--c-text-title); font-weight: normal; letter-spacing: 2px; }
.header-left { display: flex; align-items: center; gap: 16px; }
.header-left { position: relative; }

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
  background: var(--c-border-default);
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
  color: var(--c-text-body-alt);
  font-size: 13px;
  margin: 0;
  cursor: pointer;
}
.filter-btn:hover { background: var(--c-primary-alpha-10); color: var(--c-text-emphasis); }
.filter-btn.active { background: var(--c-primary-alpha-20); color: var(--c-text-title); }

.chip {
  background: transparent;
  border: none;
  color: var(--c-text-body-alt);
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
.chip:hover { background: var(--c-primary-alpha-10); color: var(--c-text-emphasis); }

/* 标签按钮：激活状态，高亮边框与背景，白色文字 */
.chip.active {
  background: var(--c-primary-alpha-20);
  color: var(--c-text-title);
}

.clear-chip {
  border: none;
  padding: 0 12px;
}
.clear-chip:hover { }

.select {
  background: transparent;
  border: 1px solid var(--c-border-hover);
  color: var(--c-text-body-alt);
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
  border-color: var(--c-primary);
}
.select:hover {
  border-color: var(--c-primary);
}

.mobile-only { display: none; }
.filters-panel { display: none; }
.search-wrap {
  display: inline-flex;
  align-items: center;
  gap: 0;
  position: relative;
}
.search-panel {
  position: relative;
  width: 0;
  max-width: 0;
  margin-left: 0;
  opacity: 0;
  transform: scaleX(0.88);
  transform-origin: left center;
  pointer-events: none;
  overflow: hidden;
  transition: width 0.28s ease, max-width 0.28s ease, margin-left 0.28s ease, opacity 0.22s ease, transform 0.28s ease;
}
.search-wrap.expanded .search-panel {
  width: 200px;
  max-width: 200px;
  margin-left: 8px;
  opacity: 1;
  transform: scaleX(1);
  pointer-events: auto;
}
.search-input {
  background: transparent;
  border: 1px solid var(--c-border-hover);
  color: var(--c-text-body-alt);
  padding: 0 34px 0 12px;
  font-size: 12px;
  border-radius: 12px;
  height: 28px;
  line-height: 28px;
  width: 100%;
  box-sizing: border-box;
}
.search-input:focus,
.search-input:focus-visible {
  outline: none;
  border-color: var(--c-primary);
}
.search-input:hover { border-color: var(--c-primary); }
.search-icon-btn {
  height: 28px;
  width: 28px;
  padding: 0;
  border-radius: 999px;
  border: 1px solid rgba(102,192,244,0.55);
  background: var(--c-primary-alpha-20);
  color: var(--c-text-emphasis);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.search-icon-btn:hover {
  background: rgba(102,192,244,0.32);
  border-color: rgba(102,192,244,0.75);
}
.search-icon {
  width: 16px;
  height: 16px;
  display: block;
}
.search-clear-btn {
  position: absolute;
  right: 6px;
  top: 50%;
  transform: translateY(-50%);
  height: 22px;
  width: 22px;
  padding: 0;
  border-radius: 999px;
  border: 1px solid var(--c-primary-alpha-10);
  background: rgba(255,255,255,0.06);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  color: var(--c-text-body-alt);
  cursor: pointer;
  font-size: 14px;
  line-height: 20px;
}
.search-clear-btn:hover {
  background: var(--c-primary-alpha-10);
  color: var(--c-text-emphasis);
  border-color: rgba(102,192,244,0.6);
}
.search-suggest {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  width: 100%;
  min-width: 0;
  max-height: 320px;
  overflow: auto;
  background: var(--c-bg-panel-deep);
  border: 1px solid var(--c-border-default);
  border-radius: 8px;
  box-shadow: 0 10px 26px var(--c-shadow-heavy);
  padding: 6px;
  z-index: 10;
}
.suggest-item {
  width: 100%;
  text-align: left;
  background: transparent;
  border: none;
  color: var(--c-text-body-alt);
  padding: 8px 10px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  line-height: 1.2;
}
.suggest-item:hover { background: var(--c-primary-alpha-10); color: var(--c-text-emphasis); }
.suggest-empty {
  color: var(--c-text-muted);
  font-size: 12px;
  padding: 10px;
}

/* Grid 布局核心 */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); /* 自适应列 */
  gap: 20px;
}

@media (max-width: 768px) {
  /* 移动端：隐藏桌面端横向筛选条，改用底部抽屉式筛选 */
  .page-cars { padding: 10px; }
  .header-left { flex-wrap: wrap; row-gap: 10px; }
  .header-left h2 { order: 1; }
  .filter-toggle.mobile-only { order: 2; }
  .search-wrap { order: 3; }
  .filters { order: 4; }
  .filters { display: none; }
  .filter-toggle.mobile-only { display: inline-flex; }
  .search-wrap { flex: 0 0 auto; }
  .search-wrap.expanded .search-panel { width: clamp(120px, 45vw, 180px); }
  .search-suggest { width: 100%; }
  .filters-panel.mobile-sheet {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 50%;
    max-width: 360px;
    padding: 12px 14px;
    background: rgba(27, 40, 56, 0.75);
    backdrop-filter: blur(24px) saturate(120%);
    -webkit-backdrop-filter: blur(24px) saturate(120%);
    box-shadow: none;
    border-right: 1px solid rgba(255, 255, 255, 0.12);
    transform: translateX(-100%);
    transition: transform 0.25s ease;
    z-index: 1001;
    display: block;
  }
  .filters-panel.mobile-sheet.active { transform: translateX(0); }
  .sheet-mask.mobile-only {
    position: fixed;
    inset: 0;
    background: var(--c-shadow-medium);
    z-index: 1000;
    display: block;
  }
  .sheet-header { display: flex; align-items: center; justify-content: space-between; padding: 10px 12px; border-bottom: 1px solid var(--c-border-default); }
  .sheet-title { color: var(--c-text-muted); font-size: 14px; font-weight: 600; }
  .sheet-content { padding: 12px; display: flex; flex-direction: column; gap: 10px; }
  .sheet-subtitle { color: var(--c-text-muted); font-size: 13px; margin-top: 6px; }
  .filter-toggle.mobile-only {
    font-size: 14px;
    border: 1px solid var(--c-border-hover);
    border-radius: 6px;
    padding: 0 16px;
    height: 30px;
  }
  .filter-toggle.mobile-only:hover {
    background: var(--c-primary-alpha-10);
    color: var(--c-text-emphasis);
    border-color: var(--c-primary);
  }
  .filters-panel .filter-group { flex-direction: column; align-items: stretch; gap: 6px; }
  .filters-panel .select { width: 100%; height: 32px; font-size: 13px; }
  .gallery-grid { grid-template-columns: repeat(2, 1fr); gap: 6px; }
  .card-body { height: 160px; }
  .card-image { height: 80px; }
  .card-info { padding: 6px; }
  .card-title { margin-bottom: 4px; gap: 4px; font-size: 13px; }
  .brand-logo { width: 16px; height: 16px; }
  .card-tags { flex-wrap: nowrap; overflow-x: hidden; gap: 2px; }
  .card-tags .tag { padding: 1px 2px; font-size: 9px; white-space: nowrap; flex-shrink: 0; }
}
/* 分隔线：深色横线，用于区隔头部与内容区域 */
.divider { height: 2px; background: var(--c-border-strong); margin: 10px 0 30px 0; }

.gallery-card {
  background: var(--c-bg-l2);
  box-shadow: 0 4px 15px var(--c-shadow-medium);
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

.card-body {
  height: 230px;
  display: flex;
  flex-direction: column;
}

.card-image {
  height: 160px;
  background-size: cover;
  background-position: center;
  position: relative;
}

.card-info { padding: 12px; background: var(--c-bg-l3); flex: 1 1 auto; min-height: 0; overflow: hidden; }
.card-title { color: var(--c-text-title); margin-bottom: 8px; font-weight: normal; font-family: 'Motiva Sans', sans-serif; display: flex; align-items: center; gap: 8px; }
.card-title .title-text { display: inline-block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-family: 'PuHuiTi', 'SourceHanSansSC', sans-serif; }
.brand-logo { width: 24px; height: 24px; object-fit: contain; background: transparent; }
.brand-logo { height: 1em; width: auto; object-fit: contain; background: transparent; }
.card-tags { display: flex; align-items: center; gap: 6px; }
.card-tags .tag { display: inline-block; padding: 2px 6px; font-size: 10px; border-radius: 3px; }
.card-tags .tag-energy { background: #1a4d7a; color: var(--c-text-title); font-weight: 600; }
.card-tags .tag-body { background: #2e6b36; color: var(--c-text-title); font-weight: 600; }
.card-tags .tag-size { background: #3a3f45; color: var(--c-text-title); font-weight: 600; }
.total-count { margin-top: 26px; text-align: center; color: var(--c-text-muted); font-size: 12px; letter-spacing: 0.5px; }
.pagination { display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: 32px; }
.page-btn { background: none; border: none; color: var(--c-text-body-alt); padding: 6px 10px; cursor: pointer; border-radius: 4px; font-size: 12px; }
.page-btn:hover { color: var(--c-text-title); }
.page-btn.active { background: var(--c-border-strong); color: var(--c-text-title); }
.page-btn[disabled] { opacity: 0.5; cursor: not-allowed; }

  @media (max-width: 768px) {
    .back-text { display: none; }
    .card-body { height: auto; min-height: 140px; }
    .card-image { height: 100px; }
  }




@media (max-width: 768px) {
  
}
</style>
