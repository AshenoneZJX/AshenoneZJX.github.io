<template>
  <div class="markdown-viewer">
    <div ref="contentRef" :class="['content', fontSizeClass]" v-html="displayHtml"></div>
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
    },
    fontSizePreset: {
      type: String,
      default: 'standard'
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
  computed: {
    fontSizeClass() {
      if (this.fontSizePreset === 'small') return 'size-small'
      if (this.fontSizePreset === 'large') return 'size-large'
      return 'size-standard'
    }
  },
  methods: {
    setCopyButtonState(button, state = 'default') {
      if (!button) return
      const icons = {
        default: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',
        copied: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6L9 17l-5-5"></path></svg>',
        error: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'
      }
      const nextState = icons[state] ? state : 'default'
      button.innerHTML = icons[nextState]
      button.dataset.state = nextState
      button.setAttribute('aria-label', nextState === 'copied' ? '已复制' : nextState === 'error' ? '复制失败' : '复制代码')
    },
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
      const wrapper = button.closest('.md-code-wrap')
      const pre = wrapper ? wrapper.querySelector('pre') : button.closest('pre')
      if (!pre) return
      const code = pre.querySelector('code')
      const text = (code ? code.innerText : pre.innerText).trim()
      if (!text) return
      const copied = await this.copyText(text)
      this.setCopyButtonState(button, copied ? 'copied' : 'error')
      if (button.__copyTimer) clearTimeout(button.__copyTimer)
      button.__copyTimer = setTimeout(() => {
        this.setCopyButtonState(button, 'default')
      }, 1200)
    },
    addCopyButtons(container) {
      if (!container || container.nodeType !== 1) return
      const blocks = container.querySelectorAll('pre')
      for (const pre of blocks) {
        if (pre.parentElement && pre.parentElement.classList.contains('md-code-wrap')) continue
        
        const wrapper = document.createElement('div')
        wrapper.className = 'md-code-wrap'
        pre.parentNode.insertBefore(wrapper, pre)
        wrapper.appendChild(pre)
        
        const button = document.createElement('button')
        button.type = 'button'
        button.className = 'md-copy-btn'
        this.setCopyButtonState(button, 'default')
        wrapper.appendChild(button)
      }
    },
    wrapTables(container) {
      if (!container || container.nodeType !== 1) return
      const tables = container.querySelectorAll('table')
      for (const table of tables) {
        if (table.parentElement && table.parentElement.classList.contains('md-table-wrap')) continue
        const wrapper = document.createElement('div')
        wrapper.className = 'md-table-wrap'
        table.parentNode.insertBefore(wrapper, table)
        wrapper.appendChild(table)
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
      this.wrapTables(tmp)
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
  src: url('../../assets/fonts/Inter-var.ttf') format('truetype');
  font-weight: 100 900;
  font-display: swap;
}

@font-face {
  font-family: 'AlibabaPuHuiTi';
  src: url('../../assets/fonts/AlibabaPuHuiTi-3-55-Regular.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;
}

@font-face {
  font-family: 'FiraCode';
  src: url('../../assets/fonts/FiraCode-VF.woff2') format('woff2');
  font-weight: 300 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'GeorgiaSerif';
  src: url('../../assets/fonts/Georgia.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'SarasaMonoSCNerd';
  src: url('../../assets/fonts/sarasa-mono-sc-nerd-regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

.content { 
  --md-body-font-size: 17px;
  --md-body-line-height: 1.65;
  --md-body-font-size-mobile: 17px;
  --md-body-line-height-mobile: 1.75;
  color: var(--c-text-body); 
  font-size: 16px; 
  line-height: 1.4; /* 全局默认行距同步缩小 */
  overflow-wrap: anywhere; 
  font-family: 'Inter', 'AlibabaPuHuiTi', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; 
}

.content.size-small {
  --md-body-font-size: 16px;
  --md-body-line-height: 1.55;
  --md-body-font-size-mobile: 15px;
  --md-body-line-height-mobile: 1.6;
}

.content.size-large {
  --md-body-font-size: 18px;
  --md-body-line-height: 1.75;
  --md-body-font-size-mobile: 18px;
  --md-body-line-height-mobile: 1.85;
}

.content :deep(p) { 
  color: var(--c-text-body); 
  line-height: var(--md-body-line-height);
  margin: 8px 0; /* 减小段落间距，原为 12px */
  font-size: var(--md-body-font-size);
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
  color: #b5b9bd; 
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
  color: #b5b9bd; 
  font-weight: 700; 
}

.content :deep(h3) { 
  color: #b5b9bd; 
  font-size: 20px; 
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
  background-color: rgba(181, 185, 189, 0.42);
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

.content :deep(ul) { 
  margin: 12px 0 12px 0; 
  padding-left: 22px; 
}

.content :deep(ol) { 
  margin: 12px 0 12px 0; 
  padding-left: 22px; 
}

.content :deep(li) { 
  margin: 4px 0; /* 减小列表项间距 */
  line-height: var(--md-body-line-height);
  color: var(--c-text-body); 
  font-size: var(--md-body-font-size);
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

.content >>> code { 
  background: #282A2C; 
  border: none; 
  padding: 1px; 
  border-radius: 4px; 
  color: var(--c-text-emphasis); 
  font-family: 'FiraCode', monospace !important; 
  font-size: 13px; 
}

.content >>> code * {
  font-family: 'FiraCode', monospace !important; 
}

.content >>> pre { 
  background: #181818; 
  border: 1px solid var(--c-border-default); 
  border-radius: 6px; 
  padding: 36px 12px 12px; 
  overflow: auto; 
  line-height: 1.5;
  font-family: 'FiraCode', monospace !important; 
  margin: 0;
}

.content >>> .md-code-wrap {
  position: relative;
  margin: 16px 0;
}

.content >>> pre code { 
  background: transparent; 
  border: none; 
  padding: 0; 
  font-size: 13px; 
  line-height: 1.5;
  font-family: 'FiraCode', monospace !important; 
}

.content >>> pre code * {
  font-family: 'FiraCode', monospace !important; 
}

.content >>> .md-copy-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  border: 1px solid var(--c-border-default);
  background: #2a2d34;
  color: var(--c-text-emphasis);
  border-radius: 4px;
  width: 26px;
  height: 26px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  cursor: pointer;
  z-index: 10;
}

.content >>> .md-copy-btn:hover {
  background: #343842;
}

.content >>> .md-copy-btn svg {
  width: 14px;
  height: 14px;
  display: block;
  pointer-events: none;
}

.content :deep(table) { 
  width: 100%; 
  border-collapse: collapse; 
  border: 1px solid #4a5058; 
  margin: 14px 0; 
  font-size: 14px; 
  min-width: 520px;
  font-family: 'SarasaMonoSCNerd', 'Inter', 'AlibabaPuHuiTi', monospace;
}

.content :deep(th), .content :deep(td) { 
  border: 1px solid #4a5058; 
  padding: 6px 8px; 
  text-align: left; 
  line-height: 1.6; 
  vertical-align: top; 
  white-space: normal;
  word-break: break-word;
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
  line-height: 1.6;
  font-size: 15px;
}

.content :deep(blockquote) :deep(p) {
  margin: 6px 0;
  line-height: 1.6;
  font-size: 15px;
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
.content :deep(.md-table-wrap) {
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

@media (max-width: 768px) {
  .content { font-size: 15px; line-height: 1.5; }
  .content :deep(p) { font-size: var(--md-body-font-size-mobile); line-height: var(--md-body-line-height-mobile); }
  .content :deep(li) { font-size: var(--md-body-font-size-mobile); line-height: var(--md-body-line-height-mobile); }
  .content :deep(blockquote) { font-size: var(--md-body-font-size-mobile); line-height: var(--md-body-line-height-mobile); }
  .content :deep(blockquote) :deep(p) { font-size: var(--md-body-font-size-mobile); line-height: var(--md-body-line-height-mobile); }
  .content :deep(ul) { padding-left: 20px; }
  .content :deep(ol) { padding-left: 20px; }
  .content :deep(ul) :deep(li) { padding-left: 1px; }
  .content :deep(h1) { font-size: 24px; margin: 16px 0 10px; }
  .content :deep(h2) { font-size: 22px; margin: 14px 0 8px; }
  .content :deep(h3) { font-size: 20px; line-height: 1.2; font-weight: 700; }
  .content :deep(h4) { font-size: 17px; line-height: 1.3; font-weight: 700; margin: 12px 0 6px; }
  .content :deep(table) { min-width: 420px; }
  .content >>> pre { padding: 10px; }
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
  max-width: 80%;
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
