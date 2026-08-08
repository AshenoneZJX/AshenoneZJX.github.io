<template>
  <div class="navbar-wrapper">
    <nav class="steam-navbar">
      <div class="nav-container">
        <div class="logo" @click="goHome">
          烬途 · Ashpath
        </div>
        <div class="nav-right">
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
          <div class="nav-links">
            <router-link to="/" exact tag="button">主页</router-link>
            <router-link to="/mySpace" tag="button">个人空间</router-link>
            <router-link to="/records" tag="button">记录</router-link>
            <router-link to="/learning" tag="button">Learning</router-link>
          </div>
          <router-link to="/settings" tag="button" class="theme-toggle settings-btn" title="设置" aria-label="设置">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="theme-icon"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
          </router-link>
        </div>
      </div>
    </nav>
    <div
      id="navbar-mobile-menu"
      class="mobile-menu"
      :class="{ active: isOpen }"
      @click.stop
    >
      <router-link @click.native="closeMenu" to="/" exact tag="button">主页</router-link>
      <router-link @click.native="closeMenu" to="/mySpace" tag="button">个人空间</router-link>
      <router-link @click.native="closeMenu" to="/records" tag="button">记录</router-link>
      <router-link @click.native="closeMenu" to="/learning" tag="button">Learning</router-link>
      <router-link @click.native="closeMenu" to="/settings" tag="button">设置</router-link>
    </div>
    <div v-if="isOpen" class="menu-mask" @click="closeMenu"></div>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      isOpen: false
    }
  },
  watch: {
    $route() {
      this.isOpen = false
    }
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen
    },
    closeMenu() {
      this.isOpen = false
    },
    goHome() {
      this.isOpen = false
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
/* 强制 Navbar 保持深色模式的变量 */
.navbar-wrapper {
  position: relative;
  z-index: 1200;
}

.steam-navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background-color: var(--c-navbar-bg);
  -webkit-backdrop-filter: blur(14px) saturate(150%);
  backdrop-filter: blur(14px) saturate(150%);
  z-index: 1200;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.25);
  border-bottom: 1px solid var(--c-border-default);
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
  font-weight: 700;
  color: var(--c-text-title);
  letter-spacing: 2px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: font-size 0.2s ease, color 0.25s ease, text-shadow 0.25s ease;
}
.logo:hover {
  color: var(--c-primary);
  text-shadow: 0 0 18px var(--c-primary-alpha-40);
}
.steam-navbar.compact .logo { font-size: 14px; }

.menu-toggle {
  display: none;
  background: transparent;
  border: 1px solid var(--c-border-default);
  color: var(--c-text-nav);
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  padding: 8px 14px;
  cursor: pointer;
  border-radius: 8px;
  transition: padding 0.2s ease, font-size 0.2s ease, color 0.2s ease, background-color 0.2s ease, border-color 0.2s ease;
  line-height: 1;
  align-items: center;
  justify-content: center;
}
.steam-navbar.compact .menu-toggle { padding: 2px 8px; font-size: 11px; }
.menu-icon { width: 18px; height: 18px; display: block; }
.steam-navbar.compact .menu-icon { width: 14px; height: 14px; }

.menu-toggle:hover {
  color: var(--c-primary);
  background: var(--c-primary-alpha-10);
  border-color: var(--c-primary-alpha-40);
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 4px;
}

.nav-links button {
  position: relative;
  background: transparent;
  border: none;
  color: var(--c-text-nav);
  font-size: 17px;
  font-weight: normal;
  text-transform: uppercase;
  padding: 10px 12px;
  cursor: pointer;
  transition: color 0.2s ease, background-color 0.2s ease;
  outline: none;
  font-family: 'Inter', 'AlibabaPuHuiTi', sans-serif;
  letter-spacing: 1px;
  border-radius: 8px;
}
.steam-navbar.compact .nav-links button {
  font-size: 13px;
  padding: 6px 8px;
}

.nav-links button:hover {
  color: var(--c-text-title);
  background: var(--c-primary-alpha-10);
}

/* Vue Router 激活时的类名：按钮下方一条高亮直线 */
.nav-links button.router-link-active {
  color: var(--c-primary);
  background: transparent;
}
.nav-links button.router-link-active::after {
  content: '';
  position: absolute;
  left: 10px;
  right: 10px;
  bottom: -2px;
  height: 2px;
  border-radius: 2px;
  background: var(--c-primary);
  box-shadow: 0 0 8px var(--c-primary-alpha-40);
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
  transition: color 0.2s ease, background-color 0.2s ease;
}
.theme-toggle:hover {
  color: var(--c-primary);
  background: var(--c-primary-alpha-10);
}
.theme-icon {
  width: 20px;
  height: 20px;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.theme-toggle:hover .theme-icon {
  transform: rotate(60deg);
}
.steam-navbar.compact .theme-icon {
  width: 16px;
  height: 16px;
}

.mobile-menu {
  display: none;
  background-color: var(--c-navbar-bg);
  -webkit-backdrop-filter: blur(16px) saturate(150%);
  backdrop-filter: blur(16px) saturate(150%);
  flex-direction: column;
  gap: 4px;
  padding: 14px 12px;
  z-index: 999;
  border-bottom: 1px solid var(--c-border-default);
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.45);
}
.mobile-menu.compact { top: 30px; }

.mobile-menu button {
  background: transparent;
  border: none;
  color: var(--c-text-nav);
  font-size: 15px;
  font-weight: bold;
  text-transform: uppercase;
  padding: 12px 16px;
  text-align: left;
  cursor: pointer;
  font-family: 'Inter', 'AlibabaPuHuiTi', sans-serif;
  letter-spacing: 1px;
  border-radius: 10px;
  transition: color 0.2s ease, background-color 0.2s ease;
}

.mobile-menu button:hover {
  color: var(--c-text-title);
  background: var(--c-primary-alpha-10);
}
.mobile-menu button.router-link-active {
  color: var(--c-primary);
  background: var(--c-primary-alpha-20);
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
    padding: 0 16px;
    justify-content: space-between;
  }
  .nav-links {
    display: none;
  }
  .nav-right {
    flex: 1;
    justify-content: flex-end;
  }
  .menu-toggle {
    display: inline-flex;
    margin-left: auto;
    border: 1px solid var(--c-border-default);
    padding: 6px;
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
    display: inline-flex;
    padding: 6px;
  }
}
</style>
