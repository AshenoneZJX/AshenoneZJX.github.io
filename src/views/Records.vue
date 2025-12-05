<template>
  <div class="container page-records">
    <div class="section-header">
      <h2>Activity Log</h2>
      <div class="filters">
        <span class="active">All</span>
        <span>Dev</span>
        <span>Life</span>
      </div>
    </div>

    <div class="record-list">
      <div class="record-item">
        <div class="record-content">
          <div class="record-title">To-Do List</div>
          <div class="todo-list">
            <label><input type="checkbox" /> 子页面完善</label>
            <label><input type="checkbox" /> 字体优化</label>
            <label><input type="checkbox" /> 部署到GithubPages</label>
          </div>
        </div>
      </div>
      <div class="record-item" v-for="j in 6" :key="j">
        <div class="record-date-box">
          <span class="month">OCT</span>
          <span class="day">{{ 10 + j }}</span>
        </div>
        <div class="record-content">
          <div class="record-title">
            <span>Vue Router Implementation Note #{{j}}</span>
          </div>
          <div class="record-excerpt">
            Updated the project structure to use separate component files. 
            The routing logic is now handled by Vue Router, providing a smoother SPA experience.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-records { padding-top: 20px; }

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: 1px solid #38424e;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

.filters span {
  margin-left: 15px;
  cursor: pointer;
  font-size: 14px;
}
.filters span:hover, .filters span.active { color: #fff; }

/* 列表布局核心 */
.record-list { display: flex; flex-direction: column; gap: 8px; }

.record-item {
  display: flex;
  background: rgba(0, 0, 0, 0.2);
  padding: 15px;
  transition: background 0.2s;
}
.record-item:hover { background: #222b35; }

.record-date-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 60px;
  margin-right: 20px;
  border-right: 1px solid #38424e;
  padding-right: 15px;
}
.month { color: #8f98a0; font-size: 12px; }
.day { color: #66c0f4; font-size: 24px; font-weight: bold; }

.record-title { color: #ffffff; font-size: 16px; margin-bottom: 5px; }
.record-excerpt { font-size: 13px; color: #8f98a0; }

.todo-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 10px;
  color: #8f98a0;
  font-size: 14px;
}

.todo-list label {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.todo-list input[type="checkbox"] {
  accent-color: #66c0f4;
}
</style>