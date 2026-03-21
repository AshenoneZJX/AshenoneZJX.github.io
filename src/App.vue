<template>
  <div id="app">
    <NavBar />
    <div class="content-wrapper">
      <main class="main-content">
        <transition name="fade" mode="out-in">
          <router-view />
        </transition>
        <div v-if="$route.name === 'CarDetail'" class="detail-pager-global">
          <button class="nav-icon" :disabled="!hasPrev" @click="goPrev" aria-label="上一辆">‹</button>
          <button class="nav-icon" :disabled="!hasNext" @click="goNext" aria-label="下一辆">›</button>
        </div>
      </main>
      <Footer />
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/Shared/NavBar.vue'
import Footer from '@/components/Shared/Footer.vue'
import cars from '@/data/car/cars.json'

export default {
  name: 'App',
  components: {
    NavBar,
    Footer
  },
  computed: {
    isCarDetail() {
      return this.$route && this.$route.name === 'CarDetail'
    },
    sortedCars() {
      if (!this.isCarDetail) return []
      return [...cars].sort((a, b) => Number(a.id) - Number(b.id))
    },
    currentIndex() {
      if (!this.isCarDetail) return -1
      const id = Number(this.$route.params.id)
      return this.sortedCars.findIndex(c => Number(c.id) === id)
    },
    prevId() {
      const i = this.currentIndex
      if (i > 0) return this.sortedCars[i - 1].id
      return null
    },
    nextId() {
      const i = this.currentIndex
      if (i >= 0 && i < this.sortedCars.length - 1) return this.sortedCars[i + 1].id
      return null
    },
    hasPrev() { return this.prevId !== null },
    hasNext() { return this.nextId !== null }
  },
  methods: {
    goPrev() {
      if (this.hasPrev) this.$router.push({ name: 'CarDetail', params: { id: this.prevId } })
    },
    goNext() {
      if (this.hasNext) this.$router.push({ name: 'CarDetail', params: { id: this.nextId } })
    }
  }
}
</script>

<style>
:root {
  /* Core Dark Mode (Default) */
  --c-primary: #66c0f4;
  --c-primary-alpha-10: rgba(102, 192, 244, 0.10);
  --c-primary-alpha-20: rgba(102, 192, 244, 0.20);
  --c-primary-alpha-30: rgba(102, 192, 244, 0.30);
  --c-primary-alpha-40: rgba(102, 192, 244, 0.40);
  --c-primary-alpha-50: rgba(102, 192, 244, 0.50);
  --c-primary-alpha-60: rgba(102, 192, 244, 0.60);
  --c-primary-alpha-80: rgba(102, 192, 244, 0.80);
  
  /* Background Levels */
  --c-bg-l0: #171a21;
  --c-bg-l1: #1b2838;
  --c-bg-l2: #16202d;
  --c-bg-l3: #222e3b;
  --c-bg-l4: #223447;
  --c-bg-panel-deep: var(--c-bg-panel-deep);
  --c-bg-input: var(--c-bg-input);
  
  /* Text */
  --c-text-title: #ffffff;
  --c-text-emphasis: #e6f3ff;
  --c-text-body: #c6d4df;
  --c-text-body-alt: #c7d5e0;
  --c-text-muted: #8f98a0;
  --c-text-label: #8a9aa8;
  --c-text-nav: #b8b6b4;
  
  /* Border */
  --c-border-default: #38424e;
  --c-border-hover: #3c4551;
  --c-border-strong: #2a475e;
  
  /* Shadow Overlay */
  --c-shadow-light: rgba(0, 0, 0, 0.20);
  --c-shadow-medium: rgba(0, 0, 0, 0.40);
  --c-shadow-heavy: rgba(0, 0, 0, 0.60);
  
  /* Navbar */
  --c-nav-bg: rgba(23, 26, 33, 0.9);
  --c-nav-mask: rgba(0, 0, 0, 0.4);
  
  --title-font: 'MotivaTitle', "Motiva Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
}

[data-theme="light"] {
  /* Light Mode - Steam Inspired but bright */
  --c-primary: #1999ff; /* Brighter blue for visibility */
  --c-primary-alpha-10: rgba(25, 153, 255, 0.10);
  --c-primary-alpha-20: rgba(25, 153, 255, 0.20);
  --c-primary-alpha-30: rgba(25, 153, 255, 0.30);
  --c-primary-alpha-40: rgba(25, 153, 255, 0.40);
  --c-primary-alpha-50: rgba(25, 153, 255, 0.50);
  --c-primary-alpha-60: rgba(25, 153, 255, 0.60);
  --c-primary-alpha-80: rgba(25, 153, 255, 0.80);
  
  --c-bg-l0: #e4e9f0; /* Darker than l1, like footer */
  --c-bg-l1: #f2f5f7; /* Main body */
  --c-bg-l2: #ffffff; /* Card / Panel */
  --c-bg-l3: #f8f9fa; /* Elevated */
  --c-bg-l4: #e1e7ed; /* TableHead */
  --c-bg-panel-deep: #f2f5f7;
  --c-bg-input: #ffffff;
  
  --c-text-title: #171a21;
  --c-text-emphasis: #0078d7;
  --c-text-body: #38424e;
  --c-text-body-alt: #465463;
  --c-text-muted: #7a8b99;
  --c-text-label: #5c6b7a;
  --c-text-nav: #38424e;
  
  --c-border-default: #d0d7de;
  --c-border-hover: #b8c2cc;
  --c-border-strong: #a0abb6;
  
  --c-shadow-light: rgba(0, 0, 0, 0.05);
  --c-shadow-medium: rgba(0, 0, 0, 0.10);
  --c-shadow-heavy: rgba(0, 0, 0, 0.20);
  
  --c-nav-bg: rgba(242, 245, 247, 0.9);
  --c-nav-mask: rgba(255, 255, 255, 0.6);
}

@font-face { font-family: 'MotivaTitle'; font-style: normal; font-weight: 400; font-display: swap; src: url('./assets/fonts/MotivaSans-Regular_woff.ttf') format('truetype'); }
h2 { color: var(--c-text-title); font-weight: 300; letter-spacing: 2px; }
h1, h2, h3, .logo, .section-header h2, .panel-header { font-family: var(--title-font); }
/* --- 全局样式重置 --- */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
}

body {
  font-family: "Motiva Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  background-color: var(--c-bg-l1); /* Steam 主背景色 */
  color: var(--c-text-body); /* Steam 默认字色 */
  overscroll-behavior-y: none; /* 阻止向上回弹出现空白 */
  transition: background-color 0.3s ease, color 0.3s ease;
}

button {
  white-space: nowrap;
  flex-shrink: 0;
}

/* 页面通用容器，用于限制宽度 */
.container {
  width: 100%;
  max-width: 96%;
  margin: 0 auto;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1 0 auto;
  padding-top: 80px; /* 为固定导航栏留出空间，紧贴导航栏底部 */
}

.detail-pager-global {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
}
.detail-pager-global .nav-icon {
  background: var(--c-primary-alpha-10);
  border: none;
  color: var(--c-text-body-alt);
  padding: 0;
  width: 80px;
  height: 32px;
  min-width: unset;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  font-size: 24px;
  line-height: 1;
}
.detail-pager-global .nav-icon:hover { color: var(--c-text-emphasis); background: var(--c-primary-alpha-20); }
.detail-pager-global .nav-icon[disabled] { opacity: 0.6; cursor: default; pointer-events: none; background: var(--c-primary-alpha-10); }

@media (max-width: 768px) {
  .detail-pager-global {
    display: none;
  }
}

/* 页面切换动画 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
