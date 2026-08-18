# BANKOVRA — Smart Banking & Financial Platform

A modern, responsive Indian fintech comparison platform built with **React + TypeScript + Tailwind CSS + Vite**.

## Core journey
Discover → Compare → Calculate → Get Recommendation → Verify → Apply

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build     # production build → dist/
npm run preview   # preview the production build
```

Requires Node.js 18+.

## What's included

| Area | Path |
|---|---|
| Bank Directory (17 banks across all sectors) | `src/pages/BankDirectory.tsx`, `src/data/banks.ts` |
| Bank detail page | `src/pages/BankDetail.tsx` |
| Find the Right Bank (Match Score) | `src/pages/FindBank.tsx`, `src/utils/matchScore.ts` |
| Bank Comparison (2–4 banks) | `src/pages/Compare.tsx` |
| Minimum Balance Finder | `src/pages/MinimumBalanceFinder.tsx` |
| Bank Charges Finder | `src/pages/ChargesFinder.tsx` |
| Loans + Eligibility (merged) | `src/pages/Loans.tsx`, `src/data/loans.ts` |
| Calculators (EMI, SIP, Goal SIP, FD, RD, CI, SI, Savings Goal, Prepayment, Inflation) | `src/pages/Calculators.tsx`, `src/utils/calculators.ts` |
| Live Investments | `src/pages/Investments.tsx`, `src/utils/investmentApi.ts` |
| Insurance (Term/Health/Vehicle/Travel) | `src/pages/Insurance.tsx`, `src/data/insurance.ts` |
| BANKOVRA AI Assistant | `src/pages/AIAssistant.tsx`, `src/utils/assistantKB.ts` |
| Dashboard (saved banks/comparisons/calcs/alerts) | `src/pages/Dashboard.tsx`, `src/context/SavedItemsContext.tsx` |
| Safety & Trust centre | `src/pages/Safety.tsx` |

## Data & sources

All bank, charge, loan and investment figures in this build are **indicative/demo data**, clearly labelled with a
"Source & Last Updated" badge on every card and table. This is intentional — figures such as interest rates, minimum
balance and charges change frequently and must be verified on the bank's/insurer's own official website before you
rely on them for a decision. No fabricated application links are used anywhere; every "Official website" / "Apply"
link points to the institution's real public domain.

## Connecting live data

- **Investments**: `src/utils/investmentApi.ts` is a pluggable adapter. Wire it to an authorized data vendor (e.g. the
  AMFI NAV API for mutual funds, a licensed market-data provider for shares/bonds) and set `isLive: true` once a real
  response is mapped — the UI banner and "Source/Last updated" labels automatically reflect this.
- **Bank charges/rates**: `src/data/banks.ts`, `src/data/loans.ts` and `src/data/insurance.ts` are static TypeScript
  arrays today. For production, replace with calls to your own verified data pipeline (e.g. a backend that scrapes/
  ingests official bank rate-sheets on a schedule) and keep the same `Bank` / `LoanProduct` / `InsuranceProduct` shapes
  defined in `src/types/index.ts`.
- **AI Assistant**: `src/utils/assistantKB.ts` currently uses rule-based keyword matching plus live EMI computation
  via the app's own calculator functions — no external LLM call, no API key required. To upgrade it to a full LLM
  assistant, add a backend endpoint that calls the Anthropic API (`https://api.anthropic.com/v1/messages`) with your
  own API key **server-side** (never expose a key in frontend code), and swap `getAssistantReply()` for a `fetch()`
  to that endpoint.

## Important product rules followed throughout

- ₹ and Indian financial terminology used consistently.
- No loan approval or investment return is ever guaranteed.
- Demo/indicative data is explicitly labelled as such everywhere it appears.
- Every data card shows a source and last-updated date.
- Dashboard data is stored only in the browser's `localStorage` — nothing is sent to a server in this build.

## Tech stack

React 18 · TypeScript · Tailwind CSS · React Router · Vite. No external UI kit — components in `src/components` are
hand-built and reusable across pages.
