# BOCHK TradeSafe Credit Co-pilot

A polished fintech roadshow/demo website for the BOCHK Challenge 2026 proposal:
**BOCHK TradeSafe Credit Co-pilot**.

The product positioning is intentionally banking-first: TradeSafe is an internal AI co-pilot for BOCHK relationship managers, credit officers and compliance teams. It supports human decision-making and does not automatically approve or reject SME loans.

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Recharts
- lucide-react icons

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Demo Routes

- `/`
- `/demo`
- `/demo/upload`
- `/demo/verification`
- `/demo/risk-dashboard`
- `/demo/credit-memo`
- `/demo/audit-trail`

## Mock Data

All business, trade, risk, document and audit values are mock data. Replace the content in `data/tradesafe.ts` when connecting to real BOCHK pilot data, anonymised historical cases or backend APIs.
