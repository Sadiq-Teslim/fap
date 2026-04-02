# FAP — Incomplete / Demo / Non-Functional Items

## 1. Contact Form — no backend
`src/pages/contact/index.tsx:40` — the form just does `console.log` and shows a success toast. Nothing is actually sent anywhere.

## 2. Partner Portal Login — fully fake auth
`src/pages/partner-portal/index.tsx:48-51` — login simulates a 2-second delay, accepts any email/password, and stores a fake `"demo-token-"` in localStorage. No real authentication, no real 2FA.

## 3. Partner Dashboard — all hardcoded data
The entire dashboard (Overview, Investment, Metrics, Reports tabs) displays static hardcoded numbers. Nothing is fetched from any API.

## 4. Report Downloads — non-functional
`src/pages/partner-portal/index.tsx` — the "Download" buttons on monthly reports do nothing. No files exist.

## 5. API Client — points to non-existent backend
`src/shared/constants/index.ts:3` — `API_BASE_URL` defaults to `https://api.fap-game.com` which doesn't exist. The entire `api/client.ts` and `api/auth.ts` are scaffolded but unused.

## 6. All game/wallet/NFT routes — defined but no pages exist
`src/shared/constants/index.ts:29-42` — routes like `/game`, `/nft-marketplace`, `/wallet`, `/login`, `/register` etc. are defined as constants but no page components exist for them.

## 7. Social links — placeholder URLs
`src/shared/constants/index.ts:187-192` — Twitter, Discord, Telegram, LinkedIn, Instagram links all point to `fapgame` handles that likely don't exist yet.

## 8. Legal pages — no content
`src/shared/constants/index.ts:196-200` — Privacy Policy, Terms of Service, NDPA Compliance, Cookie Policy routes are defined but no pages exist.

## 9. Episode One "concept art" placeholder
`src/pages/episode-one/index.tsx:91-96` — shows a grey box with "3D Afrofuturism Concept Art" text instead of an actual image.

## 10. CTA buttons with no destination
Buttons like "Start Your Journey", "Explore Episode One", "Connect SAC1 Wallet" link to the contact page as a catch-all or do nothing — no game or wallet functionality exists behind them.

---

**Conclusion:** The entire site is a frontend-only marketing/presentation layer. There is no backend, no real auth, no real data, no game, no wallet, no NFT marketplace, and no working downloads. The only semi-functional piece is the contact form UI (but it doesn't send anywhere).
