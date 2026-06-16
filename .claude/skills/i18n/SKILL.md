---
name: i18n
description: next-intl i18n conventions for the Starter — locale routing, message catalogs, typed translation helpers, locale-switcher, and proxy locale detection. Use when adding or translating pages, adding message keys, or touching anything under src/i18n.
---

# i18n Skill — next-intl

## Key Files

- `src/i18n/routing.ts` — locale list and default locale (`defineRouting`)
- `src/i18n/navigation.ts` — typed navigation utilities (`Link`, `useRouter`, `usePathname`, `redirect`)
- `src/i18n/request.ts` — server-side request config (loads messages)
- `src/i18n/messages/en.json` — English translations
- `src/i18n/messages/fr.json` — French translations
- `src/lib/intl.ts` — typed re-exports (`useTranslations`, `getTranslations`, `useLocale`)
- `src/components/shared/locale-switcher.tsx` — locale selector UI
- `src/app/[locale]/layout.tsx` — locale layout with `NextIntlClientProvider`
- `src/proxy.ts` — locale detection + redirect (composed with auth)

## Adding a New Translation Key

1. Add the key to `src/i18n/messages/en.json` under the appropriate namespace
2. Add the same key to `src/i18n/messages/fr.json` (and all other locale files)
3. Type inference is automatic — no code generation needed

## Client Components vs Server Components

- **Client components:** `useTranslations('namespace')` from `@/lib/intl`
- **Server components / route handlers:** `getTranslations('namespace')` from `@/lib/intl`

```tsx
// Client component
'use client'
import { useTranslations } from '@/lib/intl'

export function MyComponent() {
  const t = useTranslations('common')
  return <p>{t('loading')}</p>
}
```

```tsx
// Server component
import { getTranslations } from '@/lib/intl'

export default async function Page() {
  const t = await getTranslations('common')
  return <p>{t('loading')}</p>
}
```

## Adding a New Locale

1. Add locale code to `src/i18n/routing.ts` → `locales` array
2. Create `src/i18n/messages/<locale>.json` with all keys from `en.json`
3. The locale-switcher automatically picks up new locales from routing config

## Pluralisation & Formatting

```json
{ "items": "{count, plural, =0 {No items} one {# item} other {# items}}" }
```

Use ICU message format. Date/number formatting:

```tsx
const t = useTranslations()
t('date', { date: new Date(), style: 'medium' })
```

## Proxy Composition

- Locale detection and redirect logic lives in `src/proxy.ts`
- Auth handler runs first, then i18n handler
- **Never modify the auth section** when adding locale routes
- The `config.matcher` export covers all non-static routes
