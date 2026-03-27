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
.learning-view {
  padding-top: 20px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
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
}
.learning-view >>> .card-tags .tag {
  background: #3a3f45;
  color: var(--c-text-title);
  border-radius: 4px;
}
</style>
