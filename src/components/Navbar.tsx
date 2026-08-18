import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Logo from './Logo'

const links = [
  { to: '/banks', label: 'Bank Directory' },
  { to: '/find-bank', label: 'Find My Bank' },
  { to: '/compare', label: 'Compare' },
  { to: '/minimum-balance', label: 'Min. Balance' },
  { to: '/charges', label: 'Charges' },
  { to: '/loans', label: 'Loans & Eligibility' },
  { to: '/calculators', label: 'Calculators' },
  { to: '/investments', label: 'Investments' },
  { to: '/insurance', label: 'Insurance' },
  { to: '/safety', label: 'Safety & Trust' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-paper/95 backdrop-blur border-b border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <NavLink to="/" className="shrink-0" onClick={() => setOpen(false)}>
          <Logo size={32} />
        </NavLink>

        <nav className="hidden lg:flex items-center gap-1 overflow-x-auto">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                  isActive ? 'text-ink bg-gold-light/40' : 'text-ink/70 hover:text-ink hover:bg-ink/5'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          <NavLink to="/ai-assistant" className="px-3 py-2 rounded-md text-sm font-medium text-ink/70 hover:text-ink hover:bg-ink/5">
            AI Assistant
          </NavLink>
          <NavLink
            to="/dashboard"
            className="px-4 py-2 rounded-md text-sm font-semibold bg-primary text-paper hover:bg-navy-700 transition-colors"
          >
            Dashboard
          </NavLink>
        </div>

        <button
          className="lg:hidden p-2 rounded-md text-ink hover:bg-ink/5"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" /> : <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="lg:hidden border-t border-line bg-paper px-4 py-3 flex flex-col gap-0.5 max-h-[75vh] overflow-y-auto">
          {[...links, { to: '/ai-assistant', label: 'AI Assistant' }, { to: '/dashboard', label: 'Dashboard' }].map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `px-3 py-2.5 rounded-md text-sm font-medium ${isActive ? 'text-ink bg-gold-light/40' : 'text-ink/75 hover:bg-ink/5'}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  )
}
