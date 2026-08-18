export type BankSector =
  | 'Public Sector Bank'
  | 'Private Sector Bank'
  | 'Foreign Bank'
  | 'Small Finance Bank'
  | 'Payments Bank'
  | 'Regional Rural Bank'
  | 'Cooperative Bank'

export interface BankCharges {
  minBalanceMetro?: number
  minBalanceUrban?: number
  minBalanceSemiUrban?: number
  minBalanceRural?: number
  zeroBalanceAvailable: boolean
  nonMaintenanceCharge: string
  atmOwnFree: string
  atmOtherFree: string
  atmCharge: string
  debitCardAnnualFee: string
  cashDepositLimit: string
  cashDepositCharge: string
  chequeBounceCharge: string
  neft: string
  rtgs: string
  imps: string
  smsCharge: string
  accountClosureCharge: string
}

export interface FDRDRates {
  fdGeneralMin: number
  fdGeneralMax: number
  fdSeniorMin: number
  fdSeniorMax: number
  rdGeneralMin: number
  rdGeneralMax: number
}

export interface Bank {
  id: string
  name: string
  shortName: string
  sector: BankSector
  established?: number
  accountTypes: string[]
  loanProducts: string[]
  investmentProducts: string[]
  digitalBanking: string[]
  basicFeatures: string[]
  officialWebsite: string
  charges: BankCharges
  rates: FDRDRates
  hasBranchNetwork: 'Extensive' | 'Moderate' | 'Limited' | 'Digital-only'
  minIncomeFriendly: boolean
  sourceLastUpdated: string
}

export type LoanType =
  | 'Personal Loan'
  | 'Home Loan'
  | 'Education Loan'
  | 'Vehicle Loan'
  | 'Business Loan'
  | 'Gold Loan'
  | 'Loan Against Property'
  | 'Loan Against Securities'

export interface LoanProduct {
  id: string
  type: LoanType
  lender: string
  interestRateMin: number
  interestRateMax: number
  processingFee: string
  maxTenureYears: number
  maxAmount: string
  minCibil: number
  sourceLastUpdated: string
}

export type InsuranceType = 'Term' | 'Health' | 'Vehicle' | 'Travel'

export interface InsuranceProduct {
  id: string
  type: InsuranceType
  provider: string
  planName: string
  coverage: string
  features: string[]
  exclusions: string[]
  officialLink: string
  sourceLastUpdated: string
}

export type InvestmentCategory = 'Mutual Fund' | 'SIP' | 'Share' | 'Bond' | 'FD' | 'RD'

export interface InvestmentItem {
  id: string
  category: InvestmentCategory
  name: string
  currentValue: string
  performance1Y?: string
  performance3Y?: string
  risk: 'Low' | 'Moderate' | 'Moderately High' | 'High' | 'Very High'
  timeHorizon: string
  importantInfo: string
  source: string
  lastUpdated: string
  isLive: boolean
}

export interface FindBankAnswers {
  age: string
  occupation: string
  income: string
  city: string
  employmentType: string
  accountRequirement: string
  minBalancePreference: string
  loanRequirement: string
  investmentRequirement: string
  branchAtmPreference: string
  digitalBankingPreference: string
}

export interface MatchResult {
  bank: Bank
  score: number
  reasons: string[]
}

export interface SavedItem {
  id: string
  type: 'bank' | 'comparison' | 'calculation' | 'recommendation' | 'alert'
  title: string
  detail: string
  savedAt: string
  payload?: any
}
