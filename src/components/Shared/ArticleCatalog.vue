<template>
  <div class="toc-list">
    <div class="toc-section" v-for="sec in toc" :key="sec.id">
      <button class="toc-h2" :class="{ active: activeId === sec.id }" @click="toggle(sec.id)" :title="sec.text">
        <span v-if="sec.children && sec.children.length > 0" class="caret" :class="{ open: !sec.collapsed }"></span>
        <span v-else class="caret-placeholder"></span>
        <span class="toc-text">{{ sec.text }}</span>
      </button>
      <div class="toc-h3-list" v-show="!sec.collapsed && sec.children && sec.children.length > 0">
        <button class="toc-h3" :class="{ active: activeId === it.id }" v-for="it in sec.children" :key="it.id" @click="handleClick(it.id)" :title="it.text">{{ it.text }}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticleCatalog',
  props: {
    containerSelector: {
      type: String,
      default: '.content'
    },
    topOffset: {
      type: Number,
      default: 120
    },
    scrollOffset: {
      type: Number,
      default: 100
    }
  },
  data() {
    return {
      toc: [],
      activeId: ''
    }
  },
  methods: {
    refresh() {
      this.buildToc()
      this.$nextTick(() => {
        this.handleAnchor()
        this.handleScroll()
      })
    },
    buildToc() {
      const root = document.querySelector(this.containerSelector)
      if (!root) return
      const used = {}
      const makeId = (text) => {
        const base = String(text).toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '').slice(0, 64) || 'section'
        let id = base
        let i = 1
        while (used[id]) { id = `${base}-${i++}` }
        used[id] = true
        return id
      }
      const nodes = Array.from(root.querySelectorAll('h2, h3'))
      const toc = []
      let current = null
      nodes.forEach(n => {
        const text = n.textContent.trim()
        if (n.tagName.toLowerCase() === 'h2') {
          const id = makeId(text)
          n.id = id
          current = { id, text, children: [], collapsed: true }
          toc.push(current)
        } else if (n.tagName.toLowerCase() === 'h3') {
          const id = makeId(text)
          n.id = id
          if (current) current.children.push({ id, text })
        }
      })
      this.toc = toc
    },
    handleScroll() {
      let currentId = ''
      
      // 收集所有在大纲中的 ID
      const allIds = []
      this.toc.forEach(sec => {
        allIds.push(sec.id)
        if (sec.children) {
          sec.children.forEach(child => allIds.push(child.id))
        }
      })
      
      // 找到当前视口中最接近顶部的标题
      for (const id of allIds) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          // 如果标题在视口上方或视口内靠近顶部的位置
          if (rect.top <= this.topOffset) {
            currentId = id
          } else {
            // 因为是按顺序遍历，一旦遇到在下方的标题，前面的那个就是当前的
            break
          }
        }
      }
      
      if (currentId) {
        this.activeId = currentId
      }
    },
    toggle(id) {
      const sec = this.toc.find(s => s.id === id)
      if (sec) {
        // 如果没有子标题，点击直接滚动到该位置
        if (!sec.children || sec.children.length === 0) {
          this.handleClick(sec.id)
        } else {
          sec.collapsed = !sec.collapsed
        }
      }
    },
    handleClick(id) {
      this.scrollTo(id)
      this.$emit('toc-click', id)
    },
    scrollTo(id) {
      const el = document.getElementById(id)
      if (el) {
        const elementPosition = el.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - this.scrollOffset
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    },
    handleAnchor() {
      const text = this.$route && this.$route.query ? this.$route.query.anchor : ''
      if (!text || !this.toc || this.toc.length === 0) return
      const sec = this.toc.find(s => s.text === text)
      if (sec) {
        this.scrollTo(sec.id)
        return
      }
      for (const s of this.toc) {
        const h3 = (s.children || []).find(c => c.text === text)
        if (h3) { this.scrollTo(h3.id); return }
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  watch: {
    '$route.query.anchor'() {
      this.$nextTick(() => this.handleAnchor())
    }
  }
}
</script>

<style scoped>
/* 目录样式 */
.toc-list { 
  display: flex; 
  flex-direction: column; 
  gap: 0; 
  position: relative; 
  border-left: 2px solid var(--c-border-default); 
  padding: 0;
}
.toc-section { 
  display: flex; 
  flex-direction: column; 
}
.toc-h2 {
  display: flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: none;
  border-left: 2px solid transparent;
  color: var(--c-text-body);
  /* 二级标题按钮内边距：上下8px，左侧4px，右侧0，保证与左侧高亮边框对齐 */
  padding: 8px 0 8px 4px;
  cursor: pointer;
  text-align: left;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0.3px;
  width: calc(100% + 2px);
  margin-left: -2px;
  transition: all 0.2s ease;
}
.toc-h2:hover { color: var(--c-primary); }
.toc-h2.active {
  color: var(--c-primary);
  border-left-color: var(--c-primary);
  background: linear-gradient(90deg, var(--c-primary-alpha-10) 0%, transparent 100%);
  font-weight: 700;
}

.caret {
  width: 0; height: 0;
  border-left: 5px solid var(--c-text-title);
  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
  transform: rotate(-90deg);
  transition: transform 0.15s;
}
.caret.open { transform: rotate(0deg); }
.caret-placeholder {
  width: 5px;
  height: 10px;
  display: inline-block;
  margin-right: 0;
}
.toc-text { 
  flex: 1; 
  font-size: 13px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.toc-h3-list { 
  display: flex; 
  flex-direction: column; 
  margin: 4px 0 10px 0; 
  padding: 0;
  gap: 0; 
}
.toc-h3 {
  background: transparent;
  border: none;
  border-left: 2px solid transparent;
  color: var(--c-text-body);
  text-align: left;
  /* 三级标题按钮内边距：减小左侧padding使其更紧凑 */
  padding: 6px 0 6px 16px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 400;
  width: calc(100% + 2px);
  margin-left: -2px;
  transition: all 0.2s ease;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.toc-h3:hover { color: var(--c-primary); }
.toc-h3.active {
  color: var(--c-primary);
  border-left-color: var(--c-primary);
  background: linear-gradient(90deg, var(--c-primary-alpha-10) 0%, transparent 100%);
  font-weight: 700;
}

@media (max-width: 768px) {
  .toc-list { width: 100%; }
  .toc-h2, .toc-h3 { width: 100%; margin-left: 0; }
}
</style>
