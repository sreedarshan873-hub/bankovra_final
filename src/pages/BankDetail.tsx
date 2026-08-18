import type { ReactNode } from 'react'
import { useParams, Link } from 'react-router-dom'
import { banks } from '../data/banks'
import { Pill, SourceBadge, Disclaimer } from '../components/Shared'
import { useSavedItems } from '../context/SavedItemsContext'

export default function BankDetail() {
  const { id } = useParams()
  const bank = banks.find((b) => b.id === id)
  const { addItem } = useSavedItems()

  if (!bank) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <p className="text-ink/60">Bank not found.</p>
        <Link to="/banks" className="text-teal font-semibold hover:underline">← Back to directory</Link>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
      <Link to="/banks" className="text-sm text-ink/50 hover:text-ink">← Back to directory</Link>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 shrink-0 rounded-xl bg-ink text-gold-light flex items-center justify-center font-display font-semibold text-lg">
            {bank.shortName.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <h1 className="font-display text-3xl font-semibold text-ink">{bank.name}</h1>
            <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-light text-teal">{bank.sector}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => addItem({ type: 'bank', title: bank.name, detail: bank.sector, payload: { bankId: bank.id } })}
            className="px-4 py-2.5 rounded-md border border-line bg-white text-sm font-semibold hover:border-ink/30"
          >
            ★ Save to Dashboard
          </button>
          <a href={bank.officialWebsite} target="_blank" rel="noopener noreferrer" className="px-4 py-2.5 rounded-md bg-ink text-paper text-sm font-semibold hover:bg-navy-700">
            Official website ↗
          </a>
        </div>
      </div>

      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <Section title="Account types">
          <div className="flex flex-wrap gap-2">{bank.accountTypes.map((a) => <Pill key={a}>{a}</Pill>)}</div>
        </Section>
        <Section title="Basic features">
          <ul className="space-y-1.5 text-sm text-ink/70">
            {bank.basicFeatures.map((f) => <li key={f} className="flex gap-2"><span className="text-teal">✓</span>{f}</li>)}
          </ul>
        </Section>
        <Section title="Loan products">
          {bank.loanProducts.length ? (
            <div className="flex flex-wrap gap-2">{bank.loanProducts.map((l) => <Pill key={l}>{l}</Pill>)}</div>
          ) : <p className="text-sm text-ink/45">Not currently offered.</p>}
        </Section>
        <Section title="Investment products">
          {bank.investmentProducts.length ? (
            <div className="flex flex-wrap gap-2">{bank.investmentProducts.map((l) => <Pill key={l}>{l}</Pill>)}</div>
          ) : <p className="text-sm text-ink/45">Not currently offered.</p>}
        </Section>
        <Section title="Digital banking">
          <div className="flex flex-wrap gap-2">{bank.digitalBanking.map((l) => <Pill key={l}>{l}</Pill>)}</div>
        </Section>
        <Section title="Branch & ATM presence">
          <p className="text-sm text-ink/70">{bank.hasBranchNetwork}</p>
        </Section>
      </div>

      <div className="mt-8">
        <h2 className="font-display font-semibold text-xl text-ink mb-3">Charges &amp; minimum balance</h2>
        <div className="rounded-card border border-line bg-white overflow-hidden">
          <table className="w-full text-sm">
            <tbody>
              {[
                ['Zero-balance account', bank.charges.zeroBalanceAvailable ? 'Available' : 'Not available'],
                ['Minimum balance (metro)', bank.charges.minBalanceMetro !== undefined ? `₹${bank.charges.minBalanceMetro.toLocaleString('en-IN')}` : '—'],
                ['Non-maintenance charge', bank.charges.nonMaintenanceCharge],
                ['ATM — own bank', bank.charges.atmOwnFree],
                ['ATM — other bank free txns', bank.charges.atmOtherFree],
                ['ATM charge beyond free limit', bank.charges.atmCharge],
                ['Debit card annual fee', bank.charges.debitCardAnnualFee],
                ['Cash deposit limit', bank.charges.cashDepositLimit],
                ['Cash deposit charge (beyond limit)', bank.charges.cashDepositCharge],
                ['Cheque bounce charge', bank.charges.chequeBounceCharge],
                ['NEFT', bank.charges.neft],
                ['RTGS', bank.charges.rtgs],
                ['IMPS', bank.charges.imps],
                ['SMS alerts', bank.charges.smsCharge],
                ['Account closure charge', bank.charges.accountClosureCharge],
              ].map(([label, value], i) => (
                <tr key={label} className={i % 2 === 0 ? 'bg-paper/50' : ''}>
                  <td className="px-4 py-2.5 text-ink/60 w-1/2">{label}</td>
                  <td className="px-4 py-2.5 font-medium text-ink font-mono tabular">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <SourceBadge text={bank.sourceLastUpdated} />
      </div>

      {bank.rates.fdGeneralMax > 0 && (
        <div className="mt-8 grid sm:grid-cols-2 gap-5">
          <div className="rounded-card border border-line bg-white p-5">
            <p className="text-xs uppercase tracking-wide text-ink/45 font-medium">FD rates (general)</p>
            <p className="font-mono text-2xl font-semibold text-ink mt-1">{bank.rates.fdGeneralMin}%–{bank.rates.fdGeneralMax}%</p>
            <p className="text-xs text-ink/45 mt-1">Senior citizen: {bank.rates.fdSeniorMin}%–{bank.rates.fdSeniorMax}%</p>
          </div>
          <div className="rounded-card border border-line bg-white p-5">
            <p className="text-xs uppercase tracking-wide text-ink/45 font-medium">RD rates (general)</p>
            <p className="font-mono text-2xl font-semibold text-ink mt-1">{bank.rates.rdGeneralMin}%–{bank.rates.rdGeneralMax}%</p>
          </div>
        </div>
      )}

      <div className="mt-8">
        <Disclaimer>
          All figures on this page are indicative/demo data compiled for comparison and may not reflect the bank's
          current official terms. Please verify on the bank's official website before applying.
        </Disclaimer>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-card border border-line bg-white p-5">
      <h3 className="font-display font-semibold text-ink mb-3">{title}</h3>
      {children}
    </div>
  )
}
