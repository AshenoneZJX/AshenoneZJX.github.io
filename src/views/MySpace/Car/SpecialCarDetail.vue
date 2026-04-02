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
                          v-if="brandInfo && (brandInfo.quote || brandInfo.description)"
                          class="hover-card-desc"
                          ref="hoverDesc"
                          :class="{ clamp: descClamp > 0 }"
                          :style="descClampStyle"
                        >{{ brandInfo.quote || brandInfo.description }}</p>
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
              <button  class="back-btn" @click="$router.push(`/mySpace/cars/${baseCarId}`)">
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
  name: 'SpecialCarDetail',
  data() {
    return {
      baseCarId: null,
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
        this.car = null
      }
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

.slide-next-enter-active, .slide-next-leave-active { transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.4s ease; }
.slide-next-enter { transform: translateX(20px); opacity: 0; }
.slide-next-enter-to { transform: translateX(0); opacity: 1; }
.slide-next-leave { transform: translateX(0); opacity: 1; }
.slide-next-leave-to { transform: translateX(-20px); opacity: 0; }

.slide-prev-enter-active, .slide-prev-leave-active { transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.4s ease; }
.slide-prev-enter { transform: translateX(-20px); opacity: 0; }
.slide-prev-enter-to { transform: translateX(0); opacity: 1; }
.slide-prev-leave { transform: translateX(0); opacity: 1; }
.slide-prev-leave-to { transform: translateX(20px); opacity: 0; }

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
  min-width: 0; /* 允许在 flex 容器中收缩 */
}

.section-header h2 {
  display: flex;
  align-items: center;
  font-weight: 600; /* 修改此处：从 400 加重至 600 */
  margin: 0;
  font-size: 24px;
  color: var(--c-text-emphasis);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
}

.brand-link {
  color: var(--c-primary);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
}
.brand-link:hover { text-decoration: none; }
.brand-link:hover span { text-decoration: underline; }

.model-name { 
  margin-left: 6px; 
  font-family: 'MotivaSans', sans-serif;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.special-btn {
  background: linear-gradient(135deg, var(--c-primary), #1a6b9c);
  border: none;
  border-radius: 4px;
  color: #fff;
  padding: 6px 12px;
  font-size: 13px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}
.special-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(102, 192, 244, 0.4);
}
.special-btn:active {
  transform: translateY(1px);
}

.brand-logo {
  height: 1em; /* 设置高度为 1em，使其与文字高度一致 */
  width: auto;
  object-fit: contain;
  border-radius: 3px;
  background: transparent;
  vertical-align: middle; /* 确保垂直居中对齐 */
}
.brand-logo-xiaomi {
  height: 1em;
}

.brand-hover-wrapper {
  position: relative;
  display: inline-flex;
  flex-shrink: 0; /* 品牌 logo 和名称不收缩 */
}
.brand-hover-card {
  position: absolute;
  top: calc(100% + 14px);
  left: 0; /* 修改移动端下悬浮框位置，使其默认靠左对齐，防止超出左边界 */
  z-index: 2000;
  --hover-card-width: 280px;
  width: var(--hover-card-width);
  max-height: calc(var(--hover-card-width) * 1.5);
  background: var(--c-bg-l3); /* 进一步提高背景明度至浅灰色 */
  backdrop-filter: blur(24px) saturate(120%);
  -webkit-backdrop-filter: blur(24px) saturate(120%);
  border: 1px solid var(--c-border-default); /* 修改边框颜色适应主题 */
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  box-shadow:
    0 12px 32px var(--c-shadow-medium),
    0 4px 12px var(--c-shadow-light);
  overflow: visible;
  will-change: box-shadow, transform, opacity;
}

@media (min-width: 769px) {
  .brand-hover-card {
    left: 50%;
    transform: translateX(-50%);
  }
}

.brand-hover-card::after {
  content: "";
  position: absolute;
  top: -14px;
  left: 0;
  width: 100%;
  height: 14px;
  background: transparent;
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
  left: 24px; /* 移动端下小箭头靠左显示 */
  margin-left: -6px;
  top: -7px;
  width: 14px;
  height: 14px;
  background: var(--c-bg-l3); /* 同步提高小箭头背景明度 */
  border-left: 1px solid var(--c-border-default); /* 同步修改小箭头边框色 */
  border-top: 1px solid var(--c-border-default);
  transform: rotate(45deg);
  z-index: -1;
  border-radius: 2px 0 0 0;
  box-shadow: 
    -2px -2px 6px rgba(0, 0, 0, 0.1);
}

@media (min-width: 769px) {
  .brand-hover-card::before {
    left: calc(50% + 16px);
  }
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
  color: var(--c-text-body);
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
  color: var(--c-primary);
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
  color: var(--c-text-muted);
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
  gap: 16px; /* 增加 .row-label 和 .row-value 之间的间距 */
  background: var(--c-shadow-light);
  padding: 8px 16px;
  transition: background 0.2s;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.spec-row:last-child {
  border-bottom: none;
}

.row-label {
  background: transparent;
  color: var(--c-text-title); /* White text */
  font-size: 12px;
  padding: 0;
  width: auto;
  flex-shrink: 0;
  display: block;
  cursor: pointer;
}

.row-value {
  color: var(--c-text-title); /* White text */
  font-size: 12px;
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

  .intro-text { 
    order: 4; 
    margin-top: 16px;
  }
  .info-lower { order: 5; }
  
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
