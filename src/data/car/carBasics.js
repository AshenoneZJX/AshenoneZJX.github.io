import matter from 'gray-matter'
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt({
  html: true,
  linkify: true,
  breaks: false
})

function loadMdBasics() {
  const ctx = require.context('!!raw-loader!@/content/car-basics', false, /\.md$/)
  const items = ctx.keys().map(key => {
    const mod = ctx(key)
    const raw = typeof mod === 'string' ? mod : (mod && mod.default) || ''
    const parsed = matter(raw, { excerpt_separator: '<!-- more -->' })
    const id = key.replace('./', '').replace(/\.md$/, '')
    const title = parsed.data.title || id
    const category = parsed.data.category || 'Basics'
    const content = parsed.content
    const excerpt = parsed.data.excerpt || (parsed.excerpt ? parsed.excerpt.trim() : content.replace(/\n/g, ' ').slice(0, 120))
    const html = md.render(content)
    return { id, title, category, excerpt, content, html }
  })
  items.sort((a, b) => String(a.title).localeCompare(String(b.title), 'zh'))
  return items
}

export default loadMdBasics()
