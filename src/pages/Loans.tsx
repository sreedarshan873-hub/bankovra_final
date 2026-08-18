import { useMemo, useState } from 'react'
import { loanProducts, loanTypeInfo } from '../data/loans'
import { LoanType } from '../types'
import { SectionHeading, Disclaimer, SourceBadge, LedgerNumber } from '../components/Shared'
import { calcEMISchedule, estimateLoanEligibility } from '../utils/calculators'
import { inr, pct } from '../utils/format'
import { useSavedItems } from '../context/SavedItemsContext'

const loanTypes = Object.keys(loanTypeInfo) as LoanType[]

export default function Loans() {
  const [activeType, setActiveType] = useState<LoanType>('Personal Loan')
  const { addItem } = useSavedItems()

  // Eligibility calculator state
  const [income, setIncome] = useState(60000)
  const [existingEMIs, setExistingEMIs] = useState(0)
  const [age, setAge] = useState(30)
  const [employmentType, setEmploymentType] = useState<'Salaried' | 'Self-Employed' | 'Business Owner'>('Salaried')
  const [loanAmount, setLoanAmount] = useState(1000000)
  const [tenureYears, setTenureYears] = useState(10)
  const [rate, setRate] = useState(9.5)
  const [cibil, setCibil] = useState<'<650' | '650-699' | '700-749' | '750-799' | '800+'>('700-749')

  const eligibility = useMemo(
    () => estimateLoanEligibility({ monthlyIncome: income, existingEMIs, age, employmentType, annualRatePct: rate, tenureYears, cibilRange: cibil }),
    [income, existingEMIs, age, employmentType, rate, tenureYears, cibil]
  )
  const emiResult = useMemo(() => calcEMISchedule(loanAmount, rate, tenureYears * 12), [loanAmount, rate, tenureYears])

  const productsForType = loanProducts.filter((l) => l.type === activeType)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
      <SectionHeading eyebrow="Loans + eligibility" title="Eight loan types, one eligibility calculator" description="Explore loan products and estimate your EMI, indicative eligibility and FOIR before you apply." />

      {/* Loan type tabs */}
      <div className="mt-8 flex flex-wrap gap-2">
        {loanTypes.map((t) => (
          <button
            key={t}
            onClick={() => setActiveType(t)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              activeType === t ? 'bg-ink text-paper border-ink' : 'bg-white text-ink/70 border-line hover:border-ink/30'
            }`}
          >
            {loanTypeInfo[t].icon} {t}
          </button>
        ))}
      </div>

      <p className="mt-4 text-ink/60 max-w-2xl">{loanTypeInfo[activeType].blurb}</p>

      {/* Comparison table for active loan type */}
      <div className="mt-6 overflow-x-auto rounded-card border border-line bg-white">
        <table className="w-full text-sm min-w-[640px]">
          <thead>
            <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-ink/45">
              <th className="px-4 py-3">Lender</th>
              <th className="px-4 py-3">Interest rate</th>
              <th className="px-4 py-3">Processing fee</th>
              <th className="px-4 py-3">Max tenure</th>
              <th className="px-4 py-3">Max amount</th>
              <th className="px-4 py-3">Min. CIBIL</th>
            </tr>
          </thead>
          <tbody>
            {productsForType.map((l, i) => (
              <tr key={l.id} className={i % 2 === 0 ? 'bg-paper/50' : ''}>
                <td className="px-4 py-3 font-semibold text-ink">{l.lender}</td>
                <td className="px-4 py-3 font-mono tabular text-ink">{l.interestRateMin}%–{l.interestRateMax}%</td>
                <td className="px-4 py-3 text-ink/60">{l.processingFee}</td>
                <td className="px-4 py-3 text-ink/60">{l.maxTenureYears} yrs</td>
                <td className="px-4 py-3 text-ink/60">{l.maxAmount}</td>
                <td className="px-4 py-3 text-ink/60">{l.minCibil || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {productsForType[0] && <SourceBadge text={productsForType[0].sourceLastUpdated} />}

      {/* Eligibility calculator */}
      <div className="mt-14">
        <SectionHeading eyebrow="Eligibility calculator" title="Estimate your EMI &amp; eligibility" description="Uses income, existing EMIs, age, employment, loan amount, tenure, rate and CIBIL range to indicate FOIR-based eligibility." />

        <div className="mt-6 grid lg:grid-cols-2 gap-6">
          <div className="bg-white border border-line rounded-card p-6 space-y-4">
            <NumberField label="Monthly income (₹)" value={income} onChange={setIncome} />
            <NumberField label="Existing EMIs (₹/month)" value={existingEMIs} onChange={setExistingEMIs} />
            <NumberField label="Age" value={age} onChange={setAge} />
            <div>
              <label className="text-xs font-semibold text-ink/60 mb-1.5 block">Employment type</label>
              <select value={employmentType} onChange={(e) => setEmploymentType(e.target.value as any)} className="input">
                <option>Salaried</option>
                <option>Self-Employed</option>
                <option>Business Owner</option>
              </select>
            </div>
            <NumberField label="Desired loan amount (₹)" value={loanAmount} onChange={setLoanAmount} />
            <NumberField label="Tenure (years)" value={tenureYears} onChange={setTenureYears} />
            <NumberField label="Interest rate (% p.a.)" value={rate} onChange={setRate} step={0.05} />
            <div>
              <label className="text-xs font-semibold text-ink/60 mb-1.5 block">CIBIL score range</label>
              <select value={cibil} onChange={(e) => setCibil(e.target.value as any)} className="input">
                <option value="<650">Below 650</option>
                <option value="650-699">650–699</option>
                <option value="700-749">700–749</option>
                <option value="750-799">750–799</option>
                <option value="800+">800+</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white border border-line rounded-card p-6 grid grid-cols-2 gap-4">
              <LedgerNumber label="Estimated EMI" value={inr(emiResult.emi)} accent="teal" />
              <LedgerNumber label="Total interest" value={inr(emiResult.totalInterest)} />
              <LedgerNumber label="Total repayment" value={inr(emiResult.totalPayment)} />
              <LedgerNumber label="Current FOIR" value={pct(eligibility.currentFOIRPct)} accent={eligibility.currentFOIRPct > 50 ? 'brick' : 'teal'} />
            </div>
            <div className="bg-ink text-paper rounded-card p-6">
              <p className="text-xs uppercase tracking-wide text-gold-light font-semibold">Indicative eligible loan amount</p>
              <p className="font-mono text-3xl font-semibold mt-1 tabular">{inr(eligibility.indicativeEligibleAmount)}</p>
              <p className="text-sm text-paper/55 mt-2">
                Based on a {eligibility.foirCapPct.toFixed(0)}% FOIR cap for your profile and a
                {' '}{eligibility.ageAdjustedTenureYears.toFixed(0)}-year age-adjusted tenure.
              </p>
            </div>
            <button
              onClick={() =>
                addItem({
                  type: 'calculation',
                  title: `Loan eligibility (${activeType})`,
                  detail: `Eligible ≈ ${inr(eligibility.indicativeEligibleAmount)} · EMI ≈ ${inr(emiResult.emi)}`,
                  payload: { income, existingEMIs, age, employmentType, loanAmount, tenureYears, rate, cibil },
                })
              }
              className="w-full px-4 py-2.5 rounded-md border border-line bg-white text-sm font-semibold hover:border-ink/30"
            >
              ★ Save this calculation
            </button>
          </div>
        </div>

        <div className="mt-6">
          <Disclaimer tone="warning">
            This is an indicative FOIR-based estimate for illustration only. It is not a loan offer and does not
            guarantee approval — actual eligibility depends on the lender's credit policy, documentation and verification.
          </Disclaimer>
        </div>
      </div>
    </div>
  )
}

function NumberField({ label, value, onChange, step = 1 }: { label: string; value: number; onChange: (v: number) => void; step?: number }) {
  return (
    <div>
      <label className="text-xs font-semibold text-ink/60 mb-1.5 block">{label}</label>
      <input type="number" step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="input font-mono" />
    </div>
  )
}
