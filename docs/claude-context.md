# Brignac Mortgage — Claude Context

Source of truth for AI-assisted development on this project.

## Business Context

**Brignac Mortgage** is a financial services company offering:
- Mortgage loans
- Refinancing
- Home purchase advisory

**Goal:** Transform the site from an informational landing page into a **measurable lead generation engine** — capturing, scoring, and attributing leads from paid campaigns.

## Stack

| Layer | Technology |
|---|---|
| Backend | Laravel 13 |
| Frontend | Vue 3 (Composition API) + Inertia.js v2 |
| Styles | Tailwind CSS v4 (Vite plugin, no tailwind.config.js) |
| Database | MySQL |
| Build | Vite + laravel-vite-plugin |
| Routing | ZiggyVue (named routes in Vue) |

## Code Conventions

- **No Vuetify, no AOS, no vue3-toastify** — removed
- **Icons:** Material Symbols via Google CDN (`material-symbols-outlined` class) or inline SVG
- **animate.css** is allowed for entrance animations
- **Tailwind v4 syntax** — `@import "tailwindcss"` in CSS, `@theme {}` for custom tokens, no config file
- Mobile-first layouts
- Primary color: `green-500` (#22c55e)
- No comments unless the WHY is non-obvious
- Vue Composition API (`<script setup>`)

## Project Structure

```
resources/js/
├── Pages/
│   ├── Guest/         # Public-facing pages (Welcome, AboutUs, ContactUs, Programs, Team)
│   └── Auth/          # Auth pages
├── Components/
│   ├── Navs/          # GuestNav, mobile drawer
│   └── ...
├── composables/       # useUtm, useMortgageCalculator, etc.
└── app.js             # Entry: Inertia v2 + Vue 3 + ZiggyVue

routes/web.php         # Single route file (consolidated)
app/
├── Models/
│   ├── Lead.php       # Lead capture model
│   └── LeadEvent.php  # Tracking events model
└── Http/Controllers/
    └── LeadController.php
```

## Database Schema

### leads
Captures every pre-qualification form or quiz submission.
- Contact: `name`, `email`, `phone`, `opt_in_sms`
- Quiz data: `loan_purpose`, `property_value`, `monthly_income`, `credit_score_range`, `purchase_timeline`, `quiz_answers` (JSON)
- Scoring: `score` (0–100), `status` (new/contacted/qualified/converted)
- Attribution: `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`
- Meta: `ip_address`, `user_agent`

### lead_events
Tracks every meaningful user interaction anonymously (before and after lead submit).
- `event_type`: `page_view`, `quiz_start`, `quiz_step`, `quiz_complete`, `lead_submit`, `cta_click`
- `metadata` (JSON): step number, button name, etc.
- Linked to `lead_id` when available (nullable)

## Lead Scoring Logic

| Factor | Score |
|---|---|
| Credit: excellent | +40 |
| Credit: good | +30 |
| Credit: fair | +15 |
| Timeline: ASAP | +30 |
| Timeline: 1–3 months | +25 |
| Timeline: 3–6 months | +15 |
| Timeline: exploring | +5 |
| Phone provided | +15 |
| Email provided | +15 |

## Module Roadmap

1. **Quiz** — 5-step pre-qualification in `resources/js/Components/Quiz/`
2. **Lead capture** — `POST /leads` → `LeadController::store`
3. **Event tracking** — `POST /leads/event` + frontend composable `useTracking`
4. **UTM composable** — reads URL params, persists to localStorage
5. **Mortgage calculator** — `resources/js/Components/MortgageCalculator.vue`
6. **CRM dashboard** — auth-protected `/dashboard` with leads table + charts
7. **Analytics** — GTM snippet + Meta Pixel base in `app.blade.php`

## Business Info

- **Contact:** Shaun@brignacmortgage.com
- **Phone:** +1 504-559-2821
- **Address:** 21121 Waterfront East Dr, Maurepas, LA

## Content to Preserve

- All Facebook testimonials (10 entries, hardcoded in Welcome.vue)
- Google testimonials via Elfsight widget `elfsight-app-ebce6ca8-0720-4595-b6cd-c4d2cb07e6df`
- Elfsight script: `https://elfsightcdn.com/platform.js`
- Branding: primary logo at `/public/img/primary-logo-dark.png`

## Pages (no blog)

| Route | Page | Notes |
|---|---|---|
| `/` | Welcome | Main landing page, hero + quiz CTA |
| `/about-us` | AboutUs | Company info + Google testimonials |
| `/contact-us` | ContactUs | Contact form → lead capture |
| `/loan-programs` | Programs | Loan product listings |
| `/our-team` | Team | Team profiles |
| `/privacy-policy-for-website` | Legal | |
| `/disclaimers-for-website` | Legal | |
| `/terms-of-use-for-website` | Legal | |
