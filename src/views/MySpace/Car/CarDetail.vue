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
                  class="brand-hover-wrapper"
                  v-if="brandName"
                  @mouseenter="showBrandCard = true"
                  @mouseleave="showBrandCard = false"
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
                    />
                    <span>{{ brandName }}</span>
                  </router-link>
                  <div v-if="showBrandCard" class="brand-hover-card" role="tooltip" ref="hoverCard">
                    <img
                      v-if="brandLogoFor"
                      class="hover-card-logo"
                      :src="brandLogoFor"
                      :alt="brandName"
                      ref="hoverLogo"
                    />
                    <div class="hover-card-text" ref="hoverText">
                      <div class="hover-section-desc" ref="hoverDescSection">
                        <p
                          v-if="brandInfo && brandInfo.description"
                          class="hover-card-desc"
                          ref="hoverDesc"
                          :class="{ clamp: descClamp > 0 }"
                          :style="descClampStyle"
                        >{{ brandInfo.description }}</p>
                      </div>
                      <div class="hover-section-models" ref="hoverModelsSection">
                        <p
                          v-if="modelsText"
                          class="hover-card-models"
                          ref="hoverModels"
                          :class="{ clamp: modelsClamp > 0 }"
                          :style="modelsClampStyle"
                        >代表车型：{{ modelsText }}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <span class="model-name">{{ modelName }}</span>
              </h2>
            </div>
            <div class="actions">
              <router-link to="/mySpace/cars" class="back-btn">
                <img src="@/assets/images/fanhui.svg" class="back-icon" alt="返回" />
                <span class="back-text">返回</span>
              </router-link>
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

      <!-- Mobile Pager (Narrow Screen) -->
      <div class="detail-pager-mobile">
        <button class="nav-icon" :disabled="!hasPrev" @click="goPrev" aria-label="上一辆">‹</button>
        <button class="nav-icon" :disabled="!hasNext" @click="goNext" aria-label="下一辆">›</button>
      </div>

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
      <!-- 详情页内不再显示翻页按钮，改为全局 footer 上方显示 -->
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
      showBrandCard: false,
      descClamp: 0,
      modelsClamp: 0,
      maxDescLines: 10,
      maxModelsLines: 3
    }
  },
  computed: {
    sortedCars() {
      return [...cars].sort((a, b) => Number(a.id) - Number(b.id))
    },
    currentIndex() {
      if (!this.car) return -1
      return this.sortedCars.findIndex(c => Number(c.id) === Number(this.car.id))
    },
    prevId() {
      const i = this.currentIndex
      if (i > 0) return this.sortedCars[i - 1].id
      return null
    },
    nextId() {
      const i = this.currentIndex
      if (i >= 0 && i < this.sortedCars.length - 1) return this.sortedCars[i + 1].id
      return null
    },
    hasPrev() {
      return this.prevId !== null
    },
    hasNext() {
      return this.nextId !== null
    },
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
    modelsText() {
      const list = (this.brandInfo && Array.isArray(this.brandInfo.models)) ? this.brandInfo.models : []
      return list.join('、')
    },
    descClampStyle() {
      if (this.descClamp > 0) return { WebkitLineClamp: String(this.descClamp) }
      return {}
    },
    modelsClampStyle() {
      if (this.modelsClamp > 0) return { WebkitLineClamp: String(this.modelsClamp) }
      return {}
    }
  },
  methods: {
    carDetailPath(id) {
      return `/mySpace/cars/${id}`
    },
    goPrev() {
      if (this.hasPrev) {
        this.$router.push(this.carDetailPath(this.prevId))
      }
    },
    goNext() {
      if (this.hasNext) {
        this.$router.push(this.carDetailPath(this.nextId))
      }
    },
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
    },
    computeBrandCardClamp() {
      const desc = this.$refs.hoverDesc
      const models = this.$refs.hoverModels
      const descSection = this.$refs.hoverDescSection
      const modelsSection = this.$refs.hoverModelsSection
      const card = this.$refs.hoverCard
      const logoEl = this.$refs.hoverLogo
      this.descClamp = 0
      this.modelsClamp = 0
      if (!card || !descSection || !modelsSection || !desc) return
      const width = card.offsetWidth || 280
      const maxTextHeight = width * 1.5
      const logoHeight = logoEl ? (logoEl.clientHeight || 120) : 120
      const textAvailable = Math.max(maxTextHeight - logoHeight - 20, 0)
      const csDesc = window.getComputedStyle(desc)
      const csModels = models ? window.getComputedStyle(models) : null
      const lhDesc = parseFloat(csDesc.lineHeight) || 22
      const lhModels = csModels ? parseFloat(csModels.lineHeight) || 20 : 20
      const fullDesc = desc.scrollHeight
      const fullModels = models ? models.scrollHeight : 0
      const fullDescLines = lhDesc > 0 ? Math.ceil(fullDesc / lhDesc) : 0
      const fullModelsLines = lhModels > 0 ? Math.ceil(fullModels / lhModels) : 0
      // 分配可用高度（与布局比例一致）
      const descAlloc = textAvailable * 0.75
      const modelsAlloc = textAvailable * 0.25
      const availDescLines = lhDesc > 0 ? Math.floor(descAlloc / lhDesc) : 0
      const availModelsLines = lhModels > 0 ? Math.floor(modelsAlloc / lhModels) : 0
      // 介绍：超过上限或超过可用空间则启用省略，最多 10 行
      if (fullDescLines > this.maxDescLines || fullDescLines > availDescLines) {
        const cappedDesc = Math.min(availDescLines, this.maxDescLines)
        this.descClamp = cappedDesc > 0 ? cappedDesc : 0
      } else {
        this.descClamp = 0
      }
      // 代表车型：超过上限或超过可用空间则启用省略，最多 3 行
      if (models) {
        if (fullModelsLines > this.maxModelsLines || fullModelsLines > availModelsLines) {
          const cappedModels = Math.min(availModelsLines, this.maxModelsLines)
          this.modelsClamp = cappedModels > 0 ? cappedModels : 0
        } else {
          this.modelsClamp = 0
        }
      }
    }
  },
  created() {
    this.loadCar(this.$route.params.id)
    import('@/data/car/brandLogos.json').then(mod => { this.brandLogoMap = mod.default })
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
    },
    showBrandCard(val) {
      if (val) {
        this.$nextTick(() => {
          this.computeBrandCardClamp()
          if (typeof window !== 'undefined') {
            window.addEventListener('resize', this.computeBrandCardClamp)
          }
        })
      } else {
        if (typeof window !== 'undefined') {
          window.removeEventListener('resize', this.computeBrandCardClamp)
        }
        this.descClamp = 0
        this.modelsClamp = 0
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
  height: 70vh; /* Reduced height to remove excess whitespace */
  min-height: 500px;
  box-sizing: border-box;
  padding-bottom: 24px; /* add spacing above footer */
  max-width: 1300px; /* 限制最大宽度，防止过宽 */
  margin: 0 auto; /* 内容居中显示 */
  width: 100%; /* 响应式宽度 */
}

.detail-layout {
  display: flex;
  height: 100%;
  gap: 20px;
}

.detail-pager {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin: 0;
}

.nav-icon {
  background: rgba(102,192,244,0.12);
  border: none;
  color: #c7d5e0;
  padding: 8px 14px;
  min-width: 40px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  font-size: 18px;
  line-height: 1;
}
.nav-icon:hover {
  color: #e6f3ff;
  background: rgba(102,192,244,0.22);
}
.nav-icon:disabled {
  opacity: 0.6;
  cursor: default;
  pointer-events: none;
  background: rgba(102,192,244,0.06);
}

/* Left Section: 70% */
.left-section {
  flex: 0 0 60%;
  position: relative;
  overflow: hidden;
  border-radius: 0;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5); /* Added shadow for depth */
  /* Merged hero styles */
}

.gallery-image {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  user-select: none;
}

.gallery-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  width: 46px;
  height: 92px;
  border-radius: 8px;
  border: none;
  background: rgba(27,40,56,0.55);
  color: #ffffff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  line-height: 1;
  cursor: pointer;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s ease;
}
.gallery-nav.prev { left: 8px; }
.gallery-nav.next { right: 8px; }
.left-section:hover .gallery-nav {
  opacity: 1;
  pointer-events: auto;
}
.gallery-nav:hover {
  background: rgba(27,40,56,0.75);
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
  border: 1px solid #e6f3ff;
  background: transparent;
}
.dot.active {
  background: #e6f3ff;
}

.slide-next-enter-active, .slide-next-leave-active { transition: transform 0.25s ease, opacity 0.25s ease; }
.slide-next-enter { transform: translateX(40px); opacity: 0; }
.slide-next-enter-to { transform: translateX(0); opacity: 1; }
.slide-next-leave { transform: translateX(0); opacity: 1; }
.slide-next-leave-to { transform: translateX(-40px); opacity: 0; }

.slide-prev-enter-active, .slide-prev-leave-active { transition: transform 0.25s ease, opacity 0.25s ease; }
.slide-prev-enter { transform: translateX(-40px); opacity: 0; }
.slide-prev-enter-to { transform: translateX(0); opacity: 1; }
.slide-prev-leave { transform: translateX(0); opacity: 1; }
.slide-prev-leave-to { transform: translateX(40px); opacity: 0; }

/* Right Section: 30% */
.right-section {
  flex: 0 0 40%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow: visible;
  padding: 0 40px;
  box-sizing: border-box;
}

/* Upper Part */
.info-upper {
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 240px;
  overflow: visible;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #38424e;
  padding: 6px 0;
}

.title-with-logo {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.section-header h2 {
  display: flex;
  align-items: center;
  font-weight: 400;
  margin: 0;
  font-size: 24px;
  color: #e6f3ff;
}

.brand-link {
  color: #66c0f4;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
}
.brand-link:hover { text-decoration: none; }
.brand-link:hover span { text-decoration: underline; }
.model-name { margin-left: 6px; font-family: 'MotivaSans', sans-serif; }

.brand-logo {
  height: 24px;
  width: auto;
  object-fit: contain;
  border-radius: 3px;
  background: transparent;
}
.brand-logo-xiaomi {
  height: 1em;
}

.brand-hover-wrapper {
  position: relative;
  display: inline-block;
}
.brand-hover-card {
  position: absolute;
  top: 120%;
  left: 0;
  z-index: 2000;
  --hover-card-width: 280px;
  width: var(--hover-card-width);
  max-height: calc(var(--hover-card-width) * 1.5);
  background: rgba(32, 43, 58, 0.6);
  backdrop-filter: blur(24px) saturate(120%);
  -webkit-backdrop-filter: blur(24px) saturate(120%);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  box-shadow:
    0 12px 32px rgba(0,0,0,0.4),
    0 4px 12px rgba(0,0,0,0.2),
    0 0 0 1px rgba(255,255,255,0.05);
  overflow: visible;
  will-change: box-shadow, transform, opacity;
}
.hover-card-logo {
  width: 100%;
  height: var(--hover-logo-height, 120px);
  object-fit: contain;
  background: transparent;
  border-bottom: 1px solid rgba(102,192,244,0.25);
  padding-top: 8px;
  padding-bottom: 8px;
  border-radius: 8px 8px 0 0;
}
.hover-card-text {
  padding: 8px 10px;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
}
.brand-hover-card::before {
  content: "";
  position: absolute;
  left: 20px;
  top: -7px;
  width: 12px;
  height: 12px;
  background: rgba(32, 43, 58, 0.6);
  border-left: 1px solid rgba(255, 255, 255, 0.12);
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  transform: rotate(45deg);
  backdrop-filter: blur(24px) saturate(120%);
  -webkit-backdrop-filter: blur(24px) saturate(120%);
  z-index: 1;
}
.hover-section-desc {
  flex: 0 0 75%;
  overflow: hidden;
}
.hover-section-models {
  flex: 0 0 25%;
  overflow: hidden;
  border-top: 1px solid rgba(102,192,244,0.18);
  padding-top: 6px;
}
.hover-card-desc {
  color: #c6d4df;
  font-size: 14px;
  line-height: 1.6;
  margin: 0 0 6px 0;
  overflow: hidden;
  word-break: break-word;
}
.hover-card-desc.clamp {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
}
.hover-card-models {
  color: #66c0f4;
  font-size: 12px;
  margin: 0;
  overflow: hidden;
  word-break: break-word;
}
.hover-card-models.clamp {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
}

.actions .back-btn { 
  background: transparent; 
  border: 1px solid #3c4551; 
  color: #c7d5e0; 
  padding: 6px 12px; 
  cursor: pointer; 
  text-decoration: none; 
  display: inline-flex; 
  align-items: center; 
  gap: 6px; 
  border-radius: 6px; 
  flex-shrink: 0; /* 防止被压缩 */
  white-space: nowrap; /* 防止文字换行 */
  height: 32px; /* 固定高度 */
  box-sizing: border-box;
}
.back-icon {
  width: 16px;
  height: 16px;
  display: block;
}

.actions .back-btn:hover {
  color: #e6f3ff;
  background: rgba(102,192,244,0.12);
}

.actions .nav-icon {
  background: rgba(102,192,244,0.12);
  border: 1px solid rgba(102,192,244,0.25);
  border: none;
  color: #c7d5e0;
  padding: 6px 10px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  margin-right: 6px;
  font-size: 18px;
  line-height: 1;
}

.actions .nav-icon:hover {
  color: #e6f3ff;
  background: rgba(102,192,244,0.22);
}

.actions .nav-icon:disabled {
  opacity: 0.6;
  cursor: default;
  pointer-events: none;
  background: rgba(102,192,244,0.06);
  border-color: rgba(255,255,255,0.1);
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
  padding: 4px 8px;
  border-radius: 4px;
  background: rgba(62, 128, 182, 0.4); /* Lighter theme blue background */
  color: #ffffff; /* White text */
  font-weight: 600;
  backdrop-filter: blur(4px); /* Blur effect */
  -webkit-backdrop-filter: blur(4px);
}

.tag-energy {
  color: #ffffff;
  background: rgba(62, 128, 182, 0.4);
}

.intro-text {
  color: #c7d5e0;
  line-height: 1.6;
  font-size: 16px;
  margin: 0;
  text-align: justify;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

/* Lower Part */
.info-lower {
  flex: 1; /* Fill remaining space */
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.specs-box {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.15); /* Outer border */
  border-radius: 6px; /* Rounded corners */
  padding: 0;
  font-family: 'MotivaSans', sans-serif;
  overflow: hidden; /* Clip children to border radius */
}

.spec-grid {
  display: flex;
  flex-direction: column;
  gap: 0;
  background: transparent;
}

.specs-hint {
  color: #8f98a0;
  font-size: 12px;
  padding: 0 16px;
  text-align: right;
  margin: 6px 0 10px;
  background: transparent;
  border: none;
}

.spec-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(0, 0, 0, 0.2);
  padding: 8px 16px;
  transition: background 0.2s;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.spec-row:last-child {
  border-bottom: none;
}

.row-label {
  background: transparent;
  color: #ffffff; /* White text */
  font-size: 12px;
  padding: 0;
  width: auto;
  flex-shrink: 0;
  display: block;
  cursor: pointer;
}

.row-value {
  color: #ffffff; /* White text */
  font-size: 12px;
  text-align: right;
  padding: 0;
  flex-grow: 1;
  display: block;
}

.row-label:hover {
  color: #66c0f4;
  text-decoration: underline;
}

.not-found {
  color: #8f98a0;
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
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(32, 43, 58, 0.6);
  backdrop-filter: blur(24px) saturate(120%);
  -webkit-backdrop-filter: blur(24px) saturate(120%);
  color: #e6f3ff;
  font-weight: 700;
  box-shadow: 0 8px 32px rgba(0,0,0,0.35);
  z-index: 1000;
  display: none; /* Hidden on desktop */
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.specs-overlay, .specs-drawer {
  display: none;
}

.detail-pager-mobile {
  display: none;
}

@media (max-width: 768px) {
  .page-car-detail {
    height: auto;
  }
  
  .detail-layout {
    flex-direction: column;
    height: auto;
  }
  
  .detail-pager-mobile {
    display: flex;
    justify-content: center;
    gap: 12px;
    margin: 4px 0;
    order: 4;
  }

  .right-section, .info-upper {
    display: contents;
  }

  .section-header { order: 1; }
  .meta-block { order: 2; }

  .left-section {
    order: 3;
    width: 100%;
    height: 300px;
    flex: none;
  }

  .intro-text { order: 5; }
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
    }
    .specs-drawer {
      display: block; /* But hidden by v-if */
    }
    
    .specs-drawer {
      position: fixed;
      left: 0; right: 0; bottom: 0;
      max-height: 70vh;
      background: rgba(32, 43, 58, 0.75);
      backdrop-filter: blur(24px) saturate(120%);
      -webkit-backdrop-filter: blur(24px) saturate(120%);
      border-top: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 16px 16px 0 0;
      box-shadow: 0 -4px 24px rgba(0,0,0,0.4);
      padding: 20px;
      z-index: 1001;
      overflow-y: auto;
      will-change: transform;
    }
    
    .drawer-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 15px;
      color: #fff;
      font-weight: bold;
    }
    
    .drawer-close {
      background: none;
      border: none;
      color: #8f98a0;
      cursor: pointer;
    }

    .specs-box-mobile {
       /* Style for mobile drawer specs */
       color: #fff;
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
    .back-text { display: none; }
    .back-btn { padding: 6px; }
  }
</style>
