<template>
  <div class="container page-car-detail">
    <div class="section-header">
      <h2>{{ car ? car.title : '车型未找到' }}</h2>
      <div class="actions">
        <router-link to="/mySpace/cars" class="back-btn">返回列表</router-link>
      </div>
    </div>

    <div v-if="car" class="detail-body">
      <div class="hero" :style="{ backgroundImage: `url(${car.img})` }">
        <div class="hero-overlay"></div>
      </div>
      <div class="detail-content two-col">
        <div class="left-col">
          <div class="meta-inline">
            <div class="tag-group">
              <span class="tag tag-energy" v-for="e in energyList" :key="e">{{ e }}</span>
              <span class="tag tag-body">{{ car.body }}</span>
            </div>
          </div>
          <p class="overlay-intro">{{ introText }}</p>
        </div>
        <div class="right-col">
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
        </transition>
      </div>
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

.page-car-detail {
  padding-top: 20px;
  font-family: 'SourceHanSansSC', sans-serif;
}
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    border-bottom: 1px solid #38424e;
    padding-bottom: 10px;
    margin-bottom: 20px;
  }
.section-header h2 { font-weight: 700; }
.actions .back-btn { background: transparent; border: none; color: #c7d5e0; padding: 6px 12px; cursor: pointer; text-decoration: none; display: inline-block; border-radius: 6px; }
.actions .back-btn:hover { color: #e6f3ff; background: rgba(102,192,244,0.12); }


  /* 英雄图区域：展示车型主图 */
  .hero {
    height: 360px;                    /* 固定高度，保持视觉统一 */
    background-size: cover;           /* 背景图铺满容器 */
    background-position: center;      /* 背景图居中 */
    position: relative;               /* 为内部遮罩层提供定位上下文 */
    border: none;                     /* 去掉边框，保持简洁 */
    box-shadow: 0 4px 15px rgba(0,0,0,0.4); /* 底部投影，增强层次感 */
    overflow: hidden;                 /* 隐藏超出部分，避免圆角或投影被裁剪 */
  }
  .hero-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0.25);
    z-index: 1;
  }
  /* 底部渐变遮罩：让英雄图底部与下方内容自然过渡，避免硬切 */
  .hero::after {
    content: "";
    position: absolute;
    left: 0; right: 0; bottom: 0;
    height: 33%; /* 占英雄图高度的 1/3，保证渐变区域足够长 */
    background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(27,40,56,0.6) 40%, #1b2838 100%);
    z-index: 2; /* 位于 hero-overlay 之上，确保能被看到 */
  }
  .two-col { display: flex; gap: 20px; }
  .detail-content {
    position: relative;
    z-index: 5;
    margin-top: -90px; /* 与封面重合约 1/4 高度（360px） */
    padding: 0 2px;
  }
  .left-col { flex: 1; min-width: 0; }
  .right-col { flex: 1; min-width: 0; }

.meta-inline { display: flex; gap: 12px; margin-bottom: 10px; padding-bottom: 6px; border-bottom: 1px solid #38424e; }
.tag { display: inline-block; padding: 0; font-size: 13px; border-radius: 0; font-weight: 600; font-style: normal; background: transparent; border: none; color: #c7d5e0; }
.tag-energy { background: transparent; color: inherit; }
.tag-body { background: transparent; color: inherit; }

.tag-group {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 6px 10px;
  background: rgba(27,40,56,0.5);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border-radius: 8px;
}

  .overlay-intro { color: #c7d5e0; line-height: 1.8; font-size: 15px; }
  .specs { border-top: none; padding-top: 0; }
  .specs-box { background: rgba(27,40,56,0.55); border: 1px solid #3c4551; backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); border-radius: 6px; padding: 12px; font-family: 'RobotoMono', Menlo, Monaco, Consolas, "Courier New", monospace, 'SourceHanSansSC', sans-serif; font-size: 13px; width: 100%; max-width: 480px; margin-left: auto; margin-right: 0; }
  .spec-grid { display: grid; grid-template-columns: 1fr; gap: 8px; }
  .spec-group { display: grid; grid-template-columns: max-content 1fr; gap: 8px; align-items: start; }
  .group-label { color: #8f98a0; font-size: 14px; font-weight: 400; margin: 0; text-align: left; align-self: center; }
  .group-list { display: grid; grid-template-columns: 1fr; gap: 2px; }
  .spec-row { display: grid; grid-template-columns: max-content 1fr; align-items: baseline; }
  .row-label { color: #8f98a0; font-size: 13px; text-align: left; white-space: nowrap; }
  .row-value { color: #e6f3ff; font-size: 13px; text-align: right; white-space: normal; overflow-wrap: anywhere; word-break: break-word; }

  .not-found { color: #8f98a0; }

  .fab-specs {
    position: fixed;
    right: 16px;
    bottom: 16px;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    border: 1px solid #3c4551;
    background: rgba(27,40,56,0.85);
    color: #e6f3ff;
    font-size: 15px;
    font-weight: 600;
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    box-shadow: 0 6px 18px rgba(0,0,0,0.35);
    z-index: 1000;
    display: none;
    align-items: center;
    justify-content: center;
  }
  .specs-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.45);
    z-index: 999;
    display: none;
  }
  .specs-drawer {
    position: fixed;
    left: 0; right: 0; bottom: 0;
    max-height: 70vh;
    background: #1b2838;
    border-top: 1px solid #3c4551;
    box-shadow: 0 -10px 24px rgba(0,0,0,0.45);
    z-index: 1001;
    padding: 12px;
    overflow-y: auto;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    display: none;
  }
  .drawer-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #c7d5e0;
    margin-bottom: 8px;
  }
  .drawer-close {
    background: transparent;
    border: none;
    color: #c7d5e0;
    padding: 6px 10px;
    border-radius: 6px;
    cursor: pointer;
  }
  .slide-up-enter-active,
  .slide-up-leave-active {
    transition: transform 240ms ease, opacity 240ms ease;
  }
  .slide-up-enter-from,
  .slide-up-leave-to {
    transform: translateY(16px);
    opacity: 0;
  }
  .slide-up-enter-to,
  .slide-up-leave-from {
    transform: translateY(0);
    opacity: 1;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 180ms ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  .fade-enter-to,
  .fade-leave-from {
    opacity: 1;
  }

  @media (max-width: 768px) {
    .hero { height: 280px; }
    .detail-content { margin-top: -70px; }
    .two-col { flex-direction: column; }
    .right-col { display: none; }
    .left-col { width: 100%; }
    .specs-box { padding: 10px; max-width: 100%; margin: 0; }
    .spec-item { font-size: 13px; }
    .spec-item .label, .spec-item .value { font-size: 13px; }
    .right-col .specs-box { display: none; }
    .fab-specs { display: inline-flex; }
    .specs-overlay { display: block; }
    .specs-drawer { display: block; }
  }
  </style>
