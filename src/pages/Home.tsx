import { Link } from 'react-router-dom'
import { SectionHeading } from '../components/Shared'
import { banks } from '../data/banks'
import BankCard from '../components/BankCard'

const journey = [
  { date: '01', label: 'Discover', desc: 'Browse every bank type — public, private, foreign, small finance, payments, RRB & co-operative.', to: '/banks' },
  { date: '02', label: 'Compare', desc: 'Set 2–4 banks side by side on charges, rates, digital banking and more.', to: '/compare' },
  { date: '03', label: 'Calculate', desc: 'Run EMI, SIP, FD, RD and eligibility numbers before you commit.', to: '/calculators' },
  { date: '04', label: 'Get Recommendation', desc: 'Answer a short profile and get a transparent BANKOVRA Match Score.', to: '/find-bank' },
  { date: '05', label: 'Verify', desc: 'Check sources, last-updated dates and safety guidance.', to: '/safety' },
  { date: '06', label: 'Apply', desc: 'Head to the bank\u2019s own official website to complete your application.', to: '/banks' },
]

const features = [
  { title: 'Bank Directory', desc: '18+ banks across every sector with accounts, loans, investments & digital features.', to: '/banks', icon: '🏦' },
  { title: 'Find the Right Bank', desc: 'A transparent Match Score explains exactly why a bank suits your profile.', to: '/find-bank', icon: '🎯' },
  { title: 'Bank Comparison', desc: 'Compare minimum balance, charges, FD/RD rates and more, side by side.', to: '/compare', icon: '⚖️' },
  { title: 'Charges Finder', desc: 'ATM, cheque bounce, NEFT/RTGS/IMPS and SMS charges — sourced and dated.', to: '/charges', icon: '💳' },
  { title: 'Loans + Eligibility', desc: 'Eight loan types with an EMI & eligibility calculator built in.', to: '/loans', icon: '💵' },
  { title: 'Calculators', desc: 'EMI, SIP, Goal SIP, FD, RD, compound interest, prepayment & more.', to: '/calculators', icon: '🧮' },
  { title: 'Investments', desc: 'Mutual funds, SIP, shares, bonds, FD & RD with risk and horizon shown.', to: '/investments', icon: '📈' },
  { title: 'Insurance', desc: 'Term, health, vehicle and travel insurance — coverage and exclusions.', to: '/insurance', icon: '🛡️' },
]

export default function Home() {
  return (
    <div>
      {/* Hero — passbook ledger motif */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="absolute inset-0 bg-ledger-lines opacity-40 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-20 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] uppercase text-teal mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-teal inline-block" />
              Smart Banking &amp; Financial Platform
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-ink leading-[1.05] tracking-tight">
              Every bank,<br />entered in one ledger.
            </h1>
            <p className="mt-5 text-lg text-ink/60 leading-relaxed max-w-lg">
              BANKOVRA helps you discover, compare, calculate and choose the right Indian bank, loan, investment
              or insurance product — with transparent scoring and sourced, dated figures.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/find-bank" className="px-5 py-3 rounded-md bg-primary text-paper font-semibold text-sm hover:bg-navy-700 transition-colors">
                Find my right bank →
              </Link>
              <Link to="/compare" className="px-5 py-3 rounded-md border border-line bg-white text-ink font-semibold text-sm hover:border-ink/30 transition-colors">
                Compare banks
              </Link>
            </div>
            <p className="mt-6 text-xs text-ink/40 max-w-md">
              Demo/indicative data for comparison. Not a bank. Does not guarantee approval or returns.
            </p>
          </div>

          {/* Passbook entry card */}
          <div className="bg-white rounded-card border border-line shadow-card p-6 sm:p-8 relative">
            <div className="flex items-center justify-between border-b border-line pb-4 mb-2">
              <div>
                <p className="font-display font-semibold text-ink">BANKOVRA Passbook</p>
                <p className="text-xs text-ink/45">Your journey, entry by entry</p>
              </div>
              <span className="stamp text-[10px] font-semibold px-2 py-1 rounded rotate-[-4deg]">VERIFIED SOURCES</span>
            </div>
            <ul>
              {journey.map((j, i) => (
                <li key={j.label}>
                  <Link
                    to={j.to}
                    className="group flex items-start gap-4 py-3.5 border-b border-line last:border-0 hover:bg-paper/60 -mx-2 px-2 rounded"
                  >
                    <span className="font-mono text-xs text-ink/35 tabular pt-0.5 w-6 shrink-0">{j.date}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-ink text-sm group-hover:text-teal transition-colors">{j.label}</p>
                      <p className="text-xs text-ink/50 mt-0.5 leading-relaxed">{j.desc}</p>
                    </div>
                    <span className="text-ink/25 group-hover:text-teal group-hover:translate-x-0.5 transition-all pt-1">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Feature grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <SectionHeading eyebrow="What's inside" title="One platform, every financial decision" description="From choosing an account to running the numbers on a home loan — BANKOVRA keeps the whole decision in one place." />
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f) => (
            <Link key={f.title} to={f.to} className="group rounded-card border border-line bg-white p-5 hover:border-teal/40 hover:shadow-card transition-all">
              <span className="text-2xl">{f.icon}</span>
              <h3 className="mt-3 font-display font-semibold text-ink group-hover:text-teal transition-colors">{f.title}</h3>
              <p className="mt-1.5 text-sm text-ink/55 leading-relaxed">{f.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured banks */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <SectionHeading eyebrow="Bank directory" title="Across every sector" />
          <Link to="/banks" className="text-sm font-semibold text-teal hover:underline shrink-0">Browse all {banks.length} banks →</Link>
        </div>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {banks.slice(0, 6).map((b) => (
            <BankCard key={b.id} bank={b} />
          ))}
        </div>
      </section>

      {/* AI assistant CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-24">
        <div className="rounded-card bg-primary text-paper p-8 sm:p-12 grid lg:grid-cols-2 gap-8 items-center relative overflow-hidden">
          <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-gold/10" />
          <div className="relative">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-gold-light mb-3">BANKOVRA AI Assistant</p>
            <h2 className="font-display text-3xl font-semibold">Ask about charges, EMIs, CIBIL or UPI safety</h2>
            <p className="mt-3 text-paper/60 leading-relaxed">
              Connected to BANKOVRA's own calculators, comparison and eligibility tools — so answers point back to real figures, not guesses.
            </p>
            <Link to="/ai-assistant" className="mt-6 inline-flex px-5 py-3 rounded-md bg-gold text-ink font-semibold text-sm hover:bg-gold-light transition-colors">
              Chat with the assistant →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
