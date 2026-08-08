<template>
  <div class="seg-wrap chart-block">
    <div class="charts-toolbar charts-toolbar--stacked">
      <div class="toolbar-title-row">
        <span class="chart-title">价格区间销量 TOP10</span>
      </div>
      <div class="toolbar-controls">
        <button
          v-for="k in segmentKeys"
          :key="`inline-${k}`"
          class="tab-btn"
          :class="{ active: activeKey === k }"
          type="button"
          @click="setKey(k)"
        >{{ k }}</button>
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
  name: 'PriceSegmentsTabsChart',
  props: {
    segments: { type: Object, default: () => ({}) }
  },
  data () {
    return {
      activeKey: '',
      chart: null,
      ro: null
    }
  },
  computed: {
    segmentKeys () {
      const s = this.segments && typeof this.segments === 'object' ? this.segments : {}
      return Object.keys(s)
    },
    currentItems () {
      const s = this.segments && typeof this.segments === 'object' ? this.segments : {}
      const list = this.activeKey && Array.isArray(s[this.activeKey]) ? s[this.activeKey] : []
      return list
    }
  },
  mounted () {
    const ks = this.segmentKeys
    if (ks.length) this.activeKey = ks[0]
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
    segments: {
      deep: true,
      handler () {
        const ks = this.segmentKeys
        if (!this.activeKey && ks.length) this.activeKey = ks[0]
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
    setKey (k) {
      if (!k || this.activeKey === k) return
      this.activeKey = k
      this.$nextTick(() => {
        this.render()
        this.resize()
      })
    },
    render () {
      if (!this.chart) return
      const src = Array.isArray(this.currentItems) ? this.currentItems : []
      // 与「近半年销量榜 TOP50」一致：降序排列 + y 轴 inverse，第一名在最上方
      const sorted = [...src].sort((a, b) => (Number(b.sales) || 0) - (Number(a.sales) || 0)).slice(0, 10)
      const names = sorted.map(i => String(i.model || ''))
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
            const lines = [
              `第 ${p.dataIndex + 1} 名 · ${p.name}`,
              `销量：${(Number(p.value) || 0).toLocaleString()} 辆`
            ]
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
.seg-wrap {
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1;
  min-width: 0;
}
/* 卡片/工具栏/图表样式统一来自全局模板 src/assets/styles/chart-block.css，此处仅覆盖图表高度 */
.chart {
  width: 100%;
  min-height: 280px;
}
</style>
