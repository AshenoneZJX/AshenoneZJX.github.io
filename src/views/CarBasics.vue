<template>
  <div class="page-car-basics container">
    <div class="section-header">
      <h2>汽车基础知识</h2>
      <button class="back-btn" @click="$router.push('/mySpace')">返回总览</button>
    </div>
    <div class="divider"></div>
    <div class="basics-grid">
      <div class="basics-card">
        <div class="card-title">车身与尺寸</div>
        <div class="card-content">
          <p>了解长宽高、轴距与整备质量的含义与作用。</p>
        </div>
      </div>
      <div class="basics-card">
        <div class="card-title">动力与传动</div>
        <div class="card-content">
          <p>常见发动机、电机参数与变速箱类型的区别。</p>
        </div>
      </div>
      <div class="basics-card">
        <div class="card-title">底盘与悬架</div>
        <div class="card-content">
          <p>麦弗逊、双叉臂、多连杆等悬架形式的特点。</p>
        </div>
      </div>
      <div class="basics-card">
        <div class="card-title">能源类型</div>
        <div class="card-content">
          <p>燃油、混动与纯电的优缺点与使用场景。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CarBasics'
}
</script>

<style scoped>
.section-header { display: flex; justify-content: space-between; align-items: center; }
.section-header h2 { color: #fff; font-weight: 300; letter-spacing: 2px; }
.divider { height: 2px; background: #2a475e; margin: 10px 0 20px 0; }
.back-btn { background: #2a475e; border: 1px solid #3c4551; color: #c7d5e0; padding: 6px 12px; cursor: pointer; }
.back-btn:hover { color: #fff; border-color: #66c0f4; }
.basics-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 16px; }
.basics-card { background: #16202d; border: 1px solid #3c4551; padding: 12px; }
.card-title { color: #66c0f4; font-weight: 600; margin-bottom: 8px; }
.card-content p { color: #c7d5e0; line-height: 1.7; }
</style>
