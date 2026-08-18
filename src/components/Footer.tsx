import { Link } from 'react-router-dom'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="bg-ink text-paper/80 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid gap-10 md:grid-cols-4">
        <div>
          <Logo variant="light" size={32} />
          <p className="mt-4 text-sm leading-relaxed text-paper/60 max-w-xs">
            Discover, compare, calculate and choose the right Indian banking and financial products — transparently.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-paper text-sm mb-3">Explore</h4>
          <ul className="space-y-2 text-sm text-paper/60">
            <li><Link to="/banks" className="hover:text-gold-light">Bank Directory</Link></li>
            <li><Link to="/find-bank" className="hover:text-gold-light">Find the Right Bank</Link></li>
            <li><Link to="/compare" className="hover:text-gold-light">Compare Banks</Link></li>
            <li><Link to="/loans" className="hover:text-gold-light">Loans &amp; Eligibility</Link></li>
            <li><Link to="/calculators" className="hover:text-gold-light">Calculators</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-paper text-sm mb-3">More</h4>
          <ul className="space-y-2 text-sm text-paper/60">
            <li><Link to="/investments" className="hover:text-gold-light">Investments</Link></li>
            <li><Link to="/insurance" className="hover:text-gold-light">Insurance</Link></li>
            <li><Link to="/safety" className="hover:text-gold-light">Safety &amp; Trust</Link></li>
            <li><Link to="/ai-assistant" className="hover:text-gold-light">AI Assistant</Link></li>
            <li><Link to="/dashboard" className="hover:text-gold-light">Dashboard</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-paper text-sm mb-3">Important</h4>
          <p className="text-xs leading-relaxed text-paper/50">
            BANKOVRA is an independent comparison platform, not a bank or lender. Figures shown are indicative/demo
            unless stated otherwise and may not reflect current official terms. BANKOVRA does not guarantee loan
            approval or investment returns. Always verify on the official bank/insurer/AMC website before applying.
          </p>
        </div>
      </div>

      <div className="border-t border-paper/10 py-4 text-center text-xs text-paper/40">
        © {new Date().getFullYear()} BANKOVRA. For illustrative &amp; comparison purposes only.
      </div>
    </footer>
  )
}
