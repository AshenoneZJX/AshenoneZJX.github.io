const fs = require('fs')
const path = require('path')
const XLSX = require('xlsx')

const xlsxPath = path.resolve(__dirname, '../src/data/2025_dcd_sales_rank.xlsx')
const outPath = path.resolve(__dirname, '../src/data/2025_dcd_sales_rank.json')

function pick(keys, regex, fallbackIdx = 0) {
  return keys.find(k => regex.test(k)) || keys[fallbackIdx]
}

function toNumber(v) {
  if (typeof v === 'number') return v
  const n = Number(String(v).replace(/[,，\s]/g, ''))
  return isNaN(n) ? 0 : n
}

function parse() {
  const buf = fs.readFileSync(xlsxPath)
  const wb = XLSX.read(buf, { type: 'buffer' })
  const sheetName = wb.SheetNames[0]
  const ws = wb.Sheets[sheetName]
  const rows = XLSX.utils.sheet_to_json(ws, { defval: '' })
  const items = rows.map(r => {
    const keys = Object.keys(r)
    const kMonth = pick(keys, /数据月份|月份|Month/i)
    const kRank = pick(keys, /排名|Rank/i)
    const kSeries = pick(keys, /车系名称|车系|Series\s*Name/i)
    const kSeriesId = pick(keys, /车系ID|Series\s*ID|ID/i)
    const kSales = pick(keys, /销量|Sales/i, 1)
    const kMaker = pick(keys, /厂商|Manufacturer/i)
    const kBrand = pick(keys, /品牌|Brand/i)
    const kPrice = pick(keys, /价格区间|Price\s*Range|Price/i)
    const kType = pick(keys, /车系类型|Series\s*Type|Type|类别/i)

    const month = String(r[kMonth]).trim()
    const rank = toNumber(r[kRank])
    const seriesName = String(r[kSeries]).trim()
    const seriesId = String(r[kSeriesId]).trim()
    const sales = toNumber(r[kSales])
    const manufacturer = String(r[kMaker]).trim()
    const brand = String(r[kBrand]).trim()
    const priceRange = String(r[kPrice]).trim()
    const seriesType = String(r[kType]).trim()

    return {
      month,
      rank,
      seriesName,
      seriesId,
      sales,
      manufacturer,
      brand,
      priceRange,
      seriesType,
      modelName: seriesName
    }
  }).filter(i => i.seriesName && i.sales >= 0)
  fs.writeFileSync(outPath, JSON.stringify({ year: 2025, items }, null, 2))
}

parse()
