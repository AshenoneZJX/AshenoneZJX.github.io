<template>
  <aside class="profile-card">
    <div class="avatar-frame">
      <img src="../assets/images/toux.jpg" alt="Avatar" class="avatar">
    </div>
    <div class="profile-info">
      <h3 class="username">AshenOne</h3>
      <div class="location">🇨🇳 Yunnan, China</div>
      <p class="bio">
        Level 10 Developer.<br>
        Vue.js Enthusiast.<br>
        Steam Deck Owner.
      </p>
      <div class="badge-row">
          <span class="badge">10 Years</span>
          <span class="badge">Contributor</span>
      </div>
    </div>
  </aside>
</template>

<style scoped>
@font-face {
  font-family: 'RobotoMono';
  src: url('~@/assets/fonts/RobotoMono-VariableFont_wght.ttf') format('truetype');
  font-weight: 100 900;
  font-display: swap;
}

.profile-card {
  background-color: rgba(0, 0, 0, 0.2); /* 稍微深一点的背景 */
  padding: 15px;
  height: fit-content;
  font-family: 'RobotoMono', monospace;
}

.avatar-frame {
  width: 166px;
  height: 166px;
  margin: 0 auto 15px;
  padding: 2px;
  background: linear-gradient(to bottom right, #4e697d, #27303d);
}

.avatar {
  width: 100%;
  height: 100%;
  display: block;
}

.username {
  color: #ffffff;
  font-size: 24px;
  margin-bottom: 5px;
  text-align: center;
  letter-spacing: 1.5px;
}

.location {
  font-size: 13px;
  color: #8f98a0;
  text-align: center;
  margin-bottom: 15px;
}

.bio {
  font-size: 13px;
  color: #c6d4df;
  line-height: 1.5;
  margin-bottom: 20px;
  text-align: center;
}

.badge-row {
  display: flex;
  gap: 5px;
  justify-content: center;
}

.badge {
  background: rgba(102,192,244,0.16);
  padding: 2px 8px;
  font-size: 11px;
  border-radius: 6px;
  color: #fff;
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.06);
}
</style>