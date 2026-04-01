// src/main.js
import Vue from 'vue'
import App from './App.vue'
import router from './router' // 引入路由
import { initViewportModeWatcher } from './constants/responsive'

Vue.config.productionTip = false
initViewportModeWatcher()

new Vue({
  router, // 挂载路由
  render: h => h(App)
}).$mount('#app')
