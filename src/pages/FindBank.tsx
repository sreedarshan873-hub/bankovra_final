import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { banks } from '../data/banks'
import { FindBankAnswers } from '../types'
import { computeMatches } from '../utils/matchScore'
import { SectionHeading, Disclaimer } from '../components/Shared'
import MatchScoreGauge from '../components/MatchScoreGauge'
import { useSavedItems } from '../context/SavedItemsContext'

const initial: FindBankAnswers = {
  age: '', occupation: '', income: '', city: '', employmentType: '',
  accountRequirement: '', minBalancePreference: '', loanRequirement: '',
  investmentRequirement: '', branchAtmPreference: '', digitalBankingPreference: '',
}

export default function FindBank() {
  const [answers, setAnswers] = useState<FindBankAnswers>(initial)
  const [submitted, setSubmitted] = useState(false)
  const { addItem } = useSavedItems()

  const set = (key: keyof FindBankAnswers) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setAnswers((a) => ({ ...a, [key]: e.target.value }))

  const results = submitted ? computeMatches(answers, banks).slice(0, 6) : []

  const canSubmit = answers.age && answers.employmentType && answers.minBalancePreference && answers.branchAtmPreference

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
      <SectionHeading eyebrow="Find the right bank" title="Tell us about yourself" description="Answer a few questions and get a transparent BANKOVRA Match Score — with the exact reasons behind every recommendation." />

      <form
        onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }}
        className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 bg-white border border-line rounded-card p-6 sm:p-8"
      >
        <Field label="Age">
          <input type="number" min={18} max={100} required value={answers.age} onChange={set('age')} placeholder="e.g. 28" className="input" />
        </Field>
        <Field label="Occupation">
          <input value={answers.occupation} onChange={set('occupation')} placeholder="e.g. Software Engineer" className="input" />
        </Field>
        <Field label="Monthly income (₹)">
          <input type="number" min={0} value={answers.income} onChange={set('income')} placeholder="e.g. 45000" className="input" />
        </Field>
        <Field label="City">
          <input value={answers.city} onChange={set('city')} placeholder="e.g. Coimbatore" className="input" />
        </Field>
        <Field label="Employment type" required>
          <select required value={answers.employmentType} onChange={set('employmentType')} className="input">
            <option value="">Select…</option>
            <option>Salaried</option>
            <option>Self-Employed / Business</option>
            <option>Student</option>
            <option>Farmer / Agriculture</option>
            <option>Retired</option>
          </select>
        </Field>
        <Field label="Account requirement">
          <select value={answers.accountRequirement} onChange={set('accountRequirement')} className="input">
            <option value="">Select…</option>
            <option>Savings Account</option>
            <option>Salary Account</option>
            <option>Current Account</option>
            <option>Senior Citizen Account</option>
          </select>
        </Field>
        <Field label="Minimum-balance preference" required>
          <select required value={answers.minBalancePreference} onChange={set('minBalancePreference')} className="input">
            <option value="">Select…</option>
            <option>Zero-balance only</option>
            <option>Low balance okay (under ₹5,000)</option>
            <option>Not a concern</option>
          </select>
        </Field>
        <Field label="Loan requirement">
          <select value={answers.loanRequirement} onChange={set('loanRequirement')} className="input">
            <option value="">Select…</option>
            <option>None right now</option>
            <option>Personal Loan</option>
            <option>Home Loan</option>
            <option>Education Loan</option>
            <option>Vehicle Loan</option>
            <option>Business Loan</option>
          </select>
        </Field>
        <Field label="Investment requirement">
          <select value={answers.investmentRequirement} onChange={set('investmentRequirement')} className="input">
            <option value="">Select…</option>
            <option>None right now</option>
            <option>Fixed Deposit</option>
            <option>Mutual Funds</option>
            <option>Recurring Deposit</option>
          </select>
        </Field>
        <Field label="Branch / ATM preference" required>
          <select required value={answers.branchAtmPreference} onChange={set('branchAtmPreference')} className="input">
            <option value="">Select…</option>
            <option>Need physical branches nearby</option>
            <option>Prefer fully digital</option>
            <option>No strong preference</option>
          </select>
        </Field>
        <Field label="Digital banking preference">
          <select value={answers.digitalBankingPreference} onChange={set('digitalBankingPreference')} className="input">
            <option value="">Select…</option>
            <option>Very important</option>
            <option>Nice to have</option>
            <option>Not important</option>
          </select>
        </Field>

        <div className="sm:col-span-2 lg:col-span-3 flex items-center justify-between flex-wrap gap-3 pt-2">
          <p className="text-xs text-ink/40">Fields marked required are used most heavily in scoring.</p>
          <button type="submit" disabled={!canSubmit} className="px-6 py-3 rounded-md bg-ink text-paper font-semibold text-sm hover:bg-navy-700 disabled:opacity-40 disabled:cursor-not-allowed">
            Get my Match Score →
          </button>
        </div>
      </form>

      {submitted && (
        <div className="mt-12">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <h2 className="font-display text-2xl font-semibold text-ink">Your top matches</h2>
            <button
              onClick={() => addItem({ type: 'recommendation', title: `Match results for ${answers.employmentType || 'you'}`, detail: `Top match: ${results[0]?.bank.name} (${results[0]?.score}/100)`, payload: { answers, results: results.map(r => ({ id: r.bank.id, score: r.score })) } })}
              className="px-4 py-2 rounded-md border border-line bg-white text-sm font-semibold hover:border-ink/30"
            >
              ★ Save this recommendation
            </button>
          </div>

          <div className="mt-6 space-y-4">
            {results.map((r, i) => (
              <div key={r.bank.id} className="rounded-card border border-line bg-white p-5 flex flex-col sm:flex-row gap-5">
                <MatchScoreGauge score={r.score} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    {i === 0 && <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-gold-light/60 text-gold-dark">Best match</span>}
                    <Link to={`/banks/${r.bank.id}`} className="font-display font-semibold text-ink hover:text-teal">{r.bank.name}</Link>
                    <span className="text-xs text-ink/40">{r.bank.sector}</span>
                  </div>
                  <ul className="mt-2.5 space-y-1">
                    {r.reasons.map((reason, idx) => (
                      <li key={idx} className="text-sm text-ink/65 flex gap-2">
                        <span className="text-teal shrink-0">•</span>{reason}
                      </li>
                    ))}
                  </ul>
                  <Link to={`/banks/${r.bank.id}`} className="inline-block mt-3 text-sm font-semibold text-teal hover:underline">View full details →</Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <Disclaimer>
              The BANKOVRA Match Score is a transparent, rule-based estimate from the information you provided — it
              is not financial advice and does not guarantee account approval. Always confirm eligibility with the bank.
            </Disclaimer>
          </div>
        </div>
      )}

    </div>
  )
}

function Field({ label, required, children }: { label: string; required?: boolean; children: ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-ink/60 mb-1.5 block">
        {label} {required && <span className="text-brick">*</span>}
      </span>
      {children}
    </label>
  )
}
