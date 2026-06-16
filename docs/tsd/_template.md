# <Feature> — Technical Specification

> One-time bootstrap TSD. Generated from `docs/brd/<feature>.md` via `/tsd`.
> Reviewed by humans. Consumed by `/plan` to produce the implementation plan.

## Overview & scope

Short statement of what is being built and what is explicitly out.

## Architecture

High-level architecture. Mention the chosen stack — Next.js App Router, plus
the http / data-fetching / state / forms / validation choices made at scaffold
time (see `docs/PACKAGES.md` for the actual selections). Diagram optional.

## Routes & navigation

Route table: path · purpose · auth requirement · primary components.

## Components inventory

- **UI primitives** consumed (from `components/ui/*`)
- **Shared components** introduced (under `components/shared/*`)
- **Feature components** introduced (under `app/(feature)/_components/*`)

## Client state

Client stores (per the chosen state library), URL state (search params), and
form state — describe what lives where.

## API consumption

Service functions + hooks + query keys. Reference the existing `lib/api/*`
conventions.

## Data layer / backend notes

Free-form notes about the data the feature reads/writes. No formal `## Backend`
split — backend work, if any, is out of scope for this generator.

## Auth requirements

Which routes/components require auth. Which roles. Redirect behavior.

## Error & empty states

How each surface degrades.

## Test plan

- Unit tests (vitest) — what to cover
- E2E tests (playwright) — happy path + critical edge

## Rollout / feature-flagging

Feature flags, kill switches, rollout phases (if any).

## Open questions

Anything the BRD did not answer.
