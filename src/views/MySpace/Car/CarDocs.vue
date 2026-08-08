<template>
  <div class="page-car-docs">
    <div class="section-header">
      <h2>相关资料</h2>
      <button class="back-btn" @click="$router.push('/mySpace/cars-home')">
        <img src="@/assets/images/fanhui.svg" class="back-icon" alt="返回" />
        <span class="back-text">返回汽车主页</span>
      </button>
    </div>
    <div class="divider"></div>

    <div class="doc-grid" v-if="docs.length">
      <div
        class="doc-card"
        :class="{ clickable: doc.type === 'pdf' }"
        v-for="doc in docs"
        :key="doc.id"
        @click="openDoc(doc)"
      >
        <div class="doc-cover">
          <img v-if="doc.cover" class="cover-img" :src="coverUrl(doc)" :alt="doc.title" />
          <iframe
            v-else-if="doc.type === 'pdf'"
            class="cover-pdf"
            :src="docUrl(doc) + '#toolbar=0&navpanes=0&scrollbar=0&view=Fit'"
            :title="doc.title"
            scrolling="no"
            tabindex="-1"
          ></iframe>
          <div v-else class="cover-badge" :class="doc.type">{{ typeLabel(doc.type) }}</div>
          <div class="cover-type-tag" :class="doc.type">{{ typeLabel(doc.type) }}</div>
        </div>
        <div class="doc-info">
          <div class="doc-title" :title="doc.title">{{ doc.title }}</div>
          <div class="doc-desc" v-if="doc.description">{{ doc.description }}</div>
          <div class="doc-meta">
            <span v-if="doc.words">约 {{ doc.words }} 字</span>
            <span v-if="doc.pages">{{ doc.pages }} 页</span>
            <span v-if="doc.sizeText">{{ doc.sizeText }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="empty-tip" v-else>
      暂无资料，将文档放入 <code>public/docs/car/</code> 目录并在 <code>src/data/car/carDocs.js</code> 中登记后即可展示。
    </div>

    <!-- PDF 阅读弹窗 -->
    <div class="pdf-modal" v-if="currentDoc" @click.self="closeDoc">
      <div class="pdf-modal-body">
        <div class="pdf-modal-header">
          <span class="pdf-modal-title">{{ currentDoc.title }}</span>
          <div class="pdf-modal-actions">
            <a class="action-btn" :href="docUrl(currentDoc)" target="_blank" rel="noopener">新窗口打开</a>
            <button class="action-btn" @click="closeDoc">关闭</button>
          </div>
        </div>
        <iframe class="pdf-frame" :src="docUrl(currentDoc)" :title="currentDoc.title"></iframe>
      </div>
    </div>
  </div>
</template>

<script>
import carDocs from '@/data/car/carDocs.js'

export default {
  name: 'CarDocs',
  data () {
    return {
      docs: carDocs,
      currentDoc: null
    }
  },
  methods: {
    docUrl (doc) {
      return process.env.BASE_URL + 'docs/car/' + encodeURIComponent(doc.file)
    },
    coverUrl (doc) {
      return process.env.BASE_URL + 'docs/car/' + encodeURIComponent(doc.cover)
    },
    typeLabel (type) {
      const map = { pdf: 'PDF', word: 'WORD' }
      return map[type] || '文件'
    },
    formatSize (bytes) {
      if (!bytes && bytes !== 0) return ''
      if (bytes < 1024) return bytes + ' B'
      if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
      return (bytes / 1024 / 1024).toFixed(1) + ' MB'
    },
    fetchFileSize (doc) {
      // 未手动填写 size 时，通过 HEAD 请求读取文件大小
      if (doc.size) {
        this.$set(doc, 'sizeText', doc.size)
        return
      }
      fetch(this.docUrl(doc), { method: 'HEAD' })
        .then(res => {
          const len = res.headers.get('content-length')
          if (len) this.$set(doc, 'sizeText', this.formatSize(Number(len)))
        })
        .catch(() => {})
    },
    openDoc (doc) {
      if (doc.type !== 'pdf') return
      this.currentDoc = doc
      document.body.style.overflow = 'hidden'
    },
    closeDoc () {
      this.currentDoc = null
      document.body.style.overflow = ''
    }
  },
  mounted () {
    this.docs.forEach(this.fetchFileSize)
  },
  beforeDestroy () {
    document.body.style.overflow = ''
  }
}
</script>

<style scoped>
.page-car-docs {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
}
.section-header { display: flex; justify-content: space-between; align-items: center; }
.section-header h2 { color: var(--c-text-title); font-size: 28px; font-weight: 500; letter-spacing: 0; margin: 0; font-family: 'AlibabaPuHuiTi', sans-serif; }
.divider { height: 2px; background: var(--c-border-strong); margin: 10px 0 20px 0; }

.doc-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 14px;
}
.doc-card {
  background: #16191C;
  border: 1px solid var(--c-border-default);
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: background 0.2s, box-shadow 0.2s, transform 0.2s;
}
.doc-card.clickable { cursor: pointer; }
.doc-card:hover {
  background: #1D2126;
  box-shadow: 0 8px 20px var(--c-shadow-medium);
  transform: translateY(-2px);
}

.doc-cover {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  background: #fff;
  overflow: hidden;
}
.cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.cover-pdf {
  width: 100%;
  height: 100%;
  border: none;
  pointer-events: none;
  background: #fff;
}
.cover-badge {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  font-weight: 600;
  letter-spacing: 2px;
  background: var(--c-primary-alpha-10);
  color: var(--c-primary);
}
.cover-badge.word { color: #4f8cc9; }
.cover-type-tag {
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1px;
  background: var(--c-shadow-heavy);
  color: var(--c-text-title);
  z-index: 2;
}

.doc-info {
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex: 1;
}
.doc-title {
  color: var(--c-primary);
  font-size: 15px;
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.doc-desc {
  font-size: 12px;
  color: var(--c-text-muted);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.doc-meta {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: auto;
  font-size: 11px;
  color: var(--c-text-muted);
}

.action-btn {
  background: transparent;
  border: 1px solid var(--c-border-hover);
  color: var(--c-text-body-alt);
  padding: 5px 10px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
}
.action-btn:hover {
  background: var(--c-primary-alpha-10);
  color: var(--c-text-emphasis);
  border-color: var(--c-primary);
}

.empty-tip {
  color: var(--c-text-muted);
  font-size: 14px;
  padding: 40px 0;
  text-align: center;
}
.empty-tip code {
  background: var(--c-bg-l2);
  border: 1px solid var(--c-border-default);
  border-radius: 4px;
  padding: 1px 6px;
}

.pdf-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
  box-sizing: border-box;
}
.pdf-modal-body {
  width: 100%;
  max-width: 1000px;
  height: 100%;
  background: var(--c-bg-l2);
  border: 1px solid var(--c-border-default);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.pdf-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  border-bottom: 1px solid var(--c-border-default);
}
.pdf-modal-title { color: var(--c-text-title); font-size: 15px; letter-spacing: 1px; }
.pdf-modal-actions { display: flex; gap: 8px; }
.pdf-frame { flex: 1; width: 100%; border: none; background: #fff; }

@media (max-width: 768px) {
  .page-car-docs { padding: 16px; }
  .doc-grid { grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 10px; }
  .pdf-modal { padding: 10px; }
}
</style>
