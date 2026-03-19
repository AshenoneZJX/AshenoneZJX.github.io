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
@font-face { font-family: 'MotivaTitle'; font-style: normal; font-weight: 400; font-display: swap; src: url('./assets/fonts/MotivaSans-Regular_woff.ttf') format('truetype'); }
h2 { color: #fff; font-weight: 300; letter-spacing: 2px; }
:root { --title-font: 'MotivaTitle', "Motiva Sans", "Helvetica Neue", Helvetica, Arial, sans-serif; }
h1, h2, h3, .logo, .section-header h2, .panel-header { font-family: var(--title-font); }
/* --- 全局样式重置 --- */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Motiva Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  background-color: #1b2838; /* Steam 主背景色 */
  color: #c6d4df; /* Steam 默认字色 */
  overscroll-behavior-y: none; /* 阻止向上回弹出现空白 */
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
  background: rgba(102,192,244,0.12);
  border: none;
  color: #c7d5e0;
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
.detail-pager-global .nav-icon:hover { color: #e6f3ff; background: rgba(102,192,244,0.22); }
.detail-pager-global .nav-icon[disabled] { opacity: 0.6; cursor: default; pointer-events: none; background: rgba(102,192,244,0.06); }

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
