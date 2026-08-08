<template>
  <div class="settings-page">
    <div class="container">
      <h1 class="page-title">设置</h1>
      <p class="page-desc">
        本站为静态网页，外观选项在代码中预设，不提供在线修改。
        以下列出项目包含的全部可设置选项，并标记当前应用的选项；
        点击任意选项可在右侧预览其效果，预览不会影响实际设置。
      </p>

      <!-- 主题色 -->
      <section class="settings-section">
        <h2 class="section-title">主题色</h2>
        <div class="section-body">
          <ul class="option-list">
            <li
              v-for="color in primaryColorOptions"
              :key="color.value"
              class="option-item color-item"
              :class="{ active: isActiveColor(color.value), previewing: isPreviewColor(color.value) }"
              @click="previewColor = color.value"
            >
              <span class="color-swatch" :style="{ backgroundColor: color.value }"></span>
              <span class="option-name">{{ color.name }}</span>
              <span class="option-value">{{ color.value }}</span>
              <span v-if="isActiveColor(color.value)" class="current-badge">当前</span>
              <span v-else-if="isPreviewColor(color.value)" class="previewing-badge">预览中</span>
            </li>
            <!-- 当前颜色不在预设列表中时（如历史遗留的自定义值），追加展示 -->
            <li v-if="isCustomColor" class="option-item color-item active">
              <span class="color-swatch" :style="{ backgroundColor: settings.primaryColor }"></span>
              <span class="option-name">自定义</span>
              <span class="option-value">{{ settings.primaryColor }}</span>
              <span class="current-badge">当前</span>
            </li>
          </ul>

          <!-- 主题色预览：示例控件跟随所选颜色变化 -->
          <div class="preview-panel">
            <div class="preview-head">
              <span class="preview-label">效果预览</span>
              <button
                v-if="!isPreviewColor(settings.primaryColor)"
                class="preview-reset"
                @click="previewColor = settings.primaryColor"
              >恢复为当前应用</button>
            </div>
            <div class="ctrl-row">
              <span class="ctrl-btn-primary" :style="{ background: previewColor }">主要按钮</span>
              <span class="ctrl-btn-outline" :style="{ color: previewColor, borderColor: previewColor }">描边按钮</span>
              <span class="ctrl-tag" :style="{ background: previewColorAlpha(0.12), color: previewColor, borderColor: previewColorAlpha(0.3) }">标签</span>
            </div>
            <a class="ctrl-link" :style="{ color: previewColor }" @click.prevent>示例链接文字</a>
            <div class="ctrl-progress">
              <div class="ctrl-progress-bar" :style="{ width: '65%', background: previewColor }"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- 字体设置 -->
      <section class="settings-section">
        <h2 class="section-title">字体设置</h2>
        <div class="section-body">
          <div class="font-groups">
            <div class="font-group">
              <h3 class="font-group-title">正文字体</h3>
              <ul class="option-list">
                <li
                  v-for="font in bodyFontOptions"
                  :key="font.name"
                  class="option-item font-item"
                  :class="{ active: settings.bodyFont === font.value, previewing: previewBodyFont === font.value }"
                  @click="previewBodyFont = font.value"
                >
                  <span class="option-name">{{ font.name }}</span>
                  <span v-if="settings.bodyFont === font.value" class="current-badge">当前</span>
                  <span v-else-if="previewBodyFont === font.value" class="previewing-badge">预览中</span>
                </li>
              </ul>
            </div>
            <div class="font-group">
              <h3 class="font-group-title">标题字体</h3>
              <ul class="option-list">
                <li
                  v-for="font in titleFontOptions"
                  :key="font.name"
                  class="option-item font-item"
                  :class="{ active: settings.titleFont === font.value, previewing: previewTitleFont === font.value }"
                  @click="previewTitleFont = font.value"
                >
                  <span class="option-name">{{ font.name }}</span>
                  <span v-if="settings.titleFont === font.value" class="current-badge">当前</span>
                  <span v-else-if="previewTitleFont === font.value" class="previewing-badge">预览中</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- 字体预览：标题与正文跟随所选字体变化 -->
          <div class="preview-panel">
            <div class="preview-head">
              <span class="preview-label">效果预览</span>
              <button
                v-if="previewBodyFont !== settings.bodyFont || previewTitleFont !== settings.titleFont"
                class="preview-reset"
                @click="resetFontPreview"
              >恢复为当前应用</button>
            </div>
            <h3 class="preview-title" :style="{ fontFamily: previewTitleFont }">示例标题 Sample Title</h3>
            <p class="preview-text" :style="{ fontFamily: previewBodyFont }">
              这是一段正文示例文本，用于预览所选字体的实际渲染效果。
              The quick brown fox jumps over the lazy dog. 0123456789
            </p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import {
  settingsStore,
  PRIMARY_COLOR_OPTIONS,
  BODY_FONT_OPTIONS,
  TITLE_FONT_OPTIONS
} from '@/constants/theme'

function hexToRgb (hex) {
  const m = /^#?([0-9a-f]{6})$/i.exec(String(hex).trim())
  if (!m) return null
  const num = parseInt(m[1], 16)
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 }
}

export default {
  name: 'Settings',
  data() {
    return {
      primaryColorOptions: PRIMARY_COLOR_OPTIONS,
      bodyFontOptions: BODY_FONT_OPTIONS,
      titleFontOptions: TITLE_FONT_OPTIONS,
      // 预览状态：初始与当前应用的设置一致，点击选项仅改变预览，不写入实际设置
      previewColor: settingsStore.settings.primaryColor,
      previewBodyFont: settingsStore.settings.bodyFont,
      previewTitleFont: settingsStore.settings.titleFont
    }
  },
  computed: {
    settings() {
      return settingsStore.settings
    },
    isCustomColor() {
      const current = this.settings.primaryColor.toLowerCase()
      return !this.primaryColorOptions.some(c => c.value.toLowerCase() === current)
    }
  },
  methods: {
    isActiveColor(value) {
      return this.settings.primaryColor.toLowerCase() === value.toLowerCase()
    },
    isPreviewColor(value) {
      return this.previewColor.toLowerCase() === value.toLowerCase()
    },
    previewColorAlpha(alpha) {
      const rgb = hexToRgb(this.previewColor)
      if (!rgb) return this.previewColor
      return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`
    },
    resetFontPreview() {
      this.previewBodyFont = this.settings.bodyFont
      this.previewTitleFont = this.settings.titleFont
    }
  }
}
</script>

<style scoped>
.settings-page {
  min-height: calc(100vh - 80px);
  padding: 40px 0 80px;
}

/* 与其他页面一致的最大显示宽度 */
.settings-page .container {
  max-width: 1200px;
  padding: 0 20px;
  box-sizing: border-box;
}

.page-title {
  font-size: 28px;
  font-weight: 300;
  color: var(--c-text-title);
  letter-spacing: 2px;
  margin-bottom: 8px;
}

.page-desc {
  font-size: 14px;
  color: var(--c-text-muted);
  margin-bottom: 32px;
  line-height: 1.7;
}

.settings-section {
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--c-border-default);
  border-radius: 0;
  padding: 20px 0;
  margin-bottom: 20px;
}

.settings-section:last-of-type {
  border-bottom: none;
}

.section-title {
  font-size: 16px;
  font-weight: 500;
  color: var(--c-text-emphasis);
  letter-spacing: 1px;
  margin-bottom: 16px;
}

/* 左选项列表 + 右预览面板的双栏布局 */
.section-body {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 24px;
  align-items: start;
}

/* 选项列表：点击仅切换预览 */
.option-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.option-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: var(--c-bg-l1);
  border: 1px solid var(--c-border-default);
  border-radius: 6px;
  cursor: pointer;
  transition: border-color 0.15s ease;
}

.option-item:hover {
  border-color: var(--c-border-hover);
}

/* 当前应用选项的标记：主题色描边 + 浅底色 + 「当前」徽章 */
.option-item.active {
  border-color: var(--c-primary);
  background: var(--c-primary-alpha-10);
}

/* 预览中（但未应用）的选项：虚线描边加以区分 */
.option-item.previewing:not(.active) {
  border-color: var(--c-text-muted);
  border-style: dashed;
}

.option-name {
  font-size: 14px;
  color: var(--c-text-emphasis);
  flex-shrink: 0;
}

.option-value {
  font-size: 12px;
  color: var(--c-text-muted);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.current-badge {
  margin-left: auto;
  flex-shrink: 0;
  background: var(--c-primary);
  color: #fff;
  font-size: 11px;
  line-height: 1;
  padding: 4px 8px;
  border-radius: 4px;
  letter-spacing: 1px;
}

.previewing-badge {
  margin-left: auto;
  flex-shrink: 0;
  background: transparent;
  border: 1px solid var(--c-text-muted);
  color: var(--c-text-muted);
  font-size: 11px;
  line-height: 1;
  padding: 3px 7px;
  border-radius: 4px;
  letter-spacing: 1px;
}

/* 主题色选项 */
.color-swatch {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  flex-shrink: 0;
  border: 1px solid rgba(255, 255, 255, 0.12);
}

/* 字体分组 */
.font-groups {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.font-group-title {
  font-size: 13px;
  font-weight: 500;
  color: var(--c-text-muted);
  letter-spacing: 1px;
  margin: 0 0 12px;
}

/* 预览面板 */
.preview-panel {
  background: var(--c-bg-l1);
  border: 1px solid var(--c-border-default);
  border-radius: 6px;
  padding: 20px 24px 24px;
  position: sticky;
  top: 100px;
}

.preview-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.preview-label {
  font-size: 12px;
  color: var(--c-text-muted);
  letter-spacing: 1px;
}

.preview-reset {
  background: transparent;
  border: none;
  padding: 0;
  font-size: 12px;
  color: var(--c-primary);
  cursor: pointer;
}

.preview-reset:hover {
  text-decoration: underline;
}

/* 主题色预览控件 */
.ctrl-row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.ctrl-btn-primary {
  color: #fff;
  border-radius: 6px;
  padding: 8px 18px;
  font-size: 14px;
}

.ctrl-btn-outline {
  background: transparent;
  border: 1px solid;
  border-radius: 6px;
  padding: 7px 17px;
  font-size: 14px;
}

.ctrl-tag {
  border: 1px solid;
  border-radius: 4px;
  padding: 4px 10px;
  font-size: 12px;
  letter-spacing: 1px;
}

.ctrl-link {
  display: inline-block;
  font-size: 14px;
  text-decoration: underline;
  margin-bottom: 16px;
  cursor: default;
}

.ctrl-progress {
  height: 6px;
  border-radius: 3px;
  background: var(--c-border-default);
  overflow: hidden;
}

.ctrl-progress-bar {
  height: 100%;
  border-radius: 3px;
  transition: background 0.15s ease;
}

/* 字体预览内容 */
.preview-title {
  font-size: 22px;
  font-weight: 300;
  color: var(--c-text-title);
  letter-spacing: 2px;
  margin: 0 0 12px;
}

.preview-text {
  font-size: 15px;
  line-height: 1.7;
  color: var(--c-text-body);
  margin: 0;
}

@media (max-width: 768px) {
  /* 移动端预览面板置于选项下方，不再吸附 */
  .section-body {
    grid-template-columns: 1fr;
  }

  .preview-panel {
    position: static;
  }
}

@media (max-width: 480px) {
  .settings-page {
    padding: 24px 0 60px;
  }

  .settings-section {
    padding: 16px 0;
  }
}
</style>
