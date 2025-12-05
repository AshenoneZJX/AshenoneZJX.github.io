<template>
  <nav class="steam-navbar">
    <div class="nav-container">
      <div class="logo">
        ASHENONE's Blog
      </div>
      <div class="nav-links">
        <router-link to="/" exact tag="button">主页</router-link>
        <router-link to="/cars" tag="button">汽车</router-link>
        <router-link to="/records" tag="button">记录</router-link>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.steam-navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background-color: #171a21;
  z-index: 1000;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav-container {
  width: 940px;
  max-width: 96%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 24px;
  font-weight: 700;
  color: #c6d4df;
  /* text-transform: uppercase; */
  letter-spacing: 1px;
  display: flex;
  align-items: center;
}

.nav-links button {
  background: transparent;
  border: none;
  color: #b8b6b4;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  padding: 10px 20px;
  cursor: pointer;
  transition: color 0.3s;
  outline: none;
}

.nav-links button:hover {
  color: #ffffff;
}

/* Vue Router 激活时的类名 */
.nav-links button.router-link-active {
  color: #66c0f4;
  border-bottom: 3px solid #66c0f4;
}
</style>