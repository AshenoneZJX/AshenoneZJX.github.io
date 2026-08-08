<template>
  <div id="app">
    <NavBar />
    <div class="content-wrapper">
      <main class="main-content">
        <transition name="fade" mode="out-in">
          <keep-alive include="Cars">
            <router-view />
          </keep-alive>
        </transition>
      </main>
      <Footer />
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/Shared/NavBar.vue'
import Footer from '@/components/Shared/Footer.vue'

export default {
  name: 'App',
  components: {
    NavBar,
    Footer
  }
}
</script>

<style>
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
  font-family: var(--body-font);
  -webkit-font-smoothing: antialiased;
  background-color: var(--c-bg-l1); /* Steam 主背景色 */
  color: var(--c-text-body); /* Steam 默认字色 */
  overscroll-behavior-y: none; /* 阻止向上回弹出现空白 */
  transition: background-color 0.3s ease, color 0.3s ease;
}

div.divider {
  height: 1px !important;
  background-color: var(--c-border-default) !important;
  border: 0 !important;
}

button {
  white-space: nowrap;
  flex-shrink: 0;
}

.back-btn {
  background: transparent !important;
  border: 1px solid var(--c-border-default);
  color: var(--c-text-body-alt);
  padding: 6px 12px;
  cursor: pointer;
  border-radius: 6px;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
  text-decoration: none;
}

.back-icon {
  width: 16px;
  height: 16px;
  display: block;
}

.back-btn:hover {
  background: var(--c-primary-alpha-10) !important;
  color: var(--c-text-emphasis) !important;
  border-color: var(--c-border-hover) !important;
}

.back-btn:active,
.back-btn.router-link-active {
  background: transparent !important;
  border-color: var(--c-primary) !important;
  color: var(--c-text-title) !important;
}

.is-mobile .back-btn {
  width: 32px;
  height: 32px;
  padding: 0;
  border-radius: 50%;
  justify-content: center;
  gap: 0;
}
.is-mobile .back-btn .back-text {
  display: none;
}

@media (max-width: 480px) {
  .back-btn {
    width: 32px;
    height: 32px;
    padding: 0;
    border-radius: 50%;
    justify-content: center;
    gap: 0;
  }
  .back-btn .back-text {
    display: none;
  }
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
  background: var(--c-bg-l0);
}

.main-content {
  flex: 1 0 auto;
  padding-top: 80px; /* 为固定导航栏留出空间，紧贴导航栏底部 */
}

/* 页面切换动画 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
