import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { banks, bankSectors, DATA_DISCLAIMER } from '../data/banks'
import BankCard from '../components/BankCard'
import { SectionHeading, Disclaimer } from '../components/Shared'

type SortKey = 'name' | 'fdRate' | 'minBalance'

export default function BankDirectory() {
  const [query, setQuery] = useState('')
  const [sector, setSector] = useState<string>('All')
  const [zeroBalanceOnly, setZeroBalanceOnly] = useState(false)
  const [sortKey, setSortKey] = useState<SortKey>('name')

  const filtered = useMemo(() => {
    let list = banks.filter((b) => {
      const matchesQuery = (b.name + ' ' + b.shortName).toLowerCase().includes(query.toLowerCase())
      const matchesSector = sector === 'All' || b.sector === sector
      const matchesZero = !zeroBalanceOnly || b.charges.zeroBalanceAvailable
      return matchesQuery && matchesSector && matchesZero
    })

    list = [...list].sort((a, b) => {
      if (sortKey === 'name') return a.name.localeCompare(b.name)
      if (sortKey === 'fdRate') return b.rates.fdGeneralMax - a.rates.fdGeneralMax
      if (sortKey === 'minBalance') return (a.charges.minBalanceMetro ?? 0) - (b.charges.minBalanceMetro ?? 0)
      return 0
    })
    return list
  }, [query, sector, zeroBalanceOnly, sortKey])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
      <SectionHeading eyebrow="Bank directory" title="Every kind of Indian bank, in one directory" description="Search, filter and sort across public, private, foreign, small finance, payments, regional rural and co-operative banks." />

      <div className="mt-4">
        <Disclaimer>{DATA_DISCLAIMER}</Disclaimer>
      </div>

      <div className="mt-8 flex flex-col lg:flex-row gap-4 lg:items-center">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by bank name…"
          className="flex-1 px-4 py-2.5 rounded-md border border-line bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
        />
        <select
          value={sector}
          onChange={(e) => setSector(e.target.value)}
          className="px-4 py-2.5 rounded-md border border-line bg-white text-sm"
        >
          <option value="All">All sectors</option>
          {bankSectors.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <select
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value as SortKey)}
          className="px-4 py-2.5 rounded-md border border-line bg-white text-sm"
        >
          <option value="name">Sort: Name (A–Z)</option>
          <option value="fdRate">Sort: FD rate (high to low)</option>
          <option value="minBalance">Sort: Minimum balance (low to high)</option>
        </select>
        <label className="flex items-center gap-2 text-sm text-ink/70 px-1 whitespace-nowrap">
          <input type="checkbox" checked={zeroBalanceOnly} onChange={(e) => setZeroBalanceOnly(e.target.checked)} className="accent-teal" />
          Zero-balance only
        </label>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <p className="text-sm text-ink/50">{filtered.length} bank{filtered.length !== 1 ? 's' : ''} found</p>
        <Link to="/compare" className="text-sm font-semibold text-teal hover:underline">Compare selected banks →</Link>
      </div>

      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((b) => (
          <BankCard key={b.id} bank={b} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-10 text-center text-ink/50 py-16 border border-dashed border-line rounded-card">
          No banks match your filters. Try widening your search.
        </div>
      )}
    </div>
  )
}
