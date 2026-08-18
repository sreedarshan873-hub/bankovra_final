import { useState } from 'react'
import { Link } from 'react-router-dom'
import { banks } from '../data/banks'
import { SectionHeading, SourceBadge, Disclaimer } from '../components/Shared'

const chargeColumns: { key: keyof (typeof banks)[number]['charges']; label: string }[] = [
  { key: 'atmCharge', label: 'ATM charges' },
  { key: 'debitCardAnnualFee', label: 'Debit card fees' },
  { key: 'cashDepositCharge', label: 'Cash deposit charges' },
  { key: 'chequeBounceCharge', label: 'Cheque bounce' },
  { key: 'neft', label: 'NEFT' },
  { key: 'rtgs', label: 'RTGS' },
  { key: 'imps', label: 'IMPS' },
  { key: 'smsCharge', label: 'SMS charges' },
  { key: 'accountClosureCharge', label: 'Account closure' },
]

export default function ChargesFinder() {
  const [bankId, setBankId] = useState('sbi')
  const bank = banks.find((b) => b.id === bankId)!

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
      <SectionHeading eyebrow="Bank charges finder" title="Every service charge, in one view" description="Pick a bank to see ATM, debit card, cash deposit, cheque bounce, NEFT/RTGS/IMPS, SMS and closure charges." />

      <div className="mt-6 flex flex-wrap gap-2">
        {banks.map((b) => (
          <button
            key={b.id}
            onClick={() => setBankId(b.id)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              bankId === b.id ? 'bg-ink text-paper border-ink' : 'bg-white text-ink/70 border-line hover:border-ink/30'
            }`}
          >
            {b.shortName}
          </button>
        ))}
      </div>

      <div className="mt-8 rounded-card border border-line bg-white p-6">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="font-display text-xl font-semibold text-ink">{bank.name}</h3>
          <Link to={`/banks/${bank.id}`} className="text-sm font-semibold text-teal hover:underline">Full bank profile →</Link>
        </div>

        <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {chargeColumns.map((col) => (
            <div key={col.key} className="border border-line rounded-card p-4">
              <p className="text-xs uppercase tracking-wide text-ink/45 font-medium">{col.label}</p>
              <p className="mt-1.5 font-mono text-sm font-semibold text-ink">{bank.charges[col.key] as string}</p>
            </div>
          ))}
        </div>

        <SourceBadge text={bank.sourceLastUpdated} />
      </div>

      <div className="mt-6">
        <Disclaimer>
          Charge schedules change periodically and can vary by account variant, location and customer segment. Always
          confirm exact, current charges in the bank's official Schedule of Charges before transacting.
        </Disclaimer>
      </div>
    </div>
  )
}
