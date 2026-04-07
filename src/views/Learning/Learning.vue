<!-- Learning 根组件：学习空间父级视图 -->

<template>
  <div class="container learning-view">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'Learning'
}
</script>

<style scoped>
@font-face {
  font-family: 'MotivaSans';
  src: url('~@/assets/fonts/MotivaSans-Regular_woff.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

.learning-view {
  padding: 20px;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  box-sizing: border-box;
  font-family: "SF Pro", "Helvetica", "Arial", "Roboto", "PingFang SC", "Microsoft YaHei", "Source Han Sans SC", sans-serif;
}
.learning-view >>> h2 {
  font-family: 'MotivaSans', sans-serif;
  font-weight: 500;
}
.learning-view >>> .gallery-card,
.learning-view >>> .module-card {
  background: var(--c-bg-l2);
  box-shadow: 0 4px 15px var(--c-shadow-medium);
  border: 1px solid var(--c-border-default);
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s, filter 0.2s;
}
.learning-view >>> .gallery-card:hover,
.learning-view >>> .module-card:hover {
  transform: scale(1.03);
  filter: brightness(1.15);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.45);
}
.learning-view >>> .card-info {
  padding: 12px;
  width: 100%;
  box-sizing: border-box;
  background: #171B21;
}
.learning-view >>> .card-image {
  width: 100%;
  overflow: hidden;
}
.learning-view >>> .card-title {
  color: var(--c-text-title);
  font-size: 16px;
  font-weight: bold;
}
.learning-view >>> .card-tags .tag {
  background: #3a3f45;
  color: var(--c-text-title);
  border-radius: 4px;
  font-size: 12px;
  padding: 2px 6px;
}
</style>
