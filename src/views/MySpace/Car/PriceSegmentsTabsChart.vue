<template>
  <div class="seg-wrap">
    <div class="tab-bar">
      <button
        v-for="k in segmentKeys"
        :key="k"
        class="tab-btn"
        :class="{ active: activeKey === k }"
        type="button"
        @click="setKey(k)"
      >{{ k }}</button>
    </div>
    <div ref="chart" class="chart"></div>
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
      const sorted = [...src].sort((a, b) => (Number(a.sales) || 0) - (Number(b.sales) || 0)).slice(0, 10)
      const names = sorted.map(i => String(i.model || ''))
      const values = sorted.map(i => Number(i.sales) || 0)
      const longest = names.reduce((m, s) => Math.max(m, String(s || '').length), 0)
      const leftPad = Math.min(320, Math.max(110, Math.round(longest * 12)))
      const title = this.activeKey ? `价格区间销量 TOP10（${this.activeKey}）` : '价格区间销量 TOP10'
      this.chart.setOption({
        textStyle: {
          fontFamily: 'Inter, "AlibabaPuHuiTi", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
        },
        title: { text: title, left: 'center', textStyle: { color: 'var(--c-text-title)' } },
        grid: { left: leftPad, right: 20, top: 44, bottom: 60, containLabel: false },
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' },
          formatter: (params) => {
            const p = Array.isArray(params) ? params[0] : params
            const idx = p && typeof p.dataIndex === 'number' ? p.dataIndex : -1
            const it = idx >= 0 ? sorted[idx] : null
            const n = it ? String(it.model || '') : ''
            const s = it ? Number(it.sales) || 0 : 0
            return `${n}<br/>${s.toLocaleString()}`
          }
        },
        xAxis: {
          type: 'value',
          axisLabel: { color: 'var(--c-primary)', rotate: 35, hideOverlap: true, margin: 10 },
          splitLine: { show: true, lineStyle: { color: 'var(--c-border-strong)' } }
        },
        yAxis: {
          type: 'category',
          data: names,
          axisLabel: { color: 'var(--c-primary)', margin: 8 }
        },
        series: [{
          type: 'bar',
          data: values,
          itemStyle: { color: 'var(--c-primary)' },
          barWidth: 16
        }],
        backgroundColor: 'transparent'
      })
    }
  }
}
</script>

<style scoped>
.seg-wrap {
  width: 100%;
}
.tab-bar {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin: 0;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--c-border-strong);
  flex-wrap: wrap;
}
.tab-btn {
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.12);
  color: var(--c-text-body-alt);
  height: 28px;
  padding: 0 12px;
  border-radius: 999px;
  cursor: pointer;
  font-size: 12px;
}
.tab-btn:hover {
  background: var(--c-primary-alpha-10);
  border-color: rgba(102,192,244,0.6);
  color: var(--c-text-emphasis);
}
.tab-btn.active {
  background: var(--c-primary-alpha-20);
  border-color: rgba(102,192,244,0.8);
  color: var(--c-text-emphasis);
}
.chart {
  width: 100%;
  min-height: 360px;
}
</style>
