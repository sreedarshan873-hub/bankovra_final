interface LogoProps {
  variant?: 'dark' | 'light'
  showWordmark?: boolean
  size?: number
}

export default function Logo({ variant = 'dark', showWordmark = true, size = 36 }: LogoProps) {
  const textColor = variant === 'dark' ? 'text-ink' : 'text-white'
  return (
    <div className="flex items-center gap-2.5 select-none">
      <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
        <rect width="48" height="48" rx="10" fill="#0D1B2E" />
        <rect x="9" y="26" width="6" height="13" rx="1.5" fill="#42A5F5" />
        <rect x="18" y="18" width="6" height="21" rx="1.5" fill="#FFFFFF" />
        <rect x="27" y="11" width="6" height="28" rx="1.5" fill="#1656C0" />
        <rect x="9" y="41" width="30" height="2.4" rx="1.2" fill="#FFFFFF" opacity="0.5" />
        <circle cx="38.5" cy="10.5" r="6.5" fill="#42A5F5" />
        <path d="M35.6 10.6l1.8 1.8 3.4-3.6" stroke="#0D1B2E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
      {showWordmark && (
        <span className={`font-display font-semibold tracking-tight ${textColor}`} style={{ fontSize: size * 0.52 }}>
          BANKOVRA
        </span>
      )}
    </div>
  )
}
