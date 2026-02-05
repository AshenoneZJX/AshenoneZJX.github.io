<template>
  <div class="page-brand-detail">
    <div class="section-header">
      <h2>{{ brandName }} 品牌</h2>
      <router-link class="back-link" to="/mySpace/brands">返回品牌列表</router-link>
    </div>
    <div class="divider"></div>

    <div class="models-grid">
      <div
        v-for="c in brandModels"
        :key="c.id"
        class="model-card"
        @click="$router.push({ name: 'CarDetail', params: { id: c.id } })"
      >
        <img :src="c.img" alt="" class="model-img"/>
        <div class="model-title">{{ c.title }}</div>
        <div class="model-meta">{{ c.body }} · {{ Array.isArray(c.energy) ? c.energy.join('/') : c.energy }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import cars from '../data/cars.json'

function getBrand (title) {
  if (!title) return '未知'
  const parts = String(title).split(' ')
  return parts[0]
}

export default {
  name: 'BrandDetail',
  computed: {
    brandName () {
      return this.$route.params.name
    },
    brandModels () {
      return cars.filter(c => getBrand(c.title) === this.brandName)
    }
  }
}
</script>

<style scoped>
.page-brand-detail { padding-top: 20px; }
.section-header { display: flex; justify-content: space-between; align-items: center; }
.section-header h2 { color: #fff; font-weight: 300; letter-spacing: 2px; }
.divider { height: 2px; background: #2a475e; margin: 10px 0 10px 0; }
.back-link { color: #66c0f4; text-decoration: none; display: inline-block; margin-bottom: 20px; }

.models-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
}
.model-card {
  background: #16202d;
  padding: 12px;
  border-radius: 6px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.4);
  cursor: pointer;
  transition: transform 0.2s;
}
.model-card:hover { transform: translateY(-4px); }
.model-img { width: 100%; height: 140px; object-fit: cover; border-radius: 4px; }
.model-title { color: #fff; font-weight: 600; margin-top: 8px; }
.model-meta { color: #9cc9f5; font-size: 12px; margin-top: 2px; }
</style>
