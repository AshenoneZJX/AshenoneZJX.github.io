// 该模块用于加载并解析 @/records 目录下的所有 Markdown 文件，
// 提取 front-matter 元数据（标题、日期、分类等），
// 生成 HTML 内容、摘要与排序后的记录列表，
// 最终导出供其他组件或页面使用的结构化数据。


import matter from 'gray-matter'
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt({
  html: true,
  linkify: true,
  breaks: false
})

function loadMdRecords() {
  const ctx = require.context('!!raw-loader!@/content/records', true, /\.md$/)
  const items = ctx.keys().map(key => {
    const mod = ctx(key)
    const raw = typeof mod === 'string' ? mod : (mod && mod.default) || ''
    const parsed = matter(raw, { excerpt_separator: '<!-- more -->' })
    const id = key.split('/').pop().replace(/\.md$/, '')
    const h1Match = parsed.content.match(/^#\s+(.+)$/m)
    const title = h1Match ? h1Match[1].trim() : id
    const date = parsed.data.date || new Date().toISOString().slice(0, 10) // 确保日期格式为 YYYY-MM-DD
    const category = parsed.data.category || 'Dev'
    const content = parsed.content
    const excerpt = parsed.data.excerpt || (parsed.excerpt ? parsed.excerpt.trim() : content.replace(/\n/g, ' ').slice(0, 120))
    const html = md.render(content)
    return { id, title, date, category, excerpt, content, html }
  })
  items.sort((a, b) => new Date(b.date) - new Date(a.date))
  return items
}

export default loadMdRecords()
