import { SectionHeading, Disclaimer, SourceBadge } from '../components/Shared'

const topics = [
  {
    icon: '📱',
    title: 'UPI safety',
    points: [
      'You never need to enter your UPI PIN to receive money — only to send it.',
      'Never scan a QR code or approve a "collect request" from someone claiming to send you a refund or cashback.',
      'Set a reasonable per-transaction UPI limit in your app and review linked accounts periodically.',
      'Use your bank\u2019s official app or NPCI-approved apps only; verify the payee name shown before confirming.',
    ],
  },
  {
    icon: '🎣',
    title: 'Phishing & fake bank messages',
    points: [
      'Banks never ask for your PIN, OTP, CVV or password over call, SMS or email.',
      'Check sender IDs carefully — fraudulent SMS/email often mimics official formats with a slightly altered link.',
      'Do not click links in unsolicited messages claiming your account, PAN or KYC will be "blocked in 24 hours".',
      'Type your bank\u2019s URL directly into the browser instead of clicking links from messages.',
    ],
  },
  {
    icon: '📲',
    title: 'Fake loan apps',
    points: [
      'Genuine lenders are RBI-registered NBFCs or banks — verify on the RBI website before installing any loan app.',
      'Be wary of apps offering instant loans with no documentation, extremely high processing fees, or that demand access to your contacts and gallery.',
      'Harassment or threats from a lending app or recovery agent can be reported to local police and the RBI.',
      'Legitimate lenders provide a written loan agreement with clear interest rate, tenure and charges before disbursal.',
    ],
  },
  {
    icon: '🔐',
    title: 'OTP safety',
    points: [
      'An OTP is a one-time key to authorise a transaction you initiated — never share it, even with someone claiming to be from your bank.',
      'If you receive an OTP for a transaction you did not initiate, do not share it and contact your bank immediately.',
      'Avoid saving OTPs or reading them aloud on speakerphone in public.',
    ],
  },
  {
    icon: '🪪',
    title: 'KYC safety',
    points: [
      'KYC updates happen through your bank branch, official app/website, or an authorised representative with proper ID — never through a random SMS link.',
      'Never share Aadhaar OTP, PAN details or bank credentials with anyone claiming to "update KYC" over a phone call.',
      'Periodic KYC re-verification is a normal RBI-mandated process — but it never requires payment or your account PIN.',
    ],
  },
  {
    icon: '🚨',
    title: 'General fraud awareness',
    points: [
      'If you suspect fraud, report immediately on the National Cybercrime Reporting Portal (cybercrime.gov.in) or call 1930.',
      'Freeze/block your card or UPI immediately via your bank app or customer care if you notice unauthorised transactions.',
      'Under RBI\u2019s limited liability rules, reporting an unauthorised transaction promptly can reduce your liability — delay increases risk.',
      'Never trust investment or job offers that guarantee unusually high, risk-free returns.',
    ],
  },
]

export default function Safety() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
      <SectionHeading
        eyebrow="Safety & trust"
        title="Bank safely, spot fraud early"
        description="Practical, source-checked guidance on UPI, phishing, fake loan apps, OTPs and KYC — the most common ways people lose money to fraud in India."
      />

      <div className="mt-10 grid sm:grid-cols-2 gap-5">
        {topics.map((t) => (
          <div key={t.title} className="rounded-card border border-line bg-white p-5 shadow-card">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">{t.icon}</span>
              <h3 className="font-display text-lg font-semibold text-ink">{t.title}</h3>
            </div>
            <ul className="mt-3 space-y-2 text-sm text-ink/70">
              {t.points.map((p, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-gold-dark mt-0.5 shrink-0">•</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-card border border-line bg-white p-6 shadow-card">
        <h3 className="font-display text-lg font-semibold text-ink">Official sources to bookmark</h3>
        <ul className="mt-3 grid sm:grid-cols-2 gap-2 text-sm">
          <li>
            <a className="text-navy font-medium hover:text-gold-dark" href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer">
              National Cybercrime Reporting Portal — cybercrime.gov.in
            </a>{' '}
            <span className="text-ink/50">(or dial 1930)</span>
          </li>
          <li>
            <a className="text-navy font-medium hover:text-gold-dark" href="https://www.rbi.org.in" target="_blank" rel="noopener noreferrer">
              Reserve Bank of India — rbi.org.in
            </a>{' '}
            <span className="text-ink/50">(verify NBFC/lender registration)</span>
          </li>
          <li>
            <a className="text-navy font-medium hover:text-gold-dark" href="https://sachet.rbi.org.in" target="_blank" rel="noopener noreferrer">
              SACHET — sachet.rbi.org.in
            </a>{' '}
            <span className="text-ink/50">(check/report unauthorised deposit schemes)</span>
          </li>
          <li>
            <a className="text-navy font-medium hover:text-gold-dark" href="https://www.npci.org.in" target="_blank" rel="noopener noreferrer">
              NPCI (UPI) — npci.org.in
            </a>
          </li>
        </ul>
        <div className="mt-4">
          <SourceBadge text="Compiled from RBI and NPCI public consumer-awareness guidance · Updated 10 Aug 2026" />
        </div>
      </div>

      <div className="mt-8">
        <Disclaimer tone="warning">
          This page is general safety awareness content, not a substitute for official RBI/NPCI/police guidance. If you
          have already lost money to fraud, contact your bank's 24x7 helpline immediately to block your card/UPI, then
          file a report at cybercrime.gov.in or call 1930.
        </Disclaimer>
      </div>
    </div>
  )
}
