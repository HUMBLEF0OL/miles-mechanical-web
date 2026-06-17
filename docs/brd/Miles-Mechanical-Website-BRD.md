# Business Requirements Document (BRD)
## Miles Mechanical AC & Heating — Website Redesign

| | |
|---|---|
| **Project** | Miles Mechanical AC & Heating — Marketing Website Redesign |
| **Document type** | Business Requirements Document (BRD) |
| **Version** | 0.2 (Draft) |
| **Date** | June 17, 2026 |
| **Prepared by** | Amit Rana |
| **Prepared for** | Charles Miles, Owner/Operator — Miles Mechanical A/C And Heating LLC |
| **Status** | Draft for review |
| **Revision note** | v0.2 rehydrated from expanded multi-source research (Yelp, Facebook, MapQuest, Birdeye, LinkedIn, directory listings). Resolves several open questions: primary phone, full service-area list, business hours; adds legal entity name, email, equipment brand, and updated review counts. |

---

## 1. Executive Summary

Miles Mechanical A/C And Heating LLC is a well-regarded, owner-operated HVAC business serving the Dallas–Plano metroplex with 20+ years of experience and a near-perfect review reputation: 4.9★ across 56 Google reviews **and** 5.0★ across 67 reviews on Birdeye, with the owner (Charles Miles) named and praised by name in recent reviews. Despite this strong real-world standing, its digital presence is currently failing: the existing website (`milesmechanicalac.com`) does not load in a normal browser (confirmed June 17, 2026 — `ERR_SSL_PROTOCOL_ERROR`; only cached copy survives in search), business listing data is inconsistent across platforms, secondary channels are dormant (Facebook: 12 followers; Yelp: 2 reviews, 7 years old), and the company's substantial review reputation is not surfaced anywhere it can convert visitors into customers.

This project will deliver a modern, mobile-first marketing website that converts high-intent local searchers into booked jobs. The build is **frontend-first**: the user-facing experience, content, and conversion surfaces are designed and shipped first; backend systems (e.g., dispatch/scheduling integration, CRM) are introduced only where they are essential to a committed feature.

The four prioritized capabilities for the first release are: a **reviews & trust showcase**, **service-area SEO landing pages**, **online booking & scheduling**, and **quote / lead capture**.

---

## 2. Business Background & Context

### 2.1 The business
- **Legal entity:** Miles Mechanical A/C And Heating LLC.
- **Owner/operator:** Charles Miles ("Mr. Miles"); has a (minimal) LinkedIn presence under "Miles mechanical A/C." Customers routinely name and praise "Charles" directly in reviews — the owner *is* the brand.
- **Experience:** 20+ years; family-owned; positions itself as "Texans serving Texans." Marketing voice on social leans into Texas-weather urgency (e.g., "Texas weather can be brutal, putting a lot of pressure on heating and AC systems causing breakdowns…").
- **Model:** Service-area business (no public storefront; owner/registered address 5129 Dazzle Dr, Dallas, TX 75241 — not for public display). Per the business's own Facebook listing, the stated service area spans **Dallas, Addison, Richardson, Sachse, Garland, Murphy, Wylie, Carrollton, Rowlett, Plano, and University Park.**
- **Services:** HVAC installation/replacement, AC & furnace split systems, heating/furnace repair, HVAC system repair, seasonal maintenance, mini-splits, zone systems, and emergency service.
- **Equipment:** Installs **Carrier** equipment (gas furnaces, condensers, coils, zone controls, high-end thermostats) — a recognizable brand-name angle and an existing source of proof-of-work photography ("all work is up to code").
- **Contact:** Primary phone **(214) 584-4164** (consistent across Yelp, MapQuest, Facebook, Birdeye, and directory listings); email **milesmechanical85@yahoo.com**.
- **Differentiators:** American Home Shield-approved contractor (works through home warranties); 10-year parts / 1-year labor warranty on installations; fully licensed; transparent, no-pressure pricing; accepts credit cards and cryptocurrency; offers a military discount.

### 2.2 Reputation (a key, underused asset)
- **Google:** 4.9★ across 56 reviews.
- **Birdeye:** 5.0★ across 67 reviews — active and growing (reviews as recent as 2 months ago; reviewers name Charles directly: "Charles is very professional and dependable," "fast to diagnose… more than affordable quote," "servicing my AC/heat units for years and has never disappointed me").
- **Yelp:** 5.0★ but only 2 reviews, both ~7 years old (badly underused channel; the two legacy reviews praise rescue-from-a-bad-home-warranty-contractor jobs).
- **Facebook** (`@clientcomfortconnections`): dormant — 12 followers, 0 ratings, last post early 2024.
- **Aggregate signal:** 120+ positive reviews across Google + Birdeye at ~5★. This is the single strongest, most underleveraged asset and the spine of the site's trust strategy.
- Recurring review themes: honesty, fair pricing (one review cites ~$2,000 under a competitor's quote), punctuality, correct first-time diagnosis, licensed/ethical work versus unlicensed competitors, and after-hours text responsiveness.

### 2.3 Competitive landscape (Dallas HVAC)
- 5 Star HVAC Contractors — 4.7★ (94 reviews)
- Milestone Electric, A/C & Plumbing — 3.1★ (81 reviews)
- Frymire Home Services
- **Positioning lane:** Miles out-rates the larger corporate players and wins on honesty and fair pricing — a clear angle for messaging.

---

## 3. Problem Statement

The current digital presence actively loses business that the company's reputation has already earned:

1. **The website is effectively down.** Over HTTPS, both the apex and `www` domains return an SSL protocol error (re-confirmed June 17, 2026: `ERR_SSL_PROTOCOL_ERROR`); over HTTP, the server returns 403 Forbidden. Visitors encounter a security warning or an error page, and search engines are left with only stale cached copy — a deindexing/penalty risk.
2. **Inconsistent listing data (NAP) hurts local SEO and trust.** A primary number is now strongly corroborated — **(214) 584-4164** appears consistently on Yelp, MapQuest, Facebook, Birdeye, and directory listings; the **(214) 429-7734** published on Google appears to be a secondary/outlier line. Hours also conflict: the majority of listings (Yelp, MapQuest, directories) agree on **Mon–Fri 9:00 AM–5:00 PM, Sat 10:00 AM–3:00 PM, Sun closed**, while Google lists a 6:00 AM open and legacy site copy claims 24/7 emergency. The data is now reconcilable but must be confirmed and standardized.
3. **A strong review reputation is not converting.** 120+ five-star-class reviews (56 on Google, 67 on Birdeye) are not showcased on any owned property that can turn trust into bookings.
4. **No self-service conversion path.** There is no online booking and no structured quote/lead capture; intake is phone-only, which leaks after-hours and self-service-preferring leads.
5. **Underbuilt Google Business Profile.** The profile lists only "Repair services" as an offering, with no service list or attributes — leaving easy local-search visibility on the table.

---

## 4. Project Objectives & Goals

| ID | Objective |
|---|---|
| OBJ-1 | Restore a reliable, secure (valid HTTPS), fast website presence on the existing domain. |
| OBJ-2 | Convert high-intent local visitors into booked jobs via friction-free booking and lead capture. |
| OBJ-3 | Surface the company's review reputation as a primary trust driver. |
| OBJ-4 | Improve local-search visibility through genuine, localized service-area content and consistent NAP data. |
| OBJ-5 | Establish a consistent, professional brand identity (including a logo/wordmark, which does not currently exist). |

---

## 5. Project Scope

### 5.1 In scope (Phase 1 — frontend-only, no backend or database)

**Phase 1 ships with no backend or database that we build, host, or maintain.** The site is a statically generated Next.js application. The only server-side concern — delivering a submitted lead — is handled by a hosted third-party form/notification service (e.g., Formspree, Web3Forms, or the host's native forms), which emails/texts the lead to the business. There is no application server and no database in our codebase.

- Full visual redesign and rebuild of the public marketing website (mobile-first).
- Reviews & trust showcase (curated, static content).
- Service-area SEO landing pages — initial build for the highest-value markets, drawn from the confirmed 11-city service area in §2.1 (recommended Phase 1 set: Dallas, Garland, Sachse; readily expandable to Plano, Richardson, Wylie, Rowlett, Murphy, Carrollton, Addison, University Park via the scalable template).
- Per-service pages (AC repair, installation/replacement, heating/furnace, maintenance, emergency, mini-split).
- Quote / lead-capture forms (delivered via a hosted form service) with prominent, always-visible click-to-call.
- Appointment-**request** form (a lead-capture variant — captures preferred date/time as data, not a real-time scheduler). Distinct from true online booking, which is a Phase 2 add-on.
- Brand identity essentials: a simple logo/wordmark and a defined color/type system.
- Core SEO foundations (metadata, structured data, sitemap) and analytics/conversion tracking.

### 5.2 Add-ons (post–Phase 1; introduce a backend and/or database only when committed)

These are separately shippable and separately priced. Each is where owned server logic and/or a database first becomes justified.

- **Online booking & scheduling (real-time):** availability, conflict prevention, and confirmations — delivered by integrating a field-service tool (Housecall Pro / Jobber / ServiceTitan) rather than building the scheduling engine ourselves.
- **Owned leads dashboard / CRM:** a place the business can view and manage inbound leads (first DB or CRM dependency).
- **Instant text-back** on lead submission.
- **Automated post-job review-request workflow** (grows the Google review count).
- **Guided instant-quote / estimate helper.**
- **Customer account/portal, invoicing, and online payments.**
- **Content for cities beyond the initial service-area set.**

---

## 6. Functional Requirements

> IDs are grouped by capability. Priority: **M** = Phase 1 must-have, **S** = Phase 1 should-have, **A** = Add-on (post–Phase 1; see §5.2).

### 6.1 Lead capture & contact
| ID | Requirement | Priority |
|---|---|---|
| FR-LC-1 | A persistent, always-visible click-to-call control on mobile (sticky header/footer) using the reconciled primary phone number. | M |
| FR-LC-2 | A short quote/lead-request form (name, phone, ZIP/city, service type, free-text issue) reachable from every page, delivered via a hosted form service (no owned backend/DB). | M |
| FR-LC-3 | Form submission confirmation and a clear "what happens next" message, optimized for fast response (speed-to-lead). | M |
| FR-LC-4 | An emergency-service CTA with distinct, urgent styling, tied to the after-hours policy. | M |
| FR-LC-5 | Instant text-back acknowledgment on submission. | A |
| FR-LC-6 | A guided "instant quote / estimate" helper where the visitor describes their system and issue. | A |

### 6.2 Online booking & scheduling
| ID | Requirement | Priority |
|---|---|---|
| FR-BK-1 | Phase 1 covers an appointment-**request** form (preferred date/time captured as a lead via the hosted form service) — see FR-LC-2. True real-time booking is an add-on. | M |
| FR-BK-2 | Real-time booking with availability and confirmation, delivered by integrating a field-service tool (Housecall Pro / Jobber / ServiceTitan). Introduces backend/integration. | A |
| FR-BK-3 | Mobile-optimized, minimal-step booking flow. | A |
| FR-BK-4 | Booking confirmation to the customer and notification to the business. | A |
| FR-BK-5 | Two-way sync with the field-service tool's dispatch/calendar. | A |

### 6.3 Reviews & trust showcase
| ID | Requirement | Priority |
|---|---|---|
| FR-RV-1 | Display an aggregate rating and review count prominently (e.g., 4.9★ Google / 56 + 5.0★ Birdeye / 67, or a combined "120+ five-star reviews" headline). Number must be easy to update as it grows. | M |
| FR-RV-2 | A curated testimonials section featuring representative reviews, including owner-named reviews ("Charles…"). | M |
| FR-RV-3 | Trust badges/credentials: licensed, insured, American Home Shield-approved, Carrier equipment installer, warranty terms (10-yr parts / 1-yr labor), 20+ years. | M |
| FR-RV-4 | Links/integration to live Google reviews; allow easy refresh of featured reviews. | S |
| FR-RV-5 | Feature the owner (Charles Miles) as a personal-trust element, subject to his approval. | S |

### 6.4 Service-area SEO landing pages
| ID | Requirement | Priority |
|---|---|---|
| FR-SA-1 | A dedicated, genuinely localized landing page per served city (Dallas, Garland, Sachse to start; full confirmed service area in §2.1, expanded via the template). | M |
| FR-SA-2 | Unique, non-boilerplate content per page (local references, service emphasis, localized CTAs). | M |
| FR-SA-3 | A scalable page template so new cities can be added without a rebuild. | S |
| FR-SA-4 | Per-service landing pages (AC repair, install/replacement, heating, maintenance, emergency, mini-split). | M |

### 6.5 Core site & content
| ID | Requirement | Priority |
|---|---|---|
| FR-CR-1 | Home page communicating services, service area, differentiators, and primary CTAs above the fold. | M |
| FR-CR-2 | Services overview page linking to per-service pages. | M |
| FR-CR-3 | About page (Charles Miles story, experience, values, credentials). | M |
| FR-CR-4 | Photo gallery / proof-of-work section using available job photos. | S |
| FR-CR-5 | Consistent header/footer with NAP, hours, service area, and social/review links. | M |
| FR-CR-6 | Financing / warranty / home-warranty (AHS) information section. | S |

---

## 7. Non-Functional Requirements

| ID | Requirement |
|---|---|
| NFR-1 | **Security:** Valid HTTPS with auto-renewing certificate; resolve current SSL failure; force HTTPS and proper redirects. |
| NFR-2 | **Mobile-first:** Fully responsive; primary design target is the phone (HVAC searches are urgent and mobile-led). |
| NFR-3 | **Performance:** Fast load on mobile networks; optimized images; good Core Web Vitals. |
| NFR-4 | **SEO:** Crawlable markup, per-page metadata, `LocalBusiness`/`HVACBusiness` structured data, XML sitemap, canonical URLs. |
| NFR-5 | **Accessibility:** Target WCAG 2.1 AA (semantic markup, contrast, keyboard navigation, alt text). |
| NFR-6 | **Analytics:** Conversion tracking on calls, form submissions, and booking requests. |
| NFR-7 | **Maintainability:** Content (cities, services, reviews) editable without code changes where feasible; minimal-dependency frontend. |
| NFR-8 | **Browser support:** Current versions of major browsers; graceful degradation. |

---

## 8. Content & Asset Requirements

| ID | Requirement |
|---|---|
| AST-1 | **NAP reconciliation:** Standardize on the corroborated primary phone **(214) 584-4164** and email **milesmechanical85@yahoo.com** across the site, Google, Yelp, Birdeye, and Facebook (confirm with owner; reconcile/retire the Google (214) 429-7734 line). |
| AST-2 | **Hours of operation:** Confirm true hours — listings converge on Mon–Fri 9–5, Sat 10–3, Sun closed — and clarify the real after-hours/emergency policy (the "24/7" claim is unconfirmed); apply consistently everywhere. |
| AST-3 | **Logo/brand:** Design a logo/wordmark and define a color palette and typography (none currently exists). |
| AST-4 | **Photography:** Collect and curate job/equipment photos (existing Google/Yelp images; ideally higher-resolution originals from the owner). |
| AST-5 | **Copy:** Refine existing brand voice ("Texans serving Texans," family-first, honest pricing) into page-ready content. |
| AST-6 | **Reviews:** Select featured testimonials from the Google corpus. |
| AST-7 | **Credentials:** Confirm license number(s), insurance, AHS approval, and warranty terms for display. |

---

## 9. Assumptions
- The existing domain `milesmechanicalac.com` can be retained and its DNS/hosting reconfigured.
- The business will provide or approve content, photos, credentials, and the correct NAP details.
- Phase 1 ships with **no backend or database that we build, host, or maintain**; lead delivery uses a hosted third-party form/notification service. Owned server logic and/or a database are introduced only with a committed add-on (§5.2).
- The owner is willing to be featured by name/photo (pending confirmation — see Open Questions).

## 10. Constraints
- No confirmed field-service/scheduling tool is in place yet; the booking feature must be designed to work without one in R1.
- Service-area business with no public storefront address (affects map/address handling).
- Single-operator/small-team business: intake and booking workflows must be realistic for current staffing.

## 11. Dependencies
- Access to (or migration of) domain DNS and hosting.
- Owner sign-off on NAP, hours, credentials, and featured reviews.
- Decision on a scheduler/CRM tool if real-time booking sync is desired (future phase).
- Google Business Profile access to correct offerings/attributes (parallel workstream, recommended).

## 12. Risks

| Risk | Impact | Mitigation |
|---|---|---|
| Current SSL/hosting issues recur after launch | Site downtime, lost leads | Use reputable hosting with managed TLS auto-renewal; monitoring/uptime alerts. |
| Ambiguous phone/hours data persists | Lost calls, weaker SEO | Resolve NAP before launch; single source of truth in content. |
| Booking expectations exceed frontend-first scope | Scope creep | Clearly stage booking as request-based in R1; defer real-time sync. |
| Thin/duplicate service-area content flagged by search engines | SEO penalty | Require genuinely unique localized content per page. |
| Owner availability for content/approvals | Timeline slippage | Front-load asset collection; use placeholders with clear owner checklist. |

---

## 13. Success Metrics (KPIs)
- Website loads successfully over valid HTTPS (0 SSL/availability errors).
- Increase in tracked conversions: calls, form submissions, and booking requests.
- Improved local-search visibility for target cities/services.
- Faster response to inbound leads (speed-to-lead), enabled by prominent CTAs and instant acknowledgment.
- Growth in Google review volume (if review-request workflow is added in a later phase).

---

## 14. Open Questions (to resolve with the owner)
1. **Primary phone number:** *(Largely resolved.)* (214) 584-4164 is corroborated across 5+ platforms and is treated as primary. Confirm whether (214) 429-7734 (Google) is a defunct, secondary, or tracking line to be retired or kept.
2. **Hours & emergency policy:** Listings converge on Mon–Fri 9–5, Sat 10–3, Sun closed. Confirm these are correct, and clarify whether genuine 24/7 emergency service is offered or whether "emergency" means after-hours-by-text best-effort. What's the after-hours intake path?
3. **Owner branding:** Charles Miles is already named/praised in reviews and is effectively the brand. Confirm he's comfortable being featured by name/photo on the site.
4. **Booking tooling:** Is any field-service/scheduling software (Housecall Pro, Jobber, ServiceTitan, etc.) in use or planned? This determines whether booking is a styled request form or a real integration.
5. **Service-area scope:** *(Largely resolved.)* The business's own Facebook listing names 11 cities (Dallas, Addison, Richardson, Sachse, Garland, Murphy, Wylie, Carrollton, Rowlett, Plano, University Park). Confirm this list and which subset to build as dedicated landing pages in Phase 1 vs. later.
6. **Domain/hosting:** Who controls the current domain and hosting, and can access be provided?
7. **Email display:** Should milesmechanical85@yahoo.com be published on the site, or do we want a branded address (e.g., info@milesmechanicalac.com) first?
8. **Equipment/brand:** Confirm "Carrier installer" can be promoted (authorized-dealer status vs. simply installs Carrier) and whether other brands are serviced.

---

## 15. Proposed Phasing

The proposal is anchored on **Phase 1**. Add-ons are presented as separately shippable, separately priced enhancements.

- **Phase 0 — Discovery & assets:** Resolve open questions; collect NAP, credentials, photos; design logo/brand system.
- **Phase 1 — Frontend-only build (proposal core; no backend, no database):** Static Next.js site; home, service, and genuinely localized service-area pages; curated reviews/trust showcase; lead capture (click-to-call + hosted-form service) including an appointment-request form; SEO foundations; secure HTTPS hosting. The headline deliverable also resolves the current broken-site and listing-inconsistency problems.
- **Add-ons (post–Phase 1; backend/DB introduced only when committed):**
  - Real-time online booking via field-service-tool integration (Housecall Pro / Jobber / ServiceTitan).
  - Owned leads dashboard / CRM (first database dependency).
  - Instant text-back on lead submission.
  - Automated post-job review-request workflow.
  - Guided instant-quote helper.
  - Additional city pages and ongoing SEO content.
  - Customer portal, invoicing, and online payments.

**Where the line sits:** everything that is static content or a public marketing surface lives in Phase 1 and needs no backend or database. A backend and/or database becomes justified only when the business wants something *it* owns and queries — a leads dashboard or real-time booking availability — at which point the relevant add-on is scoped.

---

## Appendix A — Research Sources
- **Yelp** — rating, services, amenities, 2 legacy reviews, hours, phone (214) 584-4164.
- **Google Maps / Google Business Profile** — 4.9★ / 56 reviews, listed phone (214) 429-7734, 6 AM open, offerings, photos.
- **MapQuest** (Yelp-fed) — name, phone, hours (M–F 9–5, Sat 10–3), Carrier equipment photos, "Credit" feature.
- **Facebook** (`@clientcomfortconnections`, "Miles Mechanical AC") — 11-city service area, phone (214) 584-4164, email milesmechanical85@yahoo.com, brand voice, 12 followers, dormant.
- **Birdeye** — 5.0★ / 67 reviews (active), owner-named testimonials, registered address 5129 Dazzle Dr, Dallas, TX 75241.
- **LinkedIn** — Charles Miles, "Miles mechanical A/C" (minimal profile).
- **Directory listings** (cityof.com, Yahoo Local, etc.) — corroborate phone and hours.
- **Live website** `milesmechanicalac.com` — unreachable in-browser (SSL protocol error, re-confirmed June 17, 2026); only cached copy in search.
- HVAC lead-generation and conversion best-practice research (2026).

*This BRD (v0.2) is rehydrated from external research and live review of public listings on June 17, 2026. Facts marked as open questions require confirmation with the business owner before build.*
