import { InvestmentItem } from '../types'

// LIVE DATA NOTE:
// BANKOVRA is architected to plug into authorized market-data providers (e.g. AMFI for
// mutual fund NAVs, NSE/BSE licensed data vendors, RBI for G-Sec/bond reference rates).
// This build ships with clearly-labeled DEMO/INDICATIVE figures because no authorized
// API credentials are configured in this environment. See src/utils/investmentApi.ts for
// the pluggable fetch interface — swap `isLive: false` demo records for a real provider
// response there once credentials are available.

const DEMO_UPDATED = '10 Aug 2026, 9:00 AM IST (demo snapshot)'

export const investmentItems: InvestmentItem[] = [
  {
    id: 'mf1', category: 'Mutual Fund', name: 'Large Cap Growth Fund (Direct-Growth)',
    currentValue: 'NAV ₹142.37 (demo)', performance1Y: '+14.2% (demo)', performance3Y: '+16.8% CAGR (demo)',
    risk: 'Moderately High', timeHorizon: '5+ years',
    importantInfo: 'Mutual fund investments are subject to market risk. Past performance does not indicate future returns. Read the scheme document carefully.',
    source: 'Demo dataset — connect to AMFI NAV API for live data', lastUpdated: DEMO_UPDATED, isLive: false,
  },
  {
    id: 'mf2', category: 'Mutual Fund', name: 'Flexi Cap Opportunities Fund (Direct-Growth)',
    currentValue: 'NAV ₹88.14 (demo)', performance1Y: '+11.6% (demo)', performance3Y: '+15.1% CAGR (demo)',
    risk: 'High', timeHorizon: '5+ years',
    importantInfo: 'Diversifies across market caps. NAV fluctuates daily with market movement. Not a guaranteed-return product.',
    source: 'Demo dataset — connect to AMFI NAV API for live data', lastUpdated: DEMO_UPDATED, isLive: false,
  },
  {
    id: 'mf3', category: 'Mutual Fund', name: 'Corporate Bond Fund (Direct-Growth)',
    currentValue: 'NAV ₹24.61 (demo)', performance1Y: '+7.4% (demo)', performance3Y: '+6.9% CAGR (demo)',
    risk: 'Moderate', timeHorizon: '2–3 years',
    importantInfo: 'Debt fund — subject to interest-rate and credit risk. Suitable for conservative short-to-medium horizon goals.',
    source: 'Demo dataset — connect to AMFI NAV API for live data', lastUpdated: DEMO_UPDATED, isLive: false,
  },
  {
    id: 'sip1', category: 'SIP', name: 'SIP in Large Cap Growth Fund',
    currentValue: 'Illustrative only — use the SIP calculator', performance1Y: undefined, performance3Y: undefined,
    risk: 'Moderately High', timeHorizon: '5–10+ years',
    importantInfo: 'SIP averages purchase cost over time (rupee-cost averaging) but does not eliminate market risk.',
    source: 'Illustrative — see Calculators for projections', lastUpdated: DEMO_UPDATED, isLive: false,
  },
  {
    id: 'sh1', category: 'Share', name: 'Nifty 50 Index (reference)',
    currentValue: '24,812.35 (demo)', performance1Y: '+9.8% (demo)', performance3Y: '+42.1% (demo)',
    risk: 'High', timeHorizon: '5+ years',
    importantInfo: 'Index level shown for reference only. Individual stock investing carries company-specific and market risk.',
    source: 'Demo dataset — connect to a licensed NSE/BSE data vendor for live quotes', lastUpdated: DEMO_UPDATED, isLive: false,
  },
  {
    id: 'sh2', category: 'Share', name: 'Sensex Index (reference)',
    currentValue: '81,347.62 (demo)', performance1Y: '+10.3% (demo)', performance3Y: '+40.7% (demo)',
    risk: 'High', timeHorizon: '5+ years',
    importantInfo: 'Index level shown for reference only. Not a recommendation to buy or sell any security.',
    source: 'Demo dataset — connect to a licensed NSE/BSE data vendor for live quotes', lastUpdated: DEMO_UPDATED, isLive: false,
  },
  {
    id: 'bd1', category: 'Bond', name: '10-Year Government Security (G-Sec, reference yield)',
    currentValue: 'Yield ~7.05% (demo)', risk: 'Low', timeHorizon: '10 years',
    importantInfo: 'G-Sec yields move inversely to price and are influenced by RBI policy. Sovereign-backed, near-zero credit risk.',
    source: 'Demo dataset — connect to RBI Retail Direct / CCIL for live yields', lastUpdated: DEMO_UPDATED, isLive: false,
  },
  {
    id: 'bd2', category: 'Bond', name: 'AAA-rated Corporate Bond (reference yield)',
    currentValue: 'Yield ~7.85% (demo)', risk: 'Moderate', timeHorizon: '3–5 years',
    importantInfo: 'Corporate bonds carry issuer credit risk in addition to interest-rate risk. Check credit rating before investing.',
    source: 'Demo dataset — connect to a licensed bond data provider for live yields', lastUpdated: DEMO_UPDATED, isLive: false,
  },
  {
    id: 'fd1', category: 'FD', name: 'Bank Fixed Deposit (1-year, general)',
    currentValue: '~6.5%–7.25% p.a. (demo range across banks)', risk: 'Low', timeHorizon: '1 year',
    importantInfo: 'FD returns are fixed at booking. Premature withdrawal usually attracts a penalty. See Bank Directory for bank-wise rates.',
    source: 'See individual bank pages for indicative rates', lastUpdated: DEMO_UPDATED, isLive: false,
  },
  {
    id: 'rd1', category: 'RD', name: 'Bank Recurring Deposit (1-year, general)',
    currentValue: '~6.5%–7.25% p.a. (demo range across banks)', risk: 'Low', timeHorizon: '1 year',
    importantInfo: 'RD requires fixed monthly instalments. Missing instalments may attract a penalty. See Bank Directory for bank-wise rates.',
    source: 'See individual bank pages for indicative rates', lastUpdated: DEMO_UPDATED, isLive: false,
  },
]

export const INVESTMENT_DISCLAIMER =
  'Mutual funds, shares and bonds are subject to market risk. BANKOVRA does not guarantee or promise any returns. Figures shown are demo/indicative unless marked live, and are not investment advice.'
