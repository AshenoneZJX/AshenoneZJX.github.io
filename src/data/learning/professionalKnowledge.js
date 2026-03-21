import matter from 'gray-matter'
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt({
  html: true,
  linkify: true,
  breaks: false
})

function loadMdProfessionalKnowledge() {
  const mdCtx = require.context('!!raw-loader!@/content/professional-knowledge', false, /\.md$/)
  
  // 尝试加载同目录下的视频文件
  let videoCtx = null
  try {
    videoCtx = require.context('@/content/professional-knowledge', false, /\.(mp4|webm|ogg|mov)$/i)
  } catch (e) {
    // 忽略找不到目录或文件的情况
  }
  
  const videoMap = {}
  const videoFileMap = {} // 根据完整文件名映射
  if (videoCtx) {
    videoCtx.keys().forEach(key => {
      const id = key.replace('./', '').replace(/\.[^.]+$/, '')
      const fileName = key.replace('./', '')
      const url = videoCtx(key).default || videoCtx(key)
      videoMap[id] = url
      videoFileMap[fileName] = url
    })
  }

  // 自定义 markdown-it 规则，解析图片语法中的视频或链接语法中的视频
  const defaultImageRenderer = md.renderer.rules.image
  md.renderer.rules.image = function (tokens, idx, options, env, self) {
    const token = tokens[idx]
    const srcIndex = token.attrIndex('src')
    if (srcIndex >= 0) {
      const src = token.attrs[srcIndex][1]
      // 检查是否是视频格式
      if (/\.(mp4|webm|ogg|mov)$/i.test(src)) {
        // 如果是相对路径，去掉 ./ 前缀
        const cleanSrc = src.replace(/^\.\//, '')
        // 从 videoFileMap 中获取打包后的 URL，如果没有则使用原路径
        const videoUrl = videoFileMap[cleanSrc] || src
        return `<div class="video-container"><video controls class="article-video" src="${videoUrl}">您的浏览器不支持视频播放。</video></div>`
      }
    }
    return defaultImageRenderer(tokens, idx, options, env, self)
  }

  // 也可以处理链接形式 [视频](xxx.mp4)
  const defaultLinkRenderer = md.renderer.rules.link_open || function(tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options)
  }
  md.renderer.rules.link_open = function(tokens, idx, options, env, self) {
    const token = tokens[idx]
    const hrefIndex = token.attrIndex('href')
    if (hrefIndex >= 0) {
      const href = token.attrs[hrefIndex][1]
      if (/\.(mp4|webm|ogg|mov)$/i.test(href)) {
        const cleanHref = href.replace(/^\.\//, '')
        const videoUrl = videoFileMap[cleanHref] || href
        // 渲染为视频
        return `<div class="video-container"><video controls class="article-video" src="${videoUrl}">您的浏览器不支持视频播放。</video></div><span style="display:none;">`
      }
    }
    return defaultLinkRenderer(tokens, idx, options, env, self)
  }
  const defaultLinkCloseRenderer = md.renderer.rules.link_close || function(tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options)
  }
  md.renderer.rules.link_close = function(tokens, idx, options, env, self) {
    // 找到对应的 open token 判断是不是被转换成视频了
    // 简单起见，这里假设需要闭合那个 span
    // 更好的做法是通过 env 传递状态，但由于 markdown-it 是同步的，可以直接通过判断
    return defaultLinkCloseRenderer(tokens, idx, options, env, self) + (tokens[idx].markup === '' ? '</span>' : '') // 简化处理
  }

  const items = mdCtx.keys().map(key => {
    const mod = mdCtx(key)
    const raw = typeof mod === 'string' ? mod : (mod && mod.default) || ''
    const parsed = matter(raw, { excerpt_separator: '<!-- more -->' })
    const id = key.replace('./', '').replace(/\.md$/, '')
    const title = parsed.data.title || id
    const category = parsed.data.category || '专业知识'
    const content = parsed.content
    const excerpt = parsed.data.excerpt || (parsed.excerpt ? parsed.excerpt.trim() : content.replace(/\n/g, ' ').slice(0, 120))
    const html = md.render(content)
    
    // 匹配同名视频文件作为文章的主视频
    const videoUrl = videoMap[id] || null
    
    return { id, title, category, excerpt, content, html, videoUrl }
  })
  items.sort((a, b) => String(a.title).localeCompare(String(b.title), 'zh'))
  return items
}

export default loadMdProfessionalKnowledge()
