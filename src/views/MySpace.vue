<!-- MySpace 根组件：负责渲染个人空间子路由 -->

<template>
  <div class="container myspace-view">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'MySpace'
}
</script>

<style scoped>
.myspace-view { padding-top: 20px; }
</style>
