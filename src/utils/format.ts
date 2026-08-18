export function inr(value: number, decimals = 0): string {
  if (!isFinite(value)) return '₹0'
  return '₹' + value.toLocaleString('en-IN', { maximumFractionDigits: decimals, minimumFractionDigits: decimals })
}

export function pct(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`
}
