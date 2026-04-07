<template>
  <div class="page-cars-home">
    <div class="section-header">
      <div class="header-row">
        <h2>汽车主页</h2>
        <button class="back-btn" aria-label="返回 MySpace" title="返回 MySpace" @click="$router.push('/mySpace')">
          <img src="@/assets/images/fanhui.svg" class="back-icon" alt="返回" />
          <span class="back-text">返回总览</span>
        </button>
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
            <div class="card-image" :style="bg(require('@/assets/images/cars.jpg'))">
              <div class="hover-overlay">车型总览</div>
            </div>
          </router-link>

          <router-link class="gallery-card" to="/mySpace/brands">
            <div class="card-image" :style="bg('https://images.unsplash.com/photo-1578148190071-173c57e882bd?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')">
              <div class="hover-overlay">品牌介绍</div>
            </div>
          </router-link>
        </div>
      </div>

      <div class="info-col">
        <div class="info-browse">
          <div class="chart-block chart-block-head">
            <div
              ref="chartsToolbar"
              class="charts-toolbar"
              :class="{ 'is-expanded': isMobileMenuOpen, 'use-collapse': shouldCollapseToolbar }"
            >
              <div v-if="shouldCollapseToolbar" class="mobile-toggle-bar">
                <button class="menu-toggle-btn" @click="toggleMobileMenu">
                  {{ isMobileMenuOpen ? '收起筛选条件' : '筛选条件' }}
                </button>
              </div>
              <div ref="toolbarControls" class="toolbar-controls">
                <label>月份</label>
                <select v-model="selectedMonth">
                  <option v-for="m in monthsOptions" :key="m" :value="m">{{ m }}</option>
                </select>
                <button
                  class="sort-btn"
                  :aria-label="sortLabel"
                  :title="sortLabel"
                  @click="toggleSort"
                >排序：{{ sortLabel }}</button>
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
          </div>
          <div class="chart-container chart-container-main">
            <YearlySalesRankingChart
              :title="`年度车型销量排名（${selectedMonth}）`"
              :items="filteredItems"
              :sort-by="sortBy"
              :sort-order="sortOrder"
            />
          </div>
          <div class="charts-row">
            <Top10SalesTabsChart :global-items="globalTop10" :china-items="chinaTop10" />
            <PriceSegmentsTabsChart :segments="priceSegments" />
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
      sortBy: 'sales', // 当前排序字段：'sales' 或 'name'
      sortOrder: 'desc', // 当前排序方向：'desc' 或 'asc'
      isMobileMenuOpen: false,
      shouldCollapseToolbar: false,
      controlsRequiredWidth: 0,
      toolbarResizeObserver: null
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.cacheControlsRequiredWidth()
      this.updateToolbarCollapse()
    })
    window.addEventListener('resize', this.updateToolbarCollapse, { passive: true })
    document.addEventListener('pointerdown', this.handleDocumentPointerDown)
    if (typeof ResizeObserver !== 'undefined' && this.$refs.chartsToolbar) {
      this.toolbarResizeObserver = new ResizeObserver(() => {
        this.updateToolbarCollapse()
      })
      this.toolbarResizeObserver.observe(this.$refs.chartsToolbar)
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.updateToolbarCollapse)
    document.removeEventListener('pointerdown', this.handleDocumentPointerDown)
    if (this.toolbarResizeObserver) {
      this.toolbarResizeObserver.disconnect()
      this.toolbarResizeObserver = null
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
    },
    sortLabel () {
      if (this.sortBy === 'sales') {
        return this.sortOrder === 'desc' ? '销量降序' : '销量升序'
      } else {
        return this.sortOrder === 'desc' ? '名称降序' : '名称升序'
      }
    }
  },
  methods: {
    bg (url) {
      return { backgroundImage: `url(${url})` }
    },
    toggleSort () {
      // 排序切换逻辑：销量降序 -> 销量升序 -> 名称升序 -> 名称降序 -> 销量降序
      if (this.sortBy === 'sales' && this.sortOrder === 'desc') {
        this.sortOrder = 'asc'
      } else if (this.sortBy === 'sales' && this.sortOrder === 'asc') {
        this.sortBy = 'name'
        this.sortOrder = 'asc'
      } else if (this.sortBy === 'name' && this.sortOrder === 'asc') {
        this.sortOrder = 'desc'
      } else {
        this.sortBy = 'sales'
        this.sortOrder = 'desc'
      }
      this.$nextTick(() => {
        this.cacheControlsRequiredWidth()
        this.updateToolbarCollapse()
      })
    },
    toggleMobileMenu () {
      this.isMobileMenuOpen = !this.isMobileMenuOpen
    },
    handleDocumentPointerDown (event) {
      if (!this.shouldCollapseToolbar || !this.isMobileMenuOpen) return
      const controls = this.$refs.toolbarControls
      if (!controls) return
      const target = event.target
      const clickedToggleBar = target instanceof Element && target.closest('.mobile-toggle-bar')
      if (clickedToggleBar) return
      if (!controls.contains(target)) {
        this.isMobileMenuOpen = false
      }
    },
    cacheControlsRequiredWidth () {
      const controls = this.$refs.toolbarControls
      if (!controls) return
      const children = Array.from(controls.children || [])
      if (children.length === 0) return
      const style = window.getComputedStyle(controls)
      const gap = Number.parseFloat(style.columnGap || style.gap || '0') || 0
      const width = children.reduce((sum, el) => sum + el.getBoundingClientRect().width, 0) + gap * (children.length - 1)
      if (width > this.controlsRequiredWidth) {
        this.controlsRequiredWidth = Math.ceil(width)
      }
    },
    updateToolbarCollapse () {
      const toolbar = this.$refs.chartsToolbar
      const controls = this.$refs.toolbarControls
      if (!toolbar || !controls) return
      const isMobile = window.matchMedia('(max-width: 768px)').matches
      if (!isMobile) {
        this.shouldCollapseToolbar = false
        this.isMobileMenuOpen = false
        return
      }
      if (!this.controlsRequiredWidth) {
        this.cacheControlsRequiredWidth()
      }
      const style = window.getComputedStyle(toolbar)
      const horizontalPadding = (Number.parseFloat(style.paddingLeft) || 0) + (Number.parseFloat(style.paddingRight) || 0)
      const availableWidth = toolbar.clientWidth - horizontalPadding
      const nextCollapse = this.controlsRequiredWidth > availableWidth
      this.shouldCollapseToolbar = nextCollapse
      if (!nextCollapse) {
        this.isMobileMenuOpen = false
      }
    }
  }
}
</script>

<style scoped>

.page-cars-home { 
  padding: 20px;
  width: 100%;
  max-width: 1200px;
  
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

.section-header h2 { color: var(--c-text-title); font-weight: 400; letter-spacing: 2px; }
.header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.section-subheader h3 { color: var(--c-text-title); font-weight: 400; letter-spacing: 1px; margin-top: 30px; }
.divider { height: 2px; background: var(--c-border-strong); margin: 10px 0 30px 0; }
.divider.small { height: 2px; background: var(--c-border-strong); margin: 8px 0 20px 0; }

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
  gap: 0; /* 移除外层 gap，通过内部元素控制间距 */
}

.chart-block {
  width: 100%;
  background: var(--c-bg-l2);
  border: 1px solid var(--c-border-default);
  border-radius: 10px;
  padding: 12px;
  box-sizing: border-box;
  box-shadow: 0 4px 15px var(--c-shadow-medium);
}
.chart-block-head {
  margin-bottom: 0;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-bottom: none;
  padding: 0;
}
.chart-container {
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 22px;
}
.chart-container-main {
  background: var(--c-bg-l2);
  border: 1px solid var(--c-border-default);
  border-top: none;
  border-radius: 0 0 10px 10px;
  padding-bottom: 12px;
  margin-top: 0;
  box-shadow: 0 4px 15px var(--c-shadow-medium);
}

.charts-row {
  display: flex;
  gap: 22px;
  width: 100%;
  margin-bottom: 22px;
}

.charts-toolbar {
  margin-bottom: 0;
  position: relative;
  border-bottom: 1px solid var(--c-border-default);
  padding: 12px 16px;
  min-height: auto;
  display: flex;
  align-items: center;
  box-sizing: border-box;
}
.mobile-toggle-bar {
  display: none;
}
.toolbar-controls {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  width: 100%;
}
.charts-toolbar label { color: var(--c-text-label); font-size: 13px; }
.charts-toolbar select {
  background: transparent;
  color: var(--c-text-body-alt);
  border: 1px solid var(--c-border-hover);
  padding: 0 10px;
  border-radius: 6px;
  height: 32px;
  width: auto;
  box-sizing: border-box;
}
.charts-toolbar select:hover {
  border-color: var(--c-primary);
}
.charts-toolbar select:focus,
.charts-toolbar select:focus-visible {
  outline: none;
  border-color: var(--c-primary);
}
.sort-btn {
  background: transparent;
  border: 1px solid var(--c-border-hover);
  color: var(--c-text-body-alt);
  padding: 0 12px;
  border-radius: 6px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  width: auto;
  box-sizing: border-box;
}
.sort-btn:hover {
  background: var(--c-primary-alpha-10);
  color: var(--c-text-emphasis);
  border-color: var(--c-primary);
}
.info-browse :deep(.charts-toolbar) {
  margin-bottom: 0;
  position: relative;
  border-bottom: 1px solid var(--c-border-default);
  padding: 8px 16px;
  min-height: auto;
  display: flex;
  align-items: center;
  box-sizing: border-box;
}
.info-browse :deep(.charts-toolbar .toolbar-controls) {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  width: 100%;
}
.info-browse :deep(.charts-toolbar button) {
  background: transparent;
  border: 1px solid var(--c-border-hover);
  color: var(--c-text-body-alt);
  padding: 0 10px;
  border-radius: 6px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 28px;
  width: auto;
  box-sizing: border-box;
}
.info-browse :deep(.charts-toolbar button:hover) {
  background: var(--c-primary-alpha-10);
  color: var(--c-text-emphasis);
  border-color: var(--c-primary);
}
.info-browse :deep(.charts-toolbar .tab-btn.active) {
  background: var(--c-primary-alpha-20);
  color: var(--c-text-title);
  border-color: var(--c-primary);
  font-weight: 500;
}
.filter-btn { background: transparent; border: none; color: var(--c-text-body-alt); padding: 6px 10px; border-radius: 6px; cursor: pointer; }
.filter-btn:hover { background: var(--c-primary-alpha-10); color: var(--c-text-emphasis); }
.charts-toolbar { position: relative; }
.drawer-close {
  background: transparent;
  border: none;
  color: var(--c-text-body-alt);
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
  background: var(--c-bg-l2);
  box-shadow: 0 4px 15px var(--c-shadow-medium);
  border: 1px solid var(--c-border-default);
  border-radius: 8px; /* 增加一点圆角让卡片感更强 */
  position: relative;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s, filter 0.2s;
  cursor: pointer;
  text-decoration: none;
  display: block;
}
.gallery-card:hover {
  transform: scale(1.03);
  filter: brightness(1.15);
  box-shadow: 0 10px 25px rgba(0,0,0,0.45);
}
.card-image { height: 160px; background-size: cover; background-position: center; position: relative; }
.hover-overlay { position: absolute; bottom: 0; left: 0; right: 0; padding: 12px 10px; background: var(--c-shadow-heavy); color: var(--c-text-title); font-weight: 500; letter-spacing: 1px; font-size: 14px; text-align: center; z-index: 2; }

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
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 15px;
    margin-top: 0;
    margin-bottom: 20px;
    padding: 0;
    box-sizing: border-box;
  }
  .gallery-card {
    flex: 1;
    min-width: 0;
    border-radius: 8px;
  }
  .card-image { 
    height: 120px;
  }
  .hover-overlay {
    padding: 8px 6px;
    font-size: 13px;
    text-align: center;
  }
  
  .section-header { padding: 0; }

  .info-browse {
    padding: 2px;
    margin: 0;
  }

  .charts-toolbar.use-collapse .mobile-toggle-bar {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 10px 0;
  }
  .menu-toggle-btn {
    background: var(--c-primary-alpha-10);
    border: 1px solid var(--c-border-hover);
    color: var(--c-primary);
    padding: 6px 14px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
  }
  .charts-toolbar.use-collapse .toolbar-controls {
    display: none;
  }
  .charts-toolbar.use-collapse.is-expanded .toolbar-controls {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
    padding-top: 10px;
    position: absolute;
    top: 100%;
    margin-top: -15px;
    left: 0;
    width: fit-content;
    z-index: 999;
    background:
      linear-gradient(145deg, rgba(255, 255, 255, 0.22), rgba(255, 255, 255, 0.06)),
      linear-gradient(180deg, rgba(34, 40, 52, 0.76), rgba(26, 31, 42, 0.64));
    backdrop-filter: blur(24px) saturate(180%);
    -webkit-backdrop-filter: blur(24px) saturate(180%);
    padding: 15px;
    border: 1px solid rgba(255, 255, 255, 0.22);
    border-radius: 6px;
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.22),
      0 12px 36px rgba(0, 0, 0, 0.35);
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
}
</style>
