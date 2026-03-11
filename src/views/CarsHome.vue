<template>
  <div class="page-cars-home">
    <div class="section-header">
      <div class="header-row">
        <h2>汽车主页</h2>
        <router-link class="back-btn" to="/mySpace" aria-label="返回 MySpace" title="返回 MySpace">
          <img src="@/assets/images/fanhui.svg" class="back-icon" alt="返回" />
          返回总览
        </router-link>
      </div>
      <div class="divider"></div>
    </div>

    <div class="dashboard-layout">
      <div class="charts-area">
      <div class="charts-toolbar">
        <label>月份</label>
        <select v-model="selectedMonth">
          <option v-for="m in monthsOptions" :key="m" :value="m">{{ m }}</option>
        </select>
        <div class="price-pop" ref="pricePop">
          <button class="filter-btn" @click="togglePriceFilter">价格</button>
          <transition name="fade">
            <div class="filter-popover" v-if="showPriceFilter" @click.stop>
              <div class="range-header">
                <span class="value">{{ Math.min(selectedPriceMin, selectedPriceMax).toFixed(0) }}-{{ Math.max(selectedPriceMin, selectedPriceMax).toFixed(0) }}万</span>
              </div>
              <div class="range-ticks">
                <span v-for="t in ticks" :key="t">{{ t }}</span>
                <span>不限</span>
              </div>
              <div class="range-track" :style="trackStyle"></div>
              <div class="range-inputs">
                <input
                  class="range-thumb min"
                  type="range"
                  :min="0"
                  :max="priceMax"
                  step="1"
                  v-model.number="selectedPriceMin"
                />
                <input
                  class="range-thumb max"
                  type="range"
                  :min="0"
                  :max="priceMax"
                  step="1"
                  v-model.number="selectedPriceMax"
                />
              </div>
            </div>
          </transition>
        </div>
        <span class="price-summary"><span class="value">{{ Math.min(selectedPriceMin, selectedPriceMax).toFixed(0) }}-{{ Math.max(selectedPriceMin, selectedPriceMax).toFixed(0) }}万</span></span>
        <button
          class="sort-btn"
          :aria-label="sortBy === 'sales' ? '销量倒序' : '名称排列'"
          :title="sortBy === 'sales' ? '销量倒序' : '名称排列'"
          @click="toggleSort"
        >排序：{{ sortBy === 'sales' ? '销量倒序' : '名称排列' }}</button>
        <label>车型</label>
        <select v-model="selectedType">
          <option v-for="t in typeOptions" :key="t" :value="t">{{ t }}</option>
        </select>
        <label>品牌</label>
        <select v-model="selectedBrand">
          <option v-for="b in brandOptions" :key="b" :value="b">{{ b }}</option>
        </select>
      </div>
      <YearlySalesRankingChart
        :title="`年度车型销量排名（${selectedMonth}）`"
        :items="filteredItems"
        :sort-by="sortBy"
      />
    </div>

    <div class="gallery-grid">
      <router-link class="gallery-card" to="/mySpace/car-basics">
        <div class="card-image" :style="bg('https://images.unsplash.com/photo-1645549047893-b0c6447aec2b?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0')">
          <div class="hover-overlay">汽车基础知识</div>
        </div>
      </router-link>

      <router-link class="gallery-card" to="/mySpace/cars">
        <div class="card-image" :style="bg('https://images.unsplash.com/photo-1692450931594-e076fcdb896f?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.1.0')">
          <div class="hover-overlay">车型总览列表</div>
        </div>
      </router-link>

      <router-link class="gallery-card" to="/mySpace/brands">
        <div class="card-image" :style="bg('https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.1.0')">
          <div class="hover-overlay">品牌介绍</div>
        </div>
      </router-link>
      
      <div class="gallery-card placeholder" aria-hidden="true"></div>
    </div>
    </div>
  </div>
  </template>

<script>
import YearlySalesRankingChart from './YearlySalesRankingChart.vue'
import sales2025 from '../data/2025_dcd_sales_rank.json'

function parsePriceRange (s) {
  if (!s) return [NaN, NaN]
  let t = String(s).trim()
  t = t.replace(/万|万元/g, '').replace(/\s+/g, '')
  const parts = t.split(/[-–—~至]/)
  if (parts.length >= 2) {
    const a = Number(String(parts[0]).replace(/[^\d.]/g, ''))
    const b = Number(String(parts[1]).replace(/[^\d.]/g, ''))
    return [isNaN(a) ? NaN : a, isNaN(b) ? NaN : b]
  }
  const v = Number(t.replace(/[^\d.]/g, ''))
  return [isNaN(v) ? NaN : v, isNaN(v) ? NaN : v]
}

function typeFromSeries (s) {
  if (!s) return '其他'
  const t = String(s)
  if (/SUV/i.test(t)) return 'SUV'
  if (/MPV/i.test(t)) return 'MPV'
  if (/车/.test(t)) return '轿车'
  return '其他'
}

export default {
  name: 'CarsHome',
  components: { YearlySalesRankingChart },
  data () {
    const months = Array.from(new Set((sales2025.items || []).map(i => i.month))).sort().reverse()
    const brands = Array.from(new Set((sales2025.items || []).map(i => i.brand).filter(Boolean))).sort()
    const maxPrice = (() => {
      const nums = (sales2025.items || []).map(i => {
        const r = parsePriceRange(i.priceRange)
        return r[1]
      }).filter(n => isFinite(n))
      const m = Math.max(0, ...nums)
      return Math.ceil(m * 10) / 10
    })()
    return {
      monthsOptions: months,
      typeOptions: ['全部', '轿车', 'SUV', 'MPV', '其他'],
      brandOptions: ['全部', ...brands],
      selectedMonth: months[0] || '',
      selectedType: '全部',
      selectedBrand: '全部',
      selectedPriceMin: 0,
      selectedPriceMax: maxPrice,
      priceMax: maxPrice,
      showPriceFilter: false,
      sortBy: 'sales'
    }
  },
  mounted () {
    document.addEventListener('click', this.handleDocClick)
  },
  beforeDestroy () {
    document.removeEventListener('click', this.handleDocClick)
  },
  computed: {
    filteredItems () {
      const base = Array.isArray(sales2025.items) ? sales2025.items : []
      const filtered = base.filter(i => {
        const monthOk = this.selectedMonth ? i.month === this.selectedMonth : true
        const [pmin, pmax] = parsePriceRange(i.priceRange)
        const selMin = Math.min(this.selectedPriceMin, this.selectedPriceMax)
        const selMax = Math.max(this.selectedPriceMin, this.selectedPriceMax)
        const priceOk = isFinite(pmin) && isFinite(pmax)
          ? (pmin <= selMax && pmax >= selMin)
          : true
        const typeOk = this.selectedType === '全部' ? true : typeFromSeries(i.seriesType) === this.selectedType
        const brandOk = this.selectedBrand === '全部' ? true : String(i.brand || '') === this.selectedBrand
        return monthOk && priceOk && typeOk && brandOk
      })
      return filtered.map(i => ({ modelName: i.seriesName || i.modelName, sales: i.sales }))
    },
    trackStyle () {
      const left = (this.selectedPriceMin / this.priceMax) * 100
      const right = (this.selectedPriceMax / this.priceMax) * 100
      const l = Math.min(left, right)
      const r = Math.max(left, right)
      return {
        background: `linear-gradient(to right, #e5e9f2 ${l}%, #f5c400 ${l}%, #f5c400 ${r}%, #e5e9f2 ${r}%)`
      }
    },
    ticks () {
      const candidates = [0, 5, 10, 15, 20, 25, 40, 60, 80, 100, 120]
      return candidates.filter(v => v <= this.priceMax)
    }
  },
  methods: {
    bg (url) {
      return { backgroundImage: `url(${url})` }
    },
    togglePriceFilter () {
      this.showPriceFilter = !this.showPriceFilter
    },
    handleDocClick (e) {
      if (!this.showPriceFilter) return
      const el = this.$refs.pricePop
      if (el && !el.contains(e.target)) {
        this.showPriceFilter = false
      }
    },
    toggleSort () {
      this.sortBy = this.sortBy === 'sales' ? 'name' : 'sales'
    },
    syncMin () {
      if (this.selectedPriceMin > this.selectedPriceMax) {
        this.selectedPriceMin = this.selectedPriceMax
      }
    },
    syncMax () {
      if (this.selectedPriceMax < this.selectedPriceMin) {
        this.selectedPriceMax = this.selectedPriceMin
      }
    }
  }
}
</script>

<style scoped>
.page-cars-home { 
  padding-top: 20px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.dashboard-layout {
  display: flex;
  gap: 20px;
  align-items: stretch;
}

.section-header h2 { color: #fff; font-weight: 400; letter-spacing: 2px; }
.header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.back-btn {
  background: transparent;
  border: none;
  color: #c7d5e0;
  padding: 4px 8px;
  border-radius: 6px;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.back-icon {
  width: 16px;
  height: 16px;
  display: block;
}
.back-btn:hover { background: rgba(102,192,244,0.12); color: #e6f3ff; }
.section-subheader h3 { color: #fff; font-weight: 400; letter-spacing: 1px; margin-top: 30px; }
.divider { height: 2px; background: #2a475e; margin: 10px 0 30px 0; }
.divider.small { height: 2px; background: #2a475e; margin: 8px 0 20px 0; }

.charts-area {
  background: #16202d;
  padding: 12px;
  border-radius: 6px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.4);
  margin-bottom: 0;
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}
.charts-toolbar {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #2a475e;
  padding-bottom: 10px;
}
.charts-toolbar label { color: #8a9aa8; font-size: 13px; }
.charts-toolbar select {
  background: #0f1924;
  color: #fff;
  border: 1px solid #2a475e;
  padding: 4px 8px;
  border-radius: 4px;
}
.sort-btn {
  background: transparent;
  border: none;
  color: #c7d5e0;
  padding: 4px 6px;
  border-radius: 6px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 28px;
}
.sort-btn:hover { background: rgba(102,192,244,0.12); color: #e6f3ff; }
.filter-btn { background: transparent; border: 1px solid #3c4551; color: #c7d5e0; padding: 6px 10px; border-radius: 6px; cursor: pointer; }
.filter-btn:hover { background: rgba(102,192,244,0.12); color: #e6f3ff; }
.price-summary { color: #c7d5e0; font-size: 13px; margin-left: 8px; margin-right: 8px; }
.price-summary .value { color: #ff5a5f; }
.charts-toolbar { position: relative; }
.price-pop { position: relative; display: inline-block; }
.filter-popover {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  width: 360px;
  background: #1b2838;
  border: 1px solid #3c4551;
  border-radius: 10px;
  padding: 12px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.45);
  z-index: 1000;
}
.filter-popover::before {
  content: "";
  position: absolute;
  top: -8px;
  left: 18px;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 8px solid #1b2838;
}
.drawer-close {
  background: transparent;
  border: none;
  color: #c7d5e0;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
}
.popover-actions { display: flex; justify-content: flex-end; margin-top: 8px; }
.price-filter { display: grid; gap: 8px; }
.range-header { color: #c7d5e0; }
.range-header .value { color: #ff5a5f; font-weight: 600; }
.range-ticks { display: flex; justify-content: space-between; color: #c7d5e0; font-size: 12px; }
.range-track {
  position: relative;
  height: 8px;
  border-radius: 6px;
  background: #e5e9f2;
}
.range-inputs { position: relative; height: 16px; margin-top: 4px; }
.range-thumb {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  pointer-events: auto;
}
.range-inputs { height: 32px; }
.range-thumb.min { top: 0; z-index: 2; }
.range-thumb.max { top: 16px; z-index: 2; }
.range-thumb::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #fff;
  border: 1px solid #3c4551;
  cursor: pointer;
}
.fade-enter-active,
.fade-leave-active { transition: opacity 180ms ease; }
.fade-enter-from,
.fade-leave-to { opacity: 0; }
.fade-enter-to,
.fade-leave-from { opacity: 1; }

.gallery-grid {
  width: 280px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 0;
  flex-shrink: 0;
}

.gallery-card {
  background: #16202d;
  box-shadow: 0 4px 15px rgba(0,0,0,0.4);
  transition: transform 0.2s;
  cursor: pointer;
  text-decoration: none;
}
.gallery-card:hover { transform: translateY(-5px); }
.card-image { height: 100px; background-size: cover; background-position: center; position: relative; }
.hover-overlay { position: absolute; bottom: 0; left: 0; right: 0; padding: 8px 12px; background: rgba(0,0,0,0.5); color: #fff; font-weight: 400; letter-spacing: 1px; }

.gallery-card.placeholder {
  height: 100px;
  cursor: default;
}
.gallery-card.placeholder:hover { transform: none; }

.charts-area >>> .chart-wrapper {
  flex: 1 1 auto;
  height: auto;
}

@media (max-width: 1000px) {
  .dashboard-layout {
    flex-direction: column;
  }
  .gallery-grid {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 20px;
    margin-top: 20px;
  }
  .card-image { height: 160px; }
  .gallery-card.placeholder { height: 160px; }
}
</style>
