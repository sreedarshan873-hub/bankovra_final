import { calcEMI } from './calculators'
import { inr } from './format'

export interface AssistantReply {
  text: string
  toolUsed?: string
  actionLabel?: string
  actionTo?: string
}

interface Topic {
  keywords: string[]
  reply: string
  actionLabel?: string
  actionTo?: string
}

const topics: Topic[] = [
  {
    keywords: ['cibil', 'credit score'],
    reply:
      'CIBIL score ranges from 300\u2013900 and reflects your credit repayment history. 750+ is generally considered good and improves your chance of loan approval and better interest rates. 650\u2013749 is fair — lenders may approve but at a higher rate. Below 650 is riskier and may lead to rejection or a need for a co-applicant. Pay EMIs and credit card bills on time, keep credit utilisation below ~30%, and avoid too many loan enquiries in a short period to build your score.',
    actionLabel: 'Check loan eligibility', actionTo: '/loans',
  },
  {
    keywords: ['kyc'],
    reply:
      'KYC (Know Your Customer) is a mandatory RBI-required identity/address verification using documents like Aadhaar, PAN, passport or voter ID. Banks periodically ask you to re-verify KYC — this should only happen via your branch, the bank\u2019s official app/website, or a verified representative. Never share OTPs, passwords or pay any "fee" to someone claiming to update your KYC over phone or SMS link — that is a common fraud pattern.',
    actionLabel: 'Read KYC safety guide', actionTo: '/safety',
  },
  {
    keywords: ['upi', 'gpay', 'phonepe', 'paytm'],
    reply:
      'UPI PIN is needed only to SEND money, never to receive it. Refuse any "collect request" or QR scan from someone claiming to send you money or a refund. Set sensible transaction limits, verify the payee name before confirming, and use only your bank\u2019s official app or NPCI-listed apps.',
    actionLabel: 'Full UPI safety guide', actionTo: '/safety',
  },
  {
    keywords: ['fraud', 'scam', 'phishing', 'fake loan app', 'cheated', 'otp share'],
    reply:
      'If you suspect fraud: 1) Block your card/UPI immediately via your bank app or 24x7 helpline. 2) Never share an OTP for a transaction you did not initiate. 3) Report at cybercrime.gov.in or call 1930 as soon as possible — prompt reporting can limit your liability under RBI rules for unauthorised transactions.',
    actionLabel: 'Safety & Trust centre', actionTo: '/safety',
  },
  {
    keywords: ['foir'],
    reply:
      'FOIR (Fixed Obligation to Income Ratio) is the % of your monthly income already committed to EMIs and fixed obligations. Most lenders cap total FOIR (including the new loan) at roughly 40\u201350% of monthly income — lower existing EMIs generally mean higher loan eligibility.',
    actionLabel: 'Try eligibility calculator', actionTo: '/loans',
  },
  {
    keywords: ['minimum balance', 'min balance', 'amb', 'zero balance'],
    reply:
      'Minimum balance requirements (often called Average Monthly Balance, or AMB) vary by bank, account type and location (metro/urban/semi-urban/rural). Many banks now offer zero-balance / Basic Savings Bank Deposit accounts (BSBDA) with no AMB requirement but fewer free transactions. Use the Minimum Balance Finder to compare.',
    actionLabel: 'Open Minimum Balance Finder', actionTo: '/minimum-balance',
  },
  {
    keywords: ['charges', 'atm fee', 'debit card fee', 'cheque bounce', 'neft', 'rtgs', 'imps'],
    reply:
      'Bank charges — ATM withdrawals beyond the free limit, debit card annual fee, cash deposit beyond free limit, cheque bounce, and fund transfer (NEFT/RTGS/IMPS) fees — differ across banks and account types. RBI mandates a minimum number of free ATM transactions monthly; check the Charges Finder for a side-by-side comparison with sources.',
    actionLabel: 'Open Charges Finder', actionTo: '/charges',
  },
  {
    keywords: ['sip', 'mutual fund', 'mf'],
    reply:
      'A SIP (Systematic Investment Plan) lets you invest a fixed amount regularly into a mutual fund, averaging your purchase cost over time. Mutual fund returns are market-linked and not guaranteed — past performance does not indicate future results. Match the fund\u2019s risk category and time horizon with your own goals before investing.',
    actionLabel: 'Try SIP calculator', actionTo: '/calculators',
  },
  {
    keywords: ['fd', 'fixed deposit'],
    reply:
      'A Fixed Deposit locks a lump sum for a fixed tenure at a fixed interest rate, usually compounded quarterly. It\u2019s among the safer options (especially with DICGC insurance up to ₹5,00,000 per depositor per bank) but returns are typically lower than market-linked instruments. Senior citizens usually get a higher rate.',
    actionLabel: 'Try FD calculator', actionTo: '/calculators',
  },
  {
    keywords: ['insurance', 'term plan', 'health insurance', 'mediclaim'],
    reply:
      'Term insurance gives pure life cover at low premium (no maturity payout). Health insurance covers hospitalisation costs. Always compare coverage, waiting periods and exclusions — not just premium — and verify final policy wording on the insurer\u2019s official site before buying.',
    actionLabel: 'Browse insurance', actionTo: '/insurance',
  },
  {
    keywords: ['home loan', 'personal loan', 'education loan', 'vehicle loan', 'business loan', 'gold loan', 'loan against property', 'loan against securities', 'loan'],
    reply:
      'BANKOVRA covers 8 loan types — personal, home, education, vehicle, business, gold, loan against property and loan against securities. Use the Loans + Eligibility page to compare interest rates, processing fees and estimate your EMI and indicative eligibility based on income, existing EMIs, age and CIBIL range.',
    actionLabel: 'Open Loans + Eligibility', actionTo: '/loans',
  },
  {
    keywords: ['best bank', 'which bank', 'recommend a bank', 'suggest a bank', 'find a bank'],
    reply:
      'There\u2019s no single "best" bank — it depends on your income, city, minimum-balance comfort, and whether you value branch access or digital banking more. Try Find the Right Bank — answer a short questionnaire and get a transparent BANKOVRA Match Score with reasons for each match.',
    actionLabel: 'Find the right bank', actionTo: '/find-bank',
  },
  {
    keywords: ['compare bank', 'compare accounts'],
    reply:
      'You can compare 2\u20134 banks side by side on minimum balance, zero-balance availability, ATM/debit card charges, cash deposit, cheque bounce, NEFT/RTGS/IMPS, SMS charges, account closure, FD/RD rates, loans, digital banking and investment options.',
    actionLabel: 'Open Compare', actionTo: '/compare',
  },
]

const emiPattern = /emi.{0,15}(?:for|of)?\s*₹?\s*([\d,.]+)\s*(lakh|lac|crore|k)?.{0,20}?(\d+(?:\.\d+)?)\s*%.{0,20}?(\d+(?:\.\d+)?)\s*(year|yr|month)/i

function parseAmount(raw: string, unit?: string): number {
  let n = parseFloat(raw.replace(/,/g, ''))
  if (!unit) return n
  const u = unit.toLowerCase()
  if (u === 'lakh' || u === 'lac') n *= 100000
  else if (u === 'crore') n *= 10000000
  else if (u === 'k') n *= 1000
  return n
}

export function getAssistantReply(query: string): AssistantReply {
  const q = query.trim()
  const lower = q.toLowerCase()

  // Try to compute a live EMI if the message looks like "EMI for 10 lakh at 9% for 5 years"
  const m = q.match(emiPattern)
  if (m) {
    const principal = parseAmount(m[1], m[2])
    const rate = parseFloat(m[3])
    let months = parseFloat(m[4])
    if (/year|yr/i.test(m[5])) months *= 12
    if (principal > 0 && rate > 0 && months > 0) {
      const emi = calcEMI(principal, rate, months)
      return {
        text: `For a loan of ${inr(principal)} at ${rate}% p.a. over ${Math.round(months)} months, the estimated EMI is ${inr(
          Math.round(emi)
        )} per month (indicative — actual EMI depends on the lender's exact calculation method and charges).`,
        toolUsed: 'EMI Calculator',
        actionLabel: 'Open full EMI calculator',
        actionTo: '/calculators',
      }
    }
  }

  for (const topic of topics) {
    if (topic.keywords.some((k) => lower.includes(k))) {
      return { text: topic.reply, actionLabel: topic.actionLabel, actionTo: topic.actionTo }
    }
  }

  return {
    text:
      "I can help with banking basics, charges, loans & EMI, CIBIL, KYC, investments, insurance, UPI safety and fraud awareness. Try asking something like \"EMI for 10 lakh at 9% for 5 years\", \"what is a good CIBIL score\", or \"is UPI safe\" — or tap one of the quick topics below.",
  }
}
