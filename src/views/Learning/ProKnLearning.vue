<template>
  <div class="page-professional">
    <div class="section-header">
      <h2>专业知识</h2>
      <button class="back-btn" @click="$router.push('/learning')">
        <img src="@/assets/images/fanhui.svg" class="back-icon" alt="返回" />
        <span class="back-text">返回总览</span>
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
import professionalKnowledge from '@/data/learning/professionalKnowledge.js'

export default {
  name: 'ProKnLearning',
  data() {
    return {
      items: professionalKnowledge,
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
      this.$router.push({ name: 'ProKnDetail', params: { id: art.id } })
    },
    setCategory(cat) {
      this.activeCategory = cat
    }
  }
}
</script>

<style scoped>
.back-btn {
  background: transparent;
  border: 1px solid var(--c-border-strong);
  color: var(--c-text-body-alt);
  padding: 6px 12px;
  cursor: pointer;
  border-radius: 6px;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-left: auto; /* Ensure right alignment in flex container */
  transition: all 0.2s ease;
  text-decoration: none;
}
.back-icon {
  width: 16px;
  height: 16px;
  display: block;
}
.back-btn:hover {
  color: var(--c-text-emphasis);
  background: var(--c-primary-alpha-10);
  border-color: var(--c-border-hover);
}
.back-btn:active, .back-btn.router-link-active {
  background: var(--c-bg-l1);
  border-color: var(--c-primary);
  color: var(--c-text-title);
}

.page-professional {
  padding: 20px 16px 0;
  width: 1200px;
  min-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
}
.section-header { display: flex; justify-content: space-between; align-items: center; }
.section-header h2 { color: var(--c-text-title); font-weight: 400; letter-spacing: 2px; }
.divider { height: 2px; background: var(--c-border-strong); margin: 10px 0 20px 0; }

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
  color: var(--c-text-title);
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
  background: var(--c-primary-alpha-10);
  color: var(--c-text-body);
  font-size: 15px;
  cursor: pointer;
  text-align: left;
  box-sizing: border-box;
  transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
}
.filter-btn.active { background: var(--c-primary-alpha-40); color: var(--c-text-title); box-shadow: inset 0 0 0 1px var(--c-primary-alpha-80); }
.record-list { display: flex; flex-direction: column; gap: 8px; }
.record-item {
  display: flex;
  background: var(--c-bg-l2);
  padding: 15px;
  border: 1px solid var(--c-border-default);
  border-radius: 10px;
  transition: background 0.2s, border-color 0.2s, box-shadow 0.2s;
}
.record-item:hover {
  background: var(--c-primary-alpha-10);
  border-color: var(--c-primary);
  box-shadow: 0 8px 20px var(--c-shadow-medium);
}
.record-item.clickable { cursor: pointer; }
.record-content { flex: 1; }
.record-title { color: var(--c-primary); font-size: 20px; font-weight: 400; margin-bottom: 4px; }
.record-excerpt { font-size: 13px; color: var(--c-text-muted); }

@media (max-width: 768px) {
  .back-text { display: none; }
  
  .record-list { padding: 0; }
  .section-header { padding: 0; }
  .content-2col { flex-direction: column; gap: 16px; }
  .col-left, .col-right { width: 100%; }
}

@media (max-width: 768px) {
}




@media (max-width: 768px) {
  
}
</style>
