# API Keys & Environment Variables Guide

This document explains how to configure API keys for BANKOVRA.

## Quick Start

1. **Copy the example file:**
   ```bash
   cp .env.example .env.local
   ```

2. **Add your API keys to `.env.local`** (this file is git-ignored, never commit secrets)

3. **Restart your dev server** for changes to take effect

## Available APIs to Integrate

### Investment Data APIs

#### AMFI NAV API (Mutual Funds)
- **Purpose**: Live mutual fund NAV (Net Asset Value) data
- **Setup**:
  1. Register at [AMFI](https://www.amfi.com)
  2. Get your API key
  3. Add to `.env.local`:
     ```
     VITE_INVESTMENT_API_KEY=your_amfi_key
     VITE_INVESTMENT_API_URL=https://api.amfionline.com
     ```

#### NSE Market Data (Shares)
- **Purpose**: Live share prices and market data
- **Setup**:
  1. Visit [NSE API](https://www.nseindia.com)
  2. Get API access for a licensed data vendor
  3. Add to `.env.local`:
     ```
     VITE_NSE_API_KEY=your_nse_key
     ```

#### BSE Market Data (Shares)
- **Purpose**: BSE share prices
- **Setup**:
  1. Visit [BSE](https://www.bseindia.com)
  2. Request API access
  3. Add to `.env.local`:
     ```
     VITE_BSE_API_KEY=your_bse_key
     ```

### AI Assistant API (Optional Enhancement)

If you want to upgrade from hardcoded responses to a real AI:

#### OpenAI API
- **Purpose**: Real AI responses for the assistant
- **Setup**:
  1. Create account at [OpenAI](https://openai.com)
  2. Generate an API key from [API Keys page](https://platform.openai.com/api-keys)
  3. Add to `.env.local`:
     ```
     VITE_AI_API_KEY=sk-...
     VITE_AI_API_URL=https://api.openai.com/v1
     ```

## Environment Variable Reference

| Variable | Purpose | Example |
|----------|---------|---------|
| `VITE_INVESTMENT_API_KEY` | Investment data provider API key | `abc123xyz` |
| `VITE_INVESTMENT_API_URL` | Investment API endpoint | `https://api.example.com` |
| `VITE_AI_API_KEY` | AI service API key | `sk-xxxx` |
| `VITE_AI_API_URL` | AI service endpoint | `https://api.openai.com/v1` |
| `VITE_AMFI_API_KEY` | AMFI-specific API key | `your_key` |
| `VITE_NSE_API_KEY` | NSE-specific API key | `your_key` |
| `VITE_BSE_API_KEY` | BSE-specific API key | `your_key` |
| `VITE_API_TIMEOUT` | Request timeout in ms | `30000` |
| `VITE_ENVIRONMENT` | Environment name | `development` |

## How to Access Variables in Code

Use the `ENV` utility:

```typescript
import { ENV } from '@/utils/env'

// Check if API is configured
if (ENV.hasApiKey('investmentApiKey')) {
  // Make API call
  const response = await fetch(ENV.investmentApiUrl + '/endpoint', {
    headers: { 'Authorization': `Bearer ${ENV.investmentApiKey}` }
  })
}
```

## Security Best Practices

✅ **DO:**
- Keep `.env.local` in `.gitignore` (already configured)
- Use `.env.example` as a template (check it into git)
- Rotate API keys regularly
- Use separate keys for development and production
- Never log API keys to console

❌ **DON'T:**
- Commit `.env.local` to git
- Expose keys in client-side code (consider backend proxy)
- Hardcode secrets in source files
- Share API keys via email or chat

## Current Status

**Integrated APIs:** None (demo data only)

**Ready to Integrate:**
- Investment data (AMFI, NSE, BSE)
- AI responses (OpenAI, others)
- Market data feeds

## Troubleshooting

### Changes not taking effect?
- Restart the dev server: `npm run dev`
- Clear browser cache
- Check `.env.local` syntax (no spaces around `=`)

### "API key not found"?
- Verify variable in `.env.local`
- Ensure it starts with `VITE_`
- Check exact spelling matches code

### CORS errors?
- Consider proxying API requests through backend
- Check API provider CORS configuration
