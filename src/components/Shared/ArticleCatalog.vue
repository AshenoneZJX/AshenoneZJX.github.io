<template>
  <div class="toc-list">
    <div class="toc-section" :data-id="sec.id" v-for="sec in toc" :key="sec.id">
      <span class="rail-segment" :class="{ active: sec.id === activeH2Id }"></span>
      <div class="toc-content">
        <button class="toc-h2" :class="{ active: sec.id === activeH2Id }" @click="toggle(sec.id)" :title="sec.text">
          <span class="toc-text" :class="{ active: sec.id === activeH2Id }">{{ sec.text }}</span>
          <span v-if="sec.children && sec.children.length > 0" class="caret" :class="{ open: !sec.collapsed }"></span>
          <span v-else class="caret-placeholder"></span>
        </button>
        <div class="toc-h3-list" v-show="!sec.collapsed && sec.children && sec.children.length > 0">
          <button class="toc-h3" :class="{ active: it.id === activeH3Id }" v-for="it in sec.children" :key="it.id" @click="handleClick(it.id)" :title="it.text">
            <span class="toc-h3-text" :class="{ active: it.id === activeH3Id }">{{ it.text }}</span>
          </button>
        </div>
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
      activeH2Id: '',
      activeH3Id: '',
      headingMap: [],
      isScrollTicking: false
    }
  },
  methods: {
    refresh() {
      this.buildToc()
      this.$nextTick(() => {
        this.handleAnchor()
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
      const headingMap = []
      nodes.forEach(n => {
        const text = n.textContent.trim()
        if (n.tagName.toLowerCase() === 'h2') {
          const id = makeId(text)
          n.id = id
          current = { id, text, children: [], collapsed: true }
          toc.push(current)
          headingMap.push({ id, level: 2, parentId: id })
        } else if (n.tagName.toLowerCase() === 'h3') {
          const id = makeId(text)
          n.id = id
          if (current) {
            current.children.push({ id, text })
            headingMap.push({ id, level: 3, parentId: current.id })
          }
        }
      })
      this.toc = toc
      this.headingMap = headingMap
      this.updateActiveHeading()
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
    onWindowScroll() {
      if (this.isScrollTicking) return
      this.isScrollTicking = true
      window.requestAnimationFrame(() => {
        this.updateActiveHeading()
        this.isScrollTicking = false
      })
    },
    updateActiveHeading() {
      if (!this.headingMap || this.headingMap.length === 0) {
        this.activeH2Id = ''
        this.activeH3Id = ''
        return
      }
      const threshold = window.pageYOffset + this.topOffset
      let current = null
      for (const item of this.headingMap) {
        const el = document.getElementById(item.id)
        if (!el) continue
        const top = el.getBoundingClientRect().top + window.pageYOffset
        if (top <= threshold) {
          current = item
        } else {
          break
        }
      }
      if (!current) {
        const first = this.headingMap[0]
        this.activeH2Id = first.level === 2 ? first.id : first.parentId
        this.activeH3Id = ''
        return
      }
      this.activeH2Id = current.level === 2 ? current.id : current.parentId
      this.activeH3Id = current.level === 3 ? current.id : ''
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
    this.refresh()
    window.addEventListener('scroll', this.onWindowScroll, { passive: true })
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onWindowScroll)
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
  border-left: none; 
  margin: 0;
  padding: 0 0 8px;
  width: auto;
  min-width: 0;
  max-width: 100%;
  box-sizing: border-box;
}
.toc-section { 
  display: flex; 
  flex-direction: row; 
  align-items: stretch;
  position: relative;
}
.toc-content {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
}
.rail-segment {
  width: 2px;
  border-radius: 999px;
  background: rgba(187, 187, 187, 0.22);
  margin: 0 6px 0 2px;
  flex-shrink: 0;
  transition: background-color 0.2s ease;
}
.rail-segment.active {
  background: rgba(238, 238, 238, 0.82);
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
  padding: 8px 0;
  cursor: pointer;
  text-align: left;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0.3px;
  width: 100%;
  margin-left: 0;
  min-width: 0;
  transition: color 0.2s ease, background-color 0.2s ease;
  position: relative;
  border-radius: 6px;
}
.toc-h2:hover {
  color: #d3d7dd;
}
.toc-h2.active {
  color: #e4eaf6;
}

.caret {
  width: 8px;
  height: 8px;
  border-right: 2px solid #a8a8a8;
  border-bottom: 2px solid #a8a8a8;
  transform: rotate(45deg);
  transition: transform 0.15s ease, border-color 0.2s ease;
  margin-right: 10px;
  flex-shrink: 0;
}
.caret.open { transform: rotate(225deg); }
.caret-placeholder {
  width: 8px;
  height: 8px;
  display: inline-block;
  margin-left: 8px;
  margin-right: 8px;
  flex-shrink: 0;
}
.toc-text { 
  flex: 1; 
  min-width: 0;
  font-size: 13px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.toc-text.active {
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-thickness: 1.5px;
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
  padding: 6px 0;
  cursor: pointer;
  font-size: 12px;
  font-weight: 400;
  width: 100%;
  margin-left: 0;
  min-width: 0;
  transition: color 0.2s ease, background-color 0.2s ease;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  position: relative;
  border-radius: 6px;
}
.toc-h3:hover {
  color: #d3d7dd;
}
.toc-h3.active {
  color: #e4eaf6;
}
.toc-h3-text {
  display: inline;
}
.toc-h3-text.active {
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-thickness: 1.5px;
}

@media (max-width: 768px) {
  .toc-list { width: 100%; }
  .toc-h2, .toc-h3 { width: 100%; margin-left: 0; }
}
</style>
