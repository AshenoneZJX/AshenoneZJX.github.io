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
.learning-view { padding-top: 20px; }
</style>
