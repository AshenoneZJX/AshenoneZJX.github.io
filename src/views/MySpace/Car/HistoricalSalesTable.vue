<template>
  <div class="sales-chart-wrapper chart-block">
    <div class="charts-toolbar">
      <div class="toolbar-controls">
        <label>年份</label>
        <select v-model="selectedYear">
          <option v-for="y in yearOptions" :key="y" :value="y">{{ y }}</option>
        </select>
        <label>车系类型</label>
        <select v-model="selectedType">
          <option v-for="t in typeOptions" :key="t" :value="t">{{ t }}</option>
        </select>
        <label>品牌</label>
        <select v-model="selectedBrand">
          <option v-for="b in brandOptions" :key="b" :value="b">{{ b }}</option>
        </select>
      </div>
    </div>
    <div class="chart-container-main">
      <div ref="chart" class="chart" :style="{ height: chartHeight + 'px' }"></div>
      
      <!-- 分页控制 -->
      <div class="pagination" v-if="totalPages > 1">
        <button 
          class="page-btn" 
          :disabled="currentPage === 1"
          @click="currentPage--"
        >上一页</button>
        <span class="page-info">{{ currentPage }} / {{ totalPages }}</span>
        <button 
          class="page-btn" 
          :disabled="currentPage === totalPages"
          @click="currentPage++"
        >下一页</button>
      </div>
    </div>
  </div>
</template>

<script>
import Papa from 'papaparse'
import * as echarts from 'echarts'

export default {
  name: 'HistoricalSalesTable', // 保持组件名以便不必修改父组件
  data() {
    return {
      allData: [],
      yearOptions: [],
      selectedYear: '',
      typeOptions: ['全部'],
      selectedType: '全部',
      brandOptions: ['全部'],
      selectedBrand: '全部',
      chart: null,
      ro: null,
      currentPage: 1,
      pageSize: 10
    }
  },
  computed: {
    filteredData() {
      if (!this.selectedYear) return []
      return this.allData
        .filter(item => {
          const yearMatch = item.year === this.selectedYear
          const typeMatch = this.selectedType === '全部' || item.type === this.selectedType
          const brandMatch = this.selectedBrand === '全部' || item.brand === this.selectedBrand
          return yearMatch && typeMatch && brandMatch
        })
        .sort((a, b) => b.sales - a.sales) // 按销量降序
    },
    totalPages() {
      return Math.ceil(this.filteredData.length / this.pageSize) || 1
    },
    displayedData() {
      const start = (this.currentPage - 1) * this.pageSize
      const end = start + this.pageSize
      return this.filteredData.slice(start, end)
    },
    // 根据当前页数据量动态计算图表高度，保证每个条形有足够的展示空间
    chartHeight() {
      const dataCount = this.displayedData.length
      // 如果没有数据，给一个默认高度；每条数据分配大约 30px 高度，加上顶部底部的 padding
      if (dataCount === 0) return 400
      return Math.max(400, dataCount * 30 + 100)
    }
  },
  watch: {
    filteredData: {
      deep: true,
      handler() {
        this.currentPage = 1
        this.$nextTick(() => {
          if (this.chart) {
            this.chart.resize()
          }
          this.renderChart()
        })
      }
    },
    currentPage() {
      this.$nextTick(() => {
        if (this.chart) {
          this.chart.resize()
        }
        this.renderChart()
      })
    }
  },
  mounted() {
    this.initChart()
    this.loadData()
    window.addEventListener('resize', this.resize)
    
    if (typeof ResizeObserver !== 'undefined') {
      this.ro = new ResizeObserver(() => {
        this.resize()
      })
      if (this.$refs.chart) this.ro.observe(this.$refs.chart)
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize)
    
    if (this.ro) this.ro.disconnect()
    if (this.chart) this.chart.dispose()
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs.chart, null, { renderer: 'svg' })
    },
    resize() {
      if (this.chart) this.chart.resize()
    },
    async loadData() {
      try {
        const response = await fetch('/data/car/2023_2025_top50_sales.csv')
        if (!response.ok) {
           console.error('Failed to fetch CSV data')
           return
        }
        const csvText = await response.text()
        this.parseCSV(csvText)
      } catch (error) {
        console.error('Error loading CSV:', error)
      }
    },
    parseCSV(csvText) {
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          this.allData = results.data.map((row, index) => ({
            id: row['车系ID'] || index,
            year: row['年份'],
            rank: parseInt(row['年度排名'], 10),
            name: row['车系名称'],
            manufacturer: row['厂商'],
            brand: row['品牌'],
            price: row['价格区间'],
            type: row['车系类型'],
            sales: parseInt(row['销量'], 10) || 0
          }))
          
          const years = [...new Set(this.allData.map(item => item.year))].filter(Boolean)
          this.yearOptions = years.sort((a, b) => b.localeCompare(a))
          if (this.yearOptions.length > 0) {
            this.selectedYear = this.yearOptions[0]
          }
          
          const types = [...new Set(this.allData.map(item => item.type))].filter(Boolean)
          this.typeOptions = ['全部', ...types.sort()]

          const brands = [...new Set(this.allData.map(item => item.brand))].filter(Boolean)
          this.brandOptions = ['全部', ...brands.sort((a, b) => a.localeCompare(b, 'zh-CN'))]
        }
      })
    },
    renderChart() {
      if (!this.chart || this.displayedData.length === 0) return
      
      const w = (this.$refs.chart && this.$refs.chart.clientWidth) ? this.$refs.chart.clientWidth : window.innerWidth
      const isNarrow = w <= 520
      
      // 数据反转，因为 Echarts category yAxis 从下往上绘制
      const reversedData = [...this.displayedData].reverse()
      const names = reversedData.map(i => i.name)
      const values = reversedData.map(i => i.sales)
      
      const longest = names.reduce((m, s) => Math.max(m, String(s || '').length), 0)
      const leftPad = Math.min(320, Math.max(100, Math.round(longest * 12)))
      
      this.chart.setOption({
        textStyle: {
          fontFamily: 'Inter, "AlibabaPuHuiTi", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
        },
        title: { 
          text: `${this.selectedYear}销量排名 ${this.selectedType !== '全部' ? '(' + this.selectedType + ')' : ''}${this.selectedBrand !== '全部' ? '(' + this.selectedBrand + ')' : ''}`, 
          left: 'center', 
          textStyle: { color: 'var(--c-text-title)', fontSize: 16, fontWeight: 500 } 
        },
        grid: { left: isNarrow ? 0 : leftPad, right: 40, top: 70, bottom: 20, containLabel: isNarrow },
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' },
          backgroundColor: 'var(--c-bg-panel-deep)',
          borderColor: 'var(--c-border-default)',
          borderWidth: 1,
          textStyle: { color: 'var(--c-text-emphasis)' }
        },
        xAxis: {
          type: 'value',
          position: 'top',
          axisLabel: { color: 'var(--c-text-body-alt)' },
          splitLine: { show: true, lineStyle: { color: 'var(--c-border-default)', type: 'dashed' } }
        },
        yAxis: {
          type: 'category',
          data: names,
          axisLabel: { 
            color: 'var(--c-text-emphasis)', 
            margin: 10,
            interval: 0,
            fontSize: 11
          }
        },
        series: [{
          type: 'bar',
          data: values,
          itemStyle: { 
            color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
              { offset: 0, color: '#6ea8fe' },
              { offset: 1, color: '#3d78d9' }
            ]),
            borderRadius: [0, 4, 4, 0]
          },
          label: {
            show: false
          },
          barWidth: '50%'
        }],
        backgroundColor: 'transparent'
      })
    }
  }
}
</script>

<style scoped>
.sales-chart-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.chart-block {
  width: 100%;
  background: var(--c-bg-l2);
  border: 1px solid var(--c-border-default);
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: 0 4px 15px var(--c-shadow-medium);
  overflow: visible; /* 为了让下拉菜单可见 */
}

.chart-container-main {
  padding: 16px;
  display: flex;
  flex-direction: column;
}

.charts-toolbar {
  position: relative;
  z-index: 10;
  border-bottom: 1px solid var(--c-border-default);
  padding: 8px 16px;
  min-height: 0;
  height: auto;
  display: flex;
  align-items: center;
  box-sizing: border-box;
}

.toolbar-controls {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  width: 100%;
}

.charts-toolbar label { 
  color: var(--c-text-label); 
  font-size: 13px; 
}

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

.charts-toolbar select:hover,
.charts-toolbar select:focus {
  border-color: var(--c-primary);
  outline: none;
}

.chart {
  width: 100%;
  transition: height 0.3s ease;
}

/* 分页样式 */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-top: 10px;
}

.page-btn {
  background: transparent;
  border: 1px solid var(--c-border-hover);
  color: var(--c-text-body-alt);
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;
}

.page-btn:hover:not(:disabled) {
  background: var(--c-primary-alpha-10);
  color: var(--c-text-emphasis);
  border-color: var(--c-primary);
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-info {
  color: var(--c-text-body);
  font-size: 13px;
  font-variant-numeric: tabular-nums;
}
</style>
