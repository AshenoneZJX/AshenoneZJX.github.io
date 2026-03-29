<template>
  <div class="page-car-basics container">
    <div class="section-header">
      <div class="header-left">
        <button class="mobile-filter-btn" @click="toggleMobileFilter" v-if="isMobile">
          <img src="@/assets/images/shaixuan.svg" alt="分类" class="filter-icon" />
        </button>
        <h2>汽车基础知识</h2>
      </div>
      <button class="back-btn" @click="$router.push('/mySpace/cars-home')">
        <img src="@/assets/images/fanhui.svg" class="back-icon" alt="返回" />
        <span class="back-text">返回汽车主页</span>
      </button>
    </div>
    <div class="divider"></div>

    

    <div class="content-2col">
      <!-- 移动端遮罩层 -->
      <div 
        class="mobile-filter-overlay" 
        v-show="isMobile && isMobileFilterOpen" 
        @click="closeMobileFilter"
      ></div>

      <aside class="col-left" :class="{ 'is-open': isMobileFilterOpen }">
        <div class="filters-panel">
          <div class="panel-subtitle">
            <img src="@/assets/images/shaixuan.svg" alt="分类" class="subtitle-icon" />
            <span>分类</span>
            <button class="close-filter-btn" @click="closeMobileFilter" v-if="isMobile">✕</button>
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
      activeCategory: '全部',
      isMobileFilterOpen: false,
      isMobile: false
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
    checkMobile() {
      this.isMobile = window.innerWidth <= 768
      if (!this.isMobile) {
        this.isMobileFilterOpen = false
      }
    },
    toggleMobileFilter() {
      this.isMobileFilterOpen = !this.isMobileFilterOpen
    },
    closeMobileFilter() {
      this.isMobileFilterOpen = false
    },
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
        const logoMap = {
          '世界汽车工业发展史': '世界汽车工业史.png',
          '动力与传动系统详解': '动力与传动.png',
          '汽车底盘与悬架系统详解': '底盘与悬架.png',
          '汽车能源类型全解析：燃油｜混动｜纯电': '能源类型.png',
          '车身与尺寸': '车身与尺寸.png',
          '车身与尺寸详解': '车身与尺寸.png'
        }
        const fileName = logoMap[title]
        if (fileName) {
          return require(`@/assets/images/carbasicLOGO/${fileName}`)
        }
        return ''
      } catch (e) {
        return ''
      }
    }
  },
  mounted() {
    this.checkMobile()
    window.addEventListener('resize', this.checkMobile)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkMobile)
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

.page-car-basics {
  width: 100%;
  max-width: 1200px;
  
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
}
.section-header { display: flex; justify-content: space-between; align-items: center; }
.section-header h2 { color: var(--c-text-title); font-weight: 400; letter-spacing: 2px; margin: 0; }
.header-left { display: flex; align-items: center; gap: 10px; }

.mobile-filter-btn {
  display: none;
}
@media (max-width: 768px) {
  .mobile-filter-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: 1px solid var(--c-border-strong);
    color: var(--c-primary);
    padding: 0;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    cursor: pointer;
  }
}
.filter-icon { width: 18px; height: 18px; }

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
.panel-buttons {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.filter-btn {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  min-height: 38px;
  padding: 10px 12px;
  border-radius: 6px;
  border: none;
  background: transparent;
  color: var(--c-text-body-alt);
  font-size: 15px;
  cursor: pointer;
  text-align: left;
  box-sizing: border-box;
  transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
}
.filter-btn:hover { background: rgba(154, 160, 166, 0.16); color: #d3d7dd; }
.filter-btn.active { background: rgba(154, 160, 166, 0.28); color: #e1e4e8; }
.record-list { display: flex; flex-direction: column; gap: 8px; }
.record-item {
  display: flex;
  background: #16191C;
  padding: 15px;
  border: 1px solid var(--c-border-default);
  border-radius: 8px;
  transition: background 0.2s, border-color 0.2s, box-shadow 0.2s, transform 0.2s;
  align-items: center;
}
.record-item:hover { 
  background: #1D2126;
  border-color: var(--c-border-default);
  box-shadow: 0 8px 20px var(--c-shadow-medium);
  transform: scale(1.02);
}
.record-item:active { transform: scale(1); }
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
.record-title { color: var(--c-primary); font-size: 20px; font-weight: 400; margin-bottom: 4px; }
.record-excerpt { font-size: 13px; color: var(--c-text-muted); }

.close-filter-btn { display: none; }

@media (max-width: 768px) {
  .page-car-basics { padding: 16px; }
  .back-btn {
    width: 32px;
    height: 32px;
    padding: 0;
    border-radius: 50%;
    justify-content: center;
    background: transparent;
  }
  .back-btn .back-text { display: none; }
  .back-btn:hover,
  .back-btn:active,
  .back-btn.router-link-active {
    background: transparent;
  }
  .record-list { padding: 0; }
  .section-header { padding: 0; margin-bottom: 15px; }
  .content-2col { flex-direction: column; position: relative; }
  
  .col-left { 
    position: fixed;
    top: 0;
    left: -280px;
    width: 260px;
    height: 100vh;
    background: var(--c-bg-l2);
    z-index: 9999;
    padding: 20px;
    box-shadow: 2px 0 15px rgba(0,0,0,0.5);
    transition: left 0.3s ease;
    overflow-y: auto;
  }
  .col-left.is-open {
    left: 0;
  }
  .filters-panel { padding: 0; }
  .panel-subtitle {
    justify-content: space-between;
    width: 100%;
    margin-bottom: 20px;
  }
  .close-filter-btn {
    display: block;
    background: transparent;
    border: none;
    color: var(--c-text-muted);
    font-size: 20px;
    cursor: pointer;
    padding: 0 5px;
  }
  
  .mobile-filter-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(2px);
    z-index: 9998;
  }

  .col-right { width: 100%; }
}




@media (max-width: 768px) {
  
}
</style>
