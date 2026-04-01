<template>
  <aside class="profile-card">
    <div class="avatar-wrapper">
      <div class="avatar-frame">
        <img src="@/assets/images/toux.jpg" alt="Avatar" class="avatar">
      </div>
      <div class="mobile-expand-toggle" @click="toggleExpand" :title="isExpanded ? '收起信息' : '展开信息'">
        <span class="info-icon">i</span>
      </div>
    </div>
    <div class="profile-info">
      <h3 class="username">AshenOne</h3>
      <div class="location">🇨🇳 Yunnan, China</div>

      <div class="collapsible-content" :class="{ 'is-expanded': isExpanded }">
        <div class="collapsible-inner">
          <p class="bio">
            Top-Tier Developer.<br>
            Car Enthusiast – Honda Civic Owner.<br>
            Photographer.<br>
          </p>
          <div class="languages-section">
            <h4 class="lang-title">Languages</h4>
            <div class="lang-bar">
              <span class="lang-segment vue"></span>
              <span class="lang-segment css"></span>
              <span class="lang-segment html"></span>
              <span class="lang-segment js"></span>
            </div>
            <div class="lang-legend">
              <div class="legend-item">
                <span class="legend-dot vue"></span>
                <span class="legend-text">Vue <span class="percent">57.1%</span></span>
              </div>
              <div class="legend-item">
                <span class="legend-dot css"></span>
                <span class="legend-text">CSS <span class="percent">17.2%</span></span>
              </div>
              <div class="legend-item">
                <span class="legend-dot html"></span>
                <span class="legend-text">HTML <span class="percent">14.3%</span></span>
              </div>
              <div class="legend-item">
                <span class="legend-dot js"></span>
                <span class="legend-text">JavaScript <span class="percent">11.4%</span></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="social-links">
        <a href="https://github.com/AshenoneZJX" target="_blank" rel="noopener noreferrer" class="social-link" title="GitHub">
          <img src="@/assets/images/GitHub.svg" alt="GitHub" class="social-icon">
        </a>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'ProfileCard',
  data() {
    return {
      isExpanded: false
    }
  },
  methods: {
    toggleExpand() {
      this.isExpanded = !this.isExpanded
    }
  }
}
</script>

<style scoped>
@font-face {
  font-family: 'RobotoMono';
  src: url('~@/assets/fonts/RobotoMono-VariableFont_wght.ttf') format('truetype');
  font-weight: 100 900;
  font-display: swap;
}

.profile-card {
  background-color: var(--c-shadow-light); /* 稍微深一点的背景 */
  padding: 15px;
  height: fit-content;
  font-family: 'RobotoMono', monospace;
  border-radius: 6px;
}

.avatar-wrapper {
  position: relative;
  width: max-content;
  margin: 0 auto;
}

.avatar-frame {
  width: 166px;
  height: 166px;
  margin: 0 auto 15px;
  padding: 2px;
  background: linear-gradient(to bottom right, #4e697d, #27303d);
  border-radius: 50%;
  overflow: hidden;
}

.avatar {
  width: 100%;
  height: 100%;
  display: block;
  border-radius: 50%;
}

.username {
  color: var(--c-text-title);
  font-size: 24px;
  margin-bottom: 5px;
  text-align: center;
  letter-spacing: 1.5px;
}

.location {
  font-size: 13px;
  color: var(--c-text-muted);
  text-align: center;
  margin-bottom: 15px;
}

.bio {
  font-size: 12px;
  color: var(--c-text-body);
  line-height: 1.5;
  margin-bottom: 20px;
  text-align: left;
  padding: 0 15px;
}

.languages-section {
  margin-top: 20px;
  text-align: left;
  width: 100%;
}

.lang-title {
  color: var(--c-text-title);
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 10px;
  margin-top: 0;
}

.lang-bar {
  display: flex;
  height: 10px;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 12px;
  background-color: rgba(255, 255, 255, 0.1);
}

.lang-segment {
  height: 100%;
}

.lang-segment.vue { width: 57.1%; background-color: #41b883; }
.lang-segment.js { width: 11.4%; background-color: #f1e05a; }
.lang-segment.html { width: 14.3%; background-color: #e34c26; }
.lang-segment.css { width: 17.2%; background-color: #563d7c; }

.lang-legend {
  display: flex;
  flex-wrap: wrap;
  column-gap: 16px;
  row-gap: 8px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
}

.legend-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.legend-dot.vue { background-color: #41b883; }
.legend-dot.js { background-color: #f1e05a; }
.legend-dot.html { background-color: #e34c26; }
.legend-dot.css { background-color: #563d7c; }

.legend-text {
  color: #c9d1d9;
  font-weight: 500;
}

.percent {
  color: #8b949e;
  margin-left: 4px;
}

.social-links {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 16px;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
  transition: all 0.2s ease;
}

.social-link:hover {
  opacity: 1;
  transform: scale(1.1);
}

.social-icon {
  width: 24px;
  height: 24px;
  display: block;
  filter: invert(100%);
}

.mobile-expand-toggle {
  display: none;
  position: absolute;
  right: 12px;
  bottom: 24px;
  align-items: center;
  justify-content: center;
  color: var(--c-primary);
  cursor: pointer;
  user-select: none;
  z-index: 10;
}

.info-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px) saturate(150%);
  -webkit-backdrop-filter: blur(20px) saturate(150%);
  color: var(--c-text-title);
  font-size: 16px;
  font-family: 'Times New Roman', serif;
  font-style: italic;
  font-weight: bold;
  opacity: 0.9;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 
    0 4px 12px rgba(0, 0, 0, 0.2),
    inset 0 1px 1px rgba(255, 255, 255, 0.2);
}

.mobile-expand-toggle:hover .info-icon {
  opacity: 1;
  background: rgba(255, 255, 255, 0.15);
  transform: scale(1.1);
  box-shadow: 
    0 6px 16px rgba(0, 0, 0, 0.3),
    inset 0 1px 2px rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.3);
}

.mobile-expand-toggle:active .info-icon {
  background: rgba(255, 255, 255, 0.25);
  transform: scale(0.95);
  box-shadow: 
    0 2px 8px rgba(0, 0, 0, 0.2),
    inset 0 1px 1px rgba(255, 255, 255, 0.1);
}

.collapsible-content {
  overflow: hidden;
}

@media (max-width: 768px) {
  .mobile-expand-toggle {
    display: flex;
  }
  
  .collapsible-content {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.3s ease-out, margin 0.3s ease-out, opacity 0.3s ease-out;
    opacity: 0;
    margin-bottom: 0;
  }
  
  .collapsible-content.is-expanded {
    grid-template-rows: 1fr;
    opacity: 1;
    margin-bottom: 20px;
  }
  
  /* 需要一个内部容器来包裹实际内容以支持 grid 动画 */
  .collapsible-inner {
    min-height: 0;
  }
  
  .bio {
    margin-bottom: 15px;
  }
  
  .languages-section {
    margin-top: 10px;
  }
}
</style>
