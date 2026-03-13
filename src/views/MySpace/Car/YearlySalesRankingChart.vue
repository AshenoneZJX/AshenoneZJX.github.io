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
    sortBy: { type: String, default: 'sales' }
  },
  data () {
    return {
      chart: null
    }
  },
  mounted () {
    this.init()
    window.addEventListener('resize', this.resize)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.resize)
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
    }
  },
  methods: {
    init () {
      this.chart = echarts.init(this.$refs.chart)
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
          return an.localeCompare(bn, 'zh')
        }
        return (b.sales - a.sales)
      }).slice(0, 10)
      const names = sorted.map(i => i.modelName)
      const values = sorted.map(i => i.sales)
      const longest = names.reduce((m, s) => Math.max(m, String(s || '').length), 0)
      const leftPad = Math.min(320, Math.max(100, Math.round(longest * 12)))
      this.chart.setOption({
        title: { text: this.title, left: 'center', textStyle: { color: '#fff' } },
        grid: { left: isNarrow ? 0 : leftPad, right: 30, top: 40, bottom: isNarrow ? 60 : 40, containLabel: isNarrow },
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        xAxis: {
          type: 'value',
          axisLabel: { color: '#9cc9f5', rotate: isNarrow ? 35 : 0, hideOverlap: true, margin: 10 },
          splitLine: { show: true, lineStyle: { color: '#2a475e' } }
        },
        yAxis: {
          type: 'category',
          data: names,
          inverse: false,
          axisLabel: { color: '#9cc9f5', margin: 6 }
        },
        series: [{
          type: 'bar',
          data: values,
          itemStyle: { color: '#66c0f4' },
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
