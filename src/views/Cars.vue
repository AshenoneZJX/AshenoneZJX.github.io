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
        <div class="filters">
          <div class="filter-group">
            <button
              v-for="opt in energyOptions"
              :key="opt"
              class="chip"
              :class="{ active: selectedEnergy === opt }"
              @click="toggleEnergy(opt)"
            >{{ opt }}</button>
          </div>
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
      <button class="back-btn" @click="$router.push('/mySpace')">返回总览</button>
    </div>
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
      selectedEnergy: null,
      selectedBody: null,
      cars: [],
      page: 1,
      pageSize: 9
    }
  },
  computed: {
    filteredCars() {
      return this.cars.filter(c => {
        const energyOk = this.selectedEnergy
          ? (Array.isArray(c.energy) ? c.energy.includes(this.selectedEnergy) : c.energy === this.selectedEnergy)
          : true
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
    toggleEnergy(opt) {
      this.selectedEnergy = this.selectedEnergy === opt ? null : opt
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
    selectedEnergy() {
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
.section-header h2 { color: #fff; font-weight: 300; letter-spacing: 2px; }
.header-left { display: flex; align-items: center; gap: 16px; }
.back-btn { background: #2a475e; border: 1px solid #3c4551; color: #c7d5e0; padding: 6px 12px; cursor: pointer; }
.back-btn:hover { color: #fff; border-color: #66c0f4; }
.filters { display: flex; flex-direction: row; align-items: center; gap: 20px; }
.filter-group {
  display: flex;
  align-items: center;
  gap: 0;
  background: rgba(26, 39, 55, 0.6);
  border: 1px solid #3c4551;
  border-radius: 5px;
  padding: 2px 10px;
}
.chip { background: none; border: none; color: #c7d5e0; padding: 2px 0; font-size: 12px; cursor: pointer; }
.chip:hover { color: #fff; }
.filter-group .chip + .chip {
  border-left: 1px solid #3c4551;
  margin-left: 8px;
  padding-left: 8px;
}
.chip.active { color: #fff; text-decoration: underline; font-weight: 600; }
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
  transition: transform 0.2s;
  cursor: pointer;
  text-decoration: none;
  display: block;
}
.gallery-card:hover { transform: translateY(-5px); }

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
