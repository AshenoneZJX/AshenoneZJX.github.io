<template>
  <div class="top10-wrap">
    <div class="tab-bar">
      <button class="tab-btn" :class="{ active: activeTab === 'global' }" type="button" @click="setTab('global')">全球</button>
      <button class="tab-btn" :class="{ active: activeTab === 'china' }" type="button" @click="setTab('china')">中国</button>
    </div>
    <div ref="chart" class="chart"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'Top10SalesTabsChart',
  props: {
    globalItems: { type: Array, default: () => [] },
    chinaItems: { type: Array, default: () => [] }
  },
  data () {
    return {
      activeTab: 'global',
      chart: null,
      ro: null
    }
  },
  computed: {
    currentItems () {
      return this.activeTab === 'china' ? this.chinaItems : this.globalItems
    },
    currentTitle () {
      return this.activeTab === 'china' ? '中国销量 TOP10' : '全球销量 TOP10'
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
    globalItems: {
      deep: true,
      handler () {
        this.render()
      }
    },
    chinaItems: {
      deep: true,
      handler () {
        this.render()
      }
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
    setTab (tab) {
      if (this.activeTab === tab) return
      this.activeTab = tab
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
      this.chart.setOption({
        title: { text: this.currentTitle, left: 'center', textStyle: { color: '#fff' } },
        grid: { left: leftPad, right: 20, top: 44, bottom: 36, containLabel: false },
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' },
          formatter: (params) => {
            const p = Array.isArray(params) ? params[0] : params
            const idx = p && typeof p.dataIndex === 'number' ? p.dataIndex : -1
            const it = idx >= 0 ? sorted[idx] : null
            const n = it ? String(it.model || '') : ''
            const s = it ? Number(it.sales) || 0 : 0
            const brand = it && it.brand ? String(it.brand) : ''
            const type = it && it.type ? String(it.type) : ''
            const price = it && it.price_range ? String(it.price_range) : ''
            const extra = [brand, type, price].filter(Boolean).join(' · ')
            return `${n}<br/>${s.toLocaleString()}${extra ? `<br/>${extra}` : ''}`
          }
        },
        xAxis: {
          type: 'value',
          axisLabel: { color: '#9cc9f5', hideOverlap: true, margin: 10 },
          splitLine: { show: true, lineStyle: { color: '#2a475e' } }
        },
        yAxis: {
          type: 'category',
          data: names,
          axisLabel: { color: '#9cc9f5', margin: 8 }
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
.top10-wrap {
  width: 100%;
}
.tab-bar {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin: 10px 0 8px 0;
}
.tab-btn {
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.12);
  color: #c7d5e0;
  height: 28px;
  padding: 0 12px;
  border-radius: 999px;
  cursor: pointer;
  font-size: 12px;
}
.tab-btn:hover {
  background: rgba(102,192,244,0.12);
  border-color: rgba(102,192,244,0.6);
  color: #e6f3ff;
}
.tab-btn.active {
  background: rgba(102,192,244,0.22);
  border-color: rgba(102,192,244,0.8);
  color: #e6f3ff;
}
.chart {
  width: 100%;
  min-height: 360px;
}
</style>
