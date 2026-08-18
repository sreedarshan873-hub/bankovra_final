import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSavedItems } from '../context/SavedItemsContext'
import { SectionHeading, Pill, Disclaimer } from '../components/Shared'
import { SavedItem } from '../types'

const tabs: { key: SavedItem['type'] | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'bank', label: 'Favourite banks' },
  { key: 'comparison', label: 'Comparisons' },
  { key: 'calculation', label: 'Calculations' },
  { key: 'recommendation', label: 'Recommendations' },
  { key: 'alert', label: 'Alerts' },
]

function fmtDate(iso: string) {
  return new Date(iso).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export default function Dashboard() {
  const { items, removeItem, clearAll, addItem } = useSavedItems()
  const [tab, setTab] = useState<(typeof tabs)[number]['key']>('all')

  const shown = tab === 'all' ? items : items.filter((i) => i.type === tab)

  const [alertBank, setAlertBank] = useState('')

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <SectionHeading
          eyebrow="Your dashboard"
          title="Everything you've saved, in one place"
          description="Favourite banks, saved comparisons, calculator results and recommendations — stored on this device."
        />
        {items.length > 0 && (
          <button
            onClick={() => confirm('Clear everything saved on this device?') && clearAll()}
            className="text-sm font-medium text-brick hover:underline whitespace-nowrap mt-1"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Quick rate alert form */}
      <div className="mt-8 rounded-card border border-line bg-white p-5 shadow-card">
        <h3 className="font-display text-base font-semibold text-ink">Set a simple alert</h3>
        <p className="text-sm text-ink/60 mt-1">
          Save a reminder to check a bank's rate, offer or renewal date — BANKOVRA stores it here for you to revisit.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (!alertBank.trim()) return
            addItem({ type: 'alert', title: alertBank.trim(), detail: 'Manual reminder — check current rate/offer on the official site.' })
            setAlertBank('')
          }}
          className="mt-3 flex flex-col sm:flex-row gap-2"
        >
          <input
            value={alertBank}
            onChange={(e) => setAlertBank(e.target.value)}
            placeholder="e.g. Check HDFC FD rate before 30 Sept"
            className="flex-1 rounded-md border border-line px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal/40"
          />
          <button type="submit" className="rounded-md bg-ink text-paper px-4 py-2 text-sm font-semibold hover:bg-navy-700">
            Save alert
          </button>
        </form>
      </div>

      {/* Tabs */}
      <div className="mt-8 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              tab === t.key ? 'bg-ink text-paper border-ink' : 'bg-white text-ink/70 border-line hover:border-ink/30'
            }`}
          >
            {t.label} {t.key !== 'all' && `(${items.filter((i) => i.type === t.key).length})`}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {shown.length === 0 ? (
          <div className="rounded-card border border-dashed border-line bg-white p-10 text-center">
            <p className="text-ink/60">Nothing saved here yet.</p>
            <p className="text-sm text-ink/45 mt-1">
              Use the "Save" buttons on the{' '}
              <Link to="/banks" className="text-navy font-medium hover:text-gold-dark">
                Bank Directory
              </Link>
              ,{' '}
              <Link to="/compare" className="text-navy font-medium hover:text-gold-dark">
                Compare
              </Link>{' '}
              or{' '}
              <Link to="/calculators" className="text-navy font-medium hover:text-gold-dark">
                Calculators
              </Link>{' '}
              pages to build your dashboard.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {shown.map((item) => (
              <div key={item.id} className="rounded-card border border-line bg-white p-5 shadow-card">
                <div className="flex items-start justify-between gap-3">
                  <Pill>{item.type}</Pill>
                  <button onClick={() => removeItem(item.id)} aria-label="Remove" className="text-ink/40 hover:text-brick text-sm">
                    Remove
                  </button>
                </div>
                <h3 className="font-display text-base font-semibold text-ink mt-2">{item.title}</h3>
                <p className="text-sm text-ink/60 mt-1 whitespace-pre-line">{item.detail}</p>
                <p className="text-xs text-ink/40 mt-3">Saved {fmtDate(item.savedAt)}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-10">
        <Disclaimer>
          Dashboard data is stored only in this browser (local storage), not on a BANKOVRA server. Clearing your browser
          data or switching devices will not carry it over.
        </Disclaimer>
      </div>
    </div>
  )
}
