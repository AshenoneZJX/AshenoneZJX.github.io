<template>
  <nav class="steam-navbar">
    <div class="nav-container">
      <div class="logo" @click="$router.push('/')">
        ASHENONE's Blog
      </div>
      <button class="menu-toggle" @click="isOpen = !isOpen" aria-label="打开导航" :aria-expanded="isOpen">
        菜单
      </button>
      <div class="nav-links">
        <router-link to="/" exact tag="button">主页</router-link>
        <router-link to="/mySpace" tag="button">个人空间</router-link>
        <router-link to="/records" tag="button">记录</router-link>
        <router-link to="/learning" tag="button">Learning</router-link>
      </div>
      <transition name="slide-down">
        <div v-if="isOpen" class="mobile-menu">
          <router-link @click.native="isOpen = false" to="/" exact tag="button">主页</router-link>
          <router-link @click.native="isOpen = false" to="/mySpace" tag="button">个人空间</router-link>
          <router-link @click.native="isOpen = false" to="/records" tag="button">记录</router-link>
          <router-link @click.native="isOpen = false" to="/learning" tag="button">Learning</router-link>
        </div>
      </transition>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      isOpen: false
    }
  }
}
</script>

<style scoped>
@font-face {
  font-family: 'Motiva Sans';
  src: url('~@/assets/fonts/MotivaSans-Regular_woff.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'msyhsb';
  src: url('~@/assets/fonts/wryh/msyhsb.ttc') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

.steam-navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background-color: rgba(23, 26, 33, 0.9);
  -webkit-backdrop-filter: blur(6px);
  backdrop-filter: blur(6px);
  z-index: 1000;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

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
  color: #ffffff;
  letter-spacing: 2px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.menu-toggle {
  display: none;
  background: transparent;
  border: 1px solid #2a2e36;
  color: #b8b6b4;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  padding: 8px 14px;
  cursor: pointer;
  border-radius: 4px;
}

.menu-toggle:hover {
  color: #ffffff;
  border-color: #3a3f49;
}

.nav-links button {
  background: transparent;
  border: none;
  color: #b8b6b4;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  padding: 10px 20px;
  cursor: pointer;
  transition: color 0.3s;
  outline: none;
  font-family: 'Motiva Sans', 'msyhsb', sans-serif;
  letter-spacing: 1px;
}

.nav-links button:hover {
  color: #ffffff;
}

/* Vue Router 激活时的类名 */
.nav-links button.router-link-active {
  color: #66c0f4;
  background-color: rgba(102, 192, 244, 0.2);
  border-radius: 4px;
  border-bottom: 3px solid #66c0f4;
}

.mobile-menu {
  position: absolute;
  top: 80px;
  left: 0;
  right: 0;
  background-color: #171a21;
  box-shadow: 0 6px 12px rgba(0,0,0,0.4);
  display: none;
  flex-direction: column;
  padding: 8px 0;
}

.mobile-menu button {
  background: transparent;
  border: none;
  color: #b8b6b4;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  padding: 12px 20px;
  text-align: left;
  cursor: pointer;
  font-family: 'Motiva Sans', 'msyhsb', sans-serif;
  letter-spacing: 1px;
}

.mobile-menu button:hover,
.mobile-menu button.router-link-active {
  color: #ffffff;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: transform 200ms ease, opacity 200ms ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
.slide-down-enter-to,
.slide-down-leave-from {
  transform: translateY(0);
  opacity: 1;
}

@media (max-width: 768px) {
  .nav-container {
    max-width: 100%;
    padding: 0 12px;
  }
  .nav-links {
    display: none;
  }
  .menu-toggle {
    display: block;
  }
  .mobile-menu {
    display: flex;
  }
}
</style>
