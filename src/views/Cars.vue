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
      <h2>Cars</h2>
      <div class="actions">
        <button class="back-btn" @click="$router.push('/mySpace')">返回总览</button>
        <div class="filters">
          <div class="filter-group">
            <button
              v-for="opt in energyOptions"
              :key="opt"
              class="chip chip-energy"
              :class="{ active: selectedEnergy === opt }"
              @click="toggleEnergy(opt)"
            >{{ opt }}</button>
          </div>
          <div class="filter-group">
            <button
              v-for="opt in bodyOptions"
              :key="opt"
              class="chip chip-body"
              :class="{ active: selectedBody === opt }"
              @click="toggleBody(opt)"
            >{{ opt }}</button>
          </div>
        </div>
      </div>
    </div>
    <div class="divider"></div>

    <div class="gallery-grid">
      <router-link
        class="gallery-card"
        v-for="car in filteredCars"
        :key="car.id"
        :to="{ name: 'CarDetail', params: { id: car.id } }"
      >
        <div class="card-image" :style="{ backgroundImage: `url(${car.img})` }"></div>
        <div class="card-info">
          <div class="card-title">{{ car.title }}</div>
          <div class="card-tags">
            <span class="tag tag-energy">{{ car.energy }}</span>
            <span class="tag tag-body">{{ car.body }}</span>
          </div>
        </div>
      </router-link>
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
      cars: []
    }
  },
  computed: {
    filteredCars() {
      return this.cars.filter(c => {
        const energyOk = this.selectedEnergy ? c.energy === this.selectedEnergy : true
        const bodyOk = this.selectedBody ? c.body === this.selectedBody : true
        return energyOk && bodyOk
      })
    }
  },
  methods: {
    toggleEnergy(opt) {
      this.selectedEnergy = this.selectedEnergy === opt ? null : opt
    },
    toggleBody(opt) {
      this.selectedBody = this.selectedBody === opt ? null : opt
    }
  },
  created() {
    import('@/data/cars').then(mod => {
      this.cars = mod.default
    })
  }
}
</script>

<style scoped>
.page-cars { padding-top: 20px; }
.section-header { display: flex; justify-content: space-between; align-items: flex-end; }
.section-header h2 { color: #fff; font-weight: 300; letter-spacing: 2px; }
.actions { display: flex; align-items: center; gap: 12px; }
.actions .back-btn { background: #2a475e; border: 1px solid #3c4551; color: #c7d5e0; padding: 6px 12px; cursor: pointer; }
.actions .back-btn:hover { color: #fff; border-color: #66c0f4; }
.filters { display: flex; flex-direction: column; align-items: flex-start; gap: 6px; }
.filter-group { display: flex; align-items: center; gap: 10px; }
.chip { background: none; border: none; color: #c7d5e0; padding: 2px 0; font-size: 12px; cursor: pointer; }
.chip-energy.active { color: #66c0f4; }
.chip-body.active { color: #f7e38f; }
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
</style>
