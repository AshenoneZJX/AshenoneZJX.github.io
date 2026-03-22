<!-- Learning 总览页面：展示学习模块入口 -->

<template>
  <div class="page-learning">
    <div class="section-header">
      <h2>Learning</h2>
      <div class="divider"></div>
    </div>

    <div class="gallery-grid">
      <router-link class="gallery-card" to="/learning/ielts">
        <div class="card-image" :style="bg('https://images.unsplash.com/photo-1520975922287-5ae3a0e18e82?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.1.0')">
          <div class="hover-overlay">雅思 IELTS</div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LearningOverview',
  methods: {
    bg(url) {
      return { backgroundImage: `url(${url})` }
    }
  }
}
</script>

<style scoped>
.page-learning { 
  padding-top: 20px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
}
.section-header h2 { color: var(--c-text-title); font-weight: 300; letter-spacing: 2px; }
.divider { height: 2px; background: var(--c-border-strong); margin: 10px 0 30px 0; }

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
}
.gallery-card {
  background: var(--c-bg-l2);
  box-shadow: 0 4px 15px var(--c-shadow-medium);
  transition: transform 0.2s;
  cursor: pointer;
  text-decoration: none;
}
.gallery-card:hover { transform: translateY(-5px); }
.card-image { height: 160px; background-size: cover; background-position: center; position: relative; }
.hover-overlay { position: absolute; bottom: 0; left: 0; right: 0; padding: 8px 12px; background: var(--c-shadow-heavy); color: var(--c-text-title); font-weight: 600; letter-spacing: 1px; }

@media (max-width: 768px) {
  .page-learning {
    padding: 20px 16px;
  }
  .gallery-grid {
    grid-template-columns: 1fr;
  }
}

</style>
