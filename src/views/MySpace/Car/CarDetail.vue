<template>
  <div class="container page-car-detail">
    <div v-if="car" class="detail-layout">
      <!-- Left Column: 70% -->
      <div class="left-section">
        <transition :name="slideDirection === 'next' ? 'slide-next' : 'slide-prev'">
          <img
            v-if="images.length"
            :key="images[currentImageIndex]"
            class="gallery-image"
            :src="images[currentImageIndex]"
            :alt="modelName || '车辆图片'"
            referrerpolicy="no-referrer"
          />
        </transition>
        <button
          v-if="images.length > 1"
          class="gallery-nav prev"
          aria-label="上一张"
          @click="prevImage"
        >‹</button>
        <button
          v-if="images.length > 1"
          class="gallery-nav next"
          aria-label="下一张"
          @click="nextImage"
        >›</button>
        <div
          v-if="images.length > 1"
          class="dot-indicators"
          aria-label="图片序号指示"
        >
          <span
            v-for="(src, idx) in images"
            :key="idx"
            class="dot"
            :class="{ active: idx === currentImageIndex }"
            @click="goToImage(idx)"
          ></span>
        </div>
      </div>

      <!-- Right Column: 30% -->
      <div class="right-section">
        <!-- Upper Part: Title, Back Button, Tags, Intro -->
        <div class="info-upper">
          <div class="section-header">
            <div class="title-with-logo">
              <h2>
                <div 
                  v-if="brandName"
                  class="brand-hover-wrapper"
                  @mouseenter="showBrandTooltip = true"
                  @mouseleave="showBrandTooltip = false"
                >
                  <router-link
                    class="brand-link"
                    :to="{ name: 'BrandDetail', params: { name: brandName } }"
                  >
                    <img
                      v-if="brandLogoFor"
                      :class="['brand-logo', { 'brand-logo-xiaomi': brandName === '小米' }]"
                      :src="brandLogoFor"
                      :alt="car.brand || '品牌'"
                      class="brand-logo-img"
                    />
                    <span class="brand-name-text">{{ brandName }}</span>
                  </router-link>
                  <transition name="fade">
                    <div v-if="showBrandTooltip && brandInfo" class="brand-tooltip" @click.stop>
                      <div class="tooltip-header">
                        <img v-if="brandInfo.brandLogo" :src="brandInfo.brandLogo" :alt="brandName" class="tooltip-logo" />
                        <span class="tooltip-brand-name">{{ brandName }}</span>
                      </div>
                      <p v-if="brandIntroText" class="tooltip-intro">{{ brandIntroText }}</p>
                      <div v-if="brandInfo && brandInfo.models && brandInfo.models.length" class="tooltip-models">
                        <span class="tooltip-models-label">代表车型</span>
                        <div class="tooltip-models-tags">
                          <span v-for="model in brandInfo.models.slice(0, 5)" :key="model" class="model-tag">{{ model }}</span>
                          <span v-if="brandInfo.models.length > 5" class="model-tag ellipsis-tag">...</span>
                        </div>
                      </div>
                    </div>
                  </transition>
                </div>
                <span class="model-name">{{ modelName }}</span>
              </h2>
            </div>
            <div class="actions">
              <button class="back-btn" @click="$router.push('/mySpace/cars')">
                <img src="@/assets/images/fanhui.svg" class="back-icon" alt="返回" />
                <span class="back-text">返回</span>
              </button>
            </div>
          </div>
          
          <div class="meta-block">
            <div class="tag-group">
              <span class="tag tag-energy" v-for="e in energyList" :key="e">{{ e }}</span>
              <span class="tag tag-body">{{ car.body }}</span>
              <span class="tag tag-size" v-if="car.sizeClass">{{ car.sizeClass }}</span>
            </div>
          </div>

          <div class="special-action-block" v-if="car.specialEdition">
            <button class="special-btn" @click="$router.push(`/mySpace/cars/${car.id}/special`)">
              <span class="special-text">{{ specialModelName }}</span>
            </button>
          </div>
          
          <p class="intro-text">{{ introText }}</p>
        </div>

        <!-- Lower Part: Specs -->
        <div class="info-lower">
          <div class="specs-hint">提示：点击参数名称可查看介绍详情</div>
          <div class="specs specs-box">
            <div class="spec-grid">
              <div class="spec-row">
                <span class="row-label" @click="goBasics('size')">车身尺寸</span>
                <span class="row-value">{{ bodySpecParsed.size }}</span>
              </div>
              <div class="spec-row">
                <span class="row-label" @click="goBasics('wheelbase')">轴距</span>
                <span class="row-value">{{ bodySpecParsed.wheelbase }}</span>
              </div>
              <div class="spec-row">
                <span class="row-label" @click="goBasics('weight')">车重</span>
                <span class="row-value">{{ bodySpecParsed.weight }}</span>
              </div>
              <div class="spec-row">
                <span class="row-label" @click="goBasics('engine')">发动机</span>
                <span class="row-value">{{ specs.engine }}</span>
              </div>
              <div class="spec-row">
                <span class="row-label" @click="goBasics('transmission')">变速箱</span>
                <span class="row-value">{{ specs.transmission }}</span>
              </div>
              <div class="spec-row">
                <span class="row-label" @click="goBasics('chassis')">底盘</span>
                <span class="row-value">{{ specs.chassis }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile Specs Drawer (Keep for compatibility) -->
      <button class="fab-specs" aria-label="查看参数" @click="toggleSpecs">参数</button>

      <transition name="fade">
        <div class="specs-overlay" v-if="showSpecs" @click="toggleSpecs"></div>
      </transition>
      <transition name="slide-up">
        <div class="specs-drawer" v-if="showSpecs">
          <div class="drawer-header">
            <span>车辆参数</span>
          </div>
          <div class="specs specs-box-mobile">
            <div class="specs-hint">提示：点击参数名称可查看介绍详情</div>
            <div class="spec-grid">
               <div class="spec-row">
                <span class="row-label" @click="goBasics('size')">车身尺寸</span>
                <span class="row-value">{{ bodySpecParsed.size }}</span>
              </div>
              <div class="spec-row">
                <span class="row-label" @click="goBasics('wheelbase')">轴距</span>
                <span class="row-value">{{ bodySpecParsed.wheelbase }}</span>
              </div>
              <div class="spec-row">
                <span class="row-label" @click="goBasics('weight')">车重</span>
                <span class="row-value">{{ bodySpecParsed.weight }}</span>
              </div>
              <div class="spec-row">
                <span class="row-label" @click="goBasics('engine')">发动机</span>
                <span class="row-value">{{ specs.engine }}</span>
              </div>
              <div class="spec-row">
                <span class="row-label" @click="goBasics('transmission')">变速箱</span>
                <span class="row-value">{{ specs.transmission }}</span>
              </div>
              <div class="spec-row">
                <span class="row-label" @click="goBasics('chassis')">底盘</span>
                <span class="row-value">{{ specs.chassis }}</span>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <div v-else class="not-found">
      <p>抱歉，没有找到该车型。</p>
    </div>
  </div>
</template>

<script>
import cars from '@/data/car/cars.json'
import brandDetails from '@/data/car/brandDetails.json'
export default {
  name: 'CarDetail',
  data() {
    return {
      car: null,
      showSpecs: false,
      brandLogoMap: {},
      currentImageIndex: 0,
      slideDirection: 'next',
      showBrandTooltip: false
    }
  },
  computed: {
    energyList() {
      if (!this.car) return []
      return Array.isArray(this.car.energy) ? this.car.energy : [this.car.energy]
    },
    introText() {
      if (!this.car) return ''
      return this.car.intro || this.car.desc || ''
    },
    specs() {
      if (!this.car) return {}
      return this.car.specs || {}
    },
    bodySpecParsed() {
      const s = (this.specs.dimensions || '').trim()
      let size = '', wheelbase = '', weight = ''
      const sizeMatch = s.match(/长[^，]+?×\s*宽[^，]+?×\s*高[^，]+/)
      const wheelMatch = s.match(/轴距[^，]+/)
      const weightMatch = s.match(/(整备质量[^，]+|车重[^，]+)/)
      size = sizeMatch ? sizeMatch[0] : s
      wheelbase = wheelMatch ? wheelMatch[0].replace(/^\s*轴距\s*/, '') : ''
      weight = weightMatch ? weightMatch[0].replace(/^\s*(整备质量|车重)\s*/, '') : ''
      return { size, wheelbase, weight }
    },
    brandLogoFor() {
      if (!this.car) return ''
      if (this.car.brandLogo) return this.car.brandLogo
      const b = this.car.brand
      if (b && this.brandLogoMap && this.brandLogoMap[b]) return this.brandLogoMap[b]
      return ''
    },
    brandName() {
      if (!this.car) return ''
      return this.car.brand || ''
    },
    modelName() {
      if (!this.car) return ''
      const brand = this.car.brand || ''
      const t = this.car.title || ''
      if (brand && t.startsWith(brand)) {
        return t.slice(brand.length).trim()
      }
      return t
    },
    specialModelName() {
      if (!this.car || !this.car.specialEdition) return ''
      const brand = this.car.specialEdition.brand || ''
      const t = this.car.specialEdition.title || ''
      if (brand && t.startsWith(brand)) {
        return t.slice(brand.length).trim()
      }
      return t
    },
    images() {
      if (!this.car) return []
      const imgs = Array.isArray(this.car.images) ? this.car.images : []
      if (imgs.length > 0) return imgs
      return this.car.img ? [this.car.img] : []
    },
    brandInfo() {
      const name = this.brandName
      if (!name) return null
      return brandDetails[name] || null
    },
    brandIntroText() {
      if (!this.brandInfo) return ''
      const quote = this.brandInfo.quote ? String(this.brandInfo.quote).trim() : ''
      const introduction = this.brandInfo.introduction ? String(this.brandInfo.introduction).trim() : ''
      const description = this.brandInfo.description ? String(this.brandInfo.description).trim() : ''
      const history = this.brandInfo.history ? String(this.brandInfo.history).trim() : ''
      
      const summary = quote || introduction || description || ''
      
      if (summary && history) {
        return summary + ' ' + history
      }
      return summary || history || ''
    },
    modelsText() {
      const list = (this.brandInfo && Array.isArray(this.brandInfo.models)) ? this.brandInfo.models : []
      return list.join('、')
    }
  },
  methods: {
    nextImage() {
      const len = this.images.length
      if (len <= 1) return
      this.slideDirection = 'next'
      this.currentImageIndex = (this.currentImageIndex + 1) % len
    },
    prevImage() {
      const len = this.images.length
      if (len <= 1) return
      this.slideDirection = 'prev'
      this.currentImageIndex = (this.currentImageIndex - 1 + len) % len
    },
    goToImage(idx) {
      if (idx >= 0 && idx < this.images.length) {
        this.slideDirection = idx > this.currentImageIndex ? 'next' : 'prev'
        this.currentImageIndex = idx
      }
    },
    loadCar(id) {
      const n = Number(id)
      this.car = cars.find(c => Number(c.id) === n) || null
      this.currentImageIndex = 0
    },
    toggleSpecs() {
      this.showSpecs = !this.showSpecs
    },
    goBasics(key) {
      const map = {
        size:        { id: 'body-size', anchor: '基本尺寸' },
        wheelbase:   { id: 'body-size', anchor: '基本尺寸' },
        weight:      { id: 'body-size', anchor: '质量参数' },
        engine:      { id: 'power-transmission', anchor: '发动机与电机参数' },
        transmission:{ id: 'power-transmission', anchor: '变速箱类型' },
        chassis:     { id: 'chassis-suspension', anchor: '常见悬架形式' }
      }
      const t = map[key]
      if (!t) return
      this.$router.push({
        name: 'CarBasicsDetail',
        params: { id: t.id },
        query: { anchor: t.anchor }
      })
    }
  },
  created() {
    this.loadCar(this.$route.params.id)
    import('@/data/car/brandDetails.json').then(mod => { 
      const details = mod.default
      const map = {}
      for (const brand in details) {
        if (details[brand].brandLogo) {
          map[brand] = details[brand].brandLogo
        }
      }
      this.brandLogoMap = map
    })
    if (typeof window !== 'undefined' && window.scrollTo) {
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
  },
  watch: {
    '$route.params.id'(val) {
      this.loadCar(val)
      if (typeof window !== 'undefined' && window.scrollTo) {
        window.scrollTo({ top: 0, behavior: 'auto' })
      }
    }
  }
}
</script>

<style scoped>

@font-face {
  font-family: 'SourceHanSansSC';
  src: url('~@/assets/fonts/SourceHanSansSC-Regular-2.otf') format('opentype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'RobotoMono';
  src: url('~@/assets/fonts/RobotoMono-VariableFont_wght.ttf') format('truetype');
  font-weight: 100 900;
  font-display: swap;
}

@font-face {
  font-family: 'MotivaSans';
  src: url('~@/assets/fonts/MotivaSans-Regular_woff.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'MSYaHei-Semibold';
  src: url('~@/assets/fonts/wryh/msyhsb.ttc') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

.page-car-detail {
  padding-top: 24px;
  font-family: 'SourceHanSansSC', sans-serif;
  min-height: max(500px, 70vh); /* 让高度自适应内容，同时保持合理的最小高度 */
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding-bottom: 24px; /* add spacing above footer */
  max-width: 100%;
  max-width: 1300px; /* 限制最大宽度，防止过宽 */
  margin: 0 auto; /* 内容居中显示 */
  width: 100%; /* 响应式宽度 */
}

.detail-layout {
  display: flex;
  flex: 1;
  gap: 20px;
}

/* Left Section: 70% */
.left-section {
  flex: 0 0 60%;
  position: relative;
  overflow: hidden;
  border-radius: 8px; /* 添加圆角让阴影更自然 */
  box-shadow: 0 12px 32px var(--c-shadow-heavy), 0 4px 12px rgba(0, 0, 0, 0.3); /* 添加凸显立体感的边缘阴影 */
  /* Merged hero styles */
}

.gallery-image {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  user-select: none;
  box-shadow: 0 8px 24px var(--c-shadow-heavy), 0 2px 8px var(--c-shadow-medium);
}

.gallery-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid var(--c-border-default);
  background: rgba(22, 27, 34, 0.88);
  color: var(--c-text-title);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  box-shadow: 0 6px 16px var(--c-shadow-medium);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 600;
  line-height: 1;
  cursor: pointer;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s ease, background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
}
.gallery-nav.prev { left: 10px; }
.gallery-nav.next { right: 10px; }
.left-section:hover .gallery-nav {
  opacity: 1;
  pointer-events: auto;
}
.gallery-nav:hover {
  background: var(--c-primary-alpha-20);
  border-color: transparent;
  color: var(--c-text-emphasis);
  transform: translateY(-50%) scale(1.04);
}
.gallery-nav:active {
  background: rgba(19, 19, 20, 0.92);
  border-color: var(--c-border-default);
  color: var(--c-text-title);
  transform: translateY(-50%) scale(0.98);
}

.dot-indicators {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 10px;
  display: flex;
  gap: 6px;
  z-index: 2;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s ease;
}
.left-section:hover .dot-indicators {
  opacity: 1;
  pointer-events: auto;
}
.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: 1px solid var(--c-text-emphasis);
  background: transparent;
}
.dot.active {
  background: var(--c-text-emphasis);
}

.slide-next-enter-active, .slide-next-leave-active { 
  transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1); 
}
.slide-next-enter { transform: translateX(100%); }
.slide-next-enter-to { transform: translateX(0); }
.slide-next-leave { transform: translateX(0); }
.slide-next-leave-to { transform: translateX(-100%); }

.slide-prev-enter-active, .slide-prev-leave-active { 
  transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1); 
}
.slide-prev-enter { transform: translateX(-100%); }
.slide-prev-enter-to { transform: translateX(0); }
.slide-prev-leave { transform: translateX(0); }
.slide-prev-leave-to { transform: translateX(100%); }

/* Right Section: 30% */
.right-section {
  flex: 0 0 40%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow: visible;
  padding: 0 40px;
  box-sizing: border-box;
  min-width: 400px; /* 设置右侧最小宽度，防止参数框内文字换行 */
}

/* Upper Part */
.info-upper {
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow: visible;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--c-border-default);
  padding: 6px 0;
}

.title-with-logo {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  overflow: visible;
  position: relative;
}

.section-header h2 {
  display: flex;
  align-items: center;
  font-weight: 600;
  margin: 0;
  font-size: 24px;
  color: var(--c-text-emphasis);
  white-space: nowrap;
  min-width: 0;
  position: relative;
}

.model-name { 
  margin-left: 6px; 
  font-family: 'MotivaSans', sans-serif;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.brand-link {
  color: var(--c-primary);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
}
.brand-link:hover { text-decoration: none; }
.brand-link:hover span { text-decoration: underline; }

.brand-logo-img,
.brand-name-text {
  transition: opacity 0.2s ease;
}

.brand-hover-wrapper {
  display: inline-flex;
  align-items: center;
  position: relative;
}

.brand-tooltip {
  position: absolute;
  top: calc(100% + 12px);
  left: 0;
  z-index: 100;
  width: 260px;
  padding: 16px;
  /* Mica / Acrylic Material Effect */
  background: rgba(32, 33, 36, 0.7); /* 半透明暗色背景 */
  border: 1px solid rgba(255, 255, 255, 0.1); /* 细腻的半透明边框 */
  border-radius: 12px;
  box-shadow: 
    0 12px 40px rgba(0, 0, 0, 0.4), /* 更深的外层阴影以衬托玻璃感 */
    inset 0 1px 0 rgba(255, 255, 255, 0.1); /* 顶部内发光模拟玻璃边缘高光 */
  backdrop-filter: blur(40px) saturate(150%); /* 强烈的模糊和色彩饱和度提升，这是Mica效果的关键 */
  -webkit-backdrop-filter: blur(40px) saturate(150%);
  box-sizing: border-box;
  white-space: normal;
  cursor: default;
}

.tooltip-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--c-border-default);
}

.tooltip-logo {
  height: 1.2em; /* 与文字行高保持更好的视觉一致性 */
  width: auto;
  max-width: 2.5em; /* 限制最大宽度，防止长条形LOGO占据过多空间 */
  object-fit: contain;
  border-radius: 2px;
  background: transparent;
  vertical-align: middle;
}

.tooltip-brand-name {
  font-size: 18px;
  font-weight: 600;
  line-height: 1; /* 统一行高，确保对齐 */
  color: var(--c-text-emphasis);
  display: flex;
  align-items: center;
}

.tooltip-intro {
  font-size: 13px;
  line-height: 1.6;
  color: var(--c-text-body-alt);
  margin: 0 0 16px 0;
  display: -webkit-box;
  -webkit-line-clamp: 8;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tooltip-models {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 12px;
  border-top: 1px dashed var(--c-border-default);
}

.tooltip-models-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--c-text-muted);
}

.tooltip-models-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px; /* 增加一点间距替代原有的分隔 */
}

.model-tag {
  font-size: 11px;
  font-weight: 600;
  color: var(--c-primary);
  background: transparent;
  border: none;
  padding: 0;
  border-radius: 0;
  font-family: 'MotivaSans', sans-serif;
  transition: none;
  position: relative;
}

/* 用伪元素添加一个小圆点分隔符，最后一个除外 */
.model-tag:not(:last-child):not(.ellipsis-tag)::after {
  content: '·';
  position: absolute;
  right: -6px;
  color: var(--c-text-muted);
  opacity: 0.5;
}

.model-tag:hover {
  background: transparent;
  transform: none;
}

.ellipsis-tag {
  background: transparent;
  border-color: transparent;
  color: var(--c-text-muted);
  padding: 0;
}

.ellipsis-tag:hover {
  background: transparent;
  transform: none;
}

.actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.special-action-block {
  margin-top: 8px;
}

.special-btn {
  position: relative;
  background: linear-gradient(135deg, #1a1a1a 0%, #2c2c2c 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  color: #e0e0e0;
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.5px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05);
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.special-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.08) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  transform: skewX(-20deg);
  transition: all 0.5s ease;
}

.special-btn:hover {
  transform: scale(1.05);
  color: #ffffff;
  background: linear-gradient(135deg, #242424 0%, #363636 100%);
  border-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.5), 0 0 12px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.special-btn:hover::before {
  left: 200%;
}

.special-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4), inset 0 1px 2px rgba(0, 0, 0, 0.2);
  background: #1a1a1a;
}

.special-text {
  position: relative;
  z-index: 1;
  font-family: 'MotivaSans', sans-serif;
}

.brand-logo {
  height: 1.2em; /* 稍微增加一点高度以更好地匹配文字的视觉高度 */
  width: auto;
  max-width: 2.5em; /* 限制最大宽度，防止长条形LOGO（如领克）过长 */
  object-fit: contain;
  border-radius: 3px;
  background: transparent;
  vertical-align: middle;
  position: relative;
  top: -1px; /* 微调垂直对齐 */
}
.brand-logo-xiaomi {
  height: 1.2em; /* 统一高度，与后边文本高度保持一致 */
}



.meta-block {
  display: flex;
  align-items: center;
}

.tag-group {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.tag {
  font-size: 11px;
  padding: 4px 10px;
  border-radius: 12px;
  background: rgba(62, 128, 182, 0.3); /* 统一为同一种亚克力背景色 */
  color: var(--c-text-title); /* White text */
  font-weight: 600;
  border: 1px solid rgba(102, 192, 244, 0.2); /* 统一边框色 */
  backdrop-filter: blur(12px) saturate(120%);
  -webkit-backdrop-filter: blur(12px) saturate(120%);
}

.tag-energy {
  color: var(--c-text-title);
}

.intro-text {
  color: var(--c-text-body-alt);
  line-height: 1.6;
  font-size: 16px;
  margin: 0;
  text-align: justify;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}

/* Lower Part */
.info-lower {
  margin-top: auto; /* Push specs to the bottom if content is short */
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.specs-box {
  background: var(--c-bg-l2);
  border: 1px solid var(--c-border-default); /* Outer border */
  border-radius: 8px; /* Rounded corners */
  padding: 0;
  font-family: 'MotivaSans', sans-serif;
  overflow: hidden; /* Clip children to border radius */
  box-shadow: 0 4px 15px var(--c-shadow-medium);
}

.spec-grid {
  display: flex;
  flex-direction: column;
  gap: 0;
  background: transparent;
}

.specs-hint {
  color: var(--c-text-muted);
  font-size: 12px;
  padding: 0 4px;
  text-align: right;
  margin: 6px 0 10px;
  background: transparent;
  border: none;
}

.spec-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px; /* 增加 .row-label 和 .row-value 之间的间距 */
  background: transparent;
  padding: 10px 16px;
  transition: background 0.2s;
  border-bottom: 1px solid var(--c-border-default);
}

.spec-row:hover {
  background: rgba(255, 255, 255, 0.03);
}

.spec-row:last-child {
  border-bottom: none;
}

.row-label {
  background: transparent;
  color: var(--c-text-body-alt); /* White text */
  font-size: 13px;
  padding: 0;
  width: auto;
  flex-shrink: 0;
  display: block;
  cursor: pointer;
  transition: color 0.2s;
}

.row-value {
  color: var(--c-text-title); /* White text */
  font-size: 13px;
  text-align: right;
  padding: 0;
  flex-grow: 1;
  display: block;
}

.row-label:hover {
  color: var(--c-primary);
  text-decoration: underline;
}

.not-found {
  color: var(--c-text-muted);
  text-align: center;
  margin-top: 40px;
}

/* Mobile Responsive */
.fab-specs {
  position: fixed;
  right: 20px;
  bottom: 20px;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  border: 1px solid var(--c-border-default);
  background: var(--c-bg-l2);
  backdrop-filter: blur(24px) saturate(120%);
  -webkit-backdrop-filter: blur(24px) saturate(120%);
  color: var(--c-text-emphasis);
  font-weight: 700;
  box-shadow: 0 8px 32px var(--c-shadow-medium); /* 移除发光阴影，恢复原本的阴影 */
  z-index: 1000;
  display: none; /* Hidden on desktop */
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.fab-specs:active {
  background: var(--c-bg-l3);
  border-color: var(--c-border-hover);
  transform: scale(0.95);
}

.specs-overlay, .specs-drawer {
  display: none;
}

@media (max-width: 768px) {
  .page-car-detail {
    min-height: auto;
    height: auto;
    display: block;
    padding: 20px 16px; /* 添加移动端左右 padding，产生 margin 效果 */
  }
  
  .detail-layout {
    flex-direction: column;
    height: auto;
    display: flex;
    gap: 0; /* 减小移动端模块之间的间距 */
  }
  
  .right-section {
    flex: 0 0 auto;
    display: flex;
    flex-direction: column;
    gap: 0;
    padding: 0; /* 移除桌面端左右 40px 的 padding */
    min-width: 0; /* 取消移动端下的最小宽度限制 */
  }

  .right-section, .info-upper {
    display: contents;
  }

  .section-header { order: 1; }
  .meta-block { 
    order: 2; 
    margin-top: 16px;
    margin-bottom: 16px;
  }

  .left-section {
    order: 3;
    width: 100%;
    height: 300px;
    flex: none;
  }

  .special-action-block {
    order: 4;
    margin-top: 16px;
    margin-bottom: 0;
  }

  .intro-text { 
    order: 5; 
    margin-top: 16px;
  }
  .info-lower { order: 6; }
  
  /* On very small screens, hide the specs box in column and show FAB */
  @media (max-width: 600px) {
    .info-lower {
      display: none;
    }
    .fab-specs {
      display: flex;
    }
    .specs-overlay {
      display: block; /* But hidden by v-if */
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: var(--c-shadow-heavy);
      z-index: 1000;
      backdrop-filter: blur(2px);
    }
    .specs-drawer {
      display: block; /* But hidden by v-if */
    }
    
    .specs-drawer {
      position: fixed;
      left: 0; right: 0; bottom: 0;
      max-height: 70vh;
      background: var(--c-bg-l2);
      backdrop-filter: blur(24px) saturate(120%);
      -webkit-backdrop-filter: blur(24px) saturate(120%);
      border-top: 1px solid var(--c-border-default);
      border-radius: 16px 16px 0 0;
      box-shadow: 0 -4px 24px var(--c-shadow-medium);
      padding: 20px;
      z-index: 1001;
      overflow-y: auto;
      will-change: transform;
    }
    
    .drawer-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 4px;
      color: var(--c-text-title);
      font-weight: bold;
    }
    
    .drawer-close {
      background: none;
      border: none;
      color: var(--c-text-muted);
      cursor: pointer;
    }

    .specs-box-mobile {
       /* Style for mobile drawer specs */
       color: var(--c-text-title);
    }

    .specs-box-mobile .specs-hint {
      margin: 0;
      padding: 0;
      text-align: left;
    }

    .specs-box-mobile .spec-grid {
      margin-top: 16px;
    }
  }
}

/* Transitions */
.slide-up-enter-active, .slide-up-leave-active { transition: transform 0.3s; }
.slide-up-enter, .slide-up-leave-to { transform: translateY(100%); }
.slide-up-enter-to, .slide-up-leave { transform: translateY(0); }

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter, .fade-leave-to { opacity: 0; }

@media (max-width: 768px) {
  }
</style>
