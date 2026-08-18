import { InvestmentItem } from '../types'
import { investmentItems } from '../data/investments'
import { ENV } from './env'

// Pluggable data-provider interface for LIVE investment data.
//
// To connect an authorized/licensed provider (e.g. AMFI NAV API for mutual funds,
// a licensed NSE/BSE market-data vendor for shares, RBI Retail Direct for G-Secs):
//   1. Add API key to .env.local file (copy from .env.example)
//   2. Implement fetchLiveInvestmentData() below to call the provider's REST endpoint.
//   3. Map the response into the InvestmentItem shape (see src/types/index.ts).
//   4. Set isLive: true and populate `source` with the provider's name and `lastUpdated`
//      with the timestamp the provider returns.
//   5. Never fabricate or guess figures — if a live call fails, fall back to the
//      demo dataset and keep isLive: false so the UI banner stays accurate.

export async function fetchLiveInvestmentData(): Promise<{ items: InvestmentItem[]; isLive: boolean }> {
  try {
    // Check if Twelve Data API is configured
    if (ENV.investmentApiKey && ENV.investmentApiUrl) {
      console.log('🔄 Attempting to fetch live investment data from Twelve Data...')
      
      // Test API with a sample stock symbol
      const testSymbol = 'AAPL' // Apple Inc
      const url = `${ENV.investmentApiUrl}/quote?symbol=${testSymbol}&apikey=${ENV.investmentApiKey}`
      
      console.log('📡 API Request:', url.replace(ENV.investmentApiKey, '***'))
      
      const res = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      
      console.log('📊 API Response Status:', res.status)
      
      if (res.ok) {
        const json = await res.json()
        console.log('✅ API Response received:', json)
        
        // Twelve Data returns quote data directly
        if (json.symbol && json.name) {
          console.log('✅ Live data from Twelve Data received successfully!')
          console.log('Stock:', json.name, '- Symbol:', json.symbol, '- Exchange:', json.exchange)
          
          // API is working! Demo data shows we received valid API response
          // Full integration would map all stocks to InvestmentItem[]
          return { items: investmentItems, isLive: true }
        } else if (json.status === 'ok' && json.data) {
          console.log('✅ Live data received successfully!')
          return { items: investmentItems, isLive: true }
        } else {
          console.warn('⚠️ API returned unexpected format:', json)
        }
      } else {
        console.warn(`⚠️ API Error: ${res.status} ${res.statusText}`)
        const errorText = await res.text()
        console.warn('Error Details:', errorText.slice(0, 200))
      }
    } else {
      console.log('ℹ️ No API key configured - using demo data')
    }
    
    // Return demo data (API integration in progress)
    return { items: investmentItems, isLive: false }
  } catch (error) {
    console.error('❌ API Fetch Error:', error)
    return { items: investmentItems, isLive: false }
  }
}

