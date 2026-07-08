<template>
  <div class="container page-car-detail">
    <div v-if="car" class="detail-layout">
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

      <div class="right-section">
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
              <button class="back-btn" @click="$router.push(`/mySpace/cars/${baseCarId}`)">
                <img src="@/assets/images/fanhui.svg" class="back-icon" alt="返回" />
                <span class="back-text">返回主款</span>
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

          <p class="intro-text">{{ introText }}</p>
        </div>

        <div class="info-lower">
          <div class="specs-hint">提示：点击参数行可查看介绍详情</div>
          <div class="specs specs-box">
            <div class="spec-grid">
              <div class="spec-row" role="link" tabindex="0" @click="goBasics('size')" @keydown.enter.prevent="goBasics('size')" @keydown.space.prevent="goBasics('size')">
                <span class="row-label">车身尺寸</span>
                <span class="row-value">{{ bodySpecParsed.size }}</span>
              </div>
              <div class="spec-divider" aria-hidden="true"></div>
              <div class="spec-row" role="link" tabindex="0" @click="goBasics('wheelbase')" @keydown.enter.prevent="goBasics('wheelbase')" @keydown.space.prevent="goBasics('wheelbase')">
                <span class="row-label">轴距</span>
                <span class="row-value">{{ bodySpecParsed.wheelbase }}</span>
              </div>
              <div class="spec-divider" aria-hidden="true"></div>
              <div class="spec-row" role="link" tabindex="0" @click="goBasics('weight')" @keydown.enter.prevent="goBasics('weight')" @keydown.space.prevent="goBasics('weight')">
                <span class="row-label">车重</span>
                <span class="row-value">{{ bodySpecParsed.weight }}</span>
              </div>
              <div class="spec-divider" aria-hidden="true"></div>
              <div class="spec-row" role="link" tabindex="0" @click="goBasics('engine')" @keydown.enter.prevent="goBasics('engine')" @keydown.space.prevent="goBasics('engine')">
                <span class="row-label">发动机</span>
                <span class="row-value">{{ specs.engine }}</span>
              </div>
              <div class="spec-divider" aria-hidden="true"></div>
              <div class="spec-row" role="link" tabindex="0" @click="goBasics('transmission')" @keydown.enter.prevent="goBasics('transmission')" @keydown.space.prevent="goBasics('transmission')">
                <span class="row-label">变速箱</span>
                <span class="row-value">{{ specs.transmission }}</span>
              </div>
              <div class="spec-divider" aria-hidden="true"></div>
              <div class="spec-row" role="link" tabindex="0" @click="goBasics('chassis')" @keydown.enter.prevent="goBasics('chassis')" @keydown.space.prevent="goBasics('chassis')">
                <span class="row-label">底盘</span>
                <span class="row-value">{{ specs.chassis }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

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
            <div class="specs-hint">提示：点击参数行可查看介绍详情</div>
            <div class="spec-grid">
              <div class="spec-row" role="link" tabindex="0" @click="goBasics('size')" @keydown.enter.prevent="goBasics('size')" @keydown.space.prevent="goBasics('size')">
                <span class="row-label">车身尺寸</span>
                <span class="row-value">{{ bodySpecParsed.size }}</span>
              </div>
              <div class="spec-divider" aria-hidden="true"></div>
              <div class="spec-row" role="link" tabindex="0" @click="goBasics('wheelbase')" @keydown.enter.prevent="goBasics('wheelbase')" @keydown.space.prevent="goBasics('wheelbase')">
                <span class="row-label">轴距</span>
                <span class="row-value">{{ bodySpecParsed.wheelbase }}</span>
              </div>
              <div class="spec-divider" aria-hidden="true"></div>
              <div class="spec-row" role="link" tabindex="0" @click="goBasics('weight')" @keydown.enter.prevent="goBasics('weight')" @keydown.space.prevent="goBasics('weight')">
                <span class="row-label">车重</span>
                <span class="row-value">{{ bodySpecParsed.weight }}</span>
              </div>
              <div class="spec-divider" aria-hidden="true"></div>
              <div class="spec-row" role="link" tabindex="0" @click="goBasics('engine')" @keydown.enter.prevent="goBasics('engine')" @keydown.space.prevent="goBasics('engine')">
                <span class="row-label">发动机</span>
                <span class="row-value">{{ specs.engine }}</span>
              </div>
              <div class="spec-divider" aria-hidden="true"></div>
              <div class="spec-row" role="link" tabindex="0" @click="goBasics('transmission')" @keydown.enter.prevent="goBasics('transmission')" @keydown.space.prevent="goBasics('transmission')">
                <span class="row-label">变速箱</span>
                <span class="row-value">{{ specs.transmission }}</span>
              </div>
              <div class="spec-divider" aria-hidden="true"></div>
              <div class="spec-row" role="link" tabindex="0" @click="goBasics('chassis')" @keydown.enter.prevent="goBasics('chassis')" @keydown.space.prevent="goBasics('chassis')">
                <span class="row-label">底盘</span>
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
  name: 'SpecialCarDetail',
  data() {
    return {
      baseCarId: null,
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
      let size = ''
      let wheelbase = ''
      let weight = ''
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
      const brand = this.car.brand
      if (brand && this.brandLogoMap && this.brandLogoMap[brand]) return this.brandLogoMap[brand]
      return ''
    },
    brandName() {
      if (!this.car) return ''
      return this.car.brand || ''
    },
    modelName() {
      if (!this.car) return ''
      const brand = this.car.brand || ''
      const title = this.car.title || ''
      if (brand && title.startsWith(brand)) {
        return title.slice(brand.length).trim()
      }
      return title
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
        return `${summary} ${history}`
      }
      return summary || history || ''
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
      const baseCar = cars.find(c => Number(c.id) === n)
      if (baseCar) {
        this.baseCarId = baseCar.id
        this.car = baseCar.specialEdition || null
      } else {
        this.baseCarId = null
        this.car = null
      }
      this.currentImageIndex = 0
      this.showBrandTooltip = false
    },
    toggleSpecs() {
      this.showSpecs = !this.showSpecs
    },
    goBasics(key) {
      const map = {
        size: { id: 'body-size', anchor: '基本尺寸' },
        wheelbase: { id: 'body-size', anchor: '基本尺寸' },
        weight: { id: 'body-size', anchor: '质量参数' },
        engine: { id: 'power-transmission', anchor: '发动机与电机参数' },
        transmission: { id: 'power-transmission', anchor: '变速箱类型' },
        chassis: { id: 'chassis-suspension', anchor: '常见悬架形式' }
      }
      const target = map[key]
      if (!target) return
      this.$router.push({
        name: 'CarBasicsDetail',
        params: { id: target.id },
        query: { anchor: target.anchor }
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
  padding: 56px 48px 40px;
  font-family: 'SourceHanSansSC', sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  max-width: 1500px;
  margin: 0 auto;
}

.detail-layout {
  display: grid;
  grid-template-columns: minmax(0, 65fr) minmax(360px, 35fr);
  flex: 1;
  gap: 56px;
  align-items: start;
  animation: fadeInUp 0.8s ease both;
}

.left-section {
  position: relative;
  min-width: 0;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 12px;
  background: #101114;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.42);
}

.left-section::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center, transparent 58%, rgba(0, 0, 0, 0.34) 100%);
  pointer-events: none;
  z-index: 1;
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
  filter: contrast(1.05) saturate(1.04);
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
  bottom: 20px;
  display: flex;
  gap: 8px;
  z-index: 3;
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
  background: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  transition: all 0.3s ease;
}

.dot.active {
  width: 20px;
  border-radius: 4px;
  background: #fff;
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

.right-section {
  display: flex;
  flex-direction: column;
  gap: 36px;
  overflow: visible;
  padding-top: 0;
  box-sizing: border-box;
  min-width: 0;
}

.info-upper {
  display: flex;
  flex-direction: column;
  gap: 24px;
  overflow: visible;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;
  padding: 0;
}

.title-with-logo {
  display: flex;
  min-width: 0;
  overflow: visible;
  position: relative;
  flex: 1;
}

.section-header h2 {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  font-weight: 400;
  margin: 0;
  font-size: 13px;
  color: #8a8a93;
  white-space: normal;
  min-width: 0;
  position: relative;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}

.model-name {
  margin-left: 0;
  font-family: 'MotivaSans', sans-serif;
  font-size: 34px;
  line-height: 1.16;
  color: #f0f0f2;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  letter-spacing: 0.8px;
}

.brand-link {
  color: inherit;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 9px;
  position: relative;
  min-width: 0;
  font-size: 14px;
}

.brand-link:hover {
  color: #f0f0f2;
}

.brand-logo-img,
.brand-name-text {
  transition: opacity 0.2s ease, color 0.2s ease;
}

.brand-hover-wrapper {
  display: inline-flex;
  align-items: center;
  position: relative;
  min-width: 0;
}

.brand-tooltip {
  position: absolute;
  top: calc(100% + 12px);
  left: 0;
  z-index: 100;
  width: 260px;
  padding: 16px;
  background: rgba(32, 33, 36, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  box-shadow:
    0 12px 40px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(40px) saturate(150%);
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
  height: 1.2em;
  width: auto;
  max-width: 2.5em;
  object-fit: contain;
  border-radius: 2px;
  background: transparent;
  vertical-align: middle;
}

.tooltip-brand-name {
  font-size: 18px;
  font-weight: 600;
  line-height: 1;
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
  gap: 8px;
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

.back-btn {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #8a8a93;
  padding: 7px 14px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.back-btn:hover {
  border-color: rgba(255, 255, 255, 0.4);
  color: #f0f0f2;
}

.back-icon {
  width: 15px;
  height: 15px;
  opacity: 0.82;
}

.back-text {
  line-height: 1;
}

.brand-logo {
  height: 18px;
  width: auto;
  max-width: 42px;
  object-fit: contain;
  border-radius: 3px;
  background: transparent;
  vertical-align: middle;
}

.brand-logo-xiaomi {
  height: 18px;
}

.meta-block {
  display: flex;
  align-items: center;
}

.tag-group {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.tag {
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 12px;
  color: #b0b0b8;
  background: transparent;
  font-weight: 400;
  transition: all 0.3s ease;
}

.tag-energy {
  color: #b0b0b8;
}

.intro-text {
  color: #ffffff;
  line-height: 1.85;
  font-size: 14px;
  margin: 0;
  text-align: left;
  font-weight: 400;
  letter-spacing: 0.1px;
  font-family: 'SourceHanSansSC', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

.info-lower {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.specs-box {
  background: transparent;
  border: none;
  border-radius: 0;
  padding: 0;
  font-family: 'MotivaSans', sans-serif;
  overflow: visible;
  box-shadow: none;
}

.spec-grid {
  display: flex;
  flex-direction: column;
  gap: 0;
  background: transparent;
}

.specs-hint {
  color: #666670;
  font-size: 11px;
  padding: 0;
  text-align: right;
  margin: 0 0 12px;
  background: transparent;
  border: none;
}

.spec-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);
  align-items: center;
  gap: 18px;
  background: transparent;
  padding: 10px 12px;
  transition: background 0.25s ease, box-shadow 0.25s ease;
  border-radius: 10px;
  cursor: pointer;
  outline: none;
}

.spec-divider {
  height: 1px;
  margin: 0 12px;
  background: #1f1f26;
  pointer-events: none;
}

.spec-row:hover,
.spec-row:focus-visible {
  background: rgba(0, 102, 255, 0.08);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.14), inset 0 0 0 1px rgba(0, 102, 255, 0.36);
}

.spec-row:focus-visible {
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.14), inset 0 0 0 1px rgba(0, 102, 255, 0.36);
}

.row-label {
  background: transparent;
  color: #8a8a93;
  font-size: 13px;
  padding: 0;
  width: auto;
  flex-shrink: 0;
  display: block;
  cursor: pointer;
  transition: color 0.2s ease;
  font-weight: 300;
  font-family: 'SourceHanSansSC', sans-serif;
}

.row-value {
  color: #f0f0f2;
  font-size: 13px;
  text-align: right;
  padding: 0;
  display: block;
  min-width: 0;
}

.not-found {
  color: var(--c-text-muted);
  text-align: center;
  margin-top: 40px;
}

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
  box-shadow: 0 8px 32px var(--c-shadow-medium);
  z-index: 1000;
  display: none;
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

.specs-overlay,
.specs-drawer {
  display: none;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 1180px) {
  .page-car-detail {
    padding: 44px 32px 32px;
  }

  .detail-layout {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .right-section {
    display: contents;
    padding-top: 0;
    min-width: 0;
  }

  .info-upper {
    display: contents;
  }

  .section-header {
    order: 1;
  }

  .meta-block {
    order: 2;
  }

  .left-section {
    order: 4;
    width: 100%;
    height: auto;
    aspect-ratio: 16 / 10;
  }

  .intro-text {
    order: 5;
  }

  .info-lower {
    order: 6;
  }
}

@media (max-width: 768px) {
  .page-car-detail {
    min-height: auto;
    height: auto;
    display: block;
    padding: 28px 18px 24px;
  }

  .detail-layout {
    display: flex;
    flex-direction: column;
    height: auto;
    gap: 20px;
  }

  .right-section {
    display: contents;
    gap: 0;
    padding: 0;
    min-width: 0;
  }

  .info-upper {
    display: contents;
  }

  .section-header {
    order: 1;
    gap: 14px;
  }

  .meta-block {
    order: 2;
    margin-top: -4px;
  }

  .left-section {
    order: 4;
    width: 100%;
    height: auto;
    aspect-ratio: 16 / 10;
    flex: none;
  }

  .section-header h2 {
    gap: 9px;
  }

  .model-name {
    font-size: 26px;
  }

  .brand-name-text {
    max-width: 140px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .intro-text {
    order: 5;
    margin-top: 0;
    font-size: 14px;
    line-height: 1.8;
  }

  .info-lower {
    order: 6;
  }

  .right-section {
    padding: 0;
    min-width: 0;
  }

  .gallery-nav {
    width: 32px;
    height: 32px;
    font-size: 18px;
  }

  .gallery-nav.prev {
    left: 10px;
  }

  .gallery-nav.next {
    right: 10px;
  }

  .dot-indicators {
    bottom: 14px;
    gap: 7px;
  }

  .spec-row {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.4fr);
    padding: 9px 10px;
  }

  .row-label {
    font-size: 13px;
  }

  .row-value {
    font-size: 13px;
  }

  .back-btn {
    padding: 7px 12px;
  }
}

@media (max-width: 600px) {
  .info-lower {
    display: none;
  }

  .fab-specs {
    display: flex;
  }

  .specs-overlay {
    display: block;
    position: fixed;
    inset: 0;
    background: var(--c-shadow-heavy);
    z-index: 1000;
    backdrop-filter: blur(2px);
  }

  .specs-drawer {
    display: block;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100vw;
    max-width: 100vw;
    margin: 0;
    max-height: 70vh;
    background: var(--c-bg-l2);
    backdrop-filter: blur(24px) saturate(120%);
    -webkit-backdrop-filter: blur(24px) saturate(120%);
    border-top: 1px solid var(--c-border-default);
    border-radius: 16px 16px 0 0;
    box-shadow: 0 -4px 24px var(--c-shadow-medium);
    padding: 20px 20px calc(20px + env(safe-area-inset-bottom));
    box-sizing: border-box;
    z-index: 1001;
    overflow-y: auto;
    will-change: transform;
    transform-origin: bottom center;
    overscroll-behavior: contain;
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

  .section-header {
    width: 100%;
    justify-content: space-between;
    align-items: flex-start;
  }

  .title-with-logo {
    flex: 1;
    min-width: 0;
  }

  .actions {
    width: auto;
    margin-left: auto;
    flex-shrink: 0;
  }

  .back-btn {
    width: auto;
    justify-content: flex-start;
  }
}

.slide-up-enter-active, .slide-up-leave-active { transition: transform 0.3s ease; }
.slide-up-enter, .slide-up-leave-to { transform: translate3d(0, calc(100% + env(safe-area-inset-bottom)), 0); }
.slide-up-enter-to, .slide-up-leave { transform: translateY(0); }

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter, .fade-leave-to { opacity: 0; }
</style>
