<template>
  <div id="app">
    <NavBar />
    <div class="content-wrapper">
      <main class="main-content">
        <transition name="fade" mode="out-in">
          <router-view />
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
:root {
  /* Core Dark Mode (Default) */
  --c-primary: #58a6ff;
  --c-primary-alpha-10: rgba(88, 166, 255, 0.10);
  --c-primary-alpha-20: rgba(88, 166, 255, 0.20);
  --c-primary-alpha-30: rgba(88, 166, 255, 0.30);
  --c-primary-alpha-40: rgba(88, 166, 255, 0.40);
  --c-primary-alpha-50: rgba(88, 166, 255, 0.50);
  --c-primary-alpha-60: rgba(88, 166, 255, 0.60);
  --c-primary-alpha-80: rgba(88, 166, 255, 0.80);
  
  /* Background Levels */
  --c-bg-l0: #131314;
  --c-bg-l1: #131314;
  --c-bg-l2: #161b22;
  --c-bg-l3: #1f2937;
  --c-bg-l4: #243244;
  --c-bg-panel-deep: #0f1623;
  --c-bg-input: #111827;
  
  /* Text */
  --c-text-title: #e6edf3;
  --c-text-emphasis: #c9d1d9;
  --c-text-body: #adbac7;
  --c-text-body-alt: #9da7b3;
  --c-text-muted: #8b949e;
  --c-text-label: #7d8590;
  --c-text-nav: #adbac7;
  
  /* Border */
  --c-border-default: #2d333b;
  --c-border-hover: #30363d;
  --c-border-strong: #388bfd;
  
  /* Shadow Overlay */
  --c-shadow-light: rgba(1, 4, 9, 0.20);
  --c-shadow-medium: rgba(1, 4, 9, 0.45);
  --c-shadow-heavy: rgba(1, 4, 9, 0.65);
  
  /* Navbar */
  --c-nav-bg: rgba(13, 17, 23, 0.9);
  --c-nav-mask: rgba(1, 4, 9, 0.45);
  
  --title-font: 'MotivaTitle', "Motiva Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  --bp-mobile-max: 480px;
}

[data-theme="light"] {
  /* Light Mode - Steam Inspired but bright */
  --c-primary: #58a6ff;
  --c-primary-alpha-10: rgba(88, 166, 255, 0.10);
  --c-primary-alpha-20: rgba(88, 166, 255, 0.20);
  --c-primary-alpha-30: rgba(88, 166, 255, 0.30);
  --c-primary-alpha-40: rgba(88, 166, 255, 0.40);
  --c-primary-alpha-50: rgba(88, 166, 255, 0.50);
  --c-primary-alpha-60: rgba(88, 166, 255, 0.60);
  --c-primary-alpha-80: rgba(88, 166, 255, 0.80);
  
  --c-bg-l0: #131314;
  --c-bg-l1: #131314;
  --c-bg-l2: #161b22;
  --c-bg-l3: #1f2937;
  --c-bg-l4: #243244;
  --c-bg-panel-deep: #0f1623;
  --c-bg-input: #111827;
  
  --c-text-title: #e6edf3;
  --c-text-emphasis: #c9d1d9;
  --c-text-body: #adbac7;
  --c-text-body-alt: #9da7b3;
  --c-text-muted: #8b949e;
  --c-text-label: #7d8590;
  --c-text-nav: #adbac7;
  
  --c-border-default: #2d333b;
  --c-border-hover: #30363d;
  --c-border-strong: #388bfd;
  
  --c-shadow-light: rgba(1, 4, 9, 0.20);
  --c-shadow-medium: rgba(1, 4, 9, 0.45);
  --c-shadow-heavy: rgba(1, 4, 9, 0.65);
  
  --c-nav-bg: rgba(13, 17, 23, 0.9);
  --c-nav-mask: rgba(1, 4, 9, 0.45);
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
