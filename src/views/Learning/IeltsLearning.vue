<!-- 雅思学习子页面：基础框架 -->

<template>
  <div class="page-ielts">
    <div class="section-header">
      <div class="title-row">
        <h2>雅思学习</h2>
        <router-link class="back-btn" to="/learning">
          <img src="@/assets/images/fanhui.svg" class="back-icon" alt="返回" />
          <span class="back-text">返回总览</span>
        </router-link>
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
.page-ielts { padding-top: 20px; }
.section-header h2 { color: #fff; font-weight: 400; letter-spacing: 2px; }
.divider { height: 2px; background: #2a475e; margin: 10px 0 30px 0; }

.title-row { display: flex; align-items: center; justify-content: space-between; }
.back-btn {
  background: transparent;
  border: none;
  color: #c7d5e0;
  padding: 4px 8px;
  border-radius: 6px;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.back-icon {
  width: 16px;
  height: 16px;
  display: block;
}
.back-btn:hover {
  background: rgba(102,192,244,0.12);
  color: #e6f3ff;
}

.modules-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
}

.module-card {
  background: #16202d;
  border: 1px solid #1b2838;
  box-shadow: 0 4px 12px rgba(0,0,0,0.35);
  padding: 16px;
  color: #b8b6b4;
}
.card-title {
  color: #ffffff;
  font-weight: 600;
  letter-spacing: 1px;
  margin-bottom: 8px;
}
.card-desc { font-size: 13px; }

@media (max-width: 768px) {
  .back-text { display: none; }
  .back-btn { padding: 6px; }
}
</style>
