import { LoanProduct } from '../types'

const SRC = 'Indicative — verify final rate/fee on lender\u2019s official site · Updated 10 Aug 2026'

export const loanProducts: LoanProduct[] = [
  { id: 'l1', type: 'Personal Loan', lender: 'SBI', interestRateMin: 10.9, interestRateMax: 15.0, processingFee: 'Up to 1.5% + GST', maxTenureYears: 6, maxAmount: '₹20,00,000', minCibil: 700, sourceLastUpdated: SRC },
  { id: 'l2', type: 'Personal Loan', lender: 'HDFC Bank', interestRateMin: 10.5, interestRateMax: 21.0, processingFee: 'Up to 2.5% + GST', maxTenureYears: 6, maxAmount: '₹40,00,000', minCibil: 700, sourceLastUpdated: SRC },
  { id: 'l3', type: 'Personal Loan', lender: 'ICICI Bank', interestRateMin: 10.75, interestRateMax: 19.0, processingFee: 'Up to 2.5% + GST', maxTenureYears: 6, maxAmount: '₹50,00,000', minCibil: 700, sourceLastUpdated: SRC },
  { id: 'l4', type: 'Home Loan', lender: 'SBI', interestRateMin: 8.25, interestRateMax: 9.65, processingFee: 'Up to 0.35% + GST', maxTenureYears: 30, maxAmount: 'As per eligibility', minCibil: 700, sourceLastUpdated: SRC },
  { id: 'l5', type: 'Home Loan', lender: 'HDFC Bank', interestRateMin: 8.35, interestRateMax: 9.85, processingFee: 'Up to 0.5% + GST', maxTenureYears: 30, maxAmount: 'As per eligibility', minCibil: 700, sourceLastUpdated: SRC },
  { id: 'l6', type: 'Home Loan', lender: 'Bank of Baroda', interestRateMin: 8.15, interestRateMax: 9.35, processingFee: 'Up to 0.5% (min ₹8,500)', maxTenureYears: 30, maxAmount: 'As per eligibility', minCibil: 700, sourceLastUpdated: SRC },
  { id: 'l7', type: 'Education Loan', lender: 'SBI', interestRateMin: 8.65, interestRateMax: 11.15, processingFee: 'Nil–₹10,000', maxTenureYears: 15, maxAmount: '₹1,50,00,000 (abroad)', minCibil: 650, sourceLastUpdated: SRC },
  { id: 'l8', type: 'Education Loan', lender: 'Bank of Baroda', interestRateMin: 8.85, interestRateMax: 11.4, processingFee: 'Nil for most courses', maxTenureYears: 15, maxAmount: '₹80,00,000 (abroad)', minCibil: 650, sourceLastUpdated: SRC },
  { id: 'l9', type: 'Vehicle Loan', lender: 'HDFC Bank', interestRateMin: 8.9, interestRateMax: 11.5, processingFee: 'Up to 1% (min ₹3,500)', maxTenureYears: 7, maxAmount: 'Up to on-road price', minCibil: 700, sourceLastUpdated: SRC },
  { id: 'l10', type: 'Vehicle Loan', lender: 'PNB', interestRateMin: 8.65, interestRateMax: 10.9, processingFee: 'Up to 1%', maxTenureYears: 7, maxAmount: 'Up to on-road price', minCibil: 700, sourceLastUpdated: SRC },
  { id: 'l11', type: 'Business Loan', lender: 'ICICI Bank', interestRateMin: 11.5, interestRateMax: 18.0, processingFee: 'Up to 2% + GST', maxTenureYears: 7, maxAmount: '₹2,00,00,000', minCibil: 700, sourceLastUpdated: SRC },
  { id: 'l12', type: 'Business Loan', lender: 'AU Small Finance Bank', interestRateMin: 13.0, interestRateMax: 21.0, processingFee: 'Up to 2.5%', maxTenureYears: 5, maxAmount: '₹75,00,000', minCibil: 675, sourceLastUpdated: SRC },
  { id: 'l13', type: 'Gold Loan', lender: 'SBI', interestRateMin: 8.7, interestRateMax: 9.7, processingFee: '₹0–₹500 flat', maxTenureYears: 3, maxAmount: 'Up to 75% of gold value', minCibil: 0, sourceLastUpdated: SRC },
  { id: 'l14', type: 'Gold Loan', lender: 'Equitas Small Finance Bank', interestRateMin: 9.9, interestRateMax: 24.0, processingFee: 'Up to 1%', maxTenureYears: 3, maxAmount: 'Up to 75% of gold value', minCibil: 0, sourceLastUpdated: SRC },
  { id: 'l15', type: 'Loan Against Property', lender: 'HDFC Bank', interestRateMin: 9.5, interestRateMax: 13.5, processingFee: 'Up to 1% + GST', maxTenureYears: 15, maxAmount: 'Up to 65% of property value', minCibil: 700, sourceLastUpdated: SRC },
  { id: 'l16', type: 'Loan Against Property', lender: 'ICICI Bank', interestRateMin: 9.6, interestRateMax: 13.0, processingFee: 'Up to 1.5% + GST', maxTenureYears: 15, maxAmount: 'Up to 65% of property value', minCibil: 700, sourceLastUpdated: SRC },
  { id: 'l17', type: 'Loan Against Securities', lender: 'Axis Bank', interestRateMin: 10.0, interestRateMax: 13.5, processingFee: 'Up to 1%', maxTenureYears: 3, maxAmount: 'Up to 80% of portfolio value', minCibil: 700, sourceLastUpdated: SRC },
  { id: 'l18', type: 'Loan Against Securities', lender: 'ICICI Bank', interestRateMin: 10.5, interestRateMax: 14.0, processingFee: 'Up to 1%', maxTenureYears: 3, maxAmount: 'Up to 80% of portfolio value', minCibil: 700, sourceLastUpdated: SRC },
]

export const loanTypeInfo: Record<string, { icon: string; blurb: string }> = {
  'Personal Loan': { icon: '💵', blurb: 'Unsecured loan for any personal need — no collateral required.' },
  'Home Loan': { icon: '🏠', blurb: 'Secured loan to buy, build or renovate a home, secured against the property.' },
  'Education Loan': { icon: '🎓', blurb: 'Funds tuition and living costs for higher education in India or abroad.' },
  'Vehicle Loan': { icon: '🚗', blurb: 'Secured loan to buy a new or used two-wheeler or four-wheeler.' },
  'Business Loan': { icon: '📈', blurb: 'Working capital or expansion funding for self-employed and businesses.' },
  'Gold Loan': { icon: '🪙', blurb: 'Quick secured loan against gold jewellery/coins, typically fast disbursal.' },
  'Loan Against Property': { icon: '🏢', blurb: 'Secured loan using residential/commercial property as collateral, for larger amounts.' },
  'Loan Against Securities': { icon: '📊', blurb: 'Loan against mutual funds, shares or bonds without liquidating investments.' },
}
