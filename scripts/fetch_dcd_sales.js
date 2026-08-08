// 从懂车帝接口抓取"近半年汽车销量榜"前 50 名，输出 JSON 供页面图表使用。
// 数据页面: https://www.dongchedi.com/sales/sale-x-500-x-x-x-x
// 接口说明: rank_data 的 month 参数为 YYYYMM（单月）或特殊值 500（近半年）/ 1000（近一年），
//          500 即数据页面 URL 中 sale-x-500-x-x-x-x 的第三个段位。
// 用法: npm run fetch:dcd-sales

const fs = require('fs')
const path = require('path')

const API_URL = 'https://www.dongchedi.com/motor/pc/car/rank_data?aid=1839&app_name=auto_web_pc&count=50&rank_data_type=11&month=500'
const OUT_PATH = path.resolve(__dirname, '../src/data/car/dcd_half_year_top50.json')

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36',
  Accept: 'application/json'
}

async function main () {
  const res = await fetch(API_URL, { headers: HEADERS })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const json = await res.json()
  if (json.status !== 0 || !json.data || !Array.isArray(json.data.list)) {
    throw new Error(`接口返回异常: ${json.message || 'unknown'}`)
  }

  const items = json.data.list.slice(0, 50).map(it => ({
    rank: it.rank,
    seriesName: it.series_name,
    sales: it.count,
    brand: it.brand_name,
    manufacturer: it.sub_brand_name,
    priceRange: it.price,
    // 上一统计周期排名；0 表示新上榜
    lastRank: it.last_rank > 0 ? it.last_rank : null,
    seriesId: it.series_id
  }))

  const payload = {
    title: '近半年汽车销量榜',
    source: 'https://www.dongchedi.com/sales/sale-x-500-x-x-x-x',
    updatedAt: new Date().toISOString().slice(0, 10),
    items
  }

  fs.writeFileSync(OUT_PATH, JSON.stringify(payload, null, 2) + '\n')
  console.log(`已抓取 ${items.length} 条 -> ${path.relative(process.cwd(), OUT_PATH)}`)
}

main().catch(err => {
  console.error('抓取失败:', err.message)
  process.exit(1)
})
