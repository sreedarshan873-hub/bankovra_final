import { InsuranceProduct } from '../types'

const SRC = 'Indicative — verify policy wording on insurer\u2019s official site · Updated 10 Aug 2026'

export const insuranceProducts: InsuranceProduct[] = [
  {
    id: 'i1', type: 'Term', provider: 'LIC', planName: 'Digi Term',
    coverage: 'Life cover from ₹25,00,000 up to ₹5,00,00,000+',
    features: ['Level & increasing cover options', 'Accidental death benefit rider', 'Tax benefit under Sec 80C/10(10D)'],
    exclusions: ['Suicide within first 12 months (per IRDAI norms)', 'Non-disclosure of material facts', 'Certain high-risk activities unless declared'],
    officialLink: 'https://licindia.in', sourceLastUpdated: SRC,
  },
  {
    id: 'i2', type: 'Term', provider: 'HDFC Life', planName: 'Click 2 Protect Super',
    coverage: 'Life cover from ₹50,00,000 up to ₹10,00,00,000+',
    features: ['Return of premium option', 'Critical illness rider', 'Monthly income payout option'],
    exclusions: ['Suicide within first 12 months', 'War/self-inflicted injury', 'Pre-existing conditions not disclosed'],
    officialLink: 'https://www.hdfclife.com', sourceLastUpdated: SRC,
  },
  {
    id: 'i3', type: 'Health', provider: 'Star Health', planName: 'Star Comprehensive',
    coverage: 'Sum insured from ₹5,00,000 up to ₹1,00,00,000',
    features: ['Cashless treatment at network hospitals', 'No-claim bonus up to 50%', 'Covers modern treatments (day-care)'],
    exclusions: ['Pre-existing diseases for initial waiting period (2–4 yrs)', 'Cosmetic treatment', 'Self-inflicted injury'],
    officialLink: 'https://www.starhealth.in', sourceLastUpdated: SRC,
  },
  {
    id: 'i4', type: 'Health', provider: 'ICICI Lombard', planName: 'Complete Health Insurance',
    coverage: 'Sum insured from ₹3,00,000 up to ₹50,00,000',
    features: ['Restore benefit on sum insured exhaustion', 'Annual health check-up', 'Wide cashless hospital network'],
    exclusions: ['30-day initial waiting period (except accidents)', 'Specified disease waiting period', 'Non-allopathic treatment (unless opted)'],
    officialLink: 'https://www.icicilombard.com', sourceLastUpdated: SRC,
  },
  {
    id: 'i5', type: 'Vehicle', provider: 'HDFC ERGO', planName: 'Car Comprehensive Insurance',
    coverage: 'Own-damage + third-party liability as per IRDAI tariff',
    features: ['Cashless garage network', 'Zero depreciation add-on available', 'Roadside assistance add-on'],
    exclusions: ['Driving without valid licence', 'Driving under influence', 'Consequential/wear-and-tear damage'],
    officialLink: 'https://www.hdfcergo.com', sourceLastUpdated: SRC,
  },
  {
    id: 'i6', type: 'Vehicle', provider: 'Bajaj Allianz', planName: 'Two Wheeler Insurance',
    coverage: 'Own-damage + mandatory third-party liability',
    features: ['Personal accident cover for owner-driver', 'No-claim bonus protection add-on', 'Instant online policy issuance'],
    exclusions: ['Racing/speed-testing use', 'Mechanical breakdown', 'Use without valid registration'],
    officialLink: 'https://www.bajajallianz.com', sourceLastUpdated: SRC,
  },
  {
    id: 'i7', type: 'Travel', provider: 'Tata AIG', planName: 'Travel Guard International',
    coverage: 'Medical + baggage + trip cover up to USD 5,00,000',
    features: ['Emergency medical evacuation', 'Trip cancellation/delay cover', 'Lost passport assistance'],
    exclusions: ['Pre-existing medical conditions (unless opted)', 'Adventure sports (unless add-on)', 'Travel against medical advice'],
    officialLink: 'https://www.tataaig.com', sourceLastUpdated: SRC,
  },
  {
    id: 'i8', type: 'Travel', provider: 'ICICI Lombard', planName: 'Overseas Travel Insurance',
    coverage: 'Medical + trip cover up to USD 2,50,000',
    features: ['Cashless hospitalisation abroad', 'Missed connection cover', 'Study/Business/Leisure variants'],
    exclusions: ['Pregnancy/childbirth-related expenses', 'Self-inflicted injury', 'Travel to sanctioned/high-risk countries'],
    officialLink: 'https://www.icicilombard.com', sourceLastUpdated: SRC,
  },
]
