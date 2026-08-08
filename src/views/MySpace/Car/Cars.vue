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
        <button class="filter-btn filter-toggle mobile-only" :class="{ 'has-active': hasActiveFilters }" @click="toggleFilters">
          <svg class="filter-toggle-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="currentColor"
              d="M4 6a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1Zm3 6a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1Zm3 6a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2h-2a1 1 0 0 1-1-1Z"
            />
          </svg>
          <span>筛选</span>
          <span v-if="hasActiveFilters" class="filter-dot" aria-hidden="true"></span>
        </button>
        <div class="header-tools">
        <div class="filters">
          <div class="filter-group">
            <select class="select" :class="{ 'has-value': selectedEnergy }" v-model="selectedEnergy">
              <option :value="null">全部能源</option>
              <option v-for="opt in energyOptions" :key="opt" :value="opt">{{ opt }}</option>
            </select>
          </div>
          <div class="filter-group">
            <select class="select" :class="{ 'has-value': selectedBody }" v-model="selectedBody">
              <option :value="null">全部车型</option>
              <option v-for="opt in bodyOptions" :key="opt" :value="opt">{{ opt }}</option>
            </select>
          </div>
          <div class="filter-group">
            <select class="select" :class="{ 'has-value': selectedBrand }" v-model="selectedBrand">
              <option :value="null">全部品牌</option>
              <option v-for="opt in brandOptions" :key="opt" :value="opt">{{ opt }}</option>
            </select>
          </div>
          <div class="filter-group">
            <select class="select" :class="{ 'has-value': selectedSizeClass }" v-model="selectedSizeClass">
              <option :value="null">全部尺寸</option>
              <option v-for="opt in sizeClassOptions" :key="opt" :value="opt">{{ opt }}</option>
            </select>
          </div>
          <button v-if="hasActiveFilters" class="chip clear-chip" @click="clearFilters">清除所有筛选</button>
          <span class="filter-sep" aria-hidden="true"></span>
        </div>
        </div>
        <div class="view-toggle" role="group" aria-label="视图切换">
          <button
            class="view-btn"
            :class="{ active: viewMode === 'grid' }"
            @click="viewMode = 'grid'"
            aria-label="宫格视图"
            title="宫格视图"
            type="button"
          >
            <svg class="view-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z"
              />
            </svg>
            <span class="view-label">宫格</span>
          </button>
          <button
            class="view-btn"
            :class="{ active: viewMode === 'list' }"
            @click="viewMode = 'list'"
            aria-label="列表视图"
            title="列表视图"
            type="button"
          >
            <svg class="view-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M4 6a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1Zm0 6a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1Zm0 6a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1Z"
              />
            </svg>
            <span class="view-label">列表</span>
          </button>
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
        <span class="sheet-title">
          <svg class="sheet-title-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="currentColor"
              d="M4 6a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2h-14a1 1 0 0 1-1-1Zm3 6a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1Zm3 6a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2h-2a1 1 0 0 1-1-1Z"
            />
          </svg>
          <span>筛选</span>
        </span>
      </div>
      <div class="sheet-content">
        <div class="sheet-subtitle">能源类型</div>
        <select class="select" :class="{ 'has-value': selectedEnergy }" v-model="selectedEnergy">
          <option :value="null">全部能源</option>
          <option v-for="opt in energyOptions" :key="opt" :value="opt">{{ opt }}</option>
        </select>
        <div class="sheet-subtitle">车型</div>
        <select class="select" :class="{ 'has-value': selectedBody }" v-model="selectedBody">
          <option :value="null">全部车型</option>
          <option v-for="opt in bodyOptions" :key="opt" :value="opt">{{ opt }}</option>
        </select>
        <div class="sheet-subtitle">品牌</div>
        <select class="select" :class="{ 'has-value': selectedBrand }" v-model="selectedBrand">
          <option :value="null">全部品牌</option>
          <option v-for="opt in brandOptions" :key="opt" :value="opt">{{ opt }}</option>
        </select>
        <div class="sheet-subtitle">尺寸等级</div>
        <select class="select" :class="{ 'has-value': selectedSizeClass }" v-model="selectedSizeClass">
          <option :value="null">全部尺寸</option>
          <option v-for="opt in sizeClassOptions" :key="opt" :value="opt">{{ opt }}</option>
        </select>
        <button v-if="hasActiveFilters" class="chip clear-chip" @click="clearFilters">清除所有筛选</button>
      </div>
    </aside>
    <div v-if="filterOpen" class="sheet-mask mobile-only" @click="closeFilters"></div>
    <div class="divider"></div>

    <div class="gallery-grid" :class="{ 'list-view': viewMode === 'list' }">
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
              <router-link
                v-if="car.brand && car.title.startsWith(car.brand)"
                class="brand-wrapper"
                :to="{ name: 'BrandDetail', params: { name: car.brand } }"
                @click.native.stop
              >
                <img
                  v-if="brandLogoFor(car)"
                  class="brand-logo"
                  :src="brandLogoFor(car)"
                  :alt="car.brand"
                />
                <span class="brand-link">{{ car.brand }}</span>
              </router-link>
              <div v-else-if="car.brand" class="brand-wrapper">
                <img
                  v-if="brandLogoFor(car)"
                  class="brand-logo"
                  :src="brandLogoFor(car)"
                  :alt="car.brand"
                />
                <span class="brand-text">{{ car.brand }}</span>
              </div>
              <span class="title-text">
                {{ modelNameFor(car) }}
              </span>
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
      <button class="page-btn page-nav-btn" :disabled="page === 1" @click="goPage(page - 1)" aria-label="上一页">‹</button>
      <button
        class="page-btn"
        v-for="n in totalPages"
        :key="n"
        :class="{ active: page === n }"
        @click="goPage(n)"
      >{{ n }}</button>
      <button class="page-btn page-nav-btn" :disabled="page === totalPages" @click="goPage(page + 1)" aria-label="下一页">›</button>
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
      viewMode: 'grid',
      searchText: '',
      appliedSearchText: '',
      searchOpen: false,
      searchExpanded: false,
      savedScrollPosition: 0
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
    modelNameFor(car) {
      if (!car) return ''
      const brand = car.brand || ''
      const t = car.title || ''
      if (brand && t.startsWith(brand)) {
        return t.slice(brand.length).trim()
      }
      return t
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
      this.closeSearch()
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
  beforeRouteEnter(to, from, next) {
    if (from.name === 'CarDetail' || from.name === 'SpecialCarDetail') {
      to.meta.isBackFromDetail = true
    } else {
      to.meta.isBackFromDetail = false
    }
    next()
  },
  activated() {
    document.addEventListener('mousedown', this.onDocumentPointerDown)
    if (this.$route.meta.isBackFromDetail) {
      window.setTimeout(() => {
        window.scrollTo(0, this.savedScrollPosition || 0)
      }, 50)
    } else {
      // Reset state when not returning from detail page
      this.clearFilters()
      this.clearSearch()
      this.savedScrollPosition = 0
      window.scrollTo(0, 0)
    }
  },
  deactivated() {
    document.removeEventListener('mousedown', this.onDocumentPointerDown)
  },
  beforeRouteLeave(to, from, next) {
    this.savedScrollPosition = window.scrollY || document.documentElement.scrollTop
    next()
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
    import('@/data/car/brandDetails.json').then(mod => { 
      const details = mod.default
      const map = {}
      for (const brand in details) {
        if (details[brand].brandLogo) {
          map[brand] = details[brand].brandLogo
        }
      }
      this.brandLogoMap = map
    })
  }
}
</script>

<style scoped>
.page-cars { 
  padding: 20px;
  width: 100%;
  max-width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
}
.section-header { display: flex; justify-content: space-between; align-items: center; }
.section-header h2 { color: var(--c-text-title); font-size: 28px; font-weight: 500; letter-spacing: 0; font-family: 'AlibabaPuHuiTi', sans-serif; }
.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
  flex-wrap: wrap;
}

/* 顶部工具区：筛选为一组（无外框背景），搜索按钮与视图切换独立显示在右侧 */
.header-tools {
  display: flex;
  align-items: center;
  gap: 4px;
  box-sizing: border-box;
}

/* 筛选工具栏：透明容器，仅承担横向布局 */
.filters {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
}

/* 单个筛选组：透明包裹，仅承担布局 */
.filter-group {
  display: flex;
  align-items: center;
  gap: 0;
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
  padding: 0 12px;
  font-size: 13px;
  cursor: pointer;
  border-radius: 6px;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 30px;
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
  border: 1px solid var(--c-border-default);
  padding: 0 12px;
  height: 30px;
  border-radius: 999px;
  font-size: 13px;
  color: var(--c-text-muted);
  transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}
.clear-chip::before {
  content: '✕';
  margin-right: 5px;
  font-size: 11px;
}
.clear-chip:hover {
  background: var(--c-primary-alpha-10);
  border-color: var(--c-primary-alpha-30);
  color: var(--c-text-emphasis);
}

/* 下拉筛选：最简样式，无背景填充与边框，仅文字 + chevron；选中值时文字高亮为主色 */
.select {
  appearance: none;
  -webkit-appearance: none;
  background-color: transparent;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%239da7b3' d='M6.7 9.7a1 1 0 0 1 1.4-1.4l3.9 3.9 3.9-3.9a1 1 0 1 1 1.4 1.4l-4.6 4.6a1 1 0 0 1-1.4 0Z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 6px center;
  background-size: 13px;
  border: 1px solid transparent;
  color: var(--c-text-body-alt);
  padding: 0 24px 0 10px;
  font-size: 14px;
  border-radius: 7px;
  height: 30px;
  line-height: 28px;
  width: auto;
  min-width: 88px;
  max-width: 160px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;
}
.select:hover {
  background-color: var(--c-primary-alpha-10);
  color: var(--c-text-emphasis);
}
.select:focus,
.select:focus-visible {
  outline: none;
  background-color: var(--c-primary-alpha-10);
  color: var(--c-text-emphasis);
}
.select.has-value {
  color: var(--c-primary);
}
.select option {
  background: var(--c-bg-panel-deep);
  color: var(--c-text-emphasis);
}

.mobile-only { display: none; }
.filters-panel { display: none; }
.search-wrap {
    display: inline-flex;
    align-items: center;
    gap: 0;
    position: relative;
    max-width: 100%;
    padding: 0;
    margin-right: 10px;
    box-sizing: border-box;
  }
/* 展开态：按钮与输入框合为一个圆角整体（统一 999px 弧度），容器提供边框与底色 */
.search-wrap.expanded {
  background: var(--c-bg-l2);
  border: 1px solid var(--c-border-default);
  border-radius: 999px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.25);
}
.search-wrap.expanded:focus-within {
  border-color: var(--c-primary-alpha-40);
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.25), 0 0 0 3px var(--c-primary-alpha-10);
}
.search-panel {
  position: relative;
  width: 0;
  max-width: 0;
  margin-left: 0;
  opacity: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 1;
  /* 展开/收起不做过渡动画 */
}
.search-wrap.expanded .search-panel {
  width: 200px;
  max-width: 200px;
  margin-left: 0;
  opacity: 1;
  pointer-events: auto;
}
.search-input {
  background: transparent;
  border: none;
  color: var(--c-text-title);
  padding: 0 34px 0 8px;
  font-size: 13px;
  border-radius: 999px;
  height: 32px;
  line-height: 32px;
  width: 100%;
  box-sizing: border-box;
}
.search-input::placeholder {
  color: var(--c-text-label);
}
.search-input:focus,
.search-input:focus-visible {
  outline: none;
}
.search-input:hover { border: none; }
.search-icon-btn {
  height: 32px;
  width: 32px;
  padding: 0;
  border-radius: 999px;
  border: 1px solid var(--c-border-default);
  background: var(--c-bg-l2);
  color: var(--c-text-emphasis);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275), background-color 0.2s ease, color 0.2s ease;
}
.search-icon-btn:hover {
  background: var(--c-primary-alpha-10);
  color: var(--c-primary);
}
.search-icon-btn:active {
  transform: scale(0.9);
}
.search-wrap.expanded .search-icon-btn {
  color: var(--c-primary);
  background: transparent;
  border-color: transparent;
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
  height: 20px;
  width: 20px;
  padding: 0;
  border-radius: 999px;
  border: none;
  background: rgba(255, 255, 255, 0.08);
  color: var(--c-text-body-alt);
  cursor: pointer;
  font-size: 13px;
  line-height: 18px;
  transition: background-color 0.2s ease, color 0.2s ease;
}
.search-clear-btn:hover {
  background: var(--c-primary-alpha-20);
  color: var(--c-text-title);
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
  border-radius: 12px;
  box-shadow: 0 12px 32px var(--c-shadow-heavy);
  padding: 6px;
  z-index: 10;
}
.search-suggest::-webkit-scrollbar {
  width: 8px;
}
.search-suggest::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.12);
  border-radius: 4px;
}
.search-suggest::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}
.suggest-item {
  width: 100%;
  text-align: left;
  background: transparent;
  border: none;
  color: var(--c-text-body-alt);
  padding: 8px 10px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 12px;
  line-height: 1.2;
  transition: background-color 0.15s ease, color 0.15s ease;
}
.suggest-item:hover { background: var(--c-primary-alpha-10); color: var(--c-text-title); }
.suggest-empty {
  color: var(--c-text-muted);
  font-size: 12px;
  padding: 10px;
}

/* 视图切换：分段控件，深色容器 + 激活段高亮（图标 + 文字） */
.view-toggle {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  background: #16191c;
  border: 1px solid var(--c-border-default);
  border-radius: 10px;
  padding: 3px;
}
.view-btn {
  height: 28px;
  min-width: 0;
  padding: 0 12px;
  border: none;
  border-radius: 7px;
  background: transparent;
  color: var(--c-text-muted);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 13px;
  transition: background-color 0.2s ease, color 0.2s ease;
}
.view-btn:hover {
  color: var(--c-text-emphasis);
}
.view-btn.active {
  background: #2d333b;
  color: var(--c-text-title);
}
.view-icon {
  width: 15px;
  height: 15px;
  display: block;
}
.view-label {
  line-height: 1;
}

/* Grid 布局核心 */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); /* 自适应列 */
  gap: 20px;
}

/* 列表视图：单列布局，卡片横向排列（左图右文） */
.gallery-grid.list-view {
  grid-template-columns: 1fr;
  gap: 14px;
}
.list-view .gallery-card:hover {
  transform: translateY(-2px);
}
.list-view .card-body {
  flex-direction: row;
  height: auto;
  align-items: stretch;
}
.list-view .card-image {
  width: 220px;
  height: auto;
  flex: 0 0 auto;
}
.list-view .card-info {
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  align-content: center;
  gap: 6px 12px;
  padding: 12px 18px;
}
.list-view .card-title {
  margin-bottom: 0;
  flex-wrap: wrap;
}
.list-view .card-tags {
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  /* 移动端：隐藏桌面端横向筛选条，改用底部抽屉式筛选 */
  .page-cars { padding: 10px; }
  .header-left { flex-wrap: nowrap; gap: 10px; width: 100%; min-width: 0; align-items: center; justify-content: flex-start; }
  .header-tools { flex: 1 1 auto; min-width: 0; }
  .header-left h2 { flex: 0 0 auto; margin: 0; }
  .filter-toggle.mobile-only { flex: 0 0 auto; display: inline-flex; }
  .search-wrap { flex: 0 0 auto; justify-content: flex-start; min-width: 0; display: flex; }
  .search-wrap.expanded { width: 60%; max-width: 240px; }
  .filters { display: none; }
  .search-wrap.expanded .search-panel { 
    width: 100%; 
    max-width: none; 
    flex: 1 1 auto; 
    margin-left: 0;
    min-width: 0; 
  }
  .search-suggest { width: 100%; }
  .filters-panel.mobile-sheet {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: min(68vw, 300px);
    padding: 0;
    background: linear-gradient(180deg, rgba(24, 27, 31, 0.96) 0%, rgba(18, 20, 24, 0.94) 100%);
    backdrop-filter: blur(20px) saturate(130%);
    -webkit-backdrop-filter: blur(20px) saturate(130%);
    box-shadow: 12px 0 36px rgba(0, 0, 0, 0.5);
    border-right: 1px solid rgba(255, 255, 255, 0.1);
    border-top-right-radius: 16px;
    border-bottom-right-radius: 16px;
    transform: translateX(-100%);
    transition: transform 0.25s ease;
    z-index: 2000;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .filters-panel.mobile-sheet.active { transform: translateX(0); }
  .sheet-mask.mobile-only {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.42);
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
    z-index: 1999;
    display: block;
  }
  .sheet-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 16px 12px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.12);
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0));
  }
  .sheet-title {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    color: var(--c-text-title);
    font-size: 17px;
    font-weight: 600;
    letter-spacing: 0.8px;
  }
  .sheet-title-icon {
    width: 16px;
    height: 16px;
    color: rgba(102, 192, 244, 0.95);
    flex: 0 0 auto;
  }
  .sheet-content {
    flex: 1 1 auto;
    overflow-y: auto;
    padding: 14px 16px 18px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .sheet-subtitle {
    color: var(--c-text-body-alt);
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.4px;
    margin-top: 8px;
    margin-bottom: -4px;
  }
  .filter-toggle.mobile-only {
    gap: 6px;
    font-size: 14px;
    border: 1px solid var(--c-border-default);
    border-radius: 999px;
    padding: 0 12px;
    height: 32px;
    background: var(--c-bg-l2);
  }
  .filter-toggle.mobile-only:hover {
    background: var(--c-primary-alpha-10);
    border-color: var(--c-primary-alpha-30);
    color: var(--c-text-emphasis);
  }
  .filter-toggle.mobile-only.has-active {
    border-color: var(--c-primary-alpha-40);
    color: var(--c-primary);
  }
  .filter-toggle-icon {
    width: 15px;
    height: 15px;
    flex: 0 0 auto;
  }
  .filter-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--c-primary);
    flex: 0 0 auto;
  }
  .filters-panel .select {
    width: 100%;
    max-width: none;
    height: 36px;
    font-size: 13px;
    border-radius: 10px;
    border-color: rgba(255, 255, 255, 0.2);
    background-color: rgba(0, 0, 0, 0.18);
    color: var(--c-text-title);
    padding: 0 32px 0 10px;
  }
  .filters-panel .select.has-value {
    border-color: var(--c-primary-alpha-40);
    color: var(--c-primary);
  }
  .filters-panel .clear-chip {
    width: 100%;
    height: 34px;
    margin-top: 6px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.06);
    color: var(--c-text-emphasis);
    padding: 0 12px;
  }
  .gallery-grid { grid-template-columns: repeat(2, 1fr); gap: 6px; }
  /* 移动端列表视图：保持单列横向卡片，缩小缩略图 */
  .gallery-grid.list-view { grid-template-columns: 1fr; gap: 8px; }
  .list-view .card-body { flex-direction: row; height: auto; min-height: 0; }
  .list-view .card-image { width: 120px; height: auto; }
  .list-view .card-info { min-height: 0; padding: 8px 10px; gap: 4px 8px; }
  .list-view .card-title { min-height: 0; padding: 0; }
  .card-body { height: 100%; }
  .card-image { height: 140px; aspect-ratio: auto; }
  .card-info { padding: 8px; min-height: 80px; }
  .card-title { margin-bottom: 0; gap: 4px; font-size: max(13px, min(4vw, 15px)); min-height: 32px; padding: 4px; box-sizing: border-box; }
  .brand-logo { width: 16px; height: 16px; }
  .card-tags { flex-wrap: nowrap; overflow-x: hidden; gap: 2px; }
  .card-tags .tag { padding: 1px 2px; font-size: 9px; white-space: nowrap; flex-shrink: 0; }
}
/* 分隔线：深色横线，用于区隔头部与内容区域 */
.divider { height: 2px; background: var(--c-border-strong); margin: 10px 0 30px 0; }

.gallery-card {
  background: #16191c;
  box-shadow: 0 2px 10px var(--c-shadow-medium);
  border: 1px solid var(--c-border-default);
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
  cursor: pointer;
  text-decoration: none;
  display: block;
}
.gallery-card:hover {
  transform: translateY(-4px);
  border-color: var(--c-border-hover);
  box-shadow: 0 12px 28px rgba(0,0,0,0.4);
}

.card-body {
  height: 100%;
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  border-radius: inherit;
  overflow: hidden;
}

.card-image {
  aspect-ratio: 16 / 10;
  width: 100%;
  background-size: cover;
  background-position: center;
  position: relative;
  filter: contrast(1.06) saturate(1.1) brightness(0.98);
  flex: 0 0 auto;
}
/* 质感滤镜：边缘暗角 + 上下轻微压暗，提升卡片图高级感 */
.card-image::after {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(0, 0, 0, 0.12) 0%, transparent 26%, transparent 74%, rgba(0, 0, 0, 0.24) 100%),
    radial-gradient(ellipse at center, transparent 58%, rgba(0, 0, 0, 0.36) 100%);
  pointer-events: none;
}

.card-info { padding: 12px 14px; width: 100%; box-sizing: border-box; background: #16191c; flex: 1 1 auto; min-height: 0; overflow: hidden; border-top: 1px solid var(--c-border-default); }
.card-title { color: var(--c-text-title); margin-bottom: 8px; font-weight: normal; font-family: 'Motiva Sans', sans-serif; display: flex; align-items: center; gap: 6px; min-width: 0; }
.card-title .title-text { display: inline-block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-family: 'PuHuiTi', 'SourceHanSansSC', sans-serif; font-size: 15px; font-weight: normal;}

.brand-wrapper {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;
  transition: background-color 0.2s ease;
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 6px;
  flex: 0 0 auto;
}

.brand-wrapper:hover {
  background: var(--c-primary-alpha-10);
}

.brand-link {
  color: var(--c-primary);
  text-decoration: none;
  font-family: 'PuHuiTi', 'SourceHanSansSC', sans-serif;
  font-weight: normal;
  font-size: 15px;
}

/* 移除之前的文本单独hover效果 */
.brand-wrapper:hover .brand-link {
  color: var(--c-primary);
  text-decoration: none;
  text-shadow: none;
}

.brand-text {
  font-family: 'PuHuiTi', 'SourceHanSansSC', sans-serif;
  font-weight: normal;
  font-size: 15px;
  color: var(--c-text-title);
}

.brand-logo { width: 24px; height: 24px; object-fit: contain; background: transparent; }
.brand-logo { height: 1em; width: auto; max-width: 2.2em; object-fit: contain; background: transparent; }
.card-tags { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
.card-tags .tag { display: inline-block; padding: 2px 8px; font-size: 11px; border-radius: 999px; border: 1px solid transparent; }
.card-tags .tag-energy { background: rgba(88, 166, 255, 0.14); border-color: rgba(88, 166, 255, 0.25); color: #8ab4ff; font-weight: 500; }
.card-tags .tag-body { background: rgba(63, 185, 80, 0.12); border-color: rgba(63, 185, 80, 0.25); color: #56d364; font-weight: 500; }
.card-tags .tag-size { background: rgba(139, 148, 158, 0.12); border-color: rgba(139, 148, 158, 0.25); color: var(--c-text-body-alt); font-weight: 500; }
.total-count { margin-top: 26px; text-align: center; color: var(--c-text-muted); font-size: 12px; letter-spacing: 0.5px; }
.pagination { display: flex; align-items: center; justify-content: center; gap: 10px; margin-top: 32px; }
.page-btn {
  min-width: 32px;
  height: 32px;
  background: transparent;
  border: 1px solid var(--c-border-default);
  color: var(--c-text-body-alt);
  padding: 0 10px;
  cursor: pointer;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.2s ease;
}
.page-btn:hover {
  background: rgba(154, 160, 166, 0.16);
  color: var(--c-text-title);
  border-color: #8a9098;
}
.page-btn.active {
  background: #8a9098;
  color: #ffffff;
  border-color: #8a9098;
  box-shadow: 0 4px 10px rgba(138, 144, 152, 0.35);
}
.page-nav-btn {
  min-width: 40px;
  font-size: 16px;
  font-weight: 700;
  color: #d3d7dd;
}
.page-btn[disabled] {
  opacity: 0.4;
  cursor: not-allowed;
  background: transparent;
  border-color: var(--c-border-default);
  box-shadow: none;
}

  @media (max-width: 768px) {
    .card-body { height: 100%; }
    .card-image { height: 120px; aspect-ratio: auto; }
    .card-info { padding: 8px; min-height: 50px; }
    .card-title { min-height: 32px; padding: 4px; margin-bottom: 0; box-sizing: border-box; font-size: max(13px, min(4vw, 15px)); }
  }




@media (max-width: 768px) {
  
}
</style>
