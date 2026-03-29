<!-- 雅思学习子页面：基础框架 -->

<template>
  <div class="page-ielts">
    <div class="section-header">
      <div class="title-row">
        <h2>雅思学习</h2>
        <button class="back-btn" @click="$router.push('/learning')">
          <img src="@/assets/images/fanhui.svg" class="back-icon" alt="返回" />
          <span class="back-text">返回总览</span>
        </button>
      </div>
      <div class="divider"></div>
    </div>

    <div class="modules-grid">
      <div class="module-card">
        <div class="card-title">听力</div>
        <div class="card-desc">练习与技巧占位</div>
      </div>
      <div class="module-card">
        <div class="card-title">阅读</div>
        <div class="card-desc">题型与策略占位</div>
      </div>
      <div class="module-card">
        <div class="card-title">口语</div>
        <div class="card-desc">Part1/2/3占位</div>
      </div>
      <div class="module-card">
        <div class="card-title">写作</div>
        <div class="card-desc">Task1/Task2占位</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IeltsLearning'
}
</script>

<style scoped>
.page-ielts {
  width: 100%;
  box-sizing: border-box;
}

.title-row { 
  display: flex; 
  align-items: center; 
  justify-content: space-between; 
}

.section-header h2 { 
  color: var(--c-text-title); 
  font-size: 24px;
  font-weight: bold; 
  letter-spacing: 0; 
  margin: 0;
}
.divider { height: 2px; background: var(--c-border-strong); margin: 12px 0 20px 0; }

.back-btn {
  background: transparent;
  border: 1px solid var(--c-border-strong);
  color: var(--c-text-body-alt);
  height: 32px;
  padding: 0 12px;
  cursor: pointer;
  border-radius: 6px;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-left: auto;
  transition: all 0.2s ease;
  text-decoration: none;
  box-sizing: border-box;
}
.back-icon {
  width: 16px;
  height: 16px;
  display: block;
}
.back-btn:hover {
  color: var(--c-text-emphasis);
  background: var(--c-primary-alpha-10);
  border-color: var(--c-border-hover);
}
.back-btn:active, .back-btn.router-link-active {
  background: var(--c-bg-l1);
  border-color: var(--c-primary);
  color: var(--c-text-title);
}

.modules-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
}

.module-card {
  background: var(--c-bg-l2);
  border: 1px solid var(--c-border-default);
  box-shadow: 0 4px 15px var(--c-shadow-medium);
  border-radius: 10px;
  padding: 16px;
  color: var(--c-text-nav);
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
}
.module-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.45);
}

.card-title {
  color: var(--c-text-title);
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
}
.card-desc { 
  font-size: 14px; 
}

@media (max-width: 768px) {
  .back-text { display: none; }
  .modules-grid { grid-template-columns: 1fr; gap: 16px; }
}
</style>
