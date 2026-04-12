<template>
  <div class="page-brand-detail">
    <div class="section-header span-full">
      <div class="title-with-logo">
        <img v-if="brandLogoFor" class="brand-logo" :src="brandLogoFor" :alt="brandName" />
        <h2>{{ brandName }}</h2>
      </div>
      <button class="back-btn" @click="$router.push('/mySpace/brands')">
        <img src="@/assets/images/fanhui.svg" class="back-icon" alt="返回" />
        <span class="back-text">返回</span>
      </button>
    </div>
    <div class="divider span-full"></div>

    <!-- 简介 -->
    <div class="brand-intro-wrapper span-full" v-if="brandInfo && (brandInfo.quote || brandInfo.introduction)">
      <blockquote class="wiki-box" v-if="brandInfo.quote">
        <p class="summary">{{ brandInfo.quote }}</p>
      </blockquote>
      <div class="introduction-box" v-if="brandInfo.introduction">
        <p class="history-text">{{ brandInfo.introduction }}</p>
      </div>
    </div>

    <!-- 历史 -->
    <section class="brand-section span-full" v-if="brandInfo && brandInfo.history">
      <h3 class="section-title">
        <img src="@/assets/images/品牌历史.svg" class="icon" alt="品牌历史" /> 品牌历史
      </h3>
      
      <!-- 经典车型展示模块 -->
      <div class="classic-models-module" v-if="brandInfo && brandInfo.classic_models && Array.isArray(brandInfo.classic_models.list) && brandInfo.classic_models.list.length > 0">
        <h4 class="sub-section-title">
          经典车型 
          <span class="sub-title-desc" v-if="brandInfo && brandInfo.classic_models && brandInfo.classic_models.description">
            ({{ brandInfo.classic_models.description }})
          </span>
        </h4>
        <div class="classic-cards-wrapper">
          <button class="scroll-btn left" @click="scrollCards('left')" v-show="showScrollButtons">‹</button>
          <div class="classic-cards-scroll" ref="cardsScroll" @scroll="checkScroll">
            
            <!-- 渲染从brandDetails.json中获取的历史经典车型 -->
            <template v-if="brandInfo && brandInfo.classic_models && Array.isArray(brandInfo.classic_models.list) && brandInfo.classic_models.list.length > 0">
              <div 
                class="classic-card historical-card" 
                v-for="(car, idx) in brandInfo.classic_models.list" 
                :key="'historical-'+idx"
                @click="handleClassicCardClick(car)"
                :style="carIdOfModelName(car.model_name) || carIdOfModelName(car.model_name_zh) ? 'cursor: pointer;' : 'cursor: default;'"
              >
                <!-- 历史车型可能没有图片，使用渐变背景占位 -->
                <div class="classic-img placeholder-bg" v-if="!getCarCover(car)">
                  <span class="placeholder-text">{{ car.model_name }}</span>
                </div>
                <img class="classic-img" v-else :src="getCarCover(car)" :alt="car.model_name" />
                <div class="classic-overlay">
                   <div class="classic-overlay-name">{{ getDisplayName(car) }}</div>
                   <div class="classic-overlay-intro">
                     <p class="intro-line"><strong>年份:</strong> {{ car.production_years }}</p>
                     <p class="intro-line" :title="car.historical_significance"><strong>意义:</strong> {{ car.historical_significance }}</p>
                   </div>
                 </div>
                 <div class="classic-name-bottom">{{ getDisplayName(car) }}</div>
                 <div class="status-badge" v-if="car.status">{{ car.status }}</div>
              </div>
            </template>

            <!-- 渲染从cars.json中获取的在售代表车型 -->
            <div 
              class="classic-card" 
              v-for="car in filteredBrandModels" 
              :key="car.id"
              @click="$router.push({ name: 'CarDetail', params: { id: car.id } })"
            >
              <img class="classic-img" :src="car.images && car.images[0] ? car.images[0] : ''" :alt="car.title" />
              <div class="classic-overlay">
                <div class="classic-overlay-name">{{ modelNameOf(car) }}</div>
                <div class="classic-overlay-intro">{{ car.intro || '暂无介绍' }}</div>
              </div>
              <div class="classic-name-bottom">{{ modelNameOf(car) }}</div>
            </div>

          </div>
          <button class="scroll-btn right" @click="scrollCards('right')" v-show="showScrollButtons">›</button>
        </div>
      </div>

      <p class="history-text">{{ brandInfo.history }}</p>

      <!-- 品牌&车型架构图 (Mermaid) -->
      <div class="brand-architecture-module" v-if="brandInfo && (brandInfo.sub_brands && brandInfo.sub_brands.list || brandInfo.mermaid)">
        <h3 class="section-title">
          <img src="@/assets/images/品牌&车型架构图.svg" class="icon" alt="品牌&车型架构图" /> 品牌&车型架构图
        </h3>
        <div class="mermaid-container">
          <div class="mermaid" ref="mermaidDiagram"></div>
        </div>
      </div>
    </section>

    <!-- 左侧：在售车型 (30%) -->
    <section class="brand-section col-left" v-if="currentLineupCategories.length || representativeModelNames.length || representativeModelCategories">
      <h3 class="section-title">
        <img src="@/assets/images/在售车型.svg" class="icon" alt="在售车型" /> 在售车型
      </h3>
      
      <!-- 如果有详细的分类数据 (current_lineup) -->
      <template v-if="currentLineupCategories.length">
        <div v-for="cat in currentLineupCategories" :key="cat.key" class="lineup-category">
          <h4 class="lineup-cat-title">{{ cat.name }} <span class="lineup-cat-en">{{ cat.nameEn }}</span></h4>
          <ul class="models-list">
            <li
              v-for="m in cat.models"
              :key="m.model_name"
              class="model-item"
            >
              <router-link
                v-if="getCarRoute(m.model_name) || getCarRoute(m.model_name_zh)"
                class="model-link"
                :to="getCarRoute(m.model_name) || getCarRoute(m.model_name_zh)"
              >{{ m.model_name_zh || m.model_name }}</router-link>
              <span v-else class="model-name">{{ m.model_name_zh || m.model_name }}</span>
            </li>
          </ul>
        </div>
      </template>

      <!-- 按车型类别分组展示 (处理对象形式的 models 字段) -->
      <template v-else-if="representativeModelCategories">
        <div v-for="(models, category) in representativeModelCategories" :key="category" class="lineup-category">
          <h4 class="lineup-cat-title">{{ category }}</h4>
          <ul class="models-list">
            <li
              v-for="m in models"
              :key="m"
              class="model-item"
            >
              <router-link
                v-if="getCarRoute(m)"
                class="model-link"
                :to="getCarRoute(m)"
              >{{ m }}</router-link>
              <span v-else class="model-name">{{ m }}</span>
            </li>
          </ul>
        </div>
      </template>

      <!-- 降级方案：如果没有分类数据，使用原来的列表 -->
      <ul class="models-list fallback-list" v-else>
        <li
            v-for="m in representativeModelNames"
            :key="m"
            class="model-item"
          >
            <router-link
              v-if="getCarRoute(m)"
              class="model-link"
              :to="getCarRoute(m)"
            >{{ m }}</router-link>
            <span v-else class="model-name">{{ m }}</span>
          </li>
      </ul>
    </section>

    <!-- 右侧：核心技术 (70%) -->
    <section class="brand-section col-right" v-if="brandInfo && brandInfo.technology && brandInfo.technology.length">
      <h3 class="section-title">
        <img src="@/assets/images/核心技术.svg" class="icon" alt="核心技术" /> 核心技术
      </h3>
      <div class="tech-cards-wrapper">
        <div v-for="(tech, index) in brandInfo.technology" :key="index" class="tech-card">
          <h4 class="tech-header">{{ tech.title }}</h4>
          <div class="tech-body">{{ tech.content }}</div>
        </div>
      </div>
    </section>
    
    <div v-if="!brandInfo && brandModels.length === 0" class="empty-state span-full">
      暂无该品牌相关信息
    </div>
  </div>
</template>

<script>
import cars from '@/data/car/cars.json'
import brandDetails from '@/data/car/brandDetails.json'
import mermaid from 'mermaid'

function getBrand (title) {
  if (!title) return '未知'
  const parts = String(title).split(' ')
  return parts[0]
}

export default {
  name: 'BrandDetail',
  computed: {
    brandName () {
      return this.$route.params.name
    },
    brandModels () {
      return cars.filter(c => getBrand(c.title) === this.brandName)
    },
    currentLineupCategories () {
      if (this.brandInfo && this.brandInfo.current_lineup && this.brandInfo.current_lineup.categories) {
        const cats = this.brandInfo.current_lineup.categories
        return Object.keys(cats).map(key => ({
          key,
          name: cats[key].category_name,
          nameEn: cats[key].category_name_en,
          models: cats[key].models || []
        }))
      }
      return []
    },
    filteredBrandModels () {
      // 不再将 cars.json 的数据追加到经典车型列表中
      return []
    },
    brandInfo () {
      return brandDetails[this.brandName] || null
    },
    brandLogoFor () {
      const name = this.brandName
      if (!name) return ''
      if (this.brandLogoMap && this.brandLogoMap[name]) return this.brandLogoMap[name]
      return ''
    },
    representativeModelNames () {
      if (this.brandInfo && !Array.isArray(this.brandInfo.models) && typeof this.brandInfo.models === 'object') {
        return []
      }
      const listFromDetails = (this.brandInfo && Array.isArray(this.brandInfo.models)) ? this.brandInfo.models : []
      const listFromCars = this.brandModels.map(c => this.modelNameOf(c))
      const merged = [...listFromDetails, ...listFromCars]
      const dedup = Array.from(new Set(merged.filter(Boolean)))
      return dedup
    },
    representativeModelCategories () {
      if (this.brandInfo && !Array.isArray(this.brandInfo.models) && typeof this.brandInfo.models === 'object') {
        return this.brandInfo.models
      }
      return null
    }
  },
  data () {
    return {
      brandLogoMap: {},
      showScrollButtons: false
    }
  },
  mounted () {
    this.checkScroll()
    window.addEventListener('resize', this.checkScroll)
    this.renderMermaid()
  },
  updated () {
    this.renderMermaid()
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.checkScroll)
  },
  methods: {
    renderMermaid () {
      this.$nextTick(() => {
        if (this.$refs.mermaidDiagram) {
          try {
            // 确保每次重新渲染前清理旧的内容和属性
            this.$refs.mermaidDiagram.removeAttribute('data-processed')
            this.$refs.mermaidDiagram.innerHTML = this.generateMermaidCode(this.brandInfo)
            
            mermaid.initialize({
              startOnLoad: false,
              theme: 'dark',
              themeVariables: {
                primaryColor: '#1F2631',
                primaryTextColor: '#E2E8F0',
                primaryBorderColor: '#3A4A6B',
                lineColor: '#4A5568',
                secondaryColor: '#151A23',
                tertiaryColor: '#1A202C',
                fontSize: '13px',
                fontFamily: "'AlibabaPuHuiTi', 'Motiva Sans', sans-serif"
              },
              flowchart: {
                curve: 'basis',
                padding: 10,
                nodeSpacing: 15,
                rankSpacing: 35,
                htmlLabels: true
              },
              mindmap: {
                padding: 20
              }
            })
            mermaid.init(undefined, this.$refs.mermaidDiagram)
          } catch (e) {
            console.error('Mermaid render error:', e)
          }
        }
      })
    },
    generateMermaidCode (brandInfo) {
      if (!brandInfo) return ''
      
      // 如果直接存在 mermaid 属性，说明是预先手写的代码，直接返回并添加自定义样式
      if (brandInfo.mermaid) {
        if (Array.isArray(brandInfo.mermaid)) {
          return brandInfo.mermaid.join('\n')
        }
        return brandInfo.mermaid
      }

      if (!brandInfo.sub_brands || !brandInfo.sub_brands.list) return ''
      
      const parentBrand = this.brandName
      const rootTitle = brandInfo.sub_brands.title || `  ${parentBrand} 品牌架构  `
      
      // 强制设置为纵向绘制：Top to Down
      let code = 'graph TD\n'
      // 给品牌名字两边加上适当的不可见空格来确保框能撑开
      code += `  Root["${rootTitle}"]\n`
      
      const groupMap = new Map()
      let groupCounter = 0
      
      brandInfo.sub_brands.list.forEach((subBrand, index) => {
        const brandId = `SubBrand${index}`
        
        let parentNode = 'Root'
        if (subBrand.brand_group) {
          if (!groupMap.has(subBrand.brand_group)) {
            const groupId = 'Group_' + groupCounter++
            code += `  Root --> ${groupId}["  ${subBrand.brand_group}  "]\n`
            code += `  class ${groupId} groupNode;\n`
            groupMap.set(subBrand.brand_group, groupId)
          }
          parentNode = groupMap.get(subBrand.brand_group)
        }
        
        // Connect parent to each brand
        const posText = subBrand.positioning ? `<br/>${subBrand.positioning}` : ''
        code += `  ${parentNode} --> ${brandId}["  ${subBrand.brand_name_zh} (${subBrand.brand_name})${posText}  "]\n`
        
        // Add performance division if exists
        if (subBrand.performance_division) {
          const perfId = `${brandId}_Perf`
          // 使用HTML换行或空格来防止文本过长撑破
          const safeDesc = subBrand.performance_division.description ? subBrand.performance_division.description.replace(/(.{10})/g, '$1<br/>') : ''
          code += `  ${brandId} -.-> ${perfId}["${subBrand.performance_division.name}<br/>${safeDesc}"]\n`
          
          if (subBrand.performance_division.models && subBrand.performance_division.models.length > 0) {
            subBrand.performance_division.models.forEach((model, mIndex) => {
              const modelId = `${perfId}_Model${mIndex}`
              code += `  ${perfId} --- ${modelId}("  ${model}  ")\n`
              code += `  class ${modelId} model;\n`
            })
          }
        }
        
        // Add current models
        if (subBrand.current_models && subBrand.current_models.length > 0) {
          subBrand.current_models.forEach((model, mIndex) => {
            const modelId = `${brandId}_Model_${mIndex}`
            // 用更宽的空格或换行来防止文本超出（mermaid 支持使用 <br> 换行，或者直接靠 CSS 调整）
            // 但最可靠的是限制文字长度或让 mermaid 自动适应
            code += `  ${brandId} --- ${modelId}("  ${model}  ")\n`
            code += `  class ${modelId} model;\n`
          })
        }
      })
      
      // Defining styles
      // Root Node (e.g. Volkswagen Group) - Deep distinct blue-grey
      code += `  classDef rootNode fill:#0F172A,stroke:#38BDF8,stroke-width:2px,color:#F8FAFC,font-weight:bold,font-size:16px,rx:8,ry:8,padding:24px;\n`
      // Group Node (e.g. Core Brand Group) - Indigo/purple tint
      code += `  classDef groupNode fill:#312E81,stroke:#6366F1,stroke-width:2px,color:#E0E7FF,font-weight:bold,font-size:14px,rx:6,ry:6,padding:18px;\n`
      // Brand Node (e.g. Audi, Porsche) - Teal/Cyan tint
      code += `  classDef subBrand fill:#134E4A,stroke:#2DD4BF,stroke-width:2px,color:#CCFBF1,font-weight:bold,font-size:13px,rx:4,ry:4,padding:16px;\n`
      // Performance Division (e.g. VW R) - Red tint
      code += `  classDef perf fill:#450A0A,stroke:#F87171,stroke-width:1px,stroke-dasharray: 4 4,color:#FECACA,font-size:12px,rx:4,ry:4,padding:12px;\n`
      // Models Label (e.g. "主要车型") - Slate dark
      code += `  classDef group fill:#1E293B,stroke:#475569,stroke-width:1px,color:#94A3B8,font-size:12px,rx:4,ry:4,padding:12px;\n`
      // Individual Model (e.g. Golf, Q5L) - Slate light
      code += `  classDef model fill:#334155,stroke:#64748B,stroke-width:1px,color:#F1F5F9,font-size:12px,rx:10,ry:10,padding:12px;\n`
      
      code += `  class Root rootNode;\n`
      
      brandInfo.sub_brands.list.forEach((subBrand, index) => {
        const brandId = `SubBrand${index}`
        code += `  class ${brandId} subBrand;\n`
        if (subBrand.performance_division) {
          code += `  class ${brandId}_Perf perf;\n`
        }
      })
      
      return code
    },
    checkScroll () {
      this.$nextTick(() => {
        const el = this.$refs.cardsScroll
        if (el) {
          this.showScrollButtons = el.scrollWidth > el.clientWidth
        }
      })
    },
    scrollCards (direction) {
      const el = this.$refs.cardsScroll
      if (el) {
        const cardWidth = 240 // 更新为新的卡片宽度
        const gap = 20 // 间距
        const scrollAmount = (cardWidth + gap) * 2 // 每次滑动两张卡片
        
        el.scrollBy({
          left: direction === 'left' ? -scrollAmount : scrollAmount,
          behavior: 'smooth'
        })
      }
    },
    getDisplayName (car) {
      if (car.model_name_zh && car.model_name && car.model_name_zh !== car.model_name) {
        return `${car.model_name_zh} / ${car.model_name}`
      }
      return car.model_name_zh || car.model_name
    },
    modelNameOf (car) {
      const t = car && car.title ? String(car.title) : ''
      const b = car.brand || getBrand(t)
      if (b && t.startsWith(b)) return t.slice(b.length).trim()
      return t
    },
    getCarMatch (name) {
      const brand = this.brandName
      if (!name || !brand) return null
      
      for (const c of cars) {
        // 使用 c.brand 优先判断品牌，如果不存在再回退到根据 title 解析
        const b = c.brand || getBrand(c.title)
        if (b === brand) {
          const model = this.modelNameOf(c)
          if (model === name) {
            return { id: c.id, isSpecial: false }
          }
          if (c.specialEdition) {
            const specBrand = c.specialEdition.brand || b
            if (specBrand === brand) {
              const specModel = this.modelNameOf(c.specialEdition)
              if (specModel === name) {
                return { id: c.id, isSpecial: true }
              }
            }
          }
        }
      }
      return null
    },
    carIdOfModelName (name) {
      const match = this.getCarMatch(name)
      return match ? match.id : null
    },
    getCarRoute (name) {
      const match = this.getCarMatch(name)
      if (match) {
        return { name: match.isSpecial ? 'SpecialCarDetail' : 'CarDetail', params: { id: match.id } }
      }
      return null
    },
    getCarCover (car) {
      // 1. 如果 JSON 中明确配了 cover，优先使用
      if (car.cover) return car.cover
      
      // 2. 如果未配 cover，判断是否被收录在 cars.json，使用最后一张图作为封面
      const match = this.getCarMatch(car.model_name) || this.getCarMatch(car.model_name_zh)
      if (match) {
        const matchedCar = cars.find(c => c.id === match.id)
        if (matchedCar) {
          if (match.isSpecial && matchedCar.specialEdition && matchedCar.specialEdition.images && matchedCar.specialEdition.images.length > 0) {
            return matchedCar.specialEdition.images[matchedCar.specialEdition.images.length - 1]
          } else if (!match.isSpecial && matchedCar.images && matchedCar.images.length > 0) {
            return matchedCar.images[matchedCar.images.length - 1]
          }
        }
      }
      return null
    },
    handleClassicCardClick (car) {
      const route = this.getCarRoute(car.model_name) || this.getCarRoute(car.model_name_zh)
      if (route) {
        this.$router.push(route)
      }
    }
  },
  created () {
    import('@/data/car/brandDetails.json').then(mod => { 
      const details = mod.default
      const map = {}
      for (const brand in details) {
        if (details[brand].brandLogo) {
          map[brand] = details[brand].brandLogo
        }
      }
      this.brandLogoMap = map
    })
  }
}
</script>

<style scoped>

@font-face {
  font-family: 'Motiva Sans';
  src: url('~@/assets/fonts/MotivaSans-Regular_woff.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'AlibabaPuHuiTi';
  src: url('~@/assets/fonts/AlibabaPuHuiTi-3-65-Medium.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'SarasaMonoSC';
  src: url('~@/assets/fonts/sarasa-mono-sc-nerd-regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

h2, h3, h4 {
  font-family: 'AlibabaPuHuiTi', 'Motiva Sans', sans-serif;
}

.page-brand-detail {
  padding-top: 20px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
  padding-left: 20px;
  padding-right: 20px;
  /* Layout: Grid for 2-column support */
  display: grid;
  grid-template-columns: 1fr 1fr; /* 修改为各占一半宽度 (50% 50%) */
  column-gap: 40px;
  align-items: start;
}

.span-full {
  grid-column: 1 / -1;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title-with-logo {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  --brand-title-size: 28px;
  height: var(--brand-title-size);
}

.section-header h2 {
  color: var(--c-text-title);
  font-weight: 500;
  letter-spacing: 2px;
  font-size: var(--brand-title-size);
  line-height: 1; /* 强制行高与字体大小一致，消除上下留白 */
  font-family: 'AlibabaPuHuiTi', 'Motiva Sans', sans-serif;
  margin: 0;
  display: flex;
  align-items: center; /* 确保品牌标题与LOGO在交叉轴上居中对齐 */
}

.brand-logo {
  height: var(--brand-title-size);
  width: auto;
  max-width: calc(var(--brand-title-size) * 2.5); /* 防止长条形LOGO占据过多空间 */
  object-fit: contain;
  border-radius: 4px;
  background: transparent;
  display: block; /* 消除 img 底部默认空白间隙 */
}

.divider {
  height: 2px;
  background: var(--c-border-strong);
  margin: 10px 0 30px 0;
}

.brand-section {
  margin-bottom: 40px;
}

.section-title {
  color: var(--c-text-title);
  font-size: 20px;
  font-weight: 500;
  font-family: 'AlibabaPuHuiTi', 'Motiva Sans', sans-serif;
  margin-top: 30px;
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 10px;
  display: flex;
  align-items: center;
}

.section-title .icon {
  margin-right: 10px;
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.wiki-box {
  margin: 0 0 30px 0;
  padding: 24px 100px;
  background: linear-gradient(135deg, var(--c-bg-l3) 0%, transparent 100%);
  border-left: 4px solid var(--c-border-hover);
  border-radius: 0;
  color: var(--c-text-body-alt);
  position: relative;
  box-shadow: 0 4px 12px var(--c-shadow-light);
  overflow: hidden;
  z-index: 1;
}

.wiki-box::before {
  content: '“';
  position: absolute;
  top: -10px;
  left: 10px;
  font-size: 100px;
  color: var(--c-border-default);
  font-family: Georgia, serif;
  line-height: 1;
  z-index: -1;
  pointer-events: none;
}

.wiki-box::after {
  content: '”';
  position: absolute;
  bottom: -50px;
  right: 10px;
  font-size: 100px;
  color: var(--c-border-default);
  font-family: Georgia, serif;
  line-height: 1;
  z-index: -1;
  pointer-events: none;
}

.wiki-box p {
  margin: 0;
  line-height: 1.8;
  font-size: 16px;
  font-style: italic;
  color: var(--c-text-title);
  letter-spacing: 0.5px;
}

.history-text {
  color: var(--c-text-muted);
  line-height: 1.8;
  font-size: 15px;
  text-indent: 2em;
}

.tech-card {
  flex: 0 0 calc(50% - 10px); /* 减去 gap 的一半 */
  max-width: calc(50% - 10px); /* 严格限制最大宽度，防止被内部长文本撑开 */
  min-width: 0; /* 允许 flex 子元素收缩小于内容宽度，解决省略号失效问题 */
  box-sizing: border-box;
  background: #16191C;
  border-radius: 8px;
  padding: 8px;
  border: 1px solid var(--c-border-default);
  box-shadow: 0 4px 12px var(--c-shadow-light);
}

.tech-header {
  color: var(--c-text-title);
  font-weight: 500;
  font-family: 'AlibabaPuHuiTi', 'Motiva Sans', sans-serif;
  font-size: 18px;
  margin: 0 0 12px 0;
  display: inline-block;
  position: relative;
  z-index: 1;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tech-header::after {
  content: '';
  position: absolute;
  bottom: 2px;
  left: 0;
  width: 100%;
  height: 8px;
  background: #486A9D;
  z-index: -1;
  border-radius: 2px;
}

.tech-body {
  color: var(--c-text-muted);
  font-size: 14px;
  line-height: 1.6;
}

.empty-state {
  color: var(--c-text-muted);
  text-align: center;
  padding: 40px;
}

/* 仅显示车型名称的列表样式 */
.lineup-category {
  margin-bottom: 32px;
}
.lineup-cat-title {
  color: var(--c-text-title);
  font-size: 16px; /* 加大一号 */
  font-weight: 500;
  margin: 0 0 8px 0; /* 保持不变 */
  padding-bottom: 4px; /* 保持不变 */
  border-bottom: 1px dashed rgba(255, 255, 255, 0.2);
  font-family: 'AlibabaPuHuiTi', 'Motiva Sans', sans-serif;
  display: flex;
  align-items: baseline;
  gap: 6px;
}
.lineup-cat-en {
  font-size: 13px; /* 加大一号 */
  color: var(--c-text-muted);
  font-weight: 400;
  font-family: 'Motiva Sans', sans-serif;
}

.models-list {
  list-style: disc;
  margin: 0;
  padding-left: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px 24px;
}
.model-item { line-height: 1.5; margin: 2px 0; font-size: 15px; } /* 加大字体一号 */
.model-link {
  color: var(--c-primary);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-weight: 500;
  transition: all 0.2s ease;
}
.model-link::after {
  content: "➜";
  font-size: 10px;
  opacity: 0.6;
  transform: translateX(0);
  transition: all 0.2s ease;
}
.model-link:hover { 
  color: var(--c-text-title); 
  text-decoration: none; 
  background: var(--c-primary-alpha-10);
  padding: 0 4px;
  margin: 0 -4px;
  border-radius: 4px;
}
.model-link:hover::after {
  opacity: 1;
  transform: translateX(2px);
  color: var(--c-primary);
}
.model-name {
  color: var(--c-text-muted);
}

.col-left {
  grid-column: 1;
  min-width: 0;
}
.col-right {
  grid-column: 2;
  min-width: 0;
}

.col-right .section-title {
  margin-bottom: 20px;
}

.tech-cards-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.sub-section-title {
  color: var(--c-text-title);
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 6px;
  font-family: 'AlibabaPuHuiTi', 'Motiva Sans', sans-serif;
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.sub-title-desc {
  font-size: 13px;
  color: var(--c-text-muted);
  font-weight: 400;
  font-family: 'Motiva Sans', sans-serif;
}

/* 品牌架构模块 */
.brand-architecture-module {
  margin-top: 30px;
  margin-bottom: 20px;
}

.mermaid-container {
  background: #141414; /* 纯深灰/炭黑背景 */
  border: 1px solid #2C2C2C;
  border-radius: 12px;
  padding: 20px; /* 增加一点内边距让图表不那么拥挤 */
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.6), 0 4px 12px var(--c-shadow-light); /* 添加内阴影增强纵深感 */
  overflow-x: auto;
  display: block; /* 取消 flex 居中，允许自然溢出滚动 */
  -webkit-overflow-scrolling: touch;
}

.mermaid-container::-webkit-scrollbar {
  height: 8px;
  display: block;
}

.mermaid-container::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
}

.mermaid-container::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}

.mermaid-container::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}

.mermaid {
  background: transparent;
  display: flex;
  justify-content: center;
  min-width: 100%;
  width: max-content;
  margin: 0;
}

.mermaid ::v-deep svg {
  max-width: none !important;
  width: auto !important;
  height: 100% !important;
}

/* 经典车型模块 */
.classic-models-module {
  margin: 8px 0;
  background: #1F2631;
  padding: 8px 16px;
  border-radius: 12px;
  box-shadow: 0 2px 8px var(--c-shadow-light);
}

.classic-cards-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.scroll-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--c-bg-l2);
  border: 1px solid #666; /* 默认灰色边框 */
  color: var(--c-text-title);
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transition: all 0.2s ease;
  line-height: 1;
  padding-bottom: 4px; /* Adjust optical center of arrow character */
}

.scroll-btn:hover {
  background: #888; /* hover亮灰色填充 */
  color: #fff;
  border-color: #888;
  box-shadow: 0 6px 16px rgba(0,0,0,0.2);
}

.scroll-btn.left {
  left: -20px;
}

.scroll-btn.right {
  right: -20px;
}

.classic-cards-scroll {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding-bottom: 4px; /* Reduced padding */
  scrollbar-width: none; /* Hide scrollbar for a cleaner look with buttons */
  -ms-overflow-style: none;
  scroll-behavior: smooth;
  width: 100%;
}

.classic-cards-scroll::-webkit-scrollbar {
  display: none;
}

.classic-card {
  flex: 0 0 auto;
  width: 240px; /* Reduced width */
  height: 140px; /* Reduced height */
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  box-shadow: 0 4px 12px var(--c-shadow-light);
  border: 1px solid var(--c-border-default);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  background: var(--c-bg-l1);
}

.classic-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px var(--c-shadow-medium);
  border-color: var(--c-border-hover);
}

.classic-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.placeholder-bg {
  background: linear-gradient(135deg, var(--c-primary-alpha-10) 0%, var(--c-bg-l2) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.placeholder-text {
  font-size: 24px;
  font-weight: 700;
  color: var(--c-text-muted);
  opacity: 0.5;
  font-family: 'Motiva Sans', sans-serif;
  letter-spacing: 2px;
}

.classic-card:hover .classic-img {
  transform: scale(1.05);
}

.classic-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6); /* 加深一点背景 */
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  opacity: 0;
  transition: opacity 0.3s ease;
  padding: 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  z-index: 2;
  overflow-y: auto; /* 允许在hover状态下垂直滚动 */
  scrollbar-width: thin;
}

.classic-overlay::-webkit-scrollbar {
  width: 4px;
}
.classic-overlay::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
}

.classic-card:hover .classic-overlay {
  opacity: 1;
}

.classic-overlay-name {
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
  font-family: 'AlibabaPuHuiTi', 'Motiva Sans', sans-serif;
  flex-shrink: 0; /* 确保标题不会被压缩 */
}

.classic-overlay-intro {
  color: rgba(255, 255, 255, 0.9);
  font-size: 13px;
  line-height: 1.5;
  /* 移除溢出隐藏，允许完整显示 */
}

.intro-line {
  margin: 0 0 4px 0;
  /* 移除行数限制，允许换行显示完整信息 */
}
.intro-line:last-child {
  margin-bottom: 0;
}
.intro-line strong {
  color: var(--c-primary);
  font-weight: 500;
  margin-right: 4px;
}

.classic-name-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 12px 16px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.4) 60%, transparent 100%);
  color: #fff;
  font-size: 15px;
  font-weight: 500;
  transition: opacity 0.3s ease;
  z-index: 1;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.8);
}

.classic-card:hover .classic-name-bottom {
  opacity: 0;
}

.status-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  z-index: 1; /* 降低层级，使其在hover（z-index: 2）的下层 */
  border: 1px solid rgba(255,255,255,0.1);
}

@media (max-width: 480px) {
  .page-brand-detail {
    display: flex;
    flex-direction: column;
    padding-left: 12px;
    padding-right: 12px;
    padding-top: 12px;
    width: 100%;
    max-width: 100vw;
    box-sizing: border-box;
    overflow-x: hidden;
  }
  .span-full, .col-left, .col-right {
    width: 100%;
    min-width: 0;
    box-sizing: border-box;
  }
  .section-header {
    align-items: flex-start;
    gap: 10px;
  }
  .title-with-logo {
    min-width: 0;
    --brand-title-size: 22px;
  }
  .section-header h2 {
    letter-spacing: 1px;
    line-height: 1.25;
    word-break: break-word;
  }
  .back-btn {
    flex-shrink: 0;
    padding: 6px 10px;
  }
  .divider {
    margin: 8px 0 18px 0;
  }
  .brand-section {
    margin-bottom: 24px;
  }
  .section-title {
    font-size: 18px;
    margin-bottom: 14px;
    padding-bottom: 8px;
  }
  .sub-section-title {
    font-size: 16px;
  }
  .history-text {
    font-size: 14px;
    line-height: 1.7;
    text-indent: 1.5em;
  }
  .col-left {
    order: 2;
  }
  .col-right {
    order: 1;
  }
  .empty-state {
    order: 3;
    width: 100%;
  }
  .tech-cards-wrapper {
    display: flex;
    overflow-x: auto;
    gap: 12px;
    padding-bottom: 8px;
    scrollbar-width: none;
    -ms-overflow-style: none;
    scroll-behavior: smooth;
  }
  .tech-cards-wrapper::-webkit-scrollbar {
    display: none;
  }
  .tech-card {
    padding: 12px;
    flex: 0 0 auto;
    width: 76vw;
    max-width: 280px;
    min-width: 240px;
  }
  .tech-header {
    font-size: 16px;
    margin: 0 0 10px 0;
  }
  .tech-body {
    font-size: 13px;
    line-height: 1.65;
  }
  .models-list {
    grid-template-columns: repeat(3, 1fr);
    gap: 12px 16px;
    padding-left: 20px; /* 恢复适当的左侧缩进，确保列表圆点和文字不超出边界 */
  }
  .model-item {
    line-height: 1.6;
    font-size: 14px;
  }
  .lineup-category {
    margin-bottom: 24px;
  }
  .lineup-cat-title {
    font-size: 15px;
    margin-bottom: 6px;
  }
  .lineup-cat-en {
    font-size: 12px;
  }
  .wiki-box {
    padding: 24px 20px;
    margin: 0 0 20px 0;
  }
  .wiki-box::before {
    font-size: 60px;
    top: -5px;
    left: 5px;
  }
  .wiki-box::after {
    font-size: 60px;
    bottom: -30px;
    right: 5px;
  }
  .wiki-box p {
    font-size: 14px;
    line-height: 1.7;
  }
  .classic-models-module {
    padding: 10px 10px;
    border-radius: 10px;
  }
  .classic-cards-wrapper {
    display: block;
  }
  .scroll-btn {
    display: none;
  }
  .classic-cards-scroll {
    gap: 12px;
    padding: 2px 2px 8px 2px;
  }
  .classic-card {
    width: 76vw;
    max-width: 280px;
    min-width: 220px;
    height: 132px;
  }
  .classic-overlay {
    opacity: 1;
    padding: 10px;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.7));
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
  .classic-overlay-name {
    font-size: 14px;
    margin-bottom: 4px;
  }
  .classic-overlay-intro {
    font-size: 12px;
    line-height: 1.4;
  }
  .classic-name-bottom {
    opacity: 0;
  }
  .status-badge {
    font-size: 11px;
    padding: 3px 6px;
  }
  /* 移动端下的品牌架构图容器样式调整 */
  .mermaid-container {
    padding: 6px; /* 减小内边距，给图表留出更多水平展示空间 */
    border-radius: 10px; /* 稍微减小圆角以适应更紧凑的屏幕 */
  }
  
  /* 移动端下 Mermaid SVG 的包裹层样式 */
  .mermaid {
    min-width: 100%; /* 确保在小屏幕下占满容器宽度 */
    margin: 0; /* 移除外边距，让内部的 scroll 机制处理溢出 */
  }
}

@media (max-width: 360px) {
  .page-brand-detail {
    padding-left: 8px;
    padding-right: 8px;
    padding-top: 10px;
  }
  .section-header h2 {
    font-size: 20px;
  }
  .back-btn {
    padding: 5px 8px;
  }
  .wiki-box {
    padding: 18px 14px;
  }
  .wiki-box p {
    font-size: 13px;
  }
  .history-text {
    font-size: 13px;
    text-indent: 1.2em;
  }
  .classic-card {
    width: 82vw;
    min-width: 200px;
    height: 124px;
  }
  .tech-card {
    width: 82vw;
    min-width: 200px;
  }
  .models-list {
    padding-left: 14px;
  }
}
</style>
