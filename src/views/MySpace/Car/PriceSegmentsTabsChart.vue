<template>
  <div class="seg-wrap">
    <div class="chart-block chart-block-head">
      <div class="charts-toolbar">
        <div class="toolbar-controls">
          <button
            v-for="k in segmentKeys"
            :key="k"
            class="tab-btn"
            :class="{ active: activeKey === k }"
            type="button"
            @click="setKey(k)"
          >{{ k }}</button>
        </div>
      </div>
    </div>
    <div class="chart-container chart-container-main">
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
          backgroundColor: 'var(--c-bg-panel-deep)',
          borderColor: 'var(--c-border-default)',
          borderWidth: 1,
          textStyle: { color: 'var(--c-text-emphasis)' },
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
          axisLabel: { color: 'var(--c-text-body-alt)', rotate: 35, hideOverlap: true, margin: 10 },
          splitLine: { show: true, lineStyle: { color: 'var(--c-border-default)' } }
        },
        yAxis: {
          type: 'category',
          data: names,
          axisLabel: { color: 'var(--c-text-emphasis)', margin: 8 }
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
.seg-wrap {
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1;
  min-width: 0;
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
  flex: 1;
  position: relative;
  z-index: 0;
}
.charts-toolbar {
  margin-bottom: 0;
  position: relative;
  border-bottom: 1px solid var(--c-border-default);
  padding: 0 16px;
  min-height: 48px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
}
.toolbar-controls {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  width: 100%;
}
.tab-btn {
  background: transparent;
  border: 1px solid transparent;
  color: var(--c-text-body-alt);
  height: 32px;
  padding: 0 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
  width: auto;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.tab-btn:hover {
  background: var(--c-primary-alpha-10);
  color: var(--c-text-emphasis);
  border-color: var(--c-border-hover);
}
.tab-btn.active {
  background: var(--c-primary-alpha-20);
  color: var(--c-text-title);
  font-weight: 500;
  border-color: var(--c-primary);
}
.chart {
  width: 100%;
  min-height: 360px;
}
</style>
