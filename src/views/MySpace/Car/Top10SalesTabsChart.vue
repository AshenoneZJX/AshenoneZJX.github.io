<template>
  <div class="top10-wrap">
    <div class="chart-block chart-block-head">
      <div class="charts-toolbar">
        <div class="toolbar-controls">
          <button class="tab-btn" :class="{ active: activeTab === 'global' }" type="button" @click="setTab('global')">全球</button>
          <button class="tab-btn" :class="{ active: activeTab === 'china' }" type="button" @click="setTab('china')">中国</button>
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
      this.chart = echarts.init(this.$refs.chart, null, { renderer: 'svg' })
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
      const data = sorted.map(i => ({
        name: String(i.model || ''),
        value: Number(i.sales) || 0
      }))
      
      // 添加这段清理代码
      this.chart.clear() // 切换图表类型前先清空旧的配置

      const title = this.activeTab === 'global' ? '全球销量 TOP10' : '中国销量 TOP10'
      this.chart.setOption({
        textStyle: {
          fontFamily: 'Inter, "AlibabaPuHuiTi", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
        },
        title: { text: title, left: 'center', textStyle: { color: 'var(--c-text-title)' } },
        color: ['#4E79A7', '#F28E2B', '#E15759', '#76B7B2', '#59A14F', '#EDC948', '#B07AA1', '#FF9DA7', '#9C755F', '#BAB0AC'],
        tooltip: {
          trigger: 'item',
          backgroundColor: 'var(--c-bg-panel-deep)',
          borderColor: 'var(--c-border-default)',
          borderWidth: 1,
          textStyle: { color: 'var(--c-text-emphasis)' },
          formatter: (params) => {
            return `${params.name}<br/>${params.value.toLocaleString()} 辆 (${params.percent}%)`
          }
        },
        legend: {
          show: false,
          orient: 'horizontal',
          bottom: 'bottom',
          textStyle: { color: 'var(--c-text-body-alt)' },
          type: 'scroll' // 添加滚动以防标签过多溢出
        },
        series: [
          {
            name: title,
            type: 'pie',
            radius: ['35%', '60%'], // 进一步缩小半径给外部引导线留出空间
            center: ['50%', '45%'],
            avoidLabelOverlap: true,
            padAngle: 3, // 添加扇区之间的间隙角度
            itemStyle: {
              borderRadius: 4, // 配合 padAngle 加上一点微圆角效果更好看
            },
            label: {
              show: true,
              position: 'outside',
              formatter: '{b}\n{d}%',
              color: 'var(--c-text-body-alt)'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 14,
                fontWeight: 'bold',
                color: 'var(--c-text-emphasis)'
              }
            },
            labelLine: {
              show: true,
              length: 10,
              length2: 15,
              smooth: true
            },
            data: data
          }
        ],
        backgroundColor: 'transparent'
      })
    }
  }
}
</script>

<style scoped>
.top10-wrap {
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
