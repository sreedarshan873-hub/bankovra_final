import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { banks, bankSectors, DATA_DISCLAIMER } from '../data/banks'
import { SectionHeading, Disclaimer } from '../components/Shared'

export default function MinimumBalanceFinder() {
  const [zeroOnly, setZeroOnly] = useState(false)
  const [sector, setSector] = useState('All')
  const [maxBalance, setMaxBalance] = useState(20000)

  const filtered = useMemo(() => {
    return banks
      .filter((b) => (!zeroOnly || b.charges.zeroBalanceAvailable))
      .filter((b) => sector === 'All' || b.sector === sector)
      .filter((b) => (b.charges.minBalanceMetro ?? 0) <= maxBalance)
      .sort((a, b) => (a.charges.minBalanceMetro ?? 0) - (b.charges.minBalanceMetro ?? 0))
  }, [zeroOnly, sector, maxBalance])

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
      <SectionHeading eyebrow="Minimum balance finder" title="Find accounts that fit your balance comfort" description="Filter banks by minimum balance requirement, zero-balance availability and sector." />
      <div className="mt-4"><Disclaimer>{DATA_DISCLAIMER}</Disclaimer></div>

      <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:items-center bg-white border border-line rounded-card p-5">
        <label className="flex items-center gap-2 text-sm font-medium text-ink/70">
          <input type="checkbox" checked={zeroOnly} onChange={(e) => setZeroOnly(e.target.checked)} className="accent-teal" />
          Zero-balance accounts only
        </label>
        <select value={sector} onChange={(e) => setSector(e.target.value)} className="input sm:w-56">
          <option value="All">All sectors</option>
          {bankSectors.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <div className="flex-1">
          <label className="text-xs text-ink/50 font-medium block mb-1">Max metro minimum balance: ₹{maxBalance.toLocaleString('en-IN')}</label>
          <input type="range" min={0} max={25000} step={500} value={maxBalance} onChange={(e) => setMaxBalance(Number(e.target.value))} className="w-full accent-teal" />
        </div>
      </div>

      <div className="mt-8 overflow-x-auto rounded-card border border-line bg-white">
        <table className="w-full text-sm min-w-[720px]">
          <thead>
            <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-ink/45">
              <th className="px-4 py-3">Bank</th>
              <th className="px-4 py-3">Sector</th>
              <th className="px-4 py-3">Min. balance (metro)</th>
              <th className="px-4 py-3">Zero-balance option</th>
              <th className="px-4 py-3">Account type</th>
              <th className="px-4 py-3">Non-maintenance charge</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((b, i) => (
              <tr key={b.id} className={i % 2 === 0 ? 'bg-paper/50' : ''}>
                <td className="px-4 py-3 font-semibold text-ink"><Link to={`/banks/${b.id}`} className="hover:text-teal">{b.shortName}</Link></td>
                <td className="px-4 py-3 text-ink/60">{b.sector}</td>
                <td className="px-4 py-3 font-mono tabular text-ink">{b.charges.minBalanceMetro !== undefined ? `₹${b.charges.minBalanceMetro.toLocaleString('en-IN')}` : '—'}</td>
                <td className="px-4 py-3">{b.charges.zeroBalanceAvailable ? <span className="text-teal font-medium">Yes</span> : <span className="text-ink/40">No</span>}</td>
                <td className="px-4 py-3 text-ink/60">{b.accountTypes[0]}</td>
                <td className="px-4 py-3 text-ink/60">{b.charges.nonMaintenanceCharge}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filtered.length === 0 && <p className="mt-6 text-center text-ink/50">No banks match these filters.</p>}
    </div>
  )
}
