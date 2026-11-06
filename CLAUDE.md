# CLAUDE.md — Soho Lounge Minneapolis Project Context

This file provides context for AI-assisted development. Read it at the start of every session.

---

## Project Overview

**Soho Lounge Minneapolis** is the public website for Soho Lounge, a nightlife / VIP lounge at **923 Nicollet Mall, Minneapolis**. Guests use it to:

1. **Reserve a table** with bottle service: date → time → section/table on a floor plan → bottles → contact details (4-step modal)
2. **Apply for a VIP card** (Gold / Platinum / Black Card) with a portrait photo
3. **Join an event guestlist**, send a contact inquiry, read the dress code and bottle menu
4. **Look up** their reservations or VIP card in a "Digital Portal" (by email or card number)

Staff use an **Admin Hub** (`/admin`, `/hub`, or the `hub.sohompls.com` hostname) to approve/reject reservations and VIP applications.

**The goal of this project (decided in a meeting with Seckin, 2026-11-05):** connect the website to **TableHere** so Soho Lounge's reservations are managed in TableHere, not in this app:
- A reservation made on the website is created **in TableHere** (Soho Lounge is set up as a restaurant there).
- The website's floor plan matches the **TableHere Floor Plan Editor** layout for Soho Lounge, in real time.
- The guest picks their table on that floor plan, and the chosen table goes to TableHere with the booking.

Soho Lounge is Seckin's own venue, so this is also a **TableHere pilot**. There is no public website yet. This one goes live on `sohompls.com` once finished (no fixed deadline, as soon as possible). **All existing features stay.** Seckin built them and doesn't want any removed. See [TableHere Integration](#tablehere-integration) and [Open Questions](#open-questions) (answered 2026-11-05; some still wait for Seckin).

**Current phase (2026-11-05):** Phase 0. The project was generated in Google AI Studio (Gemini) and handed over by Seckin as a scaffold. It runs locally. All data is in-memory mock data. No integration has been built.

**Owner:** Mustafa Adlin (`m.adlin38@gmail.com`). Business contact: Seckin. · Repo: `Tollso/Soho-Minneapolis` (origin; confirm whether it moves to `Lumi-Tech-LLC`)

**Sibling projects** (all under `/home/MustafAdlin/Projects/`):
- **TableHere** (`Table-Here`, `Lumi-Tech-LLC/Table-Here`): the reservation and floor-plan system this site must integrate with. Its `CLAUDE.md` is the reference for how it works.
- **HostHere** (`HostHere`): an AI phone host that already books into TableHere through the partner API. It is the closest example of what this project needs to do.
- **NewGate POS** (`NewgatePos`): reads TableHere tables/reservations and sends seating commands through the same partner API.
- **ShiftHere** (`ShiftClock`): staff scheduling. Not involved here.

---

## Tech Stack

| Concern | Technology | Version |
|---|---|---|
| UI Framework | React | ^19.0.1 |
| Language | TypeScript | ~5.8.2 |
| Build Tool | Vite | ^6.2.3 |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) | ^4.1.14 |
| Icons / animation | lucide-react / motion (imported as `framer-motion` in some files) | 0.546 / 12.23 |
| Routing | React Router DOM | ^7.18.2 |
| Server | Express (run via `tsx`, no compile step in dev) | ^4.21.2 |
| AI concierge | Google Gemini 2.5 Flash (`@google/genai`) | ^2.4.0 |
| Email | nodemailer: Gmail SMTP, Hostinger SMTP fallback | ^10.0.10 |
| Database | **None.** In-memory arrays in `server/store.ts` | — |
| Package manager | bun (`bun.lock`); npm also works | — |
| Tests | None | — |

---

## Architecture

```
Browser (React SPA)
   │  fetch('/api/...')   (components call fetch directly, no API client layer)
   ▼
server.ts (Express, port 3000)
   ├── /api  → server/routes.ts → routesReservations / routesVipMembers / routesGeneral
   │              └── server/store.ts (in-memory arrays + Gemini client)
   │              └── server/email*.ts (nodemailer; console-only when no SMTP creds)
   └── Vite middleware (dev) / dist/ static (production)
```

### Single process, in-memory
`server.ts` serves the API and the SPA from one Express app. `reservations`, `vipMembers` and `guestlistEntries` are plain arrays seeded with demo rows. **Every restart wipes all data.** The target is that TableHere owns reservations (see below), so do not add a local reservation database. VIP members and guestlist entries still need a home (open question).

### Frontend
`src/main.tsx` → `src/App.tsx`. On `hub.sohompls.com`, or at `/admin` / `/hub`, `AdminHub` renders. Everything else is `MainGuestExperience`, one long page with modals for each flow. Mock content (sections, bottles, events, wines) is in `src/data/mock*.ts`. Shared types are in `src/types.ts`.

### Current floor plan model (to be replaced by TableHere's)
`src/data/mockSections.ts` has **6 hard-coded sections, 3 tables each (18 tables)**, 3 on each side of the DJ booth. Each section has a `minSpend`, `capacity`, `side` and `positionIndex`, and the tables are only name strings (`A-101`…). `SectionFloorPlan.tsx` draws them as cards in two columns, not as a spatial map. Note that ids and names don't match (e.g. id `the-vault` has name `Amuse`).

### Time slots
The guest flow offers only `10:00 PM`, `11:00 PM`, `Midnight` (`ReservationStep1.tsx`). Times are stored as display strings, not `HH:mm`.

---

## Folder Structure

```
Soho-Minneapolis/
├── server.ts                      # Express entry: JSON body (15 MB, for photo uploads), /api, Vite/static
├── server/
│   ├── routes.ts                  # Mounts the three sub-routers
│   ├── routesReservations.ts      # availability, list, create, admin approve/reject
│   ├── routesVipMembers.ts        # lookup, apply, admin list/approve/reject
│   ├── routesGeneral.ts           # health, admin passcode, guestlist, contact, waitlist, Gemini concierge
│   ├── store.ts                   # In-memory data + Gemini client
│   ├── email.ts                   # Re-exports
│   ├── emailTransport.ts          # nodemailer transport + sendMailSafely (logs instead of sending without creds)
│   ├── emailReservationTemplates.ts
│   └── emailVipTemplates.ts
├── src/
│   ├── App.tsx, main.tsx, index.css, types.ts
│   ├── components/
│   │   ├── MainGuestExperience.tsx   # The guest page, owns which modal is open
│   │   ├── Header, Hero, Footer, VenueInfo, EventsSection, SectionsMap, BottleServiceMenu, VipCardSection
│   │   ├── ReservationModal.tsx + reservation/ (Step1 date/time, Step2 section/table, Step3 bottles, Step4 details, Calendar)
│   │   ├── VipCardApplicationModal.tsx + vip/
│   │   ├── DigitalPortalModal.tsx + portal/
│   │   ├── sections/ (SectionFloorPlan, SectionInspector, SectionDetailCard)
│   │   ├── admin/ (AdminHub, AdminAuthGate, tables, metrics)
│   │   └── common/ (logos), events/, header/
│   ├── data/mock*.ts              # Sections, bottles, spirits, wine/champagne, events, members
│   └── assets/images/             # Hero/VIP/cocktail photos (~1 MB each)
├── public/                        # Logos (SVG + 3 identical copies of the neon logo JPG)
├── .aistudio/, assets/.aistudio/  # AI Studio leftovers
├── metadata.json                  # AI Studio applet metadata
└── .env.example
```

---

## Coding Conventions

Follow what the code already does unless a task changes it:
- Function components with typed props interfaces (`FooProps`), named exports (`export const Foo: React.FC<FooProps>`).
- Tailwind utility classes inline. Black/gold palette: `#07070A`, `#0E0E14`, `amber-400`.
- Server imports use explicit `.js` extensions (`./store.js`).
- Errors are returned as `{ error: string }` with a 4xx/5xx status.
- **Always import lucide icons explicitly.** Names like `Lock`, `Image`, `Map` and `Option` are also browser globals, so a missing import still type-checks but crashes at runtime with "Illegal constructor" and a white page (happened with `Lock` in `Footer.tsx` on 2026-11-05).

When the TableHere integration is built, match TableHere/HostHere conventions where they apply: one API client module on the client (`src/services/*Api.ts`) instead of `fetch` in components; partner keys only on the server; machine-readable error codes.

---

## API Endpoints (current, all under `/api`, no authentication)

| Method & path | Purpose |
|---|---|
| `GET /health` | Health check |
| `POST /admin/verify-passcode` | Checks a passcode against a hard-coded list |
| `GET /reservations/availability?date&timeSlot` | Booked sections/tables for a slot |
| `GET /reservations[?email|?code]` | **All reservations** with no filter, or by email / id |
| `POST /reservations` | Create (one per section + time); emails the guest and venue |
| `GET /admin/reservations` | List, pending first |
| `POST /admin/reservations/:id/approve` \| `/reject` | Approve / reject |
| `GET /vip-members/:identifier` | Lookup by card number, id or email |
| `POST /vip-applications` (alias `/vip-members/apply`) | Apply. **Marks payment as Paid with a fake transaction id** |
| `GET /admin/vip-members` (alias `/admin/vip-applications`) | List |
| `POST /admin/vip-members/:id/approve` \| `/reject` | Approve / reject |
| `POST /guestlist` | Event RSVP |
| `POST /contact` | Inquiry email |
| `POST /vip-waitlist` | Waitlist email |
| `POST /concierge` | Gemini answer, or a canned reply without `GEMINI_API_KEY` |

---

## TableHere Integration

**Status: not started. Approach A agreed (2026-11-05); details partly open.**

**Agreed rules (2026-11-05):**
- Our own Soho-styled booking screens. This site's server calls TableHere.
- **Refuse when full.** Never accept a booking for a full venue or a taken table.
- **No double booking, ever.** A table booked by someone else must disappear from the map at once. TableHere's lock re-checking the exact table inside `create` is what guarantees it. The map's refresh only keeps the display current.
- Taken tables are greyed out. Each table shows its number, size and minimum spend.
- The map uses TableHere's table positions, drawn in Soho's style.
- TableHere down or slow → show an error (try again shortly, or call the venue). No offline queue.
- Soho-only for now, but keep the TableHere side generic where it costs nothing.

### What TableHere already offers
TableHere has a **partner API** (Phase 9l, built on the dev branch, **not on production yet**). The contract lives **only** in the TableHere repo: `Table-Here/docs/api/README.md` (+ `hosthere.md`, `newgate-pos.md`). **Those files are read-only for AI assistants.** Suggest changes to Mustafa; do not edit them.

Key facts:
- One endpoint, `POST` JSON, Supabase Edge Function `partner-api`. Dev: `https://czcsjueulbmtyjefzgum.supabase.co/functions/v1/partner-api`. Production: `https://canubzqijuniswjtxqhm.supabase.co/functions/v1/partner-api`.
- Auth: a per-restaurant, per-app key in the `x-partner-key` header. The restaurant owner (`RESTAURANT_ADMIN`) creates it in TableHere → Admin Portal → Settings → Connected Apps (a one-time code to `exchange`, or a `thk_` API key). **The key lives only on this site's server, never in the browser.**
- The app identity is fixed per connection (`HOSTHERE`, `NEWGATE_POS`). Scopes are fixed by TableHere per app.
- `create` goes through TableHere's shared reservation core: per-restaurant lock, re-check of availability, `idempotencyKey`, status `PENDING` (or `CONFIRMED` once confirm mode is on), `409 SLOT_UNAVAILABLE` with `alternatives`.
- Rule from TableHere's decisions: **"No app keeps a second reservation database."** TableHere is the reservation and table authority.
- TableHere has overnight service hours (closing after midnight, up to 4:00 AM), which a lounge needs. Per its CLAUDE.md this is "not exercised in the app" yet.

### Gaps: what the partner API does **not** do today, but this project needs
1. **No website app type.** Only `HOSTHERE` and `NEWGATE_POS` exist. A new app (e.g. `SOHO_WEBSITE`, or a generic `WEBSITE` for any restaurant's own site) with its own scopes is needed, and a TableHere `source_app` / `origin` value for it.
2. **No floor-plan geometry.** `tables.list` returns id, name, capacity, section and status, and **explicitly no coordinates**. Walls/doors/zones are excluded. Drawing TableHere's layout on this site needs a new read action (e.g. `floorplan.get`: floor plans, table x/y/width/height/shape/rotation, walls, zones).
3. **No table choice on `create`.** HostHere's `create` takes party size and time only, and TableHere assigns the table. The guest choosing a table needs `tableId(s)` on `create`, with the core checking that table, not just capacity.
4. **No per-table availability.** `availability` answers yes/no for a time + party size. The floor plan needs "which tables are free at this date/time".
5. **No email field** on `create` (phone only). This site collects email and sends email confirmations.
6. **No place for nightlife data:** minimum spend per section, bottle pre-orders, VIP card number, occasion. Today only `notes` exists.
7. **"Real time" for partners** means polling (`changes` feed with a cursor, or repeated availability calls). Supabase Realtime is TableHere-internal. Webhooks are planned later.
8. **Partner `create` is refused for capacity; web/staff bookings are not** (Decision 15). Whether a website booking through the partner API counts as "partner" or "web" changes behavior.

### Approach (decided 2026-11-05: A)
- **A. Partner API ✅ chosen:** this site's Express server holds the key and calls `partner-api` for floor plan, availability and create. The site keeps its own Soho-branded booking UI. Needs the contract additions above, built in TableHere.
- ~~B. Use TableHere's own `/book/:restaurantId` page~~: rejected (TableHere branding, no Soho floor plan or bottle step).

### Where Soho Lounge lives in TableHere
Seckin added a **"Soho Lounge"** restaurant in **TableHere production** (`canubzqijuniswjtxqhm`) on a Professional or Enterprise plan. Its id is unknown. **Nothing else is set** (no floor plan, tables, hours or settings). The real floor plan is drawn by Seckin at the end, and development uses a demo floor plan. Because the partner API exists only on the dev branch (`czcsjueulbmtyjefzgum`), development needs a test restaurant there (open question 32). **Do not query the production TableHere database** to find out. Mustafa handles production access himself (standing rule from the TableHere project).

---

## Environment Variables

From `.env.example`. No `.env` exists yet, so locally email is logged to the console and the concierge returns a canned reply.

```bash
GEMINI_API_KEY=            # AI concierge
APP_URL=                   # AI Studio leftover, unused by code
GMAIL_USER= / GMAIL_APP_PASSWORD=          # Primary email transport
VENUE_NOTIFICATION_EMAIL= / SUPER_ADMIN_EMAIL=
HOSTINGER_SMTP_HOST / _PORT / _SECURE / _USER / _PASS / _FROM   # Fallback transport
# Planned for the integration (server only, never VITE_*):
# TABLEHERE_API_URL=       # partner-api endpoint (dev or production, never mix)
# TABLEHERE_PARTNER_KEY=   # Soho Lounge's key from TableHere Connected Apps
```

The code falls back to `gungordubc@gmail.com` for sender/recipient when env vars are missing (`server/emailTransport.ts`). Replace it with the venue's address via env.

---

## Deployment Steps

### Development
```bash
bun install
bun run dev          # tsx server.ts → http://localhost:3000 (admin: /admin)
bunx tsc --noEmit    # type-check (bun run lint)
```

### Production build
```bash
bun run build        # vite build → dist/, esbuild server.ts → dist/server.cjs
NODE_ENV=production bun run start
```
Port is hard-coded to 3000. **Hosting: the Lumi Tech AWS account** (same as TableHere/ShiftHere), exact service not chosen. **Domain: `sohompls.com`**, managed by Seckin. Admin hub at `sohompls.com/admin` (path, not a subdomain). Emails in code mention `soholoungemn.com`. A new venue email address will be created later.

---

## Known Issues & Technical Debt

### Critical (blocks production)
- **No persistence.** All reservations, VIP members and guestlist entries are lost on restart.
- **Admin API is unauthenticated.** The passcode check is client-side only. Every `/api/admin/*` route works without it, and valid passcodes are hard-coded in `routesGeneral.ts` (one is printed on the login screen in `AdminAuthGate.tsx`).
- **Guest data exposed.** `GET /api/reservations` with no query returns every reservation with name, email and phone. Lookup by email or guessable id (`SOHO-1234`) has no verification.
- **Fake VIP payment.** Applications are stored as `Paid` with an invented transaction id. No payment provider.

### High
- Guest input is inserted unescaped into email HTML (HTML injection into staff/guest emails).
- Ids are 4-digit random numbers: collisions and easy guessing.
- A personal Gmail address is hard-coded as the default sender/recipient.
- No rate limiting on any form endpoint (spam via contact/guestlist/waitlist emails).

### Medium
- Components call `fetch` directly. No API client layer.
- Section ids/names mismatch in `mockSections.ts`.
- 15 MB JSON body limit exists for base64 photo uploads stored in memory.

### Low
- AI Studio leftovers: `.aistudio/`, `metadata.json`, `aistudio-build` User-Agent, `DISABLE_HMR`, package name `react-example`, three identical copies of the neon logo JPG.

---

## Future Roadmap

Draft order. Reorder once the open questions are answered.

### Phase 0 — Handover & local run ✅ (2026-11-05)
- [x] Repo inspected, runs locally with bun
- [x] Fixed white page: missing `Lock` import in `Footer.tsx` (not committed yet)
- [x] This CLAUDE.md
- [x] Mustafa's answers to [Open Questions](#open-questions) (2026-11-05)
- [x] Mustafa's answers to 35, 38–42 (2026-11-05)
- [ ] Seckin's answers (9, 12, 15, 17, 19, 22–28, 33, 34, 36, 37): sent as [docs/seckin-questions.md](docs/seckin-questions.md)

### Phase 1 — Agree the TableHere contract additions
- [x] Approach A chosen (2026-11-05)
- [ ] Dev test restaurant + demo floor plan on the TableHere dev branch (question 32)
- [ ] Write the website's requests in TableHere's `docs/partners/` (new file, like `hosthere-requests.md`). The TableHere team edits the contract
- [ ] TableHere builds: website app + scopes, floor-plan read, per-table availability, `create` with table + email, notes/extra fields

### Phase 2 — Floor plan from TableHere
- [ ] Server proxy endpoint that reads Soho Lounge's floor plan from TableHere and caches it briefly
- [ ] Replace `mockSections.ts` + `SectionFloorPlan.tsx` with an SVG map drawn from TableHere geometry, styled for Soho
- [ ] Show free / taken tables for the chosen date and time, refreshed by polling

### Phase 3 — Reservations into TableHere
- [ ] `POST /api/reservations` calls partner `create` with `idempotencyKey`. Handle `PENDING` / `CONFIRMED` / `409` / unknown (5xx) honestly. Never tell a guest "confirmed" unless TableHere said `CONFIRMED`
- [ ] Remove the local reservation store. The admin hub's Reservations tab reads from TableHere (form decided by question 33)
- [ ] Digital Portal lookup and cancel via TableHere (`find` / `cancel`)

### Phase 4 — Security & production readiness
- [ ] Real server-side admin auth for `/admin` (the hub stays). Drop the `hub.sohompls.com` hostname check
- [ ] Persistence for whatever stays local (VIP members, guestlist)
- [ ] Escape email HTML, rate limits, env-only addresses
- [ ] Hosting on Lumi Tech AWS, `sohompls.com` (Seckin sets DNS), TLS
- [ ] Maintenance mode: public sees a holding page until launch; team can bypass (question 41)
- [ ] Privacy policy + terms (question 39)

### Later
- [ ] VIP card payments (provider TBD)
- [ ] Deposits / minimum-spend pre-authorisation

---

## Open Questions

Answers from Mustafa, 2026-11-05. Questions marked **Seckin** are still waiting for him.

**Business & scope**
1. ✅ No public website exists yet. This site will be published once the project is finished. Domain: `sohompls.com` (Seckin manages it).
2. ✅ Soho Lounge is Seckin's own venue. It is also a **TableHere pilot**.
3. ✅ No fixed deadline, but as soon as possible. Publish when finished.
4. 🟡 Repo ownership still to be discussed with Seckin. Mustafa works on it.
5. ✅ **All current features stay** (VIP cards, guestlist, events, bottle menu, AI concierge, digital portal, admin hub). Seckin built them in AI Studio and doesn't want any removed.

**TableHere setup**

6. ✅ Soho Lounge is in **TableHere production** on a Professional or Enterprise plan. Restaurant id unknown. Note: the partner API is on dev only, so development runs against the dev branch (see 32).
7. ✅ The floor plan is not drawn yet. We use a **demo floor plan** for testing, and Seckin draws the real one at the end. The layout is not a priority now.
8. ✅ Nothing is set in TableHere for Soho Lounge except the restaurant itself (no hours, tables or settings).
9. **Seckin:** will Soho staff use TableHere Host Station at the door (approve, seat, check in)? Who are the users?

**Integration design**

10. ✅ **Approach A:** our own Soho-styled booking screens, calling TableHere through the server.
11. ✅ Soho-only for now. It may become generic later, so avoid Soho-specific shortcuts in the TableHere contract where it costs nothing.
12. **Seckin:** should website bookings be `PENDING` (host approves in TableHere) or instantly `CONFIRMED`?
13. ✅ **Refuse when full.** A website booking is never accepted if the venue or table is full (partner-style capacity check).
14. ✅ If TableHere is down or slow, **show an error**: ask the guest to try again in a moment or call the venue. No queueing for later.
15. **Seckin:** once TableHere is the only reservation record, this site's local reservation list goes away. Is that OK? (See 33 for the admin hub tab.)

**Floor plan & table selection**

16. ✅ **No double booking, ever** (approach confirmed 2026-11-05). TableHere's lock re-checks the exact table inside `create`, so the second of two simultaneous guests gets "table just taken" and the map refreshes. The map refreshes quickly (live push or short polling, to design) so taken tables grey out within seconds.
17. **Seckin:** can the guest pick one exact table, or a section with TableHere assigning the table? Can a big party book several tables?
18. ✅ Taken tables are **greyed out**. Show table number, size and minimum spend. Details to refine during the build.
19. **Seckin:** does the layout change for events (special layouts, closed sections)?
20. ✅ **TableHere's positions, drawn in Soho's own style** (gold/neon), not a copy of the editor's look.

**Bookings & money**

21. ✅ Not decided. **Use placeholder night hours for now** (e.g. 9 PM – 2 AM).
22. **Seckin:** party-size limits per table/section? Minimum spend per section: where is it stored (TableHere has no such field today)?
23. **Seckin:** where do bottle pre-orders go: TableHere notes, the POS (NewGate) or only an email to staff?
24. **Seckin:** deposit or card hold to secure a table? Which payment provider? Same for VIP card fees, which are fake today.
25. **Seckin:** who sends confirmations, TableHere (SMS/email) or this site (email)? Does TableHere need the guest's email?
26. **Seckin:** can guests cancel or change bookings from this site? With what code?

**VIP cards & other data**

27. **Seckin:** are VIP members a TableHere customer feature (`customers.vip_tier`) or kept on this site? Do they get booking priority?
28. **Seckin:** where do guestlist entries and contact inquiries go?
29. ✅ A new Soho Lounge email address will be created later. Until then everything stays env-configurable.

**Hosting & ops**

30. ✅ Hosted on the **Lumi Tech AWS account** (same as TableHere/ShiftHere). Seckin manages the domain.
31. ✅ Admin hub on a **path, `sohompls.com/admin`**, not a subdomain (agreed 2026-11-05). The `hub.sohompls.com` hostname check in `App.tsx` can go. The admin API still needs real server-side login.

**New questions (2026-11-05)**

32. ⏸ **Deferred until Seckin answers** (Mustafa, 2026-11-05). For development, the partner API exists only on the TableHere dev branch, but Soho Lounge exists only in production. Create a "Soho Lounge (dev)" restaurant with a demo floor plan on the dev branch, or test against the existing Demo Restaurant?
33. **Seckin:** the admin hub stays (answer 5), but reservations live in TableHere. Should its Reservations tab (a) show TableHere's reservations read-only with approval done in TableHere Host Station, (b) also approve/reject through TableHere (needs a new API action), or (c) link to TableHere?
34. **Seckin:** are VIP applications, guestlist entries and contact messages kept in this site's own database? They need persistence since they aren't TableHere data (depends on 27–28).

**Content, legal & launch (added 2026-11-05)**

35. ✅ All prices, minimum spends, VIP fees, perks and menu items are **test values**. Real ones are decided at the end with the menu list, so keep them easy to change (data, not hard-coded in components).
36. **Seckin:** age limit (21+)? Should the site have an age gate, and must every guest in a party be 21+ with ID at the door?
37. **Seckin:** do guests book as guests (name/phone/email each time), or with a **TableHere guest account** (login, booking history)?
38. ✅ **English only.**
39. ✅ Privacy policy and terms are written **later**, not now (needed before SMS, payments or real launch).
40. ✅ **Free to restructure** messy code and adjust the design, but **every feature must stay**.
41. ✅ **No separate staging.** Test on the real site, which stays unused until Mustafa and Seckin announce it. Add a **maintenance mode** (or similar) so the public can't see it during work.
42. ✅ The **Lumi Tech account** holds the Gemini API key.

---

## Working with This Codebase

### Adding an API route
Add it to the right `server/routes*.ts` router. Validate input and return `{ error }` with a 4xx. Anything that touches TableHere goes through one server-side client module (to be created, e.g. `server/tablehere/partnerClient.ts`), never from the browser.

### Changing the TableHere contract
Do not edit `Table-Here/docs/api/` or `docs/partners/`. Draft the request and give it to Mustafa.

### Testing against TableHere
Use the TableHere **dev branch** (`czcsjueulbmtyjefzgum`) and a dev restaurant/key. Never point a local or staging build at production TableHere. Real bookings would mix with test data.

---

## Quick Reference: Key Files

| File | What it does |
|---|---|
| `server.ts` | Express entry, Vite middleware, port 3000 |
| `server/store.ts` | In-memory data + types + Gemini client |
| `server/routesReservations.ts` | Reservation logic (to be replaced by TableHere calls) |
| `server/emailTransport.ts` | Email sending / console fallback |
| `src/App.tsx` | Routes: guest site vs admin hub |
| `src/components/MainGuestExperience.tsx` | Guest page and modal state |
| `src/components/ReservationModal.tsx` | 4-step booking flow, submits to `/api/reservations` |
| `src/components/reservation/ReservationStep2.tsx` | Section/table picker, calls availability |
| `src/components/sections/SectionFloorPlan.tsx` | Current (card-based) floor plan |
| `src/data/mockSections.ts` | The 6 sections / 18 tables |
| `src/types.ts` | Client types |
| `Table-Here/docs/api/README.md` | TableHere partner API contract (read only) |

---

## AI Coding Guidelines
*via [andrej-karpathy-skills](https://github.com/forrestchang/andrej-karpathy-skills)*, same as TableHere / HostHere / ShiftHere.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

### 1. Think Before Coding
**Don't assume. Don't hide confusion. Surface tradeoffs.**
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them; don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

### 2. Simplicity First
**Minimum code that solves the problem. Nothing speculative.**
- No features beyond what was asked. No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- If you write 200 lines and it could be 50, rewrite it.

### 3. Surgical Changes
**Touch only what you must. Clean up only your own mess.**
- Don't "improve" adjacent code, comments, or formatting. Match existing style.
- If you notice unrelated dead code, mention it; don't delete it.
- Remove imports/variables/functions that YOUR changes made unused.

### 4. Goal-Driven Execution
**Define success criteria. Loop until verified.**
For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
```

### Project rules
- Don't run `git commit` unless Mustafa explicitly asks for a commit. Otherwise write the commit message for him.
- Never query or change the production TableHere database without an explicit ask for that task.
- Never tell a guest a booking is confirmed unless TableHere returned `CONFIRMED`.
