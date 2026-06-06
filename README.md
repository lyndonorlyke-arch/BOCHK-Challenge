# BOCHK TradeSafe Credit Co-pilot

BOCHK TradeSafe Credit Co-pilot is a responsive fintech product demo for the BOCHK Challenge. It presents an internal corporate-banking workflow where relationship managers, credit officers and compliance teams can review SME trade finance applications, inspect AI-extracted documents, assess portfolio risk and record auditable officer decisions.

The product is governance-first:

- AI assists document extraction, verification, scoring and memo drafting.
- AI does not automatically approve loans.
- Final approval remains with BOCHK credit officers.
- Audit records store hashes and decision metadata, not sensitive customer documents.
- The visual language uses red, navy, white and restrained banking UI patterns without any unauthorised BOCHK logo asset.

## Key Screens

- `/backoffice` - responsive overview dashboard with portfolio KPIs, charts, watchlist, recommendation distribution and system health.
- `/demo/upload` - application upload workflow with required documents, completeness, checklist and extracted data preview.
- `/demo/document-reader` - AI document reader with document preview, extracted fields, confidence scores and missing-field alerts.
- `/demo/audit-trail` - officer approval actions, final decision summary, audit hash cards, governance panel and chronological audit trail.

Additional supporting demo routes remain available:

- `/demo/verification`
- `/demo/risk-dashboard`
- `/demo/credit-memo`

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- Recharts
- lucide-react icons

## Local Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000/backoffice
```

## Verification

Run linting:

```bash
npm run lint
```

Run a production build:

```bash
npm run build
```

## Mock Data

All company names, financing amounts, document values, risk scores, audit hashes and timestamps are mock data for demo purposes. Replace the content in `data/tradesafe.ts` or connect API routes when moving toward an internal pilot.
