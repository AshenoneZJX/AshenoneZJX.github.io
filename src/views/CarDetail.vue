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
      <div class="meta">
        <span class="tag tag-energy">{{ car.energy }}</span>
        <span class="tag tag-body">{{ car.body }}</span>
      </div>
      <div class="content">
        <p>{{ car.desc }}</p>
      </div>
    </div>

    <div v-else class="not-found">
      <p>抱歉，没有找到该车型。</p>
    </div>
  </div>
  </template>

  <script>
  import cars from '@/data/cars'
  export default {
    name: 'CarDetail',
    data() {
      return {
        car: null
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

  .hero {
    height: 240px;
    background-size: cover;
    background-position: center;
    position: relative;
    border: 1px solid #38424e;
    box-shadow: 0 4px 15px rgba(0,0,0,0.4);
  }
  .hero-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0.25);
  }

  .meta {
    display: flex;
    gap: 8px;
    margin: 12px 0 16px;
  }
  .tag { display: inline-block; padding: 4px 8px; font-size: 12px; border-radius: 3px; font-weight: 600; }
  .tag-energy { background: #66c0f4; color: #0b1c2d; }
  .tag-body { background: #344658; color: #f7e38f; }

  .content p { color: #c7d5e0; line-height: 1.8; }

  .not-found { color: #8f98a0; }
  </style>
