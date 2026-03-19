<template>
  <footer class="steam-footer">
    <div class="footer-content">
      <div class="footer-text">© 2025 AshenOne's Blog. Powered by Vue 2.</div>
      <div class="footer-links">
        <a href="https://github.com/AshenoneZJX" target="_blank" rel="noopener noreferrer" class="footer-link">
          <img src="@/assets/images/GitHub.svg" alt="GitHub" class="footer-icon">
          <span class="footer-link-text">作者主页</span>
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
.steam-footer {
  flex-shrink: 0;
  margin-top: 50px;
  padding: 40px 0;
  background: #171a21;
  text-align: center;
  color: #8f98a0;
  font-size: 12px;
  border-top: 1px solid #2e353f;
  position: relative;
  width: 100%;
}

.footer-content {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  margin: 0 auto;
}

.footer-text {
  flex: 1;
  text-align: center;
}

.footer-links {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

.footer-link {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: opacity 0.2s;
  gap: 4px;
  margin-right: 20px;
}

.footer-link:hover {
  opacity: 0.8;
}

.footer-icon {
  width: 32px;
  height: 32px;
  display: block;
  filter: invert(62%) sepia(6%) saturate(559%) hue-rotate(178deg) brightness(91%) contrast(87%);
  transition: filter 0.2s;
}

.footer-link-text {
  color: #8f98a0;
  font-size: 10px;
  transition: color 0.2s;
}

.footer-link:hover .footer-icon {
  filter: invert(72%) sepia(35%) saturate(769%) hue-rotate(182deg) brightness(99%) contrast(92%);
}

.footer-link:hover .footer-link-text {
  color: #66c0f4;
  text-decoration: underline;
}

@media (max-width: 600px) {
  .footer-content {
    flex-direction: column;
    gap: 10px;
  }

  .footer-links {
    position: static;
    transform: none;
  }
}
</style>
