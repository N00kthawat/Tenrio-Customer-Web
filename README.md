# Tenrio Customer Web

Initial project skeleton for the Tenrio customer-facing web application.

## Stack

- Next.js
- React
- TypeScript with strict mode
- Tailwind CSS
- App Router

## Routes

- `/`
- `/pricing`
- `/login`
- `/register`
- `/dashboard`

All routes are intentionally static placeholders for now.

This task does not implement:

- real authentication
- payment
- Microsoft integration
- database access
- Prisma
- custom API endpoints

## Scripts

```bash
npm install
npm run dev
npm run lint
npm run typecheck
```

## Structure

```text
app/
  dashboard/page.tsx
  login/page.tsx
  pricing/page.tsx
  register/page.tsx
  globals.css
  layout.tsx
  page.tsx
components/
  info-card.tsx
  page-shell.tsx
  site-header.tsx
```

## Notes

- The Backend API remains the source of truth for pricing, authentication, payments, and business logic.
- The current dashboard content is a UI-only placeholder to satisfy the initial route and layout requirements.
