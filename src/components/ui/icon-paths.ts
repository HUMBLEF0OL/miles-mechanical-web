import type { ReactNode } from 'react'
import { createElement } from 'react'

/**
 * Icon path registry — extracted from §06 Iconography of the Miles Mechanical
 * Design System. Each entry is the inner markup of a 24x24 line icon
 * (2px stroke, round caps/joins, currentColor). Some icons include filled
 * dots / circles / rects in addition to stroked paths.
 *
 * Defined as functions returning ReactNode so we never duplicate keyed-element
 * concerns at the call site and can keep multi-element icons exact.
 */

const p = (d: string, key?: string): ReactNode =>
  createElement('path', { d, key })

export const iconPaths = {
  // ── HVAC / trade-specific (§06) ───────────────────────────────────────────
  cooling: [
    p('M12 2v20M2 12h20M5 5l14 14M19 5 5 19', 'a'),
    p(
      'M12 5 9.5 7.5M12 5l2.5 2.5M12 19l-2.5-2.5M12 19l2.5-2.5M5 12l2.5 2.5M5 12l2.5-2.5M19 12l-2.5 2.5M19 12l-2.5-2.5',
      'b'
    ),
  ],
  heating: p('M12 2c1 3 5 5 5 9a5 5 0 0 1-10 0c0-2 1-3 2-4 .5 1.5 1.5 2 2.5 2 0-3-1.5-4.5-1.5-7Z'),
  thermostat: [
    p('M10 13.5V5a2 2 0 1 1 4 0v8.5a4 4 0 1 1-4 0Z', 'a'),
    createElement('circle', {
      key: 'b',
      cx: 12,
      cy: 17,
      r: 1.4,
      fill: 'currentColor',
      stroke: 'none',
    }),
  ],
  repair: p('M14.5 6a3.5 3.5 0 0 0-4.6 4.3L4 16.2 7.8 20l5.9-5.9A3.5 3.5 0 0 0 18 9.5L15.5 12 12 8.5 14.5 6Z'),
  airflow: p('M3 8h11a2.5 2.5 0 1 0-2.5-2.5M3 12h15a3 3 0 1 1-3 3M3 16h9a2 2 0 1 1-2 2'),
  warranty: [
    p('M12 3 5 6v5c0 4.2 3 7.5 7 9 4-1.5 7-4.8 7-9V6l-7-3Z', 'a'),
    p('m9 11.5 2 2 4-4', 'b'),
  ],
  call: p('M6 3h3l1.5 5L8 9.5a12 12 0 0 0 6.5 6.5L16 13.5 21 15v3a2 2 0 0 1-2 2A16 16 0 0 1 4 5a2 2 0 0 1 2-2Z'),
  schedule: [
    createElement('rect', { key: 'a', x: 3.5, y: 5, width: 17, height: 15, rx: 2.5 }),
    p('M3.5 9.5h17M8 3v4M16 3v4', 'b'),
  ],
  reviews: p('m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17.9 6.6 20l1-6.1L3.2 9.5l6.1-.9L12 3Z'),
  'home-warranty': [
    p('M4 11 12 4l8 7M6 9.5V20h12V9.5', 'a'),
    p('m9.5 14 1.8 1.8 3.2-3.3', 'b'),
  ],
  // §06 label "24/7" — keyed 'clock'
  clock: [
    createElement('circle', { key: 'a', cx: 12, cy: 12, r: 9 }),
    p('M12 7v5l3.5 2', 'b'),
  ],
  // §06 label "service area" — keyed 'truck'
  truck: [
    p('M2 7h11v8H2zM13 10h4l3 3v2h-7z', 'a'),
    createElement('circle', { key: 'b', cx: 7, cy: 17.5, r: 1.6 }),
    createElement('circle', { key: 'c', cx: 17, cy: 17.5, r: 1.6 }),
  ],
  experience: [
    createElement('circle', { key: 'a', cx: 12, cy: 9, r: 5.5 }),
    p('M9 13.5 7.5 21l4.5-2.5L16.5 21 15 13.5', 'b'),
  ],
  efficiency: p('M20 4C9 4 4 9 4 18c6 0 14-3 16-14ZM8 16c3-4 6-6 10-7'),

  // ── Utility icons used elsewhere in the doc ───────────────────────────────
  check: p('M20 6 9 17l-5-5'),
  'chevron-down': p('m6 9 6 6 6-6'),
  info: [
    createElement('circle', { key: 'a', cx: 12, cy: 12, r: 9 }),
    p('M12 8v5M12 16h.01', 'b'),
  ],
  alert: [
    p('M12 3 1.5 21h21L12 3Z', 'a'),
    p('M12 10v4M12 17.5h.01', 'b'),
  ],
  menu: p('M4 7h16M4 12h16M4 17h16'),
  star: p('m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17.9 6.6 20l1-6.1L3.2 9.5l6.1-.9L12 3Z'),
  // phone is the same glyph as call
  phone: p('M6 3h3l1.5 5L8 9.5a12 12 0 0 0 6.5 6.5L16 13.5 21 15v3a2 2 0 0 1-2 2A16 16 0 0 1 4 5a2 2 0 0 1 2-2Z'),
} as const

export type IconName = keyof typeof iconPaths
