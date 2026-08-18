/**
 * Environment variable helper for safely accessing VITE environment variables
 */

interface EnvConfig {
  investmentApiKey: string | undefined;
  investmentApiUrl: string | undefined;
  aiApiKey: string | undefined;
  aiApiUrl: string | undefined;
  amfiApiKey: string | undefined;
  amfiApiUrl: string | undefined;
  nseApiKey: string | undefined;
  bseApiKey: string | undefined;
  apiTimeout: string | number;
  environment: string;
  hasApiKey: (key: string) => boolean;
}

export const ENV: EnvConfig = {
  // Investment API
  investmentApiKey: import.meta.env.VITE_INVESTMENT_API_KEY,
  investmentApiUrl: import.meta.env.VITE_INVESTMENT_API_URL,

  // AI API
  aiApiKey: import.meta.env.VITE_AI_API_KEY,
  aiApiUrl: import.meta.env.VITE_AI_API_URL,

  // Market Data APIs
  amfiApiKey: import.meta.env.VITE_AMFI_API_KEY,
  amfiApiUrl: import.meta.env.VITE_AMFI_API_URL,
  nseApiKey: import.meta.env.VITE_NSE_API_KEY,
  bseApiKey: import.meta.env.VITE_BSE_API_KEY,

  // General config
  apiTimeout: import.meta.env.VITE_API_TIMEOUT || 30000,
  environment: import.meta.env.VITE_ENVIRONMENT || 'development',

  // Check if a key is configured
  hasApiKey: (key: string): boolean => {
    const value = (ENV as any)[key]
    return typeof value === 'string' && value.length > 0
  },
}

export default ENV
