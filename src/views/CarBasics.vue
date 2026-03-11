<template>
  <div class="page-car-basics container">
    <div class="section-header">
      <h2>汽车基础知识</h2>
      <button class="back-btn" @click="$router.push('/mySpace/cars-home')">
        <img src="@/assets/images/fanhui.svg" class="back-icon" alt="返回" />
        返回汽车主页
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
import carBasics from '@/data/carBasics'

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
.section-header h2 { color: #fff; font-weight: 700; letter-spacing: 2px; }
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
.record-content { flex: 1; }
.record-title { color: #66c0f4; font-size: 20px; font-weight: 600; margin-bottom: 4px; }
.record-excerpt { font-size: 13px; color: #8f98a0; }
</style>
