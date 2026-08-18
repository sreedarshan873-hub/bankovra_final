import { useMemo, useState } from 'react'
import { insuranceProducts } from '../data/insurance'
import { InsuranceType } from '../types'
import { SectionHeading, SourceBadge, Disclaimer, Pill } from '../components/Shared'

const types: InsuranceType[] = ['Term', 'Health', 'Vehicle', 'Travel']

const typeInfo: Record<InsuranceType, { icon: string; blurb: string }> = {
  Term: { icon: '🛡️', blurb: 'Pure life cover — a large payout to your family if something happens to you, at a low premium.' },
  Health: { icon: '🏥', blurb: 'Covers hospitalisation and medical costs for you and your family, usually with cashless network hospitals.' },
  Vehicle: { icon: '🚗', blurb: 'Mandatory third-party cover plus optional own-damage protection for your car or two-wheeler.' },
  Travel: { icon: '✈️', blurb: 'Medical emergencies, trip cancellation, lost baggage and other cover for travel within India or abroad.' },
}

export default function Insurance() {
  const [active, setActive] = useState<InsuranceType>('Term')
  const filtered = useMemo(() => insuranceProducts.filter((p) => p.type === active), [active])

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
      <SectionHeading
        eyebrow="Insurance"
        title="Term, health, vehicle & travel cover"
        description="Compare coverage, features and exclusions across insurers before you buy. Always read the policy wording on the official site."
      />

      <div className="mt-8 flex flex-wrap gap-2">
        {types.map((t) => (
          <button
            key={t}
            onClick={() => setActive(t)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              active === t ? 'bg-ink text-paper border-ink' : 'bg-white text-ink/70 border-line hover:border-ink/30'
            }`}
          >
            {typeInfo[t].icon} {t}
          </button>
        ))}
      </div>
      <p className="mt-4 text-ink/60 max-w-2xl">{typeInfo[active].blurb}</p>

      <div className="mt-6 grid sm:grid-cols-2 gap-5">
        {filtered.map((p) => (
          <div key={p.id} className="rounded-card border border-line bg-white p-5 shadow-card flex flex-col">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-wide text-ink/45 font-medium">{p.provider}</p>
                <h3 className="font-display text-lg font-semibold text-ink mt-0.5">{p.planName}</h3>
              </div>
              <Pill>{p.type}</Pill>
            </div>

            <div className="mt-3 rounded-md bg-teal-light px-3 py-2 text-sm text-teal font-medium">{p.coverage}</div>

            <div className="mt-4">
              <p className="text-xs uppercase tracking-wide text-ink/45 font-medium mb-1.5">Key features</p>
              <ul className="space-y-1 text-sm text-ink/70">
                {p.features.map((f, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-teal">✓</span> {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4">
              <p className="text-xs uppercase tracking-wide text-ink/45 font-medium mb-1.5">Exclusions</p>
              <ul className="space-y-1 text-sm text-ink/70">
                {p.exclusions.map((f, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-brick">✕</span> {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto pt-4 flex items-center justify-between">
              <SourceBadge text={p.sourceLastUpdated} />
              <a
                href={p.officialLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-navy hover:text-gold-dark whitespace-nowrap ml-3"
              >
                Official site →
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <Disclaimer tone="warning">
          Coverage, premiums and exclusions shown are indicative and change frequently. Always verify the current policy
          wording, premium and claim process on the insurer's official website or with an IRDAI-licensed advisor before
          purchasing. BANKOVRA does not sell insurance or earn commission on any policy shown here.
        </Disclaimer>
      </div>
    </div>
  )
}
