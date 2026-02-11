<template>
  <div class="container page-car-detail">
    <div v-if="car" class="detail-layout">
      <!-- Left Column: 70% -->
      <div class="left-section" :style="{ backgroundImage: `url(${car.img})` }">
        <div class="hero-overlay"></div>
      </div>

      <!-- Right Column: 30% -->
      <div class="right-section">
        <!-- Upper Part: Title, Back Button, Tags, Intro -->
        <div class="info-upper">
          <div class="section-header">
            <h2>{{ car.title }}</h2>
            <div class="actions">
              <router-link to="/mySpace/cars" class="back-btn">返回列表</router-link>
            </div>
          </div>
          
          <div class="meta-block">
            <div class="tag-group">
              <span class="tag tag-energy" v-for="e in energyList" :key="e">{{ e }}</span>
              <span class="tag tag-body">{{ car.body }}</span>
            </div>
          </div>
          
          <p class="intro-text">{{ introText }}</p>
        </div>

        <!-- Lower Part: Specs -->
        <div class="info-lower">
          <div class="specs specs-box">
            <div class="spec-grid">
              <div class="spec-row">
                <span class="row-label">车身尺寸</span>
                <span class="row-value">{{ bodySpecParsed.size }}</span>
              </div>
              <div class="spec-row">
                <span class="row-label">轴距</span>
                <span class="row-value">{{ bodySpecParsed.wheelbase }}</span>
              </div>
              <div class="spec-row">
                <span class="row-label">车重</span>
                <span class="row-value">{{ bodySpecParsed.weight }}</span>
              </div>
              <div class="spec-row">
                <span class="row-label">发动机</span>
                <span class="row-value">{{ specs.engine }}</span>
              </div>
              <div class="spec-row">
                <span class="row-label">变速箱</span>
                <span class="row-value">{{ specs.transmission }}</span>
              </div>
              <div class="spec-row">
                <span class="row-label">底盘</span>
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
            <button class="drawer-close" @click="toggleSpecs">关闭</button>
          </div>
          <div class="specs specs-box-mobile">
            <div class="spec-grid">
               <div class="spec-row">
                <span class="row-label">车身尺寸</span>
                <span class="row-value">{{ bodySpecParsed.size }}</span>
              </div>
              <div class="spec-row">
                <span class="row-label">轴距</span>
                <span class="row-value">{{ bodySpecParsed.wheelbase }}</span>
              </div>
              <div class="spec-row">
                <span class="row-label">车重</span>
                <span class="row-value">{{ bodySpecParsed.weight }}</span>
              </div>
              <div class="spec-row">
                <span class="row-label">发动机</span>
                <span class="row-value">{{ specs.engine }}</span>
              </div>
              <div class="spec-row">
                <span class="row-label">变速箱</span>
                <span class="row-value">{{ specs.transmission }}</span>
              </div>
              <div class="spec-row">
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
import cars from '@/data/cars.json'
export default {
  name: 'CarDetail',
  data() {
    return {
      car: null,
      showSpecs: false
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
    }
  },
  methods: {
    toggleSpecs() {
      this.showSpecs = !this.showSpecs
    }
  },
  created() {
    const id = Number(this.$route.params.id)
    this.car = cars.find(c => Number(c.id) === id) || null
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
  padding-top: 20px;
  font-family: 'SourceHanSansSC', sans-serif;
  height: 70vh; /* Reduced height to remove excess whitespace */
  min-height: 500px;
  box-sizing: border-box;
}

.detail-layout {
  display: flex;
  height: 100%;
  gap: 20px;
}

/* Left Section: 70% */
.left-section {
  flex: 0 0 70%;
  position: relative;
  overflow: hidden;
  border-radius: 0;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5); /* Added shadow for depth */
  /* Merged hero styles */
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: transparent; /* No overlay for clean image */
  z-index: 1;
}

/* Right Section: 30% */
.right-section {
  flex: 0 0 30%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto; /* Allow scrolling if content is too long */
}

/* Upper Part */
.info-upper {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #38424e;
  padding-bottom: 10px;
}

.section-header h2 {
  font-weight: 700;
  margin: 0;
  font-size: 24px;
  color: #e6f3ff;
}

.actions .back-btn {
  background: transparent;
  border: none;
  color: #c7d5e0;
  padding: 6px 12px;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  border-radius: 6px;
}

.actions .back-btn:hover {
  color: #e6f3ff;
  background: rgba(102,192,244,0.12);
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
  font-size: 12px;
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
  font-size: 17px; /* Increased font size */
  margin: 0;
  text-align: justify;
  font-family: 'MSYaHei-Semibold', sans-serif;
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
  gap: 0; /* No gap between rows */
  background: transparent;
}

.spec-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(0, 0, 0, 0.2); /* Dark row background */
  padding: 8px 16px;
  transition: background 0.2s;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1); /* Separator line */
}

.spec-row:last-child {
  border-bottom: none;
}

.row-label {
  background: transparent;
  color: #ffffff; /* White text */
  font-size: 13px; /* Smaller font */
  padding: 0;
  width: auto;
  flex-shrink: 0;
  display: block;
}

.row-value {
  color: #ffffff; /* White text */
  font-size: 13px; /* Smaller font */
  text-align: right;
  padding: 0;
  flex-grow: 1;
  display: block;
}

.not-found {
  color: #8f98a0;
  text-align: center;
  margin-top: 40px;
}

/* Mobile Responsive */
.fab-specs {
  position: fixed;
  right: 16px;
  bottom: 16px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: none;
  background: #66c0f4;
  color: #1b2838;
  font-weight: 700;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  z-index: 1000;
  display: none; /* Hidden on desktop */
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.specs-overlay, .specs-drawer {
  display: none;
}

@media (max-width: 900px) {
  .detail-layout {
    flex-direction: column;
    height: auto;
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

  .intro-text { order: 4; }
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
    }
    .specs-drawer {
      display: block; /* But hidden by v-if */
    }
    
    .specs-drawer {
      position: fixed;
      left: 0; right: 0; bottom: 0;
      max-height: 70vh;
      background: #1b2838;
      border-top: 1px solid #3c4551;
      padding: 20px;
      z-index: 1001;
      overflow-y: auto;
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
.slide-up-enter-from, .slide-up-leave-to { transform: translateY(100%); }
.slide-up-enter-to, .slide-up-leave-from { transform: translateY(0); }

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
