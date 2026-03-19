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

    

    <div class="content-2col">
      <aside class="col-left">
        <div class="filters-panel">
          <div class="panel-subtitle">
            <img src="@/assets/images/shaixuan.svg" alt="分类" class="subtitle-icon" />
            <span>分类</span>
          </div>
          <div class="panel-buttons">
            <button
              v-for="cat in categories"
              :key="cat"
              class="filter-btn"
              :class="{ active: activeCategory === cat }"
              @click="setCategory(cat)"
            >{{ cat }}</button>
          </div>
        </div>
      </aside>
      <div class="col-right">
        <div class="record-list">
          <div
            class="record-item clickable"
            v-for="art in filteredItems"
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
    </div>
  </div>
</template>

<script>
import carBasics from '@/data/car/carBasics.js'

export default {
  name: 'CarBasics',
  data() {
    return {
      items: carBasics,
      activeCategory: '全部'
    }
  },
  computed: {
    categories() {
      const set = new Set((this.items || []).map(i => i.category).filter(Boolean))
      return ['全部', ...Array.from(set)]
    },
    filteredItems() {
      if (this.activeCategory === '全部') return this.items
      return (this.items || []).filter(i => i.category === this.activeCategory)
    }
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
    setCategory(cat) {
      this.activeCategory = cat
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
  width: 1200px;
  min-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
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

.content-2col { display: flex; gap: 16px; align-items: flex-start; }
.col-left { width: 20%; }
.col-right { width: 80%; }
.filters-panel {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: transparent;
  border-radius: 8px;
  padding: 0 12px;
}
.panel-subtitle {
  font-size: 16px;
  font-weight: 500;
  color: #ffffff;
  letter-spacing: 1px;
  line-height: 1;
  padding-bottom: 0;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.subtitle-icon {
  width: 1em;
  height: 1em;
  display: block;
}
.panel-buttons { display: flex; flex-direction: column; gap: 8px; }
.filter-btn {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  min-height: 38px;
  padding: 10px 12px;
  border-radius: 6px;
  border: none;
  background: rgba(102,192,244,0.08);
  color: #c7d5e0;
  font-size: 15px;
  cursor: pointer;
  text-align: left;
  box-sizing: border-box;
  transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
}
.filter-btn.active { background: rgba(102,192,244,0.42); color: #ffffff; box-shadow: inset 0 0 0 1px rgba(102,192,244,0.85); }
.record-list { display: flex; flex-direction: column; gap: 8px; }
.record-item {
  display: flex;
  background: rgba(0, 0, 0, 0.2);
  padding: 15px;
  border: 1px solid transparent;
  border-radius: 10px;
  transition: background 0.2s, border-color 0.2s, box-shadow 0.2s;
}
.record-item:hover { 
  background: rgba(255,255,255,0.08);
  border-color: rgba(255,255,255,0.16);
  box-shadow: 0 8px 20px rgba(0,0,0,0.35);
}
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
  .record-list { padding: 0; }
  .section-header { padding: 0; }
  .content-2col { flex-direction: column; }
  .col-left, .col-right { width: 100%; }
}
</style>
