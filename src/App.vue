<template>
  <div id="app">
    <NavBar />
    <main class="main-content">
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </main>
    
    <footer class="steam-footer">
      © 2025 AshenOne's Blog. Powered by Vue 2.
    </footer>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'

export default {
  name: 'App',
  components: {
    NavBar
  }
}
</script>

<style>
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
}

/* 页面通用容器，用于限制宽度 */
.container {
  width: 940px;
  max-width: 96%;
  margin: 0 auto;
}

.main-content {
  min-height: 80vh;
  padding-top: 104px; /* 为固定导航栏留出空间 */
}

.steam-footer {
  margin-top: 50px;
  padding: 40px 0;
  background: #171a21;
  text-align: center;
  color: #8f98a0;
  font-size: 12px;
  border-top: 1px solid #2e353f;
}

/* 页面切换动画 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>