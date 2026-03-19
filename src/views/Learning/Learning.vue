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
  width: 1200px;
  min-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
}
.learning-view >>> .gallery-card,
.learning-view >>> .module-card {
  border-radius: 10px;
  overflow: hidden;
}
</style>
