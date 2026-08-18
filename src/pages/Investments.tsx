import { useEffect, useMemo, useState } from 'react'
import { SectionHeading, Disclaimer, SourceBadge } from '../components/Shared'
import { InvestmentCategory, InvestmentItem } from '../types'
import { fetchLiveInvestmentData } from '../utils/investmentApi'
import { INVESTMENT_DISCLAIMER } from '../data/investments'

const categories: (InvestmentCategory | 'All')[] = ['All', 'Mutual Fund', 'SIP', 'Share', 'Bond', 'FD', 'RD']

const riskColor: Record<string, string> = {
  Low: 'bg-teal-light text-teal',
  Moderate: 'bg-gold-light/50 text-gold-dark',
  'Moderately High': 'bg-gold-light/50 text-gold-dark',
  High: 'bg-brick-light text-brick',
  'Very High': 'bg-brick-light text-brick',
}

export default function Investments() {
  const [items, setItems] = useState<InvestmentItem[]>([])
  const [isLive, setIsLive] = useState(false)
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState<InvestmentCategory | 'All'>('All')

  useEffect(() => {
    let mounted = true
    fetchLiveInvestmentData().then((res) => {
      if (!mounted) return
      setItems(res.items)
      setIsLive(res.isLive)
      setLoading(false)
    })
    return () => { mounted = false }
  }, [])

  const filtered = useMemo(() => (category === 'All' ? items : items.filter((i) => i.category === category)), [items, category])

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
      <SectionHeading eyebrow="Live investments" title="Mutual funds, SIP, shares, bonds, FD &amp; RD" description="Current value, performance, risk and time horizon for each investment type." />

      <div className={`mt-6 rounded-card border px-4 py-3 flex items-center gap-2.5 text-sm ${isLive ? 'border-teal/30 bg-teal-light text-teal' : 'border-gold/40 bg-gold-light/30 text-gold-dark'}`}>
        <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-teal' : 'bg-gold'}`} />
        {isLive ? 'Showing live data from a connected market-data provider.' : 'Demo/indicative data — no live market-data API is connected in this environment. Figures are for illustration only.'}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              category === c ? 'bg-ink text-paper border-ink' : 'bg-white text-ink/70 border-line hover:border-ink/30'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="mt-10 text-ink/50">Loading…</p>
      ) : (
        <div className="mt-8 grid sm:grid-cols-2 gap-5">
          {filtered.map((item) => (
            <div key={item.id} className="rounded-card border border-line bg-white p-5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-teal">{item.category}</p>
                  <h3 className="font-display font-semibold text-ink mt-0.5">{item.name}</h3>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold whitespace-nowrap ${riskColor[item.risk]}`}>{item.risk} risk</span>
              </div>

              <p className="mt-3 font-mono text-xl font-semibold text-ink tabular">{item.currentValue}</p>

              {(item.performance1Y || item.performance3Y) && (
                <div className="mt-2 flex gap-4 text-sm">
                  {item.performance1Y && <span className="text-ink/60">1Y: <span className="font-mono font-medium text-ink">{item.performance1Y}</span></span>}
                  {item.performance3Y && <span className="text-ink/60">3Y: <span className="font-mono font-medium text-ink">{item.performance3Y}</span></span>}
                </div>
              )}

              <p className="mt-3 text-xs text-ink/45">Time horizon: <span className="font-medium text-ink/70">{item.timeHorizon}</span></p>
              <p className="mt-2 text-sm text-ink/60 leading-relaxed">{item.importantInfo}</p>
              <SourceBadge text={`${item.source} · Updated ${item.lastUpdated}`} />
            </div>
          ))}
        </div>
      )}

      <div className="mt-8">
        <Disclaimer tone="warning">{INVESTMENT_DISCLAIMER}</Disclaimer>
      </div>
    </div>
  )
}
