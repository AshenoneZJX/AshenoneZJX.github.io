// src/main.js
import Vue from 'vue'
import App from './App.vue'
import router from './router' // 引入路由
import { initViewportModeWatcher } from './constants/responsive'
import { initSettings } from './constants/theme'
import './assets/styles/theme.css' // 全局字体与颜色主题配置
import './assets/styles/chart-block.css' // 图表卡片通用样式模板（chart-block / charts-toolbar / chart 等）

Vue.config.productionTip = false
initViewportModeWatcher()
initSettings() // 应用本地保存的外观设置（主题色/字体）

new Vue({
  router, // 挂载路由
  render: h => h(App)
}).$mount('#app')
