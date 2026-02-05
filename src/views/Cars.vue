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
        <button class="chip filter-toggle mobile-only" @click="toggleFilter">筛选</button>
        <div class="filters">
          <div class="filter-group">
            <button
              v-for="opt in energyOptions"
              :key="opt"
              class="chip"
              :class="{ active: selectedEnergies.includes(opt) }"
              @click="toggleEnergy(opt)"
            >{{ opt }}</button>
          </div>
          <span class="filter-sep" aria-hidden="true"></span>
          <div class="filter-group">
            <button
              v-for="opt in bodyOptions"
              :key="opt"
              class="chip"
              :class="{ active: selectedBody === opt }"
              @click="toggleBody(opt)"
            >{{ opt }}</button>
          </div>
        </div>
        <div class="filter-sheet mobile-only" :class="{ active: filterOpen }">
          <div class="sheet-header">
            <span class="sheet-title">筛选</span>
            <button class="chip" @click="closeFilter">关闭</button>
          </div>
          <div class="sheet-content">
            <div class="sheet-subtitle">能源类型</div>
            <div class="filter-group">
              <button
                v-for="opt in energyOptions"
                :key="opt"
                class="chip"
                :class="{ active: selectedEnergies.includes(opt) }"
                @click="toggleEnergy(opt)"
              >{{ opt }}</button>
            </div>
            <div class="sheet-subtitle">车型</div>
            <div class="filter-group">
              <button
                v-for="opt in bodyOptions"
                :key="opt"
                class="chip"
                :class="{ active: selectedBody === opt }"
                @click="toggleBody(opt)"
              >{{ opt }}</button>
            </div>
          </div>
        </div>
      </div>
      <button class="back-btn" @click="$router.push('/mySpace/cars-home')">返回汽车主页</button>
    </div>
    <div class="dropdown-mask mobile-only" v-if="filterOpen" @click="closeFilter"></div>
    <div class="divider"></div>

    <div class="gallery-grid">
      <router-link
        class="gallery-card"
        v-for="car in paginatedCars"
        :key="car.id"
        :to="{ name: 'CarDetail', params: { id: car.id } }"
      >
        <div class="card-image" :style="{ backgroundImage: `url(${car.img})` }"></div>
        <div class="card-info">
          <div class="card-title">{{ car.title }}</div>
          <div class="card-tags">
            <span class="tag tag-energy" v-for="e in energyList(car)" :key="e">{{ e }}</span>
            <span class="tag tag-body">{{ car.body }}</span>
          </div>
        </div>
      </router-link>
    </div>
    <div class="pagination" v-if="totalPages > 1">
      <button class="page-btn" :disabled="page === 1" @click="goPage(page - 1)">Prev</button>
      <button
        class="page-btn"
        v-for="n in totalPages"
        :key="n"
        :class="{ active: page === n }"
        @click="goPage(n)"
      >{{ n }}</button>
      <button class="page-btn" :disabled="page === totalPages" @click="goPage(page + 1)">Next</button>
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
      selectedEnergies: [],
      selectedBody: null,
      cars: [],
      page: 1,
      pageSize: 9,
      filterOpen: false
    }
  },
  computed: {
    filteredCars() {
      return this.cars.filter(c => {
        const selected = this.selectedEnergies
        const carEnergy = Array.isArray(c.energy) ? c.energy : [c.energy]
        const energyOk = selected.length ? selected.every(e => carEnergy.includes(e)) : true
        const bodyOk = this.selectedBody ? c.body === this.selectedBody : true
        return energyOk && bodyOk
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
    energyList(car) {
      return Array.isArray(car.energy) ? car.energy : [car.energy]
    },
    toggleFilter() {
      this.filterOpen = !this.filterOpen
    },
    closeFilter() {
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
    goPage(n) {
      if (n < 1) n = 1
      if (n > this.totalPages) n = this.totalPages
      this.page = n
    }
  },
  watch: {
    selectedEnergies() {
      this.page = 1
    },
    selectedBody() {
      this.page = 1
    }
  },
  created() {
    import('@/data/cars.json').then(mod => {
      this.cars = mod.default
    })
  }
}
</script>

<style scoped>
.page-cars { padding-top: 20px; }
.section-header { display: flex; justify-content: space-between; align-items: center; }
.section-header h2 { color: #fff; font-weight: bold; letter-spacing: 2px; }
.header-left { display: flex; align-items: center; gap: 16px; }
.header-left { position: relative; }
.back-btn { background: transparent; border: none; color: #c7d5e0; padding: 6px 12px; cursor: pointer; border-radius: 6px; font-size: 16px; }
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
}

/* 标签按钮：悬停高亮，边框与文字变色 */
.chip:hover { background: rgba(102,192,244,0.12); color: #e6f3ff; }

/* 标签按钮：激活状态，高亮边框与背景，白色文字 */
.chip.active {
  background: rgba(102,192,244,0.22);
  color: #ffffff;
}

.mobile-only { display: none; }
.filter-sheet {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 40%;
  max-width: 360px;
  background: #0f1a24;
  border-right: 1px solid #3c4551;
  box-shadow: 10px 0 24px rgba(0,0,0,0.45);
  transform: translateX(-100%);
  transition: transform 0.25s ease;
  z-index: 1001;
  display: none;
}
.filter-sheet.active { transform: translateX(0); display: block; }
.sheet-header { display: flex; align-items: center; justify-content: space-between; padding: 10px 12px; }
.sheet-title { color: #8f98a0; font-size: 16px; width: 100%; }
.sheet-content { padding: 12px; display: flex; flex-direction: column; gap: 10px; width: 100%; }
.sheet-subtitle { color: #8f98a0; font-size: 13px; padding: 2px 0; border-bottom: 1px solid #38424e; }
.dropdown-mask {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  z-index: 1000;
}

@media (max-width: 768px) {
  /* 移动端：隐藏桌面端横向筛选条，改用底部抽屉式筛选 */
  .filters { display: none; }
  .filter-toggle.mobile-only { display: inline-flex; }
  .filter-sheet.mobile-only { display: block; }
  .filter-sheet .filter-group { flex-direction: column; align-items: stretch; gap: 6px; }
  .filter-sheet .chip { width: 100%; justify-content: flex-start; padding: 0 14px; height: 30px; }
  .filter-sheet .filter-sep { width: 100%; height: 1px; background: #38424e; }
  .filter-sheet .sheet-header .chip { width: auto; margin-left: auto; justify-content: center; height: 28px; }
  .filter-toggle.mobile-only {
    font-size: 13px;
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
}
/* 分隔线：深色横线，用于区隔头部与内容区域 */
.divider { height: 2px; background: #2a475e; margin: 10px 0 30px 0; }

/* Grid 布局核心 */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); /* 自适应列 */
  gap: 20px;
}

.gallery-card {
  background: #16202d;
  box-shadow: 0 4px 15px rgba(0,0,0,0.4);
  border: 1px solid #3c4551;
  border-radius: 6px;
  transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s, background 0.2s;
  cursor: pointer;
  text-decoration: none;
  display: block;
}
.gallery-card:hover {
  transform: translateY(-8px);
  background: #1b2838;
  border-color: #66c0f4;
  box-shadow: 0 10px 25px rgba(0,0,0,0.45), 0 0 0 2px rgba(102,192,244,0.45);
}

.card-image {
  height: 160px;
  background-size: cover;
  background-position: center;
  position: relative;
}

.card-info { padding: 12px; }
.card-title { color: #66c0f4; margin-bottom: 8px; font-weight: bold; }
.card-tags { display: flex; align-items: center; gap: 6px; }
.card-tags .tag { display: inline-block; padding: 2px 6px; font-size: 10px; border-radius: 3px; }
.card-tags .tag-energy { background: #66c0f4; color: #0b1c2d; font-weight: 600; }
.card-tags .tag-body { background: #344658; color: #f7e38f; font-weight: 600; }
.pagination { display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: 20px; }
.page-btn { background: none; border: 1px solid #3c4551; color: #c7d5e0; padding: 6px 10px; cursor: pointer; border-radius: 4px; font-size: 12px; }
.page-btn:hover { color: #fff; border-color: #66c0f4; }
.page-btn.active { background: #2a475e; color: #fff; border-color: #66c0f4; }
.page-btn[disabled] { opacity: 0.5; cursor: not-allowed; }
</style>
