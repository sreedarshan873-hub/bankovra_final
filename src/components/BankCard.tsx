import { Link } from 'react-router-dom'
import { Bank } from '../types'
import { Pill } from './Shared'
import { useSavedItems } from '../context/SavedItemsContext'

const sectorColor: Record<string, string> = {
  'Public Sector Bank': 'bg-teal-light text-teal',
  'Private Sector Bank': 'bg-gold-light/50 text-gold-dark',
  'Foreign Bank': 'bg-ink/5 text-ink/70',
  'Small Finance Bank': 'bg-brick-light text-brick',
  'Payments Bank': 'bg-ink/5 text-ink/70',
  'Regional Rural Bank': 'bg-teal-light text-teal',
  'Cooperative Bank': 'bg-gold-light/50 text-gold-dark',
}

export default function BankCard({ bank, compact = false }: { bank: Bank; compact?: boolean }) {
  const { addItem } = useSavedItems()

  return (
    <div className="rounded-card border border-line bg-white shadow-card p-5 flex flex-col h-full">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 shrink-0 rounded-lg bg-ink text-gold-light flex items-center justify-center font-display font-semibold text-sm">
            {bank.shortName.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <Link to={`/banks/${bank.id}`} className="font-display font-semibold text-ink hover:text-teal leading-tight block">
              {bank.name}
            </Link>
            <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ${sectorColor[bank.sector]}`}>
              {bank.sector}
            </span>
          </div>
        </div>
        <button
          title="Save to Dashboard"
          onClick={() =>
            addItem({ type: 'bank', title: bank.name, detail: bank.sector, payload: { bankId: bank.id } })
          }
          className="text-ink/30 hover:text-gold-dark shrink-0"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 21l-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {!compact && (
        <>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {bank.accountTypes.slice(0, 3).map((a) => (
              <Pill key={a}>{a}</Pill>
            ))}
          </div>

          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div>
              <dt className="text-ink/45 text-xs">Zero-balance</dt>
              <dd className="font-medium text-ink">{bank.charges.zeroBalanceAvailable ? 'Available' : 'Not available'}</dd>
            </div>
            <div>
              <dt className="text-ink/45 text-xs">Branch network</dt>
              <dd className="font-medium text-ink">{bank.hasBranchNetwork}</dd>
            </div>
            <div>
              <dt className="text-ink/45 text-xs">Loan products</dt>
              <dd className="font-medium text-ink">{bank.loanProducts.length || 'None'}</dd>
            </div>
            <div>
              <dt className="text-ink/45 text-xs">FD rate (general)</dt>
              <dd className="font-mono font-medium text-ink">
                {bank.rates.fdGeneralMax > 0 ? `${bank.rates.fdGeneralMin}–${bank.rates.fdGeneralMax}%` : '—'}
              </dd>
            </div>
          </dl>
        </>
      )}

      <div className="mt-5 pt-4 border-t border-line flex items-center justify-between gap-2">
        <Link to={`/banks/${bank.id}`} className="text-sm font-semibold text-teal hover:underline">
          View details →
        </Link>
        <a
          href={bank.officialWebsite}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium text-ink/50 hover:text-ink"
        >
          Official site ↗
        </a>
      </div>
    </div>
  )
}
