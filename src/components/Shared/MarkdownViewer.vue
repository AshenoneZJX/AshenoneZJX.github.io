<template>
  <div class="markdown-viewer">
    <div ref="contentRef" class="content" v-html="displayHtml"></div>
  </div>
</template>

<script>
import MarkdownIt from 'markdown-it'
import markdownItMark from 'markdown-it-mark'

export default {
  name: 'MarkdownViewer',
  props: {
    content: {
      type: String,
      default: ''
    },
    html: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      displayHtml: ''
    }
  },
  watch: {
    content: {
      immediate: true,
      handler: 'prepareContent'
    },
    html: {
      immediate: true,
      handler: 'prepareContent'
    }
  },
  methods: {
    loadMathJax() {
      return new Promise(resolve => {
        if (window.MathJax) { resolve(); return }
        window.MathJax = {
          tex: { inlineMath: [['$', '$'], ['\\(', '\\)']] },
          options: { skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code'] },
          startup: { typeset: false }
        }
        const s = document.createElement('script')
        s.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js'
        s.async = true
        s.onload = () => resolve()
        document.head.appendChild(s)
      })
    },
    typesetMath() {
      if (!this.$refs.contentRef) return
      if (window.MathJax && window.MathJax.typesetPromise) {
        window.MathJax.typesetPromise([this.$refs.contentRef]).catch(() => {})
      }
    },
    prepareContent() {
      if (!this.content && !this.html) {
        this.displayHtml = ''
        this.$emit('heading-extracted', '')
        return
      }

      const md = new MarkdownIt({
        html: true,
        linkify: true,
        breaks: false
      }).use(markdownItMark)

      const sourceHtml = this.content ? md.render(this.content) : this.html
      const tmp = document.createElement('div')
      tmp.innerHTML = sourceHtml
      
      const h1 = tmp.querySelector('h1')
      let heading = ''
      if (h1) {
        heading = h1.textContent.trim()
        h1.remove()
      }
      
      // 处理图片排版
      const blocks = tmp.querySelectorAll('p, div')
      blocks.forEach(el => {
        const imgs = el.querySelectorAll('img')
        if (imgs.length > 0) {
          // 检查是否只包含图片（忽略空白文本）
          const clone = el.cloneNode(true)
          clone.querySelectorAll('img').forEach(img => img.remove())
          if (clone.textContent.trim() === '') {
            el.classList.add('image-container')
            if (imgs.length > 1) {
              el.classList.add('multi-images')
            }
          }
        }
      })

      this.displayHtml = tmp.innerHTML
      this.$emit('heading-extracted', heading)

      this.$nextTick(async () => {
        this.$emit('content-updated')
        await this.loadMathJax()
        this.typesetMath()
        this.adjustImageHeights()
      })
    },
    adjustImageHeights() {
      const containers = this.$refs.contentRef.querySelectorAll('.multi-images')
      containers.forEach(container => {
        const imgs = Array.from(container.querySelectorAll('img'))
        if (imgs.length === 0) return

        let loadedCount = 0
        const total = imgs.length
        
        const applyHeight = () => {
          imgs.forEach(img => {
            img.style.height = ''
            img.style.width = ''
          })

          window.requestAnimationFrame(() => {
            const groups = new Map()
            imgs.forEach(img => {
              const rect = img.getBoundingClientRect()
              const key = Math.round(rect.top)
              if (!groups.has(key)) groups.set(key, [])
              groups.get(key).push(img)
            })

            groups.forEach(rowImgs => {
              if (rowImgs.length < 2) return
              const totalHeight = rowImgs.reduce((sum, img) => sum + img.getBoundingClientRect().height, 0)
              if (totalHeight <= 0) return
              const avgHeight = totalHeight / rowImgs.length

              rowImgs.forEach(img => {
                img.style.maxHeight = ''
                img.style.minHeight = ''
                img.style.height = `${avgHeight}px`
                img.style.width = 'auto'
              })
            })
          })
        }

        imgs.forEach(img => {
          if (img.complete) {
            loadedCount++
            if (loadedCount === total) applyHeight()
          } else {
            img.onload = () => {
              loadedCount++
              if (loadedCount === total) applyHeight()
            }
            img.onerror = () => {
              loadedCount++
              if (loadedCount === total) applyHeight()
            }
          }
        })
      })
    }
  },
  mounted() {
    this.loadMathJax().then(() => {
      this.typesetMath()
    })
  }
}
</script>

<style scoped>
@font-face {
  font-family: 'Inter';
  src: url('~@/assets/fonts/Inter-var.ttf') format('truetype');
  font-weight: 100 900;
  font-display: swap;
}

@font-face {
  font-family: 'AlibabaPuHuiTi';
  src: url('~@/assets/fonts/AlibabaPuHuiTi-3-55-Regular.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;
}

@font-face {
  font-family: 'RobotoMono';
  src: url('~@/assets/fonts/RobotoMono-VariableFont_wght.ttf') format('truetype');
  font-weight: 100 900;
  font-display: swap;
}

.content { 
  color: #cfe0ee; 
  font-size: 16px; 
  line-height: 1.9; 
  overflow-wrap: anywhere; 
  font-family: 'Inter', 'AlibabaPuHuiTi', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; 
}

.content :deep(p) { 
  color: #cfe0ee; 
  line-height: 1.6; 
  margin: 12px 0; 
  font-size: 16px; 
  font-weight: 400; 
  font-family: 'Inter', 'AlibabaPuHuiTi', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; 
}

.content :deep(h1) { 
  color: #ffffff; 
  font-size: 28px; 
  line-height: 1.35; 
  margin: 32px 0 24px; 
  font-weight: 700; 
  letter-spacing: 0.3px; 
}

.content :deep(h2) { 
  color: #66c0f4; 
  font-size: 22px; 
  line-height: 1.25; 
  margin: 32px 0 20px; 
  font-weight: 700; 
  letter-spacing: 0.2px; 
}

.content :deep(h2)::before { 
  content: "¶"; 
  display: inline-block; 
  margin-right: 8px; 
  color: #66c0f4; 
  font-weight: 700; 
}

.content :deep(h3) { 
  color: #d9e9f7; 
  font-size: 18px; 
  line-height: 1.2; 
  margin: 28px 0 16px; 
  font-weight: 700; 
  letter-spacing: 0.1px; 
  background: linear-gradient(90deg, rgba(102, 192, 244, 0.1) 0%, transparent 100%);
  padding: 4px 8px;
  border-left: 3px solid rgba(102, 192, 244, 0.5);
  border-radius: 0 4px 4px 0;
}

.content :deep(h4) { 
  color: #d9e9f7; 
  font-size: 17px; 
  line-height: 1.3; 
  margin: 24px 0 12px; 
  font-weight: 700; 
  letter-spacing: 0.05px; 
}

.content :deep(h5), .content :deep(h6) { 
  color: #cfe0ee; 
  font-size: 14px; 
  line-height: 1.9; 
  margin: 20px 0 8px; 
  font-weight: 400; 
}

.content :deep(a) { 
  color: #66c0f4; 
  text-decoration: none; 
}

.content :deep(a:hover) { 
  text-decoration: underline; 
}

.content :deep(ul), .content :deep(ol) { 
  margin: 12px 0 12px 0; 
  padding-left: 28px; 
}

.content :deep(ol) { 
  font-family: 'RobotoMono', Menlo, Monaco, Consolas, "Courier New", monospace; 
}

.content :deep(li) { 
  margin: 6px 0; 
  line-height: 1.85; 
  color: #cfe0ee; 
  font-size: 16px; 
  font-weight: 400; 
  padding-left: 6px; 
  font-family: 'Inter', 'AlibabaPuHuiTi', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; 
}

.content :deep(ul) :deep(li) { 
  font-family: 'Inter', 'AlibabaPuHuiTi', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; 
}

.content :deep(hr) { 
  border: none; 
  height: 1px; 
  background: #2a475e; 
  margin: 18px 0; 
}

.content :deep(code) { 
  background: #1b2838; 
  border: 1px solid #38424e; 
  padding: 2px 6px; 
  border-radius: 4px; 
  color: #e6f3ff; 
  font-family: 'RobotoMono', Menlo, Monaco, Consolas, "Courier New", monospace; 
  font-size: 13px; 
}

.content :deep(pre) { 
  background: #0f1b2a; 
  border: 1px solid #38424e; 
  border-radius: 6px; 
  padding: 12px; 
  overflow: auto; 
  line-height: 1;
  font-family: 'RobotoMono', Menlo, Monaco, Consolas, "Courier New", monospace; 
}

.content :deep(pre code) { 
  background: transparent; 
  border: none; 
  padding: 0; 
  font-size: 13px; 
  line-height: 1;
  font-family: 'RobotoMono', Menlo, Monaco, Consolas, "Courier New", monospace; 
}

.content :deep(table) { 
  width: 100%; 
  border-collapse: collapse; 
  border: 1px solid #38424e; 
  margin: 14px 0; 
  font-size: 14px; 
}

.content :deep(th), .content :deep(td) { 
  border: 1px solid #38424e; 
  padding: 6px 8px; 
  text-align: left; 
  line-height: 2; 
  vertical-align: top; 
}

.content :deep(th) { 
  background: #223447; 
  color: #e6f3ff; 
  font-weight: 600; 
}

.content :deep(tr) { 
  background: transparent; 
}

.content :deep(blockquote) { 
  border-left: 4px solid #66c0f4; 
  background: linear-gradient(90deg, rgba(102, 192, 244, 0.15) 0%, rgba(102, 192, 244, 0.05) 100%);
  padding: 6px 20px 6px 32px;
  margin: 16px 0;
  color: #dbeaf9;
  border-radius: 0 6px 6px 0;
  font-style: italic;
  position: relative;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  line-height: 1;
  font-size: 14px;
}

.content :deep(blockquote) :deep(p) {
  margin: 6px 0;
  line-height: 1;
  font-size: 14px;
}

.content :deep(blockquote)::before {
  content: "“";
  position: absolute;
  top: -6px;
  left: 6px;
  font-size: 40px;
  color: rgba(102, 192, 244, 0.3);
  font-family: "Times New Roman", serif;
  line-height: 1;
}

.content :deep(img) { 
  max-width: 100% !important; 
  width: auto; 
  height: auto; 
  display: block; 
  margin: 0; 
  border-radius: 6px; 
  box-shadow: 0 4px 12px rgba(0,0,0,0.35); 
  border: 1px solid #38424e; 
}

.content :deep(.image-container) {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 2px;
  margin: 10px auto;
  width: fit-content;
  max-width: 100%;
  background: rgba(210, 210, 210, 0.12);
  border: 1px solid rgba(56, 66, 78, 0.6);
  border-radius: 8px;
  padding: 4px;
}

.content :deep(.multi-images) :deep(img) {
  margin: 0;
  width: auto;
  max-width: 100% !important;
  border-radius: 4px;
}

.content :deep(.mjx-container) { 
  color: #cfe0ee; 
  background: rgba(27,40,56,0.5); 
  border: 1px solid #38424e; 
  border-radius: 6px; 
  padding: 2px 6px; 
  display: inline-block; 
  margin: 0 2px; 
}

.content :deep(.mjx-container[display="true"]) { 
  display: block; 
  padding: 10px 12px; 
  margin: 10px 0; 
}

/* 移动端适配 */
@media (max-width: 768px) {
  .content { font-size: 16px; line-height: 1.8; }
  .content :deep(p) { font-size: 16px; line-height: 1.8; }
  .content :deep(li) { font-size: 16px; line-height: 1.8; }
  .content :deep(ul) { padding-left: 22px; }
  .content :deep(ol) { padding-left: 32px; }
  .content :deep(ul) :deep(li) { padding-left: 1px; }
  .content :deep(h1) { font-size: 24px; margin: 16px 0 10px; }
  .content :deep(h2) { font-size: 22px; margin: 14px 0 8px; }
  .content :deep(h3) { font-size: 18px; line-height: 1.2; font-weight: 700; }
  .content :deep(h4) { font-size: 16px; line-height: 1.3; font-weight: 700; margin: 12px 0 6px; }
  .content :deep(table) { display: block; overflow-x: auto; -webkit-overflow-scrolling: touch; }
  .content :deep(th), .content :deep(td) { white-space: nowrap; }
  .content :deep(pre) { padding: 10px; }
}

.content :deep(mark) {
  background-color: rgba(255, 215, 0, 0.2);
  color: #ffd700;
  padding: 0 2px;
  border-radius: 2px;
}
</style>
