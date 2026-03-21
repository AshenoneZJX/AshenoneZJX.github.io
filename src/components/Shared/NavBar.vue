<template>
  <div>
    <nav class="steam-navbar" :class="{ compact: isCompact }">
      <div class="nav-container">
        <div class="logo" @click="goHome">
          ASHENONE's Blog
        </div>
        <button
          class="menu-toggle"
          @click="toggleMenu"
          aria-label="打开导航"
          :aria-expanded="isOpen"
          aria-controls="navbar-mobile-menu"
        >
          <svg class="menu-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="currentColor"
              d="M4 6.5a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1Zm0 5.5a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1Zm1 4.5a1 1 0 0 0 0 2h14a1 1 0 1 0 0-2H5Z"
            />
          </svg>
        </button>
        <div class="nav-right">
          <div class="nav-links">
            <router-link to="/" exact tag="button">主页</router-link>
            <router-link to="/mySpace" tag="button">个人空间</router-link>
            <router-link to="/records" tag="button">记录</router-link>
            <router-link to="/learning" tag="button">Learning</router-link>
          </div>
          <button class="theme-toggle" @click="toggleTheme" :title="isLightMode ? '切换到暗色模式' : '切换到浅色模式'">
            <svg v-if="!isLightMode" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="theme-icon"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
            <svg v-else viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="theme-icon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
          </button>
        </div>
      </div>
    </nav>
    <div
      id="navbar-mobile-menu"
      class="mobile-menu"
      :class="{ active: isOpen, compact: isCompact }"
      @click.stop
    >
      <router-link @click.native="closeMenu" to="/" exact tag="button">主页</router-link>
      <router-link @click.native="closeMenu" to="/mySpace" tag="button">个人空间</router-link>
      <router-link @click.native="closeMenu" to="/records" tag="button">记录</router-link>
      <router-link @click.native="closeMenu" to="/learning" tag="button">Learning</router-link>
      <button @click="toggleTheme" class="mobile-theme-toggle">
        {{ isLightMode ? '切换到暗色模式' : '切换到浅色模式' }}
      </button>
    </div>
    <div v-if="isOpen" class="menu-mask" :class="{ compact: isCompact }" @click="closeMenu"></div>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      isOpen: false,
      isCompact: false,
      isLightMode: false
    }
  },
  watch: {
    $route() {
      this.isOpen = false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll, { passive: true })
    this.onScroll()
    
    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      this.isLightMode = savedTheme === 'light'
    } else {
      this.isLightMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches
    }
    this.applyTheme()
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    onScroll() {
      this.isCompact = window.scrollY > 10
    },
    toggleMenu() {
      this.isOpen = !this.isOpen
    },
    closeMenu() {
      this.isOpen = false
    },
    goHome() {
      this.isOpen = false
      this.$router.push('/')
    },
    toggleTheme() {
      this.isLightMode = !this.isLightMode
      this.applyTheme()
    },
    applyTheme() {
      const theme = this.isLightMode ? 'light' : 'dark'
      document.documentElement.setAttribute('data-theme', theme)
      localStorage.setItem('theme', theme)
    }
  }
}
</script>

<style scoped>
@font-face {
  font-family: 'Inter';
  src: url('~@/assets/fonts/Inter-var.ttf') format('truetype');
  /* 定义可变字体支持的粗细范围 */
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'AlibabaPuHuiTi';
  src: url('~@/assets/fonts/AlibabaPuHuiTi-3-65-Medium.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

.steam-navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background-color: var(--c-nav-bg);
  -webkit-backdrop-filter: blur(6px);
  backdrop-filter: blur(6px);
  z-index: 1000;
  box-shadow: none;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: height 0.2s ease;
}
.steam-navbar.compact { height: 30px; }

.nav-container {
  width: 100%;
  max-width: 96%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-family: var(--title-font);
  font-size: 24px;
  font-weight: 300;
  color: var(--c-text-title);
  letter-spacing: 2px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: font-size 0.2s ease;
}
.steam-navbar.compact .logo { font-size: 14px; }

.menu-toggle {
  display: none;
  background: transparent;
  border: 1px solid var(--c-border-strong);
  color: var(--c-text-nav);
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  padding: 8px 14px;
  cursor: pointer;
  border-radius: 4px;
  transition: padding 0.2s ease, font-size 0.2s ease;
  line-height: 1;
  align-items: center;
  justify-content: center;
}
.steam-navbar.compact .menu-toggle { padding: 2px 8px; font-size: 11px; }
.menu-icon { width: 18px; height: 18px; display: block; }
.steam-navbar.compact .menu-icon { width: 14px; height: 14px; }

.menu-toggle:hover {
  color: var(--c-text-title);
  border-color: #3a3f49;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.nav-links {
  display: flex;
}

.nav-links button {
  background: transparent;
  border: none;
  color: var(--c-text-nav);
  font-size: 16px;
  font-weight: normal;
  text-transform: uppercase;
  padding: 10px 20px;
  cursor: pointer;
  transition: color 0.3s;
  outline: none;
  font-family: 'Inter', 'AlibabaPuHuiTi', sans-serif;
  letter-spacing: 1px;
}
.steam-navbar.compact .nav-links button {
  font-size: 12px;
  padding: 4px 10px;
}

.nav-links button:hover {
  color: var(--c-text-title);
}

/* Vue Router 激活时的类名 */
.nav-links button.router-link-active {
  color: var(--c-primary);
  background-color: var(--c-primary-alpha-20);
  border-radius: 4px;
  border-bottom: 3px solid var(--c-primary);
}

.theme-toggle {
  background: transparent;
  border: none;
  color: var(--c-text-nav);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.3s ease;
}
.theme-toggle:hover {
  color: var(--c-text-title);
  background: var(--c-primary-alpha-10);
}
.theme-icon {
  width: 20px;
  height: 20px;
}
.steam-navbar.compact .theme-icon {
  width: 16px;
  height: 16px;
}

.mobile-menu {
  display: none;
  background-color: var(--c-bg-l0);
  flex-direction: column;
  padding: 20px 0;
  z-index: 999;
}
.mobile-menu.compact { top: 30px; }

.mobile-menu button {
  background: transparent;
  border: none;
  color: var(--c-text-nav);
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  padding: 12px 20px;
  text-align: left;
  cursor: pointer;
  font-family: 'Inter', 'AlibabaPuHuiTi', sans-serif;
  letter-spacing: 1px;
}

.mobile-menu button:hover,
.mobile-menu button.router-link-active {
  color: var(--c-text-title);
}

.menu-mask {
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--c-shadow-medium);
  z-index: 998;
  backdrop-filter: blur(2px);
  display: none;
}
.menu-mask.compact { top: 30px; }

@media (max-width: 768px) {
  .nav-container {
    max-width: 100%;
    padding: 0 12px;
  }
  .nav-links {
    display: none;
  }
  .menu-toggle {
    display: inline-flex;
  }
  .mobile-menu {
    display: flex;
    position: fixed;
    top: 80px;
    left: 0;
    right: 0;
    width: 100%;
    max-width: 100%;
    height: auto;
    box-shadow: none;
    transform: translateY(-100%);
    transition: transform 0.3s ease;
  }
  .mobile-menu.active {
    transform: translateY(0);
  }
  .menu-mask {
    display: block;
  }
  .theme-toggle {
    display: none;
  }
  .mobile-theme-toggle {
    margin-top: 10px;
    border-top: 1px solid var(--c-border-strong) !important;
    color: var(--c-primary) !important;
  }
}
</style>
