<template>
  <nav class="page-breadcrumb" aria-label="当前位置">
    <span class="crumb-label">当前位置：</span>
    <template v-for="(item, i) in items">
      <router-link
        v-if="item.path"
        :key="'c' + i"
        class="crumb crumb-link"
        :to="item.path"
      >{{ item.label }}</router-link>
      <span v-else :key="'c' + i" class="crumb crumb-current">{{ item.label }}</span>
      <span v-if="i < items.length - 1" :key="'s' + i" class="crumb-sep">›</span>
    </template>
  </nav>
</template>

<script>
export default {
  name: 'PageBreadcrumb',
  props: {
    // items: [{ label: '首页', path: '/' }, ..., { label: '正文' }] 最后一项无 path 表示当前页
    items: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.page-breadcrumb {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  font-size: 13px;
  line-height: 1.6;
}
.crumb-label { color: var(--c-text-muted); }
.crumb-sep { color: var(--c-text-muted); user-select: none; }
.crumb-link {
  color: var(--c-primary);
  text-decoration: none;
  transition: color 0.2s ease;
}
.crumb-link:hover {
  color: var(--c-text-emphasis);
  text-decoration: underline;
}
.crumb-current { color: var(--c-text-body-alt); }
</style>
