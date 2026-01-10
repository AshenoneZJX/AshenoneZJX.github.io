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
            <span class="tag tag-energy" v-for="e in energyList" :key="e">{{ e }}</span>
            <span class="tag tag-body">{{ car.body }}</span>
          </div>
          <p class="overlay-intro">{{ introText }}</p>
        </div>
        <div class="right-col">
          <div class="specs specs-box">
            <div class="spec-grid">
              <div class="spec-group">
                <div class="group-label">车身</div>
                <div class="group-list">
                  <div class="spec-row">
                    <span class="row-label">长宽高</span>
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
                </div>
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
        car: null
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
    created() {
      const id = Number(this.$route.params.id)
      this.car = cars.find(c => Number(c.id) === id) || null
    }
  }
  </script>

  <style scoped>
  .page-car-detail { padding-top: 20px; }
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    border-bottom: 1px solid #38424e;
    padding-bottom: 10px;
    margin-bottom: 20px;
  }
  .actions .back-btn { background: #2a475e; border: 1px solid #3c4551; color: #c7d5e0; padding: 6px 12px; cursor: pointer; text-decoration: none; display: inline-block; }
  .actions .back-btn:hover { color: #fff; border-color: #66c0f4; }


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

  .meta-inline { display: flex; gap: 8px; margin-bottom: 8px; }
  .tag { display: inline-block; padding: 4px 8px; font-size: 12px; border-radius: 3px; font-weight: 600; }
  .tag-energy { background: #66c0f4; color: #0b1c2d; }
  .tag-body { background: #344658; color: #f7e38f; }

  .overlay-intro { color: #c7d5e0; line-height: 1.8; }
  .specs { border-top: none; padding-top: 0; }
  .specs-box { background: rgba(27,40,56,0.75); border: 1px solid #3c4551; backdrop-filter: blur(3px); -webkit-backdrop-filter: blur(3px); border-radius: 6px; padding: 12px; }
  .spec-grid { display: grid; grid-template-columns: 1fr; gap: 8px; }
  .spec-group { display: grid; grid-template-columns: 50px 1fr; gap: 8px; align-items: start; }
  .group-label { color: #8f98a0; font-size: 14px; font-weight: 400; margin: 0; text-align: left; align-self: center; }
  .group-list { display: grid; grid-template-columns: 1fr; gap: 2px; }
  .spec-row { display: grid; grid-template-columns: 50px 1fr; align-items: baseline; }
  .row-label { color: #8f98a0; font-size: 14px; text-align: left; }
  .row-value { color: #e6f3ff; font-size: 14px; text-align: right; }

  .not-found { color: #8f98a0; }

  @media (max-width: 768px) {
    .hero { height: 280px; }
    .detail-content { margin-top: -70px; }
    .specs-box { padding: 10px; }
    .spec-item { font-size: 13px; }
    .spec-item .label, .spec-item .value { font-size: 13px; }
  }
  </style>
