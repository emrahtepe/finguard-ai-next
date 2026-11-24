# FinGuard AI

AI-assisted FinTech Transaction & Risk Compliance Dashboard built with **Next.js (App Router)**, **React 19**, **TypeScript (`strict`)**, **Tailwind CSS**, **Zod**, **Vercel AI SDK + Gemini**, and **Vitest**.

## Architecture Highlights

- **Next.js App Router & RSC:** Server-rendered initial ledger (`src/app/page.tsx`) with `<Suspense>` streaming boundary and URL-synced search/filter state (`useSearchParams`).
- **Optimistic UI & Server Actions:** Instant `Approve` / `Flag` / `Freeze` triage via `useOptimistic` + Zod-validated Server Action (`src/app/actions.ts`) with an immutable audit trail.
- **Applied AI + Deterministic Tool Grounding:** `POST /api/analyze` runs deterministic FinTech risk checks (`convertToUsd`, `checkVelocityLimit`, `lookupMerchantRisk`) and synthesizes a Zod-validated `RiskReport` via **Google Gemini (`@ai-sdk/google`)**, with a zero-config deterministic policy fallback when no API key is present.
- **Security First:**
  - Strict `Content-Security-Policy`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Permissions-Policy` in `next.config.ts`.
  - Prompt-injection sanitizer (`sanitizePromptInput`) stripping invisible/bidi Unicode characters and neutralizing adversarial directives before LLM calls.
  - Sliding-window IP rate limiter (`checkRateLimit`, HTTP `429` + `Retry-After`) on `/api/analyze`.
  - Full keyboard accessibility (`tabIndex`, `Enter`/`Space` row selection, ARIA labels, `aria-live="polite"`).

## Quick Start

```bash
npm install
cp .env.example .env.local   # Optional: add GOOGLE_GENERATIVE_AI_API_KEY
npm run dev
```

## Verification

```bash
npm run typecheck
npm test
npm run build
```
