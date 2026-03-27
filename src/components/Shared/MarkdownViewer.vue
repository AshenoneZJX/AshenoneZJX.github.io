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
    async copyText(text) {
      if (!text) return false
      if (navigator.clipboard && window.isSecureContext) {
        const copiedByClipboardApi = await navigator.clipboard.writeText(text).then(() => true).catch(() => false)
        if (copiedByClipboardApi) return true
      }
      const textarea = document.createElement('textarea')
      textarea.value = text
      textarea.setAttribute('readonly', '')
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      let copied = false
      try {
        copied = document.execCommand('copy')
      } catch (_) {
        copied = false
      }
      document.body.removeChild(textarea)
      return copied
    },
    async handleContentClick(e) {
      const button = e.target && e.target.closest ? e.target.closest('.md-copy-btn') : null
      if (!button) return
      const pre = button.closest('pre')
      if (!pre) return
      const code = pre.querySelector('code')
      const text = (code ? code.innerText : pre.innerText).trim()
      if (!text) return
      const copied = await this.copyText(text)
      button.textContent = copied ? '已复制' : '复制失败'
      if (button.__copyTimer) clearTimeout(button.__copyTimer)
      button.__copyTimer = setTimeout(() => {
        button.textContent = '复制'
      }, 1200)
    },
    addCopyButtons(container) {
      if (!container || container.nodeType !== 1) return
      const blocks = container.querySelectorAll('pre')
      for (const pre of blocks) {
        if (pre.querySelector('.md-copy-btn')) continue
        const button = document.createElement('button')
        button.type = 'button'
        button.className = 'md-copy-btn'
        button.textContent = '复制'
        pre.appendChild(button)
      }
    },
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

      const isImageOnlyParagraph = el => {
        if (!el || el.nodeType !== 1) return false
        if (el.tagName !== 'P') return false
        if (!el.querySelector('img')) return false
        if (el.textContent && el.textContent.trim()) return false
        const nodes = Array.from(el.childNodes)
        for (const n of nodes) {
          if (n.nodeType === 1 && n.tagName === 'IMG') continue
          if (n.nodeType === 3 && !n.textContent.trim()) continue
          return false
        }
        return true
      }

      const groupConsecutiveImageParagraphs = container => {
        if (!container || container.nodeType !== 1) return
        const tag = container.tagName
        if (tag === 'PRE' || tag === 'CODE' || tag === 'SCRIPT' || tag === 'STYLE') return

        const children = Array.from(container.children)
        let buffer = []
        const flush = () => {
          if (buffer.length <= 1) {
            buffer = []
            return
          }
          const first = buffer[0]
          const gallery = document.createElement('div')
          gallery.className = 'md-image-gallery'
          container.insertBefore(gallery, first)
          for (const p of buffer) {
            const imgs = Array.from(p.querySelectorAll('img'))
            for (const img of imgs) gallery.appendChild(img)
            p.remove()
          }
          buffer = []
        }

        for (const child of children) {
          if (isImageOnlyParagraph(child)) {
            const imgs = Array.from(child.querySelectorAll('img'))
            if (imgs.length > 1) {
              flush()
              const gallery = document.createElement('div')
              gallery.className = 'md-image-gallery'
              container.insertBefore(gallery, child)
              for (const img of imgs) gallery.appendChild(img)
              child.remove()
              continue
            }
            buffer.push(child)
          } else {
            flush()
            groupConsecutiveImageParagraphs(child)
          }
        }
        flush()
      }

      groupConsecutiveImageParagraphs(tmp)
      this.addCopyButtons(tmp)

      this.displayHtml = tmp.innerHTML
      this.$emit('heading-extracted', heading)

      this.$nextTick(async () => {
        this.$emit('content-updated')
        await this.loadMathJax()
        this.typesetMath()
      })
    },
  },
  mounted() {
    if (this.$refs.contentRef) {
      this.$refs.contentRef.addEventListener('click', this.handleContentClick)
    }
    this.loadMathJax().then(() => {
      this.typesetMath()
    })
  },
  beforeDestroy() {
    if (this.$refs.contentRef) {
      this.$refs.contentRef.removeEventListener('click', this.handleContentClick)
    }
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

@font-face {
  font-family: 'GeorgiaSerif';
  src: url('~@/assets/fonts/Georgia.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

.content { 
  color: var(--c-text-body); 
  font-size: 16px; 
  line-height: 1.4; /* 全局默认行距同步缩小 */
  overflow-wrap: anywhere; 
  font-family: 'Inter', 'AlibabaPuHuiTi', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; 
}

.content :deep(p) { 
  color: var(--c-text-body); 
  line-height: 1.4; /* 缩小行距，原为 1.6 */
  margin: 8px 0; /* 减小段落间距，原为 12px */
  font-size: 16px;
  font-weight: 400; 
  font-family: 'Inter', 'AlibabaPuHuiTi', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; 
}

.content :deep(h1) { 
  color: var(--c-text-title); 
  font-size: 28px; 
  line-height: 1.35; 
  margin: 32px 0 24px; 
  font-weight: 700; 
  letter-spacing: 0.3px; 
}

.content :deep(h2) { 
  color: #9aa0a6; 
  font-size: 22px; 
  line-height: 1.25; 
  margin: 32px 0 20px; 
  font-weight: 700; 
  letter-spacing: 0.2px; 
  font-family: 'GeorgiaSerif', 'Times New Roman', 'AlibabaPuHuiTi', serif;
}

.content :deep(h2)::before { 
  content: "¶"; 
  display: inline-block; 
  margin-right: 8px; 
  color: #9aa0a6; 
  font-weight: 700; 
}

.content :deep(h3) { 
  color: var(--c-text-emphasis); 
  font-size: 18px; 
  line-height: 1.2; 
  margin: 8px 0 6px; /* 减小前后行距，原为 28px 0 16px */
  font-weight: 700; 
  letter-spacing: 0.1px; 
  font-family: 'GeorgiaSerif', 'Times New Roman', 'AlibabaPuHuiTi', serif;
  display: inline-block;
  position: relative;
  z-index: 1;
}

.content :deep(h3)::after {
  content: "";
  position: absolute;
  bottom: 0px;
  left: 0;
  width: 100%;
  height: 8px;
  background-color: rgba(154, 160, 166, 0.42);
  z-index: -1;
  border-radius: 2px;
}

.content :deep(h4) { 
  color: var(--c-text-emphasis); 
  font-size: 17px; 
  line-height: 1.3; 
  margin: 24px 0 12px; 
  font-weight: 700; 
  letter-spacing: 0.05px; 
}

.content :deep(h5), .content :deep(h6) { 
  color: var(--c-text-body); 
  font-size: 14px; 
  line-height: 1.9; 
  margin: 20px 0 8px; 
  font-weight: 400; 
}

.content :deep(a) { 
  color: #58a6ff; 
  text-decoration: none; 
}

.content :deep(a:hover) { 
  color: #58a6ff;
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
  margin: 4px 0; /* 减小列表项间距 */
  line-height: 1.4; /* 列表项行距也同步缩小 */
  color: var(--c-text-body); 
  font-size: 16px; /* 为了和 p 标签保持一致，这里也缩小到 14px */
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
  background: #2E333A; 
  margin: 18px 0; 
}

.content :deep(code) { 
  background: #282A2C; 
  border: none; 
  padding: 1px; 
  border-radius: 4px; 
  color: var(--c-text-emphasis); 
  font-family: 'RobotoMono', Menlo, Monaco, Consolas, "Courier New", monospace; 
  font-size: 13px; 
}

.content :deep(pre) { 
  background: var(--c-bg-panel-deep); 
  border: 1px solid var(--c-border-default); 
  border-radius: 6px; 
  padding: 36px 12px 12px; 
  overflow: auto; 
  line-height: 1;
  font-family: 'RobotoMono', Menlo, Monaco, Consolas, "Courier New", monospace; 
  position: relative;
}

.content :deep(pre code) { 
  background: transparent; 
  border: none; 
  padding: 0; 
  font-size: 13px; 
  line-height: 1;
  font-family: 'RobotoMono', Menlo, Monaco, Consolas, "Courier New", monospace; 
}

.content :deep(.md-copy-btn) {
  position: absolute;
  top: 8px;
  right: 8px;
  border: 1px solid var(--c-border-default);
  background: #2a2d34;
  color: var(--c-text-emphasis);
  border-radius: 4px;
  font-size: 12px;
  line-height: 1;
  padding: 6px 8px;
  cursor: pointer;
}

.content :deep(.md-copy-btn:hover) {
  background: #343842;
}

.content :deep(table) { 
  width: 100%; 
  border-collapse: collapse; 
  border: 1px solid #4a5058; 
  margin: 14px 0; 
  font-size: 14px; 
}

.content :deep(th), .content :deep(td) { 
  border: 1px solid #4a5058; 
  padding: 6px 8px; 
  text-align: left; 
  line-height: 2; 
  vertical-align: top; 
}

.content :deep(th) { 
  background: #32373d; 
  color: var(--c-text-emphasis); 
  font-weight: 600; 
}

.content :deep(tr) { 
  background: transparent; 
}

.content :deep(blockquote) { 
  border-left: 4px solid var(--c-primary); 
  background: linear-gradient(90deg, rgba(88, 214, 141, 0.20) 0%, rgba(88, 214, 141, 0.08) 100%);
  padding: 6px 20px 6px 32px;
  margin: 16px 0;
  color: var(--c-text-emphasis);
  border-radius: 0 6px 6px 0;
  font-style: italic;
  position: relative;
  box-shadow: 0 4px 12px var(--c-shadow-light);
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
  color: rgba(88, 214, 141, 0.3);
  font-family: "Times New Roman", serif;
  line-height: 1;
}

.content :deep(.mjx-container) { 
  color: var(--c-text-body); 
  background: #15241b; 
  border: 1px solid var(--c-border-default); 
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
  .content { font-size: 14px; line-height: 1.4; }
  .content :deep(p) { font-size: 14px; line-height: 1.4; }
  .content :deep(li) { font-size: 14px; line-height: 1.4; }
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
  .content :deep(.md-image-gallery) { gap: 10px; }
  .content :deep(img) { max-width: 100%; margin: 10px auto; }
  .content :deep(.md-image-gallery img) { height: 160px; width: auto; max-width: 100%; flex: 0 0 auto; }
}

.content :deep(mark) {
  background-color: rgba(88, 214, 141, 0.24);
  color: #58d68d;
  padding: 0 2px;
  border-radius: 2px;
}

.content :deep(img) {
  max-width: 50%;
  height: auto;
  display: block;
  margin: 12px auto;
  box-sizing: border-box;
}

.content :deep(.md-image-gallery) {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  align-items: flex-start;
  margin: 14px 0;
}

.content :deep(.md-image-gallery img) {
  margin: 0;
  height: 200px;
  width: auto;
  max-width: 100%;
  flex: 0 0 auto;
  object-fit: contain;
}
</style>
