<template>
  <div class="page-car-basics container">
    <div class="section-header">
      <h2>汽车基础知识</h2>
      <button class="back-btn" @click="$router.push('/mySpace/cars-home')">
        <img src="@/assets/images/fanhui.svg" class="back-icon" alt="返回" />
        <span class="back-text">返回汽车主页</span>
      </button>
    </div>
    <div class="divider"></div>

    

    <div class="record-list">
      <div
        class="record-item clickable"
        v-for="art in items"
        :key="art.id"
        @click="goDetail(art)"
      >
        <div class="record-logo" v-if="getLogo(art.title)">
          <img :src="getLogo(art.title)" :alt="art.title" />
        </div>
        <div class="record-content">
          <div class="record-title">{{ art.title }}</div>
          <div class="record-excerpt">
            {{ art.excerpt || toExcerpt(art.content) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import carBasics from '@/data/car/carBasics.js'

export default {
  name: 'CarBasics',
  data() {
    return {
      items: carBasics
    }
  },
  computed: {
  },
  methods: {
    toExcerpt(text) {
      if (!text) return ''
      const t = String(text).replace(/\n/g, ' ')
      return t.length > 120 ? t.slice(0, 120) + '…' : t
    },
    goDetail(art) {
      this.$router.push({ name: 'CarBasicsDetail', params: { id: art.id } })
    },
    getLogo(title) {
      try {
        return require(`@/assets/images/carbasicLOGO/${title}.png`)
      } catch (e) {
        return ''
      }
    }
  }
}
</script>

<style scoped>
.page-car-basics {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding-top: 20px;
}
.section-header { display: flex; justify-content: space-between; align-items: center; }
.section-header h2 { color: #fff; font-weight: 400; letter-spacing: 2px; }
.divider { height: 2px; background: #2a475e; margin: 10px 0 20px 0; }
.back-btn { background: transparent; border: 1px solid #3c4551; color: #c7d5e0; padding: 6px 12px; cursor: pointer; border-radius: 6px; font-size: 14px; display: inline-flex; align-items: center; gap: 6px; }
.back-icon {
  width: 16px;
  height: 16px;
  display: block;
}
.back-btn:hover { color: #e6f3ff; background: rgba(102,192,244,0.12); }
.back-btn:active, .back-btn.router-link-active { background: rgba(102,192,244,0.22); color: #ffffff; }

 

.record-list { display: flex; flex-direction: column; gap: 8px; }
.record-item {
  display: flex;
  background: rgba(0, 0, 0, 0.2);
  padding: 15px;
  transition: background 0.2s;
}
.record-item:hover { background: #222b35; }
.record-item.clickable { cursor: pointer; }
.record-logo {
  width: 60px;
  height: 60px;
  margin-right: 15px;
  padding: 5px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.record-logo img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
.record-content { flex: 1; }
.record-title { color: #66c0f4; font-size: 20px; font-weight: 400; margin-bottom: 4px; }
.record-excerpt { font-size: 13px; color: #8f98a0; }

@media (max-width: 768px) {
  .back-text { display: none; }
  .back-btn { padding: 6px; }
  .record-list { padding: 0 10px; }
  .section-header { padding: 0 10px; }
}
</style>
