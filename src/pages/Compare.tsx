import { useState } from 'react'
import { banks } from '../data/banks'
import { SectionHeading, Disclaimer } from '../components/Shared'
import { useSavedItems } from '../context/SavedItemsContext'

export default function Compare() {
  const [selected, setSelected] = useState<string[]>(['sbi', 'hdfc'])
  const { addItem } = useSavedItems()

  const toggle = (id: string) => {
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id)
      if (prev.length >= 4) return prev
      return [...prev, id]
    })
  }

  const compared = banks.filter((b) => selected.includes(b.id))

  const rows: { label: string; get: (b: (typeof banks)[number]) => string }[] = [
    { label: 'Sector', get: (b) => b.sector },
    { label: 'Minimum balance (metro)', get: (b) => (b.charges.minBalanceMetro !== undefined ? `₹${b.charges.minBalanceMetro.toLocaleString('en-IN')}` : '—') },
    { label: 'Zero-balance availability', get: (b) => (b.charges.zeroBalanceAvailable ? 'Yes' : 'No') },
    { label: 'ATM / debit card charges', get: (b) => b.charges.atmCharge },
    { label: 'Debit card annual fee', get: (b) => b.charges.debitCardAnnualFee },
    { label: 'Cash deposit', get: (b) => b.charges.cashDepositCharge },
    { label: 'Cheque bounce', get: (b) => b.charges.chequeBounceCharge },
    { label: 'NEFT', get: (b) => b.charges.neft },
    { label: 'RTGS', get: (b) => b.charges.rtgs },
    { label: 'IMPS', get: (b) => b.charges.imps },
    { label: 'SMS charges', get: (b) => b.charges.smsCharge },
    { label: 'Account closure', get: (b) => b.charges.accountClosureCharge },
    { label: 'FD rate (general)', get: (b) => (b.rates.fdGeneralMax > 0 ? `${b.rates.fdGeneralMin}–${b.rates.fdGeneralMax}%` : '—') },
    { label: 'RD rate (general)', get: (b) => (b.rates.rdGeneralMax > 0 ? `${b.rates.rdGeneralMin}–${b.rates.rdGeneralMax}%` : '—') },
    { label: 'Loan products', get: (b) => (b.loanProducts.length ? b.loanProducts.join(', ') : 'None') },
    { label: 'Digital banking', get: (b) => b.digitalBanking.join(', ') },
    { label: 'Investment options', get: (b) => (b.investmentProducts.length ? b.investmentProducts.join(', ') : 'None') },
    { label: 'Branch network', get: (b) => b.hasBranchNetwork },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
      <SectionHeading eyebrow="Bank comparison" title="Compare 2–4 banks side by side" description="Pick banks below to see minimum balance, charges, rates, loans and digital banking, lined up together." />

      <div className="mt-6 flex flex-wrap gap-2">
        {banks.map((b) => (
          <button
            key={b.id}
            onClick={() => toggle(b.id)}
            disabled={!selected.includes(b.id) && selected.length >= 4}
            className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
              selected.includes(b.id) ? 'bg-ink text-paper border-ink' : 'bg-white text-ink/70 border-line hover:border-ink/30'
            }`}
          >
            {b.shortName}
          </button>
        ))}
      </div>
      <p className="mt-2 text-xs text-ink/40">{selected.length}/4 selected</p>

      {compared.length >= 2 ? (
        <>
          <div className="mt-8 overflow-x-auto rounded-card border border-line bg-white">
            <table className="w-full text-sm min-w-[640px]">
              <thead>
                <tr className="border-b border-line">
                  <th className="text-left px-4 py-3 text-ink/45 font-medium text-xs uppercase tracking-wide sticky left-0 bg-white">Feature</th>
                  {compared.map((b) => (
                    <th key={b.id} className="text-left px-4 py-3 font-display font-semibold text-ink whitespace-nowrap">{b.shortName}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={row.label} className={i % 2 === 0 ? 'bg-paper/50' : ''}>
                    <td className="px-4 py-2.5 text-ink/60 sticky left-0 bg-inherit font-medium">{row.label}</td>
                    {compared.map((b) => (
                      <td key={b.id} className="px-4 py-2.5 text-ink font-mono text-[13px] tabular align-top">{row.get(b)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-5 flex justify-end">
            <button
              onClick={() =>
                addItem({
                  type: 'comparison',
                  title: `Comparison: ${compared.map((b) => b.shortName).join(' vs ')}`,
                  detail: `${compared.length} banks compared`,
                  payload: { bankIds: compared.map((b) => b.id) },
                })
              }
              className="px-4 py-2 rounded-md border border-line bg-white text-sm font-semibold hover:border-ink/30"
            >
              ★ Save this comparison
            </button>
          </div>

          <div className="mt-6">
            <Disclaimer>All figures shown are indicative/demo data. Verify with each bank's official website before deciding.</Disclaimer>
          </div>
        </>
      ) : (
        <div className="mt-10 text-center text-ink/50 py-16 border border-dashed border-line rounded-card">
          Select at least 2 banks above to see a comparison.
        </div>
      )}
    </div>
  )
}
