import React from 'react'

export function SourceBadge({ text }: { text: string }) {
  const [source, ...rest] = text.split('·')
  return (
    <div className="flex items-start gap-1.5 text-xs text-ink/45 mt-2">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 shrink-0">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4M12 8h.01" strokeLinecap="round" />
      </svg>
      <span>
        {source.trim()}
        {rest.length > 0 && <span className="text-ink/35"> · {rest.join('·').trim()}</span>}
      </span>
    </div>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  center = false,
}: {
  eyebrow?: string
  title: string
  description?: string
  center?: boolean
}) {
  return (
    <div className={`max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow && <p className="text-xs font-semibold tracking-[0.14em] uppercase text-teal mb-2">{eyebrow}</p>}
      <h2 className="font-display text-3xl sm:text-4xl font-semibold text-ink tracking-tight">{title}</h2>
      {description && <p className="mt-3 text-ink/60 leading-relaxed">{description}</p>}
    </div>
  )
}

export function Disclaimer({ children, tone = 'default' }: { children: React.ReactNode; tone?: 'default' | 'warning' }) {
  return (
    <div
      className={`rounded-card border px-4 py-3 text-sm leading-relaxed flex gap-2.5 ${
        tone === 'warning' ? 'border-brick/30 bg-brick-light text-brick' : 'border-line bg-white text-ink/60'
      }`}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 shrink-0">
        <path d="M12 9v4M12 17h.01M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div>{children}</div>
    </div>
  )
}

export function StatBadge({ label, value, tone = 'default' }: { label: string; value: string; tone?: 'default' | 'good' | 'bad' }) {
  const toneClasses =
    tone === 'good' ? 'bg-teal-light text-teal' : tone === 'bad' ? 'bg-brick-light text-brick' : 'bg-ink/5 text-ink/70'
  return (
    <div className={`rounded-full px-3 py-1 text-xs font-semibold ${toneClasses} inline-flex items-center gap-1`}>
      <span className="opacity-70 font-medium">{label}:</span> {value}
    </div>
  )
}

export function Pill({ children }: { children: React.ReactNode }) {
  return <span className="inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-ink/5 text-ink/70">{children}</span>
}

export function LedgerNumber({ label, value, accent = 'ink' }: { label: string; value: string; accent?: 'ink' | 'teal' | 'gold' | 'brick' }) {
  const colorMap: Record<string, string> = { ink: 'text-ink', teal: 'text-teal', gold: 'text-gold-dark', brick: 'text-brick' }
  return (
    <div className="border-b border-line pb-2">
      <p className="text-xs uppercase tracking-wide text-ink/45 font-medium">{label}</p>
      <p className={`font-mono text-2xl font-semibold tabular ${colorMap[accent]}`}>{value}</p>
    </div>
  )
}
