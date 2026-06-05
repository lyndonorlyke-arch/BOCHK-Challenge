# BOCHK TradeSafe Credit Co-pilot

A polished fintech roadshow/demo website for the BOCHK Challenge 2026 proposal:
**BOCHK TradeSafe Credit Co-pilot**.

TradeSafe is an internal, banking-grade AI co-pilot for BOCHK relationship managers, credit officers and compliance teams. It turns fragmented SME trade finance evidence into explainable creditworthiness, transaction authenticity, AML/fraud risk insights, credit memo drafts and audit records.

The product positioning is intentionally governance-first:

- It is not a generic chatbot.
- It is not an automatic loan approval engine.
- It supports human decision-making.
- Final approval remains with BOCHK credit officers.

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

## Verification

```bash
npm run lint
npm run build
```

## Demo Routes

- `/`
- `/backoffice`
- `/demo`
- `/demo/upload`
- `/demo/verification`
- `/demo/risk-dashboard`
- `/demo/credit-memo`
- `/demo/audit-trail`

`/backoffice` is the internal application queue. It shows multiple SME applicants grouped by:

- 資料齊全待審批
- 缺少資料
- 可疑需覆核
- 已批核 / 條件批核

## Mock Data

All business, trade, risk, document and audit values are mock data. Replace the content in `data/tradesafe.ts` when connecting to real BOCHK pilot data, anonymised historical cases or backend APIs.

## Design Notes

The visual system uses a BOCHK-adjacent corporate banking palette: navy, red, white and light grey. No official BOCHK logo or unauthorised brand asset is used; the site uses a text logo and a small geometric red mark for the TradeSafe concept.
