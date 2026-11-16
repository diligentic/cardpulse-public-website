# CardPulse public website

Next.js App Router, TypeScript, Framer Motion, and Lucide. This repository is the marketing site only; the product and installable PWA remain at `card-scanner-pulse.netlify.app`.

## Run locally

```sh
npm install
npm run dev
```

Open http://localhost:3000. On Windows PowerShell where script execution is restricted, use `npm.cmd` instead of `npm`.

```sh
npm run typecheck
npm run build
npm start
```

With the production server running, use `npm run check:routes` and `npm run check:browser`. Set `TEST_ORIGIN` to override `http://127.0.0.1:3000`. The browser check uses locally installed Chrome, tests all nine pages at 1440, 1024, 768, 390, and 320 pixels, and checks the demo, mobile navigation, FAQ, campaign attribution, contact error state, and runtime errors. Screenshots are saved in the ignored `.qa/` directory. These checks assume contact delivery is intentionally unconfigured, so they never send an external message.

## Included

All eleven homepage sections from `CARDPULSE_PUBLIC_WEBSITE_PLAN.md`, plus How It Works, Pricing, Privacy & Security, About, Contact, Privacy, Terms, and Data Deletion routes. The product preview uses explicitly illustrative data, editable demo fields, and a four-stage workflow. No authentication, billing, or PWA service worker runs on this origin.

Signup links send `plan=free` or `plan=monthly` to the app origin. Approved, bounded UTM values are carried across navigation. The app must honor the tier intent and select its own trusted server-side price. No analytics provider is installed.

Install App links open the product homepage directly. The existing product uses the browser’s installation controls; there is no `/install` route. The marketing website explains browser installation and does not attempt to trigger a cross-origin install prompt.

## Contact delivery

Copy `.env.example` to `.env.local` and configure an approved HTTPS `CONTACT_WEBHOOK_URL`, optionally protected by `CONTACT_WEBHOOK_TOKEN`. The server sends JSON containing `name`, `email`, `topic`, `message`, and `privacyAcknowledged`. Secrets are server-only. A missing or failed delivery service produces an explicit error, never a simulated success. The form uses server validation, an origin check, a honeypot, bounded payloads, and a five-request / 15-minute per-process limiter. Deploy with trusted proxy IP handling and a shared edge/durable rate limiter for multiple instances. The in-memory limiter is not a distributed production spam service.

## Launch dependencies

The brief does not include the dashboard screenshot; the visuals use the supplied brand palette and must be compared with the actual dashboard before launch.

- Supply the legal company identity, verified support contact, final Privacy Policy and Terms.
- Approve Free allowance/reset and feature rules, payment-card requirements, cancellation effective date, retention period, and draft limits. These have deliberately not been inferred.
- Verify product entitlements, pricing, Google scopes/processors, self-service cancellation, and all marketing claims against the existing app.
- Configure and verify the contact delivery service, trusted proxy handling, shared rate limiting, privacy disclosures, and operational deletion process.
- Legal pages are clearly marked drafts and set to `noindex`; replace their copy, remove the draft status and indexing exception, and add them to the sitemap once approved.
- Configure production DNS/TLS and host this Next.js app on `cardpulse.com`; the Next configuration redirects `www.cardpulse.com` permanently to the canonical host. Keep product cookies, OAuth, APIs, manifest, and service worker on the app origin.
- Typography uses Google Fonts with local system fallbacks. Self-host approved fonts if required by the final privacy policy.

No hosting, payment, email, analytics, or product-account credentials are included. This implementation is a local, reviewable website; it does not deploy or modify the product app.
