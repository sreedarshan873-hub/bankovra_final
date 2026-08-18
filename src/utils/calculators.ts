// All formulas are standard Indian financial-calculator formulas.
// Results are estimates for illustration and are not a guarantee of eligibility, approval or returns.

export function calcEMI(principal: number, annualRatePct: number, tenureMonths: number) {
  const r = annualRatePct / 12 / 100
  if (r === 0) return principal / tenureMonths
  const emi = (principal * r * Math.pow(1 + r, tenureMonths)) / (Math.pow(1 + r, tenureMonths) - 1)
  return emi
}

export function calcEMISchedule(principal: number, annualRatePct: number, tenureMonths: number) {
  const emi = calcEMI(principal, annualRatePct, tenureMonths)
  const totalPayment = emi * tenureMonths
  const totalInterest = totalPayment - principal
  return { emi, totalPayment, totalInterest }
}

export function calcSIPFutureValue(monthlyAmount: number, annualReturnPct: number, years: number) {
  const n = years * 12
  const r = annualReturnPct / 12 / 100
  if (r === 0) return monthlyAmount * n
  const fv = monthlyAmount * ((Math.pow(1 + r, n) - 1) / r) * (1 + r)
  const invested = monthlyAmount * n
  return { futureValue: fv, invested, gains: fv - invested }
}

export function calcGoalSIP(goalAmount: number, annualReturnPct: number, years: number) {
  const n = years * 12
  const r = annualReturnPct / 12 / 100
  if (r === 0) return goalAmount / n
  const monthly = goalAmount / (((Math.pow(1 + r, n) - 1) / r) * (1 + r))
  return monthly
}

export function calcFD(principal: number, annualRatePct: number, years: number, compoundingPerYear = 4) {
  const n = compoundingPerYear
  const amount = principal * Math.pow(1 + annualRatePct / 100 / n, n * years)
  return { maturityAmount: amount, interestEarned: amount - principal }
}

export function calcRD(monthlyAmount: number, annualRatePct: number, months: number) {
  const r = annualRatePct / 400 // quarterly-compounded approximation per quarter, converted
  const n = months
  // Standard RD maturity formula (quarterly compounding approximation used by Indian banks)
  const i = annualRatePct / 100 / 4
  let maturity = 0
  for (let m = 1; m <= n; m++) {
    const quartersRemaining = (n - m + 1) / 3
    maturity += monthlyAmount * Math.pow(1 + i, quartersRemaining)
  }
  const invested = monthlyAmount * n
  return { maturityAmount: maturity, invested, interestEarned: maturity - invested }
}

export function calcCompoundInterest(principal: number, annualRatePct: number, years: number, compoundingPerYear = 1) {
  const n = compoundingPerYear
  const amount = principal * Math.pow(1 + annualRatePct / 100 / n, n * years)
  return { amount, interestEarned: amount - principal }
}

export function calcSimpleInterest(principal: number, annualRatePct: number, years: number) {
  const interest = (principal * annualRatePct * years) / 100
  return { interest, amount: principal + interest }
}

export function calcSavingsGoal(goalAmount: number, years: number, annualReturnPct: number) {
  return calcGoalSIP(goalAmount, annualReturnPct, years)
}

export function calcLoanPrepayment(
  principal: number,
  annualRatePct: number,
  tenureMonths: number,
  prepaymentAmount: number,
  prepaymentMonth: number
) {
  const r = annualRatePct / 12 / 100
  const emi = calcEMI(principal, annualRatePct, tenureMonths)
  let balance = principal
  let monthsElapsed = 0
  let totalInterestOriginal = 0
  for (let m = 1; m <= tenureMonths; m++) {
    const interest = balance * r
    totalInterestOriginal += interest
    balance -= emi - interest
  }

  balance = principal
  let totalInterestNew = 0
  let month = 0
  while (balance > 0.5 && month < tenureMonths) {
    month++
    const interest = balance * r
    let principalPaid = emi - interest
    totalInterestNew += interest
    balance -= principalPaid
    if (month === prepaymentMonth) {
      balance -= prepaymentAmount
      if (balance < 0) balance = 0
    }
  }
  monthsElapsed = month

  return {
    emi,
    originalTenureMonths: tenureMonths,
    newTenureMonths: monthsElapsed,
    monthsSaved: tenureMonths - monthsElapsed,
    totalInterestOriginal,
    totalInterestNew,
    interestSaved: totalInterestOriginal - totalInterestNew,
  }
}

export function calcInflationAdjusted(currentAmount: number, inflationPct: number, years: number) {
  const futureCost = currentAmount * Math.pow(1 + inflationPct / 100, years)
  return { futureCost, extraCost: futureCost - currentAmount }
}

// Loan eligibility estimator using FOIR (Fixed Obligation to Income Ratio) — a common
// indicative lender heuristic. Real approval depends on the lender's own credit policy.
export function estimateLoanEligibility(params: {
  monthlyIncome: number
  existingEMIs: number
  age: number
  employmentType: 'Salaried' | 'Self-Employed' | 'Business Owner'
  annualRatePct: number
  tenureYears: number
  cibilRange: '<650' | '650-699' | '700-749' | '750-799' | '800+'
}) {
  const { monthlyIncome, existingEMIs, age, employmentType, annualRatePct, tenureYears, cibilRange } = params

  let foirCap = 0.5
  if (employmentType === 'Salaried') foirCap = 0.55
  if (employmentType === 'Self-Employed') foirCap = 0.5
  if (employmentType === 'Business Owner') foirCap = 0.45

  if (cibilRange === '800+') foirCap += 0.05
  if (cibilRange === '<650') foirCap -= 0.1
  if (cibilRange === '650-699') foirCap -= 0.05

  foirCap = Math.max(0.2, Math.min(0.65, foirCap))

  const maxEMIAffordable = Math.max(0, monthlyIncome * foirCap - existingEMIs)

  const r = annualRatePct / 12 / 100
  const n = tenureYears * 12
  let eligiblePrincipal = 0
  if (r > 0) {
    eligiblePrincipal = (maxEMIAffordable * (Math.pow(1 + r, n) - 1)) / (r * Math.pow(1 + r, n))
  } else {
    eligiblePrincipal = maxEMIAffordable * n
  }

  const maxAgeAtMaturity = employmentType === 'Salaried' ? 60 : 65
  const ageAdjustedTenure = Math.max(1, Math.min(tenureYears, maxAgeAtMaturity - age))
  let ageAdjustedPrincipal = eligiblePrincipal
  if (ageAdjustedTenure < tenureYears) {
    const n2 = ageAdjustedTenure * 12
    if (r > 0) {
      ageAdjustedPrincipal = (maxEMIAffordable * (Math.pow(1 + r, n2) - 1)) / (r * Math.pow(1 + r, n2))
    } else {
      ageAdjustedPrincipal = maxEMIAffordable * n2
    }
  }

  const currentFOIR = monthlyIncome > 0 ? ((existingEMIs) / monthlyIncome) * 100 : 0

  return {
    foirCapPct: foirCap * 100,
    maxEMIAffordable,
    indicativeEligibleAmount: Math.max(0, ageAdjustedPrincipal),
    ageAdjustedTenureYears: ageAdjustedTenure,
    currentFOIRPct: currentFOIR,
  }
}
