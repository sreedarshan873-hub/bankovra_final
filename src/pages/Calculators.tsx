import { useMemo, useState, type ReactNode } from 'react'
import { SectionHeading, LedgerNumber, Disclaimer } from '../components/Shared'
import {
  calcEMISchedule, calcSIPFutureValue, calcGoalSIP, calcFD, calcRD, calcCompoundInterest,
  calcSimpleInterest, calcLoanPrepayment, calcInflationAdjusted,
} from '../utils/calculators'
import { inr } from '../utils/format'
import { useSavedItems } from '../context/SavedItemsContext'

type CalcId = 'emi' | 'sip' | 'goalSip' | 'fd' | 'rd' | 'compound' | 'savingsGoal' | 'prepayment' | 'inflation' | 'simple'

const calcList: { id: CalcId; label: string }[] = [
  { id: 'emi', label: 'EMI' },
  { id: 'sip', label: 'SIP' },
  { id: 'goalSip', label: 'Goal-Based SIP' },
  { id: 'fd', label: 'FD' },
  { id: 'rd', label: 'RD' },
  { id: 'compound', label: 'Compound Interest' },
  { id: 'savingsGoal', label: 'Savings Goal' },
  { id: 'prepayment', label: 'Loan Prepayment' },
  { id: 'inflation', label: 'Inflation' },
  { id: 'simple', label: 'Simple Interest' },
]

export default function Calculators() {
  const [active, setActive] = useState<CalcId>('emi')

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
      <SectionHeading eyebrow="Calculators" title="Run the numbers before you decide" description="Ten calculators covering loans, investments and savings goals." />

      <div className="mt-8 flex flex-wrap gap-2">
        {calcList.map((c) => (
          <button
            key={c.id}
            onClick={() => setActive(c.id)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              active === c.id ? 'bg-ink text-paper border-ink' : 'bg-white text-ink/70 border-line hover:border-ink/30'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="mt-8 bg-white border border-line rounded-card p-6 sm:p-8">
        {active === 'emi' && <EMICalc />}
        {active === 'sip' && <SIPCalc />}
        {active === 'goalSip' && <GoalSIPCalc />}
        {active === 'fd' && <FDCalc />}
        {active === 'rd' && <RDCalc />}
        {active === 'compound' && <CompoundCalc />}
        {active === 'savingsGoal' && <SavingsGoalCalc />}
        {active === 'prepayment' && <PrepaymentCalc />}
        {active === 'inflation' && <InflationCalc />}
        {active === 'simple' && <SimpleInterestCalc />}
      </div>

      <div className="mt-6">
        <Disclaimer>Calculator results are estimates using standard formulas, for illustration only — not a guarantee of returns or loan terms.</Disclaimer>
      </div>
    </div>
  )
}

function SaveButton({ title, detail, payload }: { title: string; detail: string; payload: any }) {
  const { addItem } = useSavedItems()
  return (
    <button
      onClick={() => addItem({ type: 'calculation', title, detail, payload })}
      className="px-4 py-2 rounded-md border border-line bg-white text-sm font-semibold hover:border-ink/30"
    >
      ★ Save this calculation
    </button>
  )
}

function Num({ label, value, onChange, step = 1 }: { label: string; value: number; onChange: (v: number) => void; step?: number }) {
  return (
    <div>
      <label className="text-xs font-semibold text-ink/60 mb-1.5 block">{label}</label>
      <input type="number" step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="input font-mono" />
    </div>
  )
}

function EMICalc() {
  const [p, setP] = useState(1000000)
  const [r, setR] = useState(9.0)
  const [years, setYears] = useState(15)
  const result = useMemo(() => calcEMISchedule(p, r, years * 12), [p, r, years])
  return (
    <CalcShell title="EMI Calculator" fields={
      <>
        <Num label="Loan amount (₹)" value={p} onChange={setP} />
        <Num label="Interest rate (% p.a.)" value={r} onChange={setR} step={0.05} />
        <Num label="Tenure (years)" value={years} onChange={setYears} />
      </>
    } results={
      <>
        <LedgerNumber label="Monthly EMI" value={inr(result.emi)} accent="teal" />
        <LedgerNumber label="Total interest" value={inr(result.totalInterest)} />
        <LedgerNumber label="Total payment" value={inr(result.totalPayment)} />
      </>
    } save={<SaveButton title="EMI Calculation" detail={`EMI ≈ ${inr(result.emi)} on ${inr(p)} @ ${r}% for ${years}y`} payload={{ p, r, years }} />} />
  )
}

function SIPCalc() {
  const [monthly, setMonthly] = useState(5000)
  const [rate, setRate] = useState(12)
  const [years, setYears] = useState(10)
  const result = useMemo(() => calcSIPFutureValue(monthly, rate, years), [monthly, rate, years])
  return (
    <CalcShell title="SIP Calculator" fields={
      <>
        <Num label="Monthly investment (₹)" value={monthly} onChange={setMonthly} />
        <Num label="Expected annual return (%)" value={rate} onChange={setRate} step={0.5} />
        <Num label="Duration (years)" value={years} onChange={setYears} />
      </>
    } results={
      <>
        <LedgerNumber label="Invested amount" value={inr((result as any).invested)} />
        <LedgerNumber label="Est. future value" value={inr((result as any).futureValue)} accent="teal" />
        <LedgerNumber label="Est. gains" value={inr((result as any).gains)} accent="gold" />
      </>
    } save={<SaveButton title="SIP Calculation" detail={`₹${monthly}/mo @ ${rate}% for ${years}y`} payload={{ monthly, rate, years }} />} />
  )
}

function GoalSIPCalc() {
  const [goal, setGoal] = useState(2000000)
  const [rate, setRate] = useState(12)
  const [years, setYears] = useState(10)
  const monthly = useMemo(() => calcGoalSIP(goal, rate, years), [goal, rate, years])
  return (
    <CalcShell title="Goal-Based SIP Calculator" fields={
      <>
        <Num label="Target goal amount (₹)" value={goal} onChange={setGoal} />
        <Num label="Expected annual return (%)" value={rate} onChange={setRate} step={0.5} />
        <Num label="Time to goal (years)" value={years} onChange={setYears} />
      </>
    } results={
      <LedgerNumber label="Required monthly SIP" value={inr(monthly)} accent="teal" />
    } save={<SaveButton title="Goal SIP Calculation" detail={`Need ₹${Math.round(monthly).toLocaleString('en-IN')}/mo for ₹${goal.toLocaleString('en-IN')} goal`} payload={{ goal, rate, years }} />} />
  )
}

function FDCalc() {
  const [p, setP] = useState(100000)
  const [rate, setRate] = useState(7)
  const [years, setYears] = useState(5)
  const result = useMemo(() => calcFD(p, rate, years), [p, rate, years])
  return (
    <CalcShell title="Fixed Deposit Calculator" fields={
      <>
        <Num label="Principal (₹)" value={p} onChange={setP} />
        <Num label="Interest rate (% p.a.)" value={rate} onChange={setRate} step={0.05} />
        <Num label="Tenure (years)" value={years} onChange={setYears} />
      </>
    } results={
      <>
        <LedgerNumber label="Maturity amount" value={inr(result.maturityAmount)} accent="teal" />
        <LedgerNumber label="Interest earned" value={inr(result.interestEarned)} accent="gold" />
      </>
    } save={<SaveButton title="FD Calculation" detail={`₹${p.toLocaleString('en-IN')} @ ${rate}% for ${years}y`} payload={{ p, rate, years }} />} />
  )
}

function RDCalc() {
  const [monthly, setMonthly] = useState(5000)
  const [rate, setRate] = useState(7)
  const [months, setMonths] = useState(24)
  const result = useMemo(() => calcRD(monthly, rate, months), [monthly, rate, months])
  return (
    <CalcShell title="Recurring Deposit Calculator" fields={
      <>
        <Num label="Monthly instalment (₹)" value={monthly} onChange={setMonthly} />
        <Num label="Interest rate (% p.a.)" value={rate} onChange={setRate} step={0.05} />
        <Num label="Tenure (months)" value={months} onChange={setMonths} />
      </>
    } results={
      <>
        <LedgerNumber label="Invested amount" value={inr(result.invested)} />
        <LedgerNumber label="Maturity amount" value={inr(result.maturityAmount)} accent="teal" />
        <LedgerNumber label="Interest earned" value={inr(result.interestEarned)} accent="gold" />
      </>
    } save={<SaveButton title="RD Calculation" detail={`₹${monthly}/mo @ ${rate}% for ${months}mo`} payload={{ monthly, rate, months }} />} />
  )
}

function CompoundCalc() {
  const [p, setP] = useState(100000)
  const [rate, setRate] = useState(8)
  const [years, setYears] = useState(10)
  const [freq, setFreq] = useState(4)
  const result = useMemo(() => calcCompoundInterest(p, rate, years, freq), [p, rate, years, freq])
  return (
    <CalcShell title="Compound Interest Calculator" fields={
      <>
        <Num label="Principal (₹)" value={p} onChange={setP} />
        <Num label="Interest rate (% p.a.)" value={rate} onChange={setRate} step={0.05} />
        <Num label="Duration (years)" value={years} onChange={setYears} />
        <div>
          <label className="text-xs font-semibold text-ink/60 mb-1.5 block">Compounding frequency</label>
          <select value={freq} onChange={(e) => setFreq(Number(e.target.value))} className="input">
            <option value={1}>Annually</option>
            <option value={2}>Half-yearly</option>
            <option value={4}>Quarterly</option>
            <option value={12}>Monthly</option>
          </select>
        </div>
      </>
    } results={
      <>
        <LedgerNumber label="Final amount" value={inr(result.amount)} accent="teal" />
        <LedgerNumber label="Interest earned" value={inr(result.interestEarned)} accent="gold" />
      </>
    } save={<SaveButton title="Compound Interest Calculation" detail={`₹${p.toLocaleString('en-IN')} @ ${rate}% for ${years}y`} payload={{ p, rate, years, freq }} />} />
  )
}

function SavingsGoalCalc() {
  const [goal, setGoal] = useState(500000)
  const [years, setYears] = useState(5)
  const [rate, setRate] = useState(7)
  const monthly = useMemo(() => calcGoalSIP(goal, rate, years), [goal, rate, years])
  return (
    <CalcShell title="Savings Goal Calculator" fields={
      <>
        <Num label="Savings goal (₹)" value={goal} onChange={setGoal} />
        <Num label="Time horizon (years)" value={years} onChange={setYears} />
        <Num label="Expected annual return (%)" value={rate} onChange={setRate} step={0.5} />
      </>
    } results={
      <LedgerNumber label="Required monthly saving" value={inr(monthly)} accent="teal" />
    } save={<SaveButton title="Savings Goal Calculation" detail={`Need ₹${Math.round(monthly).toLocaleString('en-IN')}/mo for ₹${goal.toLocaleString('en-IN')} in ${years}y`} payload={{ goal, years, rate }} />} />
  )
}

function PrepaymentCalc() {
  const [p, setP] = useState(2000000)
  const [rate, setRate] = useState(9)
  const [years, setYears] = useState(20)
  const [prepay, setPrepay] = useState(300000)
  const [prepayMonth, setPrepayMonth] = useState(24)
  const result = useMemo(() => calcLoanPrepayment(p, rate, years * 12, prepay, prepayMonth), [p, rate, years, prepay, prepayMonth])
  return (
    <CalcShell title="Loan Prepayment Calculator" fields={
      <>
        <Num label="Loan amount (₹)" value={p} onChange={setP} />
        <Num label="Interest rate (% p.a.)" value={rate} onChange={setRate} step={0.05} />
        <Num label="Original tenure (years)" value={years} onChange={setYears} />
        <Num label="Prepayment amount (₹)" value={prepay} onChange={setPrepay} />
        <Num label="Prepayment at month #" value={prepayMonth} onChange={setPrepayMonth} />
      </>
    } results={
      <>
        <LedgerNumber label="Original EMI" value={inr(result.emi)} />
        <LedgerNumber label="Interest saved" value={inr(result.interestSaved)} accent="teal" />
        <LedgerNumber label="Tenure reduced by" value={`${result.monthsSaved} months`} accent="gold" />
      </>
    } save={<SaveButton title="Loan Prepayment Calculation" detail={`Save ${inr(result.interestSaved)} · ${result.monthsSaved}mo shorter`} payload={{ p, rate, years, prepay, prepayMonth }} />} />
  )
}

function InflationCalc() {
  const [amount, setAmount] = useState(100000)
  const [inflation, setInflation] = useState(6)
  const [years, setYears] = useState(10)
  const result = useMemo(() => calcInflationAdjusted(amount, inflation, years), [amount, inflation, years])
  return (
    <CalcShell title="Inflation Calculator" fields={
      <>
        <Num label="Current cost (₹)" value={amount} onChange={setAmount} />
        <Num label="Expected inflation (% p.a.)" value={inflation} onChange={setInflation} step={0.5} />
        <Num label="Years ahead" value={years} onChange={setYears} />
      </>
    } results={
      <LedgerNumber label="Future cost" value={inr(result.futureCost)} accent="brick" />
    } save={<SaveButton title="Inflation Calculation" detail={`₹${amount.toLocaleString('en-IN')} → ${inr(result.futureCost)} in ${years}y`} payload={{ amount, inflation, years }} />} />
  )
}

function SimpleInterestCalc() {
  const [p, setP] = useState(100000)
  const [rate, setRate] = useState(7)
  const [years, setYears] = useState(3)
  const result = useMemo(() => calcSimpleInterest(p, rate, years), [p, rate, years])
  return (
    <CalcShell title="Simple Interest Calculator" fields={
      <>
        <Num label="Principal (₹)" value={p} onChange={setP} />
        <Num label="Interest rate (% p.a.)" value={rate} onChange={setRate} step={0.05} />
        <Num label="Duration (years)" value={years} onChange={setYears} />
      </>
    } results={
      <>
        <LedgerNumber label="Interest" value={inr(result.interest)} accent="gold" />
        <LedgerNumber label="Total amount" value={inr(result.amount)} accent="teal" />
      </>
    } save={<SaveButton title="Simple Interest Calculation" detail={`₹${p.toLocaleString('en-IN')} @ ${rate}% for ${years}y`} payload={{ p, rate, years }} />} />
  )
}

function CalcShell({ title, fields, results, save }: { title: string; fields: ReactNode; results: ReactNode; save: ReactNode }) {
  return (
    <div>
      <h3 className="font-display text-xl font-semibold text-ink mb-5">{title}</h3>
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-4">{fields}</div>
        <div>
          <div className="grid grid-cols-2 gap-4 bg-paper/60 rounded-card p-5 border border-line">{results}</div>
          <div className="mt-4">{save}</div>
        </div>
      </div>
    </div>
  )
}
