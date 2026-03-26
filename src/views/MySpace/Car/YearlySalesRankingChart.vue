<template>
  <div class="chart-wrapper">
    <div ref="chart" class="chart"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import sales2025 from '@/data/car/2025_dcd_sales_rank.json'

export default {
  name: 'YearlySalesRankingChart',
  props: {
    title: { type: String, default: '年度车型销量排名' },
    year: { type: [Number, String], default: null },
    items: {
      type: Array,
      default: () => []
    },
    sortBy: { type: String, default: 'sales' },
    sortOrder: { type: String, default: 'desc' }
  },
  data () {
    return {
      chart: null,
      ro: null
    }
  },
  mounted () {
    this.init()
    window.addEventListener('resize', this.resize)
    if (typeof ResizeObserver !== 'undefined') {
      this.ro = new ResizeObserver(() => {
        this.resize()
      })
      if (this.$refs.chart) this.ro.observe(this.$refs.chart)
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.resize)
    if (this.ro) this.ro.disconnect()
    if (this.chart) this.chart.dispose()
  },
  watch: {
    items: {
      deep: true,
      handler () {
        this.render()
      }
    },
    year () {
      this.render()
    },
    sortBy () {
      this.render()
    },
    sortOrder () {
      this.render()
    }
  },
  methods: {
    init () {
      this.chart = echarts.init(this.$refs.chart, null, { renderer: 'svg' })
      this.render()
    },
    resize () {
      if (this.chart) this.chart.resize()
    },
    render () {
      if (!this.chart) return
      const w = (this.$refs.chart && this.$refs.chart.clientWidth) ? this.$refs.chart.clientWidth : window.innerWidth
      const isNarrow = w <= 520
      const src = (Array.isArray(this.items) && this.items.length)
        ? this.items
        : (Number(this.year) === 2025 && sales2025 && Array.isArray(sales2025.items) ? sales2025.items : [])
      const sorted = [...src].sort((a, b) => {
        if (this.sortBy === 'name') {
          const an = String(a.modelName || a.seriesName || '')
          const bn = String(b.modelName || b.seriesName || '')
          return this.sortOrder === 'asc' ? an.localeCompare(bn, 'zh') : bn.localeCompare(an, 'zh')
        }
        const av = Number(a.sales) || 0
        const bv = Number(b.sales) || 0
        return this.sortOrder === 'asc' ? (av - bv) : (bv - av)
      }).slice(0, 10)
      const names = sorted.map(i => i.modelName)
      const values = sorted.map(i => i.sales)
      const longest = names.reduce((m, s) => Math.max(m, String(s || '').length), 0)
      const leftPad = Math.min(320, Math.max(100, Math.round(longest * 12)))
      this.chart.setOption({
        textStyle: {
          fontFamily: 'Inter, "AlibabaPuHuiTi", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
        },
        title: { text: this.title, left: 'center', textStyle: { color: 'var(--c-text-title)' } },
        grid: { left: isNarrow ? 0 : leftPad, right: 30, top: 40, bottom: 60, containLabel: isNarrow },
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
          axisLabel: { color: 'var(--c-text-body-alt)', rotate: 35, hideOverlap: true, margin: 10 },
          splitLine: { show: true, lineStyle: { color: 'var(--c-border-default)' } }
        },
        yAxis: {
          type: 'category',
          data: names,
          inverse: true, // 这样数值最高的或者字母靠前的会排在最上面
          axisLabel: { color: 'var(--c-text-emphasis)', margin: 6 }
        },
        series: [{
          type: 'bar',
          data: values,
          itemStyle: { color: '#6ea8fe' },
          barWidth: 16
        }],
        backgroundColor: 'transparent'
      })
    }
  }
}
</script>

<style scoped>
.chart-wrapper {
  width: 100%;
  height: 100%;
  min-height: 360px;
  position: relative;
}
.chart {
  width: 100%;
  height: 100%;
  min-height: 360px;
}
</style>
