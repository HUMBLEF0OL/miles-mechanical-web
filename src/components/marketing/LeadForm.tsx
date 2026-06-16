'use client'

import { type FormEvent } from 'react'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'

const SERVICE_OPTIONS = [
  'AC repair',
  'Heating',
  'Install',
  'Maintenance',
  'Emergency',
] as const

/**
 * LeadForm — the §10 "Request service" form. Presentational lead-capture form
 * built from the Input/Select/Textarea/Button atoms.
 *
 * Phase 1 has no backend: onSubmit only preventDefault's. A hosted form service
 * (Formspree / Web3Forms) will be wired in here in a later phase — POST the
 * collected FormData to the endpoint and surface success/error state.
 */
export function LeadForm() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // TODO(Phase 2): submit to a hosted form service (Formspree / Web3Forms).
    // Example: await fetch(endpoint, { method: 'POST', body: new FormData(event.currentTarget) })
  }

  return (
    <form
      onSubmit={handleSubmit}
      aria-labelledby="lead-form-heading"
      className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-[1fr_1.1fr]"
    >
      {/* ── Intro / reassurance panel ──────────────────────────────────── */}
      <div className="rounded-card border border-line bg-subtle p-8 sm:p-10">
        <h2
          id="lead-form-heading"
          className="font-display text-3xl font-extrabold uppercase leading-none text-mm-blue-900"
        >
          Request service
        </h2>
        <p className="mt-3 font-sans text-[15px] leading-relaxed text-mm-steel-700">
          Tell us what&apos;s going on. We&apos;ll call you back fast — usually
          within the hour during business hours.
        </p>

        {/* What happens next info note */}
        <div className="mt-6 flex items-start gap-3 rounded-control bg-mm-blue-100 px-4.5 py-4 text-mm-blue-700">
          <Icon name="info" size={20} className="mt-px shrink-0" aria-hidden />
          <p className="font-sans text-[13px] leading-normal">
            <strong className="font-semibold">What happens next:</strong> your
            request goes straight to Mr. Miles. No call centre, no bots — a real
            person calls you back.
          </p>
        </div>
      </div>

      {/* ── Fields ─────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-4.5 rounded-card border border-line bg-page p-8 shadow-e2 sm:p-9">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input label="Name" name="name" type="text" placeholder="Your name" required autoComplete="name" />
          <Input
            label="Phone"
            name="phone"
            type="tel"
            placeholder="(214) 000-0000"
            required
            autoComplete="tel"
          />
          <Input
            label="City / ZIP"
            name="cityZip"
            type="text"
            placeholder="Garland, 75040"
            autoComplete="address-level2"
          />
          <Select label="Service" name="service" defaultValue={SERVICE_OPTIONS[0]}>
            {SERVICE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </div>

        <Input
          label="Preferred date & time (optional)"
          name="preferredTime"
          type="text"
          placeholder="e.g. Thursday morning"
        />

        <Textarea
          label="What's going on?"
          name="message"
          placeholder="Describe the issue"
        />

        <Button type="submit" variant="primary" size="lg" className="w-full">
          Send my request
        </Button>

        <p className="text-center font-sans text-xs text-mm-steel-500">
          Delivered straight to the business. We never share your details.
        </p>
      </div>
    </form>
  )
}
