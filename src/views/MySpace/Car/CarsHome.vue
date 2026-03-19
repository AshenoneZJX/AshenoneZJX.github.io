<template>
  <div class="page-cars-home">
    <div class="section-header">
      <div class="header-row">
        <h2>汽车主页</h2>
        <router-link class="back-btn" to="/mySpace" aria-label="返回 MySpace" title="返回 MySpace">
          <img src="@/assets/images/fanhui.svg" class="back-icon" alt="返回" />
          <span class="back-text">返回总览</span>
        </router-link>
      </div>
      <div class="divider"></div>
    </div>

    <div class="dashboard-layout">
      <div class="entry-col">
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
        </div>
      </div>

      <div class="info-col">
        <div class="info-browse">
          <div class="chart-block">
            <div class="charts-toolbar" :class="{ 'is-expanded': isMobileMenuOpen }">
              <div class="mobile-toggle-bar">
                <button class="menu-toggle-btn" @click="toggleMobileMenu">
                  筛选条件
                </button>
              </div>
              <div class="toolbar-controls">
                <label>月份</label>
                <select v-model="selectedMonth">
                  <option v-for="m in monthsOptions" :key="m" :value="m">{{ m }}</option>
                </select>
                <button
                  class="sort-btn"
                  :aria-label="sortBy === 'sales' ? '销量升序' : '名称排列'"
                  :title="sortBy === 'sales' ? '销量升序' : '名称排列'"
                  @click="toggleSort"
                >排序：{{ sortBy === 'sales' ? '销量升序' : '名称排列' }}</button>
                <label>车型</label>
                <select v-model="selectedType">
                  <option v-for="t in typeOptions" :key="t" :value="t">{{ t }}</option>
                </select>
                <label>品牌</label>
                <select v-model="selectedBrand">
                  <option v-for="b in brandOptions" :key="b" :value="b">{{ b }}</option>
                </select>
              </div>
            </div>
            <YearlySalesRankingChart
              :title="`年度车型销量排名（${selectedMonth}）`"
              :items="filteredItems"
              :sort-by="sortBy"
              sort-order="asc"
            />
          </div>
          <div class="charts-row">
            <div class="chart-block">
              <Top10SalesTabsChart :global-items="globalTop10" :china-items="chinaTop10" />
            </div>
            <div class="chart-block">
              <PriceSegmentsTabsChart :segments="priceSegments" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </template>


<script>
import YearlySalesRankingChart from './YearlySalesRankingChart.vue'
import Top10SalesTabsChart from './Top10SalesTabsChart.vue'
import PriceSegmentsTabsChart from './PriceSegmentsTabsChart.vue'
import sales2025 from '@/data/car/2025_dcd_sales_rank.json'
import sales from '@/data/car/sales.json'

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
  components: { YearlySalesRankingChart, Top10SalesTabsChart, PriceSegmentsTabsChart },
  data () {
    const months = Array.from(new Set((sales2025.items || []).map(i => i.month))).sort().reverse()
    const brands = Array.from(new Set((sales2025.items || []).map(i => i.brand).filter(Boolean))).sort()
    return {
      monthsOptions: months,
      typeOptions: ['全部', '轿车', 'SUV', 'MPV', '其他'],
      brandOptions: ['全部', ...brands],
      selectedMonth: months[0] || '',
      selectedType: '全部',
      selectedBrand: '全部',
      sortBy: 'sales',
      isMobileMenuOpen: false
    }
  },
  computed: {
    filteredItems () {
      const base = Array.isArray(sales2025.items) ? sales2025.items : []
      const filtered = base.filter(i => {
        const monthOk = this.selectedMonth ? i.month === this.selectedMonth : true
        const typeOk = this.selectedType === '全部' ? true : typeFromSeries(i.seriesType) === this.selectedType
        const brandOk = this.selectedBrand === '全部' ? true : String(i.brand || '') === this.selectedBrand
        return monthOk && typeOk && brandOk
      })
      return filtered.map(i => ({ modelName: i.seriesName || i.modelName, sales: i.sales }))
    },
    globalTop10 () {
      return sales && Array.isArray(sales.global_top10) ? sales.global_top10 : []
    },
    chinaTop10 () {
      return sales && Array.isArray(sales.china_top10) ? sales.china_top10 : []
    },
    priceSegments () {
      return sales && sales.price_segments && typeof sales.price_segments === 'object' ? sales.price_segments : {}
    }
  },
  methods: {
    bg (url) {
      return { backgroundImage: `url(${url})` }
    },
    toggleSort () {
      this.sortBy = this.sortBy === 'sales' ? 'name' : 'sales'
    },
    toggleMobileMenu () {
      this.isMobileMenuOpen = !this.isMobileMenuOpen
    }
  }
}
</script>

<style scoped>
.page-cars-home { 
  padding: 20px;
  width: 1200px;
  min-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
}

.dashboard-layout {
  display: flex;
  gap: 20px;
  align-items: stretch;
}

.entry-col {
  flex: 0 0 20%;
  min-width: 0;
}

.info-col {
  flex: 1 1 80%;
  min-width: 0;
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
  padding: 4px 10px;
  border-radius: 6px;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
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

.info-browse {
  padding-top: 0;
  padding-bottom: 0;
  padding-left: 0;
  padding-right: 0;
  margin-bottom: 0;
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.chart-block { width: 100%; background: #16202d; box-shadow: 0 4px 15px rgba(0,0,0,0.4); border-radius: 6px; padding: 12px; box-sizing: border-box; }
.chart-block > * + * { margin-top: 12px; }

.charts-row {
  display: flex;
  gap: 22px;
  width: 100%;
}
.charts-row .chart-block {
  flex: 1;
  min-width: 0;
}

.charts-toolbar {
  margin-bottom: 0;
  border-bottom: 1px solid #2a475e;
  padding-bottom: 10px;
  position: relative;
}
.mobile-toggle-bar {
  display: none;
}
.toolbar-controls {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
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
.filter-btn { background: transparent; border: none; color: #c7d5e0; padding: 6px 10px; border-radius: 6px; cursor: pointer; }
.filter-btn:hover { background: rgba(102,192,244,0.12); color: #e6f3ff; }
.charts-toolbar { position: relative; }
.drawer-close {
  background: transparent;
  border: none;
  color: #c7d5e0;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
}
.popover-actions { display: flex; justify-content: flex-end; margin-top: 8px; }
.fade-enter-active,
.fade-leave-active { transition: opacity 180ms ease; }
.fade-enter-from,
.fade-leave-to { opacity: 0; }
.fade-enter-to,
.fade-leave-from { opacity: 1; }

.gallery-grid {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 0;
}

.gallery-card {
  background: #16202d;
  box-shadow: 0 4px 15px rgba(0,0,0,0.4);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  transition: background 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
  cursor: pointer;
  text-decoration: none;
}
.gallery-card::after {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(102,192,244,0.14);
  opacity: 0;
  transition: opacity 0.18s ease;
  z-index: 1;
  pointer-events: none;
}
.gallery-card:hover {
  background: #1b2838;
  box-shadow: 0 6px 18px rgba(0,0,0,0.45);
}
.gallery-card:hover::after { opacity: 1; }
.card-image { height: 50px; background-size: cover; background-position: center; position: relative; }
.hover-overlay { position: absolute; bottom: 0; left: 0; right: 0; padding: 6px 10px; background: rgba(0,0,0,0.5); color: #fff; font-weight: 400; letter-spacing: 1px; font-size: 12px; z-index: 2; }

.info-browse >>> .chart-wrapper {
  flex: 1 1 auto;
  height: auto;
}
.info-browse >>> .chart {
  padding-left: 0;
  padding-right: 0;
  margin-left: 0;
  margin-right: 0;
}
.info-browse >>> canvas {
  padding-left: 0;
  padding-right: 0;
  margin-left: 0;
  margin-right: 0;
  display: block;
}

@media (max-width: 768px) {
  .dashboard-layout {
    flex-direction: column;
  }
  .charts-row {
    flex-direction: column;
  }
  .entry-col,
  .info-col {
    flex: 1 1 auto;
    width: 100%;
  }
  .gallery-grid {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 20px;
    margin-top: 20px;
    padding: 0;
    box-sizing: border-box;
  }
  .card-image { height: 56px; }
  
  .back-text { display: none; }
  .back-btn { padding: 4px; }
  
  .section-header { padding: 0; }
}

@media (max-width: 768px) {
  .mobile-toggle-bar {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 10px 0;
  }
  .menu-toggle-btn {
    background: rgba(102,192,244,0.12);
    border: 1px solid #3c4551;
    color: #66c0f4;
    padding: 6px 14px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
  }
  .toolbar-controls {
    display: none;
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
    padding-top: 10px;
    width: 100%;
  }
  .charts-toolbar.is-expanded .toolbar-controls {
    display: flex;
    position: absolute;
    top: 100%;
    margin-top: -15px;
    left: 0;
    width: fit-content;
    z-index: 999;
    background: rgba(27, 40, 56, 0.7);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    padding: 15px;
    border: 1px solid rgba(60, 69, 81, 0.5);
    border-radius: 6px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
    box-sizing: border-box;
  }
  /* 让 select 和 button 在移动端占满宽度或更易点击 */
  .charts-toolbar select {
    width: 100%;
    max-width: 200px;
  }
  .sort-btn {
    width: 100%;
    max-width: 200px;
  }
  
  .charts-toolbar {
    border-bottom: none;
  }
  
  .info-browse {
    padding: 10px;
    margin: 0;
  }
}
</style>
