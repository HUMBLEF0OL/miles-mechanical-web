# BRD Format

> A Business Requirements Document drives one bootstrap pass through the
> BRD → TSD → Plan workflow. Drop your BRD at `docs/brd/<feature>.md` and
> run `/tsd docs/brd/<feature>.md`. The BRD must be markdown — convert
> `.docx` files first with: `pandoc input.docx -o input.md`.

A **BRD** captures _what_ needs to be built and _why_ — never _how_. The TSD
that follows turns a BRD into a technical plan.

## Required sections

### 1. Problem / Background

What hurts today? Provide concrete examples and scope. Include any prior
attempts or workarounds and why they fall short.

### 2. Users & Personas

Who will use this? Roles, permissions, expected technical skill level. If a
persona spans multiple existing roles, name each.

### 3. Business Goals

What measurable outcome justifies building this? Tie each goal to a metric
or strategic objective when possible.

### 4. Non-Goals

What is explicitly _out of scope_ for this iteration? List items the team
might assume are included but are deliberately deferred.

### 5. Success Metrics

How will success be measured after launch? Define quantitative thresholds
(e.g. "median time-to-checkout drops by 20%") and the measurement window.

### 6. Constraints

Hard limits the design must respect — regulatory, performance budgets,
deadline, third-party SLAs, accessibility requirements, etc.

### 7. Acceptance Criteria

Bullet list of testable behaviors. Each item must be observable from the
outside (UI, API response, logged event). Avoid implementation language.

### 8. Open Questions

Anything that blocks a TSD from being written. List the question, who is
expected to answer it, and the deadline for resolution.

## Style

- Plain English. Avoid jargon and acronyms — or define them inline on first
  use.
- Bullet lists over prose where possible.
- One BRD per feature. Split if scope grows beyond a single deliverable.

## Lifecycle

1. Author drafts the BRD.
2. Stakeholders review and resolve open questions.
3. BRD is locked (no edits without an ADR or follow-up BRD).
4. Engineering runs the `tsd` agent against the locked BRD to produce a TSD.
