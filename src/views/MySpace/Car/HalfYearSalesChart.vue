<template>
  <div class="half-year-wrap chart-block">
    <div class="charts-toolbar">
      <div class="toolbar-controls">
        <span class="chart-title">近半年汽车销量榜 TOP50</span>
        <span class="chart-meta">
          数据更新于 {{ updatedAt }} · 来源
          <a :href="source" target="_blank" rel="noopener noreferrer">懂车帝</a>
        </span>
      </div>
    </div>
    <div class="chart-container-main">
      <div ref="chart" class="chart"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'HalfYearSalesChart',
  props: {
    items: { type: Array, default: () => [] },
    updatedAt: { type: String, default: '' },
    source: { type: String, default: '' }
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
      const src = Array.isArray(this.items) ? this.items : []
      const sorted = [...src]
        .sort((a, b) => (Number(b.sales) || 0) - (Number(a.sales) || 0))
        .slice(0, 50)
      const names = sorted.map(i => String(i.seriesName || ''))
      const values = sorted.map(i => Number(i.sales) || 0)

      this.chart.clear()
      this.chart.setOption({
        textStyle: {
          fontFamily: 'Inter, "AlibabaPuHuiTi", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
        },
        grid: { left: 10, right: 70, top: 20, bottom: 42, containLabel: true },
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' },
          backgroundColor: 'var(--c-bg-panel-deep)',
          borderColor: 'var(--c-border-default)',
          borderWidth: 1,
          textStyle: { color: 'var(--c-text-emphasis)' },
          formatter: (params) => {
            const p = params && params[0]
            if (!p) return ''
            const item = sorted[p.dataIndex] || {}
            const lines = [
              `第 ${item.rank != null ? item.rank : p.dataIndex + 1} 名 · ${p.name}`,
              `销量：${(Number(p.value) || 0).toLocaleString()} 辆`
            ]
            if (item.brand) lines.push(`品牌：${item.brand}`)
            if (item.priceRange) lines.push(`指导价：${item.priceRange}`)
            return lines.join('<br/>')
          }
        },
        xAxis: {
          type: 'value',
          axisLabel: {
            color: 'var(--c-text-body-alt)',
            formatter: (v) => (v >= 10000 ? `${(v / 10000).toFixed(v % 10000 === 0 ? 0 : 1)}万` : v)
          },
          splitLine: { lineStyle: { color: 'var(--c-border-default)', opacity: 0.4 } }
        },
        yAxis: {
          type: 'category',
          inverse: true,
          data: names,
          axisLabel: {
            color: 'var(--c-text-body-alt)'
          },
          axisLine: { lineStyle: { color: 'var(--c-border-default)' } },
          axisTick: { show: false }
        },
        dataZoom: [
          {
            type: 'slider',
            yAxisIndex: 0,
            right: 8,
            width: 14,
            start: 0,
            end: 20,
            borderColor: 'var(--c-border-default)',
            backgroundColor: 'transparent',
            fillerColor: 'var(--c-primary-alpha-20, rgba(78,121,167,0.2))',
            handleStyle: { color: 'var(--c-primary, #4E79A7)' },
            moveHandleStyle: { color: 'var(--c-primary, #4E79A7)' },
            textStyle: { color: 'var(--c-text-body-alt)' },
            dataBackground: {
              lineStyle: { color: 'var(--c-border-default)' },
              areaStyle: { color: 'var(--c-border-default)', opacity: 0.3 }
            }
          }
        ],
        series: [
          {
            name: '销量',
            type: 'bar',
            data: values,
            barMaxWidth: 16,
            itemStyle: {
              borderRadius: [0, 4, 4, 0],
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: '#4E79A7' },
                { offset: 1, color: '#76B7B2' }
              ])
            },
            label: {
              show: true,
              position: 'right',
              color: 'var(--c-text-body-alt)',
              fontSize: 11,
              formatter: (p) => (Number(p.value) || 0).toLocaleString()
            }
          }
        ],
        backgroundColor: 'transparent'
      })
    }
  }
}
</script>

<style scoped>
.half-year-wrap {
  width: 100%;
  display: flex;
  flex-direction: column;
  min-width: 0;
}
/* 卡片/工具栏/图表样式统一来自全局模板 src/assets/styles/chart-block.css */
</style>
