# Phase 1 Scope Document
## Miles Mechanical AC & Heating — Marketing Website Redesign

| | |
|---|---|
| **Project** | Miles Mechanical AC & Heating — Marketing Website Redesign |
| **Document type** | Phase 1 Scope Document |
| **Derived from** | [Business Requirements Document v0.1](../brd/Miles-Mechanical-Website-BRD.md) |
| **Version** | 0.1 (Draft) |
| **Date** | June 16, 2026 |
| **Prepared by** | Amit Rana |
| **Prepared for** | Charles Miles, Owner/Operator |
| **Status** | Draft for review |

---

## 1. Purpose

This document defines exactly what will be built, delivered, and accepted in **Phase 1** of the Miles Mechanical website redesign. It is the contract-of-record for the build: anything not listed here as in-scope is out-of-scope for Phase 1 and is tracked in §8 as a deferred add-on.

Phase 1 is **frontend-only**: a statically generated Next.js marketing site with **no backend or database that we build, host, or maintain**. The single server-side concern — delivering a submitted lead — is handled by a hosted third-party form/notification service (e.g., Formspree, Web3Forms, or the host's native forms) that emails/texts the lead to the business.

---

## 2. Phase 1 Goals (the bar for "done")

Phase 1 must, on its own, resolve the current digital failures and stand up the four prioritized conversion capabilities:

1. **Restore a reliable, secure presence** — valid auto-renewing HTTPS on the existing domain; no SSL/403 failures. *(BRD OBJ-1, NFR-1)*
2. **Convert high-intent visitors** — friction-free click-to-call and lead/quote capture on every page. *(OBJ-2)*
3. **Surface the review reputation** — 4.9★ / 56 reviews and curated testimonials as a primary trust driver. *(OBJ-3)*
4. **Improve local-search visibility** — genuinely localized service-area pages, consistent NAP, SEO foundations. *(OBJ-4)*
5. **Establish a professional brand identity** — logo/wordmark + defined color/type system (none exists today). *(OBJ-5)*

---

## 3. In Scope — Phase 1

### 3.1 Capabilities (the four prioritized surfaces)
- **Reviews & trust showcase** — curated, static content.
- **Service-area SEO landing pages** — Dallas, Garland, Sachse (template expandable).
- **Lead capture & quote** — click-to-call + hosted-form lead/quote form on every page.
- **Appointment-request form** — a lead-capture variant that captures preferred date/time *as data* (not a real-time scheduler).

### 3.2 Page / route inventory

| Route | Page | Source FR |
|---|---|---|
| `/` | Home — services, service area, differentiators, primary CTAs above the fold | FR-CR-1 |
| `/services` | Services overview, linking to each per-service page | FR-CR-2 |
| `/services/ac-repair` | Per-service: AC repair | FR-SA-4 |
| `/services/installation-replacement` | Per-service: install / replacement | FR-SA-4 |
| `/services/heating-furnace` | Per-service: heating / furnace repair | FR-SA-4 |
| `/services/maintenance` | Per-service: seasonal maintenance | FR-SA-4 |
| `/services/emergency` | Per-service: emergency service | FR-SA-4 |
| `/services/mini-split` | Per-service: mini-splits | FR-SA-4 |
| `/areas/dallas` | Service-area landing: Dallas (unique localized content) | FR-SA-1, FR-SA-2 |
| `/areas/garland` | Service-area landing: Garland | FR-SA-1, FR-SA-2 |
| `/areas/sachse` | Service-area landing: Sachse | FR-SA-1, FR-SA-2 |
| `/about` | Charles Miles story, experience, values, credentials | FR-CR-3 |
| `/reviews` | Reviews & trust showcase (aggregate rating + testimonials) | FR-RV-1, FR-RV-2 |
| `/contact` | Lead/quote + appointment-request entry point | FR-LC-2, FR-BK-1 |

> Per-service and per-area pages are driven by a **scalable, content-driven template** (FR-SA-3) so new services/cities can be added without a rebuild.

### 3.3 Functional requirements in Phase 1

Only **M (must-have)** and **S (should-have)** items from the BRD are in scope. All **A (add-on)** items are deferred (§8).

**Lead capture & contact**
- **FR-LC-1 (M)** — Persistent, always-visible click-to-call on mobile (sticky header/footer) using the reconciled primary phone number.
- **FR-LC-2 (M)** — Short quote/lead form (name, phone, ZIP/city, service type, free-text issue) reachable from every page, delivered via hosted form service.
- **FR-LC-3 (M)** — Submission confirmation + clear "what happens next" message, optimized for speed-to-lead.
- **FR-LC-4 (M)** — Emergency-service CTA with distinct, urgent styling, tied to the after-hours policy.

**Booking (request-only in Phase 1)**
- **FR-BK-1 (M)** — Appointment-**request** form capturing preferred date/time as a lead (via FR-LC-2 mechanism). *No real-time availability.*

**Reviews & trust**
- **FR-RV-1 (M)** — Prominent aggregate Google rating + count (4.9★ / 56 reviews).
- **FR-RV-2 (M)** — Curated testimonials section.
- **FR-RV-3 (M)** — Trust badges/credentials: licensed, insured, AHS-approved, warranty terms, 20+ years.
- **FR-RV-4 (S)** — Link/integration to live Google reviews; easy refresh of featured reviews.
- **FR-RV-5 (S)** — Feature the owner as a personal-trust element *(pending owner approval — see §6)*.

**Service-area SEO**
- **FR-SA-1 (M)** — Dedicated localized landing page per served city (Dallas, Garland, Sachse).
- **FR-SA-2 (M)** — Unique, non-boilerplate content per page.
- **FR-SA-3 (S)** — Scalable template so new cities require no rebuild.
- **FR-SA-4 (M)** — Per-service landing pages (the six services above).

**Core site & content**
- **FR-CR-1 (M)** — Home page with services, area, differentiators, primary CTAs above the fold.
- **FR-CR-2 (M)** — Services overview linking to per-service pages.
- **FR-CR-3 (M)** — About page.
- **FR-CR-4 (S)** — Photo gallery / proof-of-work section *(asset-dependent)*.
- **FR-CR-5 (M)** — Consistent header/footer with NAP, hours, service area, social/review links.
- **FR-CR-6 (S)** — Financing / warranty / home-warranty (AHS) info section.

### 3.4 Cross-cutting (non-functional) requirements
- **NFR-1 Security** — valid HTTPS with auto-renewing cert; force HTTPS + proper redirects; resolve current SSL/403 failure.
- **NFR-2 Mobile-first** — fully responsive; phone is the primary design target.
- **NFR-3 Performance** — fast on mobile networks; optimized images; good Core Web Vitals.
- **NFR-4 SEO** — crawlable markup, per-page metadata, `LocalBusiness`/`HVACBusiness` structured data, XML sitemap, canonical URLs.
- **NFR-5 Accessibility** — target WCAG 2.1 AA (semantic markup, contrast, keyboard nav, alt text).
- **NFR-6 Analytics** — conversion tracking on calls, form submissions, and booking requests.
- **NFR-7 Maintainability** — content (cities, services, reviews) editable without code changes where feasible; minimal-dependency frontend.
- **NFR-8 Browser support** — current major browsers; graceful degradation.

### 3.5 Brand & content deliverables
- Logo/wordmark + defined color palette and typography (AST-3).
- Page-ready copy refined from existing brand voice — "Texans serving Texans," honest pricing (AST-5).
- Curated featured testimonials selected from the Google corpus (AST-6).
- Reconciled NAP and hours applied as a single source of truth across the site (AST-1, AST-2).

---

## 4. Explicitly Out of Scope — Phase 1

The following are **not** part of Phase 1 and require no backend or database in this phase:
- Any owned application server or database in our codebase.
- Real-time online booking, availability, conflict prevention, or dispatch/calendar sync.
- Leads dashboard / CRM, customer accounts/portal, invoicing, online payments.
- Instant text-back on submission; automated post-job review-request workflow.
- Guided instant-quote / estimate helper.
- City pages beyond Dallas, Garland, and Sachse.

These map to BRD §5.2 add-ons and are listed in §8.

---

## 5. Acceptance Criteria (Definition of Done)

Phase 1 is accepted when **all** of the following hold:

1. **Availability/security** — Site loads over valid HTTPS on apex + `www` with zero SSL/availability errors; HTTP → HTTPS redirect works; certificate auto-renews.
2. **Pages** — All routes in §3.2 are live, responsive, and content-complete (no lorem-ipsum on must-have pages).
3. **Conversion paths** — Click-to-call is visible and tappable on every mobile page; lead/quote form and appointment-request form submit successfully via the hosted service and deliver to the business; confirmation + "what happens next" shown.
4. **Emergency CTA** — Present with distinct urgent styling and correct after-hours messaging.
5. **Reviews/trust** — Aggregate rating, curated testimonials, and credential badges display correctly.
6. **Service-area SEO** — Each city page has genuinely unique localized content (not duplicated across cities); driven by the reusable template.
7. **SEO foundations** — Per-page metadata, `LocalBusiness`/`HVACBusiness` structured data validates, XML sitemap and canonical URLs present.
8. **Analytics** — Conversions tracked for calls, form submissions, and booking requests; verified firing.
9. **Performance** — Good Core Web Vitals on a representative mobile profile.
10. **Accessibility** — Spot-checked against WCAG 2.1 AA (semantics, contrast, keyboard nav, alt text).
11. **Data consistency** — A single reconciled phone number and hours appear identically site-wide.

---

## 6. Dependencies & Open Items (must resolve before / during build)

These are owner-side inputs the build depends on. Blocking items must be resolved before launch.

| # | Item | Needed for | Blocking? |
|---|---|---|---|
| 1 | **Primary phone number** — (214) 584-4164 vs (214) 429-7734 | FR-LC-1, NAP | **Yes** |
| 2 | **True hours & after-hours/emergency policy** | FR-LC-4, header/footer | **Yes** |
| 3 | **Owner branding approval** (name/photo) | FR-RV-5, About | No (degrade gracefully) |
| 4 | **Confirmed service-area city list** | FR-SA-1 | Partial (start with 3) |
| 5 | **Domain/hosting access** for DNS + TLS reconfiguration | NFR-1 | **Yes** |
| 6 | **Credentials** — license #(s), insurance, AHS, warranty terms | FR-RV-3 | **Yes** |
| 7 | **Photography** — job/equipment photos | FR-CR-4 gallery | No (gallery is S) |
| 8 | **Hosted form service selection** (Formspree / Web3Forms / host-native) | FR-LC-2, FR-BK-1 | **Yes** |

> Note: booking remains a styled **request form** in Phase 1 regardless of whether a field-service tool is later adopted (BRD constraint §10).

---

## 7. Assumptions & Constraints

- Existing domain `milesmechanicalac.com` can be retained and its DNS/hosting reconfigured.
- The business will provide/approve content, photos, credentials, and correct NAP.
- No owned backend or database is built, hosted, or maintained in Phase 1.
- Service-area business with no public storefront address — map/address handling reflects this.
- Single-operator/small-team intake — booking and lead workflows stay realistic for current staffing.

---

## 8. Deferred to Add-ons (post–Phase 1)

Separately shippable and separately priced; each is where owned server logic and/or a database first becomes justified (BRD §5.2):

- Real-time online booking via field-service-tool integration (Housecall Pro / Jobber / ServiceTitan).
- Owned leads dashboard / CRM (first DB dependency).
- Instant text-back on lead submission.
- Automated post-job review-request workflow.
- Guided instant-quote / estimate helper.
- Customer portal, invoicing, online payments.
- Additional city pages and ongoing SEO content.

---

*Derived from the Miles Mechanical Website BRD v0.1. Facts flagged as open questions in the BRD (phone, hours, owner branding, city list, hosting access) must be confirmed with the owner before launch.*
