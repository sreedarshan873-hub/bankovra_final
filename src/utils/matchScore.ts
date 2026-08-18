import { Bank, FindBankAnswers, MatchResult } from '../types'

// Transparent, rule-based scoring out of 100. Each rule adds/removes points and
// records a human-readable reason so the score is fully explainable to the user.
export function computeMatches(answers: FindBankAnswers, banks: Bank[]): MatchResult[] {
  const income = parseFloat(answers.income) || 0

  const results: MatchResult[] = banks.map((bank) => {
    let score = 50
    const reasons: string[] = []

    // Minimum balance preference
    const minBal = bank.charges.minBalanceMetro ?? 0
    if (answers.minBalancePreference === 'Zero-balance only') {
      if (bank.charges.zeroBalanceAvailable) {
        score += 15
        reasons.push('Offers a zero-balance account, matching your preference.')
      } else {
        score -= 20
        reasons.push('Does not offer a zero-balance account.')
      }
    } else if (answers.minBalancePreference === 'Low balance okay (under ₹5,000)') {
      if (minBal <= 5000) {
        score += 10
        reasons.push(`Minimum balance requirement (₹${minBal.toLocaleString('en-IN')}) fits your comfort range.`)
      } else {
        score -= 8
        reasons.push(`Minimum balance requirement (₹${minBal.toLocaleString('en-IN')}) is higher than your preference.`)
      }
    } else {
      score += 4
      reasons.push('You indicated minimum balance is not a major concern.')
    }

    // Income-based fit
    if (income > 0) {
      if (income < 25000 && bank.minIncomeFriendly) {
        score += 12
        reasons.push('Well-suited for moderate-income customers (lower balance/charge burden).')
      }
      if (income >= 100000 && !bank.minIncomeFriendly) {
        score += 6
        reasons.push('Premium banking features align with a higher income profile.')
      }
      if (income < 25000 && !bank.minIncomeFriendly) {
        score -= 6
        reasons.push('Minimum balance/charge structure may be relatively high for your income level.')
      }
    }

    // Branch/ATM preference
    if (answers.branchAtmPreference === 'Need physical branches nearby') {
      if (bank.hasBranchNetwork === 'Extensive') { score += 12; reasons.push('Has an extensive branch network.') }
      else if (bank.hasBranchNetwork === 'Moderate') { score += 4; reasons.push('Has a moderate branch presence.') }
      else { score -= 15; reasons.push('Limited or no physical branch network — may not suit your preference.') }
    } else if (answers.branchAtmPreference === 'Prefer fully digital') {
      if (bank.hasBranchNetwork === 'Digital-only') { score += 12; reasons.push('Fully digital — matches your preference.') }
      else if (bank.digitalBanking.length >= 3) { score += 6; reasons.push('Strong digital banking app and features.') }
    }

    // Digital banking preference
    if (answers.digitalBankingPreference === 'Very important') {
      if (bank.digitalBanking.length >= 3) { score += 8; reasons.push('Offers a full digital banking suite (app, UPI, net banking).') }
      else { score -= 5; reasons.push('Digital banking options are relatively limited.') }
    }

    // Loan requirement
    if (answers.loanRequirement && answers.loanRequirement !== 'None right now') {
      const hasLoan = bank.loanProducts.some((l) => l.toLowerCase().includes(answers.loanRequirement.toLowerCase().split(' ')[0]))
      if (hasLoan) { score += 10; reasons.push(`Offers ${answers.loanRequirement} products.`) }
      else if (bank.loanProducts.length === 0) { score -= 10; reasons.push('Does not currently offer loan products.') }
    }

    // Investment requirement
    if (answers.investmentRequirement && answers.investmentRequirement !== 'None right now') {
      if (bank.investmentProducts.length >= 3) { score += 8; reasons.push('Wide range of investment products (FD/RD/mutual funds and more).') }
      else if (bank.investmentProducts.length === 0) { score -= 6; reasons.push('Limited or no investment products offered.') }
    }

    // Employment type & occupation nuance
    if (answers.employmentType === 'Self-Employed / Business' && bank.loanProducts.includes('Business Loan')) {
      score += 6
      reasons.push('Offers Business Loan products, useful for self-employed customers.')
    }
    if (answers.employmentType === 'Student' && bank.charges.zeroBalanceAvailable) {
      score += 8
      reasons.push('Zero-balance option is well suited to students.')
    }

    // Account requirement
    if (answers.accountRequirement && bank.accountTypes.some((a) => a.toLowerCase().includes(answers.accountRequirement.toLowerCase().split(' ')[0]))) {
      score += 6
      reasons.push(`Offers an account type matching "${answers.accountRequirement}".`)
    }

    // Sector-based nuance for rural/semi-urban cities
    if ((answers.city || '').toLowerCase().match(/village|rural|tehsil/) || answers.employmentType === 'Farmer / Agriculture') {
      if (bank.sector === 'Regional Rural Bank' || bank.sector === 'Cooperative Bank') {
        score += 10
        reasons.push('Regional/cooperative banks often have stronger rural credit and service reach.')
      }
    }

    score = Math.max(0, Math.min(100, Math.round(score)))
    return { bank, score, reasons: reasons.slice(0, 5) }
  })

  return results.sort((a, b) => b.score - a.score)
}
