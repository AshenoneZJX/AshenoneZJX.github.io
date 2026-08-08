// src/constants/theme.js
// 站点外观设置（字体 / 颜色）的统一配置与运行时管理。
// - 可选项配置（PRIMARY_COLOR_OPTIONS / BODY_FONT_OPTIONS / TITLE_FONT_OPTIONS）
//   同时服务于设置页面（src/views/Settings/Settings.vue）。
// - CSS 变量默认值见 src/assets/styles/theme.css，本模块通过在根元素上
//   覆盖同名变量实现即时换肤，并持久化到 localStorage。
import Vue from 'vue'

const STORAGE_KEY = 'site-settings'

export const PRIMARY_COLOR_OPTIONS = [
  { name: '蒸汽蓝（默认）', value: '#58a6ff' },
  { name: '翠绿', value: '#3fb950' },
  { name: '明黄', value: '#d29922' },
  { name: '暖橙', value: '#f0883e' },
  { name: '绛紫', value: '#bc8cff' },
  { name: '绯红', value: '#f85149' }
]

export const BODY_FONT_OPTIONS = [
  {
    name: '默认（Motiva Sans）',
    value: '"Motiva Sans", "Helvetica Neue", Helvetica, Arial, sans-serif'
  },
  {
    name: 'Inter + 阿里巴巴普惠体',
    value: '\'Inter\', \'AlibabaPuHuiTi\', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
  },
  {
    name: '思源黑体',
    value: '\'SourceHanSansSC\', \'AlibabaPuHuiTi\', sans-serif'
  },
  {
    name: 'Georgia 衬线',
    value: '\'GeorgiaSerif\', \'Times New Roman\', serif'
  },
  {
    name: '跟随系统',
    value: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
  }
]

export const TITLE_FONT_OPTIONS = [
  {
    name: '默认（Motiva Title）',
    value: '\'MotivaTitle\', "Motiva Sans", "Helvetica Neue", Helvetica, Arial, sans-serif'
  },
  {
    name: 'Inter + 阿里巴巴普惠体',
    value: '\'Inter\', \'AlibabaPuHuiTi\', sans-serif'
  },
  {
    name: '思源黑体',
    value: '\'SourceHanSansSC\', \'AlibabaPuHuiTi\', sans-serif'
  },
  {
    name: 'Georgia 衬线',
    value: '\'GeorgiaSerif\', \'Times New Roman\', serif'
  }
]

export const DEFAULT_SETTINGS = {
  primaryColor: '#58a6ff',
  bodyFont: BODY_FONT_OPTIONS[0].value,
  titleFont: TITLE_FONT_OPTIONS[0].value
}

// 共享响应式状态：NavBar、设置页等组件直接读取
export const settingsStore = Vue.observable({
  settings: { ...DEFAULT_SETTINGS }
})

function hexToRgb (hex) {
  const m = /^#?([0-9a-f]{6})$/i.exec(String(hex).trim())
  if (!m) return null
  const num = parseInt(m[1], 16)
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 }
}

function applySettings (settings) {
  if (typeof document === 'undefined') return
  const root = document.documentElement

  const rgb = hexToRgb(settings.primaryColor)
  if (rgb) {
    root.style.setProperty('--c-primary', settings.primaryColor)
    // 按原透明度档位同步重算主题色的 alpha 变体
    const alphaSteps = [10, 20, 30, 40, 50, 60, 80]
    alphaSteps.forEach(step => {
      root.style.setProperty(
        `--c-primary-alpha-${step}`,
        `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${step / 100})`
      )
    })
  }

  root.style.setProperty('--body-font', settings.bodyFont)
  root.style.setProperty('--title-font', settings.titleFont)
}

function loadSettings () {
  const merged = { ...DEFAULT_SETTINGS }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const saved = JSON.parse(raw)
      if (saved && typeof saved === 'object') {
        Object.keys(DEFAULT_SETTINGS).forEach(key => {
          if (typeof saved[key] === 'string' && saved[key]) merged[key] = saved[key]
        })
      }
    }
  } catch (e) {
    // localStorage 不可用或数据损坏时退回默认值
  }
  return merged
}

function saveSettings () {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settingsStore.settings))
  } catch (e) {
    // 忽略持久化失败（如隐私模式），设置仍在当前会话生效
  }
}

// 应用启动时调用：读取持久化设置并应用
export function initSettings () {
  settingsStore.settings = loadSettings()
  applySettings(settingsStore.settings)
}

// 更新部分设置：立即生效并持久化
export function updateSettings (patch) {
  settingsStore.settings = { ...settingsStore.settings, ...patch }
  applySettings(settingsStore.settings)
  saveSettings()
}

export function resetSettings () {
  settingsStore.settings = { ...DEFAULT_SETTINGS }
  applySettings(settingsStore.settings)
  saveSettings()
}
