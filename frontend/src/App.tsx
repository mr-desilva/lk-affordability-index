import { useEffect, useMemo, useState } from 'react'
import './App.css'

type EraRecord = {
  eraId: string
  eraLabel: string
  surveyYear: string
  eraYear: number
  meanIncome: number
  medianIncome: number
  meanExpenditure: number
  householdSize: number
  foodRatio: number
  inflationIndex: number
  ccpiAnnualPct: number | null
  exchangeRate: number
  source: string
}

type SeriesRecord = {
  year: number
  ccpiAnnualPct: number | null
  inflationIndex: number
  exchangeRate: number
}

type EraMetric = EraRecord & {
  inflationAdjusted: number
  exchangeAdjusted: number
  selectedSalary: number
  basicGap: number
  comfortGap: number
  affordabilityRatio: number
  usdEquivalent: number
  isEstimate: boolean
}

type CsvRow = Record<string, string>

const currencyFormatter = new Intl.NumberFormat('en-LK', {
  style: 'currency',
  currency: 'LKR',
  maximumFractionDigits: 0,
})
const usdFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})
const ratioFormatter = new Intl.NumberFormat('en-LK', {
  maximumFractionDigits: 2,
})

const toNumber = (value: string | undefined, fallback = 0): number => {
  if (!value) return fallback
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

const parseCsv = (text: string): CsvRow[] => {
  const rows: string[][] = []
  let current = ''
  let row: string[] = []
  let inQuotes = false
  const normalized = text.replace(/\r\n/g, '\n').trim()

  for (let i = 0; i < normalized.length; i += 1) {
    const char = normalized[i]
    const next = normalized[i + 1]

    if (char === '"' && next === '"') {
      current += '"'
      i += 1
      continue
    }

    if (char === '"') {
      inQuotes = !inQuotes
      continue
    }

    if (char === ',' && !inQuotes) {
      row.push(current)
      current = ''
      continue
    }

    if (char === '\n' && !inQuotes) {
      row.push(current)
      rows.push(row)
      row = []
      current = ''
      continue
    }

    current += char
  }

  if (current.length > 0 || row.length > 0) {
    row.push(current)
    rows.push(row)
  }

  const [headers, ...data] = rows
  if (!headers) return []
  return data
    .filter((values) => values.some((entry) => entry.trim().length > 0))
    .map((values) => {
      const record: CsvRow = {}
      headers.forEach((header, index) => {
        record[header] = values[index] ?? ''
      })
      return record
    })
}

const mapEraRecord = (row: CsvRow): EraRecord => ({
  eraId: row.era_id,
  eraLabel: row.era_label,
  surveyYear: row.survey_year,
  eraYear: toNumber(row.era_year),
  meanIncome: toNumber(row.mean_income_monthly_lkr),
  medianIncome: toNumber(row.median_income_monthly_lkr),
  meanExpenditure: toNumber(row.mean_expenditure_monthly_lkr),
  householdSize: toNumber(row.household_size),
  foodRatio: toNumber(row.food_ratio_pct),
  inflationIndex: toNumber(row.inflation_index_2003_base, 1),
  ccpiAnnualPct: row.ccpi_annual_avg_pct ? toNumber(row.ccpi_annual_avg_pct) : null,
  exchangeRate: toNumber(row.exchange_rate_lkr_usd, 1),
  source: row.source,
})

const mapSeriesRecord = (row: CsvRow): SeriesRecord => ({
  year: toNumber(row.year),
  ccpiAnnualPct: row.ccpi_annual_avg_pct ? toNumber(row.ccpi_annual_avg_pct) : null,
  inflationIndex: toNumber(row.inflation_index_2003_base, 1),
  exchangeRate: toNumber(row.exchange_rate_lkr_usd, 1),
})

const formatLkr = (value: number) => currencyFormatter.format(Math.round(value))
const formatUsd = (value: number) => usdFormatter.format(Math.round(value))

const DEFAULT_SALARY = 150000
const BASE_YEAR = 2024

function App() {
  const [salary, setSalary] = useState(DEFAULT_SALARY)
  const [adjustmentMode, setAdjustmentMode] = useState<'inflation' | 'exchange'>(
    'inflation',
  )
  const [eras, setEras] = useState<EraRecord[]>([])
  const [series, setSeries] = useState<SeriesRecord[]>([])
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>(
    'idle',
  )

  useEffect(() => {
    const loadData = async () => {
      setStatus('loading')
      try {
        const [erasResponse, seriesResponse] = await Promise.all([
          fetch('/derived/era_affordability.csv'),
          fetch('/derived/inflation_exchange_series.csv'),
        ])

        const [erasText, seriesText] = await Promise.all([
          erasResponse.text(),
          seriesResponse.text(),
        ])

        setEras(parseCsv(erasText).map(mapEraRecord))
        setSeries(parseCsv(seriesText).map(mapSeriesRecord))
        setStatus('ready')
      } catch (error) {
        console.error(error)
        setStatus('error')
      }
    }

    loadData()
  }, [])

  const baseSeries = useMemo(() => {
    if (!series.length) return null
    return (
      series.find((item) => item.year === BASE_YEAR) ??
      series[series.length - 1]
    )
  }, [series])

  const baseInflationIndex = baseSeries?.inflationIndex ?? 1
  const baseExchangeRate = baseSeries?.exchangeRate ?? 1

  const eraMetrics = useMemo<EraMetric[]>(() => {
    return eras.map((era) => {
      const inflationAdjusted = salary * (era.inflationIndex / baseInflationIndex)
      const exchangeAdjusted = salary * (era.exchangeRate / baseExchangeRate)
      const selectedSalary =
        adjustmentMode === 'inflation' ? inflationAdjusted : exchangeAdjusted
      const basicGap = selectedSalary - era.meanExpenditure
      const comfortGap = selectedSalary - era.meanIncome
      const affordabilityRatio =
        era.meanExpenditure > 0 ? selectedSalary / era.meanExpenditure : 0
      const usdEquivalent =
        era.exchangeRate > 0 ? inflationAdjusted / era.exchangeRate : 0

      return {
        ...era,
        inflationAdjusted,
        exchangeAdjusted,
        selectedSalary,
        basicGap,
        comfortGap,
        affordabilityRatio,
        usdEquivalent,
        isEstimate: era.eraId === 'estimate_2024',
      }
    })
  }, [eras, salary, baseInflationIndex, baseExchangeRate, adjustmentMode])

  const affordabilityMax = useMemo(() => {
    return Math.max(
      ...eraMetrics.map((metric) => metric.affordabilityRatio),
      1,
    )
  }, [eraMetrics])

  const latestEra = eraMetrics[eraMetrics.length - 1]

  return (
    <div className="page">
      <header className="hero">
        <div className="hero-copy">
          <p className="eyebrow">LK Affordability Index</p>
          <h1>How far a Sri Lankan salary goes across eras</h1>
          <p className="lead">
            Compare household income and living costs from official HIES surveys
            alongside inflation and rupee depreciation. Adjust a monthly salary
            and see which eras would have felt affordable.
          </p>
        </div>
        <div className="hero-panel">
          <div className="card">
            <h3>Data coverage</h3>
            <p>
              CBSL socio-economic datasets (2002–2024) + derived affordability
              snapshot.
            </p>
            <div className="meta-list">
              <div>
                <span className="meta-label">Latest CPI base</span>
                <span className="meta-value">{BASE_YEAR}</span>
              </div>
              <div>
                <span className="meta-label">Eras covered</span>
                <span className="meta-value">{eras.length}</span>
              </div>
              <div>
                <span className="meta-label">Exchange rate (avg)</span>
                <span className="meta-value">
                  {baseSeries ? formatLkr(baseSeries.exchangeRate) : '—'}
                </span>
              </div>
            </div>
            <p className="helper">
              Housing, land, and vehicle price datasets are pending approvals and
              will be layered into the affordability cards once available.
            </p>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="section-header">
          <h2>Monthly salary simulator</h2>
          <p>
            Adjust the salary and choose whether to interpret affordability
            using inflation-only adjustments or to include rupee depreciation
            (exchange rate).
          </p>
        </div>
        <div className="control-grid">
          <div className="card">
            <label htmlFor="salary-input">Monthly salary (LKR)</label>
            <div className="input-row">
              <span className="input-prefix">LKR</span>
              <input
                id="salary-input"
                type="number"
                min="0"
                step="1000"
                value={salary}
                onChange={(event) => setSalary(Number(event.target.value))}
              />
            </div>
            <p className="helper">
              Default is {formatLkr(DEFAULT_SALARY)}. Salaries are compared
              against average HIES household income and expenditure.
            </p>
          </div>
          <div className="card">
            <fieldset className="toggle-fieldset">
              <legend>Adjustment mode</legend>
              <label className="toggle">
                <input
                  type="radio"
                  name="adjustment"
                  checked={adjustmentMode === 'inflation'}
                  onChange={() => setAdjustmentMode('inflation')}
                />
                <span>Inflation-only (local purchasing power)</span>
              </label>
              <label className="toggle">
                <input
                  type="radio"
                  name="adjustment"
                  checked={adjustmentMode === 'exchange'}
                  onChange={() => setAdjustmentMode('exchange')}
                />
                <span>Include exchange-rate depreciation</span>
              </label>
            </fieldset>
            <p className="helper">
              Exchange-rate adjustment converts your salary to USD (base year)
              and back into the era’s LKR, highlighting imported-cost pressure.
            </p>
          </div>
          <div className="card">
            <h3>Latest era snapshot</h3>
            {latestEra ? (
              <div className="meta-list">
                <div>
                  <span className="meta-label">Era</span>
                  <span className="meta-value">{latestEra.eraLabel}</span>
                </div>
                <div>
                  <span className="meta-label">Mean income</span>
                  <span className="meta-value">
                    {formatLkr(latestEra.meanIncome)}
                  </span>
                </div>
                <div>
                  <span className="meta-label">Mean expenditure</span>
                  <span className="meta-value">
                    {formatLkr(latestEra.meanExpenditure)}
                  </span>
                </div>
              </div>
            ) : (
              <p className="helper">Loading era data…</p>
            )}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Affordability by era</h2>
          <p>
            Compare the adjusted salary against the typical monthly household
            basket and average income in each survey era.
          </p>
        </div>
        {status === 'error' ? (
          <div className="card warning">
            Data failed to load. Verify that the derived CSV files are available
            under <code>data/derived</code>.
          </div>
        ) : (
          <div className="era-grid">
            {eraMetrics.map((era) => (
              <div
                key={era.eraId}
                className={`card era-card ${era.isEstimate ? 'estimate' : ''}`}
              >
                <div className="era-header">
                  <div>
                    <h3>{era.eraLabel}</h3>
                    <p className="muted">
                      Survey year {era.surveyYear} · Household size{' '}
                      {ratioFormatter.format(era.householdSize)}
                    </p>
                  </div>
                  {era.isEstimate && <span className="badge">Estimate</span>}
                </div>
                <div className="metric-grid">
                  <div>
                    <span className="metric-label">Adjusted salary</span>
                    <span className="metric-value">
                      {formatLkr(era.selectedSalary)}
                    </span>
                    <span className="metric-sub">
                      Inflation-adjusted: {formatLkr(era.inflationAdjusted)}
                    </span>
                    <span className="metric-sub">
                      Exchange-adjusted: {formatLkr(era.exchangeAdjusted)}
                    </span>
                  </div>
                  <div>
                    <span className="metric-label">Monthly basket</span>
                    <span className="metric-value">
                      {formatLkr(era.meanExpenditure)}
                    </span>
                    <span className="metric-sub">
                      Food share: {ratioFormatter.format(era.foodRatio)}%
                    </span>
                  </div>
                  <div>
                    <span className="metric-label">Mean income</span>
                    <span className="metric-value">
                      {formatLkr(era.meanIncome)}
                    </span>
                    <span className="metric-sub">
                      Median: {formatLkr(era.medianIncome)}
                    </span>
                  </div>
                  <div>
                    <span className="metric-label">USD equivalent</span>
                    <span className="metric-value">
                      {formatUsd(era.usdEquivalent)}
                    </span>
                    <span className="metric-sub">
                      Avg. FX: {formatLkr(era.exchangeRate)} / USD
                    </span>
                  </div>
                </div>
                <div className="status-row">
                  <span
                    className={`chip ${
                      era.basicGap >= 0 ? 'chip-good' : 'chip-warn'
                    }`}
                  >
                    Basic basket:{' '}
                    {era.basicGap >= 0
                      ? `Affordable (+${formatLkr(era.basicGap)})`
                      : `Short by ${formatLkr(Math.abs(era.basicGap))}`}
                  </span>
                  <span
                    className={`chip ${
                      era.comfortGap >= 0 ? 'chip-good' : 'chip-warn'
                    }`}
                  >
                    Comfortable:{' '}
                    {era.comfortGap >= 0
                      ? `Affordable (+${formatLkr(era.comfortGap)})`
                      : `Short by ${formatLkr(Math.abs(era.comfortGap))}`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Inflation & depreciation trends</h2>
          <p>
            CCPI annual inflation builds the purchasing-power index, while the
            exchange-rate line highlights rupee depreciation against USD.
          </p>
        </div>
        <div className="chart-grid">
          <div className="card chart-card">
            <ChartLegend
              items={[
                { label: 'Inflation index (2003=1)', color: '#f97316' },
                { label: 'Exchange rate (LKR/USD)', color: '#2563eb' },
              ]}
            />
            <LineChart
              data={series}
              inflationColor="#f97316"
              exchangeColor="#2563eb"
            />
          </div>
          <div className="card chart-card">
            <ChartLegend
              items={[
                {
                  label: 'Affordability ratio (salary / basket)',
                  color: '#10b981',
                },
              ]}
            />
            <BarChart data={eraMetrics} maxValue={affordabilityMax} />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Methodology & data notes</h2>
        </div>
        <div className="card">
          <ul className="methodology">
            <li>
              Household income and expenditure come from HIES survey years in
              the CBSL socio-economic data folder.
            </li>
            <li>
              Inflation index is compounded from CCPI annual average inflation
              (CBSL macro indicators). 2024 is estimated by inflating 2019 HIES
              values using CCPI annual averages.
            </li>
            <li>
              Exchange-rate adjustment uses CBSL average LKR/USD to reflect
              depreciation and imported-cost pressure.
            </li>
            <li>
              Source CSVs live in <code>data/derived</code> with citations in
              <code>data/dataset_metadata.csv</code>.
            </li>
          </ul>
        </div>
      </section>
    </div>
  )
}

type ChartLegendProps = {
  items: { label: string; color: string }[]
}

function ChartLegend({ items }: ChartLegendProps) {
  return (
    <div className="chart-legend">
      {items.map((item) => (
        <span key={item.label} className="legend-item">
          <span
            className="legend-dot"
            style={{ backgroundColor: item.color }}
          />
          {item.label}
        </span>
      ))}
    </div>
  )
}

type LineChartProps = {
  data: SeriesRecord[]
  inflationColor: string
  exchangeColor: string
}

function LineChart({ data, inflationColor, exchangeColor }: LineChartProps) {
  if (!data.length) {
    return <p className="helper">Loading chart…</p>
  }

  const width = 560
  const height = 240
  const padding = 32
  const innerWidth = width - padding * 2
  const innerHeight = height - padding * 2

  const inflationValues = data.map((item) => item.inflationIndex)
  const exchangeValues = data.map((item) => item.exchangeRate)
  const maxInflation = Math.max(...inflationValues)
  const maxExchange = Math.max(...exchangeValues)

  const toPoint = (value: number, index: number, maxValue: number) => {
    const x = padding + (innerWidth / (data.length - 1)) * index
    const y =
      padding + innerHeight - (innerHeight * value) / (maxValue || 1)
    return { x, y }
  }

  const inflationPoints = data.map((item, index) =>
    toPoint(item.inflationIndex, index, maxInflation),
  )
  const exchangePoints = data.map((item, index) =>
    toPoint(item.exchangeRate, index, maxExchange),
  )

  const buildPath = (points: { x: number; y: number }[]) =>
    points.map((point, index) => `${index === 0 ? 'M' : 'L'}${point.x},${point.y}`).join(' ')

  return (
    <svg
      className="chart"
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label="Inflation and exchange rate trends"
    >
      <line
        x1={padding}
        x2={width - padding}
        y1={height - padding}
        y2={height - padding}
        className="chart-axis"
      />
      <path d={buildPath(inflationPoints)} className="chart-line" stroke={inflationColor} />
      <path d={buildPath(exchangePoints)} className="chart-line" stroke={exchangeColor} />
      {inflationPoints.map((point, index) => (
        <circle
          key={`inflation-${data[index].year}`}
          cx={point.x}
          cy={point.y}
          r="3.5"
          fill={inflationColor}
        >
          <title>
            {data[index].year} · Inflation index {ratioFormatter.format(data[index].inflationIndex)}
          </title>
        </circle>
      ))}
      {exchangePoints.map((point, index) => (
        <circle
          key={`exchange-${data[index].year}`}
          cx={point.x}
          cy={point.y}
          r="3.5"
          fill={exchangeColor}
        >
          <title>
            {data[index].year} · FX {ratioFormatter.format(data[index].exchangeRate)} LKR/USD
          </title>
        </circle>
      ))}
      <text x={padding} y={height - 10} className="chart-label">
        {data[0].year}
      </text>
      <text x={width - padding - 30} y={height - 10} className="chart-label">
        {data[data.length - 1].year}
      </text>
    </svg>
  )
}

type BarChartProps = {
  data: EraMetric[]
  maxValue: number
}

function BarChart({ data, maxValue }: BarChartProps) {
  if (!data.length) {
    return <p className="helper">Loading chart…</p>
  }

  const width = 560
  const height = 240
  const padding = 32
  const innerHeight = height - padding * 2
  const barWidth = (width - padding * 2) / data.length

  return (
    <svg
      className="chart"
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label="Affordability ratio by era"
    >
      <line
        x1={padding}
        x2={width - padding}
        y1={height - padding}
        y2={height - padding}
        className="chart-axis"
      />
      {data.map((era, index) => {
        const ratio = era.affordabilityRatio
        const barHeight = (ratio / maxValue) * innerHeight
        const x = padding + barWidth * index + barWidth * 0.2
        const y = height - padding - barHeight
        const widthValue = barWidth * 0.6
        return (
          <g key={era.eraId}>
            <rect
              x={x}
              y={y}
              width={widthValue}
              height={barHeight}
              rx="6"
              className="chart-bar"
            >
              <title>
                {era.eraLabel} · {ratioFormatter.format(ratio)}x basket coverage
              </title>
            </rect>
            <text
              x={x + widthValue / 2}
              y={height - 12}
              textAnchor="middle"
              className="chart-label"
            >
              {era.eraYear}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

export default App
