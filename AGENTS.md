# BOCHK TradeSafe Credit Co-pilot

## Project Overview

This project is a professional prototype for **BOCHK TradeSafe Credit Co-pilot**.

It contains two separated portals:

1. **SME Client Portal**
2. **BOCHK Bank Console**

Build this as an enterprise banking and client portal prototype. Do not create a marketing landing page.

## Technology

- Use Next.js App Router.
- Use TypeScript.
- Use Tailwind CSS.
- Use mock backend API routes only.
- Keep implementation suitable for a responsive prototype across mobile, tablet, laptop, and desktop.

## Entry And Routing Rules

- The login page is the only entry point.
- SME Client users must route to `/client/dashboard`.
- Bank Officer users must route to `/bank/overview`.
- Do not add alternate landing, splash, or marketing pages.

## Portal Layout Rules

### SME Client Portal

- Use top navigation only.
- Do not use a left sidebar in the client portal.
- Client-facing pages must stay focused on application progress, document upload, authorization, status, messages, and help.

### BOCHK Bank Console

- Use a top bar plus a left sidebar.
- The bank console may include document verification, risk dashboard, AI credit memo, approval workflow, audit trail, and post-loan monitoring.

## Data Visibility And Separation

The client portal must never show:

- Internal bank risk scores
- Fraud logic
- Compliance findings
- Credit memo content
- Approval notes
- Internal bank-only workflow details

The bank console may show:

- Document verification
- Risk dashboard
- AI credit memo
- Approval workflow
- Audit trail
- Post-loan monitoring

Keep client and bank concerns separated in routes, navigation, UI copy, and mock API responses.

## Visual References

Use screenshots in the following folders as visual references:

- `/reference/client`
- `/reference/bank`

Follow the intent and information hierarchy of the screenshots while implementing responsive, production-quality prototype screens.

## Design Style

Use a BOCHK-inspired enterprise banking UI:

- BOCHK red: `#A61E2D`
- Navy: `#0B234A`
- Background: `#F8F9FB`
- Border: `#E5E7EB`

The UI should feel professional, restrained, secure, and suitable for banking operations. Avoid consumer marketing styling.

## Implementation Guidance

- Prefer clear route groups and component boundaries for client versus bank surfaces.
- Use mock API routes for simulated backend behavior.
- Keep sensitive internal-bank data out of client components and client mock responses.
- Build complete usable screens rather than static decorative mockups.
- Make navigation and layouts responsive at mobile, tablet, laptop, and desktop sizes.
