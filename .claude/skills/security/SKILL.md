---
name: security
description: Use when reviewing route handlers, server actions, middleware, auth flows, file uploads, redirects, or any code that crosses a user-input trust boundary — walks OWASP Top 10 for this specific stack.
---

# Security — OWASP Top 10 mapped to this stack

## Purpose

Walk the OWASP Top 10 as it applies to this specific stack. Use this skill when reviewing route handlers, server actions, middleware, auth flows, file-upload UI, redirects, or any code that crosses a user-input trust boundary.

## When to invoke

- Writing or reviewing route handlers or API endpoints
- Writing or reviewing server actions
- Writing or reviewing middleware
- Working on auth flows, login, registration, session management
- Any code accepting user input that crosses a trust boundary
- File-upload UI or download handlers
- Redirect or URL-construction logic

## OWASP Top 10

### A01 — Broken Access Control

Verify each server action / route handler enforces its own auth check. Never trust client-passed role or user-ID claims. Check that protected routes are covered by middleware and not just client-side guards. Validate redirect targets against an allowlist — never redirect to a URL derived from unvalidated user input (open redirect).

### A02 — Cryptographic Failures

Never store or log passwords, tokens, or secrets in plaintext. Use HTTPS everywhere. Sensitive data at rest must be encrypted.

### A03 — Injection

Validate all user input through the `zod` schema before using in queries, commands, or file paths. Never interpolate unsanitised user strings.

Parameterise all database queries. Never build SQL / NoSQL queries via string concatenation.

### A04 — Insecure Design

Threat-model new features before building. Enforce rate limiting on all public endpoints. Apply principle of least privilege to all API and database roles.

### A05 — Security Misconfiguration

Remove default credentials and debug endpoints before shipping. Verify `next.config.js/ts` security headers (`X-Content-Type-Options`, `X-Frame-Options`, `Content-Security-Policy`). Never expose stack traces to end users.

### A06 — Vulnerable and Outdated Components

Run `npm audit` in CI. Pin transitive dependencies when audit flags them. Do not add packages without reviewing their dependency tree and recent CVE history.

### A07 — Identification and Authentication Failures

No auth module is installed. If you add authentication later, ensure session tokens are invalidated on logout, login endpoints are rate-limited, and MFA is available for privileged routes.

### A08 — Software and Data Integrity Failures

Verify integrity of third-party scripts (use SRI hashes for CDN resources). Do not deserialise untrusted data without schema validation. Restrict CI/CD pipelines to least-privilege roles.

### A09 — Security Logging and Monitoring Failures

Log authentication events, access-control failures, and input validation errors. Never log passwords or tokens. Alert on repeated auth failures or anomalous request patterns.

### A10 — Server-Side Request Forgery (SSRF)

Validate and allowlist all outbound URLs before making requests. Never proxy a URL taken directly from user input. Use a strict allowlist of domains for any server-side HTTP client.

## Stack-specific patterns

### JSX / XSS

Never use `dangerouslySetInnerHTML` with non-static content. Avoid `eval` and `new Function`. React escapes JSX expressions by default — do not bypass it.

### Server actions

Always re-validate inputs server-side with the `zod` schema even when client-side validation runs. Never trust the client's pre-validated payload.

### i18n / locale parameter

The locale segment from the URL is user input. Validate it against the routing locales list before use. Never use it for filesystem paths or database lookups without sanitisation.

### Forms

Server-side re-validation is always required even when client-side validation runs. The form library handles UX — your server action handles trust boundaries.

## Anti-patterns

- `eval` or `new Function` with any user-supplied string
- `dangerouslySetInnerHTML` with non-static content
- Secrets in client components or `NEXT_PUBLIC_*` env vars (they are exposed to the browser)
- Server-only secrets read in client code
- Bypassing auth middleware with client-only guards
- Trusting client-passed role or user-ID claims without server verification
- Storing sensitive data (tokens, PII) in client state that syncs to `localStorage` or is visible in devtools
